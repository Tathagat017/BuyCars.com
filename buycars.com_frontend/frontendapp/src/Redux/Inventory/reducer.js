import {
  INVENTORY_REQUEST,
  INVENTORY_SUCCESS,
  INVENTORY_FAILURE,
} from "./actionType";

const initialState = {
  isLoading: false,
  inventory_specs: [],
  isError: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INVENTORY_REQUEST: {
      return { ...state, isLoading: true };
    }
    case INVENTORY_SUCCESS: {
      return {
        ...state,
        inventory_specs: action.payload,
        isLoading: false,
      };
    }

    case INVENTORY_FAILURE: {
      return { ...state, isError: action.payload, isLoading: false };
    }

    default: {
      return state;
    }
  }
};
