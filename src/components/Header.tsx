import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            src="https://leveragepeople.us/wp-content/uploads/2019/12/LP-Logo-new.png" 
            alt="Leverage People Logo" 
            width={300} 
            height={60} 
            className={styles.logo}
          />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/strategy">STRATEGY</Link></li>
            <li><Link href="/talent">TALENT</Link></li>
            <li><Link href="/culture">CULTURE</Link></li>
            <li><Link href="/quiz">QUIZ</Link></li>
            <li><Link href="/case-studies">CASE STUDIES</Link></li>
            <li><Link href="/about">ABOUT</Link></li>
            <li><Link href="/contact">CONTACT</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
