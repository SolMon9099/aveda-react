import jwtDecode from 'jwt-decode';
// routes
import { api } from '../config';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// const handleTokenExpired = (exp: number) => {
//   let expiredTimer;

//   const currentTime = Date.now();

//   // Test token expires after 10s
//   // const timeLeft = currentTime + 10000 - currentTime; // ~10s
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(() => {
//     alert('Token expired');

//     localStorage.removeItem('accessToken');

//     window.location.href = PATH_AUTH.login;
//   }, timeLeft);
// };

const setSession = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken && refreshToken) {
    localStorage.setItem('@adeva-accessToken', accessToken);
    localStorage.setItem('@adeva-refreshToken', refreshToken);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('@adeva-accessToken');
    localStorage.removeItem('@adeva-refreshToken');
    delete api.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
