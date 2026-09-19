# Quick Start Guide - MoroccoMate

## 🚀 Run the App in 3 Steps

### Step 1: Install Dependencies
```bash
cd code
npm install
```

This will install:
- Next.js 15.3
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- React Hook Form

### Step 2: Start Development Server
```bash
npm run dev
```

You should see:
```
▲ Next.js 15.3.1
- Local:        http://localhost:3000
- Ready in X seconds
```

### Step 3: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

---

## 🔧 Troubleshooting Connection Issues

### Issue: "Connection refused" or "Cannot connect"

**Solution 1: Check if port 3000 is in use**
```bash
# Windows PowerShell
netstat -ano | findstr :3000

# If something is using it, kill it or use a different port
```

**Solution 2: Use a different port**
```bash
# Edit package.json, change:
"dev": "next dev --turbopack -p 3001"

# Or run:
npm run dev -- -p 3001
```

**Solution 3: Check firewall**
- Make sure your firewall isn't blocking Node.js
- Allow Node.js through Windows Firewall

**Solution 4: Clear Next.js cache**
```bash
rm -rf .next
npm run dev
```

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Browser shows blank page

**Solution:**
1. Check browser console (F12) for errors
2. Make sure you're going to `http://localhost:3000` (not https)
3. Try a different browser
4. Clear browser cache

---

## 📱 Access from Other Devices

### On Same Network:
1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. Run Next.js with host:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. Access from phone/tablet:
   ```
   http://YOUR_IP:3000
   # Example: http://192.168.1.100:3000
   ```

---

## 🌐 Production Build

To build for production:
```bash
npm run build
npm start
```

This runs on port 3000 by default.

---

## ✅ Verify It's Working

When you open `http://localhost:3000`, you should see:
- ✅ MoroccoMate title
- ✅ "Start Planning Now" button
- ✅ Beautiful Moroccan-themed design
- ✅ Sample itinerary preview

If you see this, **everything is working!** 🎉

---

## 🆘 Still Having Issues?

1. **Check Node.js version:**
   ```bash
   node --version
   # Should be 18+ or 20+
   ```

2. **Check npm version:**
   ```bash
   npm --version
   # Should be 9+
   ```

3. **Try updating:**
   ```bash
   npm update
   ```

4. **Check for errors in terminal:**
   - Look for red error messages
   - Share the error if you need help

---

## 📝 Quick Test

Once running, test the flow:
1. Click "Start Planning Now"
2. Fill out the form (3 steps)
3. Click "Generate My Itinerary"
4. View your itinerary
5. Try editing activities
6. Rate your experience

If all these work, **you're all set!** ✅

