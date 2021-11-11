export const commaNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/[^0-9^,^]+/g, '');

export const shortNum = donuts => {
  let val = NaN;
  if (donuts > 0) donuts = Math.floor(donuts)
  if (donuts < 100000) val = commaNumber(donuts);
  else if (donuts < 1000000) val = Math.floor(donuts/1000) + 'K';
  else val = Math.floor(donuts/100000)/10 + 'M';
  return Number.isNaN(val) ? '0' : val;
}
