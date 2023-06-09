// Clase constructora para instanciar objetos de Bebidas
function Bebida(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
    this.seleccionado = false
}

// Clase constructora para instanciar objetos de Menú
function Menu(nombre, precio,descripcion, foto) {
    this.nombre = nombre
    this.precio = precio
    this.descripcion = descripcion
    this.foto = foto
    this.seleccionado =false
}

// Objetos para crear bebidas
var bebida1 = new Bebida("Martini", 2550)
var bebida2 = new Bebida("Cappuccino", 1370)
var bebida3 = new Bebida("Latte", 1350)
var bebida4 = new Bebida("Mojito", 2290)

// Incorpora los objetos de bebidas en un arreglo
var listadoBebidas = [bebida1, bebida2, bebida3, bebida4]



// Objetos para crear listado de Menú
var menu1 = new Menu("Insalata de riso", 6750, "Ensalada para 2", "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/12/ricetta-insalata-riso/_jcr_content/header-par/image_single.img.jpg/1629699129365.jpg")
var menu2 = new Menu("Insalata al Cipollotti", 5990, "Ensalada para dos", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvTMqGi4K1OjOD6ZbwqwANP8bJoUQkHAaZniNPGuuW-LakKZ81K-WZeufoMD6qt2O7MM&usqp=CAU")
var menu3 = new Menu("Insalata Caprese", 8250, "Ensalada para uno con oregano","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ9vtroNaJfOlDiLlYAvNSa7uAWnoPQCZROlkJcUSruLcLxX5lD58Xdll4w-kUb_gCfI4&usqp=CAU")

// Definición del arreglo vacío para los items del menú
var listadoMenu = []
// AL arreglo vacío incorporamos los 3 objetos para los items del menú
listadoMenu.push(menu1, menu2, menu3)


// Función utilizada para detectar cuando el usuario hace click en el check de una bebida
function cambioBebida(indice, checkbox) {
    var seleccionado = $(checkbox).prop('checked') // Consulta si el check que disparó el evento está checked o no
    listadoBebidas[indice].seleccionado = seleccionado // Cambia en el arreglo de objetos la propiedad seleccionado al item de bebida que corresponde
    calcularCuenta()
}

function cambioMenu(indice, checkbox) {
    var seleccionado = $(checkbox).prop('checked')
    listadoMenu[indice].seleccionado = seleccionado
    calcularCuenta()
}

function calcularCuenta() {
    var total = 0
    var seleccionados = listadoBebidas.filter(bebida => bebida.seleccionado)
    $("#total-cuenta tbody").html("")
    seleccionados.forEach(item => {
        total = total + item.precio
        $("#total-cuenta tbody").append(`
            <tr>
                <td>${item.nombre}</td>
                <td class="text-end fw-bold">$${item.precio.toLocaleString('es-CL')}</td>
            </tr>
        `)
    })

    var seleccionados = listadoMenu.filter(menu => menu.seleccionado)
    seleccionados.forEach(item => {
        total += item.precio
        $("#total-cuenta tbody").append(`
            <tr>
                <td>${item.nombre}</td>
                <td class="text-end fw-bold">$${item.precio.toLocaleString('es-CL')}</td>
            </tr>
        `)
    })

    $("#total").html(`$${total.toLocaleString('es-CL')}`)
}


$(document).ready(function(){
    // Ciclo que muestra al usuario los items de bebidas
    listadoBebidas.forEach((bebida, index) => {
        $("#listado-bebidas").append(`
        <li class="list-group-item d-flex justify-content-between">
            <div class="form-check">
                <input 
                class="form-check-input" 
                type="checkbox" value="" 
                id="checkBebida${index}"
                onChange="cambioBebida(${index}, this)"
                >
                <label class="form-check-label" for="checkBebida${index}">
                ${bebida.nombre}
                </label>
            </div>
            <div class="fw-bold">$${bebida.precio.toLocaleString('es-CL')}</div>
        </li>
        `)
    })


    // Ciclo que muestra al usuario los items del Menu
    listadoMenu.forEach((menu, index) => {
        $("#listado-menu").append(`
            <li class="list-group-item">
                <div class="form-check">
                    <input 
                    class="form-check-input" 
                    type="checkbox" value="" 
                    id="cambioMenu(${index}"
                    onChange="cambioMenu(${index}, this)"
                    >
                    <label class="form-check-label fw-bold" for="cambioMenu(${index}">
                        ${menu.nombre}
                    </label>
                </div>
                    <div class="d-flex justify-content-between">
                        <div>${menu.descripcion}</div>
                        <div><img src="${menu.foto}" class="rounded-circle" width="50px"></div>
                </div>
                <div class="fw-bold">$${menu.precio.toLocaleString('es-CL')}</div>    
            </li>
        `)    
    })
})

    