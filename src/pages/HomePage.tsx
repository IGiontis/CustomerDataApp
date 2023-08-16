import CustomContainerRowCol from "../components/CustomContainerComponent";
import PageNav from "../components/PageNav";
function HomePage() {
  return (
    <CustomContainerRowCol
      containerClasses="container mt-3"
      rowClasses="row justify-content-center mb-3 mt-3"
      colClasses="col-md-8"
    >
      <PageNav />
    </CustomContainerRowCol>
  );
}

export default HomePage;
