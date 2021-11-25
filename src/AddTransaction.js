import { useState } from "react";
import { httpRequest } from "./Actions/action";
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
    weight: 0, // float
    price: 0,
    payment_term: "", // integer
    amount: 0, // float
    date_of_trans: getDate(),
    type_of_trans: "SALE",
  };
  const [transaction, setTransaction] = useState(initialTransactionState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };
  const newUser = () => {};
  const saveUser = () => {
    transaction.amount = parseFloat(transaction.amount);
    transaction.weight = parseFloat(transaction.weight);
    transaction.payment_term = parseInt(transaction.payment_term);
    console.log(transaction);
    const saveTransaction = async () => {
      const response = await fetch(
        "https://service-krinsi.herokuapp.com/trans/newTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdrbGF0aGl5YUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTk4OTRlNjY0M2MxYTA1YTRmNDFkNTIiLCJpYXQiOjE2Mzc4NTI0MTIsImV4cCI6MTYzNzg1NjAxMn0.HV0b0SnJS2Z_XQP6dqBBdQf26mF9ckoxuAYScPjMM6Y`,
          },
          body: JSON.stringify(transaction),
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
    };
    saveTransaction().catch((err) => {
      console.log(err);
    });
    // httpRequest(
    //   {
    //     resource: "newTransaction",
    //     method: "POST",
    //   },
    //   transaction
    // )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // setSubmitted(true);
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
              value={transaction.weight}
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
              value={transaction.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Payment_term">Payment term</label>
            <input
              type="number"
              className="form-control"
              id="Payment_term"
              required
              value={transaction.payment_term}
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
              value={transaction.type_of_trans}
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
