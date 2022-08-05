import Data from '../../Data/Data'
import * as actionTypes from './actionTypes'
import { setSnackbar } from './snackbar'
import Auth from '../../Components/Pages/Auth/Auth'

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   }
}

// Извиква action AUTH_SUCCESS, подава параметри към reducer
export const authSuccess = (token, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
   }
}


export const authSignedUp = (message) => {
   return {
      type: actionTypes.AUTH_SIGNED_UP,
      message: message
   }
}

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   }
}

export const logout = () => {
   localStorage.removeItem('token')
   localStorage.removeItem('expirationDate')
   return {
      type: actionTypes.AUTH_LOGOUT
   }
}

export const checkAuthTimeout = (expirationTime = 3600) => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout())
      }, expirationTime * 1000)
   }
}

// Извиква се при submit на формата от Auth/Login.js,Signup.js
export const auth = (data, isSignup) => {
   return dispatch => {
      // Подава action AUTH_START към 
      dispatch(authStart())
      let url = 'login';
      if (isSignup) {
         url = 'register';
      }
      if (isSignup) {
         Data.post(url, data)
            .then(response => {
               if (response.success) {
                  dispatch(authSignedUp(response.message))
                  dispatch(setSnackbar('success', response.message))
               }
               else {
                  dispatch(setSnackbar('error', response.message))
                  dispatch(authFail(response.message))
               }
            })
      }
      else if (url === 'login') {
         Data.getToken(url, data)
            .then(response => {
               let token = ''
               for (let entry of response.headers.entries()) {
                  if (entry[0] === 'authorization') {
                     token = entry[1]
                  }
               }
               if (url === 'login') {
                  url = 'signin'
                  Data.post(url, data)
                     .then(res => {
                        if (res.success) {
                           const expirationDate = new Date(new Date().getTime() + 3600000)
                           Auth.authenticateUser(token)
                           localStorage.setItem('name', res.name)
                           localStorage.setItem('expirationDate', expirationDate)
                           localStorage.setItem('userId', res.userId)
                           dispatch(authSuccess(token, res.localId))
                           dispatch(setSnackbar('success', res.message))
                        }
                        else {
                           dispatch(setSnackbar('error', res.message))
                           dispatch(authFail(res.message))
                        }
                     }).catch(err => {
                        dispatch(setSnackbar('error', 'Има проблем с връзката, моля презаредете страницата!'))
                        dispatch(authFail('Има проблем с връзката, моля презаредете страницата!'))
                     })
               }
            })
      }
   }
}


export const authCheckState = () => {
   return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
         dispatch(logout())
      } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'))
         if (expirationDate > new Date()) {
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
         }
         else {
            dispatch(logout())
         }
      }
   }
}