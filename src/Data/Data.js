import Auth from "../Containers/Auth/Auth"

const baseURL = process.env.REACT_APP_SERVER_URL

const getOptions = () => ({
   mode: 'cors',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   }
})

const handleJsonResponse = res => res.json();
const applyAuthorizationHeader = (options, authenticated) => {
   if (authenticated) {
      options.headers.Authorization = Auth.getToken()
      options.headers.userId = window.localStorage.getItem('userId')
   }
}

class Data {
   static get(url, authenticated = Auth.isUserAuthenticated()) {
      let options = getOptions()
      options.method = 'GET'
      applyAuthorizationHeader(options, authenticated)
      return window.fetch(
         `${baseURL}${url}`,
         options)
         .then(handleJsonResponse)
   }

   static post(url, data, authenticated = Auth.isUserAuthenticated()) {
      let options = getOptions()
      options.method = 'POST'
      options.body = JSON.stringify(data)
      applyAuthorizationHeader(options, authenticated)
      return window.fetch(
         `${baseURL}${url}`,
         options)
         .then(handleJsonResponse)
   }

   static getToken(url, data) {
      let options = getOptions()
      options.method = 'POST'
      options.body = JSON.stringify(data)
      return window.fetch(
         `${baseURL}${url}`,
         options)
   }
}

export default Data