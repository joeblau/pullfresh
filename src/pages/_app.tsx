import "../styles/globals.css";
import type { AppProps } from "next/app";
import withDarkMode from "next-dark-mode";
import SiteLayout from "../components/SiteLayout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />;
    </SiteLayout>
  );
}
export default withDarkMode(MyApp);
