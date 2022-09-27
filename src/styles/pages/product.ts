import { styled } from '..';

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',

  '@media (max-width: 1180px)': {
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  '@media (max-width: 1180px)': {
    height: 'auto',

    img: {
      height: 'auto',
      width: '100%',
    },
  },
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$xxl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$xxl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    background: '$green500',
    border: 0,
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '1.25rem',
    fontSize: '$md',
    color: '$white',
    transition: 'background 0.2s ease-in-out',

    '&:not(:disabled):hover': {
      background: '$green300',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },

  '@media (max-width: 1180px)': {
    h1: {
      fontSize: '$xl',
    },

    span: {
      fontSize: '$xl',
    },

    button: {
      marginTop: '2rem',
    },
  },
});
