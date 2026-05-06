import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
from pathlib import Path

def train_model():
    # Load dataset
    dataset_path = Path(__file__).resolve().parent.parent / "house_pricing_dataset.xlsx"
    df = pd.read_excel(dataset_path)
    
    print(f"Dataset loaded: {df.shape}")
    
    # Prepare features
    # Columns: ['id', 'location', 'size_sqm', 'bedrooms', 'bathrooms', 'floors',
    #    'age_years', 'parking', 'furnished', 'distance_to_city_km',
    #    'nearby_schools', 'nearby_hospitals', 'market_trend_index',
    #    'actual_price', 'seller_price']
    
    # We'll use location, size_sqm, bedrooms, bathrooms, floors, age_years, 
    # parking, furnished, distance_to_city_km, nearby_schools, nearby_hospitals
    
    features = [
        'location', 'size_sqm', 'bedrooms', 'bathrooms', 'floors', 
        'age_years', 'parking', 'furnished', 'distance_to_city_km', 
        'nearby_schools', 'nearby_hospitals'
    ]
    target = 'actual_price'
    
    X = df[features].copy()
    y = df[target]
    
    # Encode location
    le = LabelEncoder()
    X['location'] = le.fit_transform(X['location'])
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    score = model.score(X_test, y_test)
    print(f"Model R^2 Score: {score:.4f}")
    
    # Save model and label encoder
    model_data = {
        'model': model,
        'label_encoder': le,
        'features': features,
        'locations': list(le.classes_)
    }
    
    model_path = Path(__file__).resolve().parent / "housing_model.pkl"
    with open(model_path, "wb") as f:
        pickle.dump(model_data, f)
    
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_model()
