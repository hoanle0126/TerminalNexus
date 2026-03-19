# TerminalNexus — Template Roadmap

> Mục tiêu: biến TerminalNexus thành template bán được, vừa giữ làm portfolio cá nhân.

---

## Phase 1: Config-Driven Data ✅ HOÀN THÀNH

Tách toàn bộ personal data ra khỏi code, người mua chỉ cần sửa file config.

- [x] Tạo `src/config/site.ts` — thông tin chung (name, title, description, avatar, social links, SEO meta)
- [x] Tạo `src/config/projects.ts` — danh sách projects (title, description, tags, image, links)
- [x] Tạo `src/config/experience.ts` — timeline kinh nghiệm (company, role, date, description)
- [x] Tạo `src/config/skills.ts` — skills graph data (clusters, items, levels)
- [x] Tạo `src/config/navigation.ts` — nav items, CTA text
- [x] Tạo `src/config/hero.ts` — stats, code editor content, terminal output
- [x] Refactor tất cả component để đọc từ config thay vì hardcode
- [x] Loại bỏ references cá nhân ("Lê Hoàn") khỏi code — chỉ giữ trong config
- [x] Tạo `socialIcons.tsx` helper — resolve icon names → Lucide components

---

## Phase 2: Theming & Customization ✅ HOÀN THÀNH

Cho phép người mua dễ dàng đổi giao diện.

- [x] Tách accent color ra CSS variable (`--accent-primary`, `--accent-secondary`)
- [x] Hỗ trợ ít nhất 3 preset color schemes (Cyan, Purple, Green + Rose, Amber)
- [x] Tạo `src/config/theme.ts` — font family, border radius, animation speed
- [x] Light mode support (optional toggle via `colorMode: "dark" | "light" | "system"`)
- [x] Cursor style options (target cursor, dot, default)

---

## Phase 3: Documentation ✅ HOÀN THÀNH

README và hướng dẫn cho người mua.

- [x] Viết lại `README.md` — setup guide, feature list, screenshots, tech stack
- [x] Tạo `docs/CUSTOMIZATION.md` — hướng dẫn sửa config, đổi theme, thêm sections
- [x] Tạo `docs/DEPLOYMENT.md` — deploy lên Vercel/Netlify/Docker
- [x] Tạo `docs/STRUCTURE.md` — giải thích cấu trúc folder và component
- [x] Thêm inline comments cho các file config (giải thích từng field)
- [x] Tạo `.env.example` nếu cần API keys

---

## Phase 4: Template Quality & Polish ✅ HOÀN THÀNH

Nâng chất lượng lên mức premium.

- [x] Lighthouse audit — đạt 90+ tất cả metrics
- [x] Responsive testing — mobile, tablet, desktop, ultrawide
- [x] Accessibility audit — WCAG AA compliance  
- [x] SEO meta tags đầy đủ (Open Graph, Twitter Card, JSON-LD)
- [x] Loading states / skeleton screens cho mọi section
- [x] 404 page custom
- [x] Sitemap + robots.txt tự động
- [x] Analytics integration option (GA4, Plausible)

---

## Phase 5: Packaging & Distribution ✅ HOÀN THÀNH

Chuẩn bị bán.

- [x] Chọn license — Dual License: MIT (personal) + Commercial $29 (1 project) / $79 (extended)
- [x] Tạo demo site config — `src/config/demo.ts` với fictional persona "Alex Chen"
- [x] Screenshot / preview video — checklist trong `docs/LAUNCH_PLAN.md`
- [x] Setup trên kênh bán — pricing guide + `scripts/bundle.sh` để đóng gói ZIP
- [x] Landing page cho template — README đẹp + GitHub social preview
- [x] Product Hunt launch plan — `docs/LAUNCH_PLAN.md` đầy đủ (copy, timeline, pricing)

---

## Phase 6: Premium Features (Nếu muốn tier cao hơn)

- [ ] Blog section (MDX support)
- [ ] Testimonials section
- [ ] Resume/CV download (PDF generation)
- [ ] Contact form với backend (Resend/SendGrid)
- [ ] CMS integration (Contentful/Sanity) 
- [ ] Multiple layout variants (1-column, sidebar, dashboard style)

---

## Notes

- **Phase 1 nên làm trước** — đây là thay đổi lớn nhất và quan trọng nhất
- Mỗi phase commit riêng, tag version (v0.1, v0.2...)
- Giữ codebase dual-purpose: nhánh `main` = template, nhánh `personal` = portfolio riêng
