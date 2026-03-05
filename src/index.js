export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve SOLO la sitemap
    if (url.pathname === "/sitemap.xml") {
      const upstream =
        "https://raw.githubusercontent.com/stappamondo-source/stappamondo-sitemap/main/sitemap.xml";

      const res = await fetch(upstream);
      if (!res.ok) return new Response("Upstream sitemap fetch failed", { status: 502 });

      return new Response(await res.text(), {
        status: 200,
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control": "public, max-age=300",
        },
      });
    }

    // Non interferire col resto del sito
    return new Response("Not found", { status: 404 });
  },
};
