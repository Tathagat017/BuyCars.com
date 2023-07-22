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

export const getOEM =
  (token, page = 1, search = "") =>
  async (dispatch) => {
    console.log(url);
    dispatch(Data_Req_action());
    try {
      if (search != "") {
        const res = await axios.get(`${url}oem_specs?search=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(Data_Success_action(res.data.data));
        console.log(res.data.data);
      } else {
        const res = await axios.get(`${url}oem_specs?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(Data_Success_action(res.data.data));
      }
      // console.log(res.data);
    } catch (err) {
      console.log(err);
      dispatch(Data_Failure_action(err));
    }
  };

export const postOEM = (token, obj) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    const res = await axios.post(`${url}oem_specs/add`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};
