//Desplegable del Home
const acc = document.getElementsByClassName("imgDesplegador");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}

const bottonSelector = document.querySelectorAll(".BottonAdd");
const costaRicaSelector = document.querySelector(".costaRicaTarrazu");
let items = 0;
bottonSelector.forEach((element) => {
  element.addEventListener("click", ()=>{
    let sum = items += 1;
    let jsonSum = JSON.stringify(sum, undefined, 3);
    let acumSet = localStorage.setItem("items", jsonSum);
    let sumGet = localStorage.getItem(sum);
    let acumObj = JSON.parse(sum, undefined, 2);
    costaRicaSelector.appendChild()
    console.log(acumObj);
  })
});



