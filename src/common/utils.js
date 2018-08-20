import axios from 'axios';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  ajaxGet(api, params, callback) {
    axios.get(api, params)
      .then(callback)
      .catch((err) => {
        console.warn(err);
      });
  },
  ajaxPost(api, data, callback) {
    axios.post(api, data)
      .then(callback)
      .catch((err) => {
        console.warn(err);
      });
  },
};
