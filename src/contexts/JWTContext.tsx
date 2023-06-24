import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { api } from '../config';
import { setSession } from '../utils/jwt';
import { get, post } from '../redux/slices/api'
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';
import { useDispatch } from 'src/redux/store';
import { setIsOpen } from 'src/redux/slices/auth';
import { isString } from 'lodash';
import { fileToBase64 } from 'src/utils/toBase64';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const dispatcher = useDispatch()
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  const initialize = async () => {
    const accessToken = window.localStorage.getItem('@adeva-accessToken');
    const refreshToken = window.localStorage.getItem('@adeva-refreshToken');

    if (accessToken && refreshToken) {
      setSession(accessToken, refreshToken);
      try {
        var response = await get('user/userData')
        var user = { ...response.data }

        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } catch (e) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } else {
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    var emBase64 = btoa(`${email}:${password}`)
    api.defaults.headers.common.Authorization = `Basic ${emBase64}`

    try {
      var res = await get('auth/login');
      const { accessToken, refreshToken } = res.data;

      if (accessToken && refreshToken) {
        setSession(accessToken, refreshToken);
        try {
          var response = await get('user/userData')
          var user = { ...response.data }
          dispatcher(setIsOpen(false))
          dispatch({
            type: Types.Login,
            payload: {
              user,
            },
          });
        } catch (e) {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          return e
        }
      }
    } catch (e) {
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      return e
    }

    return res;
  };

  const register = async (email: string, password: string, name: string, oabNumber: string, sectional: string, photo: any, description: string) => {
    try {
      if (!isString(photo)) {
        var image64 = await fileToBase64(photo)
        var imageRes = await api.post('/fileTransfer/sendFile', { base64: image64, path: photo.path })
        photo = imageRes.data.url
      }
      console.log(photo)
      var response = await post('auth/register', {
        email,
        password,
        name,
        oabNumber,
        sectional,
        photo,
        description
      });
      const { accessToken, refreshToken } = response.data;
      setSession(accessToken, refreshToken);
      try {
        var res = await get('user/userData')
        var user = { ...res.data }
        dispatcher(setIsOpen(false))
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } catch (e) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      return e
    }
  };

  const logout = async () => {
    await post('auth/logout', {})
    setSession(null, null);
    dispatch({ type: Types.Logout });
    window.location.reload()
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        initialize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
