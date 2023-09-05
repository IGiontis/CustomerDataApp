import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function FetchDataFailed() {
  const errorMessage = useSelector((state: RootState) => state.fetchDataError.errorMessage);
  return (
    <div className="fw-bold text-center mt-5 font-monospace ">
      An <span className="text-danger text-decoration-underline">error</span> occurred{" "}
      {errorMessage}
    </div>
  );
}

export default FetchDataFailed;
