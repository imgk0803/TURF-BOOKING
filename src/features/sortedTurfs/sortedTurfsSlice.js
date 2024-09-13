import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
export const sortedTurfSlice = createSlice({
  name : 'turfs',
  initialState :{
       SortedTurf : []
  } ,
  reducers : {
    setSortedTurfs : (state,action)=>{
         state.SortedTurf = action.payload
    }
  }
})
export const{setSortedTurfs} = sortedTurfSlice.actions;

export const getSortedTurfs = (city) => async (dispatch) => {
  try {
    const { lat, lon } = city;
    const response = await axios.get(
      `http://localhost:3000/api/user/turfs?lat=${lat}&lon=${lon}`
    );
    dispatch(setSortedTurfs(response.data));
  } catch (err) {
    console.error(err);
  }
};
export default sortedTurfSlice.reducer ; 