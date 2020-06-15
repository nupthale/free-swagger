// generated by free-swagger
// @ts-nocheck
/* eslint-disable */
import { Result } from "./interface";
import axios, { AxiosResponse } from "axios";

// Demo: 从应用本地获取英文I18n文案示例
export const getI18nFromLocalEnUsingGET = () =>
  axios.request<Result<string>, AxiosResponse<Result<string>>>({
    url: `/i18n/v1/local/en`,
    method: "get",
    params: {},
    data: {}
  });

// Demo: 从应用本地获取中文I18n文案示例
export const getI18nFromLocalUsingGET = () =>
  axios.request<Result<string>, AxiosResponse<Result<string>>>({
    url: `/i18n/v1/local/zh-CN`,
    method: "get",
    params: {},
    data: {}
  });

// 更新Starling i18n缓存
export const refreshUsingGET = () =>
  axios.request<Result<Void>, AxiosResponse<Result<Void>>>({
    url: `/i18n/v1/refresh`,
    method: "get",
    params: {},
    data: {}
  });

// Demo: 从Starling平台获取英文I18n文案示例
export const getI18nFromStarlingEnUsingGET = () =>
  axios.request<Result<string>, AxiosResponse<Result<string>>>({
    url: `/i18n/v1/startling/en`,
    method: "get",
    params: {},
    data: {}
  });

// Demo: 从Starling平台获取中文I18n文案示例
export const getI18nFromStarlingUsingGET = () =>
  axios.request<Result<string>, AxiosResponse<Result<string>>>({
    url: `/i18n/v1/startling/zh-CN`,
    method: "get",
    params: {},
    data: {}
  });
