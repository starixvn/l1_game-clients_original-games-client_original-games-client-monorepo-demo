import { ChipInfo } from "sc-user-service-client/dist/setting";
export interface SettingContextModel {
    isShowedSetting: boolean;
    enabledMusic: boolean;
    enabledSound?: boolean;
    isShowAvatarGallery: boolean;
    chipSettings: ChipInfo[];
    volumeMusic: number;
    volumeSFX: number;
}
export declare const initialSettingContextModel: () => SettingContextModel;
