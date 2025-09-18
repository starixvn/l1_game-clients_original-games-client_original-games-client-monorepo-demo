/**
 * Custom Next.js Image Loader
 *
 * This loader prepends the basePath to image URLs so that _next/image requests
 * are generated with the correct basePath prefix for reverse proxy environments.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({ src, width, quality }) {
    // If the source already starts with http/https, it's an external URL - don't modify
    if (src.startsWith("http://") || src.startsWith("https://")) {
        return `${basePath}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
    }

    // For internal images, prepend basePath to the src before encoding
    const fullSrc = basePath + src;
    return `/_next/image?url=${encodeURIComponent(fullSrc)}&w=${width}&q=${quality || 75}`;
}
