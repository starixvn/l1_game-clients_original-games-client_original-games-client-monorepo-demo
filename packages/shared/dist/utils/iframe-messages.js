export var IFRAME_MESSAGES = {
    BACK_TO_HOME: "backToHome",
};
export var sendMessageToParent = function (action, payload) {
    try {
        if (window.parent && window.parent !== window) {
            var message = { action: action, payload: payload };
            window.parent.postMessage(message, "*");
        }
        else {
            console.warn("No parent window found - not running in iframe");
        }
    }
    catch (error) {
        console.error("Error sending message to parent:", error);
    }
};
