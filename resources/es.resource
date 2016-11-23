admin_Version                                                                   : Versión
admin_VersionProgram                                                            : Versión programa
admin_VersionLastInstall                                                        : Versión instalación inicial
admin_VersionLastUpgrade                                                        : Versión última actualización
admin_VersionExperimental                                                       : Experimental
admin_VersionDevelopment                                                        : Desarrollo
admin_VersionUnknown                                                            : Desconocida
admin_VersionRecommanded                                                        : Recomendada
admin_SessionId                                                                 : Sesión ID
admin_SessionSaveHandler                                                        : Modalidad de salvaguardado de sesiones
admin_SessionSavePath                                                           : Localización salvaguardado de sesiones
admin_PurgeSessions                                                             : Purga de sesiones
admin_ConfirmPurgeSessions                                                      : ¿Quiere purgar las sesiones? Esto desconectará a todos los usuarios (salvo a usted mismo).
admin_NoSessionListWithThisHandler                                              : El gestor de período de sesiones configurado en su PHP no enumera las sesiones en curso
admin_LockNewSessions                                                           : Bloquear conexiones nuevas
admin_ConfirmLockNewSessions                                                    : ¿Está seguro de querer restringir el acceso a Dolibarr a su usuario? Solamente el login <b>%s</b> podrá conectarse si confirma.
admin_UnlockNewSessions                                                         : Eliminar bloqueo de conexiones
admin_YourSession                                                               : Su sesión
admin_Sessions                                                                  : Sesiones de usuarios
admin_WebUserGroup                                                              : Servidor web usuario/grupo
admin_NoSessionFound                                                            : Parece que su PHP no puede listar las sesiones activas. El directorio de salvaguardado de sesiones (<b>%s</b>) puede estar protegido (por ejemplo, por los permisos del sistema operativo o por la directiva open_basedir de su PHP).
admin_HTMLCharset                                                               : Charset de las páginas HTML
admin_DBStoringCharset                                                          : Charset base de datos para almacenamiento de datos
admin_DBSortingCharset                                                          : Charset base de datos para clasificar los datos
admin_WarningModuleNotActive                                                    : Módulo <b>%s</b> no activo
admin_WarningOnlyPermissionOfActivatedModules                                   : Atención, solamente los permisos relacionados con los módulos activados se indican aquí. Puede activar los otros módulos en la página Configuración->Módulos
admin_SpeedealingSetup                                                          : Instalación/Actualización de Speedealing
admin_SpeedealingUser                                                           : Usuario Speedealing
admin_InternalUser                                                              : Usuario interno
admin_ExternalUser                                                              : Usuario externo
admin_InternalUsers                                                             : Usuarios internos
admin_ExternalUsers                                                             : Usuarios externos
admin_GlobalSetup                                                               : General
admin_GUISetup                                                                  : Entorno
admin_SetupArea                                                                 : Área configuración
admin_FormToTestFileUploadForm                                                  : Formulario de prueba de subida de archivo (según opciones elegidas)
admin_IfModuleEnabled                                                           : Nota: sólo es eficaz si el módulo <b>%s</b> está activado
admin_RemoveLock                                                                : Elimine el archivo <b>%s</b>, si existe, para permitir la utilidad de actualización.
admin_RestoreLock                                                               : Sustituir un archivo <b>%s</b>, dándole sólo derechos de lectura a este archivo con el fin de prohibir nuevas actualizaciones.
admin_SecuritySetup                                                             : Configuración de la seguridad
admin_ErrorModuleRequirePHPVersion                                              : Error, este módulo requiere una versión %s o superior de PHP
admin_ErrorModuleRequireSpeedealingVersion                                      : Error, este módulo requiere una versión %s o superior de Speedealing
admin_ErrorDecimalLargerThanAreForbidden                                        : Error, las precisiones superiores a <b>%s</b> no están soportadas.
admin_DictionnarySetup                                                          : Diccionarios
admin_Dictionnary                                                               : Diccionarios
admin_DisableJavascript                                                         : Desactivar las funciones Javascript
admin_ConfirmAjax                                                               : Utilizar los popups de confirmación Ajax
admin_UseSearchToSelectCompany                                                  : Utilizar un formulario de búsqueda para buscar terceros (en vez de lista desplegable)<br><br>Tenga en cuenta que si tiene un gran número de productos o servicios (>100 000), puede mejorar el rendimiento mediante la constante SOCIETE_DONOTSEARCH_ANYWHERE a 1 en Configuración->Varios. La búsqueda se limitará entonces al inicio de la cadena.
admin_ActivityStateToSelectCompany                                              : Agregar un filtro en la búsqueda para mostrar/ocultar los terceros en activo o que hayan dejado de ejercer
admin_SearchFilter                                                              : Opciones filtros de búsqueda
admin_NumberOfKeyToSearch                                                       : Nº de caracteres para desencadenar la búsqueda: %s
admin_ViewFullDateActions                                                       : Ver las fechas de las acciones en su totalidad en la ficha de tercero
admin_NotAvailableWhenAjaxDisabled                                              : No disponible cuando Ajax esté desactivado
admin_JavascriptDisabled                                                        : Javascript desactivado
admin_UsePopupCalendar                                                          : Utilizar popups para la introducción de las fechas
admin_UsePreviewTabs                                                            : Ver fichas "vista previa"
admin_ShowPreview                                                               : Ver vista previa
admin_PreviewNotAvailable                                                       : Vista previa no disponible
admin_ThemeCurrentlyActive                                                      : Tema actualmente activo
admin_CurrentTimeZone                                                           : Zona horaria PHP (Servidor)
admin_Space                                                                     : Área
admin_Fields                                                                    : Campos
admin_Mask                                                                      : Máscara
admin_NextValue                                                                 : Próximo valor
admin_NextValueForInvoices                                                      : Próximo valor (facturas)
admin_NextValueForCreditNotes                                                   : Próximo valor (notas de entrega)
admin_MustBeLowerThanPHPLimit                                                   : Observación: Su PHP limita el tamaño a <b>%s</b> %s de máximo, cualquiera que sea el valor de este parámetro
admin_NoMaxSizeByPHPLimit                                                       : Ninguna limitación interna en su servidor PHP
admin_MaxSizeForUploadedFiles                                                   : Tamaño máximo de los documentos a subir (0 para prohibir la subida)
admin_UseCaptchaCode                                                            : Utilización de código gráfico (CAPTCHA) en el login
admin_UseAvToScanUploadedFiles                                                  : Utilización de un antivirus para escanear los archivos subidos
admin_AntiVirusCommand                                                          : Ruta completa hacia el comando antivirus
admin_AntiVirusCommandExample                                                   : Ejemplo para ClamWin: c:\Program Files (x86)\ClamWin\bin\clamscan.exe<br>Ejemplo para ClamAv: /usr/bin/clamscan
admin_AntiVirusParam                                                            : Parámetros complementarios en la línea de comandos
admin_AntiVirusParamExample                                                     : Ejemplo para ClamWin: --database="C:\Program Files (x86)\ClamWin\lib"
admin_ComptaSetup                                                               : Configuración del módulo Contabilidad
admin_UserSetup                                                                 : Configuración gestión de los usuarios
admin_MenuSetup                                                                 : Administración de los menús por base de datos
admin_MenuLimits                                                                : Límites y precisión
admin_MenuIdParent                                                              : Id del menú padre
admin_DetailMenuIdParent                                                        : ID del menú padre (vacío para un menú superior)
admin_DetailPosition                                                            : Número de orden para la posición del menú
admin_PersonalizedMenusNotSupported                                             : Menús personalizados no generados
admin_AllMenus                                                                  : Todos
admin_NotConfigured                                                             : No configurado
admin_Setup                                                                     : Configuración
admin_Activation                                                                : Activación
admin_Active                                                                    : Activo
admin_SetupShort                                                                : Config.
admin_OtherOptions                                                              : Otras opciones
admin_OtherSetup                                                                : Varios
admin_CurrentValueSeparatorDecimal                                              : Separador decimal
admin_CurrentValueSeparatorThousand                                             : Separador miles
admin_Modules                                                                   : Módulos
admin_ModulesCommon                                                             : Módulos principales
admin_ModulesOther                                                              : Módulos complementarios
admin_ModulesInterfaces                                                         : Módulos interfaz
admin_ModulesSpecial                                                            : Módulos específicos
admin_ParameterInSpeedealing                                                    : Parámetro %s
admin_LanguageParameter                                                         : Variable idioma %s
admin_LanguageBrowserParameter                                                  : Variable %s
admin_LocalisationSpeedealingParameters                                         : Parámetros de localización
admin_ClientTZ                                                                  : Zona horaria Cliente (usuario)
admin_ClientHour                                                                : Hora cliente (usuario)
admin_OSTZ                                                                      : Zona horaria
admin_PHPTZ                                                                     : Zona horaria PHP
admin_PHPServerOffsetWithGreenwich                                              : Offset servidor con Greenwich (segundos)
admin_ClientOffsetWithGreenwich                                                 : Offset cliente/navegador con Greenwich (segundos)
admin_DaylingSavingTime                                                         : Horario de verano (usuario)
admin_CurrentHour                                                               : Hora PHP (servidor)
admin_CompanyTZ                                                                 : Zona Horaria empresa (sede central)
admin_CompanyHour                                                               : Hora empresa (sede central)
admin_CurrentSessionTimeOut                                                     : Timeout sesión actual
admin_OSEnv                                                                     : Entorno SO
admin_Box                                                                       : Panel
admin_Boxes                                                                     : Paneles
admin_MaxNbOfLinesForBoxes                                                      : Nº de líneas máximo para los paneles
admin_PositionByDefault                                                         : Posición por defecto
admin_Position                                                                  : Orden
admin_MenusDesc                                                                 : Los gestores de menú definen el contenido de las 2 barras de menús (la barra horizontal y la barra vertical). Es posible asignar gestores diferentes según el usuario sea interno o externo.
admin_MenusEditorDesc                                                           : El editor de menús permite definir entradas personalizadas en los menús. Debe utilizarse con prudencia so pena de poner a Dolibarr en una situación inestable siendo necesaria una reinstalación para encontrar un menú coherente.
admin_MenuForUsers                                                              : Menú para los usuarios
admin_LangFile                                                                  : Archivo .lang
admin_System                                                                    : Sistema
admin_SystemInfo                                                                : Info. sistema
admin_SystemTools                                                               : Utilidades sistema
admin_SystemToolsArea                                                           : Área utilidades del sistema
admin_SystemToolsAreaDesc                                                       : Esta área ofrece distintas funciones de administración. Utilice la menú para elegir la funcionalidad buscada.
admin_PurgeAreaDesc                                                             : Esta página le permite eliminar todos los archivos creados o guardados por Dolibarr (archivos temporales o todos los archivos del directorio <b>%s</b>). El uso de esta función no es necesaria. Se proporciona para los usuarios que albergan a Dolibarr en un servidor que no ofrece los permisos de eliminación de archivos salvaguardados por el servidor Web.
admin_PurgeDeleteLogFile                                                        : Borrar el archivo log <b>%s</b> definido por el módulo Syslog (no hay riesgo de pérdida de datos)
admin_PurgeDeleteTemporaryFiles                                                 : Eliminar todos los archivos temporales (sin riesgo de perdida de datos)
admin_PurgeDeleteAllFilesInDocumentsDir                                         : Eliminar todos los archivos del directorio <b>%s</b>. Archivos temporales y archivos adjuntados a elementos (terceros, facturas, etc.) serán eliminados.
admin_PurgeRunNow                                                               : Purgar
admin_PurgeNothingToDelete                                                      : Ningún directorio a eliminar
admin_PurgeNDirectoriesDeleted                                                  : <b>%s</b> archivos o directorios eliminados
admin_PurgeAuditEvents                                                          : Purgar los eventos de seguridad
admin_ConfirmPurgeAuditEvents                                                   : ¿Está seguro de querer purgar la lista de los eventos de auditoría de seguridad (Se borrará toda la lista, pero esto no afecta a sus datos)?
admin_NewBackup                                                                 : Nueva copia de seguridad
admin_GenerateBackup                                                            : Generar copia de seguridad
admin_Backup                                                                    : Copia de seguridad
admin_Restore                                                                   : Restauración
admin_RunCommandSummary                                                         : La copia será realizada por el comando siguiente
admin_RunCommandSummaryToLaunch                                                 : La copia puede ser realizada por el comando siguiente
admin_WebServerMustHavePermissionForCommand                                     : Su servidor Web debe tener los derechos de ejecutar tal orden
admin_BackupResult                                                              : Resultado de la copia
admin_BackupFileSuccessfullyCreated                                             : Archivo de copia generado correctamente
admin_YouCanDownloadBackupFile                                                  : Los archivos generados pueden ahora descargarse
admin_NoBackupFileAvailable                                                     : Ninguna copia disponible
admin_ExportMethod                                                              : Método de exportación
admin_ImportMethod                                                              : Método de importación
admin_ToBuildBackupFileClickHere                                                : Para crear una copia, haga click <a href="%s">aquí</a>.
admin_ImportMySqlDesc                                                           : Para importar una copia, hay que utilizar el comando mysql en linea siguiente:
admin_ImportPostgreSqlDesc                                                      : Para importar una copia de seguridad, debe usar el comando pg_restore desde la línea de comandos:
admin_ImportMySqlCommand                                                        : %s %s < miarchivobackup.sql
admin_ImportPostgreSqlCommand                                                   : %s %s miarchivobackup.sql
admin_FileNameToGenerate                                                        : Nombre del archivo a generar
admin_CommandsToDisableForeignKeysForImport                                     : Comando para desactivar las claves excluyentes a la importación
admin_CommandsToDisableForeignKeysForImportWarning                              : Obligatorio si quiere poder restaurar más tarde el dump SQL
admin_ExportCompatibility                                                       : Compatibilidad del archivo de exportación generado
admin_MySqlExportParameters                                                     : Parámetros de la exportación MySql
admin_PostgreSqlExportParameters                                                : Parámetros de la exportación PostgreSQL
admin_UseTransactionnalMode                                                     : Utilizar el modo transaccional
admin_FullPathToMysqldumpCommand                                                : Ruta completa del comando mysqldump
admin_FullPathToPostgreSQLdumpCommand                                           : ruta completa hacia el comando pg_dump
admin_ExportOptions                                                             : Opciones de exportación
admin_AddDropDatabase                                                           : Añadir órdenes DROP DATABASE
admin_AddDropTable                                                              : Añadir órdenes DROP TABLE
admin_ExportStructure                                                           : Estructura
admin_Datas                                                                     : Datos
admin_NameColumn                                                                : Nombre las columnas
admin_ExtendedInsert                                                            : Instrucciones INSERT extendidas
admin_NoLockBeforeInsert                                                        : Sin instrucción LOCK antes del INSERT
admin_DelayedInsert                                                             : Inserciones con retraso
admin_EncodeBinariesInHexa                                                      : Codificar los campos binarios en hexadecimal
admin_IgnoreDuplicateRecords                                                    : Ignorar los errores de duplicación (INSERT IGNORE)
admin_Yes                                                                       : Sí
admin_No                                                                        : No
admin_AutoDetectLang                                                            : Autodetección (navegador)
admin_FeatureDisabledInDemo                                                     : Opción deshabilitada en demo
admin_Rights                                                                    : Permisos
admin_BoxesDesc                                                                 : Los paneles son pequeñas zonas de información que se muestran en algunas páginas. Puede elegir activar o desactivar un panel haciendo clic en 'Activar', o haciendo click en el cubo de basura para desactivarlo. Solo se muestran los paneles relacionados con un <a href="modules.php">módulo</a> activo.
admin_OnlyActiveElementsAreShown                                                : Sólo los elementos de <a href="%s">módulos activados</a> son mostrados.
admin_ModulesDesc                                                               : Los módulos Dolibarr definen las funcionalidades disponibles en la aplicación. Algunos módulos requieren derechos que deberán indicarse a los usuarios para que puedan acceder a sus funcionalidades.
admin_ModulesInterfaceDesc                                                      : Los módulos de interfaz son módulos que permiten vincular a Dolibarr con sistemas, aplicaciones o servicios externos.
admin_ModulesSpecialDesc                                                        : Los módulos complementarios son módulos de uso muy específico o menos corriente que los módulos normales.
admin_ModulesJobDesc                                                            : Los módulos específicos permiten una preconfiguración simplificada de Dolibarr para un negocio en concreto.
admin_ModulesMarketPlaceDesc                                                    : Hay disponibles para su descarga en sitios externos otros módulos/extensiones...
admin_ModulesMarketPlaces                                                       : Más módulos...
admin_DoliStoreDesc                                                             : DoliStore, el sitio oficial de módulos complementarios y para Dolibarr ERP/CRM
admin_WebSiteDesc                                                               : Sitios proveedores a consultar para encontrar más módulos
admin_URL                                                                       : Enlace
admin_BoxesAvailable                                                            : Paneles disponibles
admin_BoxesActivated                                                            : Paneles activados
admin_ActivateOn                                                                : Activar en
admin_ActiveOn                                                                  : Activo en
admin_SourceFile                                                                : Archivo origen
admin_AutomaticIfJavascriptDisabled                                             : Automático si Javascript está desactivado
admin_AvailableOnlyIfJavascriptNotDisabled                                      : Disponible solamente si Javascript esta activado
admin_AvailableOnlyIfJavascriptAndAjaxNotDisabled                               : Disponible solamente si Javascript y Ajax están activados
admin_NotInstalled                                                              : Not installed
admin_Required                                                                  : Requerido
admin_Security                                                                  : Seguridad
admin_Passwords                                                                 : Contraseñas
admin_DoNotStoreClearPassword                                                   : No almacenar la contraseña sin cifrar en la base
admin_MainDbPasswordFileConfEncrypted                                           : Encriptar la contraseña de la base en el archivo conf.php
admin_InstrucToEncodePass                                                       : Para tener la contraseña de la base de datos codificada en el archivo de configuración <b>conf.php</b>, reemplazar en ese fichero la línea <br><b>$dolibarr_main_db_pass="..."</b><br> por <br><b>$dolibarr_main_db_pass="crypted:%s"</b>
admin_InstrucToClearPass                                                        : Para tener la contraseña de la base de datos descodificada en el archivo de configuración b>conf.php</b>, reemplazar en ese fichero la línea <br><b>$dolibarr_main_db_pass="crypted:..."</b><br> por <br><b>$dolibarr_main_db_pass="%s"</b>
admin_ProtectAndEncryptPdfFiles                                                 : Protección y encriptación de los pdf generados
admin_ProtectAndEncryptPdfFilesDesc                                             : La protección de un documento pdf deja el documento libre a la lectura y a la impresión a cualquier lector de PDF. Por el contrario, la modificación y la copia resultan imposibles.
admin_Feature                                                                   : Función
admin_SpeedealingLicense                                                        : Licencia
admin_SpeedealingProjectLeader                                                  : Jefe de proyecto
admin_Developpers                                                               : Desarrolladores/contribuidores
admin_OtherDeveloppers                                                          : Otros desarrolladores/contribuidores
admin_OfficialWebSite                                                           : Sitio web oficial internacional
admin_OfficialWebSiteFr                                                         : sitio web oficial habla francesa
admin_OfficialWiki                                                              : Wiki documentación Dolibarr
admin_OfficialDemo                                                              : Demo en línea Dolibarr
admin_OfficialMarketPlace                                                       : Sitio oficial de módulos complementarios y extensiones
admin_OfficialWebHostingService                                                 : Servicio oficial de alojamiento (SaaS)
admin_ForDocumentationSeeWiki                                                   : Para la documentación de usuario, desarrollador o Preguntas Frecuentes (FAQ), consulte el wiki Dolibarr: <br><b><a href="%s" target="_blank">%s</a></b>
admin_ForAnswersSeeForum                                                        : Para otras cuestiones o realizar sus propias consultas, puede utilizar el foro Dolibarr: <br><b><a href="%s" target="_blank">%s</a></b>
admin_HelpCenterDesc1                                                           : Esta aplicación, independiente de Dolibarr, le permite ayudarle a obtener un servicio de soporte de Dolibarr.
admin_HelpCenterDesc2                                                           : Algunos de estos servicios sólo están disponibles en <b>inglés</b>.
admin_CurrentTopMenuHandler                                                     : Gestor de menú superior
admin_CurrentLeftMenuHandler                                                    : Gestor de menú izquierdo
admin_CurrentMenuHandler                                                        : Gestor de menú
admin_CurrentSmartphoneMenuHandler                                              : Gestor menú smartphone actual
admin_MeasuringUnit                                                             : Unidad de medida
admin_Emails                                                                    : E-Mails
admin_EMailsSetup                                                               : Configuración E-Mails
admin_EMailsDesc                                                                : Esta página permite sustituir los parámetros PHP relacionados con el envío de correos electrónicos. En la mayoría de los casos en SO como UNIX/Linux, los parámetros PHP son ya correctos y esta página es inútil.
admin_MAIN_MAIL_SMTP_PORT                                                       : Puerto del servidor SMTP (Por defecto en php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_SERVER                                                     : Nombre host o ip del servidor SMTP (Por defecto en php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_PORT_NotAvailableOnLinuxLike                               : Puerto del servidor SMTP (No definido en PHP en sistemas de tipo Unix)
admin_MAIN_MAIL_SMTP_SERVER_NotAvailableOnLinuxLike                             : Nombre servidor o ip del servidor SMTP (No definido en PHP en sistemas de tipo Unix)
admin_MAIN_MAIL_EMAIL_FROM                                                      : E-Mail del emisor para envíos E-Mail automáticos (Por defecto en php.ini: <b>%s</b>)
admin_MAIN_MAIL_ERRORS_TO                                                       : E-Mail usado para los retornos de error de los e-mails enviados
admin_MAIN_MAIL_AUTOCOPY_TO                                                     : Enviar automáticamente copia oculta de los e-mails enviados a
admin_MAIN_DISABLE_ALL_MAILS                                                    : Desactivar globalmente todo envío de correos electrónicos (para modo de pruebas o demo)
admin_MAIN_MAIL_SENDMODE                                                        : Método de envío de e-mails
admin_MAIN_MAIL_SMTPS_ID                                                        : ID de autentificación SMTP  si se requiere autenticación SMTP
admin_MAIN_MAIL_SMTPS_PW                                                        : Contraseña autentificación SMTP si se requiere autentificación SMTP
admin_MAIN_MAIL_EMAIL_TLS                                                       : Uso de encriptación TLS (SSL)
admin_MAIN_DISABLE_ALL_SMS                                                      : Desactivar globalmente todo envío de SMS (para modo de pruebas o demo)
admin_MAIN_SMS_SENDMODE                                                         : Método de envío de SMS
admin_MAIN_MAIL_SMS_FROM                                                        : Número de teléfono por defecto para los envíos SMS
admin_FeatureNotAvailableOnLinux                                                : Funcionalidad no disponible en sistemas  Unix. Pruebe su sendmail localmente.
admin_SubmitTranslation                                                         : Si la traducción de este idioma es incompleta o si encuentra errores, puede corregirlos mediante la edición de los archivos en el directorio <b>langs/%s</b> y envíe los cambios al foro www.dolibarr.es.
admin_ModuleSetup                                                               : Configuración del módulo
admin_ModulesSetup                                                              : Configuración de los módulos
admin_ModuleFamilyBase                                                          : Sistema
admin_ModuleFamilyCrm                                                           : Gestión cliente (CRM)
admin_ModuleFamilyProducts                                                      : Gestión productos
admin_ModuleFamilyHr                                                            : Recursos Humanos
admin_ModuleFamilyProjects                                                      : Proyectos/Trabajo cooperativo
admin_ModuleFamilyOther                                                         : Otro
admin_ModuleFamilyTechnic                                                       : Módulos herramientas o Sistema
admin_ModuleFamilyExperimental                                                  : Módulos experimentales (no utilizar en producción)
admin_ModuleFamilyFinancial                                                     : Módulos financieros (Contabilidad/tesorería)
admin_ModuleFamilyECM                                                           : Gestión Electrónica de Documentos (GED)
admin_MenuHandlers                                                              : Gestores menú
admin_MenuAdmin                                                                 : Editor menú
admin_DoNotUseInProduction                                                      : Do not use in production
admin_ThisIsProcessToFollow                                                     : He aquí el procedimiento a seguir:
admin_StepNb                                                                    : Paso %s
admin_FindPackageFromWebSite                                                    : Buscar el paquete que responde a su necesidad (por ejemplo en el sitio web %s)
admin_DownloadPackageFromWebSite                                                : Descargar el paquete desde el sitio %s.
admin_UnpackPackageInSpeedealingRoot                                            : Descomprimir el paquete en el directorio raíz de Speedealing <b>%s</b>
admin_SetupIsReadyForUse                                                        : La instalación ha finalizado y Dolibarr está disponible con el nuevo componente.
admin_NotExistsDirect                                                           : No existe el directorio alternativo.<br>
admin_InfDirAlt                                                                 : Desde la versión 3 es posible definir un directorio root alternativo, esto le permite almacenar en el mismo lugar módulos y temas personalizados.<br>Basta con crear un directorio en el raíz de Dolibarr (por ejemplo: custom).<br>
admin_InfDirExample                                                             : <br>Seguidamente se declara en el archivo conf.php:<br> $dolibarr_main_url_root_alt='http://miservidor/custom'<br>$dolibarr_main_document_root_alt='/directorio/de/dolibarr/htdocs/custom'<br>*Estas lineas vienen comentadas con un "#", para descomentarlas solo hay que retirar el caracter.
admin_YouCanSubmitFile                                                          : Seleccione paquete:
admin_CurrentVersion                                                            : Versión actual de Dolibarr
admin_CallUpdatePage                                                            : Llamar a la página de actualización de la estructura y datos de la base de datos %s.
admin_LastStableVersion                                                         : Última versión estable disponible
admin_GenericMaskCodes                                                          : Puede introducir cualquier máscara numérica. En esta máscara, puede utilizar las siguientes etiquetas:<br><b>{000000} </b> corresponde a un número que se incrementa en cada uno de %s. Introduzca tantos ceros como longitud desee mostrar. El contador se completará a partir de ceros por la izquierda con el fin de tener tantos ceros como la máscara. <br> <b> {000000+000}</ b> Igual que el anterior, con una compensación correspondiente al número a la derecha del signo + se aplica a partir del primer %s. <br> <b> {000000@x}</b> igual que el anterior, pero el contador se restablece a cero cuando se llega a x meses (x entre 1 y 12). Si esta opción se utiliza y x es de 2 o superior, entonces la secuencia {yy}{mm} o {yyyy}{mm} también es necesaria. <br> <b> {dd} </b> días (01 a 31). <br><b> {mm}</b> mes (01 a 12). <br><b>{yy}</b>, <b>{yyyy}</b> ou <b>{y}</b> año en 2, 4 ó 1 cifra.<br>
admin_GenericMaskCodes2                                                         : <b>{cccc}</b> el código de cliente en n caracteres<br><b>{cccc000}</b> el código de cliente en n caracteres es seguido por un contador propio al cliente sin offset, completado con ceros hasta completar la máscara, y volviendo a cero al mismo tiempo que el contador global.<br><b>{tttt}</b>El código del tipo de la empresa en n caracteres (ver diccionarios-tipos de empresas).<br>
admin_GenericMaskCodes3                                                         : Cualquier otro carácter en la máscara se quedará sin cambios. <br>No se permiten espacios <br>
admin_GenericMaskCodes4a                                                        : <u>Ejemplo en la 99 ª %s del tercero La Empresa realizada el 31/03/2007: </u><br>
admin_GenericMaskCodes4b                                                        : <u>Ejemplo sobre un tercero creado el 31/03/2007:</u><br>
admin_GenericMaskCodes4c                                                        : <u>Ejemplo en un producto/servicio creado el 31/03/2007:</u><br>
admin_GenericMaskCodes5                                                         : <b>ABC{yy}{mm}-{000000}</b> dará <b>ABC0703-000099</b><br><b>{0000+100}-XXX/{dd}/YYY</b> daráa <b>0199-XXX/31/YYY</b>
admin_GenericNumRefModelDesc                                                    : Devuelve un número creado acorde a una máscara definida.
admin_ServerAvailableOnIPOrPort                                                 : Servidor disponible en la dirección <b>%s</b> en el puerto <b>%s</b>
admin_ServerNotAvailableOnIPOrPort                                              : Servidor no disponible en la dirección <b>%s</b> en el puerto <b>%s</b>
admin_DoTestServerAvailability                                                  : Probar conectividad con el servidor
admin_DoTestSend                                                                : Probar envío
admin_DoTestSendHTML                                                            : Probar envío HTML
admin_ErrorCantUseRazInStartedYearIfNoYearMonthInMask                           : Error, no se puede usar opción @ si la secuencia {yy}{mm} o {yyyy}{mm} no se encuentra en la máscara.
admin_UMask                                                                     : Parámetro UMask de nuevos archivos en Unix/Linux/BSD.
admin_UMaskExplanation                                                          : Este parámetro determina los derechos de los archivos creados en el servidor Dolibarr (durante la subida, por ejemplo).<br>Este debe ser el valor octal (por ejemplo, 0666 significa lectura / escritura para todos).<br>Este parámetro no tiene ningún efecto sobre un servidor Windows.
admin_SeeWikiForAllTeam                                                         : Vea el wiki para más detalles de todos los actores y de su organización
admin_UseACacheDelay                                                            : Demora en caché de la exportación en segundos (0 o vacio sin caché)
admin_DisableLinkToHelpCenter                                                   : Ocultar el enlace "¿Necesita soporte o ayuda?" en la página de login
admin_DisableLinkToHelp                                                         : Ocultar el enlace "<b>%s Ayuda en línea</b>" del menú izquierdo
admin_AddCRIfTooLong                                                            : No hay líneas de corte automático, de modo que si el texto es demasiado largo en los documentos, debe agregar sus propios retornos de carro en el texto mecanografiado.
admin_ModuleDisabled                                                            : Módulo desactivado
admin_ModuleDisabledSoNoEvent                                                   : Módulo desactivado, por lo que evento nunca se crea
admin_ConfirmPurge                                                              : ¿Está seguro de querer realizar esta purga?<br>Esto borrará definitivamente todos los datos de sus archivos (área GED, archivos adjuntos etc.).
admin_MinLength                                                                 : Longuitud mínima
admin_LanguageFilesCachedIntoShmopSharedMemory                                  : archivos .lang en memoria compartida
admin_ExamplesWithCurrentSetup                                                  : Ejemplos con la configuración activa actual
admin_ListOfDirectories                                                         : Listado de directorios de plantillas OpenDocument
admin_ListOfDirectoriesForModelGenODT                                           : Listado de directorios con plantillas de documentos OpenDocument.<br><br>Indicar la ruta completa del directorio.<br>Añadir un retorno a la línea entre cada directorio.<b>Para indicar un directorio del módulo GED, indicar <b>DOL_DATA_ROOT/ecm/nombredeldirectorio</b>.<br><br>Los archivos de plantilla de estos directorios deben terminar con <b>.odt</b>
admin_NumberOfModelFilesFound                                                   : Número de archivos de plantillas ODT encontrados en este/estos directorio(s)
admin_ExampleOfDirectoriesForModelGen                                           : Ejemplos de sintaxis:<br>c:\mydir<br>/home/mydir<br>DOL_DATA_ROOT/ecm/ecmdir
admin_FollowingSubstitutionKeysCanBeUsed                                        : Colocando los siguientes tags en la plantilla, obtendrá una sustitución con el valor personalizado al generar el documento:
admin_FullListOnOnlineDocumentation                                             : http://wiki.dolibarr.org/index.php/Crear_un_modelo_de_documento_ODT
admin_FirstnameNamePosition                                                     : Orden visualización nombre/apellidos
admin_DescWeather                                                               : Los siguientes gráficos se mostrarán en el panel si el número de elementos llegan a estos valores:
admin_KeyForWebServicesAccess                                                   : Clave para usar los Web Services (parámetro "dolibarrkey" en webservices)
admin_TestSubmitForm                                                            : Formulario de pruebas
admin_ThisForceAlsoTheme                                                        : Usar este gestor de menús predetermina también el tema, sea cual sea la elección del usuario. Además, este gestor de menús, especial para smartphones, solamente funciona en algunos teléfonos. Use otro gestor si observa cualquier problema.
admin_ThemeDir                                                                  : Directorio de los temas
admin_ConnectionTimeout                                                         : Timeout de conexión
admin_ResponseTimeout                                                           : Timeout de respuesta
admin_SmsTestMessage                                                            : Mensaje de prueba de __PHONEFROM__ para __PHONETO__
admin_ModuleMustBeEnabledFirst                                                  : Para usar esta función debe estar activado el módulo <b>%s</b>.
admin_SecurityToken                                                             : Clave para encriptar urls
admin_NoSmsEngine                                                               : No hay disponible ningún gestor de envío de SMS. Los gestores de envío de SMS no se instalan por defecto ya que dependen de cada proveedor, sin embargo puede encontrarlos en la plataforma %s.
admin_PDF                                                                       : PDF
admin_PDFDesc                                                                   : Puede definir aquí las opciones globales para la generación de los PDF
admin_PDFAddressForging                                                         : Reglas de visualización de direcciones
admin_HideAnyVATInformationOnPDF                                                : Ocultar toda la información relacionada con el IVA en la generación de los PDF
admin_HideDescOnPDF                                                             : Ocultar descripción de los productos en la generación de los PDF
admin_HideRefOnPDF                                                              : Ocultar referencia de los productos en la generación de los PDF
admin_HideDetailsOnPDF                                                          : Ocultar detalles de las líneas de productos en la generación de los PDF
admin_UrlGenerationParameters                                                   : Seguridad de las URLs
admin_SecurityTokenIsUnique                                                     : ¿Usar un parámetro securekey único para cada URL?
admin_EnterRefToBuildUrl                                                        : Introduzca la referencia del objeto %s
admin_GetSecuredUrl                                                             : Obtener la URL calculada
admin_ButtonHideUnauthorized                                                    : Ocultar los botones de acciones no autorizadas en vez de mostrarlos atenuados
admin_TotalNumberOfActivatedModules                                             : Número total de módulos activados: <b>%s</b>
admin_YouMustEnableOneModule                                                    : Debe activar al menos 1 módulo.
admin_ModulesSystemTools                                                        : Módulos utilidades
admin_ProductVatMassChange                                                      : Modificar IVA en masa
admin_ProductVatMassChangeDesc                                                  : Esta página le permite cambiar el tipo de IVA definido en  los productos o servicios de un valor a otro. Tenga en cuenta que el cambio se lleva a cabo en masa sobre toda la base de datos.
admin_OldVATRates                                                               : Tasa de IVA antigua
admin_NewVATRates                                                               : Tasa de IVA nueva
admin_PriceBaseTypeToChange                                                     : Cambiar el precio cuya referencia de base es
admin_MassConvert                                                               : Convertir masivamente
admin_String                                                                    : Cadena de texto
admin_TextLong                                                                  : Texto largo
admin_Int                                                                       : Numérico entero
admin_Float                                                                     : Decimal
admin_DateAndTime                                                               : Fecha y hora
admin_Structure                                                                 : Estructura
admin_Module0Name                                                               : Usuarios y grupos
admin_Module0Desc                                                               : Gestión de usuarios y grupos
admin_Module1Name                                                               : Terceros
admin_Module1Desc                                                               : Gestión de terceros (empresas, particulares) y contactos
admin_Module2Name                                                               : Comercial
admin_Module2Desc                                                               : Gestión comercial
admin_Module10Name                                                              : Contabilidad
admin_Module10Desc                                                              : Gestión simple de la contabilidad (desglose de facturas y pagos)
admin_Module20Name                                                              : Presupuestos
admin_Module20Desc                                                              : Gestión de presupuestos/propuestas comerciales
admin_Module22Name                                                              : E-Mailings
admin_Module22Desc                                                              : Administración y envío de E-Mails masivos
admin_Module23Name                                                              : Energía
admin_Module23Desc                                                              : Realiza el seguimiento del consumo de energías
admin_Module25Name                                                              : Pedidos de clientes
admin_Module25Desc                                                              : Gestión de pedidos de clientes
admin_Module30Name                                                              : Facturas y abonos
admin_Module30Desc                                                              : Gestión de facturas y abonos a clientes. Gestión facturas de proveedores
admin_Module40Name                                                              : Proveedores
admin_Module40Desc                                                              : Gestión de proveedores
admin_Module42Name                                                              : Syslog
admin_Module42Desc                                                              : Generación de logs (archivos, syslog,...)
admin_Module49Name                                                              : Editores
admin_Module49Desc                                                              : Gestión de editores
admin_Module50Name                                                              : Productos
admin_Module50Desc                                                              : Gestión de productos
admin_Module51Name                                                              : Publipostage
admin_Module51Desc                                                              : Administración y envío de correo de papel en masa
admin_Module52Name                                                              : Stocks de productos
admin_Module52Desc                                                              : Gestión de stocks de productos
admin_Module53Name                                                              : Servicios
admin_Module53Desc                                                              : Gestión de servicios
admin_Module54Name                                                              : Contratos
admin_Module54Desc                                                              : Gestión de contratos
admin_Module55Name                                                              : Códigos de barras
admin_Module55Desc                                                              : Gestión de los códigos de barras
admin_Module56Name                                                              : Telefonía
admin_Module56Desc                                                              : Gestión de la telefonía
admin_Module57Name                                                              : Domiciliaciones
admin_Module57Desc                                                              : Gestión de domiciliaciones y reintegros bancarios
admin_Module58Name                                                              : ClickToDial
admin_Module58Desc                                                              : Integración con ClickToDial
admin_Module59Name                                                              : Bookmark4u
admin_Module59Desc                                                              : Añade función para generar una cuenta Bookmark4u desde una cuenta Dolibarr
admin_Module70Name                                                              : Intervenciones
admin_Module70Desc                                                              : Gestión de las intervenciones a terceros
admin_Module75Name                                                              : Notas de gasto y desplazamientos
admin_Module75Desc                                                              : Gestión de las notas de gasto y desplazamientos
admin_Module80Name                                                              : Expediciones
admin_Module80Desc                                                              : Gestión de expediciones y recepciones
admin_Module85Name                                                              : Bancos y cajas
admin_Module85Desc                                                              : Gestión de las cuentas financieras de tipo cuentas bancarias, postales o efectivo
admin_Module100Name                                                             : Sitio web externo
admin_Module100Desc                                                             : Incluye cualquier sitio web externo en los menús de Dolibarr, viéndolo en un frame
admin_Module105Name                                                             : Mailman y SPIP
admin_Module105Desc                                                             : Interfaz con Mailman o SPIP para el módulo Miembros
admin_Module200Name                                                             : LDAP
admin_Module200Desc                                                             : Sincronización con un directorio LDAP
admin_Module210Name                                                             : PostNuke
admin_Module210Desc                                                             : Integración con PostNuke
admin_Module240Name                                                             : Exportaciones de datos
admin_Module240Desc                                                             : Herramienta de exportación de datos Dolibarr (con asistente)
admin_Module250Name                                                             : Importación de datos
admin_Module250Desc                                                             : Herramienta de importación de datos a Dolibarr (con asistente)
admin_Module310Name                                                             : Miembros
admin_Module310Desc                                                             : Gestión de miembros de una asociación
admin_Module320Name                                                             : Hilos RSS
admin_Module320Desc                                                             : Adición de hilos de información RSS en las pantallas Dolibarr
admin_Module330Name                                                             : Marcadores
admin_Module330Desc                                                             : Gestión de marcadores
admin_Module400Name                                                             : Proyectos
admin_Module400Desc                                                             : Gestión de los proyectos en los otros módulos
admin_Module410Name                                                             : Webcalendar
admin_Module410Desc                                                             : Interfaz con el calendario Webcalendar
admin_Module420Name                                                             : Affaires
admin_Module420Desc                                                             : Gestion des affaires
admin_Module430Name                                                             : Gestion d'équipes
admin_Module430Desc                                                             : Gestion des objectifs
admin_Module500Name                                                             : Impuestos, cargas sociales y dividendos
admin_Module500Desc                                                             : Gestión de impuestos y cargas sociales
admin_Module600Name                                                             : Notificaciones
admin_Module600Desc                                                             : Envío de notificaciones (por correo electrónico) sobre los eventos de trabajo Dolibarr
admin_Module700Name                                                             : Donaciones
admin_Module700Desc                                                             : Gestión de donaciones
admin_Module1400Name                                                            : Contabilidad experta
admin_Module1400Desc                                                            : Gestión experta de la contabilidad (doble partida)
admin_Module1780Name                                                            : Categorías
admin_Module1780Desc                                                            : Gestión de categorías (productos, proveedores y clientes)
admin_Module2000Name                                                            : Editor WYSIWYG
admin_Module2000Desc                                                            : Permite la edición de ciertas zonas de texto mediante un editor avanzado
admin_Module2200Name                                                            : Derecho de préstamos
admin_Module2200Desc                                                            : Gestión de los derechos de préstamos
admin_Module2300Name                                                            : Menús
admin_Module2300Desc                                                            : Administración de los menús por base de datos
admin_Module2400Name                                                            : Agenda
admin_Module2400Desc                                                            : Gestión de la agenda y de las acciones
admin_Module2500Name                                                            : Gestión Electrónica de Documentos
admin_Module2500Desc                                                            : Permite administrar una base de documentos
admin_Module2600Name                                                            : WebServices
admin_Module2600Desc                                                            : Activa los servicios de servidor web services de Dolibarr
admin_Module2700Name                                                            : Gravatar
admin_Module2700Desc                                                            : Utiliza el servicio en línea de Gravatar (www.gravatar.com) para mostrar fotos de los usuarios/miembros (que se encuentran en sus mensajes de correo electrónico). Necesita un acceso a Internet
admin_Module2900Name                                                            : GeoIPMaxmind
admin_Module2900Desc                                                            : Capacidades de conversión GeoIP Maxmind
admin_Module5000Name                                                            : Multi-empresa
admin_Module5000Desc                                                            : Permite gestionar varias empresas
admin_Module20000Name                                                           : Días libres
admin_Module20000Desc                                                           : Gestión de los días libres de los empleados
admin_Module50000Name                                                           : PayBox
admin_Module50000Desc                                                           : Módulo para proporcionar un pago en línea con tarjeta de crédito mediante Paybox
admin_Module50100Name                                                           : TPV
admin_Module50100Desc                                                           : Terminal Punto de Venta para la venta en mostrador
admin_Module50200Name                                                           : Paypal
admin_Module50200Desc                                                           : Módulo para proporcionar un pago en línea con tarjeta de crédito mediante Paypal
admin_Module59000Name                                                           : Márgenes
admin_Module59000Desc                                                           : Módulo para gestionar los márgenes de beneficio
admin_Module60000Name                                                           : Comisiones
admin_Module60000Desc                                                           : Módulo para gestionar las comisiones de venta
admin_Permission11                                                              : Consultar facturas
admin_Permission12                                                              : Crear/Modificar facturas
admin_Permission13                                                              : De-validar facturas
admin_Permission14                                                              : Validar facturas
admin_Permission15                                                              : Enviar facturas por correo
admin_Permission16                                                              : Emitir pagos de facturas
admin_Permission19                                                              : Eliminar facturas
admin_Permission21                                                              : Consultar presupuestos
admin_Permission22                                                              : Crear/modificar presupuestos
admin_Permission24                                                              : Validar presupuestos
admin_Permission25                                                              : Enviar los presupuestos
admin_Permission26                                                              : Cerrar presupuestos
admin_Permission27                                                              : Eliminar presupuestos
admin_Permission28                                                              : Exportar los presupuestos
admin_Permission31                                                              : Consultar productos
admin_Permission32                                                              : Crear/modificar productos
admin_Permission34                                                              : Eliminar productos
admin_Permission36                                                              : Ver/gestionar los productos ocultos
admin_Permission38                                                              : Exportar productos
admin_Permission41                                                              : Consultar proyectos y tareas (compartidos o soy contacto)
admin_Permission42                                                              : Crear/modificar proyectos y tareas (compartidos o soy contacto)
admin_Permission44                                                              : Eliminar proyectos y tareas (compartidos o soy contacto)
admin_Permission61                                                              : Consultar intervenciones
admin_Permission62                                                              : Crear/modificar intervenciones
admin_Permission64                                                              : Eliminar intervenciones
admin_Permission67                                                              : Exportar intervenciones
admin_Permission71                                                              : Consultar miembros
admin_Permission72                                                              : Crear/modificar miembros
admin_Permission74                                                              : Eliminar miembros
admin_Permission75                                                              : Configurar tipos y atributos de los miembros
admin_Permission76                                                              : Exportar miembros
admin_Permission78                                                              : Consultar cotizaciones
admin_Permission79                                                              : Crear/modificar cotizaciones
admin_Permission81                                                              : Consultar pedidos de clientes
admin_Permission82                                                              : Crear/modificar pedidos de clientes
admin_Permission84                                                              : Validar pedidos de clientes
admin_Permission86                                                              : Enviar pedidos de clientes
admin_Permission87                                                              : Cerrar pedidos de clientes
admin_Permission88                                                              : Anular pedidos de clientes
admin_Permission89                                                              : Eliminar pedidos de clientes
admin_Permission91                                                              : Consultar impuestos e IVA
admin_Permission92                                                              : Crear/modificar impuestos e IVA
admin_Permission93                                                              : Eliminar impuestos e IVA
admin_Permission94                                                              : Exportar impuestos
admin_Permission95                                                              : Consultar balances y resultados
admin_Permission96                                                              : Parametrizar desglose
admin_Permission97                                                              : Leer líneas de facturas
admin_Permission98                                                              : Desglosar líneas de facturas
admin_Permission101                                                             : Consultar expediciones
admin_Permission102                                                             : Crear/modificar expediciones
admin_Permission104                                                             : Validar expediciones
admin_Permission109                                                             : Eliminar expediciones
admin_Permission111                                                             : Consultar cuentas financieras (cuentas bancarias, cajas)
admin_Permission112                                                             : Crear/modificar cantidad/eliminar registros bancarios
admin_Permission113                                                             : Configurar cuentas financieras (crear, controlar las categorías)
admin_Permission114                                                             : Exportar transacciones y registros bancarios
admin_Permission115                                                             : Exportar transacciones y extractos
admin_Permission116                                                             : Captar transferencias entre cuentas
admin_Permission117                                                             : Gestionar envío de cheques
admin_Permission121                                                             : Consultar empresas
admin_Permission122                                                             : Crear/modificar empresas
admin_Permission125                                                             : Eliminar empresas
admin_Permission126                                                             : Exportar las empresas
admin_Permission141                                                             : Consultar todos los proyectos y tareas (incluyendo los privados de los que no sea contacto)
admin_Permission142                                                             : Crear/modificar todos los proyectos y tareas (incluyendo los privados de los que no sea contacto)
admin_Permission144                                                             : Eliminar todos los proyectos y tareas (incluyendo los privados de los que no sea contacto)
admin_Permission146                                                             : Consultar proveedores
admin_Permission147                                                             : Consultar estadísticas
admin_Permission151                                                             : Consultar domiciliaciones
admin_Permission152                                                             : Crear/modificar domiciliaciones
admin_Permission153                                                             : Enviar domiciliaciones
admin_Permission154                                                             : Abonar/devolver domiciliaciones
admin_Permission161                                                             : Consultar contratos de servicio
admin_Permission162                                                             : Crear/modificar contratos de servicio
admin_Permission163                                                             : Activar los servicios de un contrato
admin_Permission164                                                             : Desactivar los servicios de un contrato
admin_Permission165                                                             : Eliminar contratos
admin_Permission171                                                             : Leer los desplazamientos
admin_Permission172                                                             : Crear/modificar los desplazamientos
admin_Permission173                                                             : Eliminar desplazamientos
admin_Permission178                                                             : Exportar desplazamientos
admin_Permission180                                                             : Consultar proveedores
admin_Permission181                                                             : Consultar pedidos a proveedores
admin_Permission182                                                             : Crear/modificar pedidos a proveedores
admin_Permission183                                                             : Validar pedidos a proveedores
admin_Permission184                                                             : Aprobar pedidos a proveedores
admin_Permission185                                                             : Enviar pedidos a proveedores
admin_Permission186                                                             : Recibir pedidos de proveedores
admin_Permission187                                                             : Cerrar pedidos a proveedores
admin_Permission188                                                             : Anular pedidos a proveedores
admin_Permission192                                                             : Crear líneas
admin_Permission193                                                             : Cancelar líneas
admin_Permission194                                                             : Consultar el ancho de banda de líneas
admin_Permission202                                                             : Crear conexiones ADSL
admin_Permission203                                                             : Realizar pedido de conexiones
admin_Permission204                                                             : Pedir conexiones
admin_Permission205                                                             : Gestionar conexiones
admin_Permission206                                                             : Consultar conexiones
admin_Permission211                                                             : Consultar telefonía
admin_Permission212                                                             : Pedir líneas
admin_Permission213                                                             : Activar una línea
admin_Permission214                                                             : Configurar la telefonía
admin_Permission215                                                             : Configurar proveedores
admin_Permission221                                                             : Consultar E-Mails
admin_Permission222                                                             : Crear/modificar E-Mails (asunto, destinatarios, etc.)
admin_Permission223                                                             : Validar E-Mails (permite el envío)
admin_Permission229                                                             : Eliminar E-Mails
admin_Permission237                                                             : Ver los destinatarios y la información
admin_Permission238                                                             : Enviar los e-mails manualmente
admin_Permission239                                                             : Eliminar los e-mails después de su validación o su envío
admin_Permission241                                                             : Consultar categorías
admin_Permission242                                                             : Crear/modificar categorías
admin_Permission243                                                             : Eliminar categorías
admin_Permission244                                                             : Ver contenido de categorías ocultas
admin_Permission251                                                             : Consultar otros usuarios
admin_PermissionAdvanced251                                                     : Consultar otros usuarios
admin_Permission252                                                             : Consultar los permisos de otros usuarios
admin_Permission253                                                             : Crear/modificar otros usuarios y sus permisos
admin_PermissionAdvanced253                                                     : Crear/modificar usuarios internos/externos y sus permisos
admin_Permission254                                                             : Modificar la contraseña de otros usuarios
admin_Permission255                                                             : Eliminar o desactivar otros usuarios
admin_Permission256                                                             : Consultar sus permisos
admin_Permission262                                                             : Consultar todas las empresas (Solamente usuarios internos. Los externos están limitados a ellos mismos)
admin_Permission271                                                             : Consultar el CA
admin_Permission272                                                             : Consultar las facturas
admin_Permission273                                                             : Emitir las facturas
admin_Permission281                                                             : Consultar contactos
admin_Permission282                                                             : Crear/modificar contactos
admin_Permission283                                                             : Eliminar contactos
admin_Permission286                                                             : Exportar los contactos
admin_Permission291                                                             : Consultar tarifas
admin_Permission292                                                             : Definir permisos sobre las tarifas
admin_Permission293                                                             : Modificar tarifas de clientes
admin_Permission300                                                             : Consultar códigos de barras
admin_Permission301                                                             : Crear/modificar códigos de barras
admin_Permission302                                                             : Eliminar código de barras
admin_Permission311                                                             : Consultar servicios
admin_Permission312                                                             : Asignar servicios a un contrato
admin_Permission331                                                             : Consultar marcadores
admin_Permission332                                                             : Crear/modificar marcadores
admin_Permission333                                                             : Eliminar marcadores
admin_Permission341                                                             : Consultar sus propios permisos
admin_Permission342                                                             : Crear/modificar su propia info de usuario
admin_Permission343                                                             : Modificar su propia contraseña
admin_Permission344                                                             : Modificar sus propios permisos
admin_Permission351                                                             : Consultar los grupos
admin_Permission352                                                             : Consultar los permisos de grupos
admin_Permission353                                                             : Crear/modificar los grupos y sus permisos
admin_Permission354                                                             : Eliminar o desactivar grupos
admin_Permission358                                                             : Exportar usuarios
admin_Permission401                                                             : Consultar haberes
admin_Permission402                                                             : Crear/modificar haberes
admin_Permission403                                                             : Validar haberes
admin_Permission404                                                             : Eliminar haberes
admin_Permission531                                                             : Consultar servicios
admin_Permission532                                                             : Crear/modificar servicios
admin_Permission534                                                             : Eliminar servicios
admin_Permission536                                                             : Ver/gestionar los servicios ocultos
admin_Permission538                                                             : Exportar servicios
admin_Permission701                                                             : Consultar donaciones
admin_Permission702                                                             : Crear/modificar donaciones
admin_Permission703                                                             : Eliminar donaciones
admin_Permission1001                                                            : Consultar stocks
admin_Permission1002                                                            : Crear/modificar stocks
admin_Permission1003                                                            : Eliminar stocks
admin_Permission1004                                                            : Consultar movimientos de stock
admin_Permission1005                                                            : Crear/modificar movimientos de stock
admin_Permission1101                                                            : Consultar ordenes de envío
admin_Permission1102                                                            : Crear/modificar ordenes de envío
admin_Permission1104                                                            : Validar orden de envío
admin_Permission1109                                                            : Eliminar orden de envío
admin_Permission1181                                                            : Consultar proveedores
admin_Permission1182                                                            : Consultar pedidos a proveedores
admin_Permission1183                                                            : Crear pedidos a proveedores
admin_Permission1184                                                            : Validar pedidos a proveedores
admin_Permission1185                                                            : Aprobar pedidos a proveedores
admin_Permission1186                                                            : Enviar pedidos a proveedores
admin_Permission1187                                                            : Recibir pedidos de proveedores
admin_Permission1188                                                            : Cerrar pedidos a proveedores
admin_Permission1201                                                            : Obtener resultado de una exportación
admin_Permission1202                                                            : Crear/codificar exportaciones
admin_Permission1231                                                            : Consultar facturas de proveedores
admin_Permission1232                                                            : Crear facturas de proveedores
admin_Permission1233                                                            : Validar facturas de proveedores
admin_Permission1234                                                            : Eliminar facturas de proveedores
admin_Permission1235                                                            : Enviar facturas de proveedores por correo
admin_Permission1236                                                            : Exportar facturas de proveedores, atributos y pagos
admin_Permission1237                                                            : Exportar pedidos de proveedores junto con sus detalles
admin_Permission1251                                                            : Lanzar las importaciones en masa a la base de datos (carga de datos)
admin_Permission1321                                                            : Exportar facturas a clientes, atributos y cobros
admin_Permission1401                                                            : Leer el plan contable
admin_Permission1402                                                            : Crear/Modificar un plan contable
admin_Permission1403                                                            : Cerrar un plan contable
admin_Permission1411                                                            : Leer los movimientos contables
admin_Permission1412                                                            : Crear/modificar/anular movimientos contables
admin_Permission1415                                                            : Leer Balances, informes, diarios, libros maestros
admin_Permission1421                                                            : Exportar pedidos de clientes y atributos
admin_Permission2401                                                            : Leer acciones (eventos o tareas) vinculadas a su cuenta
admin_Permission2402                                                            : Crear/eliminar acciones (eventos o tareas) vinculadas a su cuenta
admin_Permission2403                                                            : Modificar acciones (eventos o tareas) vinculadas a su cuenta
admin_Permission2411                                                            : Leer acciones (eventos o tareas) de otros
admin_Permission2412                                                            : Crear/modificar acciones (eventos o tareas) de otros
admin_Permission2413                                                            : Eliminar acciones (eventos o tareas) de otros
admin_Permission2501                                                            : Consultar/Recuperar documentos
admin_Permission2502                                                            : Recuperar documentos
admin_Permission2503                                                            : Enviar o eliminar documentos
admin_Permission2515                                                            : Configuración directorios de documentos
admin_Permission2801                                                            : Utilizar el cliente FTP en modo lectura (sólo explorar y descargar)
admin_Permission2802                                                            : Utilizar el cliente FTP en modo escritura (borrar o subir archivos)
admin_Permission50101                                                           : Usar TPV
admin_Permission50201                                                           : Consultar las transacciones
admin_Permission50202                                                           : Importar las transacciones
admin_DictionnaryCompanyType                                                    : Tipos de empresa
admin_DictionnaryCompanyJuridicalType                                           : Formas jurídicas
admin_DictionnaryProspectLevel                                                  : Perspectiva nivel cliente potencial
admin_DictionnaryCanton                                                         : Departamentos/Provincias/Zonas
admin_DictionnaryRegion                                                         : Regiones
admin_DictionnaryCountry                                                        : Países
admin_DictionnaryCurrency                                                       : Monedas
admin_DictionnaryCivility                                                       : Títulos de cortesía
admin_DictionnaryActions                                                        : Tipos de eventos de la agenda
admin_DictionnarySocialContributions                                            : Tipos de cargas sociales
admin_DictionnaryVAT                                                            : Tasa de IVA (Impuesto sobre ventas en EEUU)
admin_DictionnaryPaymentConditions                                              : Condiciones de pago
admin_DictionnaryPaymentModes                                                   : Modos de pago
admin_DictionnaryTypeContact                                                    : Tipos de contactos/direcciones
admin_DictionnaryEcotaxe                                                        : Baremos CEcoParticipación (DEEE)
admin_DictionnaryPaperFormat                                                    : Formatos de papel
admin_DictionnaryFees                                                           : Tipos de desplazamientos y honorarios
admin_DictionnarySendingMethods                                                 : Métodos de expedición
admin_DictionnaryStaff                                                          : Empleados
admin_DictionnaryAvailability                                                   : Tiempos de entrega
admin_DictionnaryOrderMethods                                                   : Métodos de pedido
admin_DictionnarySource                                                         : Orígenes de presupuestos/pedidos
admin_DictionnaryAccountancyplan                                                : Plan contable
admin_DictionnaryAccountancysystem                                              : Models for chart of accounts
admin_SetupSaved                                                                : Configuración guardada
admin_BackToModuleList                                                          : Volver a la lista de módulos
admin_BackToDictionnaryList                                                     : Volver a la lista de diccionarios
admin_VATReceivedOnly                                                           : Impuestos especiales no facturables
admin_VATManagement                                                             : Gestión IVA
admin_VATIsUsedDesc                                                             : El tipo de IVA propuesto por defecto en las creaciones de presupuestos, facturas, pedidos, etc. Responde a la siguiente regla:<br>Si el vendedor no está sujeto a IVA, IVA por defecto=0. Final de regla.<br>Si el país del vendedor= país del comprador entonces IVA por defecto=IVA del producto vendido. Final de regla.<br>Si vendedor y comprador residen en la Comunidad Europea y el bien vendido= nuevo medio de transportes (auto, barco, avión), IVA por defecto=0 (el IVA debe ser pagado por comprador a la hacienda pública de su país y no al vendedor). Final de regla<br>Si vendedor y comprador residen en la Comunidad Europea y comprador= particular o empresa sin NIF intracomunitario entonces IVA por defecto=IVA del producto vendido. Final de regla.<br>Si vendedor y comprador residen en la Comunidad Europea y comprador= empresa con NIF intracomunitario entonces IVA por defecto=0. Final de regla.<br>Si no, IVA propuesto por defecto=0. Final de regla.<br>
admin_VATIsNotUsedDesc                                                          : El tipo de IVA propuesto por defecto es 0. Este es el caso de asociaciones, particulares o algunas pequeñas sociedades.
admin_VATIsUsedExampleFR                                                        : En Francia, se trata de las sociedades u organismos que eligen un régimen fiscal general (General simplificado o General normal), régimen en el cual se declara el IVA.
admin_VATIsNotUsedExampleFR                                                     : En Francia, se trata de asociaciones exentas de IVA o sociedades, organismos o profesiones liberales que han elegido el régimen fiscal de módulos (IVA en franquicia), pagando un IVA en franquicia sin hacer declaración de IVA. Esta elección hace aparecer la anotación  "IVA no aplicable - art-293B del CGI" en las facturas.
admin_LocalTax1ManagementES                                                     : Gestión RE
admin_LocalTax1IsUsedDescES                                                     : El tipo de RE propuesto por defecto en las creaciones de presupuestos, facturas, pedidos, etc. Responde a la siguiente regla:<br>Si el comprador no está sujeto a RE, RE por defecto=0. Final de regla.<br>Si el comprador está sujeto a RE entonces se aplica valor de RE por defecto. Final de regla.<br>
admin_LocalTax1IsNotUsedDescES                                                  : El tipo de RE propuesto por defecto es 0. Final de regla.
admin_LocalTax1IsUsedExampleES                                                  : En España, se trata de personas físicas: autónomos sujetos a unos epígrafes concretos del IAE.
admin_LocalTax1IsNotUsedExampleES                                               : En España, se trata de empresas jurídicas: Sociedades limitadas, anónimas, etc. y personas físicas (autónomos) sujetos a ciertos epígrafes del IAE.
admin_LocalTax2ManagementES                                                     : Gestión IRPF
admin_LocalTax2IsUsedDescES                                                     : El tipo de IRPF propuesto por defecto en las creaciones de presupuestos, facturas, pedidos, etc. Responde a la siguiente regla:<br>Si el vendedor no está sujeto a IRPF, IRPF por defecto=0. Final de regla.<br>Si el vendedor está sujeto a IRPF entonces se aplica valor de IRPF por defecto. Final de regla.<br>
admin_LocalTax2IsNotUsedDescES                                                  : El tipo de IRPF propuesto por defecto es 0. Final de regla.
admin_LocalTax2IsUsedExampleES                                                  : En España, se trata de personas físicas: autónomos y profesionales independientes que prestan servicios y empresas que han elegido el régimen fiscal de módulos.
admin_LocalTax2IsNotUsedExampleES                                               : En España, se trata de empresas no sujetas al régimen fiscal de módulos.
admin_LabelUsedByDefault                                                        : Etiqueta que se utilizará si no se encuentra traducción para este código
admin_LabelOnDocuments                                                          : Etiqueta sobre documentos
admin_NbOfDays                                                                  : Nº de días
admin_AtEndOfMonth                                                              : A fin de mes
admin_Offset                                                                    : Decálogo
admin_AlwaysActive                                                              : Siempre activo
admin_UpdateRequired                                                            : Su sistema necesita una actualización. Para actualizar haga clic en <a href="%s">Actualizar</a>.
admin_Upgrade                                                                   : Actualización
admin_MenuUpgrade                                                               : Actualización / Extensión
admin_AddExtensionThemeModuleOrOther                                            : Añadir extensión (tema, módulo, etc.)
admin_WebServer                                                                 : Servidor web
admin_DocumentRootServer                                                        : Directorio raíz de las páginas web
admin_DataRootServer                                                            : Directorio raíz de los archivos de datos
admin_IP                                                                        : IP
admin_Port                                                                      : Puerto
admin_VirtualServerName                                                         : Nombre del servidor virtual
admin_AllParameters                                                             : Todos los parámetros
admin_OS                                                                        : SO
admin_Php                                                                       : Php
admin_PhpEnv                                                                    : Env
admin_PhpModules                                                                : Módulos
admin_PhpConf                                                                   : Conf
admin_PhpWebLink                                                                : Vínculo Web-PHP
admin_Pear                                                                      : Pear
admin_PearPackages                                                              : Paquetes Pear
admin_Database                                                                  : Base de datos
admin_DatabaseServer                                                            : Host de la base de datos
admin_DatabaseName                                                              : Nombre de la base de datos
admin_DatabasePort                                                              : Puerto de la base de datos
admin_DatabaseUser                                                              : Login de la base de datos
admin_DatabasePassword                                                          : Contraseña de la base de datos
admin_DatabaseConfiguration                                                     : Configuración de la base de datos
admin_Tables                                                                    : Tablas
admin_TableName                                                                 : Nombre de la tabla
admin_TableLineFormat                                                           : Formato líneas
admin_NbOfRecord                                                                : Nº Reg.
admin_Constraints                                                               : Constraints
admin_ConstraintsType                                                           : Tipo de constraint
admin_ConstraintsToShowOrNotEntry                                               : Constraint para mostrar o no la entrada de menú
admin_AllMustBeOk                                                               : Todos deben ser controlados
admin_Host                                                                      : Servidor
admin_DriverType                                                                : Tipo de driver
admin_SummarySystem                                                             : Resumen de la información de sistemas Dolibarr
admin_SummaryConst                                                              : Lista de todos los parámetros de configuración Dolibarr
admin_SystemUpdate                                                              : Actualización del sistema
admin_SystemSuccessfulyUpdate                                                   : Su sistema se actualizó correctamente
admin_MenuCompanySetup                                                          : Empresa/Institución
admin_MenuNewUser                                                               : Nuevo usuario
admin_MenuTopManager                                                            : Gestor del menú superior
admin_MenuLeftManager                                                           : Gestor del menú izquierdo
admin_MenuManager                                                               : Gestor del menú estándar
admin_MenuSmartphoneManager                                                     : Gestor de menú smartphone
admin_DefaultMenuTopManager                                                     : Gestor del menú superior
admin_DefaultMenuLeftManager                                                    : Gestor del menú izquierdo
admin_DefaultMenuManager                                                        : Gestor del menú estándar
admin_DefaultMenuSmartphoneManager                                              : Gestor de menú smartphone
admin_Skin                                                                      : Tema visual
admin_DefaultSkin                                                               : Tema visual por defecto
admin_MaxSizeList                                                               : Longitud máxima de listados
admin_DefaultMaxSizeList                                                        : Longitud máxima de listados por defecto
admin_MessageOfDay                                                              : Mensaje del día
admin_MessageLogin                                                              : Mensaje del login
admin_PermanentLeftSearchForm                                                   : Zona de búsqueda permanente del menú izquierdo
admin_DefaultLanguage                                                           : Idioma por defecto a utilizar (código idioma)
admin_EnableMultilangInterface                                                  : Activar interfaz multi-idioma
admin_EnableShowLogo                                                            : Mostrar el logotipo en el menú de la izquierda
admin_SystemSuccessfulyUpdated                                                  : Su sistema está actualizado
admin_CompanyInfo                                                               : Información de la empresa/institución
admin_CompanyIds                                                                : Identificación reglamentaria
admin_CompanyName                                                               : Nombre/Razón social
admin_CompanyAddress                                                            : Dirección
admin_CompanyZip                                                                : Código postal
admin_CompanyTown                                                               : Población
admin_CompanyCountry                                                            : País
admin_CompanyCurrency                                                           : Divisa principal
admin_DoNotShow                                                                 : No mostrar
admin_DoNotSuggestPaymentMode                                                   : No sugerir
admin_NoActiveBankAccountDefined                                                : Ninguna cuenta bancaria activa definida
admin_OwnerOfBankAccount                                                        : Titular de la cuenta %s
admin_BankModuleNotActive                                                       : Módulo cuentas bancarias no activado
admin_ShowBugTrackLink                                                          : Mostrar vínculo "Señalar un bug"
admin_ShowWorkBoard                                                             : Mostrar panel de información en la página principal
admin_Alerts                                                                    : Alertas
admin_Delays                                                                    : Plazos
admin_DelayBeforeWarning                                                        : Plazo antes de alerta
admin_DelaysBeforeWarning                                                       : Plazos antes de alerta
admin_DelaysOfToleranceBeforeWarning                                            : Plazos de tolerancia antes de alerta
admin_DelaysOfToleranceDesc                                                     : Esta pantalla permite configura los plazos de tolerancia antes de que se alerte con el símbolo %s, sobre cada elemento en retraso.
admin_Delays_MAIN_DELAY_ACTIONS_TODO                                            : Tolerancia de retraso antes de la alerta (en días) sobre acciones planificadas no realizadas
admin_Delays_MAIN_DELAY_ORDERS_TO_PROCESS                                       : Tolerancia de retraso antes de la alerta (en días) sobre pedidos de clientes no procesados
admin_Delays_MAIN_DELAY_SUPPLIER_ORDERS_TO_PROCESS                              : Tolerancia de retraso antes de la alerta (en días) sobre pedidos a proveedores no procesados
admin_Delays_MAIN_DELAY_PROPALS_TO_CLOSE                                        : Tolerancia de retraso antes de la alerta (en días) sobre presupuestos a cerrar
admin_Delays_MAIN_DELAY_PROPALS_TO_BILL                                         : Tolerancia de retraso antes de la alerta (en días) sobre presupuestos no facturados
admin_Delays_MAIN_DELAY_NOT_ACTIVATED_SERVICES                                  : Tolerancia de retraso antes de la alerta (en días) sobre servicios a activar
admin_Delays_MAIN_DELAY_RUNNING_SERVICES                                        : Tolerancia de retraso antes de la alerta (en días) sobre servicios expirados
admin_Delays_MAIN_DELAY_SUPPLIER_BILLS_TO_PAY                                   : Tolerancia de retraso antes de la alerta (en días) sobre facturas de proveedor impagadas
admin_Delays_MAIN_DELAY_CUSTOMER_BILLS_UNPAYED                                  : Tolerancia de retraso antes de la alerta (en días) sobre facturas a cliente impagadas
admin_Delays_MAIN_DELAY_TRANSACTIONS_TO_CONCILIATE                              : Tolerancia de retraso antes de la alerta (en días) sobre conciliaciones bancarias pendientes
admin_Delays_MAIN_DELAY_MEMBERS                                                 : Tolerancia de retraso entes de la alerta  (en días) sobre cotizaciones adherentes en retraso
admin_Delays_MAIN_DELAY_CHEQUES_TO_DEPOSIT                                      : Tolerancia de retraso entes de la alerta  (en días) sobre cheques a ingresar
admin_SetupDescription1                                                         : Todas las opciones del área de configuración son opciones que permiten configurar a Dolibarr antes de empezar su utilización.
admin_SetupDescription2                                                         : Los 2 pasos indispensables de la configuración son las 2 primeras en el menú izquierdo:  la configuración de la empresa/institución y la configuración de los módulos:
admin_SetupDescription3                                                         : La configuración <b>Empresa/institución</b> a administrar es requerida ya que se utiliza la información para la introducción de datos en la mayoría de las pantallas, en inserciones, o para modificar el comportamiento de Dolibarr (como, por ejemplo, de las funciones que dependen de su país).
admin_SetupDescription4                                                         : La configuración <b>Módulos</b> es indispensable ya que Dolibarr no es un ERP/CRM monolítico, es un conjunto de módulos más o menos independiente. Después de activar los módulos que le interesen comprobará sus funcionalidades en los menús de Dolibarr.
admin_SetupDescription5                                                         : Las otras entradas de configuración gestionan parámetros opcionales.
admin_EventsSetup                                                               : Configuración del registro de eventos
admin_LogEvents                                                                 : Auditoría de la seguridad de eventos
admin_Audit                                                                     : Auditoría
admin_InfoSpeedealing                                                           : Speedealing info
admin_InfoOS                                                                    : Info SO
admin_InfoWebServer                                                             : Info servidor
admin_InfoDatabase                                                              : Info base de datos
admin_InfoPHP                                                                   : Info PHP
admin_ListEvents                                                                : Auditoría de eventos
admin_ListOfSecurityEvents                                                      : Listado de eventos de seguridad Dolibarr
admin_SecurityEventsPurged                                                      : Eventos de seguridad purgados
admin_LogEventDesc                                                              : Puede habilitar el registro de eventos de seguridad Dolibarr aquí. Los administradores pueden ver su contenido a través de menú <b>Herramientas del sistema - Auditoría</b>.Atención, esta característica puede consumir una gran cantidad de datos en la base de datos.
admin_AreaForAdminOnly                                                          : Estas funciones solo son accesibles a un usuario administrador.
admin_SystemInfoDesc                                                            : La información del sistema es información técnica accesible solamente en solo lectura a los administradores.
admin_SystemAreaForAdminOnly                                                    : Esta área solo es accesible a los usuarios de tipo administradores. Ningún permiso Dolibarr permite extender el círculo de usuarios autorizados a esta área.
admin_CompanyFundationDesc                                                      : Editar en esta página toda la información conocida sobre la empresa o asociación a administrar (para ello haga clic en el botón "Modificar" a pie de página)
admin_DisplayDesc                                                               : Puede encontrar aquí todos los parámetros relacionados con la apariencia de Dolibarr
admin_AvailableModules                                                          : Módulos disponibles
admin_ToActivateModule                                                          : Para activar los módulos, vaya al área de Configuración (Inicio->Configuración->Módulos).
admin_SessionTimeOut                                                            : Timeout de sesiones
admin_SessionExplanation                                                        : Asegura que el período de sesiones no expirará antes de este momento. Sin embargo, la gestión del período de sesiones de PHP no garantiza que el período de sesiones expira después de este período: Este será el caso si un sistema de limpieza del caché de sesiones es activo. <br> Nota: Sin mecanismo especial, el mecanismo interno para limpiar el período de sesiones de PHP todos los accesos <b>%s/%s</b>, pero sólo en torno al acceso de otros períodos de sesiones.
admin_TriggersAvailable                                                         : Triggers disponibles
admin_TriggersDesc                                                              : Los triggers son archivos que, une vez depositados en el directorio <b>htdocs/core/triggers</b>, modifican el comportamiento del workflow de Dolibarr. Realizan acciones suplementarias, desencadenadas por los eventos Dolibarr (creación de empresa, validación factura, cierre contrato, etc).
admin_TriggerDisabledByName                                                     : Triggers de este archivo desactivados por el sufijo <b>-NORUN</b> en el nombre del archivo.
admin_TriggerDisabledAsModuleDisabled                                           : Triggers de este archivo desactivados ya que el módulo <b>%s</b> no está activado.
admin_TriggerAlwaysActive                                                       : Triggers de este archivo siempre activos, ya que los módulos Dolibarr relacionados están activados
admin_TriggerActiveAsModuleActive                                               : Triggers de este archivo activos ya que el módulo <b>%s</b> está activado
admin_GeneratedPasswordDesc                                                     : Indique aquí que norma quiere utilizar para generar las contraseñas cuando quiera generar una nueva contraseña
admin_DictionnaryDesc                                                           : Indique aquí los datos de referencia. Puede completar/modificar los datos predefinidos con los suyos.
admin_ConstDesc                                                                 : Cualquier otro parámetro no editable en las páginas anteriores
admin_OnceSetupFinishedCreateUsers                                              : Atención, está bajo una cuenta de administrador de Dolibarr. Los administradores se utilizan para configurar a Dolibarr. Para un uso corriente de Dolibarr, se recomienda utilizar una cuenta no administrador creada desde el menú "Usuarios y grupos"
admin_MiscellanousDesc                                                          : Defina aquí los otros parámetros relacionados con la seguridad.
admin_LimitsSetup                                                               : Configuración de límites y precisiones
admin_LimitsDesc                                                                : Puede definir aquí los límites y precisiones utilizados por Dolibarr
admin_MAIN_MAX_DECIMALS_UNIT                                                    : Decimales máximos para los precios unitarios
admin_MAIN_MAX_DECIMALS_TOT                                                     : Decimales máximos para los precios totales
admin_MAIN_MAX_DECIMALS_SHOWN                                                   : Decimales máximos para los importes mostrados en pantalla (Poner <b>...</b> después del máximo si quiere ver <b>...</b> cuando el número se trunque al mostrarlo en pantalla)
admin_MAIN_DISABLE_PDF_COMPRESSION                                              : Utilizar la compresión PDF para los archivos PDF generados
admin_MAIN_ROUNDING_RULE_TOT                                                    : Tamaño rango para el redondeo (para algunos países que redondean sobre otra base que no sea base 10)
admin_UnitPriceOfProduct                                                        : Precio unitario sin IVA de un producto
admin_TotalPriceAfterRounding                                                   : Precio total después del redondeo
admin_ParameterActiveForNextInputOnly                                           : Parámetro efectivo solamente a partir de las próximas sesiones
admin_NoEventOrNoAuditSetup                                                     : No se han registrado eventos de seguridad. Esto puede ser normal si la auditoría no ha sido habilitado en la página "configuración->seguridad->auditoría".
admin_NoEventFoundWithCriteria                                                  : No se han encontrado eventos de seguridad para tales criterios de búsqueda.
admin_SeeLocalSendMailSetup                                                     : Ver la configuración local de sendmail
admin_BackupDesc                                                                : Para realizar una copia de seguridad completa de Dolibarr, usted debe:
admin_BackupDesc2                                                               : * Guardar el contenido del directorio de documentos (<b>%s</b>) que contiene todos los archivos subidos o generados (comprimiendo el directorio, por ejemplo).
admin_BackupDesc3                                                               : * Guardar el contenido de su base de datos en un archivo de volcado. Para ello puede utilizar el asistente a continuación.
admin_BackupDescX                                                               : El directorio archivado deberá guardarse  en un lugar seguro.
admin_BackupDescY                                                               : El archivo de volcado generado deberá guardarse en un lugar seguro.
admin_BackupPHPWarning                                                          : La copia de seguridad no puede ser garantizada con este método. Es preferible utilizar el anterior
admin_RestoreDesc                                                               : Para restaurar una copia de seguridad de Dolibarr, usted debe:
admin_RestoreDesc2                                                              : * Tomar el archivo (archivo zip, por ejemplo) del directorio de los documentos y descomprimirlo en el directorio de los documentos de una nueva instalación de Dolibarr directorio o en la carpeta de los documentos de esta instalación (<b>%s</b>).
admin_RestoreDesc3                                                              : * Recargar el archivo de volcado guardado en la base de datos de una nueva instalación de Dolibarr o de esta instalación. Atención, una vez realizada la restauración, deberá utilizar un login/contraseña de administrador existente en el momento de la copia de seguridad para conectarse. Para restaurar la base de datos en la instalación actual, puede utilizar el asistente a continuación.
admin_RestoreMySQL                                                              : Importación MySQL
admin_ForcedToByAModule                                                         : Esta regla está forzada a <b>%s</b> por uno de los módulos activados
admin_PreviousDumpFiles                                                         : Archivos de copia de seguridad de la base de datos disponibles
admin_WeekStartOnDay                                                            : Primer día de la semana
admin_RunningUpdateProcessMayBeRequired                                         : Parece necesario realizar el proceso de actualización (la versión del programa %s difiere de la versión de la base de datos %s)
admin_YouMustRunCommandFromCommandLineAfterLoginToUser                          : Debe ejecutar el comando desde un shell después de haber iniciado sesión con la cuenta <b>%s</b>.
admin_YourPHPDoesNotHaveSSLSupport                                              : Funciones SSL no disponibles en su PHP
admin_DownloadMoreSkins                                                         : Más temas para descargar
admin_SimpleNumRefModelDesc                                                     : Devuelve el número bajo el formato %syymm-nnnn donde yy es el año, mm el mes y nnnn un contador secuencial sin ruptura y sin volver a 0
admin_ShowProfIdInAddress                                                       : Mostrar el identificador profesional en las direcciones de los documentos
admin_TranslationUncomplete                                                     : Traducción parcial
admin_SomeTranslationAreUncomplete                                              : Algunos idiomas están traducidos en parte o pueden contener errores. Si lo encuentra, puede corregir los archivos de texto <b>.lang</b> del directorio <b>htdocs/langs</b> y enviarlos al foro <a href="http://www.dolibarr.fr/forum" target="_blank">http://www.dolibarr.fr</a>.
admin_MenuUseLayout                                                             : Hacer el menú izquierdo ocultable (la opción javascript no debería deshabilitarse)
admin_MAIN_DISABLE_METEO                                                        : Deshabilitar la vista meteorológica
admin_TestLoginToAPI                                                            : Comprobar conexión a la API
admin_ProxyDesc                                                                 : Algunas de las características de Dolibarr requieren que el servidor tenga acceso a Internet. Defina aqui los parámetros para dicho acceso. Si el servidor está detrás de un proxy, estos parámetros indican a Dolibarr cómo pasarlo.
admin_ExternalAccess                                                            : Acceso externo
admin_MAIN_PROXY_USE                                                            : Usar un servidor proxy (si no acceso directo a Internet)
admin_MAIN_PROXY_HOST                                                           : Nombre/Dirección del servidor proxy
admin_MAIN_PROXY_PORT                                                           : Puerto del servidor proxy
admin_MAIN_PROXY_USER                                                           : Login del servidor proxy
admin_MAIN_PROXY_PASS                                                           : Contraseña del servidor proxy
admin_DefineHereComplementaryAttributes                                         : Defina aquí la lista de atributos adicionales, no disponibles por defecto, y que desea gestionar para %s.
admin_ExtraFields                                                               : Atributos adicionales
admin_ExtraFieldsThirdParties                                                   : Atributos adicionales (terceros)
admin_ExtraFieldsContacts                                                       : Atributos adicionales (contactos/direcciones)
admin_ExtraFieldHasWrongValue                                                   : El atributo %s tiene un valor incorrecto.
admin_AlphaNumOnlyCharsAndNoSpace                                               : solamente caracteres alfanuméricos sin espacios
admin_SendingMailSetup                                                          : Configuración del envío por mail
admin_SendmailOptionNotComplete                                                 : Atención, en algunos sistemas Linux, con este método de envio, para poder enviar mails en su nombre, la configuración de sendmail debe contener la opción <b>-ba</b> (parámetro <b>mail.force_extra_parameters</b> en el archivo <b>php.ini</b>). Si algunos de sus destinatarios no reciben sus mensajes, pruebe a modificar este parámetro PHP con <b>mail.force_extra_parameters=-ba</b>.
admin_PathToDocuments                                                           : Rutas de acceso a documentos
admin_PathDirectory                                                             : Directorio
admin_SendmailOptionMayHurtBuggedMTA                                            : La funcionalidad de enviar correo electrónico a través del "correo directo PHP" genera una solicitud que puede ser mal interpretado por algunos servidores de correo. Esto se traduce en mensajes de correo electrónico ilegibles para las personas alojadas en  estas plataformas. Este es el caso de clientes en ciertos proveedores de servicios de Internet (Ej: Orange). Esto no es un problema ni de Dolibarr ni de PHP, pero sí del servidor de correo. Sin embargo, puede agregar la opción MAIN_FIX_FOR_BUGGED_MTA con valor 1 en configuración-varios para tratar que Dolibarr evite el error. Otra solución (recomendada) es utilizar el método de envío por SMTP que no tiene este inconveniente.
admin_TranslationSetup                                                          : Configuración traducción
admin_TranslationDesc                                                           : La elección del idioma mostrado en pantalla se modifica:<br>* A nivel global desde el menú <strong>Inicio - Configuración - Entorno</strong><br>* De manera específica al usuario desde la pestaña <strong>Interfaz usuario</strong> de su ficha de usuario (hacer clic en su login en la parte superior izquierda de la pantalla).
admin_ClassNotFoundIntoPathWarning                                              : Class %s not found into PHP path
admin_PasswordGenerationStandard                                                : Devuelve una contraseña generada por el algoritmo interno Dolibarr: 8 caracteres, números y caracteres en minúsculas mezcladas.
admin_PasswordGenerationNone                                                    : No ofrece contraseñas. La contraseña se introduce manualmente.
admin_UserGroupSetup                                                            : Configuración módulo usuarios y grupos
admin_GeneratePassword                                                          : Proponer una contraseña generada
admin_RuleForGeneratedPasswords                                                 : Norma para la generación de las contraseñas propuestas
admin_DoNotSuggest                                                              : No proponer
admin_EncryptedPasswordInDatabase                                               : Permitir encriptación de las contraseñas en la base de datos
admin_DisableForgetPasswordLinkOnLogonPage                                      : No mostrar el vínculo "Contraseña olvidada" en la página de login
admin_UsersSetup                                                                : Configuración del módulo usuarios
admin_UserMailRequired                                                          : E-Mail necesario para crear un usuario nuevo
admin_CompanySetup                                                              : Configuración del módulo terceros
admin_CompanyCodeChecker                                                        : Módulo de generación y control de los códigos de terceros (clientes/proveedores)
admin_AccountCodeManager                                                        : Módulo de generación de los códigos contables (clientes/proveedores)
admin_ModuleCompanyCodeAquarium                                                 : Devuelve un código contable compuesto de<br>%s seguido del código tercero de proveedor para el código contable de proveedor,<br>%s seguido del código tercero de cliente para el código contable de cliente.
admin_ModuleCompanyCodePanicum                                                  : Devuelve un código contable vacío.
admin_ModuleCompanyCodeDigitaria                                                : Devuelve un código contable compuesto siguiendo el código de tercero. El código está formado por carácter ' C ' en primera posición seguido de los 5 primeros caracteres del código tercero.
admin_UseNotifications                                                          : Usar notificaciones
admin_NotificationsDesc                                                         : La función de las notificaciones permite enviar automáticamente un correo electrónico para un determinado evento Dolibarr en las empresas configuradas para ello
admin_ModelModules                                                              : Modelos de documentos
admin_DocumentModelOdt                                                          : Generación desde los documentos OpenDocument (Archivo .ODT OpenOffice, KOffice, TextEdit,...)
admin_WatermarkOnDraft                                                          : Marca de agua en los documentos borrador
admin_CompanyIdProfChecker                                                      : Id Profesional único
admin_MustBeUnique                                                              : ¿Debe ser único?
admin_Miscellanous                                                              : Miscelánea
admin_WebCalSetup                                                               : Configuración de enlace con el calendario Webcalendar
admin_WebCalSyncro                                                              : Integrar los eventos Dolibarr en WebCalendar
admin_WebCalAllways                                                             : Siempre, sin consultar
admin_WebCalYesByDefault                                                        : Consultar (Si por defecto)
admin_WebCalNoByDefault                                                         : Consultar (No por defecto)
admin_WebCalNever                                                               : Nunca
admin_WebCalURL                                                                 : Dirección (URL) de acceso al calendario
admin_WebCalServer                                                              : Servidor de la base de datos del calendario
admin_WebCalDatabaseName                                                        : Nombre de la base de datos
admin_WebCalUser                                                                : Usuario con acceso a la base
admin_WebCalSetupSaved                                                          : Los datos de enlace se han guardado correctamente.
admin_WebCalTestOk                                                              : La conexión al servidor '%s' en la base '%s' por el usuario '%s' ha sido satisfactoria.
admin_WebCalTestKo1                                                             : La conexión al servidor '%s' ha sido satisfactoria, pero la base '%s' no se ha podido comprobar.
admin_WebCalTestKo2                                                             : La conexión al servidor '%s' por el usuario '%s' ha fallado.
admin_WebCalErrorConnectOkButWrongDatabase                                      : La conexión salió bien pero la base no parece ser una base Webcalendar.
admin_WebCalAddEventOnCreateActions                                             : Añadir evento en el calendario en las creaciones de acciones
admin_WebCalAddEventOnCreateCompany                                             : Añadir evento en el calendario en la creación de empresas
admin_WebCalAddEventOnStatusPropal                                              : Añadir evento en el calendario en el cambio de estado de los presupuestos
admin_WebCalAddEventOnStatusContract                                            : Añadir evento en el calendario en el cambio de estado de los contratos
admin_WebCalAddEventOnStatusBill                                                : Añadir evento en el calendario en el cambio de estado de las facturas
admin_WebCalAddEventOnStatusMember                                              : Añadir evento en el calendario en el cambio de estado de los miembros
admin_WebCalUrlForVCalExport                                                    : Un vínculo de exportación del calendario en formato <b>%s</b> estará disponible en la url: %s
admin_WebCalCheckWebcalSetup                                                    : La configuración del módulo Webcal puede ser incorrecta
admin_BillsSetup                                                                : Configuración del módulo Facturas
admin_BillsDate                                                                 : Fecha de las facturas
admin_BillsNumberingModule                                                      : Módulo de numeración de facturas y abonos
admin_BillsPDFModules                                                           : Modelo de documento de facturas
admin_CreditNoteSetup                                                           : Configuración del módulo abonos
admin_CreditNotePDFModules                                                      : Modelo de documento de abonos
admin_CreditNote                                                                : Abono
admin_CreditNotes                                                               : Abonos
admin_ForceInvoiceDate                                                          : Forzar la fecha de factura a la fecha de validación
admin_DisableRepeatable                                                         : Desactivar las facturas recurrentes
admin_SuggestedPaymentModesIfNotDefinedInInvoice                                : Formas de pago sugeridas para las facturas si no están definidas explícitamente
admin_EnableEditDeleteValidInvoice                                              : Activar la posibilidad de editar/eliminar una factura validada sin pago
admin_SuggestPaymentByRIBOnAccount                                              : Sugerir el pago por abono en cuenta
admin_SuggestPaymentByChequeToAddress                                           : Sugerir el pago por cheque a
admin_FreeLegalTextOnInvoices                                                   : Texto libre en facturas
admin_WatermarkOnDraftInvoices                                                  : Marca de agua en las facturas borrador (en caso de estar vacío)
admin_PropalSetup                                                               : Configuración del módulo Presupuestos
admin_CreateForm                                                                : Creación formulario
admin_NumberOfProductLines                                                      : Numero de líneas de productos
admin_ProposalsNumberingModules                                                 : Módulos de numeración de presupuestos
admin_ProposalsPDFModules                                                       : Modelos de documentos de presupuestos
admin_ClassifiedInvoiced                                                        : Clasificar facturado
admin_HideTreadedPropal                                                         : Ocultar los presupuestos procesados del listado
admin_AddShippingDateAbility                                                    : Posibilidad de determinar una fecha de entrega
admin_AddDeliveryAddressAbility                                                 : Posibilidad de seleccionar una dirección de envío
admin_UseOptionLineIfNoQuantity                                                 : Una línea de producto/servicio que tiene una cantidad nula se considera como una opción
admin_FreeLegalTextOnProposal                                                   : Texto libre en presupuestos
admin_WatermarkOnDraftProposal                                                  : Marca de agua en presupuestos borrador (en caso de estar vacío)
admin_OrdersSetup                                                               : Configuración del módulo pedidos
admin_OrdersNumberingModules                                                    : Módulos de numeración de los pedidos
admin_OrdersModelModule                                                         : Modelos de documentos de pedidos
admin_HideTreadedOrders                                                         : Ocultar los pedidos procesados o anulados del listado
admin_ValidOrderAfterPropalClosed                                               : Validar el pedido después del cierre del presupuesto, permite no pasar por el pedido provisional
admin_FreeLegalTextOnOrders                                                     : Texto libre en pedidos
admin_WatermarkOnDraftOrders                                                    : Marca de agua en pedidos borrador (en caso de estar vacío)
admin_ClickToDialSetup                                                          : Configuración del módulo Click To Dial
admin_ClickToDialUrlDesc                                                        : URL de llamada haciendo click en el icono teléfono. <br>La URL completa de llamada será: URL?login=...&password=...&caller=...&called=telellamada
admin_Bookmark4uSetup                                                           : Configuración del módulo Bookmark4u
admin_InterventionsSetup                                                        : Configuración del módulo intervenciones
admin_FreeLegalTextOnInterventions                                              : Texto adicional en las fichas de intervención
admin_FicheinterNumberingModules                                                : Módulos de numeración de las fichas de intervención
admin_TemplatePDFInterventions                                                  : Modelo de documentos de las fichas de intervención
admin_WatermarkOnDraftInterventionCards                                         : Marca de agua en fichas de intervención (en caso de estar vacío)
admin_ContractsSetup                                                            : Configuración del módulo contratos
admin_ContractsNumberingModules                                                 : Módulos de numeración de los contratos
admin_MembersSetup                                                              : Configuración del módulo Asociaciones
admin_MemberMainOptions                                                         : Opciones principales
admin_AddSubscriptionIntoAccount                                                : Proponer por defecto la creación de un movimiento, en el módulo bancos, en el registro de un pago de cotización
admin_AdherentLoginRequired                                                     : Gestionar un login para cada miembro
admin_AdherentMailRequired                                                      : E-Mail obligatorio para crear un miembro nuevo
admin_MemberSendInformationByMailByDefault                                      : Casilla de verificación para enviar el correo de confirmación (validación ó nueva cotización) a los miembros es por defecto "sí"
admin_LDAPSetup                                                                 : Configuración del módulo LDAP
admin_LDAPGlobalParameters                                                      : Parámetros globales
admin_LDAPUsersSynchro                                                          : Usuarios
admin_LDAPGroupsSynchro                                                         : Grupos
admin_LDAPContactsSynchro                                                       : Contactos
admin_LDAPMembersSynchro                                                        : Miembros
admin_LDAPSynchronization                                                       : Sincronización LDAP
admin_LDAPFunctionsNotAvailableOnPHP                                            : Las funciones LDAP no están disponibles en su PHP
admin_LDAPToSpeedealing                                                         : LDAP -> Speedealing
admin_SpeedealingToLDAP                                                         : Speedealing -> LDAP
admin_LDAPNamingAttribute                                                       : Clave en LDAP
admin_LDAPSynchronizeUsers                                                      : Organización de los usuarios en LDAP
admin_LDAPSynchronizeGroups                                                     : Organización de los grupos en LDAP
admin_LDAPSynchronizeContacts                                                   : Organización de los contactos en LDAP
admin_LDAPSynchronizeMembers                                                    : Organización de los miembros en LDAP
admin_LDAPTypeExample                                                           : OpenLdap, Egroupware o Active Directory
admin_LDAPPrimaryServer                                                         : Servidor primario
admin_LDAPSecondaryServer                                                       : Servidor secundario
admin_LDAPServerPort                                                            : Puerto del servidor
admin_LDAPServerPortExample                                                     : Puerto por defecto : 389
admin_LDAPServerProtocolVersion                                                 : Versión de protocolo
admin_LDAPServerUseTLS                                                          : Usuario TLS
admin_LDAPServerUseTLSExample                                                   : Su servidor utiliza TLS
admin_LDAPServerDn                                                              : DN del servidor
admin_LDAPAdminDn                                                               : DN del administrador
admin_LDAPAdminDnExample                                                        : DN completo (ej: cn=adminldap,dc=my-domain,dc=com)
admin_LDAPPassword                                                              : Contraseña del administrador
admin_LDAPUserDn                                                                : DN de los usuarios
admin_LDAPUserDnExample                                                         : DN completo (ej: ou=users,dc=my-domain,dc=com)
admin_LDAPGroupDn                                                               : DN de los grupos
admin_LDAPGroupDnExample                                                        : DN completo (ej: ou=groups,dc=my-domain,dc=com)
admin_LDAPServerExample                                                         : Dirección del servidor (ej: localhost, 192.168.0.2, ldaps://ldap.example.com/)
admin_LDAPServerDnExample                                                       : DN completo (ej: dc=my-domain,dc=com)
admin_LDAPPasswordExample                                                       : Contraseña del administrador
admin_LDAPDnSynchroActive                                                       : Sincronización de usuarios y grupos
admin_LDAPDnSynchroActiveExample                                                : Sincronización LDAP hacia Dolibarr o Dolibarr hacia LDAP
admin_LDAPDnContactActive                                                       : Sincronización de contactos
admin_LDAPDnContactActiveYes                                                    : Sincronización activada
admin_LDAPDnContactActiveExample                                                : Sincronización activada/desactivada
admin_LDAPDnMemberActive                                                        : Sincronización de los miembros
admin_LDAPDnMemberActiveExample                                                 : Sincronización activada/desactivada
admin_LDAPContactDn                                                             : DN de los contactos Dolibarr
admin_LDAPContactDnExample                                                      : DN completo (ej: ou=contacts,dc=my-domain,dc=com)
admin_LDAPMemberDn                                                              : DN de los miembros
admin_LDAPMemberDnExample                                                       : DN completo (ex: ou=members,dc=society,dc=com)
admin_LDAPMemberObjectClassList                                                 : Lista de objectClass
admin_LDAPMemberObjectClassListExample                                          : Lista de ObjectClass que definen los atributos de un registro (ej: top,inetOrgPerson o top,user for active directory)
admin_LDAPUserObjectClassList                                                   : Lista de objectClass
admin_LDAPUserObjectClassListExample                                            : Lista de ObjectClass que definen los atributos de un registro (ej: top,inetOrgPerson o top,user for active directory)
admin_LDAPGroupObjectClassList                                                  : Lista de objectClass
admin_LDAPGroupObjectClassListExample                                           : Lista de ObjectClass que definen los atributos de un registro (ej: top,groupOfUniqueNames)
admin_LDAPContactObjectClassList                                                : Lista de objectClass
admin_LDAPContactObjectClassListExample                                         : Lista de objectClass que definen los atributos de un registro (ej: top,inetOrgPerson o top,user for active directory)
admin_LDAPMemberTypeDn                                                          : DN de los tipos de miembros
admin_LDAPMemberTypeDnExample                                                   : DN complet (ej: ou=type_members,dc=society,dc=com)
admin_LDAPTestConnect                                                           : Probar la conexión LDAP
admin_LDAPTestSynchroContact                                                    : Probar la sincronización de contactos
admin_LDAPTestSynchroUser                                                       : Probar la sincronización de usuarios
admin_LDAPTestSynchroGroup                                                      : Probar la sincronización de grupos
admin_LDAPTestSynchroMember                                                     : Probar la sincronización de miembros
admin_LDAPSynchroOK                                                             : Prueba de sincronización realizada correctamente
admin_LDAPSynchroKO                                                             : Prueba de sincronización erronea
admin_LDAPSynchroKOMayBePermissions                                             : Error de la prueba de sincronización. Compruebe que la conexión al servidor sea correcta y que permite las actualizaciones LDAP
admin_LDAPTCPConnectOK                                                          : Conexión TCP al servidor LDAP efectuada (Servidor=%s, Puerto=%s)
admin_LDAPTCPConnectKO                                                          : Fallo de conexión TCP al servidor LDAP (Servidor=%s, Puerto=%s)
admin_LDAPBindOK                                                                : Conexión/Autenticación al servidor LDAP conseguida (Servidor=%s, Puerto=%s, Admin=%s, Password=%s)
admin_LDAPBindKO                                                                : Fallo de conexión/autentificación al servidor LDAP (Servidor=%s, Puerto=%s, Admin=%s, Password=%s)
admin_LDAPUnbindSuccessfull                                                     : Desconexión realizada
admin_LDAPUnbindFailed                                                          : Desconexión fallada
admin_LDAPConnectToDNSuccessfull                                                : Conexión a DN (%s) realizada
admin_LDAPConnectToDNFailed                                                     : Connexión a DN (%s) fallada
admin_LDAPSetupForVersion3                                                      : Servidor LDAP configurado en versión 3
admin_LDAPSetupForVersion2                                                      : Servidor LDAP configurado en versión 2
admin_LDAPSpeedealingMapping                                                    : Speedealing Mapping
admin_LDAPLdapMapping                                                           : Mapping LDAP
admin_LDAPFieldLoginUnix                                                        : Login (unix)
admin_LDAPFieldLoginExample                                                     : Ejemplo : uid
admin_LDAPFilterConnection                                                      : Filtro de búsqueda
admin_LDAPFilterConnectionExample                                               : Ejemplo : &(objectClass=inetOrgPerson)
admin_LDAPFieldLoginSamba                                                       : Login (samba, activedirectory)
admin_LDAPFieldLoginSambaExample                                                : Ejemplo : samaccountname
admin_LDAPFieldFullname                                                         : Nombre completo
admin_LDAPFieldFullnameExample                                                  : Ejemplo : cn
admin_LDAPFieldPassword                                                         : Contraseña
admin_LDAPFieldPasswordNotCrypted                                               : Contraseña no encriptada
admin_LDAPFieldPasswordCrypted                                                  : Contraseña encriptada
admin_LDAPFieldPasswordExample                                                  : Ejemplo : userPassword
admin_LDAPFieldCommonName                                                       : Nombre comun
admin_LDAPFieldCommonNameExample                                                : Ejemplo : cn
admin_LDAPFieldName                                                             : Nombre
admin_LDAPFieldNameExample                                                      : Ejemplo : sn
admin_LDAPFieldFirstName                                                        : Nombre
admin_LDAPFieldFirstNameExample                                                 : Ejemplo : givenname
admin_LDAPFieldMail                                                             : E-Mail
admin_LDAPFieldMailExample                                                      : Ejemplo : mail
admin_LDAPFieldPhone                                                            : Teléfono trabajo
admin_LDAPFieldPhoneExample                                                     : Ejemplo : telephonenumber
admin_LDAPFieldHomePhone                                                        : Teléfono personal
admin_LDAPFieldHomePhoneExample                                                 : Ejemplo : homephone
admin_LDAPFieldMobile                                                           : Teléfono móvil
admin_LDAPFieldMobileExample                                                    : Ejemplo : mobile
admin_LDAPFieldFax                                                              : Fax
admin_LDAPFieldFaxExample                                                       : Ejemplo : facsimiletelephonenumber
admin_LDAPFieldAddress                                                          : Dirección
admin_LDAPFieldAddressExample                                                   : Ejemplo : street
admin_LDAPFieldZip                                                              : Código postal
admin_LDAPFieldZipExample                                                       : Ejemplo : postalcode
admin_LDAPFieldTown                                                             : Población
admin_LDAPFieldTownExample                                                      : Ejemplo : l
admin_LDAPFieldCountry                                                          : País
admin_LDAPFieldCountryExample                                                   : Ejemplo : c
admin_LDAPFieldDescription                                                      : Descripción
admin_LDAPFieldDescriptionExample                                               : Ejemplo : description
admin_LDAPFieldGroupMembers                                                     : Miembros del grupo
admin_LDAPFieldGroupMembersExample                                              : Ejemplo: uniqueMember
admin_LDAPFieldBirthdate                                                        : Fecha de nacimiento
admin_LDAPFieldBirthdateExample                                                 : Ejemplo :
admin_LDAPFieldCompany                                                          : Empresa
admin_LDAPFieldCompanyExample                                                   : Ejemplo : o
admin_LDAPFieldSid                                                              : SID
admin_LDAPFieldSidExample                                                       : Ejemplo : objectsid
admin_LDAPFieldEndLastSubscription                                              : Fecha finalización como miembro
admin_LDAPParametersAreStillHardCoded                                           : Los parámetros LDAP son codificados en duro (en la clase contact)
admin_LDAPSetupNotComplete                                                      : Configuración LDAP incompleta (a completar en las otras pestañas)
admin_LDAPNoUserOrPasswordProvidedAccessIsReadOnly                              : Administrador o contraseña no inindicados. Los accesos LDAP serán anónimos y en solo lectura.
admin_LDAPDescContact                                                           : Esta página permite definir el nombre de los atributos del árbol LDAP para cada información de los contactos Dolibarr.
admin_LDAPDescUsers                                                             : Esta página permite definir el nombre de los atributos del árbol LDAP para cada información de los usuarios Dolibarr.
admin_LDAPDescGroups                                                            : Esta página permite definir el nombre de los atributos del árbol LDAP para cada información de los grupos usuarios Dolibarr.
admin_LDAPDescMembers                                                           : Esta página permite definir el nombre de los atributos del árbol LDAP para cada información de los miembros del módulo Asociaciones Dolibarr.
admin_LDAPDescValues                                                            : Los valores de ejemplos se adaptan a <b>OpenLDAP</b> con los schemas cargados: <b>core.schema, cosine.schema, inetorgperson.schema</b>). Si usted utiliza los a valores sugeridos y OpenLDAP, modifique su archivo de configuración LDAP <b>slapd.conf</b> para tener todos estos schemas activos.
admin_ForANonAnonymousAccess                                                    : Para un acceso autentificado
admin_ProductSetup                                                              : Configuración del módulo Productos
admin_ServiceSetup                                                              : Configuración del módulo Servicios
admin_ProductServiceSetup                                                       : Configuración de los módulos Productos y Servicios
admin_NumberOfProductShowInSelect                                               : Nº de productos máx. en las listas (0=sin límite)
admin_ConfirmDeleteProductLineAbility                                           : Confirmación de eliminación de una línea de producido en los formularios
admin_ModifyProductDescAbility                                                  : Personalización de las descripciones de los productos en los formularios
admin_ViewProductDescInFormAbility                                              : Visualización de las descripciones de los productos en los formularios
admin_ViewProductDescInThirdpartyLanguageAbility                                : Visualización de las descripciones de productos en el idioma del tercero
admin_UseSearchToSelectProduct                                                  : Utilizar un formulario de búsqueda para la selección de un producto (en vez de la lista desplegable). Tenga en cuenta que si tiene un número importante de productos o servicios (> 100 000), puede mejorar el rendimiento definiendo la constante PRODUCT_DONOTSEARCH_ANYWHERE a 1 en Configuración->Varios. La búsqueda quedará limitada al inicio de la cadena.
admin_UseEcoTaxeAbility                                                         : Asumir ecotasa (DEEE)
admin_SetDefaultBarcodeTypeProducts                                             : Tipo de código de barras utilizado por defecto para los productos
admin_SetDefaultBarcodeTypeThirdParties                                         : Tipo de código de barras utilizado por defecto para los terceros
admin_ProductCodeChecker                                                        : Módulo para la generación y comprobación del código de un producto o servicio
admin_ProductOtherConf                                                          : Configuración de productos/servicios
admin_SyslogSetup                                                               : Configuración del módulo Syslog
admin_SyslogOutput                                                              : Salida del log
admin_SyslogSyslog                                                              : Syslog
admin_SyslogFacility                                                            : Facilidad
admin_SyslogLevel                                                               : Nivel
admin_SyslogSimpleFile                                                          : Archivo
admin_SyslogFilename                                                            : Nombre y ruta del archivo
admin_YouCanUseDOL_DATA_ROOT                                                    : Puede utilizar DOL_DATA_ROOT/dolibarr.log para un registro en el directorio "documentos" de Dolibarr. Sin embargo, puede establecer un directorio diferente para guardar este archivo.
admin_ErrorUnknownSyslogConstant                                                : La constante %s no es una constante syslog conocida
admin_OnlyWindowsLOG_USER                                                       : Windows sólo soporta LOG_USER
admin_DonationsSetup                                                            : Configuración del módulo donaciones
admin_DonationsReceiptModel                                                     : Modelo recepción de donaciones
admin_BarcodeSetup                                                              : Configuración de los códigos de barras
admin_PaperFormatModule                                                         : Módulos de formatos de impresión
admin_BarcodeEncodeModule                                                       : Módulos de codificación de los códigos de barras
admin_UseBarcodeInProductModule                                                 : Utilizar los códigos de barras en los productos
admin_CodeBarGenerator                                                          : Generador del código
admin_ChooseABarCode                                                            : Ningún generador seleccionado
admin_FormatNotSupportedByGenerator                                             : Formato no generado por este generador
admin_BarcodeDescEAN8                                                           : Códigos de barras tipo EAN8
admin_BarcodeDescEAN13                                                          : Códigos de barras tipo EAN13
admin_BarcodeDescUPC                                                            : Códigos de barras tipo UPC
admin_BarcodeDescISBN                                                           : Códigos de barras tipo ISBN
admin_BarcodeDescC39                                                            : Códigos de barras tipo C39
admin_BarcodeDescC128                                                           : Códigos de barras tipo C128
admin_WithdrawalsSetup                                                          : Configuración del módulo domiciliaciones
admin_ExternalRSSSetup                                                          : Configuración de las importaciones del flujo RSS
admin_NewRSS                                                                    : Sindicación de un nuevo flujo RSS
admin_RSSUrl                                                                    : URL del RSS
admin_RSSUrlExample                                                             : Un flujo RSS interesante
admin_MailingSetup                                                              : Configuración del módulo E-Mailing
admin_MailingEMailFrom                                                          : E-Mail emisor (From) de los correos enviados por E-Mailing
admin_MailingEMailError                                                         : E-Mail de respuesta (Errors-to) para las respuestas acerca de envíos por e-mailing con error.
admin_NotificationSetup                                                         : Configuración del módulo notificaciones
admin_NotificationEMailFrom                                                     : E-Mail emisor (From) de los correos enviados a través de notificaciones
admin_ListOfAvailableNotifications                                              : Listado de notificaciones disponibles (depende de los módulos activados)
admin_SendingsSetup                                                             : Configuración del módulo Expediciones
admin_SendingsReceiptModel                                                      : Modelo de notas de entrega
admin_SendingsNumberingModules                                                  : Módulos de numeración de notas de entrega
admin_SendingsAbility                                                           : Uso de notas de entrega para los envíos a clientes
admin_NoNeedForDeliveryReceipts                                                 : En la mayoría de los casos, las notas de entrega (lista de productos enviados) también actúan como notas de recepción y son firmadas por el cliente. La gestión de las notas de recepción es por lo tanto redundante y rara vez se activará.
admin_FreeLegalTextOnShippings                                                  : Mención complementaria en las notas de entrega
admin_DeliveryOrderNumberingModules                                             : Módulo de numeración de las notas de entraga
admin_DeliveryOrderModel                                                        : Modelo de notas de recepción
admin_DeliveriesOrderAbility                                                    : Uso de notas de recepción
admin_FreeLegalTextOnDeliveryReceipts                                           : Texto libre en las notas de recepción
admin_AdvancedEditor                                                            : Editor avanzado
admin_ActivateFCKeditor                                                         : Activar editor avanzado para :
admin_FCKeditorForCompany                                                       : Creación/edición WYSIWIG de la descripción y notas de los terceros
admin_FCKeditorForProduct                                                       : Creación/edición WYSIWIG de la descripción y notas de los productos/servicios
admin_FCKeditorForProductDetails                                                : Creación/edición WYSIWIG de las líneas de detalle de los productos (en pedidos, presupuestos, facturas, etc.)
admin_FCKeditorForMailing                                                       : Creación/edición WYSIWIG de los E-Mails
admin_StockSetup                                                                : Configuración del módulo Stocks
admin_UserWarehouse                                                             : Utilizar los stocks personales de usuarios
admin_MenuDeleted                                                               : Menú eliminado
admin_TreeMenu                                                                  : Estructura de los menús
admin_Menus                                                                     : Menús
admin_TreeMenuPersonalized                                                      : Menús personalizados
admin_NewMenu                                                                   : Nuevo menú
admin_MenuConf                                                                  : Configuración de los menús
admin_Menu                                                                      : Selección de los menús
admin_MenuHandler                                                               : Gestor de menús
admin_MenuModule                                                                : Módulo origen
admin_HideUnauthorizedMenu                                                      : Ocultar también los menús no autorizados a usuarios internos (si no sólo atenuados)
admin_DetailId                                                                  : Identificador del menú
admin_DetailMenuHandler                                                         : Nombre del gestor de menús
admin_DetailMenuModule                                                          : Nombre del módulo si la entrada del menú es resultante de un módulo
admin_DetailType                                                                : Tipo de menú (superior o izquierdo)
admin_DetailTitre                                                               : Etiqueta de menú
admin_DetailMainmenu                                                            : Grupo al cual pertenece (obsoleto)
admin_DetailUrl                                                                 : URL de la página hacia la cual el menú apunta
admin_DetailLeftmenu                                                            : Condición de visualización o no (obsoleto)
admin_DetailEnabled                                                             : Condición de mostrar o no
admin_DetailRight                                                               : Condición de visualización completa o restringida
admin_DetailLangs                                                               : Archivo .lang para la traducción del título
admin_DetailUser                                                                : Interno / Externo / Todos
admin_Target                                                                    : Objetivo
admin_DetailTarget                                                              : Comportamiento del enlace (_blank para abrir una nueva ventana)
admin_DetailLevel                                                               : Nivel (-1:menú superior, 0:principal, >0 menú y submenú)
admin_ModifMenu                                                                 : Modificación del menú
admin_DeleteMenu                                                                : Eliminar entrada de menú
admin_ConfirmDeleteMenu                                                         : Está seguro de querer eliminar la entrada de menú <b>%s</b> ?
admin_DeleteLine                                                                : Eliminación de línea
admin_ConfirmDeleteLine                                                         : ¿Está seguro de querer eliminar esta línea?
admin_TaxSetup                                                                  : Configuración del módulo Impuestos, cargas sociales y dividendos
admin_OptionVatMode                                                             : Opción de carga de IVA
admin_OptionVATDefault                                                          : Estandard
admin_OptionVATDebitOption                                                      : Opción servicios a débito
admin_OptionVatDefaultDesc                                                      : La carga del IVA es: <br>-en el envío de los bienes (en la práctica se usa la fecha de la factura)<br>-sobre el pago por los servicios
admin_OptionVatDebitOptionDesc                                                  : La carga del IVA es: <br>-en el envío de los bienes (en la práctica se usa la fecha de la factura)<br>-sobre la facturación de los servicios
admin_SummaryOfVatExigibilityUsedByDefault                                      : Momento de exigibilidad por defecto el IVA para la opción escogida:
admin_OnDelivery                                                                : En la entrega
admin_OnPayment                                                                 : En el pago
admin_OnInvoice                                                                 : En la factura
admin_SupposedToBePaymentDate                                                   : Fecha de pago usada
admin_SupposedToBeInvoiceDate                                                   : Fecha de factura usada
admin_Buy                                                                       : Compra
admin_Sell                                                                      : Venta
admin_InvoiceDateUsed                                                           : Fecha usada de factura
admin_YourCompanyDoesNotUseVAT                                                  : Su empresa está configurada como no sujeta al IVA (Inicio - Configuración - Empresa/Institución), por lo que no hay opción para la paremetrización del IVA.
admin_AccountancyCode                                                           : Código contable
admin_AccountancyCodeSell                                                       : Código contable ventas
admin_AccountancyCodeBuy                                                        : Código contable compras
admin_AgendaSetup                                                               : Módulo configuración de acciones y agenda
admin_PasswordTogetVCalExport                                                   : Clave de autorización vcal export link
admin_PastDelayVCalExport                                                       : No exportar los eventos de más de
admin_ClickToDialDesc                                                           : Este módulo permite agregar un icono después del número de teléfono de contactos Dolibarr. Un clic en este icono, Llama a un servidor con una URL que se indica a continuación. Esto puede ser usado para llamar al sistema call center de Dolibarr que puede llamar al número de teléfono en un sistema SIP, por ejemplo.
admin_CashDesk                                                                  : TPV
admin_CashDeskSetup                                                             : Configuración del módulo Terminal Punto de Venta
admin_CashDeskThirdPartyForSell                                                 : Tercero genérico a usar para la venta
admin_CashDeskBankAccountForSell                                                : Cuenta por defecto a utilizar para los cobros en efectivo (caja)
admin_CashDeskBankAccountForCheque                                              : Cuenta por defecto a utilizar para los cobros con cheques
admin_CashDeskBankAccountForCB                                                  : Cuenta por defecto a utilizar para los cobros con tarjeta de crédito
admin_CashDeskIdWareHouse                                                       : Almacén a utilizar para las ventas
admin_BookmarkSetup                                                             : Configuración del módulo Marcadores
admin_BookmarkDesc                                                              : Este módulo le permite gestionar los enlaces y accesos directos. También permite añadir cualquier página de Dolibarr o enlace web en el menú de acceso rápido de la izquierda.
admin_NbOfBoomarkToShow                                                         : Número máximo de marcadores que se mostrará en el menú
admin_WebServicesSetup                                                          : Configuración del módulo Web services
admin_WebServicesDesc                                                           : Mediante la activación de este módulo, Dolibarr se convierte en servidor de servicios web ofreciendo diversos servicios web.
admin_WSDLCanBeDownloadedHere                                                   : La descripción WSDL de los servicios prestados se pueden recuperar aquí
admin_EndPointIs                                                                : Los clientes SOAP deberán enviar sus solicitudes al punto final en la URL Dolibarr
admin_BankSetupModule                                                           : Configuración del módulo Banco
admin_FreeLegalTextOnChequeReceipts                                             : Mención complementaria en las remesas de cheques
admin_BankOrderShow                                                             : Orden de visualización de la información bancaria al usar la "cuenta bancaria detallada"
admin_BankOrderGlobal                                                           : General
admin_BankOrderGlobalDesc                                                       : Orden de visualización general
admin_BankOrderES                                                               : Español
admin_BankOrderESDesc                                                           : Orden de visualización español
admin_MultiCompanySetup                                                         : Configuración del módulo Multi-empresa
admin_SuppliersSetup                                                            : Configuración del módulo Proveedores
admin_SuppliersCommandModel                                                     : Modelo de pedidos a proveedores completo (logo...)
admin_SuppliersInvoiceModel                                                     : Modelo de facturas de proveedores completo (logo...)
admin_GeoIPMaxmindSetup                                                         : Configuración del módulo GeoIP Maxmind
admin_PathToGeoIPMaxmindCountryDataFile                                         : Ruta del archivo Maxmind que contiene las conversiones IP->País.<br>Ejemplo: /usr/local/share/GeoIP/GeoIP.dat
admin_NoteOnPathLocation                                                        : Tenga en cuenta que este archivo debe estar en un directorio accesible desde su PHP (Compruebe la configuración de open_basedir de su PHP y los permisos de archivo/directorios).
admin_YouCanDownloadFreeDatFileTo                                               : Puede descargarse una <b>versión demo gratuita</b> del archivo de países Maxmind GeoIP en la dirección %s.
admin_YouCanDownloadAdvancedDatFileTo                                           : También puede descargarse una <b>versión más completa</b> del archivo de países Maxmind GeoIP en la dirección %s.
admin_TestGeoIPResult                                                           : Test de conversión IP -> País
admin_ProjectsNumberingModules                                                  : Módulo de numeración para las referencias de los proyectos
admin_ProjectsSetup                                                             : Configuración del módulo Proyectos
admin_ProjectsModelModule                                                       : Modelo de documento para informes de proyectos
admin_Chartofaccounts                                                           : Plan comptable
admin_Definechartofaccounts                                                     : Définir un plan comptable
admin_Selectchartofaccounts                                                     : Sélection d'un plan comptable
admin_DoNotSuggestChart                                                         : Ne pas suggérer de plan comptable
dict_CountryFR                                                                  : Francia
dict_CountryBE                                                                  : Bélgica
dict_CountryIT                                                                  : Italia
dict_CountryES                                                                  : España
dict_CountryDE                                                                  : Alemania
dict_CountryCH                                                                  : Suiza
dict_CountryGB                                                                  : Reino Unido
dict_CountryIE                                                                  : Irlanda
dict_CountryCN                                                                  : China
dict_CountryTN                                                                  : Túnez
dict_CountryUS                                                                  : Estados Unidos
dict_CountryMA                                                                  : Marruecos
dict_CountryDZ                                                                  : Argelia
dict_CountryCA                                                                  : Canadá
dict_CountryTG                                                                  : Togo
dict_CountryGA                                                                  : Gabón
dict_CountryNL                                                                  : Países Bajos
dict_CountryHU                                                                  : Hungría
dict_CountryRU                                                                  : Rusia
dict_CountrySE                                                                  : Suecia
dict_CountryCI                                                                  : Costa de Marfil
dict_CountrySN                                                                  : Senegal
dict_CountryAR                                                                  : Argentina
dict_CountryCM                                                                  : Camerún
dict_CountryPT                                                                  : Portugal
dict_CountrySA                                                                  : Arabia Saudita
dict_CountryMC                                                                  : Mónaco
dict_CountryAU                                                                  : Australia
dict_CountrySG                                                                  : Singapur
dict_CountryAF                                                                  : Afganistán
dict_CountryAX                                                                  : Islas Aland
dict_CountryAL                                                                  : Albania
dict_CountryAS                                                                  : Samoa Americana
dict_CountryAD                                                                  : Andorra
dict_CountryAO                                                                  : Angola
dict_CountryAI                                                                  : Anguila
dict_CountryAQ                                                                  : Antártida
dict_CountryAG                                                                  : Antigua y Barbuda
dict_CountryAM                                                                  : Armenia
dict_CountryAW                                                                  : Aruba
dict_CountryAT                                                                  : Austria
dict_CountryAZ                                                                  : Azerbaiyán
dict_CountryBS                                                                  : Bahamas
dict_CountryBH                                                                  : Bahréin
dict_CountryBD                                                                  : Bangladés
dict_CountryBB                                                                  : Barbados
dict_CountryBY                                                                  : Bielorrusia
dict_CountryBZ                                                                  : Belice
dict_CountryBJ                                                                  : Benín
dict_CountryBM                                                                  : Bermudas
dict_CountryBT                                                                  : Bután
dict_CountryBO                                                                  : Bolivia
dict_CountryBA                                                                  : Bosnia Herzegovina
dict_CountryBW                                                                  : Botsuana
dict_CountryBV                                                                  : Isla Bouvet
dict_CountryBR                                                                  : Brasil
dict_CountryIO                                                                  : Territorio Británico del Océano Índico
dict_CountryBN                                                                  : Brunéi
dict_CountryBG                                                                  : Bulgaria
dict_CountryBF                                                                  : Burkina Faso
dict_CountryBI                                                                  : Burundi
dict_CountryKH                                                                  : Camboya
dict_CountryCV                                                                  : Cabo Verde
dict_CountryKY                                                                  : Islas Caimán
dict_CountryCF                                                                  : República Centroafricana
dict_CountryTD                                                                  : Chad
dict_CountryCL                                                                  : Chile
dict_CountryCX                                                                  : Isla Christmas
dict_CountryCC                                                                  : Islas Cocos (Keeling)
dict_CountryCO                                                                  : Colombia
dict_CountryKM                                                                  : Comoras
dict_CountryCG                                                                  : Congo
dict_CountryCD                                                                  : República Democrática del Congo
dict_CountryCK                                                                  : Islas Cook
dict_CountryCR                                                                  : Costa Rica
dict_CountryHR                                                                  : Croacia
dict_CountryCU                                                                  : Cuba
dict_CountryCY                                                                  : Chipre
dict_CountryCZ                                                                  : República Checa
dict_CountryDK                                                                  : Dinamarca
dict_CountryDJ                                                                  : Yibuti
dict_CountryDM                                                                  : Dominica
dict_CountryDO                                                                  : República Dominicana
dict_CountryEC                                                                  : Ecuador
dict_CountryEG                                                                  : Egipto
dict_CountrySV                                                                  : Salvador
dict_CountryGQ                                                                  : Guinea Ecuatorial
dict_CountryER                                                                  : Eritrea
dict_CountryEE                                                                  : Estonia
dict_CountryET                                                                  : Etiopía
dict_CountryFK                                                                  : Islas Malvinas
dict_CountryFO                                                                  : Islas Feroe
dict_CountryFJ                                                                  : Islas Fiji
dict_CountryFI                                                                  : Finlandia
dict_CountryGF                                                                  : Guayana francesa
dict_CountryPF                                                                  : Polinesia francesa
dict_CountryTF                                                                  : Territorios australes franceses
dict_CountryGM                                                                  : Gambia
dict_CountryGE                                                                  : Georgia
dict_CountryGH                                                                  : Ghana
dict_CountryGI                                                                  : Gibraltar
dict_CountryGR                                                                  : Grecia
dict_CountryGL                                                                  : Groenlandia
dict_CountryGD                                                                  : Granada
dict_CountryGP                                                                  : Guadalupe
dict_CountryGU                                                                  : Guam
dict_CountryGT                                                                  : Guatemala
dict_CountryGN                                                                  : Guinea
dict_CountryGW                                                                  : Guinea-Bissau
dict_CountryGY                                                                  : Guyana
dict_CountryHT                                                                  : Haití
dict_CountryHM                                                                  : Islas Heard y McDonald
dict_CountryVA                                                                  : Santa Sede (Vaticano)
dict_CountryHN                                                                  : Honduras
dict_CountryHK                                                                  : Hong Kong
dict_CountryIS                                                                  : Islandia
dict_CountryIN                                                                  : India
dict_CountryID                                                                  : Indonesia
dict_CountryIR                                                                  : Irán
dict_CountryIQ                                                                  : Iraq
dict_CountryIL                                                                  : Israel
dict_CountryJM                                                                  : Jamaica
dict_CountryJP                                                                  : Japón
dict_CountryJO                                                                  : Jordania
dict_CountryKZ                                                                  : Kazajstán
dict_CountryKE                                                                  : Kenia
dict_CountryKI                                                                  : Kiribati
dict_CountryKP                                                                  : Corea del Norte
dict_CountryKR                                                                  : Corea del Sur
dict_CountryKW                                                                  : Kuwait
dict_CountryKG                                                                  : Kirguistán
dict_CountryLA                                                                  : Laos
dict_CountryLV                                                                  : Letonia
dict_CountryLB                                                                  : Líbano
dict_CountryLS                                                                  : Lesoto
dict_CountryLR                                                                  : Liberia
dict_CountryLY                                                                  : Libia
dict_CountryLI                                                                  : Liechtenstein
dict_CountryLT                                                                  : Lituania
dict_CountryLU                                                                  : Luxemburgo
dict_CountryMO                                                                  : Macao
dict_CountryMK                                                                  : Antigua República Yugoslava de Macedonia
dict_CountryMG                                                                  : Madagascar
dict_CountryMW                                                                  : Malaui
dict_CountryMY                                                                  : Malasia
dict_CountryMV                                                                  : Maldivas
dict_CountryML                                                                  : Malí
dict_CountryMT                                                                  : Malta
dict_CountryMH                                                                  : Islas Marshall
dict_CountryMQ                                                                  : Martinica
dict_CountryMR                                                                  : Mauritania
dict_CountryMU                                                                  : Mauricio
dict_CountryYT                                                                  : Mayotte
dict_CountryMX                                                                  : Mexico
dict_CountryFM                                                                  : Micronesia
dict_CountryMD                                                                  : Moldavia
dict_CountryMN                                                                  : Mongolia
dict_CountryMS                                                                  : Monserrat
dict_CountryMZ                                                                  : Mozambique
dict_CountryMM                                                                  : Birmania (Myanmar)
dict_CountryNA                                                                  : Namibia
dict_CountryNR                                                                  : Nauru
dict_CountryNP                                                                  : Nepal
dict_CountryAN                                                                  : Antillas Holandesas
dict_CountryNC                                                                  : Nueva Caledonia
dict_CountryNZ                                                                  : Nueva Zelanda
dict_CountryNI                                                                  : Nicaragua
dict_CountryNE                                                                  : Níger
dict_CountryNG                                                                  : Nigeria
dict_CountryNU                                                                  : Niue
dict_CountryNF                                                                  : Isla Norfolk
dict_CountryMP                                                                  : Islas Marianas del Norte
dict_CountryNO                                                                  : Noruega
dict_CountryOM                                                                  : Omán
dict_CountryPK                                                                  : Pakistán
dict_CountryPW                                                                  : Palau
dict_CountryPS                                                                  : Territorio Ocupado Palestino
dict_CountryPA                                                                  : Panamá
dict_CountryPG                                                                  : Papua Nueva Guinea
dict_CountryPY                                                                  : Paraguay
dict_CountryPE                                                                  : Perú
dict_CountryPH                                                                  : Filipinas
dict_CountryPN                                                                  : Islas Pitcairn
dict_CountryPL                                                                  : Polonia
dict_CountryPR                                                                  : Puerto Rico
dict_CountryQA                                                                  : Qatar
dict_CountryRE                                                                  : Reunión
dict_CountryRO                                                                  : Rumania
dict_CountryRW                                                                  : Ruanda
dict_CountrySH                                                                  : Santa Elena
dict_CountryKN                                                                  : San Cristóbal y Nieves
dict_CountryLC                                                                  : Santa Lucía
dict_CountryPM                                                                  : San Pedro y Miquelón
dict_CountryVC                                                                  : San Vicente y las Granadinas
dict_CountryWS                                                                  : Samoa
dict_CountrySM                                                                  : San Marino
dict_CountryST                                                                  : Santo Tomé y Príncipe
dict_CountryRS                                                                  : Serbia
dict_CountrySC                                                                  : Seychelles
dict_CountrySL                                                                  : Sierra Leona
dict_CountrySK                                                                  : Eslovaquia
dict_CountrySI                                                                  : Eslovenia
dict_CountrySB                                                                  : Islas Salomón
dict_CountrySO                                                                  : Somalia
dict_CountryZA                                                                  : Sur África
dict_CountryGS                                                                  : Islas Georgia del Sur y Sandwich del Sur
dict_CountryLK                                                                  : Sri Lanka
dict_CountrySD                                                                  : Sudán
dict_CountrySR                                                                  : Surinam
dict_CountrySJ                                                                  : Islas Svalbard y Jan Mayen
dict_CountrySZ                                                                  : Suazilandia
dict_CountrySY                                                                  : Siria
dict_CountryTW                                                                  : Taiwán
dict_CountryTJ                                                                  : Tayikistán
dict_CountryTZ                                                                  : Tanzania
dict_CountryTH                                                                  : Tailandia
dict_CountryTL                                                                  : Timor Oriental
dict_CountryTK                                                                  : Tokelau
dict_CountryTO                                                                  : Tonga
dict_CountryTT                                                                  : Trinidad y Tobago
dict_CountryTR                                                                  : Turquía
dict_CountryTM                                                                  : Turkmenistán
dict_CountryTC                                                                  : Islas Turcas y Caicos
dict_CountryTV                                                                  : Tuvalu
dict_CountryUG                                                                  : Uganda
dict_CountryUA                                                                  : Ucrania
dict_CountryAE                                                                  : Emiratos Árabes Unidos
dict_CountryUM                                                                  : Islas menores alejadas de Estados Unidos
dict_CountryUY                                                                  : Uruguay
dict_CountryUZ                                                                  : Uzbekistán
dict_CountryVU                                                                  : Vanuatu
dict_CountryVE                                                                  : Venezuela
dict_CountryVN                                                                  : Vietnam
dict_CountryVG                                                                  : Islas Vírgenes Británicas
dict_CountryVI                                                                  : Islas Vírgenes
dict_CountryWF                                                                  : Wallis y Futuna
dict_CountryEH                                                                  : Sáhara Occidental
dict_CountryYE                                                                  : Yemen
dict_CountryZM                                                                  : Zambia
dict_CountryZW                                                                  : Zimbabue
dict_CountryGG                                                                  : Guernsey
dict_CountryIM                                                                  : Isla de Man
dict_CountryJE                                                                  : Jersey
dict_CountryME                                                                  : Montenegro
dict_CountryBL                                                                  : Saint-Barthélemy
dict_CountryMF                                                                  : Saint-Martin
dict_CivilityMME                                                                : Señora
dict_CivilityMR                                                                 : Señor
dict_CivilityMLE                                                                : Señorita
dict_CivilityMTRE                                                               : Don
dict_CivilityDR                                                                 : Doctor
dict_Currencyeuros                                                              : Euros
dict_CurrencyAUD                                                                : Dólares Aus.
dict_CurrencySingAUD                                                            : Dólar Aus.
dict_CurrencyCAD                                                                : Dólares Can.
dict_CurrencySingCAD                                                            : Dólar Can.
dict_CurrencyCHF                                                                : Francos suizos
dict_CurrencySingCHF                                                            : Franco suizo
dict_CurrencyEUR                                                                : Euros
dict_CurrencySingEUR                                                            : Euro
dict_CurrencyFRF                                                                : Francos franceses
dict_CurrencySingFRF                                                            : Franco francés
dict_CurrencyGBP                                                                : Libras esterlinas
dict_CurrencySingGBP                                                            : Libra esterlina
dict_CurrencyINR                                                                : Rupias indias
dict_CurrencySingINR                                                            : Rupia india
dict_CurrencyMAD                                                                : Dirham
dict_CurrencySingMAD                                                            : Dirham
dict_CurrencyMGA                                                                : Ariary
dict_CurrencySingMGA                                                            : Ariary
dict_CurrencyMUR                                                                : Rupias mauritanas
dict_CurrencySingMUR                                                            : Rupia mauritana
dict_CurrencyNOK                                                                : Coronas noruegas
dict_CurrencySingNOK                                                            : Corona noruega
dict_CurrencyTND                                                                : Dinares tunecinos
dict_CurrencySingTND                                                            : Dinar tunecino
dict_CurrencyUSD                                                                : Dólares USA
dict_CurrencySingUSD                                                            : Dólar USA
dict_CurrencyUAH                                                                : Hryvnia
dict_CurrencySingUAH                                                            : Hryvnia
dict_CurrencyXAF                                                                : Francos CFA BEAC
dict_CurrencySingXAF                                                            : Franco CFA BEAC
dict_CurrencyXOF                                                                : Francos CFA BCEAO
dict_CurrencySingXOF                                                            : Franco CFA BCEAO
dict_CurrencyXPF                                                                : Francos CFP
dict_CurrencySingXPF                                                            : Franco CFP
dict_CurrencyCentSingEUR                                                        : céntimo
dict_CurrencyThousandthSingTND                                                  : milésimo
dict_CurrencySUR                                                                : Roubles
dict_CurrencySingSUR                                                            : Rouble
dict_CurrencyTRL                                                                : Livres turques
dict_CurrencySingTRL                                                            : Livre turque
dict_DemandReasonTypeSRC_INTE                                                   : Internet
dict_DemandReasonTypeSRC_CAMP_MAIL                                              : Campaña correo
dict_DemandReasonTypeSRC_CAMP_EMAIL                                             : Campaña E-Mailing
dict_DemandReasonTypeSRC_CAMP_PHO                                               : Campaña telefónica
dict_DemandReasonTypeSRC_CAMP_FAX                                               : Campaña fax
dict_DemandReasonTypeSRC_COMM                                                   : Contacto comercial
dict_DemandReasonTypeSRC_SHOP                                                   : Contacto tienda
dict_DemandReasonTypeSRC_WOM                                                    : Boca a boca
dict_DemandReasonTypeSRC_PARTNER                                                : Socio
dict_DemandReasonTypeSRC_EMPLOYEE                                               : Empleado
dict_DemandReasonTypeSRC_SPONSORING                                             : Patrocinador
dict_PaperFormatEU4A0                                                           : Format 4A0
dict_PaperFormatEU2A0                                                           : Format 2A0
dict_PaperFormatEUA0                                                            : Format A0
dict_PaperFormatEUA1                                                            : Format A1
dict_PaperFormatEUA2                                                            : Format A2
dict_PaperFormatEUA3                                                            : Format A3
dict_PaperFormatEUA4                                                            : Format A4
dict_PaperFormatEUA5                                                            : Format A5
dict_PaperFormatEUA6                                                            : Format A6
dict_PaperFormatUSLETTER                                                        : Format Lettre US
dict_PaperFormatUSLEGAL                                                         : Formato Legal US
dict_PaperFormatUSEXECUTIVE                                                     : Formato Exécutif US
dict_PaperFormatUSLEDGER                                                        : Format Ledger/Tabloid
dict_PaperFormatCAP1                                                            : Format P1 Canadien
dict_PaperFormatCAP2                                                            : Format P2 Canadien
dict_PaperFormatCAP3                                                            : Format P3 Canadien
dict_PaperFormatCAP4                                                            : Format P4 Canadien
dict_PaperFormatCAP5                                                            : Format P5 Canadien
dict_PaperFormatCAP6                                                            : Format P6 Canadien
errors_MenuManager                                                              : Gestor de menú
errors_Error                                                                    : Error
errors_Errors                                                                   : Errores
errors_ErrorBadEMail                                                            : e-mail %s no correcto
errors_ErrorBadUrl                                                              : Url %s inválida
errors_ErrorRecordNotFound                                                      : Registro no encontrado
errors_ErrorFailToCopyFile                                                      : Error al copiar el archivo '<b>%s</b>' en '<b>%s</b>'.
errors_ErrorFailToRenameFile                                                    : Error al renombrar el archivo '<b>%s</b>' a '<b>%s</b>'.
errors_ErrorFailToDeleteFile                                                    : Error al eliminar el archivo '<b>%s</b>'.
errors_ErrorFailToCreateFile                                                    : Error al crear el archivo  '<b>%s</b>'
errors_ErrorFailToRenameDir                                                     : Error al renombrar el directorio '<b>%s</b>' a '<b>%s</b>'.
errors_ErrorFailToCreateDir                                                     : Error al crear el directorio '<b>%s</b>'
errors_ErrorFailToDeleteDir                                                     : Error al eliminar el directorio '<b>%s</b>'.
errors_ErrorFailedToDeleteJoinedFiles                                           : Imposible eliminar la entidad ya que tiene archivos adjuntos. Elimine antes los archivos adjuntos
errors_ErrorThisContactIsAlreadyDefinedAsThisType                               : Este contacto ya está definido como contacto para este tipo.
errors_ErrorCashAccountAcceptsOnlyCashMoney                                     : Esta cuenta bancaria es de tipo caja y solo acepta el método de pago de tipo <b>especie</b>.
errors_ErrorFromToAccountsMustDiffers                                           : La cuenta origen y destino deben ser diferentes.
errors_ErrorBadThirdPartyName                                                   : Nombre de tercero incorrecto
errors_ErrorBadCustomerCodeSyntax                                               : La sintaxis del código cliente es incorrecta
errors_ErrorCustomerCodeRequired                                                : Código cliente obligatorio
errors_ErrorCustomerCodeAlreadyUsed                                             : Código de cliente ya utilizado
errors_ErrorPrefixRequired                                                      : Prefijo obligatorio
errors_ErrorUrlNotValid                                                         : La dirección del sitio web es incorrecta
errors_ErrorBadSupplierCodeSyntax                                               : LA sintaxis del código proveedor es incorrecta
errors_ErrorSupplierCodeRequired                                                : Código proveedor obligatorio
errors_ErrorSupplierCodeAlreadyUsed                                             : Código de proveedor ya utilizado
errors_ErrorBadParameters                                                       : Parámetros incorrectos
errors_ErrorBadValueForParameter                                                : Valor '%s' incorrecto para el parámetro '%s'
errors_ErrorBadImageFormat                                                      : La imagen no tiene un formato reconocido
errors_ErrorBadDateFormat                                                       : El valor '%s' tiene un formato de fecha no reconocido
errors_ErrorFailedToWriteInDir                                                  : Imposible escribir en el directorio %s
errors_ErrorFoundBadEmailInFile                                                 : Encontrada sintaxis incorrecta en email en %s líneas en archivo (ejemplo linea %s con email=%s)
errors_ErrorUserCannotBeDelete                                                  : El usuario no puede ser eliminado. Quizá esté asociado a elementos de Speedealing.
errors_ErrorFieldsRequired                                                      : No se indicaron algunos campos obligatorios
errors_ErrorFailedToCreateDir                                                   : Error en la creación de un directorio. Compruebe que el usuario del servidor Web tiene derechos de escritura en los directorios de documentos de Speedealing. Si el  parámetro <b>safe_mode</b> está activo en este PHP, Compruebe que los archivos php Speedealing pertenecen al usuario del servidor Web.
errors_ErrorNoMailDefinedForThisUser                                            : E-Mail no definido para este usuario
errors_ErrorFeatureNeedJavascript                                               : Esta funcionalidad precisa de javascript activo para funcionar. Modifique en configuración->entorno.
errors_ErrorTopMenuMustHaveAParentWithId0                                       : Un menú del tipo 'Superior' no puede tener un menú padre. Ponga 0 en el ID padre o busque un menú del tipo 'Izquierdo'
errors_ErrorLeftMenuMustHaveAParentId                                           : Un menú del tipo 'Izquierdo' debe de tener un ID de padre
errors_ErrorFileNotFound                                                        : Archivo <b>%s</b> no encontrado (ruta incorrecta, permisos incorrectos o acceso prohibido por el parámetro openbasedir)
errors_ErrorDirNotFound                                                         : Directorio<b>%s</b>no encontrado (Ruta incorrecta, permisos inadecuados o acceso prohibido por el parámetro PHP openbasedir o safe_mode)
errors_ErrorFunctionNotAvailableInPHP                                           : La función  <b>%s</b> es requerida por esta funcionalidad, pero no se encuetra disponible en esta versión/instalación de PHP.
errors_ErrorDirAlreadyExists                                                    : Ya existe un directorio con ese nombre.
errors_ErrorFileAlreadyExists                                                   : Ya existe un archivo con este nombre.
errors_ErrorPartialFile                                                         : Archivo no recibido íntegramente por el servidor.
errors_ErrorNoTmpDir                                                            : Directorio temporal de recepción %s inexistente
errors_ErrorUploadBlockedByAddon                                                : Subida bloqueada por un plugin PHP/Apache.
errors_ErrorFileSizeTooLarge                                                    : El tamaño del fichero es demasiado grande.
errors_ErrorSizeTooLongForIntType                                               : Longitud del campo demasiado largo para el tipo int (máximo %s cifras)
errors_ErrorSizeTooLongForVarcharType                                           : Longitud del campo demasiado largo para el tipo cadena (máximo %s cifras)
errors_ErrorFieldCanNotContainSpecialCharacters                                 : El campo <b>%s</b> no debe contener carácteres especiales
errors_ErrorNoAccountancyModuleLoaded                                           : Módulo de contabilidad no activado
errors_ErrorExportDuplicateProfil                                               : El nombre del perfil ya existe para este lote de exportación
errors_ErrorLDAPSetupNotComplete                                                : La configuración Speedealing-LDAP es incompleta.
errors_ErrorLDAPMakeManualTest                                                  : Se ha creado unn archivo .ldif en el directorio %s. Trate de cargar manualmente este archivo desde la línea de comandos para obtener más detalles acerca del error.
errors_ErrorCantSaveADoneUserWithZeroPercentage                                 : No se puede cambiar una acción al estado no comenzada si tiene un usuario realizante de  la acción.
errors_ErrorRefAlreadyExists                                                    : La referencia utilizada para la creación ya existe
errors_ErrorPleaseTypeBankTransactionReportName                                 : Introduzca el nombre del registro bancario sobre la cual el escrito está constatado (formato AAAAMM ó AAAMMJJ)
errors_ErrorRecordHasChildren                                                   : No se puede eliminar el registro porque tiene registros hijos.
errors_ErrorModuleRequireJavascript                                             : Javascript no debe estar desactivado para que esta opción pueda utilizarse. Para activar/desactivar JavaScript, vaya al menú Inicio->Configuración->Entorno.
errors_ErrorPasswordsMustMatch                                                  : Las 2 contraseñas indicadas deben corresponderse
errors_ErrorContactEMail                                                        : Se ha producido un error técnico. Contacte con el administrador al e-mail <b>%s</b>, indicando el código de error <b>%s</b> en su mensaje, o puede también adjuntar una copia de pantalla de esta página.
errors_ErrorWrongValueForField                                                  : Valor incorrecto para el campo número <b>%s</b> (el valor '<b>%s</b>' no cumple con la regla <b>%s</b>)
errors_ErrorFieldValueNotIn                                                     : Valor incorrecto para el campo número <b>%s</b> (el valor '<b>%s</b>' no es un valor en el campo <b>%s</b> de la tabla <b>%s</b>)
errors_ErrorFieldRefNotIn                                                       : Valor incorrecto para el campo número <b>%s</b> (el valor '<b>%s</b>' no es una referencia existente en <b>%s</b>)
errors_ErrorsOnXLines                                                           : Errores en <b>%s</b> líneas fuente
errors_ErrorFileIsInfectedWithAVirus                                            : ¡El antivirus no ha podido validar este archivo (es probable que esté infectado por un virus)!
errors_ErrorSpecialCharNotAllowedForField                                       : Los caracteres especiales no son admitidos por el campo "%s"
errors_ErrorDatabaseParameterWrong                                              : El parámetro de configuración de la base de datos '<b>%s</b>' tiene un valor no compatible para una instalación de Speedealing (debe tener el valor '<b>%s</b>').
errors_ErrorNumRefModel                                                         : Hay una referencia en la base de datos (%s) y es incompatible con esta numeración. Elimine la línea o renombre la referencia para activar este módulo.
errors_ErrorQtyTooLowForThisSupplier                                            : Cantidad insuficiente para este proveedor
errors_ErrorModuleSetupNotComplete                                              : La configuración del módulo parece incompleta. Vaya al área Configuración - Módulos para corregir
errors_ErrorBadMask                                                             : Error en la máscara
errors_ErrorBadMaskFailedToLocatePosOfSequence                                  : Error, sin número de secuencia en la máscara
errors_ErrorBadMaskBadRazMonth                                                  : Error, valor de vuelta a 0 incorrecto
errors_ErrorSelectAtLeastOne                                                    : Error. Seleccione al menos una entrada.
errors_ErrorProductWithRefNotExist                                              : La referencia de producto '<i>%s</i>' no existe
errors_ErrorDeleteNotPossibleLineIsConsolidated                                 : Eliminación imposible ya que el registro está enlazado a una transacción bancaria conciliada
errors_ErrorProdIdAlreadyExist                                                  : %s se encuentra asignado a otro tercero
errors_ErrorFailedToSendPassword                                                : Error en el envío de la contraseña
errors_ErrorFailedToLoadRSSFile                                                 : Error en la recuperación del flujo RSS. Añada la constante MAIN_SIMPLEXMLLOAD_DEBUG si el mensaje de error no es muy explícito.
errors_ErrorPasswordDiffers                                                     : Las contraseñas no son idénticas, vuelva a introducirlas
errors_ErrorForbidden                                                           : Acceso no autorizado.<br>Intenta acceder a una página, zona o función sin estar en una sesión autentificada o que no se autoriza para su cuenta de usuario.
errors_ErrorForbidden2                                                          : Los permisos para este usuario pueden ser asignados por el administrador Speedealing mediante el menú %s-> %s.
errors_ErrorForbidden3                                                          : Speedealing no parece funcionar en una sesión autentificada. Consulte la documentación de instalación de Speedealing para saber cómo administrar las autenticaciones (htaccess, mod_auth u otro...).
errors_ErrorNoImagickReadimage                                                  : La classe imagick_readimage no está presente en esta instalación de PHP. La reseña no está pues disponible. Los administradores pueden desactivar esta pestaña en el menú Configuración - Visualización.
errors_ErrorRecordAlreadyExists                                                 : Registro ya existente
errors_ErrorCantReadFile                                                        : Error de lectura del archivo '%s'
errors_ErrorCantReadDir                                                         : Error de lectura del directorio '%s'
errors_ErrorFailedToFindEntity                                                  : Error de lectura del entorno '%s'
errors_ErrorBadLoginPassword                                                    : Identificadores de usuario o contraseña incorrectos
errors_ErrorLoginDisabled                                                       : Su cuenta está desactivada
errors_ErrorFailedToRunExternalCommand                                          : Error de ejecución del comando externo. Compruebe que está disponible y ejecutable por su servidor PHP. Si el PHP <b>Safe Mode</b> está activo, compruebe que el comando se encuentra en un directorio definido en el parámetro <b>safe_mode_exec_dir</b>.
errors_ErrorFailedToChangePassword                                              : Error en la modificación de la contraseña
errors_ErrorLoginDoesNotExists                                                  : La cuenta de usuario de <b>%s</b> no se ha encontrado.
errors_ErrorLoginHasNoEmail                                                     : Este usuario no tiene e-mail. Imposible continuar.
errors_ErrorBadValueForCode                                                     : Valor incorrecto para el código. Vuelva a intentar con un nuevo valor...
errors_ErrorBothFieldCantBeNegative                                             : Los campos %s y %s no pueden ser negativos
errors_ErrorWebServerUserHasNotPermission                                       : La cuenta de ejecución del servidor web <b>%s</b> no dispone de los permisos para esto
errors_ErrorNoActivatedBarcode                                                  : Ningún tipo de código de barras activado
errors_ErrUnzipFails                                                            : No se ha podido descomprimir el archivo %s con ZipArchive
errors_ErrNoZipEngine                                                           : En este PHP no hay motor para descomprimir el archivo %s
errors_ErrorFileMustBeASpeedealingPackage                                       : The file %s must be a Speedealing zip package
errors_ErrorFileRequired                                                        : Se requiere un archivo de paquete Speedealing en formato zip
errors_ErrorPhpCurlNotInstalled                                                 : La extensión PHP CURL no se encuentra instalada, es indispensable para dialogar con Paypal.
errors_ErrorFailedToAddToMailmanList                                            : Ha ocurrido un error al intentar añadir un registro a la lista Mailman o base de datos SPIP
errors_ErrorNewVaueCantMatchOldValue                                            : El nuevo valor no puede ser igual al antiguo
errors_ErrorDuplicateTrigger                                                    : Un fichier trigger de classe '<b>%s</b>' est présent plusieurs fois. Supprimer le doublon du répertoire '<b>%s</b>'.
errors_SESSIONEXPIRE                                                            : La session est expirée
errors_WarningMandatorySetupNotComplete                                         : Los parámetros obligatorios de configuración no están todavía definidos
errors_WarningSafeModeOnCheckExecDir                                            : Atención, está activada la opción PHP <b>safe_mode</b>, el comando deberá estar dentro de un directorio declarado dentro del parámetro php <b>safe_mode_exec_dir</b>.
errors_WarningAllowUrlFopenMustBeOn                                             : El parámetro <b>allow_url_fopen</b> debe ser especificado a <b>on</b> en el archivo <b>php.ini</b> para disponer de este módulo completamente activo. Debe modificar este archivo manualmente
errors_WarningBuildScriptNotRunned                                              : El script <b>%s</b> todavía no ha ejecutado la construcción de gráficos.
errors_WarningBookmarkAlreadyExists                                             : Ya existe un marcador con este título o esta URL.
errors_WarningPassIsEmpty                                                       : Atención: La contraseña de la base de datos está vacía. Esto es un agujero de seguridad. Debe agregar una contraseña a su base de datos y cambiar su archivo conf.php para reflejar esto.
errors_WarningConfFileMustBeReadOnly                                            : Atención, su archivo (<b>htdocs/conf/conf.php</b>) es accesible en escritura al servidor Web. Esto representa un fallo serio de seguridad. Modifique los permisos para ser leído únicamente por la cuenta que ejecuta el servidor Web.<br>Si está ejecutando Windows en un disco con formato FAT, sea consciente que este sistema de archivos no protege los archivos y no ofrece ninguna solución para reducir los riesgos de manipulación de este fichero.
errors_WarningsOnXLines                                                         : Alertas en <b>%s</b> líneas fuente
errors_WarningNoDocumentModelActivated                                          : No hay ningún modelo para la generación del documento activado. Se tomará un modelo por defecto hasta que se configure el módulo.
errors_WarningLockFileDoesNotExists                                             : Atención: Una vez terminada la instalación, deben desactivarse las herramientas de instalación/actualización añadiendo el archivo <b>install.lock</b> en el directorio <b>%s</b>. La ausencia de este archivo representa un fallo de seguridad.
errors_WarningUntilDirRemoved                                                   : Las alertas de seguridad sólo son visibles a los administradores y permanecen activas hasta que el problema sea resuelto (o si la constante MAIN_REMOVE_INSTALL_WARNING es definida en Configuración->Varios)
errors_WarningCloseAlways                                                       : Aviso, el cierre es realizado aunque la cantidad total difiera entre los elementos de origen y destino. Active esta funcionalidad con precaución.
errors_ErrorEnterYourLogin                                                      : Identifiant vide
errors_ErrorEnterYourPassword                                                   : Mot de passe vide
mails_Mailing                                                                   : E-Mailing
mails_EMailing                                                                  : E-Mailing
mails_Mailings                                                                  : E-Mailings
mails_EMailings                                                                 : E-Mailings
mails_AllEMailings                                                              : Todos los  E-Mailings
mails_MailCard                                                                  : Ficha E-Mailing
mails_MailTargets                                                               : Destinatarios
mails_MailRecipients                                                            : Destinatarios
mails_MailRecipient                                                             : Destinatario
mails_MailTitle                                                                 : Descripción
mails_MailFrom                                                                  : Remitente
mails_MailErrorsTo                                                              : Errores a
mails_MailReply                                                                 : Responder a
mails_MailTo                                                                    : Destinatario(s)
mails_MailCC                                                                    : Copia a
mails_MailCCC                                                                   : Adjuntar copia a
mails_MailTopic                                                                 : Asunto del e-mail
mails_MailText                                                                  : Mensaje
mails_MailFile                                                                  : Archivo
mails_MailMessage                                                               : Mensaje del e-mail
mails_ShowEMailing                                                              : Mostrar E-Mailing
mails_ListOfEMailings                                                           : Listado de E-Mailings
mails_NewMailing                                                                : Nuevo E-Mailing
mails_EditMailing                                                               : Editar E-Mailing
mails_ResetMailing                                                              : Nuevo envío
mails_DeleteMailing                                                             : Eliminar E-Mailing
mails_DeleteAMailing                                                            : Eliminar un E-Mailing
mails_PreviewMailing                                                            : Previsualizar un E-Mailing
mails_PrepareMailing                                                            : Preparar E-Mailing
mails_CreateMailing                                                             : Crear E-Mailing
mails_MailingDesc                                                               : Esta página le permite enviar e-mails a un grupo de personas.
mails_MailingResult                                                             : Resultado del envío de e-mails
mails_TestMailing                                                               : Probar E-Mailing
mails_ValidMailing                                                              : Validar E-Mailing
mails_ApproveMailing                                                            : Aprobar E-Mailing
mails_MailingStatusDraft                                                        : Borrador
mails_MailingStatusValidated                                                    : Validado
mails_MailingStatusApproved                                                     : Aprovado
mails_MailingStatusSent                                                         : Enviado
mails_MailingStatusSentPartialy                                                 : Enviado parcialmente
mails_MailingStatusSentCompletely                                               : Enviado completamente
mails_MailingStatusError                                                        : Error
mails_MailingStatusNotSent                                                      : No enviado
mails_MailSuccessfulySent                                                       : E-Mail enviado correctamente (de %s a %s)
mails_MailingSuccessfullyValidated                                              : E-mailing validado correctamente
mails_MailUnsubcribe                                                            : Desuscribe
mails_Unsuscribe                                                                : Desuscribe
mails_MailingStatusNotContact                                                   : Don't contact anymore
mails_ErrorMailRecipientIsEmpty                                                 : La dirección del destinatario está vacía
mails_WarningNoEMailsAdded                                                      : Ningún nuevo E-Mailing a añadir a la lista destinatarios.
mails_ConfirmValidMailing                                                       : ¿Confirma la validación del E-Mailing?
mails_ConfirmResetMailing                                                       : Atención, en el reinicio del E-Mailing <b>%s</b>, autoriza de nuevo su emisión en masa. ¿Es esto lo que quiere hacer?
mails_ConfirmDeleteMailing                                                      : ¿Confirma la eliminación del E-Mailing?
mails_NbOfRecipients                                                            : Número de destinatarios
mails_NbOfUniqueEMails                                                          : Nº de e-mails únicos
mails_NbOfEMails                                                                : Nº de E-mails
mails_TotalNbOfDistinctRecipients                                               : Número de destinatarios únicos
mails_NoTargetYet                                                               : Ningún destinatario definido
mails_AddRecipients                                                             : Añadir destinatarios
mails_RemoveRecipient                                                           : Eliminar destinatario
mails_CommonSubstitutions                                                       : Substituciones comunes
mails_YouCanAddYourOwnPredefindedListHere                                       : Para crear su módulo de selección e-mails, vea htdocs/core/modules/mailings/README.
mails_EMailTestSubstitutionReplacedByGenericValues                              : En modo prueba, las variables de sustitución son sustituidas por valores genéricos
mails_MailingAddFile                                                            : Adjuntar este archivo
mails_NoAttachedFiles                                                           : Sin archivos adjuntos
mails_BadEMail                                                                  : E-Mail incorrecto
mails_CloneEMailing                                                             : Clonar E-Mailing
mails_ConfirmCloneEMailing                                                      : ¿Está seguro de querer clonar este e-mailing?
mails_CloneContent                                                              : Clonar mensaje
mails_CloneReceivers                                                            : Clonar destinatarios
mails_DateLastSend                                                              : Fecha último envío
mails_DateSending                                                               : Fecha envío
mails_SentTo                                                                    : Enviado a <b>%s</b>
mails_MailingStatusRead                                                         : Leido
mails_CheckRead                                                                 : Confirmación de lectura
mails_YourMailUnsubcribeOK                                                      : El correo electrónico <b>%s</b> es correcta desuscribe.
mails_MailtoEMail                                                               : mailto email (hyperlink)
mails_ActivateCheckRead                                                         : Activar confirmación de lectura y opción de desuscripción
mails_ActivateCheckReadKey                                                      : Clave usada para encriptar la URL de la confirmación de lectura y la función de desuscripción
mails_MailingModuleDescContactCompanies                                         : Contactos de terceros (clientes potenciales, clientes, proveedores...)
mails_MailingModuleDescSpeedealingUsers                                         : Speedealing users
mails_MailingModuleDescFundationMembers                                         : Miembros
mails_MailingModuleDescEmailsFromFile                                           : E-Mails de un archivo (e-mail;nombre;varios)
mails_MailingModuleDescEmailsFromUser                                           : E-mails introducidos por el usuario (email;apellidos;nombre;otros)
mails_MailingModuleDescContactsCategories                                       : Terceros (por categoría)
mails_MailingModuleDescSpeedealingContractsLinesExpired                         : Third parties with expired contract's lines
mails_MailingModuleDescContactsByCompanyCategory                                : Contactos de terceros (por categoría de terceros)
mails_MailingModuleDescMembersCategories                                        : Miembros (por categoría)
mails_MailingModuleDescContactsByFunction                                       : Contactos de terceros (por puesto/función)
mails_LineInFile                                                                : Línea %s en archivo
mails_RecipientSelectionModules                                                 : Módulos de selección de los destinatarios
mails_MailSelectedRecipients                                                    : Destinatarios seleccionados
mails_MailingArea                                                               : Área E-Mailings
mails_LastMailings                                                              : Los %s últimos E-Mailings
mails_TargetsStatistics                                                         : Estadísticas destinatarios
mails_NbOfCompaniesContacts                                                     : Contactos únicos de empresas
mails_MailNoChangePossible                                                      : Destinatarios de un E-Mailing validado no modificables
mails_SearchAMailing                                                            : Buscar un E-Mailing
mails_SendMailing                                                               : Enviar E-Mailing
mails_SendMail                                                                  : Enviar e-mail
mails_SentBy                                                                    : Enviado por
mails_MailingNeedCommand                                                        : Por razones de seguridad, el envío de un E-Mailing en masa debe realizarse en línea de comandos. Pida a su administrador que lance el comando siguiente para para enviar la correspondencia a a todos los destinatarios:
mails_MailingNeedCommand2                                                       : Puede enviar en línea añadiendo el parámetro MAILING_LIMIT_SENDBYWEB con un valor numérico que indica el máximo nº de e-mails a enviar por sesión. Para ello vaya a Inicio - Configuración - Varios.
mails_ConfirmSendingEmailing                                                    : ¿Confirma el envío del e-mailing?
mails_LimitSendingEmailing                                                      : El envío de un e-mailing desde las pantallas está limitado por razones de seguridad y de timeout a <b>%s</b> destinatarios por sesión de envío.
mails_TargetsReset                                                              : Vaciar lista
mails_ToClearAllRecipientsClickHere                                             : Para vaciar la lista de los destinatarios de este E-Mailing, haga click en el botón
mails_ToAddRecipientsChooseHere                                                 : Para añadir destinatarios, escoja los que figuran en las listas a continuación
mails_NbOfEMailingsReceived                                                     : E-Mailings en masa recibidos
mails_IdRecord                                                                  : ID registro
mails_DeliveryReceipt                                                           : Acuse de recibo
mails_YouCanUseCommaSeparatorForSeveralRecipients                               : Puede usar el carácter de separación <b>coma </b> para especificar múltiples destinatarios.
mails_TagCheckMail                                                              : Seguimiento de la apertura del email
mails_TagUnsubscribe                                                            : Link de desuscripción
mails_TagSignature                                                              : Firma del usuario remitente
mails_TagMailtoEmail                                                            : Email del destinatario
mails_Notifications                                                             : Notificaciones
mails_NoNotificationsWillBeSent                                                 : Ninguna notificación por e-mail está prevista para este evento y empresa
mails_ANotificationsWillBeSent                                                  : 1 notificación va a ser enviada por e-mail
mails_SomeNotificationsWillBeSent                                               : %s notificaciones van a ser enviadas por e-mail
mails_AddNewNotification                                                        : Activar una nueva solicitud de notificación
mails_ListOfActiveNotifications                                                 : Lista de las solicitudes de notificaciones activas
mails_ListOfNotificationsDone                                                   : Lista de notificaciones de e-mails enviadas
main_DIRECTION                                                                  : ltr
main_SeparatorDecimal                                                           : ,
main_SeparatorThousand                                                          : ,
main_date                                                                       : [object Object]
main_FormatDateShort                                                            : %d/%m/%Y
main_FormatHourShort                                                            : %H:%M
main_FormatHourShortDuration                                                    : %H:%M
main_FormatDateTextShort                                                        : %d %b %Y
main_FormatDateText                                                             : %d %B %Y
main_FormatDateHourShort                                                        : %d/%m/%Y %H:%M
main_FormatDateHourTextShort                                                    : %d %b %Y %H:%M
main_FormatDateHourText                                                         : %d %B %Y %H:%M
main_DatabaseConnection                                                         : Conexión a la base de datos
main_NoTranslation                                                              : Sin traducción
main_NoRecordFound                                                              : No se han encontrado registros
main_NoError                                                                    : Ningún error
main_Error                                                                      : Error
main_ErrorFieldRequired                                                         : El campo '%s' es obligatorio
main_ErrorFieldFormat                                                           : El campo '%s' tiene un valor incorrecto
main_ErrorFileDoesNotExists                                                     : El archivo %s no existe
main_ErrorFailedToOpenFile                                                      : Imposible abrir el archivo %s
main_ErrorCanNotCreateDir                                                       : Imposible crear el directorio %s
main_ErrorCanNotReadDir                                                         : Imposible leer el directorio %s
main_ErrorConstantNotDefined                                                    : Parámetro %s no definido
main_ErrorUnknown                                                               : Error desconocido
main_ErrorSQL                                                                   : Error de SQL
main_ErrorLogoFileNotFound                                                      : El archivo logo '%s' no se encuentra
main_ErrorGoToGlobalSetup                                                       : Vaya a la Configuración ' Empresa/Institución ' para corregir
main_ErrorGoToModuleSetup                                                       : Vaya a la configuración del módulo para corregir
main_ErrorFailedToSendMail                                                      : Error en el envío del e-mail (emisor=%s, destinatario=%s)
main_ErrorAttachedFilesDisabled                                                 : La gestión de los archivos asociados está desactivada en este servidor
main_ErrorFileNotUploaded                                                       : El archivo no se ha podido transferir
main_ErrorInternalErrorDetected                                                 : Error detectado
main_ErrorNoRequestRan                                                          : Ninguna petición realizada
main_ErrorWrongHostParameter                                                    : Parámetro Servidor inválido
main_ErrorYourCountryIsNotDefined                                               : Su país no está definido. Corríjalo yendo a Inicio-Configuración-Empresa/Institución-Editar
main_ErrorRecordIsUsedByChild                                                   : Imposible de suprimir este registro. Esta siendo utilizado como padre por al menos un registro hijo.
main_ErrorWrongValue                                                            : Valor incorrecto
main_ErrorWrongValueForParameterX                                               : Valor incorrecto del parámetro %s
main_ErrorNoRequestInError                                                      : Ninguna petición en error
main_ErrorServiceUnavailableTryLater                                            : Servicio no disponible actualmente. Vuélvalo a intentar más tarde.
main_ErrorDuplicateField                                                        : Duplicado en un campo único
main_ErrorSomeErrorWereFoundRollbackIsDone                                      : Se encontraron algunos errores. Modificaciones deshechas.
main_ErrorConfigParameterNotDefined                                             : El parámetro <b>%s</b> no está definido en el archivo de configuración Speedealing <b>conf.php</b>.
main_ErrorCantLoadUserFromSpeedealingDatabase                                   : Failed to find user <b>%s</b> in Speedealing database.
main_ErrorNoVATRateDefinedForSellerCountry                                      : Error, ningún tipo de IVA definido para el país '%s'.
main_ErrorNoSocialContributionForSellerCountry                                  : Error, ningún tipo de carga social definida para el país '%s'.
main_ErrorFailedToSaveFile                                                      : Error, el registro del archivo falló.
main_ErrorOnlyPngJpgSupported                                                   : Error, solamente se soportan los formatos de imagen jpg y png.
main_ErrorImageFormatNotSupported                                               : Su PHP no soporta las funciones de conversión de este formato de imagen.
main_SeeAlso                                                                    : Ver también %s
main_BackgroundColorByDefault                                                   : Color de fondo
main_FileWasNotUploaded                                                         : Un archivo ha sido seleccionado para adjuntarlo, pero aún no se ha subido. Haga clic en "Adjuntar este archivo" para ello.
main_NbOfEntries                                                                : Nº de entradas
main_GoToWikiHelpPage                                                           : Consultar la ayuda (puede requerir acceso a Internet)
main_GoToHelpPage                                                               : Consultar la ayuda
main_RecordSaved                                                                : Registro guardado
main_LevelOfFeature                                                             : Nivel de funciones
main_NotDefined                                                                 : No definida
main_DefinedAndHasThisValue                                                     : Defined and value to
main_IsNotDefined                                                               : undefined
main_SpeedealingInHttpAuthenticationSoPasswordUseless                           : Speedealing authentication mode is setup to <b>%s</b> in configuration file <b>conf.php</b>.<br>This means that password database is extern to Speedealing, so changing this field may have no effects.
main_Administrator                                                              : Administrador
main_Undefined                                                                  : No definido
main_PasswordForgotten                                                          : ¿Olvidó su contraseña?
main_SeeAbove                                                                   : Mencionado anteriormente
main_HomeArea                                                                   : Área inicio
main_LastConnexion                                                              : Última conexión
main_PreviousConnexion                                                          : Conexión anterior
main_ConnectedOnMultiCompany                                                    : Conexión a la entidad
main_ConnectedSince                                                             : Conectado desde
main_AuthenticationMode                                                         : Modo autentificación
main_RequestedUrl                                                               : Url solicitada
main_DatabaseTypeManager                                                        : Tipo de gestor de base de datos
main_RequestLastAccess                                                          : Petición último acceso a la base de datos
main_RequestLastAccessInError                                                   : Petición último acceso a la base de datos erróneo
main_ReturnCodeLastAccessInError                                                : Código devuelto último acceso a la base de datos erróneo
main_InformationLastAccessInError                                               : Información sobre el último acceso a la base de datos erróneo
main_SpeedealingHasDetectedError                                                : Speedealing has detected a technical error
main_InformationToHelpDiagnose                                                  : He aquí la información que podrá ayudar al diagnóstico
main_MoreInformation                                                            : Más información
main_NotePublic                                                                 : Nota (pública)
main_NotePrivate                                                                : Nota (privada)
main_PrecisionUnitIsLimitedToXDecimals                                          : Speedealing está configurado para limitar la precisión de los precios unitarios a <b>%s</b> decimales.
main_DoTest                                                                     : Probar
main_ToFilter                                                                   : Filtrar
main_WarningYouHaveAtLeastOneTaskLate                                           : Atención, tiene al menos un elemento que ha pasado la fecha de tolerancia.
main_yes                                                                        : sí
main_Yes                                                                        : Sí
main_no                                                                         : no
main_No                                                                         : No
main_All                                                                        : Todo
main_Home                                                                       : Inicio
main_Help                                                                       : Ayuda
main_OnlineHelp                                                                 : Ayuda en línea
main_PageWiki                                                                   : Página Wiki
main_Always                                                                     : Siempre
main_Never                                                                      : Nunca
main_Under                                                                      : Bajo
main_Period                                                                     : Periodo
main_PeriodEndDate                                                              : Fecha fin periodo
main_Activate                                                                   : Activar
main_Activated                                                                  : Activado
main_Closed                                                                     : Cerrado
main_Close                                                                      : Cerrar
main_Closed2                                                                    : Cerrado
main_Enabled                                                                    : Activado
main_Disable                                                                    : Desactivar
main_Disabled                                                                   : Desactivado
main_Add                                                                        : Añadir
main_AddLink                                                                    : Enlazar
main_Update                                                                     : Modificar
main_AddActionToDo                                                              : Añadir acción a realizar
main_AddActionDone                                                              : Añadir acción realizada
main_Close2                                                                     : Cerrar
main_Confirm                                                                    : Confirmar
main_ConfirmSendCardByMail                                                      : ¿Quiere enviar el contenido de esta ficha por e-mail a la dirección <b>%s</b>?
main_Delete                                                                     : Eliminar
main_Remove                                                                     : Retirar
main_Resiliate                                                                  : Cancelar
main_Cancel                                                                     : Anular
main_Modify                                                                     : Modificar
main_Edit                                                                       : Editar
main_Validate                                                                   : Validar
main_ToValidate                                                                 : A validar
main_Save                                                                       : Grabar
main_SaveAs                                                                     : Grabar como
main_TestConnection                                                             : Probar la conexión
main_ToClone                                                                    : Copiar
main_ConfirmClone                                                               : Seleccione los datos que desea copiar:
main_NoCloneOptionsSpecified                                                    : No hay datos definidos para copiar
main_Of                                                                         : de
main_CopyOf                                                                     : Copia de
main_Show                                                                       : Ver
main_ShowCardHere                                                               : Ver la ficha aquí
main_Search                                                                     : Buscar
main_SearchOf                                                                   : Búsqueda de
main_Valid                                                                      : Validar
main_ToBill                                                                     : Facturar
main_Approve                                                                    : Aprobar
main_ReOpen                                                                     : Reabrir
main_Upload                                                                     : Enviar archivo
main_Select                                                                     : Seleccionar
main_Choose                                                                     : Elegir
main_ChooseLangage                                                              : Elegir su idioma
main_Resize                                                                     : Redimensionar
main_Recenter                                                                   : Encuadrar
main_Author                                                                     : Autor
main_User                                                                       : Usuario
main_Users                                                                      : Usuarios
main_Group                                                                      : Grupo
main_Groups                                                                     : Grupos
main_Password                                                                   : Contraseña
main_PasswordRetype                                                             : Repetir contraseña
main_NoteSomeFeaturesAreDisabled                                                : Atención, sólo unos pocos módulos/funcionalidades han sido activados en esta demo.
main_Name                                                                       : Nombre
main_Person                                                                     : Persona
main_Parameter                                                                  : Parámetro
main_Parameters                                                                 : Parámetros
main_Value                                                                      : Valor
main_GlobalValue                                                                : Valor global
main_PersonalValue                                                              : Valor personalizado
main_NewValue                                                                   : Nuevo valor
main_CurrentValue                                                               : Valor actual
main_Code                                                                       : Código
main_Type                                                                       : Tipo
main_Language                                                                   : Idioma
main_MultiLanguage                                                              : Multiidioma
main_Note                                                                       : Nota
main_CurrentNote                                                                : Nota actual
main_Title                                                                      : Título
main_Label                                                                      : Etiqueta
main_RefOrLabel                                                                 : Ref. o etiqueta
main_Info                                                                       : Log
main_Family                                                                     : Familia
main_Description                                                                : Descripción
main_Designation                                                                : Descripción
main_Model                                                                      : Modelo
main_DefaultModel                                                               : Modelo por defecto
main_Action                                                                     : Acción
main_About                                                                      : Acerca de
main_Number                                                                     : Número
main_NumberByMonth                                                              : Número por mes
main_AmountByMonth                                                              : Importe por mes
main_Numero                                                                     : Número
main_Limit                                                                      : Límite
main_Limits                                                                     : Límites
main_DevelopmentTeam                                                            : Equipo de desarrollo
main_Logout                                                                     : Desconexión
main_Connection                                                                 : Conexión
main_Setup                                                                      : Configuración
main_Alert                                                                      : Alerta
main_Previous                                                                   : Anterior
main_Next                                                                       : Siguiente
main_Cards                                                                      : Fichas
main_Card                                                                       : Ficha
main_Now                                                                        : Ahora
main_Date                                                                       : Fecha
main_DateStart                                                                  : Fecha inicio
main_DateEnd                                                                    : Fecha fin
main_DateCreation                                                               : Fecha de creación
main_DateModification                                                           : Fecha de modificación
main_DateModificationShort                                                      : Fecha modif.
main_DateLastModification                                                       : Fecha última modificación
main_DateValidation                                                             : Fecha de validación
main_DateClosing                                                                : Fecha de cierre
main_DateDue                                                                    : Fecha de vencimiento
main_DateValue                                                                  : Fecha valor
main_DateValueShort                                                             : Fecha valor
main_DateOperation                                                              : Fecha operación
main_DateOperationShort                                                         : Fecha op.
main_DateLimit                                                                  : Fecha límite
main_DateRequest                                                                : Fecha consulta
main_DateProcess                                                                : Fecha proceso
main_DatePlanShort                                                              : Fecha planif.
main_DateRealShort                                                              : Fecha real
main_DateBuild                                                                  : Fecha generación del informe
main_DatePayment                                                                : Fecha pago
main_DurationYear                                                               : año
main_DurationMonth                                                              : mes
main_DurationWeek                                                               : semana
main_DurationDay                                                                : día
main_DurationYears                                                              : años
main_DurationMonths                                                             : meses
main_DurationWeeks                                                              : semanas
main_DurationDays                                                               : días
main_Year                                                                       : Año
main_Month                                                                      : Mes
main_Week                                                                       : Semana
main_Day                                                                        : Día
main_Hour                                                                       : Hora
main_Minute                                                                     : Minuto
main_Second                                                                     : Segundo
main_Years                                                                      : Años
main_Months                                                                     : Meses
main_Days                                                                       : Días
main_days                                                                       : días
main_Hours                                                                      : Horas
main_Minutes                                                                    : Minutos
main_Seconds                                                                    : Segundos
main_Today                                                                      : Hoy
main_Yesterday                                                                  : Ayer
main_Tomorrow                                                                   : Mañana
main_Quadri                                                                     : Trimestre
main_MonthOfDay                                                                 : Mes del día
main_HourShort                                                                  : H
main_Rate                                                                       : Tipo
main_UseLocalTax                                                                : Incluir tasas
main_LocalTaxDesc                                                               : Algunos países aplican 2 o 3 tasas a cada línea de factura. Si es el caso, escoja el tipo de la segunda y tercera tasa y su valor. Los posibles tipos son:<br>1 : tasa local aplicable a productos y servicios sin IVA (IVA no se aplica en la tasa local)<br>2 : tasa local se aplica a productos y servicios antes del IVA (IVA se calcula sobre importe+tasa local)<br>3 : tasa local se aplica a productos sin IVA (IVA no se aplica en la tasa local)<br>4 : tasa local se aplica a productos antes del IVA (IVA se calcula sobre el importe+tasa local)<br>5 : tasa local se aplica a servicios sin IVA (IVA no se aplica a la tasa local)<br>6 : tasa local se aplica a servicios antes del IVA (IVA se calcula sobre importe + tasa local)<br>7 : la tasa local es un importe fijo aplicado al total de la factura
main_Bytes                                                                      : Bytes
main_KiloBytes                                                                  : Kilobytes
main_MegaBytes                                                                  : Megabytes
main_GigaBytes                                                                  : Gigabytes
main_TeraBytes                                                                  : Terabytes
main_b                                                                          : b.
main_Kb                                                                         : Kb
main_Mb                                                                         : Mb
main_Gb                                                                         : Gb
main_Tb                                                                         : Tb
main_Cut                                                                        : Cortar
main_Copy                                                                       : Copiar
main_Paste                                                                      : Pegar
main_Default                                                                    : Defecto
main_DefaultValue                                                               : Valor por defecto
main_DefaultGlobalValue                                                         : Valor global
main_Price                                                                      : Precio
main_UnitPrice                                                                  : Precio unitario
main_UnitPriceHT                                                                : Precio base
main_UnitPriceTTC                                                               : Precio unitario total
main_PriceU                                                                     : P.U.
main_PriceUHT                                                                   : P.U.
main_PriceUTTC                                                                  : P.U. Total
main_Amount                                                                     : Importe
main_AmountInvoice                                                              : Importe factura
main_AmountPayment                                                              : Importe pago
main_AmountHTShort                                                              : Base imp.
main_AmountTTCShort                                                             : Importe
main_AmountHT                                                                   : Base imponible
main_AmountTTC                                                                  : Importe total
main_AmountVAT                                                                  : Importe IVA
main_AmountLT1ES                                                                : Importe RE
main_AmountLT2ES                                                                : Importe IRPF
main_AmountTotal                                                                : Importe total
main_AmountAverage                                                              : Importe medio
main_PriceQtyHT                                                                 : Precio para la cantidad total
main_PriceQtyMinHT                                                              : Precio cantidad min. total
main_PriceQtyTTC                                                                : Precio total para la cantidad
main_PriceQtyMinTTC                                                             : Precio cantidad min. total
main_Percentage                                                                 : Porcentaje
main_Total                                                                      : Total
main_SubTotal                                                                   : Subtotal
main_TotalHTShort                                                               : Importe
main_TotalTTCShort                                                              : Total
main_TotalHT                                                                    : Base imponible
main_TotalTTC                                                                   : Total
main_TotalTTCToYourCredit                                                       : Total a crédito
main_TotalVAT                                                                   : Total IVA
main_TotalLT1ES                                                                 : Total RE
main_TotalLT2ES                                                                 : Total IRPF
main_IncludedVAT                                                                : IVA incluido
main_HT                                                                         : Sin IVA
main_TTC                                                                        : IVA incluido
main_VAT                                                                        : IVA
main_LT1ES                                                                      : RE
main_LT2ES                                                                      : IRPF
main_VATRate                                                                    : Tasa IVA
main_Average                                                                    : Media
main_Sum                                                                        : Suma
main_Delta                                                                      : Diferencia
main_Module                                                                     : Módulo
main_Option                                                                     : Opción
main_List                                                                       : Listado
main_FullList                                                                   : Listado completo
main_Statistics                                                                 : Estadísticas
main_OtherStatistics                                                            : Otras estadísticas
main_Status                                                                     : Estado
main_Ref                                                                        : Ref.
main_RefSupplier                                                                : Ref. proveedor
main_RefPayment                                                                 : Ref. pago
main_CommercialProposals                                                        : Presupuestos
main_Comment                                                                    : Comentario
main_Comments                                                                   : Comentarios
main_ActionsToDo                                                                : Eventos a realizar
main_ActionsDone                                                                : Eventos realizados
main_ActionsToDoShort                                                           : A realizar
main_ActionsRunningshort                                                        : Started
main_ActionsDoneShort                                                           : Realizadas
main_ActionNotApplicable                                                        : No aplicable
main_ActionRunningNotStarted                                                    : No empezado
main_ActionRunningShort                                                         : Empezado
main_ActionDoneShort                                                            : Terminado
main_CompanyFoundation                                                          : Empresa o institución
main_ContactsForCompany                                                         : Contactos de este tercero
main_ContactsAddressesForCompany                                                : Contactos/direcciones de este tercero
main_AddressesForCompany                                                        : Direcciones de este tercero
main_Address                                                                    : Dirección
main_ActionsOnCompany                                                           : Eventos respecto a este tercero
main_ActionsOnMember                                                            : Eventos respecto a este miembro
main_NActions                                                                   : %s eventos
main_NActionsLate                                                               : %s en retraso
main_Filter                                                                     : Filtro
main_RemoveFilter                                                               : Eliminar filtro
main_ChartGenerated                                                             : Gráficos generados
main_ChartNotGenerated                                                          : Gráfico no generado
main_GeneratedOn                                                                : Generado el %s
main_Generate                                                                   : Generar
main_Duration                                                                   : Duración
main_TotalDuration                                                              : Duración total
main_Summary                                                                    : Resumen
main_MyBookmarks                                                                : Mis marcadores
main_OtherInformationsBoxes                                                     : Otros paneles de información
main_SpeedealingBoard                                                           : Speedealing board
main_SpeedealingStateBoard                                                      : Statistics
main_SpeedealingWorkBoard                                                       : Work tasks board
main_Available                                                                  : Disponible
main_NotYetAvailable                                                            : Aún no disponible
main_NotAvailable                                                               : No disponible
main_Popularity                                                                 : Popularidad
main_Categories                                                                 : Categorías
main_Category                                                                   : Categoría
main_By                                                                         : Por
main_From                                                                       : De
main_to                                                                         : a
main_and                                                                        : y
main_or                                                                         : o
main_Other                                                                      : Otro
main_Others                                                                     : Otros
main_OtherInformations                                                          : Otras informaciones
main_Quantity                                                                   : Cantidad
main_Qty                                                                        : Cant.
main_ChangedBy                                                                  : Modificado por
main_ReCalculate                                                                : Recalcular
main_ResultOk                                                                   : Éxito
main_ResultKo                                                                   : Error
main_Reporting                                                                  : Informe
main_Reportings                                                                 : Informes
main_Draft                                                                      : Borrador
main_Drafts                                                                     : Borradores
main_Validated                                                                  : Validado
main_Opened                                                                     : Abierto
main_New                                                                        : Nuevo
main_Discount                                                                   : Descuento
main_Unknown                                                                    : Desconocido
main_General                                                                    : General
main_Size                                                                       : Tamaño
main_Received                                                                   : Recibido
main_Paid                                                                       : Pagado
main_Topic                                                                      : Asunto
main_ByCompanies                                                                : Por empresa
main_ByUsers                                                                    : Por usuario
main_Links                                                                      : Enlaces
main_Link                                                                       : Enlace
main_Receipts                                                                   : Recibos
main_Rejects                                                                    : Devoluciones
main_Preview                                                                    : Vista previa
main_NextStep                                                                   : Siguiente paso
main_PreviousStep                                                               : Paso anterior
main_Datas                                                                      : Datos
main_None                                                                       : Nada
main_NoneF                                                                      : Ninguna
main_Late                                                                       : Retraso
main_Photo                                                                      : Foto
main_Photos                                                                     : Fotos
main_AddPhoto                                                                   : Añadir foto
main_Login                                                                      : Login
main_CurrentLogin                                                               : Login actual
main_January                                                                    : enero
main_February                                                                   : febrero
main_March                                                                      : marzo
main_April                                                                      : abril
main_May                                                                        : mayo
main_June                                                                       : junio
main_July                                                                       : julio
main_August                                                                     : agosto
main_September                                                                  : septiembre
main_October                                                                    : octubre
main_November                                                                   : noviembre
main_December                                                                   : diciembre
main_JanuaryMin                                                                 : Ene
main_FebruaryMin                                                                : Feb
main_MarchMin                                                                   : Mar
main_AprilMin                                                                   : Abr
main_MayMin                                                                     : May
main_JuneMin                                                                    : Jun
main_JulyMin                                                                    : Jul
main_AugustMin                                                                  : Ago
main_SeptemberMin                                                               : Sep
main_OctoberMin                                                                 : Oct
main_NovemberMin                                                                : Nov
main_DecemberMin                                                                : Dec
main_Month01                                                                    : enero
main_Month02                                                                    : febrero
main_Month03                                                                    : marzo
main_Month04                                                                    : abril
main_Month05                                                                    : mayo
main_Month06                                                                    : junio
main_Month07                                                                    : julio
main_Month08                                                                    : agosto
main_Month09                                                                    : septiembre
main_Month10                                                                    : octubre
main_Month11                                                                    : noviembre
main_Month12                                                                    : diciembre
main_MonthShort01                                                               : ene.
main_MonthShort02                                                               : feb.
main_MonthShort03                                                               : mar.
main_MonthShort04                                                               : abr.
main_MonthShort05                                                               : may.
main_MonthShort06                                                               : jun.
main_MonthShort07                                                               : jul.
main_MonthShort08                                                               : ago.
main_MonthShort09                                                               : sep.
main_MonthShort10                                                               : oct.
main_MonthShort11                                                               : nov.
main_MonthShort12                                                               : dic.
main_AttachedFiles                                                              : Archivos y documentos adjuntos
main_FileTransferComplete                                                       : Se transfirió correctamente el archivo
main_DateFormatYYYYMM                                                           : YYYY-MM
main_DateFormatYYYYMMDD                                                         : YYYY-MM-DD
main_DateFormatYYYYMMDDHHMM                                                     : YYYY-MM-DD HH:SS
main_ReportName                                                                 : Nombre del informe
main_ReportPeriod                                                               : Periodo de análisis
main_ReportDescription                                                          : Descripción
main_Report                                                                     : Informe
main_Keywords                                                                   : Mots clés
main_Legend                                                                     : Leyenda
main_FillTownFromZip                                                            : Indicar población
main_ShowLog                                                                    : Ver histórico
main_File                                                                       : Archivo
main_Files                                                                      : Archivos
main_NotAllowed                                                                 : No autorizado
main_ReadPermissionNotAllowed                                                   : Lectura no autorizada
main_AmountInCurrency                                                           : Importes visualizados en %s
main_Example                                                                    : Ejemplo
main_Examples                                                                   : Ejemplos
main_NoExample                                                                  : Sin ejemplo
main_FindBug                                                                    : Señalar un bug
main_NbOfThirdParties                                                           : Número de terceros
main_NbOfCustomers                                                              : Numero de clientes
main_NbOfLines                                                                  : Números de líneas
main_NbOfObjects                                                                : Número de objetos
main_NbOfReferers                                                               : Número de referencias
main_Referers                                                                   : Referencias
main_TotalQuantity                                                              : Cantidad total
main_DateFromTo                                                                 : De %s a %s
main_DateFrom                                                                   : A partir de %s
main_DateUntil                                                                  : Hasta %s
main_Check                                                                      : Verificar
main_Internal                                                                   : Interno
main_External                                                                   : Externo
main_Internals                                                                  : Internos
main_Externals                                                                  : Externos
main_Warning                                                                    : Alerta
main_Warnings                                                                   : Alertas
main_BuildPDF                                                                   : Generar el PDF
main_RebuildPDF                                                                 : Regenerar el PDF
main_BuildDoc                                                                   : Generar el doc
main_RebuildDoc                                                                 : Regenerar el doc
main_Entity                                                                     : Entidad
main_Entities                                                                   : Entidades
main_EventLogs                                                                  : Log
main_CustomerPreview                                                            : Historial cliente
main_SupplierPreview                                                            : Historial proveedor
main_AccountancyPreview                                                         : Historial contable
main_ShowCustomerPreview                                                        : Ver historial cliente
main_ShowSupplierPreview                                                        : Ver historial proveedor
main_ShowAccountancyPreview                                                     : Ver historial contable
main_ShowProspectPreview                                                        : Ver historial cliente potencial
main_RefCustomer                                                                : Ref. cliente
main_Currency                                                                   : Divisa
main_InfoAdmin                                                                  : Información para los administradores
main_Undo                                                                       : Anular
main_Redo                                                                       : Rehacer
main_ExpandAll                                                                  : Expandir todo
main_UndoExpandAll                                                              : Contraer todo
main_Reason                                                                     : Razón
main_FeatureNotYetSupported                                                     : Funcionalidad aún no soportada
main_CloseWindow                                                                : Cerrar ventana
main_Question                                                                   : Pregunta
main_Response                                                                   : Respuesta
main_Priority                                                                   : Prioridad
main_SendByMail                                                                 : Enviar por e-mail
main_MailSentBy                                                                 : Mail enviado por
main_TextUsedInTheMessageBody                                                   : Texto utilizado en el cuerpo del mensaje
main_SendAcknowledgementByMail                                                  : Enviar recibo por e-mail
main_NoEMail                                                                    : Sin e-mail
main_Owner                                                                      : Propietario
main_DetectedVersion                                                            : Versión detectada
main_FollowingConstantsWillBeSubstituted                                        : Las siguientes constantes serán substituidas por su valor correspondiente.
main_Refresh                                                                    : Refrescar
main_BackToList                                                                 : Volver al listado
main_GoBack                                                                     : Volver atrás
main_CanBeModifiedIfOk                                                          : Puede modificarse si es valido
main_CanBeModifiedIfKo                                                          : Puede modificarse si no es valido
main_RecordModifiedSuccessfully                                                 : Registro modificado con éxito
main_RecordsModified                                                            : %s records modified
main_AutomaticCode                                                              : Creación automática de código
main_NotManaged                                                                 : No generado
main_FeatureDisabled                                                            : Función desactivada
main_MoveBox                                                                    : Desplazar el panel %s
main_Offered                                                                    : Oferta
main_NotEnoughPermissions                                                       : No tiene permisos para esta acción
main_SessionName                                                                : Nombre sesión
main_Method                                                                     : Método
main_Receive                                                                    : Recepción
main_PartialWoman                                                               : Parcial
main_PartialMan                                                                 : Parcial
main_TotalWoman                                                                 : Total
main_TotalMan                                                                   : Total
main_NeverReceived                                                              : Nunca recibido
main_Canceled                                                                   : Cancelado
main_YouCanChangeValuesForThisListFromDictionnarySetup                          : Puede cambiar estos valores en el menú configuración->diccionarios
main_Color                                                                      : Color
main_Documents                                                                  : Documentos
main_DocumentsNb                                                                : archivos aduntjos (%s)
main_Documents2                                                                 : Documentos
main_BuildDocuments                                                             : Documentos generados
main_UploadDisabled                                                             : Subida desactivada
main_MenuECM                                                                    : Documentos
main_MenuAWStats                                                                : AWStats
main_MenuMembers                                                                : Miembros
main_MenuAgendaGoogle                                                           : Agenda Google
main_ThisLimitIsDefinedInSetup                                                  : Límite Speedealing (Menú inicio-configuración-seguridad): %s Kb, PHP limit: %s Kb
main_NoFileFound                                                                : No hay documentos guardados en este directorio
main_CurrentUserLanguage                                                        : Idioma actual
main_CurrentTheme                                                               : Tema actual
main_DisabledModules                                                            : Módulos desactivados
main_For                                                                        : Para
main_ForCustomer                                                                : Para cliente
main_Signature                                                                  : Firma
main_HidePassword                                                               : Mostrar comando con contraseña oculta
main_UnHidePassword                                                             : Mostrar comando con contraseña a la vista
main_Root                                                                       : Raíz
main_Informations                                                               : Información
main_Page                                                                       : Página
main_Notes                                                                      : Notas
main_AddNewLine                                                                 : Añadir nueva línea
main_AddFile                                                                    : Añadir archivo
main_ListOfFiles                                                                : Listado de archivos disponibles
main_FreeZone                                                                   : Zona libre
main_CloneMainAttributes                                                        : Clonar el objeto con estos atributos principales
main_PDFMerge                                                                   : Fusión PDF
main_Merge                                                                      : Fusión
main_PrintContentArea                                                           : Mostrar página de impresión de la zona central
main_NoMenu                                                                     : Ningún submenú
main_WarningYouAreInMaintenanceMode                                             : Atención, está en modo mantenimiento, así que solamente el login <b>%s</b> está autorizado para utilizar la aplicación en este momento.
main_CoreErrorTitle                                                             : Error del sistema
main_CoreErrorMessage                                                           : Lo sentimos, se ha producido un error. Verifique los logs o contacte con el administrador del sistema.
main_CreditCard                                                                 : Tarjeta de crédito
main_FieldsWithAreMandatory                                                     : Los campos marcados por un <b>%s</b> son obligatorios
main_FieldsWithIsForPublic                                                      : Los campos marcados por <b>%s</b> se mostrarán en la lista pública de miembros. Si no desea verlos, desactive la casilla "público".
main_AccordingToGeoIPDatabase                                                   : (Obtenido por conversión GeoIP)
main_Line                                                                       : Línea
main_NotSupported                                                               : No soportado
main_RequiredField                                                              : Campo obligatorio
main_Result                                                                     : Resultado
main_ToTest                                                                     : Probar
main_ValidateBefore                                                             : Para poder usar esta función debe validarse la ficha
main_Visibility                                                                 : Visibilidad
main_Private                                                                    : Privado
main_Hidden                                                                     : Caché
main_Resources                                                                  : Recursos
main_Source                                                                     : Origen
main_Prefix                                                                     : Prefijo
main_Before                                                                     : Antes
main_After                                                                      : Después
main_IPAddress                                                                  : Dirección IP
main_Frequency                                                                  : Frecuencia
main_TicketCenter                                                               : Gestion des tickets
main_NewAttribute                                                               : Nuevo atributo
main_AttributeCode                                                              : Código atributo
main_OptionalFieldsSetup                                                        : Configuración de los atributos opcionales
main_URLPhoto                                                                   : Url de la foto/logo
main_SetLinkToThirdParty                                                        : Vincular a otro tercero
main_CreateDraft                                                                : Crear borrador
main_ClickToEdit                                                                : Clic para editar
main_ObjectDeleted                                                              : Objeto %s eliminado
main_ByCountry                                                                  : Par país
main_ByTown                                                                     : Por población
main_ByDate                                                                     : Por fecha
main_ByMonthYear                                                                : Por mes/año
main_ByYear                                                                     : Por año
main_ByMonth                                                                    : Por mes
main_ByDay                                                                      : Por día
main_BySalesRepresentative                                                      : Por comercial
main_LinkedToSpecificUsers                                                      : Enlazado a un contacto de usuario particular
main_DeleteAFile                                                                : Eliminación de archivo
main_ConfirmDeleteAFile                                                         : Confirma la eliminación del archivo
main_Create                                                                     : Créer
main_Block                                                                      : Bloquer
main_Unblock                                                                    : Débloquer
main_Weeks                                                                      : Semaines
main_To                                                                         : à
main_View                                                                       : Voir
main_Open                                                                       : Ouvrir
main_ControllingPassword                                                        : Connexion en cours...
main_Hello                                                                      : Bonjour
main_Forward                                                                    : Transferir
main_Reply                                                                      : Répondre
main_TimeLeft                                                                   : Temps restant
main_Important                                                                  : Important
main_Dashboard                                                                  : Tableau de bord
main_DownloadPDF                                                                : Télécharger PDF
main_Agenda                                                                     : Agenda
main_PreviousMonth                                                              : Mois précédent
main_NextMonth                                                                  : Mois suivant
main_Download                                                                   : Télécharger
main_Potential                                                                  : Potencial
users_UserCard                                                                  : Ficha usuario
users_ContactCard                                                               : Ficha contacto
users_GroupCard                                                                 : Ficha grupo
users_NoContactCard                                                             : No hay ficha entre los contactos
users_Permission                                                                : Derecho
users_Permissions                                                               : Derechos
users_Password                                                                  : Contraseña
users_EditPassword                                                              : Modificar contraseña
users_SendNewPassword                                                           : Enviar nueva contraseña
users_ReinitPassword                                                            : Generar nueva contraseña
users_PasswordChangedTo                                                         : Contraseña modificada en: %s
users_SubjectNewPassword                                                        : Su contraseña Speedealing
users_AvailableRights                                                           : Permisos disponibles
users_OwnedRights                                                               : Permisos tenidos
users_GroupRights                                                               : Permisos de grupo
users_UserRights                                                                : Permisos usuario
users_UserGUISetup                                                              : Interfaz usuario
users_DisableUser                                                               : Desactivar
users_DisableAUser                                                              : Desactivar un usuario
users_DeleteUser                                                                : Eliminar
users_DeleteAUser                                                               : Eliminar un usuario
users_DisableGroup                                                              : Desactivar
users_DisableAGroup                                                             : Desactivar un grupo
users_EnableAUser                                                               : Reactivar un usuario
users_EnableAGroup                                                              : Reactivar un grupo
users_DeleteGroup                                                               : Eliminar
users_DeleteAGroup                                                              : Eliminar un grupo
users_ConfirmDisableUser                                                        : ¿Está seguro de querer desactivar al usuario <b>%s</b> ?
users_ConfirmDisableGroup                                                       : ¿Está seguro de querer desactivar al grupo <b>%s</b> ?
users_ConfirmDeleteUser                                                         : ¿Está seguro de querer eliminar al usuario <b>%s</b> ?
users_ConfirmDeleteGroup                                                        : ¿Está seguro de querer eliminar al grupo <b>%s</b> ?
users_ConfirmEnableUser                                                         : ¿Está seguro de querer reactivar al usuario <b>%s</b> ?
users_ConfirmEnableGroup                                                        : ¿Está seguro de querer reactivar al grupo <b>%s</b> ?
users_ConfirmReinitPassword                                                     : ¿Está seguro de querer generar una nueva contraseña al usuario <b>%s</b> ?
users_ConfirmSendNewPassword                                                    : ¿Está seguro de querer enviar una nueva contraseña al usuario <b>%s</b> ?
users_NewUser                                                                   : Nuevo usuario
users_CreateUser                                                                : Crear usuario
users_SearchAGroup                                                              : Buscar un grupo
users_SearchAUser                                                               : Buscar un usuario
users_LoginNotDefined                                                           : El usuario no está definido
users_NameNotDefined                                                            : el nombre no está definido
users_ListOfUsers                                                               : Listado de usuarios
users_Administrator                                                             : Administrador
users_SuperAdministrator                                                        : Super Administrador
users_SuperAdministratorDesc                                                    : Administrador global
users_AdministratorDesc                                                         : Administrador de la entidad
users_DefaultRights                                                             : Permisos por defecto
users_DefaultRightsDesc                                                         : Defina aquí los permisos <b>por defecto</b>, es decir: los permisos que se asignarán automáticamente a un nuevo usuario en el momento de su creación (Ver la ficha usuario para cambiar los permisos a un usuario existente).
users_SpeedealingUsers                                                          : Speedealing users
users_Civilite                                                                  : Civilite
users_LastName                                                                  : Apellidos
users_FirstName                                                                 : Nombre
users_ListOfGroups                                                              : Listado de grupos
users_NewGroup                                                                  : Nuevo grupo
users_CreateGroup                                                               : Crear el grupo
users_RemoveFromGroup                                                           : Eliminar del grupo
users_PasswordChangedAndSentTo                                                  : Contraseña cambiada y enviada a <b>%s</b>.
users_PasswordChangeRequestSent                                                 : Petición de cambio de contraseña para <b>%s</b> enviada a <b>%s</b>.
users_MenuUsersAndGroups                                                        : Usuarios y grupos
users_LastGroupsCreated                                                         : Los %s últimos grupos creados
users_LastUsersCreated                                                          : Los %s últimos usuarios creados
users_ShowGroup                                                                 : Ver grupo
users_ShowUser                                                                  : Ver usuario
users_NonAffectedUsers                                                          : Usuarios no destinados al grupo
users_UserModified                                                              : Usuario correctamente modificado
users_GroupModified                                                             : Grupo %s modificado
users_PhotoFile                                                                 : Archivo foto
users_UserWithSpeedealingAccess                                                 : User with Speedealing access
users_ListOfUsersInGroup                                                        : Listado de usuarios de este grupo
users_ListOfGroupsForUser                                                       : Listado de grupos de este usuario
users_UsersToAdd                                                                : Usuario a añadir a este grupo
users_GroupsToAdd                                                               : Grupos a añadir a este usuario
users_NoLogin                                                                   : Sin usuario
users_LinkToCompanyContact                                                      : Enlace terceros / contactos
users_LinkedToSpeedealingMember                                                 : Link to member
users_LinkedToSpeedealingUser                                                   : Link to Speedealing user
users_LinkedToSpeedealingThirdParty                                             : Link to Speedealing third party
users_CreateSpeedealingLogin                                                    : Create a user
users_CreateSpeedealingThirdParty                                               : Create a third party
users_LoginAccountDisable                                                       : La cuenta está desactivada, indique un nuevo login para activarla.
users_LoginAccountDisableInSpeedealing                                          : Account disabled in Speedealing.
users_LoginAccountDisableInLdap                                                 : La cuenta está desactivada en el dominio
users_UsePersonalValue                                                          : Utilizar valores personalizados
users_GuiLanguage                                                               : Idioma del interfaz
users_InternalUser                                                              : Usuario interno
users_MyInformations                                                            : Mi información
users_ExportDataset_user_1                                                      : Usuarios Speedealing y atributos
users_DomainUser                                                                : Usuario de dominio
users_Reactivate                                                                : Reactivar
users_CreateInternalUserDesc                                                    : Esta pantalla permite crear un usuario interno de su empresa/institución. Para crear un usuario externo (cliente, proveedor...) utilice el botón "Crear una cuenta de usuario" que se encuentra en la ficha de contacto del tercero en cuestión.
users_InternalExternalDesc                                                      : Un usuario <b>interno</b> es un usuario que pertenece a su empresa/institución.<br>Un usuario <b>externo</b> es un usuario cliente, proveedor u otro.<br><br>En los 2 casos, los permisos de usuarios definen los derechos de acceso, pero el usuario externo puede además tener  un gestor de menús diferente al usuario interno (véase Inicio - Configuración - Visualización)
users_PermissionInheritedFromAGroup                                             : El permiso se concede ya que lo hereda de un grupo al cual pertenece el usuario.
users_Inherited                                                                 : Heredado
users_UserWillBeInternalUser                                                    : El usuario creado será un usuario interno (ya que no está ligado a un tercero en particular)
users_UserWillBeExternalUser                                                    : El usuario creado será un usuario externo (ya que está ligado a un tercero en particular)
users_IdPhoneCaller                                                             : ID llamante (teléfono)
users_UserLogged                                                                : Usuario %s conectado
users_UserLogoff                                                                : Usuario %s desconectado
users_NewUserCreated                                                            : usuario %s creado
users_NewUserPassword                                                           : Passord cambiado para %s
users_EventUserModified                                                         : Usuario %s modificado
users_UserDisabled                                                              : Usuario %s deshailitado
users_UserEnabled                                                               : Usuario %s activado
users_UserDeleted                                                               : Usuario %s eliminado
users_NewGroupCreated                                                           : Grupo %s creado
users_GroupDeleted                                                              : Grupo %s eliminado
users_ConfirmCreateContact                                                      : ¿Está seguro de querer crear una cuenta Speedealing para este contacto?
users_ConfirmCreateLogin                                                        : ¿Está seguro de que desea crear una cuenta Speedealing para este miembro?
users_ConfirmCreateThirdParty                                                   : ¿Está seguro de querer crear un tercero para este miembro?
users_LoginToCreate                                                             : Login a crear
users_NameToCreate                                                              : Nombre del tercero a crear
users_YourRole                                                                  : Sus roles
users_YourQuotaOfUsersIsReached                                                 : ¡Ha llegado a su cuota de usuarios activos!
users_NbOfUsers                                                                 : Nº de usuarios
users_DontDowngradeSuperAdmin                                                   : Sólo un superadmin puede degradar un superadmin
users_NewDatabase                                                               : Nouvelle base de données
users_CreateDatabase                                                            : Créer la base de données
users_ListOfDatabases                                                           : Liste des bases de données
users_ListOfUsersInDatabase                                                     : Liste des utilisateurs liés à la base de données
users_ListOfRolesInDatabase                                                     : Liste des groupes liés à la base de données
users_DeleteADatabase                                                           : Suppression d'une database
users_ConfirmDatabase                                                           : Êtes-vous sûr de vouloir supprimer la base de données <b>%s</b> ?
users_NonAffectedGroupsDatabase                                                 : Groupes non affectés à la base de données
users_NonAffectedUsersDatabase                                                  : Utilisateurs non affectés à la base de données
users_Collaborators                                                             : Collaborateurs
users_Profiles                                                                  : Profils collaborateurs
users_Gestion des conges / absences                                             : Gestion des conges / absences
users_Databases                                                                 : Base de donnees
users_NewAbsence                                                                : Nouvel absence
users_Employee                                                                  : Empleado
users_Address                                                                   : Dirección
users_Town                                                                      : Población
users_Zip                                                                       : Code Postal
users_Tel-Mobile                                                                : Téléphone Mobile
users_Tel-Fixe                                                                  : Téléphone Fixe
users_Email                                                                     : E-Mail
users_Date-Naissance                                                            : Fecha de nacimiento
users_Ville-Naissance                                                           : Ville de naissance
users_Pays-Naissance                                                            : Pays de naissance
users_Nationnalite                                                              : Nationnalité
users_Situation                                                                 : Situation familiale
users_NbrEnfants                                                                : Nombre Enfants
users_PerCharges                                                                : Personnes à charges
users_Date-Depart                                                               : Date de dèpart
users_Date-Arrivee                                                              : Date d'arrivée
users_Poste                                                                     : Puesto
users_Description-Poste                                                         : Descrption du poste
users_Type-Contrat                                                              : Type de contrat
users_Periode-Essai                                                             : Periode d'essai
users_Salaire-Brut                                                              : Salaire brut
users_Statut                                                                    : Estado
users_Site                                                                      : Site
users_Groupe                                                                    : Grupo
users_Securite-Sociale                                                          : N° de la sécurité sociale
users_Libelle-Bank                                                              : Libelle banque
users_IBAN                                                                      : IBAN
users_Photo                                                                     : Foto
users_Categorie                                                                 : Categorie
users_Temps-Travail                                                             : Temps de travail
users_Niveau-Etude                                                              : Niveau d'études
users_Annee-Diplome                                                             : Année d'obtention
users_Login                                                                     : Login
users_Notes                                                                     : Notas
users_LoginDescription                                                          : L'identifiant qui permet de se connecter à l'application. (unique et sans espace)
users_LoginIsValid                                                              : Ce login est valide.
users_EmailAddressIsValid                                                       : L'adresse e-mail est valide.
users_ErrorLoginAlreadyExists                                                   : Ce login existe déjà !
users_ErrorInvalidLogin                                                         : Ce login n'est pas valide !
users_ErrorInvalidEmailAddress                                                  : L'adresse e-mail n'est pas valide !
users_ErrorGroupAlreadyExists                                                   : Ce groupe existe déjà !
