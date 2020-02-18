import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component{

  state = {
    calanderFocused: null
  }
  
  onDatesChange = ({ startDate, endDate })=>{
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calanderFocused)=>{
    this.setState(()=>({ calanderFocused }));
  };
  onOutsideClick(e) {
    const { onOutsideClick } = this.props;
    const { childNode } = this;
    const isDescendantOfRoot = childNode && childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  }
  onTextChange = (e)=>{
    this.props.setTextFilter(e.target.value);
  }
  onSortChange = (e)=>{
    if(e.target.value === 'date'){
      this.props.sortByDate();
    }else if(e.target.value === 'amount'){
      this.props.sortByAmount(); 
    }
  }

  render(){
    return (
      <div>
        <input type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
        <select 
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker 
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calanderFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          showClearDates={true}
          isOutsideRange={()=> false}
        />
      </div>
    );
  };
}

const mapStateToProps = (state)=>({
  filters: state.filters
});
const mapDispatchToProps = (dispatch)=>{
  return {
    setTextFilter:  (text)=> dispatch(setTextFilter(text)),
    sortByDate: ()=> dispatch(sortByDate()),
    sortByAmount: ()=> dispatch(sortByAmount()),
    setStartDate: (startDate)=> dispatch(setStartDate(startDate)),
    setEndDate: (endDate)=> dispatch(setEndDate(endDate))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);