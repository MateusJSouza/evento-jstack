import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

import { isAndroid } from '../utils/isAndroid';

// Configurando área segura para o Android
export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1; // Ocupa a tela inteira
  background: #fafafa;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  min-height: 110px;
`;

export const FooterContainer = styled.SafeAreaView``;
