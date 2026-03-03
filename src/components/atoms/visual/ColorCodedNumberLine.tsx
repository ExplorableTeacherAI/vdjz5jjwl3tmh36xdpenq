import React, { useMemo } from "react";

export interface ColorCodedNumberLineProps {
    min?: number;
    max?: number;
    step?: number;
    width?: number;
    height?: number;
    positiveColor?: string;
    negativeColor?: string;
    zeroColor?: string;
    className?: string;
}

export const ColorCodedNumberLine: React.FC<ColorCodedNumberLineProps> = ({
    min = -10,
    max = 10,
    step = 1,
    width = 640,
    height = 140,
    positiveColor = "#10B981", // emerald-500
    negativeColor = "#EF4444", // red-500
    zeroColor = "#6366F1", // indigo-500
    className = "",
}) => {
    const safeMax = max <= min ? min + 1 : max;
    const safeStep = step <= 0 ? 1 : step;

    const paddingX = 50;
    const axisY = height * 0.5;
    const usableWidth = width - paddingX * 2;

    const ticks = useMemo(() => {
        const arr: number[] = [];
        for (let t = min; t <= safeMax + safeStep / 2; t += safeStep) {
            arr.push(Number(t.toFixed(6)));
            if (arr.length > 200) break;
        }
        return arr;
    }, [min, safeMax, safeStep]);

    const xOf = (n: number) => paddingX + ((n - min) / (safeMax - min)) * usableWidth;
    const zeroX = xOf(0);

    return (
        <div className={`w-full rounded-xl bg-card p-4 ${className}`}>
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
                {/* Negative region background */}
                <rect
                    x={paddingX}
                    y={axisY - 20}
                    width={zeroX - paddingX}
                    height={40}
                    fill={negativeColor}
                    opacity={0.15}
                    rx={4}
                />

                {/* Positive region background */}
                <rect
                    x={zeroX}
                    y={axisY - 20}
                    width={width - paddingX - zeroX}
                    height={40}
                    fill={positiveColor}
                    opacity={0.15}
                    rx={4}
                />

                {/* Main axis line - negative portion */}
                <line
                    x1={paddingX}
                    y1={axisY}
                    x2={zeroX}
                    y2={axisY}
                    stroke={negativeColor}
                    strokeWidth={3}
                />

                {/* Main axis line - positive portion */}
                <line
                    x1={zeroX}
                    y1={axisY}
                    x2={width - paddingX}
                    y2={axisY}
                    stroke={positiveColor}
                    strokeWidth={3}
                />

                {/* Arrow heads */}
                <polygon
                    points={`${paddingX - 8},${axisY} ${paddingX + 2},${axisY - 6} ${paddingX + 2},${axisY + 6}`}
                    fill={negativeColor}
                />
                <polygon
                    points={`${width - paddingX + 8},${axisY} ${width - paddingX - 2},${axisY - 6} ${width - paddingX - 2},${axisY + 6}`}
                    fill={positiveColor}
                />

                {/* Ticks and labels */}
                {ticks.map((t) => {
                    const x = xOf(t);
                    const isZero = Math.abs(t) < 1e-6;
                    const isNegative = t < 0;
                    const tickColor = isZero ? zeroColor : isNegative ? negativeColor : positiveColor;

                    return (
                        <g key={t}>
                            <line
                                x1={x}
                                y1={axisY - (isZero ? 14 : 8)}
                                x2={x}
                                y2={axisY + (isZero ? 14 : 8)}
                                stroke={tickColor}
                                strokeWidth={isZero ? 3 : 1.5}
                            />
                            <text
                                x={x}
                                y={axisY + 32}
                                textAnchor="middle"
                                fill={tickColor}
                                fontSize={isZero ? 14 : 12}
                                fontWeight={isZero ? 700 : 500}
                            >
                                {Number.isInteger(t) ? t : t.toFixed(1)}
                            </text>
                        </g>
                    );
                })}

                {/* Zero marker circle */}
                <circle cx={zeroX} cy={axisY} r={8} fill={zeroColor} />
                <circle cx={zeroX} cy={axisY} r={4} fill="white" />

                {/* Region labels */}
                <text
                    x={(paddingX + zeroX) / 2}
                    y={axisY - 30}
                    textAnchor="middle"
                    fill={negativeColor}
                    fontSize={13}
                    fontWeight={600}
                >
                    Negative
                </text>
                <text
                    x={(zeroX + width - paddingX) / 2}
                    y={axisY - 30}
                    textAnchor="middle"
                    fill={positiveColor}
                    fontSize={13}
                    fontWeight={600}
                >
                    Positive
                </text>
            </svg>
        </div>
    );
};
