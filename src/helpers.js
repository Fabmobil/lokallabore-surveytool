const DELIMITER = ",";

//TODO escape quotes?
function convertToStringable(el) {
  //convert data objects into something useful for the reader
  let str = "";
  if (Array.isArray(el)) {
    str = `${el}`; //built-in is fine for our case
  } else if (typeof el === "object") {
    str = JSON.stringify(el);
  } else {
    str = String(el);
  }
  return str.replaceAll(DELIMITER, ";").replaceAll("#", "{HASH}"); //a hash (#) in the data cuts off the csv file triggers the download 🙈
}

export function isPromise(p) {
  if (typeof p === "object" && typeof p.then === "function") {
    return true;
  }
  return false;
}

export function arrToCsv(arr, columns, delimiter = DELIMITER) {
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

export function collectAllKeyNames(array) {
  const keyNames = array.map((el) => Object.keys(el)).flat();
  return [...new Set(keyNames)];
}
