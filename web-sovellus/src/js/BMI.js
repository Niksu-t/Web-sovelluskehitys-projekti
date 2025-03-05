/// BMI output values for calling them later
const bmi_descript = {
  underweight: "You are underweight",
  normal: "You are of normal weight",
  overweight: "You are overweight",
};

/// Calculates BMI according to the standard formula
function calcBMI() {
  const resultNum = document.getElementById("resultNum");
  const results = document.getElementById("results");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");

  const tabUnder = document.getElementById("underWeight");
  const tabNorm = document.getElementById("normalWeight");
  const tabOver = document.getElementById("overWeight");

  /// The actual formula
  const bmi = weight.value / (height.value / 100) ** 2;

  /// Displays the result with two decimal precision
  resultNum.innerHTML = "Your measurement result: " + bmi.toFixed(2);

  /// Checks the obtained value from the calculations and sets the correct color in the table.
  if (bmi < 19) {
    tabUnder.classList.add("highlighted");
    results.innerHTML = "Analysis: " + bmi_descript.underweight;
  } else if (bmi < 25) {
    tabNorm.classList.add("highlighted");
    results.innerHTML = "Analysis: " + bmi_descript.normal;
  } else {
    tabOver.classList.add("highlighted");
    results.innerHTML = "Analysis: " + bmi_descript.overweight;
  }
}

/// Adds an event listener to the button
const button = document.getElementById("bmiButton");
button.addEventListener("click", calcBMI);
