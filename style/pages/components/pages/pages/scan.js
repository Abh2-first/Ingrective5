import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ScanPage(){
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const HF_API = process.env.NEXT_PUBLIC_HF_API || "https://tigerabhay-ingrective5.hf.space/run/predict";

  function onFileChange(e){
    const f = e.target.files[0];
    setFile(f);
    setResult("");
    if(f){
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function handleAnalyze(){
    if(!file){ alert("Please choose an image or PDF"); return; }
    setLoading(true);
    setResult("");
    try{
      const form = new FormData();
      // many Gradio Spaces expect 'data' field for file inputs
      form.append("data", file);

      const res = await fetch(HF_API, { method: "POST", body: form });
      const json = await res.json().catch(()=>null);

      if(json){
        // Gradio typical response shape: { data: [ ... ] }
        if(json.data && Array.isArray(json.data)){
          // join any strings inside data
          const textParts = json.data.map(d => (typeof d === "string" ? d : JSON.stringify(d)));
          setResult(textParts.join("\n\n"));
        } else if(json.text){
          setResult(json.text);
        } else {
          setResult(JSON.stringify(json, null, 2));
        }
      } else {
        const txt = await res.text();
        setResult(txt);
      }
    } catch(err){
      setResult("Error: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold mb-4">Scan Food Labels</h2>
          <p className="text-gray-600 mb-6">Upload a food label image or PDF. For best OCR: good lighting, steady camera, full ingredient list.</p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <input type="file" accept="image/*,.pdf" onChange={onFileChange} className="mb-4" />
              <div className="flex gap-3">
                <button onClick={handleAnalyze} className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>
                  {loading ? "Processing..." : "Analyze"}
                </button>
              </div>
              <div className="mt-4">
                <h4 className="font-medium">Raw OCR / Analysis</h4>
                <pre className="mt-2 bg-gray-50 p-3 rounded h-48 overflow-auto">{result || "Results will appear here"}</pre>
              </div>
            </div>

            <div style={{width:360}}>
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="p-3 bg-gray-50 rounded">
                {preview ? <img src={preview} alt="preview" className="w-full h-auto" /> : <div className="text-sm text-gray-500">No file selected</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
