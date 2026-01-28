import AppClient from "./ui/AppClient";
import {titleFont} from "@/app/titleFont";

export default function Page() {
    return (
        <main style={{ padding: 30, maxWidth: 1100, margin: "0 auto" }}>
            <h1 className={ titleFont.className } style={{ fontSize: 30, fontWeight: 700, marginBottom: 0 }}>MooTOO!</h1>
            <p style={{ color: "#FFF", marginBottom: 20 }}>
                Draw your MooTOO! Create your collectible calling card.
            </p>
            <AppClient />
        </main>
    );
}
