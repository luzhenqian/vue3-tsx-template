import { AxiosResponse } from "axios";

export default (response: AxiosResponse) => {
  const status = response.status;
  if ((status >= 200 && status <= 300) || status === 304) {
    return response;
  }
  const code = parseInt(response.data && response.data.code);
  let message = (response.data || {}).msg;

  switch (code) {
    case 400:
      break;
    case 403:
      message = message || "未登录";
      break;
    case 404:
      message = message || "请求地址错误";
      break;
    case 412:
      message = message || "未找到有效session";
      break;
    default:
      break;
  }
  return {
    code,
    message,
  };
};
