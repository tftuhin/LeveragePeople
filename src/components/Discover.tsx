import styles from './Discover.module.css';

export default function Discover() {
  return (
    <section id="about" className={styles.discover}>
      <div className={`container ${styles.discoverContainer}`}>
        <h2 className={styles.title}>The Heartbeat of Business</h2>
        <p className={styles.text}>
          People are the heartbeat of every business. Yet, effectively navigating team dynamics, strategic alignment, and culture is one of the toughest challenges leaders face. 
          <br /><br />
          At <strong>Leverage People</strong>, we bring expert strategy, talent acquisition, and culture design to businesses ready to break through to their next level of growth.
        </p>
      </div>
    </section>
  );
}
