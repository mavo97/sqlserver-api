/* tabla levantamiento obra */
CREATE TABLE dbo.levantamiento_obra ( key varchar(25) PRIMARY KEY, nombreTramoLicitacion text, nombreObra text, longitud float,
latitud float, keyUsuarioLevantamiento text, keyUsuarioAprobacion text, keyCatTipoObra varchar, keyCatTipoLevantamiento varchar,
keyCatEstatusValidacionObra varchar, keyCatEstado varchar, keyCatDireccionAdjunta varchar, fechaRegistro date, fechaCreacion date,
fechaAprobacion date, fechaActualizacion date, keyCatMunicipio varchar);

/* Tabla ficha tecnica */
create table dbo.ficha_tecnica (uid UNIQUEIDENTIFIER PRIMARY KEY, avanceFinanciero float, avanceFinancieroGlobal float, avanceFisico float,
	avanceFisicoGlobal float, beneficios text, caracteristicas text, cus text, esquemaFinanciamiento text, estado text, estatusSHCP text,
	fechaActualizacion date, fechaCreacion date, incluyeImagenes bit, inversionTotal float, keyCatCarpeta text, keyCatCorredor text,
	keyCatOrigenRecursos text, keyCatSeccion text, keyCatTipoPrioridad text, keyLevantamientoObra varchar(25), keyUsuario text, liberacionDerechoVia text,
	longitudTotal float, mia text, observaciones text, periodoEjecucion text, problematica text, proximasAcciones text, proyectoEjecutivo text,
	registroSHCP float, tpda float, nombreObra text, nombreTramoLicitacion text, latitud float, longitud float, nombreEstado text,
  FOREIGN KEY (keyLevantamientoObra) REFERENCES dbo.levantamiento_obra(keylev)); 

/* Tabla ejercicios fiscales */
create table dbo.ejercicios_fiscales (uid UNIQUEIDENTIFIER PRIMARY KEY, asignacion float, esquemaFiscal float, letrasAsignacion text,
    letrasEsquemaFiscal text, letrasMeta text, meta float, fichaTecnicaId UNIQUEIDENTIFIER,
    FOREIGN KEY (fichaTecnicaId) REFERENCES dbo.ficha_tecnica(uid));

/* Tabla capas */
CREATE TABLE dbo.capas (keyCapa varchar(25) PRIMARY KEY, fechaActualizacion date, fechaCreacion date, keyLevantamientoObra varchar(25), keyUsuarioCreacion text,
  FOREIGN KEY (keyLevantamientoObra) REFERENCES dbo.levantamiento_obra(keylev));

/* Tabla segmentos */
CREATE TABLE dbo.segmentos (uid UNIQUEIDENTIFIER PRIMARY KEY, fechaActualizacion date, fechaCreacion date, fechaRegistro date, keyCapa varchar(25),  keyCatColor text,
 keyUsuarioCreacion text, longitud float, FOREIGN KEY (keyCapa) REFERENCES dbo.capas(keyCapa));

/* tabla coordenadas  */
CREATE TABLE dbo.coordenadas ( longitud float, latitud float, segmentoID UNIQUEIDENTIFIER, FOREIGN KEY (segmentoID) REFERENCES dbo.segmentos(uid));


/* Datos de prueba para tabla ficha tecnica */
INSERT INTO dbo.ficha_tecnica (uid, avanceFinanciero, avanceFinancieroGlobal, avanceFisico, avanceFisicoGlobal,
                beneficios, caracteristicas, cus, esquemaFinanciamiento, estado, estatusSHCP, fechaActualizacion, fechaCreacion, incluyeImagenes,
                inversionTotal, keyCatCarpeta, keyCatCorredor, keyCatOrigenRecursos, keyCatSeccion, keyCatTipoPrioridad, keyLevantamientoObra,
                keyUsuario, liberacionDerechoVia, longitudTotal, mia, observaciones, periodoEjecucion, problematica, proximasAcciones, proyectoEjecutivo,
                registroSHCP, tpda) VALUES ('8afe21eb-2431-4d1e-957f-f7b63f8cddd9', 2, 1, 1, 1,
                   's', 's', 's', 's', '6', 'ss', '1606346907711', '1606346907711', 0,
                    1, '0', '0', '0', '0', '1', '-MMvTPn0_CpirZy7hY4p',
                    '-MMbcbv1GmL7VnvOtqYF', 's', 1, 's', 's', 's', 's', 's', 's',
                    1, 1);

/* Nuevo campo para tabla dbo.ficha_tenica */
ALTER TABLE dbo.capas
ADD keyCatCapa float;
/*
nombreObra
nombreTramoLicitacion
latitud
longitud
nombreEstado
*/