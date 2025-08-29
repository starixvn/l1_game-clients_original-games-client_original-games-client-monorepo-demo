interface IActionStorage {
    remove: (name: string) => void;
    get: (name: string) => string | object;
    set: (name: string, value: string | object, expiresDay?: number) => void;
    isAvailable: () => boolean;
}
declare global {
    interface GlobalThisShim {
        localMemory: object;
    }
}
export declare class LocalStorage implements IActionStorage {
    remove(name: string): void;
    get(name: string): any;
    set(name: string, value: string | object): void;
    isAvailable(): boolean;
}
export declare class Memory implements IActionStorage {
    localMemory: any;
    constructor();
    remove(name: string): void;
    get(name: string): any;
    set(name: string, value: any): void;
    isAvailable(): boolean;
}
export declare class StorageHelper {
    static supportStorage: IActionStorage;
    static prefixKey: string;
    private static initialize;
    static getCurrentStorage(): IActionStorage;
    static get<T>(name: string): T;
    static set(name: string, value: any): void;
    static remove(name: string): void;
    static setPrefixKey(prefixKey: string): void;
    static getName(name: string): string;
}
export declare const localStorageKeys: {
    session: string;
    rebet: string;
    umInfo: string;
    loginStatus: string;
    enableSound: string;
    enableMusic: string;
    buildVersion: string;
    pfSetting: string;
    debug: string;
    url: string;
    hideToolbarGuide: string;
    currentSessionHideToolbarGuide: string;
    hideSwitchGameGuide: string;
    currentSessionSwitchGameGuide: string;
    showPFSetting: string;
    isSleepMode: string;
    volumeMusic: string;
    volumeSFX: string;
    pfStore: string;
    latestGameId: string;
    userLatestGameId: string;
};
export declare function buildLocalStorageKey(key: string): string;
export declare function buildUserSpecificLocalStorageKey(key: string, username?: string): string;
export declare function getUserLatestGameId(_username?: string): number;
export declare function setUserLatestGameId(_gameId: number, _username?: string): void;
export {};
