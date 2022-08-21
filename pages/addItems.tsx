import AddItemsButton from '../components/AddItemsButton';
import Listing from '../components/Listing';
import Layout from '../layout/layout';

const AddItems = () => {
  return (
    <Layout>
      <Listing editable />
      <AddItemsButton />
    </Layout>
  );
};

export default AddItems;
