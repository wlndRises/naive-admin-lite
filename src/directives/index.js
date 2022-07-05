// directive https://cn.vuejs.org/v2/guide/custom-directive.html

// 在钩子之间共享数据 el.setAttribute('data-src', val) <===> val = el.dataset.src
import permission from './permission'

const directives = {
  permission,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key, value) => {
      Vue.directive(key, value)
    })
  },
}
