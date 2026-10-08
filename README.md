# Python Code Builder – Complete the Missing Word
### Class 9 Interactive Drag-and-Drop Python Coding Game

An interactive web application designed for Class 9 students to learn and practice Python syntax, keywords, operators, conditions, loops, and functions through drag-and-drop gameplay.

---

## Deploying on Render (Free & Fast)

Render supports two deployment methods. **Method 1 (Static Site)** is strongly recommended because it is 100% free forever, deploys to a global CDN, and never goes to sleep.

---

### Method 1: Render Static Site (Recommended ⭐)

> **Why this is best**: Zero configuration, instant page load, free custom domain/SSL, and **no cold-start sleep delay**.

#### Step 1: Push your code to GitHub
1. Open PowerShell or Terminal in your project folder (`Game`):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Python Code Builder"
   ```
2. Create a new repository on [GitHub](https://github.com/new) (e.g. `python-code-builder`).
3. Link and push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/python-code-builder.git
   git push -u origin main
   ```

#### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Static Site**.
2. Connect your GitHub account and select your `python-code-builder` repository.
3. Configure the following fields:
   - **Name**: `python-code-builder` (or any custom name)
   - **Branch**: `main`
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.`
4. Click **Create Static Site**.
5. Render will deploy the game in ~10 seconds and provide a live URL like:
   `https://python-code-builder.onrender.com`

---

### Method 2: Render Blueprint (`render.yaml` 1-Click)

This project includes a pre-configured [`render.yaml`](./render.yaml) file.

1. In the Render Dashboard, click **New +** → **Blueprint**.
2. Connect your GitHub repository.
3. Render will automatically detect [`render.yaml`](./render.yaml) and configure the static deployment.
4. Click **Apply**.

---

### Method 3: Render Web Service (Node.js)

If you prefer to run it as a Node.js server using the included [`server.js`](./server.js):

1. In Render Dashboard, click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure:
   - **Runtime**: `Node`
   - **Build Command**: *(leave empty or `npm install`)*
   - **Start Command**: `npm start` (or `node server.js`)
   - **Instance Type**: `Free`
4. Click **Create Web Service**.

---

## Local Development

To run the game locally:

### Option A: Direct in Browser
Double-click `index.html` to open directly in Chrome, Edge, Firefox, or Safari.

### Option B: Local Node Server
```bash
node server.js
```
Then visit `http://localhost:3000`.

### Option C: Python HTTP Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## Project Structure

```
├── index.html        # Main HTML application and modal dialogues
├── style.css         # UI styles, animations, dark code editor, and responsive layout
├── questions.js      # 1,000+ Class 9 Python question bank & generator
├── audio.js          # Offline Web Audio API sound synthesizer
├── app.js            # Game engine, Drag-and-Drop / Tap handlers, scoring, timer
├── server.js         # Zero-dependency Node.js HTTP server
├── package.json      # Node.js project manifest & start script
├── render.yaml       # Infrastructure blueprint for 1-click Render deployment
└── .gitignore        # Git ignore rules
```
