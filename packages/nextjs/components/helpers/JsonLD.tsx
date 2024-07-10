interface JsonLDProps {
  jsonLd: any;
}

export const JsonLD = (_this: JsonLDProps) => {
  return (
    <>
      <section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_this.jsonLd) }} />
      </section>
    </>
  );
};
