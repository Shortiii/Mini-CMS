# Glow Diaries — Headless CMS Mini Project

## What We Built

A skincare community blog called **Glow Diaries** — a one-page website where women share their honest experiences with skincare. The page is divided into three content sections: Glow Routines, Honest Reviews, and Skin Stories, each with their own blog posts.

The site is connected to **Contentful**, a Headless CMS. This means every piece of visible content — the site name, hero headline, author name and photo, topic cards, featured post titles, the quote, the newsletter strip, and the footer — is stored in Contentful and fetched live every time the page loads. No content is hardcoded into the HTML.

## Tools Used

**Contentful** — Headless CMS. Stores and manages all the site's content. Changes made and published here appear on the website instantly without touching any code.

**HTML + CSS** — The structure and design of the website. Handles all the layout, purple theme, typography, animations, and responsive behaviour.

**Vanilla JavaScript (app.js)** — Connects the website to Contentful. On page load it sends a request to the Contentful API, receives the content as JSON, and injects each field into the matching element on the page.

**Contentful Delivery API** — The REST endpoint that serves published content as JSON over HTTPS. The URL format is:
`https://cdn.contentful.com/spaces/{SPACE_ID}/entries?access_token={TOKEN}&content_type=newsletterPage`

**Google Fonts** — Cormorant Garamond (display serif) and Jost (body sans-serif) for the editorial feminine aesthetic.

## Content Fields in Contentful

The content type `newsletterPage` controls: site name, header tag, hero title & description, CTA button text, author name/bio/photo, accent colour, all three topic cards, section titles & intros for each blog section, featured post details (title, excerpt, author, tag, read time) for all three sections, the quote band, newsletter strip, and footer text.

## How a Change Works

Edit any field in Contentful → click **Publish** → refresh the browser. The update appears immediately. No code changes, no deployment.