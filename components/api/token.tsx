export const setToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.setItem('token');
    }
    return null;
  };

  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };
  
  export const removeToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.removeItem('token');
    }
    return null;
  };