import { useEffect, useState } from "react";
import { downloadAndCacheImage, imageCache } from '@shared/helpers/image-cache-controller';

type Props = {
    pathImage: string;
    className?: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
    children?: React.ReactNode;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const BgCachedImage: React.FC<Props> = ({
    pathImage,
    className,
    backgroundSize,
    backgroundRepeat,
    backgroundPosition,
    children,
}) => {
    // Ensure path has basePath prepended if it's a relative static path
    const fullPathImage = pathImage.startsWith('/static/') && !pathImage.startsWith(basePath) ? `${basePath}${pathImage}` : pathImage;
    const [source, setSource] = useState<string | null>(imageCache[fullPathImage]?.data || null);
    const props = { backgroundSize, backgroundRepeat, backgroundPosition };
    Object.keys(props).forEach((key) => props[key] === undefined && delete props[key]);

    useEffect(() => {
        const loadImage = async () => {
            const result = await downloadAndCacheImage(fullPathImage);
            setSource(result.imageBase64);
        };
        if (!imageCache[fullPathImage]) {
            loadImage();
        } else {
            setSource(imageCache[fullPathImage].data);
        }
    }, [fullPathImage, pathImage]);

    return source ? (
        <div
            className={className}
            style={{
                backgroundImage: `url('${source.replace(/(\r\n|\n|\r)/gm, "")}')`,
                ...props,
            }}
        >
            {children}
        </div>
    ) : (
        <>{children}</>
    );
};
