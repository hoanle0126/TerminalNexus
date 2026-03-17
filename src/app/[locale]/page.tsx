import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-6 text-center">
        <p className="text-lg font-mono text-cyan-400">{t("greeting")}</p>
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
          {t("name")}
        </h1>
        <p className="text-2xl text-zinc-400 font-mono">{`> ${t("role")}`}</p>
        <p className="text-lg text-zinc-500 max-w-md">{t("tagline")}</p>
      </main>
    </div>
  );
}
