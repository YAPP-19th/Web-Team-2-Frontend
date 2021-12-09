import useLayerClose from 'hooks/common/useLayerClose';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { profilePaletteColors } from 'utils/palette';

interface ProfileColorPaletteProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onChangeProfileImage: (newImg: string) => void;
}

const PaletteWrapper = styled.div`
  position: absolute;
  left: 55px;
  top: 72px;
  z-index: 102;
`;

const PaletteInner = styled.div`
  width: 144px;
  height: 80px;
  padding: 12px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 ${(props) => props.theme.color.shadow2};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColorItem = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  cursor: pointer;
  &:nth-child(4n) {
    margin-right: 0px;
  }
`;

function ProfileColorPalette({
  isOpen,
  onToggleOpen,
  onChangeProfileImage,
}: ProfileColorPaletteProps): ReactElement {
  const { targetEl } = useLayerClose(isOpen, onToggleOpen);

  return (
    <PaletteWrapper ref={targetEl}>
      <PaletteInner>
        {profilePaletteColors.map((color) => (
          <ColorItem
            key={color.color}
            src={color.image}
            onClick={() => {
              onChangeProfileImage(color.image);
              onToggleOpen();
            }}
          />
        ))}
      </PaletteInner>
    </PaletteWrapper>
  );
}

export default ProfileColorPalette;
