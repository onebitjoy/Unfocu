export function postTimePassageCalc(postTime: string) {
  const timeOfPost = new Date(postTime)
  const currentTime = new Date()
  const diffMs = currentTime.getTime() - timeOfPost.getTime()

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 24);
  const diffYears = Math.floor(diffMonths / 24);

  const TimeDiff = diffYears > 0 ? `${diffYears}y` : (diffMonths > 0 ? `${diffMonths}mo` : (diffDays > 0 ? `${diffDays}d` : (diffHours > 0 ? `${diffHours}h` : (diffMinutes > 0 ? `${diffMinutes}m` : "now"))))
  return TimeDiff
}