import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionTypes";
import axios from "axios";

const loginRequestAction = () => {
  return { type: LOGIN_REQUEST };
};

const loginSuccessAction = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};

const loginFailureAction = () => {
  return { type: LOGIN_FAILURE };
};

const url = process.env.REACT_APP_API_URL;
console.log(url);
export const login = (email, password) => async (dispatch) => {
  //  login Functionality
  let obj = { email: email, password: password };
  dispatch(loginRequestAction());
  try {
    const res = await axios.post(url, obj);
    // console.log(res.data.token);
    dispatch(loginSuccessAction(res.data.token));
  } catch (err) {
    dispatch(loginFailureAction());
    console.log(err);
  }
};
