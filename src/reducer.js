import {
  formatGraphQLError,
  formatServerError,
  dispatchMutationReq,
  dispatchMutationResp,
  dispatchMutationErr,
  parseData
} from "@openimis/fe-core";

export function reducer(
  state = {
    fetchingUser: null,
    fetchedUser: null,
    user: null,
    errorUser: null,
     ///workforce document ///
    fetchingDocument: false,
    errorDocument: null,
    fetchedDocument: false,
    document: [],
    documentPageInfo: { totalCount: 0 },

    //update profile states
    updatingProfile: false,
    errorUpdatingProfile: null,
    updatedProfile: false,

    uploadedFilesByField: {},

    uploadFile: [],
    uploadDependentFile: [],
  },
  action
) {
  switch (action.type) {
    case "SET_UPLOADED_FILES":
      return {
        ...state,
        uploadedFilesByField: {
          ...state.uploadedFilesByField,
          [action.payload.fieldKey]: action.payload.files,
        },
      };

    case "REMOVE_UPLOADED_FILE":
      return {
        ...state,
        uploadedFilesByField: {
          ...state.uploadedFilesByField,
          [action.payload.fieldKey]: state.uploadedFilesByField[action.payload.fieldKey]?.filter((f) => f.file.name !== action.payload.fileName) || [],
        },
      };

    case "CLEAR_ALL_UPLOADED_FILES":
      return {
        ...state,
        uploadedFilesByField: {},
      };
    case "SET_UPLOAD_FILE_DATA":
      return {
        ...state,
        uploadFile: [...(state.uploadFile || []), action.payload],
      };
    case "SET_UPLOAD_DEPENDENT_FILE_DATA":
      return {
        ...state,
        uploadDependentFile: [...(state.uploadDependentFile || []), action.payload],
      };
    
    case "WORKFORCE_DOCUMENT_REQ":
      return {
        ...state,
        fetchingDocument: true,
        fetchedDocument: false,
        document: null,
        errorDocument: null,
      };
    case "WORKFORCE_DOCUMENT_RESP":
      return {
        ...state,
        fetchingDocument: false,
        fetchedDocument: true,
        document: parseData(action.payload.data.workforceDocuments),
        errorDocument: formatGraphQLError(action.payload),
      };

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
    case "DOCUMENT_MUTATION_REQ": {
      return dispatchMutationReq(state, action);
    }
    case "DOCUMENT_MUTATION_ERR":
      return dispatchMutationErr(state, action);
    case "DOCUMENT_CREATE_DOCUMENT_RESP":
      return dispatchMutationResp(state, "createWorkforceDocument", action);
    case "DOCUMENT_UPDATE_DOCUMENT_RESP":
      return dispatchMutationResp(state, "updateWorkforceDocument", action);

    default:
      return state;
  }
}
