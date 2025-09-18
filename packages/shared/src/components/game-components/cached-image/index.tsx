import { ReactEventHandler, useEffect, useState } from "react";
import { downloadAndCacheImage, imageCache } from '@shared/helpers/image-cache-controller';
import { BASE_PATH } from '@shared/constants/base-path';

type Props = {
    src: string;
    alt: string;
    blurSrc?: string;
    fallbackSrcs?: string[];
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    fill?: boolean;
    onLoad?: ReactEventHandler<HTMLImageElement>;
};

export const CachedImage: React.FC<Props> = ({ src, blurSrc, alt, width, height, priority, className, onLoad, fallbackSrcs }) => {
    // Ensure src has basePath prepended if it's a relative static path
    const fullSrc = src.startsWith('/static/') && !src.startsWith(BASE_PATH) ? `${BASE_PATH}${src}` : src;
    // Ensure fallbackSrcs have basePath prepended if they are relative static paths
    const fullFallbackSrcs = fallbackSrcs?.map(fallback =>
        fallback.startsWith('/static/') && !fallback.startsWith(BASE_PATH) ? `${BASE_PATH}${fallback}` : fallback
    );

    const [source, setSource] = useState<string | null>(imageCache[fullSrc]?.data || null);

    useEffect(() => {
        const loadImage = async () => {
            let result = await downloadAndCacheImage(fullSrc);
            if (!result.valid && Array.isArray(fullFallbackSrcs) && fullFallbackSrcs.length > 0) {
                for (const fallback of fullFallbackSrcs) {
                    result = await downloadAndCacheImage(fallback);
                    if (result.valid) {
                        break;
                    }
                }
            }
            setSource(result.imageBase64 || null);
        };
        if (!imageCache[fullSrc]) {
            loadImage();
        } else {
            setSource(imageCache[fullSrc].data);
        }
    }, [fullSrc, fullFallbackSrcs, src, fallbackSrcs]);

    const imgProps: any = {
        className,
        onLoad,
        alt
    };

    if (width) imgProps.width = width;
    if (height) imgProps.height = height;

    return (source || blurSrc) && <img src={source || blurSrc} {...imgProps} />;
};
