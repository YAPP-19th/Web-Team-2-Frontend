import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import MyPage from 'pages/MyPage';
import RegisterPage from 'pages/RegisterPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import React, { ReactElement, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Path from 'routes/path';

const routingComponents = [
  { path: Path.MainPage, element: <MainPage /> },
  { path: Path.MyPage, element: <MyPage /> },
  { path: Path.LoginPage, element: <LoginPage /> },
  { path: Path.RegisterPage, element: <RegisterPage /> },
  { path: Path.ResetPasswordPage, element: <ResetPasswordPage /> },
];

function Routing(): ReactElement {
  const routes = useMemo(() => {
    return routingComponents.map((component, index) => {
      const { path, element } = component;
      return (
        <Route key={`${component}_${index}`} path={path} element={element} />
      );
    });
  }, [routingComponents]);

  return <Routes>{routes}</Routes>;
}

export default Routing;
