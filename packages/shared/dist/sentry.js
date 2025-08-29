import * as Sentry from "@sentry/nextjs";
export var setSentryUser = function (user) {
    if (user) {
        setTimeout(function () {
            try {
                Sentry.setUser(user);
            }
            catch (ex) {
                console.log(ex);
            }
        }, 5000);
    }
};
export var setCharacterName = function (name) {
    setTag({ id: "character-name", value: name });
};
var setTag = function (tag) {
    if (tag) {
        try {
            Sentry.setTag(tag.id, tag.value);
        }
        catch (ex) {
            console.log(ex);
        }
    }
};
