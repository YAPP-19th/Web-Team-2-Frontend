import Path from 'routes/path';

export const isLogin = (): boolean =>
  Boolean(localStorage.getItem('accessToken'));

export const logout = (): void => {
  localStorage.clear();
  window.location.href = Path.LoginPage;
};
