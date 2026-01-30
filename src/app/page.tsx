import AppClient from "./ui/AppClient";
import {titleFont} from "@/app/titleFont";
import Image from "next/image";

export default function Page() {
    return (
        <main style={{ padding: 30, maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8,}}>
                <h1 className={ titleFont.className } style={{ fontSize: 35, fontWeight: 700, marginBottom: 0 }}>MooTOO!</h1>
                <Image src="/MooToo-BackgroundRemoved.png" alt="MooTOO Logo" width={48} height={48} priority className="dark:invert dark: brightness-110"/>
                <Image src="/tyCOW-BackgroundRemoved.png" alt="TY MooTOO" width={58} height={58} priority className="dark:invert dark: brightness-110"/>
            </div>
            <p style={{ marginBottom: 20 }}>
                Draw your MooTOO! Create your collectible calling card.
            </p>
            <AppClient />
        </main>
    );
}
