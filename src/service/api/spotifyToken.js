import useSWR from "swr";
import base64 from "react-native-base64";
import { encode as btoa } from "base-64";
import * as AuthSession from "expo-auth-session";

import { authorize, refresh } from "react-native-app-auth";
import { spotifyCredentials } from "./credentials";
// const baseUrl = "https://accounts.spotify.com/api";
// const clientId = "7ead856b51d84bbdb27c17f59e628c3d";
// const clientSecret = "8dc73b9f919446e9b5ded2e6ceae6a2f";
// const uri =
//   "https://auth.expo.io/@31mdlupbgyb63iox466e2f7vdeuy/react-native-test-app";
// const base64Credentials = base64.encode(clientId + ":" + clientSecret);

// const fetcher = (url) => fetch(url).then((res) => res.json());

// var authOptions = {
//   method: "GET",
//   headers: {
//     Authorization: `Basic ${base64Credentials}`,
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: "grant-type=client-credential",
// };

// export default async function getToken() {
//   const res = await fetch(`${baseUrl}/token`, authOptions);
//   return res.json();
// }

const scopesArr = [
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-library-modify",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-recently-played",
  "user-top-read",
];
const scopes = scopesArr.join(" ");

const getAuthorizationCode = async () => {
  try {
    const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
    const result = await AuthSession.startAsync({
      authUrl:
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        spotifyCredentials.clientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirectUrl),
    });
  } catch (err) {
    console.error(err);
  }
  return result.params.code;
};

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode(); //we wrote this function above
    const credsB64 = btoa(
      `${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${spotifyCredentials.redirectUri}`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData("accessToken", accessToken);
    await setUserData("refreshToken", refreshToken);
    await setUserData("expirationTime", expirationTime);
  } catch (err) {
    console.error(err);
  }
};

export const refreshTokens = async () => {
  try {
    const credsB64 = btoa(
      `${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`
    );
    const refreshToken = await getUserData("refreshToken");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData("accessToken", newAccessToken);
      if (newRefreshToken) {
        await setUserData("refreshToken", newRefreshToken);
      }
      await setUserData("expirationTime", expirationTime);
    }
  } catch (err) {
    console.error(err);
  }
};

console.log(AuthSession.getRedirectUrl());
