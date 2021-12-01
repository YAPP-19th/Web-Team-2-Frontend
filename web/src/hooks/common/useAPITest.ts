/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useEffect } from 'react';

const BASE_URL = 'http://3.38.152.22:8081/api/v1';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjM4MzYzMzMzLCJleHAiOjE2Mzg0NDk3MzN9.8kfraj8oe37OdHMd5CRPJCV8rOLzNaLQzAs7Cvx7BtEuX_gFS1Z2WvkWsNRIYMLuksNoIL50fq50gJSCDihP-g';

const header = {
  headers: {
    AccessToken: `Bearer ${token}`,
  },
};

export default function useAPITest() {
  // 프로필 배경색 설정
  const setProfileBackgroundColor = async () => {
    const body = { backgroundColor: 'blue' };
    const response = await axios.post(
      `${BASE_URL}/mypage/background-color`,
      body,
      header,
    );
    return response.data;
  };

  // 프로필 사진 변경
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

  // 로그인 & 회원가입 (완료)
  const googleLogin = async () => {
    const body = {
      email: 'abc@gmail.com',
      imageUrl: 'http://www.asdkljzxcoasdkas.com/',
      name: 'juhyun',
      socialType: 'google',
    };
    const response = await axios.post(`${BASE_URL}/user/oauth2Login`, body);
    return response.data;
  };

  // accessToken 재 발급 // 질문 , header에 Access-Token, Refresh-Token을  넣는게 맞나?
  const reIssuanceAccessToken = async () => {
    const response = await axios.get(`${BASE_URL}/user/reIssuanceAccessToken`);
    return response.data;
  };

  // 검색 (완료)
  const search = async () => {
    const userId = 1;
    const keyWord = '네이버';
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

  // 휴지통 북마크 조회(페이징)
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

  // 휴지통 복원
  const restoreTrash = async () => {
    const body = {
      bookmarkIdList: ['123123123', '123123'],
    };
    const response = await axios.patch(
      `${BASE_URL}/trash/restore`,
      body,
      header,
    );
    return response.data;
  };

  // 휴지통 영구 삭제 // delete 에는 body 넣을 수 없음.
  const deleteTrash = async () => {
    console.log('delete 에는 body 넣을 수 없음.');
  };

  // 폴더 조회 // 이거 구현 안되면 아무것도 못함
  const getFolders = async () => {
    console.log('폴더 조회 구현 안되면 아무것도 못함');
  };

  // 폴더 추가
  const createFolder = async () => {
    const body = {
      parentId: 0,
      name: '첫번째 보관함',
      index: 2,
    };
    const response = await axios.post(`${BASE_URL}/folder`, body, header);
    return response.data;
  };

  // 폴더 이름 수정 // folderId는 주소에 있고 name은 body에 있음
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

  // 폴더 삭제 // delete는 body 넣을 수 없음
  const deleteFolder = async () => {
    const folderId = '123123123';
  };

  // 북마크 추가 //description 이 없음
  const createBookmark = async () => {
    const folderId = '123123123';
    const body = {
      url: 'https://www.naver.com',
      title: '네이버',
      //   description: '네이버 홈페이지',
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

  // 북마크 삭제
  const deleteBookmark = async () => {
    const bookmarkId = '123123123';
    const response = await axios.delete(
      `${BASE_URL}/bookmark/${bookmarkId}`,
      header,
    );
    return response.data;
  };

  useEffect(() => {
    const test = async () => {
      //   const response = await setProfileBackgroundColor();
      //   const response = await changeProfile();
      //   const response = await googleLogin();
      //   const response = await reIssuanceAccessToken();
      //   const response = await search();
      const response = await getBookmarks();
      //   const response = await getTrashBookmark();
      //   const response = await restoreTrash();
      //   const response = await deleteTrash();
      //   const response = await getFolders();
      //   const response = await createFolder();
      //   const response = await updateFolderName();
      //   const response = await updateFolderEmoji();
      //   const response = await moveFolder();
      //   const response = await deleteFolder();
      //   const response = await createBookmark();
      //   const response = await updateBookmark();
      //   const response = await moveBookmark();
      //   const response = await deleteBookmark();
      console.log(response);
    };
    test();
  }, []);
}
