import { User } from '@data-contracts/backend/data-contracts';
import { ServiceResponse } from '@interfaces/services.interface';
import { __DEV__ } from '@sk-web-gui/react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ApiResponse, apiService } from '../api.service';
import { emptyUser } from './defaults';
import Error from 'next/error';

const handleSetUserResponse: (res: ApiResponse<User>) => User = (res) => ({
  name: res.data.name,
  username: res.data.username,
});

const getMe: () => Promise<ServiceResponse<User>> = () => {
  return apiService
    .get<ApiResponse<User>>('me')
    .then((res) => ({ data: handleSetUserResponse(res.data) }))
    .catch((e) => {
      throw new Error({
        statusCode: e.statusCode,
        message: e.response?.data.message,
        error: e.response?.status ?? 'UNKNOWN ERROR',
      });
    });
};

interface State {
  user: User;
}
interface Actions {
  setUser: (user: User) => void;
  getMe: () => Promise<ServiceResponse<User>>;
  reset: () => void;
}

const initialState: State = {
  user: emptyUser,
};

export const useUserStore = create<State & Actions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      setUser: (user) => set(() => ({ user })),
      getMe: () => {
        let user = get().user;
        if (user.username) return Promise.resolve({ data: user });
        return getMe().then((res) => {
          if (!res.error && res.data) {
            user = res.data;
            set(() => ({ user }));
          }
          return { data: user };
        });
      },
      reset: () => {
        set(initialState);
      },
    }),
    { enabled: __DEV__ }
  )
);
