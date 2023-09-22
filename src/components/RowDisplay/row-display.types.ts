import { TreeResponse, UpdateOrCreateRowRequest } from "../../types";

export interface RowDisplayProps {
  level?: number
  data: TreeResponse
  updateOrCreateRow(data: UpdateOrCreateRowRequest): void
  deleteRow(id: TreeResponse['id']): void
  isLoaded: boolean
}