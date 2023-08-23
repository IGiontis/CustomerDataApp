export default interface CustomerType {
  id: number;
  name: string;
  surname: string;
  address: [
    {
      city: string;
      id: number;
      street: string;
      customer: {};
    }
  ];
}
