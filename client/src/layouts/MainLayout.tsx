import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import SideTabNav from "../components/SideTabNav";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <SideTabNav />
    </>
  );
};

export default MainLayout;
