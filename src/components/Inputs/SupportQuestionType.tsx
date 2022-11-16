import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {supportQuestionTypes} from '../../config/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import {apiGetSupportMotives} from '../../services/api';

export default function SupportQuestionType({setter}) {
  const [questionTypes, setQuestionTypes] = useState([]);

  useEffect(() => {
    const getMotives = async () => {
      const data = await apiGetSupportMotives();
      setQuestionTypes(
        data.map((sup: any) => {
          return {
            label: sup.motivo,
            id: sup.valor_codigo
          };
        })
      );
    };
    getMotives().catch(console.error);
  }, []);

  return (
    <SelectDropdown
      data={questionTypes}
      onSelect={(selectedItem) => {
        setter(selectedItem);
      }}
      renderDropdownIcon={(isOpened) => {
        return <FontAwesome name={isOpened ? `chevron-up` : `chevron-down`} color={`#444`} size={18} />;
      }}
      renderCustomizedButtonChild={(selectedItem, index) => {
        return (
          <View>
            <Text>{selectedItem?.label || `Motivo de consulta`}</Text>
          </View>
        );
      }}
      defaultButtonText="Motivo de consulta"
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
