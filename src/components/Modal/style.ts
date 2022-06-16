import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const Wrapper = styled(Vexile, {
  padding: '1.8rem',
  overflow: 'auto',
  maxHeight: '28.2rem',
  borderRadius: '1.6rem',
  background: '$brightGreen',
  position: 'absolute',
  bottom: '-.8rem',
  transform: 'translateY(100%)',
  zIndex: '10',
  variants: {
    type: {
      search: {
        width: '100%',
        left: '0',
      },
      notification: {
        width: '20rem',
        left: '72%',
        '@mobile': {
          left: '50%',
        }
      }
    },
    active: {
      true: {
        display: 'flex',
      },
      false: {
        display: 'none',
      }
    }
  }
});

export const Container = styled(Hexile, {
  height: '4.8rem',
  cursor: 'pointer',
  borderRadius: '1rem',
  '&:hover': {
    background: '$baseGreen',
  }
});
export const ProfileImg = styled('img', {
  width: '4.8rem',
  height: '4.8rem',
  borderRadius: '50%',
});

export const Name = styled('span', {
  color: '$blackGreen',
  fontWeight: 700,
});
export const UserName = styled('span', {
  color: '$blackGreen',
  fontWeight: 500,
  fontSize: '1.4rem',
});