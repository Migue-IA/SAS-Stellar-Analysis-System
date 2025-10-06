from dotenv import load_dotenv
import httpx
import os
import math

MATERIAL_DENSITY_ESTIMATIONS = {
    "S-type": 2700,  # Kg/cm³ - silicáceos
    "C-type": 1800,  # Kg/cm³ - carbonáceos
    "M-type": 5300,  # Kg/cm³ - metálicos
    "default": 2000  # Kg/cm³ - promedio
}
AU_IN_KM = 149597870.7

def load_env_varibles():
    load_dotenv()

    return {"NASA_API_KEY": os.getenv("NASA_API_KEY")}


env = load_env_varibles()


def estimate_material_type(magnitude):
    if magnitude < 16:
        return "M-type"  # Más brillante, metálico
    elif magnitude < 20:
        return "S-type"  # Intermedio
    else:
        return "C-type"  # carbonáceo


def estimate_density(material_type: str) -> float:
    """Estima la densidad basada en el tipo de material"""
    return MATERIAL_DENSITY_ESTIMATIONS.get(material_type, MATERIAL_DENSITY_ESTIMATIONS["default"])


def parse_velocity_from_horizons(h_data):
    """Extrae vector velocidad y calcula magnitud"""
    vx, vy, vz, speed = 0, 0, 0, 0
    lines = h_data["result"].splitlines()
    for i, l in enumerate(lines):
        if l.startswith("$$SOE"):
            vx, vy, vz = map(float, lines[i + 1].split()[5:8])  # componentes km/s
            speed = math.sqrt(vx ** 2 + vy ** 2 + vz ** 2)
            break

    return { "vx": vx, "vy": vy, "vz": vz, "speed_kms": speed }


async def get_horizons_state(object_id):
    """Obtiene efemérides desde Horizons (JPL API)"""
    url = "https://ssd.jpl.nasa.gov/api/horizons.api"
    params = {
        "format": "json",
        "COMMAND": f"'DES={object_id}'",
        "MAKE_EPHEM": "YES",
        "CENTER": "'500@399'",  # Tierra
        "STEP_SIZE": "'1 d'",
        "QUANTITIES": "'2,20,23'"  # vector (x,y,z,vx,vy,vz), distancia, velocidad relativa
        }
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params)

    return res.json()


async def neows_id_to_designation(neo_id):
    """Convert from NeoWs ID to official designation"""
    url = f"https://api.nasa.gov/neo/rest/v1/neo/{neo_id}?api_key={env["NASA_API_KEY"]}"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
    data = res.json()
    # 'designation' or 'name' of asteroid in neo
    return data.get("designation") or data.get("name")


async def designation_to_spkid(designation):
    """Convert from designation/name to SPK-ID in Horizons."""
    url = "https://ssd.jpl.nasa.gov/api/horizons_lookup.api"
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params={"sstr": designation})
    resp = res.json()
    return resp["result"][0]["spkid"]