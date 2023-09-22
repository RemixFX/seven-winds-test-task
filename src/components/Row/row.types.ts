import { ReactNode } from "react"
import { TreeResponse } from "../../types"

export interface RowProps {
  level?: number
  data: TreeResponse
  editeRow(data: TreeResponse): void
  deleteRow(id: TreeResponse['id']): void
  createChildRow(data: TreeResponse): void
  children?: ReactNode
}