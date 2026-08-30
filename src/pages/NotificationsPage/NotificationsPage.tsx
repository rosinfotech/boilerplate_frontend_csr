import type { FC } from "react";
import { Button, Space, Typography } from "antd";
import { requestNotificationPermissions } from "@/capacitor/request-notification-permissions";
import { scheduleNotification } from "@/capacitor/schedule-notification";

const { Title } = Typography;

export const NotificationsPage: FC = () => {
    return (
        <Space className="mx-auto w-full max-w-100" direction="vertical" size="large">
            <Title className="text-center" level={2}>
                Mobile Notifications
            </Title>

            <Button block onClick={requestNotificationPermissions} size="large" type="primary">
                Request Notifications Permissions
            </Button>

            <Button block onClick={scheduleNotification} size="large" type="primary">
                Schedule Notification (5 sec)
            </Button>
        </Space>
    );
};
