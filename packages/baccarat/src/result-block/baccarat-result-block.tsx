import React, { useEffect } from "react";
import styles from "./baccarat-result-block.module.scss";

interface BaccaratResultBlockProps {
    className?: string;
    result?: {
        player: number[];
        banker: number[];
        winner: 'player' | 'banker' | 'tie';
    };
}

const BaccaratResultBlock: React.FC<BaccaratResultBlockProps> = ({ className, result }) => {
    // Dev diagnostics for CSS modules
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            const missingClasses = [];
            const expectedClasses = [
                "resultBlock",
                "resultArea",
                "cardsDisplay",
                "playerCards",
                "bankerCards",
                "card",
                "winner",
                "resultText"
            ];

            expectedClasses.forEach(className => {
                if (!styles[className]) {
                    missingClasses.push(className);
                }
            });

            if (missingClasses.length > 0) {
                console.warn(
                    `[BaccaratResultBlock] Missing CSS module classes: ${missingClasses.join(", ")}`
                );
            }
        }
    }, []);

    // Mock result for placeholder
    const mockResult = result || {
        player: [7, 2], // 9 points
        banker: [6, 3], // 9 points  
        winner: 'tie' as const
    };

    const getCardValue = (value: number) => {
        if (value === 1) return 'A';
        if (value === 11) return 'J';
        if (value === 12) return 'Q';
        if (value === 13) return 'K';
        return value.toString();
    };

    const getBaccaratValue = (value: number) => {
        if (value >= 10) return 0;
        return value;
    };

    const getTotal = (cards: number[]) => {
        const total = cards.reduce((sum, card) => sum + getBaccaratValue(card), 0);
        return total % 10;
    };

    return (
        <div className={`${styles.resultBlock} ${className || ""}`}>
            <div className={styles.resultArea}>
                <h3>Game Result</h3>

                <div className={styles.cardsDisplay}>
                    <div className={styles.playerCards}>
                        <h4>Player</h4>
                        <div className={styles.cardRow}>
                            {mockResult.player.map((card, index) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <div key={index} className={styles.card}>
                                    {getCardValue(card)}
                                </div>
                            ))}
                        </div>
                        <div className={styles.total}>Total: {getTotal(mockResult.player)}</div>
                    </div>

                    <div className={styles.bankerCards}>
                        <h4>Banker</h4>
                        <div className={styles.cardRow}>
                            {mockResult.banker.map((card, index) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <div key={index} className={styles.card}>
                                    {getCardValue(card)}
                                </div>
                            ))}
                        </div>
                        <div className={styles.total}>Total: {getTotal(mockResult.banker)}</div>
                    </div>
                </div>

                <div className={`${styles.winner} ${styles[mockResult.winner]}`}>
                    <div className={styles.resultText}>
                        Winner: {mockResult.winner.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaccaratResultBlock;
