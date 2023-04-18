export function makeUpperCaseFirstLetter(str) {
  return str ? str[0].toUpperCase().trim() + str.slice(1).toLowerCase() : "";
}
