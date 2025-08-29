import { AuthorizeResponse } from "sc-user-service-client/dist/auth";
import { LobbyConfigs } from "sc-user-service-client/dist/lobby";
export declare const DURATION_HOLD_SPLASH_SCREEN = 1000;
declare global {
    interface Window {
        gtag?: (command: string, eventName: string, parameters: any) => void;
    }
}
export declare const getAndHandleBannerOffer: (authorizeInfo: AuthorizeResponse, lobbyConfigs: LobbyConfigs, callbackFn: Function) => void;
export declare const updateProgressBar: (percentage: number, progressBarId?: string) => void;
interface PreloadResourcesProps {
    setIsDonePreload: () => void;
    gameId: number;
    bannerId?: number;
    locale?: string;
    gameIdsIcon?: number[];
    cancelPreload?: boolean;
    durationDelayDonePreload?: number;
    progressBarId?: string;
    onProgressUpdate?: (progress: number) => void;
}
declare const PreloadResources: React.FC<PreloadResourcesProps>;
export default PreloadResources;
