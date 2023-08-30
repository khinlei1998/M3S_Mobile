import {View, Text} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {reduxForm, Field, change, reset} from 'redux-form';
import { style } from '../../style/Relation_style';
import TextInputFile from '../../components/TextInputFile';
import {
    List,
  } from 'react-native-paper';
  import { useTranslation } from 'react-i18next';

export default function Edit_Relation_CoBorrower() {
  const { t } = useTranslation();
  const [relation_coborrower_expanded, setRelationCoborrowerExpanded] = useState(true);
  const handleRelationCoBorrowerToggle = () => {
    setRelationCoborrowerExpanded(!relation_coborrower_expanded);
  };
  return (
    <>
      <List.Accordion
        expanded={relation_coborrower_expanded}
        onPress={handleRelationCoBorrowerToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Co Borrower Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'co_brwer_rgst_id'}
              title={t('NRC')}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
            />
            <Field
              name={'co_brwer_name'}
              title={t('Co-Borrower Name')}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
