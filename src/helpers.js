export function isPromise(p) {
  if (typeof p === "object" && typeof p.then === "function") {
    return true;
  }
  return false;
}

export function arrToCsv(arr, columns, delimiter = ",") {
  return [
    columns.join(delimiter),
    ...arr.map((obj) =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? "" : delimiter}"${!obj[key] ? "" : obj[key]}"`,
        ""
      )
    ),
  ].join("\n");
}

//TODO: escape delimiter?
//TODO escape quotes?

export function collectAllKeyNames(array) {
  const keyNames = array.map((el) => Object.keys(el)).flat();
  return [...new Set(keyNames)];
}
