import { CreateRowRequest, TreeResponse, UpdateOrCreateRowRequest } from "../../types";

export interface RowDisplayProps {
  level?: number
  data: TreeResponse
  editeRow(data: TreeResponse): void
  updateOrCreateRow(data: UpdateOrCreateRowRequest): void
  createChildRow(data: TreeResponse): void
  deleteRow(id: TreeResponse['id']): void
  isEdited: UpdateOrCreateRowRequest | null
  parentId: CreateRowRequest['parentId']
}