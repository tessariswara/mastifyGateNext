import React, { useReducer } from 'react';
import Style from '@/app/login.module.css';
import StyleModal from '@/app/modal.module.css';
import { useRouter } from 'next/router';
import { setToken } from '@/components/api/token';
import RootLayout from '@/components/RootLayout';

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
        setToken(token);
        console.log("Data login berhasil:", data.data.Token);
        if (data.message === 'success') { 
          console.log("Login berhasil!");
          router.push('/home');
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
    <RootLayout>
    <div className={Style.overlayLogin}>
      <div className={Style.backgroundLogin}>
        <img src="/images/background.png" alt="" />
      </div>
      <div className={Style.containerLogin}> 
        <img className={Style.logo} src="/images/habitat.png" alt="" />
        <p className={Style.head}>Welcome to Habitat. Please sign in to your account</p>
        <div className={Style.containerForm}>
          <div className={Style.formModal}>
            <input type="text" id="username" value={state.username} onChange={dataForm} placeholder='Username' required/>
          </div>
          <div className={Style.formModal}>
            <input type="password" id="password" value={state.password} onChange={dataForm} placeholder='Password' />
          </div>
          <div>
            <button onClick={loginButton} disabled={state.loading}>Login</button>
          </div>
          {state.error && <p className={Style.error}>{state.error}</p>}
          <p className={Style.foot}>Project collaboration of Mast and WIT.ID ©️ 2024 All rights reserved</p>
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default login;