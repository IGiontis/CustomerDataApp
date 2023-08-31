import { useEffect } from "react";
import Separator from "../custom/Separator";
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../../Redux/customerSlice";
import DeleteButton from "./DeleteButton";
import CustomerType from "../../interfaces/customerTypes";
import { toggleFetchError } from "../../Redux/errorSlice";
import EditButton from "./EditButton";
import { RootState } from "../../Redux/store";
import { setIsFetched } from "../../Redux/isFetched";

function Customer() {
  const dispatch = useDispatch();

  //* i don't know what type has the state
  const customers: CustomerType[] = useSelector((state: RootState) => state.customers);
  const isFetched = useSelector((state: RootState) => state.isFetched);
  //* fetching the customers from the backend
  useEffect(() => {
    async function fetchCustomersInfo() {
      try {
        // Here i check if the first time i have fetched
        if (!isFetched) {
          const res = await fetch("http://localhost:8080/Facade/cust/getAll");
          const data = await res.json();
          console.log(data);
          dispatch(setCustomers(data));
          dispatch(toggleFetchError(false));
          dispatch(setIsFetched(true));
        }
      } catch (error: any) {
        dispatch(toggleFetchError(true));
      }
    }
    fetchCustomersInfo();
  }, [dispatch, isFetched]);

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
              <EditButton customer={person} />
              <Separator />
              <DeleteButton customerId={person.id} customerName={person.name} />
            </td>
          </tr>
        ))}
    </tbody>
  );
}

export default Customer;
