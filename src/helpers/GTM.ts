import { trackEvent } from '@phntms/next-gtm';
import DeviceDetector from 'device-detector-js';

interface Tracker {
  event: string;
  [key: string]: any;
}

const TrackerEvent = ({ event, ...additionalData }: Tracker): void => {
  const detector = new DeviceDetector();

  trackEvent({
    event,
    data: {
      ...additionalData,
      created_at: new Date().toString(),
      device: {
        user_device: detector.parse(navigator.userAgent).device?.type,
        user_type: detector.parse(navigator.userAgent).client?.type,
        user_os: detector.parse(navigator.userAgent).os?.name
      }
    }
  });
};

export default TrackerEvent;
