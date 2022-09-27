import axios from "axios";
import { asyncErrorWrapper } from "./helpers";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
});

function errorHandler(err: typeof Error) {
  //TODO: Handle all Errors from api
}

export const get = asyncErrorWrapper(async (endpoint: string, headers = {}) => {
  return await apiClient.get(endpoint, { headers });
}, errorHandler);
