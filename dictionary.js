import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [phonetic, setPhonetic] = useState("");

  function handleInputChange(event) {
    setKeyword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    searchPhonetic();
  }

  function searchPhonetic() {
    const apiKey = "33ac5e9b0eacbo082t8a473ffd2045d0";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    axios.get(apiUrl).then((response) => {
      if (
        response.data &&
        response.data.phonetics &&
        response.data.phonetics.length > 0
      ) {
        setPhonetic(response.data.phonetics[0].text);
      } else {
        setPhonetic("Phonetic not found.");
      }
    }).catch((error) => {
      setPhonetic("Error retrieving phonetic.");
    });
  }

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Phonetics Finder 🔤</h1>
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

      {phonetic && (
        <div style={{ marginTop: "30px", padding: "20px" }}>
          <h2>Phonetic for "{keyword}":</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{phonetic}</p>
        </div>
      )}
    </div>
  );
}
