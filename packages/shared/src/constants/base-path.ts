// Centralized basePath configuration for better maintainability
// This is the single source of truth for basePath across the entire application

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// For SCSS usage - can be imported in SCSS files
export const BASE_PATH_SCSS = BASE_PATH || "/";

// Helper functions for common basePath operations
export const withBasePath = (path: string): string => {
    if (!path.startsWith('/')) {
        path = '/' + path;
    }
    return BASE_PATH + path;
};

export const isBasePathSet = (): boolean => {
    return BASE_PATH !== "";
};

export const getFullUrl = (relativePath: string): string => {
    const path = relativePath.startsWith('/') ? relativePath : '/' + relativePath;
    return BASE_PATH + path;
};

// Helper function to ensure URLs always include basePath
export const ensureBasePath = (url: string): string => {
    if (!BASE_PATH) return url;

    // If URL already starts with basePath, return as is
    if (url.startsWith(BASE_PATH)) return url;

    // If URL is just "/" or empty, return basePath
    if (url === "/" || url === "") return BASE_PATH;

    // If URL starts with "/", prepend basePath
    if (url.startsWith("/")) return BASE_PATH + url;

    // Otherwise, treat as relative path and prepend basePath + "/"
    return BASE_PATH + "/" + url;
};

// Helper function to extract path without basePath
export const stripBasePath = (url: string): string => {
    if (!BASE_PATH || !url.startsWith(BASE_PATH)) return url;

    const pathWithoutBase = url.slice(BASE_PATH.length);
    return pathWithoutBase || "/";
};

// Helper function to check if a URL is under the basePath
export const isUnderBasePath = (url: string): boolean => {
    return BASE_PATH ? url.startsWith(BASE_PATH) : true;
};

// Helper function to redirect to basePath URL if needed
export const redirectToBasePath = (currentUrl: string): string | null => {
    if (!BASE_PATH) return null;

    // If current URL doesn't have basePath, redirect to basePath version
    if (!currentUrl.startsWith(BASE_PATH)) {
        return ensureBasePath(currentUrl);
    }

    return null;
};

// For development/debugging
export const getBasePathInfo = () => ({
    basePath: BASE_PATH,
    isSet: isBasePathSet(),
    environment: process.env.NODE_ENV,
    nextPublicBasePath: process.env.NEXT_PUBLIC_BASE_PATH,
});
