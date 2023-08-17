import Separator from "../custom/Separator";

const DUMMY_ARRAY = [
  {
    name: "ilias",
    surname: "giontis",
    address: "2hs norway 5",
  },
  {
    name: "bill",
    surname: "mulwnas",
    address: "2hs oktwvriou 22",
  },
  {
    name: "ivan",
    surname: "garcia",
    address: "9th Street germany dortmund",
  },
];

function Customer() {
  return (
    <tbody>
      {/* //! here i need to change the key with the id of the database */}
      {/* //todo also here i need to make the actions edit and delete */}
      {DUMMY_ARRAY.map((person) => (
        <tr key={Math.random()}>
          <th scope="row">1</th>
          <td>{person.name}</td>
          <td>{person.surname}</td>
          <td>{person.address}</td>
          <td className="d-flex align-items-center">
            <button className="btn btn-info btn-sm ">edit</button>
            <Separator />
            <button className="btn btn-danger btn-sm ">delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Customer;
