import { Router, Route } from "wouter";
import { ItemListPage } from "./pages/list";

export function App() {
  return (
    <Router>
      <div className="w-full bg-gray-900 text-white min-h-screen px-8 py-16">
        <Route path="/"></Route>
        <Route path="/:module">
          <ItemListPage />
        </Route>
        <Route path="/:module/:id"></Route>
      </div>
    </Router>
  );
}
