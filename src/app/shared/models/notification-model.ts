export interface NotificationModel {
  id: number;
  title: string;
  summary: string;
  link: string;
  publishedAt: Date;
  sent: boolean;
}
