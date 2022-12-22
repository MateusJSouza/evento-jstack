import styled from 'styled-components';

export const Board = styled.div`
  padding: 1rem;
  border: .0625rem solid rgba(204, 204, 204, 0.4);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; // ocupar o máximo de espaço possível

  /* Os estilos só se aplicam a headers que são filhos diretos do Board  */
  > header {
    padding: .5rem;
    font-size: .875rem;
    display: flex;
    align-items: center;
    gap: .5rem;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;

  button {
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: .5rem;
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .25rem;

    strong {
      font-weight: 500;
    }

    span {
      font-size: .875rem;
      color: #666;
    }

    /*
      Toda vez que eu tiver um botão em que o elemento anterior a ele também
      for um botão
    */
    & + button {
      margin-top: 1.5rem;
    }
  }
`;
