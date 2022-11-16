import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {identificationTypes} from '../../config/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import {getIdentificationTypes} from '../../services/api';

export default function IdentificationTypeInput({setter, value}) {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    getIdentificationTypes().then((result) => {
      setEntities(
        identificationTypes
        /* result.map((entity) => {
          return {
            label: entity.valor_desc,
            id: entity.valor_codigo
          };
        }) */
      );
    });
  }, []);

  return (
    <SelectDropdown
      data={entities}
      onSelect={(selectedItem) => {
        setter(selectedItem);
      }}
      renderDropdownIcon={(isOpened) => {
        return <FontAwesome name={isOpened ? `chevron-up` : `chevron-down`} color={`#444`} size={18} />;
      }}
      renderCustomizedButtonChild={(selectedItem, index) => {
        return (
          <View>
            <Text>{selectedItem || value || `Seleccione tipo de documento...*`}</Text>
          </View>
        );
      }}
      defaultButtonText="Tipo de documento...*"
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      buttonStyle={{
        borderWidth: 1,
        width: `100%`
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
}
