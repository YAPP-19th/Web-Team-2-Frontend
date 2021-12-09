import useLayerClose from 'hooks/common/useLayerClose';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ProfileColorPaletteProps {
  isOpen: boolean;
  onToggleOpen: () => void;
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
  background-color: ${(props) => props.theme.color.white};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 ${(props) => props.theme.color.shadow2};
`;

function ProfileColorPalette({
  isOpen,
  onToggleOpen,
}: ProfileColorPaletteProps): ReactElement {
  const { targetEl } = useLayerClose(isOpen, onToggleOpen);

  return (
    <PaletteWrapper ref={targetEl}>
      <PaletteInner>ProfileColorPalette</PaletteInner>
    </PaletteWrapper>
  );
}

export default ProfileColorPalette;
