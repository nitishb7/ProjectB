# EduTok - Educational Short-Video Platform

A comprehensive, TikTok-style educational platform built with React and Tailwind CSS. Features a full mobile + responsive web interface with advanced creator tools, monetization, and community features.

## 🎓 Features

### User Experience
- **Login & Onboarding** - Multi-step authentication with social login options and personalized interest selection
- **TikTok-Style Video Feed** - Vertical scrolling feed with swipe navigation
- **Interactive Video Player** - Like, comment, share, gift, and bookmark functionality
- **Comment System** - Full-featured comment drawer with replies, likes, and sorting
- **Search & Discovery** - Advanced search with filters, trending topics, and category browsing
- **Notifications** - Real-time notification center with read/unread tracking

### Creator Tools
- **Video Creation** - Record or upload videos with category selection
- **Video Editor** - Trim, add effects, text overlays, and music
- **Creator Studio** - Comprehensive analytics dashboard with:
  - Views, followers, engagement, and watch time metrics
  - Interactive charts (views over time, engagement breakdown)
  - Top performing videos analysis
  - Audience demographics and insights
- **Content Management** - Upload flow with title, description, and category selection

### Monetization
- **Earnings Dashboard** - Revenue tracking with:
  - Total balance and growth metrics
  - Revenue breakdown by source (ads, gifts, tips, sponsored)
  - Transaction history
  - Payment method management
  - Tax information and statements
- **Token Wallet** - Virtual currency system:
  - Purchase token packages with bonuses
  - Send and receive gifts
  - Transaction history
  - Multiple payment methods (Credit card, Apple Pay, Google Pay)
- **Gifting System** - Send virtual gifts to creators:
  - Basic, premium, and exclusive gift tiers
  - Custom messages with gifts
  - Real-time gift animations

### Profile & Settings
- **User Profiles** - Display videos, liked content, and saved items
- **Creator Dashboard** - Quick access to Studio, Earnings, and Wallet
- **Settings** - Account management, preferences, privacy controls
- **Social Features** - Follow/unfollow, follower/following counts

### Admin Tools
- **Admin Dashboard** - Full platform management:
  - User growth and engagement analytics
  - Content moderation and reports
  - Revenue tracking and distribution
  - Top creators leaderboard
  - Content by category analysis
  - Report management system

## 📱 Mobile-First Design

The entire platform is built with mobile-first principles:
- Responsive layouts that adapt from mobile to desktop
- Touch-optimized interactions
- Swipe gestures for navigation
- Bottom navigation for easy thumb access
- Smooth animations and transitions

## 🎨 Design System

- **Clean, Modern UI** - Rounded cards, prominent thumbnails, consistent spacing
- **Color Gradients** - Blue to purple gradients for primary actions
- **Dark Mode Support** - Built-in dark theme for all components
- **Smooth Animations** - Slide-up drawers, fade-ins, and scale effects
- **Accessibility** - Proper contrast, ARIA labels, keyboard navigation

## 🛠️ Technical Stack

- **React** - Component-based UI architecture
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **Mobile-Responsive** - Works on all screen sizes

## 📂 Component Structure

```
/components
├── Login.tsx                 - Authentication screens
├── Onboarding.tsx           - User onboarding flow
├── VideoFeed.tsx            - Main video feed
├── VideoCard.tsx            - Individual video with overlays
├── CommentDrawer.tsx        - Comment system
├── GiftingFlow.tsx          - Gift sending interface
├── Discover.tsx             - Explore and search
├── SearchResults.tsx        - Search functionality
├── CreateVideo.tsx          - Video upload interface
├── VideoEditor.tsx          - Video editing tools
├── CreatorStudio.tsx        - Analytics dashboard
├── EarningsDashboard.tsx    - Revenue tracking
├── TokenWallet.tsx          - Token management
├── Notifications.tsx        - Notification center
├── Profile.tsx              - User profiles
├── Settings.tsx             - Settings pages
├── AdminDashboard.tsx       - Admin panel
└── Navigation.tsx           - Bottom navigation
```

## 🚀 Key Interactions

### Video Feed
- Swipe up/down to navigate between videos
- Tap to pause/play
- Like, comment, share, gift, and bookmark actions
- Expandable descriptions with hashtag highlighting

### Creator Workflow
1. Click "+" to create content
2. Record or upload video
3. Edit with tools (trim, effects, text, music)
4. Add title, description, and category
5. Publish to feed

### Monetization Flow
1. Viewers purchase tokens
2. Send gifts during videos
3. Creators earn from ads, gifts, and tips
4. Track earnings in dashboard
5. Withdraw to bank account

## 🎯 Use Cases

- **Students** - Learn from short, engaging educational videos
- **Educators** - Share knowledge and earn income
- **Institutions** - Create branded educational content
- **Administrators** - Monitor platform health and moderate content

## 🔐 Features Overview

### User Features
✅ Login with email, Google, Apple, Facebook, X
✅ Personalized onboarding
✅ Vertical video feed with swipe navigation
✅ Comments with replies and likes
✅ Search with filters and trending topics
✅ Notifications with unread badges
✅ Profile customization
✅ Save and like videos

### Creator Features
✅ Video recording and upload
✅ Video editor with effects and music
✅ Analytics dashboard
✅ Earnings tracking
✅ Token wallet
✅ Gift receiving
✅ Audience insights

### Admin Features
✅ User growth analytics
✅ Content moderation
✅ Revenue tracking
✅ Report management
✅ Creator leaderboards
✅ Platform health metrics

## 💡 Future Enhancements

- Live streaming capabilities
- Direct messaging between users
- Challenges and competitions
- Certificates and achievements
- Course bundles and playlists
- AI-powered content recommendations
- Multi-language support
- Advanced analytics and A/B testing

## 📱 Responsive Breakpoints

- **Mobile**: 0-767px (max-w-md)
- **Tablet**: 768px-1023px
- **Desktop**: 1024px+

All components are optimized for mobile-first experience with progressive enhancement for larger screens.
