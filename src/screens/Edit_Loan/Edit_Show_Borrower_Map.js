import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {setBorrowerMap_Path} from '../../redux/LoanReducer';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function Edit_Show_Borrower_Map(props) {
  const application_no = props.route.params.application_no;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [paths, setPaths] = useState('');
  const [imageQuery, setImageQuery] = useState('');
  const sketchRef = useRef(null);
  
  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <RNSketchCanvas
            ref={sketchRef}
            containerStyle={{backgroundColor: 'transparent', flex: 1}}
            canvasStyle={{backgroundColor: 'transparent', flex: 1}}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            closeComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Close</Text>
              </View>
            }
            undoComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Undo</Text>
              </View>
            }
            clearComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Clear</Text>
              </View>
            }
            eraseComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Eraser</Text>
              </View>
            }
            strokeComponent={color => (
              <View
                style={[{backgroundColor: color}, styles.strokeColorButton]}
              />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View
                  style={[
                    {backgroundColor: color, borderWidth: 2},
                    styles.strokeColorButton,
                  ]}
                />
              );
            }}
            strokeWidthComponent={w => {
              return (
                <View style={styles.strokeWidthButton}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      marginHorizontal: 2.5,
                      width: Math.sqrt(w / 3) * 10,
                      height: Math.sqrt(w / 3) * 10,
                      borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                    }}
                  />
                </View>
              );
            }}
            saveComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Save</Text>
              </View>
            }
            savePreference={() => {
              return {
                folder: 'RNSketchCanvas',
                filename: `${application_no}MP01`,
                transparent: true,
                imageType: 'jpg',
              };
            }}
            onSketchSaved={(success, path) => {
              alert(success ? 'Image saved!' : 'Failed to save image!', path);
              if (path) {
                const queryParam = `?timestamp=${Date.now()}`;
                // Update the image URI with the query parameter
                setPaths(`file://${path}${queryParam}`);
                setImageQuery(queryParam); // Update the query parameter state
                dispatch(setBorrowerMap_Path(`${path}${queryParam}`));
                navigation.goBack();
              }
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textInputContainer: {
    position: 'absolute',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
