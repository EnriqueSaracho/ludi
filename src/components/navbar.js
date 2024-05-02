import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";

// import { BsSearch, BsSortDown } from "react-icons/bs";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["sortTerm"]);

  const navigate = useNavigate();
  const location = useLocation();

  // Function for logging out user
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");

    navigate("/auth");
  };

  // Function for home button
  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      {/* <Link to="/" className="navbar-logo">
        Ludi
      </Link> */}
      <button className="navbar-logo" onClick={goHome}>
        Ludi
      </button>

      {/* Searching mechanism */}
      {/* <div className="navbar-container">
        <label htmlFor="searchbar">
          <BsSearch />
        </label>
        <input
          type="text"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          id="searchbar"
          className="navbar-input"
          placeholder="Search"
        />
      </div> */}

      {/* Sorting mechanism */}
      {/* <div className="navbar-container">
        <label htmlFor="sort">
          <BsSortDown />
        </label>
        <select
          id="sort"
          className="navbar-input"
          onChange={handleSortTermChange}
        >
          <option value="name">Title</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release date</option>
        </select>
      </div> */}

      {/* Login/Register/Logout */}
      {location.pathname === "/auth" ? null : !cookies.access_token ? (
        <Link to="/auth" className="navbar-login">
          Log in
        </Link>
      ) : (
        <button className="navbar-login" onClick={logout}>
          Log out
        </button>
      )}
    </div>
  );
};
