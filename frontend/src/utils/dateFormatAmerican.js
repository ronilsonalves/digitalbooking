export function dateFormatAmerican(data) {
  return data.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-')
}