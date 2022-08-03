import * as actionTypes from '../Actions/actionTypes'
import { updateObject } from '../../Shared/HelperFunctions';

const initialState = {
   open: false,
   snackType: 'success',
   message: 'null',
};

const setSnackbar = (state, action) => {
   return updateObject(state, {
      open: action.open,
      snackType: action.snackType,
      message: action.message,
   })
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_SNACKBAR:
         return setSnackbar(state, action)
      default:
         return state
   }
};

export default reducer