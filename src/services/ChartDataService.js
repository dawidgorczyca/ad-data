import _ from 'lodash';
import moment from 'moment';

const ChartDataService = (function() {

  function _ValidateDateInRange(currentDate, positionStart, positionEnd) {
    const d1 = moment(positionStart, 'DD.MM.YYYY').subtract(1, 'day').format('DD.MM.YYYY').split(".");
    const d2 = positionEnd.split(".");
    const c = currentDate.split(".");

    const from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
    const to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    const check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return check > from && check < to;
  }

  return {
    GetChartStartPoint(data) {
      return _.minBy(data, 'Date').Date;
    },

    GetChartEndPoint(data) {
      return _.maxBy(data, 'Date').Date;
    },

    GetDatePlusWeek(positionStart) {
      return moment(positionStart, 'DD.MM.YYYY').add(7, 'days').format('DD.MM.YYYY');
    },

    GetDateMinusWeek(positionEnd) {
      return moment(positionEnd, 'DD.MM.YYYY').subtract(7, 'days').format('DD.MM.YYYY');
    },

    GetFilteredByDate(data, positionStart, positionEnd) {
      return _.filter(data, (item) => _ValidateDateInRange(item.Date, positionStart, positionEnd))
    },

    GetFilteredByProperty(dataset, property, propertyData) {
      if(
        !propertyData ||
        !propertyData.length ||
        _.findIndex(propertyData, {value: 'All'}) !== -1
      ) {
        return dataset;
      }

      return _.flatten(propertyData.map((source) => {
        return _.filter(dataset, (item) => item[property] === source.value)
      }))
    },

    GetSanitizedData(dataset) {
      const output = _.uniqBy(dataset, 'Date').map((object) => {
        return { date: object.Date, clicks: 0, impressions: 0 }
      });

      dataset.forEach((item) => {
        const dataIndex = _.findIndex(output, {date: item.Date});
        output[dataIndex].clicks += parseInt(item.Clicks) || 0;
        output[dataIndex].impressions += parseInt(item.Impressions) || 0;
      })

      return output;
    }
  }
}());

export default ChartDataService;
