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

  strong {
    font-weight: 500;
    font-size: .875rem;
    opacity: 0.8;
  }
`;
