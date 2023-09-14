import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect } from "react";
import Separator from "../custom/Separator";
import DeleteButton from "./Buttons/DeleteButton";
import CustomerType from "../../interfaces/customerTypes";
import EditButton from "./Buttons/EditButton";
import { setIsFetched } from "../../Redux/isFetched";
import { FETCH_CUSTOMERS } from "../../Redux/Redux-Saga/ActionTypes/ActionTypes";
import { Button } from "@mui/material";

import UploadFiles from "./Buttons/UploadButtonFiles";
import FileButtonIcon from "./Buttons/FileButtons";
import DragAndDropFile from "./Buttons/DragAndDropFile";

function Customer() {
  const dispatch = useDispatch();

  const customers: CustomerType[] = useSelector((state: RootState) => state.customers);
  const isFetched = useSelector((state: RootState) => state.isFetched);

  //* This useEffect is for fetching only for the first time

  useEffect(() => {
    if (!isFetched) {
      console.log("HERE IM FETCHING FROM THE BACKEND");
      dispatch({ type: FETCH_CUSTOMERS });
      dispatch(setIsFetched(true));
    }
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
              <div
                style={{
                  maxHeight: "30px",
                  overflowY: "auto",
                }}
              >
                {person.address.map((address) => address.street)}
              </div>
            </td>
            <td className="p-1">
              {/* Here probably i will do something with ? operator so if the user have uploaded something then he can upload. */}
              <div className="d-flex align-items-center ">
                <UploadFiles customer={person} uploadButtonMode={"edit"} />

                <Separator />

                <FileButtonIcon customer={person} />
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
