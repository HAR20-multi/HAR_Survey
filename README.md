# HAR Resource Index

A single static page listing, in one place, the resources referenced by
*"From Handcrafted Features to Foundation Models: A Critical Perspective on
the Evolution, Benchmarks, and Future of Human Activity Recognition"*
(Uma & Salice):

1. **Review & survey literature** — the eight surveys the paper positions
   itself against, linked to their DOI or arXiv page.
2. **State-of-the-art methods** — the ten representative methods in the
   paper's benchmark comparison, each linked to its paper and its official
   GitHub implementation.
3. **Benchmark datasets** — all sixteen datasets in the paper's dataset
   table, linked to the authors' own request/download page.

No build step, no framework, no analytics. It's one HTML file, one
stylesheet, and about a hundred lines of vanilla JS for search-filtering
the tables and copying the citation block.

## Deploying on GitHub Pages

1. Create a new repository (or use an existing one) and copy in
   `index.html`, `assets/style.css`, and `assets/script.js`, keeping the
   `assets/` folder structure intact.
2. Push to the `main` branch.
3. In the repository, go to **Settings → Pages**, set **Source** to
   "Deploy from a branch", choose the `main` branch and the `/ (root)`
   folder, then save.
4. GitHub will publish the page at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.

If you'd rather keep the site in a subfolder of a larger repo, put these
same three files under `/docs` instead and point Pages at the `/docs`
folder in the same settings screen.

## Updating a link

Every row lives directly in `index.html` as a plain `<tr>` — there is no
data file to regenerate. Find the row by the dataset/method/survey name,
edit the `href`, and commit. The architecture-family badges (3D CNN /
Transformer / SSL + Transf. / VLM) are plain CSS classes
(`arch-cnn`, `arch-transformer`, `arch-ssl`, `arch-vlm`) defined in
`assets/style.css` if you need to add a new method family.

## Adding this survey's own link

The last row of the survey table is intentionally left as a placeholder
(`add link ↗`, dashed underline) since the paper's own DOI/arXiv ID wasn't
public at the time this page was built. Search `data-placeholder` in
`index.html` to find it and swap in the real link once available.

## Verifying links

Every link in this page was opened and confirmed at build time
(see the "verified" tag in the page header). Link rot is inevitable for a
page like this — datasets move institutions, GitHub repos get renamed or
archived. If you notice a broken link, please open an issue or a pull
request with the corrected URL rather than assuming visitors will work
around it.

## License

The page content (descriptions, layout, code) is provided as-is for reuse
and adaptation. The papers, code repositories, and datasets it links to
each carry their own licenses — check the linked page before using any of
them.
