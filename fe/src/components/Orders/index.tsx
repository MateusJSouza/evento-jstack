import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    '_id': '6372e48cbcd195b0d3d0f7f3',
    'table': '123',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'X-Egg',
          'imagePath': '1671826254164-chicken.png',
          'price': 15,
        },
        'quantity': 3,
        '_id': '63a60bab27ef60a5e3f913c7'
      },
      {
        'product': {
          'name': 'Coca cola',
          'imagePath': '1671827843107-coca-cola.png',
          'price': 6,
        },
        quantity: 2,
        '_id': '63a61183559b3693331e62c7'
      }
    ],
  }
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />
    </Container>
  );
}
