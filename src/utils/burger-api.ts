import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

const URL = process.env.BURGER_API_URL;

const checkResponse = async <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : Promise.reject(await res.json());

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = async (): Promise<TRefreshResponse> => {
  const response = await fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });

  const data = await checkResponse<TRefreshResponse>(response);

  if (!data.success) return Promise.reject(data);

  localStorage.setItem('refreshToken', data.refreshToken);
  setCookie('accessToken', data.accessToken);

  return data;
};

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const initialResponse = await fetch(url, options);
    return await checkResponse<T>(initialResponse);
  } catch (error) {
    if ((error as { message: string }).message === 'jwt expired') {
      const refreshed = await refreshToken();
      if (options.headers) {
        (options.headers as Record<string, string>).authorization =
          refreshed.accessToken;
      }
      const retryResponse = await fetch(url, options);
      return await checkResponse<T>(retryResponse);
    }
    return Promise.reject(error);
  }
};

type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TOrdersResponse = TServerResponse<{ data: TOrder[] }>;

export const getIngredientsApi = async () => {
  const response = await fetch(`${URL}/ingredients`);
  const result = await checkResponse<TIngredientsResponse>(response);
  return result?.success ? result.data : Promise.reject(result);
};

export const getFeedsApi = async () => {
  const response = await fetch(`${URL}/orders/all`);
  const result = await checkResponse<TFeedsResponse>(response);
  return result?.success ? result : Promise.reject(result);
};

export const getOrdersApi = async () => {
  const result = await fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  });
  return result?.success ? result.orders : Promise.reject(result);
};

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = async (data: string[]) => {
  const result = await fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({ ingredients: data })
  });
  return result?.success ? result : Promise.reject(result);
};

type TOrderResponse = TServerResponse<{ orders: TOrder[] }>;

export const getOrderByNumberApi = async (number: number) => {
  const response = await fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return await checkResponse<TOrderResponse>(response);
};

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = async (data: TRegisterData) => {
  const response = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TAuthResponse>(response);
  return result?.success ? result : Promise.reject(result);
};

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = async (data: TLoginData) => {
  const response = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TAuthResponse>(response);
  return result?.success ? result : Promise.reject(result);
};

export const forgotPasswordApi = async (data: { email: string }) => {
  const response = await fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TServerResponse<{}>>(response);
  return result?.success ? result : Promise.reject(result);
};

export const resetPasswordApi = async (data: {
  password: string;
  token: string;
}) => {
  const response = await fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TServerResponse<{}>>(response);
  return result?.success ? result : Promise.reject(result);
};

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = async () =>
  await fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const updateUserApi = async (user: Partial<TRegisterData>) =>
  await fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

export const logoutApi = async () => {
  const response = await fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });
  return await checkResponse<TServerResponse<{}>>(response);
};
