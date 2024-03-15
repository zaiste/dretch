export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'DELETE';

export const dretch = (baseURL: string) => (...args: RequestData) => {
  const [method, pathname, config] = args

  let restConfig = config;
  if (config && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    let { body, ...rest } = config;
    restConfig = rest;
  }

  return fetch(new URL(pathname, baseURL), {
    method,
    ...(config && (method === 'POST' || method === 'PUT' || method === 'PATCH') ? { body: JSON.stringify(config.body) } : {}),
    headers: {
      "Content-Type": "application/json",
      ...(config && config.headers)
    },
    cache: "no-cache",
    ...restConfig as RequestConfig
  })

}

type SerializableScalar = string | number | boolean | null;

interface SerializableObject {
  [key: string]: Serializable;
}

export type RequestConfig = Omit<RequestInit, 'body'>

interface SerializableArray extends Array<Serializable> { }

type Serializable = SerializableScalar | SerializableObject | SerializableArray;

type RequestDataWithoutBody = [
  method: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS',
  pathname: string,
  config?: RequestConfig
];
type RequestDataWithBody = [
  method: 'POST' | 'PUT' | 'PATCH',
  url: string,
  config?: RequestConfig & { body: Serializable }
];

export type RequestData = RequestDataWithoutBody | RequestDataWithBody;
