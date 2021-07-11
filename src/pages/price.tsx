import SidebarNavMenu from "../components/ui/SidebarNavMenu";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useDarkMode } from "next-dark-mode";

const Price = () => {
  const { darkModeActive } = useDarkMode();

  return (
    <SidebarNavMenu>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none h-screen w-screen">
        <TradingViewWidget
          symbol="HEXUSDC"
          theme={darkModeActive ? Themes.DARK : Themes.LIGHT}
          locale="en"
          autosize
        />
      </main>
    </SidebarNavMenu>
  );
};

export default Price;
