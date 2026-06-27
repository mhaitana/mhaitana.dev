import Script from "next/script";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matt Haitana",
    jobTitle: "Senior Software Engineer",
    url: "https://mhaitana.dev",
    email: "mailto:mhaitana@gmail.com",
    sameAs: [
      "https://github.com/mhaitana",
      "https://www.linkedin.com/in/mhaitana",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressCountry: "AU",
    },
    worksFor: {
      "@type": "Organization",
      name: "CoStar Group",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Matt Haitana",
    url: "https://mhaitana.dev",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mhaitana.dev/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
