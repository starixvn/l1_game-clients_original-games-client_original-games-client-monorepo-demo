import React, { useEffect } from "react";
import { JSX } from "react";
import styles from "./baccarat-betting-block.module.scss";

interface BaccaratBettingBlockProps {
    className?: string;
}

const BaccaratBettingBlock: React.FC<BaccaratBettingBlockProps> = ({ className }) => {
    // Dev diagnostics for CSS modules
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            const missingClasses = [];
            const expectedClasses = [
                "bettingBlock",
                "bettingArea",
                "playerBet",
                "bankerBet",
                "tieBet",
                "betButton",
                "betAmount"
            ];

            expectedClasses.forEach(className => {
                if (!styles[className]) {
                    missingClasses.push(className);
                }
            });

            if (missingClasses.length > 0) {
                console.warn(
                    `[BaccaratBettingBlock] Missing CSS module classes: ${missingClasses.join(", ")}`
                );
            }
        }
    }, []);

    return (
        <div className={`${styles.bettingBlock} ${className || ""}`}>
            <div className={styles.bettingArea}>
                <h3>Baccarat Betting</h3>

                <div className={styles.betOptions}>
                    <div className={styles.playerBet}>
                        <button className={styles.betButton}>
                            <span>Player</span>
                            <span className={styles.betAmount}>1:1</span>
                        </button>
                    </div>

                    <div className={styles.bankerBet}>
                        <button className={styles.betButton}>
                            <span>Banker</span>
                            <span className={styles.betAmount}>0.95:1</span>
                        </button>
                    </div>

                    <div className={styles.tieBet}>
                        <button className={styles.betButton}>
                            <span>Tie</span>
                            <span className={styles.betAmount}>8:1</span>
                        </button>
                    </div>
                </div>

                <div className={styles.betControls}>
                    <p>Select your bet and amount</p>
                </div>
            </div>
        </div>
    );
};

export default BaccaratBettingBlock;
