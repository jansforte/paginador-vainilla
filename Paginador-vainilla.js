class Paginador {
    constructor(tablaBodyId, lugarPaginador=null,filasPorPagina = 30, paginasPorGrupo = 10, data={idTr:"tr-paginator",child:[]},hide=true) {
        this.tablaBodyId = document.getElementById(tablaBodyId);
        this.nameTableBodyId = tablaBodyId;
        this.filasPorPagina = filasPorPagina;
        this.lugarPaginador = lugarPaginador ? document.getElementById(lugarPaginador) : null;
        this.paginasPorGrupo = paginasPorGrupo;
        this.hide = hide;
        this.data = data;

        //Validamos sino se manda datos para dibujar filas
        if(this.data?.child.length>0){
            this.totalPaginas = Math.ceil(this.data.child.length / this.filasPorPagina);
            this.paginaActual = 1;
            this.grupoActual = 1;
            //se crea la paginación
            this.crearPaginacion();
            if(this.hide){
                this.agregarDataHide();
                this.mostrarPaginaDataHide(1);
            }
            else{
                this.mostrarPaginaDataNoHide(1);
            }
        }
        else{
            this.filas = this.tablaBodyId.getElementsByTagName("tr");
            this.almacenTable = new Map().set("data",Array.from(this.filas));
            this.totalPaginas = Math.ceil(this.filas.length / this.filasPorPagina);
            this.paginaActual = 1;
            this.grupoActual = 1;
            
            //se crea la paginación
            this.crearPaginacion();
            if(this.hide){
                this.mostrarPaginaTableHide(1);
            }
            else{
                this.mostrarPaginaTableNoHide(1);
            }
        }
        this.camposCabecera();
    }

    //Se crea cada fila de la tabla conforme al arreglo
    agregarDataHide(){
        let html = ``;
        let informacion = this.data;
        informacion.child
        .map((item, indexParent) => {
            let styleParent = item.style ?? '';
            let claseParent = item.clase ?? '';
            let idTr = informacion.idTr ?? `${this.nameTableBodyId}-tr-paginator`;
            html+=`<tr class="${claseParent}" style="${styleParent}" id="${idTr}${indexParent}">`;
            item.column?.map((columna,index)=>{
                let columnaId = columna.id ?? `${this.nameTableBodyId}-column-${indexParent}-${index}`;
                let claseHijo = columna.claseHijo ?? '';
                let styleHijo = columna.styleHijo ?? '';
                html+=`<td class="${claseHijo}" style="${styleHijo}" id="${columnaId}">${columna.value}</td>`;
            });
            html+=`</tr>`;
        });
        
        this.tablaBodyId.innerHTML = html;
    }

    //Se rendereiza cada fila de la tabla segun conforme a la paginación
    agregarDataNoHide(){
        let html = ``;
        let informacion = this.data;
        informacion.child
        .slice(this.paginaActual * this.filasPorPagina - this.filasPorPagina, this.paginaActual * this.filasPorPagina)
        .map((item, indexParent) => {
            let styleParent = item.style ?? '';
            let claseParent = item.clase ?? '';
            let idTr = informacion.idTr ?? `${this.nameTableBodyId}-tr-paginator`;
            html+=`<tr class="${claseParent}" style="${styleParent}" id="${idTr}${indexParent}">`;
            item.column?.map((columna,index)=>{
                let columnaId = columna.id ?? `${this.nameTableBodyId}-column-${indexParent}-${index}`;
                let claseHijo = columna.claseHijo ?? '';
                let styleHijo = columna.styleHijo ?? '';
                html+=`<td class="${claseHijo}" style="${styleHijo}" id="${columnaId}">${columna.value}</td>`;
            });
            html+=`</tr>`;
        });
        
        this.tablaBodyId.innerHTML = html;
    }

    //se renderiza cada fila conforme a la paginación
    mostrarPaginaTableNoHide(pagina) {
        let informacion = this.almacenTable.get("data");
        this.paginaActual = pagina;
        this.tablaBodyId.innerHTML = '';
        informacion?.slice(this.paginaActual * this.filasPorPagina - this.filasPorPagina, this.paginaActual * this.filasPorPagina)
                    .map((item) => {
                        this.tablaBodyId.append(item);
                    });
    }
    
    //Se muestran solo las filas de la pagina actual y las demás se ocultan
    mostrarPaginaTableHide(pagina) {
        // Ocultar todas las filas
        for (let i = 0; i < this.filas.length; i++) {
            this.filas[i].style.display = "none";
        }

        // Mostrar las filas correspondientes a la página actual
        let inicio = (pagina - 1) * this.filasPorPagina;
        let fin = inicio + this.filasPorPagina;
        for (let i = inicio; i < fin && i < this.filas.length; i++) {
            this.filas[i].style.display = "";
        }

        this.paginaActual = pagina;
    }

    //Se renderiza la pagina seleccionada
    mostrarPaginaDataNoHide(pagina){
        this.paginaActual = pagina;
        this.agregarDataNoHide();
    }
    
    //Se muestra la pagina que se desea y las demás se ocultan
    mostrarPaginaDataHide(pagina){
        // Ocultar todas las filas
        let idTr = this.data.idTr ?? `${this.nameTableBodyId}-tr-paginator`;
        for (let i = 0; i < this.data.child.length; i++) {
            document.getElementById(`${idTr}${i}`).style.display = "none";
        }

        // Mostrar las filas correspondientes a la página actual
        let inicio = (pagina - 1) * this.filasPorPagina;
        let fin = inicio + this.filasPorPagina;
        
        for (let i = inicio; i < fin && i < this.data.child.length; i++) {
            document.getElementById(`${idTr}${i}`).style.display = "";
        }
        this.paginaActual = pagina;
    }

    //Resalta la pagina actual
    resaltarPagina(id,pagina){
        let paginators = document.getElementById(`pagination-${this.nameTableBodyId}`).getElementsByTagName('a');
        for (let i = 0; i < paginators.length; i++) {
            paginators[i]?.classList?.remove("active");
        }
        document.getElementById(id).classList.add("active");
        this.paginaActual=pagina;
    }
    
    //Renderiza el paginador al fondo de la tabla
    crearPaginacion() {
        //Validamos si existe paginador y sus controles y eliminamos
        document.getElementById(`pagination-${this.nameTableBodyId}`)?.remove();

        // Crear el contenedor para los botones de paginación
        const pagination = document.createElement("div");
        pagination.id = `pagination-${this.nameTableBodyId}`;
        pagination.className = "pagination justify-content-center";
        pagination.style.marginTop = "10px"; 

        let inicioPagina =  this.grupoActual; 
        if((this.grupoActual + (this.paginasPorGrupo-1))>=this.totalPaginas){
            inicioPagina = (this.totalPaginas-this.paginasPorGrupo+1)<1 ? 1 : (this.totalPaginas-this.paginasPorGrupo+1);
        }
        let finPagina = Math.min(this.grupoActual + (this.paginasPorGrupo-1), this.totalPaginas);

        // Crear los controles de página anterior
        const botonAnterior = document.createElement("div");
        botonAnterior.className = "page-link";
        botonAnterior.onclick = () => this.cambiarGrupoPaginas(-1);
        botonAnterior.style.borderRadius = "20px 0px 0px 20px";
        botonAnterior.style.cursor = "pointer";
        botonAnterior.style.userSelect = "none";
        botonAnterior.innerHTML = "&laquo; Anterior";
        pagination.appendChild(botonAnterior);

        for (let i = inicioPagina; i <= finPagina; i++) {
            let a = document.createElement("a");
            a.innerHTML = i;
            a.className = "page-item page-link";
            a.id = `page-item-${this.nameTableBodyId}-${i}`;
            a.href = "javascript:void(0)";
            a.onclick = (() => {
                return () => {
                    if(this.hide && this.filas){
                        this.mostrarPaginaTableHide(i);
                        this.resaltarPagina(a.id,i);
                    }
                    else if(!this.hide && this.filas){
                        this.mostrarPaginaTableNoHide(i);
                        this.resaltarPagina(a.id,i);
                    }
                    else if(this.hide && this.data){
                        this.mostrarPaginaDataHide(i);
                        this.resaltarPagina(a.id,i);
                    }
                    else if(!this.hide && this.data){
                        this.mostrarPaginaDataNoHide(i);
                        this.resaltarPagina(a.id,i);
                    }
                    else{
                        alert("Error not found Data OR Body");
                    }
                };
            })();
            pagination.appendChild(a);
            if(this.paginaActual==i){
                a.classList?.add("active");
            }
        }

        // Crear los controles de página siguiente
        const botonSiguiente = document.createElement("div");
        botonSiguiente.className = "page-link";
        botonSiguiente.onclick = () => this.cambiarGrupoPaginas(1);
        botonSiguiente.style.borderRadius = "0px 20px 20px 0px";
        botonSiguiente.style.cursor = "pointer";
        botonSiguiente.style.userSelect = "none";
        botonSiguiente.innerHTML = "Siguiente &raquo;";
        pagination.appendChild(botonSiguiente);

        if(this.lugarPaginador){
            this.lugarPaginador.innerHTML='';
            this.lugarPaginador.appendChild(pagination);
        }
        else{
            // Insertar la paginación justo después de la tabla
            this.tablaBodyId.parentNode.insertAdjacentElement("afterend",pagination);
        }

        if (this.paginaActual == 1) {
            botonAnterior.classList?.add("disabled");
            botonAnterior.style.cursor = "";
        }
        else if(this.paginaActual == this.totalPaginas){
            botonSiguiente.classList?.add("disabled");
            botonSiguiente.style.cursor = "";
        }
        else{
            botonAnterior.classList?.remove("disabled");
            botonAnterior.style.cursor = "pointer";
            botonSiguiente.classList?.remove("disabled");
            botonSiguiente.style.cursor = "pointer";
        }
    }

    //función para cambiar de pagina
    cambiarGrupoPaginas(direccion) {
        this.grupoActual += direccion;
        let maxGrupos = this.totalPaginas ;

        this.paginaActual +=direccion;

        if (this.grupoActual < 1) {
            this.grupoActual = 1;
        }
        if (this.grupoActual > maxGrupos) {
            this.grupoActual = maxGrupos;
        }
        if (this.paginaActual < 1) {
            this.paginaActual = 1;
        }
        if (this.paginaActual > maxGrupos) {
            this.paginaActual = maxGrupos;
        }

        this.crearPaginacion();
        // Muestra la primera página del nuevo grupo
        if(this.hide && this.filas){
            this.mostrarPaginaTableHide(this.paginaActual);
        }
        else if(!this.hide && this.filas){
            this.mostrarPaginaTableNoHide(this.paginaActual);
        }
        else if(this.hide && this.data){
            this.mostrarPaginaDataHide(this.paginaActual);
        }
        else if(!this.hide && this.data){
            this.mostrarPaginaDataNoHide(this.paginaActual);
        }
        else{
            alert("Error not found Data OR Table Body");
        }

    }

    //Renderiza el campo del buscador
    campoBuscador(){
        //Creamos el div donde se ubicará el buscador
        const campoBuscar = document.createElement("div");
        campoBuscar.id= `column-buscar-${this.nameTableBodyId}`;
        campoBuscar.className = "col-3";

        //Creamos el input de buscador
        const inputBuscar = document.createElement("input");
        inputBuscar.id=`input-search-${this.nameTableBodyId}`;
        inputBuscar.className="form-control";
        inputBuscar.placeholder="Buscar...";
        inputBuscar.type="text";
        inputBuscar.onkeyup = (event) => {
            if(event.target.value){
                //Función que busca el texto en las filas
                this.findByName(event.target.value);
            }
            //En caso que el campo este vacio devuelve la pagina actual
            else{
                if(this.hide && this.filas){
                    this.mostrarPaginaTableHide(this.paginaActual);
                }
                else if(!this.hide && this.filas){
                    this.mostrarPaginaTableNoHide(this.paginaActual);
                }
                else if(this.hide && this.data){
                    this.mostrarPaginaDataHide(this.paginaActual);
                }
                else if(!this.hide && this.data){
                    this.mostrarPaginaDataNoHide(this.paginaActual);
                }
                else{
                    alert("Error not found Data OR Table Body");
                }
                //Cuando no se use el buscador mostramos el paginador
                document.getElementById(`pagination-${this.nameTableBodyId}`).style.display="";
            }
        };
        
        //Creamos el label del input texto
        const labelBuscar = document.createElement("label");
        labelBuscar.id = `label-buscar-${this.nameTableBodyId}`;
        labelBuscar.htmlFor = `input-search-${this.nameTableBodyId}`;
        labelBuscar.className = "form-label";
        labelBuscar.innerHTML = "Buscar";

        //agregamos el label y el input del buscador al div donde se ubicaran
        campoBuscar.append(labelBuscar,inputBuscar);

        return campoBuscar;
    }

    //se crea el campo div para que quien desee agregue botones en función a la tabla
    camposBotones(){
        const campoBotones = document.createElement("div");
        campoBotones.id= `column-botones-${this.nameTableBodyId}`;
        campoBotones.className = "btn-group col-9 align-self-end";

        return campoBotones;
    }

    //Se renderiza los items como buscador y botones encima de la tabla
    camposCabecera(){
        //Creamos el div row que tendrá el buscador y el apartado de botones
        const cabecera = document.createElement("div");
        cabecera.id= `cabecera-${this.nameTableBodyId}`;
        cabecera.className = "row";
        cabecera.style.marginBottom = "5px";

        const elementoBuscar = this.campoBuscador();
        const elementoBotones = this.camposBotones();
        
        //Agregamos los campos de buscar y botones en el div donde se ubicaran
        cabecera.append(elementoBuscar,elementoBotones);

        //Renderizamos el campo sobre la tabla
        this.tablaBodyId.parentNode.insertAdjacentElement("beforebegin",cabecera);
    }

    //Función para buscar texto en las filas
    findByName(phrase){
        let expresion = new RegExp(phrase,"i");
        
        //si se detecta las filas son solo de ocultarse y no renderizarse buscamos entre 
        //el texto que contengan las filas
        if(this.hide){
            document.querySelectorAll(`#${this.nameTableBodyId} tr`).forEach(
            elemento =>{
                let frase =elemento.textContent.toLowerCase();
                elemento.style.display = expresion.test(frase) ? "" : "none";
            });
        }
        //Si se detecta que son filas que se renderiza apartir de la tabla y no del objeto Data del constructor
        //traemos todos los elementos del Objeto Map que almacena las filas y renderizamos solo los que contienen
        //el texto a buscar
        else if(!this.hide && this.filas){
            let informacion = this.almacenTable.get("data");
            this.tablaBodyId.innerHTML = '';
            informacion?.filter(item => expresion.test(item.textContent.toLowerCase()))
                        .map((item) => {
                            this.tablaBodyId.append(item);
                        });
        }
        //En caso que sea del objeto Data del constructor
        //Filtramos segun el texto y volvemos a renderizar en la tabla
        else if(this.data){
            let html='';
            let informacion = this.data;
            informacion.child
            .filter((item)=>item.column?.some(col => expresion.test(col.value.toLowerCase())))
            .map((item, indexParent) => {
                let styleParent = item.style ?? '';
                let claseParent = item.clase ?? '';
                let idTr = informacion.idTr ?? `${this.nameTableBodyId}-tr-paginator`;
                html+=`<tr class="${claseParent}" style="${styleParent}" id="${idTr}${indexParent}">`;
                item.column?.map((columna,index)=>{
                    let columnaId = columna.id ?? `${this.nameTableBodyId}-column-${indexParent}-${index}`;
                    let claseHijo = columna.claseHijo ?? '';
                    let styleHijo = columna.styleHijo ?? '';
                    html+=`<td class="${claseHijo}" style="${styleHijo}" id="${columnaId}">${columna.value}</td>`;
                });
                html+=`</tr>`;
            });
            this.tablaBodyId.innerHTML = html;
        }
        
        //Cuando se use el buscador siempre se ocultará el paginador
        document.getElementById(`pagination-${this.nameTableBodyId}`).style.display="none";
    }

}
