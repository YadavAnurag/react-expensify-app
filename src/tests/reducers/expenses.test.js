import expenseReducer from '../../reducers/expenses';
import moment from 'moment';

test('should setup default expense reducer state', ()=>{
  const state = expenseReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add expense with default values', ()=>{
  const currentState = [{
    id: '123',
    description: 'Gum',
    amount: 1900,
    note: '',
    date: moment(100).valueOf()
  }];
  const action = {
    type: 'ADD_EXPENSE',
    expense: {}
  };
  const state = expenseReducer(currentState, action);
  expect(state).toEqual([...currentState, {}]);
});

test('should add expese with provided expense values', ()=>{
  const currentState = [{
    id: '123',
    description: 'Gum',
    amount: 1900,
    note: '',
    date: moment(100).valueOf()
  }];
  const newExpense = {
    id: '2123',
    description: 'new expense',
    amount: 10000,
    note: ''
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };
  const state = expenseReducer(currentState, action);
  expect(state).toEqual([...currentState, newExpense]);
});

test('should remove expense', ()=>{
  const currentState = [{
    id: '123',
    description: 'Gum',
    amount: 1900,
    note: '',
    date: moment(100).valueOf()
  }];
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '123'
  };
  const state = expenseReducer(currentState, action);
  expect(state).toEqual([]);
});

test('should edit expense', ()=>{
  const currentState = [{
    id: '123',
    description: 'Gum',
    amount: 1900,
    note: '',
    date: moment(100).valueOf()
  }];
  const action = {
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      description: 'Updated Gum'
    }
  };
  const state = expenseReducer(currentState, action);
  expect(state).toEqual([
    {...currentState[0], description: action.updates.description}
  ]);
});

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: moment(0).valueOf()
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
  }
];
test('should not remove expense if id not found', ()=>{
  const currenState = [...expenses];
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '1000'
  };
  const state = expenseReducer(currenState, action);
  expect(state.length).toBe(3);
});