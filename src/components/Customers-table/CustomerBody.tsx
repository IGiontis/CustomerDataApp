import { useEffect, useState } from "react";
import Separator from "../custom/Separator";

// !DUMMY ARRAY FOR TESTING DELETE LATER
// const DUMMY_ARRAY = [
//   {
//     name: "ilias",
//     surname: "giontis",
//     address: "2hs norway 5",
//   },
//   {
//     name: "bill",
//     surname: "mulwnas",
//     address: "2hs oktwvriou 22",
//   },
//   {
//     name: "marianthi",
//     surname: "garcia",
//     address: "104th street of budapest with front view of the river",
//   },
// ];

interface CustomerType {
  id: number;
  name: string;
  surname: string;
  address: string[];
}

function Customer() {
  //* i use any[] i don't know why, i found it on stackoverflow
  //* i need to specify the data i'm taking from the backend so i can put it into the any
  const [customer, setCustomer] = useState<CustomerType[]>([]);

  useEffect(function () {
    async function fetchCustomersInfo() {
      try {
        const res = await fetch("http://localhost:8080/Facade/cust/getAll");
        const data = await res.json();
        console.log(data);
        setCustomer(data);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchCustomersInfo();
  }, []);

  // fetch("http://localhost:8080/Facade/cust/getAll")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  return (
    <tbody>
      {customer.map((person) => (
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
              {person.address}
            </div>
          </td>
          <td className="d-flex align-items-center">
            <button className="btn btn-info btn-sm">edit</button>
            <Separator />
            <button className="btn btn-danger btn-sm">delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Customer;
