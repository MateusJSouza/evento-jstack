import { useEffect, useState } from 'react';

import socketIo from 'socket.io-client';

import { Order } from '../../types/Order';
import { api } from '../../utils/api';

import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Conectando o websocket para que todo pedido que entrar, entre no dashboard sem precisar atualizar a página
  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      // Concatenando no final da lista adicionando o pedido que acabou de entrar no banco, recebendo os dados via socket
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  // Pega todos os pedidos cadastrados
  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data);
    });
  }, [orders]);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    // Mantendo apenas os pedidos que tem o ID diferente do que acabou de ser deletado
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId ? { ...order, status } : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
