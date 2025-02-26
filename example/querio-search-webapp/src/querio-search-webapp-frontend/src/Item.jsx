// Item.jsx

import React, { useState } from "react";
import altLogo from "@querio/querio-search/assets/altIcon.svg";
import { Chains } from "@querio/querio-search";

export default function Item({ item }) {
  // Extract fields from the result item
  const { url, title, heading, icon, icon_data, snippet, chain } = item;
  let trimmedHeading = heading || "";
  if (heading?.startsWith(title + "/")) {
    trimmedHeading = heading.substring(title.length + 1);
  }

  let avatarLogo = icon_data || icon || altLogo;
  const [imageUrl, setImageUrl] = useState(avatarLogo);

  const handleImageError = () => {
    setImageUrl(altLogo);
  };

  const chainValue = parseInt(chain ?? 0, 10);

  return (
    <div style={{ padding: "1rem 0", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          src={imageUrl}
          alt="avatarLogo"
          onError={handleImageError}
          style={{ width: 40, height: 40 }}
        />
        <div>
          <a
            href={url}
            style={{
              color: "blue",
              fontSize: 18,
              textDecoration: "none",
              lineHeight: "24px",
            }}
          >
            {title}
          </a>
          <div style={{ fontSize: 12, color: "#444", marginTop: 2 }}>{url}</div>
        </div>
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <a href={url} style={{ color: "#0066cc", textDecoration: "none", fontSize: 20 }}>
          {trimmedHeading || title}
        </a>

        <div
          style={{
            fontSize: 15,
            color: "#555",
            marginTop: 2,
            maxWidth: "60%", // Ensures wrapping within container
            wordWrap: "break-word", // Breaks long words
            whiteSpace: "normal", // Allows text to wrap
          }}
        >
          {snippet}
        </div>

        {chainValue > 0 && Chains[chainValue - 1] && (
          <div style={{ marginTop: 4 }}>
            <a style={{ fontSize: 14, color: "#006691", textDecoration: "none" }}>
              {Chains[chainValue - 1].title}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
