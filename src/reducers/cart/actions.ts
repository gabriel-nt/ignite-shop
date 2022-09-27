import { Shirt } from './reducer';

export enum ActionTypes {
  RESET_CART = 'RESET_CART',
  ADD_PRODUCT_CART = 'ADD_PRODUCT_CART',
  REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART',
}

export const resetCartAction = () => ({
  type: ActionTypes.RESET_CART,
});

export const addProductToCartAction = (newProduct: Shirt) => ({
  type: ActionTypes.ADD_PRODUCT_CART,
  payload: {
    newProduct,
  },
});

export const removeProductFromCartAction = (productId: string) => ({
  type: ActionTypes.REMOVE_PRODUCT_CART,
  payload: {
    productId,
  },
});
