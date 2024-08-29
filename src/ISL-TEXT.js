    import { useState, useEffect, useRef } from "react";
    import axios from "axios";
    import translate from "./Icons/language-solid.svg";

    function CameraInput() {
      const videoRef = useRef(null);
      const [error, setError] = useState(null);
      const [predictionContent, setPredictionContent] = useState("Predicting");
      const [letters, setLetters] = useState([]);

      function startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            })
            .catch((err) => {
              if (err.name === "NotAllowedError") {
                setError(
                  "Camera access was denied. Please allow access to continue."
                );
              } else if (err.name === "NotFoundError") {
                setError("No camera device found. Please connect a camera.");
              } else {
                setError(
                  "An error occurred while accessing the camera: " + err.message
                );
              }
              console.error("Error accessing the camera: ", err);
            });
        } else {
          setError("Your browser does not support camera access.");
        }
      }

      function displayPrediction(prediction) {
        setLetters((prevLetters) => [...prevLetters, prediction]);
        setPredictionContent(`Prediction: ${prediction}`);
      }

      async function takePicture() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/jpeg")
        );

        const formData = new FormData();
        formData.append("file", imageBlob, "snapshot.jpg");

        try {
          const response = await axios.post("/predict", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          displayPrediction(response.data.predicted_letter);
        } catch (error) {
          console.error("Error:", error);
        }
      }

      async function submitLetters() {
        try {
          const response = await axios.post("/form_word", { letters });
          setPredictionContent(`Translated word: ${response.data.translated_word}`);
        } catch (error) {
          console.error("Error:", error);
          setPredictionContent("An error occurred.");
        }
      }

      useEffect(() => {
        startCamera();
      }, []);

      return (
        <div className="relative flex">
          {error ? (
            <p>{error}</p>
          ) : (
            <video
              ref={videoRef}
              className="h-max w-full p-4 rounded-[5rem] drop-shadow-xl"
            />
          )}
          <button
            className="bg-[#eaffda] p-3 rounded-full h-fit w-fit flex justify-center items-center m-2 absolute"
            style={{
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={takePicture}
          >
            Capture
            <img src={translate} alt="capture" className="h-4 m-2" />
          </button>
          <button
            className="bg-[#eaffda] p-3 rounded-full h-fit w-fit flex justify-center items-center m-2 absolute"
            style={{
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={submitLetters}
          >
            Submit Letters
            <img src={translate} alt="submit" className="h-4 m-2" />
          </button>
          <div
            className="font-['League_Spartan'] font-bold flex h-fit justify-center items-center text-3xl p-2 absolute opacity-50"
            style={{
              transform: "translate(30%,80%)",
            }}
          >
            <p>{predictionContent}</p>
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

    function IslText() {
      return (
        <div className="App h-screen w-screen bg-[#404040] flex items-center justify-center flex-col md:flex-row">
          <CameraInput />
          <TextBox />
        </div>
      );
    }

    export default IslText;
