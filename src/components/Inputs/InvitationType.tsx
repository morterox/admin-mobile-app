import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import {useEffect} from 'react';
import {getInvitationTypes} from '../../services/api';

export default function InvitationType({setter, value}) {
  const [invitationTypes, setInvitationTypes] = useState([]);

  const invitationsById = {};

  invitationTypes.map((entity) => {
    invitationsById.id = entity.valor_codigo;
    invitationsById.label = entity.valor_desc;
  });

  const defaultValue = {
    id: value,
    label: invitationsById[value]?.label || `SELECTTT`
  };

  useEffect(() => {
    getInvitationTypes().then((result) => {
      setInvitationTypes(
        result.map((invitationType) => {
          return {
            label: invitationType.valor_desc,
            id: invitationType.valor_codigo
          };
        })
      );
    });
  }, []);

  return (
    <SelectDropdown
      data={invitationTypes}
      onSelect={(selectedItem) => {
        setter(selectedItem);
      }}
      renderDropdownIcon={(isOpened) => {
        return <FontAwesome name={isOpened ? `chevron-up` : `chevron-down`} color={`#444`} size={18} />;
      }}
      renderCustomizedButtonChild={(selectedItem, index) => {
        console.log(selectedItem);
        return (
          <View>
            <Text>{selectedItem?.label || value?.label || value || `SELECCIONAR TIPO DE INVITADO...`}</Text>
          </View>
        );
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      buttonStyle={{
        borderWidth: 1,
        width: `100%`
      }}
      rowTextForSelection={(item, index) => {
        return item.label;
      }}
    />
  );
}
