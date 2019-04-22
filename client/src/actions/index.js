import axios from 'axios';
import { AUTH_USER } from './types';

export const signup = formProps => dispatch => {
  axios.post('http://localhost:3090/signup', formProps);
};



// これは
// export const signup = ({ email, password }) => {
//   return function(dispatch){
//      ....
//   }
// };
// とおなじ
