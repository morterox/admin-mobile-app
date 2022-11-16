import React from 'react';
import Input from './Input';

export default function CellphoneInput({value, setter, mandatory}) {
  return <Input label={`Celular${mandatory ? `*` : ``}`} placeholder={`Celular`} setter={setter} value={value} />;
}
