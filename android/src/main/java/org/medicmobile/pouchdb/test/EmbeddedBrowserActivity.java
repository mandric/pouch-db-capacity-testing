package org.medicmobile.pouchdb.test;

import android.app.*;
import android.content.*;
import android.webkit.*;
import android.os.*;
import android.view.*;

import java.util.regex.*;

import static org.medicmobile.pouchdb.test.BuildConfig.*;

public class EmbeddedBrowserActivity extends Activity {
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		WebView container = (WebView) findViewById(R.id.WebViewContainer);
		container.getSettings().setJavaScriptEnabled(true);
		container.setWebViewClient(new WebViewClient() {
			public boolean shouldOverrideUrlLoading(WebView v, String url) {
				return false;
			}
		});

		final String url = TEST_URL;
		if(DEBUG) log("Pointing browser to %s", url);
		container.loadUrl(url);
	}

	private void log(String message, Object...extras) {
		if(DEBUG) System.err.println("LOG | EmbeddedBrowserActivity::" +
				String.format(message, extras));
	}
}
