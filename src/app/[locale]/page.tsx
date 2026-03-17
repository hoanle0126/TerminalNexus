import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tTerminal = await getTranslations({ locale, namespace: "terminal" });
  const tExperience = await getTranslations({ locale, namespace: "experience" });

  return (
    <>
      <HeroSection
        hero={{
          greeting: tHero("greeting"),
          name: tHero("name"),
          description: tHero("description"),
          viewProjects: tHero("viewProjects"),
          availableBadge: tHero("availableBadge"),
          contact: tHero("contact"),
        }}
        terminal={{
          title: tTerminal("title"),
          line1: tTerminal("line1"),
          line2: tTerminal("line2"),
          line3: tTerminal("line3"),
          line4: tTerminal("line4"),
          line5: tTerminal("line5"),
          line6: tTerminal("line6"),
          line7: tTerminal("line7"),
        }}
      />
      <ExperienceSection
        title={tExperience("title")}
        subtitle={tExperience("subtitle")}
        present={tExperience("present")}
        prevBtn={tExperience("prevBtn")}
        nextBtn={tExperience("nextBtn")}
      />
    </>
  );
}

