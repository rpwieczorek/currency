export const convertPLNToUSD = (PLN) => {
  if (typeof(PLN) == "string") {
    return NaN;
  }
  
  if (PLN === undefined) {
    return NaN;
  }

  if (typeof(PLN) === "object") {
    return "Error";
  }
  
  if (typeof(PLN) === "function") {
    return "Error";
  }

  if (PLN < 0) {
    return convertPLNToUSD(0);
  }
  
  const PLNtoUSD = PLN / 3.5;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD);
}