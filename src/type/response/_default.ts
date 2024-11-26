type Response = {
  message: string;
  statusCode: number;
  data: null;
};

export type Result<T> = Response & {
  data: T;
};

export type FailResponse = Response;
