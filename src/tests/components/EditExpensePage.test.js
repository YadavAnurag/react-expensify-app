import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper, expense;
beforeEach(()=>{
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  expense = expenses.expenses[1];
  wrapper = shallow(<EditExpensePage 
    editExpense={editExpense} 
    startRemoveExpense={startRemoveExpense}
    history={history}
    expense={expense} 
  />);
}); 

test('should render EditExpensePage correctly', ()=>{
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', ()=>{
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle startRemoveExpense', ()=>{
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id});
});