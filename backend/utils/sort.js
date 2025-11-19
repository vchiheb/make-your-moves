export default function sortByTitle(a, b) {
  const titleA = a.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison
  const titleB = b.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison

  if (titleA < titleB) {
    return -1; // titleA comes before titleB
  }
  if (titleA > titleB) {
    return 1; // titleA comes after titleB
  }
  return 0; // titles are equal, maintain original relative order
}
