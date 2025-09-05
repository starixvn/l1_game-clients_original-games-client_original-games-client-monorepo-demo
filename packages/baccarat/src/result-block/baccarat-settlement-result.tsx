import React, { useEffect, useState } from "react";
import { useGameStateContext } from "@shared/react-contexts/game-state-context/game-state-context";
import { BaccaratGameLogic, CARD_TIMINGS } from "../baccarat-helper";
import styles from "./baccarat-settlement-result.module.scss";

interface CardOrder {
    order: number;
    value: number;
    type: 'player' | 'banker';
    accumulatedScore: number;
    playerHasThirdCard?: boolean;
}

interface Result {
    player: {
        card1: { card: number; type: number };
        card2: { card: number; type: number };
        card3?: { card: number; type: number };
    };
    banker: {
        card1: { card: number; type: number };
        card2: { card: number; type: number };
        card3?: { card: number; type: number };
    };
    winner: 'player' | 'banker' | 'tie';
    playerPair?: boolean;
    bankerPair?: boolean;
    natural?: boolean;
}

interface BaccaratSettlementResultProps {
    className?: string;
    isAnimationResult?: boolean;
    isShowResult?: boolean;
    isFinishShowResult?: boolean;
    isHideAllCards?: boolean;
}

const DEFAULT_RESULT: Result = {
    banker: {
        card1: { card: 0, type: 0 },
        card2: { card: 0, type: 0 },
    },
    player: {
        card1: { card: 0, type: 1 },
        card2: { card: 0, type: 1 },
    },
    winner: 'tie',
};

const BaccaratCard: React.FC<{
    card: CardOrder;
    className?: string;
    isShowResult: boolean;
    type: 'player' | 'banker';
    onCardFlip?: (card: CardOrder, accumulatedScore: number) => void;
    playResultAnimation?: boolean;
}> = ({ card, className, isShowResult, type, onCardFlip, playResultAnimation }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [flipAnimationClass, setFlipAnimationClass] = useState('');

    useEffect(() => {
        if (isFlipped && playResultAnimation) {
            setFlipAnimationClass(styles['flip']);
        } else if (isFlipped) {
            setFlipAnimationClass(`${styles['flip']} ${styles['no-animation']}`);
        } else {
            setFlipAnimationClass('');
        }
    }, [isFlipped, playResultAnimation]);

    // Add rotation class based on card order
    const getRotationClass = (order: number) => {
        if (order === 5) return styles['rotate-right']; // Player's third card
        if (order === 6) return styles['rotate-left']; // Banker's third card
        return '';
    };

    // Add banker third card class when it's the third card and player has only 2 cards
    const getBankerThirdCardClass = (order: number) => {
        if (order === 5 && !card.playerHasThirdCard) {
            return styles['banker-third-card'];
        }
        return '';
    };

    useEffect(() => {
        if (isShowResult) {
            // Sequential card opening
            let delay;
            switch (card.order) {
                case 1:
                    delay = playResultAnimation ? CARD_TIMINGS.CARD_1 : 0;
                    break;
                case 3:
                    delay = playResultAnimation ? CARD_TIMINGS.CARD_3 : 0;
                    break;
                case 2:
                    delay = playResultAnimation ? CARD_TIMINGS.CARD_2 : 0;
                    break;
                case 4:
                    delay = playResultAnimation ? CARD_TIMINGS.CARD_4 : 0;
                    break;
                case 5:
                    delay = playResultAnimation ? CARD_TIMINGS.CARD_5 : 0;
                    break;
                case 6:
                    delay = playResultAnimation ? CARD_TIMINGS.CARD_6 : 0;
                    break;
                default:
                    delay = 0;
            }

            const flipTimer = setTimeout(() => {
                setIsFlipped(true);
                if (onCardFlip) {
                    onCardFlip(card, card.accumulatedScore);
                }
            }, delay);

            return () => clearTimeout(flipTimer);
        } else {
            setIsFlipped(false);
        }
    }, [isShowResult, card, onCardFlip, playResultAnimation]);

    const getCardDisplayValue = (value: number): string => {
        if (value === 0) return ''; // Empty card
        if (value === 1) return 'A';
        if (value === 11) return 'J';
        if (value === 12) return 'Q';
        if (value === 13) return 'K';
        return value.toString();
    };

    const cardOrderClass = styles[`card${card.order}`];
    const cardClassName = `${styles.card} ${styles[type]} ${cardOrderClass} ${flipAnimationClass} ${getRotationClass(card.order)} ${getBankerThirdCardClass(card.order)} ${className || ''}`;

    return (
        <div className={cardClassName}>
            <div className={styles['rotate-card']}>
                <div className={styles.cardFace}>
                    <div className={styles['card-back']}>
                        <div className={styles['card-back-content']}>
                            {/* Card back design */}
                        </div>
                    </div>
                    <div className={styles['card-front']}>
                        <div className={styles['card-value']}>
                            {getCardDisplayValue(card.value)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CardDisplay: React.FC<{
    result: Result;
    isShowResult: boolean;
    isAnimationResult: boolean;
    isFinishShowResult: boolean;
    isHideAllCards: boolean;
}> = ({ result, isShowResult, isAnimationResult, isFinishShowResult, isHideAllCards }) => {
    const [playerScore, setPlayerScore] = useState(0);
    const [bankerScore, setBankerScore] = useState(0);

    // Convert result to card order format
    const getCardOrder = (): CardOrder[] => {
        const cards: CardOrder[] = [];
        let order = 1;

        const addCard = (cardData: { card: number; type: number }, type: 'player' | 'banker', accumulatedCards: number[]) => {
            if (cardData.card > 0) {
                cards.push({
                    order: order++,
                    value: cardData.card,
                    type,
                    accumulatedScore: BaccaratGameLogic.getBaccaratTotal(accumulatedCards),
                });
            }
        };

        // First cards
        addCard(result.player.card1, 'player', [result.player.card1.card]);
        addCard(result.banker.card1, 'banker', [result.banker.card1.card]);

        // Second cards
        addCard(result.player.card2, 'player', [result.player.card1.card, result.player.card2.card]);
        addCard(result.banker.card2, 'banker', [result.banker.card1.card, result.banker.card2.card]);

        // Third cards
        if (result.player.card3?.card > 0) {
            const playerCards = [result.player.card1.card, result.player.card2.card, result.player.card3.card];
            cards.push({
                order: order++,
                value: result.player.card3.card,
                type: 'player',
                accumulatedScore: BaccaratGameLogic.getBaccaratTotal(playerCards),
                playerHasThirdCard: true,
            });
        }

        if (result.banker.card3?.card > 0) {
            const bankerCards = [result.banker.card1.card, result.banker.card2.card, result.banker.card3.card];
            cards.push({
                order: order++,
                value: result.banker.card3.card,
                type: 'banker',
                accumulatedScore: BaccaratGameLogic.getBaccaratTotal(bankerCards),
                playerHasThirdCard: result.player.card3?.card > 0,
            });
        }

        return cards;
    };

    const handleCardFlip = (card: CardOrder, accumulatedScore: number) => {
        if (card.type === 'player') {
            setPlayerScore(accumulatedScore);
        } else {
            setBankerScore(accumulatedScore);
        }
    };

    const cards = getCardOrder();

    if (isHideAllCards) {
        return (
            <div className={styles['settlement-container']}>
                <div className={styles['cards-display']}>
                    <div className={styles['player-section']}>
                        <h4>Player</h4>
                        <div className={styles['cards-row']}>
                            {[1, 2, 3].map((cardNum) => (
                                <div key={`player-back-${cardNum}`} className={`${styles.card} ${styles['card-back']}`}>
                                    <div className={styles['card-back-content']}></div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.total}>Total: ?</div>
                    </div>

                    <div className={styles['banker-section']}>
                        <h4>Banker</h4>
                        <div className={styles['cards-row']}>
                            {[1, 2, 3].map((cardNum) => (
                                <div key={`banker-back-${cardNum}`} className={`${styles.card} ${styles['card-back']}`}>
                                    <div className={styles['card-back-content']}></div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.total}>Total: ?</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['settlement-container']}>
            <div className={styles['cards-display']}>
                <div className={styles['player-section']}>
                    <h4>Player</h4>
                    <div className={styles['cards-row']}>
                        {cards.filter(card => card.type === 'player').map((card) => (
                            <BaccaratCard
                                key={`player-${card.order}`}
                                card={card}
                                type="player"
                                isShowResult={isShowResult}
                                playResultAnimation={isAnimationResult}
                                onCardFlip={handleCardFlip}
                            />
                        ))}
                    </div>
                    <div className={styles.total}>
                        Total: {isShowResult ? playerScore : '?'}
                    </div>
                </div>

                <div className={styles['banker-section']}>
                    <h4>Banker</h4>
                    <div className={styles['cards-row']}>
                        {cards.filter(card => card.type === 'banker').map((card) => (
                            <BaccaratCard
                                key={`banker-${card.order}`}
                                card={card}
                                type="banker"
                                isShowResult={isShowResult}
                                playResultAnimation={isAnimationResult}
                                onCardFlip={handleCardFlip}
                            />
                        ))}
                    </div>
                    <div className={styles.total}>
                        Total: {isShowResult ? bankerScore : '?'}
                    </div>
                </div>
            </div>

            {isShowResult && (
                <div className={`${styles.winner} ${styles[result.winner]}`}>
                    <div className={styles['result-text']}>
                        Winner: {result.winner.toUpperCase()}
                        {result.natural && <span className={styles.natural}> (Natural)</span>}
                        {result.playerPair && <span className={styles.pair}> (Player Pair)</span>}
                        {result.bankerPair && <span className={styles.pair}> (Banker Pair)</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

const BaccaratSettlementResult: React.FC<BaccaratSettlementResultProps> = ({
    className,
    isAnimationResult = false,
    isShowResult = false,
    isFinishShowResult = false,
    isHideAllCards = false,
}) => {
    const gameState = useGameStateContext();
    const [result, setResult] = useState<Result>(DEFAULT_RESULT);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get result from game state
        if (gameState?.last) {
            const gameResult = gameState.last;
            const playerCards = gameResult.player || [];
            const bankerCards = gameResult.banker || [];

            // Handle both old format (number arrays) and new format (card objects)
            const getCardValue = (card: any, index: number, defaultType: number) => {
                if (typeof card === 'number') {
                    return { card: card || 0, type: defaultType };
                } else if (card && typeof card === 'object' && card.card !== undefined) {
                    return { card: card.card || 0, type: card.type || defaultType };
                }
                return { card: 0, type: defaultType };
            };

            const newResult: Result = {
                player: {
                    card1: getCardValue(playerCards[0], 0, 1),
                    card2: getCardValue(playerCards[1], 1, 1),
                    card3: playerCards[2] ? getCardValue(playerCards[2], 2, 1) : undefined,
                },
                banker: {
                    card1: getCardValue(bankerCards[0], 0, 0),
                    card2: getCardValue(bankerCards[1], 1, 0),
                    card3: bankerCards[2] ? getCardValue(bankerCards[2], 2, 0) : undefined,
                },
                winner: gameResult.winner || 'tie',
                playerPair: gameResult.playerPair || BaccaratGameLogic.hasPair(playerCards),
                bankerPair: gameResult.bankerPair || BaccaratGameLogic.hasPair(bankerCards),
                natural: gameResult.isNatural || BaccaratGameLogic.isNatural(playerCards) || BaccaratGameLogic.isNatural(bankerCards),
            };

            setResult(newResult);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [gameState]);

    if (isLoading) {
        return (
            <div className={`${styles['settlement-container']} ${className || ''}`}>
                <div className={styles.loading}>Loading game results...</div>
            </div>
        );
    }

    return (
        <div className={`${styles['settlement-container']} ${className || ''}`}>
            <CardDisplay
                result={result}
                isShowResult={isShowResult}
                isAnimationResult={isAnimationResult}
                isFinishShowResult={isFinishShowResult}
                isHideAllCards={isHideAllCards}
            />
        </div>
    );
};

export default BaccaratSettlementResult;
