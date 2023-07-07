const {
    google
} = require("googleapis")
const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth';
const query_string = require("querystring")
const axios = require("axios")
const keys = require("../../client_secret_325019990890-7bmo458j627ed6vvbnl1anjk4a507o0v.apps.googleusercontent.com.json")
const clientId = keys.web.client_id
const clientSecret = keys.web.client_secret
const redirectUri = keys.web.redirect_uris[0]
 
const scopes = ['profile', 'email', 'openid'];
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';

const query_params = {
    client_id: clientId,
    redirect_uri: redirectUri,
};
const auth_token_params = {
    ...query_params,
    response_type: 'code',
  };
 
  const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${scopes.join (' ')}`;
  const get_access_token = async(code)=>{
    const access_token_params = {
        ...query_params,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
      };
      return await axios ({
        method: 'post',
        url: `${google_access_token_endpoint}?${query_string.stringify (access_token_params)}`,
      }).then(resovle=>resovle).catch(rej=>console.log(rej));
}
const get_profile_data = async (accessToken) => {
  console.log("accesstoken "+accessToken)
  const a =  await axios ({
    method: 'post',
    url: `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`,
  });
  return a
}
module.exports = {
    request_get_auth_code_url,clientId,clientSecret,get_access_token,get_profile_data
}