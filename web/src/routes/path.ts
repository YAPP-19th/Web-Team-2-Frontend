enum Path {
  Home = '/',
  HomeAll = '/*',
  MainPage = '/:folderId',
  TrashPage = '/trash',
  SearchPage = '/search',
  MyPage = '/mypage',
  ProfileEditPage = '/mypage/profile',

  // no Logged In
  LoginPage = '/login',
  RegisterPage = '/register',
  ResetPasswordPage = '/resetpw',
  SendPasswordPage = '/sendpw',
}

export default Path;
