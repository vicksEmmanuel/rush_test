import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import useApi from '../modules/hooks/useApi';
import {
  AddShopDefaultValue,
  AddShopSchema,
  Shop,
} from '../schemas/AddShopSchema';

/**
 *
 * @param onItemAdded(e: Shop) executes after a new item as been created
 * @returns JSX.Element
 */
const AddItemsButton = ({ onItemAdded }: { onItemAdded?(e: Shop): void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { addShoppingList } = useApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: AddShopDefaultValue,
    resolver: yupResolver(AddShopSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: Shop) => {
    toast({ title: 'Successful', colorScheme: 'green' });
    addShoppingList(data);
    onItemAdded?.(data);
    reset();
    onClose();
  };

  return (
    <>
      <div
        onClick={onOpen}
        data-testid="open"
        className="rounded-full w-20 h-20 bg-button absolute bottom-10 right-10 cursor-pointer z-50 flex justify-center items-center"
      >
        <AiOutlinePlus size={30} color={'#fff'} />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add To Shopping List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <div className="flex flex-col mb-4">
                  <Input
                    placeholder="Add Product Name"
                    className="my-1"
                    {...register('name')}
                    data-testid="name"
                  />
                  <span className="text-red-500 text-xs italic w-full">
                    {errors.name && errors.name?.message}
                  </span>
                </div>

                <div className="flex flex-col mb-4">
                  <Input
                    placeholder="Add Store Name"
                    className="my-1"
                    data-testid={`store`}
                    {...register('store')}
                  />
                  <span className="text-red-500 text-xs italic w-full">
                    {errors.store && errors.store?.message}
                  </span>
                </div>

                <div className="flex flex-col mb-4">
                  <Input
                    placeholder="Store Link"
                    className="my-1"
                    data-testid={`storelink`}
                    {...register('storeLink')}
                  />
                  <span className="text-red-500 text-xs italic w-full">
                    {errors.storeLink && errors.storeLink?.message}
                  </span>
                </div>

                <div className="flex justify-end my-10">
                  <Button
                    isDisabled={!isEmpty(errors)}
                    type="submit"
                    data-testid="button"
                    colorScheme="blue"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemsButton;
