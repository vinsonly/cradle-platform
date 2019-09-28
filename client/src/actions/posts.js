import axios from 'axios';

export const UPDATE_POSTS = 'posts/UPDATE_POSTS'
export const UPDATE_POSTS_REQUESTED = 'posts/UPDATE_POSTS_REQUESTED'
export const UPDATE_POSTS_ERR = 'posts/UPDATE_POSTS_ERR'
export const UPDATE_MSG = 'posts/UPDATE_MSG'

export const getPosts = () => {
    return dispatch => {
      dispatch({
        type: UPDATE_POSTS_REQUESTED
      })

      
      return axios.get("http://localhost:5000/api/hello-world").then(res => {
        // console.log("hello world res: ", res);
        dispatch({
          type: UPDATE_MSG,
          payload: res.data
        })
      })

      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
          console.log("get posts res: ", res);
          dispatch({
              type: UPDATE_POSTS,
              payload: res.data
          })
      }).catch(err => {
          console.err(err);
          dispatch({
              type: UPDATE_POSTS_ERR
          })
      })
    }
  }