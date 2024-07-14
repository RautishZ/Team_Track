import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './features/departmentSlice';
import loginReducer from './features/loginSlice';
import employeeReducer from './features/employeeSlice';

export const store = configureStore({
    reducer: {
        department: departmentReducer,
        login: loginReducer,
        employee:employeeReducer
    },
});
