/* ================================================================
   Loads data/content.json once. Every other script awaits this
   promise before reading text/images/dates, so all the editable
   content lives in ONE json file instead of being hardcoded in JS.

   NOTE: fetch() only works when the site is served over http(s) —
   e.g. GitHub Pages, or a local dev server. Opening the .html file
   directly (file://) will make this fail silently in most browsers.
   See README.md for how to preview locally.
   ================================================================ */
window.SiteData = fetch('data/content.json')
  .then(res => {
    if (!res.ok) throw new Error('content.json failed to load: ' + res.status);
    return res.json();
  })
  .catch(err => {
    console.error('Could not load data/content.json —', err.message);
    console.error('If you are opening this file directly (file://), fetch is blocked. Serve it over http instead — see README.md.');
    // Fallback so pages don't fully break if json fails to load
    return {
      birthday: { month: 7, day: 26 },
      sweetThoughts: ["I love you! (content.json failed to load — check README.md)"],
      memories: [],
      jukebox: { trackTitle: "Our Song", trackSubtitle: "", durationSeconds: 210, spotifyEmbedUrl: "" },
      finalSurprise: { buttonText: "Your gift, Gauri...", message: "content.json failed to load", jewelryImage: "" }
    };
  });
