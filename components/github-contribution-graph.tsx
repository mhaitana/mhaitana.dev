"use client";

import * as React from "react";
import { getContributionLevel, type ContributionCalendar } from "@/lib/github-types";
import { cn } from "@/lib/utils";

interface GitHubContributionGraphProps {
  calendar: ContributionCalendar;
  className?: string;
}

const dayLabels = ["Mon", "Wed", "Fri"];

function formatMonthLabel(dateString: string): string {
  const parts = dateString.split("-");
  if (parts.length < 2) return "";
  const monthIndex = parseInt(parts[1], 10) - 1;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[monthIndex] || "";
}

export function GitHubContributionGraph({
  calendar,
  className,
}: GitHubContributionGraphProps) {
  const weeks = calendar.weeks;

  // Compute month labels aligned to weeks.
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = "";
  weeks.forEach((week, index) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = formatMonthLabel(firstDay.date);
    if (month !== lastMonth) {
      monthLabels.push({ label: month, weekIndex: index });
      lastMonth = month;
    }
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">
          {calendar.totalContributions.toLocaleString()} contributions in the last year
        </p>
      </div>

      <div className="mt-4 overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          <div className="flex">
            <div className="mr-3 flex flex-col justify-between py-8">
              {dayLabels.map((day) => (
                <span
                  key={day}
                  className="text-[10px] leading-3 text-muted-foreground"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="flex-1">
              <div className="relative mb-1 flex h-4 items-end text-[10px] text-muted-foreground">
                {monthLabels.map(({ label, weekIndex }) => (
                  <span
                    key={`${label}-${weekIndex}`}
                    className="absolute"
                    style={{ left: `${weekIndex * 16}px` }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.contributionDays.map((day) => (
                      <DayCell
                        key={day.date}
                        date={day.date}
                        count={day.contributionCount}
                        level={getContributionLevel(day.contributionCount)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={cn(
                  "h-3 w-3 rounded-sm",
                  level === 0 && "bg-muted",
                  level === 1 && "bg-emerald-200 dark:bg-emerald-900",
                  level === 2 && "bg-emerald-300 dark:bg-emerald-700",
                  level === 3 && "bg-emerald-400 dark:bg-emerald-500",
                  level === 4 && "bg-emerald-500 dark:bg-emerald-300"
                )}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCell({
  date,
  count,
  level,
}: {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      aria-label={`${count} contribution${count === 1 ? "" : "s"} on ${formatGitHubDate(date)}`}
    >
      <div
        className={cn(
          "h-3 w-3 rounded-sm transition-colors",
          level === 0 && "bg-muted",
          level === 1 && "bg-emerald-200 dark:bg-emerald-900",
          level === 2 && "bg-emerald-300 dark:bg-emerald-700",
          level === 3 && "bg-emerald-400 dark:bg-emerald-500",
          level === 4 && "bg-emerald-500 dark:bg-emerald-300"
        )}
      />

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-lg">
          {count} contribution{count === 1 ? "" : "s"} on{" "}
          {formatGitHubDate(date)}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      )}
    </div>
  );
}

function formatGitHubDate(dateString: string): string {
  const parts = dateString.split("-");
  if (parts.length < 3) return dateString;
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10).toString();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = months[monthIndex] || "";
  return `${day} ${monthName} ${year}`;
}
