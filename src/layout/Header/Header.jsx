import useAuth from "../../hooks/auth/useAuth";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    {
      path: "about",
      text: "About",
    },
    {
      path: "blog",
      text: "Blog",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header>
      <div className="container">
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>
            A Silly Blog
          </a>
          <ul className={styles.navList}>
            {navLinks.map((link, index) => {
              return (
                <li key={index}>
                  <Link className={styles.navLink} to={link.path}>
                    {link.text}
                  </Link>
                </li>
              );
            })}
            {isLoggedIn ? (
              <li>
                <button className={styles.navLink} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link className={styles.navLink} to={"login"}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
