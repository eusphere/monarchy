import Cookies from 'js-cookie';

const LoginHintKey = 'm1-user-hint';

export const hasLoginHint = (): boolean => Cookies.get(LoginHintKey) != null;
