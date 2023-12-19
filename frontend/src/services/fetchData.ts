import axios from "axios";

interface fetchDataParams {
  method: "get" | "post";
  route: string;
  params?: Record<string, string | number>;
  data?: Record<string, string | number | boolean>;
}

interface axiosRequestParams {
  method: "get" | "post";
  url: string;
  params?: Record<string, string | number>;
  headers?: {
    Authorization?: string;
  };
  data?: Record<string, string | number | boolean>;
}

function fetchData({ route, method, params, data }: fetchDataParams) {
  const token = sessionStorage.getItem("token");
  let headers = {};

  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

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
