import { ChangeEvent, KeyboardEvent, useReducer } from 'react'
import styles from './editable-row.module.scss'
import { setInitialState, reducer } from './editable-row.service'
import { EditableRowProps } from './editable-row.types'

function setStyleLevel(level: number): number {
  return (level * 20) + 12
}

export default function EditableRow({ updateOrCreateRow, level, isEditedData, parentId, isLoaded }: EditableRowProps) {

  const [state, dispatch] = useReducer(
    reducer,
    isEditedData ? isEditedData : setInitialState(parentId)
  )

  function handleRowNameChange(e: ChangeEvent<HTMLInputElement>) {

    dispatch({
      type: 'change_rowName',
      newValue: e.target.value
    })
  }

  function handleSalaryChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'change_salary',
      newValue: Number(e.target.value)
    })
  }

  function handleEquipmentCostsChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'change_equipmentCosts',
      newValue: Number(e.target.value)
    })
  }

  function handleOverheadsChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'change_overheads',
      newValue: Number(e.target.value)
    })
  }

  function handleEstimatedProfitChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'change_estimatedProfit',
      newValue: Number(e.target.value)
    })
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      updateOrCreateRow(state)
    }
  }

  if (isLoaded) {
    return null
  }

  return (
    <article className={styles.component}>
      <div className={styles.form}>
        <div className={styles.icon} style={{ marginLeft: setStyleLevel(level) }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15.5556 4H5.77778C4.8 4 4 4.8 4 5.77778V18.2222C4 19.2 4.8 20 5.77778 20H18.2222C19.2 20 20 19.2 20 18.2222V8.44444L15.5556 4ZM7.55556 7.55556H12V9.33333H7.55556V7.55556ZM16.4444 16.4444H7.55556V14.6667H16.4444V16.4444ZM16.4444 12.8889H7.55556V11.1111H16.4444V12.8889ZM14.6667 9.33333V5.77778L18.2222 9.33333H14.6667Z" fill="#7890B2" />
          </svg>
        </div>
        <input type='text' className={styles.input}
          onChange={handleRowNameChange} onKeyDown={handleKeyDown}
          placeholder='Наименование работ' value={state.rowName} />
        <input type='text' className={styles.input}
          onChange={handleSalaryChange} onKeyDown={handleKeyDown}
          placeholder='Основная з/п' value={state.salary} />
        <input type='text' className={styles.input}
          onChange={handleEquipmentCostsChange} onKeyDown={handleKeyDown}
          placeholder='Оборудование' value={state.equipmentCosts} />
        <input type='text' className={styles.input}
          onChange={handleOverheadsChange} onKeyDown={handleKeyDown}
          placeholder='Накладные расходы' value={state.overheads} />
        <input type='text' className={styles.input}
          onChange={handleEstimatedProfitChange} onKeyDown={handleKeyDown}
          placeholder='Сметная прибыль' value={state.estimatedProfit} />
      </div>
    </article>

  )
}