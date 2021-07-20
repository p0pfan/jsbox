var moment = require("moment");


const param = $context.query;
const { productionDate, endDate, day } = param;

const getEndDate = (startDate, day) => {
  let productionDate = new moment(startDate).utcOffset(8);
  return productionDate.add(day, 'd').utcOffset(8).format("YYYY-MM-DD");
}

const getDurationWithCurrent = (date) => {
  const currentDate = new moment().utcOffset(8);
  const endDate = new moment(date).utcOffset(8);
  const duration = moment.duration(currentDate.diff(endDate));
  return Math.abs(duration.asDays());
  
 }


const getAdvancedReminderDay = (date) => {
  const duration = getDurationWithCurrent(date);
  if (duration > 5) {
    const endDate = new moment(date).utcOffset(8);
    const rDate = endDate.subtract(5, 'days');
    return rDate.format("YYYY-MM-DD");
  }

  return null;
}

const ret = {
  endDate: endDate,
  reminderDate: null,
  msg: ""
}

let lastDay;

if (productionDate && day) {
  lastDay = getEndDate(productionDate, day);
} else if (endDate) {
  lastDay = endDate;
} else {
  lastDay = new moment().utcOffset(8);
}

const duration = getDurationWithCurrent(lastDay);
ret.msg = `离过期还有${duration}天`;
ret.reminderDate = getAdvancedReminderDay(lastDay);
ret.endDate = lastDay;
$intents$.finish(ret);
