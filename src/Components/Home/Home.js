
import React from 'react';
import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch, connect } from 'react-redux';
import axios from 'axios';
import { actions  } from '../../Store/actions';
import './Home.css';
import { matchPath } from 'react-router-dom';
import p1 from '../Pictuers/p1.png'
export default function Home() {
    
    const regions = useSelector((state) => state.WeatherReducer.regions);
    const currentCity = useSelector((state) => state.WeatherReducer.currentCity);
    const weatherText = useSelector((state) => state.WeatherReducer.weatherText);
    const key = useSelector((state) => state.WeatherReducer.key);
    const temp = useSelector((state) => state.WeatherReducer.temp);
    const date = useSelector((state) => state.WeatherReducer.date);
    const temperature = useSelector((state) => state.WeatherReducer.temperature);
    const text = useSelector((state) => state.WeatherReducer.text);
    const dispatch = useDispatch();
    let favorite= { "id":key, "name":currentCity,"weatherText":weatherText}
    const [date1 ,setDate]= useState([]);
    const [temperature1 ,setTemperature]= useState([]);
    const [text1 ,setText]= useState([]);
    const [degree ,setDegree]= useState("c");
    const [to ,setTo]= useState("f");
    

     // basic urls to the api
    // const baseURL ="http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=ZZ8kOGT0i2XPkDu8NgiJszZGEsIXGvk1&q="
    // const currentWeather ="http://dataservice.accuweather.com/currentconditions/v1/"
    // const fiveDaysUrl= "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"

    const baseURL ="http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=G2zVeiJtARitzgfWgp96KsAvvkQju4XL&q="
    const currentWeather ="http://dataservice.accuweather.com/currentconditions/v1/"
    
    const fiveDaysUrl= "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
const goePosition="http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&q=31.768318%2C35.213711"


    const searchCity = async (event) => {
        debugger
        //Request to api autocomplete cities
        const res =  await axios.get(`${baseURL}${event.target.value}&language=en-us`)
        
        //set the regiins
        dispatch(actions.addToRegions(res.data))
       
    }


    const chooseCity = async (city) => {
        debugger
        //claer the arrays
        setDate([]);
        setTemperature([]);
        setText([]);
        
        //set the ciytName
        dispatch(actions.setCurrentCity(city.LocalizedName));
        const Key=city.Key;
        dispatch(actions.setKey(city.Key));
       
        
//Request to api currentWeather by key
        const res1 = await axios.get(`${currentWeather}${Key}?apikey=G2zVeiJtARitzgfWgp96KsAvvkQju4XL&details=true`);
        //currentconditions/v1/57918?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&details=true
        
        //set the weathet text
        dispatch(actions.setWeatherText(res1.data[0].WeatherText));
        //get the temp and round
        let y=res1.data[0].Temperature.Metric.Value;
        y=Math.round(y);
        //set the temp
        dispatch(actions.setTemp(y));
        debugger
        const res2 = await axios.get(`${fiveDaysUrl}${Key}?apikey=G2zVeiJtARitzgfWgp96KsAvvkQju4XL&details=true&metric=true`);
      
        for(let i=0;i<=4;i++)
     {
        // set the arrays of dates and text and temp for the next five days
        date1.push((res2.data.DailyForecasts[i].Date.split("T"))[0]) ;
        text1.push(res2.data.DailyForecasts[i].Day.IconPhrase);
        let x =((res2.data.DailyForecasts[i].Temperature.Maximum.Value)+(res2.data.DailyForecasts[i].Temperature.Minimum.Value))/2;
         let b=Math.round(x);
        temperature1.push(
          b
          );
     }
     // the the suitable in the reducer with the  arrays above
     dispatch(actions.addToDate(date1));
     dispatch(actions.addToTemperature(temperature1));
     dispatch(actions.addToText(text1));
     
    }
    
    
    function convert(e) {
      debugger
      if(e === 'c')
      {
        dispatch(actions.setTemp( Math.round(temp * 9 / 5) + 32));
        setDegree("f")
        setTo("c")
      }
      else
      {
        dispatch(actions.setTemp( Math.round((temp - 32) * 5 / 9)));
        setDegree("c")
        setTo("f")
        
      }

      
    }
    return (

<>
<div className="container">
<div class="row">
    <center>
<div class="col">
   
</div>
</center>
  
</div>

<div class="row">
  <div class="col-sm-4  font shasowHome"> Search For Arae:
  <br></br>
  <input onChange={searchCity} />
  <br></br>
      {regions != '' && regions.map(item => (
          <div id="aaa" >
    <a   id="areaToChoose" onClick={() => chooseCity(item)}>{item.LocalizedName}</a>
    <br></br>
    </div>
    
))}
</div>
 
  <div class="col-sm-8">
      <br></br>
  <div class="card text-center bshadow" >
  <div >
      <br></br>
  <button class="btn btn-primary bshadow fontButtonds" style={{ backgroundColor: 'black',color:'white' }}  onClick={() => dispatch(actions.addToFavourites(favorite))} >Add to favourites</button>
  <br></br>
  <br></br>
  </div >
  
  <div >
    <h5 >{currentCity}    {temp}{degree} <button  style={{borderRadius:'50%',width:'2rem',height:'2rem'}}  onClick={() => convert(degree)}>{to}</button></h5>
    
    <p >{weatherText}</p>
    
  </div>
<br></br>

 <div class="card-footer text-muted container ">
     <br></br>
    <div class="row">
        <br></br>
        <br></br>
       
         <div class="col-sm-2" >
         <div class="card bshadow" >
           <div class="card-body" >
             <h5 class="card-title forFiveDays " >{date[0]}</h5>
             <p class="card-text forFiveDays">{temperature[0]}c</p>
             
           </div>
         </div>
         
       </div>
       <div class="col-sm-2" >
         <div class="card bshadow"  >
           <div class="card-body" >
             <h5 class="card-title  forFiveDays" >{date[1]}</h5>
             <p class="card-text forFiveDays">{temperature[1]}c</p>
             
           </div>
         </div>
         
       </div>
       <div class="col-sm-2" >
         <div class="card bshadow"  >
           <div class="card-body" >
             <h5 class="card-title forFiveDays" >{date[2]}</h5>
             <p class="card-text forFiveDays">{temperature[2]}c</p>
             
           </div>
         </div>
         
       </div>
       <div class="col-sm-2" >
         <div class="card bshadow"  >
           <div class="card-body" >
             <h5 class="card-title forFiveDays  " >{date[3]}</h5>
             <p class="card-text forFiveDays">{temperature[3]}c</p>
             
           </div>
         </div>
         
       </div>
       <div class="col-sm-2"  >
         <div class="card bshadow"  >
           <div class="card-body"  >
             <h5 class="card-title forFiveDays" >{date[4]}</h5>
             <p class="card-text forFiveDays">{temperature[4]}c</p>
             
           </div>
         </div>
         
       </div>
    <div class="col-sm-2">
    <img   className=" floating"  src={p1} alt="fvfv" style={{width:'7rem',height:'6rem' , borderRadius:'50%'}}></img>
    </div>
  
</div>
  </div>
  
</div>
    </div>
   
  
</div>
</div>



      </>  
        
        
              
           


            

         

 
      
    )
}
