import { Outlet } from "react-router-dom";
import ToggleThemeButton from "@src/components/ToggleThemeButton/ToggleThemeButton";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import ShadowOverlay from "@src/components/ShadowOverlay/ShadowOverlay";
import Navigation from "../PublicLayout/Navigation/Navigation";
import MobileNavigation from "../PublicLayout/Navigation/MobileNavigation/MobileNavigation";

export function PrivateLayout() {

  const {showOverlay} = useGlobalProvider();

  return (
    <div className="bg-light-theme-bg dark:bg-dark-theme-bg transition-colors duration-300 ease-in-out min-h-screen">
      <Navigation/>
      <div className="relative min-h-[inherit]">
        <Outlet/>
        <ToggleThemeButton/>
        {<ShadowOverlay show={showOverlay}/>}
        {<MobileNavigation/>}
      </div>
    </div>

  );
}
