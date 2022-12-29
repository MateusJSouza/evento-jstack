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
    alert(product.name);
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
