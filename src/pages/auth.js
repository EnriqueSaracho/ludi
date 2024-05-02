import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// Page: auth (register and login)
export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <p className="auth-text">Don't have an account?</p>
      <Register />
    </div>
  );
};

// Login form
const Login = () => {
  // Fields' states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Cookies
  const [_, setCookies] = useCookies(["access_token"]);

  // useNavigate
  const navigate = useNavigate();

  // Conection to the API
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Making request
      const response = await axios.post(
        "https://ludi-server.vercel.app/auth/login",
        {
          username,
          password,
        }
      );

      // Storing token in cookies and user ID in browser's local storage
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

// Register (new user) form
const Register = () => {
  // Fields' states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Conection to the API
  const onSubmit = async (event) => {
    event.preventDefault(); // So that it doesn't refresh the page when submitted

    try {
      await axios.post("https://ludi-server.vercel.app/auth/register", {
        username,
        password,
      });
      alert(
        "Registration successful. To continue with your account please login"
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

// Form component
const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <h2 className="form-title">{label}</h2>
        <fieldset className="form-fieldset">
          <div>
            {/* Username */}
            <label htmlFor="username" className="label-text">
              Username:{" "}
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            ></input>

            {/* Password */}
            <label htmlFor="password" className="label-text">
              Password:{" "}
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            ></input>

            <div className="btn-container">
              <button type="submit" className="btn">
                {label}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
