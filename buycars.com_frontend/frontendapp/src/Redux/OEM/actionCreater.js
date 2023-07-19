import { OEM_FAILURE, OEM_REQUEST, OEM_SUCCESS } from "./actionType";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
function Data_Req_action() {
  return { type: OEM_REQUEST };
}

function Data_Success_action(payload) {
  return { type: OEM_SUCCESS, payload: payload };
}
function Data_Failure_action(payload) {
  return { type: OEM_FAILURE, payload };
}

let url = process.env.REACT_APP_URL;

export const getOEM = (token) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    const res = await axios.get(`${url}oem_specs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    dispatch(Data_Success_action(res.data.data));
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};
