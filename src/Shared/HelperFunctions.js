export const checkValidity = (value, rules) => {
   let isValid = true;
   if (!rules) {
      return true;
   }

   if (rules.required) {
      isValid = value.trim() !== '' && isValid;
   }

   if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
   }

   if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
   }

   if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
   }

   if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
   }

   return isValid;
}

export const updateObject = (oldObject, updatedProperties) => {
   return {
      ...oldObject,
      ...updatedProperties
   };
};

export const randomColor = (brightness = 0) => {
   function randomChannel(brightness) {
      const r = 255 - brightness;
      const n = 0 | ((Math.random() * r) + brightness);
      const s = n.toString(16);
      return (s.length === 1) ? '0' + s : s;
   }
   return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}

export const parseDate = (date) => {
   const year = date.getFullYear()
   const month = date.getMonth() + 1
   const day = date.getDate()
   const hours = date.getHours()
   const minutes = date.getMinutes()
   const seconds = date.getSeconds()

   return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const headers = {
   'headers': {
      "Access-Control-Allow-Origin": "*",
      "token": localStorage.getItem('token'),
      'Content-Type': 'application/json',
      "userId": window.localStorage.getItem('userId')
   }
}

export const addLeadingZeros = (value) => {
   value = String(value);
   while (value.length < 2) {
      value = '0' + value;
   }
   return value;
}