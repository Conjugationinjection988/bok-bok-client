import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Room", path: "/room" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
const themeOptions = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "Lofi", value: "lofi" },
  { name: "Black", value: "black" },
  { name: "Acid", value: "acid" },
  { name: "Night", value: "night" },
  { name: "Synthwave", value: "synthwave" },
  { name: "Valentine", value: "valentine" },
  { name: "Halloween", value: "halloween" },
];

const Header = () => {
  // Initialize theme from localStorage or default
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Update data-theme and localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <nav className="mt-4">
        <div className="navbar bg-base-300 shadow-sm rounded-4xl">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-4xl z-1 mt-3 w-52 p-2 shadow"
              >
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl rounded-4xl font-bold">
              BokBok
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 [&>li>a]:rounded-4xl">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1 rounded-4xl">
                {themeOptions.find((option) => option.value === theme)?.name}
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl [&>li>input]:rounded-4xl"
              >
                {themeOptions.map((option) => (
                  <li key={option.value}>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                      aria-label={option.name}
                      value={option.value}
                      checked={theme === option.value}
                      onChange={handleThemeChange}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
