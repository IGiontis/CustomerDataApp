import { Container } from "@mui/material";

function PageNotFound() {
  return (
    <Container fixed>
      <div className="text-center mt-4">
        <strong>
          Page <span className="text-danger text-decoration-underline">NOT </span> Found
        </strong>
      </div>
    </Container>
  );
}

export default PageNotFound;
