// App.jsx

import React, { useState, useEffect } from "react";
import "./App.css"; // optional: your default styles
import Item from "./Item.jsx";
import { QuerioSearch, Chains } from "../../../../../index.js";
import Filter from "./Filter";

export default function App() {
  const [query, setQuery] = useState("");
  const [chain, setChain] = useState(0); // 0 => "All"
  const [page, setPage] = useState(1);
  const [performedSearch, setPerformedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState({
    items: [],
    total: 0,
    pages: 0,
    duration: 0,
  });
  const [loading, setLoading] = useState(false);

  // We'll create our client once in a ref-like manner
  const [client] = useState(() => new QuerioSearch());

  async function doSearch(append = false) {
    if (!query.trim()) 
    {
      return; // don’t search empty
    }

    if (append == false) {
      setLoading(true);
    }

    try {
      console.log(chain);
      const result = await client.search(query, page, chain);
      // If you want to append results to the existing list:
      setSearchResults((prev) => ({
        items: append ? [...prev.items, ...result.items] : result.items,
        total: result.total,
        pages: result.pages,
        duration: result.duration,
      }));
      setPerformedSearch(true);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Re-run search whenever page changes
  useEffect(() => {
    if (page > 1) {
      // For pages beyond 1, we can “append”:
      doSearch(true);
    }
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Start from page 1 each time user searches
    setPage(1);
    // Don’t append for a fresh search
    doSearch(false);
  };

    // Whenever the user selects a chain from the Filter
    const handleSelectedChain = (chainId) => {
      console.log('chainId', chainId);
      setChain(chainId);
      setPage(1);
      // re-run a new search for the new chain
      if (query.trim()) {
        doSearch(false);
      }
    };

  return (
    <div className="App">
      <h1>Querio Search</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          style={{ padding: 8, width: 300 }}
          type="text"
          placeholder="Search on Web3"
          value={query}
          onChange={(e) => {setQuery(e.target.value); setPerformedSearch(false);}}
        />
        <button
          type="submit"
          style={{ marginLeft: 8, padding: "8px 16px" }}>
          Search
        </button>
      </form>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <p style={{ margin: 0, padding: 0, marginRight: 8 }}>
          Selected Chain:{" "}
          <strong>
            {chain === 0
              ? "All"
              : Chains[chain - 1]?.title || `Chain #${chain}`}
          </strong>
        </p>

        <Filter onSelectedChain={handleSelectedChain} />
      </div>

      {!loading && (
        <>
          {/* Show results summary */}
          {searchResults.total > 0 && (
            <p>
              About {searchResults.total} results in {searchResults.duration} ms
            </p>
          )}
          {performedSearch && searchResults.total === 0 && query.trim() !== "" && (
            <p>
              Your search – <b>{query}</b> – did not match any documents.
            </p>
          )}

          {/* Render each result item */}
          {searchResults.items.map((item, idx) => (
            <Item key={idx} item={item} />
          ))}

          {/* More Results button (if multiple pages exist) */}
          {searchResults.pages > 1 && page < searchResults.pages && (
            <button
              style={{ margin: "20px 0", padding: "10px 20px" }}
              onClick={() => setPage((p) => p + 1)}
            >
              More Results
            </button>
          )}
        </>
      )}
    </div>
  );
}
