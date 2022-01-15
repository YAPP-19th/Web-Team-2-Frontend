import styled from '@emotion/styled';

export const Wrapper = styled.section`
  flex: 1;
  display: flex;
`;
export const Article = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;
export const FolderWrapper = styled.div`
  flex: 1;
`;
export const InputArticle = styled(Article)`
  width: 190px;
  flex: none;
`;
export const Input = styled.input`
  width: 100%;
  height: 28px;
  padding: 5px 12px 6px 8px;
  margin-bottom: 24px;
  border-radius: 4px;
  border: solid 1px #d4d2cf;
  background-color: #fff;
`;
export const AlarmArea = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;
export const AlarmText = styled.span`
  flex: 1;
  font-size: 10px;
  color: #323232;
`;
export const AlarmIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 3px;
`;
export const AlarmIconText = styled.span<{ active: boolean }>`
  width: 16px;
  font-size: 12px;
  color: ${({ active }) => (active ? '#48bf91' : '#aaa')};
`;
export const HorizontalDivider = styled.hr`
  height: calc(100% - 48px);
  width: 1px;
  margin: 24px 0;
  border: none;
  background-color: #f3f2ef;
`;

export const ButtonArea = styled.div`
  flex: none;
  padding-top: 20px;
  background-color: #ffffff;
`;

export const Button = styled.button`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  background-color: #48bf91;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
`;
