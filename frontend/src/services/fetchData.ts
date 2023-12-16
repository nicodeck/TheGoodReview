import axios from "axios";

interface fetchDataParams {
  method: "get" | "post";
  route: string;
  params?: Record<string, string | number>;
  headers?: {
    Authorization?: string;
  };
  data?: Record<string, string | number>;
}

interface axiosRequestParams {
  method: "get" | "post";
  url: string;
  params?: Record<string, string | number>;
  headers?: {
    Authorization?: string;
  };
  data?: Record<string, string | number>;
}

function fetchData({ route, method, params, headers, data }: fetchDataParams) {
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
  if (data) {
    requestParams = { ...requestParams, data: data };
  }

  return axios(requestParams);
}

export default fetchData;
