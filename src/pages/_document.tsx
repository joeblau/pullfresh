import { useDarkMode } from "next-dark-mode";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const TITLE = "Pullfresh";
const DESCRIPTION = "Pull to refresh your wealth";
const DOMAIN = "https://pullfresh.vercel.app";

const BROWSER_CONFIG = `${DOMAIN}/images/icons/browserconfig.xml`;

const ICON_114 = `${DOMAIN}/images/icons/icon-114x114.png`;
const ICON_152 = `${DOMAIN}/images/icons/icon-152x152.png`;
const ICON_167 = `${DOMAIN}/images/icons/icon-167x167.png`;
const ICON_180 = `${DOMAIN}/images/icons/icon-180x180.png`;
const ICON_192 = `${DOMAIN}/images/icons/icon-192x192.png`;

const FAVICON_16 = `${DOMAIN}/images/icons/icon-16x16.png`;
const FAVICON_32 = `${DOMAIN}/images/icons/icon-32x32.png`;

const PINNED_TAB = `${DOMAIN}/images/icons/safari-pinned-tab.svg`;

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" translate="no">
        <Head>
          <meta name="application-name" content={TITLE} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={TITLE} />
          <meta name="description" content={DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content={BROWSER_CONFIG} />
          <meta name="msapplication-TileColor" content="#FF2D55" />
          <meta name="msapplication-tap-highlight" content="no" />

          {/* Apple Icons */}
          <link rel="apple-touch-icon" href={ICON_114} />
          <link rel="apple-touch-icon" sizes="152x152" href={ICON_152} />
          <link rel="apple-touch-icon" sizes="180x180" href={ICON_180} />
          <link rel="apple-touch-icon" sizes="167x167" href={ICON_167} />

          {/* Favicons */}
          <link rel="icon" type="image/png" sizes="32x32" href={FAVICON_32} />
          <link rel="icon" type="image/png" sizes="16x16" href={FAVICON_16} />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="mask-icon" href={PINNED_TAB} color="#FF2D55" />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* Twitter Metadata */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={DOMAIN} />
          <meta name="twitter:title" content={TITLE} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content={ICON_192} />
          <meta name="twitter:creator" content="@joeblau" />

          {/* Open Graph Metadata */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:site_name" content={TITLE} />
          <meta property="og:url" content={DOMAIN} />
          <meta
            property="og:image"
            content="https://yourdomain.com/static/icons/apple-touch-icon.png"
          />
        </Head>
        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
