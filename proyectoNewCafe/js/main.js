const coffee = [
  { id: 0, quantity: 1 ,name: 'Costa Rica Tarrazú', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffee bag Costa Rica.png' },
  { id: 1, quantity: 1 ,name: 'Colombia Los Naranjos', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffee bag Colombia.png' },
  { id: 2, quantity: 1 ,name: 'Laos Amanecer', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffee bag Laos.png' },
  { id: 3, quantity: 1 ,name: 'Etiopía Yrgacheff', description: 'Paquete de café, 250 gr', price: 9.0, img: '../img/Coffee bag Eriopia.png' }
]

const shoppingCar = JSON.parse(localStorage.getItem("shoppingCar")) || [];
const containerCart = document.querySelector(".containerCoffees")

coffee.forEach((e) => {
  containerCart.innerHTML += `
            <div id="${e.id}" class="coffeCart">
                <img src="${e.img}" alt="${e.name}" />
                <h3>${e.name}</h3>
                <p>€ ${e.price},00 €</p>
                <button class="add">Añadir</button>
            </div>`;
});

const quantityProduct = document.querySelector(".quantityProducts");
const sumaCantProductos = (shoppingCar) => {
  quantityProduct.innerText = shoppingCar.reduce((acc, e) => {
    acc += e.quantity;
    return acc;
  }, 0);
};
sumaCantProductos(shoppingCar);

const addButtons = document.querySelectorAll(".containerCoffees .coffeCart .add");
addButtons.forEach((addButton, i) => {
  addButton.addEventListener("click", () => {
    let k = shoppingCar.findIndex((elements) => elements.name === coffee[i].name);
    //SI COINCIDE QUE LE AÑADA 1 MAS AL QUANTITY DE ESE OBJETO CON EL INDICE K 
    if (shoppingCar.find((element) => element.name === coffee[i].name)) {
      shoppingCar[k].quantity++;
    } else {
      // SI NO ENCUENTRA COINCIDENCIAS QUE AÑADA EL NUEVO PRODUCTO AL CARRITO Y LOS ORDENE POR ID
      shoppingCar.push(coffee[i]);
      shoppingCar.sort((a, b) => a.id - b.id);
    }
    //SETEAMOS LOCALSTORAGE Y ACTUALIZAMOS LA CANTIDAD EN EL CONTADOR DE LA CESTA
    localStorage.setItem("shoppingCar", JSON.stringify(shoppingCar));
    sumaCantProductos(shoppingCar);
  });
});

const arrowThirdSection = document.querySelectorAll(".tsContainerContent .pregunta .arrowthirdSection");

arrowThirdSection.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    arrow.classList.toggle('rotate')
    arrow.parentNode.parentNode.children[1].classList.toggle('showContent')
  });
});

//Con esto se hace el desplegable de las preguntas frecuentes!
const acc = document.getElementsByClassName("imgDesplegador");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}