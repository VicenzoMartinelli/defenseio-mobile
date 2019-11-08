import decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';

export async function loggedIn() {
  const token = await getToken();
  console.log(token && !isTokenExpired(token))
  return token && !isTokenExpired(token);
};

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

export async function setToken(idToken) {
  await AsyncStorage.setItem("dfs_jwt_tkn", idToken);
}

export async function getToken() {
  return AsyncStorage.getItem("dfs_jwt_tkn");
}


export async function logout() {
  var res = await AsyncStorage.multiGet(["dfs_jwt_tkn", "dfs_user"])
  console.log(res);

  await AsyncStorage.multiRemove(["dfs_user", "dfs_jwt_tkn"]);

}

export const getConfirm = () => {
  const confirm = decode(getToken());

  return confirm;
}

export const getUser = async () => {
  return JSON.parse(await AsyncStorage.getItem("dfs_user"));
}
