/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_SECRET = process.env.EXPO_PUBLIC_TOKEN_SECRET;
const BASE_URL = `${apiUrl}`;

const api = (() => {
  async function _fetchWithAuth(url, options = {}) {
    const token = await getAccessToken();
    // const token = await getAccessToken();
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "", // Use token if exists
      },
    });
  }

  // Function to store token
  function putAccessToken(token) {
    AsyncStorage.setItem("accessToken", JSON.stringify(token));

    // AsyncStorage.set("accessToken", token);
  }

  function putRefreshToken(token) {
    // console.log("ini refresh:", token);
    AsyncStorage.setItem("refreshToken", JSON.stringify(token));

    // AsyncStorage.set("refreshToken", token);
  }

  // Function to retrieve token
  function getAccessToken() {
    return AsyncStorage.getItem("accessToken");
  }
  function getRefreshToken() {
    return AsyncStorage.getItem("refreshToken");
  }

  async function dataGetUser() {
    const tokenAccess = await getAccessToken();
    const cleanTokenAccess = JSON.parse(tokenAccess); // Hapus tanda kutip ekstra

    const tokenRefresh = await getRefreshToken();
    const cleanTokenRefresh = JSON.parse(tokenRefresh); // Hapus tanda kutip ekstra

    const response = await fetch(`${BASE_URL}/authentications/datauser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cleanTokenAccess}`,
      },
      body: JSON.stringify({
        refreshToken: cleanTokenRefresh,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const { data } = responseJson;
    return data;
  }
  // async function dataUserTemp() {
  //   const response = await _fetchWithAuth(
  //     `${BASE_URL}/authentications/datauser`
  //   );
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch data");
  //   }

  //   const responseJson = await response.json();
  //   const { status, message } = responseJson;

  //   if (status !== "Success") {
  //     throw new Error(message);
  //   }

  //   const { data } = responseJson;
  //   return data;
  // }

  async function login({ username, password }) {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        // Authorization: `Bearer ${TOKEN_SECRET}`,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status } = responseJson;
    if (status !== "success") {
      throw new Error("login invalid !");
    }

    const returnData = responseJson;
    return returnData;
  }

  async function register({ username, email, password }) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN_SECRET}`,
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== "Success") {
      throw new Error(message, status);
    }
    const data = responseJson;

    return data;
  }

  return {
    putAccessToken,
    putRefreshToken,
    dataGetUser,
    getAccessToken,
    getRefreshToken,
    login,
    register,
  };
})();

export default api;
