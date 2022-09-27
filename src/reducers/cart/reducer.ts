import produce from 'immer';
import { formatNumber } from '../../utils/format';
import { ActionTypes } from './actions';

export interface Shirt {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
  totalPrice: number;
  quantity: number;
  priceFormatted: string;
}

export interface CartState {
  products: Shirt[];
  amount: number;
  numberOfItems: number;
}

export const cartReducer = (state: CartState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_CART: {
      const findProductIndex = state.products.findIndex(
        product => product.id === action.payload.newProduct.id,
      );

      return produce(state, draft => {
        let newProduct = {
          ...action.payload.newProduct,
        } as Shirt;

        if (findProductIndex !== -1) {
          console.log(newProduct);

          newProduct.quantity =
            newProduct.quantity + draft.products[findProductIndex].quantity;
          newProduct.totalPrice = newProduct.quantity * newProduct.price;

          draft.products[findProductIndex] = newProduct;
        } else {
          draft.products.push(action.payload.newProduct);
        }

        draft.numberOfItems = state.numberOfItems + 1;

        draft.amount = formatNumber(
          draft.products.reduce(
            (prevValue, currentValue) => prevValue + currentValue.totalPrice,
            0,
          ),
        );
      });
    }
    case ActionTypes.REMOVE_PRODUCT_CART: {
      const existProductIndex = state.products.findIndex(
        product => product.id === action.payload.productId,
      );

      if (existProductIndex < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.products.splice(existProductIndex, 1);
        draft.amount = formatNumber(
          state.amount - state.products[existProductIndex].totalPrice,
        );
        draft.numberOfItems =
          state.numberOfItems - state.products[existProductIndex].quantity;
      });
    }
    case ActionTypes.RESET_CART:
      return {
        amount: 0,
        products: [],
        numberOfItems: 0,
      };

    default:
      return state;
  }
};
