// @ts-check
"use strict"

window.addEventListener("load", () => {
    let flota, generador,config;

    config = new ConfiguracionJuego(9, 9);
    probar_generador(config, 1, "Flota «clásica»");

    //flota = ConfiguracionJuego.obtenerFlotaAmpliada();
    //config = new ConfiguracionJuego(12, 12, flota);
    //probar_generador(config, 5, "Flota «ampliada»");

    /**
     * @param {ConfiguracionJuego} config
     * @param {number} veces
     * @param {string | null} titulo
     */
    function probar_generador(config, veces, titulo) {

        for (let i = 0; i < veces; i++) {
             generador = GeneradorTableroJuego.intentar_generar(config);
            if (generador == null) {
                continue;
            } // if
            
            let tablero = new TableroJuego(config, generador.barcos, generador.tablero);
            pintar(tablero);
            
            let salto = window.document.createElement('br');
            window.document.body.append(salto);

            lista(generador);

            generador.tablero[0][4]?.barco.disparo(1)
        }
    }
});

/**
 * @param {TableroJuego} tablero
 */
function pintar(tablero) {
    let contenedor=document.getElementById("contenedor")
    let div=document.createElement("div");
    div.className="primerdiv"
    let tabla = window.document.createElement('table');
    tabla.className = "tablero-juego";
    let cuerpo = window.document.createElement('tbody');
    for (let y = 0; y < tablero.alto; y++) {
        let fila = window.document.createElement('tr');
        for (let x = 0; x < tablero.ancho; x++) {
            let td = window.document.createElement('td');
            let celda = tablero.obtener_casilla(x, y);
            td.textContent = (celda == null) ? "" : celda.barco.tipo.inicial;
            td.className = ((x + y) % 2) == 0? "par" : "impar";
            if (celda != null) {
                td.classList.add("barco");
            } // if
            fila.append(td);
        } // for x
        cuerpo.append(fila);
    } // for y

    tabla.append(cuerpo);
    div.append(tabla);
    contenedor?.append(div);
} // pintar


function lista(generador){
   let div= document.getElementById("barcos");
  
    for (const barcos of generador.barcos) {
    let p=document.createElement("p");
    let salto=document.createElement("br");
    p.textContent=barcos.tipo.nombre;
    
        div?.append(p);
        div?.append(salto);

        
    } 
}