// Resolves a file in public/ against wherever the app is served from.
//
// A path like "/images/logo.png" points at the domain root, which is wrong on
// GitHub Pages: the site lives under /<repo>, so the image 404s. CRA exposes
// the base path as PUBLIC_URL - empty in dev and on root-domain hosts, the
// repository name on Pages - and every public asset has to go through it.
//
// Relative paths ("images/logo.png") are no safer: they resolve against the
// current route, so the same image works on /team and breaks on /agents/:id.
export const asset = (path = "") =>
  `${process.env.PUBLIC_URL}/${String(path).replace(/^\/+/, "")}`;
