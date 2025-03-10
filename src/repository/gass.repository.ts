import axios from 'axios';

export const gassPost = async (payload: {
  act: 'form_update' | 'form_trigger_custom';
  visitor_id?: string;
  phone?: string;
  email?: string;
  event?: 'prospek' | 'purchase';
}): Promise<void> => {
  try {
    await axios.post(`https://z26.gass.co.id/api.html`, {
      ...payload,
      project_key:
        process.env.NEXT_PUBLIC_GASS_PROJECT_KEY ??
        '939E98001B6C92B322B0F42C05121F1E'
    });
  } catch (error) {}
};
