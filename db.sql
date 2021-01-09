/* Tabla ficha tecnica */
create table dbo.ficha_tecnica (uid UNIQUEIDENTIFIER PRIMARY KEY, avanceFinanciero float, avanceFinancieroGlobal float, avanceFisico float,
	avanceFisicoGlobal float, beneficios text, caracteristicas text, cus text, esquemaFinanciamiento text, estado text, estatusSHCP text,
	fechaActualizacion date, fechaCreacion date, incluyeImagenes bit, inversionTotal float, keyCatCarpeta text, keyCatCorredor text,
	keyCatOrigenRecursos text, keyCatSeccion text, keyCatTipoPrioridad text, keyLevantamientoObra text, keyUsuario text, liberacionDerechoVia text,
	longitudTotal float, mia text, observaciones text, periodoEjecucion text, problematica text, proximasAcciones text, proyectoEjecutivo text,
	registroSHCP float, tpda float, nombreObra text, nombreTramoLicitacion text, latitud float, longitud float); 

/* Tabla ejercicios fiscales */
create table dbo.ejercicios_fiscales (uid UNIQUEIDENTIFIER PRIMARY KEY, asignacion float, esquemaFiscal float, letrasAsignacion text,
    letrasEsquemaFiscal text, letrasMeta text, meta float, ficha_tecnicaID UNIQUEIDENTIFIER,
    FOREIGN KEY (ficha_tecnicaID) REFERENCES dbo.ficha_tecnica(uid));

/* Tabla ficha tecnica */
INSERT INTO dbo.ficha_tecnica (uid, avanceFinanciero, avanceFinancieroGlobal, avanceFisico, avanceFisicoGlobal,
                beneficios, caracteristicas, cus, esquemaFinanciamiento, estado, estatusSHCP, fechaActualizacion, fechaCreacion, incluyeImagenes,
                inversionTotal, keyCatCarpeta, keyCatCorredor, keyCatOrigenRecursos, keyCatSeccion, keyCatTipoPrioridad, keyLevantamientoObra,
                keyUsuario, liberacionDerechoVia, longitudTotal, mia, observaciones, periodoEjecucion, problematica, proximasAcciones, proyectoEjecutivo,
                registroSHCP, tpda) VALUES ('8afe21eb-2431-4d1e-957f-f7b63f8cddd9', 2, 1, 1, 1,
                   's', 's', 's', 's', '6', 'ss', '1606346907711', '1606346907711', 0,
                    1, '0', '0', '0', '0', '1', '-MMvTPn0_CpirZy7hY4p',
                    '-MMbcbv1GmL7VnvOtqYF', 's', 1, 's', 's', 's', 's', 's', 's',
                    1, 1)
'18-06-12 10:34:09 PM'
drop table dbo.ejercicios_fiscales;
drop table dbo.ficha_tecnica;

ALTER TABLE dbo.ficha_tecnica
ADD nombreEstado text;

/*
nombreObra
nombreTramoLicitacion
latitud
longitud
nombreEstado
*/