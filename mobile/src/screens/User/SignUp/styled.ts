import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg900};
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(20)}px;
  width: 100%;
  justify-content: space-between;
  padding: ${RFPercentage(3)}px;
  padding-top: ${RFValue(48)}px;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
`;

const imageWidth = 150;

export const ImageWrapper = styled.View`
  width: ${RFValue(imageWidth)}px;
  height: ${RFValue(imageWidth)}px;
`;

export const ProfileImage = styled.Image`
  width: ${RFValue(imageWidth)}px;
  height: ${RFValue(imageWidth)}px;
  border-radius: ${RFValue(imageWidth / 2)}px;
`;

export const ButtonCamContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  background-color: ${({ theme }) => theme.colors.main900};

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Form = styled.View`
  width: 100%;
  padding: ${RFPercentage(3)}px;
  align-items: center;
`;
