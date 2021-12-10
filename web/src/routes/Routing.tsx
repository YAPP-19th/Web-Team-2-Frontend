import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import MyPage from 'pages/MyPage';
import ProfileEditPage from 'pages/ProfileEditPage';
import RegisterPage from 'pages/RegisterPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import SendPasswordPage from 'pages/SendPasswordPage';
import React, { ReactElement, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Path from 'routes/path';

const routingComponents = [
  { path: Path.MainPage, element: <MainPage /> },
  { path: Path.Home, element: <MainPage /> },
  { path: Path.MyPage, element: <MyPage /> },
  { path: Path.ProfileEditPage, element: <ProfileEditPage /> },
];

const publicRoutingComponents = [
  { path: Path.LoginPage, element: <LoginPage /> },
  { path: Path.RegisterPage, element: <RegisterPage /> },
  { path: Path.ResetPasswordPage, element: <ResetPasswordPage /> },
  { path: Path.SendPasswordPage, element: <SendPasswordPage /> },
  { path: Path.Home, element: <Navigate replace to={Path.LoginPage} /> },
];

export function Routing(): ReactElement {
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

export function PublicRouting(): ReactElement {
  const publicRoutes = useMemo(() => {
    return publicRoutingComponents.map((component, index) => {
      const { path, element } = component;
      return (
        <Route key={`${component}_${index}`} path={path} element={element} />
      );
    });
  }, [publicRoutingComponents]);

  return <Routes>{publicRoutes}</Routes>;
}
