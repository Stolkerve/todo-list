export function toTimeStamp(date: Date | any) {
  if(date)
  {
  return date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours() % 12).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
  }
  else
    return undefined;
}