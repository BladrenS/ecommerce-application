import { useCatalogContext } from '../../../../../pages/Catalog';

export const useSize = () => {
  const { filters, setFilters } = useCatalogContext();

  const handleChangeCheckbox = (size: string) => {
    setFilters((previous) => {
      if (previous.size.includes(size)) {
        return { ...previous, size: previous.size.filter((s) => s !== size) };
      }

      return { ...previous, size: [...previous.size, size] };
    });
  };

  return { selectedSize: filters.size, handleChangeCheckbox };
};
