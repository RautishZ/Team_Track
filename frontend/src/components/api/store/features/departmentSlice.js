import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    department: []
}

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        addDepartment: (state, action) => {
            state.department.unshift(action.payload);
            console.log(action.payload);
        }
    }
})

export const { addDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;
