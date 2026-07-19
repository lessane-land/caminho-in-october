CAMINO PORTO-VIGO — PWA
=======================
Publish (pick one):

A) Netlify Drop (fastest, free)
   1. Go to https://app.netlify.com/drop
   2. Drag this whole folder onto the page
   3. You get a URL like https://something.netlify.app

B) GitHub Pages
   1. Create a repo, push these files to the root (or /docs)
   2. Settings > Pages > deploy from branch
   3. URL: https://<user>.github.io/<repo>/

Install on iPhone:
   1. Open the URL in Safari
   2. Share button > "Add to Home Screen"
   3. Opens full-screen with its own icon; works offline
      after the first visit (visit once with internet so
      the service worker caches everything).

Notes:
- Progress (stages walked) is stored on the phone (localStorage).
- Offline requires HTTPS, which both Netlify and GitHub Pages provide.
