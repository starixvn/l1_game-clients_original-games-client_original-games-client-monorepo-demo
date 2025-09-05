import { IUserServiceClient } from "sc-user-service-client/dist";
import { getAppSettings } from "@shared/app-settings";
import { buildUrlWithPath } from "@shared/helpers/url-helper";

let UserServiceClient;

if (typeof window !== "undefined") {
    const { default: UserServiceClientModule } = require("sc-user-service-client");
    UserServiceClient = UserServiceClientModule;
}

export class UserClientCommunication {
    private static instance: IUserServiceClient | null = null;

    public static getUserClientInstance(): IUserServiceClient | null {
        if (!this.instance) {
            this.instance = typeof window !== "undefined" ? new UserServiceClient(this.getUserServiceUrl()) : null;
        }
        return this.instance;
    }

    private static getUserServiceUrl(): string {
        const { proxy } = getAppSettings();
        const basePath = proxy.path || "";
        const relativePath = `${basePath}/user`;

        // When running locally (standalone dev), prefer relative URLs so Next.js rewrites can proxy them
        if (typeof window !== "undefined") {
            const host = window.location.hostname;
            if (host === "localhost" || host === "127.0.0.1") {
                return relativePath;
            }
        }

        // Fallback to absolute URL for non-local environments
        return buildUrlWithPath(relativePath);
    }
}
export default UserClientCommunication;
