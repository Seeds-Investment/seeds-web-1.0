import { trackEvent } from '@phntms/next-gtm';
import DeviceDetector from 'device-detector-js';

interface Tracker {
  event: string;
  userId?: string;
  postId?: string;
  statusLike?: boolean;
  circleId?: string;
  personId?: string;
  pageName?: string;
}

const TrackerEvent = ({
  event,
  userId,
  postId,
  statusLike,
  circleId,
  personId,
  pageName
}: Tracker): void => {
  const deviceDetector = new DeviceDetector();

  trackEvent({
    event,
    data: {
      user_id: userId,
      post: { post_id: postId, status_like: statusLike },
      circle_id: circleId,
      person_id: personId,
      page_name: pageName,
      created_at: new Date().toString(),
      device: {
        user_device: deviceDetector.parse(navigator.userAgent).device?.type,
        user_type: deviceDetector.parse(navigator.userAgent).client?.type,
        user_os: deviceDetector.parse(navigator.userAgent).os?.name
      }
    }
  });
};

export default TrackerEvent;
