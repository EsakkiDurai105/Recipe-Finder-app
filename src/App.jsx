import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    const searchRecipes = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(searchRecipes, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="app">
      <header>
        <h1>🍳 Recipe Finder</h1>
        <p>Search for delicious recipes</p>
      </header>

      <main>
        <input
          type="text"
          placeholder="Search recipes... e.g. chicken"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <p className="status">Searching...</p>}

        {!loading && query && recipes.length === 0 && (
          <p className="status">No recipes found.</p>
        )}

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />

              <div className="recipe-content">
                <h2>{recipe.strMeal}</h2>

                <p>
                  <strong>Category:</strong> {recipe.strCategory}
                </p>

                <p>
                  <strong>Cuisine:</strong> {recipe.strArea}
                </p>

                <a
                  href={recipe.strSource || recipe.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Recipe →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;