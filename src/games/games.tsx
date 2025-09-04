import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { getAppSettings } from "@shared/app-settings";
import { SettingEventActionType, SystemContextProvider, usePlayerContext, useSettingDispatch } from "@shared/react-contexts";
import { useBlockBetSound, usePlaceBetSound, useStartDrawSound, useStartRoundSound } from "@shared/react-hooks";
import { GameSound } from "@shared/components/game-base/type";
import GameLoading from "@shared/components/game-components/game-loading";
import { getChipSettings } from "@shared/services/user-setting-service";
import { Props } from "./type";
import { LoadingSpinner } from "@shared/components/game-components/game-loading/loading-spinner";

const LoadingGameComponent = () => (
    <>
        <GameLoading />
        <LoadingSpinner />
    </>
);

// SeBall removed
import { GameRegistry } from "./registry";

export const Games: React.FC<Props> = ({ setApiErrorMessage, userStakeLevel, updateUserStakeLevel, openGameId }) => {
    const { theme } = useTheme();
    const { session } = usePlayerContext();
    const settingDispatch = useSettingDispatch();

    useEffect(() => {
        (async () => {
            const chipSettings = await getChipSettings(session);
            settingDispatch({
                type: SettingEventActionType.UPDATE_CHIPS,
                payload: {
                    chipSettings: chipSettings?.chips,
                },
            });
        })();
        // Dependencies stable for session init
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const gameSound: GameSound = {
        playPlaceBetSound: usePlaceBetSound(),
        startPlaceBetSound: useStartDrawSound(),
        startRoundSound: useStartRoundSound(),
        blockBetSound: useBlockBetSound(),
    };

    const getGameComponentById = (gameId: number) => {
        const appSettings = getAppSettings();
        const { gameSettings } = appSettings;

        const gameProps = {
            ...gameSettings[gameId],
            gameSound,
            setApiErrorMessage: setApiErrorMessage,
            theme,
            userStakeLevel,
            updateUserStakeLevel,
        };

        const loader = GameRegistry[gameId];
        if (!loader) return null;
        const DynGame = dynamic(loader as any, { loading: () => <LoadingGameComponent /> });
        return <DynGame key={`game-${gameId}`} {...gameProps} />;
    };

    const defaultGameId = Number(process.env.NEXT_PUBLIC_DEFAULT_GAME_ID || 0);
    const effectiveGameId = openGameId || defaultGameId;

    const gameComponent = getGameComponentById(effectiveGameId);

    return <SystemContextProvider>{gameComponent}</SystemContextProvider>;
};

export default Games;
