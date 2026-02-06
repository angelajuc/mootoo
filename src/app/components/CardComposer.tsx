"use client";

import React, { useEffect, useRef } from "react";

type CardStyle = "sketchymon" | "business";

export default function CardComposer(props: {
    drawingPngDataUrl: string | null;
    name?: string;
    subtitle?: string;
    ability? : string;
    description? : string;
    email? : string;
    phone?: string;
    style?: CardStyle;
}) {
    const { drawingPngDataUrl, name = "Sketchymon", subtitle = "Doodle creature", style = "sketchymon", email = "uremail@email.com", phone = "000-000-0000", ability = "poop", description = "A mysterious being born from pure scribbles. Rumored to evolve when someone says 'nice drawing'."} = props;
    const outRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = outRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // card resolution (good for download)
        const W = 750;
        const H = 1050;

        canvas.width = W;
        canvas.height = H;

        // background
        ctx.clearRect(0, 0, W, H);

        if (style === "sketchymon") {
            // outer frame
            ctx.fillStyle = "#f2c94c";
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = "#111";
            ctx.fillRect(30, 30, W - 60, H - 60);

            ctx.fillStyle = "#fff";
            ctx.fillRect(50, 50, W - 100, H - 100);

            // title bar
            ctx.fillStyle = "#f7f7f7";
            ctx.fillRect(70, 80, W - 140, 90);

            ctx.fillStyle = "#111";
            ctx.font = "bold 44px system-ui, -apple-system, 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif";
            ctx.fillText(name, 90, 140);

            ctx.font = "24px system-ui, -apple-system, 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif";
            ctx.fillStyle = "#444";
            ctx.fillText(subtitle, 90, 170);

            // art box
            ctx.fillStyle = "#eaeaea";
            ctx.fillRect(70, 210, W - 140, 520);

            // description box
            ctx.fillStyle = "#f7f7f7";
            ctx.fillRect(70, 760, W - 140, 220);

            ctx.fillStyle = "#111";
            ctx.font = "28px system-ui, -apple-system, 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif";
            ctx.fillText("Ability: Poop", 90, 820);

            ctx.font = "24px system-ui, -apple-system, 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif";
            ctx.fillStyle = "#333";
            wrapText(ctx, "A mysterious being born from pure scribbles. Rumored to evolve when someone says “nice drawing.”", 90, 870, W - 180, 32);
        } else {
            // business card layout
            ctx.fillStyle = "#0b1220";
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(50, 60, W - 100, H - 120);

            ctx.fillStyle = "#111";
            ctx.font = "bold 52px system-ui, -apple-system, Segoe UI, Roboto, Arial";
            ctx.fillText(name, 90, 160);

            ctx.fillStyle = "#444";
            ctx.font = "30px system-ui, -apple-system, Segoe UI, Roboto, Arial";
            ctx.fillText(subtitle, 90, 210);

            ctx.fillStyle = "#f4f4f4";
            ctx.fillRect(90, 270, W - 180, 520);

            ctx.fillStyle = "#111";
            ctx.font = "28px system-ui, -apple-system, Segoe UI, Roboto, Arial";
            ctx.fillText(`email: ${email}`, 90, 880);
            ctx.fillText(`phone: ${phone}`, 90, 930);
        }

        // draw the user sketch into the art box
        if (drawingPngDataUrl) {
            const img = new Image();
            img.onload = () => {
                // target box differs by style but we keep same here
                const boxX = 70;
                const boxY = 210;
                const boxW = W - 140;
                const boxH = 520;

                // fit contain
                const scale = Math.min(boxW / img.width, boxH / img.height);
                const dw = img.width * scale;
                const dh = img.height * scale;
                const dx = boxX + (boxW - dw) / 2;
                const dy = boxY + (boxH - dh) / 2;

                ctx.drawImage(img, dx, dy, dw, dh);
            };
            img.src = drawingPngDataUrl;
        }
    }, [drawingPngDataUrl, name, subtitle, style]);

    const download = () => {
        const canvas = outRef.current;
        if (!canvas) return;
        const a = document.createElement("a");
        a.download = `card-${Date.now()}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
    };

    return (
        <div style={{ display: "grid", gap: 25 }}>
            <canvas
                ref={outRef}
                style={{
                    width: 300,
                    height: 420,
                    borderRadius: 16,
                    border: "1px solid #ddd",
                    background: "white",
                }}
            />
            <button onClick={download} style={btn} disabled={!drawingPngDataUrl}>
                Download Card PNG
            </button>
        </div>
    );
}

function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
) {
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

const btn: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    color: "black",
    maxWidth: "300px",
};
