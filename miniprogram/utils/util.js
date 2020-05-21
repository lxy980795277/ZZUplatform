  const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return [year, month, day].map(formatNumber).join('月') + '日 ' + [hour, minute].map(formatNumber).join(':')
}

const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [month, day].map(formatNumber).join('月') + '日 ' 
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join('：')
}
const get_year = date => {
  const year = date.getFullYear()
  return year
}
const get_month = date => {
  const month = date.getMonth() + 1
  return month
}
const get_day = date => {
  const day = date.getDate()
  return day
}
const get_hour = date => {
  const hour = date.getHours()
  return hour
}
const get_minute = date => {
  const minute = date.getMinutes()
  return minute
}
const get_second=date=>{
  const second = date.getSeconds()
  return second
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTouchData = (endX, endY, startX, startY) => {
  let turn = "";
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
    turn = "right";
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
    turn = "left";
  }
  return turn;
}

module.exports = {
  formatTime: formatTime,
  formatTime1:formatTime1,
  formatTime2: formatTime2,
  get_year:get_year,
  get_month:get_month,
  get_day:get_day,
  get_hour:get_hour,
  get_minute:get_minute,
  get_second:get_second,
}
