import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ResultsLine = ({ country, setResults }) => (
  <li>
    {country.name.common}
    <button
      onClick={() => {
        setResults([country]);
      }}
    >
      show data
    </button>
  </li>
);

const SearchResults = ({ results, setResults, fullList, filter }) => {
  useEffect(() => {
    const filteredCountries = fullList.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    console.log("filteredCountries", filteredCountries);
    setResults(filteredCountries);
  }, [filter, setResults, fullList]);
  return (
    <div>
      {results.length > 10 ? (
        "Too many matches, specify another filter"
      ) : results.length === 0 ? (
        "No country found"
      ) : results.length === 1 ? (
        ""
      ) : (
        <ul>
          {results.map((country) => (
            <ResultsLine
              key={country.cca3}
              country={country}
              setResults={setResults}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const Search = ({ fullList, results, setResults }) => {
  const [filter, setFilter] = useState("");
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="search">Search countries : </label>
        <input type="text" id="search" onChange={handleFilter} value={filter} />
      </div>
      {filter === "" ? (
        <p>Search for countries to display fascinating data !</p>
      ) : (
        <SearchResults
          results={results}
          setResults={setResults}
          fullList={fullList}
          filter={filter}
        />
      )}
    </>
  );
};

const CountryData = ({ country }) => (
  <section>
    <h1>{country.name.common}</h1>
    <p>
      Full name : {country.name.official}, and as they say over there :{" "}
      {
        country.name.nativeName[Object.keys(country.name.nativeName)[0]]
          .official
      }
    </p>
    <p>Capital : {country.capital[0]}</p>
    <hr />
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img src={country.flags.png} aria-describedby="flag-description" />
    <p id="flag-description">{country.flags.alt}</p>
  </section>
);

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[0]}&current=temperature_2m,precipitation,wind_speed_10m&hourly=temperature_2m`
    ).then((response) => {
      response.json().then((data) => {
        setWeather(data);
      });
    });
    console.log("weather", weather);
  }, [country]);
  return (
    <section>
      <h1>Weather in {country.capital[0]}</h1>

      {weather.current && (
        <>
          <p>Precipitation : {weather.current.precipitation} mm </p>
          <p>Temperature : {weather.current.temperature_2m} °</p>
          <p>Wind Speed : {weather.current.wind_speed_10m} m/s</p>
        </>
      )}
    </section>
  );
};

const App = () => {
  const [fullCountries, seFullCountries] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all").then((response) => {
      response.json().then((data) => {
        seFullCountries(data);
      });
    });
  }, []);
  return (
    <>
      <Search
        fullList={fullCountries}
        results={results}
        setResults={setResults}
      />
      {results.length === 1 ? (
        <>
          <CountryData country={results[0]} /> <Weather country={results[0]} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
