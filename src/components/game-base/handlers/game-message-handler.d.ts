import { MessageTransmitterType } from "../../../_shared/helpers/message-transmitter/type";
export declare const messageEventType: {
    GAME_CONFIG: string;
    ROUND_HISTORY: string;
    REMAINING_TIME: string;
    CLIENT_REMAINING_TIME: string;
    FINISH: string;
    STATUS: string;
    USER: string;
    OWN_BETS: string;
    END_BET: string;
    API_ERROR: string;
    ERROR_CODE: string;
    USER_STAKE_LEVEL: string;
    TOTAL_BETS: string;
    ODDS: string;
    UNDER_MAINTENANCE: string;
    ROUND_STATE: string;
    SOCKET_CONNECT_ERROR: string;
    SOCKET_CONNECTED: string;
    SOCKET_DISCONNECTED: string;
    ROUND_DATA: string;
    SIGNED_IN: string;
    NOT_PERMITTED_TO_PLAY: string;
    BET_PERCENTAGE: string;
    PLAYER_BET_COUNT: string;
    GAME_DESTROY: string;
    SEND_SOCKET_MESSAGE: string;
    TOGGLE_BETHISTORY: string;
    BET_HISTORY: string;
    UPDATE_PLAYER_BALANCE: string;
    CLEAR_GAME_TIMEOUT_AND_INTERVAL: string;
    SEND_SOCKET_MESSAGE_WITH_CLIENT_SEED: string;
    ROUND_ID: string;
    CLIENT_SEED_DETAIL: string;
    SAVE_PF_SETTING: string;
    SAVE_PF_SETTING_FROM_TURN_ID_HANLDER: string;
    SYNC_OWN_BETS_TO_PF: string;
    START_PLACE_BET: string;
    PLAYER_RESULT_BOARD: string;
    PF: string;
    END_PLACE_BET: string;
};
export declare class GameMessageHandler {
    private readonly dispatch;
    private readonly messageTransmitter?;
    constructor(dispatch: Function, messageTransmitter?: MessageTransmitterType);
    registerSocketEvents: () => void;
    getMessageTransmitter(): MessageTransmitterType;
    register: (eventType: string, handler: Function) => string;
    removeHandler: (handlerId: string) => any;
    broadcastGameMessage: (message: any) => void;
    broadcastGameEvent: (message: any) => void;
    handleGameConfigs: ({ gameConfigs }: {
        gameConfigs: any;
    }) => void;
    handleOdds: ({ odds }: {
        odds: any;
    }) => void;
    handleSignedIn: () => void;
    handleRoundData: ({ roundData }: {
        roundData: any;
    }) => void;
    handleClientSeedDetail: ({ clientSeedDetail }: {
        clientSeedDetail: any;
    }) => void;
    clearAllHandlers: () => void;
}
