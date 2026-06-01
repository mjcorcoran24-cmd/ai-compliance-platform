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
3. A black window will appear. Type the following commands one by one (press **Enter** after each):

> **Note:** If you don't see "Open in Command Prompt", you can instead click **Repository** -> **Show in Explorer**, then in the folder that opens, click the blank space at the very top (where the folder path is), type `cmd` and press **Enter**.

   **First, install the necessary pieces:**
   ```bash
   npm install
   ```

   **Second, prepare the database:**
   ```bash
   npx prisma migrate dev --name init
   node prisma/seed.js
   ```

   **Finally, start the platform:**
   ```bash
   npm run dev
   ```

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
