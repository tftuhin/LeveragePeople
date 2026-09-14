import styles from './QuizCTA.module.css';

export default function QuizCTA() {
  return (
    <section id="quiz" className={styles.quizCta}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>Are You Ready For Scale?</h2>
          <p className={styles.subtitle}>
            Take our free assessment to discover where your business stands and what you need to break through to the next level.
          </p>
          <a href="#" className={styles.btn}>TAKE THE QUIZ</a>
        </div>
      </div>
    </section>
  );
}
