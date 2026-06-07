package tr.wot.gameapp;

import android.app.Activity;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;

import java.io.File;
import java.io.FileOutputStream;

public class AndroidBridge {

    Activity activity;

    public AndroidBridge(Activity activity) {
        this.activity = activity;
    }
	@JavascriptInterface
	public void quit() {

		activity.runOnUiThread(() -> {
			activity.finishAffinity();
			System.exit(0);
		});

	}
    @JavascriptInterface
    public void test() {

        activity.runOnUiThread(() -> {
            Toast.makeText(
                activity,
                "Bridge çalıştı",
                Toast.LENGTH_LONG
            ).show();
        });

    }
	
	@JavascriptInterface
	public void share(String text, String base64) {

		activity.runOnUiThread(() -> {

			new Thread(() -> {

				try {

					byte[] decoded = Base64.decode(base64, Base64.DEFAULT);

					File file = new File(activity.getCacheDir(), "share.png");

					FileOutputStream fos = new FileOutputStream(file);
					fos.write(decoded);
					fos.flush();
					fos.close();

					Uri uri = androidx.core.content.FileProvider.getUriForFile(
							activity,
							activity.getPackageName() + ".cdv.core.file.provider",
							file
					);

					Intent intent = new Intent(Intent.ACTION_SEND);
					intent.setType("image/png");
					intent.putExtra(Intent.EXTRA_TEXT, text);
					intent.putExtra(Intent.EXTRA_STREAM, uri);
					intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

					activity.startActivity(
							Intent.createChooser(intent, "Share")
					);

				} catch (Exception e) {
					e.printStackTrace();
				}

			}).start();

		});
	}
}