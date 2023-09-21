import styles from './table.module.scss'

export default function Table() {
  return (
    <section className={styles.table}>
      <h1 className={styles.header}>Строительно-монтажные работы</h1>
      <ul className={`${styles.grid} ${styles.designations}`}>
        <li className={styles.item}>
          <p className={styles.title}>Уровень</p>
        </li>
        <li className={styles.title}>
          <p className={styles.title}>Наименование работ</p>
        </li>
        <li className={styles.title}>
          <p className={styles.title}>Основная з/п</p>
        </li>
        <li className={styles.title}>
          <p className={styles.title}>Оборудование</p>
        </li>
        <li className={styles.title}>
          <p className={styles.title}>Накладные расходы</p>
        </li>
        <li className={styles.title}>
          <p className={styles.title}>Сметная прибыль</p>
        </li>
      </ul>
    </section>
  )
}