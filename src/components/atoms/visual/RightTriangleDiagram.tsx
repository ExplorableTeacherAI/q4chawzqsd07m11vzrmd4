import React, { useMemo } from "react";
import { useVar, useSetVar } from "@/stores/variableStore";

export interface RightTriangleDiagramProps {
    /** Variable name for leg a (horizontal) */
    legAVarName?: string;
    /** Variable name for leg b (vertical) */
    legBVarName?: string;
    /** Variable name for linked highlighting */
    highlightVarName?: string;
    /** Show the squares on each side */
    showSquares?: boolean;
    /** Show area values in squares */
    showSquareAreas?: boolean;
    /** Show side length labels */
    showLabels?: boolean;
    /** Width of the SVG */
    width?: number;
    /** Height of the SVG */
    height?: number;
    /** Color for leg a */
    colorA?: string;
    /** Color for leg b */
    colorB?: string;
    /** Color for hypotenuse c */
    colorC?: string;
    /** Additional CSS classes */
    className?: string;
}

export const RightTriangleDiagram: React.FC<RightTriangleDiagramProps> = ({
    legAVarName = "legA",
    legBVarName = "legB",
    highlightVarName,
    showSquares = false,
    showSquareAreas = false,
    showLabels = true,
    width = 500,
    height = 400,
    colorA = "#3b82f6",
    colorB = "#14b8a6",
    colorC = "#f97316",
    className = "",
}) => {
    const legA = useVar(legAVarName, 3) as number;
    const legB = useVar(legBVarName, 4) as number;
    const activeHighlight = useVar(highlightVarName ?? "__noop__", "") as string;
    const setVar = useSetVar();

    // Calculate hypotenuse
    const hypotenuse = useMemo(() => Math.sqrt(legA * legA + legB * legB), [legA, legB]);

    // Scale factor to fit the triangle nicely
    const maxSide = Math.max(legA, legB, hypotenuse);
    const scale = showSquares ? Math.min(width, height) / (maxSide * 3.5) : Math.min(width, height) / (maxSide * 2.5);

    // Triangle vertices (positioned to leave room for squares if shown)
    const padding = showSquares ? maxSide * scale * 0.3 : 40;
    const ax = padding + (showSquares ? legA * scale : 0);
    const ay = height - padding;
    const bx = ax + legA * scale;
    const by = ay;
    const cx = ax;
    const cy = ay - legB * scale;

    // Highlight helpers
    const isActive = (part: string) => activeHighlight === part;
    const setHighlight = (part: string) => {
        if (highlightVarName) setVar(highlightVarName, part);
    };
    const clearHighlight = () => {
        if (highlightVarName) setVar(highlightVarName, "");
    };

    // Calculate square positions for visual proof
    const squareA = useMemo(() => {
        // Square on leg a (horizontal side) - positioned below
        return {
            x: ax,
            y: ay,
            width: legA * scale,
            height: legA * scale,
        };
    }, [ax, ay, legA, scale]);

    const squareB = useMemo(() => {
        // Square on leg b (vertical side) - positioned to the left
        return {
            x: ax - legB * scale,
            y: cy,
            width: legB * scale,
            height: legB * scale,
        };
    }, [ax, cy, legB, scale]);

    const squareC = useMemo(() => {
        // Square on hypotenuse - rotated, positioned on the hypotenuse
        const angle = Math.atan2(by - cy, bx - cx);
        return {
            cx: (bx + cx) / 2,
            cy: (by + cy) / 2,
            size: hypotenuse * scale,
            angle: (angle * 180) / Math.PI,
        };
    }, [bx, by, cx, cy, hypotenuse, scale]);

    const baseOpacity = activeHighlight ? 0.3 : 1;

    return (
        <div className={`w-full rounded-xl bg-card p-4 ${className}`}>
            <svg
                width="100%"
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label="Right triangle diagram"
            >
                {/* Squares visualization for proof */}
                {showSquares && (
                    <>
                        {/* Square on leg a */}
                        <rect
                            x={squareA.x}
                            y={squareA.y}
                            width={squareA.width}
                            height={squareA.height}
                            fill={`${colorA}22`}
                            stroke={colorA}
                            strokeWidth={2}
                            style={{
                                opacity: isActive("squareA") ? 1 : baseOpacity,
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={() => setHighlight("squareA")}
                            onMouseLeave={clearHighlight}
                        />
                        {showSquareAreas && (
                            <text
                                x={squareA.x + squareA.width / 2}
                                y={squareA.y + squareA.height / 2}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={colorA}
                                fontSize={14}
                                fontWeight="bold"
                            >
                                {legA}² = {legA * legA}
                            </text>
                        )}

                        {/* Square on leg b */}
                        <rect
                            x={squareB.x}
                            y={squareB.y}
                            width={squareB.width}
                            height={squareB.height}
                            fill={`${colorB}22`}
                            stroke={colorB}
                            strokeWidth={2}
                            style={{
                                opacity: isActive("squareB") ? 1 : baseOpacity,
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={() => setHighlight("squareB")}
                            onMouseLeave={clearHighlight}
                        />
                        {showSquareAreas && (
                            <text
                                x={squareB.x + squareB.width / 2}
                                y={squareB.y + squareB.height / 2}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={colorB}
                                fontSize={14}
                                fontWeight="bold"
                            >
                                {legB}² = {legB * legB}
                            </text>
                        )}

                        {/* Square on hypotenuse (rotated) */}
                        <g
                            transform={`rotate(${squareC.angle - 90}, ${cx}, ${cy})`}
                            style={{
                                opacity: isActive("squareC") ? 1 : baseOpacity,
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={() => setHighlight("squareC")}
                            onMouseLeave={clearHighlight}
                        >
                            <rect
                                x={cx}
                                y={cy - squareC.size}
                                width={squareC.size}
                                height={squareC.size}
                                fill={`${colorC}22`}
                                stroke={colorC}
                                strokeWidth={2}
                            />
                            {showSquareAreas && (
                                <text
                                    x={cx + squareC.size / 2}
                                    y={cy - squareC.size / 2}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill={colorC}
                                    fontSize={14}
                                    fontWeight="bold"
                                    transform={`rotate(${-(squareC.angle - 90)}, ${cx + squareC.size / 2}, ${cy - squareC.size / 2})`}
                                >
                                    c² = {Math.round(hypotenuse * hypotenuse)}
                                </text>
                            )}
                        </g>
                    </>
                )}

                {/* Triangle fill */}
                <polygon
                    points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                    fill="rgba(148, 163, 184, 0.1)"
                    stroke="none"
                />

                {/* Right angle indicator */}
                <path
                    d={`M ${ax + 15} ${ay} L ${ax + 15} ${ay - 15} L ${ax} ${ay - 15}`}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth={1.5}
                />

                {/* Leg a (horizontal) */}
                <line
                    x1={ax}
                    y1={ay}
                    x2={bx}
                    y2={by}
                    stroke={colorA}
                    strokeWidth={4}
                    strokeLinecap="round"
                    style={{
                        opacity: isActive("legA") ? 1 : baseOpacity,
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={() => setHighlight("legA")}
                    onMouseLeave={clearHighlight}
                />

                {/* Leg b (vertical) */}
                <line
                    x1={ax}
                    y1={ay}
                    x2={cx}
                    y2={cy}
                    stroke={colorB}
                    strokeWidth={4}
                    strokeLinecap="round"
                    style={{
                        opacity: isActive("legB") ? 1 : baseOpacity,
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={() => setHighlight("legB")}
                    onMouseLeave={clearHighlight}
                />

                {/* Hypotenuse c */}
                <line
                    x1={bx}
                    y1={by}
                    x2={cx}
                    y2={cy}
                    stroke={colorC}
                    strokeWidth={4}
                    strokeLinecap="round"
                    style={{
                        opacity: isActive("hypotenuse") ? 1 : baseOpacity,
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={() => setHighlight("hypotenuse")}
                    onMouseLeave={clearHighlight}
                />

                {/* Vertices */}
                <circle cx={ax} cy={ay} r={5} fill="#1e293b" />
                <circle cx={bx} cy={by} r={5} fill="#1e293b" />
                <circle cx={cx} cy={cy} r={5} fill="#1e293b" />

                {/* Labels */}
                {showLabels && (
                    <>
                        {/* Side a label */}
                        <text
                            x={(ax + bx) / 2}
                            y={ay + 25}
                            textAnchor="middle"
                            fill={colorA}
                            fontSize={16}
                            fontWeight="bold"
                        >
                            a = {legA}
                        </text>

                        {/* Side b label */}
                        <text
                            x={ax - 25}
                            y={(ay + cy) / 2}
                            textAnchor="middle"
                            fill={colorB}
                            fontSize={16}
                            fontWeight="bold"
                        >
                            b = {legB}
                        </text>

                        {/* Hypotenuse c label */}
                        <text
                            x={(bx + cx) / 2 + 20}
                            y={(by + cy) / 2}
                            textAnchor="start"
                            fill={colorC}
                            fontSize={16}
                            fontWeight="bold"
                        >
                            c = {hypotenuse.toFixed(2)}
                        </text>
                    </>
                )}
            </svg>

            {/* Formula display */}
            {showSquares && showSquareAreas && (
                <div className="text-center mt-2 text-lg font-medium">
                    <span style={{ color: colorA }}>{legA}²</span>
                    <span className="text-muted-foreground"> + </span>
                    <span style={{ color: colorB }}>{legB}²</span>
                    <span className="text-muted-foreground"> = </span>
                    <span style={{ color: colorA }}>{legA * legA}</span>
                    <span className="text-muted-foreground"> + </span>
                    <span style={{ color: colorB }}>{legB * legB}</span>
                    <span className="text-muted-foreground"> = </span>
                    <span style={{ color: colorC }}>{legA * legA + legB * legB}</span>
                    <span className="text-muted-foreground"> = </span>
                    <span style={{ color: colorC }}>{hypotenuse.toFixed(2)}²</span>
                </div>
            )}
        </div>
    );
};

export default RightTriangleDiagram;
