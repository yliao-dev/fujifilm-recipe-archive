import { Link, useLocation } from "react-router-dom";
import { ImageSearch, CameraRoll, Add } from "@mui/icons-material";

const SideTabNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Search", to: "/", icon: <ImageSearch /> },
    { label: "All Recipes", to: "/recipes", icon: <CameraRoll /> },
    { label: "Add", to: "/add-recipe", icon: <Add /> },
  ];

  return (
    <aside className="side-tab-nav">
      <div className="tab">
        {navItems.map(({ label, to, icon }) => (
          <Link
            key={label}
            to={to}
            className={`tab-item ${pathname === to ? "active" : ""}`}
          >
            {icon}
            <span className="tab-label">{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideTabNav;
