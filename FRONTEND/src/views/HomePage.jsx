import { useState } from "react"; 
import Space from "../components/Space";
import Nav from "../components/Nav";
import Info from "../components/Info";
import { Link } from "react-router";

export default function HomePage() {
  const [asteroidData, setAsteroidData] = useState(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [impactData, setImpactData] = useState(null);

  const handleLaunch = () => {
    if (!asteroidData) {
      console.warn("⚠️ Debes seleccionar un asteroide antes de lanzarlo.");
      return;
    }

    console.log("🚀 Lanzando asteroide:", asteroidData.name);
    setIsLaunched(true);

    setTimeout(() => {
      setIsLaunched(false);
      console.log("🕹️ Listo para otro lanzamiento.");
    }, 5000);
  };

  const handleImpact = (data) => {
    console.log("💥 Impacto detectado:", data);
    setImpactData(data);
    setIsLaunched(false);
  };

  return (
    <>
      <section className="relative w-screen h-screen">
        <button href='/' className="text-white p-2 m-5 absolute border-1 px-7 rounded-4xl">Regresar</button>
        <Space 
          asteroid={asteroidData} 
          isLaunched={isLaunched} 
          onImpact={handleImpact} 
        />
        <Nav 
          asteroid={asteroidData}
          setAsteroid={setAsteroidData}
          onLaunch={handleLaunch}
        />
        <Info impactData={impactData} />
      </section>
    </>
  );
}
