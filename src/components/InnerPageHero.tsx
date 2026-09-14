import styles from './InnerPageHero.module.css';

interface InnerPageHeroProps {
  title: string;
}

export default function InnerPageHero({ title }: InnerPageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
}
