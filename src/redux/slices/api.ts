import { createSlice } from '@reduxjs/toolkit';
// utils
import { api } from '../../config';
import { setSession } from '../../utils/jwt';

// @types
import { dispatch } from '../store';
// ----------------------------------------------------------------------

type ApiState = {
  isLoading: boolean,
  error: Error | string | null;
};

const initialState: ApiState = {
  isLoading: true,
  error: null,
};

const slice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  },
});

// Reducer
export default slice.reducer;

async function getNewAccessToken(refreshToken: string){
    api.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
    try{
      var response = await api.get('auth/getNewToken');
      var newAccessToken = response.data.accessToken;
      setSession(newAccessToken, refreshToken);
    }catch(e){
      if(e.response.data.code === 401 || e.response.status === 401){
          console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
      }
      if(e.response.data.code === 403 || e.response.status === 403){
          console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
      }
      if(e.response.data.code === 500 || e.response.status === 500) {
          console.log('ERRO DESCONHECIDO')
      };
    }
}

export function get(url: string) {
  return new Promise<any>(async function (resolve, reject) {

    dispatch(slice.actions.startLoading());
    var refreshToken = window.localStorage.getItem('@adeva-refreshToken');

    try{
      var res = await api.get(url);
      resolve(res);
    }catch(e){
      if(e.response.data.code === 400 || e.response.status === 400){
        console.log('ERROR: ' + e.response.data.message)
        reject(e.response)
      }

      // Faltando token
      if(e.response.data.code === 401 || e.response.status === 401){
          console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
          reject(e.response)
      }


      if(e.response.data.code === 404 || e.response.status === 404){
        console.log('ERROR: ' + e.response.data.message)
        reject(e.response)
      }

      if(e.response.data.code === 500 || e.response.status === 500) {
        console.log('ERRO DESCONHECIDO')
        reject(e.response)
      }

      // Token inválido ou inativo
      else if(e.response.data.code === 403 || e.response.status === 403){
          if(refreshToken){
              await getNewAccessToken(refreshToken);
          }else{
              console.log('NO REFRESH TOKEN')
          }

          try{
            var newRes = await api.get(url)
            resolve(newRes);
          }catch(e){
            if(e.response.data.code === 400 || e.response.status === 400){
              console.log('ERROR: ' + e.response.data.message)
              reject(e.response)
            }

            if(e.response.data.code === 403 || e.response.status === 403){
                console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
                reject(e.response)
            }

            if(e.response.data.code === 404 || e.response.status === 404){
              console.log('ERROR: ' + e.response.data.message)
              reject(e.response)
            }
  
            if(e.response.data.code === 500 || e.response.status === 500) {
                console.log('ERRO DESCONHECIDO')
                reject(e.response)
            };
          } 
      }
    }
  })
}

export function post(url: string, body: any) {
  return new Promise<any>(async function (resolve, reject) {

    dispatch(slice.actions.startLoading());
    var refreshToken = window.localStorage.getItem('@adeva-refreshToken');

    try{
      var res = await api.post(url, body);
      resolve(res)
    }catch(e){

      if(e.response.data.code === 400 || e.response.status === 400){
        console.log('ERROR: ' + e.response.data.message)
        reject(e.response)
      }

      // Faltando token
      if(e.response.data.code === 401 || e.response.status === 401){
          console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
          reject(e.response)
      }

      if(e.response.data.code === 404 || e.response.status === 404){
        console.log('ERROR: ' + e.response.data.message)
        reject(e.response)
      }

      if(e.response.data.code === 500 || e.response.status === 500) {
        console.log('ERRO DESCONHECIDO')
        reject(e.response)
      }

      // Token inválido ou inativo
      else if(e.response.data.code === 403 || e.response.status === 403){
          if(refreshToken){
              await getNewAccessToken(refreshToken);
          }else{
              console.log('NO REFRESH TOKEN')
          }

          try{
            var newRes = await api.post(url, body)
            resolve(newRes);
          }catch(e){

            if(e.response.data.code === 400 || e.response.status === 400){
              console.log('ERROR: ' + e.response.data.message)
              reject(e.response)
            }

            if(e.response.data.code === 403 || e.response.status === 403){
                console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
                reject(e.response)
            }

            if(e.response.data.code === 404 || e.response.status === 404){
              console.log('ERROR: ' + e.response.data.message)
              reject(e.response)
            }
  
            if(e.response.data.code === 500 || e.response.status === 500) {
                console.log('ERRO DESCONHECIDO')
                reject(e.response)
            };
          } 
      }
    } 
  })
}

export function put(url: string, body: any) {
  return new Promise<any>(async function (resolve, reject) {

    dispatch(slice.actions.startLoading());
    var refreshToken = window.localStorage.getItem('@adeva-refreshToken');

    try{
      var res = await api.put(url, body);
      resolve(res);
    }catch(e){

      if(e.response.data.code === 400 || e.response.status === 400){
        console.log('ERROR: ' + e.response.data.message)
        reject(e.response)
      }

      // Faltando token
      if(e.response.data.code === 401 || e.response.status === 401){
          console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
          reject(e.response)
      }

      if(e.response.data.code === 404 || e.response.status === 404){
        console.log('ERROR: ' + e.response.data.message)
        reject(e.response)
      }

      if(e.response.data.code === 500 || e.response.status === 500) {
        console.log('ERRO DESCONHECIDO')
        reject(e.response)
      }

      // Token inválido ou inativo
      else if(e.response.data.code === 403 || e.response.status === 403){
          if(refreshToken){
              await getNewAccessToken(refreshToken);
          }else{
              console.log('NO REFRESH TOKEN')
          }

          try{
            var newRes = await api.put(url, body)
            resolve(newRes);
          }catch(e){

            if(e.response.data.code === 400 || e.response.status === 400){
              console.log('ERROR: ' + e.response.data.message)
              reject(e.response)
            }

            if(e.response.data.code === 403 || e.response.status === 403){
                console.log('UNAUTHORIZED ERROR: ' + e.response.data.message)
                reject(e.response)
            }

            if(e.response.data.code === 404 || e.response.status === 404){
              console.log('ERROR: ' + e.response.data.message)
              reject(e.response)
            }
  
            if(e.response.data.code === 500 || e.response.status === 500) {
                console.log('ERRO DESCONHECIDO')
                reject(e.response)
            };
          } 
      }
    } 
  })
}
  