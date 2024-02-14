import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const SleepTracker = () => {
  const [startTime, setStartTime] = useState(null);
  const [alarmTime, setAlarmTime] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [sleepDuration, setSleepDuration] = useState(0);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => setIsDateTimePickerVisible(true);
  const hideDateTimePicker = () => setIsDateTimePickerVisible(false);

  const handleDatePicked = (date) => {
    setAlarmTime(date);
    hideDateTimePicker();
  };

  const handleToggleSleep = () => {
    if (startTime) {
      // Calculate sleep duration
      const endTime = new Date();
      setSleepDuration(Math.floor((endTime - startTime) / (1000 * 60))); // Duration in minutes

      // Show summary
      Alert.alert(
        'Sleep Summary',
        `You have slept for ${sleepDuration} minutes. ${
          sleepDuration >= 420 ? 'Great job! You got enough sleep.' : 'You need more sleep.'
        }`,
        [{ text: 'OK', onPress: () => setStartTime(null) }]
      );
    } else {
      // Start tracking sleep
      setStartTime(new Date());
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }

    // Start inactivity timer
    const inactivityTimeout = setTimeout(() => {
      // Assume the user is sleeping after a certain duration of inactivity
      if (startTime) {
        handleToggleSleep();
      }
    }, 60000); // Check for inactivity every 1 minute (adjust as needed)

    return () => clearTimeout(inactivityTimeout);
  }, [startTime]);

  return (
    <ImageBackground source={require('../../assets/sleep.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{greeting}, user</Text>
        </View>

        <View style={styles.currentTimeContainer}>
          <Text style={styles.currentTimeText}>{moment().format('h:mm A')}</Text>
        </View>

        <TouchableOpacity style={styles.alarmTimeContainer} onPress={showDateTimePicker}>
          <Text style={styles.alarmTimeText}>🔔 Set Alarm</Text>
          <Text style={styles.alarmTimeValue}>
            {alarmTime ? moment(alarmTime).format('h:mm A') : 'Set Alarm'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toggleSleepButton} onPress={handleToggleSleep}>
          <Text style={styles.toggleSleepButtonText}>
            {startTime ? 'Click to Stop Tracking' : 'Click to Start Tracking'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="time"
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  currentTimeContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  currentTimeText: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#F58653', // Change the font color
  },
  alarmTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#79919D',
  },
  alarmTimeText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  alarmTimeValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F58653',
    marginTop: 10,
  },
  swipeUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#F58653',
  },
  swipeUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryContainer: {
    position: 'absolute',
    top: '50%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  okButton: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: 'bold',
  },

  toggleSleepButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  toggleSleepButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

});

export default SleepTracker;





