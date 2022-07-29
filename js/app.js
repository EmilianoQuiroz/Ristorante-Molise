const carrito = [];
const arrayDeProductos = [
                          {id:1, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:2, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:3, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:4, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:5, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:6, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:7, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:8, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"},
                          {id:9, titulo:"Ensalada Agnone", precio: 700, imagen:"assets/img/ensalada.webp"}
                        ];
                          /*Emulacion de un comportamiento dinamico que se adapta 
                          a la n cantidad de elementos que recibamos de una base de 
                          datos, servidor, etc.*/

let acumulador = ``;
arrayDeProductos.forEach((producto) => {
    acumulador += `
    <div class="plato" data-plato="ensalada">
    <img data-src="${producto.imagen}" alt="ensalada">
    <h2>${producto.titulo}</h2>
    <p>Pepino, chaucha y verduras regionales.</p>
    <div class="precio">
        <p>$${producto.precio}</p>
        <div class="btn-cart"><i class="fas fa-shopping-basket"></i></div>
    </div>
</div>`
});

document.getElementById('platos').innerHTML = acumulador


const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnBebidas = document.querySelector('.bebidas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatos = document.querySelector('.platos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});

imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const platos = () =>{
    let platosArreglo = [];
    const platos = document.querySelectorAll('.plato');

    platos.forEach(plato=> platosArreglo = [...platosArreglo,plato]);

    const bebidas = platosArreglo.filter(ensalada=> ensalada.getAttribute('data-plato') === 'ensalada');
    const pastas = platosArreglo.filter(pasta => pasta.getAttribute('data-plato') === 'pasta');
    const pizzas = platosArreglo.filter(pizza => pizza.getAttribute('data-plato') === 'pizza');
    const postres = platosArreglo.filter(postre=> postre.getAttribute('data-plato') === 'postre');

    mostrarPlatos(bebidas, pastas, pizzas, postres, platosArreglo);

}

const mostrarPlatos = (bebidas, pastas, pizzas, postres, todos) =>{
    btnBebidas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        bebidas.forEach(ensalada=> contenedorPlatos.appendChild(ensalada));
    });

    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
         pastas.forEach(pasta=> contenedorPlatos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        pizzas.forEach(pizza=> contenedorPlatos.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        postres.forEach(postre=> contenedorPlatos.appendChild(postre));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatos);
        todos.forEach(todo=> contenedorPlatos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}


