import axios from "axios";
import { useState } from "react";

export default function useAsteroid() {
  const [asteroidsData, setAsteroidsData] = useState([]);
  const [everythingData, setEverythingData] = useState(null);

  const fetchAsteroidsData = async () => {
    try {
      const url = `http://localhost:8000/api/v1/asteroids`;
      const { data } = await axios(url);
      setAsteroidsData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEverythingData = async (id) => {
    try {
      const url = `http://localhost:8000/api/v1/everything/${id}`;
      const { data } = await axios(url);
      setEverythingData(data); // un solo objeto
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  };

  return {
    asteroidsData,
    everythingData,
    fetchAsteroidsData,
    fetchEverythingData,
  };
}
