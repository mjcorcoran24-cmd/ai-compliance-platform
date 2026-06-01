# 🖥️ How to View the AI Auditor Platform on Windows

This guide will help you get the **AI Auditor** platform running on your Windows computer so you can view it in your browser.

## 1. Install Node.js
The platform requires a tool called **Node.js** to run.
1. Go to [nodejs.org](https://nodejs.org/).
2. Download the version labeled **"LTS"** (it's the most stable).
3. Open the downloaded file and follow the installation instructions. Just keep clicking "Next" until it's finished!

## 2. Open the Project Folder
1. In your **GitHub Desktop** app (the one in your screenshot), look at the top menu.
2. Click on **Repository** -> **Show in Explorer**.
3. This will open the folder containing the project files on your computer.

## 3. Start the Platform
Now, we need to open the "black window" (Command Prompt) to start the platform. Since you are using **GitHub Desktop**, this is very easy:

1. In GitHub Desktop, go to the top menu and click **Repository**.
2. Click **Open in Command Prompt**.
3. A black window will appear.

### ⚠️ Crucial: Typing the commands
When you type the commands below, **spaces are very important**. Make sure there is a space between the words (like `npm` and `install`).

**Step A: Verify you have Node.js installed**
Type exactly what is in the box below and press Enter (do NOT type "bash" or the backticks ` ``` `):
> **node -v**

*If you see a version number (like `v22.0.0`), you are good!*

⚠️ **If it says "not recognized":**
1. Make sure you finished **Step 1 (Install Node.js)**.
2. **Restart your computer.** This is often necessary for Windows to "see" the new tool.
3. Open the Command Prompt again via GitHub Desktop and try typing `node -v` again.

---

💡 **Tip:** You can **Copy** the text in bold and **Paste** it into the black window by right-clicking or pressing `Ctrl + V`.

**Step B: Install and Start**
Only proceed if `node -v` worked! Type these commands one by one, pressing Enter after each:

1. **Install the pieces:**
   > **npm install**

2. **Prepare the database:**
   > **npx prisma migrate dev --name init**

3. **Fill the database with data:**
   > **node prisma/seed.js**

4. **Start the platform:**
   > **npm run dev**

## 4. View the Platform
Once you see a message saying "Ready" or "Started", keep that black window open!
1. Open your web browser (Chrome, Edge, etc.).
2. Go to this address: **[http://localhost:3000](http://localhost:3000)**
3. To log in, go to **[http://localhost:3000/login](http://localhost:3000/login)** and use:
   - **Email:** `admin@example.com`
   - **Password:** `password123`

## 💡 Troubleshooting: "I need Microsoft Azure" or "Build Tools"
If Windows shows a message asking for **Microsoft Azure** or **Visual Studio Build Tools** during `npm install`, don't worry!

This usually happens because one of the components (SQLite) is trying to "build" itself on your computer.

**The Easiest Fix:**
1. Download and install the **[Visual Studio Community Edition](https://visualstudio.microsoft.com/vs/community/)** (it's free).
2. During installation, look for a checkbox that says **"Desktop development with C++"** and make sure it is checked.
3. Finish the installation and restart your computer.
4. Try Step 3 again!

---
*Tip: When you are done, you can close the black window to stop the platform.*
