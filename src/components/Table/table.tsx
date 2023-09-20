import styles from './table.module.scss'

export default function Table () {
  return(
    <section className={styles.table}>
      <h1 className={styles.header}>Строительно-монтажные работы</h1>
      <ul className={`${styles.grid} ${styles.designations}`}>
        <li className={styles.item}>
          <p className={styles.title}>Уровень</p>
        </li>
        <li className={styles.title}>Наименование работ</li>
        <li className={styles.title}>Основная з/п</li>
        <li className={styles.title}>Оборудование</li>
        <li className={styles.title}>Накладные расходы</li>
        <li className={styles.title}>Сметная прибыль</li>
      </ul>
    </section>
  )
}