import { UpdateOrCreateRowRequest } from "../../types"

export type Action = 
 | { type: "change_rowName"; newValue: UpdateOrCreateRowRequest["rowName"] }
 | { type: "change_salary"; newValue: UpdateOrCreateRowRequest["salary"] }
 | { type: "change_equipmentCosts"; newValue: UpdateOrCreateRowRequest["equipmentCosts"] }
 | { type: "change_overheads"; newValue: UpdateOrCreateRowRequest["overheads"] }
 | { type: "change_estimatedProfit"; newValue: UpdateOrCreateRowRequest["estimatedProfit"] }



export interface EditableRowProps {
  updateOrCreateRow(state: UpdateOrCreateRowRequest): void
  isEditedData: UpdateOrCreateRowRequest | null
  parentId: UpdateOrCreateRowRequest['parentId']
  isLoaded?: boolean
  level: number
}