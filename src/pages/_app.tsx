import "../styles/globals.css";
import type { AppProps } from "next/app";
import withDarkMode from "next-dark-mode";
import SiteLayout from "../components/SiteLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Component {...pageProps} />;
    </SiteLayout>
  );
}
export default withDarkMode(MyApp);
