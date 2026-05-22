
const SPACE_ID     = 'hw26gu8vev3x';
const ACCESS_TOKEN = '8YDywiRleYqN1LQOuFLYTcLJ6FRKpwStD5J98usUDrE';

const BASE = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}`;

// ── Fetch the site settings (newsletterPage) ─────────────
async function fetchSiteSettings() {
  const res  = await fetch(`${BASE}&content_type=newsletterPage&limit=1`);
  const data = await res.json();
  const fields = data.items[0]?.fields || {};
  const assets = buildAssetMap(data);
  return { fields, assets };
}

// ── Fetch blog posts, optionally filtered by category ────
// category: 'routines' | 'reviews' | 'stories' | null (all)
async function fetchPosts(category = null, limit = 100) {
  let url = `${BASE}&content_type=blogPost&order=-sys.createdAt&limit=${limit}`;
  if (category) url += `&fields.category=${category}`;
  const res  = await fetch(url);
  const data = await res.json();
  const assets = buildAssetMap(data);
  return { posts: data.items || [], assets };
}

// ── Fetch a single post by its Contentful entry ID ───────
async function fetchPostById(id) {
  const res  = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries/${id}?access_token=${ACCESS_TOKEN}`);
  const post = await res.json();
  return post;
}

// ── Build { assetId → 'https://...' } map ────────────────
function buildAssetMap(data) {
  const map = {};
  (data.includes?.Asset || []).forEach(a => {
    map[a.sys.id] = 'https:' + a.fields.file.url;
  });
  return map;
}

// ── Set text of an element by id ─────────────────────────
function set(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

// ── Hide loader ───────────────────────────────────────────
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('out');
  setTimeout(() => loader.remove(), 550);
}

// ── Colour themes for post thumbnails (cycles) ───────────
const THUMB_CLASSES = ['t-purple','t-rose','t-blue','t-peach','t-green','t-pink'];
function thumbClass(index) {
  return THUMB_CLASSES[index % THUMB_CLASSES.length];
}

// ── Render the shared header ──────────────────────────────
function renderHeader(siteName, headerTag, activePage) {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = `
    <div class="header-inner">
      <a class="header-logo" href="index.html">
        <span class="logo-name">${siteName || 'Glow Diaries'}</span>
        <span class="logo-tag">${headerTag || 'Skincare Stories'}</span>
      </a>
      <ul class="header-nav">
        <li><a href="section.html?category=routines" ${activePage==='routines'?'class="active"':''}>Routines</a></li>
        <li><a href="section.html?category=reviews"  ${activePage==='reviews' ?'class="active"':''}>Reviews</a></li>
        <li><a href="section.html?category=stories"  ${activePage==='stories' ?'class="active"':''}>Stories</a></li>
      </ul>
      <a class="header-cta" href="index.html#nl-section">Join Community</a>
    </div>`;
}

// ── Render the shared footer ──────────────────────────────
function renderFooter(siteName, footerCopy) {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-brand">${siteName || 'Glow Diaries'}</div>
        <div class="footer-tagline">Real skincare stories. No filters, no perfection — just honest glow.</div>
      </div>
      <div>
        <div class="footer-col-title">Explore</div>
        <ul class="footer-links">
          <li><a href="section.html?category=routines">Routines</a></li>
          <li><a href="section.html?category=reviews">Reviews</a></li>
          <li><a href="section.html?category=stories">Skin Stories</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Community</div>
        <ul class="footer-links">
          <li><a href="index.html#nl-section">Newsletter</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Submit Your Story</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">${footerCopy || '© 2025 Glow Diaries · All rights reserved'}</span>
      <span class="footer-copy">Made with 💜 for every skin type</span>
    </div>`;
}

// ── Build a post card HTML string ─────────────────────────
function postCardHTML(post, index) {
  const f   = post.fields;
  const id  = post.sys.id;
  const tc  = thumbClass(index);
  const emoji = f.coverEmoji || '🌸';
  return `
    <a class="post-card fade-in" href="post.html?id=${id}" style="animation-delay:${index * 0.08}s">
      <div class="post-thumb ${tc}">${emoji}</div>
      <div class="post-body">
        <span class="post-tag">${f.tag || f.category || ''}</span>
        <div class="post-title">${f.title || ''}</div>
        <p class="post-excerpt">${f.excerpt || ''}</p>
        <div class="post-meta">
          <span>${f.author || ''}</span>
          <div class="post-meta-dot"></div>
          <span>${f.readTime || '5 min read'}</span>
        </div>
        <div class="read-more">Read story →</div>
      </div>
    </a>`;
}