declare const DevTools: any, Tolgee: any;
declare const fs: any;
declare const path: any;
declare const gameSettings: any;
declare const locales: {
    en: string;
    vi: string;
    th: string;
    id: string;
    zh_cn: string;
    zh_tw: string;
    ja: string;
};
declare function writeFile(fileName: string, content: string, extension?: string): void;
interface GameSettings {
    tolgeeNamespace?: string;
}
declare const tmpGameSettings: {
    [id: string]: GameSettings;
};
declare const tolgeeNamespaceByGameSetting: string[];
declare const namespaces: string[];
declare const tg: any;
