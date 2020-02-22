import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
  <div>
    <div>
      <ExpenseListFilters />
      <ExpensesSummary />
      <ExpenseList />
    </div>
  </div>
);

export default ExpenseDashboardPage;