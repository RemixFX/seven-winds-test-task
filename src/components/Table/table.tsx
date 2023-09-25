import { useCreateRowInEntityMutation, useDeleteRowMutation, useGetTreeRowsQuery, useUpdateRowInEntityMutation } from '../../api'
import { ID } from '../../config/consts'
import { UpdateOrCreateRowRequest} from '../../types'
import EditableRow from '../EditableRow/editable-row'
import styles from './table.module.scss'
import Row from '../Row/row'

export default function Table() {
  
  // Получения состояний создания, редактирования, удаления и текущих данных из хуков
  const [createRowInEntity, { isSuccess: isCreated }] = useCreateRowInEntityMutation()
  const [updateRowInEntity, { isSuccess: isUpdated }] = useUpdateRowInEntityMutation()
  const [deleteRowInEtity] = useDeleteRowMutation()
  const { data } = useGetTreeRowsQuery(ID)

  // Универсальная функция запроса для отправки создания или изменения данных
  const updateOrCreateRow = (request: UpdateOrCreateRowRequest) => {
    if (!request.id) {
      createRowInEntity({
        ...request,
        eID: ID,
      })
    } else {
      updateRowInEntity({
        ...request,
        eID: ID,
        rID: request.id
      })
    }
  }

  // Запрос на удаление данных
  const deleteRow = (rID: number) => {
    deleteRowInEtity({ eID: ID, rID })
  }

  return (
    <section className={styles.table}>
      <h1 className={styles.header}>Создание нового приложения</h1>
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
        {(data && data.length === 0) &&
          <EditableRow updateOrCreateRow={updateOrCreateRow}
            level={0}
            isEditedData={null}
            isLoaded={isCreated}
            parentId={null}
          />
        }
        {data && data.map((row) =>
          <Row
            key={row.id}
            level={0}
            hasSister={false}
            arrStream={[]}
            data={row}
            deleteRow={deleteRow}
            updateOrCreateRow={updateOrCreateRow}
            isCreated={isCreated}
            isUpdated={isUpdated}
          />
        )}
      </div>
    </section>
  )
}