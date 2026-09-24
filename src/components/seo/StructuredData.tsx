/**
 * Renders a JSON-LD document.
 *
 * `JSON.stringify` output is escaped for `<` so a string containing `</script>`
 * cannot break out of the tag. Content here is authored, not user-supplied, but
 * escaping keeps that guarantee independent of where the data comes from.
 */
export function StructuredData({
  data,
  id,
}: {
  data: Record<string, unknown>;
  id?: string;
}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
