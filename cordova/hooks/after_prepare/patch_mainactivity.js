const fs = require("fs");

module.exports = function (ctx) {
	
    console.log("PATCH MAINACTIVITY ÇALIŞTI");
    const file =
        "platforms/android/app/src/main/java/tr/wot/gameapp/MainActivity.java";

    if (!fs.existsSync(file)) {
        console.log("MainActivity not found");
        return;
    }

    let code = fs.readFileSync(file, "utf8");

    // already patched check
    if (code.includes("attachBridge()")) {
        console.log("MainActivity already patched");
        return;
    }

    // 1. import ekle
    if (!code.includes("android.view.View")) {

        code = code.replace(
            "import org.apache.cordova.*;",
            `import org.apache.cordova.*;
import android.view.View;
import android.webkit.WebView;`
        );
    }

    // 2. onCreate içine attachBridge ekle
    code = code.replace(
        "loadUrl(launchUrl);",
        `loadUrl(launchUrl);
\t\tattachBridge();`
    );

    // 3. attachBridge methodunu EN SONA ekle
    const attachBridge = `
\tprivate void attachBridge() {
\t\ttry {
\t\t\tView v1 = appView.getEngine().getView();
\t\t\tif (v1 instanceof WebView) {
\t\t\t\t((WebView) v1).addJavascriptInterface(
\t\t\t\t\tnew AndroidBridge(this),
\t\t\t\t\t"AndroidBridge"
\t\t\t\t);
\t\t\t\treturn;
\t\t\t}
\t\t} catch (Exception e) {
\t\t\te.printStackTrace();
\t\t}
\t\ttry {
\t\t\tView v2 = appView.getView();
\t\t\tif (v2 instanceof WebView) {
\t\t\t\t((WebView) v2).addJavascriptInterface(
\t\t\t\t\tnew AndroidBridge(this),
\t\t\t\t\t"AndroidBridge"
\t\t\t\t);
\t\t\t}
\t\t} catch (Exception e) {
\t\t\te.printStackTrace();
\t\t}
\t}
`;

    // class kapanışından önce ekle
    code = code.replace(
        /\}\s*$/,
        attachBridge + "\n}"
    );

    fs.writeFileSync(file, code, "utf8");

    console.log("MainActivity patched to final structure");
};