const correctAnswers=['e','e','e','e'];
const form=document.querySelector('.question-form');
const result = document.querySelector('.result');

form.addEventListener('submit',e=>{
    e.preventDefault();

    let score=0;
    const userAnsers=[form.q1.value,form.q2.value,form.q3.value,form.q4.value];

    userAnsers.forEach((answer,index) =>{
        if(answer === correctAnswers[index])
        {
            score +=25;
        }
    })

    result.classList.remove('d-none');
    let puan = 0;
    const bastir = setInterval(() => {
        result.querySelector('span').textContent = `${puan}%`;
        if(puan == score){
            clearInterval(bastir);
        }
        else{
            puan++;
        }     
    }, 10);
})

/*
//Settimeout bir kere çalışır
setTimeout(()=>{
    console.log("Yaren");
},2000)

//SetInterval sürekli çalışır.Bunu durdurmak için clearInterval kullanırız.

let i=0;
const bastir = setInterval(()=>{
    console.log("Yaren");
    i++;
    if(i == 4){ //4 kere basar ve durur.
        clearInterval(bastir);
    }
},2000)*/

