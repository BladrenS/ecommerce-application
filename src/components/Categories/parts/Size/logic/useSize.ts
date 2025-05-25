import { useState } from 'react';

export const useSize = () => {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);

  const handleChangeCheckbox = (size: string) => {
    setSelectedSize((previous) => {
      if (previous.includes(size)) {
        return previous.filter((s) => s !== size);
      }

      return [...previous, size];
    });
  };

  const filterQuery = (sizes: string[]) => {
    return `variants.attributes.sizes:${sizes.map((size) => `"${size}"`).join(',')}`;
  };

  return { selectedSize, handleChangeCheckbox, filterQuery };
};
