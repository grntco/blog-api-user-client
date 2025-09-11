import styles from "./Header.module.css";
import { Link } from "react-router";

const Header = () => {
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

  return (
    <header className={styles.header}>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
