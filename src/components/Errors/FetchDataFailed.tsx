import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function FetchDataFailed() {
  const navigate = useNavigate();

  const errorMessage = useSelector((state: RootState) => state.fetchDataError.errorMessage);

  const handleErrorButton = () => {
    navigate("/customer/list");
  };
  return (
    <div className="fw-bold text-center mt-5 font-monospace ">
      An <span className="text-danger text-decoration-underline">error</span> occurred.{" "}
      {errorMessage}{" "}
      <Button variant="contained" color="error" size="small" onClick={handleErrorButton}>
        go back
      </Button>
    </div>
  );
}

export default FetchDataFailed;
