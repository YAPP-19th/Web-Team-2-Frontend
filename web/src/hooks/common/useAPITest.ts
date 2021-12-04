/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useEffect } from 'react';

const BASE_URL = 'http://3.38.152.22:8081/api/v1';
const AccessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjM4NTgzMTY2LCJleHAiOjE2Mzg2Njk1NjZ9.iHscs1fT7XCSb4dtHyO4U_JPblCDVb3gsoie_vBPBkifgbbr7jZ4Xv3g7AZPljVIDTWhLq3YgIq-my7duA3huw';

const RefreshToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjM4NTgzMTY2LCJleHAiOjE2NDExNzUxNjZ9.k_hus8w0Un4yIRiP0_miMICSJcPYh9Pc5Tl2xXuz9FnfjUQmHYymc6ROflpCZU8RxY1zH0wNzsYBZemnF0recg';

const header = {
  headers: {
    AccessToken: `Bearer ${AccessToken}`,
  },
};

export default function useAPITest() {
  // 프로필 배경색 설정  (구현X)
  const setProfileBackgroundColor = async () => {
    const body = { backgroundColor: 'blue' };
    const response = await axios.post(
      `${BASE_URL}/mypage/background-color`,
      body,
      header,
    );
    return response.data;
  };

  // 프로필 사진 변경  (구현x)
  const changeProfile = async () => {
    const body = {
      profileImage:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    };
    const response = await axios.patch(
      `${BASE_URL}/mypage/profile-image`,
      body,
      header,
    );
    return response.data;
  };

  // 로그인 & 회원가입  (완료)
  const googleLogin = async () => {
    const body = {
      email: 'abc@gmail.com',
      imageUrl:
        'https://yapp-bucket-test.s3.ap-northeast-2.amazonaws.com/static/fb1d764c-e6ec-4142-bbe1-3a3543f22638',
      name: 'juhyun',
      socialType: 'google',
    };
    const response = await axios.post(`${BASE_URL}/user/oauth2Login`, body);
    return response.data;
  };

  // accessToken 재 발급  (완료)
  const reIssuanceAccessToken = async () => {
    const response = await axios.get(`${BASE_URL}/user/reIssuanceAccessToken`, {
      headers: {
        AccessToken: `Bearer ${AccessToken}`,
        RefreshToken: `Bearer ${RefreshToken}`,
      },
    });
    return response.data;
  };

  // 검색 (완료)
  const search = async () => {
    const userId = 1;
    const keyWord = 'naver';
    const page = 0; // 몇번째 페이지
    const size = 12; // 한페이지당 보여줄 갯수
    const sort:
      | 'saveTime,desc'
      | 'saveTime,asc'
      | 'clickCount,desc'
      | 'clickCount,asc' = 'saveTime,desc';
    const remind = true;
    const response = await axios.get(
      `${BASE_URL}/bookmark/${userId}/${keyWord}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
      header,
    );
    return response.data;
  };

  // 북마크 조회(페이징) (완료)
  const getBookmarks = async () => {
    const folderId = '1';
    const page = 0; // 몇번째 페이지
    const size = 9; // 한페이지당 보여줄 갯수
    const sort:
      | 'saveTime,desc'
      | 'saveTime,asc'
      | 'clickCount,desc'
      | 'clickCount,asc' = 'saveTime,desc';
    const remind = true;
    const response = await axios.get(
      `${BASE_URL}/bookmark/${folderId}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
      header,
    );
    return response.data;
  };

  // 휴지통 북마크 조회(페이징) (완료)
  const getTrashBookmark = async () => {
    const page = 0; // 몇번째 페이지
    const size = 12; // 한페이지당 보여줄 갯수
    const sort:
      | 'saveTime,desc'
      | 'saveTime,asc'
      | 'clickCount,desc'
      | 'clickCount,asc' = 'saveTime,desc';
    const remind = true;
    const response = await axios.get(
      `${BASE_URL}/trash?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
      header,
    );
    return response.data;
  };

  // 휴지통 복원 (완료)
  const restoreTrash = async () => {
    const body = {
      bookmarkIdList: ['61a76e6219f8936b1e18f304'],
    };
    const response = await axios.patch(
      `${BASE_URL}/trash/restore`,
      body,
      header,
    );
    return response.data;
  };

  // 휴지통 영구 삭제 (완료)
  const deleteTrash = async () => {
    const body = {
      bookmarkIdList: ['61a76e6219f8936b1e18f304'],
    };
    const response = await axios.post(
      `${BASE_URL}/trash/truncate`,
      body,
      header,
    );
    return response.data;
  };

  // 폴더 조회  (완료)
  const getFolders = async () => {
    const response = await axios.get(`${BASE_URL}/folder`, header);
    return response.data;
  };

  // 폴더 추가
  const createFolder = async () => {
    const body = {
      parentId: 0,
      name: '첫번째 보관함',
      index: 3,
    };
    const response = await axios.post(`${BASE_URL}/folder`, body, header);
    return response.data;
  };

  // 폴더 이름 수정
  const updateFolderName = async () => {
    const body = {
      name: '첫번째 보관함 수정',
    };
    const folderId = '123123123';
    const response = await axios.patch(
      `${BASE_URL}/folder/${folderId}/name`,
      body,
      header,
    );
    return response.data;
  };

  // 폴더 이모지 수정
  const updateFolderEmoji = async () => {
    const body = {
      emoji: 'X123',
    };
    const folderId = '123123123';
    const response = await axios.patch(
      `${BASE_URL}/folder/${folderId}/emoji`,
      body,
      header,
    );
    return response.data;
  };

  // 폴더 이동
  const moveFolder = async () => {
    const body = {
      prevParentId: '123123123',
      nextParentId: '123123123',
      prevIndex: 1,
      nextIndex: 0,
    };
    const folderId = '123123123';
    const response = await axios.patch(
      `${BASE_URL}/folder/${folderId}`,
      body,
      header,
    );
    return response.data;
  };

  // 폴더 삭제
  const deleteFolder = async () => {
    const folderId = '123123123';
  };

  // 북마크 추가
  const createBookmark = async () => {
    const folderId = '123123123';
    const body = {
      url: 'https://www.naver.com',
      title: '네이버',
      remind: true,
    };

    const response = await axios.post(
      `${BASE_URL}/bookmark/${folderId}`,
      body,
      header,
    );

    return response.data;
  };

  // 북마크 수정
  const updateBookmark = async () => {
    const body = {
      title: '네이버 수정',
      remind: true,
    };
    const bookmarkId = '123123123';
    const response = await axios.patch(
      `${BASE_URL}/bookmark/${bookmarkId}`,
      body,
      header,
    );
    return response.data;
  };

  // 북마크 이동
  const moveBookmark = async () => {
    const body = {
      prevFolderId: '123123123',
      nextFolderId: '123123123',
    };
    const bookmarkId = '123123123';
    const response = await axios.patch(
      `${BASE_URL}/bookmark/move/${bookmarkId}`,
      body,
      header,
    );
    return response.data;
  };

  // 북마크 삭제 (완료)
  const deleteBookmark = async () => {
    const bookmarkId = '61a76e6219f8936b1e18f304';
    const response = await axios.delete(
      `${BASE_URL}/bookmark/${bookmarkId}`,
      header,
    );
    return response.data;
  };

  useEffect(() => {
    const test = async () => {
      // const response = await setProfileBackgroundColor();
      //   const response = await changeProfile();
      // const response = await googleLogin();
      // const response = await reIssuanceAccessToken();
      // const response = await search();
      // const response = await getBookmarks();
      // const response = await getTrashBookmark();
      // const response = await restoreTrash();
      // const response = await deleteTrash();
      // const response = await getFolders();
      // const response = await createFolder();
      //   const response = await updateFolderName();
      //   const response = await updateFolderEmoji();
      //   const response = await moveFolder();
      //   const response = await deleteFolder();
      //   const response = await createBookmark();
      //   const response = await updateBookmark();
      //   const response = await moveBookmark();
      // const response = await deleteBookmark();
      // console.log(response);
    };
    test();
  }, []);

  return {
    getFolders,
  };
}
