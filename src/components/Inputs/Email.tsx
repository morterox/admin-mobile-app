import React from 'react';
import Input from './Input';

export default function EmailInput({value, setter, mandatory}) {
  return <Input label={`Email${mandatory ? `*` : ``}`} placeholder={`Email`} setter={setter} value={value} />;
}
