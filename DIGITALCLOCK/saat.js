//TARAYICIDA SAAT OLUŞTURALIM
const clock = document.querySelector('.digital-clock');

const tick = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const html = `
        <span>${hours}</span>: 
        <span>${minutes}</span>:
        <span>${seconds}</span>
    `;

    clock.innerHTML = html;
};

setInterval(tick, 1000);

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = formattedDate;
}

setInterval(updateDate, 1000);

updateDate();

 // Renk Değiştirme Seçeneği
 const colorPicker = document.getElementById('colorPicker');
 
 colorPicker.addEventListener('input', function () {
     clock.style.color = this.value;
 });
 

