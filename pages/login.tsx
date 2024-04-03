import React, { useReducer } from 'react';
import Style from '@/app/login.module.css';
import StyleModal from '@/app/modal.module.css';
import { useRouter } from 'next/router';
// import { setToken } from '@/components/api/token'

const initialState = {
  username: '',
  password: '',
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};



const login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dataForm = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.id, value: e.target.value });
  };

  const router = useRouter();

  const loginButton = async () => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await fetch('http://178.128.107.238:8000/apiv1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password
        })
      });

      if (response.ok) {
        dispatch({ type: 'LOGIN_SUCCESS' });
        const data = await response.json();
        const token = data.data.Token;
        // setToken(token);
        console.log("Data login berhasil:", data.data.Token);
        if (data.message === 'success') { 
          console.log("Login berhasil!");
          router.push('/');
        }
      } else {
        const errorData = await response.json();
        dispatch({ type: 'LOGIN_FAILURE', error: errorData.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Terjadi kesalahan pada saat login:', error);
      dispatch({ type: 'LOGIN_FAILURE', error: 'Terdapat kesalahan pada saat login' });
    }
  };

  return (
    <div className={Style.overlayLogin}>
      <div className={Style.containerLogin}> 
        <h1>Log In</h1>
        <div className={StyleModal.containerForm}>
          <div className={StyleModal.formModal}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={state.username} onChange={dataForm} />
          </div>
          <div className={StyleModal.formModal}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={state.password} onChange={dataForm} />
          </div>
          <div>
            <button onClick={loginButton} disabled={state.loading}>Log In</button>
          </div>
          {state.error && <p>{state.error}</p>}
        </div>
      </div>
    </div>
  );
};

export default login;