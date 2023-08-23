interface EditButtonTypes {
  classes: string;
  customerId: number;
}

function EditButton({ classes, customerId }: EditButtonTypes) {
  return <button className={classes}>Edit</button>;
}

export default EditButton;
