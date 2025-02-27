import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        setFileName(`screen-recording-${new Date().toISOString()}.webm`);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error("Error starting screen recording: ", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
  };

  const downloadRecording = () => {
    const link = document.createElement('a');
    link.href = videoURL;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="App">
      <div>
        <h1 className='d-flex-j-c-a-c'>Kaustubh's React <><img src="/react-animation.gif" alt="" /></> Recorder</h1>
        {!recording ? (
          <button onClick={startRecording}>Start Recording ▶️</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording ⏹️</button>
        )}
      </div>


      {videoURL && (
        <div>
          <h2>Recording Finished!</h2>
          <button onClick={downloadRecording}>Download Recording</button>
          <video controls src={videoURL} />
          <br />

        </div>
      )}
    </div>
  );
};

export default App;
