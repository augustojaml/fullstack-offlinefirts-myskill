import { database } from '@global/databases';
import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';

import { User } from '@global/databases/models/users/User';
import { api } from '@global/services/api';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface IAuthProvider {
  children: ReactNode;
}

interface IUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  avatarPath?: string;
  token: string;
}

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IUpdateUser {
  name?: string;
  avatar?: string;
  avatarPath?: string;
}

interface IAuthContextProps {
  user: IUser | undefined;
  isLoadingUser: boolean;
  signUp: (data: ICreateUser) => Promise<void>;
  signIn: (data: ICredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: IUpdateUser) => Promise<void>;
  offlineSynchronize(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextProps);

function AuthProvider({ children }: IAuthProvider) {
  const netInfo = useNetInfo();

  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const usersCollection = database.get<User>('users');

  async function signUp(data: ICreateUser) {
    try {
      setIsLoadingUser(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);

      if (data.avatar) {
        const fileProps = {
          name: data.avatar.split('/').pop(),
          ext: `image/${data.avatar.slice(-3)}`,
        };

        formData.append('avatar', {
          // @ts-ignore
          name: fileProps.name,
          type: fileProps.ext,
          uri: data.avatar,
        });
      }

      await api.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: (data, headers) => {
          return formData;
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert('SignUp', 'Não foi possível realizar o cadastro. Contato o administrador');
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function signIn(data: ICredentials) {
    try {
      setIsLoadingUser(false);
      const response = await api.post('/users/auth', data);
      const { token, user } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // WatermelonDB
      await database.write(async () => {
        await usersCollection.create((newUser) => {
          newUser.userId = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.avatar = user.avatar;
          newUser.avatarPath = user.avatarPath;
          newUser.token = token;
        });
      });

      setUser({
        ...user,
        token: token,
        avatar: user.avatar && `${api.defaults.baseURL}/avatar/${user.avatar}`,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('SignIn', 'Não foi possível realizar o login. Contato o administrador');
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function signOut() {
    await database.write(async () => {
      const findUser = usersCollection.find(user?.id!);
      await (await findUser).destroyPermanently();
      api.defaults.headers.common['Authorization'] = '';
      setUser(undefined);
    });
  }

  async function updateUser(data: IUpdateUser) {
    try {
      setIsLoadingUser(true);

      let uriType = ';';

      if (data.avatar?.includes('file:///')) {
        uriType = 'file';
      }
      if (data.avatar?.includes('http://')) {
        uriType = 'url';
      }

      await database.write(async () => {
        const result = await usersCollection.find(user?.id!);
        const findUser = result._raw as unknown as IUser;

        const fileInfo = {
          name: data.avatar?.split('/').pop(),
          ext: `image/${data.avatar?.slice(-3)}`,
        };

        const response = await result.update((userData) => {
          (userData.name = data.name ? data.name : findUser.name),
            fileInfo.name && uriType === 'file' && (userData.avatarPath = data.avatar!);
        });

        const updatedUser = response._raw as unknown as IUser;
        setUser(updatedUser);
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Profile', 'Não foi possível atualizar peril. Contato o administrador');
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        lastPulledAt && console.log(new Date(lastPulledAt));
        return { changes: {}, timestamp: new Date().getTime() };
      },
      pushChanges: async ({ changes }) => {
        const { users, skills } = changes;
        console.log(skills, users);

        if (users.updated) {
          users.updated.forEach(async (user) => {
            const formData = new FormData();
            formData.append('name', user.name);

            if (user.avatarPath) {
              const fileProps = {
                name: user.avatarPath.split('/').pop(),
                ext: `image/${user.avatarPath.slice(-3)}`,
              };

              formData.append('avatar', {
                // @ts-ignore
                name: fileProps.name,
                type: fileProps.ext,
                uri: user.avatarPath,
              });
            }

            const response = await api.put('/users/update', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
              transformRequest: (data, headers) => {
                return formData;
              },
            });

            const update = {
              ...user,
              name: response.data.name,
              avatar:
                response.data.avatar && `${api.defaults.baseURL}/avatar/${response.data.avatar}`,
            } as IUser;

            setUser(update);
          });
        }
      },
    });
  }

  useEffect(() => {
    (async () => {
      const response = await usersCollection.query().fetch();
      if (response.length > 0) {
        const user = response[0]._raw as unknown as IUser;
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        setUser({
          ...user,
          avatar: user.avatar && `${api.defaults.baseURL}/avatar/${user.avatar}`,
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (netInfo.isConnected === true) {
        await offlineSynchronize();
      }
    })();
  }, [netInfo]);

  return (
    <>
      <AuthContext.Provider
        value={{ user, isLoadingUser, signUp, signIn, signOut, updateUser, offlineSynchronize }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
