import MatchList from './components/MatchList';

function App() {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">⚽ Partidos de Hoy</h1>
      <MatchList />
    </div>
  );
}

export default App;
