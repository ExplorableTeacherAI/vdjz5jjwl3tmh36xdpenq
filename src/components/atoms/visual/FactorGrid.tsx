import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export interface FactorGridProps {
    /** The number to visualize */
    number: number;
    /** Optional accent color for dots */
    accentColor?: string;
    /** Optional className */
    className?: string;
}

/**
 * FactorGrid — Visualizes the factors of a number by showing all possible rectangle arrangements.
 * Prime numbers only show 1×n, while composite numbers show multiple arrangements.
 */
export const FactorGrid: React.FC<FactorGridProps> = ({
    number,
    accentColor = '#8B5CF6',
    className = '',
}) => {
    // Calculate all factor pairs
    const factorPairs = useMemo(() => {
        const pairs: [number, number][] = [];
        for (let i = 1; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                pairs.push([i, number / i]);
            }
        }
        return pairs;
    }, [number]);

    const isPrime = factorPairs.length === 1 && factorPairs[0][0] === 1;

    // Render a single rectangle arrangement
    const renderRectangle = (rows: number, cols: number, index: number) => {
        const dotSize = Math.min(16, Math.max(8, 120 / Math.max(rows, cols)));
        const gap = Math.min(6, Math.max(2, 40 / Math.max(rows, cols)));

        return (
            <motion.div
                key={`${rows}x${cols}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30"
            >
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
                        gap: `${gap}px`,
                    }}
                >
                    {Array.from({ length: rows * cols }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: index * 0.1 + i * 0.02,
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="rounded-full"
                            style={{
                                width: dotSize,
                                height: dotSize,
                                backgroundColor: accentColor,
                            }}
                        />
                    ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                    {rows} × {cols}
                </span>
            </motion.div>
        );
    };

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            {/* Status badge */}
            <motion.div
                key={number}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    isPrime
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}
            >
                {number} is {isPrime ? 'PRIME' : 'COMPOSITE'}
            </motion.div>

            {/* Factor rectangles */}
            <div className="flex flex-wrap justify-center gap-4">
                {factorPairs.map(([rows, cols], index) =>
                    renderRectangle(rows, cols, index)
                )}
            </div>

            {/* Explanation */}
            <motion.p
                key={`explanation-${number}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-center text-muted-foreground max-w-md"
            >
                {isPrime ? (
                    <>
                        <span className="font-medium" style={{ color: accentColor }}>
                            {number}
                        </span>{' '}
                        can only be arranged as a single row — it has no other factors except 1 and itself.
                    </>
                ) : (
                    <>
                        <span className="font-medium" style={{ color: accentColor }}>
                            {number}
                        </span>{' '}
                        can be arranged in {factorPairs.length} different rectangle
                        {factorPairs.length > 1 ? 's' : ''} — it has{' '}
                        {factorPairs.length * 2 - (Math.sqrt(number) % 1 === 0 ? 1 : 0)} factors.
                    </>
                )}
            </motion.p>
        </div>
    );
};

export default FactorGrid;
