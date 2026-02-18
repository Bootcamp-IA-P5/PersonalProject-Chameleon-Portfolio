import "../styles/global.css";

export const metadata = {
    title: "Chameleon Portfolio",
    description: "Mi portfolio adaptativo con IA",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className="color-scheme: light dark"> {/* Forzamos modo dark */}
            <body className="bg-[#020617] text-slate-100 antialiased">
                {children}
            </body>
        </html>
    );
}