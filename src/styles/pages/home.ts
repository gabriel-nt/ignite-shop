import { styled } from '..';

export const HomeContainer = styled('main', {
  width: '100%',
  minHeight: 656,
  display: 'flex',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  '@media (max-width: 1180px)': {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});

export const Product = styled('a', {
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover',
  },

  footer: {
    left: '0.25rem',
    bottom: '0.25rem',
    right: '0.25rem',
    position: 'absolute',
    borderRadius: 6,
    display: 'flex',
    padding: '2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0,0,0,0.6)',
    transform: 'translateY(110%)',
    opacity: 0,

    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',

      strong: {
        fontSize: '$lg',
        color: '$gray100',
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
      },
    },

    button: {
      padding: '0.75rem',
      color: '$white',
      background: '$green500',
      fontSize: '$lg',
      border: 0,
      lineHeight: 0,
      cursor: 'pointer',
      borderRadius: 6,
      transition: 'background 0.2s ease-in-out',

      '&:hover': {
        background: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
});
