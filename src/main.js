import { createClient } from "https://esm.sh/@deepgram/sdk@3.9.0?bundle";


const deepgram = createClient("4a6174bc06de5a87ccee1716520c0bc43fba4576"); 


let isRecording = false;
let mediaRecorder;
let liveConnection;
let currentStream;
let pendingBlobs = [];
const transcriptBox = document.getElementById("transcript-box");
const recordBtn = document.getElementById("record-btn");
const clearBtn = document.getElementById("clear-btn");

async function startRecording() {
  try {
    // 1. Get Microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    currentStream = stream; // <--- Save the stream

    // 2. Open Deepgram Connection
    liveConnection = deepgram.listen.live({
      model: "nova-2",
      language: "en-US",
      smart_format: true,
    });

    function connectionIsOpen(conn) {
      if (!conn) return false;
      if (typeof conn.getReadyState === "function") return conn.getReadyState() === 1;
      return conn.readyState === 1;
    }

    function handleOpen() {
      console.log("Deepgram connection opened");
      if (pendingBlobs.length > 0 && connectionIsOpen(liveConnection)) {
        pendingBlobs.forEach(b => {
          try { liveConnection.send(b); } catch (e) { console.error('Failed to send buffered blob', e); }
        });
        pendingBlobs = [];
      }
    }

    // Support both lowercase and uppercase event names from different SDK versions
    liveConnection.on("Open", handleOpen);
    liveConnection.on("open", handleOpen);

    // Listen for transcription results (support multiple event name casings)
    function handleResults(data) {
      try {
        const sentence = data.channel?.alternatives?.[0]?.transcript || "";
        if (sentence && transcriptBox) {
          if (transcriptBox.innerText === "Start speaking...") transcriptBox.innerText = "";
          transcriptBox.innerText += " " + sentence;
          transcriptBox.scrollTop = transcriptBox.scrollHeight;
        }
      } catch (e) {
        console.error('Error parsing results', e, data);
      }
    }
    liveConnection.on("Results", handleResults);
    liveConnection.on("results", handleResults);

    
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (!event.data || event.data.size === 0) return;
      const ready = connectionIsOpen(liveConnection);
      if (ready) {
        try {
          liveConnection.send(event.data);
        } catch (e) {
          console.error('Error sending blob, buffering instead', e);
          pendingBlobs.push(event.data);
        }
      } else {
        // Buffer until the socket opens

      // Demo video: show demo section only when the video can be loaded
      if (demoVideo) {
        demoVideo.addEventListener('loadedmetadata', () => {
          if (demoSection) demoSection.style.display = 'block';
        });
        demoVideo.addEventListener('error', () => {
          if (demoSection) demoSection.style.display = 'none';
        });
        // attempt to load metadata to trigger either loadedmetadata or error
        try { demoVideo.load(); } catch (e) { if (demoSection) demoSection.style.display = 'none'; }
      }
        pendingBlobs.push(event.data);
      }
    });

    mediaRecorder.start(250);

    // Update UI immediately when recording begins
    isRecording = true;
    recordBtn.textContent = "Stop Recording";
    recordBtn.classList.add("recording");
    // Hide clear button while recording
    if (clearBtn) clearBtn.style.display = "none";

  } catch (error) {
    console.error("Error:", error);
    alert("Check Console: " + error.message);
  }
}

function stopRecording() {
  // 1. Stop the Recorder
  if (mediaRecorder) {
    mediaRecorder.stop();
  }

  // 2. Close the Deepgram Connection
  if (liveConnection) {
    liveConnection.finish();
  }

  // 3. STOP THE MICROPHONE (Fixes your error)
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }

  // 4. Reset UI
  isRecording = false;
  recordBtn.textContent = "Start Recording";
  recordBtn.classList.remove("recording");

  // Show the clear button once recording completes
  if (clearBtn) {
    clearBtn.style.display = "inline-block";
  }

  // 5. Copy text
  if (transcriptBox.innerText !== "Start speaking...") {
    navigator.clipboard.writeText(transcriptBox.innerText).then(() => {
        console.log("Text copied");
    });
  }
}

// Clear button handler: clear text and hide the transcript box
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (transcriptBox) {
      transcriptBox.innerText = "Start speaking...";
      transcriptBox.classList.add("transcript-box");
    }
    clearBtn.style.display = "none";
  });
}

// Attach click listener
recordBtn.addEventListener("click", () => {
  console.log("Record button clicked");
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
});