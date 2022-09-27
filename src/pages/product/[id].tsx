import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import Stripe from 'stripe';
import { useCartContext } from '../../contexts/CartContext';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceFormatted: string;
    description: string;
    defaultPriceId: string;
  };
}

const Product = ({ product }: ProductProps) => {
  const { addProductToCart } = useCartContext();

  const handleAddProductToCart = () => {
    addProductToCart({
      ...product,
      quantity: 1,
      totalPrice: product.price,
    });
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>

          <p>{product.description}</p>

          <button onClick={handleAddProductToCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_MUL1niKNhGR7Cn',
        },
      },
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<
  any,
  {
    id: string;
  }
> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
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
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
