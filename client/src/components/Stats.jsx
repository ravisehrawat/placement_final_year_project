import React from "react";
import "../styles/stats.css";
import BarStats from "./BarStats";
import PlacedStats from "./PlacedStats";

const Stats = () => {
  return (
    <section className="container stats-section">
      <h2>Stats</h2>
      <div className="charts-container">
        <PlacedStats />
        <BarStats />
      </div>
    </section>
  );
};

export default Stats;
