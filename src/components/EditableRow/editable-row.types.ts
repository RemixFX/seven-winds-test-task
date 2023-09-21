export interface FormState {
  rowName: string
  salary: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
}

export type Action = 
 | { type: "change_rowName"; newValue: FormState["rowName"] }
 | { type: "change_salary"; newValue: FormState["salary"] }
 | { type: "change_equipmentCosts"; newValue: FormState["equipmentCosts"] }
 | { type: "change_overheads"; newValue: FormState["overheads"] }
 | { type: "change_estimatedProfit"; newValue: FormState["estimatedProfit"] }



export interface EditableRowProps {
  createRow(args: FormState): void
}