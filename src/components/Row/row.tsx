import ButtonGroup from '../ButtonGroup/button-group'
import styles from './row.module.scss'
import { RowProps } from './row.types'


export default function Row({ level, data, editeRow, deleteRow, createChildRow, children }: RowProps) {

  const handleDoubleClick = () => editeRow(data)
  const handleDelete = () => deleteRow(data.id)
  const handleCreate = () => createChildRow(data)

  return (
    <>
      <article className={styles.component} onDoubleClick={handleDoubleClick}>
        <ul className={styles.row}>
          <ButtonGroup
            hasChild={data.child && data.child.length > 0}
            level={level}
            handleClickCreate={handleCreate}
            handleClickDelete={handleDelete}
          />
          <li className={styles.cell}>{data.rowName}</li>
          <li className={styles.cell}>{data.salary}</li>
          <li className={styles.cell}>{data.equipmentCosts}</li>
          <li className={styles.cell}>{data.overheads}</li>
          <li className={styles.cell}>{data.estimatedProfit}</li>
        </ul>
      </article>
      {children}
    </>
  )
}