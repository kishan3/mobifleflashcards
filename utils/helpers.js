import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = "MobileFlashcards:notifications"

export function createNotification() {
    return {
        title: "Take a quiz!",
        body: "Dont forget to practice!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            stick: false,
            vibrate: true
        }
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS) 
        .then(({ status }) => {
          if(status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(8)
            tomorrow.setMinutes(0)
  
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeate: 'day'
              }
            )
  
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
  }