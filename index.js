/*
//animación  de la imagen caca

var imgAni = new Image();
imgAni.src = 'img/caca.png';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var y = 300; // Posición inicial en el eje y
var y2 = 320; // Posición final en el eje y
var velocidad = 1; // Velocidad de movimiento
var rotationAngle = 36 * Math.PI / 180; // 36 grados convertidos a radianes

// Tamaño deseado para la imagen
var desiredWidth = 50;
var desiredHeight = 50;

// Carga la imagen antes de iniciar la animación
imgAni.onload = function() {
  console.log('La imagen se ha cargado correctamente.');
  animar();
};

function animar() {
  // Borra solo la región ocupada por la imagen en su posición anterior
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Guarda el estado actual del contexto
  ctx.save();

  // Calcula la posición actual en función del tiempo y velocidad
  y += velocidad;

  // Si se ha alcanzado la posición final (y2), detén la animación
  if (y >= y2) {
    y = y2;
  }

  // Cambia el origen de rotación al centro de la imagen
  ctx.translate(canvas.width / 2, y + desiredHeight / 2);
  // Rota el canvas en el ángulo deseado (36 grados)
  ctx.rotate(rotationAngle);
  // Dibuja la imagen rotada en la nueva posición y con el tamaño deseado
  ctx.drawImage(imgAni, -desiredWidth / 2, -desiredHeight / 2, desiredWidth, desiredHeight);
  // Restaura el estado previo del contexto
  ctx.restore();

  // Verifica si se alcanzó la posición final (y2)
  if (y < y2) {
    // Solicita el siguiente fotograma de la animación
    requestAnimationFrame(animar);
  }
}
// muestra laimagen de jake  
function jakeC(ctx) {
    // Carga una imagen en el canvas
    var imagen = new Image();
    imagen.src = "img/jakeC.png"; 
    imagen.onload = function() {
        // Dibuja la imagen a la derecha del texto del contador de errores
        ctx.drawImage(imagen, 750, 450, 150, 100); // Ajusta las coordenadas y el tamaño de la imagen según sea necesario

        };
 
        //muestra la imagen del pajaro
        var imagen2 = new Image();
        imagen2.src = "img/pajaroC.png"; 
        imagen2.onload = function() {
            // Dibuja la imagen a la derecha del texto del contador de errores
            ctx.drawImage(imagen2, 750, 250, 150, 100); // Ajusta las coordenadas y el tamaño de la imagen según sea necesario   
            };
  
}

*/

// Variable para contar errores
var contadorErrores = 0;
var vidas = 3; // Variable para controlar las vidas del jugador

// Función para dibujar el contador de errores en el canvas
function dibujarContadorErrores(ctx) {
    // Limpia el área del contador de errores antes de dibujar el nuevo número
    ctx.clearRect(150, 10, 130, 40); // Ajusta las coordenadas según el diseño

    // Establece el fondo verde
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
    ctx.fillRect(150, 10, 130, 40); // Dibuja un rectángulo verde como fondo

    // Establece el color del texto en blanco
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.fillText('Intentos: ' + contadorErrores, 155, 40); // Posición ajustable según tu diseño
}
function manejarError() {
    contadorErrores++;
    vidas--; // Resta una vida cuando hay un error
    dibujarContadorErrores(ctx); // Actualiza el contador de errores en el canvas
    // Otro código relacionado con el manejo de errores...
}

function dibujarVidas(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Vidas: ' + vidas, 10, 30); // Ajusta la posición según tu diseño
}

function manejarError() {
    contadorErrores++;
    vidas--; // Resta una vida cuando hay un error
    dibujarContadorErrores(ctx); // Actualiza el contador de errores en el canvas

    if (vidas === 0) {
        // Si ya no quedan vidas, toma alguna acción (reiniciar juego, mostrar mensaje, etc.)
        reiniciarJuego(); // Ejemplo: reiniciar el juego
    }
    // Otro código relacionado con el manejo de errores...
}
//var palabraActual = "HOLA";

// Define los botones de las categorías
var botonesCategorias = [
    { x: 50, y: 80, ancho: 100, alto: 40, texto: 'Animales' },
    { x: 50, y: 130, ancho: 100, alto: 40, texto: 'Frutas' },
    { x: 50, y: 180, ancho: 100, alto: 40, texto: 'Paises' }
];

var mostrarCategorias = false; // Variable para controlar la visibilidad de los botones de las categorías


// Función para mostrar un mensaje
//function mostrarMensaje(mensaje) {
  //  alert(mensaje); // Cambia alert por la forma en que deseas mostrar el mensaje
//}

// Función para dibujar los botones de las categorías

// Define la información de los botones
var botones = [
    { x: 1100, y: 10, ancho: 150, alto: 40, texto: 'Reiniciar juego', clic: false },
    { x: 10, y: 10, ancho: 120, alto: 40, texto: 'Categorias', clic: false }
];



// Función para dibujar los botones en el canvas
function dibujarBotones(ctx) {
    for (var i = 0; i < botones.length; i++) {
        var boton = botones[i];

        // Dibuja el botón verde 
        ctx.fillStyle = boton.clic ? 'grey' : 'rgba(0, 255, 0, 0.3)';
        ctx.fillRect(boton.x, boton.y, boton.ancho, boton.alto);

        // Dibuja el texto en el botón
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(boton.texto, boton.x + 10, boton.y + 30);
    }
}


// Manejar clics en el canvas
canvas.addEventListener('click', function(e) {
    var mx = e.clientX - canvas.getBoundingClientRect().left;
    var my = e.clientY - canvas.getBoundingClientRect().top;

    for (var i = 0; i < botones.length; i++) {
        var boton = botones[i];

        if (mx >= boton.x && mx <= boton.x + boton.ancho && my >= boton.y && my <= boton.y + boton.alto) {
            if (boton.texto === 'Categorias') {
                mostrarCategorias = !mostrarCategorias; // Cambiar el estado de visibilidad
                // Vuelve a dibujar el canvas para mostrar u ocultar los botones de las categorías
                dibujarBotones(ctx);
             //   dibujarVidas(ctx);
              //  dibujarBotonesCategorias(ctx);
                break;
            }
            // Agrega lógica para otros botones si es necesario
        }
    }
});


var categorias = {
    animales: ["COCODRILO", "GATO", "ELEFANTE", "LEON", "PERRO", "TIGRE", "JIRAFA", "OSO"],
    frutas: ["MANZANA", "BANANA", "FRESA", "UVA", "NARANJA", "KIWI"],
    paises: ["EEUU", "FRANCIA", "ALEMANIA", "JAPÓN", "BRASIL", "ITALIA"]
};

// Selecciona una categoría aleatoria
var categoriasKeys = Object.keys(categorias);
var categoriaSeleccionada = categoriasKeys[Math.floor(Math.random() * categoriasKeys.length)];

// Selecciona una palabra aleatoria dentro de la categoría seleccionada
var palabrasCategoria = categorias[categoriaSeleccionada];
var palabraActual = palabrasCategoria[Math.floor(Math.random() * palabrasCategoria.length)];


function app(ctx) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    //Verde pálido  fondo
    var colorTecla  = "rgba(0, 255, 0, 0.3)";
    //var colorTecla = "rgba(0, 0, 0, 0.1)"; // Negro completamente transparente

    var inicioX = 20;
    var lon = 50;
    var margen = 10;
    var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var teclas = []; // Arreglo para almacenar las teclas

    var imagenCargada = false;
    var inicioY = canvas.height - 180;

    function Tecla(x, y, width, height, letra) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.letra = letra;
        this.clicked = false; // Añadir una propiedad para detectar el clic

        this.dibuja = function() {

            ctx.fillStyle = colorTecla;
         //   ctx.fillText="black";
            if (this.clicked) { // Si se hizo clic, pintar de color rojo
               // ctx.fillStyle = "red";
                ctx.fillStyle = "rgba(255, 0, 0, 0.6)"; // Rojo con 50% de opacidad

            }

            //borde del teclado cuando le das clic 
        //   ctx.strokeStyle =colorMargen;
           
           ctx.strokeStyle  = "rgba(0, 255, 0, 0.1)"; // Verde con 10% de opacidad
       //    ctx.strokeStyle="#000"
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        
            //manipula el color del texto del teclado sin loa clics
            ctx.fillStyle = "white"; 
            ctx.font = "20px Arial";
            ctx.fillText(this.letra, this.x + this.width / 2 - 5, this.y + this.height / 2 + 5);
        
            // Verificar si la letra de la tecla está en la palabra a adivinar
           var isInWord = palabraActual.includes(this.letra);

       if (this.clicked && isInWord) {

       
        // se pinta verde cuando existe la letra entre la palabra a adivinar
        ctx.fillStyle = "rgba(0, 143, 57, 0.8)"; // Verde con 60% de transparencia
        ctx.fillRect(this.x, this.y, this.width, this.height);
           ctx.strokeRect(this.x, this.y, this.width, this.height);
           //cuando  existe la palabra y cambia de color 
           ctx.fillStyle = "white";
           ctx.fillText(this.letra, this.x + this.width / 2 - 5, this.y + this.height / 2 + 5);
        contadorErrores--;
        dibujarContadorErrores(ctx);
        }
        };

        this.click = function(mx, my) {
            if (mx >= this.x && mx <= this.x + this.width &&
                my >= this.y && my <= this.y + this.height)
                {
                 this.clicked = !this.clicked; // Cambiar el estado del clic
                 if (this.clicked) 
                 {
                    mostrarLetra(this.letra); // Llama a una función para mostrar la letra
                    contadorErrores++;
                    dibujarContadorErrores(ctx); // Actualiza el contador en el canvas
                 }
              
                 this.dibuja(); // Volver a dibujar la tecla
                 }

        };
    }

 function mostrarLetra(letra) {
    // Verificar si la letra está en la palabra a adivinar
    var indices = [];
    for (var i = 0; i < palabraActual.length; i++) {
        if (palabraActual[i] === letra) {
            indices.push(i);
        }
    }

    // Si la letra está en la palabra, dibujarla en la línea correspondiente
    if (indices.length > 0) {
        var lineLength = 30; // Longitud de cada línea
        var lineSpacing = 10; // Espacio entre las líneas
        var inicioX = canvas.width / 2 - (palabraActual.length * (lineLength + lineSpacing) - lineSpacing) / 2; // Inicio X para centrar las líneas
        var inicioY = canvas.height / 2; // Posición Y centrada (ajusta según tu preferencia)

        ctx.fillStyle = "black"; // Color de la letra
        ctx.font = "25px Arial"; // Tamaño y tipo de letra

        // Dibuja la letra en cada línea correspondiente
        for (var j = 0; j < indices.length; j++) {
            var posX = inicioX + indices[j] * (lineLength + lineSpacing) + (lineLength / 2) - (ctx.measureText(letra).width / 2); // Calcula la posición X centrada
            var posY = inicioY + 15; // Posición Y centrada (ajusta según tu preferencia)

            ctx.fillText(letra, posX, posY); // Dibuja la letra en la línea
     
      
        }
    }
 }
        const jake = {
            reiniciar: function()
            {
                 this.escenario();
                dibujarLineasCentro(ctx, canvas, palabraActual);
            },
                
        escenario: function() {
            var imagen = new Image();
            imagen.src = "img/fondo.jpg";

            imagen.onload = function() {
                ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
                imagenCargada = true;
               
                // muestra el teclado  funcional y dibuja las lineas
             //   mostrarCategorias(ctx); // Llamar la función pasando ctx como argumento     
               
                jake.teclado();
                dibujarLineasCentro(ctx, canvas, palabraActual);
               // Llama a la función para dibujar los botones
                dibujarBotones(ctx);
                dibujarVidas(ctx)
              
             
            
            };
         //  dibujarLineasCentro(ctx, canvas, palabraActual);
           
        },




        teclado: function() {
            if (imagenCargada) {
                var ren = 0;
                var col = 0;
                var letra = "";
                var miLetra;
                for (var i = 0; i < letras.length; i++) {
                    letra = letras.charAt(i);
                    miLetra = new Tecla(inicioX + col * (lon + margen), inicioY + ren * (lon + margen), lon, lon, letra);
                    miLetra.dibuja();
                    teclas.push(miLetra); // Agregar la tecla al arreglo
                    col++;
                    if (col == 9) {
                        col = 0;
                        ren++;
                    }
                }
            }
        },



        play: function(ctx) {
           
            this.escenario(ctx);
            this.teclado();
        }
    };

  

    window.onload = function() {
        jake.play();
        
        animar(ctx);
    };

    window.onresize = function() {
       
        inicioY = canvas.height - 100;
        jake.play();
        animar(ctx);
    };

    canvas.addEventListener('click', function(e) {
        var mx = e.clientX - canvas.getBoundingClientRect().left;
        var my = e.clientY - canvas.getBoundingClientRect().top;

        for (var i = 0; i < teclas.length; i++) {
            teclas[i].click(mx, my); // Verificar el clic en cada tecla
        }
    });


 }

 function dibujarEspacios(ctx, palabra) {
    var espacioEntreLetras = 20; // Espacio horizontal entre las letras
    var anchoContenedor = 30; // Ancho del contenedor de cada letra
    var altoContenedor = 40; // Alto del contenedor de cada letra

    var totalAnchoPalabra = palabra.length * (anchoContenedor + espacioEntreLetras) - espacioEntreLetras; // Ancho total de la palabra dibujada

    var inicioX = (canvas.width - totalAnchoPalabra) / 2; // Calcula el inicio X para centrar las letras
    var inicioY = 200; // Posición Y para dibujar los espacios

    // Iterar sobre cada letra de la palabra
    for (var i = 0; i < palabra.length; i++) {
        // Dibujar un rectángulo que servirá como contenedor para cada letra
        ctx.fillRect(inicioX + i * (anchoContenedor + espacioEntreLetras), inicioY, anchoContenedor, altoContenedor);
        ctx.strokeRect(inicioX + i * (anchoContenedor + espacioEntreLetras), inicioY, anchoContenedor, altoContenedor);
    }
 }
 function dibujarLineasCentro(ctx, canvas, palabraActual) {
    var centerX = canvas.width / 2; // Coordenada X del centro de la pantalla
    var centerY = canvas.height / 2; // Coordenada Y del centro de la pantalla
    var lineLength = 30; // Longitud de cada línea
    var lineSpacing = 10; // Espacio entre las líneas

    // Calcula las coordenadas de las líneas en fila según la longitud de la palabra
    var palabraLength = palabraActual.length; // Longitud de la palabra actual
    var totalWidth = palabraLength * lineLength + (palabraLength - 1) * lineSpacing; // Ancho total de las líneas
    var startX = centerX - totalWidth / 2; // Coordenada X inicial
    var startY = centerY - lineLength / 2 +35; // Posición Y centrada (ajustada hacia arriba)

    // Dibuja las líneas en fila en el centro del lienzo según la longitud de la palabra
    ctx.strokeStyle = "blue"; // Color de la línea
    ctx.lineWidth = 4; // Ancho de la línea
    for (var i = 0; i < palabraLength; i++) {
        ctx.beginPath();
        ctx.moveTo(startX + i * (lineLength + lineSpacing), startY);
        ctx.lineTo(startX + i * (lineLength + lineSpacing) + lineLength, startY);
        ctx.stroke();
    }

/*
    function dibujarContador(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('Botones seleccionados: ' + contadorBotonesSeleccionados, 10, 30); // Ajusta la posición según tu diseño
    }
*/
   
    /* function dibujarElementos(ctx) {
        // ... (otras funciones de dibujo)
        dibujarBotonesTeclado(ctx); // Suponiendo que tengas una función para dibujar los botones del teclado
        dibujarContador(ctx); // Llama a la función para dibujar el contador
        // ... (más funciones de dibujo si las tienes)
    }
    */
  

}//esta llave cierra funtion app();

//Con esto me ayuda a coordinar las letras y las lineas  app(ctx)
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    app(ctx);
});