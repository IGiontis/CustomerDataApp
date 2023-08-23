function FetchDataFailed() {
  return (
    <div className="fw-bold text-center mt-5 font-monospace ">
      An <span className="text-danger text-decoration-underline">error</span> occurred fetching data
      from the database
    </div>
  );
}

export default FetchDataFailed;
