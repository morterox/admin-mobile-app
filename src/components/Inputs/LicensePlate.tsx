import React from 'react';
import Input from './Input';

export default function LicensePlateInput({value, setter}) {
  return <Input label={`Patente`} placeholder={`Patente`} setter={setter} value={value} />;
}
