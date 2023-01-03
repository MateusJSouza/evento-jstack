import { useEffect } from 'react';

import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';

interface OrderModalProps {
  visible: boolean;
  isLoading: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus
}: OrderModalProps) {
  // Se visible for igual a false ou não tiver o order, então este componente não será renderizado
  if (!visible || !order) {
    return null;
  }

  /*
    FORMA 1 DE FAZER A CONTAGEM DO TOTAL DE PRODUTOS COM O FOREACH
    let total = 0;

    // Pegando o valor que já tem dentro do total e somando a ele o resultado da expressão
    order.products.forEach(({ product, quantity }) => {
      total += (product.price * quantity);
    });
  */

  // O valor do accumulator é o valor que nós retornamos na execução anterior dessa função
  const total = order.products.reduce((total, { quantity, product }) => {
    return total + (product.price * quantity);
  }, 0);

  // Fechando o modal a partir da tecla "Esc" do teclado
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Se a tecla 'Esc' for clicada, é chamada a função onClose para fechar o modal
      if (event.key === 'Escape') {
        onClose();
      }
    }
    // Adicionando o evento de tecla e passando a função para ser monitorada
    document.addEventListener('keydown', handleKeyDown);

    // Removendo o evento quando a função já não for mais chamada
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <Overlay>
        <ModalBody>
          <header>
            <strong>Mesa {order.table}</strong>
            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Ícone de fechar o modal" />
            </button>
          </header>

          <div className="status-container">
            <small>Status do pedido</small>
            <div>
              <span>
                {order.status === 'WAITING' && '🕒'}
                {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
                {order.status === 'DONE' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Fila de espera'}
                {order.status === 'IN_PRODUCTION' && 'Em preparação'}
                {order.status === 'DONE' && 'Pronto!'}
              </strong>
            </div>
          </div>

          <OrderDetails>
            <strong>Itens</strong>

            <div className="order-items">
              {order.products.map(({ _id, product, quantity }) => (
                <div className="item" key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width="56"
                    height="28.51"
                  />
                  <span className="quantity">{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </OrderDetails>

          <Actions>
            {order.status !== 'DONE' ? (
              <>
                <button
                  type="button"
                  className="primary"
                  onClick={onChangeOrderStatus}
                  disabled={isLoading}
                >
                  <span>
                    {order.status === 'WAITING' && '👩‍🍳'}
                    {order.status === 'IN_PRODUCTION' && '✅'}
                  </span>
                  <strong>
                    {order.status === 'WAITING' && 'Iniciar produção'}
                    {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
                  </strong>
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={onCancelOrder}
                >
                  Cancelar pedido
                </button>
              </>
            ) : (
              <button
                type="button"
                className="secondary"
                disabled={isLoading}
                onClick={onCancelOrder}
              >
                <span>
                  {order.status === 'DONE' && '🧹'}
                </span>
                <strong>
                  {order.status === 'DONE' && 'Limpar pedido'}
                </strong>
              </button>
            )}
          </Actions>
        </ModalBody>
      </Overlay>
    </>
  );
}
