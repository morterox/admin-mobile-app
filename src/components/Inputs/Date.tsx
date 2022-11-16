import React, {useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';

export default function DateInput({setter, value, text}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={style.container}>
      <Text>{text}</Text>
      <View style={style.textContainer}>
        <Text style={style.dateText} onPress={() => setOpen(true)}>
          {value ? `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}` : `../../....`}
        </Text>
      </View>
      <DatePicker
        mode="date"
        minimumDate={new Date()}
        locale="es"
        modal
        open={open}
        date={value}
        onConfirm={(value) => {
          setOpen(false);
          setter(value);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: `flex`,
    flexDirection: `column`
  },
  dateText: {
    fontSize: 20
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: `white`
  }
});
