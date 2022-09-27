import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Bag } from 'phosphor-react';
import Image from 'next/future/image';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

import { HomeContainer, Product } from '../styles/pages/home';

import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import Link from 'next/link';
import { useCartContext } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceFormatted: string;
  description: string;
  defaultPriceId: string;
}

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 700px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 3, spacing: 48 },
      },
    },
    slides: {
      perView: 1,
      spacing: 12,
    },
  });

  const { addProductToCart } = useCartContext();

  const handleAddProductToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.stopPropagation();

    addProductToCart({
      ...product,
      quantity: 1,
      totalPrice: product.price,
    });
  };

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt="imagem de uma camiseta"
              />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
                </div>

                <button onClick={e => handleAddProductToCart(e, product)}>
                  <Bag weight="bold" />
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100,
      priceFormatted: new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
      description: product.description,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
