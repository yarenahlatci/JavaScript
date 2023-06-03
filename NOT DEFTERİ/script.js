var notlar = [];

function notuKaydet() {
  var notMetni = document.getElementById("not-alani").value;
  if (notMetni !== "") {
    var not = {
      metin: notMetni,
      id: new Date().getTime(),
    };
    notlar.push(not);
    olusturNotElementi(not);
    document.getElementById("not-alani").value = "";
  }
}

function olusturNotElementi(not) {
  var li = document.createElement("li");
  li.id = not.id;

  var span = document.createElement("span");
  span.className = "not-icerigi";
  span.textContent = not.metin;

  var silBtn = document.createElement("button");
  silBtn.textContent = "Sil";
  silBtn.addEventListener("click", function () {
    notuSil(not.id);
  });

  var duzenleBtn = document.createElement("button");
  duzenleBtn.textContent = "Duzenle";
  duzenleBtn.addEventListener("click", function () {
    notuDuzenle(not.id);
  });

  li.appendChild(span);
  li.appendChild(silBtn);
  li.appendChild(duzenleBtn);

  document.getElementById("notlar-listesi").appendChild(li);
}

function notuSil(id) {
  var index = notlar.findIndex(function (not) {
    return not.id === id;
  });

  if (index !== -1) {
    notlar.splice(index, 1);
    document.getElementById(id).remove();
  }
}

function notuDuzenle(id) {
  var not = notlar.find(function (n) {
    return n.id === id;
  });

  if (not) {
    var yeniMetin = prompt("Yeni not metnini girin", not.metin);
    if (yeniMetin !== null) {
      var li = document.getElementById(id);
      li.querySelector(".not-icerigi").textContent = yeniMetin;
      not.metin = yeniMetin;
    }
  }
}
document.getElementById("stil-listesi").addEventListener("change", function () {
  var secilenStil = this.value;
  document.body.className = secilenStil;
});

document.getElementById("kaydet-btn").addEventListener("click", notuKaydet);
