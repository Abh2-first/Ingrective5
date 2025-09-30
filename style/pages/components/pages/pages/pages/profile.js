import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const defaultProfile = {
  name: "",
  age: "",
  allergies: { milk:false, shellfish:false, eggs:false, fish:false, peanuts:false, sesame:false, wheat:false },
  diet: { vegetarian:false, vegan:false, halal:false, kosher:false },
  conditions: { diabetes:false, hypertension:false, kidney:false, cholesterol:false }
};

export default function ProfilePage(){
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(()=> {
    const raw = localStorage.getItem("ingrective_profile");
    if(raw) setProfile(JSON.parse(raw));
  },[]);

  function setField(path, value){
    setProfile(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let cur = copy;
      for(let i=0;i<parts.length-1;i++) cur = cur[parts[i]];
      cur[parts[parts.length-1]] = value;
      return copy;
    });
  }

  function saveProfile(){
    localStorage.setItem("ingrective_profile", JSON.stringify(profile));
    alert("Profile saved locally.");
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold mb-4">Health Profile</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm">Name</label>
              <input className="mt-1 p-2 border rounded w-full" value={profile.name} onChange={e=>setField("name", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Age</label>
              <input type="number" className="mt-1 p-2 border rounded w-full" value={profile.age} onChange={e=>setField("age", e.target.value)} />
            </div>
          </div>

          <section className="mt-6">
            <h4 className="font-medium">Allergies</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {Object.keys(profile.allergies).map(k => (
                <label key={k} className="flex items-center gap-2">
                  <input type="checkbox" checked={profile.allergies[k]} onChange={e=>setField(`allergies.${k}`, e.target.checked)} />
                  <span className="capitalize">{k}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="font-medium">Dietary restrictions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {Object.keys(profile.diet).map(k => (
                <label key={k} className="flex items-center gap-2">
                  <input type="checkbox" checked={profile.diet[k]} onChange={e=>setField(`diet.${k}`, e.target.checked)} />
                  <span className="capitalize">{k}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="font-medium">Health Conditions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {Object.keys(profile.conditions).map(k => (
                <label key={k} className="flex items-center gap-2">
                  <input type="checkbox" checked={profile.conditions[k]} onChange={e=>setField(`conditions.${k}`, e.target.checked)} />
                  <span className="capitalize">{k}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="mt-6">
            <button onClick={saveProfile} className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded">Save Profile</button>
          </div>
        </div>
      </main>
    </>
  )
}
