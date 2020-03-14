import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';


export class EditExpensePage extends React.Component{
  onSubmit = (expense)=>{
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onRemove = ()=>{
    this.props.startRemoveExpense({ id: this.props.expense.id});
    this.props.history.push('/');
  };
  render(){
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <div className='page-header__title'>
              <h1>Edit Expense</h1>
            </div>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm 
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button onClick={this.onRemove} className='button button--secondary' >Remove</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props)=>{
  return {
    expense: state.expenses.find((expense)=>(expense.id === props.match.params.id))
  }
};
const mapDispathToProps = (dispatch, props)=>{
  return {
    startEditExpense : (id, expense)=> dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data)=> dispatch(startRemoveExpense(data))
  }
};
export default connect(mapStateToProps, mapDispathToProps)(EditExpensePage);