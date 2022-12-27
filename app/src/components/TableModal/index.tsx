import { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { isAndroid } from '../../utils/isAndroid';
import { Button } from '../Button';
import { Close } from '../Icons/Close';

import { Text } from '../Text';

import { Form, Header, Input, ModalBody, Overlay } from './styles';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  // Fechando modal e salvando o número da mesa
  function handleSaveModal() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      {/* O 'padding' empurra as coisas para cima quando o teclado é ativado */}
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
              onChangeText={setTable}
            />
            <Button
              onPress={handleSaveModal}
              disabled={table.length === 0}
            >
                Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
