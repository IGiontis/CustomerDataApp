import { useEffect } from "react";
import Separator from "../custom/Separator";
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../../Redux/customerSlice";
import DeleteButton from "./DeleteButton";
import CustomerType from "../../interfaces/customerTypes";
import { toggleFetchError } from "../../Redux/errorSlice";
import EditButton from "./EditButton";
import { RootState } from "../../Redux/store";

function Customer() {
  const dispatch = useDispatch();

  //* i don't know what type has the state
  const customers: CustomerType[] = useSelector((state: RootState) => state.customers);

  //* fetching the customers from the backend
  useEffect(
    function () {
      async function fetchCustomersInfo() {
        try {
          const res = await fetch("http://localhost:8080/Facade/cust/getAll");
          const data = await res.json();
          console.log(data);
          dispatch(setCustomers(data));
          dispatch(toggleFetchError(false));
        } catch (error: any) {
          dispatch(toggleFetchError(true));
        }
      }
      fetchCustomersInfo();
      console.log("enter");
    },
    [dispatch]
  );

  return (
    <tbody>
      {customers
        .slice()
        .sort((a, b) => a.id - b.id)
        .map((person) => (
          <tr key={person.id}>
            <th scope="row">{person.id}</th>
            <td>{person.name}</td>
            <td>{person.surname}</td>
            <td>
              {/*//? HERE the div and the style is to apply the scroll bar without this it will make word-wrap and make bigger the cells */}
              <div
                style={{
                  maxHeight: "30px",
                  overflowY: "auto",
                }}
              >
                {person.address.map((address) => address.street)}
              </div>
            </td>
            <td className="d-flex align-items-center">
              {/* <button className="btn btn-info btn-sm">edit</button> */}
              <EditButton classes="btn btn-info btn-sm" customer={person} />
              <Separator />
              {/* <button className="btn btn-danger btn-sm">delete</button> */}
              <DeleteButton
                classes="btn btn-danger btn-sm"
                customerId={person.id}
                customerName={person.name}
              />
            </td>
          </tr>
        ))}
    </tbody>
  );
}

export default Customer;
