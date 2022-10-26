import React, { useState } from 'react'
import { useRef } from "react";

const Weather = ({handleWeather,city,setCity,weatherData,setWeatherData,loading}) => {

    const inputRef = useRef();
    const weekdays=["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday"];
    const [dayOfWeek,setDayOfWeek]=useState(0);
    

  return (
    <section>
        <div className="mx-auto shadow p-1 m-3 rounded-1 news-item">
            <div className="card-body text-light p-2">
                <form className="d-flex mx-right" role="search" onSubmit={(e) => {handleWeather(e)}}>
                    <input className="form-control me-0 rounded-0 bg-dark text-white border-secondary" name="city" type="search" 
                    placeholder="Enter a city name" aria-label="Search" onChange={(e)=>{e.target.value===""?setWeatherData(""):setCity(e.target.value)}} required/>
                    <button className="btn btn-info text-light rounded-0" type="submit" onClick={() => {inputRef.current.focus()}}>
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        </div>

        <div className="mx-auto shadow p-1 m-3 rounded-1 weather-item">
            <div className="card-body text-light p-2">
            {!loading?<>
                {weatherData ? 
                (
                <>  {dayOfWeek===0?
                    <h3 className='sub-row text-info'>Today</h3>
                    :<h3 className='sub-row text-info'>{dayOfWeek===7?"Next ":""}{weekdays[(new Date().getDay()+dayOfWeek)%7]}</h3>
                }
                    <p className='sub-row'><span className="badge bg-dark">{city} ({weatherData.timezone})</span></p>
                    <h1 className="sub-row text-info">{(weatherData.daily[dayOfWeek].temp.day-273.15).toFixed(1)} °C</h1> 
                    <h5 className='sub-row'><span className="badge bg-dark">{weatherData.daily[dayOfWeek].weather[0].description}</span></h5>
                    <div className="sub-row">
                        <label className='text-medium'><i className="fa fa-arrow-up" aria-hidden="true"></i> Max: {(weatherData.daily[dayOfWeek].temp.max-273.15).toFixed(1)} °C</label>
                        <label className='text-medium'><i className="fa fa-arrow-down" aria-hidden="true"></i> Min: {(weatherData.daily[dayOfWeek].temp.min-273.15).toFixed(1)} °C</label>
                        <label className='text-medium'><i className="fa fa-arrows-down-to-line" aria-hidden="true"></i> Pressure: {weatherData.daily[dayOfWeek].pressure}</label>
                    </div>
                    <div className="sub-row">
                        <label className='text-medium'><i className="fa fa-droplet" aria-hidden="true"></i> Humidity: {weatherData.daily[dayOfWeek].humidity} %</label>
                        <label className='text-medium'><i className="fa fa-explosion" aria-hidden="true"></i> UVI: {weatherData.daily[dayOfWeek].uvi}</label>
                        <label className='text-medium'><i className="fa fa-wind" aria-hidden="true"></i> Wind: {weatherData.daily[dayOfWeek].wind_speed} Km/h</label>
                    </div>
                    <hr/>
                    <div className='weekly-data'>
                        {weatherData.daily.map((item,indx)=>
                            <span className='week-days' onClick={()=>setDayOfWeek(indx)}>
                                {indx!==0?
                                <span style={{color:"greenyellow"}}>{weekdays[(new Date().getDay()+indx)%7].slice(0,3)}</span>
                                :<span style={{color:"greenyellow"}}>Today</span>
                                }
                                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt=".."/>
                               <label className="text-small">{item.weather[0].description}</label>
                               <label className='text-info'>{(item.temp.day-273.15).toFixed(1)} °C</label> 
                            </span>
                        )}
                    </div>
                </>
                )
                : <label>No data to show</label>
                }
                </>
                :<div className='container-fluid text-center' style={{width:"100%"}} disabled>
                    Loading...
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </div>
            }
            </div>
        </div>
    </section>
  )
}

export default Weather
