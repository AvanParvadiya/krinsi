const HOST_URL = "https://service-krinsi.herokuapp.com/trans/";
const Bearer_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdrbGF0aGl5YUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTk4OTRlNjY0M2MxYTA1YTRmNDFkNTIiLCJpYXQiOjE2Mzc4Mzk2NDcsImV4cCI6MTYzNzg0MzI0N30.NXsNAOuBW1gDg_DN8tCAfMCvUNGI3ncYk34FiobDX6Q";
export const fetchTransactions = async () => {
  const response = await fetch(HOST_URL + "getTransactions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ` + Bearer_token,
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const responseData = await response.json();
  console.log(responseData.Transactions);
  //   setTransaction(responseData.Transactions);
  //   setFilterTransaction(responseData.Transactions);
  return responseData.Transactions;
};
//  fetchTransactions;

export const saveTransaction = async (transaction) => {
  const response = await fetch(HOST_URL + "newTransaction", {
    method: "POST",
    headers: {
      Authorization: `Bearer ` + Bearer_token,
      mode: "no-cors",
    },

    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};
// export  saveTransaction

export const httpRequest = async (API_INFO, bodyData ) => {
  console.log(API_INFO);
  const response = await fetch(
    HOST_URL + (API_INFO.resource ? API_INFO.resource : "getTransactions"),
    {
      method: API_INFO.method ? API_INFO.method : "GET",
      headers: {
        Authorization: `Bearer ` + Bearer_token,
      },
      body: !bodyData && API_INFO.method==="GET" ? null : JSON.stringify(bodyData),
    }
  );
  if (!response.ok) {
    throw new Error("Some thing went wrong");
  }
  const responseData = await response.json();
//   console.log(responseData);
  return responseData;
};
