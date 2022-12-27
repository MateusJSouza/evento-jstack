import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, OrderContent, OrderHeader, TableCard } from './styles';

interface HeaderProps {
  selectedTable: string;
}

export function Header({ selectedTable }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem-vindo(a)</Text>
          <Text size={24} weight="700">
          WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <OrderContent>
          <OrderHeader>
            <Text size={24} weight="600">Pedido</Text>
            <TouchableOpacity>
              <Text size={14} color="#D73035" weight="600">cancelar pedido</Text>
            </TouchableOpacity>
          </OrderHeader>

          <TableCard>
            <Text color="#666">Mesa {selectedTable}</Text>
          </TableCard>
        </OrderContent>
      )}
    </Container>
  );
}
