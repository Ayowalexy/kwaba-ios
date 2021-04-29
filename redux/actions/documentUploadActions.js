import axios from 'axios';

  export const uploadFileTypes = {
    SET_UPLOAD_FILE: 'SET_UPLOAD_FILE',
    SET_UPLOAD_PROGRESS: 'SET_UPLOAD_PROGRESS',
    SUCCESS_UPLOAD_FILE: 'SUCCESS_UPLOAD_FILE',
    FAILURE_UPLOAD_FILE: 'FAILURE_UPLOAD_FILE',
    SHOW_UPLOADED_FILES: 'SHOW_UPLOADED_FILES',
    DELETE_UPLOADED_FILE: 'DELETE_UPLOADED_FILE'
  };

  
  export const setUploadProgress = (id, progress) => ({
    type: uploadFileTypes.SET_UPLOAD_PROGRESS,
    payload: {
      id,
      progress,
    },
  });
  
  export const successUploadFile = id => ({
    type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
    payload: id,
  });
  
  export const failureUploadFile = id => ({
    type: uploadFileTypes.FAILURE_UPLOAD_FILE,
    payload: id,
  });

  export const uploadFile = (token, item, data) => {
    return async (dispatch) => {
<<<<<<< HEAD

=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
      const config = {
    onUploadProgress: (progressEvent) => {
    const {loaded, total} = progressEvent;
    const percentageProgress = Math.floor((loaded * 100) / total)
    dispatch(setUploadProgress(item.id, percentageProgress))
    console.log( `${loaded}kb of ${total}kb | ${percentageProgress}%` ) // just to see whats happening in the console
    },
    headers: {
      'Content-Type': 'application/json', Authorization: token
    }
    };
<<<<<<< HEAD

    try {
  
=======
    try {
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
      const response = await axios.post('http://67.207.86.39:8000/api/v1/application/documents/upload', data, config);
      console.log(response);
      if (response.status == 200){
        dispatch(successUploadFile(item.id))
      }
<<<<<<< HEAD
      
    } catch (error) {
      console.log("here is the error",error);
=======
    } catch (error) {
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
      console.log(error.response.data);
      dispatch(failureUploadFile(item.id))
    }
  }}

  export const showUploadedFiles =(id, documentID)=> ({
    type: uploadFileTypes.SHOW_UPLOADED_FILES,
    payload: {
      id,
      documentID,
    },
  });

  export const deleteUploadedFile = id => ({
    type: uploadFileTypes.DELETE_UPLOADED_FILE,
    payload: id
  });
<<<<<<< HEAD

  export const deleteFile = id => ({
    type: uploadFileTypes.DELETE_UPLOADED_FILE,
    payload: id
  });




=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
  
  
  
  
