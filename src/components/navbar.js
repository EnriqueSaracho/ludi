import { useNavigate } from "react-router-dom";
import ludiLogo from "../images/ludi-logo.png";

export const Navbar = () => {
  const navigate = useNavigate();

  // Function for home button
  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="px-2 my-2 bg-white text-gray-600 text-center sm:text-left">
      <button className="navbar-logo" onClick={goHome}>
        <img src={ludiLogo} className="h-6" />
      </button>
    </div>
  );
};
