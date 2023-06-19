// DECLARACION DE VARIABLES
let shoppingCar = JSON.parse(localStorage.getItem("shoppingCar"));
const prodEnvio = document.querySelector(".prodEnvio");
const quantityProducts = document.querySelectorAll(".quantityProducts");
const subtotal = document.querySelector(".totCestaSubtotal");
const total = document.querySelector(".totCestaTotal");
const ivaTotal = document.querySelector(".ivaTotal")
const chequeado = document.querySelector(".chequeado")
const inputsEnvios = document.querySelectorAll(".inputsEnvio");
const envioPrice = document.querySelector(".envioPrice");
const cantProducts = document.querySelectorAll(".cantProd");

// FUNCION QUE RETORNA LA CANTIDAD DE PRODUCTOS DE LA CESTA
const sumaCantProductos = (shoppingCar) => {
    let cantProducts = shoppingCar.reduce((acc, e) => {
        acc += e.quantity;
        return acc;
    }, 0);
    return cantProducts;
};

// FUNCION QUE RETORNA EL PRECIO DE LA CANTIDAD DE PRODUCTOS DE LA CESTA
const precioTotalSoloProductos = (shoppingCar) => {
    let precioTotalProductos = shoppingCar.reduce((acc, e) => {
        acc += e.quantity * e.price;
        return acc;
    }, 0);
    return precioTotalProductos;
};

// FUNCION PARA ACTUALIZAR EN DOM
const updatePrecios = () => {
    quantityProducts.forEach((quantityProduct) => (quantityProduct.innerText = sumaCantProductos(shoppingCar)));
    subtotal.innerText = `${precioTotalSoloProductos(shoppingCar)},00 €`;
    if (chequeado.checked) {
        total.innerText = `${precioTotalSoloProductos(shoppingCar)},00 €`
        ivaTotal.innerText = `${(precioTotalSoloProductos(shoppingCar) * 0.01).toFixed(2)} €`
        envioPrice.innerText = "GRATIS";
    } else {
        total.innerText = `${precioTotalSoloProductos(shoppingCar) + 9},00 €`
        ivaTotal.innerText = `${((precioTotalSoloProductos(shoppingCar) + 9) * 0.01).toFixed(2)} €`
        envioPrice.innerText = 9 + ",00 €";
    }
}

updatePrecios()

if (shoppingCar.length == []) {
    prodEnvio.innerHTML += `<p style="margin:1rem 0;padding:2rem 2rem; background-color:#f4f4f4">NO HAY PRODUCTOS TODAVIA</p>`;
} else {
    shoppingCar.forEach((e) => {
        prodEnvio.innerHTML += `
                        <div class="resumenCesta">
                            <div class="joinDivs">
                                <div id="${e.id}" class="moreLess">
                                    <p class="btn">-</p>
                                    <p class="cantProd">${e.quantity}</p>
                                    <p class="btn">+</p>
                                </div>

                                <div class="productDetail">
                                    <img src="${e.img}" alt="">
                                    <div>
                                        <p class="bagsNames">${e.name}</p>
                                        <p>${e.description}</p>
                                    </div>
                                </div>
                            </div>
                            <p class="priceResumen negritas"><span class="priceResumenSpan">${e.price * e.quantity},00 €</span></p>
                        </div>
                        <hr>`;
    });
}

const btnContadores = document.querySelectorAll(".btn");
let tipoEnvio = document.querySelector('input[name="demoraEnvio"]:checked');

// CONTADORES
btnContadores.forEach((btnContador, i) => {
    btnContador.addEventListener("click", () => {
        // ESTE CONDICIONAL TOMA LOS BOTONES DE INDICE PAR LOS CUALES SON LOS QUE RESTAN Y EL ELSE LOS QUE SUMAN
        if (i % 2 == 0) {
            btnContador.nextElementSibling.innerText--;
            let nameProd = btnContador.parentNode.nextElementSibling.children[1].children[0].innerText;
            let k = shoppingCar.findIndex((elements) => elements.name === nameProd);
            shoppingCar[k].quantity--;
            btnContador.parentNode.parentNode.parentNode.children[1].children[0].innerText = `${shoppingCar[k].price * shoppingCar[k].quantity},00 €`;
            updatePrecios()

            // SI EL CONTADORE LLEGA A 0...
            if (shoppingCar[k].quantity <= 0) {
                btnContador.parentNode.parentNode.parentNode.nextElementSibling.remove();
                btnContador.parentNode.parentNode.parentNode.remove();
                shoppingCar.splice(k, 1);
                if (shoppingCar.length == 0) { prodEnvio.innerHTML += `<p style="margin:1rem 0;padding:2rem 2rem; background-color:#f4f4f4">NO HAY PRODUCTOS TODAVIA</p>`; }
                updatePrecios()
            }
        } else {
            btnContador.previousElementSibling.innerText++;
            let nameProd = btnContador.parentNode.nextElementSibling.children[1].children[0].innerText;
            let k = shoppingCar.findIndex((elements) => elements.name === nameProd);
            shoppingCar[k].quantity++;
            updatePrecios()
            btnContador.parentNode.parentNode.parentNode.children[1].children[0].innerText = `${shoppingCar[k].price * shoppingCar[k].quantity},00 €`;
        }
        localStorage.setItem("carrito", JSON.stringify(shoppingCar));
    })
})

inputsEnvios.forEach((inputEnvios) => {
    inputEnvios.addEventListener("change", (e) => {
        updatePrecios()
    })
})