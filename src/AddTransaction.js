import { useContext, useState } from "react";
import { httpRequest } from "./Actions/action";
import AuthContext from "./store/auth-context";
const AddTransaction = () => {
  const authCtx = useContext(AuthContext);
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
  const initialTransactionState = {
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
  const saveUser = () => {
    transaction.amount = parseFloat(transaction.amount);
    transaction.weight = parseFloat(transaction.weight);
    transaction.payment_term = parseInt(transaction.payment_term);
    console.log(transaction);
    let success;
    httpRequest(
      {
        resource: "newTransaction",
        method: "POST",
        bearer_token: authCtx.token,
      },
      transaction
    )
      .then((res) => {
        console.log(res);
        success =
          res.message === "Transaction Created Successfully !! "
            ? res.message
            : undefined;

        if (!success) {
          setSubmitted(false);
        } else {
          setSubmitted(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newTransaction = () => {
    setSubmitted(false);
    setTransaction({
      broker_name: "",
      party_name: "",
      weight: 0, // float
      price: 0,
      payment_term: "", // integer
      amount: 0, // float
      date_of_trans: getDate(),
      type_of_trans: "SALE",
    });
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTransaction}>
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
            <label htmlFor="weight">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              required
              value={transaction.amount}
              onChange={handleInputChange}
              name="amount"
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
