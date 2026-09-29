# Design QA

**Findings**

- No actionable P0, P1, or P2 findings remain.
- [P3] The approved concept includes extra field notes and small side ornaments that are not reproduced in the implementation. The implementation keeps the chapter route, cinematic landscape, palette, and editorial typography while simplifying the marginalia.

**Open Questions**

- None. The agreed direction is the option 2 journey layout and artwork, with the option 3 light theme and a complementary dark theme.

**Comparison target and evidence**

- Source visual truth: `C:\Users\BSetva\.codex\generated_images\01a0e1a1-08db-76c1-95f6-d034b89f7a16\exec-19bbeb81-0bb7-4b64-b9c9-8401caa7474d.png` (2103 × 748 px; paired dark and light concepts).
- Implementation: `http://127.0.0.1:3000/portfolio-website/`.
- Comparison capture: CUA browser screenshots were captured inline in the task record with the approved concept and implementation shown together. The temporary comparison page was `http://127.0.0.1:3000/portfolio-website/qa-compare.html?theme=light` and `...?theme=dark`; those temporary comparison files were removed after capture. CUA did not expose a filesystem path for its inline screenshots, so no PNG capture is persisted in the repository.
- Viewport/state: matched hero panes at approximately 1050 × 750 CSS px, desktop, first-screen hero; each source theme compared to the same implementation theme. The paired source image was split by theme and scaled to the pane; the side-by-side browser capture was scaled to fit the 1280 × 720 browser window.
- Full-view evidence: both light and dark comparisons showed the same chapter-led hero, type hierarchy, CTA placement, and landscape art direction. Navigation, résumé destination, social links, and the four chapter anchors were visible and/or present in the implementation accessibility tree.
- Focused comparison: not needed; the source visual is a single hero screen and the full hero pane keeps the heading, artwork, chapter route, and CTAs visible together.

**Required fidelity surfaces**

- Typography: large serif name, restrained mono eyebrow/role labels, and small sans-serif navigation preserve the editorial hierarchy. The implementation uses available system font stacks rather than embedding a separate font file.
- Layout and spacing: centered navigation, left-aligned hero copy, split copy/art composition, and bottom chapter rail retain the reference rhythm. The implementation leaves out the narrow outer marginalia.
- Colors: paper/ink contrast and cobalt light-theme accent match the selected light direction; charcoal and orange accent carry the dark direction. Theme switching changes the palette without changing the story layout.
- Imagery: the generated landscape places the traveler, robot, route markers, and futuristic city in the hero. The light-theme paper fade initially washed out the traveler; the gradient was tightened and the revised screenshot shows the subject more clearly while preserving readable copy.
- Copy: the hero and sections tell a concise learning/building journey, with project, skills, résumé, and contact paths tied to Bhoomik's profile.

**Comparison history**

1. Initial paired comparison identified a P2 issue: the light-theme gradient washed out the traveler at the visual center of the hero.
2. Reduced the light scrim opacity and moved its fade toward the text column in `src/app/globals.css`.
3. Re-captured and compared the light theme after the change; the figure and robot are more legible, and the copy remains readable. Rechecked the dark theme; it remains intact. No P0/P1/P2 findings remain.

**Implementation Checklist**

- [x] Compare approved light and dark concepts against the rendered implementation.
- [x] Fix the light-theme hero image washout and re-capture.
- [x] Confirm the résumé and hero image are included in the static export.
- [x] Keep private context documents out of the export.

**Follow-up Polish**

- Reintroduce a small amount of hand-written field-note marginalia if desired; it is decorative and does not block the selected direction.

final result: passed
