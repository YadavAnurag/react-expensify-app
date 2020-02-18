import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <div>
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  </div>
);

export default ExpenseDashboardPage;