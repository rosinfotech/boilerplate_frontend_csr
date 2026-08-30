import { LocalNotifications } from "@capacitor/local-notifications";

export const scheduleNotification = async () => {
    await LocalNotifications.schedule({
        notifications: [
            {
                body: "This is a notification from Rosinfotech Boilerplate Frontend TanStack Router/Mobile",
                id: 1,
                schedule: { at: new Date(Date.now() + 5000) },
                title: "Rosinfotech Boilerplate Frontend TanStack Router/Mobile",
            },
        ],
    });

    alert("Notification scheduled (5 sec)!");
};
