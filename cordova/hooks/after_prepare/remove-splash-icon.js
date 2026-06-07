module.exports = function (ctx) {
    const fs = require("fs");
    const path = require("path");

    const file = path.join(
        ctx.opts.projectRoot,
        "platforms/android/app/src/main/res/values/themes.xml"
    );

    let xml = fs.readFileSync(file, "utf8");

    xml = xml.replace(
        /windowSplashScreenAnimatedIcon.*\n/,
        'windowSplashScreenAnimatedIcon">@null</item>\n'
    );

    fs.writeFileSync(file, xml);
};