# ForensiCare - Forensic Case Management System
## Task Breakdown & Implementation Plan

### 🎯 Project Overview
Building a comprehensive forensic case management system with exact print parity, fast data entry, and bilingual support (Bengali/English).

---

## 📋 Phase 1: Foundation & Core Setup

### 1.1 Project Structure & Dependencies
- [ ] Set up Next.js project with TypeScript
- [ ] Install and configure required packages:
  - [ ] `react-split-pane` or `split.js` for resizable panels
  - [ ] `react-hook-form` for form management
  - [ ] `@hookform/resolvers` + `zod` for validation
  - [ ] `react-i18next` for internationalization
  - [ ] `@tanstack/react-query` for API management
  - [ ] `lucide-react` for icons
  - [ ] `tailwindcss` for styling
- [ ] Set up folder structure for components, hooks, types, utils

### 1.2 Database Schema Design
- [ ] Design database tables structure
- [ ] Create TypeScript interfaces for all entities
- [ ] Set up database connection and models
- [ ] Create migration scripts

### 1.3 Internationalization Setup
- [ ] Set up i18n configuration (Bengali/English)
- [ ] Create language files (bn.json, en.json)
- [ ] Implement language toggle component
- [ ] Set up language context provider

---

## 📋 Phase 2: Core Components & Layout

### 2.1 Main Layout Components
- [ ] Create main dashboard layout
- [ ] Implement tab navigation system
- [ ] Build accordion component for form sections
- [ ] Create split-pane container component

### 2.2 Form Shell & Navigation
- [ ] Header section component
- [ ] General info section component
- [ ] External signs section component
- [ ] Head & spine section component
- [ ] Chest & lungs section component
- [ ] Abdomen section component
- [ ] Musculoskeletal section component
- [ ] Opinions section component

### 2.3 Split-Pane System
- [ ] Implement resizable split-pane
- [ ] Add drag functionality for width adjustment
- [ ] Implement collapse/expand functionality
- [ ] Add keyboard accessibility controls
- [ ] Persist pane size in localStorage

---

## 📋 Phase 3: Form Fields & Validation

### 3.1 Header Section Fields
- [ ] Thana selection (cascader dropdown)
- [ ] GD/CID/Case number input
- [ ] Reference date picker
- [ ] PM number input
- [ ] Report date picker
- [ ] Place input
- [ ] Year/Month/Day inputs

### 3.2 General Info Fields
- [ ] Person name input
- [ ] Gender selection
- [ ] Age input
- [ ] Complexion input
- [ ] Brought from village input
- [ ] Brought from thana selection
- [ ] Brought by names (array input)
- [ ] Sent datetime picker
- [ ] Brought datetime picker
- [ ] Exam datetime picker
- [ ] Police info textarea
- [ ] Identifier name input

### 3.3 Medical Examination Fields
- [ ] External signs fields (physique, wounds, injuries, neck marks)
- [ ] Head & spine fields (scalp, meninges, brain)
- [ ] Chest & lungs fields (ribs, pleura, larynx, lungs, heart, blood vessels)
- [ ] Abdomen fields (general, peritoneum, organs)
- [ ] Musculoskeletal fields (wounds, disease, fractures, dislocations)
- [ ] Opinions fields (medical officer, civil surgeon)

### 3.4 Form Validation
- [ ] Implement Zod schemas for each section
- [ ] Add cross-field validation rules
- [ ] Create validation error display components
- [ ] Implement field-level validation
- [ ] Add section status indicators

---

## 📋 Phase 4: Live Preview System

### 4.1 Preview Engine
- [ ] Create preview renderer component
- [ ] Implement template-based preview generation
- [ ] Add preview zoom controls (50-200%)
- [ ] Implement preview refresh logic

### 4.2 Preview-Form Sync
- [ ] Add scroll synchronization between form and preview
- [ ] Implement anchor jumping for accordion changes
- [ ] Add click-to-focus functionality from preview to form
- [ ] Implement preview render debouncing (300-500ms)

### 4.3 Print Layout
- [ ] Design exact print template
- [ ] Implement print-specific styling
- [ ] Add print scale controls
- [ ] Create print preview modal

---

## 📋 Phase 5: Data Management & Autosave

### 5.1 Form State Management
- [ ] Set up React Hook Form with proper configuration
- [ ] Implement form state persistence
- [ ] Add form reset functionality
- [ ] Create form validation state management

### 5.2 Autosave System
- [ ] Implement debounced autosave (5 seconds)
- [ ] Add autosave triggers (typing, blur, section change)
- [ ] Create autosave status indicators
- [ ] Implement offline storage with IndexedDB

### 5.3 Data Persistence
- [ ] Set up local storage for drafts
- [ ] Implement online/offline sync
- [ ] Add conflict resolution system
- [ ] Create data recovery mechanisms

---

## 📋 Phase 6: Advanced Features

### 6.1 Skip & Validation System
- [ ] Implement field skip functionality
- [ ] Add skip reason input
- [ ] Create skip status indicators
- [ ] Implement configurable required field validation

### 6.2 Attachments & File Management
- [ ] Create file upload component
- [ ] Implement image preview thumbnails
- [ ] Add file size validation
- [ ] Create offline file queue system

### 6.3 Sign-off & Submission
- [ ] Implement digital signature capture
- [ ] Add officer information fields
- [ ] Create submission workflow
- [ ] Add audit logging

---

## 📋 Phase 7: Performance & UX

### 7.1 Performance Optimization
- [ ] Implement preview render pausing when hidden
- [ ] Add lazy loading for form sections
- [ ] Optimize large textarea rendering
- [ ] Implement efficient state updates

### 7.2 User Experience
- [ ] Add keyboard shortcuts
- [ ] Implement smooth animations
- [ ] Add loading states and skeleton screens
- [ ] Create responsive design for mobile

### 7.3 Accessibility
- [ ] Add ARIA labels and roles
- [ ] Implement keyboard navigation
- [ ] Add screen reader support
- [ ] Create focus management system

---

## 📋 Phase 8: Testing & Deployment

### 8.1 Testing
- [ ] Unit tests for components
- [ ] Integration tests for form workflow
- [ ] E2E tests for critical user paths
- [ ] Performance testing

### 8.2 Deployment
- [ ] Set up production build
- [ ] Configure environment variables
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production

---

## 🚀 Implementation Priority

### High Priority (Phase 1-3)
1. Project setup and dependencies
2. Basic form structure and fields
3. Split-pane layout system
4. Core validation

### Medium Priority (Phase 4-6)
1. Live preview system
2. Autosave functionality
3. Skip and validation system
4. File attachments

### Low Priority (Phase 7-8)
1. Performance optimization
2. Advanced UX features
3. Testing and deployment

---

## 📊 Estimated Timeline

- **Phase 1-3**: 2-3 weeks (Foundation + Core Form)
- **Phase 4-6**: 3-4 weeks (Preview + Advanced Features)
- **Phase 7-8**: 1-2 weeks (Optimization + Deployment)

**Total Estimated Time**: 6-9 weeks

---

## 🔧 Technical Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand/Redux Toolkit
- **Database**: PostgreSQL + Prisma
- **File Storage**: AWS S3 or similar
- **Deployment**: Vercel or similar

---

## 📝 Next Steps

1. **Start with Phase 1**: Set up project structure and dependencies
2. **Create basic form layout**: Implement accordion and tab system
3. **Build core form fields**: Start with Header and General sections
4. **Implement split-pane**: Add resizable preview functionality
5. **Add validation**: Implement field-level and cross-field validation

Would you like me to start implementing any specific phase or component?
