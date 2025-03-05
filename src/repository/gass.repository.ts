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
        process.env.GASS_PROJECT_KEY ?? '2C7130938FA0448951D504CB4283CB1B'
    });
  } catch (error) {}
};
