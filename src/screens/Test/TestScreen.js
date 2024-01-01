import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Canvas from 'react-native-canvas';

class FingerprintGenerator extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    this.generateFingerprint();
  }

  generateFingerprint() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const canvasSize = 200; // Size of the canvas
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;
      const radius = canvasSize / 2;
      // Clear the canvas
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Generate a random fingerprint-like pattern
      ctx.fillStyle = '#000'; // Set color to black
      for (let i = 0; i < 2000; i++) { // You can adjust the number of dots
        const angle = Math.random() * Math.PI * 2; // Random angle
        const randomRadius = Math.random() * radius; // Random radius within the circle
        const x = centerX + randomRadius * Math.cos(angle);
        const y = centerY + randomRadius * Math.sin(angle);
        ctx.fillRect(x, y, 1, 1); // Draw small black dots within the circle
      }

    }
  }

  saveImage = async () => {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const dataURL = await canvas.toDataURL('image/png');

      // You can save the dataURL to a file or send it to a server as needed.
      console.log('Fingerprint image generated:', dataURL);
    }
  };

  render() {
    return (

      <View style={{
        marginTop: 20, marginLeft: 30
      }}>
        <Canvas
          ref={this.canvasRef}

        />
      </View>
    );
  }
}

export default FingerprintGenerator;
