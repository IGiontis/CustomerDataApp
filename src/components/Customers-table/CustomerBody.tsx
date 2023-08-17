const DUMMY_ARRAY = [
  {
    name: "ilias",
    surname: "giontis",
    address: "18hs oktwvriou 5",
  },
  {
    name: "bill",
    surname: "mulwnas",
    address: "2hs oktwvriou 22",
  },
  {
    name: "ivan",
    surname: "garcia",
    address: "255hs oktwvriou 999",
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
          <td>@mdo</td>
        </tr>
      ))}
    </tbody>
  );
}

export default Customer;
