from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import pickle
import pandas as pd
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('exoplanet_gbt_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('model_metadata.pkl', 'rb') as f:
    metadata = pickle.load(f)

FEATURE_ORDER = metadata['feature_order']
MEDIAN_VALUES = metadata['median_values']


def predict_exoplanet_status(input_data: dict):
    df_predict = pd.DataFrame([input_data])
    df_predict = df_predict.reindex(columns=FEATURE_ORDER)
    df_predict.fillna(MEDIAN_VALUES, inplace=True)
    proba = float(model.predict_proba(df_predict)[:, 1][0])
    prediction = int(model.predict(df_predict)[0])
    print("Prediction Done")
    return {'prediction': prediction, 'probability': proba}

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    result = predict_exoplanet_status(data)
    return result

@app.post("/batch_predict")
async def batch_predict(file: UploadFile = File(...)):
    # Skip header/comment lines (adjust skiprows as needed)
    df = pd.read_csv(file.file)
    df_predict = df.reindex(columns=FEATURE_ORDER)
    df_predict.fillna(MEDIAN_VALUES, inplace=True)
    proba = model.predict_proba(df_predict)[:, 1]
    prediction = model.predict(df_predict)
    df['exoplanet_status'] = ["Exoplanet" if p == 1 else "Not Exoplanet" for p in prediction]
    df['confidence'] = (proba * 100).round(1)
    output = io.StringIO()
    df.to_csv(output, index=False)
    output.seek(0)
    return StreamingResponse(output, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=exoplanet_predictions.csv"})
