// 格式化事件的格式
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // use loaded locale globally
export default dayjs
