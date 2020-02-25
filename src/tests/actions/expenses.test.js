import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


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

test('should add expense to database and store', (done)=>{
  const store = createMockStore({}); // with default store data
  const expenseData = {description: 'Mouse', note: 'from amazon', amount:90878, createdAt: 234234};

  store.dispatch(startAddExpense(expenseData)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData 
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot)=>{
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});
test('should add expense with default to database and store', ()=>{
  const store = createMockStore({}); // with default store data
  const expenseDefault ={description: '', note: '', amount: 0, createdAt: 0}

  store.dispatch(startAddExpense(expenseDefault)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault 
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot)=>{
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});


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
