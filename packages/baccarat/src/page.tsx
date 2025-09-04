import { withRouter } from "next/router";
import { JSX } from "react";

import GameBase from "@shared/components/game-base";
import { GameMessageHandler } from "@shared/components/game-base/handlers";
import { GameBaseHandlers, GameBaseProps, GameBaseState } from "@shared/components/game-base/type";
import { RoundGameSoundHandler } from "@shared/components/round-base/round-game-sound-handler";
import { RoundStateHandler } from "@shared/components/round-base/round-state-handler";
import { useTranslator } from "@shared/react-hooks";
import { useSystemContext, useSystemDispatch } from "@shared/react-contexts";
import {
    GameStateProvider,
    useGameStateContext,
    useGameStatesDispatch,
} from "@shared/react-contexts/game-state-context/game-state-context";

import BaccaratBettingBlock from "./betting-block/baccarat-betting-block";
import BaccaratResultBlock from "./result-block/baccarat-result-block";
import BaccaratRoundHistory from "./round-history/baccarat-round-history";

class Baccarat extends GameBase<GameBaseProps, GameBaseState> {
    constructor(props: GameBaseProps) {
        const gameMessageHandler = new GameMessageHandler(props.dispatch);
        const handlers: GameBaseHandlers = {
            roundStateHandler: new RoundStateHandler(),
            gameMessageHandler,
            gameRoundDataHandler: undefined as unknown as any,
            gameSoundHandler: new RoundGameSoundHandler({ gameSound: () => props.gameSound }),
        };
        super(props, handlers);
    }

    renderRoundHistory(): JSX.Element {
        return <BaccaratRoundHistory />;
    }
    renderResultBlock(): JSX.Element {
        return <BaccaratResultBlock />;
    }
    renderBettingBlock(): JSX.Element {
        return <BaccaratBettingBlock />;
    }
}

const BaccaratFC = (props: any) => {
    const tolgeeNamespace = props["tolgeeNamespace"];
    const { t } = useTranslator([tolgeeNamespace]);
    return (
        <Baccarat
            {...props}
            {...{
                dispatch: useGameStatesDispatch(),
                gameStateContextModel: useGameStateContext(),
                systemContextModel: useSystemContext(),
                systemDispatch: useSystemDispatch(),
                translate: t,
                tolgeeNamespace,
            }}
        />
    );
};

const BaccaratWrapper = (props: any) => (
    <GameStateProvider>
        <BaccaratFC {...props} />
    </GameStateProvider>
);

export default withRouter(BaccaratWrapper);


