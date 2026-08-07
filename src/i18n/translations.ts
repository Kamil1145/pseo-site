export const translations = {
  pl: {
    titleTemplate: (job: string, city: string) => `Zarobki ${job} w ${city} (2026)`,
    metaDesc: (job: string, city: string) => `Sprawdź zarobki ${job} w ${city} na rok 2026. Stawki UoP oraz B2B.`,
    b2bLabel: "Kontrakt B2B",
    uopLabel: "Umowa o pracę",
  },
  en: {
    titleTemplate: (job: string, city: string) => `${job} Salary in ${city}, Poland (2026)`,
    metaDesc: (job: string, city: string) => `Check average ${job} salaries in ${city} for 2026. B2B contracts & employment terms.`,
    b2bLabel: "B2B Contract",
    uopLabel: "Employment Contract",
  }
};