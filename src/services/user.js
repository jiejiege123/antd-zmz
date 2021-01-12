import request from "@/utils/request";

export async function query() {
  return request("/api/users");
}
export async function queryCurrent(payload) {
  return request("/blog/getInfo",{
    method: "get",
    params: payload
  });
}
export async function queryNotices() {
  return request("/api/notices");
}
