# 🎙️ Voice Flow

**Voice Flow** is a cross-platform desktop application that provides real-time, high-accuracy voice-to-text transcription. Built as a functional clone of the "Wispr Flow" workflow, this app minimizes latency by streaming audio directly to Deepgram's Nova-2 AI model.

The application captures system audio, transcribes it instantly, and allows for one-click copying to the clipboard, streamlining the workflow for dictation and note-taking.

## 🚀 Features

* **Real-time Transcription:** Uses WebSocket streams for millisecond-latency speech recognition.
* **AI-Powered:** Powered by Deepgram's **Nova-2** model for industry-leading accuracy.
* **Cross-Platform:** Built with **Tauri (Rust)** for a lightweight, native desktop experience (macOS/Windows/Linux).
* **Smart Clipboard:** Automatically copies transcribed text to the clipboard when recording stops.
* **Minimalist UI:** Clean, dark-mode interface with visual feedback for recording states.

## 🛠️ Tech Stack

* **Frontend:** Vanilla JavaScript, HTML5, CSS3 (No heavy frameworks).
* **Backend/Core:** Rust (via Tauri).
* **AI Service:** Deepgram API (WebSocket Interface).
* **Build Tool:** Vite.

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:

1.  **Node.js** (v16 or higher)
2.  **Rust** (Latest stable version via `rustup`)
3.  **Deepgram API Key** (Get one at [console.deepgram.com](https://console.deepgram.com))

## 📦 Installation

1.  **Clone the repository** (or unzip the project folder):
    ```bash
    cd voice-flow
    ```

2.  **Install JavaScript dependencies:**
    ```bash
    npm install
    npm install @deepgram/sdk
    ```

3.  **Configure API Key:**
    Open `src/main.js` and replace the placeholder with your Deepgram API Key:
    ```javascript
    const deepgram = createClient("YOUR_API_KEY_HERE");
    ```

## 🏃‍♂️ How to Run

To start the application in development mode:

```bash
npm run tauri dev
```
## 🎥 Demo

[![Watch the Demo]](https://drive.google.com/file/d/1j0LgsGz2waIUjk9URow2TrFfLYCjg1fF/view?usp=sharing)
<br/>
<div style="text-align: center;">
    <img src="./src/assets/video.gif" alt="Demo Video" style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>
