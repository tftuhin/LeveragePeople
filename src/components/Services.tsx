import styles from './Services.module.css';

export default function Services() {
  const services = [
    {
      title: 'Strategy',
      description: 'Your business needs a clear path forward. We help you map your goals, optimize your organizational structure, and ensure your team is perfectly aligned to execute your vision.',
      icon: '📈'
    },
    {
      title: 'Talent',
      description: 'Finding the right people is just the beginning. We provide comprehensive talent acquisition, leadership development, and retention strategies to build a powerhouse team.',
      icon: '🤝'
    },
    {
      title: 'Culture',
      description: 'Culture isn\'t just a buzzword; it\'s your competitive advantage. We design environments that foster engagement, drive high performance, and make people want to stay.',
      icon: '💡'
    }
  ];

  return (
    <section id="services" className={styles.services}>
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className={styles.title}>What We Do</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <a href="#" className={styles.link}>Learn More &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
