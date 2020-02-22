import expensesTotal from "../../selectors/expenses-total";
import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 10,
    createdAt: moment(0).valueOf()
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 20,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 30,
    createdAt: moment(0).add(4, 'days').valueOf()
  }
];

// let total = 0;
// beforeEach(()=>{
//   total = expensesTotal(expenses);
// });

test('should return 0 if no expenses', ()=>{
  const total = expensesTotal([]);
  expect(total).toBe(0);
});

test('should add up single expense correctly', ()=>{
  const total = expensesTotal([expenses[0]]);
  expect(total).toBe(10);
});

test('should add up multitple expense correctly', ()=>{
  const total = expensesTotal(expenses);
  expect(total).toBe(60);
});