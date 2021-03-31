import Vue from 'vue'
import App from './App'
import Notify from '@/wxcomponents/vant/notify/notify'
import Dialog from '@/wxcomponents/vant/dialog/dialog'
import Toast from '@/wxcomponents/vant/toast/toast'

Vue.prototype.$dialog = Dialog
Vue.prototype.$notify = Notify
Vue.prototype.$toast = Toast
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
