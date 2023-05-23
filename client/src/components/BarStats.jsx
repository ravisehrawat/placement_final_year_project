import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useUserContext } from "../context/userContext";
import fetchData from "../utils/apiCall";
import Loading from "./Loading";

const BarStats = () => {
  const { isLoading, setLoading } = useUserContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Package",
        backgroundColor: "#428eff",
        borderColor: "rgb(0, 255, 0)",
        borderRadius: 1,
        barThickness: 40,
        data: [],
      },
    ],
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetchData(`/application/package-stats/${user._id}`);
      let val = [];
      let br = [];
      for (const key in res) {
        val.push(res[key]);
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
      setData({
        labels: br.map((ele) => ele),
        datasets: [
          {
            label: "Package",
            backgroundColor: colors.map((e) => e),
            borderColor: "rgb(0, 255, 0)",
            borderRadius: 1,
            barThickness: 40,
            data: val.map((ele) => ele),
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
        <div className="bar-chart-container">
          <Bar
            className="bar-chart"
            data={data}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default BarStats;
