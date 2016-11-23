admin_Version                                                                   : Versie
admin_VersionProgram                                                            : Programmaversie
admin_VersionLastInstall                                                        : Versie van eerste installatie
admin_VersionLastUpgrade                                                        : Versie van laatste bijwerking
admin_VersionExperimental                                                       : Experimenteel
admin_VersionDevelopment                                                        : Ontwikkeling
admin_VersionUnknown                                                            : Onbekend
admin_VersionRecommanded                                                        : Aanbevolen
admin_SessionId                                                                 : Sessie-ID
admin_SessionSaveHandler                                                        : Wijze van sessieopslag
admin_SessionSavePath                                                           : Sessie opslaglocatie
admin_PurgeSessions                                                             : Verwijderen van sessies
admin_ConfirmPurgeSessions                                                      : Weet U zeker dat u alle sessies wilt verwijderen? Hierdoor wordt elke verbinding met Dolibarr verbroken behalve die van uzelf.
admin_NoSessionListWithThisHandler                                              : De waarde van 'save session handler' ingesteld in uw PHP instellingen staat het niet toe een lijst van alle lopende sessies weer te geven.
admin_LockNewSessions                                                           : Blokkeer nieuwe sessies
admin_ConfirmLockNewSessions                                                    : Weet u zeker dat u alle sessies wilt beperken tot uzelf? Alleen de gebruiker <b>%s</b> kan dan nog met Dolibarr verbinden.
admin_UnlockNewSessions                                                         : Verwijder sessieblokkering
admin_YourSession                                                               : Uw sessie
admin_Sessions                                                                  : Gebruikers-sessies
admin_WebUserGroup                                                              : Webserver gebruiker / groep
admin_NoSessionFound                                                            : Uw PHP installatie lijkt het niet toe te staan een lijst van actieve sessies weer te geven. De map waarin sessies worden opgeslagen (<b>%s</b>) zou afgeschermd kunnen zijn (bijvoorbeeld, door OS rechten of via de PHP instelling open_basedir).
admin_HTMLCharset                                                               : Karakterset voor gegenereerde HTML-pagina's
admin_DBStoringCharset                                                          : Databasekarakterset voor het opslaan van gegevens
admin_DBSortingCharset                                                          : Databasekarakterset voor het sorteren van gegevens
admin_WarningModuleNotActive                                                    : <b>Module %s</b> dient te worden ingeschakeld
admin_WarningOnlyPermissionOfActivatedModules                                   : Hier worden alleen de rechten van geactiveerde modules weergegeven. U kunt andere modules in het menu Home->Instellingen->Modules activeren.
admin_SpeedealingSetup                                                          : Speedealing install or upgrade
admin_SpeedealingUser                                                           : Speedealing user
admin_InternalUser                                                              : Interne gebruiker
admin_ExternalUser                                                              : Externe gebruiker
admin_InternalUsers                                                             : Interne gebruikers
admin_ExternalUsers                                                             : Externe gebruikers
admin_GlobalSetup                                                               : Algemene instellingen
admin_GUISetup                                                                  : Scherm
admin_SetupArea                                                                 : Instellingenoverzicht
admin_FormToTestFileUploadForm                                                  : Formulier waarmee bestandsupload kan worden getest (afhankelijk van de gekozen opties)
admin_IfModuleEnabled                                                           : Opmerking: Ja, is alleen effectief als module <b>%s</b> is geactiveerd
admin_RemoveLock                                                                : Verwijder, als het bestaat, het bestand <b>%s</b> om gebruik te kunnen maken van de updatetool.
admin_RestoreLock                                                               : Voorzie het bestand <b>%s</b> van 'alleen-bekijken' rechten om updaten te voorkomen.
admin_SecuritySetup                                                             : Beveiligingsinstellingen
admin_ErrorModuleRequirePHPVersion                                              : Fout, deze module vereist PHP versie %s of hoger.
admin_ErrorModuleRequireSpeedealingVersion                                      : Error, this module requires Speedealing version %s or higher
admin_ErrorDecimalLargerThanAreForbidden                                        : Fout, een nauwkeurigheid van meer dan <b>%s</b> wordt niet ondersteund.
admin_DictionnarySetup                                                          : Constanten
admin_Dictionnary                                                               : Dictionaries
admin_DisableJavascript                                                         : Schakel JavaScript en AJAX-functionaliteit uit
admin_ConfirmAjax                                                               : Gebruik AJAX bevestigingspopups
admin_UseSearchToSelectCompany                                                  : Gebruik 'autocompletion' velden om derde partijen te kiezen (In plaats van een selectielijst).<br><br>Wanneer u een groot aantal derde partijen (meer dan 100.000) heeft, kunt u de snelheid verhogen door de constante SOCIETE_DONOTSEARCH_ANYWHERE op 1 in te stellen in Home->Instellingen->Overige instellingen. Het zoeken wordt dan beperkt tot het begin van een regel.
admin_ActivityStateToSelectCompany                                              : Voeg een filter optie voor het tonen / verbergen thirdparties die momenteel in de activiteiten of niet langer het
admin_SearchFilter                                                              : Zoekfilters opties
admin_NumberOfKeyToSearch                                                       : Aantal karakters om een zoekopdracht te initiëren: %s
admin_ViewFullDateActions                                                       : Toon volledige data-acties in het derden 'sheet'
admin_NotAvailableWhenAjaxDisabled                                              : Niet beschikbaar wanneer AJAX functionaliteit uitgeschakeld is
admin_JavascriptDisabled                                                        : JavaScript uitgeschakeld
admin_UsePopupCalendar                                                          : Gebruik een popupvenster voor gegevensinvoer
admin_UsePreviewTabs                                                            : Gebruik voorbeelweergavetabbladen
admin_ShowPreview                                                               : Toon voorbeelweergave
admin_PreviewNotAvailable                                                       : Voorbeeldweergave niet beschikbaar
admin_ThemeCurrentlyActive                                                      : Huidige thema
admin_CurrentTimeZone                                                           : Huidige Tijdszone
admin_Space                                                                     : Ruimte
admin_Fields                                                                    : Velden
admin_Mask                                                                      : Masker
admin_NextValue                                                                 : Volgende waarde
admin_NextValueForInvoices                                                      : Volgende waarde (facturen)
admin_NextValueForCreditNotes                                                   : Volgende waarde (creditnota's)
admin_MustBeLowerThanPHPLimit                                                   : Opmerking: uw PHP instellingen beperken de groote van bestanduploads naar <b>%s %s,</b> ongeacht wat de waarde van de instelling binnen Dolibarr is
admin_NoMaxSizeByPHPLimit                                                       : Opmerking: Geen limiet ingesteld in uw PHP instellingen
admin_MaxSizeForUploadedFiles                                                   : Maximale grootte voor geüploade bestanden (0 om uploaden niet toe te staan)
admin_UseCaptchaCode                                                            : Gebruik een grafische code (CAPTCHA) op de aanmeldingspagina (SPAM preventie)
admin_UseAvToScanUploadedFiles                                                  : Gebruik anti-virus om geüploade bestanden te scannen
admin_AntiVirusCommand                                                          : Het volledige pad naar het antiviruscommando
admin_AntiVirusCommandExample                                                   : Voorbeeld voor ClamWin: c:\Program Files (x86)\ClamWin\bin\clamscan.exe<br>Voorbeeld voor ClamAv: /usr/bin/clamscan
admin_AntiVirusParam                                                            : Aanvullende parameters op de opdrachtregel
admin_AntiVirusParamExample                                                     : Voorbeeld voor ClamWin: --database="C:\Program Files (x86)\ClamWin\lib"
admin_ComptaSetup                                                               : Instellingen van de boekhoudkundige module
admin_UserSetup                                                                 : Gebruikersbeheerinstellingen
admin_MenuSetup                                                                 : Menubeheerinstellingen
admin_MenuLimits                                                                : Limieten en nauwkeurigheid
admin_MenuIdParent                                                              : ID van het bovenliggende menu
admin_DetailMenuIdParent                                                        : ID van het bovenliggend menu (0 voor een hoogste menu)
admin_DetailPosition                                                            : Sorteren aantal te definiëren menupositie
admin_PersonalizedMenusNotSupported                                             : Persoonlijke menu's niet ondersteund
admin_AllMenus                                                                  : Alle
admin_NotConfigured                                                             : Niet geconfigureerd
admin_Setup                                                                     : Instellingen
admin_Activation                                                                : Activatie
admin_Active                                                                    : Actief
admin_SetupShort                                                                : Instellingen
admin_OtherOptions                                                              : Overige opties
admin_OtherSetup                                                                : Overige instellingen
admin_CurrentValueSeparatorDecimal                                              : Decimaal scheidingsteken
admin_CurrentValueSeparatorThousand                                             : Duizend scheidingsteken
admin_Modules                                                                   : Modules
admin_ModulesCommon                                                             : Hoofdmodules
admin_ModulesOther                                                              : Andere modules
admin_ModulesInterfaces                                                         : Interfacemodules
admin_ModulesSpecial                                                            : Speciale modules
admin_ParameterInSpeedealing                                                    : Parameter %s
admin_LanguageParameter                                                         : Taalinstelling %s
admin_LanguageBrowserParameter                                                  : Instelling %s
admin_LocalisationSpeedealingParameters                                         : Localisation parameters
admin_ClientTZ                                                                  : Tijdzone van de cliënt (gebruiker)
admin_ClientHour                                                                : Huidige tijd op de cliënt (gebruiker)
admin_OSTZ                                                                      : Tijdzone in het OS van de webserver
admin_PHPTZ                                                                     : Tijdzone binnen de PHP server
admin_PHPServerOffsetWithGreenwich                                              : Gecompenseerd voor PHP server breedte Greenwich (seconden)
admin_ClientOffsetWithGreenwich                                                 : Gecompenseerd voor cliënt / browser breedte Greenwich (seconden)
admin_DaylingSavingTime                                                         : Zomertijd (gebruiker)
admin_CurrentHour                                                               : Huidige tijd op server
admin_CompanyTZ                                                                 : Tijdzone van het hoofdkantoor
admin_CompanyHour                                                               : Huidige tijd in het hoofdkantoor
admin_CurrentSessionTimeOut                                                     : Huidige sessietimeout
admin_OSEnv                                                                     : OS omgeving
admin_Box                                                                       : Vak
admin_Boxes                                                                     : Vakken
admin_MaxNbOfLinesForBoxes                                                      : Max aantal regels voor de vakken
admin_PositionByDefault                                                         : Standaardvolgorde
admin_Position                                                                  : Volgorde
admin_MenusDesc                                                                 : Menuverwerkers bepalen de inhoud van de 2 menubalken (horizontale en verticale menubalken).
admin_MenusEditorDesc                                                           : Met behulp van de menu-editor kunt u gepersonaliseerde items in menu's instellen. Gebruik deze functionaliteit zorgvuldig om te vermijden dat Dolibarr instabiel wordt en menu-items permanent onbereikbaar worden.<br>Sommige modules voegen items toe in de menu's (in de meeste gevallen in het menu <b>Alle</b>). Als u sommige van deze items per ongeluk verwijderd, kunt u ze herstellen de module eerst uit te schakelen en daarna opnieuw in te schakelen.
admin_MenuForUsers                                                              : Gebruikersmenu
admin_LangFile                                                                  : .lang bestand
admin_System                                                                    : Systeem
admin_SystemInfo                                                                : Systeeminformatie
admin_SystemTools                                                               : Systeemwerkset
admin_SystemToolsArea                                                           : Systeemwerksetoverzicht
admin_SystemToolsAreaDesc                                                       : Dit gedeelte biedt administratieve functionaliteit. Gebruik het menu om de functionaliteit in te stellen die u nodig heeft.
admin_PurgeAreaDesc                                                             : Deze pagina maakt het u mogelijk alle bestanden gemaakt of opgeslagen door Dolibarr te verwijderen (tijdelijke bestanden en / of alle bestanden in de map<b> %s</b>). Het gebruik van deze functie is niet noodzakelijk. Het is bedoeld voor gebruikers waarbij Dolibarr gehost wordt door een provider die geen rechten geeft voor het verwijderen van bestanden gemaakt door de webserver.
admin_PurgeDeleteLogFile                                                        : Verwijder het logbestand <b>%s</b> aangemaakt door de Syslog module (Geen risico op verlies van gegevens)
admin_PurgeDeleteTemporaryFiles                                                 : Verwijder alle tijdelijke bestanden (Geen risico op verlies van gegevens)
admin_PurgeDeleteAllFilesInDocumentsDir                                         : Verwijder alle bestanden in de map <b>%s.</b>. Tijdelijke bestanden, maar ook databasebackupbestanden, bijlagen van elementen (derde partijen, facturen, etc) en bestanden geüpload naar de ECM-module zullen verwijderd worden.
admin_PurgeRunNow                                                               : Nu opschonen
admin_PurgeNothingToDelete                                                      : Geen map of bestand om te verwijderen.
admin_PurgeNDirectoriesDeleted                                                  : <b>%s</b> bestanden of mappen verwijderd.
admin_PurgeAuditEvents                                                          : Verwijder alle gebeurtenisen
admin_ConfirmPurgeAuditEvents                                                   : Weet u zeker dat u alle veiligheidsgebeurtenisen wilt verwijderen? Alle veiligheidlogbestanden zullen worden verwijderd. Er zullen geen andere gegevens worden verwijderd.
admin_NewBackup                                                                 : Nieuwe backup
admin_GenerateBackup                                                            : Genereer backup
admin_Backup                                                                    : Backup
admin_Restore                                                                   : Herstellen
admin_RunCommandSummary                                                         : Backup geïnitieerd met het volgende commando
admin_RunCommandSummaryToLaunch                                                 : Back-up kan worden gestart met het volgende commando
admin_WebServerMustHavePermissionForCommand                                     : Uw webserver moet de rechten hebben om zulke commando's uit te voeren
admin_BackupResult                                                              : Resultaat backup
admin_BackupFileSuccessfullyCreated                                             : Backupbestand succesvol gegenereerd
admin_YouCanDownloadBackupFile                                                  : De gegenereerde bestanden kunnen nu gedownload worden
admin_NoBackupFileAvailable                                                     : Geen backupbestanden beschikbaar.
admin_ExportMethod                                                              : Exporteer methode
admin_ImportMethod                                                              : Importeer methode
admin_ToBuildBackupFileClickHere                                                : Om een backupbestand te maken, klik <a href="%s">hier</a>.
admin_ImportMySqlDesc                                                           : Voor de invoer van een backupbestand, voert u het mysql-commando vanaf de opdrachtregel uit:
admin_ImportPostgreSqlDesc                                                      : Om een backupbestand te importeren, dient u het 'pg_restore' commando vanaf de opdrachtregel uit te voeren:
admin_ImportMySqlCommand                                                        : %s %s < mijnbackupbestand.sql
admin_ImportPostgreSqlCommand                                                   : %s %s mijnbackupbestand.sql
admin_FileNameToGenerate                                                        : Te creëren bestandsnaam
admin_CommandsToDisableForeignKeysForImport                                     : Commando om 'foreign keys' bij importeren uit te schakelen
admin_CommandsToDisableForeignKeysForImportWarning                              : Mandatory if you want to be able to restore your sql dump later
admin_ExportCompatibility                                                       : Uitwisselbaarheid (compatibiliteit) van het gegenereerde exportbestand
admin_MySqlExportParameters                                                     : MySQL exporteer instellingen
admin_PostgreSqlExportParameters                                                : PostgreSQL export parameters
admin_UseTransactionnalMode                                                     : Gebruik transactionele modus
admin_FullPathToMysqldumpCommand                                                : Het volledige pad naar het 'MySQL dump' commando
admin_FullPathToPostgreSQLdumpCommand                                           : Volledige pad naar het 'pg_dump' commando
admin_ExportOptions                                                             : Exporteeropties
admin_AddDropDatabase                                                           : Voeg 'DROP DATABASE' commando toe
admin_AddDropTable                                                              : Voeg 'DROP TABLE' commando toe
admin_ExportStructure                                                           : Structure
admin_Datas                                                                     : Gegevens
admin_NameColumn                                                                : Kollomennaam
admin_ExtendedInsert                                                            : Uitgebreide (extended) INSERT
admin_NoLockBeforeInsert                                                        : Geen lock-opdrachten rond INSERT
admin_DelayedInsert                                                             : Vertraagde (delayed) INSERT
admin_EncodeBinariesInHexa                                                      : Codeer binaire data in hexadecimalen
admin_IgnoreDuplicateRecords                                                    : Negeer fouten van dubbele tabelregels (INSERT negeren)
admin_Yes                                                                       : Ja
admin_No                                                                        : Nee
admin_AutoDetectLang                                                            : Automatisch detecteren (taal van de browser)
admin_FeatureDisabledInDemo                                                     : Functionaliteit uitgeschakeld in de demonstratie
admin_Rights                                                                    : Rechten
admin_BoxesDesc                                                                 : Vakken zijn delen op het scherm die bepaalde informatie tonen op geselecteerde pagina's. U kunt vak in- of uitschakelen door de doelpagina te selecteren en op "activeren" te klikken of door op de prullenbak te klikken om het vak uit te schakelen.
admin_OnlyActiveElementsAreShown                                                : Alleen elementen van ingeschakelde <a href="%s">modules</a> worden getoond.
admin_ModulesDesc                                                               : Dolibarr modules bepalen welke functionaliteit is ingeschakeld in de software. Voor enkele modules is het noodzakelijk, zodra de module is ingeschakeld, rechten te verlenen aan de gebruikers. Klik op de knop uit / aan in de kolom "Status" om een module / functionaliteit in of uit te schakelen.
admin_ModulesInterfaceDesc                                                      : De Dolibarr 'interface'-modules staan het u toe functionaliteit toe te voegen die afhankelijk is van externe software, systemen of diensten.
admin_ModulesSpecialDesc                                                        : Speciale modules zijn zeer specifieke of zelden gebruikte modules.
admin_ModulesJobDesc                                                            : Bedrijfsmodules zorgen voor een eenvoudige voorgeconfigureerde installatie van Dolibarr voor een specifiek bedrijf.
admin_ModulesMarketPlaceDesc                                                    : U kunt meer downloadbare modules vinden op externe websites op het internet.
admin_ModulesMarketPlaces                                                       : Meer modules
admin_DoliStoreDesc                                                             : DoliStore, de officiële markt voor externe Dolibarr ERP / CRM modules
admin_WebSiteDesc                                                               : Websiteaanbieders waarop u naar meer modules kunt zoeken
admin_URL                                                                       : Link
admin_BoxesAvailable                                                            : Beschikbare vakken
admin_BoxesActivated                                                            : Geactiveerde vakken
admin_ActivateOn                                                                : Activeren op
admin_ActiveOn                                                                  : Geactiveerd op
admin_SourceFile                                                                : Bronbestand
admin_AutomaticIfJavascriptDisabled                                             : Automatisch als Javascript is uitgeschakeld
admin_AvailableOnlyIfJavascriptNotDisabled                                      : Alleen beschikbaar als JavaScript niet is uitgeschakeld
admin_AvailableOnlyIfJavascriptAndAjaxNotDisabled                               : Alleen beschikbaar als JavaScript en AJAX niet zijn uitgeschakeld
admin_NotInstalled                                                              : Not installed
admin_Required                                                                  : Verplicht
admin_Security                                                                  : Beveiliging
admin_Passwords                                                                 : Wachtwoorden
admin_DoNotStoreClearPassword                                                   : Geen onversleutelde wachtwoorden opslaan in de database, maar alleen versleutelde (Activering aanbevolen)
admin_MainDbPasswordFileConfEncrypted                                           : Databasewachtwoord versleuteld opslaan in conf.php (Activering aanbevolen)
admin_InstrucToEncodePass                                                       : Vervang om het wachtwoord versleuteld op te slaan in <b>conf.php</b>, de regel <br><b>$dolibarr_main_db_pass="..."</b><br>door<br><b>$dolibarr_main_db_pass="crypted:%s"</b>
admin_InstrucToClearPass                                                        : Vervang om het wachtwoord onversleuteld (leesbaar) op te slaan in <b>conf.php</b>, de regel<br><b>$dolibarr_main_db_pass="crypted:..."</b><br>door<br><b>$dolibarr_main_db_pass="%s"</b>
admin_ProtectAndEncryptPdfFiles                                                 : Bescherming van gecreëerde PDF files. (Activering NIET aanbevolen, omdat dit de aanmaak van meerdere bestanden onmogelijk maakt)
admin_ProtectAndEncryptPdfFilesDesc                                             : Bescherming van PDF files, deze kunnen gelezen en afgedrukt worden met behulp van een PDF-lezer. Echter, het bewerken en kopiëren is niet meer mogelijk. Let op dat door het gebruik van deze functionaliteit, de bouw van een globale gecumuleerde pdf niet werkt (zoals bij onbetaalde facturen).
admin_Feature                                                                   : Functionaliteit
admin_SpeedealingLicense                                                        : License
admin_SpeedealingProjectLeader                                                  : Project leader
admin_Developpers                                                               : Ontwikkelaars / mensen die bijgedragen hebben
admin_OtherDeveloppers                                                          : Andere ontwikkelaars / mensen die bijgedragen hebben
admin_OfficialWebSite                                                           : Officiële internationale Dolibarr website
admin_OfficialWebSiteFr                                                         : Officiële Franse website
admin_OfficialWiki                                                              : Documentatie op de Wiki pagina's van Dolibarr
admin_OfficialDemo                                                              : Online demonstratie van Dolibarr
admin_OfficialMarketPlace                                                       : Officiële markt voor externe modules / addons
admin_OfficialWebHostingService                                                 : Official web hosting service (Cloud hosting)
admin_ForDocumentationSeeWiki                                                   : Documentatie voor gebruikers of ontwikkelaars kunt u inzien door <br>te kijken op de Dolibarr Wiki-pagina's:<br><b><a href="%s" target="_blank">%s</a></b>
admin_ForAnswersSeeForum                                                        : Voor alle andere vragen / hulp, kunt u gebruik maken van het Dolibarr forum:<br><b><a href="%s" target="_blank">%s</a></b>
admin_HelpCenterDesc1                                                           : Dit scherm kan u helpen om ondersteuning voor Dolibarr te krijgen.
admin_HelpCenterDesc2                                                           : Kies de ondersteuning die overeenkomt met uw behoeften door te klikken op de betreffende link (Sommige van deze diensten zijn alleen beschikbaar in het <b>Engels</b>).
admin_CurrentTopMenuHandler                                                     : Huidige menuverwerker bovenste menu
admin_CurrentLeftMenuHandler                                                    : Huidig menuverwerker linker menu
admin_CurrentMenuHandler                                                        : Huidige menuverwerker
admin_CurrentSmartphoneMenuHandler                                              : Huidige smartphonemenuverwerker
admin_MeasuringUnit                                                             : Maateenheid
admin_Emails                                                                    : E-mails
admin_EMailsSetup                                                               : E-mailinstellingen
admin_EMailsDesc                                                                : Met behulp van deze pagina kunt u PHP instellingen om e-mails te verzenden overschrijven. Op Unix / Linux besturingssystemen zijn deze In de meeste gevallen goed ingesteld en zijn deze instellingen nutteloos.
admin_MAIN_MAIL_SMTP_PORT                                                       : SMTP / SMTPS-poort (standaard in php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_SERVER                                                     : SMTP / SMTPS Host (standaard in php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_PORT_NotAvailableOnLinuxLike                               : SMTP / SMTPS-poort (niet gedefinieerd in PHP op Unix-achtige systemen)
admin_MAIN_MAIL_SMTP_SERVER_NotAvailableOnLinuxLike                             : SMTP / SMTPS-host (Niet gedefinieerd in PHP op Unix-achtige systemen)
admin_MAIN_MAIL_EMAIL_FROM                                                      : E-mailafzender voor automatische e-mails (Standaard in php.ini: <b>%s</b>)
admin_MAIN_MAIL_ERRORS_TO                                                       : Afzender e-mail gebruikt voor error rendementen e-mails verzonden
admin_MAIN_MAIL_AUTOCOPY_TO                                                     : Stuur systematisch een verborgen zogenoemde 'Carbon-Copy' van alle verzonden e-mails naar
admin_MAIN_DISABLE_ALL_MAILS                                                    : Schakel alle e-mailverzendingen uit (voor testdoeleinden of demonstraties)
admin_MAIN_MAIL_SENDMODE                                                        : Te gebruiken methode om e-mails te verzenden
admin_MAIN_MAIL_SMTPS_ID                                                        : SMTP-gebruikersnaam indien verificatie vereist
admin_MAIN_MAIL_SMTPS_PW                                                        : SMTP-wachtwoord indien verificatie vereist
admin_MAIN_MAIL_EMAIL_TLS                                                       : Gebruik TLS (SSL) encryptie
admin_MAIN_DISABLE_ALL_SMS                                                      : Schakel alle SMS verzendingen (voor test doeleinden of demo)
admin_MAIN_SMS_SENDMODE                                                         : Methode te gebruiken om SMS te verzenden
admin_MAIN_MAIL_SMS_FROM                                                        : Standaard afzender telefoonnummer voor Sms versturen
admin_FeatureNotAvailableOnLinux                                                : Functionaliteit niet beschikbaar op Unix-achtige systemen. Test uw lokale 'sendmail' programma.
admin_SubmitTranslation                                                         : Als de vertaling voor deze taal niet volledig is of een fout bevat, dan kunt u dit corrigeren door het bewuste taalbestand in de map <b>Langs/%s</b> te wijzigen en de wijzigingen op het Dolibarr forum te delen met anderen: www.dolibarr.org.
admin_ModuleSetup                                                               : Module-instellingen
admin_ModulesSetup                                                              : Instellingen van modules
admin_ModuleFamilyBase                                                          : Systeem
admin_ModuleFamilyCrm                                                           : Customer Relation Management (CRM)
admin_ModuleFamilyProducts                                                      : Productenmanagement
admin_ModuleFamilyHr                                                            : Human Resource Management
admin_ModuleFamilyProjects                                                      : Projecten / Samenwerkingen
admin_ModuleFamilyOther                                                         : Ander
admin_ModuleFamilyTechnic                                                       : Hulpmiddelen voor multi-modules
admin_ModuleFamilyExperimental                                                  : Experimentele modules
admin_ModuleFamilyFinancial                                                     : Financiële Modules (Boekhouding / Bedrijfsfinanciën)
admin_ModuleFamilyECM                                                           : Electronic Content Management (ECM)
admin_MenuHandlers                                                              : Menuverwerkers
admin_MenuAdmin                                                                 : Menu wijzigen
admin_DoNotUseInProduction                                                      : Do not use in production
admin_ThisIsProcessToFollow                                                     : Dit is ingesteld op de verwerking van:
admin_StepNb                                                                    : Stap %s
admin_FindPackageFromWebSite                                                    : Vind een pakket die u de functionaliteit geeft die u wilt (bijvoorbeeld op de officiële website van %s).
admin_DownloadPackageFromWebSite                                                : Download pakket van website %s.
admin_UnpackPackageInSpeedealingRoot                                            : Unpack package file into Speedealing's root directory <b>%s</b>
admin_SetupIsReadyForUse                                                        : Installatie is voltooid en Dolibarr is gereed voor het gebruik van de nieuwe functionaliteit.
admin_NotExistsDirect                                                           : The alternative root directory is not defined.<br>
admin_InfDirAlt                                                                 : Since version 3 it is possible to define an alternative root directory.This allows you to store, same place, plug-ins and custom templates.<br>Just create a directory at the root of Dolibarr (eg: custom).<br>
admin_InfDirExample                                                             : <br>Then declare it in the file conf.php<br> $dolibarr_main_url_root_alt='http://myserver/custom'<br>$dolibarr_main_document_root_alt='/path/of/dolibarr/htdocs/custom'<br>*These lines are commented with "#", to uncomment only remove the character.
admin_YouCanSubmitFile                                                          : Select module:
admin_CurrentVersion                                                            : Huidige versie van Dolibarr
admin_CallUpdatePage                                                            : Ga naar de pagina die de databasestructuur en gegevens bijwerkt: %s.
admin_LastStableVersion                                                         : Laatste stabiele versie
admin_GenericMaskCodes                                                          : U kunt elk gewenst maskernummer invoeren. In dit masker, kunnen de volgende tags worden gebruikt:<br><b>{000000}</b> correspondeert met een nummer welke vermeerderd zal worden op elke %s. Voer zoveel nullen in als de gewenste lengte van de teller. De teller wordt aangevuld met nullen vanaf links zodat er zoveel nullen zijn als in het masker.<br><b>{000000+000}</b> hetzelfde als voorgaand maar een offset corresponderend met het nummer aan de rechterkant van het + teken is toegevoegd startend op de eerste %s. <br><b>{000000@x}</b> hetzelfde als voorgaande maar de teller wordt gereset naar nul, wanneer maand x is bereikt (x tussen 1 en 12). Als deze optie is gebruikt en x is 2 of hoger, dan is de volgorde {yy}{mm} of {yyyy}{mm} ook vereist. <br><b>{dd}</b> dag (01 t/m 31).<br><b>{mm}</b> maand (01 t/m 12).<br><b>{yy}</b>, <b>{yyyy}</b> of <b>{y}</b> jaat over 2, 4 of 1 nummer(s). <br>
admin_GenericMaskCodes2                                                         : <b>{cccc}</b> de afnermerscode<br><b>{cccc000}</b> de afnermerscode en n karakters wordt opgevolgd door een afnermersreferentieteller zonder offset en gereset met de globale teller.<br><b>{tttt}</b> De code van bedrijfstype op n karakters (Zie het menu 'constantent' voor de bedrijfstypes<br>
admin_GenericMaskCodes3                                                         : Alle andere karakters in het masker zullen intact blijven.<br>Spaties zijn niet toegestaan.<br>
admin_GenericMaskCodes4a                                                        : <u>Voorbeeld van de 99e %s van de derde partij 'HetBedrijf' gedaan op 2007-01-31:</u><br>
admin_GenericMaskCodes4b                                                        : <u>Voorbeeld van een derde partij gecreëerd op 2007-03-01:</u><br>
admin_GenericMaskCodes4c                                                        : <u>Example on product created on 2007-03-01:</u><br>
admin_GenericMaskCodes5                                                         : <b>ABC{jj}{mm}-{000000}</b> zal <b>ABC0701-000099</b> geven<br><b>{0000+100}-ZZZ/{dd}/XXX</b> zal <b>0199-ZZZ/31/XXX</b> geven
admin_GenericNumRefModelDesc                                                    : Geeft een aanpasbaar nummer volgens een gedefinieerd masker.
admin_ServerAvailableOnIPOrPort                                                 : Server is beschikbaar op het IP-adres <b>%s</b> met poort <b>%s</b>
admin_ServerNotAvailableOnIPOrPort                                              : Server is niet beschikbaar op het IP-adres <b>%s</b> met poort <b>%s</b>
admin_DoTestServerAvailability                                                  : Test server verbinding
admin_DoTestSend                                                                : Test verzenden
admin_DoTestSendHTML                                                            : Test het verzenden van HTML
admin_ErrorCantUseRazInStartedYearIfNoYearMonthInMask                           : Fout, kan optie @ niet gebruiken wanneer de volgorde {jj}{mm} of {jjjj}{mm} niet is opgenomen in het masker.
admin_UMask                                                                     : Umask parameter voor nieuwe bestanden op een Unix- / Linux- / BSD-bestandssysteem.
admin_UMaskExplanation                                                          : Deze parameter laat u de rechten bepalen welke standaard zijn ingesteld voor de bestanden aangemaakt door Dolibarr op de server (tijdens het uploaden, bijvoorbeeld).<br>Het moet de octale waarde zijn (bijvoorbeeld, 0666 betekent lezen en schrijven voor iedereen).<br>Deze parameter wordt NIET op een windows-server gebruikt
admin_SeeWikiForAllTeam                                                         : Zie de Wiki-pagina voor details van alle personen die bijgedragen hebben en hun organisaties
admin_UseACacheDelay                                                            : Ingestelde vertraging voor de cacheexport in secondes (0 of leeg voor geen cache)
admin_DisableLinkToHelpCenter                                                   : Verberg de link "<b>ondersteuning of hulp nodig</b>" op de inlogpagina
admin_DisableLinkToHelp                                                         : Verberg de link <b>%s</b> Online hulp in het linker menu
admin_AddCRIfTooLong                                                            : Er zijn geen automatische regeleinden, dus als uw tekst in de documenten te lang is, moet u zelf regeleinden in de teksteditor invoeren.
admin_ModuleDisabled                                                            : Module gedeactiveerd
admin_ModuleDisabledSoNoEvent                                                   : Module gedeactiveerd dus event nooit gecreëerd
admin_ConfirmPurge                                                              : Weet u zeker dat u nu wilt opschonen?<br>Dit verwijderd permanent uw gegevensbestanden zonder dat u ze nog kunt terugzetten (zoals ECM, bijlages, etc).
admin_MinLength                                                                 : Minimale lengte
admin_LanguageFilesCachedIntoShmopSharedMemory                                  : Bestanden .lang in het gedeelde geheugen
admin_ExamplesWithCurrentSetup                                                  : Voorbeelden met de huidige actieve configuratie
admin_ListOfDirectories                                                         : Lijst van OpenDocument sjablonenmappen
admin_ListOfDirectoriesForModelGenODT                                           : Lijst van mappen met sjablonen in OpenDocument-formaat.<br><br>Vul hier het volledige pad naar de mappen in.<br>Voeg een harde return in tussen elke map.<br> Om een map van de GED-module toe te voegen, voeg hier dan <b>DOL_DATA_ROOT/ECM/uwmapnaam</b> in.<br><br>Bestanden in deze mappen dienen te eindigen op <b>.odt</b>.
admin_NumberOfModelFilesFound                                                   : Aantal ODT sjablonen gevonden in deze mappen
admin_ExampleOfDirectoriesForModelGen                                           : Voorbeelden van de syntaxis: <br>c:\mijndir<br>/home/mijndir<br>DOL_DATA_ROOT/ECM/ecmdir
admin_FollowingSubstitutionKeysCanBeUsed                                        : Door het plaatsen van de volgende velden in het sjabloon krijgt u een vervanging met de aangepaste waarde bij het genereren van het document:
admin_FullListOnOnlineDocumentation                                             : De complete lijst met beschikbare velden is te vinden in de gebruikersdocumentatie op de Wiki van Dolibar: http://wiki.dolibarr.org.
admin_FirstnameNamePosition                                                     : Positie van voornaam / achternaam
admin_DescWeather                                                               : De volgende afbeeldingen zullen getoond worden op het dashboard wanneer het aantal late acties de volgende waarden heeft bereikt:
admin_KeyForWebServicesAccess                                                   : Sleutel om webdiensten te gebruiken (waarde "dolibarrkey" in webdiensten)
admin_TestSubmitForm                                                            : Invoer testformulier
admin_ThisForceAlsoTheme                                                        : Met behulp van dit menu manager zal ook gebruik maken van een eigen thema wat er keuze van de gebruiker. Ook dit menu manager gespecialiseerd smartphones niet werkt op alle smartphone. Gebruik een ander menu manager als u problemen ondervindt op het jouwe.
admin_ThemeDir                                                                  : Skins directory
admin_ConnectionTimeout                                                         : Connexion time-out
admin_ResponseTimeout                                                           : Time-out antwoord
admin_SmsTestMessage                                                            : Testbericht van __PHONEFROM__ naar __PHONETO__
admin_ModuleMustBeEnabledFirst                                                  : Module <b>%s</b> moet eerst worden ingeschakeld voordat u deze functie gebruikt.
admin_SecurityToken                                                             : Sleutel tot URL beveiligen
admin_NoSmsEngine                                                               : Geen SMS afzender manager beschikbaar. SMS afzender manager zijn niet geïnstalleerd met de standaard distributie (omdat ze afhankelijk is van een externe leverancier), maar u kunt vinden op een aantal http://www.dolistore.com
admin_PDF                                                                       : PDF
admin_PDFDesc                                                                   : U kunt elke globale opties met betrekking tot de PDF-generatie
admin_PDFAddressForging                                                         : Regels aan te pakken dozen te smeden
admin_HideAnyVATInformationOnPDF                                                : Verberg alle informatie met betrekking tot de BTW op gegenereerde PDF
admin_HideDescOnPDF                                                             : Hide products description on generated PDF
admin_HideRefOnPDF                                                              : Hide products ref. on generated PDF
admin_HideDetailsOnPDF                                                          : Hide products lines details on generated PDF
admin_UrlGenerationParameters                                                   : Parameters om URL beveiligen
admin_SecurityTokenIsUnique                                                     : Gebruik een unieke securekey parameter voor elke URL
admin_EnterRefToBuildUrl                                                        : Geef referentie voor object %s
admin_GetSecuredUrl                                                             : Get berekend URL
admin_ButtonHideUnauthorized                                                    : Hide buttons for unauthorized actions instead of showing disabled buttons
admin_TotalNumberOfActivatedModules                                             : Nombre total de modules fonctionnels activés: <b>%s</b>
admin_YouMustEnableOneModule                                                    : Vous devez activer au moins une fonctionnalité
admin_ModulesSystemTools                                                        : Modules tools
admin_ProductVatMassChange                                                      : Mass VAT change
admin_ProductVatMassChangeDesc                                                  : This page can be used to modify a VAT rate defined on products or services from a value to another. Warning, this change is done on all database.
admin_OldVATRates                                                               : Old VAT rate
admin_NewVATRates                                                               : New VAT rate
admin_PriceBaseTypeToChange                                                     : Modify on prices with base reference value defined on
admin_MassConvert                                                               : Launch mass convert
admin_String                                                                    : String
admin_TextLong                                                                  : Long text
admin_Int                                                                       : Integer
admin_Float                                                                     : Float
admin_DateAndTime                                                               : Date and hour
admin_Structure                                                                 : Structure
admin_Module0Name                                                               : Gebruikers & groepen
admin_Module0Desc                                                               : Beheer gebruikers en groepen
admin_Module1Name                                                               : Beheer derde partijen
admin_Module1Desc                                                               : Beheer van derde partijen (afnemers, leveranciers en contactpersonen). Ook kunt u hier sjabloondocumenten uploaden.
admin_Module2Name                                                               : Commercieel
admin_Module2Desc                                                               : Commercieel beheer
admin_Module10Name                                                              : Boekhouding
admin_Module10Desc                                                              : Eenvoudig boekhoudkundig beheer (Verzending van facturen en betalingen)
admin_Module20Name                                                              : Zakelijke voorstellen / Offertes
admin_Module20Desc                                                              : Beheer van offertes
admin_Module22Name                                                              : EMailings
admin_Module22Desc                                                              : Administratie en verzending van bulk-e-mails
admin_Module23Name                                                              : Energie
admin_Module23Desc                                                              : Monitoring van het verbruik van energie
admin_Module25Name                                                              : Afnemersopdrachten
admin_Module25Desc                                                              : Verkoopopdrachten
admin_Module30Name                                                              : Facturen
admin_Module30Desc                                                              : Factuur- en creditnotabeheer voor afnemers. Factuurbeheer voor leveranciers
admin_Module40Name                                                              : Leveranciers
admin_Module40Desc                                                              : Leveranciersbeheer (inkoopopdrachten en -facturen)
admin_Module42Name                                                              : Syslog
admin_Module42Desc                                                              : logfaciliteiten met behulp van het 'syslog'-systeem
admin_Module49Name                                                              : Editors
admin_Module49Desc                                                              : Editorbeheer
admin_Module50Name                                                              : Producten
admin_Module50Desc                                                              : Productenbeheer
admin_Module51Name                                                              : Bulkmailings
admin_Module51Desc                                                              : Bulkmailingbeheer
admin_Module52Name                                                              : Productenvoorraad
admin_Module52Desc                                                              : Productenvoorraadbeheer
admin_Module53Name                                                              : Diensten
admin_Module53Desc                                                              : Dienstenbeheer
admin_Module54Name                                                              : Contracten
admin_Module54Desc                                                              : Contracten- en dienstenbeheer
admin_Module55Name                                                              : Streepjescodes
admin_Module55Desc                                                              : Streepjescodesbeheer
admin_Module56Name                                                              : Telefonie
admin_Module56Desc                                                              : Telefoniebeheer
admin_Module57Name                                                              : Tekenen
admin_Module57Desc                                                              : Beheer van heffingen en bankonttrekkingen
admin_Module58Name                                                              : ClickToDial
admin_Module58Desc                                                              : Integratie van een 'ClickToDial' systeem (Asterisk, etc)
admin_Module59Name                                                              : Bookmark4u
admin_Module59Desc                                                              : Voeg functionaliteit toe om een 'Bookmark4u'-account te maken vanuit een Dolibarr-account
admin_Module70Name                                                              : Interventies
admin_Module70Desc                                                              : Interventiesbeheer
admin_Module75Name                                                              : Reisnotities en -kosten
admin_Module75Desc                                                              : Beheer van reisnotities en -kosten
admin_Module80Name                                                              : Expedities
admin_Module80Desc                                                              : Beheer afnemersverzending en -ontvangst
admin_Module85Name                                                              : Bank en Contant
admin_Module85Desc                                                              : Beheer van bank- en / of kasrekeningen
admin_Module100Name                                                             : Externe site
admin_Module100Desc                                                             : Voeg een externe website in het Dolibarr menu toe en bekijk deze in een frame
admin_Module105Name                                                             : Mailman en SPIP
admin_Module105Desc                                                             : Mailman of SPIP-interface voor leden-module
admin_Module200Name                                                             : LDAP
admin_Module200Desc                                                             : LDAP mappen synchronisatie
admin_Module210Name                                                             : PostNuke
admin_Module210Desc                                                             : 'PostNuke'-integratie
admin_Module240Name                                                             : Uitvoer gegevens (exporteren)
admin_Module240Desc                                                             : Gereedschap om Dolibarr gegevens te exportereren (via een assistent)
admin_Module250Name                                                             : Invoer gegevens (importeren)
admin_Module250Desc                                                             : Gereedschap om gegevens te importeren in Dolibarr (via een assistent)
admin_Module310Name                                                             : Leden
admin_Module310Desc                                                             : Ledenbeheer (van een vereniging)
admin_Module320Name                                                             : RSS-feeds
admin_Module320Desc                                                             : Voeg een RSS feed toe in de informatieschermen van Dolibarr
admin_Module330Name                                                             : Weblinks (Favouriete internetpagina's in het menu weergeven)
admin_Module330Desc                                                             : weblinkbeheer
admin_Module400Name                                                             : Projecten
admin_Module400Desc                                                             : Projectenbeheer binnen andere modules
admin_Module410Name                                                             : Webkalender
admin_Module410Desc                                                             : Integratie van een webkalender
admin_Module420Name                                                             : Affaires
admin_Module420Desc                                                             : Gestion des affaires
admin_Module430Name                                                             : Gestion d'équipes
admin_Module430Desc                                                             : Gestion des objectifs
admin_Module500Name                                                             : Belastingen, sociale bijdragen en dividenden
admin_Module500Desc                                                             : Beheer van belastingen, sociale bijdragen en dividenden
admin_Module600Name                                                             : Kennisgevingen
admin_Module600Desc                                                             : Stuur kennisgevingen per e-mail van sommige Dolibarr zakelijke gebeurtenisen naar contactpersonen van derde partijen
admin_Module700Name                                                             : Giften
admin_Module700Desc                                                             : Donatiebeheer
admin_Module1400Name                                                            : Boekhouden
admin_Module1400Desc                                                            : Boekhoudkundig beheer van deskundigen (dubbel partijen)
admin_Module1780Name                                                            : Categorieën
admin_Module1780Desc                                                            : Categoriebeheer (producten, leveranciers en afnemers)
admin_Module2000Name                                                            : Fckeditor
admin_Module2000Desc                                                            : Een WYSIWYG editor
admin_Module2200Name                                                            : Uitleenrechten
admin_Module2200Desc                                                            : Uitleenrechtenbeheer
admin_Module2300Name                                                            : Menu's
admin_Module2300Desc                                                            : Menubeheer
admin_Module2400Name                                                            : Agenda
admin_Module2400Desc                                                            : Acties-, taken- en agendabeheer
admin_Module2500Name                                                            : Electronic Content Management
admin_Module2500Desc                                                            : Opslaan en delen van documenten
admin_Module2600Name                                                            : Webdiensten
admin_Module2600Desc                                                            : Activeer de Dolibarr webdienstenserver
admin_Module2700Name                                                            : Gravatar
admin_Module2700Desc                                                            : Gebruik de online dienst 'Gravatar' (www.gravatar.com) voor het posten van afbeeldingen van gebruikers / leden (gevonden door hun e-mails). Internet toegang vereist.
admin_Module2900Name                                                            : GeoIPMaxmind
admin_Module2900Desc                                                            : Capaciteitconversie GeoIP Maxmind
admin_Module5000Name                                                            : Multi-bedrijf
admin_Module5000Desc                                                            : Hiermee kunt meerdere bedrijven beheren in Dolibarr
admin_Module20000Name                                                           : Holidays
admin_Module20000Desc                                                           : Declare and follow employees holidays
admin_Module50000Name                                                           : Paybox
admin_Module50000Desc                                                           : Module om een ​​online betaling pagina te bieden door creditcard met Paybox
admin_Module50100Name                                                           : Verkooppunt
admin_Module50100Desc                                                           : Kassamodule
admin_Module50200Name                                                           : Paypal
admin_Module50200Desc                                                           : Module om een ​​online betaling pagina te bieden per credit card met Paypal
admin_Module59000Name                                                           : Margins
admin_Module59000Desc                                                           : Module to manage margins
admin_Module60000Name                                                           : Commissions
admin_Module60000Desc                                                           : Module to manage commissions
admin_Permission11                                                              : Bekijk afnemersfacturen
admin_Permission12                                                              : Creëer / wijzigen afnemersfacturen
admin_Permission13                                                              : Invalideer afnemersfacturen
admin_Permission14                                                              : Valideer afnemersfacturen
admin_Permission15                                                              : Afnemersfacturen verzenden via e-mail
admin_Permission16                                                              : Creëer betalingen voor afnemersfacturen
admin_Permission19                                                              : Verwijder afnemersfacturen
admin_Permission21                                                              : Bekijk offertes
admin_Permission22                                                              : Creëer / wijzig offertes
admin_Permission24                                                              : Valideer offertes
admin_Permission25                                                              : Stuur offertes
admin_Permission26                                                              : Sluit offertes
admin_Permission27                                                              : Verwijder offertes
admin_Permission28                                                              : Exporteer offertes
admin_Permission31                                                              : Bekijk producten / diensten
admin_Permission32                                                              : Creëer / wijzig producten / diensten
admin_Permission34                                                              : Verwijderen producten / diensten
admin_Permission36                                                              : Exporteer producten / diensten
admin_Permission38                                                              : Export producten
admin_Permission41                                                              : Bekijk projecten (Gedeelde projecten en projecten waarvoor ik de contactpersoon ben)
admin_Permission42                                                              : Creëer / wijzig projecten (Gedeelde projecten en projecten waarvoor ik de contactpersoon ben)
admin_Permission44                                                              : Verwijder projecten (Gedeelde projecten en projecten waarvoor ik de contactpersoon ben)
admin_Permission61                                                              : Bekijk interventies
admin_Permission62                                                              : Creëer / wijzig interventies
admin_Permission64                                                              : Verwijder interventies
admin_Permission67                                                              : Exporteer interventies
admin_Permission71                                                              : Bekijk leden
admin_Permission72                                                              : Creëer / wijzigen leden
admin_Permission74                                                              : Verwijder leden
admin_Permission75                                                              : Stel lidsoorten en -attributen
admin_Permission76                                                              : Exporteer datas
admin_Permission78                                                              : Bekijk abonnementen
admin_Permission79                                                              : Creëer / wijzigen abonnementen
admin_Permission81                                                              : Bekijk afnemersopdrachten
admin_Permission82                                                              : Creëer / wijzig afnemersopdrachten
admin_Permission84                                                              : Valideer afnemersopdrachten
admin_Permission86                                                              : Verzend afnemersopdrachten
admin_Permission87                                                              : Sluit afnemersopdrachten
admin_Permission88                                                              : Annuleer afnemersopdrachten
admin_Permission89                                                              : Verwijder afnemersopdrachten
admin_Permission91                                                              : Bekijk sociale bijdragen en BTW
admin_Permission92                                                              : Creëer / wijzig sociale bijdragen en BTW
admin_Permission93                                                              : Verwijder sociale bijdragen en BTW
admin_Permission94                                                              : Exporteer sociale bijdragen
admin_Permission95                                                              : Bekijk de verslagen
admin_Permission96                                                              : Verzendingsinstellingen
admin_Permission97                                                              : Bekijk factuur boekhouding verzending
admin_Permission98                                                              : Verzending van de factuur boekhoudkundige regel
admin_Permission101                                                             : Bekijk verzendingen
admin_Permission102                                                             : Creëer / wijzig verzendingen
admin_Permission104                                                             : Valideer verzendingen
admin_Permission109                                                             : Verwijder verzendingen
admin_Permission111                                                             : Bekijk de financiële rekeningen
admin_Permission112                                                             : Creëer / wijzig / verwijder en vergelijk transacties
admin_Permission113                                                             : Stel financiële rekeningen in (creëer, beheer, categoriseer)
admin_Permission114                                                             : Consolideer transacties
admin_Permission115                                                             : Exporteer transacties en rekeningafschriften
admin_Permission116                                                             : Overschrijvingen tussen rekeningen
admin_Permission117                                                             : Beheer cheques verzending
admin_Permission121                                                             : Bekijk derde partijen gelinkt aan de gebruiker
admin_Permission122                                                             : Creëer / wijzig derden gelinkt aan gebruiker
admin_Permission125                                                             : Verwijderen van derden gelinkt aan gebruiker
admin_Permission126                                                             : Exporteer derden
admin_Permission141                                                             : Bekijk projecten (ook privé waarvoor ik geen contactpersoon ben)
admin_Permission142                                                             : Creëer / bewerk projecten (ook privé waarvoor ik geen contactpersoon ben)
admin_Permission144                                                             : Verwijder projecten (ook privé waarvoor ik geen contactpersoon ben)
admin_Permission146                                                             : Bekijk leveranciers
admin_Permission147                                                             : Bekijk statistieken
admin_Permission151                                                             : Bekijk doorlopende opdrachten
admin_Permission152                                                             : Creëer / bewerk een doorlopende opdracht verzoek
admin_Permission153                                                             : Bekijk doorlopende opdracht ontvangsten
admin_Permission154                                                             : Crediteren / afwijzen van uitstaande orderbonnen
admin_Permission161                                                             : Bekijk contracten
admin_Permission162                                                             : Creëren / wijzigen van opdrachten
admin_Permission163                                                             : Activeren van een dienst van een contract
admin_Permission164                                                             : Uitschakelen van een dienst van een contract
admin_Permission165                                                             : Verwijderen contracten
admin_Permission171                                                             : Bekijk verplaatsingen
admin_Permission172                                                             : Creëren / bewerken verplaatsingen
admin_Permission173                                                             : Verwijderen verplaatsingen
admin_Permission178                                                             : Exporteereer verplaatsingen
admin_Permission180                                                             : Bekijk leveranciers
admin_Permission181                                                             : Bekijk leverancier opdrachten
admin_Permission182                                                             : Creëren / wijzigen leverancier opdrachten
admin_Permission183                                                             : Valideer leveranciersopdrachten
admin_Permission184                                                             : Goedkeuren leveranciersopdrachten
admin_Permission185                                                             : Bestel leverancieropdrachten
admin_Permission186                                                             : Ontvang leveranciersopdrachten
admin_Permission187                                                             : Sluiten leverancieropdrachten
admin_Permission188                                                             : Annuleren leverancieropdrachten
admin_Permission192                                                             : Regels aanmaken
admin_Permission193                                                             : Regels beëindigen
admin_Permission194                                                             : Consult marge regels
admin_Permission202                                                             : Creëer DSL-aansluitingen
admin_Permission203                                                             : links inzien
admin_Permission204                                                             : Creëer links
admin_Permission205                                                             : Beheer links
admin_Permission206                                                             : Bladeren links
admin_Permission211                                                             : Consult telefonie
admin_Permission212                                                             : Orderregels
admin_Permission213                                                             : Schakel lijn
admin_Permission214                                                             : Configureer telefonie
admin_Permission215                                                             : Configureer leveranciers
admin_Permission221                                                             : Bekijk EMailings
admin_Permission222                                                             : Creëren / wijzigen e-mailings (onderwerp, ontvangers etc)
admin_Permission223                                                             : Valideer EMailings (laat sturen)
admin_Permission229                                                             : Verwijderen EMailings
admin_Permission237                                                             : View recipients and info
admin_Permission238                                                             : Manually send mailings
admin_Permission239                                                             : Delete mailings after validation or sent
admin_Permission241                                                             : Bekijk categorieën
admin_Permission242                                                             : Creëren / wijzigen categorieën
admin_Permission243                                                             : Verwijderen categorieën
admin_Permission244                                                             : Zie de inhoud van de verborgen categorieën
admin_Permission251                                                             : Bekijk de andere gebruikers en groepen
admin_PermissionAdvanced251                                                     : Lees andere gebruikers
admin_Permission252                                                             : Creëren / wijzigen van andere gebruikers, groepen en rechten
admin_Permission253                                                             : Wijzigen van andere gebruikers wachtwoord
admin_PermissionAdvanced253                                                     : Creëer / wijzig de rechten van internet / externe gebruikers
admin_Permission254                                                             : Verwijderen of uitschakelen van andere gebruikers
admin_Permission255                                                             : Creëren / wijzigen eigen gebruikersgegevens
admin_Permission256                                                             : Wijzigen eigen wachtwoord
admin_Permission262                                                             : Uitbreiden van de toegang tot iedereen die verbonden is aan de derde partij (niet alleen die welke verband houden met de gebruiker). Niet functioneel voor externe gebruikers (altijd beperkt tot zichzelf).
admin_Permission271                                                             : Lees CA
admin_Permission272                                                             : Facturen inzien
admin_Permission273                                                             : Facturen uitgeven
admin_Permission281                                                             : Bekijk contactpersonen
admin_Permission282                                                             : Creëren / wijzigen contactpersonen
admin_Permission283                                                             : Contactpersonen verwijderen
admin_Permission286                                                             : Contactpersonen Exporteren
admin_Permission291                                                             : Tarieven inzien
admin_Permission292                                                             : Stel rechten voor tarieven in
admin_Permission293                                                             : Wijzig afnemerstarieven
admin_Permission300                                                             : Bekijk streepjescodes
admin_Permission301                                                             : Creëren / wijzigen streepjescodes
admin_Permission302                                                             : Verwijderen streepjescodes
admin_Permission311                                                             : Diensten inzien
admin_Permission312                                                             : Diensten aan het contract toevoegen
admin_Permission331                                                             : Bekijk weblinks
admin_Permission332                                                             : Creëren / wijzigen weblinks
admin_Permission333                                                             : Verwijderen weblinks
admin_Permission341                                                             : zijn eigen rechten lezen
admin_Permission342                                                             : zijn eigen gebruikersinformatie creëren / wijzigen
admin_Permission343                                                             : Eigen wachtwoord wijzigen
admin_Permission344                                                             : De eigen rechten aanpassen
admin_Permission351                                                             : Groepen inzien
admin_Permission352                                                             : Groepsrechten inzien
admin_Permission353                                                             : Creëren / bewerken van groepen
admin_Permission354                                                             : Verwijderen of uitschakelen van groepen
admin_Permission358                                                             : Gebruikers exporteren
admin_Permission401                                                             : Bekijk kortingen
admin_Permission402                                                             : Creëren / wijzigen kortingen
admin_Permission403                                                             : Kortingen valideren
admin_Permission404                                                             : Kortingen verwijderen
admin_Permission531                                                             : Diensten inzien
admin_Permission532                                                             : Creëren / wijzigen van diensten
admin_Permission534                                                             : Diensten verwijderen
admin_Permission536                                                             : Inzien / beheren van verborgen diensten
admin_Permission538                                                             : Diensten exporteren
admin_Permission701                                                             : Bekijk donaties
admin_Permission702                                                             : Creëren / wijzigen donaties
admin_Permission703                                                             : Verwijderen donaties
admin_Permission1001                                                            : Bekijk voorraden
admin_Permission1002                                                            : Creëren / wijzigen voorraden
admin_Permission1003                                                            : Verwijderen voorraden
admin_Permission1004                                                            : Bekijk voorraadmutaties
admin_Permission1005                                                            : Creëren / wijzigen voorraadmutaties
admin_Permission1101                                                            : Bekijk levering opdrachten
admin_Permission1102                                                            : Creëren / wijzigen opdrachtenlevering
admin_Permission1104                                                            : Valideer opdrachtenlevering
admin_Permission1109                                                            : Verwijderen opdrachtenlevering
admin_Permission1181                                                            : Bekijk leveranciers
admin_Permission1182                                                            : Bekijk leveranciersopdrachten
admin_Permission1183                                                            : Creëer leveranciersopdrachten
admin_Permission1184                                                            : Valideer leveranciersopdrachten
admin_Permission1185                                                            : Goedkeuren leveranciersopdrachten
admin_Permission1186                                                            : Bestel leveranciersopdrachten
admin_Permission1187                                                            : Bevestigt de ontvangst van de leveranciersopdrachten
admin_Permission1188                                                            : Sluiten leverancier opdrachten
admin_Permission1201                                                            : Geef het resultaat van een uitvoervergunning
admin_Permission1202                                                            : Creëren/wijzigen een uitvoervergunning
admin_Permission1231                                                            : Bekijk leveranciersfacturen
admin_Permission1232                                                            : Creëer leveranciersfacturen
admin_Permission1233                                                            : Valideer leveranciersfacturen
admin_Permission1234                                                            : Verwijderen leveranciersfacturen
admin_Permission1235                                                            : Leveranciersfacturen per e-mail verzenden
admin_Permission1236                                                            : Exporteer leveranciersfacturen, attributen en betalingen
admin_Permission1237                                                            : Export supplier orders and their details
admin_Permission1251                                                            : Voer massale invoer van externe gegevens in de database uit (data load)
admin_Permission1321                                                            : Exporteer afnemersfacturen, attributen en betalingen
admin_Permission1401                                                            : Lees het rekeningschema
admin_Permission1402                                                            : Creeer / bewerk een rekeningschema
admin_Permission1403                                                            : Sluit een rekeningschema
admin_Permission1411                                                            : Toon boekingen
admin_Permission1412                                                            : Creeer / bewerk / annulleer boeking
admin_Permission1415                                                            : Toon CA, balansen, resultaten, logs, grootboeken
admin_Permission1421                                                            : Exporteer afnemersfacturen en attributen
admin_Permission2401                                                            : Bekijk acties (gebeurtenissen of taken) in gerelateerd aan eigen account
admin_Permission2402                                                            : Creëren / wijzigen / verwijderen acties (gebeurtenissen of taken) gerelateerd aan eigen account
admin_Permission2403                                                            : Bekijk acties (gebeurtenissen of taken) van anderen
admin_Permission2411                                                            : Inzien van acties (gebeurtenissen of taken) van anderen
admin_Permission2412                                                            : Creëer/delete acties (gebeurtenissen of taken) van anderen
admin_Permission2413                                                            : Wijzig acties (gebeurtenissen of taken) van anderen
admin_Permission2501                                                            : Inzien van documenten
admin_Permission2502                                                            : Uploaden of verwijderen van documenten
admin_Permission2503                                                            : In te dienen of te verwijderen documenten
admin_Permission2515                                                            : Instellen documentabonneelijsten
admin_Permission2801                                                            : Use FTP client in read mode (browse and download only)
admin_Permission2802                                                            : Use FTP client in write mode (delete or upload files)
admin_Permission50101                                                           : Use Point of sales
admin_Permission50201                                                           : Lees transacties
admin_Permission50202                                                           : Import transacties
admin_DictionnaryCompanyType                                                    : Bedrijfssoorten
admin_DictionnaryCompanyJuridicalType                                           : Juridische aard van de onderneming
admin_DictionnaryProspectLevel                                                  : Prospect potentiële niveau
admin_DictionnaryCanton                                                         : Provincie
admin_DictionnaryRegion                                                         : Regio's
admin_DictionnaryCountry                                                        : Landen
admin_DictionnaryCurrency                                                       : Valuta
admin_DictionnaryCivility                                                       : Aanspreektitel
admin_DictionnaryActions                                                        : Actielijst
admin_DictionnarySocialContributions                                            : Soorten sociale premies
admin_DictionnaryVAT                                                            : BTW-tarief
admin_DictionnaryPaymentConditions                                              : Betalingsvoorwaarden
admin_DictionnaryPaymentModes                                                   : Betaalmogelijkheden
admin_DictionnaryTypeContact                                                    : Contactpersoonsoorten
admin_DictionnaryEcotaxe                                                        : Ecotaks (AEEA)
admin_DictionnaryPaperFormat                                                    : Papierformaten
admin_DictionnaryFees                                                           : Aard van de vergoedingen
admin_DictionnarySendingMethods                                                 : Verzendwijze
admin_DictionnaryStaff                                                          : Personeel
admin_DictionnaryAvailability                                                   : Vertraagde levering
admin_DictionnaryOrderMethods                                                   : Bestelwijzen
admin_DictionnarySource                                                         : Oorsprong van de voorstellen / orders
admin_DictionnaryAccountancyplan                                                : Chart of accounts
admin_DictionnaryAccountancysystem                                              : Models for chart of accounts
admin_SetupSaved                                                                : Instellingen opgeslagen
admin_BackToModuleList                                                          : Terug naar moduleoverzicht
admin_BackToDictionnaryList                                                     : Terug naar het constantenoverzicht
admin_VATReceivedOnly                                                           : Speciaal tarief niet ten laste
admin_VATManagement                                                             : BTW-beheer
admin_VATIsUsedDesc                                                             : Het standaard BTW-tarief bij het aanmaken van prospecten, facturen, orders etc volgt de actieve standaard regel:<br>Als de verkoper onderworpen is aan BTW, dan wordt BTW standaard op 0 gezet. Einde van de regel.<br>Als het 'land van de verkoper' = 'het land van de koper' dan wordt de BTW standaard ingesteld op de BTW van het product in het verkopende land. Einde van de regel.<br>Als verkoper en koper zich in de Europese Gemeenschap bevinden en het betreft een nieuw vervoersmiddel (auto, boot, vliegtuig), dan wordt de BTW standaard ingesteld op 0 (De BTW moet worden betaald door koper in het grenskantoor van zijn land en niet door de verkoper). Einde van de regel.<br>Als verkoper en koper zich in de Europese Unie bevinden en de koper is een persoon of bedrijf zonder BTW-registratienummer = BTW-standaard van het verkochte product. Einde van de regel.<br>Als verkoper en koper zich in de Europese Gemeenschap bevinden en de koper geen bedrijf is, dan wordt de BTW standaard ingesteld op de BTW van het verkochte product. Einde van de regel<br><br>In alle andere gevallen wordt de BTW standaard ingesteld op 0. Einde van de regel.<br>
admin_VATIsNotUsedDesc                                                          : Standaard is de voorgestelde BTW 0. Dit kan gebruikt worden in situaties zoals verenigingen, particulieren of kleine bedrijven.
admin_VATIsUsedExampleFR                                                        : In Frankrijk, betekent dit dat bedrijven of organisaties met een echt fiscaalsysteem (Vereenvoudigd reëel of normaal reëel). Een systeem waarbij de BTW wordt aangegeven.
admin_VATIsNotUsedExampleFR                                                     : In Frankrijk, betekent dit verenigingen die geen BTW aangegeven of bedrijven, organisaties of vrije beroepen die hebben gekozen voor het micro-onderneming fiscale stelsel (BTW in franchise) en een franchise BTW betaalden zonder BTW aangifte. Bij het maken van deze keuze verschijnt de vermelding "Niet van toepassing BTW - art-293B van CGI" op de facturen.
admin_LocalTax1ManagementES                                                     : Gestion RE
admin_LocalTax1IsUsedDescES                                                     : Het RE tarief volgt standaard de actieve standaardregel (bij het maken van prospecten, facturen, opdrachten etc)<br> Als de koper niet is onderworpen aan RE, wordt de RE standaard standaard ingesteld op 0. Einde van de regel.<br>Indien de koper wordt onderworpen aan dan de RE dan standaard RE. Einde van de regel.<br>
admin_LocalTax1IsNotUsedDescES                                                  : Standaard is de voorgestelde RE 0. Einde van de regel.
admin_LocalTax1IsUsedExampleES                                                  : In Spanje zijn zij professionals die onderworpen zijn aan enkele specifieke secties van het Spaanse IAE.
admin_LocalTax1IsNotUsedExampleES                                               : In Spanje zijn zij professionals en verenigingen die onderworpen zijn aan bepaalde secties van het Spaanse IAE.
admin_LocalTax2ManagementES                                                     : IRPF beheer
admin_LocalTax2IsUsedDescES                                                     : Het standaard RE tarief bij het aanmaken van prospecten, facturen, opdrachten, etc volgt de actieve standaardregel:<br>Wanneer de verkoper niet onderworpen is aan de IRPF, dan wordt IRPF ingesteld op o. Einde van de regel.<br>Wanneer de verkoper onderworpen is aan de IRPF, dan wordt standaard de IRPF insgesteld. Einde van regel.<br>
admin_LocalTax2IsNotUsedDescES                                                  : Standaard is de voorgestelde IRPF 0. Einde van de regel.
admin_LocalTax2IsUsedExampleES                                                  : In Spanje, freelancers en onafhankelijke professionals die diensten aanbieden alsmede bedrijven die voor het belastingsysteem van modules hebben gekozen.
admin_LocalTax2IsNotUsedExampleES                                               : In Spanje zijn zij bedrijven die niet onderworpen zijn aan het belastingsysteem van modules.
admin_LabelUsedByDefault                                                        : Standaard te gebruiken label indien er geen vertaling kan worden gevonden voor de code
admin_LabelOnDocuments                                                          : Etiket op documenten
admin_NbOfDays                                                                  : Aantal dagen
admin_AtEndOfMonth                                                              : Aan het einde van de maand
admin_Offset                                                                    : Offset (afstand)
admin_AlwaysActive                                                              : Altijd actief
admin_UpdateRequired                                                            : Uw systeem moet worden bijgewerkt. Klik, om dit te doen, op <a href="%s">Nu bijwerken.</a>
admin_Upgrade                                                                   : Bijwerken
admin_MenuUpgrade                                                               : Bijwerken / Uitbreiden
admin_AddExtensionThemeModuleOrOther                                            : Toevoegen uitbreiding (thema, module, etc)
admin_WebServer                                                                 : Webserver
admin_DocumentRootServer                                                        : 'Root' map van de webserver
admin_DataRootServer                                                            : Gegevensbestandenmap
admin_IP                                                                        : IP
admin_Port                                                                      : Poort
admin_VirtualServerName                                                         : Virtuele servernaam
admin_AllParameters                                                             : Alle instellingen
admin_OS                                                                        : OS
admin_Php                                                                       : PHP
admin_PhpEnv                                                                    : Env
admin_PhpModules                                                                : Modules
admin_PhpConf                                                                   : Configuratie
admin_PhpWebLink                                                                : PHP Weblink
admin_Pear                                                                      : Pear
admin_PearPackages                                                              : Pear-pakketten
admin_Database                                                                  : Database
admin_DatabaseServer                                                            : Databasehost
admin_DatabaseName                                                              : Databasenaam
admin_DatabasePort                                                              : Databasepoort
admin_DatabaseUser                                                              : Databasegebruikersnaam
admin_DatabasePassword                                                          : Databasewachwoord
admin_DatabaseConfiguration                                                     : Database-instellingen
admin_Tables                                                                    : Tabellen
admin_TableName                                                                 : Tabelnaam
admin_TableLineFormat                                                           : Tabelregelformaat
admin_NbOfRecord                                                                : Aantal tabelregels
admin_Constraints                                                               : Begrenzingen (constraints)
admin_ConstraintsType                                                           : Begrenzingstype
admin_ConstraintsToShowOrNotEntry                                               : Begrenzingen wel of niet tonen menu-item
admin_AllMustBeOk                                                               : Controleer alle gegevens
admin_Host                                                                      : Server
admin_DriverType                                                                : Drivertype
admin_SummarySystem                                                             : Samenvatting van systeeminformatie
admin_SummaryConst                                                              : Lijst van alle Dolibarr-instellingen
admin_SystemUpdate                                                              : Systeem bijwerken
admin_SystemSuccessfulyUpdate                                                   : Uw systeem is met succes bijgewerkt
admin_MenuCompanySetup                                                          : Bedrijf / Stichting
admin_MenuNewUser                                                               : Nieuwe gebruiker
admin_MenuTopManager                                                            : menuverwerker bovenste menu
admin_MenuLeftManager                                                           : menuverwerker linker menu
admin_MenuManager                                                               : Standaard menuverwerker
admin_MenuSmartphoneManager                                                     : menuverwerker smartphonemenu
admin_DefaultMenuTopManager                                                     : standaard menuverwerker bovenste menu
admin_DefaultMenuLeftManager                                                    : standaard menuverwerker linker menu
admin_DefaultMenuManager                                                        : standaard menuverwerker
admin_DefaultMenuSmartphoneManager                                              : standaard smartphonemenuverwerker
admin_Skin                                                                      : Uiterlijksthema
admin_DefaultSkin                                                               : Standaard uiterlijksthema
admin_MaxSizeList                                                               : Maximale lijstlengte
admin_DefaultMaxSizeList                                                        : Standaard maximale lijstlengte
admin_MessageOfDay                                                              : Bericht van de dag
admin_MessageLogin                                                              : Bericht op inlogpagina
admin_PermanentLeftSearchForm                                                   : Permanent zoekformulier in linker menu
admin_DefaultLanguage                                                           : Standaard te gebruiken taal (taal-code)
admin_EnableMultilangInterface                                                  : Inschakelen meertalige interface
admin_EnableShowLogo                                                            : Toon logo in het linker menu
admin_SystemSuccessfulyUpdated                                                  : Uw systeem is bijgewerkt
admin_CompanyInfo                                                               : Bedrijf / stichting informatie
admin_CompanyIds                                                                : Bedrijf / stichting identiteiten
admin_CompanyName                                                               : Naam
admin_CompanyAddress                                                            : Adres
admin_CompanyZip                                                                : Postcode
admin_CompanyTown                                                               : Plaats
admin_CompanyCountry                                                            : Land
admin_CompanyCurrency                                                           : Belangrijkste valuta
admin_DoNotShow                                                                 : Niet tonen
admin_DoNotSuggestPaymentMode                                                   : Geen betalingswijze voorstellen
admin_NoActiveBankAccountDefined                                                : Geen actieve bankrekening ingesteld
admin_OwnerOfBankAccount                                                        : Eigenaar van bankrekening %s
admin_BankModuleNotActive                                                       : Bankrekeningen module niet ingeschakeld
admin_ShowBugTrackLink                                                          : Toon link 'Rapporteer een fout'
admin_ShowWorkBoard                                                             : Toon 'werkbank' op homepage
admin_Alerts                                                                    : Kennisgevingen
admin_Delays                                                                    : Vertragingen
admin_DelayBeforeWarning                                                        : Vertraging voorafgaande aan kennisgeving
admin_DelaysBeforeWarning                                                       : Vertragingen voorafgaande aan kennisgeving
admin_DelaysOfToleranceBeforeWarning                                            : Getolereerde vertraging voor kennisgeving
admin_DelaysOfToleranceDesc                                                     : In dit scherm kunt u de getolereerde vertraging voordat een kennisgeving wordt gemeld op het scherm met een icoontje %s voor elk te laat element.
admin_Delays_MAIN_DELAY_ACTIONS_TODO                                            : Getolereerde vertraging (in dagen) voor de kennisgeving over de nog niet gerealiseerde geplande acties
admin_Delays_MAIN_DELAY_ORDERS_TO_PROCESS                                       : Getolereerde vertraging (in dagen) voor een kennisgeving, op nog niet uitgevoerde orders word getoond
admin_Delays_MAIN_DELAY_SUPPLIER_ORDERS_TO_PROCESS                              : Vertragingstoleratie (in dagen) voordat een kennisgeving plaatsvind van nog niet verwerkte leveranciersopdrachten.
admin_Delays_MAIN_DELAY_PROPALS_TO_CLOSE                                        : Getolereerde vertraging (in dagen) voor een kennisgeving, op af te sluiten offertes word getoond
admin_Delays_MAIN_DELAY_PROPALS_TO_BILL                                         : Getolereerde vertraging (in dagen) voor een kennisgeving, op niet-gefactureerde offertes word getoond
admin_Delays_MAIN_DELAY_NOT_ACTIVATED_SERVICES                                  : Getolereerde vertraging (in dagen) voor een kennisgeving, op te activeren diensten word getoond
admin_Delays_MAIN_DELAY_RUNNING_SERVICES                                        : Getolereerde vertraging (in dagen) voor een kennisgeving, op afgelopen diensten word getoond
admin_Delays_MAIN_DELAY_SUPPLIER_BILLS_TO_PAY                                   : Getolereerde vertraging (in dagen) voor een kennisgeving, op een onbetaalde leveranciersfactuur word getoond
admin_Delays_MAIN_DELAY_CUSTOMER_BILLS_UNPAYED                                  : Getolereerde vertraging (in dagen) voor een kennisgeving, op een onbetaalde afnemersfactuur word getoond
admin_Delays_MAIN_DELAY_TRANSACTIONS_TO_CONCILIATE                              : Getolereerde vertraging (in dagen) voor een kennisgeving, op bank conciliatie word getoond
admin_Delays_MAIN_DELAY_MEMBERS                                                 : Getolereerde vertraging (in dagen) voor een kennisgeving, op niet betaalde contributie word getoond
admin_Delays_MAIN_DELAY_CHEQUES_TO_DEPOSIT                                      : Getolereerde vertraging (in dagen) voor de kennisgeving voor nog te doen cheques aanbetaling
admin_SetupDescription1                                                         : Alle instellingen die beschikbaar zijn in het instellingenscherm kunt u instellen voordat u begint met het gebruik van Dolibarr.
admin_SetupDescription2                                                         : De 2 belangrijkste instellingsstappen zijn de 2 eersten uit het linker menu 'Instellingen', dit zijn de 'bedrijf / stiching' instellingenpagina en de 'Modules' pagina:
admin_SetupDescription3                                                         : De <b>Bedrijf / stichting</b>-instellingen zijn nodig omdat de ingevoerde gegevens worden gebruikt op de Dolibarr schermen en om de werkwijze van Dolibaar aan te passen (bijvoorbeeld functionaliteitafstemming met betrekking tot uw land, of documentengeneratie).
admin_SetupDescription4                                                         : De <b>Modules</b>-instellingen zijn nodig omdat Dolibarr modulair opgebouwd ERP / CRM systeem is. Pas na het activeren van modules die voor u interessant zijn, zult u items zien verschijnen in het Dolibarr menu.
admin_SetupDescription5                                                         : Andere menu-items beheren / optionele instellingen.
admin_EventsSetup                                                               : Instellingen voor gebeurtenissenlog
admin_LogEvents                                                                 : Veiligheidsauditgebeurtenissen
admin_Audit                                                                     : Audit
admin_InfoSpeedealing                                                           : Infos Speedealing
admin_InfoOS                                                                    : Infos OS
admin_InfoWebServer                                                             : Infos web server
admin_InfoDatabase                                                              : Infos database
admin_InfoPHP                                                                   : Infos PHP
admin_ListEvents                                                                : Auditgebeurtenissen
admin_ListOfSecurityEvents                                                      : Lijst van Dolibarr veiligheidgebeurtenisen
admin_SecurityEventsPurged                                                      : Beveiliging gebeurtenissen verwijderd
admin_LogEventDesc                                                              : Hier kunt u de de gewenste veiligheidslogs in- of uitschakelen. Beheerders kunnen de inhoud ervan dan zien via het menu <b>Home->Systeemwerkset->Audit.</b> Waarschuwing, deze functionaliteit kan een grote hoeveelheid gegevens in de database wegschrijven.
admin_AreaForAdminOnly                                                          : Deze functies kunnen alleen worden gebruikt door <b>beheerders</b>
admin_SystemInfoDesc                                                            : Systeeminformatie is technische informatie welke u in alleen-lezen modus krijgt en alleen door beheerders is in te zien.
admin_SystemAreaForAdminOnly                                                    : Dit scherm is alleen beschikbaar voor de beheerders. Andere Dolibarr gebruikers kunnen hier niets wijzigen.
admin_CompanyFundationDesc                                                      : Beheerpagina bedrijf, vennootschap of stichting die u moet beheren
admin_DisplayDesc                                                               : U kunt hier instellingen doen die het uiterlijk van Dolibarr instellen
admin_AvailableModules                                                          : Beschikbare modules
admin_ToActivateModule                                                          : Om modules te activeren, ga naar Home->Instellingen->Modules.
admin_SessionTimeOut                                                            : Time-out van de sessie
admin_SessionExplanation                                                        : De hier ingestelde waarde garandeert dat de sessie nooit zal verlopen voordat deze periode is verlopen, maar niet dat de sessie wel verloopt na deze vertraging, omdat sessies worden worden verwijderd wanneer het systeem zelf een opschoning begint.<br>Opmerking: bij geen specifiek systeem, zal PHP elke sessie wissen rond <b>%s/%s</b> toegang, maar alleen tijdens de toegang van andere sessies.
admin_TriggersAvailable                                                         : Beschikbare initiatoren (triggers)
admin_TriggersDesc                                                              : Initiatoren zijn bestanden die het gedrag van de 'workflow' van Dolibarr zullen beïnvloeden vanaf het moment dat zij zijn gekopieerd naar de map <b>htdocs/core/triggers.</b>Zij initiëren nieuwe acties, geactiveerd door Dolibarr gebeurtenissen (de creatie van nieuwe bedrijven, factuur validatie, etc).
admin_TriggerDisabledByName                                                     : Initiatoren in dit bestand zijn uitgeschakeld door het <b>NoRun</b> achtervoegsel in hun naam.
admin_TriggerDisabledAsModuleDisabled                                           : Initiatoren in dit bestand zijn uitgeschakeld als module <b>%s</b> is uitgeschakeld.
admin_TriggerAlwaysActive                                                       : Initiatoren in dit bestand zijn altijd actief, ongeacht de geactiveerde modules in Dolibarr.
admin_TriggerActiveAsModuleActive                                               : Initiatoren in dit bestand zijn actief als module <b>%s</b> is ingeschakeld.
admin_GeneratedPasswordDesc                                                     : Stel hier de regel in die u wilt gebruiken voor het genereren van een nieuwe wachtwoord als u vraagt om een automatisch gegenereerd wachtwoord
admin_DictionnaryDesc                                                           : Stel hier alle constanten in. U kunt vooraf ingestelde waarden aanpassen naar de uwe.
admin_ConstDesc                                                                 : Op deze pagina vint u alle andere instellingen die niet beschikbaar zijn in de voorgaande pagina's. Ze zijn voorbehouden instellingen voor geavanceerde ontwikkelaars of voor 'troubleshouting'.
admin_OnceSetupFinishedCreateUsers                                              : Waarschuwing, u bent een Dolibarr beheerder. Beheerdersaccounts worden gebruikt voor de installatie van Dolibarr. Voor een normaal gebruik van Dolibarr, wordt aangeraden gebruik te maken van een niet-beheerders account, aangemaakt onder: Gebruikers & Groepen menu.
admin_MiscellanousDesc                                                          : Stel hier alle andere instellingen in die betrekking hebben op veiligheid.
admin_LimitsSetup                                                               : Limieten- en precisieinstellingen
admin_LimitsDesc                                                                : U kunt hier limieten en preciseringen die Dolibarr gebruikt instellen
admin_MAIN_MAX_DECIMALS_UNIT                                                    : Maximaal aantal decimalen voor eenheidsprijzen
admin_MAIN_MAX_DECIMALS_TOT                                                     : Maximaal aantal decimalen voor de totale prijs
admin_MAIN_MAX_DECIMALS_SHOWN                                                   : Maximaal aantal decimalen voor de prijzen weergegeven op het scherm (Voeg <b>...</b> toe na dit nummer als u <b>...</b> wilt zien als het nummer wordt afgekapt op het scherm)
admin_MAIN_DISABLE_PDF_COMPRESSION                                              : Gebruik PDF-compressie voor gegenereerde PDF-bestanden.
admin_MAIN_ROUNDING_RULE_TOT                                                    : Grootte van het afrondingsbereik (voor de zeldzame landen waar afronden anders wordt gedaan dan op basis 10)
admin_UnitPriceOfProduct                                                        : Prijs per eenheid van een product
admin_TotalPriceAfterRounding                                                   : Totale prijs inclusief na afronding
admin_ParameterActiveForNextInputOnly                                           : De instelling word pas actief voor de volgende invoer
admin_NoEventOrNoAuditSetup                                                     : Geen geregistreerde auditgebeurtenis. Dit is normaal als de audit nog niet is ingeschakeld in "Home->Instellingen->Beveiliging->Audit".
admin_NoEventFoundWithCriteria                                                  : Geen beveiligingsgebeurtenis gevonden met deze zoek criteria.
admin_SeeLocalSendMailSetup                                                     : Controleer de instellingen van uw lokale "sendmail"-programma
admin_BackupDesc                                                                : Om een complete backup van Dolibarr te maken, dient u:
admin_BackupDesc2                                                               : - Bewaar de inhoud van de documenten map (<b>%s</b>) welke alle uploads en gegenereerde bestanden bevat (bijvoorbeeld als zip-bestand).
admin_BackupDesc3                                                               : - Bewaar de inhoud van uw database in een dump bestand. Om dit te doen, kunt u gebruik maken van de volgende assistent.
admin_BackupDescX                                                               : Gearchiveerde map-bestand moet op een veilige plaats worden opgeslagen.
admin_BackupDescY                                                               : De gemaakte dump bestand moet op een veilige plaats worden opgeslagen.
admin_BackupPHPWarning                                                          : Backup can't be guaranted with this method. Prefer previous one
admin_RestoreDesc                                                               : Om een Dolibarr backup terug te zetten, dient u:
admin_RestoreDesc2                                                              : - Herstel archiefbestand (zip bestand bijvoorbeeld) van de oude documentenmap in de documentenmap van de nieuwe Dolibarr installatie of in huidige documentenmap (<b>%s</b>).
admin_RestoreDesc3                                                              : - Herstel de gegevens van een backup dumpbestand, in de database van de nieuwe Dolibarr installatie of in de database van de huidige installatie. Waarschuwing, zodra een herstel is gedaan, zult u de gebruikersnaam en wachtwoord die bestonden toen de backup werd gemaakt, moeten gebruiken. Om een backupdatabase in de huidige installatie te herstellen, kunt u de assistent (wizard) volgen.
admin_RestoreMySQL                                                              : MySQL import
admin_ForcedToByAModule                                                         : Geforceerd tot <b>%s</b> door een geactiveerde module
admin_PreviousDumpFiles                                                         : Beschikbare databasebackupdumpbestanden
admin_WeekStartOnDay                                                            : Eerste dag van de week
admin_RunningUpdateProcessMayBeRequired                                         : Update lijkt vereist (Programma versie %s verschilt met de database versie %s)
admin_YouMustRunCommandFromCommandLineAfterLoginToUser                          : U dient dit commando vanaf de opdrachtregel uit te voeren, na ingelogd te zijn als gebruiker <b>%s</b>. Of u dient het commando uit te breiden door de -W optie mee te geven zodat u het wachtwoord kunt opgeven.
admin_YourPHPDoesNotHaveSSLSupport                                              : SSL functies niet beschikbaar in uw PHP installatie
admin_DownloadMoreSkins                                                         : Meer uiterlijkthema's om te downloaden
admin_SimpleNumRefModelDesc                                                     : Geeft het referentienummer terug in het formaat %sjjmm-nnnn waar jj jaar is, mm de maand en nnnn een opeenvolgende aaneengesloten reeks en zonder vervangende 0
admin_ShowProfIdInAddress                                                       : Toon in het adresgedeelte van documenten het 'professioneel ID'
admin_TranslationUncomplete                                                     : Onvolledige vertaling
admin_SomeTranslationAreUncomplete                                              : Sommige talen zijn mogelijk slechts gedeeltelijk vertaald of kunnen fouten bevatten. Wanneer u dit tegenkomt, dan kunt u dit oplossen door de <b>.lang</b> tekstbestanden in de map <b>htdocs/langs/</b> aan te passen en de wijzigen te delen op het forum op het adres <a href="http://www.dolibarr.org/forum" target="_blank">http://www.dolibarr.org</a>
admin_MenuUseLayout                                                             : Maak het mogelijk verticale menu's te verbergen (Voor deze optie moet Javascript ingeschakeld zijn)
admin_MAIN_DISABLE_METEO                                                        : Schakel "Meteo"-weergave uit
admin_TestLoginToAPI                                                            : Test inloggen op API
admin_ProxyDesc                                                                 : Sommige functies van Dolibarr moet een toegang tot internet aan het werk te hebben. Definieer hier parameters voor deze. Als de Dolibarr server zich achter een Proxy server, deze parameters vertelt Dolibarr hoe toegang tot internet via het.
admin_ExternalAccess                                                            : Externe toegang
admin_MAIN_PROXY_USE                                                            : Gebruik een proxy server (anders directe toegang tot internet)
admin_MAIN_PROXY_HOST                                                           : Naam / adres van de proxy server
admin_MAIN_PROXY_PORT                                                           : Poort van de proxy server
admin_MAIN_PROXY_USER                                                           : Inloggen op de proxyserver te gebruiken
admin_MAIN_PROXY_PASS                                                           : Wachtwoord voor de proxy-server te gebruiken
admin_DefineHereComplementaryAttributes                                         : Definieer hier alle attributen, niet reeds standaard beschikbaar, en dat je wilt worden ondersteund voor %s.
admin_ExtraFields                                                               : Aanvullende attributen
admin_ExtraFieldsThirdParties                                                   : Complementary attributes (thirdparty)
admin_ExtraFieldsContacts                                                       : Complementary attributes (contact/address)
admin_ExtraFieldHasWrongValue                                                   : Toe te schrijven %s heeft een verkeerde waarde.
admin_AlphaNumOnlyCharsAndNoSpace                                               : only alphanumericals characters without space
admin_SendingMailSetup                                                          : Instellen van verzendingen via e-mail
admin_SendmailOptionNotComplete                                                 : Waarschuwing, op sommige Linux-systemen, e-mail verzenden vanaf uw e-mail, sendmail uitvoering setup moet conatins optie-ba (parameter mail.force_extra_parameters in uw php.ini-bestand). Als sommige ontvangers nooit e-mails ontvangen, probeer dit PHP parameter bewerken met mail.force_extra_parameters =-ba).
admin_PathToDocuments                                                           : Pad naar documenten
admin_PathDirectory                                                             : Map
admin_SendmailOptionMayHurtBuggedMTA                                            : Feature om e-mails met behulp van methode &quot;PHP mail direct&quot; te sturen zal een e-mailbericht dat niet goed zou kunnen worden ontleed door sommige het ontvangen van e-mailservers. Resultaat is dat sommige mails niet kunnen worden gelezen door mensen gehost door thoose afgeluisterd platforms. Het is het geval voor sommige Internet providers (Ex: Orange in Frankrijk). Dit is geen probleem in Dolibarr noch in PHP, maar op het ontvangen van e-mailserver. U kunt de optie MAIN_FIX_FOR_BUGGED_MTA echter toe te voegen aan 1 in setup - andere om Dolibarr wijzigen om dit te voorkomen. Echter, kunnen er problemen met andere servers dat opzicht strikt de SMTP-standaard. De andere oplossing (aanbevolen) is het gebruik van de methode &quot;SMTP-socket bibliotheek&quot; dat er geen nadelen heeft.
admin_TranslationSetup                                                          : Configuration de la traduction
admin_TranslationDesc                                                           : Choice of language visible on screen can be modified:<br>* Globally from menu <strong>Home - Setup - Display</strong><br>* For user only from tab <strong>User display</strong> of user card (click on login on top of screen).
admin_ClassNotFoundIntoPathWarning                                              : Class %s not found into PHP path
admin_PasswordGenerationStandard                                                : Geeft een wachtwoord terug dat gegenereerd is volgens het interne Dolibarr algoritme: 8 karakters met gedeelde nummers en tekens in kleine letters.
admin_PasswordGenerationNone                                                    : Doe geen wachtwoordsuggesties. Wachtwoord moet handmatig worden ingevoerd.
admin_UserGroupSetup                                                            : Gebruikers- en groepenmoduleinstellingen
admin_GeneratePassword                                                          : Doe een wachtwoordsuggestie
admin_RuleForGeneratedPasswords                                                 : Regel voor te genereren suggestie- en validatiewachtwoorden
admin_DoNotSuggest                                                              : Geef geen wachtwoordsuggestie
admin_EncryptedPasswordInDatabase                                               : Om het mogelijk te maken wachtwoorden in de databse te versleutelen
admin_DisableForgetPasswordLinkOnLogonPage                                      : Verberg de link "Wachtwoord vergeten?" op de inlogpagina
admin_UsersSetup                                                                : Gebruikersmoduleinstellingen
admin_UserMailRequired                                                          : E-mail verplicht om een nieuwe gebruiker creëren
admin_CompanySetup                                                              : Derde partijenmoduleinstellingen
admin_CompanyCodeChecker                                                        : Module voor de generatie en toetsing van codes voor derde partijen (afnemer of leverancier)
admin_AccountCodeManager                                                        : Module voor de generatie van boekhoudkundige codes (afnemer of leverancier)
admin_ModuleCompanyCodeAquarium                                                 : Geef een boekhoudkundige code terug opgebouwd uit "401", gevolgd door de de leverancierscode(Wanneer het een leverancier betreft) of een afnemerscode van de derde partij (Wanneer het een afnemer betreft).
admin_ModuleCompanyCodePanicum                                                  : Geef een lege boekhoudkundige code terug.
admin_ModuleCompanyCodeDigitaria                                                : Boekhoudkundige-code is afhankelijk van derden code. De code bestaat uit het teken "C" in de eerste positie, gevolgd door de eerste 5 tekens van de derden code.
admin_UseNotifications                                                          : Gebruik kennisgevingen
admin_NotificationsDesc                                                         : De e-mailkennisgevingenfunctionaliteit stelt u in staat om vooraf ingestelde automatisch e-mails naar derden te versturen.
admin_ModelModules                                                              : Documentensjablonen
admin_DocumentModelOdt                                                          : Creëer documenten met OpenDocuments sjablonen (.odt bestanden voor OpenOffice, KOffice, TextEdit, etc)
admin_WatermarkOnDraft                                                          : Watermerk op conceptdocumenten
admin_CompanyIdProfChecker                                                      : Professionele Id unieke
admin_MustBeUnique                                                              : Moet uniek zijn?
admin_Miscellanous                                                              : Diversen
admin_WebCalSetup                                                               : Webkalenderlinkinstellingen
admin_WebCalSyncro                                                              : Voeg Dolibarr gebeurtenissen aan de webkalender toe
admin_WebCalAllways                                                             : Altijd, niet vragen
admin_WebCalYesByDefault                                                        : Op de vraag (standaard ja)
admin_WebCalNoByDefault                                                         : Op de vraag (standaard nee)
admin_WebCalNever                                                               : Nooit
admin_WebCalURL                                                                 : URL voor kalendertoegang
admin_WebCalServer                                                              : Server die kalenderdatabase host
admin_WebCalDatabaseName                                                        : Databasenaam
admin_WebCalUser                                                                : Databasegebruikersnaam
admin_WebCalSetupSaved                                                          : Webkalenderinstellingen opgeslagen.
admin_WebCalTestOk                                                              : Verbinding met server '%s' en database '%s' voor gebruiker '%s' geslaagd.
admin_WebCalTestKo1                                                             : Verbinding met server '%s' geslaagd maar database '%s' is niet bereikbaar.
admin_WebCalTestKo2                                                             : Verbinding met server '%s' met gebruiker '%s' is mislukt.
admin_WebCalErrorConnectOkButWrongDatabase                                      : Verbinding geslaagd maar de database lijkt geen Webkalender database te zijn.
admin_WebCalAddEventOnCreateActions                                             : Voeg kalendergebeurtenis toe bij het creeeren van een actie
admin_WebCalAddEventOnCreateCompany                                             : Voeg agendagebeurtenis toe bij het creëren van een nieuw bedrijf
admin_WebCalAddEventOnStatusPropal                                              : Voeg kalendergebeurtenis toe bij het veranderen van de status van een offerte
admin_WebCalAddEventOnStatusContract                                            : Voeg kalendergebeurtenis toe bij het veranderen van de status van een contract
admin_WebCalAddEventOnStatusBill                                                : Voeg kalendergebeurtenis toe bij het veranderen van de status van een rekening
admin_WebCalAddEventOnStatusMember                                              : Voeg kalendergebeurtenis toe bij het veranderen van de status van een lid
admin_WebCalUrlForVCalExport                                                    : Een exportlink naar het <b>%s</b> formaat is beschikbaar onder de volgende link: %s
admin_WebCalCheckWebcalSetup                                                    : Misschien is de Webcalmoduleinstallatie niet correct.
admin_BillsSetup                                                                : Facturenmodule instellen
admin_BillsDate                                                                 : Facturendatum
admin_BillsNumberingModule                                                      : Nummeringsmodule voor facturen en creditnota's
admin_BillsPDFModules                                                           : Factuur documentsjablonen
admin_CreditNoteSetup                                                           : Creditnotamoduleinstellingen
admin_CreditNotePDFModules                                                      : Creditnota documentsjablonen
admin_CreditNote                                                                : Creditnota
admin_CreditNotes                                                               : Creditnota's
admin_ForceInvoiceDate                                                          : Forceer factuurdatum naar validatiedatum
admin_DisableRepeatable                                                         : Schakel herhaalbare facturen uit
admin_SuggestedPaymentModesIfNotDefinedInInvoice                                : Voorgestelde betaalwijze standaard op de factuur, indien niet ingesteld voor de betreffende factuur
admin_EnableEditDeleteValidInvoice                                              : De mogelijkheid om een geldige factuur zonder betaling te wijzigen of verwijderen in- of uitschakelen
admin_SuggestPaymentByRIBOnAccount                                              : Voorstellen de betaling via automatische incasso te laten plaatsvinden
admin_SuggestPaymentByChequeToAddress                                           : Voorstellen de betaling per cheque te doen
admin_FreeLegalTextOnInvoices                                                   : Vrije tekst op facturen
admin_WatermarkOnDraftInvoices                                                  : Watermerk op conceptfacturen (alle indien leeg)
admin_PropalSetup                                                               : Offertemoduleinstellingen
admin_CreateForm                                                                : Creëer formulieren
admin_NumberOfProductLines                                                      : Aantal productregels
admin_ProposalsNumberingModules                                                 : Offertenummeringmodules
admin_ProposalsPDFModules                                                       : Offertedocumentsjablonen
admin_ClassifiedInvoiced                                                        : Geclassificeerde factuur
admin_HideTreadedPropal                                                         : Verberg de behandelde offertes in de lijst
admin_AddShippingDateAbility                                                    : Voeg mogelijke verzenddatum toe
admin_AddDeliveryAddressAbility                                                 : Voeg mogelijke leverdatum toe
admin_UseOptionLineIfNoQuantity                                                 : Product- / dienstregels met een waarde van 0 gebruiken
admin_FreeLegalTextOnProposal                                                   : Vrije tekst op Offertes
admin_WatermarkOnDraftProposal                                                  : Watermerk op conceptoffertes (alle als leeg)
admin_OrdersSetup                                                               : Opdrachtenbeheerinstellingen
admin_OrdersNumberingModules                                                    : Opdrachtennummeringmodules
admin_OrdersModelModule                                                         : Oprachtendocumentsjablonen
admin_HideTreadedOrders                                                         : Verberg de behandelde of geannuleerde opdracht in de lijst
admin_ValidOrderAfterPropalClosed                                               : Om de opdracht te valideren na sluiting van de offerte, maakt het mogelijk om (TODO franse vertaling erbij pakken)
admin_FreeLegalTextOnOrders                                                     : Vrije tekst op opdrachten
admin_WatermarkOnDraftOrders                                                    : Watermerk op conceptopdrachten (alle indien leeg)
admin_ClickToDialSetup                                                          : 'Click-To-Dial' moduleinstellingen
admin_ClickToDialUrlDesc                                                        : Aangeroepen URL wanneer er geklikt wordt op een telefoonicoontje. In de URL kunt u 'tags' gebruiken<br><b>__PHONETO__</b> zal vervangen worden met het telefoonnummer dat gebeld moet worden<br><b>__PHONEFROM__</b> zal worden vervangen met het telefoonnummer van de bellende persoon (uw telefoonnummer)<br><b>__LOGIN__</b> zal vervangen worden door uw 'Click-To-Dial'-accountgebruikersnaam (Zoals ingesteld op uw gebruikerskaartdetails<br><b>__PASS__</b> zal vervangen worden door uw "Click-To-Dial"-accountwachtwoord (Zoals ingesteld op uw gebruikerskaartdetails).
admin_Bookmark4uSetup                                                           : 'Bookmark4u'moduleinstellingen
admin_InterventionsSetup                                                        : Interventiemodule-instellingen
admin_FreeLegalTextOnInterventions                                              : Vrije tekst op interventiedocumenten
admin_FicheinterNumberingModules                                                : Interventienummeringsmodules
admin_TemplatePDFInterventions                                                  : Interventiekaartdocumentensjablonen
admin_WatermarkOnDraftInterventionCards                                         : Watermerk op Interventiekaartendocumenten (alle als leeg)
admin_ContractsSetup                                                            : Contracten module setup
admin_ContractsNumberingModules                                                 : Contracten nummering modules
admin_MembersSetup                                                              : Ledenmoduleinstellingen
admin_MemberMainOptions                                                         : Hoofdopties
admin_AddSubscriptionIntoAccount                                                : Standaard voorstellen een banktransactie te creëren, in de bankmodule, wanneer er een nieuw betaald abonnement wordt gecreëerd.
admin_AdherentLoginRequired                                                     : Beheren van een login voor elk lid
admin_AdherentMailRequired                                                      : E-mail is vereist om een nieuw lid te creeren
admin_MemberSendInformationByMailByDefault                                      : Vinkvakje om een bevestigingse-mail te sturen naar leden (validatie van nieuwe abonnementen). Staat standaard aan.
admin_LDAPSetup                                                                 : LDAP-instellingen
admin_LDAPGlobalParameters                                                      : Globale instellingen
admin_LDAPUsersSynchro                                                          : Gebruikers
admin_LDAPGroupsSynchro                                                         : Groepen
admin_LDAPContactsSynchro                                                       : Contacten
admin_LDAPMembersSynchro                                                        : Leden
admin_LDAPSynchronization                                                       : LDAP-synchronisatie
admin_LDAPFunctionsNotAvailableOnPHP                                            : LDAP-functies zijn niet beschikbaar in uw PHP-installatie
admin_LDAPToSpeedealing                                                         : LDAP -> Speedealing
admin_SpeedealingToLDAP                                                         : Speedealing -> LDAP
admin_LDAPNamingAttribute                                                       : Waarde in LDAP
admin_LDAPSynchronizeUsers                                                      : Organisatie van gebruikers in LDAP
admin_LDAPSynchronizeGroups                                                     : Organisatie van groepen in LDAP
admin_LDAPSynchronizeContacts                                                   : Organisatie van contactpersonen in LDAP
admin_LDAPSynchronizeMembers                                                    : Organisatie van verenigingsleden in LDAP
admin_LDAPTypeExample                                                           : OpenLDAP, eGroupWare of Active Directory
admin_LDAPPrimaryServer                                                         : Primaire server
admin_LDAPSecondaryServer                                                       : Secundaire server
admin_LDAPServerPort                                                            : Serverpoort
admin_LDAPServerPortExample                                                     : Standaardpoort: 389
admin_LDAPServerProtocolVersion                                                 : Protocolversie
admin_LDAPServerUseTLS                                                          : Gebruik TLS
admin_LDAPServerUseTLSExample                                                   : Uw LDAP-server gebruik TLS
admin_LDAPServerDn                                                              : Server DN
admin_LDAPAdminDn                                                               : Administrator DN
admin_LDAPAdminDnExample                                                        : Complete DN (voorbeeld: cn=adminldap,dc=society,dc=com)
admin_LDAPPassword                                                              : Beheerderswachtwoord
admin_LDAPUserDn                                                                : Gebruikers DN
admin_LDAPUserDnExample                                                         : Complete DN (voorbeeld: ou=users,dc=society,dc=com)
admin_LDAPGroupDn                                                               : Groepen DN
admin_LDAPGroupDnExample                                                        : Complete DN (voorbeeld: ou=groups,dc=society,dc=com)
admin_LDAPServerExample                                                         : Serveradres (voorbeeld: localhost, 192.168.0.2, LDAPS://ldap.example.com/)
admin_LDAPServerDnExample                                                       : Complete DN (voorbeeld: dc=company,dc=com)
admin_LDAPPasswordExample                                                       : Beheerderswachtwoord
admin_LDAPDnSynchroActive                                                       : Gebruikers- en groepensynchronisatie
admin_LDAPDnSynchroActiveExample                                                : LDAP naar Dolibarr of Dolibarr naar LDAP synchronisatie
admin_LDAPDnContactActive                                                       : Contactpersonensynchronisatie
admin_LDAPDnContactActiveYes                                                    : Geactiveerde synchronisatie
admin_LDAPDnContactActiveExample                                                : Geactiveerde / gedeactiveerde synchronisatie
admin_LDAPDnMemberActive                                                        : Ledensynchronisatie
admin_LDAPDnMemberActiveExample                                                 : Geactiveerde / gedeactiveerde synchronisatie
admin_LDAPContactDn                                                             : Dolibarr contactpersonen DN
admin_LDAPContactDnExample                                                      : Complete DN (voorbeeld: ou=contacts,dc=society,dc=com)
admin_LDAPMemberDn                                                              : Dolibarr leden DN
admin_LDAPMemberDnExample                                                       : Complete DN (voorbeeld: ou=members,dc=society,dc=com)
admin_LDAPMemberObjectClassList                                                 : Lijst van objectClass
admin_LDAPMemberObjectClassListExample                                          : Lijst van objectClass tabelregelattributen instellen (voorbeeld: top,inetOrgPerson of top,user voor de actieve map)
admin_LDAPUserObjectClassList                                                   : Lijst van objectClass
admin_LDAPUserObjectClassListExample                                            : Lijst van objectClass tabelregelattributen instellen (voorbeeld: top,inetOrgPerson of top,user voor de actieve map)
admin_LDAPGroupObjectClassList                                                  : Lijst van objectClass
admin_LDAPGroupObjectClassListExample                                           : Lijst van objectClass tabelregelattributen instellen (voorbeeld: top,groupOfUniqueNames)
admin_LDAPContactObjectClassList                                                : Lijst van objectClass
admin_LDAPContactObjectClassListExample                                         : Lijst van objectClass tabelregelattributen instellen (voorbeeld: top,inetOrgPerson of top,user voor actieve map)
admin_LDAPMemberTypeDn                                                          : Dolibarr ledentype DN
admin_LDAPMemberTypeDnExample                                                   : Complete DN (voorbeeld: ou=type_members,dc=society,dc=com)
admin_LDAPTestConnect                                                           : Test LDAP-verbinding
admin_LDAPTestSynchroContact                                                    : Test contactpersonensynchronisatie
admin_LDAPTestSynchroUser                                                       : Test gebruikersynchronisatie
admin_LDAPTestSynchroGroup                                                      : Test groepsynchronisatie
admin_LDAPTestSynchroMember                                                     : Test ledensynchronisatie
admin_LDAPSynchroOK                                                             : Synchronisatietest succesvol
admin_LDAPSynchroKO                                                             : Synchronisatietest mislukt
admin_LDAPSynchroKOMayBePermissions                                             : Synchronisatie test mislukt. Controleer of de verbinding met de server correct is ingesteld en LDAP udpates toestaat.
admin_LDAPTCPConnectOK                                                          : TCP verbinding met de LDAP-server succesvol (Server=%s, Port=%s)
admin_LDAPTCPConnectKO                                                          : TCP verbinding met de LDAP-server mislukt (Server=%s, Port=%s)
admin_LDAPBindOK                                                                : Verbinden en autorisatie met LDAP server geslaagd (Server=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPBindKO                                                                : Verbinden en autoriseren met LDAP server mislukt (Server=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPUnbindSuccessfull                                                     : Verbinding succesvol verbroken
admin_LDAPUnbindFailed                                                          : Verbreken verbinding mislukt
admin_LDAPConnectToDNSuccessfull                                                : Verbinding met DN (%s) geslaagd
admin_LDAPConnectToDNFailed                                                     : Verbinding met DN (%s) mislukt
admin_LDAPSetupForVersion3                                                      : LDAP-server ingesteld voor versie 3
admin_LDAPSetupForVersion2                                                      : LDAP-server ingesteld voor versie 2
admin_LDAPSpeedealingMapping                                                    : Speedealing Mapping
admin_LDAPLdapMapping                                                           : LDAP-mapping (in kaart brengen)
admin_LDAPFieldLoginUnix                                                        : Gebruikersnaam (Unix)
admin_LDAPFieldLoginExample                                                     : Voorbeeld: uid
admin_LDAPFilterConnection                                                      : Zoekfilter
admin_LDAPFilterConnectionExample                                               : Voorbeeld: &(objectClass=inetOrgPerson)
admin_LDAPFieldLoginSamba                                                       : Gebruikersnaam (samba, activedirectory)
admin_LDAPFieldLoginSambaExample                                                : Voorbeeld: sAMAccountName
admin_LDAPFieldFullname                                                         : Voornaam Achternaam
admin_LDAPFieldFullnameExample                                                  : Voorbeeld: cn
admin_LDAPFieldPassword                                                         : Wachtwoord
admin_LDAPFieldPasswordNotCrypted                                               : Wachtwoord niet versleuteld
admin_LDAPFieldPasswordCrypted                                                  : Wachtwoord versleuteld
admin_LDAPFieldPasswordExample                                                  : Voorbeeld: userPassword
admin_LDAPFieldCommonName                                                       : Gewone naam
admin_LDAPFieldCommonNameExample                                                : Voorbeeld: cn
admin_LDAPFieldName                                                             : Naam
admin_LDAPFieldNameExample                                                      : Voorbeeld: sn
admin_LDAPFieldFirstName                                                        : Voornaam
admin_LDAPFieldFirstNameExample                                                 : Voorbeeld: givenname
admin_LDAPFieldMail                                                             : E-mailadres
admin_LDAPFieldMailExample                                                      : Voorbeeld: mail
admin_LDAPFieldPhone                                                            : Zakelijk telefoonnummer
admin_LDAPFieldPhoneExample                                                     : Voorbeeld: telefoonnummer
admin_LDAPFieldHomePhone                                                        : Privételefoonnummer
admin_LDAPFieldHomePhoneExample                                                 : Voorbeeld: Privénummer
admin_LDAPFieldMobile                                                           : Mobieltelefoonnummer
admin_LDAPFieldMobileExample                                                    : Voorbeeld: mobiele
admin_LDAPFieldFax                                                              : Faxnummer
admin_LDAPFieldFaxExample                                                       : Voorbeeld: facsimiletelephonenumber
admin_LDAPFieldAddress                                                          : Straat
admin_LDAPFieldAddressExample                                                   : Voorbeeld: straat
admin_LDAPFieldZip                                                              : Zip
admin_LDAPFieldZipExample                                                       : Voorbeeld: postalcode
admin_LDAPFieldTown                                                             : Plaats
admin_LDAPFieldTownExample                                                      : Voorbeeld: l
admin_LDAPFieldCountry                                                          : Land
admin_LDAPFieldCountryExample                                                   : Voorbeeld: c
admin_LDAPFieldDescription                                                      : Omschrijving
admin_LDAPFieldDescriptionExample                                               : Voorbeeld: omschrijving
admin_LDAPFieldGroupMembers                                                     : Groepsleden
admin_LDAPFieldGroupMembersExample                                              : Voorbeeld : uniqueMember
admin_LDAPFieldBirthdate                                                        : Geboortedatum
admin_LDAPFieldBirthdateExample                                                 : Voorbeeld:
admin_LDAPFieldCompany                                                          : Bedrijf
admin_LDAPFieldCompanyExample                                                   : Voorbeeld: o
admin_LDAPFieldSid                                                              : SID
admin_LDAPFieldSidExample                                                       : Voorbeeld: objectsid
admin_LDAPFieldEndLastSubscription                                              : Datum van abonnementseinde
admin_LDAPParametersAreStillHardCoded                                           : LDAP instellngen staat nog ingesteld ('hardcoded') in de PHP klasse contact
admin_LDAPSetupNotComplete                                                      : LDAP instellingen niet compleet (ga naar de andere tabbladen)
admin_LDAPNoUserOrPasswordProvidedAccessIsReadOnly                              : Geen beheerder of wachtwoord opgegeven. LDAP toegang zal anoniem zijn en in alleen-lezen modus.
admin_LDAPDescContact                                                           : Deze pagina maakt het u mogelijk LDAP-waarden in de LDAP structuur te koppelen aan elk gegeven in de Dolibarr contactpersonen
admin_LDAPDescUsers                                                             : Deze pagina maakt het u mogelijk LDAP-waarden in de LDAP structuur te koppelen aan elk gegeven in de Dolibarr gebruikers
admin_LDAPDescGroups                                                            : Deze pagina maakt het u mogelijk LDAP-waarden in de LDAP structuur te koppelen aan elk gegeven in de Dolibarr groepen
admin_LDAPDescMembers                                                           : Deze pagina maakt het u mogelijk LDAP-waarden in de LDAP structuur te koppelen aan elk gegeven in de Dolibarr ledenmodule
admin_LDAPDescValues                                                            : Voorbeeldwaarden zijn ingesteld voor <b>OpenLDAP</b> geladen met de volgende schema's: TODO {VAR INSTELLEN?)<b>core.schema, cosine.schema, inetorgperson.schema</b>). Als udie waarden gebruikt en OpenLDAP, wijzigen dan uw LDAP 'config'-bestand <b>slapd.conf</b> om alle die schema's te laden.
admin_ForANonAnonymousAccess                                                    : Voor een geautoriseerde verbinding (bijvoorbeeld om over schrijfrechten te beschikken)
admin_ProductSetup                                                              : Productenmoduleinstellingen
admin_ServiceSetup                                                              : Services module setup
admin_ProductServiceSetup                                                       : Producten en Diensten modules setup
admin_NumberOfProductShowInSelect                                               : Maximaal aantal producten in 'combo-lijsten' (0 = onbeperkt)
admin_ConfirmDeleteProductLineAbility                                           : Om bevestiging vragen bij het verwijderen van productregels in formulieren
admin_ModifyProductDescAbility                                                  : Personalisatie van productomschrijvingen in formulieren
admin_ViewProductDescInFormAbility                                              : Visualisatie van de productomschrijvingen in de formulieren (anders getoond als popup-tooltip)
admin_ViewProductDescInThirdpartyLanguageAbility                                : Visualisatie van producten die beschrijvingen in de thirdparty taal
admin_UseSearchToSelectProduct                                                  : Gebruik een zoekformulier om een product te kiezen (in plaats van een 'list box').<br>Wanneer u een groot aantal producten heeft (meer dan 100.000), dan kunt u de snelheid verhogen door de constante PRODUCT_DONOTSEARCH_ANYWHERE in te stellen op 1 in het menu Home->Instellingen->Overige instellingen. Het zoeken wordt dan beperkt tot het begin van de zin.
admin_UseEcoTaxeAbility                                                         : Ondersteuning voor Eco-Taxe (WEEE)
admin_SetDefaultBarcodeTypeProducts                                             : Standaard streepjescodetype voor produkten
admin_SetDefaultBarcodeTypeThirdParties                                         : Standaard streepjescodetype voor derde partijen
admin_ProductCodeChecker                                                        : Module for product code generation and checking (product or service)
admin_ProductOtherConf                                                          : Product / Service configuration
admin_SyslogSetup                                                               : Syslog-moduleinstellingen
admin_SyslogOutput                                                              : Log uitvoer
admin_SyslogSyslog                                                              : Syslog
admin_SyslogFacility                                                            : Faciliteit
admin_SyslogLevel                                                               : Level
admin_SyslogSimpleFile                                                          : Bestand
admin_SyslogFilename                                                            : Bestandsnaam en -pad
admin_YouCanUseDOL_DATA_ROOT                                                    : U kunt DOL_DATA_ROOT/dolibarr.log gebruiken voor een logbestand in de Dolibarr "documenten"-map. U kunt ook een ander pad gebruiken om dit bestand op te slaan.
admin_ErrorUnknownSyslogConstant                                                : Constante %s is geen bekende 'syslog' constante
admin_OnlyWindowsLOG_USER                                                       : Windows only supports LOG_USER
admin_DonationsSetup                                                            : Donatiemoduleinstellingen
admin_DonationsReceiptModel                                                     : Sjabloon van donatie-ontvangst
admin_BarcodeSetup                                                              : Streepjescodeinstellingen
admin_PaperFormatModule                                                         : Afdrukformaatmodule
admin_BarcodeEncodeModule                                                       : Streepjescodesencoderingstype
admin_UseBarcodeInProductModule                                                 : Gebruik streepjescodes voor producten
admin_CodeBarGenerator                                                          : Streepjescodegenerator
admin_ChooseABarCode                                                            : Geen generator ingesteld
admin_FormatNotSupportedByGenerator                                             : Formaat niet ondersteund door deze generator
admin_BarcodeDescEAN8                                                           : Streepjescodetype EAN8
admin_BarcodeDescEAN13                                                          : Streepjescodetype EAN13
admin_BarcodeDescUPC                                                            : Streepjescodetype UPC
admin_BarcodeDescISBN                                                           : Streepjescodetype ISBN
admin_BarcodeDescC39                                                            : Streepjescodetype C39
admin_BarcodeDescC128                                                           : Streepjescodetype C128
admin_WithdrawalsSetup                                                          : Terugnamemoduleinstellingen
admin_ExternalRSSSetup                                                          : Externe RSS importeerinstellingen
admin_NewRSS                                                                    : Nieuwe RSS Feed
admin_RSSUrl                                                                    : RSS URL
admin_RSSUrlExample                                                             : An interesting RSS feed
admin_MailingSetup                                                              : EMailingmoduleinstellingen
admin_MailingEMailFrom                                                          : E-mailafzender (Van) voor e-mails die verstuurd worden door de EMailingmodule
admin_MailingEMailError                                                         : Retoure-mailadres (Errors-to) voor e-mails met fouten
admin_NotificationSetup                                                         : Moduleinstellingen voor kennisgeving door e-mail
admin_NotificationEMailFrom                                                     : E-mailafzender (van) voor e-mails die verstuurd worden voor kennisgevingen
admin_ListOfAvailableNotifications                                              : Lijst van beschikbare meldingen (Deze lijst is afhankelijk van geactiveerde modules)
admin_SendingsSetup                                                             : Verzendingsmoduleinstellingen
admin_SendingsReceiptModel                                                      : Verzendontvangstsjabloon
admin_SendingsNumberingModules                                                  : Verzendingen nummering modules
admin_SendingsAbility                                                           : Ondersteun verzendingsbrieven voor afnemersleveringen
admin_NoNeedForDeliveryReceipts                                                 : In de meeste gevallen worden de verzendingsbrieven gebruikt als brieven voor de afnemersleveringen (lijst van te verzenden producten ) evenals voor ontvangstbewijzen ondertekend door de afnemer. Derhalve zijn ontvangstbevestigingen een dubbele functionaliteit en worden deze zelden geactiveerd.
admin_FreeLegalTextOnShippings                                                  : Vrije tekst op verzendingen
admin_DeliveryOrderNumberingModules                                             : ontvangstbevestigingennummeringsmodule
admin_DeliveryOrderModel                                                        : ontvangstbevestigingensjablonen
admin_DeliveriesOrderAbility                                                    : Ondersteun productontvangstbevestigingen
admin_FreeLegalTextOnDeliveryReceipts                                           : Vrije tekst op ontvangstbevestigingen
admin_AdvancedEditor                                                            : Geavanceerde editor
admin_ActivateFCKeditor                                                         : Activeer FCKeditor voor:
admin_FCKeditorForCompany                                                       : WYSIWIG creatie / bewerking van bedrijfsomschrijving en notities
admin_FCKeditorForProduct                                                       : WYSIWIG creatie / bewerking van product- / dienstomschrijving en notities
admin_FCKeditorForProductDetails                                                : WYSIWIG creatie / bewerking van produktdetailregels voor alle entiteiten (Offertes, opdrachten, facturen, etc)<br><font class="warning">Waarschuwing: Gebruik van deze optie, voor dit doeleinde, wordt sterk afgeraden, omdat het problemen kan geven met speciale karakters en de paginaopmaak wanneer er PDF bestanden worden gegenereerd van deze gegevens.</font>
admin_FCKeditorForMailing                                                       : WYSIWIG creatie / bewerking van mailings
admin_StockSetup                                                                : Vooraadmoduleinstellingen
admin_UserWarehouse                                                             : Gebruik persoonlijke voorraden van gebruiker
admin_MenuDeleted                                                               : Menu verwijderd
admin_TreeMenu                                                                  : Menustructuur
admin_Menus                                                                     : Menu's
admin_TreeMenuPersonalized                                                      : Persoonlijke menu's
admin_NewMenu                                                                   : Nieuw menu
admin_MenuConf                                                                  : Menuinstellingen
admin_Menu                                                                      : Selectie van menu
admin_MenuHandler                                                               : Menuverwerker
admin_MenuModule                                                                : Bronmodule
admin_HideUnauthorizedMenu                                                      : Verberg ongeautoriseerde menu's (grijs)
admin_DetailId                                                                  : Menu ID
admin_DetailMenuHandler                                                         : Menuverwerker waar het nieuwe menu getoond moet worden
admin_DetailMenuModule                                                          : Modulenaam als menu-item van een module afkomstig is
admin_DetailType                                                                : Menutype (boven of links (Top of Left)TODO)
admin_DetailTitre                                                               : Menulabel of labelcode voor de vertaling
admin_DetailMainmenu                                                            : Groep waarvan het menu deel uitmaakt (verouderd)
admin_DetailUrl                                                                 : URL waar het menu naar linkt (Absolute URL-link of externe link met http://)
admin_DetailLeftmenu                                                            : Vertoonvoorwaarde of niet (verouderd)
admin_DetailEnabled                                                             : Voorwaarde voor het wel of niet tonen van het menu-item
admin_DetailRight                                                               : Voorwaarde om onbevoegde grijze menu's weer te geven
admin_DetailLangs                                                               : .lang bestandsnaam voor labelcodevertaling
admin_DetailUser                                                                : Intern / Extern / Alle
admin_Target                                                                    : Target
admin_DetailTarget                                                              : Doel van links (_blank opent een nieuw venster)
admin_DetailLevel                                                               : Niveau (-1: menu bovenaan, 0: header menu, >0 menu en submenu)
admin_ModifMenu                                                                 : Menu-item wijzigen
admin_DeleteMenu                                                                : Menu-item verwijderen
admin_ConfirmDeleteMenu                                                         : Weet u zeker dat u het menu-item <b>%s</b> wilt verwijderen?
admin_DeleteLine                                                                : Verwijderen regel
admin_ConfirmDeleteLine                                                         : Weet u zeker dat u deze regel wilt verwijderen?
admin_TaxSetup                                                                  : Moduleinstellingen voor belastingen, sociale bijdragen en dividenden
admin_OptionVatMode                                                             : BTW verplicht
admin_OptionVATDefault                                                          : Standaard
admin_OptionVATDebitOption                                                      : Optie BTW bij Debet
admin_OptionVatDefaultDesc                                                      : BTW is verplicht:<br>- op levering / betalingen van goederen (wij gebruiken de factuurdatum)<br>- op betalingen van diensten
admin_OptionVatDebitOptionDesc                                                  : BTW is verplicht:<br>- op levering / betalingen van goederen<br>- op factuur (debet) voor diensten
admin_SummaryOfVatExigibilityUsedByDefault                                      : Tijd van de BTW opeisbaarheid standaard volgens gekozen methode:
admin_OnDelivery                                                                : Bij levering
admin_OnPayment                                                                 : Bij betaling
admin_OnInvoice                                                                 : Op factuur
admin_SupposedToBePaymentDate                                                   : Betalingsdatum gebruiken
admin_SupposedToBeInvoiceDate                                                   : Factuurdatum gebruiken
admin_Buy                                                                       : Kopen
admin_Sell                                                                      : Verkopen
admin_InvoiceDateUsed                                                           : Factuurdatum gebruiken
admin_YourCompanyDoesNotUseVAT                                                  : Uw bedrijf is ingesteld als zijnde vrijgesteld van BTW (Home->Instellingen->Bedrijf / stichting), er zijn dus geen BTW opties in te stellen.
admin_AccountancyCode                                                           : Accountancy Code
admin_AccountancyCodeSell                                                       : Sale account. code
admin_AccountancyCodeBuy                                                        : Purchase account. code
admin_AgendaSetup                                                               : Acties- en agendamoduleinstellingen
admin_PasswordTogetVCalExport                                                   : autorisatiecode van de exportlink
admin_PastDelayVCalExport                                                       : Exporteer geen gebeurtenissen ouder dan
admin_ClickToDialDesc                                                           : Deze module maakt het mogelijk om een icoontje te tonen achter het telefoonnummer van Dolibarr contactpersonen. Een klik op dit icoontje, zal een server bellen met een specifieke URL, die u hieronder instelt. Dit kan gebruikt worden om een 'call center'-systeem te bellen vanuit Dolibarr dat vervolgens het telefoonnummer kan bellen via bijvoorbeeld een SIP systeem.
admin_CashDesk                                                                  : Verkooppunten
admin_CashDeskSetup                                                             : Verkooppuntenmoduleinstellingen
admin_CashDeskThirdPartyForSell                                                 : Algemene derde partij te gebruiken bij verkopen
admin_CashDeskBankAccountForSell                                                : Te gebruiken rekening voor ontvangst van contacte betalingen
admin_CashDeskBankAccountForCheque                                              : Te gebruiken rekening voor ontvangst van betalingen per cheque
admin_CashDeskBankAccountForCB                                                  : Te gebruiken rekening voor ontvangst van betalingen per CreditCard
admin_CashDeskIdWareHouse                                                       : Te gebruiken magazijn voor verkopen
admin_BookmarkSetup                                                             : Weblinkmoduleinstellingen
admin_BookmarkDesc                                                              : Deze module maakt het u mogelijk 'weblinks' te beheren. U kunt ook verwijzingen naar elke Dolibarr pagina of externe website in uw linker menu zetten.
admin_NbOfBoomarkToShow                                                         : Maximaal aantal 'weblinks' die in het linker menu getoond worden
admin_WebServicesSetup                                                          : Webdienstenmoduleinstellingen
admin_WebServicesDesc                                                           : Door het inschakelen van deze module, word Dolibarr een webdienstenserver voor het verrichten van diverse webdiensten.
admin_WSDLCanBeDownloadedHere                                                   : 'WSDL descriptor'-bestanden van de aangeboden diensten kunnen hier gedownload worden
admin_EndPointIs                                                                : 'SOAP cliënten' moeten hun verzoeken versturen naar het 'Dolibarr endpoint' beschikbaar op URL
admin_BankSetupModule                                                           : Bankmoduleinstellingen
admin_FreeLegalTextOnChequeReceipts                                             : Eigen tekst op cheque-ontvangsten
admin_BankOrderShow                                                             : Laat de volgorde van bankrekeningen zien voor landen die gebruik maken van "detailed bank number"
admin_BankOrderGlobal                                                           : Algemeen
admin_BankOrderGlobalDesc                                                       : Algemene vertoonvolgorde
admin_BankOrderES                                                               : Spaans
admin_BankOrderESDesc                                                           : Spaanse vertoonvolgorde
admin_MultiCompanySetup                                                         : Multi-Bedrijfmoduleinstellingen
admin_SuppliersSetup                                                            : Leveranciersmoduleinstellingen
admin_SuppliersCommandModel                                                     : Compleet levaranciersopdrachtsjabloon (logo)
admin_SuppliersInvoiceModel                                                     : Compleet leveranciersfacturensjabloon (logo)
admin_GeoIPMaxmindSetup                                                         : "GeoIP Maxmind"-moduleinstellingen
admin_PathToGeoIPMaxmindCountryDataFile                                         : Pad naar het "GeoIP Maxmind"-landbestand die de vertalingen bevat.<br>Voorbeeld: /usr/local/share/GeoIP/GeoIP.dat
admin_NoteOnPathLocation                                                        : Let op dat uw "GeoIP Maxmind"-landbestand zich bevind in een map die door uw PHP-installatie kan worden gelezen (Controleer uwPHP open_basedir instelling en de bestandsrechten).
admin_YouCanDownloadFreeDatFileTo                                               : U kunt een <b>gratis demo versie</b> downloaden van een "Maxmind GeoIP"-landbestand op het adres %s.
admin_YouCanDownloadAdvancedDatFileTo                                           : U kunt ook een <b>completere versie, met updates</b> downloaden van het "Maxmind GeoIP"-landbestand op het adres %s.
admin_TestGeoIPResult                                                           : Test van een conversie IP -> land
admin_ProjectsNumberingModules                                                  : Projectennummeringsmodule
admin_ProjectsSetup                                                             : Projectenmoduleinstellingen
admin_ProjectsModelModule                                                       : Projectenrapportagedocumentsjabloon
admin_Chartofaccounts                                                           : Plan comptable
admin_Definechartofaccounts                                                     : Définir un plan comptable
admin_Selectchartofaccounts                                                     : Sélection d'un plan comptable
admin_DoNotSuggestChart                                                         : Ne pas suggérer de plan comptable
dict_CountryFR                                                                  : Frankrijk
dict_CountryBE                                                                  : België
dict_CountryIT                                                                  : Italië
dict_CountryES                                                                  : Spanje
dict_CountryDE                                                                  : Duitsland
dict_CountryCH                                                                  : Zwitserland
dict_CountryGB                                                                  : Groot-Brittannië
dict_CountryIE                                                                  : Ierland
dict_CountryCN                                                                  : China
dict_CountryTN                                                                  : Tunesië
dict_CountryUS                                                                  : Verenigde Staten
dict_CountryMA                                                                  : Marokko
dict_CountryDZ                                                                  : Algerije
dict_CountryCA                                                                  : Canada
dict_CountryTG                                                                  : Togo
dict_CountryGA                                                                  : Gabon
dict_CountryNL                                                                  : Nederland
dict_CountryHU                                                                  : Hongarije
dict_CountryRU                                                                  : Rusland
dict_CountrySE                                                                  : Zweden
dict_CountryCI                                                                  : Ivoorkust
dict_CountrySN                                                                  : Senegal
dict_CountryAR                                                                  : Argentinië
dict_CountryCM                                                                  : Kameroen
dict_CountryPT                                                                  : Portugal
dict_CountrySA                                                                  : Saudi-Arabië
dict_CountryMC                                                                  : Monaco
dict_CountryAU                                                                  : Australië
dict_CountrySG                                                                  : Singapore
dict_CountryAF                                                                  : Afghanistan
dict_CountryAX                                                                  : Åland Eilanden
dict_CountryAL                                                                  : Albanië
dict_CountryAS                                                                  : Amerikaans Samoa
dict_CountryAD                                                                  : Andorra
dict_CountryAO                                                                  : Angola
dict_CountryAI                                                                  : Anguilla
dict_CountryAQ                                                                  : Antarctica
dict_CountryAG                                                                  : Antigua en Barbuda
dict_CountryAM                                                                  : Armenië
dict_CountryAW                                                                  : Aruba
dict_CountryAT                                                                  : Oostenrijk
dict_CountryAZ                                                                  : Azerbeidzjan
dict_CountryBS                                                                  : Bahama's
dict_CountryBH                                                                  : Bahrein
dict_CountryBD                                                                  : Bangladesh
dict_CountryBB                                                                  : Barbados
dict_CountryBY                                                                  : Wit-Rusland
dict_CountryBZ                                                                  : Belize
dict_CountryBJ                                                                  : Benin
dict_CountryBM                                                                  : Bermuda
dict_CountryBT                                                                  : Bhutan
dict_CountryBO                                                                  : Bolivia
dict_CountryBA                                                                  : Bosnië en Herzegovina
dict_CountryBW                                                                  : Botswana
dict_CountryBV                                                                  : Bouvet Island
dict_CountryBR                                                                  : Brazilië
dict_CountryIO                                                                  : British Indian Ocean Territory
dict_CountryBN                                                                  : Brunei Darussalam
dict_CountryBG                                                                  : Bulgarije
dict_CountryBF                                                                  : Burkina Faso
dict_CountryBI                                                                  : Burundi
dict_CountryKH                                                                  : Cambodja
dict_CountryCV                                                                  : Kaapverdië
dict_CountryKY                                                                  : Caymaneilanden
dict_CountryCF                                                                  : Centraal-Afrikaanse Republiek
dict_CountryTD                                                                  : Tsjaad
dict_CountryCL                                                                  : Chili
dict_CountryCX                                                                  : Christmas Eiland
dict_CountryCC                                                                  : Cocos (Keeling) Eilanden
dict_CountryCO                                                                  : Colombia
dict_CountryKM                                                                  : Comoren
dict_CountryCG                                                                  : Congo
dict_CountryCD                                                                  : Congo, de Democratische Republiek van
dict_CountryCK                                                                  : Cook Eilanden
dict_CountryCR                                                                  : Costa Rica
dict_CountryHR                                                                  : Kroatië
dict_CountryCU                                                                  : Cuba
dict_CountryCY                                                                  : Cyprus
dict_CountryCZ                                                                  : Tsjechische Republiek
dict_CountryDK                                                                  : Denemarken
dict_CountryDJ                                                                  : Djibouti
dict_CountryDM                                                                  : Dominica
dict_CountryDO                                                                  : Dominicaanse Republiek
dict_CountryEC                                                                  : Ecuador
dict_CountryEG                                                                  : Egypte
dict_CountrySV                                                                  : El Salvador
dict_CountryGQ                                                                  : Equatoriaal-Guinea
dict_CountryER                                                                  : Eritrea
dict_CountryEE                                                                  : Estland
dict_CountryET                                                                  : Ethiopië
dict_CountryFK                                                                  : Falkland Eilanden
dict_CountryFO                                                                  : Faroer Eilanden
dict_CountryFJ                                                                  : Fiji-eilanden
dict_CountryFI                                                                  : Finland
dict_CountryGF                                                                  : Frans Guyana
dict_CountryPF                                                                  : Frans-Polynesië
dict_CountryTF                                                                  : Franse zuidelijke gebieden
dict_CountryGM                                                                  : Gambia
dict_CountryGE                                                                  : Georgië
dict_CountryGH                                                                  : Ghana
dict_CountryGI                                                                  : Gibraltar
dict_CountryGR                                                                  : Griekenland
dict_CountryGL                                                                  : Groenland
dict_CountryGD                                                                  : Grenada
dict_CountryGP                                                                  : Guadeloupe
dict_CountryGU                                                                  : Guam
dict_CountryGT                                                                  : Guatemala
dict_CountryGN                                                                  : Guinee
dict_CountryGW                                                                  : Guinee-Bissau
dict_CountryGY                                                                  : Guyana
dict_CountryHT                                                                  : Hati
dict_CountryHM                                                                  : Heard Island en McDonald
dict_CountryVA                                                                  : Heilige Stoel (Vaticaanstad)
dict_CountryHN                                                                  : Honduras
dict_CountryHK                                                                  : Hong Kong
dict_CountryIS                                                                  : Icelande
dict_CountryIN                                                                  : India
dict_CountryID                                                                  : Indonesië
dict_CountryIR                                                                  : Iran
dict_CountryIQ                                                                  : Irak
dict_CountryIL                                                                  : Israël
dict_CountryJM                                                                  : Jamaica
dict_CountryJP                                                                  : Japan
dict_CountryJO                                                                  : Jordanië
dict_CountryKZ                                                                  : Kazachstan
dict_CountryKE                                                                  : Kenia
dict_CountryKI                                                                  : Kiribati
dict_CountryKP                                                                  : Noord-Korea
dict_CountryKR                                                                  : Zuid-Korea
dict_CountryKW                                                                  : Koeweit
dict_CountryKG                                                                  : Kyrghyztan
dict_CountryLA                                                                  : Laotiaans
dict_CountryLV                                                                  : Letland
dict_CountryLB                                                                  : Libanon
dict_CountryLS                                                                  : Lesotho
dict_CountryLR                                                                  : Liberia
dict_CountryLY                                                                  : Libië
dict_CountryLI                                                                  : Liechtenstein
dict_CountryLT                                                                  : Lituania
dict_CountryLU                                                                  : Luxemburg
dict_CountryMO                                                                  : Macao
dict_CountryMK                                                                  : Macedonië, de Voormalige Joegoslavische Republiek van
dict_CountryMG                                                                  : Madagaskar
dict_CountryMW                                                                  : Malawi
dict_CountryMY                                                                  : Maleisië
dict_CountryMV                                                                  : Maldiven
dict_CountryML                                                                  : Mali
dict_CountryMT                                                                  : Malta
dict_CountryMH                                                                  : Marshall Eilanden
dict_CountryMQ                                                                  : Martinique
dict_CountryMR                                                                  : Mauritanië
dict_CountryMU                                                                  : Mauritius
dict_CountryYT                                                                  : Mayotte
dict_CountryMX                                                                  : Mexico
dict_CountryFM                                                                  : Micronesië
dict_CountryMD                                                                  : Moldavië
dict_CountryMN                                                                  : Mongolië
dict_CountryMS                                                                  : Montserrat
dict_CountryMZ                                                                  : Mozambique
dict_CountryMM                                                                  : Birmania (Myanmar)
dict_CountryNA                                                                  : Namibië
dict_CountryNR                                                                  : Nauru
dict_CountryNP                                                                  : Nepal
dict_CountryAN                                                                  : Nederlandse Antillen
dict_CountryNC                                                                  : Nieuw-Caledonië
dict_CountryNZ                                                                  : Nieuw-Zeeland
dict_CountryNI                                                                  : Nicaragua
dict_CountryNE                                                                  : Niger
dict_CountryNG                                                                  : Nigeria
dict_CountryNU                                                                  : Niue
dict_CountryNF                                                                  : Norfolk Island
dict_CountryMP                                                                  : Northern Mariana Islands
dict_CountryNO                                                                  : Noorwegen
dict_CountryOM                                                                  : Oman
dict_CountryPK                                                                  : Pakistan
dict_CountryPW                                                                  : Palau
dict_CountryPS                                                                  : Palestijnse Gebieden, Bezette
dict_CountryPA                                                                  : Panama
dict_CountryPG                                                                  : Papoea Nieuw-Guinea
dict_CountryPY                                                                  : Paraguay
dict_CountryPE                                                                  : Peru
dict_CountryPH                                                                  : Filipijnen
dict_CountryPN                                                                  : Pitcairneilanden
dict_CountryPL                                                                  : Polen
dict_CountryPR                                                                  : Puerto Rico
dict_CountryQA                                                                  : Qatar
dict_CountryRE                                                                  : Reunion
dict_CountryRO                                                                  : Roemenië
dict_CountryRW                                                                  : Rwanda
dict_CountrySH                                                                  : Sint-Helena
dict_CountryKN                                                                  : Saint Kitts en Nevis
dict_CountryLC                                                                  : Saint Lucia
dict_CountryPM                                                                  : Saint-Pierre en Miquelon
dict_CountryVC                                                                  : Saint Vincent en de Grenadines
dict_CountryWS                                                                  : Samoa
dict_CountrySM                                                                  : San Marino
dict_CountryST                                                                  : Sao Tome en Principe
dict_CountryRS                                                                  : Servië
dict_CountrySC                                                                  : Seychellen
dict_CountrySL                                                                  : Sierra Leone
dict_CountrySK                                                                  : Slowakije
dict_CountrySI                                                                  : Slovenië
dict_CountrySB                                                                  : Salomonseilanden
dict_CountrySO                                                                  : Somalië
dict_CountryZA                                                                  : Zuid-Afrika
dict_CountryGS                                                                  : Zuid-Georgië en de Zuidelijke Sandwich-eilanden
dict_CountryLK                                                                  : Sri Lanka
dict_CountrySD                                                                  : Soedan
dict_CountrySR                                                                  : Suriname
dict_CountrySJ                                                                  : Spitsbergen en Jan Mayen
dict_CountrySZ                                                                  : Swaziland
dict_CountrySY                                                                  : Syrische
dict_CountryTW                                                                  : Taiwan
dict_CountryTJ                                                                  : Tadzjikistan
dict_CountryTZ                                                                  : Tanzania
dict_CountryTH                                                                  : Thailand
dict_CountryTL                                                                  : Oost-Timor
dict_CountryTK                                                                  : Tokelau
dict_CountryTO                                                                  : Tonga
dict_CountryTT                                                                  : Trinidad en Tobago
dict_CountryTR                                                                  : Turkije
dict_CountryTM                                                                  : Turkmenistan
dict_CountryTC                                                                  : Turken en Cailos Eilanden
dict_CountryTV                                                                  : Tuvalu
dict_CountryUG                                                                  : Oeganda
dict_CountryUA                                                                  : Oekraïne
dict_CountryAE                                                                  : Verenigde Arabische Emiraten
dict_CountryUM                                                                  : Amerikaanse ondergeschikte afgelegen eilanden
dict_CountryUY                                                                  : Uruguay
dict_CountryUZ                                                                  : Oezbekistan
dict_CountryVU                                                                  : Vanuatu
dict_CountryVE                                                                  : Venezuela
dict_CountryVN                                                                  : VietNam
dict_CountryVG                                                                  : Maagdeneilanden, Britse
dict_CountryVI                                                                  : Maagdeneilanden, Amerikaanse
dict_CountryWF                                                                  : Wallis en Futuna
dict_CountryEH                                                                  : Westelijke Sahara
dict_CountryYE                                                                  : Jemen
dict_CountryZM                                                                  : Zambia
dict_CountryZW                                                                  : Zimbabwe
dict_CountryGG                                                                  : Guernsey
dict_CountryIM                                                                  : Isle of Man
dict_CountryJE                                                                  : Jersey
dict_CountryME                                                                  : Montenegro
dict_CountryBL                                                                  : Saint Barthelemy
dict_CountryMF                                                                  : Saint Martin
dict_CivilityMME                                                                : Mej.
dict_CivilityMR                                                                 : Dhr.
dict_CivilityMLE                                                                : Mevr.
dict_CivilityMTRE                                                               : Meester
dict_CivilityDR                                                                 : Doctor
dict_Currencyeuros                                                              : Euro
dict_CurrencyAUD                                                                : Australische Dollars
dict_CurrencySingAUD                                                            : Australische Dollar
dict_CurrencyCAD                                                                : Canadese Dollars
dict_CurrencySingCAD                                                            : Canadese Dollar
dict_CurrencyCHF                                                                : Zwitserse franken
dict_CurrencySingCHF                                                            : Zwitserse frank
dict_CurrencyEUR                                                                : Euros
dict_CurrencySingEUR                                                            : Euro
dict_CurrencyFRF                                                                : Franse franken
dict_CurrencySingFRF                                                            : Franse frank
dict_CurrencyGBP                                                                : Britse ponden
dict_CurrencySingGBP                                                            : Britse pond
dict_CurrencyINR                                                                : Indiase roepies
dict_CurrencySingINR                                                            : Indiase roepie
dict_CurrencyMAD                                                                : Dirham
dict_CurrencySingMAD                                                            : Dirham
dict_CurrencyMGA                                                                : Ariary
dict_CurrencySingMGA                                                            : Ariary
dict_CurrencyMUR                                                                : Mauritius rupees
dict_CurrencySingMUR                                                            : Mauritius rupee
dict_CurrencyNOK                                                                : Noorse kronen
dict_CurrencySingNOK                                                            : Noorse kroon
dict_CurrencyTND                                                                : Tunisian dinars
dict_CurrencySingTND                                                            : Tunisian dinar
dict_CurrencyUSD                                                                : US Dollars
dict_CurrencySingUSD                                                            : US dollar
dict_CurrencyUAH                                                                : Hryvnia
dict_CurrencySingUAH                                                            : Hryvnia
dict_CurrencyXAF                                                                : Francs CFA BEAC
dict_CurrencySingXAF                                                            : Franc CFA BEAC
dict_CurrencyXOF                                                                : Francs CFA BCEAO
dict_CurrencySingXOF                                                            : Franc CFA BCEAO
dict_CurrencyXPF                                                                : Francs CFP
dict_CurrencySingXPF                                                            : Franc CFP
dict_CurrencyCentSingEUR                                                        : cent
dict_CurrencyThousandthSingTND                                                  : thousandth
dict_CurrencySUR                                                                : Roubles
dict_CurrencySingSUR                                                            : Rouble
dict_CurrencyTRL                                                                : Livres turques
dict_CurrencySingTRL                                                            : Livre turque
dict_DemandReasonTypeSRC_INTE                                                   : Internet
dict_DemandReasonTypeSRC_CAMP_MAIL                                              : Mailing campagne
dict_DemandReasonTypeSRC_CAMP_EMAIL                                             : E-mailen campagne
dict_DemandReasonTypeSRC_CAMP_PHO                                               : Telefoon campagne
dict_DemandReasonTypeSRC_CAMP_FAX                                               : Fax-campagne
dict_DemandReasonTypeSRC_COMM                                                   : Commercieel contact
dict_DemandReasonTypeSRC_SHOP                                                   : Winkel contact
dict_DemandReasonTypeSRC_WOM                                                    : Word of mouth
dict_DemandReasonTypeSRC_PARTNER                                                : Partner
dict_DemandReasonTypeSRC_EMPLOYEE                                               : Employee
dict_DemandReasonTypeSRC_SPONSORING                                             : Sponsorship
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
errors_MenuManager                                                              : Menubeheer
errors_Error                                                                    : Fout
errors_Errors                                                                   : Fouten
errors_ErrorBadEMail                                                            : Ongeldige e-mail %s
errors_ErrorBadUrl                                                              : Ongeldige Url %s
errors_ErrorRecordNotFound                                                      : Tabelregel niet gevonden.
errors_ErrorFailToCopyFile                                                      : Kan bestand <b>'%s'</b> in <b>'%s'</b> te kopiëren.
errors_ErrorFailToRenameFile                                                    : Kon het bestand '<b>%s</b>' niet hernoemen naar '<b>%s</b>'.
errors_ErrorFailToDeleteFile                                                    : Kon het bestand '<b>%s</b>' niet verwijderen.
errors_ErrorFailToCreateFile                                                    : Creëren van het bestand '<b>%s</b>' mislukt.
errors_ErrorFailToRenameDir                                                     : De map '<b>%s</b>' kon niet hernoemd worden naar '<b>%s</b>'.
errors_ErrorFailToCreateDir                                                     : Creëren van de map '<b>%s</b>' mislukt.
errors_ErrorFailToDeleteDir                                                     : Verwijderen van de map '<b>%s</b>' mislukt.
errors_ErrorFailedToDeleteJoinedFiles                                           : Kan de entiteit niet verwijderen want er zijn bijlagen. Verwijderen eerst de bijlagen.
errors_ErrorThisContactIsAlreadyDefinedAsThisType                               : Deze contactpersoon is al ingesteld als een contactpersoon voor dit type.
errors_ErrorCashAccountAcceptsOnlyCashMoney                                     : Dit is een kasrekening, dus deze accepteert alleen betalingen van het type kas.
errors_ErrorFromToAccountsMustDiffers                                           : De bron- en doelrekening mogen niet dezelfde zijn.
errors_ErrorBadThirdPartyName                                                   : Onjuiste waarde voor naam derde partij
errors_ErrorBadCustomerCodeSyntax                                               : Verkeerde syntaxis voor afnemerscode
errors_ErrorCustomerCodeRequired                                                : Afnemerscode nodig
errors_ErrorCustomerCodeAlreadyUsed                                             : Afnemerscode al gebruikt
errors_ErrorPrefixRequired                                                      : Voorvoegsel vereist
errors_ErrorUrlNotValid                                                         : Het websiteadres is onjuist
errors_ErrorBadSupplierCodeSyntax                                               : verkeerde syntaxis voor Leverancierscode
errors_ErrorSupplierCodeRequired                                                : Leverancierscode vereist
errors_ErrorSupplierCodeAlreadyUsed                                             : Leverancierscode al gebruikt
errors_ErrorBadParameters                                                       : Verkeerde parameters
errors_ErrorBadValueForParameter                                                : Verkeerde waarde %s voor parameter incorrect %s
errors_ErrorBadImageFormat                                                      : Image-bestand heeft niet een ondersteund formaat
errors_ErrorBadDateFormat                                                       : Waarde %s heeft verkeerde datum formaat
errors_ErrorFailedToWriteInDir                                                  : Schrijven in de map %s mislukt
errors_ErrorFoundBadEmailInFile                                                 : Onjuist e-mail syntax gevonden voor %s regels in het bestand (bijvoorbeeld regel %s met email=%s)
errors_ErrorUserCannotBeDelete                                                  : Gebruiker kan niet worden verwijderd. Misschien is het gekoppeld aan Speedealing entiteiten.
errors_ErrorFieldsRequired                                                      : Enkele verplichte velden zijn niet ingevuld.
errors_ErrorFailedToCreateDir                                                   : Creëren van een map mislukt. Controleer of de Webservergebruiker toestemming heeft om te schrijven in Speedealing documentenmap. Wanneer de parameter <b>safe_mode</b> is ingeschakeld in PHP, controleer dan dat de Speedealing php bestanden eigendom zijn van de de webserve gebruiker (of groep).
errors_ErrorNoMailDefinedForThisUser                                            : Geen e-mailadres ingesteld voor deze gebruiker
errors_ErrorFeatureNeedJavascript                                               : Voor deze functie moet Javascript geactiveerd zijn. Verander dit in het Instellingen - scherm.
errors_ErrorTopMenuMustHaveAParentWithId0                                       : Een menu van het type 'Top' kan niet beschikken over een bovenliggend menu. Stel 0 in in het 'Top' menu of kies een menu van het type  'Left'.
errors_ErrorLeftMenuMustHaveAParentId                                           : Een menu van het type 'Left' moeten een id van een bovenliggend menu hebben.
errors_ErrorFileNotFound                                                        : Bestand <b>%s</b> niet gevonden (Verkeerd pad, onvoldoende rechten of toegang geweigerd door de PHP openbasedir of safe_mode instellingen)
errors_ErrorDirNotFound                                                         : Map <b>%s</b> niet gevonden (Verkeerd pad, te weinig rechten of toegang geweigerd door de PHP openbasedir of safe_mode instellingen)
errors_ErrorFunctionNotAvailableInPHP                                           : Functie <b>%s</b> is vereist voor deze functionaliteit, maar is niet beschikbaar in deze versie / installatie van PHP.
errors_ErrorDirAlreadyExists                                                    : Er bestaat al een map met deze naam.
errors_ErrorFileAlreadyExists                                                   : Er bestaat al een bestand met deze naam.
errors_ErrorPartialFile                                                         : Het bestand is niet volledig ontvangen door de server.
errors_ErrorNoTmpDir                                                            : Tijdelijke map %s bestaat niet.
errors_ErrorUploadBlockedByAddon                                                : Upload geblokkeerd door een PHP- en / of Apache-plugin.
errors_ErrorFileSizeTooLarge                                                    : Bestand is te groot.
errors_ErrorSizeTooLongForIntType                                               : Grootte te lang voor int type (%s cijfers maximum)
errors_ErrorSizeTooLongForVarcharType                                           : Grootte te lang voor string type (%s tekens maximum)
errors_ErrorFieldCanNotContainSpecialCharacters                                 : Veld <b>%s</b> mag geen speciale tekens bevat.
errors_ErrorNoAccountancyModuleLoaded                                           : Geen boekhoudingsmodule geactiveerd
errors_ErrorExportDuplicateProfil                                               : Deze profielnaam bestaat al voor deze exportgroep.
errors_ErrorLDAPSetupNotComplete                                                : De Speedealing-LDAP installatie is niet compleet.
errors_ErrorLDAPMakeManualTest                                                  : Een .ldif bestand is gegenereerd in de map %s. Probeer het handmatig te laden vanuit een opdrachtregel om meer informatie over fouten te verkrijgen.
errors_ErrorCantSaveADoneUserWithZeroPercentage                                 : Kan een actie met de status "Nog niet gestart" niet opslaan als het veld "door" niet ook gevuld is.
errors_ErrorRefAlreadyExists                                                    : De referentie gebruikt voor het maken bestaat al
errors_ErrorPleaseTypeBankTransactionReportName                                 : Vul a.u.b. de naam in van een bankafschrift waarop de transactie wordt gemeld (Formaat YYYYMM of JJJJMMDD)
errors_ErrorRecordHasChildren                                                   : Verwijderen van tabelregels mislukt, omdat er nog onderliggende tabelregels zijn.
errors_ErrorModuleRequireJavascript                                             : Javascript dient niet uitgeschakeld te zijn voor deze functionaliteit. Om Javascript aan of uit te zetten gaat u naar het menu Home->instellingen->Scherm
errors_ErrorPasswordsMustMatch                                                  : De twee ingevoerde wachtwoorden komen niet overeen.
errors_ErrorContactEMail                                                        : Er is een technische fout opgetreden. Neemt u alstublieft contact op met de beheerder via het e-mailadres <b>%s</b> en vermeld de volgende foutcode <b>%s</b> in uw bericht, of nog beter voeg een schermafbeelding van de pagina toe.
errors_ErrorWrongValueForField                                                  : Foutiefe waarde voor het veld nummer <b>%s</b> (waarde <b>%s</b> voldoet niet aan de reguliere expressieregel <b>%s</b>)
errors_ErrorFieldValueNotIn                                                     : Verkeerde waarde voor het veld nummer <b>%s</b> (Waarde '<b>%s</b>' is geen waarde beschikbaar in het veld <b>%s</b> van de tabel <b>%s</b>)
errors_ErrorFieldRefNotIn                                                       : Verkeerde waarde voor veldnummer <b>%s</b> (waarde <b>'%s'</b> is geen <b>%s</b> bestaande ref)
errors_ErrorsOnXLines                                                           : Fouten op bronregels <b>%s</b>
errors_ErrorFileIsInfectedWithAVirus                                            : Het antivirusprogramma kon dit bestand niet valideren (het zou met een virus geïnfecteerd kunnen zijn)
errors_ErrorSpecialCharNotAllowedForField                                       : Speciale tekens zijn niet toegestaan in het veld " %s"
errors_ErrorDatabaseParameterWrong                                              : Database instelling <b>%s</b> heeft een waarde die niet compatibel is met het gebruik Speedealing (moet de waarde '<b>%s</b>' hebben).
errors_ErrorNumRefModel                                                         : Er bestaat een verwijzing in de database (%s) en deze is niet compatibel met deze nummeringsregel. Verwijder de tabelregel of hernoem de verwijzing om deze module te activeren.
errors_ErrorQtyTooLowForThisSupplier                                            : Hoeveelheid te laag voor deze leverancier of geen prijs ingesteld voor dit product voor deze leverancier
errors_ErrorModuleSetupNotComplete                                              : De installatie van de module lijkt incompleet te zijn. Ga naar Home->instellingen->moduleinstellingen om de intallatie te voltooien.
errors_ErrorBadMask                                                             : Fout bij het masker
errors_ErrorBadMaskFailedToLocatePosOfSequence                                  : Fout, masker zonder het volgnummer
errors_ErrorBadMaskBadRazMonth                                                  : Fout, slechte resetwaarde
errors_ErrorSelectAtLeastOne                                                    : Fout. Kies ten minste een item.
errors_ErrorProductWithRefNotExist                                              : Product met referentie <i>%s</i> bestaan ​​niet
errors_ErrorDeleteNotPossibleLineIsConsolidated                                 : Verwijderen niet mogelijk, omdat record is gekoppeld aan een bank transation dat is verzoend
errors_ErrorProdIdAlreadyExist                                                  : %s is toegewezen aan een derde
errors_ErrorFailedToSendPassword                                                : Mislukt om het wachtwoord te sturen
errors_ErrorFailedToLoadRSSFile                                                 : Niet in slaagt om RSS feed. Probeer een constante MAIN_SIMPLEXMLLOAD_DEBUG toe te voegen als foutmeldingen niet voldoende informatie.
errors_ErrorPasswordDiffers                                                     : Wachtwoorden verschillen, geef deze a.u.b opnieuw op.
errors_ErrorForbidden                                                           : Toegang geweigerd. <br>Je probeert toegang tot een pagina, scherm of functie te krijgen zonder een geverifieerde sessie, of zonder rechten voor uw gebruikersaccount.
errors_ErrorForbidden2                                                          : Toestemming voor deze aanmelding kan worden ingesteld door de Speedealing-beheerder vanaf het menu %s -> %s.
errors_ErrorForbidden3                                                          : Het lijkt erop dat Speedealing niet wordt gebruikt met een geverifieerde sessie. Kijk eens naar de Speedealing installatiedocumentatie om te weten hoe het beheer van verificaties (htaccess, mod_auth of andere) werkt.
errors_ErrorNoImagickReadimage                                                  : Functie imagick_readimage is niet gevonden in deze PHP installatie. Er kunnen geen voorbeelden gemaakt worden. Beheerders kunnen dit tabblad uitschakelen vanaf het menu Home->Instellingen->Scherm.
errors_ErrorRecordAlreadyExists                                                 : Tabelregel bestaat al
errors_ErrorCantReadFile                                                        : Fout bij lezen bestand '%s'
errors_ErrorCantReadDir                                                         : Fout bij lezen van de map '%s'
errors_ErrorFailedToFindEntity                                                  : Fout bij lezen van de entiteit '%s'
errors_ErrorBadLoginPassword                                                    : Onjuiste waarde voor gebruikersnaam of wachtwoord
errors_ErrorLoginDisabled                                                       : Uw gebruikersaccount is uitgeschakeld
errors_ErrorFailedToRunExternalCommand                                          : Uitvoeren van het externe commando mislukt. Controleer of deze beschikbaar is en uitvoerbaar is op uw server. Als PHP <b>Safe mode</b> is ingeschakeld, controleert u dan of het commando in de map staat die door de instelling <b>safe_mode_exec_dir.</b> wordt aangegeven.
errors_ErrorFailedToChangePassword                                              : Het wijzigen van het wachtwoord is mislukt.
errors_ErrorLoginDoesNotExists                                                  : Gebruiker met gebruikersnaam <b>%s</b> kon niet worden gevonden.
errors_ErrorLoginHasNoEmail                                                     : Deze gebruiker heeft geen e-mail adres. Proces afgebroken.
errors_ErrorBadValueForCode                                                     : Onjuist waardetypen voor code. Probeer het opnieuw met een nieuwe waarde
errors_ErrorBothFieldCantBeNegative                                             : Velden %s %s en kan niet beide negatief
errors_ErrorWebServerUserHasNotPermission                                       : User account <b>%s</b> gebruikt om web-server uit te voeren heeft geen toestemming voor die
errors_ErrorNoActivatedBarcode                                                  : Geen geactiveerde barcode soort
errors_ErrUnzipFails                                                            : Failed to unzip %s with ZipArchive
errors_ErrNoZipEngine                                                           : No engine to unzip %s file in this PHP
errors_ErrorFileMustBeASpeedealingPackage                                       : The file %s must be a Speedealing zip package
errors_ErrorFileRequired                                                        : It takes a package Speedealing file
errors_ErrorPhpCurlNotInstalled                                                 : The PHP CURL is not installed, this is essential to talk with Paypal
errors_ErrorFailedToAddToMailmanList                                            : Failed to add record to Mailman list or SPIP base
errors_ErrorNewVaueCantMatchOldValue                                            : New value can't be equal to old one
errors_ErrorDuplicateTrigger                                                    : Un fichier trigger de classe '<b>%s</b>' est présent plusieurs fois. Supprimer le doublon du répertoire '<b>%s</b>'.
errors_SESSIONEXPIRE                                                            : La session est expirée
errors_WarningMandatorySetupNotComplete                                         : Mandatory setup parameters are not yet defined
errors_WarningSafeModeOnCheckExecDir                                            : Waarschuwing, de instelling <b>safe_mode</b> van PHP staat aan daarom moet het commando opgeslagen worden in een map die gedeclareerd is door de PHP instelling <b>safe_mode_exec_dir.</b>
errors_WarningAllowUrlFopenMustBeOn                                             : De PHP-instelling <b>allow_url_fopen</b> moet ingesteld zijn op <b>aan</b> in het <b>php.ini</b> bestand, voordat deze module volledig werkt. U dient dit bestand handmatig wijzigen.
errors_WarningBuildScriptNotRunned                                              : Het script <b>%s</b> is nog niet uitgevoerd om grafieken te genereren, of er zijn geen gegevens om te tonen.
errors_WarningBookmarkAlreadyExists                                             : Een weblink met deze titel of dit doel (URL) bestaat al.
errors_WarningPassIsEmpty                                                       : Waarschuwing, het databasewachtwoord is leeg. Dit is een lek in de beveiliging. U dient een wachtwoord aan uw database toe te voegen en deze wijziging in uw conf.php te verwerken.
errors_WarningConfFileMustBeReadOnly                                            : Pas op, uw configuratiebestand (</b>htdocs/conf/conf.php</b>) is schrijfbaar voor de webserver. Dit vormt een ernstig veiligheidslek. Wijzig de rechten naar alleen-lezen voor de account van de webserver. Als u Windows draait op een harde schijf met een FAT-formaat, dient u zich ervan bewust te zijn dat dit bestandssysteem geen rechten van bestanden kan toevoegen en daarom niet compleet veilig kan zijn.
errors_WarningsOnXLines                                                         : Waarschuwing op bronregels <b>%s</b>
errors_WarningNoDocumentModelActivated                                          : Er is geen model geactiveerd voor het maken van documenten. Er wordt een standaard model gekozen totdat u uw module instellingen heeft gecontroleerd / aangepast.
errors_WarningLockFileDoesNotExists                                             : Warning, once setup is finished, you must disable install/migrate tools by adding a file <b>install.lock</b> into directory <b>%s</b>. Missing this file is a security hole.
errors_WarningUntilDirRemoved                                                   : Alle beveiligingswaarschuwingen (alleen zichtbaar voor de beheerders) zullen actief blijven zolang de kwetsbaarheden nog bestaan. (of totdat de contante MAIN_REMOVE_INSTALL_WARNING wordt toegevoegd aan Home->Instellingen->Overige).
errors_WarningCloseAlways                                                       : Warning, closing is done even if amount differs between source and target elements. Enable this feature with caution.
errors_ErrorEnterYourLogin                                                      : Identifiant vide
errors_ErrorEnterYourPassword                                                   : Mot de passe vide
mails_Mailing                                                                   : EMailing
mails_EMailing                                                                  : EMailing
mails_Mailings                                                                  : EMailings
mails_EMailings                                                                 : EMailings
mails_AllEMailings                                                              : Alle EMailings
mails_MailCard                                                                  : EMailingskaart
mails_MailTargets                                                               : Geaddresseerden
mails_MailRecipients                                                            : Ontvangers
mails_MailRecipient                                                             : Ontvanger
mails_MailTitle                                                                 : Titel
mails_MailFrom                                                                  : Afzender
mails_MailErrorsTo                                                              : Fouten naar
mails_MailReply                                                                 : Antwoorden naar
mails_MailTo                                                                    : Ontvanger(s)
mails_MailCC                                                                    : Kopiëren naar
mails_MailCCC                                                                   : Gecachde kopie aan
mails_MailTopic                                                                 : Onderwerp e-mail
mails_MailText                                                                  : Bericht
mails_MailFile                                                                  : Bijgevoegde bestanden
mails_MailMessage                                                               : Hoofdtekst van de e-mail
mails_ShowEMailing                                                              : Toon EMailing
mails_ListOfEMailings                                                           : EMailingenlijst
mails_NewMailing                                                                : Nieuwe EMailing
mails_EditMailing                                                               : Bewerk EMailing
mails_ResetMailing                                                              : EMailing opnieuw verzenden
mails_DeleteMailing                                                             : Verwijder EMailing
mails_DeleteAMailing                                                            : Verwijder een EMailing
mails_PreviewMailing                                                            : Voorbeeldweergave EMailing
mails_PrepareMailing                                                            : Bereid EMailing voor
mails_CreateMailing                                                             : Creëer EMailing
mails_MailingDesc                                                               : Op deze pagina kunt u EMailings versturen aan een groep mensen.
mails_MailingResult                                                             : Resulaat verzenden EMailings
mails_TestMailing                                                               : Test e-mail
mails_ValidMailing                                                              : Geldige EMailing
mails_ApproveMailing                                                            : Bevestig EMailing
mails_MailingStatusDraft                                                        : Concept
mails_MailingStatusValidated                                                    : Gevalideerd
mails_MailingStatusApproved                                                     : Goedgekeurd
mails_MailingStatusSent                                                         : Verzonden
mails_MailingStatusSentPartialy                                                 : Gedeeltelijk verzonden
mails_MailingStatusSentCompletely                                               : Volledig verzonden
mails_MailingStatusError                                                        : Fout
mails_MailingStatusNotSent                                                      : Niet verzonden
mails_MailSuccessfulySent                                                       : E-mail successvol verzonden (van %s naar %s)
mails_MailingSuccessfullyValidated                                              : EMailing successfully validated
mails_MailUnsubcribe                                                            : Unsubscribe
mails_Unsuscribe                                                                : Unsubscribe
mails_MailingStatusNotContact                                                   : Don't contact anymore
mails_ErrorMailRecipientIsEmpty                                                 : E-mailadres ontvanger is leeg
mails_WarningNoEMailsAdded                                                      : Geen nieuw E-mailadres aan de lijst van ontvangers toe te voegen.
mails_ConfirmValidMailing                                                       : Weet u zeker dat u deze EMailing wilt valideren?
mails_ConfirmResetMailing                                                       : Waarschuwing, door deze EMailing te herinitialiseren <b>%s</b>, maakt u het mogelijk een bulkzending van deze e-mail nogmaals te doen. Weet u zeker dat dit is wat u voor ogen heeft?
mails_ConfirmDeleteMailing                                                      : Weet u zeker dat u deze EMailing wilt verwijderen?
mails_NbOfRecipients                                                            : Aantal ontvangers
mails_NbOfUniqueEMails                                                          : Aantal unieke e-mails
mails_NbOfEMails                                                                : Aantal e-mails
mails_TotalNbOfDistinctRecipients                                               : Aantal afzonderlijke ontvangers
mails_NoTargetYet                                                               : Nog geen ontvangers gedefinieerd (Ga naar het tabblad "Ontvangers")
mails_AddRecipients                                                             : Ontvangers toevoegen
mails_RemoveRecipient                                                           : Ontvangers verwijderen
mails_CommonSubstitutions                                                       : Vaak voorkomende vervangingen
mails_YouCanAddYourOwnPredefindedListHere                                       : Om uw e-mailselectormodule te creëren, zie htdocs/core/modules/mailings/README.
mails_EMailTestSubstitutionReplacedByGenericValues                              : Bij het gebruik van de testmodus, worden de vervangingsvariabelen door algemene waarden vervangen
mails_MailingAddFile                                                            : Voeg dit bestand bij
mails_NoAttachedFiles                                                           : Geen bijgevoegde bestanden
mails_BadEMail                                                                  : Onjuiste waarde voor e-mail
mails_CloneEMailing                                                             : Kloon EMailing
mails_ConfirmCloneEMailing                                                      : Weet u zeker dat u deze EMailing wilt klonen?
mails_CloneContent                                                              : Kloon bericht
mails_CloneReceivers                                                            : Kloon ontvangers
mails_DateLastSend                                                              : Datum van laatste verzending
mails_DateSending                                                               : Datum verzonden
mails_SentTo                                                                    : Verzonden aan <b>%s</b>
mails_MailingStatusRead                                                         : Lezen
mails_CheckRead                                                                 : Read Receipt
mails_YourMailUnsubcribeOK                                                      : The email <b>%s</b>  is correctly unsubcribe from mailing list
mails_MailtoEMail                                                               : Hyper link to email
mails_ActivateCheckRead                                                         : Allow to use the Read receipt tracker and the unsubcribe link
mails_ActivateCheckReadKey                                                      : Key use to encrypt URL use for Read Receipt and unsubcribe function
mails_MailingModuleDescContactCompanies                                         : Contacten van alle derde partijen (afnemer, prospect, leverancier, etc)
mails_MailingModuleDescSpeedealingUsers                                         : Speedealing users
mails_MailingModuleDescFundationMembers                                         : Stichtingsleden  met e-mailadres
mails_MailingModuleDescEmailsFromFile                                           : E-mails van een tekstbestand (e-mail;achternaam;voornaam;overige)
mails_MailingModuleDescEmailsFromUser                                           : EMails from user input (email;lastname;firstname;other)
mails_MailingModuleDescContactsCategories                                       : Contacten van alle derde partijen (Door categorie)
mails_MailingModuleDescSpeedealingContractsLinesExpired                         : Third parties with expired contract's lines
mails_MailingModuleDescContactsByCompanyCategory                                : Contacten van derden (door derden categorie)
mails_MailingModuleDescMembersCategories                                        : Stichting leden (per categorie)
mails_MailingModuleDescContactsByFunction                                       : Contacten van derden (door de positie / functie)
mails_LineInFile                                                                : Regel %s in bestand
mails_RecipientSelectionModules                                                 : Gedefinieerde verzoeken om ontvangers te selecteren
mails_MailSelectedRecipients                                                    : Geselecteerde ontvangers
mails_MailingArea                                                               : EMailingsoverzicht
mails_LastMailings                                                              : Laatste %s EMailings
mails_TargetsStatistics                                                         : Geaddresseerdenstatistieken
mails_NbOfCompaniesContacts                                                     : Unieke contacten van bedrijven
mails_MailNoChangePossible                                                      : Ontvangers voor gevalideerde EMailings kunnen niet worden gewijzigd
mails_SearchAMailing                                                            : Zoek een EMailing
mails_SendMailing                                                               : Verzend EMailing
mails_SendMail                                                                  : Verzend e-mail
mails_SentBy                                                                    : Verzonden door
mails_MailingNeedCommand                                                        : Om veiligheidsredenen dient het verzenden van een EMailing vanaf een opdrachtregel te worden uitgevoerd. Vraag uw beheerder om het volgende commando uit te voeren om de EMailing naar alle geadresseerden te verzenden:
mails_MailingNeedCommand2                                                       : U kunt ze echter online verzenden door toevoeging van de parameter MAILING_LIMIT_SENDBYWEB met een waarde van het maximaal aantal e-mails dat u wilt verzenden per sessie.
mails_ConfirmSendingEmailing                                                    : Weet u zeker dat u de EMailing wilt verzenden zonder gebruik te maken van de opdrachtregel maar vanuit de webmodus?
mails_LimitSendingEmailing                                                      : Online versturen van e-mailingen zijn beperkt voor veiligheid en timeout redenen tot <b>%s</b> ontvangers per versturende sessie.
mails_TargetsReset                                                              : Lijst legen
mails_ToClearAllRecipientsClickHere                                             : Klik hier om de lijst met ontvangers van deze EMailing te legen
mails_ToAddRecipientsChooseHere                                                 : Voeg geadresseerden toe door deze uit de lijst te kiezen
mails_NbOfEMailingsReceived                                                     : Bulk Emailings ontvangen
mails_IdRecord                                                                  : ID-tabelregel
mails_DeliveryReceipt                                                           : Ontvangstbewijs
mails_YouCanUseCommaSeparatorForSeveralRecipients                               : U kunt het <b>komma</b> scheidingsteken gebruiken om meerdere ontvangers te specificeren.
mails_TagCheckMail                                                              : Track mail opening
mails_TagUnsubscribe                                                            : Unsubscribe link
mails_TagSignature                                                              : Signature sending user
mails_TagMailtoEmail                                                            : Recipient EMail
mails_Notifications                                                             : Kennisgevingen
mails_NoNotificationsWillBeSent                                                 : Er staan geen e-mailkennisgevingen gepland voor dit evenement en bedrijf
mails_ANotificationsWillBeSent                                                  : 1 kennisgeving zal per e-mail worden verzonden
mails_SomeNotificationsWillBeSent                                               : %s kennisgevingen zullen  per e-mail worden verzonden
mails_AddNewNotification                                                        : Activeer een nieuw e-mailkennisgevingsverzoek
mails_ListOfActiveNotifications                                                 : Toon een lijst met alle actieve kennisgevingsverzoeken
mails_ListOfNotificationsDone                                                   : Toon een lijst van alle verzonden kennisgevingen
main_DIRECTION                                                                  : ltr
main_SeparatorDecimal                                                           : ,
main_SeparatorThousand                                                          : .
main_date                                                                       : [object Object]
main_FormatDateShort                                                            : %d-%m-%Y
main_FormatHourShort                                                            : %H:%M
main_FormatHourShortDuration                                                    : %H:%M
main_FormatDateTextShort                                                        : %d %b %Y
main_FormatDateText                                                             : %d %B %Y
main_FormatDateHourShort                                                        : %d-%m-%Y %H:%M
main_FormatDateHourTextShort                                                    : %d %b %Y %H:%M
main_FormatDateHourText                                                         : %d %B %Y %H:%M
main_DatabaseConnection                                                         : Databaseverbinding
main_NoTranslation                                                              : No translation
main_NoRecordFound                                                              : Aucun enregistrement trouvé
main_NoError                                                                    : Geen fout
main_Error                                                                      : Fout
main_ErrorFieldRequired                                                         : Veld '%s' is vereist
main_ErrorFieldFormat                                                           : Veld '%s' heeft een incorrecte waarde
main_ErrorFileDoesNotExists                                                     : Bestand %s bestaat niet
main_ErrorFailedToOpenFile                                                      : Kan bestand %s niet openen
main_ErrorCanNotCreateDir                                                       : Kan map %s niet creëren
main_ErrorCanNotReadDir                                                         : Kan map %s niet lezen
main_ErrorConstantNotDefined                                                    : Parameter %s is niet gedefinieerd
main_ErrorUnknown                                                               : Onbekende fout
main_ErrorSQL                                                                   : SQL fout
main_ErrorLogoFileNotFound                                                      : Logobestand '%s' is niet gevonden
main_ErrorGoToGlobalSetup                                                       : Ga naar het instellingscherm 'Bedrijf / Stichting' om dit te corrigeren
main_ErrorGoToModuleSetup                                                       : Ga naar Moduleinstellingen om dit te corrigeren
main_ErrorFailedToSendMail                                                      : Mail versturen mislukt (afzender=%s, ontvanger=%s)
main_ErrorAttachedFilesDisabled                                                 : Bestandsbijlagen toevoegen is uitgeschakeld op deze server
main_ErrorFileNotUploaded                                                       : Bestand is niet geüpload. Controleer of de grootte niet meer is dan maximaal toegestaan, of er vrije ruimte beschikbaar is op de schijf en of er niet al een bestand met dezelfde naam in deze map bestaat.
main_ErrorInternalErrorDetected                                                 : Fout ontdekt
main_ErrorNoRequestRan                                                          : Geen query uitgevoerd
main_ErrorWrongHostParameter                                                    : Verkeerde host instelling
main_ErrorYourCountryIsNotDefined                                               : Uw land is niet gedefinieerd. Corrigeer in Home->Instellingen-Bewerk en verstuur het formulier opnieuw.
main_ErrorRecordIsUsedByChild                                                   : Tabelregel verwijderen mislukt. Deze tabelregel wordt gebruikt door ten minste een onderliggend tabelregel.
main_ErrorWrongValue                                                            : Verkeerde waarde
main_ErrorWrongValueForParameterX                                               : Verkeerde waarde voor de parameter %s
main_ErrorNoRequestInError                                                      : Geen verzoek mislukt
main_ErrorServiceUnavailableTryLater                                            : Service op dit moment niet beschikbaar. Probeer het later opnieuw.
main_ErrorDuplicateField                                                        : Dubbele waarde in een uniek veld
main_ErrorSomeErrorWereFoundRollbackIsDone                                      : Fouten gevonden. Wij draaien de veranderingen terug.
main_ErrorConfigParameterNotDefined                                             : <b>Parameter %s</b> is niet gedefinieerd binnen Speedealing configuratiebestand <b>conf.php</b>.
main_ErrorCantLoadUserFromSpeedealingDatabase                                   : Failed to find user <b>%s</b> in Speedealing database.
main_ErrorNoVATRateDefinedForSellerCountry                                      : Fout, geen BTW-tarieven voor land '%s'.
main_ErrorNoSocialContributionForSellerCountry                                  : Fout, geen sociale bijdrage gedefinieerd voor het land '%s'.
main_ErrorFailedToSaveFile                                                      : Fout, bestand opslaan mislukt.
main_ErrorOnlyPngJpgSupported                                                   : Fout, alleen .png en .jpg-bestandsformaten worden ondersteund.
main_ErrorImageFormatNotSupported                                               : Uw PHP biedt geen ondersteuning om afbeeldingen met dit formaat te converteren
main_SeeAlso                                                                    : See also %s
main_BackgroundColorByDefault                                                   : Standaard achtergrondkleur
main_FileWasNotUploaded                                                         : Een bestand is geselecteerd als bijlage, maar is nog niet geupload. Klik hiervoor op "Bevestig dit bestand".
main_NbOfEntries                                                                : Aantal invoeringen
main_GoToWikiHelpPage                                                           : Bekijk de online hulp (internettoegang vereist)
main_GoToHelpPage                                                               : Contacteer helpdesk
main_RecordSaved                                                                : Tabelregel opgeslagen
main_LevelOfFeature                                                             : Niveau van de functionaliteiten
main_NotDefined                                                                 : Niet gedefinieerd
main_DefinedAndHasThisValue                                                     : Gedefinieerd en waarde voor
main_IsNotDefined                                                               : onbepaald
main_SpeedealingInHttpAuthenticationSoPasswordUseless                           : Speedealing authentication mode is setup to <b>%s</b> in configuration file <b>conf.php</b>.<br>This means that password database is extern to Speedealing, so changing this field may have no effects.
main_Administrator                                                              : Beheerder
main_Undefined                                                                  : Ongedefineerd
main_PasswordForgotten                                                          : Wachtwoord vergeten?
main_SeeAbove                                                                   : Zie hierboven
main_HomeArea                                                                   : Home
main_LastConnexion                                                              : Laatste verbinding
main_PreviousConnexion                                                          : Laatste keer ingelogd
main_ConnectedOnMultiCompany                                                    : Aangesloten bij Meervoudig bedrijf
main_ConnectedSince                                                             : Aangesloten sinds
main_AuthenticationMode                                                         : Authentificatie modus
main_RequestedUrl                                                               : Gezochte Url
main_DatabaseTypeManager                                                        : Database Type Manager
main_RequestLastAccess                                                          : Query laatste toegang tot database
main_RequestLastAccessInError                                                   : Query laatste foute toegang tot database
main_ReturnCodeLastAccessInError                                                : Verkregen laatste toegangscode met fundamenteel fout
main_InformationLastAccessInError                                               : Informatie over de laatste fundamentele toegang fout
main_SpeedealingHasDetectedError                                                : Speedealing has detected a technical error
main_InformationToHelpDiagnose                                                  : Dit is informatie die kan helpen bij het diagnostiseren
main_MoreInformation                                                            : Meer informatie
main_NotePublic                                                                 : Notitie (publiek)
main_NotePrivate                                                                : Notitie (privé)
main_PrecisionUnitIsLimitedToXDecimals                                          : Speedealing is geconfigureerd om de precisie van de stuksprijzen op <b>%s</b> decimalen te beperken.
main_DoTest                                                                     : Test
main_ToFilter                                                                   : Filter
main_WarningYouHaveAtLeastOneTaskLate                                           : Let op, u heeft minstens een vertraagd element dat de getolereerde vertraging heeft overschreden.
main_yes                                                                        : ja
main_Yes                                                                        : Ja
main_no                                                                         : nee
main_No                                                                         : Nee
main_All                                                                        : Alle
main_Home                                                                       : Home
main_Help                                                                       : Help
main_OnlineHelp                                                                 : Online hulp
main_PageWiki                                                                   : Wiki Pagina
main_Always                                                                     : Altijd
main_Never                                                                      : Nooit
main_Under                                                                      : onder
main_Period                                                                     : Looptijd
main_PeriodEndDate                                                              : Einddatum looptijd
main_Activate                                                                   : Activeren
main_Activated                                                                  : Geactiveerd
main_Closed                                                                     : Gesloten
main_Close                                                                      : Sluiten
main_Closed2                                                                    : Gesloten
main_Enabled                                                                    : Ingeschakeld
main_Disable                                                                    : Uitschakelen
main_Disabled                                                                   : Uitgeschakeld
main_Add                                                                        : Toevoegen
main_AddLink                                                                    : Link toevoegen
main_Update                                                                     : Update
main_AddActionToDo                                                              : Voeg de actie nog doen toe
main_AddActionDone                                                              : Toevoegen actie gedaan
main_Close2                                                                     : Sluiten
main_Confirm                                                                    : Bevestig
main_ConfirmSendCardByMail                                                      : Wilt u deze informatie van deze kaart echt per e-mail versturen aan <b>%s</b> ?
main_Delete                                                                     : Wissen
main_Remove                                                                     : Verwijderen
main_Resiliate                                                                  : Annuleren
main_Cancel                                                                     : Annuleren
main_Modify                                                                     : Wijzigen
main_Edit                                                                       : Bewerken
main_Validate                                                                   : Valideer
main_ToValidate                                                                 : Te valideren
main_Save                                                                       : Opslaan
main_SaveAs                                                                     : Opslaan als
main_TestConnection                                                             : Test verbinding
main_ToClone                                                                    : Klonen
main_ConfirmClone                                                               : Kies de gegevens die u wilt klonen:
main_NoCloneOptionsSpecified                                                    : Geen gegevens om te klonen gedefinieerd.
main_Of                                                                         : van
main_CopyOf                                                                     : Kopie van
main_Show                                                                       : Tonen
main_ShowCardHere                                                               : Kaart tonen
main_Search                                                                     : Zoeken
main_SearchOf                                                                   : Zoeken
main_Valid                                                                      : Geldig
main_ToBill                                                                     : Genereer factuur
main_Approve                                                                    : Goedkeuren
main_ReOpen                                                                     : Heropenen
main_Upload                                                                     : Upload
main_Select                                                                     : Selecteer
main_Choose                                                                     : Kies
main_ChooseLangage                                                              : Kies uw taal a.u.b.
main_Resize                                                                     : Schalen
main_Recenter                                                                   : Hercentreer
main_Author                                                                     : Auteur
main_User                                                                       : Gebruiker
main_Users                                                                      : Gebruikers
main_Group                                                                      : Groep
main_Groups                                                                     : Groepen
main_Password                                                                   : Wachtwoord
main_PasswordRetype                                                             : Herhaal uw wachtwoord
main_NoteSomeFeaturesAreDisabled                                                : Let op, veel functionaliteiten / modules zijn uitgeschakeld in deze demonstratie.
main_Name                                                                       : Naam
main_Person                                                                     : Persoon
main_Parameter                                                                  : Instelling
main_Parameters                                                                 : Instellingen
main_Value                                                                      : Waarde
main_GlobalValue                                                                : Globale waarde
main_PersonalValue                                                              : Persoonlijke waarde
main_NewValue                                                                   : Nieuwe waarde
main_CurrentValue                                                               : Huidige waarde
main_Code                                                                       : Code
main_Type                                                                       : Type
main_Language                                                                   : Taal
main_MultiLanguage                                                              : Meertalig
main_Note                                                                       : Notitie
main_CurrentNote                                                                : Huidige nota
main_Title                                                                      : Titel
main_Label                                                                      : Label
main_RefOrLabel                                                                 : Referentie van Label
main_Info                                                                       : Info
main_Family                                                                     : Familie
main_Description                                                                : Omschrijving
main_Designation                                                                : Beschrijving
main_Model                                                                      : Model
main_DefaultModel                                                               : Standaard model
main_Action                                                                     : Actie
main_About                                                                      : Over
main_Number                                                                     : Aantal
main_NumberByMonth                                                              : Aantal per maand
main_AmountByMonth                                                              : Bedrag per maand
main_Numero                                                                     : Nummer
main_Limit                                                                      : Limiet
main_Limits                                                                     : Grenzen
main_DevelopmentTeam                                                            : Development Team
main_Logout                                                                     : Uitloggen
main_Connection                                                                 : Inloggen
main_Setup                                                                      : Instellingen
main_Alert                                                                      : Kennisgevingen
main_Previous                                                                   : Vorige
main_Next                                                                       : Volgende
main_Cards                                                                      : Kaarten
main_Card                                                                       : Kaart
main_Now                                                                        : Nu
main_Date                                                                       : Datum
main_DateStart                                                                  : Begindatum
main_DateEnd                                                                    : Einddatum
main_DateCreation                                                               : Aanmaakdatum
main_DateModification                                                           : Wijzigingsdatum
main_DateModificationShort                                                      : Wijzigingsdatum
main_DateLastModification                                                       : Laatste wijzigingsdatum
main_DateValidation                                                             : Validatiedatum
main_DateClosing                                                                : Sluitingsdatum
main_DateDue                                                                    : Vervaldatum
main_DateValue                                                                  : Valutadatum
main_DateValueShort                                                             : Valutadatum
main_DateOperation                                                              : Exploitatiedatum
main_DateOperationShort                                                         : Exploitatiedatum
main_DateLimit                                                                  : Termijn
main_DateRequest                                                                : Verzoekdatum
main_DateProcess                                                                : Procesdatum
main_DatePlanShort                                                              : Datum gepland
main_DateRealShort                                                              : Datum haalbaar
main_DateBuild                                                                  : Datum van rapportgeneratie
main_DatePayment                                                                : Datum van betaling
main_DurationYear                                                               : jaar
main_DurationMonth                                                              : maand
main_DurationWeek                                                               : week
main_DurationDay                                                                : dag
main_DurationYears                                                              : jaren
main_DurationMonths                                                             : maanden
main_DurationWeeks                                                              : weken
main_DurationDays                                                               : dagen
main_Year                                                                       : Jaar
main_Month                                                                      : Maand
main_Week                                                                       : Week
main_Day                                                                        : Dag
main_Hour                                                                       : Uur
main_Minute                                                                     : Minuut
main_Second                                                                     : Seconde
main_Years                                                                      : Jaren
main_Months                                                                     : Maanden
main_Days                                                                       : Dagen
main_days                                                                       : dagen
main_Hours                                                                      : Uur
main_Minutes                                                                    : Minuten
main_Seconds                                                                    : Seconden
main_Today                                                                      : Vandaag
main_Yesterday                                                                  : Gisteren
main_Tomorrow                                                                   : Morgen
main_Quadri                                                                     : Trimester
main_MonthOfDay                                                                 : Maand van de dag
main_HourShort                                                                  : U
main_Rate                                                                       : Tarief
main_UseLocalTax                                                                : Include tax
main_LocalTaxDesc                                                               : Some countries apply 2 or 3 taxes on each invoice line. If this is the case, choose type for second and third tax and its rate. Possible type are:<br>1 : local tax apply on products and services without vat (vat is not applied on local tax)<br>2 : local tax apply on products and services before vat (vat is calculated on amount + localtax)<br>3 : local tax apply on products without vat (vat is not applied on local tax)<br>4 : local tax apply on products before vat (vat is calculated on amount + localtax)<br>5 : local tax apply on services without vat (vat is not applied on local tax)<br>6 : local tax apply on services before vat (vat is calculated on amount + localtax)<br>7 : local tax is a fix amount applied on global invoice
main_Bytes                                                                      : Bytes
main_KiloBytes                                                                  : KiloBytes
main_MegaBytes                                                                  : MegaBytes
main_GigaBytes                                                                  : GigaBytes
main_TeraBytes                                                                  : Terabytes
main_b                                                                          : b
main_Kb                                                                         : Kb
main_Mb                                                                         : Mb
main_Gb                                                                         : Gb
main_Tb                                                                         : Tb
main_Cut                                                                        : Knippen
main_Copy                                                                       : Kopiëren
main_Paste                                                                      : Plakken
main_Default                                                                    : Standaard
main_DefaultValue                                                               : Standaardwaarde
main_DefaultGlobalValue                                                         : Globale waarde
main_Price                                                                      : Prijs
main_UnitPrice                                                                  : Eenheidsprijs
main_UnitPriceHT                                                                : Eenheidsprijs (netto)
main_UnitPriceTTC                                                               : Eenheidsprijs (bruto)
main_PriceU                                                                     : E.P.
main_PriceUHT                                                                   : EP (netto)
main_PriceUTTC                                                                  : EP (bruto)
main_Amount                                                                     : Hoeveelheid
main_AmountInvoice                                                              : Factuurbedrag
main_AmountPayment                                                              : Betalingsbedrag
main_AmountHTShort                                                              : Bedrag ex. BTW
main_AmountTTCShort                                                             : Bedrag met BTW
main_AmountHT                                                                   : Bedrag (exclusief BTW)
main_AmountTTC                                                                  : Bedrag (incl. BTW)
main_AmountVAT                                                                  : Bedrag BTW
main_AmountLT1ES                                                                : Bedrag RE
main_AmountLT2ES                                                                : Bedrag IRPF
main_AmountTotal                                                                : Totaal bedrag
main_AmountAverage                                                              : Gemiddeld bedrag
main_PriceQtyHT                                                                 : Prijs voor deze hoeveelheid (exclusief BTW)
main_PriceQtyMinHT                                                              : Prijs hoeveelheid min. (exclusief BTW)
main_PriceQtyTTC                                                                : Prijs voor deze hoeveelheid (incl. BTW)
main_PriceQtyMinTTC                                                             : Prijs hoeveelheid min. (incl. belasting)
main_Percentage                                                                 : Percentage
main_Total                                                                      : Totaal
main_SubTotal                                                                   : Subtotaal
main_TotalHTShort                                                               : Totaal excl. BTW
main_TotalTTCShort                                                              : Totaal incl. BTW
main_TotalHT                                                                    : Totaal excl. BTW
main_TotalTTC                                                                   : Totaal (incl. BTW)
main_TotalTTCToYourCredit                                                       : Totaal (incl. BTW) op uw krediet
main_TotalVAT                                                                   : Totaal BTW
main_TotalLT1ES                                                                 : Totaal RE
main_TotalLT2ES                                                                 : Totaal IRPF
main_IncludedVAT                                                                : Inclusief BTW
main_HT                                                                         : Exclusief BTW
main_TTC                                                                        : Inclusief BTW
main_VAT                                                                        : BTW
main_LT1ES                                                                      : RE
main_LT2ES                                                                      : IRPF
main_VATRate                                                                    : BTW-tarief
main_Average                                                                    : Gemiddeld
main_Sum                                                                        : Som
main_Delta                                                                      : Variantie
main_Module                                                                     : Module
main_Option                                                                     : Optie
main_List                                                                       : Lijstoverzicht
main_FullList                                                                   : Volledig overzicht
main_Statistics                                                                 : Statistieken
main_OtherStatistics                                                            : Andere statistieken
main_Status                                                                     : Status
main_Ref                                                                        : Referentie
main_RefSupplier                                                                : Leverancierreferentie
main_RefPayment                                                                 : Betalingskenmerk
main_CommercialProposals                                                        : Offertes
main_Comment                                                                    : Reactie
main_Comments                                                                   : Reacties
main_ActionsToDo                                                                : Acties te doen
main_ActionsDone                                                                : Acties gedaan
main_ActionsToDoShort                                                           : Te doen
main_ActionsRunningshort                                                        : Gestart
main_ActionsDoneShort                                                           : Uitgevoerd
main_ActionNotApplicable                                                        : Niet van toepassing
main_ActionRunningNotStarted                                                    : Niet gestart
main_ActionRunningShort                                                         : Gestart
main_ActionDoneShort                                                            : Uitgevoerd
main_CompanyFoundation                                                          : Bedrijf of instelling
main_ContactsForCompany                                                         : Bedrijfscontacten
main_ContactsAddressesForCompany                                                : Contacts/addresses for this third party
main_AddressesForCompany                                                        : Addresses for this third party
main_Address                                                                    : Adres
main_ActionsOnCompany                                                           : Acties voor bedrijf
main_ActionsOnMember                                                            : Events over dit lid
main_NActions                                                                   : %s acties
main_NActionsLate                                                               : %s is laat
main_Filter                                                                     : Filter
main_RemoveFilter                                                               : Verwijder filter
main_ChartGenerated                                                             : Grafiek gegenereerd
main_ChartNotGenerated                                                          : Grafiek niet gegenereerd
main_GeneratedOn                                                                : Voortbouwen op %s
main_Generate                                                                   : Genereer
main_Duration                                                                   : Duur
main_TotalDuration                                                              : Totale duur
main_Summary                                                                    : Samenvatting
main_MyBookmarks                                                                : Mijn weblinks
main_OtherInformationsBoxes                                                     : Overige informatievakken
main_SpeedealingBoard                                                           : Speedealing board
main_SpeedealingStateBoard                                                      : Statistics
main_SpeedealingWorkBoard                                                       : Work tasks board
main_Available                                                                  : Beschikbaar
main_NotYetAvailable                                                            : Nog niet beschikbaar
main_NotAvailable                                                               : Niet beschikbaar
main_Popularity                                                                 : Populariteit
main_Categories                                                                 : Categorieën
main_Category                                                                   : Categorie
main_By                                                                         : Door
main_From                                                                       : Van
main_to                                                                         : aan
main_and                                                                        : en
main_or                                                                         : of
main_Other                                                                      : Overig
main_Others                                                                     : Overigen
main_OtherInformations                                                          : Overige informatie
main_Quantity                                                                   : Hoeveelheid
main_Qty                                                                        : Aantal
main_ChangedBy                                                                  : Veranderd door
main_ReCalculate                                                                : Herbereken
main_ResultOk                                                                   : Succes
main_ResultKo                                                                   : Mislukking
main_Reporting                                                                  : Rapportage
main_Reportings                                                                 : Rapportage
main_Draft                                                                      : Concept
main_Drafts                                                                     : Concepten
main_Validated                                                                  : Gevalideerd
main_Opened                                                                     : Geopend
main_New                                                                        : Nieuw
main_Discount                                                                   : Korting
main_Unknown                                                                    : Onbekend
main_General                                                                    : Algemeen
main_Size                                                                       : Grootte
main_Received                                                                   : Ontvangen
main_Paid                                                                       : Betaald
main_Topic                                                                      : Onderwerp
main_ByCompanies                                                                : Door bedrijven
main_ByUsers                                                                    : Door gebruikers
main_Links                                                                      : Links
main_Link                                                                       : Link
main_Receipts                                                                   : Ontvangsten
main_Rejects                                                                    : Verworpen
main_Preview                                                                    : Voorbeeldweergave
main_NextStep                                                                   : Volgende stap
main_PreviousStep                                                               : Vorige stap
main_Datas                                                                      : Gegevens
main_None                                                                       : Geen
main_NoneF                                                                      : Geen
main_Late                                                                       : Vertraagd
main_Photo                                                                      : Afbeelding
main_Photos                                                                     : Afbeeldingen
main_AddPhoto                                                                   : Afbeelding toevoegen
main_Login                                                                      : Inlog
main_CurrentLogin                                                               : Huidige login
main_January                                                                    : Januari
main_February                                                                   : Februari
main_March                                                                      : Maart
main_April                                                                      : April
main_May                                                                        : Mei
main_June                                                                       : Juni
main_July                                                                       : Juli
main_August                                                                     : Augustus
main_September                                                                  : September
main_October                                                                    : Oktober
main_November                                                                   : November
main_December                                                                   : December
main_JanuaryMin                                                                 : Jan
main_FebruaryMin                                                                : Februari
main_MarchMin                                                                   : Mar
main_AprilMin                                                                   : April
main_MayMin                                                                     : Kunnen
main_JuneMin                                                                    : Juni
main_JulyMin                                                                    : Juli
main_AugustMin                                                                  : Augustus
main_SeptemberMin                                                               : September
main_OctoberMin                                                                 : Oktober
main_NovemberMin                                                                : November
main_DecemberMin                                                                : December
main_Month01                                                                    : januari
main_Month02                                                                    : februari
main_Month03                                                                    : maart
main_Month04                                                                    : april
main_Month05                                                                    : mei
main_Month06                                                                    : juni
main_Month07                                                                    : juli
main_Month08                                                                    : augustus
main_Month09                                                                    : september
main_Month10                                                                    : oktober
main_Month11                                                                    : november
main_Month12                                                                    : december
main_MonthShort01                                                               : jan
main_MonthShort02                                                               : feb
main_MonthShort03                                                               : mar
main_MonthShort04                                                               : apr
main_MonthShort05                                                               : mei
main_MonthShort06                                                               : jun
main_MonthShort07                                                               : jul
main_MonthShort08                                                               : aug
main_MonthShort09                                                               : sep
main_MonthShort10                                                               : okt
main_MonthShort11                                                               : nov
main_MonthShort12                                                               : dec
main_AttachedFiles                                                              : Bijgevoegde bestanden en documenten
main_FileTransferComplete                                                       : Het bestand is succesvol geupload
main_DateFormatYYYYMM                                                           : JJJJ-MM
main_DateFormatYYYYMMDD                                                         : JJJJ-MM-DD
main_DateFormatYYYYMMDDHHMM                                                     : JJJJ-MM-DD HH: SS
main_ReportName                                                                 : Rapportnaam
main_ReportPeriod                                                               : Periode-analyse
main_ReportDescription                                                          : Beschrijving
main_Report                                                                     : Verslag
main_Keywords                                                                   : Mots clés
main_Legend                                                                     : Legende
main_FillTownFromZip                                                            : Vul plaats aan uit postcode
main_ShowLog                                                                    : Toon log
main_File                                                                       : Bestand
main_Files                                                                      : Bestanden
main_NotAllowed                                                                 : Niet toegestaan
main_ReadPermissionNotAllowed                                                   : Leesrechten niet toegestaan
main_AmountInCurrency                                                           : Bedrag in %s valuta
main_Example                                                                    : Voorbeeld
main_Examples                                                                   : Voorbeelden
main_NoExample                                                                  : Geen voorbeeld
main_FindBug                                                                    : Rapporteer een bug
main_NbOfThirdParties                                                           : Aantal derden
main_NbOfCustomers                                                              : Aantal afnemers
main_NbOfLines                                                                  : Aantal regels
main_NbOfObjects                                                                : Aantal objecten
main_NbOfReferers                                                               : Aantal verwijzingen
main_Referers                                                                   : Verwijzingen
main_TotalQuantity                                                              : Totale hoeveelheid
main_DateFromTo                                                                 : Van %s naar %s
main_DateFrom                                                                   : Vanaf %s
main_DateUntil                                                                  : Tot %s
main_Check                                                                      : Controleren
main_Internal                                                                   : Interne
main_External                                                                   : Extern
main_Internals                                                                  : Internen
main_Externals                                                                  : Externen
main_Warning                                                                    : Waarschuwing
main_Warnings                                                                   : Waarschuwingen
main_BuildPDF                                                                   : Genereer PDF
main_RebuildPDF                                                                 : Regenereer PDF
main_BuildDoc                                                                   : Genereer Document
main_RebuildDoc                                                                 : Regenereer Document
main_Entity                                                                     : Entiteit
main_Entities                                                                   : Entiteiten
main_EventLogs                                                                  : Logs
main_CustomerPreview                                                            : Afnemersvoorbeeldweergave
main_SupplierPreview                                                            : Leverancier voorbeeldweergave
main_AccountancyPreview                                                         : Boekhoud voorbeeldweergave
main_ShowCustomerPreview                                                        : Toon afnemersvoorbeeldweergave
main_ShowSupplierPreview                                                        : Toon leverancier voorbeeldweergave
main_ShowAccountancyPreview                                                     : Toon boekhoud voorbeeldweergave
main_ShowProspectPreview                                                        : Tooon prospect voorbeeldweergave
main_RefCustomer                                                                : Referentie afnemer
main_Currency                                                                   : Valuta
main_InfoAdmin                                                                  : Informatie voor beheerders
main_Undo                                                                       : Ongedaan maken
main_Redo                                                                       : Opnieuw
main_ExpandAll                                                                  : Alles uitklappen
main_UndoExpandAll                                                              : Ongedaan maken alles uitklappen
main_Reason                                                                     : Reden
main_FeatureNotYetSupported                                                     : Functie nog niet ondersteund
main_CloseWindow                                                                : Sluit venster
main_Question                                                                   : Vraag
main_Response                                                                   : Antwoord
main_Priority                                                                   : Prioriteit
main_SendByMail                                                                 : Verzend per mail
main_MailSentBy                                                                 : E-mail verzonden door
main_TextUsedInTheMessageBody                                                   : E-mailinhoud
main_SendAcknowledgementByMail                                                  : Stuur Bevestiging per e-mail
main_NoEMail                                                                    : Geen e-mail
main_Owner                                                                      : Eigenaar
main_DetectedVersion                                                            : Gedetecteerd versie
main_FollowingConstantsWillBeSubstituted                                        : De volgende constanten worden vervangen met de overeenkomstige waarde.
main_Refresh                                                                    : Vernieuwen
main_BackToList                                                                 : Terug naar het overzicht
main_GoBack                                                                     : Ga terug
main_CanBeModifiedIfOk                                                          : Kan worden gewijzigd indien geldig
main_CanBeModifiedIfKo                                                          : Kan worden gewijzigd indien ongeldig
main_RecordModifiedSuccessfully                                                 : Tabelregel succesvol gewijzigd
main_RecordsModified                                                            : %s records modified
main_AutomaticCode                                                              : Automatische code
main_NotManaged                                                                 : Niet ondersteund
main_FeatureDisabled                                                            : Functie uitgeschakeld
main_MoveBox                                                                    : Verplaats vak %s
main_Offered                                                                    : Beschikbaar
main_NotEnoughPermissions                                                       : U heeft geen toestemming voor deze actie
main_SessionName                                                                : Sessienaam
main_Method                                                                     : Methode
main_Receive                                                                    : Ontvangen
main_PartialWoman                                                               : Gedeeltelijke
main_PartialMan                                                                 : Gedeeltelijke
main_TotalWoman                                                                 : Totaal
main_TotalMan                                                                   : Totaal
main_NeverReceived                                                              : Nooit ontvangen
main_Canceled                                                                   : Geannuleerd
main_YouCanChangeValuesForThisListFromDictionnarySetup                          : U kunt deze waarden veranderen via het menu Home->Instellingen->Constanten
main_Color                                                                      : Kleur
main_Documents                                                                  : Gekoppelde bestanden
main_DocumentsNb                                                                : Bijlagen (%s)
main_Documents2                                                                 : Documenten
main_BuildDocuments                                                             : Gegenereerde documenten
main_UploadDisabled                                                             : Uploaden uitgeschakeld
main_MenuECM                                                                    : Documenten
main_MenuAWStats                                                                : AWStats
main_MenuMembers                                                                : Leden
main_MenuAgendaGoogle                                                           : Google-agenda
main_ThisLimitIsDefinedInSetup                                                  : Speedealing limiet (Menu Home-Instellingen-Beveiliging): %s Kb, PHP grens: %s Kb
main_NoFileFound                                                                : Geen documenten die zijn opgeslagen in deze map
main_CurrentUserLanguage                                                        : Huidige taal
main_CurrentTheme                                                               : Actuele thema
main_DisabledModules                                                            : Uitgeschakelde modules
main_For                                                                        : Voor
main_ForCustomer                                                                : Voor de afnemer
main_Signature                                                                  : Handtekening
main_HidePassword                                                               : Toon opdracht met verborgen wachtwoord
main_UnHidePassword                                                             : Toon opdracht met zichtbaar wachtwoord
main_Root                                                                       : Root
main_Informations                                                               : Informatie
main_Page                                                                       : Pagina
main_Notes                                                                      : Notitie
main_AddNewLine                                                                 : Voeg nieuwe regel toe
main_AddFile                                                                    : Voeg bestand toe
main_ListOfFiles                                                                : Overzicht van beschikbare bestanden
main_FreeZone                                                                   : Vrije tekst
main_CloneMainAttributes                                                        : Kloon het object met de belangrijkste kenmerken
main_PDFMerge                                                                   : Voeg PDF samen
main_Merge                                                                      : Samenvoegen
main_PrintContentArea                                                           : Toon printervriendelijke pagina
main_NoMenu                                                                     : Geen submenu
main_WarningYouAreInMaintenanceMode                                             : Let op, u bevind zich in de onderhoudmodus, dus alleen de login <b>%s</b> is gemachtigd om de applicatie op dit moment te gebruiken.
main_CoreErrorTitle                                                             : Systeemfout
main_CoreErrorMessage                                                           : Excuses, er is een fout opgetreden. Controleer de logbestanden of neem contact op met uw systeembeheerder.
main_CreditCard                                                                 : CreditCard
main_FieldsWithAreMandatory                                                     : Velden met een <b>%s</b> zijn verplicht
main_FieldsWithIsForPublic                                                      : Velden gemarkeerd door <b>%s</b> zullen worden geplaatst op de openbare lijst van de leden. Indien u dat niet wenst, schakelt u de toegang "publiek" uit.
main_AccordingToGeoIPDatabase                                                   : (verkregen door conversie GeoIP)
main_Line                                                                       : Regel
main_NotSupported                                                               : Niet ondersteund
main_RequiredField                                                              : Verplicht veld
main_Result                                                                     : Resultaat
main_ToTest                                                                     : Testen
main_ValidateBefore                                                             : Het geheel moet worden gevalideerd om deze functie te kunnen gebruiken
main_Visibility                                                                 : Zichtbaarheid
main_Private                                                                    : Privé
main_Hidden                                                                     : Verborgen
main_Resources                                                                  : Middelen
main_Source                                                                     : Bron
main_Prefix                                                                     : Voorvoegsel
main_Before                                                                     : Voor
main_After                                                                      : Na
main_IPAddress                                                                  : IP-adres
main_Frequency                                                                  : Frequentie
main_TicketCenter                                                               : Gestion des tickets
main_NewAttribute                                                               : Nieuwe attribuut
main_AttributeCode                                                              : Attribuut code
main_OptionalFieldsSetup                                                        : Extra attributen instellen
main_URLPhoto                                                                   : Url van foto / logo
main_SetLinkToThirdParty                                                        : Link naar een andere derde
main_CreateDraft                                                                : Maak een ontwerp
main_ClickToEdit                                                                : Klik om te bewerken
main_ObjectDeleted                                                              : Object %s verwijderd
main_ByCountry                                                                  : Per land
main_ByTown                                                                     : Door de stad
main_ByDate                                                                     : Op datum
main_ByMonthYear                                                                : Per maand / jaar
main_ByYear                                                                     : Per jaar
main_ByMonth                                                                    : per maand
main_ByDay                                                                      : Per dag
main_BySalesRepresentative                                                      : Door vertegenwoordiger
main_LinkedToSpecificUsers                                                      : Linked to a particular user contact
main_DeleteAFile                                                                : Delete a file
main_ConfirmDeleteAFile                                                         : Are you sure you want to delete file
main_Create                                                                     : Créer
main_Block                                                                      : Bloquer
main_Unblock                                                                    : Débloquer
main_Weeks                                                                      : Semaines
main_To                                                                         : à
main_View                                                                       : Voir
main_Open                                                                       : Ouvrir
main_ControllingPassword                                                        : Connexion en cours...
main_Hello                                                                      : Bonjour
main_Forward                                                                    : Start uploaden
main_Reply                                                                      : Répondre
main_TimeLeft                                                                   : Temps restant
main_Important                                                                  : Important
main_Dashboard                                                                  : Tableau de bord
main_DownloadPDF                                                                : Télécharger PDF
main_Agenda                                                                     : Agenda
main_PreviousMonth                                                              : Mois précédent
main_NextMonth                                                                  : Mois suivant
main_Download                                                                   : Télécharger
main_Potential                                                                  : Potentieel
users_UserCard                                                                  : Gebruikersdetails
users_ContactCard                                                               : Contactdetails
users_GroupCard                                                                 : Groepsdetails
users_NoContactCard                                                             : Geen contactdetails
users_Permission                                                                : Toestemming
users_Permissions                                                               : Rechten
users_Password                                                                  : Wachtwoord
users_EditPassword                                                              : Wijzig wachtwoord
users_SendNewPassword                                                           : Genereer en stuur nieuw wachtwoord
users_ReinitPassword                                                            : Genereer een nieuw wachtwoord
users_PasswordChangedTo                                                         : Wachtwoord gewijzigd in: %s
users_SubjectNewPassword                                                        : Uw nieuwe wachtwoord voor Speedealing
users_AvailableRights                                                           : Beschikbare rechten
users_OwnedRights                                                               : Verkregen rechten
users_GroupRights                                                               : Groepsrechten
users_UserRights                                                                : Gebruikersrechten
users_UserGUISetup                                                              : Gebruikersscherminstellingen
users_DisableUser                                                               : Uitschakelen
users_DisableAUser                                                              : Schakel de gebruikertoegang uit
users_DeleteUser                                                                : Verwijderen
users_DeleteAUser                                                               : Verwijder een gebruiker
users_DisableGroup                                                              : Deactiveren
users_DisableAGroup                                                             : Deactiveer een groep
users_EnableAUser                                                               : Activeer een gebruiker
users_EnableAGroup                                                              : Activeer een groep
users_DeleteGroup                                                               : Verwijderen
users_DeleteAGroup                                                              : Verwijder een groep
users_ConfirmDisableUser                                                        : Weet u zeker dat u de toegang voor de gebruiker <b>%s</b> wilt uitschakelen?
users_ConfirmDisableGroup                                                       : Weet u zeker dat u de toegang voor de groep <b>%s</b> wilt uitschakelen?
users_ConfirmDeleteUser                                                         : Weet u zeker dat u de gebruiker <b>%s</b> wilt verwijderen?
users_ConfirmDeleteGroup                                                        : Weet u zeker dat u de groep <b>%s</b> wilt verwijderen?
users_ConfirmEnableUser                                                         : Weet u zeker dat u de gebruiker <b>%s</b> wilt activeren?
users_ConfirmEnableGroup                                                        : Weet u zeker dat u de groep <b>%s</b> wilt activeren?
users_ConfirmReinitPassword                                                     : Weet u zeker dat u voor de gebruiker <b>%s</b> een nieuw wachtwoord wilt genereren?
users_ConfirmSendNewPassword                                                    : Weet u zeker dat u een nieuw wachtwoord wilt genereren en verzenden voor de gebruiker <b>%s</b>?
users_NewUser                                                                   : Nieuwe gebruiker
users_CreateUser                                                                : Creëer gebruiker
users_SearchAGroup                                                              : Zoek een groep
users_SearchAUser                                                               : Zoek een gebruiker
users_LoginNotDefined                                                           : Gebruikersnaam is niet ingesteld
users_NameNotDefined                                                            : Naam is niet gedefinierd.
users_ListOfUsers                                                               : Lijst van gebruikers
users_Administrator                                                             : Administrator
users_SuperAdministrator                                                        : Super administrator
users_SuperAdministratorDesc                                                    : Super administrateur heeft volledige rechten
users_AdministratorDesc                                                         : Administrators entiteit
users_DefaultRights                                                             : Standaardrechten
users_DefaultRightsDesc                                                         : Stel hier de standaardrechten in die automatisch toegekend worden aan nieuwe gebruiker.
users_SpeedealingUsers                                                          : Speedealing users
users_Civilite                                                                  : Civilite
users_LastName                                                                  : Achternaam
users_FirstName                                                                 : Voornaam
users_ListOfGroups                                                              : Lijst van groepen
users_NewGroup                                                                  : Nieuwe groep
users_CreateGroup                                                               : Groep maken
users_RemoveFromGroup                                                           : Verwijderen uit groep
users_PasswordChangedAndSentTo                                                  : Wachtwoord veranderd en verstuurd naar <b>%s</b>.
users_PasswordChangeRequestSent                                                 : Verzoek om wachtwoord te wijzigen van <b>%s</b> verstuurt naar <b>%s</b>.
users_MenuUsersAndGroups                                                        : Gebruikers & groepen
users_LastGroupsCreated                                                         : Laatste %s gemaakte groep(en)
users_LastUsersCreated                                                          : Laatste %s gemaakte gebruiker(s)
users_ShowGroup                                                                 : Toon groep
users_ShowUser                                                                  : Toon gebruiker
users_NonAffectedUsers                                                          : Niet betrokken gebruikers
users_UserModified                                                              : Gebruiker met succes gewijzigd
users_GroupModified                                                             : Groep %s bewerkt
users_PhotoFile                                                                 : Foto bestand
users_UserWithSpeedealingAccess                                                 : User with Speedealing access
users_ListOfUsersInGroup                                                        : Lijst van gebruikers in deze groep
users_ListOfGroupsForUser                                                       : Lijst van groepen voor deze gebruiker
users_UsersToAdd                                                                : Gebruikers toe te voegen aan deze groep
users_GroupsToAdd                                                               : Groepen toe te voegen aan deze gebruiker
users_NoLogin                                                                   : Geen gebruikersnaam
users_LinkToCompanyContact                                                      : Derden link/contact
users_LinkedToSpeedealingMember                                                 : Link to member
users_LinkedToSpeedealingUser                                                   : Link to Speedealing user
users_LinkedToSpeedealingThirdParty                                             : Link to Speedealing third party
users_CreateSpeedealingLogin                                                    : Create a user
users_CreateSpeedealingThirdParty                                               : Create a third party
users_LoginAccountDisable                                                       : Dit account is uitgeschakeld, zet een nieuwe login om te activeren.
users_LoginAccountDisableInSpeedealing                                          : Account disabled in Speedealing.
users_LoginAccountDisableInLdap                                                 : Account uitgeschakeld op het domein.
users_UsePersonalValue                                                          : Gebruik persoonlijke waarde
users_GuiLanguage                                                               : Interface taal
users_InternalUser                                                              : Interne gebruiker
users_MyInformations                                                            : Mijn gegevens
users_ExportDataset_user_1                                                      : Speedealing's gebruikers en eigenschappen
users_DomainUser                                                                : Domeingebruikersaccount %s
users_Reactivate                                                                : Reactiveren
users_CreateInternalUserDesc                                                    : Hier kunt u een interne gebruiker voor uw bedrijf Creëren. Als u een externe gebruiker (afnemer, leverancier, etc) wilt creëren, gebruik dan de knop "Creëer nieuwe derde partij" uit in het menu "derde partijen".
users_InternalExternalDesc                                                      : Een <b>interne</b> gebruiker is een gebruiker die deel uitmaakt van uw bedrijf.<br>Een <b>externe</b> gebruiker is een afnemer, leverancier of andere. <br><br> In beide gevallen kunnen de rechten binnen Speedealing ingesteld worden. Ook kan een externe gebruiker over een ander menuverwerker beschikken dan een interne gebruiker (Zie Home->Instellingen->Scherm)
users_PermissionInheritedFromAGroup                                             : Toestemming verleend, omdat geërfd van een bepaalde gebruikersgroep.
users_Inherited                                                                 : Overgeërfd
users_UserWillBeInternalUser                                                    : Gemaakt gebruiker een interne gebruiker te zijn (want niet gekoppeld aan een bepaalde derde partij)
users_UserWillBeExternalUser                                                    : Gemaakt gebruiker zal een externe gebruiker (omdat gekoppeld aan een bepaalde derde partij)
users_IdPhoneCaller                                                             : Beller ID (telefoon)
users_UserLogged                                                                : Gebruiker %s ingelogd
users_UserLogoff                                                                : Gebruik %s uitgelogd
users_NewUserCreated                                                            : Gebruiker %s gemaakt
users_NewUserPassword                                                           : Wachtwoord wijzigen voor %s
users_EventUserModified                                                         : Gebruiker %s gewijzigd
users_UserDisabled                                                              : Gebruiker %s uitgeschakeld
users_UserEnabled                                                               : Gebruiker %s geactiveerd
users_UserDeleted                                                               : Gebruiker %s verwijderd
users_NewGroupCreated                                                           : Groep %s gemaakt
users_GroupDeleted                                                              : Groep %s verwijderd
users_ConfirmCreateContact                                                      : Weet u zeker dat u een Speedealing account wilt maken voor deze contactpersoon?
users_ConfirmCreateLogin                                                        : Weet u zeker dat u een Speedealing account wilt maken voor dit lid?
users_ConfirmCreateThirdParty                                                   : Weet u zeker dat u een 'derden' partij wilt maken voor dit lid?
users_LoginToCreate                                                             : Te creëren gebruikersnaam
users_NameToCreate                                                              : Naam van derden maken
users_YourRole                                                                  : Uw rollen
users_YourQuotaOfUsersIsReached                                                 : Uw quotum van actieve gebruikers is bereikt!
users_NbOfUsers                                                                 : Nb van gebruikers
users_DontDowngradeSuperAdmin                                                   : Alleen een superadmin kan downgrade een superadmin
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
users_Address                                                                   : Straat
users_Town                                                                      : Plaats
users_Zip                                                                       : Code Postal
users_Tel-Mobile                                                                : Téléphone Mobile
users_Tel-Fixe                                                                  : Téléphone Fixe
users_Email                                                                     : E-mailadres
users_Date-Naissance                                                            : Geboortedatum
users_Ville-Naissance                                                           : Ville de naissance
users_Pays-Naissance                                                            : Pays de naissance
users_Nationnalite                                                              : Nationnalité
users_Situation                                                                 : Situation familiale
users_NbrEnfants                                                                : Nombre Enfants
users_PerCharges                                                                : Personnes à charges
users_Date-Depart                                                               : Date de dèpart
users_Date-Arrivee                                                              : Date d'arrivée
users_Poste                                                                     : Functie
users_Description-Poste                                                         : Descrption du poste
users_Type-Contrat                                                              : Type de contrat
users_Periode-Essai                                                             : Periode d'essai
users_Salaire-Brut                                                              : Salaire brut
users_Statut                                                                    : Statut
users_Site                                                                      : Site
users_Groupe                                                                    : Groep
users_Securite-Sociale                                                          : N° de la sécurité sociale
users_Libelle-Bank                                                              : Libelle banque
users_IBAN                                                                      : IBAN
users_Photo                                                                     : Afbeelding
users_Categorie                                                                 : Categorie
users_Temps-Travail                                                             : Temps de travail
users_Niveau-Etude                                                              : Niveau d'études
users_Annee-Diplome                                                             : Année d'obtention
users_Login                                                                     : Inlog
users_Notes                                                                     : Notitie
users_LoginDescription                                                          : L'identifiant qui permet de se connecter à l'application. (unique et sans espace)
users_LoginIsValid                                                              : Ce login est valide.
users_EmailAddressIsValid                                                       : L'adresse e-mail est valide.
users_ErrorLoginAlreadyExists                                                   : Ce login existe déjà !
users_ErrorInvalidLogin                                                         : Ce login n'est pas valide !
users_ErrorInvalidEmailAddress                                                  : L'adresse e-mail n'est pas valide !
users_ErrorGroupAlreadyExists                                                   : Ce groupe existe déjà !
