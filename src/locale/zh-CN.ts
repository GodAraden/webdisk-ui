import auth from './auth/zh-CN'
import tips from './tips/zh-CN'
import userManage from './user-manage/zh-CN'
import contactList from './contact-list/zh-CN'
import logManage from './log-manage/zh-CN'
import fileList from './file-list/zh-CN'
import sharelist from './share-list/zh-CN'

export default {
  welcome: '欢迎使用 Araden 的网盘',
  title: 'Araden 的网盘',

  'menu.filelist': '我的文件',
  'menu.contactlist': '好友列表',
  'menu.transportlist': '传输任务',
  'menu.sharedlist': '共享文件',
  'menu.userManage': '用户管理',
  'menu.fileManage': '文件管理',
  'menu.logManage': '日志管理',

  ...auth,
  ...tips,
  ...userManage,
  ...contactList,
  ...logManage,
  ...fileList,
  ...sharelist
}
