"use client";

// components/ContributionGraph.js
import React, { useEffect, useState } from "react";

const apiUrl = "https://dpg.gg/test/calendar.json";

function getColorClass(contributionCount) {
  if (contributionCount === 0) return "bg-[#EDEDED]";
  if (contributionCount < 10) return "bg-[#ACD5F2]";
  if (contributionCount < 20) return "bg-[#7FA8C9]";
  if (contributionCount < 30) return "bg-[#527BA0]";
  return "bg-[#254E77]";
}

function formatDate(dateString) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  const russianDate = date.toLocaleDateString("ru-RU", options);
  return russianDate.charAt(0).toUpperCase() + russianDate.slice(1);
}

function ContributionGraph() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setContributions(data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        setContributions([]);
      }
    }
    fetchContributions();
  }, []);

  const today = new Date();
  const startDate = new Date(today.getTime() - 50 * 7 * 24 * 60 * 60 * 1000); // 50 weeks ago

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });

  const handleSquareClick = (date, contribution, x, y) => {
    if (selectedDate === date) {
      // If the same square is clicked again, close the modal
      setSelectedDate(null);
      setSelectedContribution(null);
    } else {
      // Otherwise, show the modal for the selected square
      setSelectedDate(date);
      setSelectedContribution(contribution);
      setSelectedPosition({ x, y });
    }
  };

  return (
    <div className="relative flex flex-wrap justify-start">
      {Array.from({ length: 7 }).map((_, row) => (
        <div className="flex flex-row" key={row}>
          {Array.from({ length: 51 }).map((_, col) => {
            const currentDate = new Date(
              startDate.getTime() + (col * 7 + row) * 24 * 60 * 60 * 1000
            );
            const dateString = currentDate.toISOString().slice(0, 10);
            const contributionData = contributions[dateString] || 0;
            const colorClass = getColorClass(contributionData);
            const isSelected = selectedDate === dateString;

            return (
              <div
                key={`${row}-${col}`}
                className={`relative w-4 h-4 m-0.5 ${colorClass} ${
                  isSelected ? "border-[1px] border-black" : ""
                }`}
                onClick={(e) =>
                  handleSquareClick(
                    dateString,
                    contributionData,
                    e.clientX,
                    e.clientY
                  )
                }
              >
                {isSelected && selectedPosition.x && selectedPosition.y && (
                  <>
                  <div className="absolute p-2 bg-black text-white rounded-md shadow-md left-1/2 transform -translate-x-1/2 bottom-[22px] w-max">
                    <div className="text-sm text-[#7C7C7C]">{formatDate(selectedDate)}</div>
                    <div>
                      {selectedContribution === 0
                        ? "No contributions"
                        : `${selectedContribution} ${
                            selectedContribution === 1
                              ? "contribution"
                              : "contributions"
                          }`}
                    </div>
                  </div>
                  <div className="absolute top-[-14px] left-[2px] rotate-45 p-[5px] bg-black" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ContributionGraph;
