import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

// Identifica em qual plataforma estamos desenvolvendo
const isAndroid = Platform.OS === 'android';

// Configurando área segura para o Android
export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`;

export const CategoryContainer = styled.View``;

export const MenuContainer = styled.View``;

export const Footer = styled.View``;
