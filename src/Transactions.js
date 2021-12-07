import { useContext, useEffect, useState } from "react";
import { httpRequest } from "./Actions/action";
import MyTable from "./MyTable";
import AuthContext from "./store/auth-context";
const Transactions = () => {
  const authCtx = useContext(AuthContext);
  const [transactions, setTransaction] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterTransaction, setFilterTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    httpRequest({
      resource: "getTransactions",
      method: "GET",
      bearer_token: authCtx.token,
    })
      .then((res) => {
        setTransaction(res.Transactions);
        setFilterTransaction(res.Transactions);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  }, [isLoading, authCtx.token]);
  const onChangeSearchTitle = (event) => {
    setSearchTitle(event.target.value);
    const filterWord = event.target.value;
    const filtered = transactions.filter(
      (transaction) =>
        transaction.party_name
          .toUpperCase()
          .includes(filterWord.toUpperCase()) ||
        transaction.broker_name.toUpperCase().includes(filterWord.toUpperCase())
    );
    setFilterTransaction(filtered);
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Broker name / party name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            {/* <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button> */}
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        {isLoading && <p>Loading....</p>}
        {!isLoading && (
          <>
            <MyTable data={filterTransaction} />
          </>
        )}
      </div>
    </div>
  );
};
export default Transactions;
