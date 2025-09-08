import { useEffect, useState } from "react";
import usePFStore from '@shared/stores/pf-store/pf-store";
export var useClientSeedPF = function () {
    var pfClientSeedSetting = usePFStore(function (state) { return state.pfClientSeedSetting; });
    var _a = useState(""), clientSeed = _a[0], setClientSeed = _a[1];
    useEffect(function () {
        var seed = (pfClientSeedSetting === null || pfClientSeedSetting === void 0 ? void 0 : pfClientSeedSetting.useManualClientSeed) ? pfClientSeedSetting === null || pfClientSeedSetting === void 0 ? void 0 : pfClientSeedSetting.manualClientSeed : pfClientSeedSetting === null || pfClientSeedSetting === void 0 ? void 0 : pfClientSeedSetting.randomClientSeed;
        if (!seed || String(seed).length === 0) {
            seed = (pfClientSeedSetting === null || pfClientSeedSetting === void 0 ? void 0 : pfClientSeedSetting.randomClientSeed) || "0000";
        }
        setClientSeed(seed);
    }, [pfClientSeedSetting]);
    return { clientSeed: clientSeed, setClientSeed: setClientSeed };
};
