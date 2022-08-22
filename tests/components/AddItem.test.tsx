import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import AddItemsButton from '../../components/AddItemsButton';

jest.mock('uuid', () => {
  const base = '9134e286-6f71-427a-bf00-';
  let current = 100000000000;

  return {
    v4: () => {
      const uuid = base + current.toString();
      current++;

      return uuid;
    },
  };
});

describe('Add Item Flow', () => {
  it('Add item flow', () => {
    const { getByTestId, debug } = render(<AddItemsButton />);
    fireEvent.click(getByTestId('open'));

    const name = getByTestId('name');
    const store = getByTestId('store');
    const storeLink = getByTestId('storelink');

    fireEvent.change(name, { target: { value: 'Testing' } });
    fireEvent.change(store, { target: { value: 'Testing' } });
    fireEvent.change(storeLink, { target: { value: 'Testing' } });
  });
});
