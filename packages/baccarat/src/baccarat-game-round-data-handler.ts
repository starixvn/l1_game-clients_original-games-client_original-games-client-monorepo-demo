import { GameRoundDataHandler } from "@shared/components/game-base/handlers/game-round-data-handler";

export class BaccaratGameRoundDataHandler extends GameRoundDataHandler {
    buildGameRoundDataAfterReceiveFinishEvent(previousRoundData: any, result: any, roundId: number) {
        const normalized = this.normalizeResult(result);

        const resultRoundData = {
            player: normalized.player,
            banker: normalized.banker,
            winner: normalized.winner,
            roundId,
            timestamp: new Date().toISOString(),
        };

        const mergedHistory = (previousRoundData?.history || []).concat([{ ...resultRoundData }]);

        const statistics = this.calculateStatistics(previousRoundData?.statistics, normalized);

        return {
            history: mergedHistory,
            last: resultRoundData,
            roundId,
            timestamp: resultRoundData.timestamp,
            gameType: "baccarat",
            statistics,
        };
    }

    private normalizeResult(result: any) {
        const player = (result?.playerCards || result?.player || []) as number[];
        const banker = (result?.bankerCards || result?.banker || []) as number[];
        const winner = (result?.winner || this.calculateWinner(player, banker)) as "player" | "banker" | "tie";
        return { player, banker, winner };
    }

    private calculateWinner(player: number[], banker: number[]): "player" | "banker" | "tie" {
        const p = this.getBaccaratTotal(player);
        const b = this.getBaccaratTotal(banker);
        if (p > b) return "player";
        if (b > p) return "banker";
        return "tie";
    }

    private getBaccaratTotal(cards: number[]): number {
        const toPoint = (v: number) => (v >= 10 ? 0 : v);
        const sum = (cards || []).reduce((acc, v) => acc + toPoint(v), 0);
        return sum % 10;
    }

    private calculateStatistics(prevStats: any, normalized: { player: number[]; banker: number[]; winner: string }) {
        const stats = {
            wins: {
                player: 0,
                banker: 0,
                tie: 0,
            },
            totals: {
                player: this.getBaccaratTotal(normalized.player),
                banker: this.getBaccaratTotal(normalized.banker),
            },
            rounds: 1,
        } as any;

        if (prevStats) {
            stats.wins.player = prevStats.wins?.player || 0;
            stats.wins.banker = prevStats.wins?.banker || 0;
            stats.wins.tie = prevStats.wins?.tie || 0;
            stats.rounds = (prevStats.rounds || 0) + 1;
        }

        if (normalized.winner === "player") stats.wins.player += 1;
        if (normalized.winner === "banker") stats.wins.banker += 1;
        if (normalized.winner === "tie") stats.wins.tie += 1;

        return stats;
    }
}

export default BaccaratGameRoundDataHandler;


