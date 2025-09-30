import Navbar from "../components/Navbar";

export default function Home(){
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <section className="hero rounded-xl p-10 mb-10 card">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-4">Understand Your <span className="text-teal-600">Food Labels</span></h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Transform confusing ingredient lists into clear, actionable health insights with our OCR-powered analyzer.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/scan" className="px-6 py-3 rounded-md bg-gradient-to-r from-green-500 to-green-400 text-white">Start Scanning</a>
              <a href="/profile" className="px-6 py-3 rounded-md border border-green-300 text-green-600">Set Up Profile</a>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 card">
            <h3 className="font-semibold mb-2">Smart Scanning</h3>
            <p className="text-sm text-gray-600">Upload photos of ingredient lists and let our OCR analyze the text.</p>
          </div>
          <div className="p-6 card">
            <h3 className="font-semibold mb-2">Allergen Detection</h3>
            <p className="text-sm text-gray-600">Automatically detect major allergens and show warnings.</p>
          </div>
          <div className="p-6 card">
            <h3 className="font-semibold mb-2">Health Scoring</h3>
            <p className="text-sm text-gray-600">Receive a simple health score based on ingredients.</p>
          </div>
          <div className="p-6 card">
            <h3 className="font-semibold mb-2">Plain Language</h3>
            <p className="text-sm text-gray-600">Complex ingredient names translated into simple terms.</p>
          </div>
        </section>
      </main>
    </>
  );
}
