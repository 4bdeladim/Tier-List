import { combineSlices } from '@reduxjs/toolkit';
import tierList from './slices/tier-list';
import { tierListApi } from './services/tierlist';


const rootReducer = combineSlices(tierList, tierListApi)

export default rootReducer;