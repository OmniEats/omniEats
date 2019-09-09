import React from "react";
import ListPlaces from "./ListPlaces";
import NavBar from "./NavBar";

export default function Home({ match }) {
  return (
    <div>
      <NavBar />
      <ListPlaces match={match} />
    </div>
  );
}
