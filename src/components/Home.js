import React from "react";
import ListPlaces from "./ListPlaces";

export default function Home({ match }) {
  return (
    <div>
      <ListPlaces match={match} />
    </div>
  );
}
