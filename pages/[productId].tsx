import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Stripe from 'stripe';
import stripeConfig from '../config/stripe';

interface Props {

}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27'
  });

  const products = await stripe.products.list();

  const paths = products.data.map((product) => ({
    params: {
      productId: product.id
    }
  }))
  console.log(paths);


  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27'
  });
  const { productId } = params;
  const sku = await stripe.skus.retrieve(productId as string);

  return {
    props: {
      sku
    }
  }
}

const Product: React.FC<Props> = ({ }) => {
  return <div>Produto</div>;
}

export default Product;