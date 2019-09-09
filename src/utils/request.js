import Axios from 'axios'


const server = Axios.create({
  timeout: 5000
  // baseURL:config.baseURL
})

//设置axios为form-data
server.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
server.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
server.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

// responese  拦截
server.interceptors.response.use(
  response => {
    let data = response.data;
    if (data !== undefined && data !== '') {
      return Promise.resolve(data)
    } else {
      return Promise.resolve(data)
    }
  },
  error => {
  
  }
)


export default server;
