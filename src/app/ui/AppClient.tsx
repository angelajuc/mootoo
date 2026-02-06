"use client";

import React, { useState } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import CardComposer from "../components/CardComposer";

export default function AppClient() {
    const [png, setPng] = useState<string | null>(null);
    const [style, setStyle] = useState<"sketchymon" | "business">("sketchymon");
    const [name, setName] = useState("Sketchymon");
    const [subtitle, setSubtitle] = useState("Doodle creature");
    const [email, setEmail] = useState("uremail@email.com");
    const [phone, setPhone] = useState("000-000-0000");
    const [ability, setAbility] = useState("Poop");
    const [description, setDescription] = useState("A mysterious being born from pure scribbles. Rumored to evolve when someone says 'nice drawing'.");

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                alignItems: "start",
            }}
        >
            <div style={{ display: "grid", gap: 35 }}>
                <div style={{ display: "grid", gap: 8 }}>
                    <label style={label}>
                        Card title
                    </label>

                    <label style={innerLabel}>
                        <input style={input} value={name} onChange={(e) => setName(e.target.value)} />
                    </label>

                    <label style={label}>
                        Subtitle
                    </label>

                    <label style={innerLabel}>
                        <input style={input} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                    </label>

                    <label style={label}>
                        Style
                    </label>

                    <label style={innerLabel}>
                        <select style={input} value={style} onChange={(e) => setStyle(e.target.value as any)}>
                            <option value="sketchymon">Sketchymon</option>
                            <option value="business">Business</option>
                            
                        </select>
                    </label>

                    <label style={label}>
                        Ability
                    </label>

                     <label style={innerLabel}>
                        <input style={input} value={ability} onChange={(e) => setAbility(e.target.value)} />
                     </label>

                     <label style={label}>
                        Description
                     </label>

                     <label style ={innerLabel}>
                        <input style={input} value={description} onChange={(e) => setDescription(e.target.value)} />
                     </label>
                </div>

                <DrawingCanvas onChangePng={setPng} />

            </div>

            <div style={{ display: "grid", gap: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Preview</h2>
                <CardComposer drawingPngDataUrl={png} name={name} subtitle={subtitle} email={email} phone={phone} ability={ability} description={description} style={style} />
            </div>
        </div>
    );
}

const label: React.CSSProperties = {
    display: "grid",
    gap: 6,
    fontSize: 14,
};

const innerLabel: React.CSSProperties = {
    display: "grid",
    gap: 6,
    fontSize: 14,
    color: "#555",
};

const input: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
};
