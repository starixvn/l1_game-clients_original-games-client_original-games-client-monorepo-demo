import { useEffect } from "react";
export var useClickOutside = function (refs, callback) {
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (refs.every(function (ref) { return ref.current && !ref.current.contains(event.target); })) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, callback]);
};
