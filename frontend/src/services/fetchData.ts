import axios from "axios";

interface fetchDataParams {
  method: "get" | "post";
  route: string;
  params?: Record<string, string | number>;
  headers?: {
    Authorization?: string;
  };
}

interface axiosRequestParams {
  method: "get" | "post";
  url: string;
  params?: Record<string, string | number>;
  headers?: {
    Authorization?: string;
  };
}

function fetchData({ route, method, params, headers }: fetchDataParams) {
  let requestParams: axiosRequestParams = {
    method: method,
    url: `${import.meta.env.VITE_BACKEND_URL}:${
      import.meta.env.VITE_BACKEND_PORT
    }${route}`,
  };
  if (params) {
    requestParams = { ...requestParams, params: params };
  }
  if (headers) {
    requestParams = { ...requestParams, headers: headers };
  }

  return axios(requestParams);
}

export default fetchData;
