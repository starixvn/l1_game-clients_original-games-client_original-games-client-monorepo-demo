type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png';
interface ImageOptimizationOptions {
    quality?: number;
    format?: ImageFormat;
    width?: number;
    height?: number;
    compression?: 'lossy' | 'lossless';
}
interface OptimizedImageInfo {
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
    format: string;
    url: string;
}
declare class ImageOptimizationHelper {
    private static instance;
    private readonly canvas;
    private readonly ctx;
    private constructor();
    static getInstance(): ImageOptimizationHelper;
    isWebPSupported(): boolean;
    isAVIFSupported(): boolean;
    getOptimalFormat(): ImageFormat;
    optimizeImageUrl(url: string, _options?: ImageOptimizationOptions): string;
    createResponsiveImageUrls(baseUrl: string, sizes: number[]): string[];
    optimizeImageData(imageData: ImageData, options?: ImageOptimizationOptions): Promise<OptimizedImageInfo>;
    preloadOptimizedImages(imageUrls: string[], options?: ImageOptimizationOptions): Promise<void>;
    private preloadImage;
    getImageDimensions(url: string): Promise<{
        width: number;
        height: number;
    }>;
    calculateOptimalQuality(width: number, height: number): number;
    generateSrcSet(baseUrl: string, sizes: number[]): string;
    getCompressionStats(originalUrls: string[], optimizedUrls: string[]): {
        totalOriginalSize: number;
        totalOptimizedSize: number;
        averageCompressionRatio: number;
        formatUsed: string;
    };
}
export declare const imageOptimizationHelper: ImageOptimizationHelper;
export declare const optimizeImageUrl: (url: string, options?: ImageOptimizationOptions) => string;
export declare const createResponsiveImageUrls: (baseUrl: string, sizes: number[]) => string[];
export declare const getOptimalFormat: () => string;
export declare const isWebPSupported: () => boolean;
export declare const isAVIFSupported: () => boolean;
export default imageOptimizationHelper;
