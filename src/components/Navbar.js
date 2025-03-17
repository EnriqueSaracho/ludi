import { Link, useNavigate } from "react-router-dom";
import logo from "../images/ludi-logo-navbar.png";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!cookies.access_token);
  }, [cookies]);

  const logOut = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.localStorage.removeItem("userID");
    window.location.reload(); // Ensures navbar updates immediately
  };

  // Function for home button
  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="w-full bg-secondary-light fixed top-0 left-0 h-12 shadow-md z-50">
      <div className="flex justify-between items-center px-6 h-full">
        <button
          className="focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-secondary-light transition ease-out"
          onClick={goHome}
        >
          <img src={logo} alt="Ludi" className="h-9" />
        </button>
        {isAuthenticated ? (
          <button onClick={logOut}>Log out</button>
        ) : (
          <Link to={"/auth"}>Auth Page</Link>
        )}
      </div>
    </nav>
  );
};
