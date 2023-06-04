function convertToStringable(el) {
  //convert data objects into something useful for the reader
  if (Array.isArray(el)) {
    return `${el}`; //built-in is fine for our case
  }
  //if is object
  if (typeof el === "object") {
    return JSON.stringify(el);
  } else return el;
}

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
          `${acc}${!acc.length ? "" : delimiter}"${
            !obj[key] ? "" : convertToStringable(obj[key])
          }"`,
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
