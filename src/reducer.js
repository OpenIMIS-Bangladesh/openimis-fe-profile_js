import { formatGraphQLError, formatServerError } from "@openimis/fe-core";

export function reducer(
  state = {
    fetchingUser: null,
    fetchedUser: null,
    user: null,
    errorUser: null,


    


    //update profile states
    updatingProfile: false,
    errorUpdatingProfile: null,
    updatedProfile: false
  },
  action
) {
  switch (action.type) {
    case "PROFILE_ROLES_REQ":
      return {
        ...state,
        fetchingUser: true,
        fetchedUser: false,
        user: null,
        errorUser: null,
      };
    case "PROFILE_ROLES_RESP":
      return {
        ...state,
        fetchingUser: false,
        fetchedUser: true,
        user: action.payload.data.user,
        errorUser: formatGraphQLError(action.payload),
      };
    case "PROFILE_ROLES_ERR":
      return {
        ...state,
        fetchingUser: false,
        errorUser: formatServerError(action.payload),
      };
      
    case "PROFILE_UPDATE_REQ":
      return {
        ...state,
        updatingProfile: true,
        errorUpdatingProfile: null,
      };
    case "PROFILE_UPDATE_RESP":
      return {
        ...state,
        updatedProfile: true,
        errorUpdatingProfile: null,
      };
    case "PROFILE_UPDATE_ERR":
      return {
        ...state,
        updatedProfile: false,
        errorUpdatingProfile: null,
      };

    default:
      return state;
  }
}
