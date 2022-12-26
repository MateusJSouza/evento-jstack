import { Modal, TouchableOpacity } from 'react-native';
import { isAndroid } from '../../utils/isAndroid';
import { Button } from '../Button';
import { Close } from '../Icons/Close';

import { Text } from '../Text';

import { Form, Header, Input, ModalBody, Overlay } from './styles';

export function TableModal() {
  return (
    <Modal
      transparent
    >
      {/* O 'padding' empurra as coisas para cima quando o teclado é ativado */}
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
            />
            <Button onPress={() => alert('Salvou')}>
                Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
