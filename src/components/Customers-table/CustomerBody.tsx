import Separator from "../custom/Separator";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "./Buttons/DeleteButton";
import CustomerType from "../../interfaces/customerTypes";
import EditButton from "./Buttons/EditButton";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { setIsFetched } from "../../Redux/isFetched";
import { FETCH_CUSTOMERS } from "../../Redux/Redux-Saga/ActionTypes/ActionTypes";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ImageIcon from "@mui/icons-material/Image";
import UploadFiles from "./Buttons/UploadFiles";
import PDFButton from "./Buttons/PDFButton";

function Customer() {
  const dispatch = useDispatch();

  const customers: CustomerType[] = useSelector((state: RootState) => state.customers);
  const isFetched = useSelector((state: RootState) => state.isFetched);
  console.log(customers);
  //* This useEffect is for fetching only for the first time
  useEffect(() => {
    if (!isFetched) {
      console.log("test");
      dispatch({ type: FETCH_CUSTOMERS });
      dispatch(setIsFetched(true));
    }
  }, [dispatch, isFetched]);

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
            <td className="p-1">
              {/* Here probably i will do something with ? operator so if the user have uploaded something then he can upload. */}
              {/* <div className="d-flex align-items-center ">
                <UploadFiles customer={person} />

                <Separator />

                <PDFButton customer={person} />

                <Separator />

                <Button>
                  <ImageIcon />
                </Button>
              </div> */}
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
