const coffee = [
    { id: 0, quantity: 1 ,name: 'Costa Rica Tarrazú', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffee bag Costa Rica.png' },
    { id: 1, quantity: 1 ,name: 'Colombia Los Naranjos', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffee bag Colombia.png' },
    { id: 2, quantity: 1 ,name: 'Laos Amanecer', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffee bag Laos.png' },
    { id: 3, quantity: 1 ,name: 'Etiopía Yrgacheff', description: 'Paquete de café, 250 gr', price: 9.0, img: '../img/Coffee bag Eriopia.png' },
    { id: 4, quantity: 1 ,name: 'Kenia Ndunduri', description: 'Paquete de café, 250 gr', price: 15.00, img: '../img/Coffee bag Kenia Ndunduri.png' },
    { id: 5, quantity: 1 ,name: 'Etiopía Sidamo', description: 'Paquete de café, 250 gr', price: 17.00, img: '../img/Coffee bag Etiopía Sidamo.png' },
    { id: 6, quantity: 1 ,name: 'Costa Rica Monte Bello', description: 'Paquete de café, 250 gr', price: 12.00, img: '../img/Coffee bag Costa Rica Monte Bello.png' },
    { id: 7, quantity: 1 ,name: 'Colombia La Casita', description: 'Paquete de café, 250 gr', price: 9.00, img: '../img/Coffe bag Colombia La Casita.png', isDisabled: 'disabled' }
]

const shoppingCar = JSON.parse(localStorage.getItem("shoppingCar")) || [];

const quantityProduct = document.querySelector(".quantityProducts");

const sumaCantProductos = (shoppingCar) => {
  quantityProduct.innerText = shoppingCar.reduce((acc, e) => {
    acc += e.quantity;
    return acc;
  }, 0);
};

sumaCantProductos(shoppingCar);

const containerCart = document.querySelector(".containerCoffees");
// PARA HACER CON UNA TABLA DESPUES
// const table = document.createElement("table")
// function generadorTable(tableCont) {
//     let coffeLeng = coffee.length;
//     while (coffeLeng < tableCont) {
//         const row = document.createElement("tr");

//         let n = 1;
//         let interationCount = tableCont - coffeLeng > 4 ? 4 : tableCont - coffeLeng;
//         console.log(row);
//         while (n <= interationCount) {
//             const data = document.createElement("td");
//             row.appendChild(data);
//             n++;
//             coffeLeng++;
//         }
//         table.appendChild(data);
//     }
// }
// containerCart.appendChild(table);

coffee.forEach((e) => {
  containerCart.innerHTML += `
            <div id="${e.id}" class="coffeCart">
                <img src="${e.img}" alt="${e.name}" />
                <h3>${e.name}</h3>
                <p>€ ${e.price},00 €</p>
                <button ${e.isDisabled} class="add">Añadir</button>
            </div>`;
});

const addButtons = document.querySelectorAll(".containerCoffees .coffeCart .add");

addButtons.forEach((addButton, i) => {
    addButton.addEventListener("click", () => {
    
    let k = shoppingCar.findIndex((elements) => elements.name === coffee[i].name);
    console.log(k);

    if (shoppingCar.find((element) => element.name === coffee[i].name)) {
      shoppingCar[k].quantity++;
    } else {
      shoppingCar.push(coffee[i]);
      shoppingCar.sort((a, b) => a.id - b.id);
    }
    
    localStorage.setItem("shoppingCar", JSON.stringify(shoppingCar));
    sumaCantProductos(shoppingCar);
  });
});