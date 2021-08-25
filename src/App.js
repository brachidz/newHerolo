import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux';
import React  , { useState }from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, useParams } from "react-router-dom";
import Home from './Components/Home/Home'
import Favorites from './Components/Favorites/Favorites'
import store from './Store/store';
import { useEffect } from 'react';
import Geo from './Components/Geo';

import p1 from './Components/Pictuers/p1.png'
export default function App() {
  const currentCity = useSelector((state) => state.WeatherReducer.currentCity);
  
    return (
        <div >
          <center>
          <div className="shasow fontP" >
          <b> Weather</b>
          {/* <Geo></Geo> */}
          
          </div>

          
          </center>
          
         
            <Router>
                <nav style={{ backgroundColor: 'lightblue', height: '80px' }}>
                    <br></br>
                    <div className="container">
                        <div className="row">

                            <div className="col col-sm-1">
                                <button className="btn btn-outline-dark"><Link to="/Home"><span style={{ color: 'white'}}><b>Home</b></span></Link></button>
                            </div>
                            <div className="col col-sm-1">
                                <button className="btn btn-outline-dark"><Link to="/Favorites"><span style={{ color: 'white' }}><b>Favorites</b></span></Link></button>
                            </div>
                            
                            <div style={{color:'white',fontFamily:'cursive',fontSize:'30px'}} className="col col-sm-8   "    >
                              <center   >{currentCity}</center>
                        
                            </div>
                           <div className="col col-sm-1">
                           </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                </nav>
                <div style={{ backgroundColor: 'black', height: '20px' }}></div>
                <Switch>
                    <Route path="/Home">
                      <Provider  store={store}>
                        <Home>

                        </Home>
                        </Provider>
                    </Route>
                    <Route path="/Favorites">
                       
                   <Favorites></Favorites>         
                       
                    </Route>
                   
                   
                </Switch>
            </Router>
        </div>
    )
}