import { useState } from 'react';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { products } from '../mocks/products';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main() {
  const [isTableModalVisibile, setIsTableModalVisibile] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // {
    //   quantity: 1,
    //   product: products[0]
    // },
    // {
    //   quantity: 2,
    //   product: products[1],
    // }
  ]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisibile(false);
  }

  function handleCancelOrder() {
    setSelectedTable('');
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

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisibile(true)}>Novo Pedido</Button>
          )}

          {selectedTable && (
            <Cart cartItems={cartItems} />
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
