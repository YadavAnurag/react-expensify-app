import moment from 'moment';

const filters = {
  startDate: undefined,
  endDate: undefined,
  text: '',
  sortBy: ''
};

const altFilters = {
  startDate: moment(0),
  endDate: moment(0).add(3, 'days'),
  text: 'bill',
  sortBy: 'amount'
};

export {filters, altFilters};