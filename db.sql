/* tabla levantamiento obra */
CREATE TABLE dbo.firebase_levantamiento_obra ( keylev varchar(25) PRIMARY KEY, nombreTramoLicitacion text, nombreObra text, longitud float,
latitud float, keyUsuarioLevantamiento text, keyUsuarioAprobacion text, keyCatTipoObra text, keyCatTipoLevantamiento text,
keyCatEstatusValidacionObra text, keyCatEstado text, keyCatDireccionAdjunta text, fechaRegistro date, fechaCreacion date,
fechaAprobacion date, fechaActualizacion date, keyCatMunicipio text);

/* Tabla ficha tecnica */
create table dbo.firebase_ficha_tecnica (uid UNIQUEIDENTIFIER PRIMARY KEY, avanceFinanciero float, avanceFinancieroGlobal float, avanceFisico float,
	avanceFisicoGlobal float, beneficios text, caracteristicas text, cus text, esquemaFinanciamiento text, estado text, estatusSHCP text,
	fechaActualizacion date, fechaCreacion date, incluyeImagenes bit, inversionTotal float, keyCatCarpeta text, keyCatCorredor text,
	keyCatOrigenRecursos text, keyCatSeccion text, keyCatTipoPrioridad text, keyLevantamientoObra varchar(25), keyUsuario text, liberacionDerechoVia text,
	longitudTotal float, mia text, observaciones text, periodoEjecucion text, problematica text, proximasAcciones text, proyectoEjecutivo text,
	registroSHCP float, tpda float, nombreObra text, nombreTramoLicitacion text, latitud float, longitud float, nombreEstado text,
  FOREIGN KEY (keyLevantamientoObra) REFERENCES dbo.firebase_levantamiento_obra(keylev)); 

/* Tabla ejercicios fiscales */
create table dbo.firebase_ejercicios_fiscales (uid UNIQUEIDENTIFIER PRIMARY KEY, asignacion float, esquemaFiscal float, letrasAsignacion text,
    letrasEsquemaFiscal text, letrasMeta text, meta float, fichaTecnicaId UNIQUEIDENTIFIER,
    FOREIGN KEY (fichaTecnicaId) REFERENCES dbo.firebase_ficha_tecnica(uid));

/* Tabla capas */
CREATE TABLE dbo.firebase_capas (keyCapa varchar(25) PRIMARY KEY, fechaActualizacion date, fechaCreacion date, keyLevantamientoObra varchar(25), keyUsuarioCreacion text,
  keyCatCapa float, FOREIGN KEY (keyLevantamientoObra) REFERENCES dbo.firebase_levantamiento_obra(keylev),
  FOREIGN KEY (keyCatCapa) REFERENCES dbo.firebase_catTipoCapaObra(keyCat));

/* Tabla segmentos */
CREATE TABLE dbo.firebase_segmentos (uid UNIQUEIDENTIFIER PRIMARY KEY, fechaActualizacion date, fechaCreacion date, keyCapa varchar(25),  keyCatColor text,
 keyUsuarioCreacion text, longitud float, FOREIGN KEY (keyCapa) REFERENCES dbo.firebase_capas(keyCapa));

/* tabla coordenadas  */
CREATE TABLE dbo.firebase_coordenadas ( latlngs text, segmentoID UNIQUEIDENTIFIER, FOREIGN KEY (segmentoID) REFERENCES dbo.firebase_segmentos(uid));

/* tabla catalogo tipo obra */
CREATE TABLE dbo.firebase_catTipoCapaObra ( keyCat float primary key, descripcion text, activo BIT, fechaActualizacion date, fechaCreacion date,
nombre text);

ALTER TABLE dbo.firebase_capas
ADD FOREIGN KEY (keyCatCapa) REFERENCES dbo.firebase_catTipoCapaObra(keyCat);

-- INSERT INTO dbo.firebase_catTipoCapaObra ( keyCat, descripcion, activo, fechaActualizacion, fechaCreacion, nombre)
-- VALUES ();