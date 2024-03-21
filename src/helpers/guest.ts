export const isGuest = (): boolean => {
  const guest = window.localStorage.getItem('isGuest') ?? false;

  if (guest === 'true') {
    return true;
  } else {
    return false;
  }
};
