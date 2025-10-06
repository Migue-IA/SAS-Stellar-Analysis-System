from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import math
import httpx

# Estimations
from BACKEND.utils import estimate_material_type, estimate_density
# Others
from BACKEND.utils import neows_id_to_designation, designation_to_spkid, parse_velocity_from_horizons, get_horizons_state
# Constants
from BACKEND.utils import AU_IN_KM
# ENV
from BACKEND.utils import env

app = FastAPI()
origins = [
    "http://localhost:5173",  # Agregar puerto de frontend
    ]

# Agregar el middleware
app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],  # Permite todos los métodos
        allow_headers=["*"],  # Permite todos los headers
        )


@app.get("/")
async def root():
    return {"message": "Everything is working, enter to /docs for documentation"}


@app.get("/api/v1/asteroids/{id}")
async def asteroid_id(id: int, api_key: str = env["NASA_API_KEY"]):
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{id}?api_key={api_key}'
    async with httpx.AsyncClient() as client:
        res = await client.get(url)

    if res.status_code == 200:
        data = res.json()
        real_data = {
            "id": id, "name": data["name"], "absolute_h": data["absolute_magnitude_h"],
            "danger": data["is_potentially_hazardous_asteroid"], "diameter": {
                "min": data["estimated_diameter"]["kilometers"]["estimated_diameter_min"] / AU_IN_KM,
                "max": data["estimated_diameter"]["kilometers"]["estimated_diameter_max"] / AU_IN_KM,
                "average": ((data["estimated_diameter"]["kilometers"]["estimated_diameter_max"] +
                             data["estimated_diameter"]["kilometers"]["estimated_diameter_min"]) / 2) / AU_IN_KM
                }, "orbit": {
                "semi_major_axis": float(data["orbital_data"]["semi_major_axis"]),
                "eccentricity": float(data["orbital_data"]["eccentricity"]),
                "inclination": float(data["orbital_data"]["inclination"]),
                "period": float(data["orbital_data"]["orbital_period"])
                }, "velocity": float(data["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"]
                                     ) * 86400 / AU_IN_KM if data["close_approach_data"] else 0
            }
        return real_data

    return {"message": "Error in fetching"}


@app.get("/api/v1/asteroids/")
async def asteroid(api_key: str = env["NASA_API_KEY"]):
    url = f'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={api_key}'
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
    if res.status_code == 200:
        real_data = []
        neo_data = res.json()

        for i in range(neo_data["page"]["size"]):
            d = neo_data["near_earth_objects"][i]
            t = {
                "id": d["id"], "name": d["name"], "danger": d["is_potentially_hazardous_asteroid"],
                "absolute_h": d["absolute_magnitude_h"], "diameter": {
                    "min": d["estimated_diameter"]["kilometers"]["estimated_diameter_min"] / AU_IN_KM,
                    "max": d["estimated_diameter"]["kilometers"]["estimated_diameter_max"] / AU_IN_KM,
                    "average": ((d["estimated_diameter"]["kilometers"]["estimated_diameter_max"] +
                                 d["estimated_diameter"]["kilometers"]["estimated_diameter_min"]) / 2) / AU_IN_KM
                    }, "orbit": {
                    "semi_major_axis": float(d["orbital_data"]["semi_major_axis"]),
                    "eccentricity": float(d["orbital_data"]["eccentricity"]),
                    "inclination": float(d["orbital_data"]["inclination"]),
                    "period": float(d["orbital_data"]["orbital_period"])
                    }, "velocity": float(d["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"]
                                         ) * 86400 / AU_IN_KM if d["close_approach_data"] else 0
                }
            real_data.append(t)
        return real_data

    return {"message": "Error in fetching"}


@app.get("/api/v1/impacts/{id}")
async def estimate_impact_params(id):
    url_neo = f"http://localhost:8000/api/v1/asteroids/{id}"

    async with httpx.AsyncClient() as client:
        res = await client.get(url_neo)

    neo = res.json()
    diam = neo["diameter"]["average"]
    horizons_id = designation_to_spkid(neows_id_to_designation(id))

    # Velocidad con Horizons
    h_data = await get_horizons_state(horizons_id)
    vel = parse_velocity_from_horizons(h_data)

    # Masa estimada
    density = estimate_density(estimate_material_type(neo["absolute_h"]))
    volume = (4 / 3) * math.pi * (diam / 2) ** 3
    mass = volume * density  # en kg

    # Energía cinética
    v_m_s = vel["speed_kms"] * 1000
    energy = 0.5 * mass * v_m_s ** 2  # joules
    energy_megatons = energy / 4.184e15  # megatones TNT

    return {
        "asteroid": neo["name"],
        "diameter_m": diam,
        "density_kg_m3": density,
        "mass_kg": mass,
        "velocity_kms": vel["speed_kms"],
        "energy_joules": energy,
        "energy_megatons_TNT": energy_megatons,
        "velocity_vector": (vel["vx"], vel["vy"], vel["vz"])
        }


@app.get("/api/v1/everything/{id}")
async def everything_id(id: int, api_key: str = env["NASA_API_KEY"]):
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{id}?api_key={api_key}'

    async with httpx.AsyncClient() as client:
        res = await client.get(url)

    if res.status_code == 200:
        data = res.json()
        real_data = {
            "id": id, "name": data["name"], "designation": data["designation"],
            "absolute_h": data["absolute_magnitude_h"], "danger": data["is_potentially_hazardous_asteroid"],
            "diameter": {
                "min": data["estimated_diameter"]["kilometers"]["estimated_diameter_min"] / AU_IN_KM,
                "max": data["estimated_diameter"]["kilometers"]["estimated_diameter_max"] / AU_IN_KM,
                "average": ((data["estimated_diameter"]["kilometers"]["estimated_diameter_max"] +
                             data["estimated_diameter"]["kilometers"]["estimated_diameter_min"]) / 2) / AU_IN_KM
                }, "orbit": {
                "semi_major_axis": float(data["orbital_data"]["semi_major_axis"]),
                "eccentricity": float(data["orbital_data"]["eccentricity"]),
                "inclination": float(data["orbital_data"]["inclination"]),
                "period": float(data["orbital_data"]["orbital_period"])
                }, "velocity": float(data["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"]
                                     ) * 86400 / AU_IN_KM if data["close_approach_data"] else 0
            }

        url_hl = "https://ssd.jpl.nasa.gov/api/horizons_lookup.api"

        async with httpx.AsyncClient() as client:
            h_res = await client.get(url_hl, params={"sstr": real_data["designation"]})

        h_id = h_res.json()["result"][0]["spkid"]
        url_h = "https://ssd.jpl.nasa.gov/api/horizons.api"
        params = {
            "format": "json",
            "COMMAND": f"'DES={h_id}'",
            "MAKE_EPHEM": "YES",
            "CENTER": "'500@399'",  # Tierra
            "STEP_SIZE": "'1 d'",
            "QUANTITIES": "'2,20,23'"  # vector estado (x,y,z,vx,vy,vz), distancia, velocidad relativa
            }

        async with httpx.AsyncClient() as client:
            h_res = await client.get(url_h, params=params)

        h_data = h_res.json()

        vel = parse_velocity_from_horizons(h_data)
        density = estimate_density(estimate_material_type(real_data["absolute_h"]))
        volume = (4 / 3) * math.pi * (real_data["diameter"]["average"] / 2) ** 3
        mass = volume * density  # en kg

        # 4. Energía cinética
        v_m_s = vel["speed_kms"] * 1000
        energy = 0.5 * mass * v_m_s ** 2  # en joules
        energy_megatons = energy / 4.184e15  # en megatones TNT
        return real_data | {
            "density_kg_m3": density,
            "mass_kg": mass,
            "velocity_kms": vel["speed_kms"],
            "energy_joules": energy,
            "energy_megatons_TNT": energy_megatons,
            "velocity_vector": (vel["vx"], vel["vy"], vel["vz"])
            }

    return {"message": "Error in fetching"}


@app.get("/api/v1/everything")
async def everything(api_key: str = env["NASA_API_KEY"]):
    url = f'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={api_key}'
    async with httpx.AsyncClient() as client:
        res = await client.get(url)

    if res.status_code == 200:

        neo_data = res.json()
        real_data = []

        for i in range(neo_data["page"]["size"]):
            d = neo_data["near_earth_objects"][i]
            t = {
                "id": d["id"], "name": d["name"], "designation": d["designation"],
                "absolute_h": d["absolute_magnitude_h"], "danger": d["is_potentially_hazardous_asteroid"], "diameter": {
                    "min": d["estimated_diameter"]["kilometers"]["estimated_diameter_min"] / AU_IN_KM,
                    "max": d["estimated_diameter"]["kilometers"]["estimated_diameter_max"] / AU_IN_KM,
                    "average": ((d["estimated_diameter"]["kilometers"]["estimated_diameter_max"] +
                                 d["estimated_diameter"]["kilometers"]["estimated_diameter_min"]) / 2) / AU_IN_KM
                    }, "orbit": {
                    "semi_major_axis": float(d["orbital_data"]["semi_major_axis"]),
                    "eccentricity": float(d["orbital_data"]["eccentricity"]),
                    "inclination": float(d["orbital_data"]["inclination"]),
                    "period": float(d["orbital_data"]["orbital_period"])
                    }, "velocity": float(d["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"]
                                         ) * 86400 / AU_IN_KM if d["close_approach_data"] else 0
                }

            url_hl = "https://ssd.jpl.nasa.gov/api/horizons_lookup.api"

            async with httpx.AsyncClient() as client:
                res_id = await client.get(url_hl, params={"sstr": t["designation"]})

            h_id = res_id.json()["result"][0]["spkid"]

            url_h = "https://ssd.jpl.nasa.gov/api/horizons.api"
            params = {
                "format": "json",
                "COMMAND": f"'DES={h_id}'",  # 2000719
                "MAKE_EPHEM": "YES",
                "CENTER": "'500@399'",  # Tierra
                "STEP_SIZE": "'1 d'",
                "QUANTITIES": "'2,20,23'"  # vector estado (x,y,z,vx,vy,vz), distancia, velocidad relativa
                }

            async with httpx.AsyncClient() as client:
                h_res = await client.get(url_h, params=params)

            h_data = h_res.json()
            vel = parse_velocity_from_horizons(h_data)
            density = estimate_density(estimate_material_type(t["absolute_h"]))
            volume = (4 / 3) * math.pi * (t["diameter"]["average"] / 2) ** 3
            mass = volume * density  # en kg

            # 4. Energía cinética
            v_m_s = vel["speed_kms"] * 1000
            energy = 0.5 * mass * v_m_s ** 2  # en joules
            energy_megatons = energy / 4.184e15  # en megatones TNT
            real_data.append(t | {
                "density_kg_m3": density,
                "mass_kg": mass,
                "velocity_kms": vel["speed_kms"],
                "energy_joules": energy,
                "energy_megatons_TNT": energy_megatons,
                "velocity_vector": (vel["vx"], vel["vy"], vel["vz"])
                }
                             )

        return real_data

    return {"message": "Error in fetching"}
