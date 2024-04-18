import Link from "next/link";
import React from "react";

export default function NotFoundPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1 style={{ fontSize: "6em", marginBottom: "0.5em" }}>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/home">
          <a
            style={{
              marginTop: "1em",
              display: "inline-block",
              padding: "1em 2em",
              border: "1px solid #000",
              borderRadius: "2em",
              textDecoration: "none",
              color: "#000",
            }}
          >
            Go to Home Page
          </a>
        </Link>
      </div>
    </>
  );
}
