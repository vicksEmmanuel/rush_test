import { uuid } from 'short-uuid';
import * as yup from 'yup';
import { Shop } from '../state/useShopList';

export const AddShopDefaultValue: Shop = {
  name: '',
  dateTime: new Date(),
  store: '',
  storeLink: '',
  id: uuid(),
};

export const AddShopSchema = yup
  .object({
    dateTime: yup.date().required(),
    name: yup
      .string()
      .required('Product Name is required')
      .min(3, 'Product Name value cannot be less than 3 characters'),
    store: yup
      .string()
      .required('Store Name value is required')
      .min(3, 'Store Name value cannot be less than 3 characters'),
    storeLink: yup.string().url('Provide a valid url').nullable(),
    id: yup.string().required(),
  })
  .required();
