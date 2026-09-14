import styles from './Process.module.css';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Assessment',
      description: 'We take it all in. Understanding your current landscape is the first step to meaningful change.',
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Aligning your business goals with your people strategy for maximum impact and growth.',
    },
    {
      number: '03',
      title: 'Talent',
      description: 'Acquiring and developing the right talent to execute your vision flawlessly.',
    },
    {
      number: '04',
      title: 'Culture',
      description: 'Designing a workplace environment where high-performers thrive and stay.',
    },
  ];

  return (
    <section className={styles.process}>
      <div className={`container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Our Process</h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.number}>{step.number}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
