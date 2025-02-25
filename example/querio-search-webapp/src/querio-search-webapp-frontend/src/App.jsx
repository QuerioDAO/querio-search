import React, { useState, useEffect } from "react";
import "./App.css"; // optional: your default styles
import Item from "./Item.jsx";
import { QuerioSearch, Chains } from "../../../../../index.js";
import QuerioDark from "../../../../../assets/querio_dark.svg";
import QuerioLight from "../../../../../assets/querio_light.svg";

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

  // Initialize the search client
  const [client] = useState(() => new QuerioSearch());

  async function doSearch(append = false, selectedChain) {
    if (!query.trim()) return; // don’t search empty queries

    if (!append) {
      setLoading(true);
    }

    try {
      console.log('doSearch chain', selectedChain);
      const result = await client.search(query, page, selectedChain);
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
      doSearch(true, chain);
    }
  }, [page, chain]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    doSearch(false, chain);
  };

  // Handle chain selection from ComboBox
  const handleSelectedChain = (e) => {
    const selectedChain = Number(e.target.value);
    console.log("Selected Chain:", selectedChain);
    setChain(selectedChain);
    setPage(1);
    if (query.trim()) {
      doSearch(false, selectedChain);
    }
  };

  return (
    <div className="App" style={{ marginLeft: "4rem", textAlign: "left" }}>
      <h1>Querio Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <input
          style={{ padding: 8, width: 300 }}
          type="text"
          placeholder="Search with Querio"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPerformedSearch(false);
          }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: "8px 16px" }}>
          Search
        </button>
      </form>

      {/* ComboBox for Chain Selection */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#222", marginRight: 8 }}>Selected Chain:</div>

        <select
          value={chain}
          onChange={handleSelectedChain}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <option value={0}>All</option>
          {Chains.map((c, index) => (
            <option key={index} value={index + 1}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Search Results */}
      {!loading && (
        <>
          {searchResults.total > 0 && (
            <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>
              About {searchResults.total} results in {searchResults.duration} ms
            </div>
          )}
          {performedSearch && searchResults.total === 0 && query.trim() !== "" && (
            <p>
              Your search – <b>{query}</b> – did not match any documents.
            </p>
          )}

          {searchResults.items.map((item, idx) => (
            <Item key={idx} item={item} />
          ))}

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
