import moment from 'moment';

const expenses = [
  {
    id: '123',
    amount: 195,
    description: 'Gum',
    note: '',
    createdAt: 0
  },
  {
    id: '1234',
    amount: 109500,
    description: 'Gum',
    note: '',
    createdAt: moment(0).subtract(4, 'days')
  },
  {
    id: '4123',
    amount: 195,
    description: 'Gum',
    note: '',
    createdAt: moment(0).add(4, 'days')
  },
];

exports.expenses = expenses;