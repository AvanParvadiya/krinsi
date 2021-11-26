const HOST_URL = "https://service-krinsi.herokuapp.com/trans/";

export const httpRequest = async (API_INFO, bodyData) => {
    
  const response = await fetch(
    HOST_URL + (API_INFO.resource ? API_INFO.resource : "getTransactions"),
    {
      method: API_INFO.method ? API_INFO.method : "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + API_INFO.bearer_token,
      },
      body: !bodyData ? null : JSON.stringify(bodyData),
    }
  );
  if (!response.ok) {
    throw new Error("Some thing went wrong");
  }
  const responseData = await response.json();
  return responseData;
};

export const httpLogin = async (bodyData) => {
  const response = await fetch(
    "https://service-krinsi.herokuapp.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: !bodyData ? null : JSON.stringify(bodyData),
    }
  );
  if (!response.ok) {
    throw new Error("Some thing went wrong");
  }
  const responseData = await response.json();
  return responseData;
};
