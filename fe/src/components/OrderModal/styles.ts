import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed; // ficará fixado na tela, acima de tudo
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.5rem;
    }

    button {
      line-height: 0;
      border: 0;
      background: transparent;
    }
  }

  .status-container {
    margin-top: 2rem;

    small {
      opacity: 0.8;
      font-size: .875rem;
    }

    div {
      margin-top: .5rem;
      display: flex;
      align-items: center;
      gap: .5rem;
    }
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  & + strong {
    font-weight: 500;
    font-size: .875rem;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 1rem;

    .item {
      display: flex;

      /* Sempre que eu tiver um item que é precedido por outro item, o margin-top será aplicado */
      & + .item {
        margin-top: 1rem;
      }

      img {
        border-radius: 6px;
      }

      .quantity {
        font-size: .875rem;
        color: #666;
        display: block; // um bloco, como se fosse uma div
        min-width: 1.25rem;
        margin-left: .75rem;
      }

      .product-details {
        margin-left: 4px;

        strong {
          display: block;
          font-weight: 700;
          color: #333333;
          margin-bottom: .25rem;
        }

        span {
          font-size: .875rem;
          color: #666;
        }
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  .primary {
    background: #333333;
    border-radius: 48px;
    border: 0;
    color: #fff;
    font-size: 1rem;
    padding: .75rem 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
  }

  .secondary {
    padding: 14px 24px;
    border: 0;
    background: transparent;
    color: #d73035;
    font-weight: bold;
    font-size: 14px;
    margin-top: 12px;
  }
`;
