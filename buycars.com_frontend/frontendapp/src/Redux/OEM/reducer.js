import { OEM_REQUEST, OEM_SUCCESS, OEM_FAILURE } from "./actionType";

const initialState = {
  isLoading: false,
  oem_specs: [],
  isError: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OEM_REQUEST: {
      return { ...state, isLoading: true };
    }
    case OEM_SUCCESS: {
      return {
        ...state,
        oem_specs: action.payload,
        isLoading: false,
      };
    }

    case OEM_FAILURE: {
      return { ...state, isError: action.payload, isLoading: false };
    }

    default: {
      return state;
    }
  }
};
