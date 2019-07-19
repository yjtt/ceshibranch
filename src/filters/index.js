//格式化时间（几天前）
import Moment from 'moment';
export function convertTime(value) { //{{value|convertTime}}
  return Moment(value).format('YYYY-MM-DD HH:mm:ss');
}