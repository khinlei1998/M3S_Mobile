import React, { useEffect, useRef, useState } from 'react';
import { View, Image,Text } from 'react-native';
import { Canvas, Image as CanvasImage } from 'react-native-canvas';
import { PermissionsAndroid } from 'react-native';

const FingerprintPattern = () => {
  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  }
  return (
    <Canvas ref={handleCanvas} />
  );
};

export default FingerprintPattern;
