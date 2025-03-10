import Cookies from 'js-cookie';

export type Auth = {
  loggedIn: boolean;
  userId: null | string;
  user: null | any;
};

const UserDataKey = 'm1-user-data';

export const poll = (): Auth => {
  const user = JSON.parse(Cookies.get(UserDataKey) || 'null');
  return {
    loggedIn: Boolean(user?.id),
    userId: user?.id,
    user,
  }
};

export const apply = (auth: Auth) => {
  const { user } = auth;
  user && Cookies.set(UserDataKey, JSON.stringify(user));
};
