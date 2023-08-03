import {View,} from 'react-native';
import React, {useState} from 'react';
import {Field,} from 'redux-form';
import TextInputFile from '../../components/TextInputFile';
import DividerLine from '../../components/DividerLine';
import {style} from '../../style/Customer_Mang_style';
import SingleCheckBox from '../../components/SingleCheckBox';
import {List} from 'react-native-paper';
export default function Property_Info() {
  const [show_propertyinfo, setOpenPropertyInfo] = useState(true);

  const PropertyInfoFun = () => {
    setOpenPropertyInfo(!show_propertyinfo);
  };

  return (
    <>
      <List.Accordion
        expanded={show_propertyinfo}
        onPress={PropertyInfoFun}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Property Information">
        <View style={style.collasible_container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 15,
              marginRight: 16,
            }}>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <View>
                <Field
                  label={'House'}
                  name={'propHouseYn'}
                  component={SingleCheckBox}
                  checkedValue="Y"
                  uncheckedValue="N"
                  // format={value => !!value}
                  // parse={value => (value ? true : false)}
                />
                <Field
                  label={'Motorcycle'}
                  name={'propMotorcycleYn'}
                  component={SingleCheckBox}
                  defaultValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                />
              </View>
              <View>
                <Field
                  label={'Apartment'}
                  name={'propApartmentYn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                />
                <Field
                  label={'Machines'}
                  name={'propMachinesYn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                />
              </View>
              <View>
                <Field
                  label={'Car'}
                  name={'propCarYn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                />
                <Field
                  label={'Farmland'}
                  name={'propFarmlandYn'}
                  component={SingleCheckBox}
                  initialValue={false}
                  checkedValue="Y"
                  uncheckedValue="N"
                />
              </View>
            </View>
            <Field
              name={'otrPropEstmtdVal'}
              title={'Estimated Value'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
            />
          </View>

          <View style={style.input_container_style}>
            <Field
              name={'ohtrOwnProperty'}
              title={'Other Property'}
              component={TextInputFile}
              input_mode
            />
            <Field
              name={'totPropEstmtdVal'}
              title={'Estimated Value'}
              component={TextInputFile}
              input_mode
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </List.Accordion>

      <DividerLine />
    </>
  );
}
