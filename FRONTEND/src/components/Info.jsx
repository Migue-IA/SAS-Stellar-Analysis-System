import BarGraph from "./BarGraph";

export default function Info({ impactData }) {
  return (
    <div className="absolute top-25 left-5 z-10 
                        bg-white/10 backdrop-blur-xs 
                        border border-white/40 
                        shadow-lg p-4 rounded-2xl w-100 text-white">
    
      <h2 className="text-xl font-bold mb-3">Información de Impacto</h2>

      {impactData ? (
        <>
          <p><span className="font-bold">Energía cinética:</span> {impactData.energia}</p>
          <p><span className="font-bold">Tamaño del cráter:</span> {impactData.crater}</p>
          <p><span className="font-bold">Magnitud sísmica equivalente:</span> {impactData.magnitud}</p>
          <p><span className="font-bold">Masa:</span> {impactData.masa}</p>
          <p><span className="font-bold">Velocidad de impacto:</span> {impactData.velocidad}</p>
        </>
      ) : (
        <p className="text-gray-300">Aún no ha ocurrido un impacto.</p>
      )}

      <p className="font-bold mt-5 mb-5">Dato comparativo:</p>
      <BarGraph />
    </div>
  );
}
