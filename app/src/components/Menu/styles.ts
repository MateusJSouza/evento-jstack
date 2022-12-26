import styled from 'styled-components/native';

export const Product = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 8px;
`;

export const ProductDetails = styled.View`
  margin-left: 16px;
  flex: 1; // ocupa todo o espaço disponível
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background: rgba(204, 204, 204, 0.3);
`;