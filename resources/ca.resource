admin_Version                                                                   : Versió
admin_VersionProgram                                                            : Versió programa
admin_VersionLastInstall                                                        : Versió instal·lació inicial
admin_VersionLastUpgrade                                                        : Versió última actualització
admin_VersionExperimental                                                       : Experimental
admin_VersionDevelopment                                                        : Desenvolupament
admin_VersionUnknown                                                            : Desconeguda
admin_VersionRecommanded                                                        : Recomanada
admin_SessionId                                                                 : Sesió ID
admin_SessionSaveHandler                                                        : Modalitat de salvaguardat de sessions
admin_SessionSavePath                                                           : Localització salvaguardat de sessions
admin_PurgeSessions                                                             : Purga de sessions
admin_ConfirmPurgeSessions                                                      : Vol purgar les sessions. Això desconnectarà a tots els usuaris (excepte a vosté mateix)?
admin_NoSessionListWithThisHandler                                              : El gestor de període de sessions configurat en la seva PHP no enumera les sessions en curs
admin_LockNewSessions                                                           : Bloquejar connexions noves
admin_ConfirmLockNewSessions                                                    : Esteu segur de voler restringir l'accés a Dolibarr al seu usuari? Només el login< b>%s</b> podrà connectar si confirma.
admin_UnlockNewSessions                                                         : Eliminar bloqueig de connexions
admin_YourSession                                                               : La seva sessió
admin_Sessions                                                                  : Sessions d'usuaris
admin_WebUserGroup                                                              : Servidor web usuari/grup
admin_NoSessionFound                                                            : Sembla que el seu PHP no pot llistar les sessions actives. El directori de salvaguardat de sessions (<b>%s</b>) pot estar protegit (per exemple, pels permisos del sistema operatiu o per la directiva open_basedir del seu PHP)
admin_HTMLCharset                                                               : Charset de les pàgines HTML
admin_DBStoringCharset                                                          : Charset base de dades per emmagatzematge de dades
admin_DBSortingCharset                                                          : Charset base de dades per classificar les dades
admin_WarningModuleNotActive                                                    : Mòdul <b>%s</b> no actiu
admin_WarningOnlyPermissionOfActivatedModules                                   : Atenció, només els permisos relacionats amb els mòduls activats s'indiquen aquí. Activar els altres mòduls a la pàgina Configuració->Mòduls
admin_SpeedealingSetup                                                          : Speedealing install or upgrade
admin_SpeedealingUser                                                           : Speedealing user
admin_InternalUser                                                              : Usuari intern
admin_ExternalUser                                                              : Usuari extern
admin_InternalUsers                                                             : Usuaris interns
admin_ExternalUsers                                                             : Usuaris externs
admin_GlobalSetup                                                               : General
admin_GUISetup                                                                  : Entorn
admin_SetupArea                                                                 : Àrea configuració
admin_FormToTestFileUploadForm                                                  : Formulari de prova de càrrega de fitxer (segons opcions escollides)
admin_IfModuleEnabled                                                           : Nota: sí només és eficaç si el mòdul <b>%s</b> està activat
admin_RemoveLock                                                                : Esborreu el fitxer <b>%s</b>, si existeix, per permetre la utilitat d'actualització.
admin_RestoreLock                                                               : Substituir un arxiu <b>%s</b>, donant-li només drets de lectura a aquest arxiu per tal de prohibir noves actualitzacions.
admin_SecuritySetup                                                             : Configuració de la seguretat
admin_ErrorModuleRequirePHPVersion                                              : Error, aquest mòdul requereix una versió %s o superior de PHP
admin_ErrorModuleRequireSpeedealingVersion                                      : Error, this module requires Speedealing version %s or higher
admin_ErrorDecimalLargerThanAreForbidden                                        : Error, les precisions superiors a <b>%s</b> no estan suportades.
admin_DictionnarySetup                                                          : Diccionaris
admin_Dictionnary                                                               : Diccionaris
admin_DisableJavascript                                                         : Desactivar les funcions Javascript
admin_ConfirmAjax                                                               : Utilitzar els popups de confirmació Ajax
admin_UseSearchToSelectCompany                                                  : Utilitzar un formulari de cerca per buscar tercers (en comptes de llista desplegable)<br><br>Tingueu en compte que si té un gran nombre de productes o serveis (> 100 000), pot millorar el rendiment mitjançant la constant SOCIETE_DONOTSEARCH_ANYWHERE a 1 a Configuració-> Varis. La recerca es limitarà llavors a l'inici de la cadena.
admin_ActivityStateToSelectCompany                                              : Afegir un filtre en la recerca per mostrar/ocultar els tercers en actiu o que hagin deixat d'exercir
admin_SearchFilter                                                              : Opcions filtres de cerca
admin_NumberOfKeyToSearch                                                       : Nombre de caràcters per a desencadenar la cerca: %s
admin_ViewFullDateActions                                                       : Veure les dades de les accions en la seva totalitat en la fitxa de tercer
admin_NotAvailableWhenAjaxDisabled                                              : No disponible quan Ajax estigui desactivat
admin_JavascriptDisabled                                                        : Javascript desactivat
admin_UsePopupCalendar                                                          : Utilitzar popups per a la introducció de les dades
admin_UsePreviewTabs                                                            : Veure fitxes "vista prèvia"
admin_ShowPreview                                                               : Veure previsualització
admin_PreviewNotAvailable                                                       : Vista prèvia no disponible
admin_ThemeCurrentlyActive                                                      : Tema actualment actiu
admin_CurrentTimeZone                                                           : Fus horari PHP (Servidor)
admin_Space                                                                     : Àrea
admin_Fields                                                                    : Camps
admin_Mask                                                                      : Màscara
admin_NextValue                                                                 : Pròxim valor
admin_NextValueForInvoices                                                      : Pròxim valor (factures)
admin_NextValueForCreditNotes                                                   : Pròxim valor (notes de lliurament)
admin_MustBeLowerThanPHPLimit                                                   : Observació: El seu PHP limita la mida a <b>%s</b> %s de màxim, qualsevol que sigui el valor d'aquest paràmetre
admin_NoMaxSizeByPHPLimit                                                       : Cap limitació interna en el seu servidor PHP
admin_MaxSizeForUploadedFiles                                                   : Tamany màxim dels documents a pujar (0 per prohibir la pujada)
admin_UseCaptchaCode                                                            : Utilització de codi gràfic (CAPTCHA) en el login
admin_UseAvToScanUploadedFiles                                                  : Utilització d'un antivirus per escanejar els fitxers pujats
admin_AntiVirusCommand                                                          : Ruta completa cap al comandament antivirus
admin_AntiVirusCommandExample                                                   : Exemple per a ClamWin: c:\Program Files (x86)\ClamWin\bin\clamscan.exe<br>Exemple per a ClamAv: /usr/bin/clamscan
admin_AntiVirusParam                                                            : Paràmetres complementaris en la línia de comandes
admin_AntiVirusParamExample                                                     : Exemple per a ClamWin: --database="C:\Program Files (x86)\ClamWin\lib"
admin_ComptaSetup                                                               : Configuració del mòdul Comptabilitat
admin_UserSetup                                                                 : Configuració gestió dels usuaris
admin_MenuSetup                                                                 : Administració dels menús per base de dades
admin_MenuLimits                                                                : Límits i precisió
admin_MenuIdParent                                                              : Id del menú pare
admin_DetailMenuIdParent                                                        : IDr del menú pare (buit per a un menú superior)
admin_DetailPosition                                                            : Número d'ordre per a la posició del menú
admin_PersonalizedMenusNotSupported                                             : Menús personalitzats no generats
admin_AllMenus                                                                  : Tots
admin_NotConfigured                                                             : No configurat
admin_Setup                                                                     : Configuració
admin_Activation                                                                : Activació
admin_Active                                                                    : Actiu
admin_SetupShort                                                                : Config
admin_OtherOptions                                                              : Altres opcions
admin_OtherSetup                                                                : Varis
admin_CurrentValueSeparatorDecimal                                              : Separador decimal
admin_CurrentValueSeparatorThousand                                             : eparador milers
admin_Modules                                                                   : Mòduls
admin_ModulesCommon                                                             : Mòduls principals
admin_ModulesOther                                                              : Mòduls complementaris
admin_ModulesInterfaces                                                         : Mòduls interface
admin_ModulesSpecial                                                            : Mòduls específics
admin_ParameterInSpeedealing                                                    : Parameter %s
admin_LanguageParameter                                                         : Variable idioma %s
admin_LanguageBrowserParameter                                                  : Variable %s
admin_LocalisationSpeedealingParameters                                         : Localisation parameters
admin_ClientTZ                                                                  : Fus horari Client (usuari)
admin_ClientHour                                                                : Hora client (usuari)
admin_OSTZ                                                                      : Fus horari
admin_PHPTZ                                                                     : Fus horari PHP
admin_PHPServerOffsetWithGreenwich                                              : Offset amb Greenwich (segons)
admin_ClientOffsetWithGreenwich                                                 : Offset client/navegador amb Greenwich (segons)
admin_DaylingSavingTime                                                         : Horari d'estiu (usuari)
admin_CurrentHour                                                               : Hora PHP (servidor)
admin_CompanyTZ                                                                 : Zona Horària empresa (seu central)
admin_CompanyHour                                                               : Hora empresa (seu central)
admin_CurrentSessionTimeOut                                                     : Timeout sessió actual
admin_OSEnv                                                                     : Entorn SO
admin_Box                                                                       : Panell
admin_Boxes                                                                     : Panells
admin_MaxNbOfLinesForBoxes                                                      : Nº de línies màxim per als panells
admin_PositionByDefault                                                         : Posició per defecte
admin_Position                                                                  : Ordre
admin_MenusDesc                                                                 : Els gestors de menú defineixen el contingut de les 2 barres de menús (la barra horitzontal i la barra vertical). És possible assignar gestors diferents segons l'usuari sigui intern o extern.
admin_MenusEditorDesc                                                           : L'editor de menús permet definir entrades personalitzades en els menús. S'ha d'utilitzar amb prudència sota pena de posar a Dolibarr en una situació inestable essent necessària una instal·lació per trobar un menú coherent.
admin_MenuForUsers                                                              : Menú per als usuaris
admin_LangFile                                                                  : Archiu .lang
admin_System                                                                    : Sistema
admin_SystemInfo                                                                : Info. sistema
admin_SystemTools                                                               : Utilitats sistema
admin_SystemToolsArea                                                           : Àrea utilitats del sistema
admin_SystemToolsAreaDesc                                                       : Aquesta àrea ofereix diverses funcions d'administració. Utilitzeu el menú per triar la funcionalitat cercada.
admin_PurgeAreaDesc                                                             : Aquesta pàgina li permet eliminar tots els arxius creats o guardats per Dolibarr (arxius temporals o tots els fitxers de la carpeta <b>%s</b>). L'ús d'aquesta funció no és necessària. Es dóna per als usuaris que alberguen Dolibarr en un servidor que no ofereix els permisos d'eliminació d'arxius salvaguardat pel servidor web.
admin_PurgeDeleteLogFile                                                        : Esborrar el fitxer log <b>%s</b> definit pel mòdul Syslog (no hi ha risc de pèrdua de dades)
admin_PurgeDeleteTemporaryFiles                                                 : Eliminar tots els arxius temporals (sense risc de pèrdua de dades)
admin_PurgeDeleteAllFilesInDocumentsDir                                         : Eliminar tots els fitxers de la carpeta <b>%s</b>. Arxius temporals i arxius adjunts a elements (tercers, factures, etc.) Seran eliminats.
admin_PurgeRunNow                                                               : Purgar
admin_PurgeNothingToDelete                                                      : Cap carpeta a eliminar
admin_PurgeNDirectoriesDeleted                                                  : <b>%s</b> arxius o carpetes eliminats
admin_PurgeAuditEvents                                                          : Purgar els esdeveniments de seguretat
admin_ConfirmPurgeAuditEvents                                                   : Esteu segur de voler porgar la llista dels esdeveniments d'auditoria de seguretat. S'esborrarà tota la llista, però això no afecta les seves dades?
admin_NewBackup                                                                 : Nova còpia
admin_GenerateBackup                                                            : Generar còpia
admin_Backup                                                                    : Còpia
admin_Restore                                                                   : Restauració
admin_RunCommandSummary                                                         : La còpia serà realitzada per la comanda següent
admin_RunCommandSummaryToLaunch                                                 : La còpia pot ser realitzada per la comanda següent
admin_WebServerMustHavePermissionForCommand                                     : El seu servidor web ha de tenir els drets d'executar aquesta ordre
admin_BackupResult                                                              : Resultat de la còpia
admin_BackupFileSuccessfullyCreated                                             : Arxiu de còpia generat correctament
admin_YouCanDownloadBackupFile                                                  : Els arxius generats ara poden descarregar
admin_NoBackupFileAvailable                                                     : Cap còpia disponible
admin_ExportMethod                                                              : Mètode d'exportació
admin_ImportMethod                                                              : Mètode d'importació
admin_ToBuildBackupFileClickHere                                                : Per crear una còpia, feu clic <a href="%s">aquí</a>.
admin_ImportMySqlDesc                                                           : Per importar una còpia, cal utilitzar la comanda mysql en línia següent:
admin_ImportPostgreSqlDesc                                                      : Per a importar una còpia de seguretat, useu l'ordre pg_restore des de la línia de comandes:
admin_ImportMySqlCommand                                                        : %s %s < elmeuarxiubackup.sql
admin_ImportPostgreSqlCommand                                                   : %s %s elmeuarxiubackup.sql
admin_FileNameToGenerate                                                        : Nom del fitxer a generar
admin_CommandsToDisableForeignKeysForImport                                     : Comanda per desactivar les claus excloents a la importació
admin_CommandsToDisableForeignKeysForImportWarning                              : Obligatori si vol poder restaurar més tard el dump SQL
admin_ExportCompatibility                                                       : Compatibilitat de l'arxiu d'exportació generat
admin_MySqlExportParameters                                                     : Paràmetres de l'exportació MySql
admin_PostgreSqlExportParameters                                                : Paràmetres de l'exportació PostgreSQL
admin_UseTransactionnalMode                                                     : Utilitzar el mode transaccional
admin_FullPathToMysqldumpCommand                                                : Ruta completa de la comanda mysqldump
admin_FullPathToPostgreSQLdumpCommand                                           : ruta completa cap al comandament pg_dump
admin_ExportOptions                                                             : Opcions d'exportació
admin_AddDropDatabase                                                           : Afegir ordres DROP DATABASE
admin_AddDropTable                                                              : Afegir ordres DROP TABLE
admin_ExportStructure                                                           : Estructura
admin_Datas                                                                     : Dades
admin_NameColumn                                                                : Nom de les columnes
admin_ExtendedInsert                                                            : Instruccions INSERT esteses
admin_NoLockBeforeInsert                                                        : Sense intrucció LOCK abans del INSERT
admin_DelayedInsert                                                             : Insercions amb retard
admin_EncodeBinariesInHexa                                                      : Codificar els camps binaris en hexacesimal
admin_IgnoreDuplicateRecords                                                    : Ignorar els errors de duplicació (INSERT IGNORE)
admin_Yes                                                                       : Sí
admin_No                                                                        : No
admin_AutoDetectLang                                                            : Autodetecció (navegador)
admin_FeatureDisabledInDemo                                                     : Opció deshabilitada en demo
admin_Rights                                                                    : Permisos
admin_BoxesDesc                                                                 : Els panells són petites zones d'informació que hi ha en algunes pàgines. Pot triar activar o desactivar un panell fent clic a 'Activar', o fent click al cubell d'escombraries per desactivar. Només es mostren els panells relacionades amb un <a href="modules.php"> mòdul </a> actiu.
admin_OnlyActiveElementsAreShown                                                : Només els elements de <a href="%s"> mòduls activats</a> són mostrats
admin_ModulesDesc                                                               : Els mòduls Dolibarr defineixen les funcionalitats disponibles en l'aplicació. Alguns mòduls requereixen drets que hauran d'indicar als usuaris perquè puguin accedir a les seves funcionalitats.
admin_ModulesInterfaceDesc                                                      : Els mòduls de interface són mòduls que permeten vincular Dolibarr amb sistemes, aplicacions o serveis externs.
admin_ModulesSpecialDesc                                                        : Els mòduls complementaris són mòduls d'ús molt específic o menys corrent que els mòduls normals.
admin_ModulesJobDesc                                                            : Els mòduls específics permeten una preconfiguració simplificada de Dolibarr per a un negoci en concret.
admin_ModulesMarketPlaceDesc                                                    : Hi ha disponbiles per a baixar en llocs externs d'Internet altres mòduls / extensions...
admin_ModulesMarketPlaces                                                       : Més mòduls...
admin_DoliStoreDesc                                                             : DoliStore, el lloc oficial de mòduls complementaris per Dolibarr ERP / CRM
admin_WebSiteDesc                                                               : Llocs proveïdors a consultar per trobar més mòduls
admin_URL                                                                       : Enllaç
admin_BoxesAvailable                                                            : Panells disponibles
admin_BoxesActivated                                                            : Panells activats
admin_ActivateOn                                                                : Activar a
admin_ActiveOn                                                                  : Actiu a
admin_SourceFile                                                                : Fitxer d'origen
admin_AutomaticIfJavascriptDisabled                                             : Automàtic si el JavaScript està desactivat
admin_AvailableOnlyIfJavascriptNotDisabled                                      : Disponible només si Javascript està activat
admin_AvailableOnlyIfJavascriptAndAjaxNotDisabled                               : Disponible només si Javascript i Ajax estan activats
admin_NotInstalled                                                              : Not installed
admin_Required                                                                  : Requerit
admin_Security                                                                  : Seguretat
admin_Passwords                                                                 : Contrasenyes
admin_DoNotStoreClearPassword                                                   : No emmagatzemar la contrasenya sense xifrar a la base
admin_MainDbPasswordFileConfEncrypted                                           : Encriptar la contrasenya de la base en l'arxiu conf.php
admin_InstrucToEncodePass                                                       : Per tenir la contrasenya de la base de dades codificada en el fitxer de configuració< b> conf.php </b>, reemplaçar en aquest fitxer la línia <br><b>$dolibarr_main_db_pass="..."</b><br> per <br><b>$dolibarr_main_db_pass="crypted:%s"</b>
admin_InstrucToClearPass                                                        : Per tenir la contrasenya de la base de dades descodificat en el fitxer de configuració b> conf.php </b>, reemplaçar en aquest fitxer la línia <br><b>$dolibarr_main_db_pass="crypted:..."</b><br> per <br><b>$dolibarr_main_db_pass="%s"</b>
admin_ProtectAndEncryptPdfFiles                                                 : Protecció i encriptació dels pdf generats
admin_ProtectAndEncryptPdfFilesDesc                                             : La protecció d'un document pdf deixa el document lliure a la lectura ia la impressió a qualsevol lector de PDF. Per contra, la modificació i la còpia resulten impossibles.
admin_Feature                                                                   : Funció
admin_SpeedealingLicense                                                        : License
admin_SpeedealingProjectLeader                                                  : Project leader
admin_Developpers                                                               : Desenvolupadors/col·laboradors
admin_OtherDeveloppers                                                          : Altres desenvolupadors/col·laboradors
admin_OfficialWebSite                                                           : Lloc web oficial internacional
admin_OfficialWebSiteFr                                                         : lloc web oficial francòfon
admin_OfficialWiki                                                              : Wiki Dolibarr
admin_OfficialDemo                                                              : Demo en línia Dolibarr
admin_OfficialMarketPlace                                                       : Lloc oficial de mòduls complementaris i extensions
admin_OfficialWebHostingService                                                 : Servei oficial d'allotjament (SaaS)
admin_ForDocumentationSeeWiki                                                   : Per a la documentació d'usuari, desenvolupador o Preguntes Freqüents (FAQ), consulteu el wiki Dolibarr: <br><b><a href="%s" target="_blank">%s</a></b>
admin_ForAnswersSeeForum                                                        : Per altres qüestions o realitzar les seves pròpies consultes, pot utilitzar el fòrum Dolibarr: <br><b><a href="%s" target="_blank">%s</a></b>
admin_HelpCenterDesc1                                                           : Aquesta aplicació, independent de Dolibarr, us permet ajudar a obtenir un servei de suport de Dolibarr.
admin_HelpCenterDesc2                                                           : Alguns d'aquests serveis només estan disponibles en <b>anglès</b>.
admin_CurrentTopMenuHandler                                                     : Gestor de menú superior
admin_CurrentLeftMenuHandler                                                    : Gestor de menú esquerre
admin_CurrentMenuHandler                                                        : Gestor de menú
admin_CurrentSmartphoneMenuHandler                                              : Gestor menú smartphone actual
admin_MeasuringUnit                                                             : Unitat de mesura
admin_Emails                                                                    : E-Mails
admin_EMailsSetup                                                               : Configuració E-Mails
admin_EMailsDesc                                                                : Aquesta pàgina permet substituir els paràmetres PHP relacionats amb l'enviament de correus electrònics. En la majoria dels casos en SO com UNIX/Linux, els paràmetres PHP són ja correctes i aquesta pàgina és inútil.
admin_MAIN_MAIL_SMTP_PORT                                                       : Port del servidor SMTP (Per defecte a php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_SERVER                                                     : Nom host o ip del servidor SMTP (Per defecte en php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_PORT_NotAvailableOnLinuxLike                               : Port del servidor SMTP (No definit en PHP en sistemes de tipus Unix)
admin_MAIN_MAIL_SMTP_SERVER_NotAvailableOnLinuxLike                             : Nom servidor o ip del servidor SMTP (No definit en PHP en sistemes de tipus Unix)
admin_MAIN_MAIL_EMAIL_FROM                                                      : Correu electrònic de l'emissor per trameses e automàtics (Per defecte en php.ini: <b>%s</b>)
admin_MAIN_MAIL_ERRORS_TO                                                       : E-Mail usat per als retorns d'error dels e-mails enviats
admin_MAIN_MAIL_AUTOCOPY_TO                                                     : Enviar automàticament còpia oculta dels e-mails enviats a
admin_MAIN_DISABLE_ALL_MAILS                                                    : Desactivar globalment tot enviament de correus electrònics (per mode de proves)
admin_MAIN_MAIL_SENDMODE                                                        : Mètode d'enviament d'e-mails
admin_MAIN_MAIL_SMTPS_ID                                                        : ID d'autenticació SMTP si es requereix autenticació SMTP
admin_MAIN_MAIL_SMTPS_PW                                                        : Contrasenya autentificació SMTP si es requereix autenticació SMTP
admin_MAIN_MAIL_EMAIL_TLS                                                       : Ús d'encriptació TLS (SSL)
admin_MAIN_DISABLE_ALL_SMS                                                      : Desactivar globalment tot enviament de SMS (per mode de proves o demo)
admin_MAIN_SMS_SENDMODE                                                         : Mètode d'enviament de SMS
admin_MAIN_MAIL_SMS_FROM                                                        : Número de telèfon per defecte per als enviaments SMS
admin_FeatureNotAvailableOnLinux                                                : Funcionalitat no disponible en sistemes Unix. Proveu el seu sendmail localment.
admin_SubmitTranslation                                                         : Si la traducció d'aquest idioma no està completa o troba errors, pot corregir editant els arxius en el directori<b>langs/%s</b> i enviant els arxius modificats al fòrum de www.dolibarr.es.
admin_ModuleSetup                                                               : Configuració del mòdul
admin_ModulesSetup                                                              : configuració dels mòduls
admin_ModuleFamilyBase                                                          : Sistema
admin_ModuleFamilyCrm                                                           : Gestió client (CRM)
admin_ModuleFamilyProducts                                                      : Gestió productes
admin_ModuleFamilyHr                                                            : Recursos Humans
admin_ModuleFamilyProjects                                                      : Projectes/Treball cooperatiu
admin_ModuleFamilyOther                                                         : Altre
admin_ModuleFamilyTechnic                                                       : Mòduls eines o Sistema
admin_ModuleFamilyExperimental                                                  : Mòduls experimentals (no utilitzar en producció)
admin_ModuleFamilyFinancial                                                     : Mòduls financers (Comptabilitat/tresoreria)
admin_ModuleFamilyECM                                                           : Gestió Electrònica de Documents (GED)
admin_MenuHandlers                                                              : Gestors de menú
admin_MenuAdmin                                                                 : Editor de menú
admin_DoNotUseInProduction                                                      : Do not use in production
admin_ThisIsProcessToFollow                                                     : Heus aquí el procediment a seguir:
admin_StepNb                                                                    : Pas %s
admin_FindPackageFromWebSite                                                    : Cercar el paquet que respon a la seva necessitat (per exemple en el lloc web %s)
admin_DownloadPackageFromWebSite                                                : Descarregar el paquet des del lloc %s.
admin_UnpackPackageInSpeedealingRoot                                            : Unpack package file into Speedealing's root directory <b>%s</b>
admin_SetupIsReadyForUse                                                        : La instal·lació ha finalitzat i Dolibarr està disponible amb el nou component.
admin_NotExistsDirect                                                           : No existeix el directori alternatiu.<br>
admin_InfDirAlt                                                                 : Des de la versió 3 és possible definir un directori root alternatiu, això li permet emmagatzemar en el mateix lloc mòduls i temes personalitzades.<br>Només cal crear un directori en l'arrel de Dolibarr (per exemple: custom).<br>
admin_InfDirExample                                                             : <br>Seguidament es declara a l'arxiu conf.php:<br> $dolibarr_main_url_root_alt='http://miservidor/custom'<br>$dolibarr_main_document_root_alt='/directorio/de/dolibarr/htdocs/custom'<br>*Aquestes línies venen comentades amb un "#", per descomentar-les només cal retirar el caràcter.
admin_YouCanSubmitFile                                                          : Seleccioneu mòdul:
admin_CurrentVersion                                                            : Versió actual de Dolibarr
admin_CallUpdatePage                                                            : Trucar a la pàgina d'actualització de l'estructura i dades de la base de dades %s.
admin_LastStableVersion                                                         : Última versió estable disponible
admin_GenericMaskCodes                                                          : Podeu introduir qualsevol màscara numèrica. En aquesta màscara, pot utilitzar les següents etiquetes:<br><b>{000000}</b> correspon a un número que s'incrementa en cadascun %s. Introduïu tants zeros com longuitud desitgi mostrar. El comptador es completarà a partir de zeros per l'esquerra per tal de tenir tants zeros com la màscara. <br><b>{000000+000}</b>Igual que l'anterior, amb una compensació corresponent al número a la dreta del signe + s'aplica a partir del primer %s.<br><b>{000000@x}</b>igual que l'anterior, però el comptador es restableix a zero quan s'arriba a x mesos (x entre 1 i 12). Si aquesta opció s'utilitza i x és de 2 o superior, llavors la seqüència {yy}{mm} ó {yyyy}{mm} també és necessària.<br><b>  {dd}  </b> dies (01 a 31).<br><b> {mm}</b> mes (01 a 12).<br><b> {yy} </ b>, <b> {yyyy</ b> ó <b>{y} </b> any en 2, 4 ó 1 xifra.<br>
admin_GenericMaskCodes2                                                         : <b>{cccc}</b> el codi de client en n caràcters <br> <b>{cccc000}</b> el codi de client en n caràcter és seguit per un comptador propi al client sense offset, completat amb zeros fins a completar la màscara, i tornant a zero al mateix temps que el comptador global.<br><b>{tttt}</b>El codi del tipus de l'empresa en n caràcters (vegeu diccionaris-tipus d'empreses).<br>
admin_GenericMaskCodes3                                                         : Qualsevol altre caràcter a la màscara es quedarà sense canvis. <br> No es permeten espais<br>
admin_GenericMaskCodes4a                                                        : <u>Exemple a la 99ª %s del tercer L'Empresa realitzada el 31/03/2007: </u> <br>
admin_GenericMaskCodes4b                                                        : <u>Exemple sobre un tercer creat el 31/03/2007: </u> <br>
admin_GenericMaskCodes4c                                                        : <u>Exemple en un producte/servei creat el 31/03/2007:</u><br>
admin_GenericMaskCodes5                                                         : <b>ABC{yy}{mm}-{000000}</b> donarà <b>ABC0703-000099</b><br><b>{0000+100}-XXX/{dd}/YYY</b> donarà <b>0199-XXX/31/YYY</b>
admin_GenericNumRefModelDesc                                                    : Retorna un nombre creat d'acord amb una màscara definida.
admin_ServerAvailableOnIPOrPort                                                 : Servidor disponible a l'adreça <b>%s</b> al port <b>%s</b>
admin_ServerNotAvailableOnIPOrPort                                              : Servidor no disponible en l'adreça <b>%s</b> al port <b>%s</b>
admin_DoTestServerAvailability                                                  : Provar la connexió amb el servidor
admin_DoTestSend                                                                : Provar enviament
admin_DoTestSendHTML                                                            : Probar enviament HTML
admin_ErrorCantUseRazInStartedYearIfNoYearMonthInMask                           : Error, no es pot usar opció @ si la seqüència (yy) (mm) o (yyyy) (mm) no es troba a la màscara.
admin_UMask                                                                     : Paràmetre UMask de nous fitxers en Unix/Linux/BSD.
admin_UMaskExplanation                                                          : Aquest paràmetre determina els drets dels arxius creats en el servidor Dolibarr (durant la pujada, per exemple).<br>Aquest ha de ser el valor octal (per exemple, 0666 significa lectura/escriptura per a tots).<br>Aquest paràmetre no té cap efecte sobre un servidor Windows.
admin_SeeWikiForAllTeam                                                         : Mireu el wiki per a més detalls de tots els actors i de la seva organització
admin_UseACacheDelay                                                            : Demora en memòria cau de l'exportació en segons (0 o buit sense memòria)
admin_DisableLinkToHelpCenter                                                   : Amagar l'enllaç "Necessita suport o ajuda" a la pàgina de login
admin_DisableLinkToHelp                                                         : Amaga l'enllaç "<b>%s Ajuda en línia </b>" del menú de l'esquerra
admin_AddCRIfTooLong                                                            : No hi ha línies de tall automàtic, de manera que si el text és massa llarg en els documents, cal afegir els seus propis retorns de carro en el text mecanografiat.
admin_ModuleDisabled                                                            : Mòdul desactivat
admin_ModuleDisabledSoNoEvent                                                   : Mòdul desactivat, per la qual cosa el esdeveniment mai es crea
admin_ConfirmPurge                                                              : Esteu segur de voler realitzar aquesta purga? <br> Això esborrarà definitivament totes les dades dels seus fitxers (àrea GED, arxius adjunts etc.).
admin_MinLength                                                                 : Longuitud mínima
admin_LanguageFilesCachedIntoShmopSharedMemory                                  : arxius .lang en memòria compartida
admin_ExamplesWithCurrentSetup                                                  : Exemples amb la configuració activa actual
admin_ListOfDirectories                                                         : Llistat de directoris de plantilles OpenDocument
admin_ListOfDirectoriesForModelGenODT                                           : Llistat de directoris amb documents model OpenDocument.<br><br>Indiqueu el camí complet del directori.<br>Afegir un retorn a la línia entre cada directori.<b>Per indicar un directori del mòdul GED, indiqueu <b>DOL_DATA_ROOT/ecm/nomdeldirectori</b>.<br><br>Els arxius de plantilla d'aquests directoris han d'acabar amb <b>.odt</b>
admin_NumberOfModelFilesFound                                                   : Nombre d'arxius de plantilles ODT trobats en aquest(s) directori(s)
admin_ExampleOfDirectoriesForModelGen                                           : Exemples de sintaxi:<br>c:\mydir<br>/home/mydir<br>DOL_DATA_ROOT/ecm/ecmdir
admin_FollowingSubstitutionKeysCanBeUsed                                        : Posant les següents etiquetes a la plantilla, obtindrà una substitució amb el valor personalitzat en generar el document:
admin_FullListOnOnlineDocumentation                                             : http://wiki.dolibarr.org/index.php/Crear_un_modelo_de_documento_ODT
admin_FirstnameNamePosition                                                     : Ordre visualització nom/cognoms
admin_DescWeather                                                               : Els següents gràfics es mostraran en el panell si el nombre d'elements arriben a aquests valors:
admin_KeyForWebServicesAccess                                                   : clau per usar els Web Services (paràmetre "dolibarrkey" a webservices)
admin_TestSubmitForm                                                            : Formulari de proves
admin_ThisForceAlsoTheme                                                        : Utilitzar aquest gestor de menús predetermina també el tema, sigui quina sigui l'elecció de l'usuari. A més, aquest gestor de menús, especial per a smartphones, només funciona en alguns telèfons. Utilitzar un altre gestor Si veieu qualsevol problema.
admin_ThemeDir                                                                  : Directori dels temes
admin_ConnectionTimeout                                                         : Timeout de connexió
admin_ResponseTimeout                                                           : Timeout de resposta
admin_SmsTestMessage                                                            : Missatge de prova de __PHONEFROM__ per __PHONETO__
admin_ModuleMustBeEnabledFirst                                                  : Per utilitzar aquesta funció ha d'estar activat el mòdul <b>%s</b>.
admin_SecurityToken                                                             : Clau per encriptar urls
admin_NoSmsEngine                                                               : No hi ha cap gestor d'enviament de SMS. Els gestors d'enviament de SMS no s'instal·len en estàndard (ja que depenen d'un proveïdor), però pot trobar a la plataforma http://www.dolistore.com
admin_PDF                                                                       : PDF
admin_PDFDesc                                                                   : Podeu definir aquí les opcions globals per a la generació dels PDF
admin_PDFAddressForging                                                         : Regles de visualització d'adreces
admin_HideAnyVATInformationOnPDF                                                : Amagar tota la informació relacionada amb l'IVA en la generació dels PDF
admin_HideDescOnPDF                                                             : Amagar descripció dels productes en la generació dels PDF
admin_HideRefOnPDF                                                              : Amagar referència dels productes en la generació dels PDF
admin_HideDetailsOnPDF                                                          : Amagar detalls de les línies de productes en la generació dels PDF
admin_UrlGenerationParameters                                                   : Seguretat de les URL
admin_SecurityTokenIsUnique                                                     : Fer servir un paràmetre securekey únic per a cada URL?
admin_EnterRefToBuildUrl                                                        : Introduïu la referència de l'objecte %s
admin_GetSecuredUrl                                                             : Obtenir la URL calculada
admin_ButtonHideUnauthorized                                                    : Amaga els botons d'accions no autoritzades en compte de mostrar-los atenuats
admin_TotalNumberOfActivatedModules                                             : Nombre total de mòduls activats: <b>%s</b>
admin_YouMustEnableOneModule                                                    : Ha d'activar almenys 1 mòdul.
admin_ModulesSystemTools                                                        : Mòduls utilitats
admin_ProductVatMassChange                                                      : Modificar IVA en massa
admin_ProductVatMassChangeDesc                                                  : Aquesta pàgina us permet canviar el tipus d'IVA definit en els productes o serveis d'un valor a un altre. Tingueu en compte que el canvi es fa en massa sobre tota la base de dades.
admin_OldVATRates                                                               : Taxa d'IVA antiga
admin_NewVATRates                                                               : Taxa d'IVA nova
admin_PriceBaseTypeToChange                                                     : Canviar el preu on la referència de base és
admin_MassConvert                                                               : Convertir massivament
admin_String                                                                    : Cadena
admin_TextLong                                                                  : Text llarg
admin_Int                                                                       : numèric enter
admin_Float                                                                     : Decimal
admin_DateAndTime                                                               : Data i hora
admin_Structure                                                                 : Structure
admin_Module0Name                                                               : Usuaris y grups
admin_Module0Desc                                                               : Gestió d'usuaris i grups
admin_Module1Name                                                               : Tercers
admin_Module1Desc                                                               : Gestió de tercers (empreses, particulars) i contactes
admin_Module2Name                                                               : Comercial
admin_Module2Desc                                                               : Gestió comercial
admin_Module10Name                                                              : Comptabilitat
admin_Module10Desc                                                              : Gestió simple de la comptabilitat (desglossament de factures i pagaments)
admin_Module20Name                                                              : Pressupostos
admin_Module20Desc                                                              : Gestió de pressupostos/propostes comercials
admin_Module22Name                                                              : E-Mailings
admin_Module22Desc                                                              : Administració i enviament d'E-Mails massius
admin_Module23Name                                                              : Energia
admin_Module23Desc                                                              : Realitza el seguiment del consum d'energies
admin_Module25Name                                                              : Comandes de clients
admin_Module25Desc                                                              : Gestió de comandes de clients
admin_Module30Name                                                              : Factures i abonaments
admin_Module30Desc                                                              : Gestió de factures i abonaments de clients. Gestió factures de proveïdors
admin_Module40Name                                                              : Proveïdors
admin_Module40Desc                                                              : Gestió de proveïdors
admin_Module42Name                                                              : Syslog
admin_Module42Desc                                                              : Generació de logs (arxius, syslog,...)
admin_Module49Name                                                              : Editors
admin_Module49Desc                                                              : Gestió d'editors
admin_Module50Name                                                              : Productes
admin_Module50Desc                                                              : Gestió de productes
admin_Module51Name                                                              : Publipostage
admin_Module51Desc                                                              : Administració i enviament de correu de paper en massa
admin_Module52Name                                                              : Stocks de productes
admin_Module52Desc                                                              : Gestió de stocks de productes
admin_Module53Name                                                              : Serveis
admin_Module53Desc                                                              : Gestió de serveis
admin_Module54Name                                                              : Contractes
admin_Module54Desc                                                              : Gestió de contractes
admin_Module55Name                                                              : Codis de barra
admin_Module55Desc                                                              : Gestió dels codis de barra
admin_Module56Name                                                              : Telefonia
admin_Module56Desc                                                              : Gestió de la telefonia
admin_Module57Name                                                              : Domiciliacions
admin_Module57Desc                                                              : Gestió de domiciliacions i reintegraments bancaris
admin_Module58Name                                                              : ClickToDial
admin_Module58Desc                                                              : Integració amb ClickToDial
admin_Module59Name                                                              : Bookmark4u
admin_Module59Desc                                                              : Afegeix funció per generar un compte Bookmark4u des d'un compte Dolibarr
admin_Module70Name                                                              : Intervencions
admin_Module70Desc                                                              : Gestió de les intervencions a tercers
admin_Module75Name                                                              : Notes de despeses i desplaçaments
admin_Module75Desc                                                              : Gestió de les notes de despeses i desplaçaments
admin_Module80Name                                                              : Expedicions
admin_Module80Desc                                                              : Gestió d'expedicions i recepcions
admin_Module85Name                                                              : Bancs i caixes
admin_Module85Desc                                                              : Gestió dels comptes financers de tipus comptes bancaris, postals o efectiu
admin_Module100Name                                                             : External site
admin_Module100Desc                                                             : Inclou qualsevol lloc web extern en els menús de Dolibarr, veient-lo en un frame
admin_Module105Name                                                             : Mailman i SPIP
admin_Module105Desc                                                             : Interface amb Mailman o SPIP per al mòdul Membres
admin_Module200Name                                                             : LDAP
admin_Module200Desc                                                             : sincronització amb un anuari LDAP
admin_Module210Name                                                             : PostNuke
admin_Module210Desc                                                             : Integració amb PostNuke
admin_Module240Name                                                             : Exportacions de dades
admin_Module240Desc                                                             : Eina d'exportacions de dades Dolibarr (amb assistent)
admin_Module250Name                                                             : Importació de dades
admin_Module250Desc                                                             : Eina d'importació de dades a Dolibarr (amb assistent)
admin_Module310Name                                                             : Membres
admin_Module310Desc                                                             : Gestió de membres d'una associació
admin_Module320Name                                                             : Fils RSS
admin_Module320Desc                                                             : Addició de fils d'informació RSS en les pantalles Dolibarr
admin_Module330Name                                                             : Bookmarks
admin_Module330Desc                                                             : Gestió de bookmarks
admin_Module400Name                                                             : Projectes
admin_Module400Desc                                                             : Gestió dels projectes en els altres mòduls
admin_Module410Name                                                             : Webcalendar
admin_Module410Desc                                                             : Interface amb el calendari webcalendar
admin_Module420Name                                                             : Affaires
admin_Module420Desc                                                             : Gestion des affaires
admin_Module430Name                                                             : Gestion d'équipes
admin_Module430Desc                                                             : Gestion des objectifs
admin_Module500Name                                                             : Impostos, càrregues socials i dividends
admin_Module500Desc                                                             : Gestió d'impostos i càrregues socials
admin_Module600Name                                                             : Notificacions
admin_Module600Desc                                                             : Enviament de notificacions (per correu electrònic) sobre els esdeveniments de treball Dolibarr
admin_Module700Name                                                             : Donacions
admin_Module700Desc                                                             : Gestió de donacions
admin_Module1400Name                                                            : Comptabilitat experta
admin_Module1400Desc                                                            : Gestió experta de la comptabilitat (doble partida)
admin_Module1780Name                                                            : Categories
admin_Module1780Desc                                                            : Gestió de categories (productes, proveïdors i clients)
admin_Module2000Name                                                            : Editor WYSIWYG
admin_Module2000Desc                                                            : Permet l'edició de certes zones de text mitjançant un editor avançat
admin_Module2200Name                                                            : Dret de préstecs
admin_Module2200Desc                                                            : Gestió dels drets de préstecs
admin_Module2300Name                                                            : Menús
admin_Module2300Desc                                                            : Administració dels menús per base de dades
admin_Module2400Name                                                            : Agenda
admin_Module2400Desc                                                            : Gestió de l'agenda i de les accions
admin_Module2500Name                                                            : Gestió Electrònica de Documents
admin_Module2500Desc                                                            : Permet administrar una base de documents
admin_Module2600Name                                                            : WebServices
admin_Module2600Desc                                                            : Activa els serveis de servidor web services de Dolibarr
admin_Module2700Name                                                            : Gravatar
admin_Module2700Desc                                                            : Utilitza el servei en línia de Gravatar (www.gravatar.com) per mostrar fotos dels usuaris/membres (que es troben en els seus missatges de correu electrònic). Necessita un accés a Internet
admin_Module2900Name                                                            : GeoIPMaxmind
admin_Module2900Desc                                                            : Capacitats de conversió GeoIP Maxmind
admin_Module5000Name                                                            : Multi-empresa
admin_Module5000Desc                                                            : Permet gestionar diverses empreses
admin_Module20000Name                                                           : Dies lliures
admin_Module20000Desc                                                           : Gestió dels dies lliures dels empleats
admin_Module50000Name                                                           : PayBox
admin_Module50000Desc                                                           : Mòdul per a proporcionar un pagament en línia amb targeta de crèdit mitjançant Paybox
admin_Module50100Name                                                           : TPV
admin_Module50100Desc                                                           : Terminal Punt de Venda per a la venda al taulell
admin_Module50200Name                                                           : Paypal
admin_Module50200Desc                                                           : Mòdul per a proporcionar un pagament en línia amb targeta de crèdit mitjançant Paypal
admin_Module59000Name                                                           : Márgenes
admin_Module59000Desc                                                           : Mòdul per gestionar els marges de benefici
admin_Module60000Name                                                           : Comissions
admin_Module60000Desc                                                           : Mòdul per gestionar les comissions
admin_Permission11                                                              : Consultar factures
admin_Permission12                                                              : Crear/Modificar factures
admin_Permission13                                                              : Devalidar factures
admin_Permission14                                                              : Validar factures
admin_Permission15                                                              : Enviar factures per correu
admin_Permission16                                                              : Emetre pagaments de factures
admin_Permission19                                                              : Eliminar factures
admin_Permission21                                                              : Consultar pressupostos
admin_Permission22                                                              : Crear/modificar pressupostos
admin_Permission24                                                              : Validar pressupostos
admin_Permission25                                                              : Enviar els pressupostos
admin_Permission26                                                              : Tancar pressupostos
admin_Permission27                                                              : Eliminar pressupostos
admin_Permission28                                                              : Exportar els pressupostos
admin_Permission31                                                              : Consultar productes
admin_Permission32                                                              : Crear/modificar productes
admin_Permission34                                                              : Eliminar productes
admin_Permission36                                                              : Veure/gestionar els productes ocults
admin_Permission38                                                              : Exportar productes
admin_Permission41                                                              : Consultar projectes i tasques (compartits o és contacte)
admin_Permission42                                                              : Crear/modificar projectes i tasques (compartits o és contacte)
admin_Permission44                                                              : Eliminar projectes i tasques (compartits o és contacte)
admin_Permission61                                                              : Consultar intervencions
admin_Permission62                                                              : Crear/modificar intervencions
admin_Permission64                                                              : Eliminar intervencions
admin_Permission67                                                              : Exporta intervencions
admin_Permission71                                                              : Consultar membres
admin_Permission72                                                              : Crear/modificar membres
admin_Permission74                                                              : Eliminar membres
admin_Permission75                                                              : Configurar tipus i atributs dels membres
admin_Permission76                                                              : Exportar membres
admin_Permission78                                                              : Consultar cotitzacions
admin_Permission79                                                              : Crear/modificar cotitzacions
admin_Permission81                                                              : Consultar comandes de clients
admin_Permission82                                                              : Crear/modificar comandes de clients
admin_Permission84                                                              : Validar comandes de clients
admin_Permission86                                                              : Enviar comandes de clients
admin_Permission87                                                              : Tancar comandes de clients
admin_Permission88                                                              : Anul·lar comandes de clients
admin_Permission89                                                              : Eliminar comandes de clients
admin_Permission91                                                              : Consultar impostos i IVA
admin_Permission92                                                              : Crear/modificar impostos i IVA
admin_Permission93                                                              : Eliminar impostos i IVA
admin_Permission94                                                              : Exporta impostos
admin_Permission95                                                              : Consultar balanços i resultats
admin_Permission96                                                              : Parametritzar desglossament
admin_Permission97                                                              : Llegir línies de factures
admin_Permission98                                                              : Desglossar línies de factures
admin_Permission101                                                             : Consultar expedicions
admin_Permission102                                                             : Crear/modificar expedicions
admin_Permission104                                                             : Validar expedicions
admin_Permission109                                                             : Eliminar expedicions
admin_Permission111                                                             : Consultar comptes financers (comptes bancaris, caixes)
admin_Permission112                                                             : Crear/modificar quantitat/eliminar registres bancaris
admin_Permission113                                                             : Configuració de comptes financers (crear, controlar les categories)
admin_Permission114                                                             : Exporta transaccions i registres bancaris
admin_Permission115                                                             : Exporta transaccions i extractes
admin_Permission116                                                             : Captar transferències entre comptes
admin_Permission117                                                             : Gestionar enviament de xecs
admin_Permission121                                                             : Consultar empreses
admin_Permission122                                                             : Crear/modificar empreses
admin_Permission125                                                             : Eliminar empreses
admin_Permission126                                                             : Exportar les empreses
admin_Permission141                                                             : Consultar tots els projectes i tasques (incloent-hi els privats dels que no sigui contacte)
admin_Permission142                                                             : Crear/modificar tots els projectes i tasques (incloent-hi els privats dels que no sigui contacte)
admin_Permission144                                                             : Eliminar tots els projectes i tasques (incloent-hi els privats dels que no sigui contacte)
admin_Permission146                                                             : Consultar proveïdors
admin_Permission147                                                             : Consultar estadístiques
admin_Permission151                                                             : Consultar domiciliacions
admin_Permission152                                                             : Crear/modificar domiciliacions
admin_Permission153                                                             : Enviar domiciliacions
admin_Permission154                                                             : Abonar/tornar domiciliacions
admin_Permission161                                                             : Consultar contractes de servei
admin_Permission162                                                             : Crear/modificar contractes de servei
admin_Permission163                                                             : Activar els serveis d'un contracte
admin_Permission164                                                             : Desactivar els serveis d'un contracte
admin_Permission165                                                             : Eliminar contractes
admin_Permission171                                                             : Llegir els desplaçaments
admin_Permission172                                                             : Crear/modificar els desplaçaments
admin_Permission173                                                             : Eliminar desplaçaments
admin_Permission178                                                             : Exportar desplaçaments
admin_Permission180                                                             : Consultar proveïdors
admin_Permission181                                                             : Consultar comandes a proveïdors
admin_Permission182                                                             : Crear/modificar comandes a proveïdors
admin_Permission183                                                             : Validar comandes a proveïdors
admin_Permission184                                                             : Aprovar comandes a proveïdors
admin_Permission185                                                             : Enviar comandes a proveïdors
admin_Permission186                                                             : Rebre comandes de proveïdors
admin_Permission187                                                             : Tancar comandes a proveïdors
admin_Permission188                                                             : Anul·lar comandes a proveïdors
admin_Permission192                                                             : Crear línies
admin_Permission193                                                             : Cancel·lar línies
admin_Permission194                                                             : Consultar l'ample de banda de línies
admin_Permission202                                                             : Crear connexions ADSL
admin_Permission203                                                             : Realitzar comanda de connexions
admin_Permission204                                                             : Demanar connexions
admin_Permission205                                                             : Gestionar connexions
admin_Permission206                                                             : Consultar connexions
admin_Permission211                                                             : Consultar telefonia
admin_Permission212                                                             : Demanar línies
admin_Permission213                                                             : Activar una línia
admin_Permission214                                                             : Configurar la telefonia
admin_Permission215                                                             : Configurar proveïdors
admin_Permission221                                                             : Consultar E-Mails
admin_Permission222                                                             : Crear/modificar E-Mails (assumpte, destinataris, etc.)
admin_Permission223                                                             : Validar E-Mails (permet l'enviament)
admin_Permission229                                                             : Eliminar E-Mails
admin_Permission237                                                             : Veure els destinataris i la informació
admin_Permission238                                                             : Enviar els e-mails manualment
admin_Permission239                                                             : Eliminar els e-mails després de la seva validació o el seu enviament
admin_Permission241                                                             : Consultar categories
admin_Permission242                                                             : Crear/modificar categories
admin_Permission243                                                             : Eliminar categories
admin_Permission244                                                             : Veure contingut de categories ocultes
admin_Permission251                                                             : Consultar altres usuaris
admin_PermissionAdvanced251                                                     : Consultar altres usuaris
admin_Permission252                                                             : Consultar els permisos d'altres usuaris
admin_Permission253                                                             : Crear/modificar altres usuaris i els seus permisos
admin_PermissionAdvanced253                                                     : Crear/modificar usuaris interns/externs i els seus permisos
admin_Permission254                                                             : Modificar la contrasenya d'altres usuaris
admin_Permission255                                                             : Eliminar o desactivar altres usuaris
admin_Permission256                                                             : Consultar els seus permisos
admin_Permission262                                                             : Consultar totes les empreses (Només usuaris interns. Els externs estan limitats a ells mateixos)
admin_Permission271                                                             : Consultar el CA
admin_Permission272                                                             : Consultar les factures
admin_Permission273                                                             : Emetre les factures
admin_Permission281                                                             : Consultar contractes
admin_Permission282                                                             : Crear/modificar contractes
admin_Permission283                                                             : Eliminar contractes
admin_Permission286                                                             : Exportar els contractes
admin_Permission291                                                             : Consultar tarifes
admin_Permission292                                                             : Establir permisos en les tarifes
admin_Permission293                                                             : Modificar les tarifes a clients
admin_Permission300                                                             : Consultar codis de barra
admin_Permission301                                                             : Crear/modificar codis de barra
admin_Permission302                                                             : Eliminar codi de barra
admin_Permission311                                                             : Consultar serveis
admin_Permission312                                                             : Assignar serveis a un contracte
admin_Permission331                                                             : Consultar bookmarks
admin_Permission332                                                             : Crear/modificar bookmarks
admin_Permission333                                                             : Eliminar bookmarks
admin_Permission341                                                             : Consultar els seus propis permisos
admin_Permission342                                                             : Crear/modificar la seva pròpia info d'usuari
admin_Permission343                                                             : Modificar la seva pròpia contrasenya
admin_Permission344                                                             : Modificar els seus propis permisos
admin_Permission351                                                             : Consultar els grups
admin_Permission352                                                             : Consultar els permisos de grups
admin_Permission353                                                             : Crear/modificar grups i els seus permisos
admin_Permission354                                                             : Eliminar o desactivar grups
admin_Permission358                                                             : Exportar usuaris
admin_Permission401                                                             : Consultar havers
admin_Permission402                                                             : Crear/modificar havers
admin_Permission403                                                             : Validar havers
admin_Permission404                                                             : Eliminar havers
admin_Permission531                                                             : Consultar serveis
admin_Permission532                                                             : Crear/modificar serveis
admin_Permission534                                                             : Eliminar serveis
admin_Permission536                                                             : Veure / gestionar els serveis ocults
admin_Permission538                                                             : Exportar serveis
admin_Permission701                                                             : Consultar donacions
admin_Permission702                                                             : Crear/modificar donacions
admin_Permission703                                                             : Eliminar donacions
admin_Permission1001                                                            : Consultar stocks
admin_Permission1002                                                            : Crear/modificar stocks
admin_Permission1003                                                            : Eliminar stocks
admin_Permission1004                                                            : Consultar moviments de stock
admin_Permission1005                                                            : Crear/modificar moviments de stock
admin_Permission1101                                                            : Consultar ordres d'enviament
admin_Permission1102                                                            : Crear/modificar ordres d'enviament
admin_Permission1104                                                            : Validar ordre d'enviament
admin_Permission1109                                                            : Eliminar ordre d'enviament
admin_Permission1181                                                            : Consultar proveïdors
admin_Permission1182                                                            : Consultar comandes a proveïdors
admin_Permission1183                                                            : Crear comandes a proveïdors
admin_Permission1184                                                            : Validar comandes a proveïdors
admin_Permission1185                                                            : Aprovar comandes a proveïdors
admin_Permission1186                                                            : Enviar comandes a proveïdors
admin_Permission1187                                                            : Rebre comandes a proveïdors
admin_Permission1188                                                            : Tancar comandes a proveïdors
admin_Permission1201                                                            : Obtenir resultat d'una exportació
admin_Permission1202                                                            : Crear/modificar exportacions
admin_Permission1231                                                            : Consultar factures de proveïdors
admin_Permission1232                                                            : Crear factures de proveïdors
admin_Permission1233                                                            : Validar factures de proveïdors
admin_Permission1234                                                            : Eliminar factures de proveïdors
admin_Permission1235                                                            : Enviar factures de proveïdors per correu
admin_Permission1236                                                            : Exporta factures de proveïdors, atributs i pagaments
admin_Permission1237                                                            : Exporta comandes de proveïdors juntament amb els seus detalls
admin_Permission1251                                                            : Llançar les importacions en massa a la base de dades (càrrega de dades)
admin_Permission1321                                                            : Exporta factures a clients, atributs i cobraments
admin_Permission1401                                                            : Llegir el pla comptable
admin_Permission1402                                                            : Crear/Modificar un pla comptable
admin_Permission1403                                                            : Tancar un pla comptable
admin_Permission1411                                                            : Llegir els moviments comptables
admin_Permission1412                                                            : Crear/modificar/anular moviments comptables
admin_Permission1415                                                            : Llegir Balanços, informes, diaris, llibres mestres
admin_Permission1421                                                            : Exporta comandes de clients i atributs
admin_Permission2401                                                            : Llegir accions (esdeveniments o tasques) vinculades al seu compte
admin_Permission2402                                                            : Crear/modificar accions (esdeveniments o tasques) vinculades al seu compte
admin_Permission2403                                                            : Modificar accions (esdeveniments o tasques) vinculades al seu compte
admin_Permission2411                                                            : Eliminar accions (esdeveniments o tasques) d'altres
admin_Permission2412                                                            : Crear/eliminar accions (esdeveniments o tasques) d'altres
admin_Permission2413                                                            : Canviar accions (esdeveniments o tasques) d'altres
admin_Permission2501                                                            : Consultar/Recuperar documents
admin_Permission2502                                                            : Recuperar documents
admin_Permission2503                                                            : Enviar o eliminar documents
admin_Permission2515                                                            : Configuració carpetes de documents
admin_Permission2801                                                            : Utilitzar el client FTP en mode lectura (només explorar i descarregar)
admin_Permission2802                                                            : Utilitzar el client FTP en mode escriptura (esborrar o pujar arxius)
admin_Permission50101                                                           : Utilitzar TPV
admin_Permission50201                                                           : Consultar les transaccions
admin_Permission50202                                                           : Importar les transaccions
admin_DictionnaryCompanyType                                                    : Tipus d'empresa
admin_DictionnaryCompanyJuridicalType                                           : Formes jurídiques
admin_DictionnaryProspectLevel                                                  : Perspectiva nivell client potencial
admin_DictionnaryCanton                                                         : Departaments/Províncies/Zones
admin_DictionnaryRegion                                                         : Regions
admin_DictionnaryCountry                                                        : Països
admin_DictionnaryCurrency                                                       : Monedes
admin_DictionnaryCivility                                                       : Títol cortesia
admin_DictionnaryActions                                                        : Tipus d'esdeveniments de l'agenda
admin_DictionnarySocialContributions                                            : Tipus de càrregues socials
admin_DictionnaryVAT                                                            : Taxa d'IVA (Impost sobre vendes als EEUU)
admin_DictionnaryPaymentConditions                                              : Condicions de pagament
admin_DictionnaryPaymentModes                                                   : Modes de pagament
admin_DictionnaryTypeContact                                                    : Tipus de contactes/adreces
admin_DictionnaryEcotaxe                                                        : Barems CEcoParticipación (DEEE)
admin_DictionnaryPaperFormat                                                    : Formats paper
admin_DictionnaryFees                                                           : Tipus de desplaçaments i honoraris
admin_DictionnarySendingMethods                                                 : Mètodes d'expedició
admin_DictionnaryStaff                                                          : Empleats
admin_DictionnaryAvailability                                                   : Temps de lliurament
admin_DictionnaryOrderMethods                                                   : Mètodes de comanda
admin_DictionnarySource                                                         : Orígens de pressupostos/comandes
admin_DictionnaryAccountancyplan                                                : Pla comptable
admin_DictionnaryAccountancysystem                                              : Models for chart of accounts
admin_SetupSaved                                                                : Configuració desada
admin_BackToModuleList                                                          : Retornar llista de mòduls
admin_BackToDictionnaryList                                                     : Tornar a la llista de diccionaris
admin_VATReceivedOnly                                                           : Impostos especials no facturables
admin_VATManagement                                                             : Gestió IVA
admin_VATIsUsedDesc                                                             : El tipus d'IVA proposat per defecte en les creacions de pressupostos, factures, comandes, etc. Respon a la següent regla: <br> Si el venedor no està subjecte a IVA, IVA per defecte= 0. Final de regla. <br> Si el país del venedor= país del comprador llavors IVA per defecte= IVA del producte venut. Final de regla. <br> Si venedor i comprador resideixen a la Comunitat Europea i el bé venut= nou mitjà de transports (auto, vaixell, avió), IVA per defecte= 0 (l'IVA ha de ser pagat pel comprador a la hisenda pública del seu país i no al venedor). Final de regla <br> Si venedor i comprador resideixen a la Comunitat Europea i comprador= particular o empresa sense NIF intracomunitari llavors IVA per defecte= IVA del producte venut. Final de regla. <br> Si venedor i comprador resideixen a la Comunitat Europea i comprador= empresa amb NIF intracomunitari llavors IVA per defecte= 0. Final de regla. <br> Sinó, IVA proposat per defecte= 0. Final de regla. <br>
admin_VATIsNotUsedDesc                                                          : El tipus d'IVA proposat per defecte és 0. Aquest és el cas d'associacions, particulars o algunes petites societats.
admin_VATIsUsedExampleFR                                                        : A França, es tracta de les societats o organismes que trien un règim fiscal general (General simplificat o General normal), règim en el qual es declara l'IVA.
admin_VATIsNotUsedExampleFR                                                     : A França, es tracta d'associacions exemptes d'IVA o societats, organismes o professions liberals que han eligedo el règim fiscal de mòduls (IVA en franquícia), pagant un IVA en franquícia sense fer declaració d'IVA. Aquesta elecció fa aparèixer l'anotació "IVA no aplicable - art-293B del CGI" en les factures.
admin_LocalTax1ManagementES                                                     : Gestió Recàrrec d'Equivalència
admin_LocalTax1IsUsedDescES                                                     : El tipus de RE proposat per defecte en les creacions de pressupostos, factures, comandes, etc. Respon a la següent regla:<br>Si el comprador no està subjecte a RE, RE per defecte= 0. Final de regla.<br>Si el comprador està subjecte a RE aleshores s'aplica valor de RE per defecte. Final de regla.<br>
admin_LocalTax1IsNotUsedDescES                                                  : El tipus de RE proposat per defecte es 0. Final de regla.
admin_LocalTax1IsUsedExampleES                                                  : A Espanya, es tracta de persones físiques: autònoms subjectes a uns epígrafs concrets de l'IAE.
admin_LocalTax1IsNotUsedExampleES                                               : A Espanya, es tracta d'empreses jurídiques: Societats limitades, anònimes, etc. i persones físiques (autònoms) subjectes a certs epígrafs de l'IAE.
admin_LocalTax2ManagementES                                                     : Gestió IRPF
admin_LocalTax2IsUsedDescES                                                     : El tipus d'IRPF proposat per defecte en les creacions de pressupostos, factures, comandes, etc. Respon a la següent regla:<br>Si el venedor no està subjecte a IRPF, IRPF per defecte= 0. Final de regla.<br>Si el venedor està subjecte a IRPF aleshores s'aplica valor d'IRPF per defecte. Final de regla.<br>
admin_LocalTax2IsNotUsedDescES                                                  : El tipus d'IRPF proposat per defecte es 0. Final de regla.
admin_LocalTax2IsUsedExampleES                                                  : A Espanya, es tracta de persones físiques: autònoms i professionals independents que presten serveis i empreses que han triat el règim fiscal de mòduls.
admin_LocalTax2IsNotUsedExampleES                                               : A Espanya, es tracta d'empreses no subjectes al règim fiscal de mòduls.
admin_LabelUsedByDefault                                                        : Etiqueta que s'utilitzarà si no es troba traducció per aquest codi
admin_LabelOnDocuments                                                          : Etiqueta sobre documents
admin_NbOfDays                                                                  : Nº de dies
admin_AtEndOfMonth                                                              : A final de mes
admin_Offset                                                                    : Decàleg
admin_AlwaysActive                                                              : Sempre actiu
admin_UpdateRequired                                                            : El seu sistema necessita una actualització. Per actualitzar faci un clic a <a href="%s">Actualitzar</a>.
admin_Upgrade                                                                   : Actualització
admin_MenuUpgrade                                                               : Actualització / Extensió
admin_AddExtensionThemeModuleOrOther                                            : Afegir extensió (tema, mòdul, etc.)
admin_WebServer                                                                 : Servidor web
admin_DocumentRootServer                                                        : Carpeta arrel de les pàgines web
admin_DataRootServer                                                            : Carpeta arrel dels arxius de dades
admin_IP                                                                        : IP
admin_Port                                                                      : Port
admin_VirtualServerName                                                         : Nom del servidor virtual
admin_AllParameters                                                             : Tots els paràmetres
admin_OS                                                                        : SO
admin_Php                                                                       : Php
admin_PhpEnv                                                                    : Env
admin_PhpModules                                                                : Mòduls
admin_PhpConf                                                                   : Conf
admin_PhpWebLink                                                                : Enllaç Web-PHP
admin_Pear                                                                      : Pear
admin_PearPackages                                                              : Paquets Pear
admin_Database                                                                  : Base de dades
admin_DatabaseServer                                                            : Host de la base de dades
admin_DatabaseName                                                              : Nom de la base de dades
admin_DatabasePort                                                              : Port de la base de dades
admin_DatabaseUser                                                              : Login de la base de dades
admin_DatabasePassword                                                          : Contrasenya de la base de dades
admin_DatabaseConfiguration                                                     : Configuració de la base de dades
admin_Tables                                                                    : Taules
admin_TableName                                                                 : Nom de la taula
admin_TableLineFormat                                                           : Format línies
admin_NbOfRecord                                                                : Nº Reg.
admin_Constraints                                                               : Constraints
admin_ConstraintsType                                                           : Tipus de constraint
admin_ConstraintsToShowOrNotEntry                                               : Constraint per mostrar o no l'entrada de menú
admin_AllMustBeOk                                                               : Tots han de ser controlats
admin_Host                                                                      : Servidor
admin_DriverType                                                                : Tipus de driver
admin_SummarySystem                                                             : Resum de la informació de sistemes Dolibarr
admin_SummaryConst                                                              : Llista de tots els paràmetres de configuració Dolibarr
admin_SystemUpdate                                                              : Actualització del sistema
admin_SystemSuccessfulyUpdate                                                   : El seu sistema s'ha actualitzat correctament
admin_MenuCompanySetup                                                          : Empresa/Institució
admin_MenuNewUser                                                               : Nou usuari
admin_MenuTopManager                                                            : Gestió del menú superior
admin_MenuLeftManager                                                           : Gestió del menú de l'esquerra
admin_MenuManager                                                               : Gestor del menú de menú estàndard
admin_MenuSmartphoneManager                                                     : Gestor de menú smartphone
admin_DefaultMenuTopManager                                                     : Gestor del menú superior
admin_DefaultMenuLeftManager                                                    : Gestor del menú de l'esquerra
admin_DefaultMenuManager                                                        : Gestor del menú estàndard
admin_DefaultMenuSmartphoneManager                                              : Gestor de menú smartphone
admin_Skin                                                                      : Tema visual
admin_DefaultSkin                                                               : Tema visual por defecte
admin_MaxSizeList                                                               : Longuitud màxima de llistats
admin_DefaultMaxSizeList                                                        : Longuitud màxima de llistats per defecte
admin_MessageOfDay                                                              : Missatge del dia
admin_MessageLogin                                                              : Missatge del login
admin_PermanentLeftSearchForm                                                   : Zona de recerca permanent del menú de l'esquerra
admin_DefaultLanguage                                                           : Idioma per defecte a utilitzar (codi d'idioma)
admin_EnableMultilangInterface                                                  : Activar interface multiidioma
admin_EnableShowLogo                                                            : Mostra el logotip en el menú de l'esquerra
admin_SystemSuccessfulyUpdated                                                  : El seu sistema està actualitzat
admin_CompanyInfo                                                               : Informació de l'empresa/institució
admin_CompanyIds                                                                : Identificació reglamentaria
admin_CompanyName                                                               : Nom/Raó social
admin_CompanyAddress                                                            : Adreça
admin_CompanyZip                                                                : Codi postal
admin_CompanyTown                                                               : Població
admin_CompanyCountry                                                            : Pais
admin_CompanyCurrency                                                           : Divisa principal
admin_DoNotShow                                                                 : No mostrar
admin_DoNotSuggestPaymentMode                                                   : No sugerir
admin_NoActiveBankAccountDefined                                                : Cap compte bancari actiu definit
admin_OwnerOfBankAccount                                                        : Titular del compte %s
admin_BankModuleNotActive                                                       : Mòdul comptes bancaris no activat
admin_ShowBugTrackLink                                                          : Mostra vincle "Assenyalar un bug"
admin_ShowWorkBoard                                                             : Mostra panell d'informació a la pàgina principal
admin_Alerts                                                                    : Alertes
admin_Delays                                                                    : Terminis
admin_DelayBeforeWarning                                                        : Termini abans d'alerta
admin_DelaysBeforeWarning                                                       : Terminis abans d'alerta
admin_DelaysOfToleranceBeforeWarning                                            : Terminis de tolerància abans d'alerta
admin_DelaysOfToleranceDesc                                                     : Aquesta pantalla permet configura els terminis de tolerància abans que es alerti amb el símbol %s, sobre cada element en retard.
admin_Delays_MAIN_DELAY_ACTIONS_TODO                                            : Tolerància de retard abans de l'alerta (en dies) sobre accions planificades no realitzades
admin_Delays_MAIN_DELAY_ORDERS_TO_PROCESS                                       : Tolerància de retard abans de l'alerta (en dies) sobre comandes de clients no processades
admin_Delays_MAIN_DELAY_SUPPLIER_ORDERS_TO_PROCESS                              : Tolerància de retard abans de l'alerta (en dies) sobre comandes a proveïdors no processades
admin_Delays_MAIN_DELAY_PROPALS_TO_CLOSE                                        : Tolerància de retard abans de l'alerta (en dies) sobre pressupostos a tancar
admin_Delays_MAIN_DELAY_PROPALS_TO_BILL                                         : Tolerància de retard abans de l'alerta (en dies) sobre pressupostos no facturats
admin_Delays_MAIN_DELAY_NOT_ACTIVATED_SERVICES                                  : Tolerància de retard abans de l'alerta (en dies) sobre serveis a activar
admin_Delays_MAIN_DELAY_RUNNING_SERVICES                                        : Tolerància de retard abans de l'alerta (en dies) sobre serveis expirats
admin_Delays_MAIN_DELAY_SUPPLIER_BILLS_TO_PAY                                   : Tolerància de retard abans de l'alerta (en dies) sobre factures de proveïdor impagades
admin_Delays_MAIN_DELAY_CUSTOMER_BILLS_UNPAYED                                  : Tolerància de retard abans de l'alerta (en dies) sobre factures a client impagades
admin_Delays_MAIN_DELAY_TRANSACTIONS_TO_CONCILIATE                              : Tolerància de retard abans de l'alerta (en dies) sobre conciliacions bancàries pendents
admin_Delays_MAIN_DELAY_MEMBERS                                                 : Tolerància de retard abans de l'alerta (en dies) sobre cotitzacions adherents en retard
admin_Delays_MAIN_DELAY_CHEQUES_TO_DEPOSIT                                      : Tolerància de retard abans de l'alerta (en dies) sobre xecs a ingressar
admin_SetupDescription1                                                         : Totes les opcions de l'àrea de configuració són opcions que permeten configurar Dolibarr abans de començar la seva utilització.
admin_SetupDescription2                                                         : Els 2 passos indispensables de la configuració són les 2 primeres al menú esquerre: la configuració de l'empresa/institució i la configuració dels mòduls:
admin_SetupDescription3                                                         : La configuració <b>Empresa/institució</b> a administrar és requerida ja que s'utilitza la informació per a la introducció de dades en la majoria de les pantalles, a insercions, o per modificar el comportament de Dolibarr (com, per exemple, de les funcions que depenen del seu país).
admin_SetupDescription4                                                         : La configuració <b>Mòduls</b> és indispensable ja que Dolibarr no és un ERP/CRM monolític, és un conjunt de mòduls més o menys independent. Després d'activar els mòduls que li interessin comprovarà les seves funcionalitats en els menús de Dolibarr.
admin_SetupDescription5                                                         : Les altres entrades de configuració gestionen paràmetres opcionals.
admin_EventsSetup                                                               : Configuració del registre d'esdeveniments
admin_LogEvents                                                                 : Auditoria de la seguretat d'esdeveniments
admin_Audit                                                                     : Auditoria
admin_InfoSpeedealing                                                           : Infos Speedealing
admin_InfoOS                                                                    : Info SO
admin_InfoWebServer                                                             : Info servidor
admin_InfoDatabase                                                              : Info base de dades
admin_InfoPHP                                                                   : Info PHP
admin_ListEvents                                                                : Auditoria d'esdeveniments
admin_ListOfSecurityEvents                                                      : Llistat d'esdeveniments de seguretat Dolibarr
admin_SecurityEventsPurged                                                      : Esdeveniments de seguretat purgats
admin_LogEventDesc                                                              : Podeu habilitar el registre d'esdeveniments de seguretat Dolibarr aquí. Els administradors poden veure el seu contingut a través de menú <b>Eines del sistema->Auditoria</b>. Atenció, aquesta característica pot consumir una gran quantitat de dades a la base de dades.
admin_AreaForAdminOnly                                                          : Aquestes funcions només són accessibles a un usuari administrador.
admin_SystemInfoDesc                                                            : La informació del sistema és informació tècnica accessible només en només lectura als administradors.
admin_SystemAreaForAdminOnly                                                    : Aquesta àrea només és accessible als usuaris de tipus administradors. Cap permís Dolibarr permet estendre el cercle de usuaris autoritzats a aquesta áera.
admin_CompanyFundationDesc                                                      : Edita en aquesta pàgina tota la informació coneguda sobre l'empresa o associació a administrar  (per això feu clic al botó "Modificar" a peu de pàgina)
admin_DisplayDesc                                                               : Podeu trobar aquí tots els paràmetres relacionats amb l'aparença d'Dolibarr
admin_AvailableModules                                                          : Mòduls disponibles
admin_ToActivateModule                                                          : Per activar els mòduls, aneu a l'àrea de Configuració (Inici->Configuració->Mòduls).
admin_SessionTimeOut                                                            : Timeout de sesions
admin_SessionExplanation                                                        : Assegura que el període de sessions no expirarà abans d'aquest moment. Tanmateix, la gestió del període de sessions de PHP no garanteix que el període de sessions expirar després d'aquest període: Aquest serà el cas si un sistema de neteja del cau de sessions és actiu. <br>Nota: Sense mecanisme especial, el mecanisme intern per netejar el període de sessions de PHP tots els accessos <b>%s /%s</b>, però només al voltant de l'accés d'altres períodes de sessions.
admin_TriggersAvailable                                                         : Triggers disponibles
admin_TriggersDesc                                                              : Els triggers són arxius que, une vegada dipositats a la carpeta <b>htdocs/core/triggers</b>, modifiquen el comportament del workflow d'Dolibarr. Realitzen accions suplementàries, desencadenades pels esdeveniments Dolibarr (creació d'empresa, validació factura, tancament de contracte, etc).
admin_TriggerDisabledByName                                                     : Triggers d'aquest arxiu desactivador pel sufix <b>-NORUN</b> en el nom de l'arxiu.
admin_TriggerDisabledAsModuleDisabled                                           : Triggers d'aquest arxiu desactivats ja que el mòdul <b>%s</b> no està activat.
admin_TriggerAlwaysActive                                                       : Triggers d'aquest arxiu sempre actius, ja que els mòduls Dolibarr relacionats estan activats
admin_TriggerActiveAsModuleActive                                               : Triggers d'aquest arxiu actius ja que el mòdul <b>%s</b> està activat
admin_GeneratedPasswordDesc                                                     : Indiqui aquí que norma vol utilitzar per generar les contrasenyes quan vulgui generar una nova contrasenya
admin_DictionnaryDesc                                                           : Indiqui aquí les dades de referència. Pot completar/modificar les dades predefinides amb les seves
admin_ConstDesc                                                                 : Qualsevol altre paràmetre no editable en les pàgines anteriors
admin_OnceSetupFinishedCreateUsers                                              : Atenció, està sota un compte d'administrador de Dolibarr. Els administradors s'utilitzen per configurar Dolibarr. Per a un ús corrent de Dolibarr, es recomana utilitzar un compte no administrador creada des del menú "Usuaris i grups"
admin_MiscellanousDesc                                                          : Definiu aquí els altres paràmetres relacionats amb la seguretat.
admin_LimitsSetup                                                               : Configuració de límits i precisions
admin_LimitsDesc                                                                : Podeu definir aquí els límits i precisions utilitzats per Dolibarr
admin_MAIN_MAX_DECIMALS_UNIT                                                    : Decimals màxims per als preus unitaris
admin_MAIN_MAX_DECIMALS_TOT                                                     : Decimals màxims per als preus totals
admin_MAIN_MAX_DECIMALS_SHOWN                                                   : Decimals màxims per als imports mostrats a la pantalla (Posar <b> ...</b> després del màxim si vol veure <b> ...</b> quan el nombre es trunque al mostrar a la pantalla)
admin_MAIN_DISABLE_PDF_COMPRESSION                                              : Utilitzar la compressió PDF per els arxius PDF generats
admin_MAIN_ROUNDING_RULE_TOT                                                    : Mida rang per l'arrodoniment (per a alguns països que arrodoneixen sobre una altra base que no sigui base 10)
admin_UnitPriceOfProduct                                                        : Preu unitari sense IVA d'un producte
admin_TotalPriceAfterRounding                                                   : Preu total després de l'arrodoniment
admin_ParameterActiveForNextInputOnly                                           : Paràmetre efectiu només a partir de les properes sessions
admin_NoEventOrNoAuditSetup                                                     : No s'han registrat esdeveniments de seguretat. Això pot ser normal si l'auditoria no ha estat habilitat a la pàgina "configuració->seguretat->auditoria".
admin_NoEventFoundWithCriteria                                                  : No s'han trobat esdeveniments de seguretat per a aquests criteris de cerca.
admin_SeeLocalSendMailSetup                                                     : Veure la configuració local d'sendmail
admin_BackupDesc                                                                : Per realitzar una còpia de seguretat completa de Dolibarr, vostè ha de:
admin_BackupDesc2                                                               : * Guardar el contingut de la carpeta de documents (<b>%s</b>) que conté tots els arxius pujats o generats (comprimint la carpeta, per exemple).
admin_BackupDesc3                                                               : * Guardar el contingut de la base de dades en un arxiu de bolcat. Per això pot utilitzar l'assistent a continuació.
admin_BackupDescX                                                               : La carpeta arxivada haurà de guardar-se en un lloc segur
admin_BackupDescY                                                               : L'arxiu de bolcat generat haurà de guardar-se en un lloc segur.
admin_BackupPHPWarning                                                          : La còpia de seguretat no pot ser garantida amb aquest mètode. És preferible utilitzar l'anterior
admin_RestoreDesc                                                               : Per restaurar una còpia de seguretat de Dolibarr, vostè ha de:
admin_RestoreDesc2                                                              : * Prendre el fitxer (fitxer zip, per exemple) de la carpeta dels documents i descomprimir-lo a la carpeta dels documents d'una nova instal·lació de Dolibarr o en la carpeda dels documents d'aquesta instal·lació (<b>%s</b>).
admin_RestoreDesc3                                                              : * Recarregar el fitxer de bolcat guardat a la base de dades d'una nova instal·lació de Dolibarr o d'aquesta instal·lació. Atenció, una vegada realitzada la restauració, haurà d'utilitzar un login/contrasenya d'administrador existent en el moment de la còpia de seguretat per connectar-se. Per restaurar la base de dades en la instal·lació actual, pot utilitzar l'assistent a continuació.
admin_RestoreMySQL                                                              : Importació MySQL
admin_ForcedToByAModule                                                         : Aquesta regla està forçada a <b>%s</b> per un dels mòduls activats
admin_PreviousDumpFiles                                                         : Arxius de còpia de seguretat de la base de dades disponibles
admin_WeekStartOnDay                                                            : Primer dia de la setmana
admin_RunningUpdateProcessMayBeRequired                                         : Sembla necessari realitzar el procés d'actualizació (la versió del programa %s difereix de la versió de la base de dades %s)
admin_YouMustRunCommandFromCommandLineAfterLoginToUser                          : Ha d'executar la comanda des d'un shell després d'haver iniciat sessió amb el compte <b>%s</b>.
admin_YourPHPDoesNotHaveSSLSupport                                              : Funcions SSL no disponibles al vostre PHP
admin_DownloadMoreSkins                                                         : Més temes per descarregar
admin_SimpleNumRefModelDesc                                                     : Retorna el nombre sota el format %syymm-nnnn on yy és l'any, mm el mes i nnnn un comptador seqüencial sense ruptura i sense tornar a 0
admin_ShowProfIdInAddress                                                       : Mostrar l'identificador professional en les direccions dels documents
admin_TranslationUncomplete                                                     : Traducció parcial
admin_SomeTranslationAreUncomplete                                              : Alguns idiomes estan traduïts en part o poden contenir errors. Si ho troba, pot corregir els arxius de text <b>.lang</b> del directori <b>htdocs/langs</b> i enviar-los al fòrum <a href="http://www.dolibarr.fr/forum" target="_blank">http://www.dolibarr.fr</a>.
admin_MenuUseLayout                                                             : Fer el menú esquerre ocultable (l'opció javascript no hauria de deshabilitar-se)
admin_MAIN_DISABLE_METEO                                                        : Deshabilitar la vista meteo
admin_TestLoginToAPI                                                            : Comprovar connexió a l'API
admin_ProxyDesc                                                                 : Algunes de les característiques de Dolibarr requereixen que el servidor tingui accés a Internet. Definiu aquí els paràmetres per a aquest accés. Si el servidor està darrere d'un proxy, aquests paràmetres s'indiquen a Dolibarr com passar-ho.
admin_ExternalAccess                                                            : Accés extern
admin_MAIN_PROXY_USE                                                            : Usar un servidor intermediari (si no accés directe a Internet)
admin_MAIN_PROXY_HOST                                                           : Nom/Adreça del servidor proxy
admin_MAIN_PROXY_PORT                                                           : Port del servidor proxy
admin_MAIN_PROXY_USER                                                           : Login del servidor proxy
admin_MAIN_PROXY_PASS                                                           : Contrasenya del servidor proxy
admin_DefineHereComplementaryAttributes                                         : Definiu aquí la llista d'atributs addicionals, no disponibles a estàndard, i que vol gestionar per %s.
admin_ExtraFields                                                               : Atributs addicionals
admin_ExtraFieldsThirdParties                                                   : Atributs adicionals (tercers)
admin_ExtraFieldsContacts                                                       : Atributs adicionals (contactes/adreçes)
admin_ExtraFieldHasWrongValue                                                   : L'atribut %s te un valor incorrecte.
admin_AlphaNumOnlyCharsAndNoSpace                                               : només carateres alfanumèrics sense espais
admin_SendingMailSetup                                                          : Configuració de l'enviament per mail
admin_SendmailOptionNotComplete                                                 : Atenció, en alguns sistemes Linux, amb aquest mètode d'enviament, per poder enviar mails en nom seu, la configuració de sendmail ha de contenir l'opció <b>-ba</b> (paràmetre <b>mail.force_extra_parameters</b> a l'arxiu <b>php.ini</b>). Si alguns dels seus destinataris no reben els seus missatges, proveu de modificar aquest paràmetre PHP amb <b>mail.force_extra_parameters =-ba </b>.
admin_PathToDocuments                                                           : Rutes d'accés a documents
admin_PathDirectory                                                             : Catàleg
admin_SendmailOptionMayHurtBuggedMTA                                            : La funcionalitat d'enviar correu electrònic a través del "correu directe PHP" genera una sol·licitud que pot ser mal interpretada per alguns servidors de correu. Això es tradueix en missatges de correu electrònic il·legibles per a les persones allotjades en aquestes plataformes. Aquest és el cas de clients en certs proveïdors de serveis d'Internet (Ex: Orange). Això no és un problema ni de Dolibarr ni de PHP, però sí del servidor de correu. No obstant això, podeu afegir l'opció MAIN_FIX_FOR_BUGGED_MTA amb valor 1 en configuració-varis per tractar que Dolibarr eviti l'error. Una altra solució (recomanada) és utilitzar el mètode d'enviament per SMTP que no té aquest inconvenient.
admin_TranslationSetup                                                          : Configuració traducció
admin_TranslationDesc                                                           : L'elecció de l'idioma mostrat en pantalla es modifica:<br>* A nivell global des del menú <strong>Inici - Configuració - Entorn</strong><br>* De manera específica a l'usuari des de la pestanya <strong>interface usuari</strong> de la seva fitxa d'usuari (fer clic al seu login a la part superior esquerra de la pantalla).
admin_ClassNotFoundIntoPathWarning                                              : Class %s not found into PHP path
admin_PasswordGenerationStandard                                                : Retorna una contrasenya generada per l'algoritme intern Dolibarr: 8 caràcters, números i caràcters en minúscules barrejades.
admin_PasswordGenerationNone                                                    : No ofereix contrasenyes. La contrasenya s'introdueix manualment.
admin_UserGroupSetup                                                            : Configuració mòdul usuaris i grups
admin_GeneratePassword                                                          : Proposar una contrasenya generada
admin_RuleForGeneratedPasswords                                                 : Norma per a la generació de les contrasenyes propostes
admin_DoNotSuggest                                                              : No proposar
admin_EncryptedPasswordInDatabase                                               : Permetre encriptació de les contrasenyes en la base de dades
admin_DisableForgetPasswordLinkOnLogonPage                                      : No mostrar l'enllaç "Contrasenya oblidada" a la pàgina de login
admin_UsersSetup                                                                : Configuració del mòdul usuaris
admin_UserMailRequired                                                          : E-mail necessari per crear un usuari nou
admin_CompanySetup                                                              : Configuració del mòdul empreses
admin_CompanyCodeChecker                                                        : Mòdul de generació i control dels codis de tercers (clients/proveïdors)
admin_AccountCodeManager                                                        : Mòdul de generació dels codis comptables (clients/proveïdors)
admin_ModuleCompanyCodeAquarium                                                 : Retorna un codi comptable compost de<br>%s seguit del codi tercer de proveïdor per al codi comptable de proveïdor,<br>%s seguit del codi tercer de client per al codi comptable de client.
admin_ModuleCompanyCodePanicum                                                  : Retorna un codi comptable buit.
admin_ModuleCompanyCodeDigitaria                                                : Retorna un codi comptable compost seguint el codi de tercer. El codi està format per caràcter 'C' en primera posició seguit dels 5 primers caràcters del codi tercer.
admin_UseNotifications                                                          : Utilitza notificacions
admin_NotificationsDesc                                                         : La funció de les notificacions permet enviar automàticament un correu electrònic per a un determinat esdeveniment Dolibarr en les empreses configurades per a això
admin_ModelModules                                                              : Models de documents
admin_DocumentModelOdt                                                          : Generació des dels documents amb format OpenDocument (Arxiu .ODT OpenOffice, KOffice, TextEdit,...)
admin_WatermarkOnDraft                                                          : Marca d'aigua en els documents esborrany
admin_CompanyIdProfChecker                                                      : Id Professional únic
admin_MustBeUnique                                                              : Ha de ser únic?
admin_Miscellanous                                                              : Miscel·lània
admin_WebCalSetup                                                               : Configuració d'enllaç amb el calendari webcalendar
admin_WebCalSyncro                                                              : Integrar els esdeveniments Dolibarr a webcalendar
admin_WebCalAllways                                                             : Sempre, sense consultar
admin_WebCalYesByDefault                                                        : Consultar (Si per defecte)
admin_WebCalNoByDefault                                                         : Consultar (No per defecte)
admin_WebCalNever                                                               : Mai
admin_WebCalURL                                                                 : Adreça (URL) d'accés al calendari
admin_WebCalServer                                                              : Servidor de la base de dades del calendari
admin_WebCalDatabaseName                                                        : Nom de la base de dades
admin_WebCalUser                                                                : Usuari amb accés a la base
admin_WebCalSetupSaved                                                          : Les dades d'enllaç s'han desat correctament.
admin_WebCalTestOk                                                              : La connexió al servidor '%s' a la base '%s' per l'usuari '%s' ha estat satisfactòria.
admin_WebCalTestKo1                                                             : La connexió al servidor '%s' ha estat satisfactòria, però la base '%s' no s'ha pogut comprovar.
admin_WebCalTestKo2                                                             : La conexió al servidor '%s' per l'usuari '%s' ha fallat.
admin_WebCalErrorConnectOkButWrongDatabase                                      : La connexió ha sortit bé però la base no sembla ser una base webcalendar.
admin_WebCalAddEventOnCreateActions                                             : Afegir esdeveniment en el calendari en les creacions d'accions
admin_WebCalAddEventOnCreateCompany                                             : Afegir esdeveniment en el calendari en la creació d'empreses
admin_WebCalAddEventOnStatusPropal                                              : Afegir esdeveniment al calendari en el canvi d'estat dels pressupostos
admin_WebCalAddEventOnStatusContract                                            : Afegir esdeveniment al calendari en el canvi d'estat dels contractes
admin_WebCalAddEventOnStatusBill                                                : Afegir esdeveniment al calendari en el canvi d'estat de les factures
admin_WebCalAddEventOnStatusMember                                              : Afegir esdeveniment al calendari en el canvi d'estat dels membres
admin_WebCalUrlForVCalExport                                                    : Un vincle d'exportació del calendari en format <b>%s</b> estarà disponible a la url: %s
admin_WebCalCheckWebcalSetup                                                    : La configuració del mòdul webcal pot ser incorrecta
admin_BillsSetup                                                                : Configuració del mòdul Factures
admin_BillsDate                                                                 : Data de les factures
admin_BillsNumberingModule                                                      : Mòdul de numeració de factures i abonaments
admin_BillsPDFModules                                                           : Model de document de factures
admin_CreditNoteSetup                                                           : Configuració del mòdul d'abonaments
admin_CreditNotePDFModules                                                      : Model de document d'abonaments
admin_CreditNote                                                                : Abonament
admin_CreditNotes                                                               : Abonaments
admin_ForceInvoiceDate                                                          : Forçar la data de factura a la data de validació
admin_DisableRepeatable                                                         : Desactivar les factures recurrents
admin_SuggestedPaymentModesIfNotDefinedInInvoice                                : Formes de pagament suggerides per a les factures si no estan definides explícitament
admin_EnableEditDeleteValidInvoice                                              : Activar la possibilitat d'editar/eliminar una factura validada sense pagament
admin_SuggestPaymentByRIBOnAccount                                              : Sugerir el pagament per abonament en compte
admin_SuggestPaymentByChequeToAddress                                           : Sugerir el pagament per xec a
admin_FreeLegalTextOnInvoices                                                   : Text lliure en factures
admin_WatermarkOnDraftInvoices                                                  : Marca d'aigua en les factures esborrany (en cas d'estar buit)
admin_PropalSetup                                                               : Configuració del mòdul Pressupostos
admin_CreateForm                                                                : Creació formulari
admin_NumberOfProductLines                                                      : Nombre de línies de productes
admin_ProposalsNumberingModules                                                 : Mòduls de numeració de pressupostos
admin_ProposalsPDFModules                                                       : Models de documents de pressupostos
admin_ClassifiedInvoiced                                                        : Classificar facturat
admin_HideTreadedPropal                                                         : Amaga els pressupostos processats del llistat
admin_AddShippingDateAbility                                                    : Possibilitat de determinar una data de lliurament
admin_AddDeliveryAddressAbility                                                 : Possibilitat de seleccionar una adreça d'enviament
admin_UseOptionLineIfNoQuantity                                                 : Una línia de producte/servei que té una quantitat nul·la es considera com una opció
admin_FreeLegalTextOnProposal                                                   : Text lliure en pressupostos
admin_WatermarkOnDraftProposal                                                  : Marca d'aigua en pressupostos esborrany (en cas d'estar buit)
admin_OrdersSetup                                                               : Configuració del mòdul comandes
admin_OrdersNumberingModules                                                    : Mòduls de numeració de les comandes
admin_OrdersModelModule                                                         : Models de documents de comandes
admin_HideTreadedOrders                                                         : Amaga les comandes processades o anul·lades del llistat
admin_ValidOrderAfterPropalClosed                                               : Validar la comanda després del tancament del pressupost, permet no passar per la comanda provisional
admin_FreeLegalTextOnOrders                                                     : Text lliure en comandes
admin_WatermarkOnDraftOrders                                                    : Marca d'aigua en comandes esborrany (en cas d'estar buit)
admin_ClickToDialSetup                                                          : Configuració del mòdul Click To Dial
admin_ClickToDialUrlDesc                                                        : Url de trucada fent clic en la icona telèfon. Dans l'url, vous pouvez utiliser les balises<br><b>__PHONETO__</b> qui sera remplacé par le téléphone de l'appelé<br><b>__PHONEFROM__</b> qui sera remplacé par le téléphone de l'appelant (le votre)<br><b>__LOGIN__</b> qui sera remplacé par votre login clicktodial (défini sur votre fiche utilisateur)<br><b>__PASS__</b> qui sera remplacé par votre mot de passe clicktodial (défini sur votre fiche utilisateur).
admin_Bookmark4uSetup                                                           : Configuració del mòdul Bookmark4u
admin_InterventionsSetup                                                        : Configuració del mòdul intervencions
admin_FreeLegalTextOnInterventions                                              : Text addicional en les fitxes d'intervenció
admin_FicheinterNumberingModules                                                : Mòduls de numeració de les fitxes d'intervenció
admin_TemplatePDFInterventions                                                  : Model de documents de les fitxes d'intervenció
admin_WatermarkOnDraftInterventionCards                                         : Marca d'aigua en fitxes d'intervenció (en cas d'estar buit)
admin_ContractsSetup                                                            : Configuració del mòdul contractes
admin_ContractsNumberingModules                                                 : Mòduls de numeració dels contratos
admin_MembersSetup                                                              : Configuració del mòdulo Associacions
admin_MemberMainOptions                                                         : Opcions principals
admin_AddSubscriptionIntoAccount                                                : Proposar per defecte la creació d'un moviment, en el mòdul bancs, en el registre d'un pagament de cotització
admin_AdherentLoginRequired                                                     : Gestionar un login per a cada membre
admin_AdherentMailRequired                                                      : E-Mail obligatori per crear un membre nou
admin_MemberSendInformationByMailByDefault                                      : Casella de verificació per enviar un missatge de confirmació (validació o nova cotització) als membres és per defecte "sí"
admin_LDAPSetup                                                                 : Configuracón del mòdul LDAP
admin_LDAPGlobalParameters                                                      : Paràmetres globals
admin_LDAPUsersSynchro                                                          : Usuaris
admin_LDAPGroupsSynchro                                                         : Grups
admin_LDAPContactsSynchro                                                       : Contactes
admin_LDAPMembersSynchro                                                        : Members
admin_LDAPSynchronization                                                       : Sincronització LDAP
admin_LDAPFunctionsNotAvailableOnPHP                                            : Les funcions LDAP no estan disponibles a la seva PHP
admin_LDAPToSpeedealing                                                         : LDAP -> Speedealing
admin_SpeedealingToLDAP                                                         : Speedealing -> LDAP
admin_LDAPNamingAttribute                                                       : Clau en LDAP
admin_LDAPSynchronizeUsers                                                      : Organització dels usuaris a LDAP
admin_LDAPSynchronizeGroups                                                     : Organització dels grups a LDAP
admin_LDAPSynchronizeContacts                                                   : Organització dels contactes a LDAP
admin_LDAPSynchronizeMembers                                                    : Organització dels membres a LDAP
admin_LDAPTypeExample                                                           : OpenLdap, Egroupware o Active Directory
admin_LDAPPrimaryServer                                                         : Servidor primari
admin_LDAPSecondaryServer                                                       : Servidor secundari
admin_LDAPServerPort                                                            : Port del servidor
admin_LDAPServerPortExample                                                     : Port per defecte : 389
admin_LDAPServerProtocolVersion                                                 : Versió de protocol
admin_LDAPServerUseTLS                                                          : Usuari TLS
admin_LDAPServerUseTLSExample                                                   : El seu servidor utilitza TLS
admin_LDAPServerDn                                                              : DN del servidor
admin_LDAPAdminDn                                                               : DN del administrador
admin_LDAPAdminDnExample                                                        : DN complet (ej: cn=adminldap,dc=my-domain,dc=com)
admin_LDAPPassword                                                              : Contrasenya de l'administrador
admin_LDAPUserDn                                                                : DN dels usuaris
admin_LDAPUserDnExample                                                         : DN complet (ej: ou=users,dc=my-domain,dc=com)
admin_LDAPGroupDn                                                               : DN dels grups
admin_LDAPGroupDnExample                                                        : DN complet (ej: ou=groups,dc=my-domain,dc=com)
admin_LDAPServerExample                                                         : Adreça del servidor (ej: localhost, 192.168.0.2, ldaps://ldap.example.com/)
admin_LDAPServerDnExample                                                       : DN complet (ej: dc=my-domain,dc=com)
admin_LDAPPasswordExample                                                       : Contrasenya del administrador
admin_LDAPDnSynchroActive                                                       : Sincronització d'usuaris i grups
admin_LDAPDnSynchroActiveExample                                                : Sincronització LDAP vers Dolibarr ó Dolibarr vers LDAP
admin_LDAPDnContactActive                                                       : Sincronització de contactes
admin_LDAPDnContactActiveYes                                                    : Sincronització activada
admin_LDAPDnContactActiveExample                                                : Sincronització activada/desactivada
admin_LDAPDnMemberActive                                                        : Sincronització dels membres
admin_LDAPDnMemberActiveExample                                                 : Sincronització activada/desactivada
admin_LDAPContactDn                                                             : DN dels contactes Dolibarr
admin_LDAPContactDnExample                                                      : DN complet (ej: ou=contacts,dc=my-domain,dc=com)
admin_LDAPMemberDn                                                              : DN dels membres
admin_LDAPMemberDnExample                                                       : DN complet (ex: ou=members,dc=society,dc=com)
admin_LDAPMemberObjectClassList                                                 : Llista de objectClass
admin_LDAPMemberObjectClassListExample                                          : Llista de ObjectClass que defineixen els atributs d'un registre (ex: top, inetorgperson o top, user for active directory)
admin_LDAPUserObjectClassList                                                   : Llista de objectClass
admin_LDAPUserObjectClassListExample                                            : Llista de ObjectClass que defineixen els atributs d'un registre (ex: top, inetorgperson o top, user for active directory)
admin_LDAPGroupObjectClassList                                                  : Llista de objectClass
admin_LDAPGroupObjectClassListExample                                           : Llista de ObjectClass que defineixen els atributs d'un registre (ex: top, groupOfUniqueNames)
admin_LDAPContactObjectClassList                                                : Llista de objectClass
admin_LDAPContactObjectClassListExample                                         : Llista de objectClass que defineixen els atributs d'un registre (ex: top, inetorgperson o top, user for active directory)
admin_LDAPMemberTypeDn                                                          : DN dels tipus de membres
admin_LDAPMemberTypeDnExample                                                   : DN complet (ej: ou=type_members,dc=society,dc=com)
admin_LDAPTestConnect                                                           : Provar la connexió LDAP
admin_LDAPTestSynchroContact                                                    : Provar la sincronització de contactes
admin_LDAPTestSynchroUser                                                       : Provar la sincronització d'usuaris
admin_LDAPTestSynchroGroup                                                      : Provar la sincronització de grups
admin_LDAPTestSynchroMember                                                     : Provar la sincronització de membres
admin_LDAPSynchroOK                                                             : Prova de sincronització realitzada correctament
admin_LDAPSynchroKO                                                             : Prova de sincronització errònia
admin_LDAPSynchroKOMayBePermissions                                             : Error de la prova de sincronització. Comproveu que la connexió al servidor sigui correcta i que permet les actualitzacions LDAP
admin_LDAPTCPConnectOK                                                          : Connexió TCP al servidor LDAP efectuada (Servidor=%s, Port=%s)
admin_LDAPTCPConnectKO                                                          : Error de connexió TCP al servidor LDAP (Servidor=%s, Port=%s)
admin_LDAPBindOK                                                                : Connexió/Autenticació al servidor LDAP aconseguida (Servidor=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPBindKO                                                                : Error de connexió/autenticació al servidor LDAP (Servidor=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPUnbindSuccessfull                                                     : Desconnexió realitzada
admin_LDAPUnbindFailed                                                          : Desconnexió fallada
admin_LDAPConnectToDNSuccessfull                                                : Connexió a DN (%s) realitzada
admin_LDAPConnectToDNFailed                                                     : Connexió a DN (%s) fallada
admin_LDAPSetupForVersion3                                                      : Servidor LDAP configurat en versió 3
admin_LDAPSetupForVersion2                                                      : Servidor LDAP configurat en versió 2
admin_LDAPSpeedealingMapping                                                    : Speedealing Mapping
admin_LDAPLdapMapping                                                           : Mapping LDAP
admin_LDAPFieldLoginUnix                                                        : Login (unix)
admin_LDAPFieldLoginExample                                                     : Exemple : uid
admin_LDAPFilterConnection                                                      : Filtre de cerca
admin_LDAPFilterConnectionExample                                               : Exemple : &(objectClass=inetOrgPerson)
admin_LDAPFieldLoginSamba                                                       : Login (samba, activedirectory)
admin_LDAPFieldLoginSambaExample                                                : Exemple : samaccountname
admin_LDAPFieldFullname                                                         : Nom complet
admin_LDAPFieldFullnameExample                                                  : Exemple : cn
admin_LDAPFieldPassword                                                         : Contrasenya
admin_LDAPFieldPasswordNotCrypted                                               : Contrasenya no encriptada
admin_LDAPFieldPasswordCrypted                                                  : Contrasenya encriptada
admin_LDAPFieldPasswordExample                                                  : Exemple : userPassword
admin_LDAPFieldCommonName                                                       : Nom comú
admin_LDAPFieldCommonNameExample                                                : Exemple : cn
admin_LDAPFieldName                                                             : Nom
admin_LDAPFieldNameExample                                                      : Exemple : sn
admin_LDAPFieldFirstName                                                        : Nom
admin_LDAPFieldFirstNameExample                                                 : Exemple : givenname
admin_LDAPFieldMail                                                             : E-Mail
admin_LDAPFieldMailExample                                                      : Exemple : mail
admin_LDAPFieldPhone                                                            : Telèfon treball
admin_LDAPFieldPhoneExample                                                     : Exemple : telephonenumber
admin_LDAPFieldHomePhone                                                        : Telèfon personal
admin_LDAPFieldHomePhoneExample                                                 : Exemple : homephone
admin_LDAPFieldMobile                                                           : Telèfon mòbil
admin_LDAPFieldMobileExample                                                    : Exemple : mobile
admin_LDAPFieldFax                                                              : Fax
admin_LDAPFieldFaxExample                                                       : Exemple : facsimiletelephonenumber
admin_LDAPFieldAddress                                                          : Adreça
admin_LDAPFieldAddressExample                                                   : Exemple : street
admin_LDAPFieldZip                                                              : Codi postal
admin_LDAPFieldZipExample                                                       : Exemple : postalcode
admin_LDAPFieldTown                                                             : Població
admin_LDAPFieldTownExample                                                      : Exemple : l
admin_LDAPFieldCountry                                                          : Pais
admin_LDAPFieldCountryExample                                                   : Exemple : c
admin_LDAPFieldDescription                                                      : Descripció
admin_LDAPFieldDescriptionExample                                               : Exemple : description
admin_LDAPFieldGroupMembers                                                     : Membres del grup
admin_LDAPFieldGroupMembersExample                                              : Exemple: uniqueMember
admin_LDAPFieldBirthdate                                                        : Data de naixement
admin_LDAPFieldBirthdateExample                                                 : Exemple :
admin_LDAPFieldCompany                                                          : Empresa
admin_LDAPFieldCompanyExample                                                   : Exemple : o
admin_LDAPFieldSid                                                              : SID
admin_LDAPFieldSidExample                                                       : Exemple : objectsid
admin_LDAPFieldEndLastSubscription                                              : Data finalització com a membre
admin_LDAPParametersAreStillHardCoded                                           : Els paràmetres LDAP són codificats en dur (a la classe contact)
admin_LDAPSetupNotComplete                                                      : Configuració LDAP incompleta (a completar en les altres pestanyes)
admin_LDAPNoUserOrPasswordProvidedAccessIsReadOnly                              : Administrador o contrasenya no indicats. Els accessos LDAP seran anònims i en només lectura.
admin_LDAPDescContact                                                           : Aquesta pàgina permet definir el nom dels atributs de l'arbre LDAP per a cada informació dels contactes Dolibarr.
admin_LDAPDescUsers                                                             : Aquesta pàgina permet definir el nom dels atributs de l'arbre LDAP per a cada informació dels usuaris Dolibarr.
admin_LDAPDescGroups                                                            : Aquesta pàgina permet definir el nom dels atributs de l'arbre LDAP per a cada informació dels grups usuaris Dolibarr.
admin_LDAPDescMembers                                                           : Aquesta pàgina permet definir el nom dels atributs de l'arbre LDAP per a cada informació dels membres del mòdul Associacions Dolibarr.
admin_LDAPDescValues                                                            : Els valors d'exemples s'adapten a <b>OpenLDAP</b> amb els schemas carregats: <b>core.schema, cosine.schema, inetorgperson.schema </b>). Si vostè utilitza els a valors suggerits i OpenLDAP, modifiqui el seu fitxer de configuració LDAP <b>slapd.conf </b> per a tenir tots aquests schemas actius.
admin_ForANonAnonymousAccess                                                    : Per un accés autentificat
admin_ProductSetup                                                              : Configuració del mòdul Productes
admin_ServiceSetup                                                              : Configuració del mòdul Serveis
admin_ProductServiceSetup                                                       : Configuración dels mòduls Productos i Serveis
admin_NumberOfProductShowInSelect                                               : Nº de productes màx a les llistes (0= sense límit)
admin_ConfirmDeleteProductLineAbility                                           : Confirmació d'eliminació d'una línia de producte en els formularis
admin_ModifyProductDescAbility                                                  : Personalització de les descripcions dels productes en els formularis
admin_ViewProductDescInFormAbility                                              : Visualització de les descripcions dels productes en els formularis
admin_ViewProductDescInThirdpartyLanguageAbility                                : Visualització de les descripcions de productes en l'idioma del tercer
admin_UseSearchToSelectProduct                                                  : Utilitzar un formulari de cerca per a la selecció d'un producte (en lloc de la llista desplegable). Tingueu en compte que si té un nombre important de productes o serveis (> 100 000), pot millorar el rendiment definint la constant PRODUCT_DONOTSEARCH_ANYWHERE a 1 a Configuració->Varis. La cerca quedarà limitada a l'inici de la cadena.
admin_UseEcoTaxeAbility                                                         : Assumir ecotaxa (DEEE)
admin_SetDefaultBarcodeTypeProducts                                             : Tipus de codi de barres utilitzat per defecte per als productes
admin_SetDefaultBarcodeTypeThirdParties                                         : Tipus de codi de barres utilitzat per defecte per als tercers
admin_ProductCodeChecker                                                        : Mòdul per a la generació i comprovació del codi d'un producte o servei
admin_ProductOtherConf                                                          : Configuració de productes/serveis
admin_SyslogSetup                                                               : Configuració del mòdul Syslog
admin_SyslogOutput                                                              : Sortida del log
admin_SyslogSyslog                                                              : Syslog
admin_SyslogFacility                                                            : Facilitat
admin_SyslogLevel                                                               : Nivell
admin_SyslogSimpleFile                                                          : Arxiu
admin_SyslogFilename                                                            : Nom i ruta de l'arxiu
admin_YouCanUseDOL_DATA_ROOT                                                    : Podeu utilitzar DOL_DATA_ROOT/dolibarr.log per a un registre a la carpeta documents de Dolibarr. Tanmateix, pot establir una carpeta diferent per guardar aquest arxiu.
admin_ErrorUnknownSyslogConstant                                                : La constant %s no és una constant syslog coneguda
admin_OnlyWindowsLOG_USER                                                       : Windows només suporta LOG_USER
admin_DonationsSetup                                                            : Configuració del mòdul donacions
admin_DonationsReceiptModel                                                     : Model recepció de donacions
admin_BarcodeSetup                                                              : Configuració dels codis de barra
admin_PaperFormatModule                                                         : Mòduls de formats d'impressió
admin_BarcodeEncodeModule                                                       : Mòduls de codificació dels codis de barra
admin_UseBarcodeInProductModule                                                 : Utilitzar els codis de barra en els productes
admin_CodeBarGenerator                                                          : Generador del codi
admin_ChooseABarCode                                                            : Cap generador seleccionat
admin_FormatNotSupportedByGenerator                                             : Format no generat per aquest generador
admin_BarcodeDescEAN8                                                           : Codis de barra tipus EAN8
admin_BarcodeDescEAN13                                                          : Codis de barra tipus EAN13
admin_BarcodeDescUPC                                                            : Codis de barra tipus UPC
admin_BarcodeDescISBN                                                           : Codis de barra tipus ISBN
admin_BarcodeDescC39                                                            : Codis de barra tipus C39
admin_BarcodeDescC128                                                           : Codis de barra tipus C128
admin_WithdrawalsSetup                                                          : Configuració del mòdul domiciliacions
admin_ExternalRSSSetup                                                          : Configuració de les importacions del flux RSS
admin_NewRSS                                                                    : Sindicació de un nou flux RSS
admin_RSSUrl                                                                    : URL del RSS
admin_RSSUrlExample                                                             : Un flux RSS interessant
admin_MailingSetup                                                              : Configuració del mòdul E-Mailing
admin_MailingEMailFrom                                                          : E-Mail emissor (From) dels correus enviats per E-Mailing
admin_MailingEMailError                                                         : E-mail de resposta (Errors-to) per a les respostes sobre enviaments per e-mailing amb error.
admin_NotificationSetup                                                         : Configuració del mòdul notificacions
admin_NotificationEMailFrom                                                     : E-Mail emissor (From) dels correus enviats a través de notificacions
admin_ListOfAvailableNotifications                                              : Llistat de notificacions disponibles (depèn dels mòduls activats)
admin_SendingsSetup                                                             : Configuració del mòdul Expedicions
admin_SendingsReceiptModel                                                      : Model de notes de lliurament
admin_SendingsNumberingModules                                                  : Mòduls de numeració de notes de lliurament
admin_SendingsAbility                                                           : Ús de notes de lliurament per als enviaments a clients
admin_NoNeedForDeliveryReceipts                                                 : En la majoria dels casos, les notes de lliurament (llista de productes enviats) també actuen com a notes de recepció i són signades pel client. La gestió de les notes de recepció és per tant redundant i poques vegades s'activarà.
admin_FreeLegalTextOnShippings                                                  : Menció complementària en les notes de lliurament
admin_DeliveryOrderNumberingModules                                             : Mòdul de numeració de les notes de recepció
admin_DeliveryOrderModel                                                        : Model de notes de recepció
admin_DeliveriesOrderAbility                                                    : Ús de notes de recepció
admin_FreeLegalTextOnDeliveryReceipts                                           : Text lliure a les notes de recepció
admin_AdvancedEditor                                                            : Editor avançat
admin_ActivateFCKeditor                                                         : Activar editor avançat per a :
admin_FCKeditorForCompany                                                       : Creació/edició WYSIWIG de la descripció i notes dels tercers
admin_FCKeditorForProduct                                                       : Creació/edició WYSIWIG de la descripció i notes dels productes/serveis
admin_FCKeditorForProductDetails                                                : Creació/edició WYSIWIG de les línies de detall dels productes (en comandes, pressupostos, factures, etc.)
admin_FCKeditorForMailing                                                       : Creació/edició WYSIWIG dels E-Mails
admin_StockSetup                                                                : Configuració del mòdul Stock
admin_UserWarehouse                                                             : Utilitzar els stocks personals d'usuaris
admin_MenuDeleted                                                               : Menú eliminat
admin_TreeMenu                                                                  : Estructura dels menús
admin_Menus                                                                     : Menús
admin_TreeMenuPersonalized                                                      : Menús personalitzats
admin_NewMenu                                                                   : Nou menú
admin_MenuConf                                                                  : Configuració dels menús
admin_Menu                                                                      : Selecció dels menús
admin_MenuHandler                                                               : Gestor de menús
admin_MenuModule                                                                : Mòdul origen
admin_HideUnauthorizedMenu                                                      : Amaga també els menús no autoritzats a usuaris interns (si no només atenuats)
admin_DetailId                                                                  : Identificador del menú
admin_DetailMenuHandler                                                         : Nom del gestor de menús
admin_DetailMenuModule                                                          : Nom del mòdul si l'entrada del menú és resultant d'un mòdul
admin_DetailType                                                                : Tipus de menú (superior o esquerre)
admin_DetailTitre                                                               : Etiqueta de menú
admin_DetailMainmenu                                                            : Grup al qual pertany (obsolet)
admin_DetailUrl                                                                 : URL de la pàgina cap a la qual el menú apunta
admin_DetailLeftmenu                                                            : Condició de visualització o no (obsolet)
admin_DetailEnabled                                                             : Condició de mostrar o no
admin_DetailRight                                                               : Condició de visualització completa o vidrossa
admin_DetailLangs                                                               : Arxiu langs per a la traducció del títol
admin_DetailUser                                                                : Intern / Extern / Tots
admin_Target                                                                    : Target
admin_DetailTarget                                                              : Objectiu
admin_DetailLevel                                                               : Nivell (-1:menú superior, 0:principal, >0 menú y submenú)
admin_ModifMenu                                                                 : Modificació del menú
admin_DeleteMenu                                                                : Eliminar entrada de menú
admin_ConfirmDeleteMenu                                                         : Esteu segur que voleu eliminar l'entrada de menú <b>%s</b> ?
admin_DeleteLine                                                                : Eliminació de línea
admin_ConfirmDeleteLine                                                         : Esteu segur de voler eliminar aquesta línia?
admin_TaxSetup                                                                  : Configuració del mòdul d'impostos, càrregues socials i dividends
admin_OptionVatMode                                                             : Opció de càrrega d'IVA
admin_OptionVATDefault                                                          : Estandard
admin_OptionVATDebitOption                                                      : Opció serveis a dèbit
admin_OptionVatDefaultDesc                                                      : La càrrega de l'IVA és: <br>-en l'enviament dels béns (en la pràctica s'usa la data de la factura)<br>-sobre el pagament pels serveis
admin_OptionVatDebitOptionDesc                                                  : La càrrega de l'IVA és: <br>-en l'enviament dels béns en la pràctica s'usa la data de la factura<br>-sobre la facturació dels serveis
admin_SummaryOfVatExigibilityUsedByDefault                                      : Moment d'exigibilitat per defecte l'IVA per a l'opció escollida:
admin_OnDelivery                                                                : Al lliurament
admin_OnPayment                                                                 : Al pagament
admin_OnInvoice                                                                 : A la factura
admin_SupposedToBePaymentDate                                                   : Data de pagament utilitzada
admin_SupposedToBeInvoiceDate                                                   : Data de factura utilitzada
admin_Buy                                                                       : Compra
admin_Sell                                                                      : Venda
admin_InvoiceDateUsed                                                           : Data utilitzada de factura
admin_YourCompanyDoesNotUseVAT                                                  : La seva empresa està configurada com no subjecta a l'IVA (Inici - Configuració - Empresa/Institució), per la qual cosa no hi ha opció per a la parametrització de l'IVA.
admin_AccountancyCode                                                           : Codi comptable
admin_AccountancyCodeSell                                                       : Codi comptable vendes
admin_AccountancyCodeBuy                                                        : Codi comptable compres
admin_AgendaSetup                                                               : Mòdul configuració d'accions i agenda
admin_PasswordTogetVCalExport                                                   : Clau d'autorització vCal export link
admin_PastDelayVCalExport                                                       : No exportar els esdeveniments de més de
admin_ClickToDialDesc                                                           : Aquest mòdul permet afegir una icona després del número de telèfon de contactes Dolibarr. Un clic en aquesta icona, Truca a un servidor amb un URL que s'indica a continuació. Això pot ser usat per anomenar al sistema centre de Dolibarr que pot trucar al número de telèfon en un sistema SIP, per exemple.
admin_CashDesk                                                                  : TPV
admin_CashDeskSetup                                                             : Mòdul de configuració Terminal Punt de Venda
admin_CashDeskThirdPartyForSell                                                 : Tercer genéric a utilitzar per a les vendes
admin_CashDeskBankAccountForSell                                                : Compte per defecte a utilitzar per als cobraments en efectiu (caixa)
admin_CashDeskBankAccountForCheque                                              : Compte per defecte a utilitzar per als cobraments amb xecs
admin_CashDeskBankAccountForCB                                                  : Compte per defecte a utilitzar per als cobraments amb targeta de crèdit
admin_CashDeskIdWareHouse                                                       : Magatzem a ultilitzar per a les vendes
admin_BookmarkSetup                                                             : Configuració del mòdul Bookmark
admin_BookmarkDesc                                                              : Aquest mòdul li permet gestionar els enllaços i accessos directes. També permet afegir qualsevol pàgina de Dolibarr o enllaç web al menú d'accés ràpid de l'esquerra.
admin_NbOfBoomarkToShow                                                         : Nombre màxim de marcadors que es mostrarà en el menú
admin_WebServicesSetup                                                          : Configuració del mòdul webservices
admin_WebServicesDesc                                                           : Mitjançant l'activació d'aquest mòdul, Dolibarr es converteix en el servidor de serveis web oferint diversos serveis web.
admin_WSDLCanBeDownloadedHere                                                   : La descripció WSDL dels serveis prestats es poden recuperar aquí
admin_EndPointIs                                                                : Els clients SOAP hauran d'enviar les seves sol·licituds al punt final a la URL Dolibarr
admin_BankSetupModule                                                           : Configuració del mòdul Banc
admin_FreeLegalTextOnChequeReceipts                                             : Menció complementària a les remeses de xecs
admin_BankOrderShow                                                             : Ordre de visualització dels comptes bancaris segons països en usar la "compte de banc detallada"
admin_BankOrderGlobal                                                           : General
admin_BankOrderGlobalDesc                                                       : Ordre de visualització general
admin_BankOrderES                                                               : Espanyol
admin_BankOrderESDesc                                                           : Ordre de visualització espanyol
admin_MultiCompanySetup                                                         : Configuració del mòdul Multi-empresa
admin_SuppliersSetup                                                            : Configuració del mòdul Proveïdors
admin_SuppliersCommandModel                                                     : Model de comandes a proveïdors complet (logo...)
admin_SuppliersInvoiceModel                                                     : Model de factures de proveïdors complet (logo...)
admin_GeoIPMaxmindSetup                                                         : Configuració del mòdul GeoIP  Maxmind
admin_PathToGeoIPMaxmindCountryDataFile                                         : Ruta de l'arxiu Maxmind que conté les conversions IP-> País.<br>Exemple: /usr/local/share/GeoIP/GeoIP.dat
admin_NoteOnPathLocation                                                        : Tingueu en compte que aquest arxiu ha d'estar en una carpeta accessible desde la seva PHP (Comproveu la configuració de open_basedir de la seva PHP i els permisos d'arxiu/carpetes).
admin_YouCanDownloadFreeDatFileTo                                               : Pot descarregar-se una <b>versió demo gratuïta</b> de l'arxiu de països  Maxmind GeoIP a l'adreça %s.
admin_YouCanDownloadAdvancedDatFileTo                                           : També pot descarregar-se una <b>versió més completa</b> de l'arxiu de països Maxmind GeoIP a l'adreça %s.
admin_TestGeoIPResult                                                           : Test de conversió IP -> País
admin_ProjectsNumberingModules                                                  : Mòdul de numeració per a les referències dels projectes
admin_ProjectsSetup                                                             : Configuració del mòdul Projectes
admin_ProjectsModelModule                                                       : Model de document per a informes de projectes
admin_Chartofaccounts                                                           : Plan comptable
admin_Definechartofaccounts                                                     : Définir un plan comptable
admin_Selectchartofaccounts                                                     : Sélection d'un plan comptable
admin_DoNotSuggestChart                                                         : Ne pas suggérer de plan comptable
dict_CountryFR                                                                  : França
dict_CountryBE                                                                  : Bèlgica
dict_CountryIT                                                                  : Itàlia
dict_CountryES                                                                  : Espanya
dict_CountryDE                                                                  : Alemanya
dict_CountryCH                                                                  : Suïssa
dict_CountryGB                                                                  : Regne Unit
dict_CountryIE                                                                  : Irlanda
dict_CountryCN                                                                  : Xina
dict_CountryTN                                                                  : Tunísia
dict_CountryUS                                                                  : Estats Units
dict_CountryMA                                                                  : Marroc
dict_CountryDZ                                                                  : Algèria
dict_CountryCA                                                                  : Canadà
dict_CountryTG                                                                  : Togo
dict_CountryGA                                                                  : Gabon
dict_CountryNL                                                                  : Països Baixos
dict_CountryHU                                                                  : Hongria
dict_CountryRU                                                                  : Rússia
dict_CountrySE                                                                  : Suècia
dict_CountryCI                                                                  : Costa d'Ivori
dict_CountrySN                                                                  : Senegal
dict_CountryAR                                                                  : Argentina
dict_CountryCM                                                                  : Camerun
dict_CountryPT                                                                  : Portugal
dict_CountrySA                                                                  : Aràbia Saudita
dict_CountryMC                                                                  : Mònaco
dict_CountryAU                                                                  : Austràlia
dict_CountrySG                                                                  : Singapur
dict_CountryAF                                                                  : Afganistan
dict_CountryAX                                                                  : Illes Aland
dict_CountryAL                                                                  : Albània
dict_CountryAS                                                                  : Samoa américaines
dict_CountryAD                                                                  : Andorra
dict_CountryAO                                                                  : Angola
dict_CountryAI                                                                  : Anguilla
dict_CountryAQ                                                                  : Antàrtida
dict_CountryAG                                                                  : Antigua i Barbuda
dict_CountryAM                                                                  : Armènia
dict_CountryAW                                                                  : Aruba
dict_CountryAT                                                                  : Àustria
dict_CountryAZ                                                                  : Azerbaidjan
dict_CountryBS                                                                  : Bahames
dict_CountryBH                                                                  : Bahrain
dict_CountryBD                                                                  : Bangla Desh
dict_CountryBB                                                                  : Barbade
dict_CountryBY                                                                  : Biélorusia
dict_CountryBZ                                                                  : Belize
dict_CountryBJ                                                                  : Benín
dict_CountryBM                                                                  : Bermudes
dict_CountryBT                                                                  : Bhutan
dict_CountryBO                                                                  : Bolívia
dict_CountryBA                                                                  : Bòsnia i Hercegovina
dict_CountryBW                                                                  : Botswana
dict_CountryBV                                                                  : Illa Bouvet
dict_CountryBR                                                                  : Brasil
dict_CountryIO                                                                  : Territori Britànic de l'Oceà Índic
dict_CountryBN                                                                  : Brunei
dict_CountryBG                                                                  : Bulgària
dict_CountryBF                                                                  : Burkina Faso
dict_CountryBI                                                                  : Burundi
dict_CountryKH                                                                  : Cambodja
dict_CountryCV                                                                  : Cap Verd
dict_CountryKY                                                                  : Illes Caiman
dict_CountryCF                                                                  : República Centreafricana
dict_CountryTD                                                                  : Txad
dict_CountryCL                                                                  : Xile
dict_CountryCX                                                                  : Illa Christmas
dict_CountryCC                                                                  : Illes Cocos (Keeling)
dict_CountryCO                                                                  : Colòmbia
dict_CountryKM                                                                  : Comores
dict_CountryCG                                                                  : Congo
dict_CountryCD                                                                  : República Democràtica del Congo
dict_CountryCK                                                                  : Illes Cook
dict_CountryCR                                                                  : Costa Rica
dict_CountryHR                                                                  : Croàcia
dict_CountryCU                                                                  : Cuba
dict_CountryCY                                                                  : Xipre
dict_CountryCZ                                                                  : República Txeca
dict_CountryDK                                                                  : Dinamarca
dict_CountryDJ                                                                  : Djibouti
dict_CountryDM                                                                  : Dominica
dict_CountryDO                                                                  : República Dominicana
dict_CountryEC                                                                  : Equador
dict_CountryEG                                                                  : Egipte
dict_CountrySV                                                                  : Salvador
dict_CountryGQ                                                                  : Guinea Equatorial
dict_CountryER                                                                  : Eritrea
dict_CountryEE                                                                  : Estònia
dict_CountryET                                                                  : Etiòpia
dict_CountryFK                                                                  : Illes Malvines
dict_CountryFO                                                                  : Illes Feroe
dict_CountryFJ                                                                  : Illes Fiji
dict_CountryFI                                                                  : Finlàndia
dict_CountryGF                                                                  : Guaiana francesa
dict_CountryPF                                                                  : Polinèsia francesa
dict_CountryTF                                                                  : Territoris australs francesos
dict_CountryGM                                                                  : Gàmbia
dict_CountryGE                                                                  : Geòrgia
dict_CountryGH                                                                  : Ghana
dict_CountryGI                                                                  : Gibraltar
dict_CountryGR                                                                  : Grècia
dict_CountryGL                                                                  : Groenlàndia
dict_CountryGD                                                                  : Granada
dict_CountryGP                                                                  : Guadeloupe
dict_CountryGU                                                                  : Guam
dict_CountryGT                                                                  : Guatemala
dict_CountryGN                                                                  : Guinea
dict_CountryGW                                                                  : Guinea Bissau
dict_CountryGY                                                                  : Guyana
dict_CountryHT                                                                  : Haití
dict_CountryHM                                                                  : Illa Heard i Illes McDonald
dict_CountryVA                                                                  : Santa Seu (Vaticà)
dict_CountryHN                                                                  : Hondures
dict_CountryHK                                                                  : Hong Kong
dict_CountryIS                                                                  : Islàndia
dict_CountryIN                                                                  : Índia
dict_CountryID                                                                  : Indonèsia
dict_CountryIR                                                                  : Iran
dict_CountryIQ                                                                  : Iraq
dict_CountryIL                                                                  : Israel
dict_CountryJM                                                                  : Jamaica
dict_CountryJP                                                                  : Japó
dict_CountryJO                                                                  : Jordània
dict_CountryKZ                                                                  : Kazakhstan
dict_CountryKE                                                                  : Kènia
dict_CountryKI                                                                  : Kiribati
dict_CountryKP                                                                  : Corea del Nord
dict_CountryKR                                                                  : Corea del Sud
dict_CountryKW                                                                  : Kuwait
dict_CountryKG                                                                  : Kirguizistan
dict_CountryLA                                                                  : Laos
dict_CountryLV                                                                  : Letònia
dict_CountryLB                                                                  : Líban
dict_CountryLS                                                                  : Lesotho
dict_CountryLR                                                                  : Libèria
dict_CountryLY                                                                  : Líbia
dict_CountryLI                                                                  : Liechtenstein
dict_CountryLT                                                                  : Lituània
dict_CountryLU                                                                  : Luxemburg
dict_CountryMO                                                                  : Macao
dict_CountryMK                                                                  : Antiga República Iugoslava de Macedònia
dict_CountryMG                                                                  : Madagascar
dict_CountryMW                                                                  : Malawi
dict_CountryMY                                                                  : Malàisia
dict_CountryMV                                                                  : Maldives
dict_CountryML                                                                  : Mali
dict_CountryMT                                                                  : Malta
dict_CountryMH                                                                  : Illes Marshall
dict_CountryMQ                                                                  : Martinica
dict_CountryMR                                                                  : Mauritània
dict_CountryMU                                                                  : Maurici
dict_CountryYT                                                                  : Mayotte
dict_CountryMX                                                                  : Mèxic
dict_CountryFM                                                                  : Micronesia
dict_CountryMD                                                                  : Moldàvia
dict_CountryMN                                                                  : Mongòlia
dict_CountryMS                                                                  : Monserrat
dict_CountryMZ                                                                  : Moçambic
dict_CountryMM                                                                  : Birmània (Myanmar)
dict_CountryNA                                                                  : Namíbia
dict_CountryNR                                                                  : Nauru
dict_CountryNP                                                                  : Nepal
dict_CountryAN                                                                  : Antilles Holandeses
dict_CountryNC                                                                  : Nova Caledònia
dict_CountryNZ                                                                  : Nouvelle-Zélande
dict_CountryNI                                                                  : Nicaragua
dict_CountryNE                                                                  : Níger
dict_CountryNG                                                                  : Nigèria
dict_CountryNU                                                                  : Niue
dict_CountryNF                                                                  : Illa Norfolk
dict_CountryMP                                                                  : Illes Mariannes del Nord
dict_CountryNO                                                                  : Noruega
dict_CountryOM                                                                  : Oman
dict_CountryPK                                                                  : Pakistan
dict_CountryPW                                                                  : Palau
dict_CountryPS                                                                  : Territori Ocupat Palestí
dict_CountryPA                                                                  : Panamà
dict_CountryPG                                                                  : Papua Nova Guinea
dict_CountryPY                                                                  : Paraguai
dict_CountryPE                                                                  : Perú
dict_CountryPH                                                                  : Filipines
dict_CountryPN                                                                  : Pitcairn
dict_CountryPL                                                                  : Polònia
dict_CountryPR                                                                  : Puerto Rico
dict_CountryQA                                                                  : Qatar
dict_CountryRE                                                                  : Reunió
dict_CountryRO                                                                  : Romania
dict_CountryRW                                                                  : Ruanda
dict_CountrySH                                                                  : Santa Elena
dict_CountryKN                                                                  : Saint Christopher i Nevis
dict_CountryLC                                                                  : Santa Llúcia
dict_CountryPM                                                                  : San Pedro i Miquelon
dict_CountryVC                                                                  : Saint Vincent i les Grenadines
dict_CountryWS                                                                  : Samoa
dict_CountrySM                                                                  : San Marino
dict_CountryST                                                                  : São Tomé i Príncipe
dict_CountryRS                                                                  : Serbia
dict_CountrySC                                                                  : Seychelles
dict_CountrySL                                                                  : Sierra Leone
dict_CountrySK                                                                  : Eslovàquia
dict_CountrySI                                                                  : Eslovènia
dict_CountrySB                                                                  : Illes Salomó
dict_CountrySO                                                                  : Somàlia
dict_CountryZA                                                                  : Sud Àfrica
dict_CountryGS                                                                  : Illes Geòrgia del Sud i Sandwich del Sud
dict_CountryLK                                                                  : Sri Lanka
dict_CountrySD                                                                  : Sudan
dict_CountrySR                                                                  : Suriname
dict_CountrySJ                                                                  : Svalbard i Jan Mayen
dict_CountrySZ                                                                  : Swazilàndia
dict_CountrySY                                                                  : Síria
dict_CountryTW                                                                  : Taiwan
dict_CountryTJ                                                                  : Tadjikistan
dict_CountryTZ                                                                  : Tanzània
dict_CountryTH                                                                  : Tailàndia
dict_CountryTL                                                                  : Timor Oriental
dict_CountryTK                                                                  : Tokelau
dict_CountryTO                                                                  : Tonga
dict_CountryTT                                                                  : Trinité-et-Tobago
dict_CountryTR                                                                  : Turquia
dict_CountryTM                                                                  : Turkmenistan
dict_CountryTC                                                                  : Illes Turks i Caicos
dict_CountryTV                                                                  : Tuvalu
dict_CountryUG                                                                  : Uganda
dict_CountryUA                                                                  : Ucraïna
dict_CountryAE                                                                  : Emirats Àrabs Units
dict_CountryUM                                                                  : Illes menors allunyades dels Estats Units
dict_CountryUY                                                                  : Uruguai
dict_CountryUZ                                                                  : Uzbekistan
dict_CountryVU                                                                  : Vanuatu
dict_CountryVE                                                                  : Veneçuela
dict_CountryVN                                                                  : Vietnam
dict_CountryVG                                                                  : Illes Verges Britàniques
dict_CountryVI                                                                  : Illes Verges
dict_CountryWF                                                                  : Wallis i Futuna
dict_CountryEH                                                                  : Sàhara Occidental
dict_CountryYE                                                                  : Yemen
dict_CountryZM                                                                  : Zàmbia
dict_CountryZW                                                                  : Zimbabwe
dict_CountryGG                                                                  : Guernesey
dict_CountryIM                                                                  : Ile de Man
dict_CountryJE                                                                  : Jersey
dict_CountryME                                                                  : Monténégro
dict_CountryBL                                                                  : Saint-Barthélemy
dict_CountryMF                                                                  : Saint-Martin
dict_CivilityMME                                                                : Senyora
dict_CivilityMR                                                                 : Senyor
dict_CivilityMLE                                                                : Senyoreta
dict_CivilityMTRE                                                               : En
dict_CivilityDR                                                                 : Doctor
dict_Currencyeuros                                                              : Euros
dict_CurrencyAUD                                                                : Dòlars Aus.
dict_CurrencySingAUD                                                            : Dòlar Aus.
dict_CurrencyCAD                                                                : Dòlars Can.
dict_CurrencySingCAD                                                            : Dòlar Can.
dict_CurrencyCHF                                                                : Francs suïssos
dict_CurrencySingCHF                                                            : Franc suís
dict_CurrencyEUR                                                                : Euros
dict_CurrencySingEUR                                                            : Euro
dict_CurrencyFRF                                                                : Francs francesos
dict_CurrencySingFRF                                                            : Franc francès
dict_CurrencyGBP                                                                : Lliura esterlina
dict_CurrencySingGBP                                                            : Lliura esterlina
dict_CurrencyINR                                                                : Rupies índies
dict_CurrencySingINR                                                            : Rupia índia
dict_CurrencyMAD                                                                : Dhiram
dict_CurrencySingMAD                                                            : Dírham
dict_CurrencyMGA                                                                : Ariary
dict_CurrencySingMGA                                                            : Ariary
dict_CurrencyMUR                                                                : Rupies mauritanes
dict_CurrencySingMUR                                                            : Rupia mauritana
dict_CurrencyNOK                                                                : Corones noruegues
dict_CurrencySingNOK                                                            : Corona noruega
dict_CurrencyTND                                                                : TND
dict_CurrencySingTND                                                            : Dinar tunisià
dict_CurrencyUSD                                                                : Dòlars USA
dict_CurrencySingUSD                                                            : Dòlar USA
dict_CurrencyUAH                                                                : Hryvnia
dict_CurrencySingUAH                                                            : Hryvnia
dict_CurrencyXAF                                                                : Francs CFA BEAC
dict_CurrencySingXAF                                                            : Franc CFA BEAC
dict_CurrencyXOF                                                                : Francs CFA BCEAO
dict_CurrencySingXOF                                                            : Franc CFA BCEAO
dict_CurrencyXPF                                                                : Francs CFP
dict_CurrencySingXPF                                                            : Franc CFP
dict_CurrencyCentSingEUR                                                        : cèntim
dict_CurrencyThousandthSingTND                                                  : mil·lèsim
dict_CurrencySUR                                                                : Roubles
dict_CurrencySingSUR                                                            : Rouble
dict_CurrencyTRL                                                                : Livres turques
dict_CurrencySingTRL                                                            : Livre turque
dict_DemandReasonTypeSRC_INTE                                                   : Internet
dict_DemandReasonTypeSRC_CAMP_MAIL                                              : Campanya correu
dict_DemandReasonTypeSRC_CAMP_EMAIL                                             : Campanya E-Mailing
dict_DemandReasonTypeSRC_CAMP_PHO                                               : Campanya telefònica
dict_DemandReasonTypeSRC_CAMP_FAX                                               : Campanya fax
dict_DemandReasonTypeSRC_COMM                                                   : Contacte comercial
dict_DemandReasonTypeSRC_SHOP                                                   : Contacte botiga
dict_DemandReasonTypeSRC_WOM                                                    : Boca a boca
dict_DemandReasonTypeSRC_PARTNER                                                : Soci
dict_DemandReasonTypeSRC_EMPLOYEE                                               : Empleat
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
errors_Errors                                                                   : Errors
errors_ErrorBadEMail                                                            : e-mail %s incorrecte
errors_ErrorBadUrl                                                              : Url %s invàlida
errors_ErrorRecordNotFound                                                      : Registre no trobat
errors_ErrorFailToCopyFile                                                      : Error al copiar l'arxiu '<b>%s</b>' a '<b>%s</b>'.
errors_ErrorFailToRenameFile                                                    : Error al renomenar l'arxiu '<b>%s</b>' a '<b>%s</b>'.
errors_ErrorFailToDeleteFile                                                    : Error al suprimir el fitxer '<b>%s</b>'.
errors_ErrorFailToCreateFile                                                    : Error al crear l'arxiu  '<b>%s</b>'
errors_ErrorFailToRenameDir                                                     : Error al renomenar la carpeta '<b>%s</b>' a '<b>%s</b>'.
errors_ErrorFailToCreateDir                                                     : Error al crear la carpeta '<b>%s</b>'
errors_ErrorFailToDeleteDir                                                     : Error en eliminar la carpeta '<b>%s</b>'.
errors_ErrorFailedToDeleteJoinedFiles                                           : Impossible eliminar l'entitat ja que té arxius adjunts. Esborreu abans els arxius adjunts
errors_ErrorThisContactIsAlreadyDefinedAsThisType                               : Aquest contacte ja està definit com a contacte per a aquest tipus.
errors_ErrorCashAccountAcceptsOnlyCashMoney                                     : Aquesta compte bancari és de tipus caixa i només accepta el mètode de pagament de tipus <b>espècie</b>.
errors_ErrorFromToAccountsMustDiffers                                           : El compte origen i destinació han de ser diferents.
errors_ErrorBadThirdPartyName                                                   : Nom de tercer incorrecte
errors_ErrorBadCustomerCodeSyntax                                               : La sintaxi del codi client és incorrecta
errors_ErrorCustomerCodeRequired                                                : Codi client obligatori
errors_ErrorCustomerCodeAlreadyUsed                                             : Codi de client ja utilitzat
errors_ErrorPrefixRequired                                                      : Prefix obligatori
errors_ErrorUrlNotValid                                                         : L'adreça del lloc web és incorrecta
errors_ErrorBadSupplierCodeSyntax                                               : La sintaxi del codi proveïdor és incorrecta
errors_ErrorSupplierCodeRequired                                                : Codi proveïdor obligatori
errors_ErrorSupplierCodeAlreadyUsed                                             : Codi de proveïdor ja utilitzat
errors_ErrorBadParameters                                                       : Paràmetres incorrectes
errors_ErrorBadValueForParameter                                                : Valor '%s' incorrecte per al paràmetre '%s'
errors_ErrorBadImageFormat                                                      : La imatge no té un format reconegut
errors_ErrorBadDateFormat                                                       : El valor '%s' té un format de data no reconegut
errors_ErrorFailedToWriteInDir                                                  : No es pot escriure a la carpeta %s
errors_ErrorFoundBadEmailInFile                                                 : Trobada sintaxi incorrecta en email a %s línies en fitxer (exemple linia %s amb email=%s)
errors_ErrorUserCannotBeDelete                                                  : L'usuari no pot ser eliminat. Potser estigui associat a elements de Speedealing.
errors_ErrorFieldsRequired                                                      : No s'han indicat alguns camps obligatoris
errors_ErrorFailedToCreateDir                                                   : Error en la creació d'una carpeta. Comprovi que l'usuari del servidor web té drets d'escriptura en les carpetes de documents de Speedealing. Si el paràmetre <b>safe_mode</b> està actiu en aquest PHP, Comproveu que els fitxers php speedealing pertanyen a l'usuari del servidor web.
errors_ErrorNoMailDefinedForThisUser                                            : E-Mail no definit per a aquest usuari
errors_ErrorFeatureNeedJavascript                                               : Aquesta funcionalitat requereix javascript actiu per funcionar. Modifiqueu en configuració->entorn.
errors_ErrorTopMenuMustHaveAParentWithId0                                       : Un menú del tipus 'Superior' no pot tenir un menú pare. Poseu 0 en l'ID pare o busqueu un menu del tipus 'Esquerra'
errors_ErrorLeftMenuMustHaveAParentId                                           : Un menú del tipus 'Esquerra' ha de tenir un ID de pare
errors_ErrorFileNotFound                                                        : Arxiu no trobat (ruta incorrecta, permisos incorrectes o accés prohibit pel paràmetre openbasedir)
errors_ErrorDirNotFound                                                         : Directori <b>%s</b> no trobat (Ruta incorrecta, permisos inadequats o accés prohibit pel paràmetre PHP openbasedir o safe_mode)
errors_ErrorFunctionNotAvailableInPHP                                           : La funció <b>%s</b> és requerida per aquesta característica, però no es troba disponible en aquesta versió/instal·lació de PHP.
errors_ErrorDirAlreadyExists                                                    : Ja existeix una carpeta amb aquest nom.
errors_ErrorFileAlreadyExists                                                   : Ja existeix un fitxer amb aquest nom.
errors_ErrorPartialFile                                                         : Arxiu no rebut íntegrament pel servidor.
errors_ErrorNoTmpDir                                                            : Directori temporal de recepció %s inexistent
errors_ErrorUploadBlockedByAddon                                                : Pujada bloquejada per un plugin PHP/Apache.
errors_ErrorFileSizeTooLarge                                                    : La mida del fitxer és massa gran.
errors_ErrorSizeTooLongForIntType                                               : Longitud del camp massa llarg per al tipus int (màxim %s xifres)
errors_ErrorSizeTooLongForVarcharType                                           : Longitud del camp massa llarg per al tipus cadena (màxim %s xifres)
errors_ErrorFieldCanNotContainSpecialCharacters                                 : El camp <b>%s</b> no ha de contenir caràcters especials
errors_ErrorNoAccountancyModuleLoaded                                           : Mòdul de comptabilitat no activat
errors_ErrorExportDuplicateProfil                                               : El nom del perfil ja existeix per a aquest lot d'exportació
errors_ErrorLDAPSetupNotComplete                                                : La configuració Speedealing-LDAP és incompleta.
errors_ErrorLDAPMakeManualTest                                                  : S'ha creat un arxiu .ldif a la carpeta %s. Tracti de carregar manualment aquest arxiu des de la línia de comandes per obtenir més informació sobre l'error.
errors_ErrorCantSaveADoneUserWithZeroPercentage                                 : No es pot canviar una acció al estat no començada si teniu un usuari realitzant de l'acció.
errors_ErrorRefAlreadyExists                                                    : La referència utilitzada per a la creació ja existeix
errors_ErrorPleaseTypeBankTransactionReportName                                 : Introduïu el nom del registre bancari sobre el qual l'escrit està constatat (format AAAAMM o AAAMMJJ)
errors_ErrorRecordHasChildren                                                   : No es pot esborrar el registre perquè té registrses fills.
errors_ErrorModuleRequireJavascript                                             : Javascript ha d'estar activat per a que aquesta opció pugui utilitzar-se. Per activar/desactivar JavaScript, aneu al menú Inici->Configuració->Entorn.
errors_ErrorPasswordsMustMatch                                                  : Les 2 contrasenyes indicades s'han de correspondre
errors_ErrorContactEMail                                                        : S'ha produït un error tècnic. Contacti amb l'administrador al e-mail <b>%s</b>, indicant el codi d'error <b>%s</b> en el seu missatge, o pot també adjuntar una còpia de pantalla d'aquesta pàgina.
errors_ErrorWrongValueForField                                                  : Valor incorrecte per al camp número <b>%s</b> (el valor '<b>%s</b>' no compleix amb la regla <b>%s</b>)
errors_ErrorFieldValueNotIn                                                     : Valor incorrecte per al camp nombre <b>%s</b> (el valor '<b>%s</b>' no es un valor en el camp <b>%s</b> de la taula <b>%s</b>)
errors_ErrorFieldRefNotIn                                                       : Valor incorrecte per al camp nombre <b>%s</b> (el valor '<b>%s</b>' no és una referència existent en <b>%s</b>)
errors_ErrorsOnXLines                                                           : Errors a <b>%s</b> línies font
errors_ErrorFileIsInfectedWithAVirus                                            : L'antivirus no ha pogut validar aquest arxiu (és probable que estigui infectat per un virus)!
errors_ErrorSpecialCharNotAllowedForField                                       : Els caràcters especials no són admesos pel camp "%s"
errors_ErrorDatabaseParameterWrong                                              : El paràmetre de configuració de la base de dades '<b>%s</b>' té un valor no compatible per una instal lació de Speedealing (ha de tenir el valor '<b>%s</b>').
errors_ErrorNumRefModel                                                         : Hi ha una referència a la base de dades (%s) i és incompatible amb aquesta numeració. Elimineu la línia o renomeneu la referència per activar aquest mòdul.
errors_ErrorQtyTooLowForThisSupplier                                            : Quantitat insuficient per aquest proveïdor
errors_ErrorModuleSetupNotComplete                                              : La configuració del mòdul sembla incompleta. Aneu al àrea Configuració - Mòduls per corregir
errors_ErrorBadMask                                                             : Error en la màscara
errors_ErrorBadMaskFailedToLocatePosOfSequence                                  : Error, sense número de seqüència en la màscara
errors_ErrorBadMaskBadRazMonth                                                  : Error, valor de tornada a 0 incorrecte
errors_ErrorSelectAtLeastOne                                                    : Error. Seleccioneu com a mínim una entrada.
errors_ErrorProductWithRefNotExist                                              : La referència de producte '<i>%s</i>' no existeix
errors_ErrorDeleteNotPossibleLineIsConsolidated                                 : Eliminació impossible ja que el registre està enllaçat a una transacció bancària conciliada
errors_ErrorProdIdAlreadyExist                                                  : %s es troba assignat a altre tercer
errors_ErrorFailedToSendPassword                                                : Error en l'enviament de la contrasenya
errors_ErrorFailedToLoadRSSFile                                                 : Error en la recuperació del flux RSS. Afegiu la constant MAIN_SIMPLEXMLLOAD_DEBUG si el missatge d'error no és molt explícit.
errors_ErrorPasswordDiffers                                                     : Les contrasenyes no són identiques, torni a introduir-les
errors_ErrorForbidden                                                           : Accés no autoritzat.<br>Intenta accedir a una pàgina, zona o funció sense estar en una sessió autentificada o que no s'autoritza per al seu compte d'usuari.
errors_ErrorForbidden2                                                          : Els permisos per a aquest usuari poden ser assignats per l'administrador Speedealing mitjançant el menú  %s-> %s.
errors_ErrorForbidden3                                                          : Speedealing no sembla funcionar en una sessió autentificada. Consulteu la documentació d'instal lació de Speedealing per saber com administrar les autenticacions (htacces, mod_auth o altre ...).
errors_ErrorNoImagickReadimage                                                  : La classe imagick_readimage no està present en aquesta instal lació de PHP. La ressenya no està doncs disponible. Els administradors poden desactivar aquesta pestanya en el menú Configuració->Visualització.
errors_ErrorRecordAlreadyExists                                                 : Registre ja existent
errors_ErrorCantReadFile                                                        : Error de lectura del fitxer '%s'
errors_ErrorCantReadDir                                                         : Error de lectura de la carpeta '%s'
errors_ErrorFailedToFindEntity                                                  : Error de lectura del entorn '%s'
errors_ErrorBadLoginPassword                                                    : Identificadors d'usuari o contrasenya incorrectes
errors_ErrorLoginDisabled                                                       : El seu compte està desactivat
errors_ErrorFailedToRunExternalCommand                                          : Error d'execució de la comanda extern. Comproveu que està disponible i executable per el seu servidor PHP. Si l'PHP <b>Safe Mode </b> està activat, comproveu que la comanda es troba en una carpeta definida en el paràmetre <b>safe_mode_exec_dir</b>.
errors_ErrorFailedToChangePassword                                              : Error en la modificació de la contrasenya
errors_ErrorLoginDoesNotExists                                                  : El compte d'usuari de <b>%s</b> no s'ha trobat.
errors_ErrorLoginHasNoEmail                                                     : Aquest usuari no té e-mail. Impossible continuar.
errors_ErrorBadValueForCode                                                     : Valor no vàlid per al codi. Torneu a intentar-ho amb un nou valor ...
errors_ErrorBothFieldCantBeNegative                                             : Els camps %s i %s no poden ser negatius
errors_ErrorWebServerUserHasNotPermission                                       : El compte d'execució del servidor web <b>%s</b> no disposa dels permisos per això
errors_ErrorNoActivatedBarcode                                                  : No hi ha activat cap tipus de codi de barres
errors_ErrUnzipFails                                                            : No s'ha pogut descomprimir el fitxer %s amb ZipArchive
errors_ErrNoZipEngine                                                           : En aquest PHP no hi ha motor per descomprimir l'arxiu %s
errors_ErrorFileMustBeASpeedealingPackage                                       : The file %s must be a Speedealing zip package
errors_ErrorFileRequired                                                        : Es requereix un fitxer de paquet Speedealing en format zip
errors_ErrorPhpCurlNotInstalled                                                 : L'extensió PHP CURL no es troba instal·lada, és indispensable per dialogar amb Paypal.
errors_ErrorFailedToAddToMailmanList                                            : S'ha produït un error en intentar afegir un registre a la llista Mailman o base de dades SPIP
errors_ErrorNewVaueCantMatchOldValue                                            : El Nou valor no pot ser igual al antic
errors_ErrorDuplicateTrigger                                                    : Un fichier trigger de classe '<b>%s</b>' est présent plusieurs fois. Supprimer le doublon du répertoire '<b>%s</b>'.
errors_SESSIONEXPIRE                                                            : La session est expirée
errors_WarningMandatorySetupNotComplete                                         : Mandatory setup parameters are not yet defined
errors_WarningSafeModeOnCheckExecDir                                            : Atenció, està activada l'opció PHP <b>safe_mode</b>, la comanda ha d'estar dins d'un directori declarat dins del paràmetre php <b>safe_mode_exec_dir</b>.
errors_WarningAllowUrlFopenMustBeOn                                             : El paràmetre <b>allow_url_fopen</b> ha de ser especificat a <b>on</b> a l'arxiu <b>php.ini</b> per disposar d'aquest mòdul completament actiu. Ha de modificar aquest arxiu manualment
errors_WarningBuildScriptNotRunned                                              : L'script <b>%s</b> encara no ha executat la construcció de gràfics.
errors_WarningBookmarkAlreadyExists                                             : Ja existeix un marcador amb aquest títol o aquest URL.
errors_WarningPassIsEmpty                                                       : Atenció: La contrasenya de la base de dades està buida. Això és un forat de seguretat. Cal afegir una contrasenya a la seva base de dades i canviar el seu arxiu conf.php per reflectir això.
errors_WarningConfFileMustBeReadOnly                                            : Atenció, el seu fitxer (<b>htdocs/conf/conf.php</b>) és accessible en escriptura al servidor web. Això representa un error seriós de seguretat. Modifiqueu els permisos per ser llegit únicament pel compte que executa el servidor Web.Si està executant Windows en undisco amb format FAT, sigui conscient que aquest sistema d'arxius no protegeix els arxius i no ofereix cap solució per reduir els riscos de manipulació d'aquest fitxer.
errors_WarningsOnXLines                                                         : Alertes a <b>%s</b> línies font
errors_WarningNoDocumentModelActivated                                          : No hi ha cap model per a la generació del document activat. Es prendrà un model per defecte fins que es configuri el mòdul.
errors_WarningLockFileDoesNotExists                                             : Atenció: Un cop acabada l'instal·lació, han de desactivar les eines d'instal·lació/actualització afegint l'arxiu <b>install.lock</b> al directori <b>%s</b>. L'absència d'aquest imatge mostra una fallada de seguretat.
errors_WarningUntilDirRemoved                                                   : Aquesta alerta seguirà activa mentre la carpeta existeixi (alerta visible per als usuaris admin solament).
errors_WarningCloseAlways                                                       : Avís, el tancament és realitzat encara que la quantitat total difereixi entre els elements d'origen i destí. Activi aquesta funcionalitat amb precaució.
errors_ErrorEnterYourLogin                                                      : Identifiant vide
errors_ErrorEnterYourPassword                                                   : Mot de passe vide
mails_Mailing                                                                   : E-Mailing
mails_EMailing                                                                  : E-Mailing
mails_Mailings                                                                  : E-Mailings
mails_EMailings                                                                 : E-Mailings
mails_AllEMailings                                                              : Tots els E-Mailings
mails_MailCard                                                                  : Fitxa E-Mailing
mails_MailTargets                                                               : Destinataris
mails_MailRecipients                                                            : Destinataris
mails_MailRecipient                                                             : Destinatari
mails_MailTitle                                                                 : Descripció
mails_MailFrom                                                                  : Remitent
mails_MailErrorsTo                                                              : Errors a
mails_MailReply                                                                 : Respondre a
mails_MailTo                                                                    : Destinatari(s)
mails_MailCC                                                                    : Còpia a
mails_MailCCC                                                                   : Adjuntar còpia a
mails_MailTopic                                                                 : Assumpte de l'e-mail
mails_MailText                                                                  : Missatge
mails_MailFile                                                                  : Arxiu
mails_MailMessage                                                               : Missatge de l'e-mail
mails_ShowEMailing                                                              : Mostrar E-Mailing
mails_ListOfEMailings                                                           : Llistat de E-Mailings
mails_NewMailing                                                                : Nou E-Mailing
mails_EditMailing                                                               : Editar E-Mailing
mails_ResetMailing                                                              : Nou enviament
mails_DeleteMailing                                                             : Eliminar E-Mailing
mails_DeleteAMailing                                                            : Eliminar un E-Mailing
mails_PreviewMailing                                                            : Previsualitzar un E-Mailing
mails_PrepareMailing                                                            : Preparar E-Mailing
mails_CreateMailing                                                             : Crear E-Mailing
mails_MailingDesc                                                               : Aquesta pàgina us permet enviar e-mails a un grup de persones.
mails_MailingResult                                                             : Resultat de l'enviament d'e-mails
mails_TestMailing                                                               : Provar E-Mailing
mails_ValidMailing                                                              : Validar E-Mailing
mails_ApproveMailing                                                            : Aprovar E-Mailing
mails_MailingStatusDraft                                                        : Esborrany
mails_MailingStatusValidated                                                    : Validat
mails_MailingStatusApproved                                                     : Aprovat
mails_MailingStatusSent                                                         : Enviat
mails_MailingStatusSentPartialy                                                 : Enviat parcialment
mails_MailingStatusSentCompletely                                               : Enviat completament
mails_MailingStatusError                                                        : Error
mails_MailingStatusNotSent                                                      : No enviat
mails_MailSuccessfulySent                                                       : E-mail enviat correctament (de %s a %s)
mails_MailingSuccessfullyValidated                                              : EMailing successfully validated
mails_MailUnsubcribe                                                            : Desubscriure
mails_Unsuscribe                                                                : Desubscriure
mails_MailingStatusNotContact                                                   : Don't contact anymore
mails_ErrorMailRecipientIsEmpty                                                 : L'adreça del destinatari és buida
mails_WarningNoEMailsAdded                                                      : Cap nou e-mail a afegir a la llista destinataris.
mails_ConfirmValidMailing                                                       : Confirmeu la validació del E-Mailing?
mails_ConfirmResetMailing                                                       : Atenció, en el reinici de l'E-Mailing <b>%s</b>, autoritza de nou la seva emissió en massa. És això el que vol fer?
mails_ConfirmDeleteMailing                                                      : Confirmeu l'eliminació del E-Mailing?
mails_NbOfRecipients                                                            : Nombre de destinataris
mails_NbOfUniqueEMails                                                          : Nº d'e-mails únics
mails_NbOfEMails                                                                : Nº de E-mails
mails_TotalNbOfDistinctRecipients                                               : Nombre de destinataris únics
mails_NoTargetYet                                                               : Cap destinatari definit
mails_AddRecipients                                                             : Afegeix destinataris
mails_RemoveRecipient                                                           : Eliminar destinatari
mails_CommonSubstitutions                                                       : Substitucions comuns
mails_YouCanAddYourOwnPredefindedListHere                                       : Per crear el seu mòdul de selecció e-mails, mireu htdocs /core/modules/mailings/README.
mails_EMailTestSubstitutionReplacedByGenericValues                              : En mode prova, les variables de substitució són substituïdes per valors genèrics
mails_MailingAddFile                                                            : Adjuntar aquest arxiu
mails_NoAttachedFiles                                                           : Sense fitxers adjunts
mails_BadEMail                                                                  : E-Mail incorrecte
mails_CloneEMailing                                                             : Clonar E-Mailing
mails_ConfirmCloneEMailing                                                      : Esteu segur de voler clonar aquest e-mailing?
mails_CloneContent                                                              : Clonar missatge
mails_CloneReceivers                                                            : Clonar destinataris
mails_DateLastSend                                                              : Data últim enviament
mails_DateSending                                                               : Data enviament
mails_SentTo                                                                    : Enviat a <b>%s</b>
mails_MailingStatusRead                                                         : Llegit
mails_CheckRead                                                                 : Confirmació de lectura
mails_YourMailUnsubcribeOK                                                      : El correu electrònic <b>%s</b>  és correcta desuscribe.
mails_MailtoEMail                                                               : mailto email (hyperlink)
mails_ActivateCheckRead                                                         : Activar confirmació de lectura i opció de Desubscripció
mails_ActivateCheckReadKey                                                      : Clau usada per xifrar la URL de la confirmació de lectura i la funció de desubscripció
mails_MailingModuleDescContactCompanies                                         : Contactes de tercers (clients potencials, clients, proveïdors ...)
mails_MailingModuleDescSpeedealingUsers                                         : Speedealing users
mails_MailingModuleDescFundationMembers                                         : Membres
mails_MailingModuleDescEmailsFromFile                                           : E-Mails d'un arxiu (e-mail;nom;varis)
mails_MailingModuleDescEmailsFromUser                                           : EMails from user input (email;lastname;firstname;other)
mails_MailingModuleDescContactsCategories                                       : Tercers (per categoria)
mails_MailingModuleDescSpeedealingContractsLinesExpired                         : Third parties with expired contract's lines
mails_MailingModuleDescContactsByCompanyCategory                                : Contactes de tercers (per categoria de tercers)
mails_MailingModuleDescMembersCategories                                        : Membres (per categoria)
mails_MailingModuleDescContactsByFunction                                       : Contactes de tercers (per lloc/funció)
mails_LineInFile                                                                : Línea %s en archiu
mails_RecipientSelectionModules                                                 : Mòduls de selecció dels destinataris
mails_MailSelectedRecipients                                                    : Destinataris seleccionats
mails_MailingArea                                                               : Àrea E-Mailings
mails_LastMailings                                                              : Els %s darrers E-Mailings
mails_TargetsStatistics                                                         : Estadístiques destinataris
mails_NbOfCompaniesContacts                                                     : Contactes únics d'empreses
mails_MailNoChangePossible                                                      : Destinataris d'un E-Mailing validat no modificables
mails_SearchAMailing                                                            : Cercar un E-Mailing
mails_SendMailing                                                               : Enviar E-Mailing
mails_SendMail                                                                  : Enviar e-mail
mails_SentBy                                                                    : Enviat por
mails_MailingNeedCommand                                                        : Per raons de seguretat, l'enviament d'un E-Mailing en massa es pot fer en línia de comandes. Demani al seu administrador que llanci la comanda següent per per enviar la correspondència a tots els destinataris:
mails_MailingNeedCommand2                                                       : Podeu enviar en línia afegint el paràmetre MAILING_LIMIT_SENDBYWEB amb un valor nombre que indica el màxim nombre d'e-mails enviats per sessió. Per això aneu a Inici - Configuració - Varis
mails_ConfirmSendingEmailing                                                    : Confirma l'enviament de l'e-mailing?
mails_LimitSendingEmailing                                                      : L'enviament d'un e-mailing des de les pantalles està limitat per raons de seguretat i de timeout a <b>%s</b> destinataris per sessió d'enviament.
mails_TargetsReset                                                              : Buidar llista
mails_ToClearAllRecipientsClickHere                                             : Per buidar la llista dels destinataris d'aquest E-Mailing, feu clic al botó
mails_ToAddRecipientsChooseHere                                                 : Per afegir destinataris, escolliu els que figuren en les llistes a continuació
mails_NbOfEMailingsReceived                                                     : E-Mailings en massa rebuts
mails_IdRecord                                                                  : ID registre
mails_DeliveryReceipt                                                           : Justificant de recepció
mails_YouCanUseCommaSeparatorForSeveralRecipients                               : Podeu usar el caràcter de separació <b>coma</b> per especificar múltiples destinataris.
mails_TagCheckMail                                                              : Track mail opening
mails_TagUnsubscribe                                                            : Unsubscribe link
mails_TagSignature                                                              : Signature sending user
mails_TagMailtoEmail                                                            : Recipient EMail
mails_Notifications                                                             : Notificacions
mails_NoNotificationsWillBeSent                                                 : Cap notificació per e-mail està prevista per a aquest esdeveniment i empresa
mails_ANotificationsWillBeSent                                                  : 1 notificació serà enviada per e-mail
mails_SomeNotificationsWillBeSent                                               : %s notificacions seran enviades per e-mail
mails_AddNewNotification                                                        : Activar una nova sol·licitud de notificació
mails_ListOfActiveNotifications                                                 : Llista de les sol·licituds de notificacions actives
mails_ListOfNotificationsDone                                                   : Llista de notificacions d'e-mails enviades
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
main_DatabaseConnection                                                         : Connexió a la base de dades
main_NoTranslation                                                              : Sense traducció
main_NoRecordFound                                                              : No s'han trobat registres
main_NoError                                                                    : Cap error
main_Error                                                                      : Error
main_ErrorFieldRequired                                                         : El camp '%s' és obligatori
main_ErrorFieldFormat                                                           : El camp '%s' té un valor incorrecte
main_ErrorFileDoesNotExists                                                     : El arxiu %s no existeix
main_ErrorFailedToOpenFile                                                      : Impossible obrir el fitxer %s
main_ErrorCanNotCreateDir                                                       : Impossible crear la carpeta %s
main_ErrorCanNotReadDir                                                         : Impossible llegir la carpeta %s
main_ErrorConstantNotDefined                                                    : Parámetre %s no definit
main_ErrorUnknown                                                               : Error desconegut
main_ErrorSQL                                                                   : Error de SQL
main_ErrorLogoFileNotFound                                                      : El arxiu logo '%s' no es troba
main_ErrorGoToGlobalSetup                                                       : Aneu a la Configuració 'Empresa/Institució' per corregir
main_ErrorGoToModuleSetup                                                       : Aneu a la configuració del mòdul per corregir
main_ErrorFailedToSendMail                                                      : Error en l'enviament de l'e-mail (emissor =%s, destinatairo =%s)
main_ErrorAttachedFilesDisabled                                                 : La gestió dels fitxers associats està desactivada en aquest servidor
main_ErrorFileNotUploaded                                                       : El fitxer no s'ha pogut transferir
main_ErrorInternalErrorDetected                                                 : Error detectat
main_ErrorNoRequestRan                                                          : Cap petició realitzada
main_ErrorWrongHostParameter                                                    : Paràmetre Servidor invàlid
main_ErrorYourCountryIsNotDefined                                               : El seu país no està definit. solucioni anant a Inici-Configuració-Empresa/Institució-Editar
main_ErrorRecordIsUsedByChild                                                   : Impossible de suprimir aquest registre. Es sent utilitzat com a pare per almenys un registre fill.
main_ErrorWrongValue                                                            : Valor incorrecte
main_ErrorWrongValueForParameterX                                               : Valor incorrecte del paràmetre %s
main_ErrorNoRequestInError                                                      : Cap petició en error
main_ErrorServiceUnavailableTryLater                                            : Servei no disponible actualment. Torni a intentar més tard.
main_ErrorDuplicateField                                                        : Duplicat en un camp únic
main_ErrorSomeErrorWereFoundRollbackIsDone                                      : S'han trobat alguns errors. Modificacions desfetes.
main_ErrorConfigParameterNotDefined                                             : El paràmetre <b>%s</b> no està definit en el fitxer de configuració Speedealing <b>conf.php</b>.
main_ErrorCantLoadUserFromSpeedealingDatabase                                   : Failed to find user <b>%s</b> in Speedealing database.
main_ErrorNoVATRateDefinedForSellerCountry                                      : Error, cap tipus d'IVA definit per al país '%s'.
main_ErrorNoSocialContributionForSellerCountry                                  : Error, cap tipus de càrrega social definida per al país '%s'.
main_ErrorFailedToSaveFile                                                      : Error, el registre del fitxer ha fallat.
main_ErrorOnlyPngJpgSupported                                                   : Error, només estan suportats els formats d'imatge jpg i png.
main_ErrorImageFormatNotSupported                                               : El seu PHP no suporta les funcions de conversió d'aquest format d'imatge.
main_SeeAlso                                                                    : Veure també %s
main_BackgroundColorByDefault                                                   : Color de fons
main_FileWasNotUploaded                                                         : Un arxiu ha estat seleccionat per adjuntar, però encara no ha estat pujat. Feu clic a "Adjuntar aquest arxiu" per a això.
main_NbOfEntries                                                                : Nº d'entrades
main_GoToWikiHelpPage                                                           : Consultar l'ajuda (pot requerir accés a Internet)
main_GoToHelpPage                                                               : Consultar l'ajuda
main_RecordSaved                                                                : Registre guardat
main_LevelOfFeature                                                             : Nivell de funcions
main_NotDefined                                                                 : No definida
main_DefinedAndHasThisValue                                                     : Defined and value to
main_IsNotDefined                                                               : undefined
main_SpeedealingInHttpAuthenticationSoPasswordUseless                           : Speedealing authentication mode is setup to <b>%s</b> in configuration file <b>conf.php</b>.<br>This means that password database is extern to Speedealing, so changing this field may have no effects.
main_Administrator                                                              : Administrador
main_Undefined                                                                  : No definit
main_PasswordForgotten                                                          : Heu oblidat la contrasenya?
main_SeeAbove                                                                   : Esmentar anteriorment
main_HomeArea                                                                   : Àrea inici
main_LastConnexion                                                              : Darrera connexió
main_PreviousConnexion                                                          : Connexió anterior
main_ConnectedOnMultiCompany                                                    : Connexió a l'entitat
main_ConnectedSince                                                             : Connectat des
main_AuthenticationMode                                                         : Mode autentificació
main_RequestedUrl                                                               : Url solicitada
main_DatabaseTypeManager                                                        : Tipus de gestor de base de dades
main_RequestLastAccess                                                          : Petició últim accés a la base de dades
main_RequestLastAccessInError                                                   : Petición último acceso a la base de datos erroni
main_ReturnCodeLastAccessInError                                                : Codi retornat últim accés a la base de dades erroni
main_InformationLastAccessInError                                               : Informació sobre l'últim accés a la base de dades erroni
main_SpeedealingHasDetectedError                                                : Speedealing has detected a technical error
main_InformationToHelpDiagnose                                                  : Heus aquí la informació que podrà ajudar al diagnòstic
main_MoreInformation                                                            : Més informació
main_NotePublic                                                                 : Nota (pública)
main_NotePrivate                                                                : Nota (privada)
main_PrecisionUnitIsLimitedToXDecimals                                          : Speedealing està configurat per limitar la precisió dels preus unitaris a <b>%s </b> decimals.
main_DoTest                                                                     : Provar
main_ToFilter                                                                   : Filtrar
main_WarningYouHaveAtLeastOneTaskLate                                           : Atenció, té almenys un element que ha passat la data de tolerencia.
main_yes                                                                        : sí
main_Yes                                                                        : Sí
main_no                                                                         : no
main_No                                                                         : No
main_All                                                                        : Tot
main_Home                                                                       : Inici
main_Help                                                                       : Ajuda
main_OnlineHelp                                                                 : Ajuda en línia
main_PageWiki                                                                   : Pàgina Wiki
main_Always                                                                     : Sempre
main_Never                                                                      : Mai
main_Under                                                                      : baix
main_Period                                                                     : Període
main_PeriodEndDate                                                              : Data fi període
main_Activate                                                                   : Activar
main_Activated                                                                  : Activat
main_Closed                                                                     : Tancat
main_Close                                                                      : Tancar
main_Closed2                                                                    : Tancat
main_Enabled                                                                    : Activat
main_Disable                                                                    : Desactivar
main_Disabled                                                                   : Desactivat
main_Add                                                                        : Afegir
main_AddLink                                                                    : Enllaçar
main_Update                                                                     : Modificar
main_AddActionToDo                                                              : Afegir acció a realitzar
main_AddActionDone                                                              : Afegir acció realitzada
main_Close2                                                                     : Tancar
main_Confirm                                                                    : Confirmar
main_ConfirmSendCardByMail                                                      : ConfirmSendCardByMail=Vol enviar el contingut d'aquesta fitxa per e-mail a l'adreça <b>%s</b>?
main_Delete                                                                     : Eliminar
main_Remove                                                                     : Retirar
main_Resiliate                                                                  : Cancel·lar
main_Cancel                                                                     : Anul·lar
main_Modify                                                                     : Modificar
main_Edit                                                                       : Editar
main_Validate                                                                   : Validar
main_ToValidate                                                                 : A validar
main_Save                                                                       : Gravar
main_SaveAs                                                                     : Gravar com
main_TestConnection                                                             : Provar la connexió
main_ToClone                                                                    : Copiar
main_ConfirmClone                                                               : Seleccions dades que voleu copiar.
main_NoCloneOptionsSpecified                                                    : no hi ha dades definits per copiar
main_Of                                                                         : de
main_CopyOf                                                                     : Còpia de
main_Show                                                                       : Veure
main_ShowCardHere                                                               : Veure la fitxa aquí
main_Search                                                                     : Cercar
main_SearchOf                                                                   : Cerca de
main_Valid                                                                      : Validar
main_ToBill                                                                     : Facturar
main_Approve                                                                    : Aprovar
main_ReOpen                                                                     : Reobrir
main_Upload                                                                     : Enviar arxiu
main_Select                                                                     : Seleccionar
main_Choose                                                                     : Escollir
main_ChooseLangage                                                              : Triar l'idioma
main_Resize                                                                     : Redimensionar
main_Recenter                                                                   : Enquadrar
main_Author                                                                     : Autor
main_User                                                                       : Usuari
main_Users                                                                      : Usuaris
main_Group                                                                      : Grup
main_Groups                                                                     : Grups
main_Password                                                                   : Contrasenya
main_PasswordRetype                                                             : Repetir contrasenya
main_NoteSomeFeaturesAreDisabled                                                : Atenció, només uns pocs mòduls/funcionalitats han estat activats en aquesta demo.
main_Name                                                                       : Nom
main_Person                                                                     : Persona
main_Parameter                                                                  : Paràmetre
main_Parameters                                                                 : Paràmetres
main_Value                                                                      : Valor
main_GlobalValue                                                                : Valor global
main_PersonalValue                                                              : Valor personalitzat
main_NewValue                                                                   : Nou valor
main_CurrentValue                                                               : Valor actual
main_Code                                                                       : Codi
main_Type                                                                       : Tipus
main_Language                                                                   : Idioma
main_MultiLanguage                                                              : Multiidioma
main_Note                                                                       : Nota
main_CurrentNote                                                                : Nota actual
main_Title                                                                      : Títol
main_Label                                                                      : Etiqueta
main_RefOrLabel                                                                 : Ref. o etiqueta
main_Info                                                                       : Log
main_Family                                                                     : Familia
main_Description                                                                : Descripció
main_Designation                                                                : Descripción
main_Model                                                                      : Model
main_DefaultModel                                                               : Model per defecte
main_Action                                                                     : Acció
main_About                                                                      : Sobre
main_Number                                                                     : Número
main_NumberByMonth                                                              : Nombre per mes
main_AmountByMonth                                                              : Import per mes
main_Numero                                                                     : Número
main_Limit                                                                      : Límit
main_Limits                                                                     : Límits
main_DevelopmentTeam                                                            : Equip de desenvolupament
main_Logout                                                                     : Desconnexió
main_Connection                                                                 : Connexió
main_Setup                                                                      : Configuració
main_Alert                                                                      : Alerta
main_Previous                                                                   : Anterior
main_Next                                                                       : Següent
main_Cards                                                                      : Fitxes
main_Card                                                                       : Fitxa
main_Now                                                                        : Ara
main_Date                                                                       : Data
main_DateStart                                                                  : Data inici
main_DateEnd                                                                    : Data fi
main_DateCreation                                                               : Data de creació
main_DateModification                                                           : Data modificació
main_DateModificationShort                                                      : Data modif.
main_DateLastModification                                                       : Data última modificació
main_DateValidation                                                             : Data validació
main_DateClosing                                                                : Data tancament
main_DateDue                                                                    : Data venciment
main_DateValue                                                                  : Data valor
main_DateValueShort                                                             : Data valor
main_DateOperation                                                              : Data operació
main_DateOperationShort                                                         : Data op.
main_DateLimit                                                                  : Data límit
main_DateRequest                                                                : Data consulta
main_DateProcess                                                                : Data procés
main_DatePlanShort                                                              : Data Planif.
main_DateRealShort                                                              : Data real
main_DateBuild                                                                  : Data generació de l'informe
main_DatePayment                                                                : Data pagament
main_DurationYear                                                               : any
main_DurationMonth                                                              : mes
main_DurationWeek                                                               : setmana
main_DurationDay                                                                : dia
main_DurationYears                                                              : anys
main_DurationMonths                                                             : mesos
main_DurationWeeks                                                              : setmanes
main_DurationDays                                                               : dies
main_Year                                                                       : Any
main_Month                                                                      : Mes
main_Week                                                                       : Setmana
main_Day                                                                        : Dia
main_Hour                                                                       : Hora
main_Minute                                                                     : Minut
main_Second                                                                     : Segon
main_Years                                                                      : Anys
main_Months                                                                     : Mesos
main_Days                                                                       : Dies
main_days                                                                       : dies
main_Hours                                                                      : Hores
main_Minutes                                                                    : Minuts
main_Seconds                                                                    : Segons
main_Today                                                                      : Avuí
main_Yesterday                                                                  : Ahir
main_Tomorrow                                                                   : Demà
main_Quadri                                                                     : Trimistre
main_MonthOfDay                                                                 : Mes del dia
main_HourShort                                                                  : H
main_Rate                                                                       : Tipus
main_UseLocalTax                                                                : Incloure taxes
main_LocalTaxDesc                                                               : Alguns països apliquen 2 o 3 taxes a cada línia de factura. Si és el cas, escolliu el tipus de la segona i tercera taxa i el seu valor. Els possibles tipus són: <br> 1: taxa local aplicable a productes i serveis sense IVA (IVA no s'aplica a la taxa local) <br> 2: taxa local s'aplica a productes i serveis abans de l'IVA (IVA es calcula sobre import + taxa local) <br> 3: taxa local s'aplica a productes sense IVA (IVA no s'aplica a la taxa local) <br> 4: taxa local s'aplica a productes abans de l'IVA (IVA es calcula sobre l'import + taxa local) <br> 5: taxa local s'aplica a serveis sense IVA (IVA no s'aplica a la taxa local) <br> 6: taxa local s'aplica a serveis abans de l'IVA (IVA es calcula sobre import + taxa local) <br> 7: la taxa local és un import fix aplicat al total de la factura
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
main_Cut                                                                        : Tallar
main_Copy                                                                       : Copiar
main_Paste                                                                      : Pegar
main_Default                                                                    : Defecte
main_DefaultValue                                                               : Valor per defecte
main_DefaultGlobalValue                                                         : Valor global
main_Price                                                                      : Preu
main_UnitPrice                                                                  : Preu unitari
main_UnitPriceHT                                                                : Preu base
main_UnitPriceTTC                                                               : Preu unitari total
main_PriceU                                                                     : P.U.
main_PriceUHT                                                                   : P.U.
main_PriceUTTC                                                                  : P.U. Total
main_Amount                                                                     : Import
main_AmountInvoice                                                              : Import factura
main_AmountPayment                                                              : Import pagament
main_AmountHTShort                                                              : Base imp.
main_AmountTTCShort                                                             : Import
main_AmountHT                                                                   : Base imponible
main_AmountTTC                                                                  : Import total
main_AmountVAT                                                                  : Import IVA
main_AmountLT1ES                                                                : Import RE
main_AmountLT2ES                                                                : Import IRPF
main_AmountTotal                                                                : Import total
main_AmountAverage                                                              : Import mitjà
main_PriceQtyHT                                                                 : Preu per la quantitat total
main_PriceQtyMinHT                                                              : Preu quantitat min total
main_PriceQtyTTC                                                                : Preu total per la quantitat
main_PriceQtyMinTTC                                                             : Preu quantitat min. total
main_Percentage                                                                 : Percentatge
main_Total                                                                      : Total
main_SubTotal                                                                   : Subtotal
main_TotalHTShort                                                               : Import
main_TotalTTCShort                                                              : Total
main_TotalHT                                                                    : Base imponible
main_TotalTTC                                                                   : Total
main_TotalTTCToYourCredit                                                       : Total a crèdit
main_TotalVAT                                                                   : Total IVA
main_TotalLT1ES                                                                 : Total RE
main_TotalLT2ES                                                                 : Total IRPF
main_IncludedVAT                                                                : IVA inclòs
main_HT                                                                         : Sense IVA
main_TTC                                                                        : IVA inclòs
main_VAT                                                                        : IVA
main_LT1ES                                                                      : RE
main_LT2ES                                                                      : IRPF
main_VATRate                                                                    : Taxa IVA
main_Average                                                                    : Mitja
main_Sum                                                                        : Suma
main_Delta                                                                      : Diferència
main_Module                                                                     : Mòdul
main_Option                                                                     : Opció
main_List                                                                       : Llistat
main_FullList                                                                   : Llista completa
main_Statistics                                                                 : Estadístiques
main_OtherStatistics                                                            : Altres estadístiques
main_Status                                                                     : Estat
main_Ref                                                                        : Ref.
main_RefSupplier                                                                : Ref. proveïdor
main_RefPayment                                                                 : Ref. pagament
main_CommercialProposals                                                        : Pressupostos
main_Comment                                                                    : Comentari
main_Comments                                                                   : Comentaris
main_ActionsToDo                                                                : Esdeveniments a realitzar
main_ActionsDone                                                                : Esdeveniments realitzats
main_ActionsToDoShort                                                           : A realitzar
main_ActionsRunningshort                                                        : Started
main_ActionsDoneShort                                                           : Realitzades
main_ActionNotApplicable                                                        : No aplicable
main_ActionRunningNotStarted                                                    : No començat
main_ActionRunningShort                                                         : Començat
main_ActionDoneShort                                                            : Acabat
main_CompanyFoundation                                                          : Empresa o institució
main_ContactsForCompany                                                         : Contactes d'aquest tercer
main_ContactsAddressesForCompany                                                : Contactes/adreces d'aquest tercer
main_AddressesForCompany                                                        : Adreces d'aquest tercer
main_Address                                                                    : Adreça
main_ActionsOnCompany                                                           : Esdeveniments respecte aquest tercer
main_ActionsOnMember                                                            : Esdeveniments respecte aquest membre
main_NActions                                                                   : %s esdeveniments
main_NActionsLate                                                               : %s en retard
main_Filter                                                                     : Filtre
main_RemoveFilter                                                               : Eliminar filtre
main_ChartGenerated                                                             : Gràfics generats
main_ChartNotGenerated                                                          : Gràfic no generat
main_GeneratedOn                                                                : Generat el %s
main_Generate                                                                   : Generar
main_Duration                                                                   : Duració
main_TotalDuration                                                              : Duració total
main_Summary                                                                    : Resum
main_MyBookmarks                                                                : Els meus marcadors
main_OtherInformationsBoxes                                                     : Altres panells d'informació
main_SpeedealingBoard                                                           : Speedealing board
main_SpeedealingStateBoard                                                      : Statistics
main_SpeedealingWorkBoard                                                       : Work tasks board
main_Available                                                                  : Disponible
main_NotYetAvailable                                                            : Encara no disponible
main_NotAvailable                                                               : No disponible
main_Popularity                                                                 : Popularitat
main_Categories                                                                 : Categories
main_Category                                                                   : Categoria
main_By                                                                         : Per
main_From                                                                       : De
main_to                                                                         : a
main_and                                                                        : i
main_or                                                                         : o
main_Other                                                                      : Altre
main_Others                                                                     : Altres
main_OtherInformations                                                          : Altres informacions
main_Quantity                                                                   : Quantitat
main_Qty                                                                        : Qt.
main_ChangedBy                                                                  : Modificat per
main_ReCalculate                                                                : Recalcular
main_ResultOk                                                                   : Èxit
main_ResultKo                                                                   : Error
main_Reporting                                                                  : Informe
main_Reportings                                                                 : Informes
main_Draft                                                                      : Esborrany
main_Drafts                                                                     : Esborranys
main_Validated                                                                  : Validat
main_Opened                                                                     : Obert
main_New                                                                        : Nou
main_Discount                                                                   : Descompte
main_Unknown                                                                    : Desconegut
main_General                                                                    : General
main_Size                                                                       : Tamany
main_Received                                                                   : Rebut
main_Paid                                                                       : Pagat
main_Topic                                                                      : Assumpte
main_ByCompanies                                                                : Per empresa
main_ByUsers                                                                    : Per usuari
main_Links                                                                      : Links
main_Link                                                                       : Link
main_Receipts                                                                   : Rebuts
main_Rejects                                                                    : Devolucions
main_Preview                                                                    : Vista prèvia
main_NextStep                                                                   : Següent pas
main_PreviousStep                                                               : Pas anterior
main_Datas                                                                      : Dades
main_None                                                                       : Res
main_NoneF                                                                      : Ninguna
main_Late                                                                       : Retard
main_Photo                                                                      : Foto
main_Photos                                                                     : Fotos
main_AddPhoto                                                                   : Afegir foto
main_Login                                                                      : Login
main_CurrentLogin                                                               : Login actual
main_January                                                                    : gener
main_February                                                                   : febrer
main_March                                                                      : març
main_April                                                                      : abril
main_May                                                                        : maig
main_June                                                                       : juny
main_July                                                                       : juliol
main_August                                                                     : agost
main_September                                                                  : setembre
main_October                                                                    : octubre
main_November                                                                   : novembre
main_December                                                                   : desembre
main_JanuaryMin                                                                 : Gen
main_FebruaryMin                                                                : Feb
main_MarchMin                                                                   : Mar
main_AprilMin                                                                   : Abr
main_MayMin                                                                     : Mai
main_JuneMin                                                                    : Jun
main_JulyMin                                                                    : Jul
main_AugustMin                                                                  : Ago
main_SeptemberMin                                                               : Set
main_OctoberMin                                                                 : Oct
main_NovemberMin                                                                : Nov
main_DecemberMin                                                                : Des
main_Month01                                                                    : gener
main_Month02                                                                    : febrer
main_Month03                                                                    : març
main_Month04                                                                    : abril
main_Month05                                                                    : maig
main_Month06                                                                    : juny
main_Month07                                                                    : juliol
main_Month08                                                                    : agost
main_Month09                                                                    : setembre
main_Month10                                                                    : octubre
main_Month11                                                                    : novembre
main_Month12                                                                    : desembre
main_MonthShort01                                                               : gen.
main_MonthShort02                                                               : feb.
main_MonthShort03                                                               : mar.
main_MonthShort04                                                               : abr.
main_MonthShort05                                                               : mai.
main_MonthShort06                                                               : jun.
main_MonthShort07                                                               : jul.
main_MonthShort08                                                               : ago.
main_MonthShort09                                                               : set.
main_MonthShort10                                                               : oct.
main_MonthShort11                                                               : nov.
main_MonthShort12                                                               : des.
main_AttachedFiles                                                              : Arxius i documents adjunts
main_FileTransferComplete                                                       : s'ha transferit correctament l'arxiu
main_DateFormatYYYYMM                                                           : YYYY-MM
main_DateFormatYYYYMMDD                                                         : YYYY-MM-DD
main_DateFormatYYYYMMDDHHMM                                                     : YYYY-MM-DD HH:SS
main_ReportName                                                                 : Nom de l'informe
main_ReportPeriod                                                               : Període d'anàlisi
main_ReportDescription                                                          : Descripció
main_Report                                                                     : Informe
main_Keywords                                                                   : Mots clés
main_Legend                                                                     : Llegenda
main_FillTownFromZip                                                            : Indicar població
main_ShowLog                                                                    : Veure històric
main_File                                                                       : Arxiu
main_Files                                                                      : Arxius
main_NotAllowed                                                                 : No autoritzat
main_ReadPermissionNotAllowed                                                   : Lectura no autoritzada
main_AmountInCurrency                                                           : Imports visualitzats en %s
main_Example                                                                    : Exemple
main_Examples                                                                   : Exemples
main_NoExample                                                                  : Sense exemple
main_FindBug                                                                    : Assenyalar un bug
main_NbOfThirdParties                                                           : Número de tercers
main_NbOfCustomers                                                              : Nombre de clients
main_NbOfLines                                                                  : Números de línies
main_NbOfObjects                                                                : Nombre d'objectes
main_NbOfReferers                                                               : Nombre de referències
main_Referers                                                                   : Referències
main_TotalQuantity                                                              : Quantitat total
main_DateFromTo                                                                 : De %s a %s
main_DateFrom                                                                   : A partir de %s
main_DateUntil                                                                  : Fins %s
main_Check                                                                      : Verificar
main_Internal                                                                   : Intern
main_External                                                                   : Extern
main_Internals                                                                  : Interns
main_Externals                                                                  : Externs
main_Warning                                                                    : Alerta
main_Warnings                                                                   : Alertes
main_BuildPDF                                                                   : Generar el PDF
main_RebuildPDF                                                                 : Regenerar el PDF
main_BuildDoc                                                                   : Generar el doc
main_RebuildDoc                                                                 : Regenerar el doc
main_Entity                                                                     : Entitat
main_Entities                                                                   : Entitats
main_EventLogs                                                                  : Log
main_CustomerPreview                                                            : Historial client
main_SupplierPreview                                                            : Historial proveïdor
main_AccountancyPreview                                                         : Historial comptable
main_ShowCustomerPreview                                                        : Veure historial client
main_ShowSupplierPreview                                                        : Veure historial proveïdor
main_ShowAccountancyPreview                                                     : Veure historial comptable
main_ShowProspectPreview                                                        : Veure historial client potencial
main_RefCustomer                                                                : Ref. client
main_Currency                                                                   : Divisa
main_InfoAdmin                                                                  : Informació per als administradors
main_Undo                                                                       : Anul·lar
main_Redo                                                                       : Refer
main_ExpandAll                                                                  : Expandir tot
main_UndoExpandAll                                                              : Anul·lar expansió
main_Reason                                                                     : Raó
main_FeatureNotYetSupported                                                     : Funcionalitat encara no suportada
main_CloseWindow                                                                : Tancar finestra
main_Question                                                                   : Pregunta
main_Response                                                                   : Resposta
main_Priority                                                                   : Prioritat
main_SendByMail                                                                 : Enviar per e-mail
main_MailSentBy                                                                 : Mail enviat per
main_TextUsedInTheMessageBody                                                   : Text utilitzat en el cos del missatge
main_SendAcknowledgementByMail                                                  : Enviament rec. per e-mail
main_NoEMail                                                                    : Sense e-mail
main_Owner                                                                      : Propietari
main_DetectedVersion                                                            : Versió detectada
main_FollowingConstantsWillBeSubstituted                                        : Les següents constants seran substituïdes pel seu valor corresponent.
main_Refresh                                                                    : Refrescar
main_BackToList                                                                 : Tornar al llistat
main_GoBack                                                                     : Tornar enrera
main_CanBeModifiedIfOk                                                          : Pot modificar-se si és vàlid
main_CanBeModifiedIfKo                                                          : Pot modificar-se si no és vàlid
main_RecordModifiedSuccessfully                                                 : Registre modificat amb èxit
main_RecordsModified                                                            : %s records modified
main_AutomaticCode                                                              : Creació automàtica de codi
main_NotManaged                                                                 : No generat
main_FeatureDisabled                                                            : Funció desactivada
main_MoveBox                                                                    : Desplaçar el panell %s
main_Offered                                                                    : Oferta
main_NotEnoughPermissions                                                       : No té autorització per aquesta acció
main_SessionName                                                                : Nom sesió
main_Method                                                                     : Mètode
main_Receive                                                                    : Recepció
main_PartialWoman                                                               : Parcial
main_PartialMan                                                                 : Parcial
main_TotalWoman                                                                 : Total
main_TotalMan                                                                   : Total
main_NeverReceived                                                              : Mai rebut
main_Canceled                                                                   : Cancel·lat
main_YouCanChangeValuesForThisListFromDictionnarySetup                          : Pot canviar aquestos valors al menú configuració->diccionaris
main_Color                                                                      : Color
main_Documents                                                                  : Documents
main_DocumentsNb                                                                : Fitxers adjunts (%s)
main_Documents2                                                                 : Documents
main_BuildDocuments                                                             : Documents generats
main_UploadDisabled                                                             : Pujada desactivada
main_MenuECM                                                                    : Documents
main_MenuAWStats                                                                : AWStats
main_MenuMembers                                                                : Membres
main_MenuAgendaGoogle                                                           : Agenda Google
main_ThisLimitIsDefinedInSetup                                                  : Límit Speedealing (Menú inici-configuració-seguretat): %s Kb, PHP limit: %s Kb
main_NoFileFound                                                                : No hi ha documents guardats en aquesta carpeta
main_CurrentUserLanguage                                                        : Idioma actual
main_CurrentTheme                                                               : Tema actual
main_DisabledModules                                                            : Mòduls desactivats
main_For                                                                        : Per a
main_ForCustomer                                                                : Per a client
main_Signature                                                                  : Signatura
main_HidePassword                                                               : Mostra comanda amb contrasenya oculta
main_UnHidePassword                                                             : Mostra comanda amb contrasenya a la vista
main_Root                                                                       : Arrel
main_Informations                                                               : Informació
main_Page                                                                       : Pàgina
main_Notes                                                                      : Notes
main_AddNewLine                                                                 : Afegir nova línia
main_AddFile                                                                    : Afegir arxiu
main_ListOfFiles                                                                : Llistat d'arxius disponibles
main_FreeZone                                                                   : Zona lliure
main_CloneMainAttributes                                                        : Clonar l'objecte amb aquests atributs principals
main_PDFMerge                                                                   : Fussió PDF
main_Merge                                                                      : Fussió
main_PrintContentArea                                                           : Mostrar pàgina d'impressió de la zona central
main_NoMenu                                                                     : Cap submenú
main_WarningYouAreInMaintenanceMode                                             : Atenció, està en mode manteniment, així que només el login <b>%s</b> està autoritzat per utilitzar l'aplicació en aquest moment.
main_CoreErrorTitle                                                             : Error del sistema
main_CoreErrorMessage                                                           : Ho sentim, s'ha produït un error. Verifiqueu els logs o contacti amb l'administrador del sistema.
main_CreditCard                                                                 : Targeta de crèdit
main_FieldsWithAreMandatory                                                     : Els camps marcats per un <b>%s</b> són obligatoris
main_FieldsWithIsForPublic                                                      : Els camps marcats per <b>%s</b> es mostren en la llista pública de membres. Si no voleu veure'ls, desactiveu la casella "públic".
main_AccordingToGeoIPDatabase                                                   : (Obtingut per conversió GeoIP)
main_Line                                                                       : Línia
main_NotSupported                                                               : No suportat
main_RequiredField                                                              : Camp obligatori
main_Result                                                                     : Resultat
main_ToTest                                                                     : provar
main_ValidateBefore                                                             : Per poder utilitzar aquesta funció ha de validar la fitxa
main_Visibility                                                                 : Visibilitat
main_Private                                                                    : Privat
main_Hidden                                                                     : Memòria cau
main_Resources                                                                  : Recursos
main_Source                                                                     : Orige
main_Prefix                                                                     : Prefixe
main_Before                                                                     : Abans
main_After                                                                      : Després
main_IPAddress                                                                  : Adreça IP
main_Frequency                                                                  : Freqüència
main_TicketCenter                                                               : Gestion des tickets
main_NewAttribute                                                               : Nou atribut
main_AttributeCode                                                              : Codi atribut
main_OptionalFieldsSetup                                                        : Configuració dels atributs opcionals
main_URLPhoto                                                                   : Url de la foto/logo
main_SetLinkToThirdParty                                                        : Vincular a un altre tercer
main_CreateDraft                                                                : Crea esborrany
main_ClickToEdit                                                                : Clic per a editar
main_ObjectDeleted                                                              : Objecte %s eliminat
main_ByCountry                                                                  : Per país
main_ByTown                                                                     : Per població
main_ByDate                                                                     : Per data
main_ByMonthYear                                                                : Per mes/any
main_ByYear                                                                     : Per any
main_ByMonth                                                                    : Per mes
main_ByDay                                                                      : Per dia
main_BySalesRepresentative                                                      : Per comercial
main_LinkedToSpecificUsers                                                      : Enllaçat a un contacte d'usuari particular
main_DeleteAFile                                                                : Eliminació d'arxiu
main_ConfirmDeleteAFile                                                         : Confirma l'eliminació de l'arxiu
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
users_UserCard                                                                  : Fitxa usuari
users_ContactCard                                                               : Fitxa contacte
users_GroupCard                                                                 : Fitxa grup
users_NoContactCard                                                             : No hi ha fitxa entre els contactes
users_Permission                                                                : Dret
users_Permissions                                                               : Drets
users_Password                                                                  : Contrasenya
users_EditPassword                                                              : Canviar contrasenya
users_SendNewPassword                                                           : Enviar una contrasenya nova
users_ReinitPassword                                                            : Generar una contrasenya nova
users_PasswordChangedTo                                                         : Contrasenya modificada en: %s
users_SubjectNewPassword                                                        : La seva contrasenya Speedealing
users_AvailableRights                                                           : Permisos disponibles
users_OwnedRights                                                               : Permisos tinguts
users_GroupRights                                                               : Permisos de grup
users_UserRights                                                                : Permisos usuari
users_UserGUISetup                                                              : Interface usuari
users_DisableUser                                                               : Desactivar
users_DisableAUser                                                              : Desactivar un usuari
users_DeleteUser                                                                : Eliminar
users_DeleteAUser                                                               : Eliminar un usuari
users_DisableGroup                                                              : Desactivar
users_DisableAGroup                                                             : Desactivar un grup
users_EnableAUser                                                               : Reactivar un usuari
users_EnableAGroup                                                              : Reactivar un grup
users_DeleteGroup                                                               : Eliminar
users_DeleteAGroup                                                              : Eliminar un grup
users_ConfirmDisableUser                                                        : Esteu segur de voler desactivar l'usuari <b>%s</b> ?
users_ConfirmDisableGroup                                                       : Esteu segur de voler desactivar al grup <b>%s</b> ?
users_ConfirmDeleteUser                                                         : Esteu segur de voler suprimir l'usuari <b>%s</b> ?
users_ConfirmDeleteGroup                                                        : Esteu segur de voler eliminar el grup <b>%s</b> ?
users_ConfirmEnableUser                                                         : Esteu segur de voler reactivar l'usuari <b>%s</b> ?
users_ConfirmEnableGroup                                                        : ¿Esteu segur de voler reactiar el grup <b>%s</b> ?
users_ConfirmReinitPassword                                                     : Esteu segur de voler generar una nova contrasenya a l'usuari <b>%s</b> ?
users_ConfirmSendNewPassword                                                    : Esteu segur de voler enviar una nova contrasenya a l'usuari <b>%s</b> ?
users_NewUser                                                                   : Nou usuari
users_CreateUser                                                                : Crear usuari
users_SearchAGroup                                                              : Cercar un grup
users_SearchAUser                                                               : Cercar un usuari
users_LoginNotDefined                                                           : L'usuari no està definit
users_NameNotDefined                                                            : El nom no està definit
users_ListOfUsers                                                               : Llistat d'usuaris
users_Administrator                                                             : Administrador
users_SuperAdministrator                                                        : Super Administrador
users_SuperAdministratorDesc                                                    : Administrador global
users_AdministratorDesc                                                         : Administrador de l'entitat
users_DefaultRights                                                             : Permisos per defecte
users_DefaultRightsDesc                                                         : Definiu aquí els permisos <b>per defecte</b>, és a dir: els permisos que s'assignaran automàticament a un nou usuari en el moment de la seva creació (Veure la fitxa usuari per canviar els permisos a un usuari existent).
users_SpeedealingUsers                                                          : Speedealing users
users_Civilite                                                                  : Civilite
users_LastName                                                                  : Cognoms
users_FirstName                                                                 : Nom
users_ListOfGroups                                                              : Llistat de grups
users_NewGroup                                                                  : Nou grup
users_CreateGroup                                                               : Crear el grup
users_RemoveFromGroup                                                           : Eliminar del grup
users_PasswordChangedAndSentTo                                                  : Contrasenya canviada i enviada a <b>%s</b>.
users_PasswordChangeRequestSent                                                 : Petició de canvi de contrasenya per a <b>%s</b> enviada a <b>%s</b>.
users_MenuUsersAndGroups                                                        : Usuaris i grups
users_LastGroupsCreated                                                         : Els %s darrers grups creats
users_LastUsersCreated                                                          : Els %s darrers usuaris creats
users_ShowGroup                                                                 : Veure grup
users_ShowUser                                                                  : Veure usuari
users_NonAffectedUsers                                                          : Usuaris no destinats al grup
users_UserModified                                                              : Usuari correctament modificat
users_GroupModified                                                             : Grup %s modificat
users_PhotoFile                                                                 : Arxiu foto
users_UserWithSpeedealingAccess                                                 : User with Speedealing access
users_ListOfUsersInGroup                                                        : Llista d'usuaris d'aquest grup
users_ListOfGroupsForUser                                                       : Llistat de grups d'aquest usuari
users_UsersToAdd                                                                : Usuari a afegir a aquest grup
users_GroupsToAdd                                                               : Grups a afegir a aquest usuari
users_NoLogin                                                                   : Sense usuari
users_LinkToCompanyContact                                                      : Enllaç tercers / contactes
users_LinkedToSpeedealingMember                                                 : Link to member
users_LinkedToSpeedealingUser                                                   : Link to Speedealing user
users_LinkedToSpeedealingThirdParty                                             : Link to Speedealing third party
users_CreateSpeedealingLogin                                                    : Create a user
users_CreateSpeedealingThirdParty                                               : Create a third party
users_LoginAccountDisable                                                       : El compte està desactivat, indiqui un nou login per activar
users_LoginAccountDisableInSpeedealing                                          : Account disabled in Speedealing.
users_LoginAccountDisableInLdap                                                 : El compte està desactivat en el domini
users_UsePersonalValue                                                          : Utilitzar valors personalitzats
users_GuiLanguage                                                               : Idioma del interface
users_InternalUser                                                              : Usuari intern
users_MyInformations                                                            : La meva informació
users_ExportDataset_user_1                                                      : Usuaris Speedealing i atributs
users_DomainUser                                                                : Usuari de domini
users_Reactivate                                                                : Reactivar
users_CreateInternalUserDesc                                                    : Aquesta pantalla permet crear un usuari intern de la seva empresa/institució. Per crear un usuari extern (client, proveïdor...) utilitzeu el botó 'crear a usuari Speedealing' que es troba a la fitxa contacte del tercer en qüestió.
users_InternalExternalDesc                                                      : Un usuari <b>intern</b> és un usuari que pertany a la seva empresa/institució. <br>Un usuari<b>extern</b> és un usuari client, proveïdor o un altre.<br> En els 2 casos, els permisos d'usuari defineixen els drets d'accés, però l'usuari extern pot a més tenir un gestor de menús diferent a l'usuari intern (vegeu Inici->Configuració->Visualització)
users_PermissionInheritedFromAGroup                                             : El permís es concedeix ja que ho hereta d'un grup al qual pertany l'usuari.
users_Inherited                                                                 : Heretat
users_UserWillBeInternalUser                                                    : L'usuari creat serà un usuari intern (ja que no està lligat a un tercer en particular)
users_UserWillBeExternalUser                                                    : L'usuari creat serà un usuari extern (ja que està lligat a un tercer en particular)
users_IdPhoneCaller                                                             : ID trucant (telèfon)
users_UserLogged                                                                : Usuari %s conectat
users_UserLogoff                                                                : Usuari %s desconectat
users_NewUserCreated                                                            : usuari %s  creat
users_NewUserPassword                                                           : Contrasenya canviada per a %s
users_EventUserModified                                                         : Usuari %s modificat
users_UserDisabled                                                              : Usuari %s deshabilitat
users_UserEnabled                                                               : Usuari %s activat
users_UserDeleted                                                               : Usuari %s eliminat
users_NewGroupCreated                                                           : Grup %s creat
users_GroupDeleted                                                              : Grup %s eliminat
users_ConfirmCreateContact                                                      : Esteu segur de voler crear un compte Speedealing per a aquest contacte?
users_ConfirmCreateLogin                                                        : Esteu segur que voleu crear un compte Speedealing per a aquest membre?
users_ConfirmCreateThirdParty                                                   : Esteu segur de voler crear un tercer per a aquest membre?
users_LoginToCreate                                                             : Login a crear
users_NameToCreate                                                              : nom del tercer a crear
users_YourRole                                                                  : Els seus rols
users_YourQuotaOfUsersIsReached                                                 : Ha arribat a la seva quota d'usuaris actius!
users_NbOfUsers                                                                 : Nº d'usuaris
users_DontDowngradeSuperAdmin                                                   : Només un superadmin pot degradar un superadmin
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
users_Employee                                                                  : Salarié
users_Address                                                                   : Adreça
users_Town                                                                      : Població
users_Zip                                                                       : Code Postal
users_Tel-Mobile                                                                : Téléphone Mobile
users_Tel-Fixe                                                                  : Téléphone Fixe
users_Email                                                                     : E-Mail
users_Date-Naissance                                                            : Data de naixement
users_Ville-Naissance                                                           : Ville de naissance
users_Pays-Naissance                                                            : Pays de naissance
users_Nationnalite                                                              : Nationnalité
users_Situation                                                                 : Situation familiale
users_NbrEnfants                                                                : Nombre Enfants
users_PerCharges                                                                : Personnes à charges
users_Date-Depart                                                               : Date de dèpart
users_Date-Arrivee                                                              : Date d'arrivée
users_Poste                                                                     : Lloc
users_Description-Poste                                                         : Descrption du poste
users_Type-Contrat                                                              : Type de contrat
users_Periode-Essai                                                             : Periode d'essai
users_Salaire-Brut                                                              : Salaire brut
users_Statut                                                                    : Statut
users_Site                                                                      : Site
users_Groupe                                                                    : Grup
users_Securite-Sociale                                                          : N° de la sécurité sociale
users_Libelle-Bank                                                              : Libelle banque
users_IBAN                                                                      : IBAN
users_Photo                                                                     : Foto
users_Categorie                                                                 : Categorie
users_Temps-Travail                                                             : Temps de travail
users_Niveau-Etude                                                              : Niveau d'études
users_Annee-Diplome                                                             : Année d'obtention
users_Login                                                                     : Login
users_Notes                                                                     : Notes
users_LoginDescription                                                          : L'identifiant qui permet de se connecter à l'application. (unique et sans espace)
users_LoginIsValid                                                              : Ce login est valide.
users_EmailAddressIsValid                                                       : L'adresse e-mail est valide.
users_ErrorLoginAlreadyExists                                                   : Ce login existe déjà !
users_ErrorInvalidLogin                                                         : Ce login n'est pas valide !
users_ErrorInvalidEmailAddress                                                  : L'adresse e-mail n'est pas valide !
users_ErrorGroupAlreadyExists                                                   : Ce groupe existe déjà !
