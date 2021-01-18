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

// 获取文章排序
export async function getArticleOrder(params) {
  return request("/blog/getArticleOrder", {
    method: "get",
    params
  });
}

// 获取公司类型
export async function getCategoriesAll() {
  return request("/blog/getCategoriesAll");
}