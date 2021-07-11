import SidebarNavMenu from "../components/ui/SidebarNavMenu";
import { useDarkMode } from "next-dark-mode";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const Price = () => {
  const { darkModeActive } = useDarkMode();

  return (
    <SidebarNavMenu>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <AdvancedRealTimeChart
          autosize={true}
          symbol="UNISWAP:HEXUSDC"
          theme={darkModeActive ? "dark" : "light"}
        />
      </main>
    </SidebarNavMenu>
  );
};

export default Price;
