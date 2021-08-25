import { createStore, combineReducers } from 'redux';
import WeatherReducer from './reducers/WeatherReducer';


const reducer = combineReducers({
    WeatherReducer
});
const store = createStore(reducer);
window.store = store;
export default store;