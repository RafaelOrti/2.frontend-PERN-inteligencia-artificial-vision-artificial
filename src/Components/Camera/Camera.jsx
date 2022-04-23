import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { detectFaces, drawResults } from '../../helpers/faceApi';

import Button from '../Button/Button';
import Gallery from '../Gallery/Gallery';
import Results from '../Results/Results';
import Webcam from 'react-webcam';

import './Camera.css';
import { EMOTIONS } from '../../redux/actions';

let i = 0;
// let i2 = 0;

const Camera = (props, { photoMode }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [results, setResults] = useState([]);

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current?.video);
      await drawResults(camera.current?.video, cameraCanvas.current, faces, 'boxLandmarks');
      setResults(faces);
    }
  };

  const clearOverlay = (canvas) => {
    canvas?.current?.getContext('2d')?.clearRect(0, 0, canvas?.width, canvas?.height);
  };

  const updateResults = (resultado) => {
    props.dispatch({ type: EMOTIONS, payload: resultado[0]?.expressions })
  }

  // const uploadResults = (emotion) => {
  //   console.log(props.usuario?.id, emotion)
  // }

  setTimeout(() => {
    i++
    // i2++
    if (i === 100) {
      i = 0;
      updateResults(results)
    }
    // if (i2 === 250) {
    //   i2 = 0;
    //   uploadResults(props.emotions?.emotion)
    // }
  }, 80)

  useEffect(() => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 120);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, [photoMode]);

  return (
    <div className="camera">
      <div className="camera__wrapper">
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas className={classnames('webcam-overlay', photoMode && 'webcam-overlay--hidden')} ref={cameraCanvas} />
      </div>
      <div className="results__container">
        <Results results={results} />
      </div>
    </div>
  );
};

export default connect((state) => ({ emotions: state.emotions, usuario: state.credentials.usuario }))(Camera);
