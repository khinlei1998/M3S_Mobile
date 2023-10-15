import React from 'react';
import {View, Text} from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';

const FingerprintDesign = ({uniqueNumber}) => {
  // Define a function to convert the unique number to a path data for the fingerprint design
  const generatePathData = number => {
    // Replace this with your custom logic to generate the path data
    // You may use mathematical functions or other algorithms to create a unique design.
    // For demonstration purposes, we'll use a simple example here.
    return `M 0 0 L ${number} ${number} L 100 0 Z`;
  };

  return (
    <View>
      <Text>Unique Number: {uniqueNumber}</Text>
      <Svg width={200} height={200} xmlns="http://www.w3.org/2000/svg">
        <Ellipse cx="100" cy="80" rx="80" ry="45" fill="#2E2926" />
        <Ellipse cx="100" cy="120" rx="60" ry="35" fill="#483F38" />
        <Ellipse cx="100" cy="155" rx="40" ry="20" fill="#736D69" />
        <Ellipse cx="100" cy="175" rx="30" ry="15" fill="#9D9A96" />
        <Ellipse cx="100" cy="190" rx="20" ry="10" fill="#C8C6C5" />
        <Path d="M95,50 L50,80 C60,100 140,100 150,80 L95,50" fill="#171714" />
        <Path d="M80,50 L55,80 C70,105 130,105 145,80 L120,50" fill="#171714" />
        <Path d="M80,50 L65,80 C85,115 115,115 135,80 L120,50" fill="#171714" />
        <Path
          d="M110,80 L95,110 C100,120 120,120 125,110 L110,80"
          fill="#171714"
        />
        <Path
          d="M95,110 L80,140 C90,160 110,160 120,140 L95,110"
          fill="#171714"
        />
        <Path
          d="M120,140 L105,160 C115,175 125,175 135,160 L120,140"
          fill="#171714"
        />
      </Svg>
    </View>
  );
};

export default FingerprintDesign;
