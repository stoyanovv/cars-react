import * as actionTypes from '../Actions/actionTypes'
import { updateObject } from '../../Shared/HelperFunctions';

const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false,
   signedUp: false,
   message: null
};

const authStart = (state, action) => {
   return updateObject(state, {
      error: null,
      loading: true
   })
}

const authSignedUp = (state, action) => {
   return updateObject(state, {
      error: null,
      loading: false,
      signedUp: true,
      message: action.message
   })
}

const authSuccess = (state, action) => {
   return updateObject(state, {
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false,
      signedUp: false,
      message: action.message
   })
}

const authFail = (state, action) => {
   return updateObject(state, {
      error: action.error,
      loading: false,
      message: null
   })
}

const authLogout = (state, action) => {
   return updateObject(state, { token: null, userId: null })
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_START:
         return authStart(state, action)
      case actionTypes.AUTH_SUCCESS:
         return authSuccess(state, action)
      case actionTypes.AUTH_FAIL:
         return authFail(state, action)
      case actionTypes.AUTH_LOGOUT:
         return authLogout(state, action)
      case actionTypes.AUTH_SIGNED_UP:
         return authSignedUp(state, action)
      default:
         return state
   }
};

export default reducer