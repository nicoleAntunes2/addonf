import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [photos, setPhotos] = useState([]);

  function handleInputChange(event) {
    setKeyword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    searchPhotos();
  }

  function searchPhotos() {
    const apiKey = "33ac5e9b0eacbo082t8a473ffd2045d0";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    axios.get(apiUrl).then((response) => {
      if (response.data && response.data.photos && response.data.photos.length > 0) {
        setPhotos(response.data.photos);
      } else {
        setPhotos([]);
      }
    }).catch((error) => {
      setPhotos([]);
    });
  }

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dictionary with Photos 📷</h1>
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

      {photos.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px"
          }}
        >
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
