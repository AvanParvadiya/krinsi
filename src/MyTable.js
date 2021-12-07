import BootyPagination from "./BootyPagination";
import React from "react";
import DataTable from "react-data-table-component";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const columns = [
  {
    name: "Broker name",
    selector: (row) => row.broker_name,
    sortable: true,
  },
  {
    name: "Party name",
    selector: (row) => row.party_name,
    sortable: true,
  },
  {
    name: "Payment term",
    selector: (row) => row.payment_term,
    sortable: true,
    right: true,
  },
  {
    name: "Weight",
    selector: (row) => row.weight,
    sortable: true,
    right: true,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
    right: true,
  },
  {
    name: "Transaction type",
    selector: (row) => row.type_of_trans,
    sortable: true,
    right: true,
  },
];

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));

function MyTable({ data }) {
  return (
    <div className="App">
      <div className="card">
        <DataTable
          title="Transactions"
          columns={columns}
          data={data}
          defaultSortFieldID={1}
          pagination
          paginationComponent={BootyPagination}
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
  );
}
export default MyTable;
