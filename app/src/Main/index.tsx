import { useState } from 'react';

import { Cart } from '../components/Cart';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { TableModal } from '../components/TableModal';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';
import { ActivityIndicator } from 'react-native';

export function Main() {
  const [isTableModalVisibile, setIsTableModalVisibile] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisibile(false);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisibile(true);
    }

    setCartItems((prevState) => {
      // Verificando se o item selecionado já está dentro do carrinho ou não
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      // Se retornar 0 significa que encontrou
      // Se retornar -1, quer dizer que ele não encontrou dentro da lista
      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];

      const item = newCartItems[itemIndex];

      // Mantém todas as informações substituindo apenas o quantity, dizendo que o quantity é a quantidade que já tem + 1
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1) {

        // Removendo item do carrinho caso ele só tiver uma unidade
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      // Decrementando item do carrinho
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };
      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </CenteredContainer>
        )}

        {/* Se não estiver carregando, ele irá mostrar o menu e as categorias */}
        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            <MenuContainer>
              <Menu onAddToCart={handleAddToCart} />
            </MenuContainer>
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisibile(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisibile}
        onClose={() => setIsTableModalVisibile(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
