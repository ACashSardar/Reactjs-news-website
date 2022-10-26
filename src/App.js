import Content from "./Components/Content";
import Navbar from "./Components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Weather from "./Components/Weather";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const categoryList = [
    "General",
    "Business",
    "Entertainment",
    "Science",
    "Health",
    "Sports",
    "Technology",
  ];

  // const host = "https://newsapi.org/v2/";
  const host = "https://news-app-proxy-server.vercel.app";

  const [category, setCategory] = useState("general");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState("");
  const [data, setData] = useState("");
  const [visible, setVisible] = useState(3);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  const fetchData = async (category, keyword, channel) => {
    setLoading(true);

    let api = "";
    if (keyword !== undefined && keyword !== "") {
      api = `${host}/everything?q=${keyword}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
    } else if (channel !== undefined && channel !== "") {
      api = `${host}/top-headlines?sources=${channel}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
    } else if (category !== undefined && category !== "") {
      api = `${host}/top-headlines?country=in&category=${category}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
    } else {
      api = `${host}/top-headlines?country=in&category=general&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
    }

    // let api = "";
    // if (keyword !== undefined && keyword !== "") {
    //   api = "/JSONfiles/science.json";
    // } else if (channel !== undefined && channel !== "") {
    //   api = "/JSONfiles/channel.json";
    // } else if (category !== undefined && category !== "") {
    //   api = `/JSONfiles/${category}.json`;
    // } else {
    //   api = "/JSONfiles/general.json";
    // }

    console.log(
      "category=",
      category,
      ", keyword=",
      keyword,
      ", channel=",
      channel,
      ", api=",
      api
    );
    await axios.get(api).then((res) => setData(res.data.articles));
    // await fetch(api)
    //   .then((response) => response.json())
    //   .then((data) => setData(data.articles));

    setLoading(false);
  };

  useEffect(() => {
    fetchData(category, keyword, channel);
    setVisible((prev) => 3);
    setKeyword("");
  }, [category, channel]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(
      category,
      event.target.elements.keyword.defaultValue.trim(),
      channel
    );
    setKeyword("");
    navigate(`/search`);
  };

  const handleChannelName = (channelName) => {
    setChannel(channelName);
  };

  const fetchWeatherInfo = async (city) => {
    setLoading(true);
    const nominatimAPI = `https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1&email=akashsardar383@gmail.com`;
    const res1 = await axios.get(nominatimAPI);
    const loc = await res1.data;
    const lat = loc[0].lat;
    const lon = loc[0].lon;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=7f7fb990c0d07404f86fb5f5a6922579`;
    const res2 = await axios.get(weatherAPI);
    const weatherData = await res2.data;
    setWeatherData(weatherData);
    setLoading(false);
  };

  const handleWeather = (event) => {
    event.preventDefault();
    fetchWeatherInfo(city);
  };

  return (
    <div>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleSubmit={handleSubmit}
        setCategory={setCategory}
        categoryList={categoryList}
        setChannel={setChannel}
      />

      <Routes>
        <Route
          exact
          path="/"
          navigate="/category"
          element={
            <Content
              loading={loading}
              handleChannelName={handleChannelName}
              data={data}
              visible={visible}
              loadMore={loadMore}
            />
          }
        />

        <Route
          exact
          path={`/category`}
          element={
            <Content
              loading={loading}
              handleChannelName={handleChannelName}
              data={data}
              visible={visible}
              loadMore={loadMore}
            />
          }
        />

        <Route
          exact
          path="/channel"
          element={
            <Content
              loading={loading}
              handleChannelName={handleChannelName}
              data={data}
              visible={visible}
              loadMore={loadMore}
            />
          }
        />

        <Route
          exact
          path="/search"
          element={
            <Content
              loading={loading}
              handleChannelName={handleChannelName}
              data={data}
              visible={visible}
              loadMore={loadMore}
            />
          }
        />

        <Route
          exact
          path="/weather"
          element={
            <Weather
              handleWeather={handleWeather}
              city={city}
              setCity={setCity}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              loading={loading}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
