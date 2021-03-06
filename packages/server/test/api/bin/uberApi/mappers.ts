/* eslint-disable */
// @ts-nocheck
// generated by free-swagger

import axios, { AxiosResponse } from "axios";

export const UpdateMapper = (
  params: { [key: string]: never },
  {
    id
  }: {
    id: string;
  }
) =>
  axios.request<string, AxiosResponse<string>>({
    url: `/crawler/v1/mapper/${id}`,
    method: "put",
    params: {},
    data: {}
  });
