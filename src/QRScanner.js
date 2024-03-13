import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { NotFoundException } from '@zxing/library';


const QRScanner = () => {
  const videoRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState('No QR code detected');

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    // Attempt to start scanning using the default camera
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        // QR Code successfully scanned
        console.log(`QR Code detected: ${result.getText()}`);
        setQrCodeText(result.getText());

        // If the QR code text is a URL, navigate to it
        if (result.getText().startsWith('http://') || result.getText().startsWith('https://')) {
          window.location.href = result.getText();
        }
      }

      if (err) {
        if (err.name === 'NotFoundException') {
          // Handle the case where no QR codes are found
          console.log('No QR code detected.');
        } else {
          // Handle other errors
          console.error(`Error scanning QR code: ${err}`);
        }
      }
    });

    // Cleanup: stop scanning and release the camera when the component unmounts
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <p>{qrCodeText}</p>
      <video
        ref={videoRef}
        style={{ width: '100%' }}
      ></video>
    </div>
  );
};

export default QRScanner;
