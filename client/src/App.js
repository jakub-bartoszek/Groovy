import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
