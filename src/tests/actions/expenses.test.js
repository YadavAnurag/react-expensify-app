import { addExpense, removeExpense, editExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

test('should setup remove expense action object', ()=>{
  const action = removeExpense({ id: '123' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123'
  });
});

test('should setup edit expense action object', ()=>{
  const action = editExpense('100', { amount: 800, note: 'today' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '100',
    updates: {
      amount: 800,
      note: 'today'
    }
  });
});

test('should setup add expense action object with provided values', ()=>{
  const action = addExpense(expenses.expenses[0]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses.expenses[0]
  });
});

test('should add expense to database and store', ()=>{});
test('should add expense with default to database and store', ()=>{});


// test('should setup add expense action object with default values', ()=>{
//   const expenseData = {};
//   const action = addExpense(expenseData);

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       amount: 0,
//       note: '',
//       createdAt: 0
//     }
//   });
// });
