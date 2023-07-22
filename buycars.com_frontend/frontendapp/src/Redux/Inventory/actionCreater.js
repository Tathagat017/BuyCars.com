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

export const getData =
  (token, page = 1, search = "") =>
  async (dispatch) => {
    dispatch(Data_Req_action());
    try {
      if (search !== "") {
        const res = await axios.get(`${url}inventory?search=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log(res.data);
        dispatch(Data_Success_action(res.data));
      } else {
        const res = await axios.get(`${url}inventory/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        dispatch(Data_Success_action(res.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(Data_Failure_action(err));
    }
  };

export const postData = (token, obj) => async (dispatch) => {
  console.log("here");
  dispatch(Data_Req_action());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //console.log(token, obj);
    axios
      .post(`${url}inventory/add`, obj, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const patchData = (token, id, obj) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    //console.log(token, obj);
    const res = await axios.patch(`${url}inventory/deal/${id}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(res);
    alert("Edit succesfully done");
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const deletehData = (token, id) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    console.log("delete", id);
    const res = await axios.delete(`${url}inventory/deal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
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
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};

export const getDataFilter =
  (token, filterword, filter) => async (dispatch) => {
    console.log(filter, filterword);
    dispatch(Data_Req_action());
    try {
      {
        console.log(filter);
        const res = await axios.get(`${url}inventory?${filterword}=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        dispatch(Data_Success_action(res.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(Data_Failure_action(err));
    }
  };

export const getDataSort = (token, sort) => async (dispatch) => {
  dispatch(Data_Req_action());
  try {
    {
      const res = await axios.get(
        `${url}inventory?sort="vehicle_dealer_price
"&sortBy=${"vehicle_dealer_price"}&sortOrder=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      dispatch(Data_Success_action(res.data));
    }
  } catch (err) {
    console.log(err);
    dispatch(Data_Failure_action(err));
  }
};
