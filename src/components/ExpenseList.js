import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

export const ExpenseList = (props)=>(
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-desktop'>Expenses</div>
      <div className='show-for-mobile'>Expense</div>
      <div className='show-for-mobile'>Amount</div>
    </div>
    <div className='list-body'>
      {
        props.expenses.length === 0 ? (
          <div className='list-item list-item--message'>
            <span><p>No Expenses</p></span>
          </div>
        ) : (
            props.expenses.map((expense)=>{
              return <ExpenseListItem key={expense.id} {...expense} />
            })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state)=>{
  return {
    expenses: selectedExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
