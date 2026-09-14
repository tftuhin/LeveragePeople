import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <img src="https://leveragepeople.us/wp-content/uploads/2019/12/LP-Logo-new.png" alt="Leverage People" className={styles.logo} />
            <p className={styles.text}>
              Growing businesses need leverage. We help you scale through strategy, talent, and culture.
            </p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.title}>Contact</h4>
            <p className={styles.text}>info@leveragepeople.us</p>
            <p className={styles.text}>+1 (800) 123-4567</p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.title}>Links</h4>
            <ul className={styles.links}>
              <li><a href="#services">Services</a></li>
              <li><a href="#quiz">Assessment</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Leverage People. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
