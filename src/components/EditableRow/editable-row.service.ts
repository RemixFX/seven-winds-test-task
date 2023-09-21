import { FormState, Action } from './editable-row.types';

export const intialState = {
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0
}

export const reducer = (state: FormState, action: Action): FormState => {
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
    return intialState
  }
}