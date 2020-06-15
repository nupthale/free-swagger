// generated by free-swagger
// @ts-nocheck
/* eslint-disable */
import { Result, JavaList, ExpenseTypeDetailResponse } from "./interface";
import axios, { AxiosResponse } from "axios";

// 查询用户可选的费用类型
export const getAvailableExpenseTypesUsingGET = (params: { documentUnionId: string }) =>
  axios.request<
    Result<JavaList<ExpenseTypeDetailResponse>>,
    AxiosResponse<Result<JavaList<ExpenseTypeDetailResponse>>>
  >({
    url: `/v1/expense-types`,
    method: "get",
    params: params,
    data: {}
  });

// 查询用户最近选的五条费用类型
export const getLatest5ExpenseTypesUsingGET = () =>
  axios.request<
    Result<JavaList<ExpenseTypeDetailResponse>>,
    AxiosResponse<Result<JavaList<ExpenseTypeDetailResponse>>>
  >({
    url: `/v1/expense-types/latest`,
    method: "get",
    params: {},
    data: {}
  });
