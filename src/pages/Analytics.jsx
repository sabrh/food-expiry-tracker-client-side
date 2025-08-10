import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [summary, setSummary] = useState({
    totalCount: 0,
    expiredCount: 0,
    savedCount: 0,
    itemsByCategory: {},
    expiredByCategory: {},
  });

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(
          "https://food-expiry-tracker-server-side.vercel.app/analytics/summary"
        );
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const json = await res.json();
        setSummary(json);
      } catch (error) {
        console.error(error);
        setErr(error.message || "Error");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const pieData = {
    labels: ["Expired", "Saved"],
    datasets: [
      {
        data: [summary.expiredCount, summary.savedCount],
        backgroundColor: ["#ef4444", "#16a34a"],
        hoverBackgroundColor: ["#dc2626", "#15803d"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(summary.itemsByCategory),
    datasets: [
      {
        label: "Items",
        data: Object.values(summary.itemsByCategory),
        backgroundColor: Object.keys(summary.itemsByCategory).map((_, i) => {
          const palette = [
            "#10b981",
            "#ef4444",
            "#f59e0b",
            "#3b82f6",
            "#8b5cf6",
            "#06b6d4",
          ];
          return palette[i % palette.length];
        }),
      },
    ],
  };

  const genInsight = () => {
    const ebc = summary.expiredByCategory || {};
    const entries = Object.entries(ebc).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0)
      return "Great job! You have no expired items right now.";
    if (entries.length === 1)
      return `Most of your waste comes from ${entries[0][0]} (${entries[0][1]} items).`;
    return `You waste more ${entries[0][0]} (${entries[0][1]}) than ${entries[1][0]} (${entries[1][1]}).`;
  };

  if (loading)
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <div className="text-lg font-medium mb-4">Loading analytics...</div>
        <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (err)
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <p className="text-red-600">Error: {err}</p>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Expired vs Saved</h2>
          <p className="text-sm text-gray-500 mb-4">
            Total items: <strong>{summary.totalCount}</strong> — Expired:{" "}
            <strong>{summary.expiredCount}</strong> — Saved:{" "}
            <strong>{summary.savedCount}</strong>
          </p>
          <Pie data={pieData} />
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Items by Category</h2>
          <p className="text-sm text-gray-500 mb-4">
            Counts of items grouped by category.
          </p>
          <Bar
            data={barData}
            options={{
              plugins: { legend: { display: false }, title: { display: false } },
            }}
          />
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
        <p className="font-medium text-yellow-800">Insight:</p>
        <p className="text-yellow-700">{genInsight()}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-2">Expired items by category</h3>
        {Object.keys(summary.expiredByCategory).length === 0 ? (
          <p className="text-gray-600">No expired items.</p>
        ) : (
          <ul className="space-y-2">
            {Object.entries(summary.expiredByCategory).map(([cat, count]) => (
              <li key={cat} className="flex justify-between">
                <span className="font-medium">{cat}</span>
                <span className="text-gray-600">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Analytics;