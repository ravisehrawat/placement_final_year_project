import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useUserContext } from "../context/userContext";
import fetchData from "../utils/apiCall";
import Loading from "./Loading";

const PlacedStats = () => {
  const { isLoading, setLoading } = useUserContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [total, setTotal] = useState(0);
  const [placed, setPlaced] = useState(0);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Students Placed",
        backgroundColor: [],
        data: [],
      },
    ],
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetchData(`/application/placed-stats/${user._id}`);
      setTotal(res.totalStudents);
      let totalPlaced = 0;
      let val = [];
      let br = [];
      for (const key in res.branches) {
        totalPlaced += res.branches[key];
        val.push(res.branches[key]);
        br.push(key);
      }
      let colors = [
        "#3FC5FF",
        "#7B68EE",
        "#00308F",
        "#00FFFF",
        "#0A2351",
        "#CCCCFF",
        "#6F00FF",
        "#428eff",
      ];
      setPlaced(totalPlaced);
      setData({
        labels: br,
        datasets: [
          {
            label: "Students Placed",
            backgroundColor: colors.slice(0, br.length),
            data: val,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="doughnut-chart-container">
          <Doughnut
            className="doughnut-chart"
            data={data}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              responsive: true,
            }}
          />
          <div className="doughnut-chart-content">
            <h3>
              {placed}/{total}
            </h3>
            <span>Students Placed</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PlacedStats;
