import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import emailSlice from './emailSlice';

const reducer = (state, action) => {
  return combineReducers({
    auth: authSlice,
    email: emailSlice,
  })(state, action);
};

export default reducer;
