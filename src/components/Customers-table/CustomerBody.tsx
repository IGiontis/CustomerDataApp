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
    name: "marianthi",
    surname: "garcia",
    address: "104th street of budapest with front view of the river",
  },
];

function Customer() {
  return (
    <tbody>
      {DUMMY_ARRAY.map((person) => (
        <tr key={Math.random()}>
          <th scope="row">1</th>
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
