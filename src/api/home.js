import request from '../utils/request'
import qs from 'qs'

let config = {
  baseURL: 'https://apis.luboedu.cn/'
}

/**
 * 是否支付成功
 *
 * @date 2019/7/1
 * course_id:  1--->9.9 2--->8.9 3--->49  4--->心理9.9
 * @author nan
 */
export function isPay(phone, course_id) {
  return request({
    method: 'get',
    url: config.baseURL + 'Marketingcourse/Nineyuan/isPay?course_id=' + course_id + '&phone=' + phone
  })
}

/**
 * 获取验证码
 * GET  参数 phone
 *
 * @date 2019/6/21
 * @author nan
 */
export function getBindVerCode(phone) {
  return request({
    method: 'get',
    url: config.baseURL + 'Marketingcourse/Nineyuan/getBindVerCode?phone=' + phone
  })
}

/**
 *  https://apis.luboedu.cn/1.0/Onlinequestion/tanglang
 *  phone: res.data,
 *  courseName: '自考',
 *  buName: '北京事业部',
 *  sourceType: [ '百度' ,'360' ,'搜狗' , '神马' , '广点通' , '今日头条' ]
 *  seaName: that.data.city
 *
 *  二级项目名称：7天卓越父母成长课
 *  事业部：信息流事业部(合作)
 *  地域：北京
 *  来源类型名称：信息流事业部合作_心谕者社群军团_心理训练营_今日头条_信息流_lubo_全国
 *  广告商名称：今日头条
 *
 * @date 2019/7/1
 * @author nan
 */
export function getPhoneData(phone, seaName) {
  let params = []
  params.phone = phone
  params.courseName = '愈见'
  params.buName = '信息流事业部(合作)'
  params.sourceType = '信息流事业部合作_心谕者社群军团_心理训练营_今日头条_信息流_lubo_全国'
  params.seaName = seaName
  params.adName = "今日头条"
  return request({
    method: 'get',
    url: 'https://apis.luboedu.cn/1.0/Onlinequestion/tanglang?' + qs.stringify(params)
  })
}

export function getPhoneDataDec(phone, seaName) {
  let params = []
  params.phone = phone
  params.courseName = '愈见'
  params.buName = '信息流事业部(合作)'
  params.sourceType = '信息流事业部合作_心谕者社群军团_心理训练营_今日头条_信息流_asd_全国'
  params.seaName = seaName
  params.adName = "今日头条"
  return request({
    method: 'get',
    url: 'https://apis.luboedu.cn/1.0/Onlinequestion/tanglang?' + qs.stringify(params)
  })
}

export function getPhoneDataNineNew(phone, seaName) {
  let params = []
  params.phone = phone
  params.courseName = '愈见'
  params.buName = '信息流事业部(合作)'
  params.sourceType = '信息流事业部合作_心谕者社群军团_心理训练营_今日头条_信息流_asd9new_全国'
  params.seaName = seaName
  params.adName = "今日头条"
  return request({
    method: 'get',
    url: 'https://apis.luboedu.cn/1.0/Onlinequestion/tanglang?' + qs.stringify(params)
  })
}

export function getPhoneDataPC(phone, seaName) {
  let params = []
  params.phone = phone
  params.courseName = '愈见'
  params.buName = '信息流事业部(合作)'
  params.sourceType = '信息流事业部合作_心谕者社群军团_心理训练营_360_信息流_360_全国'
  params.seaName = seaName
  params.adName = "360"
  return request({
    method: 'get',
    url: 'https://apis.luboedu.cn/1.0/Onlinequestion/tanglang?' + qs.stringify(params)
  })
}

export function getPhoneData2(phone, seaName) {
  let params = []
  params.phone = phone
  params.courseName = '愈见'
  params.buName = '北京事业部'
  params.sourceType = '信息流事业部合作_心谕者社群军团_心理训练营_广点通_信息流_广点通2_全国'
  params.seaName = seaName
  params.adName = "广点通"
  return request({
    method: 'get',
    url: 'https://apis.luboedu.cn/1.0/Onlinequestion/tanglang?' + qs.stringify(params)
  })
}

/**
 * 登录/注册
 * 参数  'phone', 'vercode'   方式get
 *
 * @date 2019/6/21
 * @author nan
 */
export function loginPhone(phone, code, course_id) {
  return request({
    method: 'get',
    url: config.baseURL + 'Marketingcourse/Nineyuan/bindPhone?course_id=' + course_id + '&phone=' + phone + '&vercode=' + code
  })
}

/**
 * 创建阿里订单
 * GET 是网页端    POST是手机端
 *
 * @date 2019/6/26
 * @author nan
 * @param data'price', 'out_trade_no', 'subject', 'quitUrl'
 */
export function createAliPay(data) {
  console.log('nan createAliPay', data)
  // console.log('nan 绑定订单请求的地址：', 'http://192.168.0.251:88/Marketingcourse/Nineyuan/createAliPay', data)
  return request({
    method: 'post',
    url: config.baseURL + 'Marketingcourse/Nineyuan/createAliPay2',
    data: data
  })
}

export function createAliPay2(data) {
  console.log('nan createAliPay2', data)
  // console.log('nan 绑定订单请求的地址：', 'http://192.168.0.251:88/Marketingcourse/Nineyuan/createAliPay2', data)
  return request({
    method: 'get',
    url: config.baseURL + 'Marketingcourse/Nineyuan/createAliPay2?phone='
      + data.phone + '&subject=' + data.subject + '&course_id=' + data.course_id + '&status=' + data.status,
  })
}

/**
 * 创建微信支付
 *
 * @date 2019/9/7
 * @author nan
 */
export function createWXPay(data) {
  return request({
    method: 'post',
    url: config.baseURL + 'Marketingcourse/Nineyuan/wxPay3',
    data: data
  })
}

/**
 * 创建微信支付
 *
 * @date 2019/9/7
 * @author nan
 */
export function createWXPay2(data) {
  return request({
    method: 'post',
    url: config.baseURL + 'Marketingcourse/Nineyuan/wxPay2',
    data: data
  })
}

/**
 * 获取用户是否支付
 *
 * @date 2019/9/22
 * @author nan
 */
export function getUserIsPay(data) {
  return request({
    method: 'get',
    url: config.baseURL + 'Marketingcourse/Nineyuan/getOpenId?code=' + data.code
  })
}

