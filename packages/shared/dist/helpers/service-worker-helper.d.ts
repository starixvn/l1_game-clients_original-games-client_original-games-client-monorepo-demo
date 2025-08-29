interface CacheInfo {
    [cacheName: string]: number;
}
declare class ServiceWorkerHelper {
    private static instance;
    private registration;
    private readonly isSupported;
    private constructor();
    static getInstance(): ServiceWorkerHelper;
    register(): Promise<boolean>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
    skipWaiting(): Promise<void>;
    clearCache(): Promise<void>;
    getCacheInfo(): Promise<CacheInfo | null>;
    requestBackgroundSync(): Promise<void>;
    private showUpdateNotification;
    isRegistered(): boolean;
    getRegistration(): ServiceWorkerRegistration | null;
    isServiceWorkerSupported(): boolean;
}
export declare const serviceWorkerHelper: ServiceWorkerHelper;
export default serviceWorkerHelper;
