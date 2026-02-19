import { Inter } from 'next/font/google';
import "../styles/global.css";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: "Portfolio Camaleón — AI Developer",
    description: "Portfolio adaptativo con IA: muestra los proyectos más relevantes según tu oferta de trabajo.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={`${inter.variable} dark`}>
            <body className="bg-[#020617] text-slate-100 antialiased">
                {children}
            </body>
        </html>
    );
}