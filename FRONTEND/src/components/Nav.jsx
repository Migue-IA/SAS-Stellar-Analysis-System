import { useState } from "react";
import useAsteroid from "../data/useAsteroid";
import { useEffect } from "react";

export default function Nav({ asteroid, setAsteroid, onLaunch }) {
  const { asteroidsData, fetchAsteroidsData } = useAsteroid();
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    fetchAsteroidsData();
    loadAvailableModels();
  }, []);

  const loadAvailableModels = async () => {
    const possibleNames = [
      "433 Eros (A898 PA)",
    ]; 
    setAvailableModels(possibleNames);
  };

  const handleSelect = (e) => {
    const selected = asteroidsData.find((a) => Number(a.id) === Number(e.target.value));
    if (selected) setAsteroid(selected);
  };

  const handleLaunch = () => {
    console.log("handleLaunch...")
    if (onLaunch) onLaunch(true);
    console.log("Launch: ", onLaunch)
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLaunch}
        className="absolute top-150 left-166 z-10 
                   bg-yellow-400/30 backdrop-blur-xs 
                   border border-yellow-400/80 
                   shadow-lg py-3 px-20 rounded-2xl text-white"
      >
        Lanzar
      </button>

      <div
        className="absolute top-5 left-300  z-10 
                   bg-white/10 backdrop-blur-xs 
                   border border-white/40 
                   shadow-lg p-4 rounded-2xl w-80 text-white"
      >
        <h2 className="text-xl font-bold mb-3">Configurar Colisión</h2>

        <form className="flex flex-col gap-2">
          <h2 className="text-xl mt-3 font-bold mb-3">Asteroide</h2>

          <label className="text-sm">Elige un asteroide real:</label>
          <select onChange={handleSelect}>
            <option value="">Seleccione</option>
            {asteroidsData
              .filter((a) => availableModels.includes(a.name))
              .map((a) => (
                <option className="text-black" key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
          </select>
        </form>
      </div>

      {asteroid && (
        <div
          className="absolute top-60 left-300 z-10 
                      bg-white/10 backdrop-blur-xs 
                      border border-white/40 
                      shadow-lg p-4 rounded-2xl w-80 text-white"
        >
          <img
            src={`/images/${asteroid.name}.png`}
            alt={asteroid.name}
            className="rounded-md w-40 mx-auto"
          />
          <p className="font-bold text-2xl mb-5 text-center">
            {asteroid.id} {asteroid.name}
          </p>
          <p className="mt-2">
            <span className="font-bold">Diámetro:</span>{" "}
            {asteroid.diameter.average} km
          </p>
          <p className="mt-2">
            <span className="font-bold">Inclinación de Órbita:</span>{" "}
            {asteroid.orbit.inclination}
          </p>
          <p className="mt-2">
            <span className="font-bold">Periodo de rotación:</span>{" "}
            {asteroid.orbit.period}
          </p>
        </div>
      )}
    </>
  );
}
