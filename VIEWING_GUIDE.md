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
Now, we need to tell Windows to start the "Engine" for the platform:
1. In the folder that just opened, click on the **Address Bar** at the top (where it shows the folder path).
2. Type `cmd` and press **Enter**. A black window (Command Prompt) will appear.
3. In that black window, type the following commands one by one (press Enter after each):

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

---
*Tip: When you are done, you can close the black window to stop the platform.*
