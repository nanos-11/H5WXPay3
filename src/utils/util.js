import sha256 from 'sha256'

export function getSign(signObj, key) {
  let signStr = ''
  Object.keys(signObj).sort().forEach(val => {
    signStr += `${val}=${signObj[val]}&`
  })
  signStr = signStr.substring(0, signStr.length - 1) + key;
  let sign = sha256(signStr);
  return sign;
}

//unit.js
// 存储当前历史记录点,实现控制手机物理返回键的按钮事件
export const pushHistory = () => {
  let state = {
    title: '',
    url: ''
  }
  window.history.pushState(state, state.title, state.url)
}

export function track(r, d, s, l) {
  let meteor =  [];
  meteor.methods = ["track", "off", "on"];
  meteor.factory = function (method) {
    return function () {
      const args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      meteor.push(args);
      return meteor
    }
  };
  for (let i = 0; i < meteor.methods.length; i++) {
    const key = meteor.methods[i];
    meteor[key] = meteor.factory(key)
  }
  meteor.load = function () {
    let js, fjs = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.src = "https://analytics.snssdk.com/meteor.js/v1/" + l + "/sdk";
    fjs.parentNode.insertBefore(js, fjs)
  };
  meteor.load();
  if (meteor.invoked) {
    return
  }
  meteor.invoked = true;
  meteor.track("pageview")
  return meteor;
}
