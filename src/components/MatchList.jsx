// src/components/MatchList.jsx
import { useEffect, useState } from "react";
import { getTodayMatches } from "../api/footballApi";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodayMatches()
      .then((data) => {
        setMatches(data);
        setFilteredMatches(data);
        const uniqueLeagues = Array.from(
          new Map(data.map((m) => [m.league.id, m.league])).values()
        );
        setLeagues(uniqueLeagues);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (selectedLeague === "all") {
      setFilteredMatches(matches);
    } else {
      setFilteredMatches(
        matches.filter((m) => m.league.id === Number(selectedLeague))
      );
    }
  }, [selectedLeague, matches]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Partidos de Hoy</h2>

      {leagues.length > 0 && (
        <div className="mb-4">
          <label className="mr-2 font-medium">Filtrar por liga:</label>
          <select
            className="border rounded px-2 py-1"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            <option value="all">Todas</option>
            {leagues.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.country})
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredMatches.length === 0 ? (
        <p className="text-gray-500">No hay partidos disponibles.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
               {/*<th className="px-4 py-2 border">Pais</th>*/}
              <th className="px-4 py-2 border">Hora</th>
              <th className="px-4 py-2 border">Local</th>
              <th className="px-4 py-2 border">Visitante</th>
              <th className="px-4 py-2 border">Resultado</th>{" "}
              {/* 🆕 NUEVA COLUMNA */}
              <th className="px-4 py-2 border">Estatus</th>
              <th className="px-4 py-2 border">Liga</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((match) => (
              <tr key={match.fixture.id} className="bg-white even:bg-gray-100">
                {/*
                <td className="px-4 py-2 border flex items-center gap-3">
                   <img src={match.league.flag} alt="home logo" className="w-4 h-4"/>
                </td>*/}

                <td className="px-4 py-2 border">
                  {new Date(match.fixture.date).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border flex items-center gap-3">
                  <img src={match.teams.home.logo} alt="home logo" className="w-4 h-4" />
                  {match.teams.home.name}
                </td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <img src={match.teams.away.logo} alt="away logo" />
                  {match.teams.away.name}
                </td>

                <td className="px-4 py-2 border text-center font-semibold">
                  {match.goals.home !== null && match.goals.away !== null
                    ? `${match.goals.home} - ${match.goals.away}`
                    : "⏳"}{" "}
                  {/* muestra solo si ya tiene goles */}
                </td>

                <td className="px-4 py-2 border flex items-center gap-2">
                  {match.fixture.status.short} - {match.fixture.status.elapsed}
                </td>

                <td className="px-4 py-2 border flex items-center gap-2">
                  <img src={match.league.logo} alt="league logo" />
                  <span>{match.league.name}</span>
                  <span className="text-sm text-gray-400">
                    ({match.league.country})
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatchList;
