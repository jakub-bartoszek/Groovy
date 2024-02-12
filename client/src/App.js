import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

const code = new URLSearchParams(window.location.search).get('code');

localStorage.setItem("redirect_uri", JSON.stringify(document.location.origin));

function App() {
 return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
