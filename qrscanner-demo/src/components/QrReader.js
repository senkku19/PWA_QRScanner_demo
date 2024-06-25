import React, { useEffect, useRef, useState } from "react";

import "./QrStyles.css";

import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const QrReader = () => {
  // QR States
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Result
  const [scannedResult, setScannedResult] = useState("");

  // When the scan is a success
  const onScanSuccess = (result) => {
    console.log(result);
    // Here we can do whatever we want with the results
    setScannedResult(result.data);
  };

  // When the Scan is a fail
  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        //Camera mode: On a mobile device "environment" means back camera and "user" front. 
        preferredCamera: "environment",
        // Helps position the frames ofthe QR code scanner
        highlightScanRegion: true,
        // When a QR code is being scanned, this command produces a yellow outline as proof. 
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      // Deploys the QR scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // Stops the QR scanner from rendering when the camera isn't deployed
    return () => {
      if (!videoEl.current) {
        scanner.current.stop();
      }
    };
  }, []);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QrReader;
