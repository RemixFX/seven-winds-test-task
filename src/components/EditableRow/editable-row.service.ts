import { UpdateOrCreateRowRequest } from '../../types';
import { Action } from './editable-row.types';

const initialState: UpdateOrCreateRowRequest = {
  parentId: null,
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0
}

export const setInitialState = (id: UpdateOrCreateRowRequest['parentId']) => {
  if (id) {
    initialState.parentId = id
    return initialState
  }
  return initialState
}

export const reducer =
  (state: UpdateOrCreateRowRequest, action: Action)
    : UpdateOrCreateRowRequest => {
    switch (action.type) {
      case 'change_rowName': {
        return {
          ...state,
          rowName: action.newValue
        };
      }
      case 'change_salary': {
        return {
          ...state,
          salary: action.newValue
        };
      }
      case 'change_equipmentCosts': {
        return {
          ...state,
          equipmentCosts: action.newValue
        };
      }
      case 'change_overheads': {
        return {
          ...state,
          overheads: action.newValue
        };
      }
      case 'change_estimatedProfit': {
        return {
          ...state,
          estimatedProfit: action.newValue
        };
      }
      default:
        return initialState
    }
  }