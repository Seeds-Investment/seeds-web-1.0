import { trackEvent } from '@phntms/next-gtm';
import DeviceDetector from 'device-detector-js';

interface Tracker {
  event: string;
  [key: string]: any;
}

const TrackerEvent = ({ event, ...additionalData }: Tracker): void => {
  const deviceDetector = new DeviceDetector();

  trackEvent({
    event,
    data: {
      ...additionalData,
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
