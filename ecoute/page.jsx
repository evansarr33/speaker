'use client';


export default function EcouteAnnonces() {
const [zones, setZones] = useState([]);
const [annonces, setAnnonces] = useState([]);
const [zoneSelect, setZoneSelect] = useState(null);


useEffect(() => {
loadZones();
}, []);


async function loadZones() {
const { data } = await supabase.from('zones').select('*');
setZones(data || []);
}


async function loadAnnonces(idZone) {
setZoneSelect(idZone);
const { data } = await supabase
.from('annonces')
.select('*')
.eq('zone_id', idZone);


setAnnonces(data || []);
}


return (
<div className="p-10">
<h1 className="text-3xl font-bold mb-6">Écouter les annonces</h1>


{/* Choix de zone */}
<div className="mb-8">
<h2 className="text-xl font-semibold mb-2">Sélectionne une zone :</h2>
<select className="border p-2" onChange={(e) => loadAnnonces(e.target.value)}>
<option value="">-- Choisir une zone --</option>
{zones.map((z) => (
<option key={z.id} value={z.id}>{z.name}</option>
))}
</select>
</div>


{/* Liste des annonces */}
{zoneSelect && (
<div>
<h2 className="text-xl font-semibold mb-4">Annonces pour la zone sélectionnée :</h2>


{annonces.length === 0 && <p>Aucune annonce audio trouvée.</p>}


<ul className="space-y-5">
{annonces.map((a) => (
<li key={a.id} className="border p-4 rounded-md">
<p className="font-medium">{a.titre}</p>
<audio controls className="mt-2" src={a.url_audio}></audio>
</li>
))}
</ul>
</div>
)}
</div>
);
}
