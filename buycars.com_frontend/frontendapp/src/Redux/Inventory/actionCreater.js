import {
  INVENTORY_FAILURE,
  INVENTORY_REQUEST,
  INVENTORY_SUCCESS,
} from "./actionType";
import axios from "axios";
import { useDispatch } from "react-redux";
function Data_Req_action() {
  return { type: INVENTORY_REQUEST };
}

function Data_Success_action(payload) {
  return { type: INVENTORY_SUCCESS, payload: payload };
}
function Data_Failure_action(payload) {
  return { type: INVENTORY_FAILURE, payload };
}

let url = process.env.REACT_APP_URL;

export const getData = () => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    const res = await axios.get(url);
    console.log(res.data);
    dispatch(Data_Success_action(res.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};
