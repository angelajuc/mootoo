"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number };

function getCanvasPoint(e: PointerEvent, canvas: HTMLCanvasElement): Point {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
}

export default function DrawingCanvas(props: {
    size?: number;
    strokeWidth?: number;
    onChangePng?: (pngDataUrl: string) => void;
}) {
    const size = props.size ?? 280;
    const strokeWidth = props.strokeWidth ?? 10;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const stateRef = useRef({
        last: null as Point | null,
    });

    const dpr = useMemo(() => (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1), []);

    // Initialize canvas with transparent background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = Math.floor(size * dpr);
        canvas.height = Math.floor(size * dpr);
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // nice crisp strokes
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = strokeWidth * dpr;
    }, [size, strokeWidth, dpr]);

    const emitPng = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const png = canvas.toDataURL("image/png");
        props.onChangePng?.(png);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const onPointerDown = (e: PointerEvent) => {
            canvas.setPointerCapture(e.pointerId);
            setIsDrawing(true);
            stateRef.current.last = getCanvasPoint(e, canvas);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDrawing) return;
            const last = stateRef.current.last;
            if (!last) return;
            const next = getCanvasPoint(e, canvas);

            ctx.beginPath();
            ctx.moveTo(last.x, last.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();

            stateRef.current.last = next;
        };

        const onPointerUp = () => {
            setIsDrawing(false);
            stateRef.current.last = null;
            emitPng();
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);

        return () => {
            canvas.removeEventListener("pointerdown", onPointerDown);
            canvas.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawing]);

    const clear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        emitPng();
    };

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 12,
                    background: "white",
                    width: size + 24,
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        touchAction: "none",
                        display: "block",
                        borderRadius: 10,
                        border: "5px solid #f2c94c", // #e4a0f7
                        width: size,
                        height: size,
                        background: "white",
                            //"linear-gradient(45deg, #f7f7f7 25%, transparent 25%) -10px 0/20px 20px, linear-gradient(-45deg, #f7f7f7 25%, transparent 25%) -10px 0/20px 20px, linear-gradient(45deg, transparent 75%, #f7f7f7 75%) -10px 0/20px 20px, linear-gradient(-45deg, transparent 75%, #f7f7f7 75%) -10px 0/20px 20px",
                    }}
                    aria-label="Drawing canvas"
                />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={clear} style={btn}>
                    <label style={ {color:"555"}}>
                        Clear
                    </label>
                </button>
            </div>
        </div>
    );
}

const btn: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "3px solid #f2c94c", // #e4a0f7
    background: "white",
    cursor: "pointer",
    color: "black"
};
