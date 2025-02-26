import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./Item.jsx";
import { QuerioSearch, Chains } from "@querio/querio-search";

import QuerioDark from "@querio/querio-search/assets/querio_dark.svg";
import QuerioLight from "@querio/querio-search/assets/querio_light.svg";
import SearchIcon from "@querio/querio-search/assets/searchIcon.svg";

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
    setChain(selectedChain);
    setPage(1);
    if (query.trim()) {
      doSearch(false, selectedChain);
    }
  };

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <form onSubmit={handleSubmit} style={{ marginLeft: "0px", paddingLeft: "0px", display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ marginLeft: "0px", paddingLeft: "0px", position: "relative", display: "flex", alignItems: "center", width: "30rem" }}>
          {/* Clickable QuerioLight Logo */}
          <a
            href="https://querio.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <img
              src={QuerioLight}
              alt="Querio Logo"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </a>

          {/* Search Input */}
          <input
            style={{
              padding: "10px 45px 10px 40px",
              width: "100%",
              height: "1.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            type="text"
            placeholder="Search with Querio"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPerformedSearch(false);
            }}
          />

          <button
            type="submit"
            style={{
              position: "absolute",
              right: 4,
              top: "50%",
              transform: "translateY(-70%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              src={SearchIcon}
              alt="Search"
              style={{
                width: 24,
                height: 24,
              }}
            />
          </button>
        </div>
      </form>

      <hr style={{ border: "none", borderTop: "1px solid #ccc", width: "100%", margin: "1rem 0" }} />

      <div style={{ marginLeft: "10%", textAlign: "left" }}>
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
    </div>
  );
}
