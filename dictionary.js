import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [definition, setDefinition] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [photos, setPhotos] = useState([]);

  function handleInputChange(event) {
    setKeyword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    searchWord();
  }

  function searchWord() {
    const apiKey = "33ac5e9b0eacbo082t8a473ffd2045d0";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    axios.get(apiUrl).then((response) => {
      if (response.data && response.data.definitions.length > 0) {
        setDefinition(response.data.definitions[0].definition);

        if (response.data.definitions[0].synonyms) {
          setSynonyms(response.data.definitions[0].synonyms);
        } else {
          setSynonyms([]);
        }
      } else {
        setDefinition("Definition not found.");
        setSynonyms([]);
      }

      if (response.data.phonetics && response.data.phonetics.length > 0) {
        setPhonetic(response.data.phonetics[0].text);
      } else {
        setPhonetic("");
      }

      if (response.data.photos && response.data.photos.length > 0) {
        setPhotos(response.data.photos);
      } else {
        setPhotos([]);
      }
    }).catch((error) => {
      setDefinition("Error retrieving data.");
      setSynonyms([]);
      setPhonetic("");
      setPhotos([]);
    });
  }

  return (
    <div className="App" style={{ textAlign: "center", padding: "30px" }}>
      <h1>Dictionary App 📚</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter a word..."
          style={{
            padding: "10px",
            width: "250px",
            fontSize: "16px",
            marginBottom: "10px"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </form>

      {definition && (
        <div style={{ marginTop: "30px" }}>
          <h2>Definition:</h2>
          <p>{definition}</p>
        </div>
      )}

      {phonetic && (
        <div style={{ marginTop: "20px" }}>
          <h2>Phonetic:</h2>
          <p>{phonetic}</p>
        </div>
      )}

      {synonyms.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Synonyms:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {synonyms.map((synonym, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {synonym}
              </li>
            ))}
          </ul>
        </div>
      )}

      {photos.length > 0 && (
        <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo.src.landscape}
              alt={keyword}
              style={{ width: "150px", borderRadius: "8px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
