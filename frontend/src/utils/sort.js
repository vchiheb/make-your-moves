export default function sortByTitle(a, b) {
  /*  const titleA = a.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison
  const titleB = b.title.toUpperCase(); // Convert to uppercase for case-insensitive comparison
  console.log("Comparing titles:", titleA, titleB);
  if (titleA < titleB) {
    return -1; // titleA comes before titleB
  }
  if (titleA > titleB) {
    return 1; // titleA comes after titleB
  }
  return 0; // titles are equal, maintain original relative order

  const arr = ['item1', 'item10', 'item2', 'alpha3', 'alpha1', 'alpha20', '100', '20'];
});
*/
  //console.log("Comparing titles:", a.title, b.title);
  return a.title.localeCompare(b.title, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}
