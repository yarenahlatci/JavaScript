setInterval(SaatiCalistir, 500);

function SaatiCalistir() {
  var suankiSaat = new Date();
  var hh = suankiSaat.getHours();
  var mm = suankiSaat.getMinutes();
  var ss = suankiSaat.getSeconds();
  document.getElementById("saat").innerHTML =
    Formatla(hh) + ":" + Formatla(mm) + ":" + Formatla(ss);
}

function Formatla(text) {
  if (text.toString().length === 1) {
    return "0" + text;
  } else {
    return text;
  }
}
