// HTML'de belirlediğiniz elementleri seçiyoruz
const hexInputContainer = document.querySelector("#hexInputContainer");
const hexForm = document.querySelector("#hexColorForm");
const colorInput = document.querySelector("#color");
const addColorButton = document.querySelector("#addColorButton");

// Renk girişi için bir sayaç oluşturuyoruz
let counter = 1;

// Yeni bir HEX renk girişi alanı oluşturan fonksiyon
function newHexColorInput(itemCount) {
  const newDivElement = document.createElement("div");

  // Oluşturulan div elemanına CSS sınıfı ekliyoruz
  newDivElement.classList.add("col-sm");

  // HTML içeriğini oluşturuyoruz
  newDivElement.innerHTML = `
    <label for="colorInput-${itemCount}" class="form-label">HEX Color</label>
    <input 
      id="colorInput-${itemCount}"
      type="text" 
      minlength="7" maxlength="7" 
      class="form-control" 
      name="color-${itemCount}"
    >
  `;
  return newDivElement;
}

// HEX renk girişi alanını sayfaya ekliyoruz
hexInputContainer.append(newHexColorInput(counter));

// Tarayıcı yerel depolama kullanarak renk bilgilerini saklıyoruz
let localStorageColors = localStorage.getItem("colors")
  ? JSON.parse(localStorage.getItem("colors"))
  : [];

// Renk kartlarını görüntüleyen bir elementi seçiyoruz
const colorCards = document.querySelector("#colorCards");

// Renk formunun gönderilmesini dinleyen bir olay dinleyici ekledik
hexForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let colors = [];
  
  // Formdaki renk girişlerini alıyoruz
  Array.from(event.target.elements).forEach((item) => {
    if (item.type === "text") {
      colors.push(item.value);
    }
  });
  
  // Yerel depolama ve sayfa üzerinde renk kartı oluştur
  localStorageColors.push(colors);
  colorCards.append(addColorPalette(colors));

  // Yerel depolamayı güncelle
  localStorage.setItem("colors", JSON.stringify(localStorageColors));
  hexForm.reset();
});

// "Renk Ekle" düğmesine tıklanması
addColorButton.addEventListener("click", () => {
  const selectedColor = colorInput.value;
  const colors = [selectedColor];
  
  // Yerel depolama ve sayfa üzerinde renk kartı oluşturuyoruz
  colorCards.append(addColorPalette(colors));
  localStorageColors.push(colors);
  localStorage.setItem("colors", JSON.stringify(localStorageColors));

  // Renk girişini sıfırla
  colorInput.value = "";
});

// Renk kartları bölgesine tıklanması
colorCards.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteButton")) {
    // Silme düğmesine tıklanırsa ilgili renk kartını sil
    const paletteElement = event.target.parentElement;
    const paletteIndex = Array.from(colorCards.children).indexOf(paletteElement);
    deleteColorPalette(paletteIndex);
  } else if (event.target.classList.contains("colorCard")) {
    // Renk kartına tıklanırsa rengi panoya kopyala ve kullanıcıya bilgi ver
    const bgColor = event.target.style.backgroundColor;
    navigator.clipboard.writeText(bgColor);
    alert("Renk Kopyalandı 🎨");
  }
});

// Renk kartını silen bir fonksiyon
function deleteColorPalette(paletteIndex) {
  localStorageColors.splice(paletteIndex, 1);
  localStorage.setItem("colors", JSON.stringify(localStorageColors));

  // Sayfa üzerindeki renk kartlarını güncelle
  while (colorCards.firstChild) {
    colorCards.firstChild.remove();
  }
  localStorageColors.forEach((colors) => {
    colorCards.append(addColorPalette(colors));
  });
}

// Eğer yerel depolamada renk bilgileri varsa, renk kartlarını görüntüle
if (localStorageColors.length) {
  localStorageColors.forEach((colors) => {
    colorCards.append(addColorPalette(colors));
  });
}

// Renk kartı oluşturan fonksiyon
function addColorPalette(items) {
  const rowElement = document.createElement("div");
  rowElement.classList.add("row", "gap-3", "my-3");

  items.forEach((item, index) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("col-sm", "card", "colorCard");
    cardItem.style.backgroundColor = item;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.classList.add("btn", "btn-danger", "deleteButton");
    deleteButton.style.padding = "3px 8px"; // Daha küçük padding değerleri
    deleteButton.style.fontSize = "15px"; // Daha küçük yazı boyutu
    deleteButton.style.width = "150px"; // Daha belirli bir genişlik
    deleteButton.style.backgroundColor = "white";
    deleteButton.style.color = "black";
    deleteButton.style.margin = "0 auto"; // Ortalamak için margin kullanımı
    cardItem.appendChild(deleteButton);

    rowElement.append(cardItem);
  });

  return rowElement;
}
