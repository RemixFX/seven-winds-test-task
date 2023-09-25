import { TreeResponse, UpdateOrCreateRowRequest } from "../../types"

export interface RowProps {
  level: number
  hasSister: boolean
  arrStream: boolean[]
  data: TreeResponse
  isCreated: boolean
  isUpdated: boolean
  deleteRow(id: TreeResponse['id']): void
  updateOrCreateRow(state: UpdateOrCreateRowRequest): void
}