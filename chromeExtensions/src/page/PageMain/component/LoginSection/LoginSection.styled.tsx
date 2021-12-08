import styled from '@emotion/styled';

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const ButtonArea = styled.div`
  display: block;
  width: 172px;
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
  color: #ffffff;
  font-size: 14px;
  line-height: 21px;
`;

export const LinedButton = styled(Button)`
  margin-top: 12px;
  border: solid 1px #aaaaaa;
  background-color: #ffffff;
  color: #aaaaaa;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #0baa78;
`;
