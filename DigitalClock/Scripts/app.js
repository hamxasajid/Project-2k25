setInterval(myFunction, 1000);
function myFunction() {
  const date = new Date();
  let hour = date.getHours() % 12 === 0 ? 12 : date
    .getHours() % 12;
  document.getElementById("hr").innerHTML = hour
    .toString().padStart(2, "0");
  document.getElementById("mn").innerHTML = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  document.getElementById("sc").innerHTML = date
    .getSeconds()
    .toString()
    .padStart(2, "0");
  document.getElementById("am").innerHTML = date.getHours() >= 12 ? "PM" : "AM";
}

const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
    ];
let allDays = "";
const today = new Date().getDay();
for (let i = 0; i < daysOfWeek.length; i++) {
  i === today
    ? (allDays += `<span style="color: #6495ed; font-weight: bold;">${daysOfWeek[i]}</span>&nbsp;&nbsp;&nbsp;`)
    : (allDays += `${daysOfWeek[i]}&nbsp;&nbsp;&nbsp;`);
}
document.getElementById("day").innerHTML = allDays;

let date = new Date();
let accdate = `<span style="color: #6495ed;">${date
  .getDate()
  .toString()
  .padStart(2, "0")}</span>`;
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
document.getElementById("date").innerHTML =
  months[date.getMonth()] + " " + accdate + "," + " " + date.getFullYear();
