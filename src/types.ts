export interface Row {
  equipmentCosts: number
  estimatedProfit: number
  id: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string
  salary: number
  supportCosts: number
  total: number
}

export interface TreeResponse extends Row{
  child?: Row[] | null[]
}

export interface OutlayRowRequest {
  eID: number
  equipmentCosts: number
  estimatedProfit: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  parentId: number | null
  rowName: string
  salary: number
  supportCosts: number
}

export interface ResponseRow {
  changed: Row[]
  current: Row
}