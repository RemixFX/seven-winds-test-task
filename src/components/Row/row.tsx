import { useEffect, useState } from 'react'
import { CreateRowRequest, UpdateOrCreateRowRequest } from '../../types'
import ButtonGroup from '../ButtonGroup/button-group'
import EditableRow from '../EditableRow/editable-row'
import styles from './row.module.scss'
import { RowProps } from './row.types'

export default function Row({ level, hasSister, arrStream, data, isCreated, isUpdated, deleteRow, updateOrCreateRow }: RowProps) {

  const [isEdited, setIsEdited] = useState<UpdateOrCreateRowRequest | null>(null)
  const [parentId, setParentId] = useState<CreateRowRequest['parentId']>(null)

  // Передача id элемента для удаления на уровень выше
  const handleDelete = () => deleteRow(data.id)

  // Запуск редактирования элемента при двойном клике, передача данных в состояние
  const editeRow = () => {
    const rowData: UpdateOrCreateRowRequest = { ...data, parentId: null }
    setIsEdited(rowData)
  }

  // Закрытие компонента создания элемента, при изменении состояния об успешной загрузке
  useEffect(() => {
    if (isCreated) {
      setParentId(null)
    }
  }, [isCreated])

    // Закрытие компонента редактрования элемента, при изменении состояния об успешной загрузке
  useEffect(() => {
    if (isUpdated) {
      setIsEdited(null)
    }
  }, [isUpdated])

  // Передача массива булевых значений, определяющего есть ли сестры и дети у элемента на текущем уровне
  const sendStreamData = () => {
    if ((data.child.length > 0) && hasSister) {
      return true
    }
    return false
  }

  return (
    <>
      {isEdited ?
        <EditableRow
        level={level}
          updateOrCreateRow={updateOrCreateRow}
          isEditedData={isEdited}
          parentId={null}
        />
        :
        <article className={styles.component} onDoubleClick={editeRow}>
          <ul className={styles.row}>
            <ButtonGroup
              arrStream={arrStream}
              hasChild={data.child && data.child.length > 0}
              hasSister={hasSister}
              level={level}
              handleClickCreate={() => setParentId(data.id)}
              handleClickDelete={handleDelete}
            />
            <li className={styles.cell}>{data.rowName}</li>
            <li className={styles.cell}>{data.salary}</li>
            <li className={styles.cell}>{data.equipmentCosts}</li>
            <li className={styles.cell}>{data.overheads}</li>
            <li className={styles.cell}>{data.estimatedProfit}</li>
          </ul>
        </article>
      }
      {data.child &&
        data.child.map((childData, index) =>
          <Row
            level={level + 1}
            hasSister={index < (data.child.length - 1)}
            arrStream={[...arrStream, sendStreamData()]}
            key={childData.id}
            data={childData}
            isCreated={isCreated}
            isUpdated={isUpdated}
            deleteRow={deleteRow}
            updateOrCreateRow={updateOrCreateRow}
          />
        )
      }
      {parentId &&
        <EditableRow
          level={level}
          updateOrCreateRow={updateOrCreateRow}
          isEditedData={null}
          parentId={parentId}
        />
      }
    </>
  )
}