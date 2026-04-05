"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";


type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

type Week = {
  contributionDays: ContributionDay[];
};

type ContributionData = {
  total: number;
  weeks: Week[];
};


const LEVEL_CLASSES: Record<string, string> = {
  NONE: "bg-gray-100 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/30",
  FIRST_QUARTILE: "bg-green-200 dark:bg-green-900 border border-green-300/40 dark:border-green-800/50",
  SECOND_QUARTILE: "bg-green-400 dark:bg-green-700 border border-green-500/40 dark:border-green-600/50",
  THIRD_QUARTILE: "bg-green-500 dark:bg-green-500 border border-green-600/40 dark:border-green-400/50",
  FOURTH_QUARTILE: "bg-green-600 dark:bg-green-400 border border-green-700/40 dark:border-green-300/50",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getMonthLabels(weeks: Week[]) {
  const labels: { month: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push({ month: MONTHS[month], col });
      lastMonth = month;
    }
  });
  return labels;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}


type TooltipState = {
  visible: boolean;
  text: string;
  x: number;
  y: number;
};


function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
      <div className="flex gap-1">
        {Array.from({ length: 53 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, d) => (
              <div
                key={d}
                className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default function GitHubGraph() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch(() => setError(true));
  }, []);

  function handleCellEnter(e: React.MouseEvent, day: ContributionDay) {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = day.contributionCount;
    const label =
      count === 0
        ? `No contributions on ${formatDate(day.date)}`
        : `${count} contribution${count > 1 ? "s" : ""} on ${formatDate(day.date)}`;
    setTooltip({ visible: true, text: label, x, y });
  }

  function handleCellLeave() {
    setTooltip((t) => ({ ...t, visible: false }));
  }

  const monthLabels = data ? getMonthLabels(data.weeks) : [];

  return (
    <section id="github" className="py-20 relative">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          GitHub Activity
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          Every commit, push, and PR across 2026.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-gray-200/60 dark:border-gray-700/60 shadow-lg"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Icon icon="simple-icons:github" width={22} height={22} className="dark:text-white" />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              @ritikkumar27
            </span>
          </div>
          {data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-1.5 bg-green-50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/50 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                {data.total.toLocaleString()} contributions in 2026
              </span>
            </motion.div>
          )}
        </div>

        {/* Graph area */}
        <div
          ref={wrapperRef}
          className="relative overflow-x-auto pb-1"
          onMouseLeave={handleCellLeave}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip.visible && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute z-50 px-3 py-1.5 text-xs font-medium rounded-lg shadow-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 whitespace-nowrap"
                style={{
                  left: tooltip.x,
                  top: tooltip.y - 40,
                  transform: "translateX(-50%)",
                }}
              >
                {tooltip.text}
              </motion.div>
            )}
          </AnimatePresence>

          {data === null && !error && <Skeleton />}

          {error && (
            <div className="flex flex-col items-center gap-3 py-12 text-gray-400 dark:text-gray-500">
              <Icon icon="mdi:github-face" width={40} height={40} />
              <p className="text-sm">
                Contribution data unavailable.{" "}
                <span className="opacity-60">Add a GITHUB_TOKEN to .env.local to enable this.</span>
              </p>
            </div>
          )}

          {data && (
            <div className="min-w-max">
              {/* Month labels */}
              <div className="flex mb-1 pl-8">
                {data.weeks.map((_, col) => {
                  const label = monthLabels.find((l) => l.col === col);
                  return (
                    <div
                      key={col}
                      className="w-3 mr-[3px] text-[10px] text-gray-400 dark:text-gray-500 font-medium flex-shrink-0"
                    >
                      {label ? label.month : ""}
                    </div>
                  );
                })}
              </div>

              {/* Grid + day labels */}
              <div className="flex gap-0">
                {/* Day labels */}
                <div className="flex flex-col justify-between mr-2 pb-0.5" style={{ height: 7 * 12 + 6 * 3 }}>
                  {DAY_LABELS.map((label, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-gray-400 dark:text-gray-500 leading-3 h-3 flex items-center"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Cells */}
                <div className="flex gap-[3px]">
                  {data.weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const day = week.contributionDays[dayIdx];
                        if (!day) {
                          return (
                            <div
                              key={dayIdx}
                              className="w-3 h-3 rounded-sm flex-shrink-0"
                            />
                          );
                        }
                        return (
                          <motion.div
                            key={day.date}
                            className={`w-3 h-3 rounded-sm flex-shrink-0 cursor-pointer transition-opacity duration-150 hover:opacity-70 ${LEVEL_CLASSES[day.contributionLevel]}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.2,
                              delay: Math.min((weekIdx * 7 + dayIdx) * 0.001, 0.3),
                            }}
                            onMouseEnter={(e) => handleCellEnter(e, day)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2 justify-end mt-4 pr-1">
                <span className="text-[11px] text-gray-400 dark:text-gray-500">Less</span>
                {Object.values(LEVEL_CLASSES).map((cls, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm flex-shrink-0 ${cls}`}
                  />
                ))}
                <span className="text-[11px] text-gray-400 dark:text-gray-500">More</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
