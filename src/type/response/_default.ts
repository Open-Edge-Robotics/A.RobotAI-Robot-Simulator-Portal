type Response = {
  message: string;
  statusCode: string;
  data: null;
};

export type Result<TData> = Response & {
  data: TData;
};

export type FailResponse = Response;
