import "./string-helper";
interface CacheEntry {
    data: string;
    timestamp: number;
    size: number;
}
export declare const imageCache: Record<string, CacheEntry>;
export declare const downloadAndCacheImage: (path: string) => Promise<{
    path: string;
    valid: boolean;
    imageBase64: string;
}>;
export declare const getCacheStats: () => {
    size: number;
    maxSize: number;
    entryCount: number;
    utilization: number;
};
export declare const clearImageCache: () => void;
export {};
