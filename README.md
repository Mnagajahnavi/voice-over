# Voice Flow (Tauri + Vanilla)

A small desktop app that captures microphone audio and sends it to Deepgram for live transcription. Built with vanilla HTML/CSS/JS and Tauri for cross-platform desktop packaging.

## Features
- Start/stop microphone recording
- Live transcription (Deepgram)
- Copy transcript to clipboard on stop
- Clear transcript button and demo video support

## Development

Start the app in development mode:

```bash
npm install
npm run tauri dev
```

Open DevTools inside the app window to view console logs.

## Demo video (how to add)

You can add a short demo video to the app UI for showcasing the product. Place your demo video file at:

```
src/assets/demo.mp4
```

A demo page is included at `src/demo.html` that will load and play `src/assets/demo.mp4` when present. To view it in development, open the file in the app or a browser while running the dev server.

Example embed snippet you can add to `src/index.html` if you want the demo in the main UI:

```html
<section id="demo">
	<h2>Demo</h2>
	<video src="./assets/demo.mp4" controls style="max-width:100%;"></video>
</section>
```

Recommended video specs: H.264 MP4, under 50MB for easy packaging.

If you need to convert/trim a recording, use ffmpeg:

```bash
# trim to first 30 seconds and re-encode
ffmpeg -i input.mp4 -ss 0 -t 30 -c:v libx264 -crf 23 -c:a aac src/assets/demo.mp4
```

## Where to put the demo

- Add `src/assets/demo.mp4` and then open `src/demo.html` in your browser or the running app to play it.

## Notes
- Keep your Deepgram API key secure — the current demo app stores it in `src/main.js` for simplicity; consider moving it to a secure backend or Tauri secure storage for production.

Enjoy! If you want, I can add an in-app toggle that shows the demo video only when it exists.
