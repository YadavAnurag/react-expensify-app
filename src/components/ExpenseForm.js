import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calanderFocused: false,
      error: ''
    }
  }
  onDescriptionChange = (e)=>{
    const description = e.target.value;
    this.setState(()=>({ description }));
  };
  onAmountChange = (e)=>{
    const amount = e.target.value;
    
    if(!amount || amount.match(/^\d{1,}(\.?\d{0,2})$/)){
      this.setState(()=>({ amount }));
    }
  
  };
  onNoteChange = (e)=>{
    const note = e.target.value;
    this.setState(()=>({ note }));
  };
  onAddExpense = (e)=>{
    e.preventDefault();
  };
  onDateChange = (createdAt)=>{
    if(createdAt){
      this.setState(()=>({ createdAt }));
    }
  };
  onFocusChange = ({ focused })=>{
    this.setState(()=>({ calanderFocused: focused }));
  };
  onSubmit = (e)=>{
    e.preventDefault();
    
    if(!this.state.amount || !this.state.description){
      this.setState(()=>({ error: 'Please enter amount and description' }));
    }else{
      this.setState(()=>({ error: '' }));

      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render(){
    return (
      <div>
        <div>{ this.state.error && <p>{this.state.error}</p> }</div>
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder='description'
            value={this.state.description}
            onChange={this.onDescriptionChange}
            autoFocus
          />
          <input 
            type='text'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            focused={this.state.calanderFocused}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={(day)=>(false)}
          />
          <textarea 
            name="note"
            placeholder='note'
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  };
}
