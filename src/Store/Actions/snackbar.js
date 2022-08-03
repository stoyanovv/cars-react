import * as actionTypes from './actionTypes'

export const setSnackbar = (snackType, message, open = true) => {
   return {
      type: actionTypes.SET_SNACKBAR,
      open: open,
      snackType: snackType,
      message: message
   }
}
