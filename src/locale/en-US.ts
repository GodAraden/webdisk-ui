import auth from './auth/en-US'
import tips from './tips/en-US'
import userManage from './user-manage/en-US'
import contactList from './contact-list/en-US'
import logManage from './log-manage/en-US'
import fileList from './file-list/en-US'
import sharelist from './share-list/en-US'

export default {
  welcome: "Welcome to use Araden's network disk",
  title: "Araden's Network Disk",

  'menu.filelist': 'My Files',
  'menu.contactlist': 'Friends List',
  'menu.transportlist': 'Transport tasks',
  'menu.sharedlist': 'Shared files',
  'menu.userManage': 'User Management',
  'menu.fileManage': 'File Management',
  'menu.logManage': 'Log Management',

  ...auth,
  ...tips,
  ...userManage,
  ...contactList,
  ...logManage,
  ...fileList,
  ...sharelist
}
