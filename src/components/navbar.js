import { useNavigate } from "react-router-dom";
import logo from "../images/ludi-logo-navbar.png";

export const Navbar = () => {
  const navigate = useNavigate();

  // Function for home button
  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 p-2 h-12 shadow-md">
      <div className="flex justify-around items-center h-full">
        <button className="navbar-logo" onClick={goHome}>
          <img src={logo} className="h-6" />
        </button>
      </div>
    </nav>
  );
};
