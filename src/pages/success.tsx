import { GetServerSideProps } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';
import Head from 'next/head';
import Stripe from 'stripe';
import { stripe } from '../lib/stripe';
import { ImageContainer, SuccessContainer } from '../styles/pages/success';
import { useEffect } from 'react';
import { useCartContext } from '../contexts/CartContext';

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

const Success = ({ customerName, products }: SuccessProps) => {
  const { resetCart } = useCartContext();

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <div>
          {products.map(product => (
            <ImageContainer key={product.name}>
              <Image src={product.imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </div>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{products.length} camisetas</strong> já estão a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details?.name;

  const products = session.line_items?.data.map(item => {
    const product = item.price!.product as Stripe.Product;

    return {
      name: product.name,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
