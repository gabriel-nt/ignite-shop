import { styled } from '../../styles';

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media (max-width: 1180px)': {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});

export const CartButton = styled('button', {
  padding: '0.75rem',
  color: '$gray500',
  background: '$gray800',
  fontSize: '$lg',
  border: 0,
  lineHeight: 0,
  position: 'relative',
  cursor: 'pointer',
  borderRadius: 6,
  transition: 'background 0.2s ease-in-out',

  span: {
    background: '$green500',
    border: '3px solid $gray900',
    borderRadius: 1000,
    top: -12,
    right: -12,
    padding: '0.75rem 0.5rem',
    color: '$white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: '0.875rem',
  },
});

export const CartSummary = styled('aside', {
  height: '100vh',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 480,
  padding: '3rem',
  background: '$gray800',
  transform: 'translateX(580px)',
  transition: 'transform 0.5s ease-in-out',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  overflowY: 'auto',

  '&.cart-summary-opened': {
    transform: 'translateX(0)',
  },

  svg: {
    position: 'absolute',
    right: '5%',
    top: '3%',
    fontSize: '$xl',
    cursor: 'pointer',
  },

  h2: {
    lineHeight: 1.6,
    color: '$gray100',
    fontSize: '$lg',
    paddingTop: '1.5rem',
    paddingBottom: '2rem',
  },

  footer: {
    marginTop: 'auto',

    div: {
      display: 'flex',
      lineHeight: '28.8px',
      marginBottom: '0.5rem',
      alignItems: 'center',
      justifyContent: 'space-between',

      'strong:nth-child(2)': {
        fontSize: '$xl',
      },
    },

    button: {
      background: '$green500',
      border: 0,
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: '1.25rem',
      fontSize: '$md',
      color: '$white',
      width: '100%',
      marginTop: '3rem',
      transition: 'background 0.2s ease-in-out',

      '&:not(:disabled):hover': {
        background: '$green300',
      },

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
  },

  '@media (max-width: 480px)': {
    minWidth: '100%',
    padding: '1rem',
  },
});

export const CartItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  marginBottom: '1.5rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'flex-start',
    justifyContent: 'center',

    span: {
      fontSize: '$md',
      color: '$gray300',
    },

    button: {
      background: 'transparent',
      padding: 0,
      border: 0,
      color: '$green500',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',

      '&:hover': {
        color: '$green300',
      },
    },

    '&.img-container': {
      width: '100%',
      maxWidth: 101,
      height: 93,
      background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      borderRadius: 8,
      padding: '0.25rem',

      img: {
        objectFit: 'cover',
      },
    },
  },
});
