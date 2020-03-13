import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import moment from 'moment';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
  const expensesData = {};
  expenses.expenses.forEach(({ id, description, note, amount, createdAt })=>{
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

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
  const expenseData = {
    description: 'Mouse', 
    note: 'from amazon', 
    amount:90878, 
    createdAt: 234234
  };

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
  })
  .then((snapshot)=>{
    expect(snapshot.val()).toEqual(expenseData);
    done();
  })
  .catch(err => console.log('Error occurred', err));
});
test('should add expense with defaults to database and store', ()=>{
  const store = createMockStore({}); // with default store data
  const expenseDefault ={
    description: '', 
    note: '', 
    amount: 0, 
    createdAt: 0
  };

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
  }).catch(err => console.log('Error occurred', err));
});

test('should setup set expense action object with data', ()=>{
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
      createdAt: 12
    },
    {
      id: '4123',
      amount: 195,
      description: 'Gum',
      note: '',
      createdAt: 10
    }
  ];

  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', ()=>{
  const store = createMockStore({});
  store.dispatch(startSetExpenses())
    .then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
});