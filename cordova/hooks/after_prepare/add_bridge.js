const fs = require("fs");
const path = require("path");

module.exports = function(ctx){

    const root = ctx.opts.projectRoot;

    const srcBridge = path.join(
        root,
        "native/android/AndroidBridge.java"
    );

    const dstBridge = path.join(
        root,
        "platforms/android/app/src/main/java/tr/wot/gameapp/AndroidBridge.java"
    );

    fs.copyFileSync(srcBridge, dstBridge);

    console.log("AndroidBridge copied");
};