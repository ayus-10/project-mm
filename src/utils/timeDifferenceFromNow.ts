export function timeDifferenceFromNow(isoDate: string) {
  const inputDate = new Date(isoDate).getTime();
  const now = new Date().getTime();

  const diffInMilliseconds = now - inputDate;

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30.44);

  if (diffInMinutes <= 1) {
    return "1 minute";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes`;
  } else if (diffInHours === 1) {
    return "1 hour";
  } else if (diffInHours < 24) {
    return `${diffInHours} hours`;
  } else if (diffInDays === 1) {
    return "1 day";
  } else if (diffInDays < 30) {
    return `${diffInDays} days`;
  } else {
    return diffInMonths === 1 ? "1 month" : `${diffInMonths} months`;
  }
}
