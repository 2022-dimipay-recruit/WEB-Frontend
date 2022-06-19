import { Link } from 'react-router-dom';
import { styled } from '#/stitches.config';

import { ReactComponent as Feed } from '@/assets/icons/feed.svg';
import { ReactComponent as FeedFill } from '@/assets/icons/feedFill.svg';
import { ReactComponent as Notification } from '@/assets/icons/notifications.svg';
import { ReactComponent as NotificationFill } from '@/assets/icons/notificationsFill.svg';
import { Hexile } from '@haechi/flexile';

export const Wrapper = styled(Hexile, {
  position: 'absolute',
  left: 0,
  top: 0,
  '@desktop': {
    marginTop: '6rem',
    padding: '0 20rem',
  },
  '@pad': {
    marginTop: '4rem',
    padding: '0 10rem',
  },
  '@mobile': {
    marginTop: '1rem',
    padding: '0 3rem',
  }
});
export const Title = styled(Link, {
  color: '$blackGreen',
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'none',
  '@mobile': {
    display: 'none',
  }
});
export const FeedIcn = styled(Feed, {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});
export const FeedIcnActive = styled(FeedFill, {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});
export const NotificationIcn = styled(Notification, {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});
export const NotificationIcnActive = styled(NotificationFill, {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});

export const ProfileContainer = styled(Hexile, {
  gap: '3.6rem',
  '@mobile': {
    gap: '1rem',
  }
});
export const IcnBox = styled(Hexile, {
  gap: '2.4rem',
  '@mobile': {
    gap: '1rem',
  }
});
export const ProfileBox = styled(Hexile, {
  cursor: 'pointer',
});
export const ProfileImg = styled('img', {
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '50%',
});
export const Name = styled('span', {
  color: '$blackGreen',
  fontWeight: 500,
  '@mobile': {
    display: 'none',
  },
});