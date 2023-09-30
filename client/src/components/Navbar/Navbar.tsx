import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context";
import "./Navbar.style.scss";

function Navbar() {
  const { loggedIn, logout } = useAccountContext();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img
            src="/logo.png" 
            width="150" 
            alt="Store Logo"
          />
        </Link>
      </div>
      <div className="navbar__account">
        {loggedIn() === false ? (
          <>
            <button className="custom-button" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
            <button className="custom-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        ) : (
          <button className="custom-button" onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
