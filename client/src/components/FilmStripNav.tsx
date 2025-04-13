import { Link, useLocation } from "react-router-dom";
import { CameraRoll, CameraAlt, Add } from "@mui/icons-material";
const FilmStripNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Explore", to: "/", icon: CameraRoll },
    { label: "Recipes", to: "/recipes", icon: CameraAlt },
    { label: "Add", to: "/add-recipe", icon: Add },
  ];

  return (
    <nav className="filmstrip-nav">
      {navItems.map(({ label, to, icon: Icon }) => (
        <Link
          key={label}
          to={to}
          className={`filmstrip-frame ${pathname === to ? "active" : ""}`}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default FilmStripNav;
