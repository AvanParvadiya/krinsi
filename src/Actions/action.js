const HOST_URL = "https://service-krinsi.herokuapp.com/trans/";
const Bearer_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdrbGF0aGl5YUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTk4OTRlNjY0M2MxYTA1YTRmNDFkNTIiLCJpYXQiOjE2Mzc4NDQyMjgsImV4cCI6MTYzNzg0NzgyOH0.0iMFYvDhHFTUtNju1vGgqBQoE_Mel-RBZ0xUYCBFrak";

export const httpRequest = async (API_INFO, bodyData) => {
  const response = await fetch(
    HOST_URL + (API_INFO.resource ? API_INFO.resource : "getTransactions"),
    {
      method: API_INFO.method ? API_INFO.method : "GET",
      headers: {
        Authorization: `Bearer ` + Bearer_token,
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
