
/// BMI:n tulostusarvot varmiiksi niiden kutsumista varten
const bmi_descript = {
  underweight: "Olet alipainoinen",
  normal: "Olet normaalin painoinen",
  overweight: "Olet ylipainoinen",
};


/// Laskee BMI:n standardin kaavan mukaisesti
function calcBMI() {
  const resultNum = document.getElementById("resultNum");
  const results = document.getElementById("results");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");

  const tabUnder = document.getElementById("underWeight");
  const tabNorm = document.getElementById("normalWeight");
  const tabOver = document.getElementById("overWeight");

  /// Varsinainen kaava
  const bmi = weight.value / (height.value / 100) ** 2;

  /// Näyttää tuloksen kahden desimaalin tarkkuudella
  resultNum.innerHTML = "Mittaustuloksesi: " + bmi.toFixed(2);


  /// Tarkistaa saadun arvon laskuista ja asettaa taulukkoon oikean värin.
  if (bmi < 19) {
    tabUnder.classList.add("highlighted");
    results.innerHTML = "Analyysi: " + bmi_descript.underweight;
  } else if (bmi < 25) {
    tabNorm.classList.add("highlighted");
    results.innerHTML = "Analyysi: " + bmi_descript.normal;
  } else {
    tabOver.classList.add("highlighted");
    results.innerHTML = "Analyysi: " + bmi_descript.overweight;
  }
}

/// Lisää tapahtumankuuntelijan painikkeelle
const button = document.getElementById("bmiButton");
button.addEventListener("click", calcBMI);
