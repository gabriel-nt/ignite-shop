import { useCallback, useEffect, useState } from 'react';
import Image from 'next/future/image';
import { Bag, X } from 'phosphor-react';

import logoImg from '../../assets/logo.svg';
import { HeaderContainer, CartButton, CartSummary, CartItem } from './styles';
import { useCartContext } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/format';
import axios from 'axios';

const Header = () => {
  const {
    cart: { numberOfItems, products, amount },
    removeProductFromCart,
  } = useCartContext();

  const [isHydrated, setIsHydrated] = useState(false);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const [isOpenCartSummary, setIsOpenCartSummary] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleCartSummary = () => {
    setIsOpenCartSummary(prevState => !prevState);
  };

  const handleRemoveProductFromCart = useCallback(
    (id: string) => {
      removeProductFromCart(id);
    },
    [removeProductFromCart],
  );

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        products: products.map(product => ({
          price: product.defaultPriceId,
          quantity: product.quantity,
        })),
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!');
    }
  };

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <CartButton onClick={toggleCartSummary}>
        <div>
          <Bag weight="bold" />
          {isHydrated && <span>{numberOfItems}</span>}
        </div>
      </CartButton>

      <CartSummary className={isOpenCartSummary ? 'cart-summary-opened' : ''}>
        <h2>Sacola de compras</h2>
        <X onClick={toggleCartSummary} />
        {isHydrated && (
          <>
            {products.map(({ id, imageUrl, name, quantity, totalPrice }) => (
              <CartItem key={id}>
                <div className="img-container">
                  <Image src={imageUrl} alt="" width={90} height={78} />
                </div>

                <div>
                  <span>{name}</span>
                  <strong>
                    {formatPrice(totalPrice)} ({quantity})
                  </strong>

                  <button onClick={() => handleRemoveProductFromCart(id)}>
                    Remover
                  </button>
                </div>
              </CartItem>
            ))}

            {numberOfItems > 0 ? (
              <footer>
                <div>
                  <span>Quantidade</span>
                  <span>{numberOfItems} itens</span>
                </div>

                <div>
                  <strong>Valor total</strong>
                  <strong>{formatPrice(amount)}</strong>
                </div>

                <button
                  onClick={handleBuyProduct}
                  disabled={isCreatingCheckoutSession}
                >
                  Finalizar compra
                </button>
              </footer>
            ) : (
              <span>Seu carrinho está vazio. Adicione alguns items.</span>
            )}
          </>
        )}
      </CartSummary>
    </HeaderContainer>
  );
};

export default Header;
