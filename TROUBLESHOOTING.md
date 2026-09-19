# Troubleshooting Guide

## Common Issues & Fixes

### Issue 1: "Module not found" or Import Errors

**Fix:**
```bash
cd code
npm install
```

If that doesn't work:
```bash
cd code
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: TypeScript Errors

**Fix:**
The app uses TypeScript. Make sure all imports use the `@/` alias:
- ✅ `import { Itinerary } from '@/types'`
- ✅ `import DayCard from '@/components/DayCard'`
- ❌ `import { Itinerary } from '../types'` (wrong)

### Issue 3: Port Already in Use

**Fix:**
```bash
# Use different port
npm run dev -- -p 3001
```

Or kill the process using port 3000:
```powershell
# Windows PowerShell
netstat -ano | findstr :3000
# Note the PID, then:
taskkill /PID <PID> /F
```

### Issue 4: Blank Page or "Cannot GET /"

**Fix:**
1. Check browser console (F12) for errors
2. Make sure you're going to `http://localhost:3000` (not https)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private mode

### Issue 5: "Cannot find module 'lucide-react'"

**Fix:**
```bash
cd code
npm install lucide-react
```

### Issue 6: Build Errors

**Fix:**
```bash
cd code
rm -rf .next
npm run dev
```

### Issue 7: Type Errors

**Fix:**
Make sure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Step-by-Step Debugging

### Step 1: Check Node.js
```bash
node --version
# Should be 18+ or 20+
```

### Step 2: Check npm
```bash
npm --version
# Should be 9+
```

### Step 3: Install Dependencies
```bash
cd code
npm install
```

### Step 4: Check for Errors
```bash
npm run dev
```

Look for:
- ✅ "Ready" message = Good!
- ❌ Red errors = Problem (share the error)

### Step 5: Open Browser
Go to: `http://localhost:3000`

---

## What Error Are You Seeing?

Please share:
1. The exact error message
2. Where it appears (terminal? browser?)
3. What you were trying to do

This will help me fix it faster!

---

## Quick Test

Run these commands one by one:

```bash
# 1. Go to code folder
cd code

# 2. Install
npm install

# 3. Start
npm run dev
```

If step 3 shows errors, copy and paste them here!

