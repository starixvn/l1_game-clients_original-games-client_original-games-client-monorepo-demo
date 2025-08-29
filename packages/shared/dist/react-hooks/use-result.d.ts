import { Round, RoundState } from "../../components/game-base/type";
interface UseResultProps<R> {
    result: R;
    roundState: RoundState;
    roundHistory: Round<R | object, object>[];
    wholeRound?: number;
}
declare const useResult: <R>(props: UseResultProps<R>) => R;
export default useResult;
