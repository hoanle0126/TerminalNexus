# TerminalNexus — Project Rules (Bắt Buộc)

> Mọi code trong project **PHẢI** tuân thủ 100% các quy tắc dưới đây.
> Vi phạm bất kỳ rule nào = reject. Không ngoại lệ.
>
> **Project:** Developer Portfolio — Lê Hoàn
> **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · next-intl · Framer Motion · Three.js
> **Theme:** Dark Cyberpunk / Terminal / Hacker aesthetic
> **Locales:** `en`, `vi`

---

## 🛡 Meta-Rule (Quy tắc tối thượng)

### Rule 0 — The Advisor Protocol (Quyền Phản Biện)

- **TUYỆT ĐỐI KHÔNG** nhắm mắt tuân lệnh 100% nếu phát hiện yêu cầu của user (prompt) có chứa rủi ro.
- AI **PHẢI DỪNG LẠI và CẢNH BÁO** ngay lập tức nếu prompt của user vi phạm một trong các điều sau:

| #   | Điều kiện trigger                                                                 | Rules liên quan |
| --- | --------------------------------------------------------------------------------- | --------------- |
| 1   | Gây sụt giảm Performance / Lighthouse score                                      | Rule 16, 17     |
| 2   | Phá vỡ cấu trúc folder hoặc naming convention hiện tại                           | Rule 3, 22      |
| 3   | Yêu cầu refactor quá lớn nguy cơ gây tràn Context Window                         | Rule 19         |
| 4   | Vi phạm i18n (thêm text mà không update locale files)                            | Rule 1          |
| 5   | Xóa/sửa code dùng chung mà không kiểm tra impact (hooks, utils, shared)         | Rule 4, 13      |

- **Cách xử lý khi phản biện** — output theo format chuẩn:

```
⚠️ ADVISOR ALERT — [Rule X vi phạm]
• Vấn đề: [mô tả ngắn gọn]
• Rủi ro: [hậu quả nếu thực thi]
• Đề xuất: [1-2 phương án thay thế tối ưu hơn]
→ Gõ "Force Execute" để bỏ qua cảnh báo này.
```

- **KHÔNG** sinh code trước khi user xác nhận phương án.
- AI **ĐƯỢC PHÉP** chủ động đề xuất cải tiến (refactor nhỏ, tối ưu logic) ngay cả khi user không yêu cầu — miễn là không thay đổi behavior hiện tại.

### Rule 0.1 — Ngôn ngữ giao tiếp (Mirror Language)

- AI **PHẢI** trả lời bằng **cùng ngôn ngữ** mà user sử dụng trong prompt.
- User hỏi **tiếng Việt** → AI trả lời **tiếng Việt**.
- User hỏi **tiếng Anh** → AI trả lời **tiếng Anh**.
- **Code, tên file, tên biến, commit message** vẫn giữ **tiếng Anh**.

---

## 🌐 i18n (Đa ngôn ngữ)

### Rule 1 — Không hard-code text

- Mọi text hiển thị cho user → `t("key")` qua `next-intl`.
- Khi thêm/sửa key → cập nhật **cả 2 file** `en.json` và `vi.json` đồng thời.
- Không được để file nào thiếu key so với file còn lại.

```tsx
// ✅
<h1>{t("hero.title")}</h1>

// ❌
<h1>Welcome to my portfolio</h1>
```

---

## 🏗 Architecture

### Rule 2 — 1 file = 1 component (Max 200 dòng / file)

- **Mỗi file chỉ chứa DUY NHẤT 1 component.** Không nhồi nhiều component vào cùng 1 file.
- 200 dòng là **giới hạn tối đa**, KHÔNG phải điều kiện để bắt đầu tách.
- Sub-component → **PHẢI tách ra file riêng**, không định nghĩa inline.
- Logic xử lý dài → tách ra Custom Hook (xem Rule 13).

```
// ✅ Mỗi component 1 file riêng
components/
├── projects/
│   ├── ProjectsSection.tsx
│   ├── ProjectBentoGrid.tsx
│   ├── ProjectFlipCard.tsx
│   └── projectsData.ts

// ❌ Nhồi nhiều component vào 1 file
components/
├── ProjectsSection.tsx  ← chứa cả Section + Grid + Card
```

### Rule 3 — Folder structure nhất quán

- Mỗi section lớn có folder riêng: `hero/`, `skills/`, `projects/`, `contact/`, `footer/`, `effects/`.
- Components dùng chung → `shared/` hoặc `ui/`.
- Components từ thư viện bên ngoài (ReactBits, UI-Layouts, Aceternity...) → giữ folder riêng: `reactbits/`, `ui-layouts/`, `ui/`.

```
src/components/
├── hero/              ← Hero section components
├── skills/            ← Skills section components
├── projects/          ← Projects section components
├── contact/           ← Contact section components
├── footer/            ← Footer components
├── effects/           ← Global visual effects
├── shared/            ← Shared/reusable components
├── reactbits/         ← ReactBits library components
├── ui-layouts/        ← UI-Layouts library components
└── ui/                ← shadcn/ui + Aceternity components
```

### Rule 4 — Component tái sử dụng

- Không tạo component UI trực tiếp trong page/section file.
- UI component dùng lại → nằm trong `@/components/ui/` hoặc `@/components/shared/`.
- Page/section chỉ **import và compose**, không define component inline.

---

## 🎨 Assets & SVG

### Rule 5 — SVG phải nằm trong component

- Có trong `lucide-react` hoặc `react-icons` → dùng library icon.
- Inline SVG **ĐƯỢC PHÉP** khi cần cho animation/effects — nhưng **PHẢI tách ra component riêng** trong `@/components/icons/` hoặc tương ứng.
- **TUYỆT ĐỐI KHÔNG** viết inline SVG trực tiếp trong page hay section file.

```tsx
// ✅ Tách ra component riêng
// components/icons/CyberShield.tsx
export function CyberShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2L..." />
    </svg>
  );
}

// Section chỉ import
import { CyberShield } from "@/components/icons/CyberShield";
<CyberShield className="w-5 h-5" />

// ❌ SVG trực tiếp trong section/page
<section>
  <svg viewBox="0 0 24 24"><path d="M12 2L..."/></svg>
</section>
```

---

## 💻 Code Quality

### Rule 6 — TypeScript strict

- **Không `any`**. Không `// @ts-ignore`. Không `// @ts-expect-error`.
- `as` chỉ dùng cho DOM refs khi bắt buộc.
- Mọi component phải có `interface` / `type` cho props.

### Rule 7 — Import alias `@/`

```tsx
// ✅
import { Button } from "@/components/ui/Button";

// ❌
import { Button } from "../../../components/ui/Button";
```

### Rule 8 — Không `console.log` trong production

- Debug xong → xóa.
- Nếu cần logging → dùng `if (process.env.NODE_ENV === 'development')`.

### Rule 9 — Không inline CSS decorative

- **KHÔNG** dùng `style={{}}` cho styling decorative (color, padding, margin, font...).
- `style={{}}` **CHỈ** cho phép khi giá trị dynamic tính toán runtime.
- Mọi styling → Tailwind classes.

```tsx
// ✅
<div className="bg-background p-4 rounded-lg">

// ✅ (dynamic runtime value)
<div style={{ transform: `translateX(${scrollOffset}px)` }}>

// ❌
<div style={{ backgroundColor: '#080c14', padding: '16px' }}>
```

---

## ♿ Accessibility

### Rule 10 — A11y bắt buộc

- `<img>` → phải có `alt` (lấy từ `t()` nếu là text mô tả).
- Button/link icon-only → `aria-label` bắt buộc.
- Keyboard: Tab, Enter, Escape phải hoạt động.
- Color contrast ≥ 4.5:1.
- **Semantic HTML5 landmarks** — dùng `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` thay vì nest `<div>` quá sâu.
- **KHÔNG** dùng `<a href="#">` — dùng `<button>` với `onClick` cho JS interactions.

---

## 📝 Convention

### Rule 11 — Naming convention

| Loại       | Format       | Ví dụ                |
| :--------- | :----------- | :------------------- |
| Components | PascalCase   | `ProjectFlipCard.tsx` |
| Hooks      | camelCase    | `useScrollSpy.ts`    |
| Utils      | camelCase    | `formatDate.ts`      |
| Constants  | UPPER_SNAKE  | `MAX_PROJECTS`       |
| Folders    | kebab-case   | `contact/`           |
| i18n keys  | dot.notation | `hero.greeting`      |
| Data files | camelCase    | `skillsData.ts`      |

### Rule 12 — Design tokens, không hard-code màu

- Dùng CSS Variables đã định nghĩa trong `globals.css` qua Tailwind.
- Không hardcode hex/rgb trong className.

```tsx
// ✅
className="text-foreground bg-background border-border"

// ❌
className="text-[#00ffff] bg-[#080c14] border-[rgba(0,255,255,0.1)]"
```

---

## ⚡ Performance & Animation

### Rule 13 — Tách UI và Business Logic (Custom Hooks)

- **File `.tsx` chỉ nhận data và render UI.** Không nhồi logic xử lý.
- Toàn bộ logic (scroll tracking, intersection observer, form validation...) → tách ra Custom Hooks riêng.

```tsx
// ✅ Hook riêng
// hooks/useScrollSpy.ts
export function useScrollSpy(sectionIds: string[]) {
  // ...logic
  return { activeSection };
}

// Component chỉ render
const { activeSection } = useScrollSpy(["hero", "skills", "projects"]);
```

### Rule 14 — Motion Tokens (Centralized Animations)

- **Không viết inline variants** rải rác trong từng file.
- Toàn bộ hiệu ứng dùng chung (`fadeIn`, `slideUp`, `stagger`...) → import từ `@/lib/motion.ts`.
- File `lib/motion.ts` là **single source of truth** cho animation config.

```tsx
// ✅ Dùng motion token
import { MOTION } from "@/lib/motion";
<motion.div {...MOTION.fadeIn}>...</motion.div>

// ❌ Viết inline lung tung
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
```

### Rule 15 — 4 breakpoints chuẩn

| Token | Pixels | Dùng cho             |
| :---- | :----- | :------------------- |
| `sm`  | 640px  | Mobile landscape     |
| `md`  | 768px  | Tablet               |
| `lg`  | 1024px | Desktop              |
| `xl`  | 1280px | Wide (max container) |

Không thêm custom breakpoint.

### Rule 16 — Performance Benchmarks

Trước khi hoàn thành feature, **PHẢI** đạt các ngưỡng sau:

| Metric                          | Target  |
| ------------------------------- | ------- |
| Performance                     | ≥ 90    |
| Accessibility                   | ≥ 95    |
| Best Practices                  | ≥ 90    |
| SEO                             | ≥ 95    |
| First Contentful Paint (FCP)    | < 1.5s  |
| Largest Contentful Paint (LCP)  | < 2.5s  |
| Interaction to Next Paint (INP) | < 200ms |
| Cumulative Layout Shift (CLS)   | < 0.1   |

- Image → dùng `next/image` với `priority` cho above-the-fold.
- Heavy client libraries (Three.js, GSAP) → `next/dynamic` với `{ ssr: false }`.

### Rule 17 — Animation Performance Constraints

- **Hover transitions**: max `200-300ms`, dùng `ease-in-out` hoặc custom cubic-bezier.
- **Scroll animations**: dùng `Intersection Observer` — **TUYỆT ĐỐI KHÔNG** dùng `scroll` event listener trực tiếp.
- **KHÔNG scroll hijack** — không override native browser scroll behavior.
- Chỉ animate thuộc tính **GPU-accelerated**: `transform`, `opacity`.
- **KHÔNG** animate: `width`, `height`, `top`, `left`, `margin`, `padding` (gây layout thrashing).

```tsx
// ✅ GPU-accelerated
transition: { transform: "translateY(0)", opacity: 1 }

// ❌ Layout thrashing
transition: { height: "auto", marginTop: "20px" }
```

### Rule 18 — 8px Grid Spacing System

- Mọi `padding`, `margin`, `gap` → **PHẢI là bội số 8px**.
- Giá trị cho phép: `4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160px`.
- `4px` chỉ dùng cho micro-spacing (icon gap, border-radius nhỏ).
- **KHÔNG** dùng số lẻ tùy ý (`13px`, `37px`, `15px`...).

```tsx
// ✅
className="p-4 gap-6"  // 16px, 24px — bội số 8

// ❌
className="p-[13px] gap-[7px]"  // số lẻ, phá grid
```

---

## 🧹 Console & Hydration

### Rule 20 — Console sạch bóng, Hydration = 0

- **KHÔNG được có** bất kỳ `warning`, `error`, hay `hydration mismatch` nào trong browser console.
- Hydration error = **0**. Nếu xuất hiện → fix **ngay lập tức**.
- Server HTML phải **khớp 100%** với Client HTML — không dùng `typeof window`, `Date.now()`, `Math.random()` trong initial render mà không wrap trong `useEffect`.
- Trước khi hoàn thành feature → **PHẢI kiểm tra** browser console.

---

## 📝 Git

### Rule 21 — Commit message rõ ràng

```
feat(hero): add typing animation effect
fix(navbar): resolve active state on scroll
style(skills): adjust network graph spacing
i18n(common): add Vietnamese translations
refactor(effects): extract BackgroundNoise into separate component
```

---

## 🧠 Context Management

### Rule 22 — Hiểu cấu trúc project trước khi code

- **TUYỆT ĐỐI KHÔNG** bắt đầu code khi chưa hiểu cấu trúc hiện tại.
- Trước khi code, AI **PHẢI đọc và hiểu** folder structure, naming convention, và patterns đang dùng.
- Code theo đúng pattern đã có — **KHÔNG tự sáng tạo cấu trúc mới**.
- Checklist trước khi code:
  1. Đọc folder structure hiện tại
  2. Xác nhận naming convention đang dùng
  3. Xác nhận pattern tách component đang dùng
  4. Code theo đúng pattern đã có

### Rule 23 — Giới hạn scope per session

- Mỗi session chỉ làm **tối đa 2 sections/features**.
- Nếu task phức tạp → **chia nhỏ thành sub-tasks**, commit sau mỗi sub-task.
- **KHÔNG** cố refactor + implement + test tất cả trong 1 session.
- Khi context dài → **chủ động thông báo** user để bắt đầu session mới.

---

## 📦 Config-Driven Architecture

### Rule 24 — Personal Data = Config Only

- **TUYỆT ĐỐI KHÔNG** hardcode thông tin cá nhân (tên, URL, social links, stats) trong component files.
- Toàn bộ personal data → import từ `src/config/`.
- Components chỉ **nhận data từ config và render** — không chứa data cá nhân.

```
src/config/
├── site.ts          ← name, domain, social links, SEO meta
├── hero.ts          ← stats, code editor content, terminal output
├── navigation.ts    ← nav items + section IDs
├── experience.ts    ← career timeline
├── skills.ts        ← skill clusters + items
└── projects.ts      ← project entries
```

```tsx
// ✅ Import từ config
import { siteConfig } from "@/config/site";
<span>{siteConfig.displayName}</span>

// ❌ Hardcode trong component
<span>LE HOAN</span>
```

- Khi thêm feature mới cần personal data → **PHẢI thêm vào config trước**, rồi mới import trong component.
- Social links → dùng `resolveSocialIcon()` từ `@/components/shared/socialIcons.tsx` để map icon name → Lucide component.
