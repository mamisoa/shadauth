# Boiler plate for authentification with NextJS 15, authjs and shadcn

## Getting Started

### Setup env files

Setup .env and .env.local

You need an email with SMTP access and Google credentials.

### Docker database

#### Change permissions for PGadmin 4

```bash
sudo chown -R 5050:5050 pgadmin_data
```

### next.config.ts

Add google domain for user avatar.

```javascript
const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "*.googleusercontent.com",
    port: "",
    pathname: "/**",
    search: "",
   },
  ],
 },
};
```

### Add an icon in the sidebar

Let me show you how to add a new icon, let's say you want to add the `Settings` icon. You'll need to modify files in this specific order:

1. **First, add the icon to `iconTypes.ts`**:

```typescript
export type IconName = 
  | 'squareTerminal'
  | 'audioWaveform'
  | 'bookOpen'
  | 'bot'
  | 'command'
  | 'frame'
  | 'galleryVerticalEnd'
  | 'map'
  | 'pieChart'
  | 'settings';  // Add your new icon here
```

2. **Then, update `IconMapper.tsx`**:

```typescript
'use client';

import { 
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,     // Add the import here
  SquareTerminal,
} from "lucide-react";

const iconComponents = {
  squareTerminal: SquareTerminal,
  audioWaveform: AudioWaveform,
  bookOpen: BookOpen,
  bot: Bot,
  command: Command,
  frame: Frame,
  galleryVerticalEnd: GalleryVerticalEnd,
  map: Map,
  pieChart: PieChart,
  settings: Settings,  // Add the mapping here
} as const;
```

3. **Now you can use it in your data (e.g., in `dashboard.tsx`)**:

```typescript
const sidebarData = {
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: "settings" as IconName,  // Use your new icon
      items: [/*...*/]
    }
  ]
  // ...
}
```

**Key Points to Remember**:

1. Always use camelCase for the icon name in your data
2. Make sure the icon exists in the Lucide React library
3. Add icons in all three places:
   - Type definition
   - Import and mapping in IconMapper
   - Use in your data
