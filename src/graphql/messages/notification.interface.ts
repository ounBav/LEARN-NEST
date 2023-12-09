/* eslint-disable prettier/prettier */
export interface WebNotification {
  type: string;
  title: string;
  body: string;
  icon?: string;
  click_action?: string;
}

export interface WebNotificationOption {
  notification?: WebNotification;
  data?: { [key: string]: string };
}
