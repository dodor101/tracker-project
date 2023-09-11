console.log('hello World');
const displayTimeEl = $('.display-time');

function displayTime() {
  let rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  displayTimeEl.text(rightNow);
}
displayTime()
setInterval(displayTime, 1000)