import React from 'react';
import { View } from 'react-native';
import { Input, Icon } from 'react-native-ui-kitten';
import DatePicker from 'react-native-datepicker';
import theme from '../../theme/theme';

const InlineDatePicker = ({ formikValues, setFieldValue, placeholder, value, status, caption, disabled, style, iconSize = "default", mode = "date" }) => {

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
      <Input
        placeholder={placeholder}
        value={formikValues[value]}
        status={status}
        caption={caption}
        disabled={disabled}
        onChangeText={() => { }}
        style={{ marginTop: 10, width: '100%' }}
      />
      <DatePicker
        style={{ width: 50, position: 'absolute', left: iconSize === "default" ? "80%" : "70%", top: iconSize === 'default' ? "initial" : '25%' }}
        date={formikValues[value]} //initial date from state
        mode={mode}
        hideText={true}
        disabled={disabled}
        locale={'BR'}
        format={mode === "date" ? "DD/MM/YYYY" : mode === "time" ? "HH:mm" : "DD/MM/YYYY HH:mm"}
        iconComponent={<Icon width={iconSize === "default" ? 32 : 24} height={iconSize === "default" ? 32 : 24} fill={theme['color-primary-500']} name="calendar-outline" />}
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
    </View>
  );
}
export default InlineDatePicker;