import requests
import json
import sys

# Set encoding for windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

def verify_connectivity():
    base_url = "http://localhost:8080"
    
    print("Checking /housing-locations...")
    try:
        response = requests.get(f"{base_url}/housing-locations", timeout=5)
        if response.status_code == 200:
            locations = response.json().get("locations", [])
            print(f"SUCCESS: Found {len(locations)} locations.")
            if locations:
                print(f"Sample locations: {locations[:3]}")
        else:
            print(f"FAILED: Status code: {response.status_code}")
    except Exception as e:
        print(f"ERROR connecting to /housing-locations: {e}")

    print("\nChecking /predict-housing...")
    sample_payload = {
        "location": "Kimironko",
        "size_sqm": 150,
        "bedrooms": 3,
        "bathrooms": 2,
        "floors": 1,
        "age_years": 5,
        "parking": 1,
        "furnished": 1,
        "distance_to_city_km": 5.0,
        "nearby_schools": 2,
        "nearby_hospitals": 1
    }
    try:
        response = requests.post(f"{base_url}/predict-housing", json=sample_payload, timeout=5)
        if response.status_code == 200:
            result = response.json()
            if "predicted_price" in result:
                print(f"SUCCESS: Predicted price: ${result['predicted_price']:,.2f}")
            else:
                print(f"FAILED: Result: {result}")
        else:
            print(f"FAILED: Status code: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"ERROR connecting to /predict-housing: {e}")

if __name__ == "__main__":
    verify_connectivity()
