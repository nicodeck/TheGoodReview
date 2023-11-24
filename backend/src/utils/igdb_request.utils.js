const cache = require("memory-cache");
const axios = require("axios");

// igdb_token returns a valid token to make requests to IGDB API
async function igdb_token(clientId, clientSecret) {
  const tokenInCache = cache.get("igdb_token");

  if (tokenInCache != null) {
    console.log("Found igdb token in cache: ", tokenInCache);
    return tokenInCache;
  }

  console.log("No igdb token in cache, requesting for a token...");

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
async function igdb_request_token(clientId, clientSecret) {
  const tokenData = await axios({
    method: "post",
    url: "https://id.twitch.tv/oauth2/token",
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    },
  }).then(function (response) {
    return response.data;
  });

  return tokenData;
}

// igdb_api_request makes a request to IGDB API and returns data
async function igdb_api_request(
  route,
  clientId,
  clientSecret,
  request_parameters
) {
  const token = await igdb_token(clientId, clientSecret);
  const responseData = await axios({
    method: "POST",
    url: "https://api.igdb.com/v4" + route,
    headers: {
      "Client-ID": clientId,
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
    data: request_parameters,
  }).then(function (res) {
    return res.data;
  });

  return responseData;
}

module.exports = { igdb_api_request };
