function add_options() {
  let selects = document.querySelectorAll(".select_container select");
  for (const select of selects) {
    for (const i in countryList) {
      let option;
      option = document.createElement("option");
      option.innerHTML = i;
      option.value = i;
      if (select.name == "from" && i == "USD") {
        option.selected = "selected";
      }
      if (select.name == "to" && i == "PKR") {
        option.selected = "selected";
      }
      select.append(option);
    }
    select.addEventListener("change", (e) => {
      flag_select_change(e.target);
    });
  }
}
add_options();

function flag_select_change(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.querySelector("img").src = newSrc;
}

let besURL =
  "https://v6.exchangerate-api.com/v6/c8f7ba642741c3ceecdb9278/latest/USD";
besURL = besURL.slice(0, 67);
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let btn = document.querySelector("form button");
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amVal = amount.value;
  if (amVal == "" || amVal == " " || amVal < 1 || isNaN(amVal)) {
    amVal = 1;
    amount.value = "1";
  } else {
    let api_1 = await fetch(besURL + `${fromCurr.value}`);
    let api_1_json = await api_1.json();
    let response = api_1_json.conversion_rates[toCurr.value].toFixed(3);
    document.querySelector("#final_result").innerHTML = `${amVal} ${fromCurr.value} = ${amVal*response} ${toCurr.value}`;
  }
});
