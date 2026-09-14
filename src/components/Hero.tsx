import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Grow Your Business.</h1>
          <p className={styles.subtitle}>
            Leverage People provides strategy, talent, and culture solutions for businesses ready to scale.
          </p>
          <div className={styles.actions}>
            <a href="#services" className={styles.primaryBtn}>OUR SERVICES</a>
            <a href="#contact" className={styles.secondaryBtn}>CONTACT US</a>
          </div>
        </div>
      </div>
    </section>
  );
}
