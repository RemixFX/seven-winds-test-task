import { useCreateRowInEntityMutation, useGetTreeRowsQuery } from '../../api'
import { ID } from '../../config/consts'
import { OutlayRowRequest } from '../../types'
import EditableRow from '../EditableRow/editable-row'
import { FormState } from '../EditableRow/editable-row.types'
import styles from './table.module.scss'

export default function Table() {

  const [createRowInEntity, result] = useCreateRowInEntityMutation()
  const { data, error, isLoading } = useGetTreeRowsQuery(ID)

  const createRow = (state: FormState) => {
    const data: OutlayRowRequest = {
      ...state,
      eID: ID,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      parentId: null,
      supportCosts: 0
    }
    createRowInEntity(data)
    
  }
  console.log(data)
  
  return (
    <section className={styles.table}>
      <h1 className={styles.header}>Строительно-монтажные работы</h1>
      <div className={styles.layout}>
        <ul className={styles.grid}>
          <li className={styles.item}>
            <p className={styles.title}>Уровень</p>
          </li>
          <li className={styles.item}>
            <p className={styles.title}>Наименование работ</p>
          </li>
          <li className={styles.item}>
            <p className={styles.title}>Основная з/п</p>
          </li>
          <li className={styles.item}>
            <p className={styles.title}>Оборудование</p>
          </li>
          <li className={styles.item}>
            <p className={styles.title}>Накладные расходы</p>
          </li>
          <li className={styles.item}>
            <p className={styles.title}>Сметная прибыль</p>
          </li>
        </ul>
        <EditableRow createRow={createRow}/>
      </div>
    </section>
  )
}