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
    <nav className="w-full bg-secondary-light fixed top-0 left-0 h-12 shadow-md z-50">
      <div className="flex justify-around items-center px-6 h-full ">
        <button className="focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-secondary-light transition ease-out" onClick={goHome}>
          <img src={logo} alt="Ludi" className="h-9" />
        </button>
      </div>
    </nav>
  );
};
