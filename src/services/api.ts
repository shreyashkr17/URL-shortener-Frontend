// src/services/api.ts

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://njs.shortlycut.xyz"

export const shortenUrl = async (
  originalUrl: string,
  auth_token:string,
  api_token:string
): Promise<{ shortUrl: string }> => {
  // const port = getNextPort();
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": auth_token,
      "X-API-Token": api_token,
    },
    body: JSON.stringify({ original_url: originalUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to shorten URL");
  }

  const data = await response.json();
  return { shortUrl: data.url.short_url };
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ id: string; username: string; email: string; token: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  const data = await response.json();
  // dispatch(login(data.user));

  return {
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    token: data.token,
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ id: string; username: string; email: string; token: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login user");
  }

  const data = await response.json();
  // dispatch(login(data.user));

  return {
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    token: data.token,
  };
};

export const logoutUser = async ( token: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization" : token
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout user");
  }

  const data = await response.json();
  // dispatch(logout());
  return { message: data.message };
};

// Token Related Fetch
export const generateToken = async(
  token:string
): Promise<{ id: string; user_id: string; token: string | null; created_at: string; last_used: string | null; }> => {
  const response = await fetch(`${API_BASE_URL}/auth/api_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to generate token");
  }

  const data = await response.json();
  // console.log(data);

  if (!data.tokens) {
    console.error("Unexpected response structure:", data);
    return {
      id: "",
      user_id: "",
      token: null,
      created_at: "",
      last_used: "",
    };
  }
  if (data.tokens.length === 0) {
    return {
      id: "",
      user_id: "",
      token: null,
      created_at: "",
      last_used: "",
    };
  };

  return {
    id: data.tokens.id,
    token: data.tokens.token,
    user_id: data.tokens.user_id,
    created_at: data.tokens.created_at,
    last_used: data.tokens.last_used,
  };
}

export const fetchToken = async (
  token: string
): Promise<{ id: string; user_id: string; token: string | null; created_at: string; last_used: string; }> => {
  const response = await fetch(`${API_BASE_URL}/auth/list-tokens`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": token,
    },
  });

  // console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  const data = await response.json();
  // console.log(data);

  // Check if 'tokens' exists in the response
  if (!data.tokens) {
    console.error("Unexpected response structure:", data);
    return {
      id: "",
      user_id: "",
      token: null,
      created_at: "",
      last_used: "",
    };; // or return some default value
  }

  if (data.tokens.length === 0) {
    return {
      id: "",
      user_id: "",
      token: null,
      created_at: "",
      last_used: "",
    };;
  }

  return {
    id: data.tokens[0].id,
    token: data.tokens[0].token,
    user_id: data.tokens[0].user_id,
    created_at: data.tokens[0].created_at,
    last_used: data.tokens[0].last_used,
  };
};

export const revokeandCreateToken = async (
  token: string,
  tokenId: string
): Promise<{ id: string | null; user_id: string | null ; token: string | null; created_at: string | null; last_used: string | null; }> => {
  const delResponse = await fetch(`${API_BASE_URL}/auth/api_token/${tokenId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": token,
    }
  });

  if(!delResponse.ok){
    throw new Error("Failed to revoke token");
  }

  const data = await delResponse.json();

  if(data.message !== "Token revoked successfully"){
    throw new Error("Failed to revoke token");
  }

  const responseCreate = await generateToken(token);
  // console.log(responseCreate);
  return responseCreate;
}
