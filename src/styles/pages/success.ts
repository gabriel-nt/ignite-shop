import { styled } from '..';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$xxl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    marginTop: '2rem',
    textAlign: 'center',
    lineHeight: 1.4,
  },

  '> div': {
    display: 'flex',
    marginTop: '4rem',
    marginBottom: '3rem',

    'div + div': {
      marginLeft: '-3rem',
    },
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontWeight: 'bold',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    },
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  borderRadius: 1000,
  padding: '0.25rem',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});
