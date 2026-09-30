import React from "react";

export interface CircularProgressBarProps {
  value: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showPercentSign?: boolean;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export default function CircularProgressBar({
  value,
  label,
  size = 68,
  strokeWidth = 6,
  color = "#F59E0B",
  trackColor = "#E2E8F0",
  showPercentSign = true,
  className = "",
  valueClassName = "",
  labelClassName = "",
}: CircularProgressBarProps) {
  const center = size / 2;
  const radius = Math.max(0, (size - strokeWidth) / 2);
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), 100);
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-[13px] font-bold text-slate-800 leading-none ${valueClassName}`}>
            {Math.round(clampedValue)}
            {showPercentSign && (
              <span className="text-[10px] font-semibold text-slate-500 ml-0.5">%</span>
            )}
          </span>
        </div>
      </div>

      {label && (
        <span
          className={`text-[11px] font-bold text-slate-600 tracking-wider text-center mt-1.5 uppercase font-montserrat ${labelClassName}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
