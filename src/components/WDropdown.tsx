import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const motivos = [`Egypt`, `Canada`, `Australia`, `Ireland`];

interface IWButton {
  title: string;
}

const WDropdown = ({title}: IWButton) => {
  return (
    <View>
      <SelectDropdown
        dropdownIconPosition="right"
        defaultButtonText={title}
        data={motivos}
        renderDropdownIcon={(isOpened) => {
          return <FontAwesome name={isOpened ? `chevron-up` : `chevron-down`} color={`#444`} size={18} />;
        }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
  );
};

export default WDropdown;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`
  }
});
