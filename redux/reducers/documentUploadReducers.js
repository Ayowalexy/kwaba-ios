import {uploadFileTypes} from '../actions/documentUploadActions';

const INITIAL_STATE = {
  fileProgress: {
    1: {
      id: 1,
      title: 'Bank Statement',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    2: {
      id: 2,
      title: 'Government Issued ID Card',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    3: {
      id: 3,
      title: 'Work Identity ',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    4: {
      id: 4,
      title: 'Passport Photo',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    5: {
      id: 5,
      title: 'Employment Letter',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    6: {
      id: 6,
      title: 'Utility Bill',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    // format will be like below
    // 1: {
    //   id: 1,
    //   file,
    //   progress: 0,
    //   cancelSource: source,
    //   status: 0,
    // },
  },
};

const fileUploadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uploadFileTypes.SET_UPLOAD_PROGRESS:
      console.log(action.payload);
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            isUploading: true,
            progress: action.payload.progress,
          },
        },
      };

    case uploadFileTypes.SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            isUploading: false,
            isUploaded: true,
          },
        },
      };

    case uploadFileTypes.FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            progress: 0,
            isUploading: false,
            isUploaded: false,
          },
        },
      };
    case uploadFileTypes.SHOW_UPLOADED_FILES:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            documentID: action.payload.documentID,
            isUploaded: true,
          },
        },
      };
    case uploadFileTypes.DELETE_UPLOADED_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            documentID: '',
            isUploaded: false,
            progress: 0,
          },
        },
      };

    default:
      return state;
  }
};

export default fileUploadReducer;
