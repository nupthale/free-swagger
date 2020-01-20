// @ts-nocheck
/* eslint-disable */
import { List_AuditLogListDto } from "./interface";
import axios, { AxiosResponse } from "axios";

// 分页上传设备地理坐标信息, 参数list的值为 List<DeviceLngLat>, 返回Result对象
export const uploadLngLatUsingPOST = (params: List_AuditLogListDto) =>
  axios.request<any, AxiosResponse<any>>({
    url: `/dev/uploadLngLat`,
    method: "post",
    params: {},
    data: params
  });
