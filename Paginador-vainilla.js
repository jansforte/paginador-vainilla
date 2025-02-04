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
            
            this.crearPaginacion();
            if(this.hide){
                this.mostrarPaginaTableHide(1);
            }
            else{
                this.mostrarPaginaTableNoHide(1);
            }
        }
    }

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

    mostrarPaginaTableNoHide(pagina) {
        let informacion = this.almacenTable.get("data");
        this.paginaActual = pagina;
        
        this.tablaBodyId.innerHTML = '';
        informacion?.slice(this.paginaActual * this.filasPorPagina - this.filasPorPagina, this.paginaActual * this.filasPorPagina)
                    .map((item) => {
                        this.tablaBodyId.append(item);
                    });
    }
    
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

    mostrarPaginaDataNoHide(pagina){
        this.paginaActual = pagina;
        this.agregarDataNoHide();
    }
    
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

    resaltarPagina(id,pagina){
        let botones = document.getElementById(`pagination-${this.nameTableBodyId}`).getElementsByTagName('a');
        for (let i = 0; i < botones.length; i++) {
            botones[i]?.classList?.remove("active");
        }
        document.getElementById(id).classList.add("active");
        this.paginaActual=pagina;
    }
    
    crearPaginacion() {
        //Validamos si existe paginador y sus controles y eliminamos
        document.getElementById(`pagination-${this.nameTableBodyId}`)?.remove();
        //document.getElementById(`page-controls-${this.nameTableBodyId}`)?.remove();

        // Crear el contenedor para los botones de paginación
        const pagination = document.createElement("div");
        pagination.id = `pagination-${this.nameTableBodyId}`;
        pagination.className = "pagination justify-content-center";
        pagination.style.marginTop = "10px"; // Opcional: añadir espacio entre la tabla y la paginación

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
            this.lugarPaginador.appendChild(controls);
        }
        else{
            // Insertar la paginación justo después de la tabla
            console.log(this.tablaBodyId.parentNode);
           // this.tablaBodyId.parentNode.insertBefore(pagination, this.tablaBodyId.nextSibling);
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
            this.mostrarPaginaTableNoHide(this.paginaActual);//(this.grupoActual - 1) * this.paginasPorGrupo + 1
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
}
