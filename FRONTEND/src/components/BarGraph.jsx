import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";

export default function BarGraph() {
  const data = [
    { x: "Bomba de Hiroshima", destruction: 162000 },
    { x: "Huracán Equis XD", destruction: 302000 },
    { x: "Colisión Asteroide", destruction: 800000 },
  ];

  const maxValue = Math.max(...data.map((d) => d.destruction));

  const [options] = useState({
    background: { fill: "transparent" }, // Fondo transparente
    data,
    series: [
      {
        type: "bar",
        xKey: "x",
        yKey: "destruction",
        cornerRadius: 6,
        strokeWidth: 0,
        fillOpacity: 0.9,
        formatter: (params) => ({
          fill:
            params.datum.destruction === maxValue
              ? "#ff003c" // Rojo brillante para el valor más alto
              : "#00f7ff", // Azul futurista para los demás
        }),
        highlightStyle: {
          item: {
            fill: "#00ffe0",
          },
        },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          color: "#cbd5e1",
          fontFamily: "Orbitron, sans-serif",
          fontSize: 13,
        },
        line: { color: "#1f2937" },
      },
      {
        type: "number",
        position: "left",
        label: {
          color: "#94a3b8",
          fontSize: 12,
        },
        gridStyle: [{ stroke: "#1f2937", lineDash: [4, 4] }],
      },
    ],
    
    legend: { enabled: false },
    tooltip: {
      enabled: true,
      renderer: (params) => ({
        content: `
          <div style="
            background: rgba(0, 0, 0, 0.85);
            color: #00f7ff;
            padding: 6px 10px;
            border-radius: 6px;
            font-family: monospace;
          ">
            <b>${params.datum.x}</b><br/>
            Destrucción: ${params.datum.destruction.toLocaleString()} personas
          </div>
        `,
      }),
    },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        background: "transparent",
        backdropFilter: "blur(6px)",
      }}
    >
      <AgCharts options={options} />
    </div>
  );
}
