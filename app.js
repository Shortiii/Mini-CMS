const SPACE_ID     = 'hw26gu8vev3x';
const ACCESS_TOKEN = '8YDywiRleYqN1LQOuFLYTcLJ6FRKpwStD5J98usUDrE';
const CONTENT_TYPE = 'newsletterPage';

const API_URL =
  `https://cdn.contentful.com/spaces/${SPACE_ID}/entries` +
  `?access_token=${ACCESS_TOKEN}` +
  `&content_type=${CONTENT_TYPE}` +
  `&limit=1`;

// Set text content of an element by its ID
function set(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

async function fetchContent() {
  try {
    const res  = await fetch(API_URL);
    const data = await res.json();

    const fields = data.items[0].fields;

    // Build asset map: { assetId → 'https://...' }
    const assets = {};
    (data.includes?.Asset || []).forEach(a => {
      assets[a.sys.id] = 'https:' + a.fields.file.url;
    });

    // ── Page title ───────────────────────────────────────────
    document.title = fields.siteName || 'Glow Diaries';

    // ── Header & Hero ────────────────────────────────────────
    set('siteName',   fields.siteName);
    set('footerBrand',fields.siteName);
    set('headerTag',  fields.headerTag);
    set('issueLabel', fields.issueLabel);
    set('heroTitle',  fields.heroTitle);
    set('heroDesc',   fields.heroDesc);
    set('ctaBtn',     fields.ctaButtonText);
    set('topbarCta',  fields.ctaButtonText);
    set('nlBtn',      fields.ctaButtonText);
    set('formNote',   fields.formNote);

    // ── Author ───────────────────────────────────────────────
    set('authorName', fields.authorName);
    set('authorBio',  fields.authorBio);

    // ── Topics nav cards ─────────────────────────────────────
    set('topicsLabel', fields.topicsLabel);
    set('topic1Icon',  fields.topic1Icon);
    set('topic1Name',  fields.topic1Name);
    set('topic2Icon',  fields.topic2Icon);
    set('topic2Name',  fields.topic2Name);
    set('topic3Icon',  fields.topic3Icon);
    set('topic3Name',  fields.topic3Name);

    // Also update the section eyebrow labels to match topic names
    set('s1Tag', fields.topic1Name);
    set('s2Tag', fields.topic2Name);
    set('s3Tag', fields.topic3Name);

    // ── Section intros (new fields — add these in Contentful) ─
    set('s1Title', fields.section1Title);
    set('s1Intro', fields.section1Intro);
    set('s2Title', fields.section2Title);
    set('s2Intro', fields.section2Intro);
    set('s3Title', fields.section3Title);
    set('s3Intro', fields.section3Intro);

    // ── Featured post — Routines ──────────────────────────────
    set('p1Tag',     fields.post1Tag);
    set('p1Title',   fields.post1Title);
    set('p1Excerpt', fields.post1Excerpt);
    set('p1Author',  fields.post1Author);
    set('p1Read',    fields.post1ReadTime);

    // ── Featured post — Reviews ───────────────────────────────
    set('p2Tag',     fields.post2Tag);
    set('p2Title',   fields.post2Title);
    set('p2Excerpt', fields.post2Excerpt);
    set('p2Author',  fields.post2Author);
    set('p2Read',    fields.post2ReadTime);

    // ── Featured post — Skin Stories ─────────────────────────
    set('p3Tag',     fields.post3Tag);
    set('p3Title',   fields.post3Title);
    set('p3Excerpt', fields.post3Excerpt);
    set('p3Author',  fields.post3Author);
    set('p3Read',    fields.post3ReadTime);

    // ── Quote band ────────────────────────────────────────────
    set('quoteText', fields.quoteText);
    set('quoteAttr', fields.quoteAttr);

    // ── Newsletter strip ──────────────────────────────────────
    set('nlTitle', fields.nlTitle);
    set('nlSub',   fields.nlSub);

    // ── Footer ────────────────────────────────────────────────
    set('footerTagline', fields.footerTagline);
    set('footerCopy',    fields.footerCopy);

    // ── Accent colour → rewrites entire theme ─────────────────
    if (fields.accentColor) {
      const hex = fields.accentColor.startsWith('#')
        ? fields.accentColor
        : '#' + fields.accentColor;
      document.documentElement.style.setProperty('--plum', hex);
    }

    // ── Author photo ──────────────────────────────────────────
    const photoId = fields.authorPhoto?.sys?.id;
    if (photoId && assets[photoId]) {
      const wrap = document.getElementById('authorImgWrap');
      if (wrap) {
        wrap.innerHTML = '';
        wrap.style.background = 'transparent';
        const img = document.createElement('img');
        img.src = assets[photoId] + '?w=200&h=200&fit=thumb&f=face';
        img.alt = fields.authorName || 'Author';
        wrap.appendChild(img);
      }
    }

  } catch (err) {
    console.error('Could not load content from Contentful:', err);
  } finally {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('out');
      setTimeout(() => loader.remove(), 550);
    }
  }
}

fetchContent();