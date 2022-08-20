import React, { useState } from 'react';
import AddItemsButton from '../components/AddItemsButton';
import Listing from '../components/Listing';
import Layout from '../layout/layout';
import { Shop } from '../schemas/AddShopSchema';

const AddItems = () => {
  const [value, setValue] = useState<Shop>();
  const onItemAdded = (e: Shop) => {
    setValue(e);
  };

  return (
    <Layout>
      <Listing editable value={value} />
      <AddItemsButton onItemAdded={onItemAdded} />
    </Layout>
  );
};

export default AddItems;
