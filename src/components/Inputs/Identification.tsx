import React from 'react';
import Input from './Input';

export default function IdentificationInput({value, setter}) {
  return <Input label={`Documento`} placeholder={`Documento`} setter={setter} value={value} />;
}
