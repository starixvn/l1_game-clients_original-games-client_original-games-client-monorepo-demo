import { useEffect, useRef } from "react";
export function usePWAWoker() {
    var workerRef = useRef(null);
    useEffect(function () {
        try {
            if (window.Worker) {
                workerRef.current = new Worker("/worker.js", { type: "module" });
                workerRef.current.onmessage = function (evt) { return workerRef.current.postMessage(evt.data); };
            }
            else {
                console.log("Your browser doesn't support web workers.");
            }
        }
        catch (error) {
            console.log(error);
        }
        return function () {
            workerRef.current && workerRef.current.terminate();
        };
    }, []);
    return workerRef;
}
