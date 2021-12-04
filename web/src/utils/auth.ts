export const isLogin = (): boolean =>
  Boolean(localStorage.getItem('accessToken'));
