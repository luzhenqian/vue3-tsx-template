const urls = {
  'getGoodsList': '/goods/goodsList'
}

export function fetchData() {
  return fetch(urls.getGoodsList)
}
