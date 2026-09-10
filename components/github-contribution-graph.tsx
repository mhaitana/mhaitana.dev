import { getContributionLevel, type ContributionCalendar } from "@/lib/github-types";
import { summariseContributions } from "@/lib/github-worklog";
import { cn } from "@/lib/utils";

interface GitHubContributionGraphProps {
  calendar: ContributionCalendar;
  className?: string;
}

const fills = ["fill-muted", "fill-primary/25", "fill-primary/45", "fill-primary/70", "fill-primary"];

function monthLabel(month: string) {
  return new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-AU", {
    month: "short", year: "numeric", timeZone: "UTC",
  });
}

export function GitHubContributionGraph({ calendar, className }: GitHubContributionGraphProps) {
  const months = summariseContributions(calendar);
  const days = calendar.weeks.flatMap((week) => week.contributionDays);
  const activeDays = days.filter((day) => day.contributionCount > 0).length;
  const maximumMonth = Math.max(1, ...months.map((month) => month.contributions));
  const recentMonths = months.slice(-6);
  let lastMonth = "";

  if (!days.length) {
    return <p className="text-sm text-muted-foreground">No contribution history was included in this snapshot.</p>;
  }

  return (
    <figure className={cn("min-w-0", className)}>
      <figcaption className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">{calendar.totalContributions.toLocaleString("en-AU")} contributions</span>
        {" "}across {activeDays} active days in the recorded period, {monthLabel(months[0].month)}–{monthLabel(months[months.length - 1].month)}.
      </figcaption>

      {/* The visual is decorative. One optional monthly table gives access to
          the data without adding hundreds of focus stops or verbose cells. */}
      <div className="mt-5 hidden sm:block" aria-hidden="true">
        <svg viewBox={`0 0 ${calendar.weeks.length * 16} 144`} className="w-full" focusable="false">
          {calendar.weeks.map((week, weekIndex) => {
            const firstDay = week.contributionDays[0];
            const month = firstDay?.date.slice(0, 7);
            const showLabel = month && month !== lastMonth && weekIndex < calendar.weeks.length - 2;
            if (month) lastMonth = month;
            return (
              <g key={weekIndex}>
                {showLabel && <text x={weekIndex * 16} y="12" className="fill-muted-foreground text-[10px]">{monthLabel(month).split(" ")[0]}</text>}
                {week.contributionDays.map((day) => (
                  <rect
                    key={day.date}
                    x={weekIndex * 16}
                    y={24 + new Date(`${day.date}T00:00:00Z`).getUTCDay() * 16}
                    width="12"
                    height="12"
                    className={fills[getContributionLevel(day.contributionCount)]}
                  >
                    <title>{`${day.date}: ${day.contributionCount} contributions`}</title>
                  </rect>
                ))}
              </g>
            );
          })}
        </svg>
        <p className="text-right text-xs text-muted-foreground">Stronger colour indicates more contributions.</p>
      </div>

      <div className="mt-5 space-y-3 sm:hidden">
        <p className="font-mono text-xs text-muted-foreground">Latest six recorded months</p>
        {recentMonths.map((row) => (
          <div key={row.month}>
            <div className="flex justify-between gap-3 text-sm">
              <span>{monthLabel(row.month)}</span>
              <span className="tabular-nums text-muted-foreground">{row.contributions.toLocaleString("en-AU")}</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-muted" aria-hidden="true">
              <div className="h-full bg-primary" style={{ width: `${row.contributions / maximumMonth * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <details className="mt-5 border-t border-border pt-2">
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary">
          View monthly contribution table
        </summary>
        <table className="mt-3 w-full text-left text-sm tabular-nums">
          <caption className="pb-3 text-left text-xs leading-relaxed text-muted-foreground">
            Recorded months may be partial. Active days are shown against the number of days included in the snapshot.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-2 pr-2 font-medium">Month</th>
              <th scope="col" className="px-2 py-2 text-right font-medium">Contributions</th>
              <th scope="col" className="py-2 pl-2 text-right font-medium">Active days</th>
            </tr>
          </thead>
          <tbody>
            {months.map((row) => (
              <tr key={row.month} className="border-b border-border/60">
                <th scope="row" className="py-2 pr-2 font-normal">{monthLabel(row.month)}</th>
                <td className="px-2 py-2 text-right">{row.contributions.toLocaleString("en-AU")}</td>
                <td className="py-2 pl-2 text-right text-muted-foreground">{row.activeDays} / {row.recordedDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
