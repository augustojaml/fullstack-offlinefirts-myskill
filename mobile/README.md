```ts
const formData = new FormData();
if (data.name) {
  formData.append('name', data.name);
}

if (data.password) {
  formData.append('password', data.password);
}

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

const response = await api.put('/users/update', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  transformRequest: (data, headers) => {
    return formData;
  },
});

const update = {
  ...user,
  name: response.data.name,
  avatar: response.data.avatar && `${api.defaults.baseURL}/avatar/${response.data.avatar}`,
} as IUser;

setUser(update);
```
