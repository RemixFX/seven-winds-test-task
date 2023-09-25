export interface TreeResponse  {
  child: TreeResponse[]
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
  total?: number
}

export interface DeleteRowRequest {
  eID: number
  rID: number
}

export interface CreateRowRequest {
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

export interface UpdateOrCreateRowRequest extends CreateRowRequest {
  id?: number
}

export interface UpdateRowRequest extends CreateRowRequest {
  id: number
}

export interface CreateRowRequestWithId extends CreateRowRequest {
  eID: number
}

export interface UpdateRowRequestWithId extends UpdateOrCreateRowRequest {
  eID: number
  rID: number
}

export interface ResponseRow {
  changed: TreeResponse[]
  current: TreeResponse
}

export interface ResponseDeleteRow {
  changed: TreeResponse[]
  current: null
}