# 🖤 Manga-fy 90s

A 1990s-style manga image generator built with **Google AI Studio**, powered by **Imagen API** and **Gemini SDKs**. This app transforms user text prompts or uploaded photos into stylized black-and-white manga artwork, complete with halftone shading, bold linework, and retro comic vibes.

---

## ✨ Features

- 🖋️ **Text-to-Manga**: Enter a natural language prompt to generate a 90s manga-style image.
- 🖼️ **Photo Uploads**: Upload an image to be reimagined in retro manga aesthetic.
- 🎨 **Style Tags Support**: Enhance prompts with styles like:
  - `shonen panel` – dynamic action, dramatic poses
  - `headshot only` – tight portrait framing

---

## 🛠 Tech Stack

- **Frontend**: React + TypeScript
- **AI/Backend**: Google AI Studio (Gemini SDKs + Imagen API)
- **Architecture**: Prompt-based app generation via Google AI Studio’s build tools

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/be5be6c5-020d-4604-bb58-0dbb998f53cd)
<img width="1470" alt="Screenshot 2025-07-04 at 11 39 24 AM" src="https://github.com/user-attachments/assets/d1e1240b-be7f-4a4d-a8e7-5c06016ba074" />
<img width="1470" alt="Screenshot 2025-07-04 at 11 42 40 AM" src="https://github.com/user-attachments/assets/f94088a7-36e4-4dd3-bf1b-89c0a2913767" />
![image](https://github.com/user-attachments/assets/ae68c1d5-6dd9-4afb-9f3c-03fd9ce356fd)




## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
