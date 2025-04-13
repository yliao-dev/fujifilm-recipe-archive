import { Link, useLocation } from "react-router-dom";
import { CameraRoll, CameraAlt, Add } from "@mui/icons-material";
const FilmStripNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Search", to: "/", icon: CameraRoll },
    { label: "All Recipes", to: "/recipes", icon: CameraAlt },
    { label: "Add", to: "/add-recipe", icon: Add },
  ];

  return (
    <div className="filmstrip__nav-border">
      <nav className="filmstrip__nav">
        {navItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className={`filmstrip__frame ${pathname === to ? "active" : ""}`}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FilmStripNav;
