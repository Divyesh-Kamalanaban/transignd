import { useState } from "react";
import axios from "axios";
import microphoneIcon from "./Icons/microphone-solid.svg";

function AudioInput() {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(null);
  const [statusContent, setStatusContent] = useState("Press to Record");
  const [translatedContent, setTranslatedContent] = useState("");

  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorder.onstart = () => {
        setRecording(true);
        setStatusContent("Recording...");
      };

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setRecording(false);
        setStatusContent("Processing...");
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        try {
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.wav");

          const response = await axios.post("/text_to_isl", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setTranslatedContent(
            response.data.translated_text || "Translation failed."
          );
          setStatusContent("Translation Complete");
        } catch (err) {
          console.error("Error processing audio:", err);
          setError("An error occurred while processing the audio.");
          setStatusContent("Press to Record");
        }
      };

      mediaRecorder.start();
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      }, 5000); // Record for 5 seconds
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError(
        "An error occurred while accessing the microphone: " + err.message
      );
    }
  }

  return (
    <div className="relative flex">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className={`bg-[#eaffda] p-3 rounded-full h-fit w-fit flex justify-center items-center m-2 ${
              recording ? "opacity-50" : "opacity-100"
            }`}
            onClick={startRecording}
            disabled={recording}
          >
            {recording ? "Recording..." : "Record Audio"}
            <img src={microphoneIcon} alt="record" className="h-4 m-2" />
          </button>
          <p className="font-bold text-xl p-2">{statusContent}</p>
        </div>
      )}
      <div
        className="font-['League_Spartan'] font-bold flex h-fit justify-center items-center text-3xl p-2 absolute opacity-50"
        style={{
          transform: "translate(30%,80%)",
        }}
      >
        <p>{translatedContent}</p>
      </div>
    </div>
  );
}

function TextBox() {
  const translatedText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."; // Your actual text

  return (
    <form
      className="Textbox p-2 bg-[#545454] sm:w-full rounded-lg drop-shadow-lg m-4 lg:w-1/2 flex justify-center items-center flex-col scroll-m-2"
      style={{ overflow: "auto" }}
    >
      <p>{translatedText}</p>
    </form>
  );
}

function AudioToIsl() {
  return (
    <div className="App h-screen w-screen bg-[#404040] flex items-center justify-center flex-col md:flex-row">
      <AudioInput />
      <TextBox />
    </div>
  );
}

export default AudioToIsl;
