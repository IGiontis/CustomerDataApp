import Separator from "../custom/Separator";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import CustomerType from "../../interfaces/customerTypes";
import EditButton from "./EditButton";
import { RootState } from "../../Redux/store";
import { useEffect } from "react";
import { setIsFetched } from "../../Redux/isFetched";

function Customer() {
  const dispatch = useDispatch();

  const customers: CustomerType[] = useSelector((state: RootState) => state.customers);
  const isFetched = useSelector((state: RootState) => state.isFetched);
  useEffect(() => {
    if (!isFetched) {
      dispatch({ type: "FETCH_CUSTOMERS" });
      dispatch(setIsFetched(true));
    }
  }, [dispatch, isFetched]);

  //! Delete later this, is testing mode
  dispatch({ type: "testaki" });
  dispatch({ type: "paok" });
  //! Delete later this, is testing mode

  //? Here i need to make a loader that will wait until we get an error or the fetched data.

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
