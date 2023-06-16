function replaceQuotes(str) {
  var replacedStr = str.replace(/['"]/g, function (match) {
    if (match === '"') {
      return "'";
    } else {
      return '"';
    }
  });

  return replacedStr;
}

export { replaceQuotes };
