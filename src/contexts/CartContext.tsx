import { createContext, useContext, useEffect, useReducer } from 'react';

import {
  addProductToCartAction,
  removeProductFromCartAction,
  resetCartAction,
} from '../reducers/cart/actions';

import { Shirt, cartReducer } from '../reducers/cart/reducer';

interface CartContextProviderProps {
  children: React.ReactNode;
}

interface CartContextData {
  cart: {
    amount: number;
    products: Shirt[];
    numberOfItems: number;
  };
  resetCart: () => void;
  addProductToCart: (product: Shirt) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext({} as CartContextData);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      amount: 0,
      products: [],
      numberOfItems: 0,
    },
    () => {
      if (typeof window !== 'undefined') {
        const storedStateAsJSON = localStorage.getItem(
          '@ignite-shop:cart-state-1.0.0',
        );

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON);
        }
      }

      return {
        amount: 0,
        products: [],
        numberOfItems: 0,
      };
    },
  );

  const addProductToCart = (product: Shirt) => {
    dispatch(addProductToCartAction(product));
  };

  const removeProductFromCart = (productId: string) => {
    dispatch(removeProductFromCartAction(productId));
  };

  const resetCart = () => {
    dispatch(resetCartAction());
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState);

    if (typeof window !== 'undefined') {
      localStorage.setItem('@ignite-shop:cart-state-1.0.0', stateJSON);
    }
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        resetCart,
        cart: cartState,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
