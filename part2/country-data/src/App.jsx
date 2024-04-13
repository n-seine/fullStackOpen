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

const SearchResults = ({ results, setResults }) => (
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

const Search = ({ fullList, results, setResults }) => {
  const [filter, setFilter] = useState("");
  const handleFilter = (event) => {
    setFilter(event.target.value);
    const filteredCountries = fullList.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    console.log("filteredCountries", filteredCountries);
    setResults(filteredCountries);
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
        <SearchResults results={results} setResults={setResults} />
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
      {results.length === 1 ? <CountryData country={results[0]} /> : ""}
    </>
  );
};

export default App;
