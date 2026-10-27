import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    data: [],
    loading: false,
}

export let dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {}
})


export default dataSlice.reducer