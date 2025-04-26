import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [synonyms, setSynonyms] = useState([]);

  function handleInputChange(event) {
    setKeyword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    searchSynonyms();
  }

  function searchSynonyms() {
    const apiKey = "33ac5e9b0eacbo082t8a473ffd2045d0";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    axios.get(apiUrl).then((response) => {
      if (
        response.data &&
        response.data.definitions &&
        response.data.definitions.length > 0 &&
        response.data.definitions[0].synonyms
      ) {
        setSynonyms(response.data.definitions[0].synonyms);
      } else {
        setSynonyms([]);
      }
    }).catch((error) => {
      setSynonyms([]);
    });
  }

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Synonyms Finder 🔍</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter a word..."
          style={{ padding: "10px", width: "250px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}
        >
          Search
        </button>
      </form>

      {synonyms.length > 0 ? (
        <div style={{ marginTop: "30px", padding: "20px" }}>
          <h2>Synonyms for "{keyword}":</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {synonyms.map((synonym, index) => (
              <li key={index} style={{ margin: "5px 0" }}>
                {synonym}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ marginTop: "30px" }}>No synonyms found.</p>
      )}
    </div>
  );
}
