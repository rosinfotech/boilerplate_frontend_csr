import { LocalNotifications } from "@capacitor/local-notifications";

export const requestNotificationPermissions = async () => {
    const status = await LocalNotifications.requestPermissions();
    if (status.display === "granted") {
        alert("Notification permissions granted");
    } else {
        alert("Notification permissions denied");
    }
};
