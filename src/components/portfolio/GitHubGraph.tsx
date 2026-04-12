"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionHeading from "./SectionHeading";


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


const LEVEL_COLORS: Record<string, string> = {
  NONE: "rgba(0, 173, 181, 0.04)",
  FIRST_QUARTILE: "rgba(0, 173, 181, 0.2)",
  SECOND_QUARTILE: "rgba(0, 173, 181, 0.4)",
  THIRD_QUARTILE: "rgba(0, 173, 181, 0.7)",
  FOURTH_QUARTILE: "#00ADB5",
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
  above: boolean;
};


function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-40 rounded mb-6" style={{ backgroundColor: "rgba(0,173,181,0.08)" }} />
      <div className="flex gap-1">
        {Array.from({ length: 53 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, d) => (
              <div
                key={d}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: "rgba(0,173,181,0.04)" }}
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
    above: true, 
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
    const above = y > 50;
    setTooltip({ visible: true, text: label, x, y, above });
  }

  function handleCellLeave() {
    setTooltip((t) => ({ ...t, visible: false }));
  }

  const monthLabels = data ? getMonthLabels(data.weeks) : [];

  return (
    <section id="github" className="section-padding relative">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading text="GitHub" highlight="Activity" />
        <p className="text-white mt-4" style={{ fontSize: "var(--font-size-body-lg)" }}>
          Every commit, push, and PR across 2026.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative p-6 md:p-8"
        style={{ backgroundColor: "rgba(27,26,46,0.3)", boxShadow: "var(--shadow-card)" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: "rgba(0,173,181,0.08)" }}>
              <Icon icon="simple-icons:github" width={22} height={22} className="text-white" />
            </div>
            <span className="text-white" style={{ fontWeight: 600 }}>
              @ritikkumar27
            </span>
          </div>
          {data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(0,173,181,0.12)", border: "1px solid rgba(0,173,181,0.25)" }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "var(--color-accent-100)" }} />
              <span className="text-sm purple" style={{ fontWeight: 600 }}>
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
                className="pointer-events-none absolute z-50 px-3 py-1.5 text-xs rounded-lg shadow-lg text-white whitespace-nowrap"
                style={{
                  backgroundColor: "var(--color-bg-surface)",
                  fontWeight: 500,
                  left: tooltip.x,
                  top: tooltip.above ? tooltip.y - 40 : tooltip.y + 18,
                  transform: "translateX(-50%)",
                }}
              >
                {tooltip.text}
              </motion.div>
            )}
          </AnimatePresence>

          {data === null && !error && <Skeleton />}

          {error && (
            <div className="flex flex-col items-center gap-3 py-12" style={{ color: "var(--color-text-muted)" }}>
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
                      className="w-3 mr-[3px] text-[10px] font-medium flex-shrink-0"
                      style={{ color: "var(--color-text-muted)" }}
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
                      className="text-[10px] leading-3 h-3 flex items-center"
                    style={{ color: "var(--color-text-muted)" }}
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
                            className="w-3 h-3 rounded-sm flex-shrink-0 cursor-pointer transition-opacity duration-150 hover:opacity-70"
                            style={{ backgroundColor: LEVEL_COLORS[day.contributionLevel] }}
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
                <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>Less</span>
                {Object.values(LEVEL_COLORS).map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>More</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
