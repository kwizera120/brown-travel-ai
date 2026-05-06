from functools import lru_cache
from pathlib import Path

from backend.model_loader import get_model

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "routes.xlsx"


def _normalize(value) -> str:
    return str(value).strip().lower()


@lru_cache(maxsize=1)
def _load_routes_dataframe():
    import pandas as pd
    if not DATA_PATH.exists() or DATA_PATH.stat().st_size == 0:
        return pd.DataFrame()

    try:
        dataframe = pd.read_excel(DATA_PATH, sheet_name="Routes", engine="openpyxl")
    except Exception:
        return pd.DataFrame()

    return dataframe.fillna("")


def _lookup_known_price(from_city, to_city, distance_km, transport_type, demand):
    df = _load_routes_dataframe()
    if df.empty:
        return None

    filtered = df[
        df["from_city"].astype(str).str.strip().str.lower().eq(_normalize(from_city))
        & df["to_city"].astype(str).str.strip().str.lower().eq(_normalize(to_city))
        & df["transport_type"].astype(str).str.strip().str.lower().eq(_normalize(transport_type))
        & df["demand"].astype(str).str.strip().str.lower().eq(_normalize(demand))
    ]

    if filtered.empty:
        return None

    closest_match = filtered.iloc[(filtered["Distance_km"].astype(float) - float(distance_km)).abs().argsort()].head(1)
    return float(closest_match["price_rwf"].iloc[0])


import pickle

@lru_cache(maxsize=1)
def get_housing_model():
    model_path = Path(__file__).resolve().parent / "housing_model.pkl"
    if not model_path.exists():
        return None
    with open(model_path, "rb") as f:
        return pickle.load(f)

def predict_housing_price(data_dict):
    housing_data = get_housing_model()
    if not housing_data:
        return {"error": "Housing model not found"}
    
    import pandas as pd
    model = housing_data['model']
    le = housing_data['label_encoder']
    features = housing_data['features']
    
    # Prepare input
    df_input = pd.DataFrame([data_dict])
    
    # Encode location
    try:
        df_input['location'] = le.transform(df_input['location'])
    except ValueError:
        # If location not in training set, handle it (e.g., use a default or error)
        return {"error": f"Location {data_dict['location']} not supported"}
    
    # Predict
    prediction = model.predict(df_input[features])
    return float(prediction[0])

def get_housing_locations():
    housing_data = get_housing_model()
    if not housing_data:
        return []
    return housing_data['locations']

def predict_price(from_city, to_city, distance_km, transport_type, demand):
    known_price = _lookup_known_price(from_city, to_city, distance_km, transport_type, demand)
    if known_price is not None:
        return known_price

    import pandas as pd
    input_data = pd.DataFrame(
        [[from_city, to_city, distance_km, transport_type, demand]],
        columns=["from_city", "to_city", "Distance_km", "transport_type", "demand"],
    )

    model = get_model()
    return float(model.predict(input_data)[0])
