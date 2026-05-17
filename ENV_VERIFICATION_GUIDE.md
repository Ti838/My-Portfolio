# Environment Variables Verification Guide

This guide helps you **confirm** if your environment variables are actually working.

---

## Quick Test (Do This First)

### Test 1: Check Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. Look for these **exact names** (not your values, just names):
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - ✅ `SUPABASE_SERVICE_ROLE_KEY`

**If any are missing → Add them immediately!**

### Test 2: Check Your Deployed Site

1. Visit your Vercel URL
2. Open browser console: **F12 → Console tab**
3. Type and press Enter:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

**Expected result:**
```
https://xxxxxxxx.supabase.co
```

**If you see `undefined` → Environment variables NOT set!**

---

## Full Diagnostic Script

If above tests don't help, run this in browser console:

```javascript
// ===== DIAGNOSTIC TEST =====
console.log("=== ENVIRONMENT VARIABLE CHECK ===");
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ SET" : "❌ MISSING");
console.log("ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ SET" : "❌ MISSING");
console.log("\n=== ATTEMPTING SUPABASE CONNECTION ===");

// Try to test Supabase connection
fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/personal_info?id=eq.1')
  .then(r => {
    console.log("Response Status:", r.status);
    return r.json();
  })
  .then(data => {
    console.log("✅ SUPABASE CONNECTED");
    console.log("Data received:", data);
  })
  .catch(err => {
    console.log("❌ SUPABASE ERROR:", err.message);
  });
```

**Copy the console output and share it if there are errors.**

---

## Checklist to Fix

If environment variables are missing/undefined:

### ✅ Step 1: Verify Supabase Project Info
1. Open Supabase Dashboard
2. Click **Settings** → **API**
3. You should see:
   - "Project URL" (blue text box)
   - "Project API Keys" section with 2 keys

**If these don't exist → Your Supabase project wasn't created properly**

### ✅ Step 2: Copy Values Correctly

Go to Vercel Environment Variables and add:

| Name | Where to Copy From | Copy This Exactly |
|------|-------------------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Settings > API > "Project URL" | The full URL (https://...) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Settings > API > "anon public" | The long key string |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Settings > API > "service_role" | The long key string |

⚠️ **Common mistakes:**
- Copying `[brackets]` or `"quotes"` accidentally
- Extra spaces before/after value
- Selecting wrong key (anon vs service_role)
- Missing `NEXT_PUBLIC_` prefix

### ✅ Step 3: Redeploy After Changes

1. In Vercel, go to **Deployments**
2. Find your latest deployment
3. Click the 3-dot menu (...)
4. Select **Redeploy**
5. Wait 5-10 minutes for new deployment

**IMPORTANT:** Environment variables only take effect on NEW deployments!

### ✅ Step 4: Clear Browser Cache

After redeployment:
1. Open your Vercel URL
2. Press **Ctrl+Shift+Delete** (or Cmd+Shift+Delete on Mac)
3. Click **Clear all**
4. Refresh the page (F5)
5. Run Test 2 again

---

## Advanced Debugging

### Check Vercel Build Logs

1. Go to Vercel → Deployments
2. Click on your latest deployment
3. Scroll to **Build Logs**
4. Look for:
   - ❌ `Error: NEXT_PUBLIC_SUPABASE_URL is not defined`
   - ❌ Syntax errors in `src/data/portfolio.ts`
   - ❌ `SUPABASE_SERVICE_ROLE_KEY is required`

**If you see errors → Share the full log message**

### Check Vercel Function Logs

1. Go to Vercel → Deployments → Your deployment
2. Click **Runtime Logs**
3. Visit your site to trigger logs
4. Look for errors from Supabase calls

---

## Sample: What Should Work

Once everything is correct, this flow should work:

```
1. You visit: https://your-project.vercel.app
2. Next.js server runs layout.tsx → calls getPersonalInfo()
3. getPersonalInfo() creates Supabase admin client
4. Admin client uses SUPABASE_SERVICE_ROLE_KEY
5. Fetches from personal_info table
6. Page renders with your real data
```

If any step fails:
- Admin client returns null
- Falls back to staticPersonalInfo
- You see hardcoded "Timon Biswas" instead of your data

---

## Last Resort: Nuclear Option

If nothing works:

1. **Delete everything from Vercel:**
   - Go to Project Settings → Danger Zone → Delete Project

2. **Start completely fresh:**
   - Create new Vercel project (same repo)
   - Add env vars BEFORE deploying
   - Deploy

3. **Verify Supabase:**
   - Go to Supabase Dashboard
   - Click your project
   - Go to Table Editor
   - Add a test row to `personal_info` with your data

---

## Contact Supabase Support

If Supabase API keys are the issue:

1. Supabase Dashboard → Help/Support (bottom-left)
2. Or email: support@supabase.io
3. Include: Project ID + error message

---

**Still stuck? Create a file and paste:**
1. Screenshot of Vercel Environment Variables
2. Screenshot of Supabase Settings > API
3. Browser console output from Test 2
