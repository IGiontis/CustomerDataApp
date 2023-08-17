import Customer from "./CustomerBody";
function CustomerTable() {
  return (
    <div className="table-responsive-sm">
      <table className="table table-striped table-condensed table-bordered ">
        {/* Header of the table */}
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Addresses</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        {/* Body starts inside the customer*/}
        {/* //? Here i loop over the customers and i print them to the screen */}
        <Customer />
      </table>
    </div>
  );
}

export default CustomerTable;
