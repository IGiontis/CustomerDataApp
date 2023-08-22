import CustomContainerRowCol from "../components/custom/CustomContainerComponent";

function PageNotFound() {
  return (
    <CustomContainerRowCol
      containerClasses="container"
      rowClasses="row justify-content-center"
      colClasses="col-md-12 col-sm-12"
    >
      <div className="text-center mt-4">
        <strong>Page Not Found</strong>
      </div>
    </CustomContainerRowCol>
  );
}

export default PageNotFound;
