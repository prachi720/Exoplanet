import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Play, Download, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import { toast } from "sonner";
import heroSpace from "@/assets/hero-space.jpg";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Demo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ type: "transit" | "false"; confidence: number } | null>(null);
  const [csvResultUrl, setCsvResultUrl] = useState<string | null>(null);
  const [batchAnalysis, setBatchAnalysis] = useState<{ exoplanet: number; notExoplanet: number; confidences: number[] }>({ exoplanet: 0, notExoplanet: 0, confidences: [] });

  const FIELD_LABELS: Record<string, string> = {
    koi_fpflag_nt: "Non-Transit Flag (NOT a transit?)",
    koi_fpflag_ss: "Secondary eclipse Flag (Multi-star system?)",
    koi_fpflag_co: "Contamination Flag (Centroid offset detected?)",
    koi_fpflag_ec: "Ephemeris Match Flag (Matches known event?)",
    koi_period: "Orbital Period (days)",
    koi_duration: "Transit Duration (hours)",
    koi_depth: "Transit Depth (ppm)",
    koi_model_snr: "Signal-to-Noise Ratio",
    koi_prad: "Planet Radius (Earth radii)",
    koi_teq: "Equilibrium Temperature (K)",
    koi_insol: "Insolation Flux (Earth units)",
    koi_steff: "Star Effective Temperature (K)",
    koi_slogg: "Star Surface Gravity (log g)",
    koi_srad: "Star Radius (Solar radii)",
  };

  const [inputData, setInputData] = useState({
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    koi_period: 0.837485,
    koi_duration: 1.5,
    koi_depth: 100,
    koi_model_snr: 10,
    koi_prad: 1,
    koi_teq: 300,
    koi_insol: 1,
    koi_steff: 5500,
    koi_slogg: 4.5,
    koi_srad: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: parseFloat(value) }) );
  };

  const handleRunModel = async () => {
    setIsRunning(true);
    toast.info("Processing...");
    try {
      const response = await fetch('https://exoplanet-prediction-backend.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });
      const data = await response.json();
      setTimeout(() => {
        setIsRunning(false);
        setResult({
          type: data.prediction === 1 ? "transit" : "false",
          confidence: Math.round(data.probability * 100),
        });
        toast.success("Prediction complete!");
      }, 1500);
    } catch (error) {
      toast.error("Error running model.");
      setIsRunning(false);
    }
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://exoplanet-prediction-backend.onrender.com/batch_predict", {
      method: "POST",
      body: formData,
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setCsvResultUrl(url);

    // Parse CSV for analysis
    blob.text().then((text) => {
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          let exoplanet = 0, notExoplanet = 0, confidences: number[] = [];
          for (const row of results.data) {
            if (row.exoplanet_status === "Exoplanet") exoplanet++;
            if (row.exoplanet_status === "Not Exoplanet") notExoplanet++;
            if (typeof row.confidence === "number") confidences.push(row.confidence);
          }
          setBatchAnalysis({ exoplanet, notExoplanet, confidences });
        }
      });
    });

    toast.success("CSV processed! Download your results below.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div 
        className="fixed inset-0 opacity-50"
        style={{
          backgroundImage: `url(${heroSpace})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      />
      <StarField />
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-glow bg-clip-text text-transparent">
            Exoplanet Detection Demo
          </h1>
          <p className="text-muted-foreground">
            Enter features or upload a CSV to identify exoplanet transits.
          </p>
        </div>

        {/* Model Description */}
        <Card className="mb-10 mx-auto max-w-8xl bg-background/60 rounded-lg p-6 border border-primary/10 shadow">
          <CardHeader>
            <CardTitle className="text-primary">About the Model</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              This application uses a Gradient Boosted Trees (GBT) classifier trained on NASA Kepler mission data to identify exoplanet transits. 
              The model analyzes key features extracted from light curves—such as orbital period, transit depth, and stellar parameters—to distinguish between true planetary transits and false positives caused by stellar variability or instrumental noise.
            </p>
            <ul className="mb-4 list-disc list-inside text-sm text-foreground">
              <li><strong>Model Type:</strong> Gradient Boosted Trees (GBT)</li>
              <li><strong>Features Used:</strong> Transit flags, orbital period, duration, depth, SNR, planet radius, equilibrium temperature, insolation flux, stellar temperature, gravity, and radius</li>
              <li><strong>How it Works:</strong> The model takes user-provided feature values, preprocesses them (including imputation for missing values), and predicts whether the signal is a planetary transit or a false positive, along with a confidence score.</li>
              <li><strong>Top 5 Most Important Features:</strong> koi_depth, koi_model_snr, koi_prad, koi_period, koi_duration</li>
            </ul>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-primary">Accuracy:</span> 99.01%
              </div>
              <div>
                <span className="font-semibold text-primary">Precision:</span> 98.13%
              </div>
              <div>
                <span className="font-semibold text-primary">Recall:</span> 99.89%
              </div>
              <div>
                <span className="font-semibold text-primary">F1 Score:</span> 99%
              </div>
              <div>
                <span className="font-semibold text-primary">ROC AUC:</span> 99.83%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Input Panel */}
          <Card className="bg-card/60 border border-primary/20 shadow-sm flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-primary">Manual Input</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {Object.keys(inputData).map((key) => (
                  <div key={key} className="flex items-center justify-between gap-2 mb-2">
                    <Label className="text-xs">{FIELD_LABELS[key] || key}</Label>
                    {["koi_fpflag_nt", "koi_fpflag_ss", "koi_fpflag_co", "koi_fpflag_ec"].includes(key) ? (
                      <Switch
                        checked={Boolean(inputData[key])}
                        onCheckedChange={checked =>
                          setInputData(prev => ({
                            ...prev,
                            [key]: checked ? 1 : 0,
                          }))
                        }
                        id={key}
                      />
                    ) : (
                      <input
                        type="number"
                        name={key}
                        value={inputData[key]}
                        onChange={handleInputChange}
                        className="w-24 px-2 py-1 border border-primary/30 rounded bg-background text-foreground text-sm"
                      />
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleRunModel}
                  disabled={isRunning}
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center"
                  type="button"
                >
                  {isRunning ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span className="ml-2">Running Model...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      <span>Run Model</span>
                    </>
                  )}
                </Button>
              </form>
              {result && (
                <div className="mt-6 p-4 rounded-lg text-sm"
                  style={{
                    backgroundColor: result.type === "transit" ? "#e6fffa" : "#fff5f5",
                    border: `2px solid ${result.type === "transit" ? "#22c55e" : "#ef4444"}`
                  }}
                >
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    {result.type === "transit" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span
                      className={`font-bold ${result.type === "transit" ? "text-green-700" : "text-red-700"}`}
                    >
                      {result.type === "transit" ? "Exoplanet Transit" : "Not an Exoplanet Transit"}
                    </span>
                  </div>
                  <div className="text-black">
                    <span className="font-medium">Confidence:</span> {result.confidence}%
                  </div>
                  <div className="mt-2 text-black">
                    {result.type === "transit" ? (
                      <span>
                        <strong>Why confirmed?</strong> The input values indicate a clean transit signal: all vetting flags are "No", transit depth and SNR are high, and orbital period/duration are consistent with planetary motion. Planet and star parameters are plausible.
                      </span>
                    ) : (
                      <span>
                        <strong>Why false positive?</strong> The input suggests contamination or inconsistency: one or more flags are "Yes", or the transit features do not match expected planetary patterns.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Explanation Panel */}
          <Card className="bg-card/60 border border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary">How Does the Model Decide?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-2 rounded text-sm text-muted-foreground">
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    <span className="font-semibold">Transit Flags:</span> "No" flags mean a cleaner transit; "Yes" flags may indicate contamination.
                  </li>
                  <li>
                    <span className="font-semibold">Orbital Period & Duration:</span> Regular, periodic dips with plausible durations/periods.
                  </li>
                  <li>
                    <span className="font-semibold">Transit Depth & SNR:</span> Deeper and higher SNR transits are more likely planets.
                  </li>
                  <li>
                    <span className="font-semibold">Planet & Star Properties:</span> Checks for physically plausible values.
                  </li>
                  <li>
                    <span className="font-semibold">Feature Importance:</span> Most influential: Vetting Flags (Non Transit flag, Stellar System flag, Centroid offset flag, ephemeris match flag).
                  </li>
                </ul>
                <div className="mt-2">
                  The model combines all these features to estimate the likelihood that the observed signal is caused by a planet.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CSV Upload Panel */}
          <Card className="bg-card/60 border border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary">Batch CSV Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Upload a CSV dataset to identify exoplanets:</Label>
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className="block w-full mt-2"
              />
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center mt-2"
                disabled={!csvResultUrl}
                onClick={() => {
                  if (csvResultUrl) {
                    window.open(csvResultUrl, "_blank");
                  }
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Show Results
              </Button>
              {csvResultUrl && (
                <Button
                  variant="outline"
                  className="w-full border-accent/30 hover:bg-accent/10 mt-2"
                  asChild
                >
                  <a href={csvResultUrl} download="exoplanet_predictions.csv">
                    <Download className="w-4 h-4 mr-2" />
                    Download Results CSV
                  </a>
                </Button>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                The output CSV will include a new column <b>exoplanet_status</b> for each row, indicating if it is an exoplanet or not, plus confidence.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batch Analysis Panel - New Section */}
        {batchAnalysis.exoplanet + batchAnalysis.notExoplanet > 0 && (
          <Card className="mt-10 mx-auto max-w-5xl bg-background/60 rounded-lg p-6 border border-primary/10 shadow">
            <CardHeader>
              <CardTitle className="text-primary">Batch Prediction Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Analyzed {batchAnalysis.exoplanet + batchAnalysis.notExoplanet} entries from the CSV upload.{" "}
                <span className="font-semibold">Exoplanets Detected:</span> {batchAnalysis.exoplanet}{" "}
                <span className="font-semibold">False Positives:</span> {batchAnalysis.notExoplanet}
              </div>
              <div className="w-full" style={{ height: "500px" }}>
                <Bar
                  data={{
                    labels: ["Exoplanet", "Not Exoplanet"],
                    datasets: [
                      {
                        label: "Count",
                        data: [batchAnalysis.exoplanet, batchAnalysis.notExoplanet],
                        backgroundColor: ["#06b6d4", "#f87171"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      title: { display: true, text: "Prediction Counts" },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Demo;
