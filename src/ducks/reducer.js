const initialState = {
  user_name: "",
  id: "",
  profile_pic: ""
};

const REDUCER_USERNAME_INPUT = "REDUCER_USERNAME_INPUT";
const REDUCER_ID_INPUT = "REDUCER_ID_INPUT";
const REDUCER_PROFILE_PIC_INPUT = "REDUCER_PROFILE_PIC_INPUT";

function reducer(state = initialState, action) {
  //   console.log(action);
  switch (action.type) {
    case REDUCER_USERNAME_INPUT:
      return Object.assign({ ...state }, { user_name: action.payload });

    case REDUCER_ID_INPUT:
      return {
        ...state,
        id: action.payload
      };

    case REDUCER_PROFILE_PIC_INPUT:
      return Object.assign({ ...state }, { profile_pic: action.payload });

    default:
      return state;
  }
}

export function reducerUserNameInput(user_name) {
  //   console.log(user_name);
  return {
    type: REDUCER_USERNAME_INPUT,
    payload: user_name
  };
}

export function reducerIDInput(id) {
  //   console.log(id);
  return {
    type: REDUCER_ID_INPUT,
    payload: id
  };
}

export function reducerProfilePicInput(profile_pic) {
  //   console.log(profile_pic);
  return {
    type: REDUCER_PROFILE_PIC_INPUT,
    payload: profile_pic
  };
}

export default reducer;
