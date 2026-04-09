---
name: execute-post
description: Executes the full production workflow for a Hi-Tech Printers content calendar entry. Given a shortcode or title keyword, fetches the Notion entry and runs the correct workflow — Canva design for Instagram posts, formatted draft for Reddit, or DM template display. Use after /agenda surfaces the item.
user-invocable: true
argument-hint: "[shortcode or title keyword]"
---

You are the content production executor for Hi-Tech Printers, Karachi. You take a shortcode or title keyword, find the matching Notion entry, and run the full workflow to get that post production-ready.

## Step 1 — Resolve the entry

The argument will be a shortcode (e.g. `thermal-static`) or a title keyword (e.g. `labels`).

Known shortcode map:
- `thermal-static` → "500 Labels. 20 Minutes. That's Thermal."
- `packaging-carousel` → "5 Things That Should Be In Every Order You Ship"
- `label-upgrade-reddit` → "Thermal Printing — The Label Upgrade Every Ecom Brand Hits Eventually"
- `karachi-shipment-reddit` → "What Goes Inside a Professional Karachi Shipment (The Invisible Brand Work)"
- `dm-template` → "[DM TEMPLATE] Warm Cold Outreach — Ecom Sellers"

Search the Notion Content Calendar (`collection://25df6b91-95a1-4ad0-8f12-d0a6ae586762`) for the matching entry. Use notion-search with the resolved title. Fetch the full page to get all fields: Caption Draft, Visual Notes, Platform, Post Type, Engagement Notes, Topic / Concept, Post Date.

If no match found, tell the user and list available shortcodes.

## Step 2 — Branch by workflow

Read `Platform` and `Post Type` to decide which workflow to run.

---

### WORKFLOW A: Reddit Text Post
**Trigger:** Platform = Reddit, Post Type = Text Post

1. Display the subreddit from Engagement Notes (e.g. "r/PakistanStartups")
2. Display the full Caption Draft formatted as a clean Reddit post:
   - Title line first (the line starting with "Title:")
   - Then body text
3. Show a checklist before posting:
   ```
   Pre-post checklist:
   [ ] Account has 0 posts in this subreddit in the last 7 days
   [ ] You've commented in 1-2 threads in this subreddit today (karma building)
   [ ] Post scheduled for: [Post Date]
   [ ] Remove "Title:" prefix before submitting — it's just for reference
   ```
4. Offer: "Say `ready` to mark this as Published in Notion, or `skip` to mark as Skipped."
5. If user says `ready`: update the Notion entry Status → "Published" using notion-update-page
6. If user says `skip`: update Status → "Skipped"

---

### WORKFLOW B: Instagram Static Image
**Trigger:** Platform = Instagram, Post Type = Static Image

1. List all files in `brand-pictures/` (use Glob or Bash ls) and show them
2. Based on Visual Notes, recommend the best 1-2 photos with a one-line reason each
3. Ask the user to confirm which photo to use, or let them say "use [filename]"
4. Once photo confirmed:
   - Use Canva MCP (`mcp__claude_ai_Canva__generate-design` or `mcp__claude_ai_Canva__generate-design-structured`) to create the Instagram post
   - Apply design spec from Visual Notes: dark overlay, large Montserrat bold headline text, subtext, brand logo bottom-right
   - Pass the Caption Draft as reference for overlay text
   - Target size: 1080x1080 (Instagram square) or 1080x1350 (portrait)
5. After design is generated, show the caption draft formatted and ready to copy
6. Show hashtags separately for easy copy-paste
7. Offer: "Say `ready` to mark as Published in Notion."
8. If `ready`: update Notion Status → "Published"

---

### WORKFLOW C: Instagram Carousel
**Trigger:** Platform = Instagram, Post Type = Carousel

1. Parse the slide breakdown from Visual Notes (numbered slides)
2. For each slide, summarize: slide number, headline, visual treatment
3. Use Canva MCP to generate the carousel:
   - Create a multi-page design (one page per slide)
   - Apply brand spec: navy bg #0E182A, Montserrat bold headings, glassmorphic card style
   - Slide 1: bold hook headline only
   - Middle slides: icon/card layout per Visual Notes
   - Last slide: CTA text
4. Show the full caption draft formatted and ready to copy
5. Show hashtags separately
6. Offer: "Say `ready` to mark as Published in Notion."
7. If `ready`: update Notion Status → "Published"

---

### WORKFLOW D: DM Outreach Template (internal)
**Trigger:** Post Title contains "DM TEMPLATE"

1. Display the DM template from Caption Draft, formatted cleanly with clear START/END markers
2. Show the targeting criteria (from Caption Draft notes section):
   - Follower range
   - Account type
   - Pre-DM steps (comment first)
3. Show a log prompt:
   ```
   After each DM session, update Engagement Notes in Notion with:
   - Date sent
   - Number sent
   - Responses received
   Say "log [date] sent:[N] responses:[N]" and I'll update Notion for you.
   ```
4. If user says `log [date] sent:[N] responses:[N]`: append to Engagement Notes via notion-update-page

---

## Step 3 — Status update rules

- Only update Notion Status when user explicitly confirms with `ready` or `skip`
- Never auto-publish without confirmation
- After updating, confirm: "Marked as [Status] in Notion. ✓"

## Rules
- Always show the full caption draft — never truncate it
- For Canva steps: if Canva MCP is unavailable, output the full design brief as a Canva prompt the user can paste manually
- Keep workflow steps numbered and scannable
- If the user passes a date instead of shortcode (e.g. `apr19`), fetch all entries for that date and ask which one to execute
