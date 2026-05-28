export function getImageUrl(imagePath) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const parts = imagePath.split('/');
  const filename = encodeURIComponent(parts.pop());
  return `/storage/${parts.join('/')}/${filename}`;
}