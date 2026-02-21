# AI Lab System - UI Migration Prompt

> **Purpose**: This is a structured prompt for an AI coding assistant (Cursor, Copilot, Claude, etc.) to migrate the LearnAI UI design into your existing AI Lab system.
> **Source Repository**: https://github.com/kaiyin1028/v0-ai-learning-platform

---

## PROMPT START

You are a senior full-stack engineer. Your task is to migrate a complete UI design system from the **LearnAI** reference project into our existing **AI Lab** system. The reference UI is a static Next.js prototype (no backend) — you need to integrate it with our existing backend, APIs, authentication, and database.

---

### 1. PROJECT CONTEXT

**Reference UI Repository**: https://github.com/kaiyin1028/v0-ai-learning-platform

**Reference Tech Stack** (UI only, no backend):
- Next.js 16 (App Router)
- React 19
- TypeScript 5.7
- Tailwind CSS v4 (no `tailwind.config.js`, configured via `globals.css` `@theme inline`)
- shadcn/ui (Radix UI primitives + CVA)
- Lucide React icons
- Fonts: Inter (Latin) + Noto Sans TC (Chinese)

**Key Dependencies** (from `package.json`):
```json
{
  "next": "16.1.6",
  "react": "19.2.4",
  "tailwindcss": "^4.1.9",
  "lucide-react": "^0.564.0",
  "@radix-ui/react-*": "various",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1",
  "sonner": "^1.7.1",
  "vaul": "^1.1.2",
  "recharts": "2.15.0"
}
```

---

### 2. DESIGN SYSTEM (MUST PRESERVE)

#### 2.1 Color Tokens (oklch format, in `app/globals.css`)

```
Primary:    oklch(0.55 0.18 250)  — Blue, educational & trustworthy
Accent:     oklch(0.70 0.15 180)  — Teal/cyan, complementary
Background: oklch(0.99 0.002 240) — Near-white with blue tint
Foreground: oklch(0.15 0.02 250)  — Near-black with blue tint
Card:       oklch(1 0 0)          — Pure white
Muted:      oklch(0.96 0.01 250)  — Light gray with blue tint
Border:     oklch(0.92 0.01 250)  — Subtle border
```

Full dark mode tokens are also defined. See `globals.css` `:root` and `.dark` blocks.

#### 2.2 Typography

- **Headings**: Inter (font-sans), weights 600-700
- **Body**: Inter + Noto Sans TC fallback, weight 400-500
- **Mono**: Geist Mono
- Scale: H1=text-4xl/5xl/6xl, H2=text-3xl/4xl, H3=text-lg/xl, Body=text-sm/base, Caption=text-xs

#### 2.3 Spacing & Layout

- Border radius: `--radius: 0.75rem` (12px)
- Cards use `rounded-2xl` (16px)
- Page containers: `max-w-7xl mx-auto px-4 lg:px-8`
- App content: `max-w-4xl` or `max-w-6xl` depending on page
- Section vertical padding: `py-20 lg:py-28`
- Flexbox-first layout, Grid for multi-column

#### 2.4 Component Patterns

- **Cards**: `rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-md`
- **Buttons**: shadcn Button with `min-h-[44px]` for touch targets
- **Badge/Tag**: shadcn Badge with `variant="secondary"` for metadata
- **Empty State**: Icon (opacity-30) + title + subtitle + optional CTA
- **Loading State**: `Loader2` with `animate-spin` + contextual text
- **Hover Effects**: `transition-all hover:shadow-lg hover:shadow-primary/5`

---

### 3. FILE STRUCTURE MAP

```
app/
  layout.tsx              # Root layout (fonts, metadata, SEO)
  globals.css             # Design tokens, Tailwind v4 @theme
  page.tsx                # Landing page (assembles 8 sections)
  app/
    layout.tsx            # App shell (sidebar + mobile nav)
    page.tsx              # Chat / Conversation page
    memory/
      page.tsx            # Memory / Knowledge base management
    agent-builder/
      page.tsx            # Agent builder (templates, editor, tester)
    marketplace/
      page.tsx            # Agent marketplace / favorites
    image-gen/
      page.tsx            # AI Image generation workbench
    image-edit/
      page.tsx            # AI Image editing workbench

components/
  landing/
    navbar.tsx            # Sticky top nav with mobile sheet
    hero.tsx              # Hero section with product preview
    features.tsx          # 6-feature grid
    how-it-works.tsx      # 4-step process
    examples.tsx          # Tabbed examples (chat/agents/images)
    social-proof.tsx      # Stats + logos + testimonials
    pricing.tsx           # 3-tier pricing (Free/Pro/School)
    faq.tsx               # Accordion FAQ
    footer.tsx            # 4-column footer + bottom bar
  ui/
    *.tsx                 # shadcn/ui primitives (56 components)
```

---

### 4. PAGE-BY-PAGE SPECIFICATION

#### 4.1 Landing Page (`/`)

Assembles 8 sections in order:
1. **Navbar** — Sticky, blur backdrop, logo + 5 nav links + CTA buttons. Mobile: Sheet sidebar.
2. **Hero** — Badge announcement, H1 with `<span class="text-primary">` highlight, subtitle, 2 CTAs, 3 stat chips, product preview (mock chat window with 3 messages).
3. **Features** — Section header + 6 cards in `sm:grid-cols-2 lg:grid-cols-3` grid. Each: icon in colored circle + title + description.
4. **How It Works** — 4 steps in horizontal layout with connector lines. Each: icon circle + step number + title + description.
5. **Examples** — Tabbed (Chat/Agents/Images). Chat: Q&A cards. Agents: card grid with icon, stats, tags. Images: gallery with style badges.
6. **Social Proof** — 4 stats, 6 logo badges, 3 testimonial cards with avatar + rating stars.
7. **Pricing** — 3 plans (Free NT$0, Pro NT$149/mo, School custom). "Most popular" badge on Pro. Feature checklists with Check icons.
8. **FAQ** — Accordion with 6 items.
9. **Footer** — 5-column: brand + 4 link groups (Product, Resources, Company, Legal).

#### 4.2 App Shell (`/app/layout.tsx`)

- **Desktop**: 256px fixed sidebar (left) + main content area
- **Mobile**: Hidden sidebar, Sheet-based slide-out via hamburger button in 56px top bar
- **Sidebar Structure**:
  - Logo (h-16 header)
  - "New Chat" button
  - 6 nav items: AI Chat, Memory, Agent Builder, Marketplace, Image Gen, Image Edit
  - "Recent Chats" section (4 sample items)
  - User section at bottom (avatar + name + plan + logout)
- **Active State**: `bg-sidebar-accent text-sidebar-accent-foreground`

#### 4.3 Chat Page (`/app`)

- **Top bar**: Model selector (Select dropdown: LearnAI Pro / Fast / GPT-4 / Claude) + Memory management link
- **Message area**: ScrollArea, max-w-3xl centered. AI messages: avatar circle + bubble. User messages: right-aligned primary-colored bubble.
- **Suggestion chips**: 4 preset questions shown on empty state (`sm:grid-cols-2`)
- **Message actions**: Copy, Like, Dislike, Regenerate buttons
- **Input area**: Rounded container with attach button + auto-resize textarea + send button. Below: AI disclaimer text.
- **States**: Loading (Loader2 spinner + "Thinking..."), Empty (suggestions grid)

#### 4.4 Memory Page (`/app/memory`)

- **Header**: Brain icon + title + global memory toggle (Switch)
- **Disabled banner**: Yellow warning when global memory is off
- **Search + Filter**: Search input + category pill buttons (All / Learning Style / Progress / Interests / Personal / Language)
- **Stats grid**: 3 cards (Total / Active / Categories) in `grid-cols-3`
- **Memory list**: Cards with content + category badge + date + source. Each has individual Switch toggle + delete button.
- **Empty state**: BookOpen icon + contextual message

**Data Shape**:
```ts
interface MemoryItem {
  id: string
  content: string       // "Prefers metaphors for abstract concepts"
  category: string      // "Learning Style" | "Progress" | "Interests" | "Personal" | "Language"
  source: string        // "Inferred from chat" | "User provided"
  createdAt: string
  enabled: boolean
}
```

#### 4.5 Agent Builder (`/app/agent-builder`)

3 tabs: My Agents | Templates | Editor

- **My Agents**: Grid with "Create New" dashed button + existing agent cards (icon, name, desc, status badge, edit/delete)
- **Templates**: 6 cards (Legal, Medical, Code, Writing, Business, Blank). Click → prefills editor.
- **Editor** (2-column layout):
  - Left: Basic Settings card (name, description, model selector) + System Prompt card (textarea, mono font) + Tools & Permissions card (Web Search / Knowledge Base / Code Execution, each with Switch)
  - Right: Test Area card with mock chat interface + input
- **Action bar** (when editing): Cancel, Save, Publish buttons

**Data Shape**:
```ts
interface AgentConfig {
  name: string
  description: string
  systemPrompt: string
  model: "learnai-pro" | "gpt-4" | "claude"
  temperature: number
  tools: {
    webSearch: boolean
    knowledgeBase: boolean
    codeExecution: boolean
  }
  status: "draft" | "published"
}
```

#### 4.6 Marketplace (`/app/marketplace`)

- **Tabs**: Explore | Favorites (with count badge)
- **Search**: Full-text search across name/description/tags
- **Category pills**: All / Humanities / Science / Engineering / Language
- **Agent cards**: Icon + favorite heart + name + description (line-clamp-2) + tags + stats (users + rating) + "Use" button + author
- **Favorites empty state**: Heart icon + CTA to browse marketplace

**Data Shape**:
```ts
interface MarketplaceAgent {
  id: string
  name: string
  description: string
  icon: LucideIcon
  author: string
  uses: string       // "12.5K"
  rating: string     // "4.9"
  tags: string[]
  category: string
  isFavorite: boolean
}
```

#### 4.7 Image Generation (`/app/image-gen`)

- **Tabs**: Generate | Gallery (with count badge)
- **Generate tab** (2-column: main + 320px sidebar):
  - Main: Prompt textarea + quick-tag buttons + Generate button. Below: preview/result area (square aspect ratio).
  - Sidebar: Style grid (8 options, 2-col), Ratio selector, Quality slider (25-100), Quota indicator with progress bar.
- **Gallery tab**: 3-column card grid. Each: square preview + style/ratio badges + timestamp + download/delete.
- **States**: Generating (spinner animation + "10-30 seconds"), Empty gallery, Result preview with action buttons.

#### 4.8 Image Editing (`/app/image-edit`)

Full-height 3-panel layout:
- **Left**: Tool sidebar (272px desktop, horizontal scroll mobile). 6 tools: Repaint, Style Transfer, Expand, Remove BG, Upscale, Object Remove.
- **Center**: Toolbar (undo/redo/zoom) + Canvas area. Upload dropzone when no image. Tool-specific overlays.
- **Right**: Contextual settings panel (272px, appears when tool selected + image loaded). Different controls per tool:
  - Repaint: brush size slider + description textarea
  - Style Transfer: 8 style buttons + intensity slider
  - Expand: direction buttons + ratio slider
  - Remove BG: one-click info
  - Upscale: 2x/4x/8x buttons
  - Object Remove: brush size slider

---

### 5. MIGRATION INSTRUCTIONS

Follow these steps in order:

#### Step 1: Setup Design System
1. Copy `globals.css` color tokens into your existing CSS.
2. If your project uses Tailwind v3, convert the `@theme inline` block to `tailwind.config.js` `extend.colors` format.
3. Add Inter + Noto Sans TC fonts.
4. Verify all shadcn/ui components needed are installed (Button, Badge, Tabs, Input, Textarea, Label, Select, Switch, Slider, Sheet, ScrollArea, Accordion, Avatar, Dialog, Tooltip).

#### Step 2: Integrate Landing Page
1. Copy `components/landing/*.tsx` (9 files).
2. Replace hardcoded links (`/app`) with your actual auth/login routes.
3. Replace placeholder data (testimonials, stats, logos) with real data.
4. Update pricing to match your actual plans and pricing.
5. Update FAQ to match your product specifics.
6. **Brand rename**: Find & replace "LearnAI" with your product name throughout.

#### Step 3: Integrate App Shell
1. Copy the sidebar layout pattern from `app/app/layout.tsx`.
2. Map the 6 nav items to your actual routes.
3. Replace the static "Recent Chats" with real data from your chat history API.
4. Replace the static user section with your auth context/session.

#### Step 4: Integrate Core Pages
For each page, follow this pattern:
1. Copy the UI component structure.
2. Replace `useState` mock data with real API calls (SWR recommended).
3. Wire up interactive elements (buttons, forms, toggles) to your real API endpoints.
4. Implement proper error boundaries and loading states (patterns already in the UI).

**Specific integration points per page**:

| Page | Replace Mock With | Key APIs Needed |
|------|------------------|----------------|
| Chat | Simulated timeout → Real AI streaming | POST /api/chat (streaming), GET /api/conversations |
| Memory | Static array → DB query | GET/PUT/DELETE /api/memories |
| Agent Builder | setTimeout → Real API | POST /api/agents, PUT /api/agents/:id, POST /api/agents/:id/test |
| Marketplace | Static array → DB query | GET /api/marketplace, POST /api/favorites |
| Image Gen | setTimeout → Real generation | POST /api/images/generate, GET /api/images |
| Image Edit | setTimeout → Real processing | POST /api/images/edit, POST /api/images/upload |

#### Step 5: Add Authentication
The reference UI has no auth. You need to:
1. Wrap `/app/*` routes with your auth middleware/guard.
2. Replace the static user section in the sidebar with real user data.
3. Add login/register pages (the landing "Login" and "Get Started" buttons point to `/app`).

#### Step 6: Add Real-time Features
1. Chat streaming: Replace the `setTimeout` mock in chat page with AI SDK `useChat` hook or SSE.
2. Image generation progress: Replace static loading with real progress callbacks.

---

### 6. IMPORTANT COMPATIBILITY NOTES

1. **Tailwind v4 vs v3**: The reference uses Tailwind v4 (`@theme inline` in CSS). If your project uses v3, you need to convert all design tokens to `tailwind.config.js` format. The utility classes themselves (`bg-primary`, `text-foreground`, etc.) are the same.

2. **Next.js 16 specifics**: `params`, `searchParams`, `headers`, `cookies` must be `await`ed in Server Components. The reference uses `"use client"` for all interactive pages, so this mainly affects server-side data fetching you add.

3. **shadcn/ui components**: The reference assumes all 56 shadcn components are installed. Only install what you need. Critical ones: Button, Badge, Input, Textarea, Label, Select, Tabs, Switch, Slider, Sheet, ScrollArea, Accordion, Avatar, Dialog.

4. **Chinese content**: All UI text is in Traditional Chinese (zh-Hant). If you need i18n, extract all string literals into a locale file. Key strings are in:
   - Landing: ~200 strings across 9 component files
   - App: ~150 strings across 7 page/layout files

5. **Icons**: All icons use `lucide-react`. If your project uses a different icon library, you need to map ~60 unique icons.

---

### 7. QUICK START CHECKLIST

- [ ] Clone reference repo and run `pnpm install && pnpm dev` to see the UI
- [ ] Copy `globals.css` design tokens into your project
- [ ] Install missing shadcn/ui components
- [ ] Copy landing components → adjust routes, branding, content
- [ ] Copy app layout → wire up real auth and nav routes
- [ ] Copy each page → replace mock data with real API calls
- [ ] Add authentication layer
- [ ] Add real AI streaming for chat
- [ ] Add real image generation/editing API integration
- [ ] Replace all "LearnAI" branding with your product name
- [ ] Test responsive layout (mobile sidebar, touch targets)
- [ ] Test dark mode if applicable

---

### 8. REFERENCE SCREENSHOTS MAPPING

| Route | What You'll See | File |
|-------|----------------|------|
| `/` | Full landing page (scroll) | `app/page.tsx` |
| `/app` | Chat interface with sidebar | `app/app/page.tsx` |
| `/app/memory` | Memory management grid | `app/app/memory/page.tsx` |
| `/app/agent-builder` | Agent builder with 3 tabs | `app/app/agent-builder/page.tsx` |
| `/app/marketplace` | Agent marketplace cards | `app/app/marketplace/page.tsx` |
| `/app/image-gen` | Image generation workbench | `app/app/image-gen/page.tsx` |
| `/app/image-edit` | Image editing 3-panel layout | `app/app/image-edit/page.tsx` |

## PROMPT END
