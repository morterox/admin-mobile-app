import React from 'react';
import Input from './Input';

export default function FullNameInput({value, setter, label, mandatory}) {
  return <Input label={label + (mandatory ? `*` : ``)} placeholder={label} setter={setter} value={value} />;
}
