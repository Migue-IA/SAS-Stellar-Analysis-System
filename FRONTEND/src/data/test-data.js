// asteroids.js
// Base de datos pequeña y program-friendly de asteroides reales.
// Notas: valores aproximados y estáticos; para datos en tiempo real usa la API NeoWs de NASA.
export const ASTEROIDS = [
  {
    id: "101955",
    name: "Bennu",
    designation: "101955 Bennu",
    diameter_km: 0.49,        // ~490 m
    absolute_magnitude: 20.9,
    is_potentially_hazardous: true,
    rotation_period_hr: 4.3,
    orbit: { semimajor_axis_au: 1.126, eccentricity: 0.203, inclination_deg: 6.03 },
    sample_mission: "OSIRIS-REx (touch-and-go, muestras)",
    notes: "Rubble-pile, objetivo de OSIRIS-REx; rotación aumenta ligeramente con el tiempo.",
    source: "https://en.wikipedia.org/wiki/101955_Bennu"
  },
  {
    id: "25143",
    name: "Itokawa",
    designation: "25143 Itokawa",
    diameter_km: 0.33,       // ~330 m (media / forma irregular)
    absolute_magnitude: 19.2,
    is_potentially_hazardous: true,
    rotation_period_hr: 12.1,
    orbit: { semimajor_axis_au: 1.324, eccentricity: 0.280, inclination_deg: 1.62 },
    sample_mission: "Hayabusa (muestreo)",
    notes: "Peanut-shaped rubble pile, visitado por Hayabusa.",
    source: "https://en.wikipedia.org/wiki/25143_Itokawa"
  },
  {
    id: "4",
    name: "Vesta",
    designation: "4 Vesta",
    diameter_km: 525,        // aprox. diámetro médio ~525-529 km
    absolute_magnitude: 3.20,
    is_potentially_hazardous: false,
    rotation_period_hr: 5.34,
    orbit: { semimajor_axis_au: 2.362, eccentricity: 0.089, inclination_deg: 7.14 },
    visited_by: "Dawn",
    notes: "Segundo cuerpo más masivo del cinturón principal; muchas mediciones por Dawn.",
    source: "https://science.nasa.gov/solar-system/asteroids/4-vesta/"
  },
]

