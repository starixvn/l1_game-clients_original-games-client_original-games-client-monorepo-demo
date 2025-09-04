import React, { useEffect } from "react";
import { JSX } from "react";
import styles from "./baccarat-round-history.module.scss";

interface BaccaratRoundHistoryProps {
    className?: string;
    history?: Array<{
        roundId: number;
        player: number[];
        banker: number[];
        winner: 'player' | 'banker' | 'tie';
    }>;
}

const BaccaratRoundHistory: React.FC<BaccaratRoundHistoryProps> = ({ className, history }) => {
    // Dev diagnostics for CSS modules
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            const missingClasses = [];
            const expectedClasses = [
                "roundHistory",
                "historyArea",
                "historyList",
                "historyItem",
                "roundNumber",
                "result",
                "player",
                "banker",
                "tie"
            ];

            expectedClasses.forEach(className => {
                if (!styles[className]) {
                    missingClasses.push(className);
                }
            });

            if (missingClasses.length > 0) {
                console.warn(
                    `[BaccaratRoundHistory] Missing CSS module classes: ${missingClasses.join(", ")}`
                );
            }
        }
    }, []);

    // Mock history for placeholder
    const mockHistory = history || [
        { roundId: 1, player: [7, 2], banker: [6, 3], winner: 'tie' as const },
        { roundId: 2, player: [9, 1], banker: [8, 2], winner: 'player' as const },
        { roundId: 3, player: [5, 4], banker: [6, 4], winner: 'banker' as const },
        { roundId: 4, player: [3, 7], banker: [2, 8], winner: 'tie' as const },
        { roundId: 5, player: [1, 9], banker: [3, 7], winner: 'player' as const },
    ];

    const getBaccaratValue = (value: number) => {
        if (value >= 10) return 0;
        return value;
    };

    const getTotal = (cards: number[]) => {
        const total = cards.reduce((sum, card) => sum + getBaccaratValue(card), 0);
        return total % 10;
    };

    return (
        <div className={`${styles.roundHistory} ${className || ""}`}>
            <div className={styles.historyArea}>
                <h3>Round History</h3>

                <div className={styles.historyList}>
                    {mockHistory.map((round) => (
                        <div key={round.roundId} className={styles.historyItem}>
                            <div className={styles.roundNumber}>
                                Round {round.roundId}
                            </div>
                            <div className={styles.result}>
                                <span className={styles.player}>
                                    P: {getTotal(round.player)}
                                </span>
                                <span className={styles.banker}>
                                    B: {getTotal(round.banker)}
                                </span>
                                <span className={`${styles.winner} ${styles[round.winner]}`}>
                                    {round.winner.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BaccaratRoundHistory;
