import { useContext, useEffect, useState } from "react";
import { httpRequest } from "./Actions/action";
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
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Sr no</th>
                <th>Broker name</th>
                <th>Party name</th>
                <th>Payment term</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Transaction type</th>
              </tr>
            </thead>
            <tbody>
              {filterTransaction.map((tableData, rowIndex) => (
                <tr key={rowIndex}>
                  {/* <td key={rowIndex}>
                  <img src={tableData.avatar} alt={tableData.first_name} />
                </td> */}
                  <td>{tableData.sr_no}</td>
                  <td>{tableData.broker_name}</td>
                  <td>{tableData.party_name}</td>
                  <td>{tableData.payment_term}</td>
                  <td>{tableData.weight}</td>
                  <td>{tableData.price}</td>
                  <td>{tableData.type_of_trans}</td>

                  {/* <td>
                  <div>
                    <span onClick={() => openUser(rowIndex)}>
                      <i className="far fa-edit action mr-2"></i>
                    </span>

                    <span onClick={() => deleteUser(rowIndex)}>
                      <i className="fas fa-trash action"></i>
                    </span>
                  </div>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Transactions;
