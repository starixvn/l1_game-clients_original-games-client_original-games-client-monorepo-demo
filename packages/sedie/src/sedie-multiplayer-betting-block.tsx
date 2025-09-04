import dynamic from "next/dynamic";
import { FC } from "react";

import SeDieMultiplayerBetOptions from "./bet-options/sedie-multiplayer-bet-options";

const WinningBalanceEffect = dynamic(() => import("@shared/components/game-components/balance-effect/winning-balance-effect"));

const SeDieMultiplayerBettingBlock: FC = () => {
    return (
        <div className="relative">
            <SeDieMultiplayerBetOptions />
            <WinningBalanceEffect />
        </div>
    );
};

export default SeDieMultiplayerBettingBlock;
