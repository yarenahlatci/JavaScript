setInterval(SaatiCalistir, 500);

function SaatiCalistir() {
  var suankiSaat = new Date();
  var hh = suankiSaat.getHours();
  var mm = suankiSaat.getMinutes();
  var ss = suankiSaat.getSeconds();
  document.getElementById("saat").innterHTML = new Date()
    .toTimeString()
    .split(" ")[0];
}

function Formatla(text) {
  if (text.toString().length === 1) {
    return "0" + text;
  } else {
    return text;
  }
}
