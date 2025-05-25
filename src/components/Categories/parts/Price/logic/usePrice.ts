import { type ChangeEvent, useState } from 'react';

export const usePrice = () => {
  const [value, setValue] = useState({
    from: '',
    to: '',
  });

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValue((previous) => {
      return { ...previous, [name]: value };
    });
  };

  const filterQuery = () => {
    return `variants.price.centAmount:range (${value.from} to ${value.to})`;
  };

  return { value, changeValue, filterQuery };
};
