import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="/" className={styles.logo}>
          A Silly Blog
        </a>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <a href="/blog">Blog</a>
            </li>
            <li className={styles.navListItem}>
              <a href="">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
