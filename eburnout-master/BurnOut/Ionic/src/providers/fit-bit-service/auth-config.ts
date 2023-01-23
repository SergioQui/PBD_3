export const AuthConfig = {

	// Url of the Identity Provider
	url : "https://www.fitbit.com/oauth2/authorize",

    // allow request per hour 
    rate_limit : 150,

    key_access_token : "access_token",

	body : {

  		// URL to redirect the user to after login
  		redirect_uri: "https://localhost:8100/eburnout_callback", // "http://localhost/eburnout", // "https://localhost:8100/eburnout_callback",

  		// The client id
  		client_id: "", // "22CG84", "22CFRY",

  		// set the scope for the permissions the client should request
  		scope: "activity nutrition heartrate location nutrition profile settings sleep social weight",

  		// set the response type, token or code
   		response_type : "token",

        expires_in : "600" // "604800"

   	}

}
