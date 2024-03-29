import cache from "memory-cache";
import axios from "axios";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// igdb_token returns a valid token to make requests to IGDB API
async function igdb_token(clientId: string, clientSecret: string) {
  const tokenInCache = cache.get("igdb_token");

  if (tokenInCache != null) {
    console.log("Found igdb token in cache: ", tokenInCache);
    return tokenInCache;
  }

  console.log("No igdb token in cache, requesting a token...");

  const tokenData = await igdb_request_token(clientId, clientSecret);

  const token = tokenData.access_token;
  const tokenExpiresIn = tokenData.expires_in;

  console.log(
    "Received igdb token: ",
    token,
    ", expires in ",
    Math.min(3600, tokenExpiresIn),
    "s"
  );

  cache.put("igdb_token", token, Math.min(3600, tokenExpiresIn) * 1000);

  return token;
}

// igdb_request_token requests and returns a token from twitch auth for IGDB API access
async function igdb_request_token(clientId: string, clientSecret: string) {
  const tokenData = await axios({
    method: "post",
    url: "https://id.twitch.tv/oauth2/token",
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return tokenData;
}

// igdb_api_request makes a request to IGDB API and returns data
async function igdb_api_request(route: string, request_parameters: string) {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing IGDB credentials");
  }

  const token = await igdb_token(CLIENT_ID, CLIENT_SECRET);
  const responseData = await axios({
    method: "POST",
    url: "https://api.igdb.com/v4" + route,
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
    data: request_parameters,
  })
    .then(function (res) {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return responseData;
}

export { igdb_api_request };
