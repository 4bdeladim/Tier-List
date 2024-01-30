import { combineSlices } from '@reduxjs/toolkit';
import tierList from './slices/tier-list';


const rootReducer = combineSlices(tierList)

export default rootReducer;