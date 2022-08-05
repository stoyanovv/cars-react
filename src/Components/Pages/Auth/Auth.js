import { decodeToken } from "react-jwt"

class Auth {
   static saveUser(user) {
      window.localStorage.setItem('user', JSON.stringify(user))
   }

   static getUser() {
      const userJson = window.localStorage.getItem('user')
      if (userJson) {
         return JSON.parse(userJson)
      }
      return {}
   }

   static removeUser() {
      window.localStorage.removeItem('user')
   }

   static authenticateUser(jwtToken) {
      window.localStorage.setItem('token', jwtToken)

   }

   static isUserAuthenticated() {
      return window.localStorage.getItem('token') !== null
   }

   static deauthenticateUser() {
      window.localStorage.removeItem('token')
   }

   static getToken() {
      return window.localStorage.getItem('token')
   }

   static isAdmin() {
      const decodedToken = decodeToken(Auth.getToken())
      let roles
      if (decodedToken) {
         roles = decodedToken.Authorities
         roles = roles.map(role => role.authority)
         return roles.includes('ROLE_ADMIN')
      }
      return false
   }
}

export default Auth