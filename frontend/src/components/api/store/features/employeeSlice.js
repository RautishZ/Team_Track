import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: {},
  },
  reducers: {
    setEmployeeDetails: (state, action) => {
      state.employee = action.payload;
    },
  },
});

export const { setEmployeeDetails } = employeeSlice.actions;

export default employeeSlice.reducer;
