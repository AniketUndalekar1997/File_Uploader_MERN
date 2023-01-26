import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginSuccess } from "../services/auth-services";
import { saveUserTokenToLS } from "../utils/localStorage";

export default function Navbar() {
  const { login, logout, user } = useAuth();

  const handleLogin = () => {
    login((response) => {
      const { email, displayName, photoURL, uid } = response.user;
      const paylaod = {
        email,
        displayName,
        photoURL,
        uid,
      };
      loginSuccess(paylaod).then((response) => {
        saveUserTokenToLS(response.accessToken);
      });
    });
  };

  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          File Uploader
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user && <a className="nav-link">Hello 👋 {user.displayName}</a>}
            {!user && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleLogin}
                >
                  Login
                </a>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
