
import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import axios from 'axios';
import WeatherReducer from '../../Store/reducers/WeatherReducer';
import { actions  } from '../../Store/actions';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, useParams } from "react-router-dom";
import Home from '../Home/Home';

import { Provider } from 'react-redux';

import store from '../../Store/store';
import { useHistory } from "react-router-dom";
export default function Favorites() {
    let history = useHistory();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.WeatherReducer.favourites);
    const key = useSelector((state) => state.WeatherReducer.key);
    const date = useSelector((state) => state.WeatherReducer.date);
    const temperature = useSelector((state) => state.WeatherReducer.temperature);
    const text = useSelector((state) => state.WeatherReducer.text);
   

    const toHomePage = async (item) => {
        debugger
       
      //set the current values to cityName and waetherText
       dispatch(actions.setCurrentCity(item.name));
       dispatch(actions.setWeatherText(item.weatherText));
       //back to honePage
       history.push("/Home");
        

       
    }
    
    
 



    return (
        <div>
            
            <center className="fontButtonds">
           My Favorites
           </center>
           <br></br>
            <div class=" container">
            
    <div class="row">
        <br></br>
        {favorites != '' && favorites.map((item,index) => (
         <div class="col-sm-2"  style={{width:'15rem'}}  >
         <div class="card bshadow">
           <div class="card-body">
             <h5 class="card-title  fontButtonds" onClick={() => toHomePage(item)}>{item.name}</h5>
             <p class="card-text fontButtonds" style={{fontSize:'15px'}}   >{item.weatherText}</p>
             <button className="btn btn-danger bshadow fontButtonds" style={{ backgroundColor: 'black' ,fontSize:'13px'}} onClick={(e) => dispatch(actions.deleteFromFavourites([index, favorites]))}>‏
    Remove From Favourites
    </button>
           </div>
         </div>
         
       </div>
    
))}
</div>

</div>



            {/* { favorites != '' && favorites.map((item, index) => (

<div className="card" style={{ width: '13rem'}}>
    <div className="card-body">
        <h5 class="card-title">{item.name}</h5>
        
        <br></br>
        <span><b>  {item.weatherText}</b></span>
    </div>
    <button className="btn btn-danger bshadow fontButtonds" style={{ backgroundColor: 'black' }} onClick={(e) => dispatch(actions.deleteFromFavourites([index, favorites]))}>‏
    Remove From Favourites
    </button>
    <div>
    </div>
</div>
))} */}
           
          </div>
    )
}