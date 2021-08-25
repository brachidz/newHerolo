import produce from 'immer';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';

import { actions } from '../actions';
import createReducer from './ReducerUtils';


export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_PRODUCT_PRICE = 'SET_PRODUCT_PRICE';
const initialState = {

    currentCity:"Tel-Aviv",
    weatherText:"sunny ",
    key:"90",
    temp:"34",
    regions:[],
    favourites:[],
    fiveDays:[],
    date: ["22.08.2021","24.08.2021","25.08.2021","26.08.2021","27.08.2021"],
    temperature:["27","31","33","28","30"],
    text:["suuny","suuny","cloudy","rainy","suuny"]

}
const weather = {
    
    addToDate(state = initialState, action) {
        debugger
        //const newCart = [...state.cart, action.payload];
        state.date = action.payload;
        console.log(initialState.date);
    },
    addToTemperature(state = initialState, action) {
        debugger
        //const newCart = [...state.cart, action.payload];
        state.temperature = action.payload;
        console.log(initialState.date);
    },
    addToText(state = initialState, action) {
        state.text = action.payload;
        
    },
    addToFavourites(state = initialState, action) {
       
        const newFavourites = [...state.favourites, action.payload];
        state.favourites = newFavourites;
       
    },
    deleteFromFavourites(state = initialState.favourites, action) {
       
        let arr = action.payload[1]
        arr = arr.filter((item) => item.id !== action.payload[1][action.payload[0]].id).map(({ id, name, weatherText }) => ({ id, name, weatherText }));
        state.favourites = arr;
        // console.log(state.cart.length); ‏
    },
    
    addToRegions(state = initialState, action) {
       
        state.regions=action.payload;
        
    },
    setCurrentCity(state=initialState,action){
        
    state.currentCity=action.payload;
    },
    setKey(state=initialState,action){
        
        state.key=action.payload;
        },
    setWeatherText(state=initialState,action){
      
    state.weatherText=action.payload;
    },
    setTemp(state=initialState,action){

    state.temp=action.payload;
    },

};
export default produce((state, action) => createReducer(state, action, weather), initialState);
