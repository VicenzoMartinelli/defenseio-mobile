import React from 'react';
import { View } from 'react-native';
import { Input, Icon } from 'react-native-ui-kitten';
import DatePicker from 'react-native-datepicker';
import theme from '../../theme/theme';

const InlineDatePicker = ({ formikValues, setFieldValue, placeholder, value, status, caption, handleChange }) => {

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <DatePicker
        style={{ width: 50 }}
        date={formikValues[value]} //initial date from state
        mode="date" //The enum of date, datetime and time
        hideText={true}
        locale={'BR'}
        format="DD/MM/YYYY"
        iconComponent={<Icon width={32} height={32} fill={theme['color-primary-500']} name="calendar-outline" />}
        confirmBtnText="Ok"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => setFieldValue(value, date)}
      />
      <Input
        placeholder={placeholder}
        value={formikValues[value]}
        status={status}
        caption={caption}
        onChangeText={() => { }}
        style={{ marginTop: 10, width: '90%' }}
      />
    </View>
  );
}
export default InlineDatePicker;