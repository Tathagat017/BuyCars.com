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
    const res = await axios.get(`${url}inventory/`);
    console.log(res.data);
    dispatch(Data_Success_action(res.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const postData = (token, obj) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    console.log(token, obj);
    const res = await axios.post(`${url}inventory/add`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    dispatch(Data_Success_action(res.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const patchData = (token, id) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    console.log(token);
    const res = await axios.patch(`${url}inventory/deal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    dispatch(Data_Success_action(res.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const deletehData = (token, id) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    const res = await axios.delete(`${url}inventory/deal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    dispatch(Data_Success_action(res.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const deletehDataMany = (token, obj, id) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    console.log(token, obj);
    const res = await axios.delete(`${url}inventory/deal/deleteMany`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    dispatch(Data_Success_action(res.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};
