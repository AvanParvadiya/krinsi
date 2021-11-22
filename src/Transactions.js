import { useEffect, useState } from "react";

const Transactions = () => {
  //   const storeCtx = useContext(StoreContext);
  const [transactions, setTransaction] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterTransaction, setFilterTransaction] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(
        "https://service-krinsi.herokuapp.com/trans/getTransactions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdrbGF0aGl5YUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTk4OTRlNjY0M2MxYTA1YTRmNDFkNTIiLCJpYXQiOjE2Mzc1ODQwNjcsImV4cCI6MTYzNzU4NzY2N30.OlOhUdxEhkWdCgyIT9_Syd2_XiWB8KwyqU-qkbLo_LA`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log(responseData.Transactions);
      setTransaction(responseData.Transactions);
      setFilterTransaction(responseData.Transactions);
    };

    fetchTransactions().catch((err) => {
      console.log(err);
    });
  }, []);
  //   storeCtx.addTransaction(transactions);
  const onChangeSearchTitle = (event) => {
    setSearchTitle(event.target.value);
    const filterWord = event.target.value;
    console.log(filterWord.toUpperCase());
    const filtered = transactions.filter(
      (transaction) =>
        transaction.party_name
          .toUpperCase()
          .includes(filterWord.toUpperCase()) ||
        transaction.broker_name.toUpperCase().includes(filterWord.toUpperCase())
    );
    console.log(filtered);
  };
  const findByTitle = (event) => {
    setSearchTitle(event.target.value);
  };
  //   const openUser = (event) => {};
  //   const deleteUser = (event) => {};
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by first name / last name / email"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
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
      </div>
    </div>
  );
};
export default Transactions;
