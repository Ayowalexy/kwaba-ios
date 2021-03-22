import {uploadFileTypes} from '../actions/documentUploadActions';


const INITIAL_STATE = {
  fileProgress: {
      2:  {
          id: 2,
          title: 'Government Issued ID Card',
          isUploading: false,
          progress: 0,
          isUploaded: false
        },
    
      3:  {
          id: 3,
          title: 'Work Identity ',
          isUploading: false,
          progress: 0,
          isUploaded: false
        },
       4: {
          id: 4,
          title: 'Passport Photo',
          isUploading: false,
          progress: 0,
          isUploaded: false
        },
        5: {
          id: 5,
          title: 'Employment Letter',
          isUploading: false,
          progress: 0,
          isUploaded: false
        }
    // format will be like below
    // 1: {
    //   id: 1,
    //   file,
    //   progress: 0,
    //   cancelSource: source,
    //   status: 0,
    // },
  }
}

const fileProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
     case uploadFileTypes.SET_UPLOAD_PROGRESS:
         console.log(action.payload)
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
      }

    case uploadFileTypes.SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 1,
            isUploading: false,
            isUploaded: true
          },
        },
      }

    case uploadFileTypes.FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 0,
            progress: 0,
            isUploading: false,
            isUploaded: false
          },
        },
      }

    default:
      return state
  }
}

export default fileProgressReducer
