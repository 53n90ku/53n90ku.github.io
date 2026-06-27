type Route = "/home" | "/blogs";

type BlogPost = {
  path: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  body: string;
  html: string;
};

type GitHubContentFile = {
  name: string;
  path: string;
  type: string;
  download_url: string | null;
};

const routes: Route[] = ["/home", "/blogs"];
const navRoutes: Route[] = ["/blogs"];
const postsApiUrl = "https://api.github.com/repos/53n90ku/53n90ku.github.io/contents/posts";

let postCache: BlogPost[] | null = null;

const styles = `
  :root {
    color: #f8fbff;
    background: #07090f;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    text-rendering: geometricPrecision;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;
    background:
      linear-gradient(rgba(7, 9, 15, 0.46), rgba(7, 9, 15, 0.76)),
      radial-gradient(circle at 12% 10%, rgba(83, 236, 255, 0.34), transparent 30%),
      radial-gradient(circle at 82% 18%, rgba(255, 124, 214, 0.28), transparent 28%),
      radial-gradient(circle at 58% 86%, rgba(111, 255, 188, 0.22), transparent 30%),
      url("/assets/bcg.png"),
      linear-gradient(135deg, #07090f 0%, #101522 44%, #05070d 100%);
    background-size: cover, auto, auto, auto, cover, auto;
    background-position: center;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0.28;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: linear-gradient(to bottom, black, transparent 78%);
  }

  a {
    color: inherit;
  }

  .page {
    min-height: 100vh;
    padding: 20px;
  }

  .nav {
    position: sticky;
    top: 16px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    width: min(100%, 1080px);
    margin: 0 auto;
    padding: 10px 12px 10px 18px;
    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.23), rgba(255, 255, 255, 0.08));
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.46);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
  }

  .brand {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-link {
    border-radius: 999px;
    padding: 10px 13px;
    color: rgba(255, 255, 255, 0.74);
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    transition: background 180ms ease, color 180ms ease;
  }

  .nav-link.active,
  .nav-link:hover {
    color: #071018;
    background: rgba(255, 255, 255, 0.82);
  }

  .home-empty,
  .section {
    width: min(100%, 1080px);
    margin: 0 auto;
  }

  .home-empty {
    min-height: calc(100vh - 92px);
  }

  .section {
    padding: 56px 0 92px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 16px;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    color: rgba(195, 247, 255, 0.94);
    background: rgba(255, 255, 255, 0.1);
    font-size: 12px;
    font-weight: 800;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  h1 {
    max-width: 780px;
    margin: 0;
    font-size: clamp(42px, 8vw, 92px);
    line-height: 0.94;
    letter-spacing: 0;
  }

  .lead {
    max-width: 700px;
    margin: 22px 0 0;
    color: rgba(255, 255, 255, 0.76);
    font-size: clamp(16px, 2vw, 21px);
    line-height: 1.55;
  }

  .glass {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.32);
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08));
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.44);
    backdrop-filter: blur(26px) saturate(175%);
    -webkit-backdrop-filter: blur(26px) saturate(175%);
  }

  .glass::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.38), transparent 27%);
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 32px;
  }

  .blog-card {
    min-height: 230px;
    text-decoration: none;
    transition: transform 220ms ease, border-color 220ms ease;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.56);
  }

  .panel-content {
    position: relative;
    z-index: 1;
    padding: 24px;
  }

  .chip {
    display: inline-flex;
    margin-bottom: 28px;
    padding: 8px 11px;
    border-radius: 999px;
    color: rgba(210, 250, 255, 0.94);
    background: rgba(255, 255, 255, 0.11);
    font-size: 12px;
    font-weight: 800;
  }

  .panel-title {
    margin: 0 0 12px;
    font-size: 22px;
    line-height: 1.1;
  }

  .panel-text,
  .post-meta {
    margin: 0;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.6;
  }

  .post-shell {
    width: min(100%, 900px);
    margin: 0 auto;
    padding: 56px 0 92px;
  }

  .post-card {
    color: rgba(255, 255, 255, 0.88);
  }

  .post-card .panel-content {
    padding: clamp(24px, 5vw, 48px);
  }

  .post-body {
    margin-top: 32px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 17px;
    line-height: 1.78;
  }

  .post-body h1,
  .post-body h2,
  .post-body h3 {
    max-width: none;
    margin: 32px 0 12px;
    color: #ffffff;
    line-height: 1.1;
  }

  .post-body h1 {
    font-size: 38px;
  }

  .post-body h2 {
    font-size: 28px;
  }

  .post-body h3 {
    font-size: 22px;
  }

  .post-body p,
  .post-body ul,
  .post-body ol,
  .post-body blockquote,
  .post-body pre {
    margin: 18px 0;
  }

  .post-body a {
    color: #a7f3ff;
  }

  .post-body img {
    display: block;
    width: min(100%, 720px);
    max-height: 560px;
    object-fit: contain;
    margin: 24px auto;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 20px;
    box-shadow: 0 18px 54px rgba(0, 0, 0, 0.28);
  }

  .post-body blockquote {
    border-left: 3px solid rgba(167, 243, 255, 0.62);
    padding-left: 18px;
    color: rgba(255, 255, 255, 0.72);
  }

  .post-body code {
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.24);
    color: #d8fbff;
  }

  .post-body pre {
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.34);
  }

  .post-body pre code {
    border: 0;
    padding: 0;
    background: transparent;
  }

  .back-link {
    display: inline-flex;
    margin-bottom: 18px;
    color: rgba(255, 255, 255, 0.74);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 760px) {
    .page {
      padding: 14px;
    }

    .nav {
      align-items: stretch;
      border-radius: 24px;
      flex-direction: column;
    }

    .nav-link {
      text-align: center;
    }

    .blog-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function mountStyles(): void {
  const styleTag = document.createElement("style");
  styleTag.textContent = styles;
  document.head.append(styleTag);
}

function mountMathJax(): void {
  window.MathJax = {
    tex: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
    },
  };

  const script = document.createElement("script");
  script.id = "MathJax-script";
  script.async = true;
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  document.head.append(script);
}

function getRoute(): Route {
  const path = window.location.pathname;

  if (routes.includes(path as Route)) {
    return path as Route;
  }

  if (path.startsWith("/blogs/")) {
    return "/blogs";
  }

  return "/home";
}

function getPostSlug(): string | null {
  const match = window.location.pathname.match(/^\/blogs\/([^/]+)$/);
  return match?.[1] || null;
}

function navigate(path: string): void {
  window.history.pushState({}, "", path);
  void render();
}

function nav(activeRoute: Route): string {
  const links = navRoutes
    .map((route) => {
      const activeClass = route === activeRoute ? " active" : "";
      return `<a class="nav-link${activeClass}" href="${route}" data-route="${route}">Blogs</a>`;
    })
    .join("");

  return `
    <nav class="nav" aria-label="Primary navigation">
      <div class="brand">53n90ku</div>
      <div class="nav-links">${links}</div>
    </nav>
  `;
}

function homePage(): string {
  return `
    <main>
      <section class="home-empty" aria-label="Home"></section>
    </main>
  `;
}

async function loadPosts(): Promise<BlogPost[]> {
  if (postCache) {
    return postCache;
  }

  const postFiles = await loadPostFiles();
  const posts = await Promise.all(
    postFiles.map(async (file) => {
      const response = await fetch(file.url);

      if (!response.ok) {
        throw new Error(`Could not load ${file.path}`);
      }

      return parsePost(file.path, await response.text());
    }),
  );

  postCache = posts.sort((a, b) => b.date.localeCompare(a.date));
  return postCache;
}

async function loadPostFiles(): Promise<Array<{ path: string; url: string }>> {
  const response = await fetch(postsApiUrl, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not list Markdown posts from GitHub.");
  }

  const files = (await response.json()) as GitHubContentFile[];

  return files
    .filter((file) => file.type === "file" && file.name.endsWith(".md") && file.download_url)
    .sort((a, b) => b.name.localeCompare(a.name))
    .map((file) => ({
      path: `/${file.path}`,
      url: file.download_url as string,
    }));
}

function parsePost(path: string, fileText: string): BlogPost {
  const { frontMatter, markdown } = splitFrontMatter(fileText);
  const body = stripInlineStyle(markdown).trim();
  const fileName = path.split("/").pop() || "";
  const fileMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  const title = frontMatter.title || firstHeading(body) || titleFromSlug(fileMatch?.[2] || fileName);
  const date = frontMatter.date || fileMatch?.[1] || "";
  const slug = slugify(fileMatch?.[2] || title);
  const tags = parseTags(frontMatter.tags);
  const excerpt = firstParagraph(body);

  return {
    path,
    slug,
    title,
    date,
    tags,
    excerpt,
    body,
    html: markdownToHtml(body),
  };
}

function splitFrontMatter(fileText: string): {
  frontMatter: Record<string, string>;
  markdown: string;
} {
  if (!fileText.startsWith("---")) {
    return { frontMatter: {}, markdown: fileText };
  }

  const end = fileText.indexOf("\n---", 3);

  if (end === -1) {
    return { frontMatter: {}, markdown: fileText };
  }

  const frontMatterText = fileText.slice(3, end).trim();
  const markdown = fileText.slice(end + 4).trim();
  const frontMatter: Record<string, string> = {};

  for (const line of frontMatterText.split("\n")) {
    const separator = line.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    frontMatter[key] = value;
  }

  return { frontMatter, markdown };
}

function parseTags(rawTags = "Other"): string[] {
  return rawTags
    .replace(/^\[|\]$/g, "")
    .split(/[, ]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function stripInlineStyle(markdown: string): string {
  return markdown.replace(/<style[\s\S]*?<\/style>/gi, "").trim();
}

function firstHeading(markdown: string): string | null {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading?.[1]?.trim() || null;
}

function firstParagraph(markdown: string): string {
  const paragraph = markdown
    .replace(/^#\s+.+$/gm, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith(">") && !block.startsWith("-"));

  return paragraph ? stripMarkdown(paragraph).slice(0, 160) : "No preview yet.";
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/`{1,3}/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .trim();
}

function titleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(value: string): string {
  if (!value) {
    return "Undated";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function inlineMarkdown(value: string): string {
  let html = escapeHtml(value);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  html = html.replace(/```([^`]+)```/g, "<code>$1</code>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return html;
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let listItems: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const flushList = (): void => {
    if (listItems.length === 0) {
      return;
    }

    html.push(`<ul>${listItems.join("")}</ul>`);
    listItems = [];
  };

  const flushCode = (): void => {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);

    if (heading) {
      flushList();
      html.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`);
      continue;
    }

    const bullet = line.match(/^\s*-\s+(.+)$/);

    if (bullet) {
      listItems.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }

    const quote = line.match(/^\s*>\s*(.+)$/);

    if (quote) {
      flushList();
      html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    flushList();
    html.push(`<p>${inlineMarkdown(line.trim())}</p>`);
  }

  flushList();

  return html.join("");
}

async function blogsPage(): Promise<string> {
  const posts = await loadPosts();
  const cards = posts
    .map(
      (post) => `
        <a class="glass blog-card" href="/blogs/${post.slug}" data-route="/blogs/${post.slug}">
          <div class="panel-content">
            <span class="chip">${formatDate(post.date)} / ${post.tags.join(", ")}</span>
            <h2 class="panel-title">${escapeHtml(post.title)}</h2>
            <p class="panel-text">${escapeHtml(post.excerpt)}</p>
          </div>
        </a>
      `,
    )
    .join("");

  return `
    <main>
      <section class="section">
        <p class="eyebrow">Markdown archive</p>
        <h1>Blogs</h1>
        <p class="lead">
          Posts are still plain Markdown files with front matter, like the old site. The new shell
          fetches them and renders them inside the liquid-glass style.
        </p>
        <div class="blog-grid">${cards}</div>
      </section>
    </main>
  `;
}

async function postPage(slug: string): Promise<string> {
  const posts = await loadPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return `
      <main>
        <section class="post-shell">
          <a class="back-link" href="/blogs" data-route="/blogs">Back to blogs</a>
          <article class="glass post-card">
            <div class="panel-content">
              <p class="eyebrow">Not found</p>
              <h1>Blog post missing.</h1>
              <p class="lead">That Markdown file is not in the post manifest yet.</p>
            </div>
          </article>
        </section>
      </main>
    `;
  }

  return `
    <main>
      <section class="post-shell">
        <a class="back-link" href="/blogs" data-route="/blogs">Back to blogs</a>
        <article class="glass post-card">
          <div class="panel-content">
            <p class="eyebrow">${formatDate(post.date)} / ${post.tags.join(", ")}</p>
            <h1>${escapeHtml(post.title)}</h1>
            <div class="post-body">${post.html}</div>
          </div>
        </article>
      </section>
    </main>
  `;
}

function loadingPage(): string {
  return `
    <main>
      <section class="section">
        <p class="eyebrow">Loading</p>
        <h1>Getting Markdown.</h1>
      </section>
    </main>
  `;
}

function errorPage(message: string): string {
  return `
    <main>
      <section class="section">
        <article class="glass">
          <div class="panel-content">
            <p class="eyebrow">Blog loader</p>
            <h1>Could not load posts.</h1>
            <p class="lead">${escapeHtml(message)}</p>
          </div>
        </article>
      </section>
    </main>
  `;
}

async function render(): Promise<void> {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) {
    throw new Error("Missing #app root element.");
  }

  const route = getRoute();
  const slug = getPostSlug();

  if (route === "/home" && window.location.pathname !== "/home") {
    window.history.replaceState({}, "", "/home");
  }

  app.innerHTML = `<div class="page">${nav(route)}${loadingPage()}</div>`;

  let page: string;

  try {
    page =
      route === "/blogs" && slug
        ? await postPage(slug)
        : route === "/blogs"
          ? await blogsPage()
          : homePage();
  } catch (error) {
    page = errorPage(error instanceof Error ? error.message : "Something went wrong.");
  }

  app.innerHTML = `<div class="page">${nav(route)}${page}</div>`;
  await window.MathJax?.typesetPromise?.();
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest<HTMLAnchorElement>("[data-route]");

  if (!link) {
    return;
  }

  event.preventDefault();
  navigate(link.getAttribute("href") || "/home");
});

window.addEventListener("popstate", () => {
  void render();
});

declare global {
  interface Window {
    MathJax?: {
      tex?: {
        inlineMath: string[][];
        displayMath: string[][];
      };
      typesetPromise?: () => Promise<void>;
    };
  }
}

mountStyles();
mountMathJax();
void render();

export {};
