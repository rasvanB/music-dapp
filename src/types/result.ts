type Result<T, E> =
  | {
      result: "success";
      value: T;
    }
  | {
      result: "error";
      error: E;
    };

export default Result;
