jsx
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

export default function AdminPage() {
  const [zones, setZones] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [jingles, setJingles] = useState([]);
  const [sonneries, setSonneries] = useState([]);

  const [newZone, setNewZone] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [newJingle, setNewJingle] = useState('');
  const [newSonnerie, setNewSonnerie] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: zonesData } = await supabase.from('zones').select('*');
    const { data: groupesData } = await supabase.from('groupes').select('*');
    const { data: jinglesData } = await supabase.from('jingles').select('*');
    const { data: sonneriesData } = await supabase.from('sonneries').select('*');

    setZones(zonesData || []);
    setGroupes(groupesData || []);
    setJingles(jinglesData || []);
    setSonneries(sonneriesData || []);
  }

  async function addItem(table, value, callback) {
    if (!value) return;
    await supabase.from(table).insert([{ name: value }]);
    callback('');
    loadData();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Administration des annonces</h1>

      {/* Zones */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Zones</h2>
        <input className="border p-2 mr-2" value={newZone} onChange={(e) => setNewZone(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => addItem('zones', newZone, setNewZone)}>Ajouter</button>
        <ul className="mt-4 list-disc pl-5">
          {zones.map((z) => <li key={z.id}>{z.name}</li>)}
        </ul>
      </section>

      {/* Groupes */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Groupements de zones</h2>
        <input className="border p-2 mr-2" value={newGroup} onChange={(e) => setNewGroup(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => addItem('groupes', newGroup, setNewGroup)}>Ajouter</button>
        <ul className="mt-4 list-disc pl-5">
          {groupes.map((g) => <li key={g.id}>{g.name}</li>)}
        </ul>
      </section>

      {/* Jingles */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Jingles</h2>
        <input className="border p-2 mr-2" value={newJingle} onChange={(e) => setNewJingle(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => addItem('jingles', newJingle, setNewJingle)}>Ajouter</button>
        <ul className="mt-4 list-disc pl-5">
          {jingles.map((j) => <li key={j.id}>{j.name}</li>)}
        </ul>
      </section>

      {/* Sonneries */}
      <section>
        <h2 className="text-xl font-semibold">Sonneries</h2>
        <input className="border p-2 mr-2" value={newSonnerie} onChange={(e) => setNewSonnerie(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => addItem('sonneries', newSonnerie, setNewSonnerie)}>Ajouter</button>
        <ul className="mt-4 list-disc pl-5">
          {sonneries.map((s) => <li key={s.id}>{s.name}</li>)}
        </ul>
      </section>
    </div>
  );
}
