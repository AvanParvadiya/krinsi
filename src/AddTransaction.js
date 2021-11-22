import { useState } from "react";

const AddTransaction = () => {
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
  const initialTransactionState = {
    // id: null,
    // bro: "",
    // last_name: "",
    // email: "",
    // job: "",
    broker_name: "",
    party_name: "",
    weight: 0,
    price: 0,
    payment_term: "",
    amount: 123,
    date_of_trans: getDate(),
    type_of_trans: "SALE",
  };
  const [transaction, setTransaction] = useState(initialTransactionState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };
  const newUser = () => { };
  const saveUser = () => {
    console.log(transaction);
    const saveTransaction = async () => {
      const response = await fetch(
        "https://service-krinsi.herokuapp.com/trans/newTransaction",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdrbGF0aGl5YUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTk4OTRlNjY0M2MxYTA1YTRmNDFkNTIiLCJpYXQiOjE2Mzc1OTY3MjUsImV4cCI6MTYzNzYwMDMyNX0.ovpHg7jf6NIHJ-QXXX0lHzhgl0gidoc_2xQeJmU5Zt8`,
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(transaction),
        }
      );
      console.log(response)
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log(responseData);
    };
    saveTransaction().catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="broker_name">Broker name</label>
            <input
              type="text"
              className="form-control"
              id="broker_name"
              required
              value={transaction.broker_name}
              onChange={handleInputChange}
              name="broker_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="party_name">Party name</label>
            <input
              type="text"
              className="form-control"
              id="party_name"
              required
              minLength="5"
              value={transaction.party_name}
              onChange={handleInputChange}
              name="party_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              required
              value={transaction.email}
              onChange={handleInputChange}
              name="weight"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={transaction.email}
              onChange={handleInputChange}
              name="Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Payment_term">Payment term</label>
            <input
              type="number"
              className="form-control"
              id="Payment_term"
              required
              value={transaction.job}
              onChange={handleInputChange}
              name="payment_term"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type_of_trans">Type of transaction</label>
            <input
              type="text"
              className="form-control"
              id="type_of_trans"
              required
              value={transaction.job}
              onChange={handleInputChange}
              name="type_of_trans"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTransaction;
