import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import {getInvitationRelationsTypes} from '../../services/api';

export default function InvitatonRelationTypeInput({setter, value, mandatory}) {
  const [invitationRelationTypes, setInvitationRelationTypes] = useState([]);

  const invitationRelationTypesById = {};
  invitationRelationTypes.forEach((invitationRelationType) => {
    invitationRelationTypesById[invitationRelationType.id] = invitationRelationType.label;
  });
  let initial_label = invitationRelationTypesById[value];

  useEffect(() => {
    getInvitationRelationsTypes(0).then((result) => {
      setInvitationRelationTypes(
        result.map((invitationRelationType) => {
          return {
            label: invitationRelationType.tipo_vinculo_nombre,
            id: invitationRelationType.tipo_vinculo_id
          };
        })
      );
    });
  }, []);

  return (
    <SelectDropdown
      data={invitationRelationTypes}
      onSelect={(selectedItem) => {
        setter(selectedItem);
      }}
      renderDropdownIcon={(isOpened) => {
        return <FontAwesome name={isOpened ? `chevron-up` : `chevron-down`} color={`#444`} size={18} />;
      }}
      renderCustomizedButtonChild={(selectedItem, index) => {
        return (
          <View>
            <Text>{selectedItem?.label || initial_label || `Seleccione tipo de vinculo...*`}</Text>
          </View>
        );
      }}
      defaultButtonText="Tipo de vinculo...*"
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
