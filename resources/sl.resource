admin_Version                                                                   : Različica
admin_VersionProgram                                                            : Različica programa
admin_VersionLastInstall                                                        : Različica osnovne namestitve
admin_VersionLastUpgrade                                                        : Različica zadnje nadgradnje
admin_VersionExperimental                                                       : Preizkusna
admin_VersionDevelopment                                                        : Razvojna
admin_VersionUnknown                                                            : Neznana
admin_VersionRecommanded                                                        : Priporočena
admin_SessionId                                                                 : ID seje
admin_SessionSaveHandler                                                        : Rutina za shranjevanje seje
admin_SessionSavePath                                                           : Lokalizacija shranjevanja seje
admin_PurgeSessions                                                             : Odstranitev sej
admin_ConfirmPurgeSessions                                                      : Ali res želite odstraniti vse seje ? S tem boste odklopili vse uporabnike (razen vas samih).
admin_NoSessionListWithThisHandler                                              : Shranitev rutine za shranjevanje seje v vašem PHP ne omogoča prikaza seznama vseh sej, ki se izvajajo.
admin_LockNewSessions                                                           : Zaklepanje novih povezav
admin_ConfirmLockNewSessions                                                    : Ali zares želite omejiti vse nove Dolibarr povezave samo nase. Samo uporabnik <b>%s</b> se bo potem lahko priklopil.
admin_UnlockNewSessions                                                         : Odstrani blokado povezovanja
admin_YourSession                                                               : Vaša seja
admin_Sessions                                                                  : Seje uporabnikov
admin_WebUserGroup                                                              : Spletni strežnik uporabnik / skupina
admin_NoSessionFound                                                            : Kaže, da vaš PHP ne dovoli prikaza seznama aktivnih sej. Mapa (<b>%s</b>), ki se uporablja za shranjevanje sej, je morda zaščitena (Na primer z OS dovoljenji ali z PHP direktivo open_basedir).
admin_HTMLCharset                                                               : Nabor znakov za generiranje HTML strani
admin_DBStoringCharset                                                          : Nabor znakov v bazi podatkov za shranjevanje podatkov
admin_DBSortingCharset                                                          : Nabor znakov v bazi podatkov za sortiranje podatkov
admin_WarningModuleNotActive                                                    : Modul <b>%s</b> mora biti omogočen
admin_WarningOnlyPermissionOfActivatedModules                                   : Tukaj so prikazana samo dovoljenja, ki se nanašajo na aktivirane module. Ostale module lahko aktivirate na strani Domov->Nastavitve->Moduli.
admin_SpeedealingSetup                                                          : Speedealing install or upgrade
admin_SpeedealingUser                                                           : Speedealing user
admin_InternalUser                                                              : Interni uporabnik
admin_ExternalUser                                                              : Zunanji uporabnik
admin_InternalUsers                                                             : Interni uporabniki
admin_ExternalUsers                                                             : Zunanji uporabniki
admin_GlobalSetup                                                               : Globalne nastavitve
admin_GUISetup                                                                  : Prikaz
admin_SetupArea                                                                 : Področje nastavitev
admin_FormToTestFileUploadForm                                                  : Testiranje »upload-a« (v skladu z nastavitvami)
admin_IfModuleEnabled                                                           : Opomba: 'Da' velja samo, če je omogočen modul <b>%s</b>
admin_RemoveLock                                                                : Odstrani datoteko <b>%s</b>, če obstaja,  da omogočite orodje za posodobitev.
admin_RestoreLock                                                               : Spremeni dovoljenja datoteke <b>%s</b> v dovoljenje samo za branje za onemogočenje vsake uporabe orodij za posodobitev.
admin_SecuritySetup                                                             : Varnostne nastavitve
admin_ErrorModuleRequirePHPVersion                                              : Napaka, ta modul zahteva PHP različico %s ali višjo
admin_ErrorModuleRequireSpeedealingVersion                                      : Error, this module requires Speedealing version %s or higher
admin_ErrorDecimalLargerThanAreForbidden                                        : Napaka, višja natančnost od <b>%s</b> ni podprta.
admin_DictionnarySetup                                                          : Nastavitve slovarja
admin_Dictionnary                                                               : Dictionaries
admin_DisableJavascript                                                         : Onemogoči JavaScript in Ajax funkcije
admin_ConfirmAjax                                                               : Za potrditev uporabi Ajax pojavni meni
admin_UseSearchToSelectCompany                                                  : Za izbiro podjetja uporabi obrazec za iskanje(namesto polja s seznamom).<br><br>Če je partnerjev zelo veliko (> 100 000), lahko hitrost povišate z nastavitvijo konstante SOCIETE_DONOTSEARCH_ANYWHERE na 1 v Nastavitve->Ostale nastavitve. Iskanje bo s tem omejeno na začetek niza.
admin_ActivityStateToSelectCompany                                              : Dodaj opcijo filtra za prikaz/skritje partnerjev, ki so trenutno neaktivni ali so prekinili aktivnosti
admin_SearchFilter                                                              : Opcije iskalnega filtra
admin_NumberOfKeyToSearch                                                       : Število znakov za sproženje iskanja: %s ViewFullDateActions=Prikaži celotne datume aktivnosti na tretjem listu
admin_ViewFullDateActions                                                       : Prikaz polnih datumov aktivnosti v tretjem zavihku
admin_NotAvailableWhenAjaxDisabled                                              : Ni na voljo, če je Ajax onemogočen
admin_JavascriptDisabled                                                        : JavaScript onemogočen
admin_UsePopupCalendar                                                          : Za vnos datuma uporabi pojavni meni
admin_UsePreviewTabs                                                            : Uporabi zavihke za predogled
admin_ShowPreview                                                               : Prikaži predogled
admin_PreviewNotAvailable                                                       : Predogled ni na voljo
admin_ThemeCurrentlyActive                                                      : Trenutno aktivna tema
admin_CurrentTimeZone                                                           : Časovni pas PHP strežnika
admin_Space                                                                     : Presledek
admin_Fields                                                                    : Polja
admin_Mask                                                                      : Maska
admin_NextValue                                                                 : Naslednja vrednost
admin_NextValueForInvoices                                                      : Naslednja vrednost (fakture)
admin_NextValueForCreditNotes                                                   : Naslednja vrednost (dobropisi)
admin_MustBeLowerThanPHPLimit                                                   : Opomba: vaš PHP omejuje velikost datoteke za prenos na <b>%s</b> %s, kot je vrednost tega parametra
admin_NoMaxSizeByPHPLimit                                                       : Opomba: V vaši PHP konfiguraciji ni nastavljenih omejitev
admin_MaxSizeForUploadedFiles                                                   : Največja velikost prenesene datoteke (0 za prepoved vseh prenosov)
admin_UseCaptchaCode                                                            : Na prijavni strani uporabi grafično kodo (CAPTCHA)
admin_UseAvToScanUploadedFiles                                                  : Uporabi protivirusni program za pregled prenesenih datotek
admin_AntiVirusCommand                                                          : Celotna pot za antivirusno ukazno vrstico
admin_AntiVirusCommandExample                                                   : Primer za ClamWin: c:\Program Files (x86)\ClamWin\bin\clamscan.exe<br>Primer za ClamAv: /usr/bin/clamscan
admin_AntiVirusParam                                                            : Več parametrov v ukazni vrstici
admin_AntiVirusParamExample                                                     : Primer za ClamWin: --database="C:\Program Files (x86)\ClamWin\lib"
admin_ComptaSetup                                                               : Nastavitve računovodskega modula
admin_UserSetup                                                                 : Nastavitve upravljanja uporabnikov
admin_MenuSetup                                                                 : Nastavitve upravljanja menijev
admin_MenuLimits                                                                : Omejitve in natančnost
admin_MenuIdParent                                                              : ID nadrejenega menija
admin_DetailMenuIdParent                                                        : ID nadrejenega menija (0 za najvišji meni)
admin_DetailPosition                                                            : Številka za razvrstitev za določanje položaja menija
admin_PersonalizedMenusNotSupported                                             : Prilagajanje menijev ni podprto
admin_AllMenus                                                                  : Vsi
admin_NotConfigured                                                             : Ni konfiguriran
admin_Setup                                                                     : Nastavitve
admin_Activation                                                                : Aktivacija
admin_Active                                                                    : Aktiven
admin_SetupShort                                                                : Nastavitve
admin_OtherOptions                                                              : Ostale opcije
admin_OtherSetup                                                                : Ostale nastavitve
admin_CurrentValueSeparatorDecimal                                              : Decimalno ločilo
admin_CurrentValueSeparatorThousand                                             : Ločilo tisočic
admin_Modules                                                                   : Moduli
admin_ModulesCommon                                                             : Osnovni moduli
admin_ModulesOther                                                              : Ostali moduli
admin_ModulesInterfaces                                                         : Moduli za povezave
admin_ModulesSpecial                                                            : Specialni moduli
admin_ParameterInSpeedealing                                                    : Parameter %s
admin_LanguageParameter                                                         : Jezikovni parameter %s
admin_LanguageBrowserParameter                                                  : Parameter %s
admin_LocalisationSpeedealingParameters                                         : Localisation parameters
admin_ClientTZ                                                                  : Časovni pas klienta (uporabnika)
admin_ClientHour                                                                : Ura klienta (uporabnika)
admin_OSTZ                                                                      : časovni pas OS strežnika
admin_PHPTZ                                                                     : Časovni pas PHP strežnika
admin_PHPServerOffsetWithGreenwich                                              : Odstopanje PHP strežnika od Greenwicha (sekunde)
admin_ClientOffsetWithGreenwich                                                 : Odstopanje brskalnika klienta od Greenwicha (seconds)
admin_DaylingSavingTime                                                         : Poletni/zimski čas (uporabnik)
admin_CurrentHour                                                               : Ura PHP strežnika
admin_CompanyTZ                                                                 : Časovna cona podjetja (osnovno podjetje)
admin_CompanyHour                                                               : Ura podjetja (osnovno podjetje)
admin_CurrentSessionTimeOut                                                     : Časovna omejitev trenutne seje
admin_OSEnv                                                                     : OS okolje
admin_Box                                                                       : Polje
admin_Boxes                                                                     : Polja
admin_MaxNbOfLinesForBoxes                                                      : Največje število vrstic v polju
admin_PositionByDefault                                                         : Privzet vrstni red
admin_Position                                                                  : Vrstni red
admin_MenusDesc                                                                 : Menijski vmesnik določa vsebino 2 menijskih vrstic (vodoravne vrstice in navpične vrstice).
admin_MenusEditorDesc                                                           : Urejevalnik menijev omogoča definicijo prilagojenih vnosov v menijih. To funkcijo uporabljajte previdno, da ne bi Dolibarr postal nestabilen in menijske postavke permanentno nedosegljive.<br>Nekateri moduli dodajo vnose v menije (največkrat v meniju <b>Vsi</b>). Če po pomoti odstranite katero od teh postavk, jih lahko obnovite z onemogočenjem in ponovnim aktiviranjem modula.
admin_MenuForUsers                                                              : Meni za uporabnika
admin_LangFile                                                                  : Datoteka .lang
admin_System                                                                    : Sistem
admin_SystemInfo                                                                : Sistemske informacije
admin_SystemTools                                                               : Sistemska orodja
admin_SystemToolsArea                                                           : Področje sistemskih orodij
admin_SystemToolsAreaDesc                                                       : To področje omogoča administrativne funkcije. Preko menija izberite funkcijo, ki jo iščete.
admin_PurgeAreaDesc                                                             : Ta stran omogoča brisanje vseh datotek, ki jih je kreiral in shranil program Dolibarr (začasne datoteke ali vse datoteke v mapi <b>%s</b>). Uporaba te funkcije ni potrebna. Namenjena je uporabnikom, katerih Dolibarr gostuje pri ponudniku, ki ne dovoljuje brisanja datotek, ki jih je kreiral web strežnik.
admin_PurgeDeleteLogFile                                                        : Izbris log datoteke <b>%s</b>, ki jo je kreiral modul Syslog (ni tveganja izgube podatkov)
admin_PurgeDeleteTemporaryFiles                                                 : Izbris vseh začasnih datotek (ni tveganja izgube podatkov)
admin_PurgeDeleteAllFilesInDocumentsDir                                         : Izbris vseh datotek v mapi <b>%s</b>. Začasne datoteke, kot tudi datoteke, ki so pripete elementom (partnerji, fakture, ...) in naložene v modul ECM, se bodo izbrisale.
admin_PurgeRunNow                                                               : Počisti zdaj
admin_PurgeNothingToDelete                                                      : Ni map ali datotek za brisanje.
admin_PurgeNDirectoriesDeleted                                                  : Izbrisane mape ali datoteke <b>%s</b>.
admin_PurgeAuditEvents                                                          : Počisti vse dogodke
admin_ConfirmPurgeAuditEvents                                                   : Ali zares želite počistiti vse varnostne dogodke ? Vsi varnostni dnevniki bodo izbrisani, Nobeni drugi podatki ne bodo odstranjeni.
admin_NewBackup                                                                 : Nova varnostna kopija
admin_GenerateBackup                                                            : Generiraj varnostno kopijo
admin_Backup                                                                    : Varnostna kopija
admin_Restore                                                                   : Obnovitev
admin_RunCommandSummary                                                         : Varnostna kopija (backup) bo narejena z naslednjimi ukazi
admin_RunCommandSummaryToLaunch                                                 : Varnostno kopiranje lahko poženete z naslednjim ukazom
admin_WebServerMustHavePermissionForCommand                                     : Vaš web strežnik mora dovoliti izvajanje takih ukazov
admin_BackupResult                                                              : Rezultat varnostnega kopiranja
admin_BackupFileSuccessfullyCreated                                             : Varnostna kopija uspešno generirana
admin_YouCanDownloadBackupFile                                                  : Generirane datoteke se zdaj lahko prenesejo
admin_NoBackupFileAvailable                                                     : Varnostna kopija ni na voljo.
admin_ExportMethod                                                              : Način izvoza
admin_ImportMethod                                                              : Način uvoza
admin_ToBuildBackupFileClickHere                                                : Za izdelavo varnostne kopije, kliknite <a href="%s">tukaj</a>.
admin_ImportMySqlDesc                                                           : Za uvoz datoteke z varnostno kopijo, morate uporabiti ukaz mysql v ukazni vrstici:
admin_ImportPostgreSqlDesc                                                      : Za uvoz datoteke z varnostno kopijo, morate uporabiti ukaz pg_restore v ukazni vrstici:
admin_ImportMySqlCommand                                                        : %s %s < mybackupfile.sql
admin_ImportPostgreSqlCommand                                                   : %s %s mybackupfile.sql
admin_FileNameToGenerate                                                        : Ime datoteke za generiranje
admin_CommandsToDisableForeignKeysForImport                                     : Ukaz za onemogočenje tujega ključa pri uvozu
admin_CommandsToDisableForeignKeysForImportWarning                              : Mandatory if you want to be able to restore your sql dump later
admin_ExportCompatibility                                                       : Kompatibilnost generirane izvozne datoteke
admin_MySqlExportParameters                                                     : MySQL izvozni parametri
admin_PostgreSqlExportParameters                                                : PostgreSQL export parameters
admin_UseTransactionnalMode                                                     : Uporabi transakcijski način
admin_FullPathToMysqldumpCommand                                                : Celotna pot do ukaza mysqldump
admin_FullPathToPostgreSQLdumpCommand                                           : Celotna pot do ukaza pg_dump
admin_ExportOptions                                                             : Izvozne opcije
admin_AddDropDatabase                                                           : Dodaj ukaz OPUSTI BAZO PODATKOV
admin_AddDropTable                                                              : Dodaj ukaz OPUSTI TABELO
admin_ExportStructure                                                           : Structure
admin_Datas                                                                     : Podatki
admin_NameColumn                                                                : Imenuj kolone
admin_ExtendedInsert                                                            : Razširjeno vstavljanje
admin_NoLockBeforeInsert                                                        : Ni zaklepanja ukazi okoli INSERT
admin_DelayedInsert                                                             : Zakasnelo vstavljanje
admin_EncodeBinariesInHexa                                                      : Kodiraj binarne podatke v hexadecimalne
admin_IgnoreDuplicateRecords                                                    : Prezri napako podvojenih zapisov (INSERT IGNORE)
admin_Yes                                                                       : Da
admin_No                                                                        : Ne
admin_AutoDetectLang                                                            : Samozaznava (jezik iskalnika)
admin_FeatureDisabledInDemo                                                     : Funkcija onemogočena v demo različici
admin_Rights                                                                    : Dovoljenja
admin_BoxesDesc                                                                 : Polja so področja na zaslonu, ki prikazujejo krajše informacije na nekaterih straneh. Izberete lahko, ali naj se polja prikažejo ali ne, tako da izberete ciljno stran in kliknete 'Aktiviraj', ali kliknete na koš za onemogočenje.
admin_OnlyActiveElementsAreShown                                                : Prikazani so samo elementi <a href="%s">omogočenih modulov </a>.
admin_ModulesDesc                                                               : Dolibarr moduli določajo, katere funkcije programa so omogočene. Nekateri moduli zahtevajo, da po omogočanju modula dodelite dovoljenje uporabnikom. Kliknite gumb za vklop/izklop v koloni "Status" za omogočanje modula/funkcije.
admin_ModulesInterfaceDesc                                                      : Vmesnik za Dolibarr module omogoča dodajanje funkcij odvisno od zunanjih programov, sistemov ali storitev.
admin_ModulesSpecialDesc                                                        : Specialni moduli so zelo specifični ali redko uporabljani moduli.
admin_ModulesJobDesc                                                            : Poslovni moduli zagotavljajo enostavne prednastavitve aplikacije Dolibarr za določeno poslovanje.
admin_ModulesMarketPlaceDesc                                                    : Več modulov si lahko naložite preko zunanjih web strani na internetu...
admin_ModulesMarketPlaces                                                       : Več modulov...
admin_DoliStoreDesc                                                             : DoliStore, uradna tržnica za Dolibarr ERP/CRM zunanje module
admin_WebSiteDesc                                                               : Ponudniki spletnih strani, na katerih lahko poiščete več modulov...
admin_URL                                                                       : Link
admin_BoxesAvailable                                                            : Polja, ki so na voljo
admin_BoxesActivated                                                            : Aktivirana polja
admin_ActivateOn                                                                : Aktiviran na
admin_ActiveOn                                                                  : Aktiven na
admin_SourceFile                                                                : Izvorna datoteka
admin_AutomaticIfJavascriptDisabled                                             : Avtomatsko, če je Javascript onemogočen
admin_AvailableOnlyIfJavascriptNotDisabled                                      : Na voljo samo, če JavaScript ni onemogočen
admin_AvailableOnlyIfJavascriptAndAjaxNotDisabled                               : Na voljo samo, če JavaScript in Ajax nista onemogočena
admin_NotInstalled                                                              : Not installed
admin_Required                                                                  : Zahtevano
admin_Security                                                                  : Varnost
admin_Passwords                                                                 : Gesla
admin_DoNotStoreClearPassword                                                   : Ne shranjujte v bazi podatkov celih gesel, temveč samo šifrirane vrednosti (priporočena aktivacija)
admin_MainDbPasswordFileConfEncrypted                                           : Šifrirana baza podatkov v conf.php (priporočena aktivacija)
admin_InstrucToEncodePass                                                       : Za kodiranje gesel v datoteko <b>conf.php</b>, zamenjajte vrstico <br><b>$dolibarr_main_db_pass="..."</b><br>z<br><b>$dolibarr_main_db_pass="crypted:%s"</b>
admin_InstrucToClearPass                                                        : Za dekodirana (čista) gesla v datoteki <b>conf.php</b>, zamenjajte vrstico <br><b>$dolibarr_main_db_pass="crypted:..."</b><br>z<br><b>$dolibarr_main_db_pass="%s"</b>
admin_ProtectAndEncryptPdfFiles                                                 : Zaščita generiranih pdf datotek (aktivacija ni priporočena, prekinjeno masovno generiranje pdf)
admin_ProtectAndEncryptPdfFilesDesc                                             : Zaščiteni PDF se lahko berejo in tiskajo preko kateregakoli PDF bralnika. Vendar pa ni več možno popravljanje in kopiranje. Upoštevajte, da uporaba te funkcije onemogoči izdelavo globalnih zbirnih pdf datotek (kot so neplačani računi).
admin_Feature                                                                   : Funkcija
admin_SpeedealingLicense                                                        : License
admin_SpeedealingProjectLeader                                                  : Project leader
admin_Developpers                                                               : Razvojniki/sodelavci
admin_OtherDeveloppers                                                          : Ostali razvojniki/sodelavci
admin_OfficialWebSite                                                           : Uradna spletna stran Dolibarr international
admin_OfficialWebSiteFr                                                         : Uradna spletna stran v francoščini
admin_OfficialWiki                                                              : Dolibarr Wiki
admin_OfficialDemo                                                              : Dolibarr online demo
admin_OfficialMarketPlace                                                       : Uradna tržnica za zunanje module/dodatke
admin_OfficialWebHostingService                                                 : Official web hosting service (Cloud hosting)
admin_ForDocumentationSeeWiki                                                   : Glede dokumentacije za uporabnike in razvojnike (Doc, FAQ...),<br>poglejte na Dolibarr Wiki:<br><b><a href="%s" target="_blank">%s</a></b>
admin_ForAnswersSeeForum                                                        : Za vsa ostala vprašanja/pomoč lahko uporabite Dolibarr forum:<br><b><a href="%s" target="_blank">%s</a></b>
admin_HelpCenterDesc1                                                           : To področje vam omogoča dostop do storitve »Dolibarr Help Support«.
admin_HelpCenterDesc2                                                           : Nekateri deli te storitve so na voljo <b>samo v angleščini</b>.
admin_CurrentTopMenuHandler                                                     : Trenutna rutina za zgornji meni
admin_CurrentLeftMenuHandler                                                    : Trenutna rutina za levi meni
admin_CurrentMenuHandler                                                        : Trenutna rutina za meni
admin_CurrentSmartphoneMenuHandler                                              : Trenutna rutina za smartphone meni
admin_MeasuringUnit                                                             : Merilna enota
admin_Emails                                                                    : E-pošta
admin_EMailsSetup                                                               : Nastavitve e-pošte
admin_EMailsDesc                                                                : Ta stran vam omogoča prepisovanje PHP parametrov za poslano e-pošto. V večini primerov je na sistemih Unix/Linux OS PHP nastavitev pravilna, zato so ti parametri nekoristni.
admin_MAIN_MAIL_SMTP_PORT                                                       : SMTP/SMTPS vrata (Privzeto v php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_SERVER                                                     : SMTP/SMTPS gostitelj (Privzeto v php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_PORT_NotAvailableOnLinuxLike                               : SMTP/SMTPS vrata (Ni definiran v PHP na Unix ali podobnih sistemih)
admin_MAIN_MAIL_SMTP_SERVER_NotAvailableOnLinuxLike                             : SMTP/SMTPS gostitelj (Ni definiran v PHP na Unix ali podobnih sistemih)
admin_MAIN_MAIL_EMAIL_FROM                                                      : Pošiljateljev e-mail za avtomatske emaile (Privzeto v php.ini: <b>%s</b>)
admin_MAIN_MAIL_ERRORS_TO                                                       : E-mail naslov pošiljatelja je uporabljen za vrnitev napačno poslanih e-mailov
admin_MAIN_MAIL_AUTOCOPY_TO                                                     : Sistematično pošilljanje skritih kopij (cc) vseh poslanih emailov za
admin_MAIN_DISABLE_ALL_MAILS                                                    : Onemogoči vsa pošiljanja e-mailov (za namene testiranja ali demonstracij)
admin_MAIN_MAIL_SENDMODE                                                        : Načini za pošiljanje e-pošte
admin_MAIN_MAIL_SMTPS_ID                                                        : SMTP ID, če je zahtevano preverjanje pristnosti
admin_MAIN_MAIL_SMTPS_PW                                                        : SMTP geslo, če je zahtevano preverjanje pristnosti
admin_MAIN_MAIL_EMAIL_TLS                                                       : Uporabi TLS (SSL) šifriranje
admin_MAIN_DISABLE_ALL_SMS                                                      : Onemogoči vsa pošiljanja SMS (za namen testiranja ali demonstracij)
admin_MAIN_SMS_SENDMODE                                                         : Uporabljen način pošiljanja SMS
admin_MAIN_MAIL_SMS_FROM                                                        : Privzeta pošiljateljeva telefonska številka za pošiljanje SMS
admin_FeatureNotAvailableOnLinux                                                : Funkcija ni na voljo pri Unix sistemih. Preverite program za pošiljanje pošte lokalno.
admin_SubmitTranslation                                                         : Če prevod v ta jezik ni popoln oziroma boste našli napake, jih lahko popravite tako, da uredite datoteke v mapi <b>langs / %s</b> in predložite spremenjene datoteke na www.dolibarr.org forum.
admin_ModuleSetup                                                               : Nastavitve modula
admin_ModulesSetup                                                              : Nastavitve modulov
admin_ModuleFamilyBase                                                          : Sistem
admin_ModuleFamilyCrm                                                           : Upravljanje odnosov s strankami (CRM)
admin_ModuleFamilyProducts                                                      : Upravljanje proizvodov
admin_ModuleFamilyHr                                                            : Upravljanje človeških virov
admin_ModuleFamilyProjects                                                      : Delo na projektih/sodelovanje
admin_ModuleFamilyOther                                                         : Ostalo
admin_ModuleFamilyTechnic                                                       : Orodja za različne module
admin_ModuleFamilyExperimental                                                  : Eksperimentalni moduli
admin_ModuleFamilyFinancial                                                     : Finančni moduli (računovodstvo/blagajna)
admin_ModuleFamilyECM                                                           : ECM
admin_MenuHandlers                                                              : Menijski vmesniki
admin_MenuAdmin                                                                 : Urejevalnik menijev
admin_DoNotUseInProduction                                                      : Do not use in production
admin_ThisIsProcessToFollow                                                     : To je nastavitev za proces:
admin_StepNb                                                                    : Korak %s
admin_FindPackageFromWebSite                                                    : Poiščite paket, ki omogoča funkcijo, ki jo želite (na primer na spletni strani %s).
admin_DownloadPackageFromWebSite                                                : Prenesi paket z internetne strani.
admin_UnpackPackageInSpeedealingRoot                                            : Unpack package file into Speedealing's root directory <b>%s</b>
admin_SetupIsReadyForUse                                                        : Instalacija je zaključena in Dolibarr je pripravljen na uporabo s to novo komponento.
admin_NotExistsDirect                                                           : The alternative root directory is not defined.<br>
admin_InfDirAlt                                                                 : Since version 3 it is possible to define an alternative root directory.This allows you to store, same place, plug-ins and custom templates.<br>Just create a directory at the root of Dolibarr (eg: custom).<br>
admin_InfDirExample                                                             : <br>Then declare it in the file conf.php<br> $dolibarr_main_url_root_alt='http://myserver/custom'<br>$dolibarr_main_document_root_alt='/path/of/dolibarr/htdocs/custom'<br>*These lines are commented with "#", to uncomment only remove the character.
admin_YouCanSubmitFile                                                          : Select module:
admin_CurrentVersion                                                            : Trenutna različica Dolibarr
admin_CallUpdatePage                                                            : Pojdite na stran za nadgradnjo strukture in podatkov v podatkovni bazi: %s.
admin_LastStableVersion                                                         : Zadnja stabilna različica
admin_GenericMaskCodes                                                          : Vnesete lahko kakršnokoli številčno masko. V tej maski lahko uporabite naslednje oznake:<br><b>{000000}</b> ustreza številki, ki se poveča pri vsakem %s. Vnesite toliko ničel, kot je želena dolžina števca. Števec se bo zapolnil z ničlami na levi strani, da bi velikost ustrezala maski. <br><b>{000000+000}</b> enako kot prej, vendar je desno od znaka + odmik, ki je uporabljen na prvi %s. <br><b>{000000@x}</b> enako kot prej, vendar se števec resetira na 0, ko se doseže mesec x (x je med 1 in 12). Če je uporabljena ta opcija, ,in je x enak ali večji od 2, je zahtevana tudi sekvenca {yy}{mm} ali {yyyy}{mm}. <br><b>{dd}</b> dan (01 do 31).<br><b>{mm}</b> mesec (01 do 12).<br><b>{yy}</b>, <b>{yyyy}</b> ali <b>{y}</b> leto, izraženo z 2, 4 ali 1 številko. <br>
admin_GenericMaskCodes2                                                         : <b>{cccc}</b> koda klienta<br><b>{cccc000}</b> koda klienta z n znaki se nadaljuje s klientovo referenčno številko brez odmika in brez resetiranja globalnega števca.<br>
admin_GenericMaskCodes3                                                         : Vsi ostali znaki v maski bodo ostali nedotaknjeni.<br>Presledki niso dovoljeni.<br>
admin_GenericMaskCodes4a                                                        : <u>Primer 99-ega %s partnerja podjetja narejen 2007-01-31:</u><br>
admin_GenericMaskCodes4b                                                        : <u>Primer partnerja 99, kreiranega 2007-03-01:</u><br>
admin_GenericMaskCodes4c                                                        : <u>Example on product created on 2007-03-01:</u><br>
admin_GenericMaskCodes5                                                         : <b>ABC{yy}{mm}-{000000}</b> bo dal rezultat <b>ABC0701-000099</b><br><b>{0000+100}-ZZZ/{dd}/XXX</b> bo dal rezultat <b>0199-ZZZ/31/XXX</b>
admin_GenericNumRefModelDesc                                                    : Predlaga prilagodljivo številko glede na definirano masko.
admin_ServerAvailableOnIPOrPort                                                 : Strežnik je na voljo na naslovu <b>%s</b> na vratih <b>%s</b>
admin_ServerNotAvailableOnIPOrPort                                              : Strežnik ni na voljo na naslovu <b>%s</b> na vratih <b>%s</b>
admin_DoTestServerAvailability                                                  : Test povezljivosti strežnika
admin_DoTestSend                                                                : Testno pošiljanje
admin_DoTestSendHTML                                                            : Testno pošiljanje HTML
admin_ErrorCantUseRazInStartedYearIfNoYearMonthInMask                           : Napaka, ni možno uporabiti opcije @, če sekvence {yy}{mm} ali {yyyy}{mm} ni v maski.
admin_UMask                                                                     : UMask parameter za nove datoteke na Unix/Linux/BSD datotečnem sistemu.
admin_UMaskExplanation                                                          : Ta parameter omogoča definicijo privzetih dovoljenj za datoteke na strežniku, ki jih je kreiral Dolibarr (na primer med nalaganjem).<br>Vrednost  je oktalna (na primer, 0666 pomeni branje in pisanje za vse).<br>Tega parametra ni na Windows strežniku.
admin_SeeWikiForAllTeam                                                         : Za celoten seznam vseh udeležencev in njihove organizacije poglejte na wiki stran
admin_UseACacheDelay                                                            : Zakasnitev predpomnilnika za izvozni odziv v sekundah (0 ali prazno pomeni, da ni predpomnilnika)
admin_DisableLinkToHelpCenter                                                   : Skrij link "<b>Potrebujete pomoč ali podporo</b>" na prijavni strani
admin_DisableLinkToHelp                                                         : Skrij link "<b>%s Online pomoč</b>" na levem meniju
admin_AddCRIfTooLong                                                            : Ni avtomatskega prelamljanja besedila, zato morate v predolgo vrstico, ki sega preko robu strani, vstaviti znak za novo vrstico.
admin_ModuleDisabled                                                            : Modul je onemogočen
admin_ModuleDisabledSoNoEvent                                                   : Modul je onemogočen, zato dogodek ni bil kreiran
admin_ConfirmPurge                                                              : Ali zares želite izvesti to čiščenje ?<br>S tem boste dejansko zbrisali vse podatkovne datoteke, ki jih ne bo več možno obnoviti (ECM datoteke, pripete datoteke...).
admin_MinLength                                                                 : Minimalna dolžina
admin_LanguageFilesCachedIntoShmopSharedMemory                                  : Datoteke .lang naložene v spomin v skupni rabi
admin_ExamplesWithCurrentSetup                                                  : Primeri pri trenutno veljavnih nastavitvah
admin_ListOfDirectories                                                         : Seznam map z OpenDocument predlogami
admin_ListOfDirectoriesForModelGenODT                                           : Seznam imenikov, ki vsebujejo datoteke predlog v formatu OpenDocument. <br><br> Tukaj vstavite celotno pot imenikov. <br> Dodajte prelom vrstice CR med med vsako mapo. <br> Če želite dodati mapo GED modula, dodajte tukaj <b>DOL_DATA_ROOT/ecm/imevašemape.</b> <br><br> Datoteke v teh mapah morajo imeti končnico <b>.odt</b>
admin_NumberOfModelFilesFound                                                   : Število ODT predlog v teh mapah
admin_ExampleOfDirectoriesForModelGen                                           : Primeri sintakse:<br>c:\mydir<br>/home/mydir <br>DOL_DATA_ROOT/ecm/ecmdir
admin_FollowingSubstitutionKeysCanBeUsed                                        : Z dodatkom takih oznak v predlogo, boste ob kreiranju dokumenta dobili personalizirane vrednosti:
admin_FullListOnOnlineDocumentation                                             : http://wiki.dolibarr.org
admin_FirstnameNamePosition                                                     : Položaj imena/priimka
admin_DescWeather                                                               : Ko bo število zamujenih aktivnosti doseglo navedene vrednosti, bodo na delovni površini prikazani naslednji simboli:
admin_KeyForWebServicesAccess                                                   : Ključi za uporabo Web storitev (parameter "dolibarrkey" v internetnih storitvah)
admin_TestSubmitForm                                                            : Vnos testnega obrazca
admin_ThisForceAlsoTheme                                                        : S tem upravljalnikom menija bo uporabljena tudi lastna tema po izboru uporabnika. Prav tako ta upravljalnik menijev, specializiran za pametne telefone, ne deluje na vseh pametnih telefonih. Če imate težave z vašim upravljalnikom menijev, uporabite drugega.
admin_ThemeDir                                                                  : Mapa s preoblekami
admin_ConnectionTimeout                                                         : Časovna omejitev povezave
admin_ResponseTimeout                                                           : Časovna omejitev odziva
admin_SmsTestMessage                                                            : Testno sporočilo od __PHONEFROM__ za __PHONETO__
admin_ModuleMustBeEnabledFirst                                                  : Pred prvo uporabo te funkcije mora biti omogočen modul <b>%s</b> .
admin_SecurityToken                                                             : Ključ za šifriranje url
admin_NoSmsEngine                                                               : Na voljo ni nobenega upravljalnika SMS pošiljanja. Upravljalniki SMS pošiljanja niso nameščeni z običajno distribucijo (ker so odvisni od zunanjih dobaviteljev), vendar nekatere lahko najdete na http://www.dolistore.com
admin_PDF                                                                       : PDF
admin_PDFDesc                                                                   : Nastavite lahko vsak globalne možnosti, povezanih z PDF generacije
admin_PDFAddressForging                                                         : Pravila oblikovati naslov polja
admin_HideAnyVATInformationOnPDF                                                : Skrij vse informacije v zvezi z DDV za nastali PDF
admin_HideDescOnPDF                                                             : Hide products description on generated PDF
admin_HideRefOnPDF                                                              : Hide products ref. on generated PDF
admin_HideDetailsOnPDF                                                          : Hide products lines details on generated PDF
admin_UrlGenerationParameters                                                   : Parametri za zagotovitev URL
admin_SecurityTokenIsUnique                                                     : Uporabite edinstven parameter securekey za vsako URL
admin_EnterRefToBuildUrl                                                        : Vnesite sklic za predmet %s
admin_GetSecuredUrl                                                             : Get izračuna URL
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
admin_Module0Name                                                               : Uporabniki & skupine
admin_Module0Desc                                                               : Upravljanje uporabnikov in skupin
admin_Module1Name                                                               : Partnerji
admin_Module1Desc                                                               : Upravljanje podjetij in kontaktov
admin_Module2Name                                                               : Komerciala
admin_Module2Desc                                                               : Upravljanje komerciale
admin_Module10Name                                                              : Računovodstvo
admin_Module10Desc                                                              : Upravljanje enostavnega računovodstva (računi in plačila)
admin_Module20Name                                                              : Ponudbe
admin_Module20Desc                                                              : Upravljanje komercialnih ponudb
admin_Module22Name                                                              : Masovno E-pošiljanje
admin_Module22Desc                                                              : Upravljanje masovnega E-pošiljanja
admin_Module23Name                                                              : Energija
admin_Module23Desc                                                              : Nadzor porabe energije
admin_Module25Name                                                              : Naročila kupcev
admin_Module25Desc                                                              : Upravljanje naročil kupcev
admin_Module30Name                                                              : Računi
admin_Module30Desc                                                              : Upravljanje računov in dobropisov za kupce. Upravljanje računov dobaviteljev
admin_Module40Name                                                              : Dobavitelji
admin_Module40Desc                                                              : Upravljanje dobaviteljev in nabava (naročila in računi)
admin_Module42Name                                                              : Sistemski dnevniki (syslog)
admin_Module42Desc                                                              : Možnosti za prijavljanje (syslog)
admin_Module49Name                                                              : Urejevalniki
admin_Module49Desc                                                              : Upravljanje urejevalnikov
admin_Module50Name                                                              : Proizvodi
admin_Module50Desc                                                              : Upravljanje proizvodov
admin_Module51Name                                                              : Masovno pošiljanje
admin_Module51Desc                                                              : Upravljanje masovnega pošiljanja po klasični pošti
admin_Module52Name                                                              : Zaloge
admin_Module52Desc                                                              : Upravljanje zalog proizvodov
admin_Module53Name                                                              : Storitve
admin_Module53Desc                                                              : Upravljanje storitev
admin_Module54Name                                                              : Pogodbe
admin_Module54Desc                                                              : Upravljanje pogodb in storitev
admin_Module55Name                                                              : Črtne kode
admin_Module55Desc                                                              : Upravljanje črtnih kod
admin_Module56Name                                                              : Telefonija
admin_Module56Desc                                                              : Integracija telefonije
admin_Module57Name                                                              : Trajniki
admin_Module57Desc                                                              : Upravljanje trajnikov in dvigov
admin_Module58Name                                                              : Klic s klikom
admin_Module58Desc                                                              : Integracija klica s klikom
admin_Module59Name                                                              : Vaš zaznamek
admin_Module59Desc                                                              : Dodajanje funkcije za generiranje konta vašega zaznamka s konta Dolibarr account
admin_Module70Name                                                              : Intervencije
admin_Module70Desc                                                              : Upravljanje intervencij
admin_Module75Name                                                              : Stroški in potni nalogi
admin_Module75Desc                                                              : Upravljanje stroškov in potnih nalogov
admin_Module80Name                                                              : Pošiljanja
admin_Module80Desc                                                              : Upravljanje pošiljanja in dobavnic
admin_Module85Name                                                              : Banka in gotovina
admin_Module85Desc                                                              : Upravljanje bančnih in gotovinskih računov
admin_Module100Name                                                             : Zunanja stran
admin_Module100Desc                                                             : Vključi vsako zunanjo spletno stran v Dolibarr meni in jo prikaži v Dolibarr okvirju
admin_Module105Name                                                             : Mailman in SPIP
admin_Module105Desc                                                             : Mailman ali SPIP vmesnik za modul člana
admin_Module200Name                                                             : LDAP
admin_Module200Desc                                                             : Sinhronizacija LDAP mape
admin_Module210Name                                                             : PostNuke
admin_Module210Desc                                                             : Integracija PostNuke
admin_Module240Name                                                             : Izvoz podatkov
admin_Module240Desc                                                             : Orodje za izvoz Dolibarr podatkov (s pomočniki)
admin_Module250Name                                                             : Uvoz podatkov
admin_Module250Desc                                                             : Orodje za uvoz podatkov v Dolibarr  (s pomočniki)
admin_Module310Name                                                             : Člani
admin_Module310Desc                                                             : Upravljanje članov ustanove
admin_Module320Name                                                             : Vir RSS
admin_Module320Desc                                                             : Dodajanje vira RSS na prikazane Dolibarr strani
admin_Module330Name                                                             : Zaznamki
admin_Module330Desc                                                             : Upravljanje zaznamkov
admin_Module400Name                                                             : Projekti
admin_Module400Desc                                                             : Upravljanje projektov znotraj drugih modulov
admin_Module410Name                                                             : Internetni koledar
admin_Module410Desc                                                             : Integracija internetnega koledarja
admin_Module420Name                                                             : Affaires
admin_Module420Desc                                                             : Gestion des affaires
admin_Module430Name                                                             : Gestion d'équipes
admin_Module430Desc                                                             : Gestion des objectifs
admin_Module500Name                                                             : Davki, socialni prispevki in dividende
admin_Module500Desc                                                             : Upravljanje davkov in socialnih prispevkov
admin_Module600Name                                                             : Obvestila
admin_Module600Desc                                                             : Pošiljanje obvestil o nekaterih Dolibarr dogodkih po e-mailu kontaktom pri partnerjih
admin_Module700Name                                                             : Donacije
admin_Module700Desc                                                             : Upravljanje donacij
admin_Module1400Name                                                            : Računovodstvo
admin_Module1400Desc                                                            : Upravljanje računovodstva (dvostavno)
admin_Module1780Name                                                            : Kategorije
admin_Module1780Desc                                                            : Upravljanje kategorij (proizvodi, dobavitelji in kupci)
admin_Module2000Name                                                            : Fck urejevalnik
admin_Module2000Desc                                                            : WYSIWYG urejevalnik
admin_Module2200Name                                                            : Kreditne pravice
admin_Module2200Desc                                                            : Upravljanje kreditnih pravic
admin_Module2300Name                                                            : Meniji
admin_Module2300Desc                                                            : Upravljanje menijev
admin_Module2400Name                                                            : Dnevni red
admin_Module2400Desc                                                            : Upravljanje aktivnosti/nalog in dnevnih redov
admin_Module2500Name                                                            : Upravljanje elektronskih vsebin
admin_Module2500Desc                                                            : Shranjevanje dokumentov in dajanje v skupno rabo
admin_Module2600Name                                                            : Spletne storitve
admin_Module2600Desc                                                            : Omogočanje Dolibarr strežnika za spletne storitve
admin_Module2700Name                                                            : Gravatar
admin_Module2700Desc                                                            : Uporaba online Gravatar storitev (www.gravatar.com) za prikaz fotografij uporabnikov/članov (na osnovi njihovih emailov). Potreben je internetni dostop
admin_Module2900Name                                                            : GeoIPMaxmind
admin_Module2900Desc                                                            : Možnost konverzije GeoIP Maxmind
admin_Module5000Name                                                            : Skupine podjetij
admin_Module5000Desc                                                            : Omogoča upravljaje skupine podjetij
admin_Module20000Name                                                           : Holidays
admin_Module20000Desc                                                           : Declare and follow employees holidays
admin_Module50000Name                                                           : PayBox
admin_Module50000Desc                                                           : Modul za omogočanje strani za spletno plačevanje s kreditno kartico - PayBox
admin_Module50100Name                                                           : Prodajalne
admin_Module50100Desc                                                           : Modul za prodajalne
admin_Module50200Name                                                           : Paypal
admin_Module50200Desc                                                           : Modul za omogočanje strani za spletno plačevanje s kreditno kartico - Paypal
admin_Module59000Name                                                           : Margins
admin_Module59000Desc                                                           : Module to manage margins
admin_Module60000Name                                                           : Commissions
admin_Module60000Desc                                                           : Module to manage commissions
admin_Permission11                                                              : Branje računov
admin_Permission12                                                              : Kreiranje/Spreminjanje računov
admin_Permission13                                                              : Preklic potrditve računov
admin_Permission14                                                              : Potrjevanje računov
admin_Permission15                                                              : Pošiljanje računov po emailu
admin_Permission16                                                              : Plačevanje računov
admin_Permission19                                                              : Brisanje računov
admin_Permission21                                                              : Branje komercialnih ponudb
admin_Permission22                                                              : Kreiranje/spreminjanje komercialnih ponudb
admin_Permission24                                                              : Potrjevanje komercialnih ponudb
admin_Permission25                                                              : Pošiljanje komercialnih ponudb
admin_Permission26                                                              : Zaključevanje komercialnih ponudb
admin_Permission27                                                              : Brisanje komercialnih ponudb
admin_Permission28                                                              : Izvoz komercialnih ponudb
admin_Permission31                                                              : Branje proizvodov
admin_Permission32                                                              : Kreiranje/spreminjanje proizvodov
admin_Permission34                                                              : Brisanje proizvodov
admin_Permission36                                                              : Pregled/upravljanje skritih proizvodov
admin_Permission38                                                              : Izvoz proizvodov
admin_Permission41                                                              : Branje projektov in nalog
admin_Permission42                                                              : Kreiranje/spreminjanje projektov, urejanje nalog v mojih projektih
admin_Permission44                                                              : Brisanje projektov
admin_Permission61                                                              : Branje intervencij
admin_Permission62                                                              : Kreiranje/spreminjanje intervencij
admin_Permission64                                                              : Delete intervencij
admin_Permission67                                                              : Izvoz intervencij
admin_Permission71                                                              : Branje članov
admin_Permission72                                                              : Kreiranje/spreminjanje članov
admin_Permission74                                                              : Brisanje članov
admin_Permission75                                                              : Vrste nastavitev in atributov za člane
admin_Permission76                                                              : Izvoz podatkov
admin_Permission78                                                              : Branje naročnin
admin_Permission79                                                              : Kreiranje/spreminjanje naročnin
admin_Permission81                                                              : Branje naročil kupcev
admin_Permission82                                                              : Kreiranje/spreminjanje naročil kupcev
admin_Permission84                                                              : Potrjevanje naročil kupcev
admin_Permission86                                                              : Pošiljanje naročil kupcev
admin_Permission87                                                              : Zapiranje naročil kupcev
admin_Permission88                                                              : Preklic naročil kupcev
admin_Permission89                                                              : Brisanje naročil kupcev
admin_Permission91                                                              : Branje socialnih prispevkov in DDV
admin_Permission92                                                              : Kreiranje/spreminjanje socialnih prispevkov in DDV
admin_Permission93                                                              : Brisanje socialnih prispevkov in DDV
admin_Permission94                                                              : Izvoz socialnih prispevkov
admin_Permission95                                                              : Branje poročil
admin_Permission96                                                              : Nastavitve odpreme
admin_Permission97                                                              : Branje odposlanih računovodskih listin
admin_Permission98                                                              : Branje postavk računovodskih listin
admin_Permission101                                                             : Branje pošiljk
admin_Permission102                                                             : Kreiranje/spreminjanje pošiljk
admin_Permission104                                                             : Potrjevanje pošiljk
admin_Permission109                                                             : Brisanje pošiljk
admin_Permission111                                                             : Branje finančnih postavk
admin_Permission112                                                             : Kreiranje/spreminjanje/brisanje in primerjava transakcij
admin_Permission113                                                             : Nastavitve finančnih kontov (kreiranje, upravljanje kategorij)
admin_Permission114                                                             : Konsolidacija transakcij
admin_Permission115                                                             : Izvoz transakcij in računovodskih izkazov
admin_Permission116                                                             : Transfer med računi
admin_Permission117                                                             : Upravljanje pošiljanja čekov
admin_Permission121                                                             : Branje partnerjev, vezanih na uporabnika
admin_Permission122                                                             : Kreiranje/spreminjanje partnerjev, vezanih na uporabnika
admin_Permission125                                                             : Brisanje partnerjev, vezanih na uporabnika
admin_Permission126                                                             : Izvoz partnerjev
admin_Permission141                                                             : Branje nalog
admin_Permission142                                                             : Ustvarjanje/spreminjanje nalog
admin_Permission144                                                             : Izbris nalog
admin_Permission146                                                             : Brisanje ponudnikov
admin_Permission147                                                             : Branje statistike
admin_Permission151                                                             : Branje tekočih naročil
admin_Permission152                                                             : Nastavitve tekočih naročil
admin_Permission153                                                             : Prenos prejema tekočih naročil
admin_Permission154                                                             : Odobritev/zavrnitev prejema tekočih naročil
admin_Permission161                                                             : Branje pogodb
admin_Permission162                                                             : Kreiranje/spreminjanje pogodb
admin_Permission163                                                             : Aktiviranje pogodbene storitve
admin_Permission164                                                             : Onemogočenje pogodbene storitve
admin_Permission165                                                             : Brisanje pogodb
admin_Permission171                                                             : Branje potnih nalogov
admin_Permission172                                                             : Kreiranje/spreminjanje potnih nalogov
admin_Permission173                                                             : Brisanje potnih nalogov
admin_Permission178                                                             : Izvoz potnih nalogov
admin_Permission180                                                             : Branje dobaviteljev
admin_Permission181                                                             : Branje naročil pri dobaviteljih
admin_Permission182                                                             : Kreiranje/spreminjanje naročil pri dobaviteljih
admin_Permission183                                                             : Potrjevanje naročil pri dobaviteljih
admin_Permission184                                                             : Odobritev naročil pri dobaviteljih
admin_Permission185                                                             : Naročanje naročil pri dobaviteljih
admin_Permission186                                                             : Prejem naročil pri dobaviteljih
admin_Permission187                                                             : Zaključek naročil pri dobaviteljih
admin_Permission188                                                             : Preklic naročil pri dobaviteljih
admin_Permission192                                                             : Kreiranje vrstic
admin_Permission193                                                             : Preklic vrstic
admin_Permission194                                                             : Branje vrstic pasovne širine
admin_Permission202                                                             : Kreiranje ADSL povezav
admin_Permission203                                                             : Naročanje povezovalnih naročil
admin_Permission204                                                             : Naročanje povezav
admin_Permission205                                                             : Upravljanje povezav
admin_Permission206                                                             : Branje povezav
admin_Permission211                                                             : Branje telefonije
admin_Permission212                                                             : Naročanje linij
admin_Permission213                                                             : Aktiviranje linij
admin_Permission214                                                             : Nastavitve telefonije
admin_Permission215                                                             : Nastavitev ponudnikov
admin_Permission221                                                             : Branje e-pošiljanja
admin_Permission222                                                             : Kreiranje/spreminjanje e-pošiljanja (predmet, prejemnik...)
admin_Permission223                                                             : Potrjevanje e-pošiljanja (dovoljuje pošiljanje)
admin_Permission229                                                             : Brisanje e-pošiljanja
admin_Permission237                                                             : View recipients and info
admin_Permission238                                                             : Manually send mailings
admin_Permission239                                                             : Delete mailings after validation or sent
admin_Permission241                                                             : Branje kategorij
admin_Permission242                                                             : Kreiranje/spreminjanje kategorij
admin_Permission243                                                             : Delete kategorij
admin_Permission244                                                             : Ogled vsebine skritih kategorij
admin_Permission251                                                             : Branje ostalih uporabnikov ali skupin
admin_PermissionAdvanced251                                                     : Branje ostalih uporabnikov
admin_Permission252                                                             : Kreiranje/spreminjanje ostalih uporabnikov, skupin in dovoljenj
admin_Permission253                                                             : Spreminjanje gesel ostalih uporabnikov
admin_PermissionAdvanced253                                                     : Kreiranje/spreminjanje notranjih/zunanjih uporabnikov in dovoljenj
admin_Permission254                                                             : Brisanje ali onemogočenje ostalih uporabnikov
admin_Permission255                                                             : Kreiranje/spreminjanje lastnih uporabniških informacij
admin_Permission256                                                             : Spreminjanje lastnega gesla
admin_Permission262                                                             : Razširjen dostop do vseh partnerjev (ne samo tistih, ki so povezani z uporabnikom). Ne velja za zunanje uporabnike (vedno omejeni samo na njihove partnerje).
admin_Permission271                                                             : Branje CA
admin_Permission272                                                             : Branje računov
admin_Permission273                                                             : Izdaja računov
admin_Permission281                                                             : Branje kontaktov
admin_Permission282                                                             : Kreiranje/spreminjanje kontaktov
admin_Permission283                                                             : Brisanje kontaktov
admin_Permission286                                                             : Izvoz kontaktov
admin_Permission291                                                             : Branje tarif
admin_Permission292                                                             : Nastavitev dovoljenj za tarife
admin_Permission293                                                             : Spreminjanje tarif kupcev
admin_Permission300                                                             : Branje črtnih kod
admin_Permission301                                                             : Kreiranje/spreminjanje črtnih kod
admin_Permission302                                                             : Brisanje črtnih kod
admin_Permission311                                                             : Branje storitev
admin_Permission312                                                             : Dodelitev storitve pogodbi
admin_Permission331                                                             : Branje zaznamkov
admin_Permission332                                                             : Kreiranje/spreminjanje zaznamkov
admin_Permission333                                                             : Brisanje zaznamkov
admin_Permission341                                                             : Branje lastnih dovoljenj
admin_Permission342                                                             : Kreiranje/spreminjanje lastnih uporabniških informacij
admin_Permission343                                                             : Spreminjanje lastnih gesel
admin_Permission344                                                             : Spreminjanje lastnih dovoljenj
admin_Permission351                                                             : Branje skupin
admin_Permission352                                                             : Branje skupinskih dovoljenj
admin_Permission353                                                             : Kreiranje/spreminjanje skupin
admin_Permission354                                                             : Brisanje ali onemogočanje skupin
admin_Permission358                                                             : Izvoz uporabnikov
admin_Permission401                                                             : Branje popustov
admin_Permission402                                                             : Kreiranje/spreminjanje popustov
admin_Permission403                                                             : Potrjevanje popustov
admin_Permission404                                                             : Brisanje popustov
admin_Permission531                                                             : Branje storitev
admin_Permission532                                                             : Kreiranje/spreminjanje storitev
admin_Permission534                                                             : Brisanje storitev
admin_Permission536                                                             : Pregled/upravljanje skritih storitev
admin_Permission538                                                             : Izvoz storitev
admin_Permission701                                                             : Branje donacij
admin_Permission702                                                             : Kreiranje/spreminjanje donacij
admin_Permission703                                                             : Delete donacij
admin_Permission1001                                                            : Branje zalog
admin_Permission1002                                                            : Kreiranje/spreminjanje zalog
admin_Permission1003                                                            : Brisanje
admin_Permission1004                                                            : Branje gibanja zalog
admin_Permission1005                                                            : Kreiranje/spreminjanje gibanja zalog
admin_Permission1101                                                            : Branje dobavnic
admin_Permission1102                                                            : Kreiranje/spreminjanje dobavnic
admin_Permission1104                                                            : Potrjevanje dobavnic
admin_Permission1109                                                            : Brisanje dobavnic
admin_Permission1181                                                            : Branje dobaviteljev
admin_Permission1182                                                            : Branje naročil pri dobaviteljih
admin_Permission1183                                                            : Kreiranje naročil pri dobaviteljih
admin_Permission1184                                                            : Potrjevanje naročil pri dobaviteljih
admin_Permission1185                                                            : Odobritev naročil pri dobaviteljih
admin_Permission1186                                                            : Naročanje naročil pri dobaviteljih
admin_Permission1187                                                            : Prevzemanje naročil pri dobaviteljih
admin_Permission1188                                                            : Zaključevanje naročil pri dobaviteljih
admin_Permission1201                                                            : pregled rezultatov izvoza
admin_Permission1202                                                            : Kreiranje/spreminjanje izvoza
admin_Permission1231                                                            : Branje računov dobavitelja
admin_Permission1232                                                            : Kreiranje računov dobavitelja
admin_Permission1233                                                            : Potrjevanje računov dobavitelja
admin_Permission1234                                                            : Brisanje računov dobavitelja
admin_Permission1235                                                            : Pošiljanje računa dobavitelja po emailu
admin_Permission1236                                                            : Izvoz računov dobavitelja, atributov in plačil
admin_Permission1237                                                            : Export supplier orders and their details
admin_Permission1251                                                            : Izvajanje masovnega izvoza zunanjih podatkov v bazo podatkov (nalaganje podatkov)
admin_Permission1321                                                            : Izvoz računov za kupce, atributov in plačil
admin_Permission1401                                                            : Lire le plan de compte
admin_Permission1402                                                            : Créer/modifier un plan de compte
admin_Permission1403                                                            : Clôturer un plan de compte
admin_Permission1411                                                            : Lire les mouvements comptables
admin_Permission1412                                                            : Créer/modifier/annuler les mouvements comptables
admin_Permission1415                                                            : Lire CA, bilans, résultats, journaux, grands livres
admin_Permission1421                                                            : Izvoz naročil kupcev in atributov
admin_Permission2401                                                            : Branje aktivnosti (dogodki ali naloge) povezanih s tem uporabnikom
admin_Permission2402                                                            : Kreiranje/spreminjanje aktivnosti (dogodki ali naloge) povezanih s tem uporabnikom
admin_Permission2403                                                            : Brisanje aktivnosti (dogodki ali naloge) povezanih s tem uporabnikom
admin_Permission2411                                                            : Branje aktivnosti (dogodki ali naloge) ostalih
admin_Permission2412                                                            : Kreiranje/spreminjanje aktivnosti (dogodki ali naloge) ostalih
admin_Permission2413                                                            : Delete aktivnosti (dogodki ali naloge) ostalih
admin_Permission2501                                                            : Branje dokumentov
admin_Permission2502                                                            : Pošiljanje ali brisanje dokumentov
admin_Permission2503                                                            : Pošiljanje ali brisanje dokumentov
admin_Permission2515                                                            : Nastavitve map dokumentov
admin_Permission2801                                                            : Use FTP client in read mode (browse and download only)
admin_Permission2802                                                            : Use FTP client in write mode (delete or upload files)
admin_Permission50101                                                           : Use Point of sales
admin_Permission50201                                                           : Branje prenosov
admin_Permission50202                                                           : Uvoz prenosov
admin_DictionnaryCompanyType                                                    : Tipi podjetij
admin_DictionnaryCompanyJuridicalType                                           : Pravna oblika podjetja
admin_DictionnaryProspectLevel                                                  : Nivo potenciala možne stranke
admin_DictionnaryCanton                                                         : Dežele/kantoni
admin_DictionnaryRegion                                                         : Regije
admin_DictionnaryCountry                                                        : Države
admin_DictionnaryCurrency                                                       : Valute
admin_DictionnaryCivility                                                       : Vljudnostni nazivi
admin_DictionnaryActions                                                        : Seznam aktivnosti
admin_DictionnarySocialContributions                                            : Vrste socialnih prispevkov
admin_DictionnaryVAT                                                            : Stopnje DDV
admin_DictionnaryPaymentConditions                                              : Pogoji plačil
admin_DictionnaryPaymentModes                                                   : Načini plačil
admin_DictionnaryTypeContact                                                    : Tipi kontaktov
admin_DictionnaryEcotaxe                                                        : Ecotax (WEEE)
admin_DictionnaryPaperFormat                                                    : Formati papirja
admin_DictionnaryFees                                                           : Tipi stroškov
admin_DictionnarySendingMethods                                                 : Načini pošiljanja
admin_DictionnaryStaff                                                          : Zaposleni
admin_DictionnaryAvailability                                                   : Zakasnitev dobave
admin_DictionnaryOrderMethods                                                   : Metode naročanja
admin_DictionnarySource                                                         : Izvor ponudb/naročil
admin_DictionnaryAccountancyplan                                                : Chart of accounts
admin_DictionnaryAccountancysystem                                              : Models for chart of accounts
admin_SetupSaved                                                                : Nastavitve shranjene
admin_BackToModuleList                                                          : Nazaj na seznam modulov
admin_BackToDictionnaryList                                                     : Nazaj na seznam slovarjev
admin_VATReceivedOnly                                                           : Posebna stopnja ni zaračunana
admin_VATManagement                                                             : Upravljanje DDV
admin_VATIsUsedDesc                                                             : Privzeta stopnja DDV pri kreiranju možnih strank, računov, naročil itd. sledi aktivnemu standardnemu pravilu:<br>Če je prodajalec davčni zavezanec, je privzeta stopnja DDV=0. Konec pravila.<br>Če je (država prodaje = država nakupa), potem je privzeta davčna stopnja=DDV v državi prodaje. Konec pravila. <br>Če sta prodajalec in kupec iz držav članic EU in se blago prevaža s transportnim sredstvom (avto, ladja, letalo), je privzeta stopnja DDV=0 ( DDV mora plačati kupec pri carinskem uradu svoje države in ne prodajalec blaga). Konec pravila.<br> Če sta prodajalec in kupec iz držav članic EU in se blago ne prevaža s transportnim sredstvom, je privzeta stopnja DDV=DDV prodanega proizvoda.  Konec pravila.<br>Drugače je predlagan privzet DDV=1. Konec pravila.
admin_VATIsNotUsedDesc                                                          : Privzeta predlagana stopnja DDV je 0, kar se lahko uporabi za primere kot so združenja, posamezniki ali majhna podjetja.
admin_VATIsUsedExampleFR                                                        : V Franciji to pomeni podjetja ali organizacije, ki imajo realen fiskalni sistem (poenostavljen realen ali normalen realen), v katerem mora biti DDV prikazan.
admin_VATIsNotUsedExampleFR                                                     : V Franciji to pomeni združenja, ki niso davčni zavezanci ali podjetja, organizacije ali svobodni poklici, ki so izbrali davčni sistem za mikro podjetja (franšizni DDV) in plačajo franšizni DDV brez davčne izjave.  Ta izbira prikaže na računu opombo "DDV ni obračunan v skladu z …".
admin_LocalTax1ManagementES                                                     : RE Management
admin_LocalTax1IsUsedDescES                                                     : RE obrestno mero za zamudne pri ustvarjanju možnosti, izdajanje računov, naročila itd sledijo aktivni standard pravilo: <br> Če se te kupec ne veljajo RE, RE privzeto = 0. Konec pravila. <br> Če je kupec opravi potem RE RE privzeto. Konec pravila. <br>
admin_LocalTax1IsNotUsedDescES                                                  : Privzeto predlagani RE je 0. Konec pravila.
admin_LocalTax1IsUsedExampleES                                                  : V Španiji so strokovnjaki, z nekaterimi posebnimi deli španskega IAE.
admin_LocalTax1IsNotUsedExampleES                                               : V Španiji so strokovno in družb in ob upoštevanju nekaterih odsekih španske IAE.
admin_LocalTax2ManagementES                                                     : IRPF Management
admin_LocalTax2IsUsedDescES                                                     : RE obrestno mero za zamudne pri ustvarjanju možnosti, izdajanje računov, naročila itd sledijo aktivni standard pravilo: <br> Če prodajalec ne veljajo IRPF, potem IRPF privzeto = 0. Konec pravila. <br> Če je prodajalec opravi IRPF nato IRPF privzeto. Konec pravila. <br>
admin_LocalTax2IsNotUsedDescES                                                  : Privzeto predlagani IRPF je 0. Konec pravila.
admin_LocalTax2IsUsedExampleES                                                  : V Španiji, samostojnimi in neodvisni strokovnjaki, ki opravljajo storitve in podjetja, ki so se odločili davčni sistem modulov.
admin_LocalTax2IsNotUsedExampleES                                               : V Španiji so poslovne niso predmet davčnega sistema modulov.
admin_LabelUsedByDefault                                                        : Privzet naziv, če za kodo ne obstaja prevod
admin_LabelOnDocuments                                                          : Naslov na dokumentu
admin_NbOfDays                                                                  : Število dni
admin_AtEndOfMonth                                                              : Na koncu meseca
admin_Offset                                                                    : Odmik
admin_AlwaysActive                                                              : Vedno aktiven
admin_UpdateRequired                                                            : Vaš sistem je potrebno posodobiti. To storite s klikom na<a href="%s">Posodobi zdaj</a>.
admin_Upgrade                                                                   : Nadgradnja
admin_MenuUpgrade                                                               : Nadgradnja/razširitev
admin_AddExtensionThemeModuleOrOther                                            : Dodaj razširitev (tema, modul, ...)
admin_WebServer                                                                 : Spletni strežnik
admin_DocumentRootServer                                                        : Korenska mapa spletnega strežnika
admin_DataRootServer                                                            : Mapa s podatkovnimi datotekami
admin_IP                                                                        : IP
admin_Port                                                                      : Vrata
admin_VirtualServerName                                                         : Ime virtualnega strežnika
admin_AllParameters                                                             : Vsi parametri
admin_OS                                                                        : OS
admin_Php                                                                       : Php
admin_PhpEnv                                                                    : Env
admin_PhpModules                                                                : Moduli
admin_PhpConf                                                                   : Conf
admin_PhpWebLink                                                                : Web-Php link
admin_Pear                                                                      : Pear
admin_PearPackages                                                              : Pear paketi
admin_Database                                                                  : Baza podatkov
admin_DatabaseServer                                                            : Strežnik za bazo podatkov
admin_DatabaseName                                                              : Ime baze podatkov
admin_DatabasePort                                                              : Vhod baze podatkov
admin_DatabaseUser                                                              : Uporabnik baze podatkov
admin_DatabasePassword                                                          : Geslo za bazo podatkov
admin_DatabaseConfiguration                                                     : Nastavitve baze podatkov
admin_Tables                                                                    : Tabele
admin_TableName                                                                 : Ime tabele
admin_TableLineFormat                                                           : Format linije
admin_NbOfRecord                                                                : Število zapisov
admin_Constraints                                                               : Omejitve
admin_ConstraintsType                                                           : Tipi omejitev
admin_ConstraintsToShowOrNotEntry                                               : Omejitev ali se menijskih vnosi prikažejo ali ne
admin_AllMustBeOk                                                               : Vsi morajo biti označeni
admin_Host                                                                      : Server
admin_DriverType                                                                : Tip gonilnika
admin_SummarySystem                                                             : Povzetek sistemskih informacij
admin_SummaryConst                                                              : Seznam vseh Dolibarr nastavitvenih parametrov
admin_SystemUpdate                                                              : Posodobitev sistema
admin_SystemSuccessfulyUpdate                                                   : Vaš sistem je bil uspešno posodobljen
admin_MenuCompanySetup                                                          : Podjetje/ustanova
admin_MenuNewUser                                                               : Nov uporabnik
admin_MenuTopManager                                                            : Vmesnik za zgornji meni
admin_MenuLeftManager                                                           : Vmesnik za levi meni
admin_MenuManager                                                               : Gestionnaire du menu standard
admin_MenuSmartphoneManager                                                     : Vmesnik za Smartphone meni
admin_DefaultMenuTopManager                                                     : Vmesnik za zgornji meni
admin_DefaultMenuLeftManager                                                    : Vmesnik za levi meni
admin_DefaultMenuManager                                                        : Vmesnik za standardni meni
admin_DefaultMenuSmartphoneManager                                              : Vmesnik za Smartphone meni
admin_Skin                                                                      : Tema preobleke
admin_DefaultSkin                                                               : Privzeta tema preobleke
admin_MaxSizeList                                                               : Največja dolžina seznama
admin_DefaultMaxSizeList                                                        : Privzeta največja dolžina seznama
admin_MessageOfDay                                                              : Sporočilo dneva
admin_MessageLogin                                                              : Sporočilo na prijavni strani
admin_PermanentLeftSearchForm                                                   : Stalno polje za iskanje na levem meniju
admin_DefaultLanguage                                                           : Privzet jezik uporabe (koda jezika)
admin_EnableMultilangInterface                                                  : Omogočen večjezični vmesnik
admin_EnableShowLogo                                                            : Prikaži logo na levem meniju
admin_SystemSuccessfulyUpdated                                                  : Vaš sistem je bil uspešno posodobljen
admin_CompanyInfo                                                               : Informacije o podjetju/ustanovi
admin_CompanyIds                                                                : Registracijski podatki o podjetju/ustanovi
admin_CompanyName                                                               : Ime podjetja
admin_CompanyAddress                                                            : Naslov
admin_CompanyZip                                                                : Poštna številka
admin_CompanyTown                                                               : Mesto
admin_CompanyCountry                                                            : Država
admin_CompanyCurrency                                                           : Osnovna valuta
admin_DoNotShow                                                                 : Ne prikaži
admin_DoNotSuggestPaymentMode                                                   : Ne predlagaj
admin_NoActiveBankAccountDefined                                                : Ni definiran aktivni bančni račun
admin_OwnerOfBankAccount                                                        : Lastnik bančnega računa %s
admin_BankModuleNotActive                                                       : Modul za bančne račune ni omogočen
admin_ShowBugTrackLink                                                          : Prikaži povezavo "Sporoči hrošča"
admin_ShowWorkBoard                                                             : Prikaži "delovno površino" na domači strani
admin_Alerts                                                                    : Opozorila
admin_Delays                                                                    : Zakasnitve
admin_DelayBeforeWarning                                                        : Zakasnitev pred opozorilom
admin_DelaysBeforeWarning                                                       : Zakasnitve pred opozorilom
admin_DelaysOfToleranceBeforeWarning                                            : Toleranca zakasnitve pred opozorilom
admin_DelaysOfToleranceDesc                                                     : Ta zaslon omogoča definicijo tolerance zakasnitve preden se opozorilo prikaže na zaslonu v obliki piktograma %s za vsak zakasnjen element.
admin_Delays_MAIN_DELAY_ACTIONS_TODO                                            : Toleranca zakasnitve (v dnevih) pred opozorilom na še nerealizirano planirano aktivnost
admin_Delays_MAIN_DELAY_ORDERS_TO_PROCESS                                       : Toleranca zakasnitve (v dnevih) pred opozorilom na še nedokončana naročila
admin_Delays_MAIN_DELAY_SUPPLIER_ORDERS_TO_PROCESS                              : Toleranca zakasnitve (v dnevih) pred opozorilom na še nedokončana naročila pri dobaviteljih
admin_Delays_MAIN_DELAY_PROPALS_TO_CLOSE                                        : Toleranca zakasnitve (v dnevih) pred opozorilom na ponudbe, ki jih je treba zaključiti
admin_Delays_MAIN_DELAY_PROPALS_TO_BILL                                         : Toleranca zakasnitve (v dnevih) pred opozorilom na nefakturirane ponudbe
admin_Delays_MAIN_DELAY_NOT_ACTIVATED_SERVICES                                  : Toleranca zakasnitve (v dnevih) pred opozorilom na storitve, ki jih je potrebno aktivirati
admin_Delays_MAIN_DELAY_RUNNING_SERVICES                                        : Toleranca zakasnitve (v dnevih) pred opozorilom na potečeno storitev
admin_Delays_MAIN_DELAY_SUPPLIER_BILLS_TO_PAY                                   : Toleranca zakasnitve (v dnevih) pred opozorilom na neplačane račune dobavitelju
admin_Delays_MAIN_DELAY_CUSTOMER_BILLS_UNPAYED                                  : Toleranca zakasnitve (v dnevih) pred opozorilom na neplačane račune kupcev
admin_Delays_MAIN_DELAY_TRANSACTIONS_TO_CONCILIATE                              : Toleranca zakasnitve (v dnevih) pred opozorilom na čakajočo uskladitev z banko
admin_Delays_MAIN_DELAY_MEMBERS                                                 : Toleranca zakasnitve (v dnevih) pred opozorilom na zakasnitev plačila članarine
admin_Delays_MAIN_DELAY_CHEQUES_TO_DEPOSIT                                      : Toleranca zakasnitve (v dnevih) pred opozorilom na potrebo po deponiranju čeka
admin_SetupDescription1                                                         : Vsi parametri, ki so na voljo v področju nastavitev, vam omogočajo nastavitev aplikacije Dolibarr pred začetkom uporabe.
admin_SetupDescription2                                                         : Dva najpomembnejša koraka nastavitev sta prva dva na levem meniju, kar pomeni stran za nastavitve podjetja/ustanove in stran za nastanitve modulov:
admin_SetupDescription3                                                         : Parametri na meniju <b>Nastavitve -> Podjetje/ustanova</b> so zahtevani, ker se vnesene informacije uporabljajo na posameznih zaslonih v aplikaciji Dolibarr in za določitev načina delovanja Dolibarr aplikacije (na primer za  funkcije, ki se nanašajo na vašo državo).
admin_SetupDescription4                                                         : Parametri na meniju <b>Nastavitve -> Moduli</b> so zahtevani, ker aplikacija Dolibarr ni fiksirani, temveč skupek različnih modulov, ki so vso bolj ali manj neodvisni. Šele po aktiviranju modulov, ki vas zanimajo, se bodo na menijih pojavile njihove funkcije.
admin_SetupDescription5                                                         : Ostale postavke na meniju so namenjene upravljanju opcijskih parametrov.
admin_EventsSetup                                                               : Nastavitve za dnevnik dogodkov
admin_LogEvents                                                                 : Dogodki v zvezi z nadzorovanjem varnosti
admin_Audit                                                                     : Nadzor
admin_InfoSpeedealing                                                           : Infos Speedealing
admin_InfoOS                                                                    : Infos OS
admin_InfoWebServer                                                             : Infos web server
admin_InfoDatabase                                                              : Infos database
admin_InfoPHP                                                                   : Infos PHP
admin_ListEvents                                                                : Dogodki nadzora
admin_ListOfSecurityEvents                                                      : Seznam varnostnih dogodkov Dolibarr
admin_SecurityEventsPurged                                                      : Varnostni dogodki očistimo
admin_LogEventDesc                                                              : Tukaj lahko omogočite beleženje dnevnika Dolibarr varnostnih dogodkov. Administratorji lahko vidijo njegovo vsebino preko menija <b>Sistemska orodja - Nadzor</b>. Pozor, ta funkcija lahko uporabi veliko količino podatkov iz baze.
admin_AreaForAdminOnly                                                          : Te funkcije lahko uporablja samo <b>administrator</b>.
admin_SystemInfoDesc                                                            : Sistemske informacije so raznovrstne tehnične informacije, ki so na voljo samo v bralnem načinu in jih vidi samo administrator.
admin_SystemAreaForAdminOnly                                                    : To področje je na voljo samo administratorju. Nobeno od Dolibarr dovoljenj ne more spremeniti teh omejitev.
admin_CompanyFundationDesc                                                      : Na tej strani urejate vse znane informacije o podjetju ali ustanovi, ki ga upravljate
admin_DisplayDesc                                                               : Tukaj lahko izberete parametre, ki določajo videz in vtis aplikacije Dolibarr
admin_AvailableModules                                                          : Moduli, ki so na voljo
admin_ToActivateModule                                                          : Za aktivacijo modula, pojdite na področje nastavitev (Domov->Nastavitve->Moduli).
admin_SessionTimeOut                                                            : Potečen čas seje
admin_SessionExplanation                                                        : Ta številka zagotavlja, da seja nikoli ne bo potekla pred to zakasnitvijo. Vendar pa upravljanje PHP sej ne zagotavlja, da bo seja potekla po tej zakasnitvi: To se pojavi, če je zagnan sistem za čiščenje predpomnilnika sej.<br>Opomba: Brez posebej določenega sistema bo interni PHP proces pobrisal seje približno na vsakih <b>%s/%s</b> dostopov, vendar le, med dostopanjem drugih sej.
admin_TriggersAvailable                                                         : Možni prožilci
admin_TriggersDesc                                                              : Prožilci so datoteke, ki spremenijo obnašanje aplikacije Dolibarr ko so skopirani v mapo <b>htdocs/includes/triggers</b>. Zaznajo nove aktivnosti, Ki so bile aktivirane z Dolibarr dogodki (kreiranje novega podjetja, potrjevanje računa, ...).
admin_TriggerDisabledByName                                                     : Prožilci v tej datoteki so onemogočeni s predpono <b>-NORUN</b> v njihovem imenu.
admin_TriggerDisabledAsModuleDisabled                                           : Prožilci v tej datoteki so onemogočeni, ker je onemogočen modul <b>%s</b> .
admin_TriggerAlwaysActive                                                       : Prožilci v tej datoteki so aktivni vedno, ne glede na aktiven Dolibarr module.
admin_TriggerActiveAsModuleActive                                               : Prožilci v tej datoteki so aktivni, ker je omogočen modul <b>%s</b> .
admin_GeneratedPasswordDesc                                                     : Tukaj določite, katero pravilo želite uporabiti za generiranje novega gesla, če ste zahtevali avtomatsko generiranje gesla
admin_DictionnaryDesc                                                           : Tukaj definirate vse referenčne podatke. Vnaprej določene vrednosti lahko dopolnite z vašimi.
admin_ConstDesc                                                                 : Ta stran omogoča urejanje vseh ostalih parametrov, ki niso na voljo na prejšnjih straneh. To so rezervirani parametri za napredne razvijalce ali za odpravljanje težav.
admin_OnceSetupFinishedCreateUsers                                              : Pozor, vi ste Dolibarr administrator. Administrator lahko nastavlja Dolibarr. Za navadno uporabo aplikacije Dolibarr, se priporočajo nastavitve navadnega uporabnika, ki nima administratorskih pravic in ga kreirate preko menija 'Uporabniki & Skupine'.
admin_MiscellanousDesc                                                          : Tukaj definirate vse ostale parametre, povezane z varnostjo.
admin_LimitsSetup                                                               : Nastavitve omejitev/natančnosti
admin_LimitsDesc                                                                : Tukaj lahko definirate omejitve, natančnost in optimizacije, ki jih uporablja Dolibarr
admin_MAIN_MAX_DECIMALS_UNIT                                                    : Največje število decimalk za ceno enote
admin_MAIN_MAX_DECIMALS_TOT                                                     : Največje število decimalk za končno ceno
admin_MAIN_MAX_DECIMALS_SHOWN                                                   : Največje število decimalk za ceno, ki so vidne na zaslonu (Dodajte <b>...</b> za to številko, če želite videti <b>...</b>, kadar je številka skrajšana za prikaz na zaslonu)
admin_MAIN_DISABLE_PDF_COMPRESSION                                              : Uporaba PDF kompresije za generiranje PDF datotek.
admin_MAIN_ROUNDING_RULE_TOT                                                    : Velikost območja zaokroževanja (pri nekaterih državah, kjer se ne zaokrožuje na osnovo 10)
admin_UnitPriceOfProduct                                                        : Neto cena enote proizvoda
admin_TotalPriceAfterRounding                                                   : Skupna cena z davkom po zaokrožitvi
admin_ParameterActiveForNextInputOnly                                           : Parameter bo veljal šele pri naslednjem vnosu.
admin_NoEventOrNoAuditSetup                                                     : Do sedaj še ni bil zabeležen noben varnostno problematičen dogodek. To je lahko normalno, če ni vklopljen nadzor na strani "Nastavitve - Varnost - nadzor".
admin_NoEventFoundWithCriteria                                                  : Noben varnostni dogodek ne obstaja glede na podane kriterije iskanja.
admin_SeeLocalSendMailSetup                                                     : Glejte lokalne nastavitve za pošiljanje pošte
admin_BackupDesc                                                                : Za izdelavo celotne Dolibarr varnostne kopije (backup), morate:
admin_BackupDesc2                                                               : * Shraniti vsebino mape z dokumenti (<b>%s</b>), ki vsebuje vse naložene in generirane datoteke (lahko na primer naredite zip datoteko).
admin_BackupDesc3                                                               : * Shranite vsebino vaše baze podatkov v dump datoteko. Za izvedbo lahko sledite tem napotkom.
admin_BackupDescX                                                               : Arhivsko mapo morate shraniti na varno mesto.
admin_BackupDescY                                                               : Generirano dump datoteko morate shraniti na varno mesto.
admin_BackupPHPWarning                                                          : Backup can't be guaranted with this method. Prefer previous one
admin_RestoreDesc                                                               : Za obnovitev Dolibarr varnostne kopije, morate:
admin_RestoreDesc2                                                              : * Arhivsko datoteko mape z dokumenti (na primer zip datoteko) razpakirajte kot drevesno strukturo map in datotek v novo Dolibarr instalacijo ali v trenutno mapo z dokumenti (<b>%s</b>).
admin_RestoreDesc3                                                              : * Obnovite podatke iz arhivske dump datoteke v bazo podatkov nove Dolibarr instalacije ali v bazo podatkov trenutne instalacije. Pozor, ko je obnova končana, morate za ponovno prijavo uporabiti uporabniško ime/geslo, kakršno je veljalo v trenutku izdelave varnostne kopije. Za obnovitev varnostne kopije baze v trenutno instalacijo, lahko sledite tem napotkom.
admin_RestoreMySQL                                                              : MySQL import
admin_ForcedToByAModule                                                         : To pravilo je postavljeno v <b>%s</b> z aktivnim modulom
admin_PreviousDumpFiles                                                         : Datoteke z varnostnimi kopijami podatkovnih baz, ki so na voljo.
admin_WeekStartOnDay                                                            : Prvi dan v tednu
admin_RunningUpdateProcessMayBeRequired                                         : Kaže, da bo potrebno pognati postopek nadgradnje (Različica programa %s je drugačna, kot različica baze podatkov %s)
admin_YouMustRunCommandFromCommandLineAfterLoginToUser                          : Ta ukaz morate pognati iz ukazne vrstice po prijavi v sistem kot uporabnik <b>%s</b>.
admin_YourPHPDoesNotHaveSSLSupport                                              : SSL funkcije niso na voljo v vašem PHP
admin_DownloadMoreSkins                                                         : Prenos dodatnih preoblek
admin_SimpleNumRefModelDesc                                                     : Prikaže referenčno številko v formatu %syymm-nnnn pri čemer je YY leto, mm mesec in nnnn je zaporedje brez presledkov in brez resetiranja
admin_ShowProfIdInAddress                                                       : Prikaži profesionalni ID z naslovi na dokumentih
admin_TranslationUncomplete                                                     : Delni prevod
admin_SomeTranslationAreUncomplete                                              : Nekateri jeziki so lahko prevedeni samo delno, ali vsebujejo napake. Če jih najdete, lahko popravite tekstovne datoteke<b>.lang</b> v mapi <b>htdocs/langs</b> in jih pošljete na forum <a href="http://www.dolibarr.org/forum" target="_blank">http://www.dolibarr.org</a>.
admin_MenuUseLayout                                                             : Omogočite skrivanje navpičnega menija (opcija javascript ne sme biti izklopljena)
admin_MAIN_DISABLE_METEO                                                        : Onemogočen vremenski prikaz
admin_TestLoginToAPI                                                            : Testna prijava na API
admin_ProxyDesc                                                                 : Nekatere Dolibarr funkcije za svoje delovanje potrebujejo internetni dostop. Tu lahko definirate ustrezne parametre. Če je Dolibarr strežnik za Proxy strežnikom, ti parametri povedo, kako naj Dolibarr dostopa skozenj.
admin_ExternalAccess                                                            : Zunanji dostop
admin_MAIN_PROXY_USE                                                            : Uporabi proxy strežnik (drugače je dostop do interneta direkten)
admin_MAIN_PROXY_HOST                                                           : Ime/naslov proxy strežnika
admin_MAIN_PROXY_PORT                                                           : Vrata proxy strežnika
admin_MAIN_PROXY_USER                                                           : Uporabniško ime za uporabo proxy strežnika
admin_MAIN_PROXY_PASS                                                           : Geslo za uporabo proxy strežnika
admin_DefineHereComplementaryAttributes                                         : Tukaj doloćite vse atribute, ki niso na voljo kot privzeti, vendar želite da so podprti za %s.
admin_ExtraFields                                                               : Koplementarni atributi
admin_ExtraFieldsThirdParties                                                   : Complementary attributes (thirdparty)
admin_ExtraFieldsContacts                                                       : Complementary attributes (contact/address)
admin_ExtraFieldHasWrongValue                                                   : Pripišejo %s ima napačno vrednost.
admin_AlphaNumOnlyCharsAndNoSpace                                               : only alphanumericals characters without space
admin_SendingMailSetup                                                          : Nastavitev pošiljanja z elektronsko pošto
admin_SendmailOptionNotComplete                                                 : Pozor, na nekaterih Linux sistemih mora za pošiljanje pošte z vašega naslova nastavitev vsebovati opcijo -ba (parameter mail.force_extra_parameters v vaši datoteki php.ini). Če nekateri prejemniki nikoli ne dobijo pošte, poskusite popraviti PHP parameter z mail.force_extra_parameters = -ba).
admin_PathToDocuments                                                           : Pot do dokumentov
admin_PathDirectory                                                             : Mapa
admin_SendmailOptionMayHurtBuggedMTA                                            : Funkcija za pošiljanje pošte z uporabo metode &quot;PHP mail DIRECT&quot; bo ustvarila poštno sporočilo, ki ga ni mogoče pravilno razčleniti z nekaterimi, ki so prejemali poštnih strežnikov. Posledica tega je, da so nekatere pošte ne berejo ljudje, ki jih gosti thoose bugged platforme. To je veljalo za nekaj internetnih ponudnikov (npr.: Orange v Franciji). To ni problem v Dolibarr niti v PHP, ampak na prejemanje poštni strežnik. Lahko pa dodate možnost MAIN_FIX_FOR_BUGGED_MTA 1. v setup - drugo spremeniti Dolibarr, da bi se temu izognili. Vendar pa lahko pride do težav z drugimi strežniki, ki spoštujejo strogo standardni SMTP. Druga rešitev (priporočile) je uporaba metode &quot;SMTP socket knjižnice&quot;, ki nima slabosti.
admin_TranslationSetup                                                          : Configuration de la traduction
admin_TranslationDesc                                                           : Choice of language visible on screen can be modified:<br>* Globally from menu <strong>Home - Setup - Display</strong><br>* For user only from tab <strong>User display</strong> of user card (click on login on top of screen).
admin_ClassNotFoundIntoPathWarning                                              : Class %s not found into PHP path
admin_PasswordGenerationStandard                                                : Predlaga geslo, generirano glede na interni Dolibarr algoritem: 8 mest, ki vsebujejo različne številke in male črke.
admin_PasswordGenerationNone                                                    : Ne predlaga nobenega generiranega gesla. Geslo je potrebno vnesti ročno.
admin_UserGroupSetup                                                            : Modul za nastavitve uporabnikov in skupin
admin_GeneratePassword                                                          : Predlog generiranega gesla
admin_RuleForGeneratedPasswords                                                 : Pravilo za generiranje predlaganih gesel ali potrjevanje gesel
admin_DoNotSuggest                                                              : Ne predlagaj nobenega gesla
admin_EncryptedPasswordInDatabase                                               : Dovoljenje šifriranja gesel v bazi podatkov
admin_DisableForgetPasswordLinkOnLogonPage                                      : Ne prikazuj povezave "Ste pozabili geslo?" na strani za prijavo
admin_UsersSetup                                                                : Nastavitve modula uporabnikov
admin_UserMailRequired                                                          : Za kreiranje novega uporabnika je zahtevan EMail naslov
admin_CompanySetup                                                              : Modul za nastavitve podjetij
admin_CompanyCodeChecker                                                        : Modul za generiranje kode partnerjev in kontrolo (kupec ali dobavitelj)
admin_AccountCodeManager                                                        : Modul za generiranje računovodske kode (kupec ali dobavitelj)
admin_ModuleCompanyCodeAquarium                                                 : Predlaga računovodsko kodo, sestavljeno iz "401" in kode dobavitelja za računovodsko kodo dobavitelja, oz. "411" in kode kupca za računovodsko kodo kupca.
admin_ModuleCompanyCodePanicum                                                  : Predlaga prazno računovodsko kodo.
admin_ModuleCompanyCodeDigitaria                                                : Računovodska koda je odvisna od kode partnerja. Koda je sestavljena iz črke "C" prvih 5 znakov kode partnerja.
admin_UseNotifications                                                          : Uporaba sporočil
admin_NotificationsDesc                                                         : Funkcija sporočil po E-pošti omogoča tiho pošiljanje avtomatskih e-mailov o nekaterih Dolibarr dogodkih partnerjem (kupcem ali dobavitelljem), ki so tako konfigurirani. Izbira aktivnega obveščanja in ciljnih kontaktov je možna za enega partnerja ob enem času.
admin_ModelModules                                                              : Predloge dokumentov
admin_DocumentModelOdt                                                          : Ustvari dokumente iz predlog OpenDocuments (.ODT datoteke v programih OpenOffice, KOffice, TextEdit ,...)
admin_WatermarkOnDraft                                                          : Vodni žig na osnutku dokumenta
admin_CompanyIdProfChecker                                                      : Strokovno Id edinstven
admin_MustBeUnique                                                              : Mora biti edinstven?
admin_Miscellanous                                                              : Razno
admin_WebCalSetup                                                               : Nastavitve povezave na internetni koledar
admin_WebCalSyncro                                                              : Dodaj Dolibarr dogodke na internetni koledar
admin_WebCalAllways                                                             : Vedno, brez vprašanj
admin_WebCalYesByDefault                                                        : Na zahtevo (privzeto 'da')
admin_WebCalNoByDefault                                                         : Na zahtevo (privzeto 'ne')
admin_WebCalNever                                                               : Nikoli
admin_WebCalURL                                                                 : URL za dostop do koledarja
admin_WebCalServer                                                              : Strežnik, na katerem gostuje koledarska baza podatkov
admin_WebCalDatabaseName                                                        : Ime baze podatkov
admin_WebCalUser                                                                : Uporabnik, ki dostopa do baze podatkov
admin_WebCalSetupSaved                                                          : Nastavitve internetnega koledarja so bile uspešno shranjene.
admin_WebCalTestOk                                                              : Povezava na strežnik '%s', na bazo '%s', kot uporabnik '%s', je bila uspešna.
admin_WebCalTestKo1                                                             : Povezava na strežnik '%s' je bila uspešna, vendar baza podatkov '%s' ni dosegljiva.
admin_WebCalTestKo2                                                             : Povezava na strtežnik '%s', kot uporabnik '%s', ni uspela.
admin_WebCalErrorConnectOkButWrongDatabase                                      : Povezava je uspela, vendar baza podatkov ni videti kot baza podatkov internetnega koledarja.
admin_WebCalAddEventOnCreateActions                                             : Dodaj koledarski dogodek na kreirane aktivnosti
admin_WebCalAddEventOnCreateCompany                                             : Dodaj koledarski dogodek na kreirana podjetja
admin_WebCalAddEventOnStatusPropal                                              : Dodaj koledarski dogodek na spremembo statusa komercialnih ponudb
admin_WebCalAddEventOnStatusContract                                            : Dodaj koledarski dogodek na spremembo statusa pogodb
admin_WebCalAddEventOnStatusBill                                                : Dodaj koledarski dogodek na spremembo statusa faktur
admin_WebCalAddEventOnStatusMember                                              : Dodaj koledarski dogodek na spremembo statusa članov
admin_WebCalUrlForVCalExport                                                    : Izvozna povezava na <b>%s</b> format je na voljo na naslednji povezavi: %s
admin_WebCalCheckWebcalSetup                                                    : Morda nastavitev modula za internetni koledar ni pravilna.
admin_BillsSetup                                                                : Nastavitve modula za račune
admin_BillsDate                                                                 : Datum računov
admin_BillsNumberingModule                                                      : Modul za številčenje računov in dobropisov
admin_BillsPDFModules                                                           : Modeli obrazcev računov
admin_CreditNoteSetup                                                           : Nastavitve modula za dobropise
admin_CreditNotePDFModules                                                      : Modeli obrazcev dobropisov
admin_CreditNote                                                                : Dobropis
admin_CreditNotes                                                               : Dobropisi
admin_ForceInvoiceDate                                                          : Vsili datum računa kot datum potrditve
admin_DisableRepeatable                                                         : Onemogoči ponavljajoče račune
admin_SuggestedPaymentModesIfNotDefinedInInvoice                                : Privzet predlagan način plačila na računu, če ni definiran drugačen način
admin_EnableEditDeleteValidInvoice                                              : Omogoči možnost urejanja/brisanja veljavnih računov brez plačila
admin_SuggestPaymentByRIBOnAccount                                              : Predlagaj plačilo z nakazilom na račun
admin_SuggestPaymentByChequeToAddress                                           : Predlagaj plačilo s čekom na
admin_FreeLegalTextOnInvoices                                                   : Poljubno besedilo na računu
admin_WatermarkOnDraftInvoices                                                  : Vodni tisk na osnutkih računov (brez, če je prazno)
admin_PropalSetup                                                               : Nastavitve modula za komercialne ponudbe
admin_CreateForm                                                                : Kreiranje obrazcev
admin_NumberOfProductLines                                                      : Število vrstic za proizvode
admin_ProposalsNumberingModules                                                 : Moduli za številčenje komercialnih ponudb
admin_ProposalsPDFModules                                                       : Modeli obrazcev komercialnih ponudb
admin_ClassifiedInvoiced                                                        : Označi kot zaračunano
admin_HideTreadedPropal                                                         : Skrij obravnavano komercialno ponudbo na seznamu
admin_AddShippingDateAbility                                                    : Dodaj možen datum pošiljanja
admin_AddDeliveryAddressAbility                                                 : Dodaj možen datum dobave
admin_UseOptionLineIfNoQuantity                                                 : Vrstica proizvoda/storitve z vrednostjo 0 se smatra kot opcija
admin_FreeLegalTextOnProposal                                                   : Poljubno besedilo na komercialni ponudbi
admin_WatermarkOnDraftProposal                                                  : Vodni tisk na osnutkih komercialnih ponudb (brez, če je prazno)
admin_OrdersSetup                                                               : Nastavitve upravljanja z naročili
admin_OrdersNumberingModules                                                    : Moduli za številčenje naročil
admin_OrdersModelModule                                                         : Modeli obrazcev naročil
admin_HideTreadedOrders                                                         : Skrij obravnavana ali preklicana naročila na seznamu
admin_ValidOrderAfterPropalClosed                                               : Za potrditev naročila po zaključku ponudbe, naj ne bo možno preskočiti začasnega naročila
admin_FreeLegalTextOnOrders                                                     : Poljubno besedilo na naročilih
admin_WatermarkOnDraftOrders                                                    : Vodni tisk na osnutkih naročil (brez, če je prazno)
admin_ClickToDialSetup                                                          : Nastavitve modula za klicanje s klikom
admin_ClickToDialUrlDesc                                                        : Po kliku na piktogram se izvede klic na Url.  Na url lahko uporabite ikono<br><b>__PHONETO__</b> ki predstavlja telefon klicanega<br><b>__PHONEFROM__</b> ki predstavlja telefon klicatelja (vaša številka)<br><b>__LOGIN__</b> ki predstavlja vašo prijavo na klicanje s klikom (določena z vašo uporabniško kodo)<br><b>__PASS__</b> ki predstavlja vaše geslo za klicanje s klikom (določena z vašo uporabniško kodo).
admin_Bookmark4uSetup                                                           : Nastavitve modula vaših zaznamkov
admin_InterventionsSetup                                                        : Nastavitve modula za intervence
admin_FreeLegalTextOnInterventions                                              : Poljubno besedilo na dokumentih za intervencijo
admin_FicheinterNumberingModules                                                : Moduli za številčenje intervenc
admin_TemplatePDFInterventions                                                  : Modeli obrazcev intervencijskih kartic
admin_WatermarkOnDraftInterventionCards                                         : Vodni tisk na dokumentih intervencijskih kartic (brez, če je prazno)
admin_ContractsSetup                                                            : Nastavitev modula za pogodbe
admin_ContractsNumberingModules                                                 : Moduli za številčenje pogodb
admin_MembersSetup                                                              : Nastavitve modula članov
admin_MemberMainOptions                                                         : Glavne opcije
admin_AddSubscriptionIntoAccount                                                : Dodajanje naročnin na bančni ali gotovinski račun bančnega modula
admin_AdherentLoginRequired                                                     : Urejanje uporabniških imen za vse člane
admin_AdherentMailRequired                                                      : Za kreiranje novega člana je obvezen E-Mail
admin_MemberSendInformationByMailByDefault                                      : Kontrolno polje za pošiljanje potrdil članom po pošti (potrditev ali nova naročnina) je privzeto označeno
admin_LDAPSetup                                                                 : Nastavitve LDAP
admin_LDAPGlobalParameters                                                      : Globalni parametri
admin_LDAPUsersSynchro                                                          : Uporabniki
admin_LDAPGroupsSynchro                                                         : Skupine
admin_LDAPContactsSynchro                                                       : Kontakti
admin_LDAPMembersSynchro                                                        : Člani
admin_LDAPSynchronization                                                       : Sinhronizacija LDAP
admin_LDAPFunctionsNotAvailableOnPHP                                            : Funkcije LDAP niso na voljo na vašem PHP
admin_LDAPToSpeedealing                                                         : LDAP -> Speedealing
admin_SpeedealingToLDAP                                                         : Speedealing -> LDAP
admin_LDAPNamingAttribute                                                       : Ključ v LDAP
admin_LDAPSynchronizeUsers                                                      : Organizacija uporabnikov v LDAP
admin_LDAPSynchronizeGroups                                                     : Organizacija skupin v LDAP
admin_LDAPSynchronizeContacts                                                   : Organizacija kontaktov v LDAP
admin_LDAPSynchronizeMembers                                                    : Organizacija članov ustanove v LDAP
admin_LDAPTypeExample                                                           : OpenLdap, Egroupware or Active Directory
admin_LDAPPrimaryServer                                                         : Primarni strežnik
admin_LDAPSecondaryServer                                                       : Sekundarni strežnik
admin_LDAPServerPort                                                            : Vrata strežnika
admin_LDAPServerPortExample                                                     : Privzeta vrata : 389
admin_LDAPServerProtocolVersion                                                 : Različica protokola
admin_LDAPServerUseTLS                                                          : Use TLS
admin_LDAPServerUseTLSExample                                                   : Vaš LDAP strežnik uporablja TLS
admin_LDAPServerDn                                                              : DN strežnika
admin_LDAPAdminDn                                                               : DN administratorja
admin_LDAPAdminDnExample                                                        : Celoten DN (npr: cn=adminldap,dc=society,dc=com)
admin_LDAPPassword                                                              : Geslo administratorja
admin_LDAPUserDn                                                                : DN uporabnikov
admin_LDAPUserDnExample                                                         : Celoten DN (npr: ou=users,dc=society,dc=com)
admin_LDAPGroupDn                                                               : DN skupin
admin_LDAPGroupDnExample                                                        : Celoten DN (npr: ou=groups,dc=society,dc=com)
admin_LDAPServerExample                                                         : Naslov strežnika (npr: localhost, 192.168.0.2, ldaps://ldap.example.com/)
admin_LDAPServerDnExample                                                       : Celoten DN (npr: dc=company,dc=com)
admin_LDAPPasswordExample                                                       : Admin geslo
admin_LDAPDnSynchroActive                                                       : Sinhronizacija uporabnikov in skupin
admin_LDAPDnSynchroActiveExample                                                : Sinhronizacija LDAP v Dolibarr ali Dolibarr v LDAP
admin_LDAPDnContactActive                                                       : Sinhronizacija kontaktov
admin_LDAPDnContactActiveYes                                                    : Aktivirana sinhronizacija
admin_LDAPDnContactActiveExample                                                : Aktivirana/deaktivirana sinhronizacija
admin_LDAPDnMemberActive                                                        : Sinhronizacija članov
admin_LDAPDnMemberActiveExample                                                 : Aktivirana/deaktivirana sinhronizacija
admin_LDAPContactDn                                                             : DN Dolibarr kontaktov
admin_LDAPContactDnExample                                                      : Celoten DN (npr: ou=contacts,dc=society,dc=com)
admin_LDAPMemberDn                                                              : DN Dolibarr članov
admin_LDAPMemberDnExample                                                       : Celoten DN (npr: ou=members,dc=society,dc=com)
admin_LDAPMemberObjectClassList                                                 : List of objectClass
admin_LDAPMemberObjectClassListExample                                          : List of objectClass defining record attributes (ex: top,inetOrgPerson or top,user for active directory)
admin_LDAPUserObjectClassList                                                   : List of objectClass
admin_LDAPUserObjectClassListExample                                            : List of objectClass defining record attributes (ex: top,inetOrgPerson or top,user for active directory)
admin_LDAPGroupObjectClassList                                                  : List of objectClass
admin_LDAPGroupObjectClassListExample                                           : List of objectClass defining record attributes (ex: top,groupOfUniqueNames)
admin_LDAPContactObjectClassList                                                : List of objectClass
admin_LDAPContactObjectClassListExample                                         : List of objectClass defining record attributes (ex: top,inetOrgPerson or top,user for active directory)
admin_LDAPMemberTypeDn                                                          : Dolibarr member's type DN
admin_LDAPMemberTypeDnExample                                                   : Complete DN (ex: ou=type_members,dc=society,dc=com)
admin_LDAPTestConnect                                                           : Test LDAP connection
admin_LDAPTestSynchroContact                                                    : Test contact's synchronization
admin_LDAPTestSynchroUser                                                       : Test user's synchronization
admin_LDAPTestSynchroGroup                                                      : Test group's synchronization
admin_LDAPTestSynchroMember                                                     : Test member's synchronization
admin_LDAPSynchroOK                                                             : Synchronization test successful
admin_LDAPSynchroKO                                                             : Failed synchronization test
admin_LDAPSynchroKOMayBePermissions                                             : Failed synchronization test. Check that connexion to server is correctly configured and allows LDAP udpates
admin_LDAPTCPConnectOK                                                          : TCP connect to LDAP server successful (Server=%s, Port=%s)
admin_LDAPTCPConnectKO                                                          : TCP connect to LDAP server failed (Server=%s, Port=%s)
admin_LDAPBindOK                                                                : Connect/Authentificate to LDAP server sucessfull (Server=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPBindKO                                                                : Connect/Authentificate to LDAP server failed (Server=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPUnbindSuccessfull                                                     : Disconnect successfull
admin_LDAPUnbindFailed                                                          : Disconnect failed
admin_LDAPConnectToDNSuccessfull                                                : Connection au DN (%s) rï¿½ussie
admin_LDAPConnectToDNFailed                                                     : Connection au DN (%s) ï¿½chouï¿½e
admin_LDAPSetupForVersion3                                                      : LDAP server configured for version 3
admin_LDAPSetupForVersion2                                                      : LDAP server configured for version 2
admin_LDAPSpeedealingMapping                                                    : Speedealing Mapping
admin_LDAPLdapMapping                                                           : LDAP Mapping
admin_LDAPFieldLoginUnix                                                        : Login (unix)
admin_LDAPFieldLoginExample                                                     : Example : uid
admin_LDAPFilterConnection                                                      : Search filter
admin_LDAPFilterConnectionExample                                               : Example : &(objectClass=inetOrgPerson)
admin_LDAPFieldLoginSamba                                                       : Login (samba, activedirectory)
admin_LDAPFieldLoginSambaExample                                                : Example : samaccountname
admin_LDAPFieldFullname                                                         : Firstname Name
admin_LDAPFieldFullnameExample                                                  : Example : cn
admin_LDAPFieldPassword                                                         : Password
admin_LDAPFieldPasswordNotCrypted                                               : Password not crypted
admin_LDAPFieldPasswordCrypted                                                  : Password crypted
admin_LDAPFieldPasswordExample                                                  : Example : userPassword
admin_LDAPFieldCommonName                                                       : Common name
admin_LDAPFieldCommonNameExample                                                : Example : cn
admin_LDAPFieldName                                                             : Name
admin_LDAPFieldNameExample                                                      : Example : sn
admin_LDAPFieldFirstName                                                        : First name
admin_LDAPFieldFirstNameExample                                                 : Example : givenname
admin_LDAPFieldMail                                                             : Email address
admin_LDAPFieldMailExample                                                      : Example : mail
admin_LDAPFieldPhone                                                            : Professional phone number
admin_LDAPFieldPhoneExample                                                     : Example : telephonenumber
admin_LDAPFieldHomePhone                                                        : Personal phone number
admin_LDAPFieldHomePhoneExample                                                 : Example : homephone
admin_LDAPFieldMobile                                                           : Cellular phone
admin_LDAPFieldMobileExample                                                    : Example : mobile
admin_LDAPFieldFax                                                              : Fax number
admin_LDAPFieldFaxExample                                                       : Example : facsimiletelephonenumber
admin_LDAPFieldAddress                                                          : Street
admin_LDAPFieldAddressExample                                                   : Example : street
admin_LDAPFieldZip                                                              : Zip
admin_LDAPFieldZipExample                                                       : Example : postalcode
admin_LDAPFieldTown                                                             : Town
admin_LDAPFieldTownExample                                                      : Example : l
admin_LDAPFieldCountry                                                          : Country
admin_LDAPFieldCountryExample                                                   : Example : c
admin_LDAPFieldDescription                                                      : Description
admin_LDAPFieldDescriptionExample                                               : Example : description
admin_LDAPFieldGroupMembers                                                     : Group members
admin_LDAPFieldGroupMembersExample                                              : Example : uniqueMember
admin_LDAPFieldBirthdate                                                        : Birthdate
admin_LDAPFieldBirthdateExample                                                 : Example :
admin_LDAPFieldCompany                                                          : Company
admin_LDAPFieldCompanyExample                                                   : Example : o
admin_LDAPFieldSid                                                              : SID
admin_LDAPFieldSidExample                                                       : Example : objectsid
admin_LDAPFieldEndLastSubscription                                              : Date of subscription end
admin_LDAPParametersAreStillHardCoded                                           : LDAP parametres are still hardcoded (in contact class)
admin_LDAPSetupNotComplete                                                      : LDAP setup not complete (go on others tabs)
admin_LDAPNoUserOrPasswordProvidedAccessIsReadOnly                              : No administrator or password provided. LDAP access will be anonymous and in read only mode.
admin_LDAPDescContact                                                           : This page allows you to define LDAP attributes name in LDAP tree for each data found on Dolibarr contacts.
admin_LDAPDescUsers                                                             : This page allows you to define LDAP attributes name in LDAP tree for each data found on Dolibarr users.
admin_LDAPDescGroups                                                            : This page allows you to define LDAP attributes name in LDAP tree for each data found on Dolibarr groups.
admin_LDAPDescMembers                                                           : This page allows you to define LDAP attributes name in LDAP tree for each data found on Dolibarr members module.
admin_LDAPDescValues                                                            : Example values are designed for <b>OpenLDAP</b> with following loaded schemas: <b>core.schema, cosine.schema, inetorgperson.schema</b>). If you use thoose values and OpenLDAP, modify your LDAP config file <b>slapd.conf</b> to have all thoose schemas loaded.
admin_ForANonAnonymousAccess                                                    : For an authenticated acces (for a write access for example)
admin_ProductSetup                                                              : Nastavitve modula za proizvode
admin_ServiceSetup                                                              : Storitve modul nastavitev
admin_ProductServiceSetup                                                       : Izdelki in storitve moduli za nastavitev
admin_NumberOfProductShowInSelect                                               : Največje število proizvodov na kombiniranih seznamih(0=brez omejitev)
admin_ConfirmDeleteProductLineAbility                                           : Potrditev izbrisa vrstice proizvoda z obrazca
admin_ModifyProductDescAbility                                                  : Prilagoditev opisa proizvoda na obrazcu
admin_ViewProductDescInFormAbility                                              : Ponazoritev opisa proizvoda na obrazcu (kot pojavni opis)
admin_ViewProductDescInThirdpartyLanguageAbility                                : Vizualizacija Poimenovanja izdelkov v thirdparty jeziku
admin_UseSearchToSelectProduct                                                  : Uporaba iskalnega obrazca za izbiro proizvoda (namesto uporabe polja s seznamom).<br>Če je število proizvodov zelo veliko (> 100 000), lahko povečate hitrost z nastavitvijo konstante PRODUCT_DONOTSEARCH_ANYWHERE na vrednost 1 v Nastavitve->Ostale nastavitve. S tem bo iskanje omejeno na začetek niza.
admin_UseEcoTaxeAbility                                                         : Podpora ekološke takse (WEEE)
admin_SetDefaultBarcodeTypeProducts                                             : Privzet tip črtne kode za proizvode
admin_SetDefaultBarcodeTypeThirdParties                                         : Privzet tip črtne kode za partnerje
admin_ProductCodeChecker                                                        : Module for product code generation and checking (product or service)
admin_ProductOtherConf                                                          : Product / Service configuration
admin_SyslogSetup                                                               : Nastavitve Syslog modula
admin_SyslogOutput                                                              : Izhod za dnevnik
admin_SyslogSyslog                                                              : Syslog
admin_SyslogFacility                                                            : Pripomoček
admin_SyslogLevel                                                               : Nivo
admin_SyslogSimpleFile                                                          : Datoteka
admin_SyslogFilename                                                            : Ime datoteke in pot
admin_YouCanUseDOL_DATA_ROOT                                                    : Za log datoteko v Dolibarr dokumentni mapi lahko uporabite DOL_DATA_ROOT/dolibarr.log. Za shranjevanje te datoteke lahko nastavite tudi drugačno pot.
admin_ErrorUnknownSyslogConstant                                                : Konstanta %s ni znana syslog konstanta
admin_OnlyWindowsLOG_USER                                                       : Windows only supports LOG_USER
admin_DonationsSetup                                                            : Nastanitev modula za donacije
admin_DonationsReceiptModel                                                     : Predloga računa za donacijo
admin_BarcodeSetup                                                              : Nastavitev črtne kode
admin_PaperFormatModule                                                         : Modul za format izpisa
admin_BarcodeEncodeModule                                                       : Tip kodiranja črtne kode
admin_UseBarcodeInProductModule                                                 : Uporabite črtne kode za proizvode
admin_CodeBarGenerator                                                          : Generator črtne kode
admin_ChooseABarCode                                                            : Generator ni definiran
admin_FormatNotSupportedByGenerator                                             : Ta generator ne podpira tega formata
admin_BarcodeDescEAN8                                                           : Črtna koda tipa EAN8
admin_BarcodeDescEAN13                                                          : Črtna koda tipa EAN13
admin_BarcodeDescUPC                                                            : Črtna koda tipa UPC
admin_BarcodeDescISBN                                                           : Črtna koda tipa ISBN
admin_BarcodeDescC39                                                            : Črtna koda tipa C39
admin_BarcodeDescC128                                                           : Črtna koda tipa C128
admin_WithdrawalsSetup                                                          : Nastavitev modula za dvige
admin_ExternalRSSSetup                                                          : Nastavitev uvoza zunanjih RSS
admin_NewRSS                                                                    : Nov vir RSS
admin_RSSUrl                                                                    : RSS URL
admin_RSSUrlExample                                                             : An interesting RSS feed
admin_MailingSetup                                                              : Nastavitev E-mail modula
admin_MailingEMailFrom                                                          : Naslov pošiljatelja (Od) za emaile, ki jih pošlje e-mailing modul
admin_MailingEMailError                                                         : Naslov za vračilo (Napake-za) emailov z napakami
admin_NotificationSetup                                                         : Nastavitev obvestil po elektronski pošti
admin_NotificationEMailFrom                                                     : Naslov pošiljatelja (od) za emaile, ki se pošljejo kot obvestila
admin_ListOfAvailableNotifications                                              : Seznam obvestil, ki so na voljo (ta seznam je odvisen od aktiviranih modulov)
admin_SendingsSetup                                                             : Nastavitev modula za pošiljanje
admin_SendingsReceiptModel                                                      : Obrazci odpremnic
admin_SendingsNumberingModules                                                  : Moduli za številčenje pošiljk
admin_SendingsAbility                                                           : Podpora za odpremnice
admin_NoNeedForDeliveryReceipts                                                 : V večini primerov se dobavnice uporabljajo tako kot dokument za dostavo kupcem (seznam proizvodov, ki jih je potrebno poslati), kakor tudi kot dokument, ki ga dobi in podpiše kupec. Zato je odpremnica podvojena funkcija, ki je redko aktivirana.
admin_FreeLegalTextOnShippings                                                  : Prosti tekst na pošiljkah
admin_DeliveryOrderNumberingModules                                             : Modul za številčenje dobavnic
admin_DeliveryOrderModel                                                        : Obrazci dobavnic
admin_DeliveriesOrderAbility                                                    : Podpora za dobavnice
admin_FreeLegalTextOnDeliveryReceipts                                           : Poljubno besedilo na odpremnici
admin_AdvancedEditor                                                            : Napredni urejevalnik
admin_ActivateFCKeditor                                                         : Aktiviranje FCKeditor za:
admin_FCKeditorForCompany                                                       : WYSIWIG kreiranje/urejanje opisa podjetij in opomb
admin_FCKeditorForProduct                                                       : WYSIWIG kreiranje/urejanje opisa proizvodov/storitev in opomb
admin_FCKeditorForProductDetails                                                : WYSIWIG kreiranje/urejanje vrstic za podrobnosti za vse entitete (ponudbe, naročila, računi, itd...)<br>Opozorilo: Uporaba te opcije resnično ni priporočljiva, ker lahko povzroči težave s posebnimi znaki in formatiranjem strani PDF datotek.
admin_FCKeditorForMailing                                                       : WYSIWIG kreiranje/urejanje pošte
admin_StockSetup                                                                : Konfiguracija modula zaloge
admin_UserWarehouse                                                             : Uporabi uporabnikove prilagojene zaloge
admin_MenuDeleted                                                               : Izbrisan meni
admin_TreeMenu                                                                  : Drevesni meniji
admin_Menus                                                                     : Meniji
admin_TreeMenuPersonalized                                                      : Prilagojeni meniji
admin_NewMenu                                                                   : Nov meni
admin_MenuConf                                                                  : Nastavitve menijev
admin_Menu                                                                      : Izbira menija
admin_MenuHandler                                                               : Menijski vmesnik
admin_MenuModule                                                                : Modul izvorov
admin_HideUnauthorizedMenu                                                      : Zasenči neavtoriziran meni (sivo)
admin_DetailId                                                                  : ID meni
admin_DetailMenuHandler                                                         : Upravljavec menijev za prikaz novega menija
admin_DetailMenuModule                                                          : Ime modula, če vnos prihaja iz modula
admin_DetailType                                                                : Tip menija (zgoraj ali levo)
admin_DetailTitre                                                               : Naziv menija ali koda naziva za prevod
admin_DetailMainmenu                                                            : Kategorija, ki ji pripada (opuščeno)
admin_DetailUrl                                                                 : URL,kamor vas meni usmeri (Absolutni URL link ali zunanji link http://)
admin_DetailLeftmenu                                                            : Prikaz pogojev ali ne (opuščeno)
admin_DetailEnabled                                                             : Pogoj za prikaz vnosa ali ne
admin_DetailRight                                                               : Pogoj za prikaz neavtoriziranih zatemnitev menija
admin_DetailLangs                                                               : Ime jezikovne datoteke za prevod nazivnih kot
admin_DetailUser                                                                : Interni / zunanji / vsi
admin_Target                                                                    : Target
admin_DetailTarget                                                              : Cilj za link (_prazen vrh odpre novo okno)
admin_DetailLevel                                                               : Nivo (-1:zgornji meni, 0:meni v glavi, >0 meni in podmeni)
admin_ModifMenu                                                                 : Sprememba menija
admin_DeleteMenu                                                                : Izbris menijskega vnosa
admin_ConfirmDeleteMenu                                                         : Ali zares želite izbrisati menijski vnos <b>%s</b> ?
admin_DeleteLine                                                                : Izbris vrstice
admin_ConfirmDeleteLine                                                         : Ali zares želite izbrisati to vrstico ?
admin_TaxSetup                                                                  : Modul za nastavitve davkov, socialnih prispevkov in dividend
admin_OptionVatMode                                                             : Rok za DDV
admin_OptionVATDefault                                                          : Standard
admin_OptionVATDebitOption                                                      : Opcija storitev ob zapadlosti
admin_OptionVatDefaultDesc                                                      : DDV zapade:<br>- ob dobavi/plačilu blaga<br>- ob plačilu storitev
admin_OptionVatDebitOptionDesc                                                  : DDV zapade:<br>- ob dobavi/plačilu blaga<br>- ob računu (zapadlosti) za storitev
admin_SummaryOfVatExigibilityUsedByDefault                                      : Privzeta zapadlost DDV glede na izbrano opcijo:
admin_OnDelivery                                                                : Ob dobavi
admin_OnPayment                                                                 : Ob plačilu
admin_OnInvoice                                                                 : Ob izdaji računa
admin_SupposedToBePaymentDate                                                   : Predvideva se datum plačila
admin_SupposedToBeInvoiceDate                                                   : Predvideva se datum računa
admin_Buy                                                                       : Nakup
admin_Sell                                                                      : Prodaja
admin_InvoiceDateUsed                                                           : Uporabljen datum računa
admin_YourCompanyDoesNotUseVAT                                                  : Vaše podjetje ni davčni zavezanec (Domov - Nastavitve - Podjetje/ustanova), zato ni možno nastaviti opcij za DDV.
admin_AccountancyCode                                                           : Računovodstvo zakonik
admin_AccountancyCodeSell                                                       : Sale account. code
admin_AccountancyCodeBuy                                                        : Purchase account. code
admin_AgendaSetup                                                               : Nastavitev modula za aktivnosti in dnevni red
admin_PasswordTogetVCalExport                                                   : Ključ za avtorizacijo izvoznega linka
admin_PastDelayVCalExport                                                       : Ne izvažaj dogodekov, starejših od
admin_ClickToDialDesc                                                           : Ta modul omogoča dodajanje ikone za telefonsko številko Dolibarr kontakta. S klikom na ikono boste poklicali strežnik z določenim URL naslovom, ki ga definirate spodaj. To lahko uporabite za klic sistema klicnega centra iz aplikacije Dolibarr, ki lahko kliče telefonsko številko na primer na sistemu SIP.
admin_CashDesk                                                                  : Prodajalna
admin_CashDeskSetup                                                             : Nastavitev modula za prodajalno
admin_CashDeskThirdPartyForSell                                                 : Generični partner, ki se uporabi za prodajo
admin_CashDeskBankAccountForSell                                                : Račun, ki se uporabi za prejem gotovinskih plačil
admin_CashDeskBankAccountForCheque                                              : Račun, ki se uporabi za prejem plačil s čeki
admin_CashDeskBankAccountForCB                                                  : Račun, ki se uporabi za prejem plačil s kreditnimi karticami
admin_CashDeskIdWareHouse                                                       : Skladišče, ki se uporabi za prodajo
admin_BookmarkSetup                                                             : Nastavitev modula za zaznamke
admin_BookmarkDesc                                                              : Ta modul omogoča upravljanje z zaznamki. Lahko tudi dodate bližnjice na katerokoli Dolibarr stran ali zunanjo web stran na vašem levem meniju.
admin_NbOfBoomarkToShow                                                         : Največje število zaznamkov za prikaz v levem meniju
admin_WebServicesSetup                                                          : Nastavitev modula za spletne storitve
admin_WebServicesDesc                                                           : Z omogočenjem tega modula postane Dolibarr spletni strežnik za zagotavljanje različnih spletnih storitev.
admin_WSDLCanBeDownloadedHere                                                   : WSDL opisna datoteka omogočenih storitev je na voljo tukaj
admin_EndPointIs                                                                : SOAP klienti morajo poslati zahtevo na Dolibarr končno točko, ki je na voljo na Url
admin_BankSetupModule                                                           : Nastavitev modula za banke
admin_FreeLegalTextOnChequeReceipts                                             : Poljubno besedilo na potrdilu za ček
admin_BankOrderShow                                                             : Prikaže seznam bančnih računov za države, ki uporabljajo "podrobno bančno številko"
admin_BankOrderGlobal                                                           : Splošno
admin_BankOrderGlobalDesc                                                       : Splošno zaporedje prikaza
admin_BankOrderES                                                               : Španski
admin_BankOrderESDesc                                                           : Spanish display order
admin_MultiCompanySetup                                                         : Nastavitev modula za več podjetij
admin_SuppliersSetup                                                            : Nastavitev modula za dobavitelje
admin_SuppliersCommandModel                                                     : Celotna predloga naročila dobavitelja (logo...)
admin_SuppliersInvoiceModel                                                     : Celotna predloga računa dobavitelja (logo...)
admin_GeoIPMaxmindSetup                                                         : Nastavitev modula GeoIP Maxmind
admin_PathToGeoIPMaxmindCountryDataFile                                         : Pot do datoteke, ki vsebuje Maxmind ip za prevode po državah.<br>Primer: /usr/local/share/GeoIP/GeoIP.dat
admin_NoteOnPathLocation                                                        : Pazite, da je mora biti vaš ip do datoteke s podatki o državi znotraj mape, ki jo PHP lahko bere (Na vašem PHP preverite nastavitve 'open_basedir' in dovoljenja za datotečni sistem).
admin_YouCanDownloadFreeDatFileTo                                               : <b>Brezplačno demo različico</b> Maxmind GeoIP deželne datoteke lahko prenesete z %s.
admin_YouCanDownloadAdvancedDatFileTo                                           : Lahko tudi prenesete bolj <b>popolno različico, s posodobitvami,</b> deželne datoteke Maxmind GeoIP z %s.
admin_TestGeoIPResult                                                           : Test pretvorbe IP -> država
admin_ProjectsNumberingModules                                                  : Modul za številčenje projektov
admin_ProjectsSetup                                                             : Nastavitve modula za projekte
admin_ProjectsModelModule                                                       : Vzorec dokumenta poročila o projektih
admin_Chartofaccounts                                                           : Plan comptable
admin_Definechartofaccounts                                                     : Définir un plan comptable
admin_Selectchartofaccounts                                                     : Sélection d'un plan comptable
admin_DoNotSuggestChart                                                         : Ne pas suggérer de plan comptable
dict_CountryFR                                                                  : Francija
dict_CountryBE                                                                  : Belgija
dict_CountryIT                                                                  : Italija
dict_CountryES                                                                  : Španija
dict_CountryDE                                                                  : Nemčija
dict_CountryCH                                                                  : Švica
dict_CountryGB                                                                  : Velika Britanija
dict_CountryIE                                                                  : Irska
dict_CountryCN                                                                  : Kitajska
dict_CountryTN                                                                  : Tunizija
dict_CountryUS                                                                  : ZDA
dict_CountryMA                                                                  : Maroko
dict_CountryDZ                                                                  : Alžirija
dict_CountryCA                                                                  : Kanada
dict_CountryTG                                                                  : Togo
dict_CountryGA                                                                  : Gabon
dict_CountryNL                                                                  : Nizozemska
dict_CountryHU                                                                  : Madžarska
dict_CountryRU                                                                  : Rusija
dict_CountrySE                                                                  : Švedska
dict_CountryCI                                                                  : Slonokoščena obala
dict_CountrySN                                                                  : Senegal
dict_CountryAR                                                                  : Argentina
dict_CountryCM                                                                  : Kamerun
dict_CountryPT                                                                  : Portugalska
dict_CountrySA                                                                  : Saudska Arabija
dict_CountryMC                                                                  : Monako
dict_CountryAU                                                                  : Avstralija
dict_CountrySG                                                                  : Singapur
dict_CountryAF                                                                  : Afganistan
dict_CountryAX                                                                  : Åland Islands
dict_CountryAL                                                                  : Albanija
dict_CountryAS                                                                  : Ameriška Samoa
dict_CountryAD                                                                  : Andora
dict_CountryAO                                                                  : Angola
dict_CountryAI                                                                  : Angila
dict_CountryAQ                                                                  : Antarktika
dict_CountryAG                                                                  : Antigua in Barbuda
dict_CountryAM                                                                  : Armenija
dict_CountryAW                                                                  : Aruba
dict_CountryAT                                                                  : Avstrija
dict_CountryAZ                                                                  : Azerbajdžan
dict_CountryBS                                                                  : Bahami
dict_CountryBH                                                                  : Bahrein
dict_CountryBD                                                                  : Bangladeš
dict_CountryBB                                                                  : Barbados
dict_CountryBY                                                                  : Belorusija
dict_CountryBZ                                                                  : Belize
dict_CountryBJ                                                                  : Benin
dict_CountryBM                                                                  : Bermudi
dict_CountryBT                                                                  : Butan
dict_CountryBO                                                                  : Bolivija
dict_CountryBA                                                                  : Bosna in Hercegovina
dict_CountryBW                                                                  : Bocvana
dict_CountryBV                                                                  : Bouvetski otoki
dict_CountryBR                                                                  : Brazilija
dict_CountryIO                                                                  : Britanska ozemlja v indijskem oceanu
dict_CountryBN                                                                  : Brunej Darusalam
dict_CountryBG                                                                  : Bolgarija
dict_CountryBF                                                                  : Burkina Faso
dict_CountryBI                                                                  : Burundi
dict_CountryKH                                                                  : Kambodža
dict_CountryCV                                                                  : Zelenortski otoki
dict_CountryKY                                                                  : Kajmanski otoki
dict_CountryCF                                                                  : Centralna Afriška Republika
dict_CountryTD                                                                  : Čad
dict_CountryCL                                                                  : Čile
dict_CountryCX                                                                  : Božični otoki
dict_CountryCC                                                                  : Kokosovi (Keelingovi) otoki
dict_CountryCO                                                                  : Kolumbija
dict_CountryKM                                                                  : Komori
dict_CountryCG                                                                  : Kongo
dict_CountryCD                                                                  : Demokratična republika Kongo
dict_CountryCK                                                                  : Cookovi otoki
dict_CountryCR                                                                  : Kostarika
dict_CountryHR                                                                  : Hrvaška
dict_CountryCU                                                                  : Kuba
dict_CountryCY                                                                  : Ciper
dict_CountryCZ                                                                  : Češka
dict_CountryDK                                                                  : Danska
dict_CountryDJ                                                                  : Džibuti
dict_CountryDM                                                                  : Dominika
dict_CountryDO                                                                  : Dominikanska Republika
dict_CountryEC                                                                  : Ekvador
dict_CountryEG                                                                  : Egipt
dict_CountrySV                                                                  : Salvador
dict_CountryGQ                                                                  : Ekvatorialna Gvineja
dict_CountryER                                                                  : Eritreja
dict_CountryEE                                                                  : Estonija
dict_CountryET                                                                  : Etiopija
dict_CountryFK                                                                  : Falklandski otoki
dict_CountryFO                                                                  : Ferski otoki
dict_CountryFJ                                                                  : Fidži
dict_CountryFI                                                                  : Finska
dict_CountryGF                                                                  : Francoska Gvajana
dict_CountryPF                                                                  : Francoska Polinezija
dict_CountryTF                                                                  : Francoska južna območja
dict_CountryGM                                                                  : Gambija
dict_CountryGE                                                                  : Georgia
dict_CountryGH                                                                  : Gana
dict_CountryGI                                                                  : Gibraltar
dict_CountryGR                                                                  : Grčija
dict_CountryGL                                                                  : Grenlandija
dict_CountryGD                                                                  : Grenada
dict_CountryGP                                                                  : Guadeloupe
dict_CountryGU                                                                  : Guam
dict_CountryGT                                                                  : Gvatemala
dict_CountryGN                                                                  : Gvineja
dict_CountryGW                                                                  : Gvineja-Bisao
dict_CountryGY                                                                  : Gvajana
dict_CountryHT                                                                  : Haiti
dict_CountryHM                                                                  : Heard Island and McDonald
dict_CountryVA                                                                  : Vatikan
dict_CountryHN                                                                  : Honduras
dict_CountryHK                                                                  : Hongkong
dict_CountryIS                                                                  : Islandija
dict_CountryIN                                                                  : Indija
dict_CountryID                                                                  : Indonezija
dict_CountryIR                                                                  : Iran
dict_CountryIQ                                                                  : Irak
dict_CountryIL                                                                  : Izrael
dict_CountryJM                                                                  : Jamajka
dict_CountryJP                                                                  : Japonska
dict_CountryJO                                                                  : Jordanija
dict_CountryKZ                                                                  : Kazahstan
dict_CountryKE                                                                  : Kenija
dict_CountryKI                                                                  : Kiribati
dict_CountryKP                                                                  : Severna Koreja
dict_CountryKR                                                                  : Južna Koreja
dict_CountryKW                                                                  : Kuvajt
dict_CountryKG                                                                  : Kirgizija
dict_CountryLA                                                                  : Laos
dict_CountryLV                                                                  : Latvija
dict_CountryLB                                                                  : Libanon
dict_CountryLS                                                                  : Lesoto
dict_CountryLR                                                                  : Liberija
dict_CountryLY                                                                  : Libija
dict_CountryLI                                                                  : Lihtenštajn
dict_CountryLT                                                                  : Litva
dict_CountryLU                                                                  : Luksemburg
dict_CountryMO                                                                  : Makao
dict_CountryMK                                                                  : Makedonija
dict_CountryMG                                                                  : Madagaskar
dict_CountryMW                                                                  : Malavi
dict_CountryMY                                                                  : Malezija
dict_CountryMV                                                                  : Maldivi
dict_CountryML                                                                  : Mali
dict_CountryMT                                                                  : Malta
dict_CountryMH                                                                  : Maršalovi otoki
dict_CountryMQ                                                                  : Martinik
dict_CountryMR                                                                  : Mavretanija
dict_CountryMU                                                                  : Mauricius
dict_CountryYT                                                                  : Mayotte
dict_CountryMX                                                                  : Mehika
dict_CountryFM                                                                  : Mikronezija
dict_CountryMD                                                                  : Moldavija
dict_CountryMN                                                                  : Mongolija
dict_CountryMS                                                                  : Monserat
dict_CountryMZ                                                                  : Mozambik
dict_CountryMM                                                                  : Burma (Mjanmar)
dict_CountryNA                                                                  : Namibija
dict_CountryNR                                                                  : Nauru
dict_CountryNP                                                                  : Nepal
dict_CountryAN                                                                  : Nizozemski Antili
dict_CountryNC                                                                  : Nova Kaledonija
dict_CountryNZ                                                                  : Nova Zelandija
dict_CountryNI                                                                  : Nikaragva
dict_CountryNE                                                                  : Niger
dict_CountryNG                                                                  : Nigerija
dict_CountryNU                                                                  : Niue
dict_CountryNF                                                                  : Norfolški otoki
dict_CountryMP                                                                  : Severni Marianski otoki
dict_CountryNO                                                                  : Norveška
dict_CountryOM                                                                  : Oman
dict_CountryPK                                                                  : Pakistan
dict_CountryPW                                                                  : Palau
dict_CountryPS                                                                  : Okupirano Palestinsko ozemlje
dict_CountryPA                                                                  : Panama
dict_CountryPG                                                                  : Papua Nova Gvineja
dict_CountryPY                                                                  : Paragvaj
dict_CountryPE                                                                  : Peru
dict_CountryPH                                                                  : Filipini
dict_CountryPN                                                                  : Pitcairnski otoki
dict_CountryPL                                                                  : Poljska
dict_CountryPR                                                                  : Portoriko
dict_CountryQA                                                                  : Katar
dict_CountryRE                                                                  : Reunion
dict_CountryRO                                                                  : Romunija
dict_CountryRW                                                                  : Ruanda
dict_CountrySH                                                                  : Sveta Helena
dict_CountryKN                                                                  : Sveti Kits in Nevis
dict_CountryLC                                                                  : Sveta Lucija
dict_CountryPM                                                                  : Saint Pierre and Miquelon
dict_CountryVC                                                                  : Saint Vincent in Grenadini
dict_CountryWS                                                                  : Samoa
dict_CountrySM                                                                  : San Marino
dict_CountryST                                                                  : Sao Tome and Principe
dict_CountryRS                                                                  : Srbija
dict_CountrySC                                                                  : Sejšeli
dict_CountrySL                                                                  : Siera Leone
dict_CountrySK                                                                  : Slovaška
dict_CountrySI                                                                  : Slovenija
dict_CountrySB                                                                  : Salomonovi otoki
dict_CountrySO                                                                  : Somalija
dict_CountryZA                                                                  : Južna Afrika
dict_CountryGS                                                                  : South Georgia and the South Sandwich Islands
dict_CountryLK                                                                  : Šrilanka
dict_CountrySD                                                                  : Sudan
dict_CountrySR                                                                  : Surinam
dict_CountrySJ                                                                  : Svalbard and Jan Mayen
dict_CountrySZ                                                                  : Svaziland
dict_CountrySY                                                                  : Sirija
dict_CountryTW                                                                  : Tajvan
dict_CountryTJ                                                                  : Tadžikistan
dict_CountryTZ                                                                  : Tanzanija
dict_CountryTH                                                                  : Tajska
dict_CountryTL                                                                  : Timor-Leste
dict_CountryTK                                                                  : Tokelau
dict_CountryTO                                                                  : Tonga
dict_CountryTT                                                                  : Trinidad in Tobago
dict_CountryTR                                                                  : Turčija
dict_CountryTM                                                                  : Turkmenistan
dict_CountryTC                                                                  : Turks and Cailos Islands
dict_CountryTV                                                                  : Tuvalu
dict_CountryUG                                                                  : Uganda
dict_CountryUA                                                                  : Ukrajina
dict_CountryAE                                                                  : Združeni Arabski Emirati
dict_CountryUM                                                                  : United States Minor Outlying Islands
dict_CountryUY                                                                  : Urugvaj
dict_CountryUZ                                                                  : Uzbekistan
dict_CountryVU                                                                  : Vanuatu
dict_CountryVE                                                                  : Venezuela
dict_CountryVN                                                                  : Vietnam
dict_CountryVG                                                                  : Britanski deviški otoki
dict_CountryVI                                                                  : Ameriški deviški otoki
dict_CountryWF                                                                  : Wallis and Futuna
dict_CountryEH                                                                  : Zahodna Sahara
dict_CountryYE                                                                  : Jemen
dict_CountryZM                                                                  : Zambija
dict_CountryZW                                                                  : Zimbabve
dict_CountryGG                                                                  : Guernsey
dict_CountryIM                                                                  : Otok Man
dict_CountryJE                                                                  : Jersey
dict_CountryME                                                                  : Črna Gora
dict_CountryBL                                                                  : Saint Barthelemy
dict_CountryMF                                                                  : Saint Martin
dict_CivilityMME                                                                : Ga.
dict_CivilityMR                                                                 : G.
dict_CivilityMLE                                                                : Gdč.
dict_CivilityMTRE                                                               : Mojster
dict_CivilityDR                                                                 : Doctor
dict_Currencyeuros                                                              : EUR
dict_CurrencyAUD                                                                : Avstralski Dolarji
dict_CurrencySingAUD                                                            : Avstralski Dolar
dict_CurrencyCAD                                                                : Kanadski Dolarji
dict_CurrencySingCAD                                                            : Kanadski Dolar
dict_CurrencyCHF                                                                : Švicarski Franki
dict_CurrencySingCHF                                                            : Švicarski Frank
dict_CurrencyEUR                                                                : EUR
dict_CurrencySingEUR                                                            : EUR
dict_CurrencyFRF                                                                : Francoski Franki
dict_CurrencySingFRF                                                            : Francoski Frank
dict_CurrencyGBP                                                                : Angleški funti
dict_CurrencySingGBP                                                            : Angleški funt
dict_CurrencyINR                                                                : Indijske rupije
dict_CurrencySingINR                                                            : Indijska rupija
dict_CurrencyMAD                                                                : Dirhami
dict_CurrencySingMAD                                                            : Dirham
dict_CurrencyMGA                                                                : Ariary
dict_CurrencySingMGA                                                            : Ariary
dict_CurrencyMUR                                                                : Mauricijske rupije
dict_CurrencySingMUR                                                            : Mauricijska rupija
dict_CurrencyNOK                                                                : Norveške krone
dict_CurrencySingNOK                                                            : Norveška krona
dict_CurrencyTND                                                                : Tunizijski dinarji
dict_CurrencySingTND                                                            : Tunizijski dinar
dict_CurrencyUSD                                                                : Ameriški Dolarji
dict_CurrencySingUSD                                                            : Ameriški Dolar
dict_CurrencyUAH                                                                : Grivna
dict_CurrencySingUAH                                                            : Grivna
dict_CurrencyXAF                                                                : CFA Francs BEAC
dict_CurrencySingXAF                                                            : CFA Franc BEAC
dict_CurrencyXOF                                                                : CFA Francs BCEAO
dict_CurrencySingXOF                                                            : CFA Franc BCEAO
dict_CurrencyXPF                                                                : CFP Francs
dict_CurrencySingXPF                                                            : CFP Franc
dict_CurrencyCentSingEUR                                                        : cent
dict_CurrencyThousandthSingTND                                                  : thousandth
dict_CurrencySUR                                                                : Roubles
dict_CurrencySingSUR                                                            : Rouble
dict_CurrencyTRL                                                                : Livres turques
dict_CurrencySingTRL                                                            : Livre turque
dict_DemandReasonTypeSRC_INTE                                                   : Internet
dict_DemandReasonTypeSRC_CAMP_MAIL                                              : Poštna kampanja
dict_DemandReasonTypeSRC_CAMP_EMAIL                                             : Kampanja po elektronski pošti
dict_DemandReasonTypeSRC_CAMP_PHO                                               : Telefonska kampanja
dict_DemandReasonTypeSRC_CAMP_FAX                                               : Kampanja po faksu
dict_DemandReasonTypeSRC_COMM                                                   : Komercialni kontakt
dict_DemandReasonTypeSRC_SHOP                                                   : Kontakt v prodajalni
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
errors_MenuManager                                                              : Upravljanje z meniji
errors_Error                                                                    : Napaka
errors_Errors                                                                   : Napake
errors_ErrorBadEMail                                                            : EMail %s je napačen
errors_ErrorBadUrl                                                              : Url %s je napačen
errors_ErrorRecordNotFound                                                      : Ne najdem zapisa.
errors_ErrorFailToCopyFile                                                      : Ni kopirati Datoteka <b>'%s</b> &quot;nadomesti z&quot; <b>%s</b> &quot;.
errors_ErrorFailToRenameFile                                                    : Napaka pri preimenovanju datoteke '<b>%s</b>' v '<b>%s</b>'.
errors_ErrorFailToDeleteFile                                                    : Napaka pri odstranitvi datoteke '<b>%s</b>'.
errors_ErrorFailToCreateFile                                                    : Napaka pri kreiranju datoteke '<b>%s</b>'.
errors_ErrorFailToRenameDir                                                     : Napaka pri preimenovanju mape '<b>%s</b>' v '<b>%s</b>'.
errors_ErrorFailToCreateDir                                                     : Napaka pri kreiranju mape '<b>%s</b>'.
errors_ErrorFailToDeleteDir                                                     : Napaka pri brisanju mape '<b>%s</b>'.
errors_ErrorFailedToDeleteJoinedFiles                                           : Entitete ni možno zbrisati, ker so nanjo vezane datoteke. Najprej izbrišite povezane datoteke.
errors_ErrorThisContactIsAlreadyDefinedAsThisType                               : Ta kontakt je že definiran kot kontakt istega tipa.
errors_ErrorCashAccountAcceptsOnlyCashMoney                                     : Ta bančni račun je gotovinski, zato so možna samo gotovinska plačila.
errors_ErrorFromToAccountsMustDiffers                                           : Plačilni in ciljni bančni račun morata biti različna.
errors_ErrorBadThirdPartyName                                                   : Napačno ime partnerja
errors_ErrorBadCustomerCodeSyntax                                               : Napačna koda kupca
errors_ErrorCustomerCodeRequired                                                : Obvezna koda kupca
errors_ErrorCustomerCodeAlreadyUsed                                             : Koda kupca je že uporabljena
errors_ErrorPrefixRequired                                                      : Obvezna predpona
errors_ErrorUrlNotValid                                                         : Internetni naslov je napačen
errors_ErrorBadSupplierCodeSyntax                                               : Napačna koda dobavitelja
errors_ErrorSupplierCodeRequired                                                : Obvezna koda dobavitelja
errors_ErrorSupplierCodeAlreadyUsed                                             : Koda dobavitelja je že uporabljena
errors_ErrorBadParameters                                                       : Napačni parametri
errors_ErrorBadValueForParameter                                                : Napačna vrednost '%s' za nepravilen parameter '%s'
errors_ErrorBadImageFormat                                                      : Format slikovne datoteke ni podprt
errors_ErrorBadDateFormat                                                       : Vrednost '%s &quot;je napačen zapis datuma
errors_ErrorFailedToWriteInDir                                                  : Napaka pri pisanju v mapo %s
errors_ErrorFoundBadEmailInFile                                                 : Napačna email sintaksa v vrstici %s v datoteki (naprimer vrstica %s z emailom=%s)
errors_ErrorUserCannotBeDelete                                                  : Uporabnika se ne da izbrisati. Morda je povezan z drugimi Speedealing entitetami.
errors_ErrorFieldsRequired                                                      : Nekatera zahtevana polja niso izpolnjena.
errors_ErrorFailedToCreateDir                                                   : Kreiranje mape ni uspelo. Preverite, če ima uporabnik internetne strani dovoljenje za pisanje v mapo z Speedealing dokumenti. Če je parameter <b>safe_mode</b> v tem PHP omogočen, preverite če je lastnik Speedealing php datotek uporabnik web strežnika (ali skupina).
errors_ErrorNoMailDefinedForThisUser                                            : Ta uporabnik nima določenega Email naslova
errors_ErrorFeatureNeedJavascript                                               : Za aktiviranje ali delovanje te funkcije je potreben javascript. Spremenite »Nastavitve – Prikaz«.
errors_ErrorTopMenuMustHaveAParentWithId0                                       : 'Zgoernji' meni ne more imeti nadrejenega menija. Vnesite 0 v nadrejeni meni ali izberite vrsto menija 'Levi'.
errors_ErrorLeftMenuMustHaveAParentId                                           : 'Levi' meni mora imeti Nadrejeni ID.
errors_ErrorFileNotFound                                                        : Datoteka <b>%s</b> ni bila najdena (Napačna pot, nimate dovoljenj ali je dostop zavrnjen s PHP openbasedir ali safe_mode parametri)
errors_ErrorDirNotFound                                                         : Mapa <b>%s</b> ni bila najdena (Napačna pot, nimate dovoljenj ali je dostop zavrnjen s PHP openbasedir ali safe_mode parametri)
errors_ErrorFunctionNotAvailableInPHP                                           : Za to opcijo je zahtevana funkcija <b>%s</b>, ki pa ni na voljo v tej verziji/nastavitvah PHP.
errors_ErrorDirAlreadyExists                                                    : Mapa z enakim imenom že obstaja.
errors_ErrorFileAlreadyExists                                                   : Datoteka z enakim imenom že obstaja.
errors_ErrorPartialFile                                                         : V strežnik ni bila prenešena celotna datoteka.
errors_ErrorNoTmpDir                                                            : Začasna mapa %s ne obstaja.
errors_ErrorUploadBlockedByAddon                                                : PHP/Apache vtičnik je blokiral nalaganje.
errors_ErrorFileSizeTooLarge                                                    : Datoteka je prevelika.
errors_ErrorSizeTooLongForIntType                                               : Velikost predolgo int tip (%s številke največ)
errors_ErrorSizeTooLongForVarcharType                                           : Velikost predolgo za tip za nize (%s znakov največ)
errors_ErrorFieldCanNotContainSpecialCharacters                                 : Polje <b>%s</b> ne sme vsebovati posebnih znakov.
errors_ErrorNoAccountancyModuleLoaded                                           : Ni aktiviran računovodski modul
errors_ErrorExportDuplicateProfil                                               : To ime profila za izvoz podatkov že obstaja.
errors_ErrorLDAPSetupNotComplete                                                : Speedealing-LDAP združevanje ni popolno.
errors_ErrorLDAPMakeManualTest                                                  : Datoteka .ldif je bila ustvarjena v mapi %s. Poskusite jo naložiti ročno preko ukazne vrstice, da bi dobili več podatkov o napaki.
errors_ErrorCantSaveADoneUserWithZeroPercentage                                 : Ni možno shraniti aktivnosti "statut not started" če je tudi polje "done by" izpolnjeno.
errors_ErrorRefAlreadyExists                                                    : Referenca, uporabljena za kreiranje, že obstaja.
errors_ErrorPleaseTypeBankTransactionReportName                                 : Prosimo vnesite ime bančnega računa v poročilo o transakciji (Format YYYYMM ali YYYYMMDD)
errors_ErrorRecordHasChildren                                                   : Zapisa se ne da izbrisati, ker ima nekaj podrejenih.
errors_ErrorModuleRequireJavascript                                             : Javascript ne sme biti izklopljen, če želite da ta funkcija deluje. Javascript vklopite/izklopite v meniju Domov->Nastavitve->Prikaz.
errors_ErrorPasswordsMustMatch                                                  : Obe vneseni gesli se morata ujemati
errors_ErrorContactEMail                                                        : Prišlo je do tehnične napake. Prosimo, obrnite se na administratorja na naslednji Email <b>%s</b> in mu sporočite kodo napake <b>%s</b>, Še bolje pa je, če priložite kopijo strani z napako.
errors_ErrorWrongValueForField                                                  : Napačna vrednost v polju številka <b>%s</b> (vrednost '<b>%s</b>' ne ustreza pravilu <b>%s</b>)
errors_ErrorFieldValueNotIn                                                     : Napačna vrednost v polju številka<b>%s</b> (vrednost '<b>%s</b>' ni vrednost, ki je na voljo v polju <b>%s</b> tabele <b>%s</b>)
errors_ErrorFieldRefNotIn                                                       : Napačna vrednost za <b>%s</b> številka polja (Vrednost <b>'%s</b> &quot;ni <b>%s</b> obstoječe ref)
errors_ErrorsOnXLines                                                           : Napake v <b>%s</b> vrsticah izvorne kode
errors_ErrorFileIsInfectedWithAVirus                                            : Antivirusni program ni mogel potrditi datoteke (datoteka je morda okužena)
errors_ErrorSpecialCharNotAllowedForField                                       : Posebni znaki niso dovoljeni v polju "%s"
errors_ErrorDatabaseParameterWrong                                              : Parameter nastavitve baze podatkov '<b>%s</b>' ima vrednost, ki ni kompatibilna z Speedealing (vrednost mora biti '<b>%s</b>').
errors_ErrorNumRefModel                                                         : V bazi podatkov obstaja referenca (%s), ki ni kompatibilna s tem pravilom za številčenje. Odstranite zapis ali preimenujte referenco za aktivacijo tega modula.
errors_ErrorQtyTooLowForThisSupplier                                            : Premajhna količina za tega dobavitelja ali ni določena cena tega izdelka za tega dobavitelja
errors_ErrorModuleSetupNotComplete                                              : Kaže, da nastavitev tega modula ni kompletna. Za dokončanje pojdite na Nastavitve - Moduli.
errors_ErrorBadMask                                                             : Napaka na maski
errors_ErrorBadMaskFailedToLocatePosOfSequence                                  : Napaka, maska je brez zaporedne številke
errors_ErrorBadMaskBadRazMonth                                                  : Napaka, napačna resetirana vrednost
errors_ErrorSelectAtLeastOne                                                    : Napaka. Izberite vsaj en vnos.
errors_ErrorProductWithRefNotExist                                              : Proizvod z referenco '<i>%s</i>' ne obstaja
errors_ErrorDeleteNotPossibleLineIsConsolidated                                 : Brisanje ni možno, ker je zapis vezan na posredovano bančno transakcijo
errors_ErrorProdIdAlreadyExist                                                  : %s je dodeljen v drugo tretjo
errors_ErrorFailedToSendPassword                                                : Ni bilo mogoče poslati gesla
errors_ErrorFailedToLoadRSSFile                                                 : Ne Knjiga. Poskusite dodati stalno MAIN_SIMPLEXMLLOAD_DEBUG sporočila o napakah, če ne zagotavlja dovolj informacij.
errors_ErrorPasswordDiffers                                                     : Gesla razlikujejo, jih vnesite znova.
errors_ErrorForbidden                                                           : Dostop zavrnjen. <br> Poskusite dostopati do strani, območje ali funkcije, ne da bi v potrjeni seji ali da ni dovoljeno na vaš uporabnika.
errors_ErrorForbidden2                                                          : Dovoljenje za to prijavo se lahko opredeli skrbnik Speedealing iz menija %s-> %s.
errors_ErrorForbidden3                                                          : Zdi se, da je Speedealing ne uporablja prek overjeno sejo. Oglejte si namestitveno dokumentacijo Speedealing vedeti, kako upravljati authentications (htaccess, mod_auth ali drugo ...).
errors_ErrorNoImagickReadimage                                                  : Razred Imagick ni mogoče najti v tem PHP. Št Predogled je lahko na voljo. Skrbniki lahko onemogočite to kartico od Setup meniju - Display.
errors_ErrorRecordAlreadyExists                                                 : Zapis že obstaja
errors_ErrorCantReadFile                                                        : Ni mogoče prebrati Datoteka '%s želiš
errors_ErrorCantReadDir                                                         : Ni mogoče prebrati imenik '%s &quot;
errors_ErrorFailedToFindEntity                                                  : Ni mogoče prebrati okolje &quot;%s&quot;
errors_ErrorBadLoginPassword                                                    : Slaba vrednost za prijavo ali geslo
errors_ErrorLoginDisabled                                                       : Vaš račun je bil onemogočen
errors_ErrorFailedToRunExternalCommand                                          : Ni delujejo zunanji ukaz. Preverite, da je na voljo in loven vaš PHP strežnik. Če je omogočena PHP <b>Safe Mode,</b> preverite, ali je ukaz znotraj imenika opredeljeno <b>safe_mode_exec_dir</b> parametrov.
errors_ErrorFailedToChangePassword                                              : Ni, da spremenite geslo
errors_ErrorLoginDoesNotExists                                                  : Uporabnik s prijavo <b>%s</b> ni bilo mogoče najti.
errors_ErrorLoginHasNoEmail                                                     : Ta uporabnik nima e-poštni naslov. Obdelati prekinjena.
errors_ErrorBadValueForCode                                                     : Slaba vrednost za varnostno kodo. Poskusite znova z novo vrednost ...
errors_ErrorBothFieldCantBeNegative                                             : Polja %s in %s ne more biti tako negativna
errors_ErrorWebServerUserHasNotPermission                                       : Uporabniški račun <b>%s</b> uporablja za izvedbo spletni strežnik nima dovoljenja za to
errors_ErrorNoActivatedBarcode                                                  : Noben tip črtne kode ni aktiviran
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
errors_WarningSafeModeOnCheckExecDir                                            : Pozor, PHP opcija <b>safe_mode</b> je vklopljena, zato mora biti ukaz shranjen znotraj mape, ki jo določa php parameter <b>safe_mode_exec_dir</b>.
errors_WarningAllowUrlFopenMustBeOn                                             : Parameter <b>allow_url_fopen</b> mora biti nastavljen na <b>on</b> v <b>php.ini</b>, da bi ta modul deloval v celoti. To datoteko morate popraviti ročno.
errors_WarningBuildScriptNotRunned                                              : Skripta <b>%s</b> za izdelavo grafike še ni bila zagnana, ali ni na voljo podatkov za prikaz.
errors_WarningBookmarkAlreadyExists                                             : Zaznamek s tem imenom ali tem ciljem (URL) že obstaja.
errors_WarningPassIsEmpty                                                       : Pozor, geslo za bazo podatkov je prazno. To lahko pomeni varnostno luknjo. Zato morate dodati geslo v vašo bazo podatkov in spremeniti datoteko conf.php.
errors_WarningConfFileMustBeReadOnly                                            : Pozor, vašo konfiguracijsko datoteko (<b>htdocs/conf/conf.php</b>) lahko prepiše web strežnik. To je resna varnostna luknja. Spremenite dovoljenja datoteke, da bo za uporabnika web strežnika možno samo branje. Če uporabljate Windows in FAT format diska, morate vedeti, da ta datotečni sistem ne omogoča dodajanja dovoljenj datotekam, zato ne more biti povsem varen.
errors_WarningsOnXLines                                                         : Opozorilo na <b>%s</b> vrstice izvorne kode
errors_WarningNoDocumentModelActivated                                          : Noben model za ustvarjanje dokumentov ni aktiviran. Dokler ne preverite nastavitve modula, bo uporabljen privzet model.
errors_WarningLockFileDoesNotExists                                             : Warning, once setup is finished, you must disable install/migrate tools by adding a file <b>install.lock</b> into directory <b>%s</b>. Missing this file is a security hole.
errors_WarningUntilDirRemoved                                                   : Vsi varnostni opozorila (vidna le uporabniki admin) ostane aktiven, dokler je prisotna ranljivost (ali stalno MAIN_REMOVE_INSTALL_WARNING se doda v Setup-> druge nastavitve).
errors_WarningCloseAlways                                                       : Warning, closing is done even if amount differs between source and target elements. Enable this feature with caution.
errors_ErrorEnterYourLogin                                                      : Identifiant vide
errors_ErrorEnterYourPassword                                                   : Mot de passe vide
mails_Mailing                                                                   : E-pošta
mails_EMailing                                                                  : E-pošta
mails_Mailings                                                                  : E-pošta
mails_EMailings                                                                 : E-pošta
mails_AllEMailings                                                              : Vsa e-pošta
mails_MailCard                                                                  : Kartica e-pošte
mails_MailTargets                                                               : Cilji
mails_MailRecipients                                                            : Prejemniki
mails_MailRecipient                                                             : Prejemnik
mails_MailTitle                                                                 : Naziv
mails_MailFrom                                                                  : Pošiljatelj
mails_MailErrorsTo                                                              : Naslov za napake
mails_MailReply                                                                 : Odgovoriti
mails_MailTo                                                                    : Za
mails_MailCC                                                                    : Kopija
mails_MailCCC                                                                   : Skrita kopija
mails_MailTopic                                                                 : Zadeva
mails_MailText                                                                  : Sporočilo
mails_MailFile                                                                  : Priloge
mails_MailMessage                                                               : Vsebina
mails_ShowEMailing                                                              : Prikaži e-sporočila
mails_ListOfEMailings                                                           : Seznam e-sporočil
mails_NewMailing                                                                : Novo e-sporočilo
mails_EditMailing                                                               : Urejanje e-pošte
mails_ResetMailing                                                              : Ponovno pošiljanje e-pošte
mails_DeleteMailing                                                             : Brisanje e-pošte
mails_DeleteAMailing                                                            : Brisanje e-sporočila
mails_PreviewMailing                                                            : Predogled e-pošte
mails_PrepareMailing                                                            : Priprava e-pošte
mails_CreateMailing                                                             : Kreiraj e-pošto
mails_MailingDesc                                                               : Ta stran omogoča pošiljanje e-pošte skupini ljudi.
mails_MailingResult                                                             : Rezultati pošiljanja e-pošte
mails_TestMailing                                                               : Testna e-pošta
mails_ValidMailing                                                              : Potrjena e-pošta
mails_ApproveMailing                                                            : Odobrena e-pošta
mails_MailingStatusDraft                                                        : Osnutek
mails_MailingStatusValidated                                                    : Potrjeno
mails_MailingStatusApproved                                                     : Odobreno
mails_MailingStatusSent                                                         : Poslano
mails_MailingStatusSentPartialy                                                 : Delno poslano
mails_MailingStatusSentCompletely                                               : Poslano v celoti
mails_MailingStatusError                                                        : Napaka
mails_MailingStatusNotSent                                                      : Ni poslano
mails_MailSuccessfulySent                                                       : E-pošta uspešno poslana (od %s za %s)
mails_MailingSuccessfullyValidated                                              : EMailing successfully validated
mails_MailUnsubcribe                                                            : Unsubscribe
mails_Unsuscribe                                                                : Unsubscribe
mails_MailingStatusNotContact                                                   : Don't contact anymore
mails_ErrorMailRecipientIsEmpty                                                 : Prejemnik ni določen
mails_WarningNoEMailsAdded                                                      : Nobenega novega e-sporočila ni za dodajanje na prejemnikov seznam.
mails_ConfirmValidMailing                                                       : Ali zares želite potrditi to e-sporočilo ?
mails_ConfirmResetMailing                                                       : Pozor, s ponovno inicializacijo e-pošte <b>%s</b>, boste še enkrat poslali to e-pošto celotni skupini prejemnikov. Ali zagotovo želite to storiti ?
mails_ConfirmDeleteMailing                                                      : Ali zares želite izbrisati to elektronsko sporočilo ?
mails_NbOfRecipients                                                            : Število prejemnikov
mails_NbOfUniqueEMails                                                          : Število enoličnih e-sporočil
mails_NbOfEMails                                                                : Število e-sporočil
mails_TotalNbOfDistinctRecipients                                               : Število različnih prejemnikov
mails_NoTargetYet                                                               : Noben prejemnik še ni določen (Pojdite na jeziček 'Prejemniki')
mails_AddRecipients                                                             : Dodaj prejemnike
mails_RemoveRecipient                                                           : Odstrani prejemnika
mails_CommonSubstitutions                                                       : Običajne zamenjave
mails_YouCanAddYourOwnPredefindedListHere                                       : Za kreiranje vašega modula e-pošte glejte htdocs/includes/modules/mailings/README.
mails_EMailTestSubstitutionReplacedByGenericValues                              : V testnem načinu so nadomestne spremenljivke zamenjane z generičnimi vrednostmi
mails_MailingAddFile                                                            : Dodaj to datoteko
mails_NoAttachedFiles                                                           : Ni dodanih datotek
mails_BadEMail                                                                  : Napačna e-pošta
mails_CloneEMailing                                                             : Kloniraj e-pošto
mails_ConfirmCloneEMailing                                                      : Ali zares želite klonirati to e-pošto ?
mails_CloneContent                                                              : Kloniraj sporočilo
mails_CloneReceivers                                                            : Kloniraj prejemnike
mails_DateLastSend                                                              : Datum zadnjega pošiljanja
mails_DateSending                                                               : Datum pošiljanja
mails_SentTo                                                                    : Poslano na <b>%s</b>
mails_MailingStatusRead                                                         : Preberite
mails_CheckRead                                                                 : Read Receipt
mails_YourMailUnsubcribeOK                                                      : The email <b>%s</b>  is correctly unsubcribe from mailing list
mails_MailtoEMail                                                               : Hyper link to email
mails_ActivateCheckRead                                                         : Allow to use the Read receipt tracker and the unsubcribe link
mails_ActivateCheckReadKey                                                      : Key use to encrypt URL use for Read Receipt and unsubcribe function
mails_MailingModuleDescContactCompanies                                         : Kontakti vseh partnerjev (kupci, možne stranke, dobavitelji, ...)
mails_MailingModuleDescSpeedealingUsers                                         : Speedealing users
mails_MailingModuleDescFundationMembers                                         : Vsi člani ustanove z e-naslovom
mails_MailingModuleDescEmailsFromFile                                           : E-pošta iz tekstovne datoteke (e-naslov;ime;priimek;komentarji)
mails_MailingModuleDescEmailsFromUser                                           : EMails from user input (email;lastname;firstname;other)
mails_MailingModuleDescContactsCategories                                       : Partnerji z e-naslovi (po kategorijah)
mails_MailingModuleDescSpeedealingContractsLinesExpired                         : Third parties with expired contract's lines
mails_MailingModuleDescContactsByCompanyCategory                                : Kontakt partnerja (po kategorijah partnerjev)
mails_MailingModuleDescMembersCategories                                        : Člani fundacij (po kategorijah)
mails_MailingModuleDescContactsByFunction                                       : Kontakti partnerjev (po delovnem mestu/funkciji)
mails_LineInFile                                                                : %s vrstica v datoteki
mails_RecipientSelectionModules                                                 : Določitev zahtev za izbiro prejemnikov
mails_MailSelectedRecipients                                                    : Izbrani prejemniki
mails_MailingArea                                                               : Področje e-pošte
mails_LastMailings                                                              : Zadnjih %s e-sporočil
mails_TargetsStatistics                                                         : Ciljna statistika
mails_NbOfCompaniesContacts                                                     : Enolični kontakti podjetij
mails_MailNoChangePossible                                                      : Prejemnikov za potrjeno e-sporočilo ne morete spremeniti
mails_SearchAMailing                                                            : Iskanje e-pošte
mails_SendMailing                                                               : Pošiljanje e-pošte
mails_SendMail                                                                  : Pošlji e-pošto
mails_SentBy                                                                    : Poslal
mails_MailingNeedCommand                                                        : Zaradi varnostnih razlogov se pošiljanje e-pošte lahko izvrši samo iz ukazne vrstice. Prosite vašega administratorja za zagon naslednjega ukaza za pošiljanje e-pošte vsem prejemnikom:
mails_MailingNeedCommand2                                                       : Lahko jih seveda pošljete tudi »online«, če dodate parameter MAILING_LIMIT_SENDBYWEB z največjim številom e-sporočil, ki jih želite poslati v eni seji.
mails_ConfirmSendingEmailing                                                    : Ali zares želite poslati to e-pošto ?
mails_LimitSendingEmailing                                                      : On line pošiljanje e-pošte je omejeno zaradi varnostnih in  časovnih omejitev na <b>%s</b> prejemnikov v eni seji.
mails_TargetsReset                                                              : Prekliči seznam
mails_ToClearAllRecipientsClickHere                                             : Kliknite tukaj za preklic seznama prejemnikov te e-pošte
mails_ToAddRecipientsChooseHere                                                 : Dodajanje prejemnikov z izbiro s seznamov
mails_NbOfEMailingsReceived                                                     : Število prejetih masovnih e-sporočil
mails_IdRecord                                                                  : ID zapis
mails_DeliveryReceipt                                                           : Potrditev prejema
mails_YouCanUseCommaSeparatorForSeveralRecipients                               : Lahko uporabite <b>vejico</b> kot ločilo pri naštevanju več prejemnikov.
mails_TagCheckMail                                                              : Track mail opening
mails_TagUnsubscribe                                                            : Unsubscribe link
mails_TagSignature                                                              : Signature sending user
mails_TagMailtoEmail                                                            : Recipient EMail
mails_Notifications                                                             : Obvestila
mails_NoNotificationsWillBeSent                                                 : Za ta dogodek in podjetje niso predvidena obvestila po e-pošti
mails_ANotificationsWillBeSent                                                  : 1 obvestilo bo poslano z e-pošto
mails_SomeNotificationsWillBeSent                                               : %s obvestil bo poslanih z e-pošto
mails_AddNewNotification                                                        : Aktiviraj nov zahtevek za e-poštno obvestilo
mails_ListOfActiveNotifications                                                 : Seznam vseh aktivnih zahtev za e-poštna obvestila
mails_ListOfNotificationsDone                                                   : Seznam vseh poslanih e-poštnih obvestil
main_DIRECTION                                                                  : ltr
main_SeparatorDecimal                                                           : ,
main_SeparatorThousand                                                          : .
main_date                                                                       : [object Object]
main_FormatDateShort                                                            : %d/%m/%Y
main_FormatHourShort                                                            : %I:%M %p
main_FormatHourShortDuration                                                    : %H:%M
main_FormatDateTextShort                                                        : %d. %b, %Y
main_FormatDateText                                                             : %d. %B, %Y
main_FormatDateHourShort                                                        : %d/%m/%Y %I:%M %p
main_FormatDateHourTextShort                                                    : %d. %b, %Y, %I:%M %p
main_FormatDateHourText                                                         : %d. %B, %Y, %I:%M %p
main_DatabaseConnection                                                         : Povezave podatkovnih baz
main_NoTranslation                                                              : No translation
main_NoRecordFound                                                              : Aucun enregistrement trouvé
main_NoError                                                                    : Ni napake
main_Error                                                                      : Napaka
main_ErrorFieldRequired                                                         : Polje '%s' je obvezno
main_ErrorFieldFormat                                                           : Vrednost v polju '%s' je napačna
main_ErrorFileDoesNotExists                                                     : Datoteka %s ne obstaja
main_ErrorFailedToOpenFile                                                      : Napaka pri odpiranju datoteke %s
main_ErrorCanNotCreateDir                                                       : Ni možno kreiranje mape %s
main_ErrorCanNotReadDir                                                         : Ni možno branje mape %s
main_ErrorConstantNotDefined                                                    : Parameter %s ni definiran
main_ErrorUnknown                                                               : Neznana napaka
main_ErrorSQL                                                                   : SQL napaka
main_ErrorLogoFileNotFound                                                      : Datoteka z logotipom '%s' ni bila najdena
main_ErrorGoToGlobalSetup                                                       : Popravite v meniju 'Nastavitve', 'Podjetje/Ustanova'
main_ErrorGoToModuleSetup                                                       : Popravite v meniju 'Nastavitve', 'Moduli'
main_ErrorFailedToSendMail                                                      : Napaka pri pošiljanju E-maila (pošiljatelj=%s, prejemnik=%s)
main_ErrorAttachedFilesDisabled                                                 : Pripeta datoteka je na tem strežniku onemogočena
main_ErrorFileNotUploaded                                                       : Datoteka ni bila naložena. Preverite, če velikost ne presega omejitve, če je na disku dovolj prostora ali če datoteka z istim imenom že obstaja v tej mapi.
main_ErrorInternalErrorDetected                                                 : Zaznana napaka
main_ErrorNoRequestRan                                                          : Noben zahtevek se ne izvaja
main_ErrorWrongHostParameter                                                    : Napačen parameter gostitelja
main_ErrorYourCountryIsNotDefined                                               : Vaša država ni definirana. Pojdite na Domov-Nastavitve-Urejanje in ponovno pošljite obrazec.
main_ErrorRecordIsUsedByChild                                                   : Brisanje zapisa ni uspelo. Ta zapis uporablja vsaj en odvisni zapis.
main_ErrorWrongValue                                                            : Napačna vrednost
main_ErrorWrongValueForParameterX                                               : Napačna vrednost parametra %s
main_ErrorNoRequestInError                                                      : No request in error
main_ErrorServiceUnavailableTryLater                                            : Storitev trenutno ni na voljo. Ponovno poskusite kasneje.
main_ErrorDuplicateField                                                        : Podvojena vrednost v enoličnem polju
main_ErrorSomeErrorWereFoundRollbackIsDone                                      : Najdenih je bilo nekaj napak. Spremembe so razveljavljene.
main_ErrorConfigParameterNotDefined                                             : Parameter <b>%s</b> ni definiran v Speedealing konfiguracijski datoteki <b>conf.php</b>.
main_ErrorCantLoadUserFromSpeedealingDatabase                                   : Failed to find user <b>%s</b> in Speedealing database.
main_ErrorNoVATRateDefinedForSellerCountry                                      : Napaka, za državo '%s' niso definirane davčna stopnje.
main_ErrorNoSocialContributionForSellerCountry                                  : Napaka, za državo '%s' niso definirani socialni prispevki.
main_ErrorFailedToSaveFile                                                      : Napaka, datoteka ni bila shranjena.
main_ErrorOnlyPngJpgSupported                                                   : Napaka, podprta sta samo slikovna formata .png in .jpg.
main_ErrorImageFormatNotSupported                                               : Vaš PHP ne podpira funkcije pretvarjanja slik tega formata.
main_SeeAlso                                                                    : See also %s
main_BackgroundColorByDefault                                                   : Privzeta barva ozadja
main_FileWasNotUploaded                                                         : Izbrana je bila datoteka za prilogo, vendar še ni dodana. Kliknite na "Pripni datoteko".
main_NbOfEntries                                                                : Število vpisov
main_GoToWikiHelpPage                                                           : Preberite online pomoč (potreben je internetni dostop)
main_GoToHelpPage                                                               : Preberite pomoč
main_RecordSaved                                                                : Zapis je shranjen
main_LevelOfFeature                                                             : Nivo značilnosti
main_NotDefined                                                                 : Ni definiran
main_DefinedAndHasThisValue                                                     : Definiran z vrednostjo
main_IsNotDefined                                                               : ni definiran
main_SpeedealingInHttpAuthenticationSoPasswordUseless                           : Speedealing authentication mode is setup to <b>%s</b> in configuration file <b>conf.php</b>.<br>This means that password database is extern to Speedealing, so changing this field may have no effects.
main_Administrator                                                              : Administrator
main_Undefined                                                                  : Nedefinirano
main_PasswordForgotten                                                          : Ste pozabili geslo ?
main_SeeAbove                                                                   : Glejte zgoraj
main_HomeArea                                                                   : Domače področje
main_LastConnexion                                                              : Zadnja prijava
main_PreviousConnexion                                                          : Prejšnja prijava
main_ConnectedOnMultiCompany                                                    : Prijava na entiteto
main_ConnectedSince                                                             : Prijavljen od
main_AuthenticationMode                                                         : Način preverjanja pristnosti
main_RequestedUrl                                                               : Zahtevan Url
main_DatabaseTypeManager                                                        : Upravljalnik tipov baz podatkov
main_RequestLastAccess                                                          : Zahtevek za dostop do zadnje baze podatkov
main_RequestLastAccessInError                                                   : Napaka zahtevka za dostop do zadnje baze podatkov
main_ReturnCodeLastAccessInError                                                : Return code for last database access in error
main_InformationLastAccessInError                                               : Napaka informacije zahtevka za dostop do zadnje baze podatkov
main_SpeedealingHasDetectedError                                                : Speedealing has detected a technical error
main_InformationToHelpDiagnose                                                  : Ta informacija lahko pomaga pri diagnozi
main_MoreInformation                                                            : Več informacij
main_NotePublic                                                                 : Opomba (javna)
main_NotePrivate                                                                : Opomba (privatna)
main_PrecisionUnitIsLimitedToXDecimals                                          : Speedealing je nastavljen na omejitev natančnosti cen posameznih enot na <b>%s</b> decimalk.
main_DoTest                                                                     : Test
main_ToFilter                                                                   : Filter
main_WarningYouHaveAtLeastOneTaskLate                                           : Pozor, vsaj en element je prekoračil dovoljeno toleranco za zamudo.
main_yes                                                                        : da
main_Yes                                                                        : Da
main_no                                                                         : ne
main_No                                                                         : Ne
main_All                                                                        : Vse
main_Home                                                                       : Domov
main_Help                                                                       : Pomoč
main_OnlineHelp                                                                 : Online pomoč
main_PageWiki                                                                   : Wiki stran
main_Always                                                                     : Vedno
main_Never                                                                      : Nikoli
main_Under                                                                      : pod
main_Period                                                                     : Obdobje
main_PeriodEndDate                                                              : Končni datum obdobja
main_Activate                                                                   : Aktiviraj
main_Activated                                                                  : Aktiviran
main_Closed                                                                     : Zaključen
main_Close                                                                      : Zapri
main_Closed2                                                                    : Zaključen
main_Enabled                                                                    : Omogočen
main_Disable                                                                    : Onemogoči
main_Disabled                                                                   : Onemogočen
main_Add                                                                        : Dodaj
main_AddLink                                                                    : Dodaj povezavo
main_Update                                                                     : Posodobi
main_AddActionToDo                                                              : Dodaj planirano aktivnost
main_AddActionDone                                                              : Dodaj izvršeno aktivnost
main_Close2                                                                     : Zapri
main_Confirm                                                                    : Potrdi
main_ConfirmSendCardByMail                                                      : Ali zares želite poslati to kartico po elektronski pošti ?
main_Delete                                                                     : Briši
main_Remove                                                                     : Odstrani
main_Resiliate                                                                  : Razveljavi
main_Cancel                                                                     : Razveljavi
main_Modify                                                                     : Spremeni
main_Edit                                                                       : Uredi
main_Validate                                                                   : Potrdi
main_ToValidate                                                                 : Za potrditev
main_Save                                                                       : Shrani
main_SaveAs                                                                     : Shrani kot
main_TestConnection                                                             : Test povezave
main_ToClone                                                                    : Kloniraj
main_ConfirmClone                                                               : Izberi podatke za kloniranje :
main_NoCloneOptionsSpecified                                                    : Ni definiranih podatkov za kloniranje.
main_Of                                                                         : od
main_CopyOf                                                                     : Kopija od
main_Show                                                                       : Prikaži
main_ShowCardHere                                                               : Prikaži kartico
main_Search                                                                     : Išči
main_SearchOf                                                                   : Iskanje
main_Valid                                                                      : Veljaven
main_ToBill                                                                     : Kreiraj račun
main_Approve                                                                    : Potrdi
main_ReOpen                                                                     : Ponovno odpri
main_Upload                                                                     : Dodaj datoteko
main_Select                                                                     : Dodaj kot lastnika
main_Choose                                                                     : Izbira
main_ChooseLangage                                                              : Prosimo, izberite vaš jezik
main_Resize                                                                     : Spremeni velikost
main_Recenter                                                                   : Ponovno centriraj
main_Author                                                                     : Avtor
main_User                                                                       : Uporabnik
main_Users                                                                      : Uporabniki
main_Group                                                                      : Skupina
main_Groups                                                                     : Skupine
main_Password                                                                   : Geslo
main_PasswordRetype                                                             : Ponoven vnos gesla
main_NoteSomeFeaturesAreDisabled                                                : Upoštevajte, da je veliko funkcij/modulov v tej demonstraciji onemogočenih.
main_Name                                                                       : Priimek
main_Person                                                                     : Oseba
main_Parameter                                                                  : Parameter
main_Parameters                                                                 : Parametri
main_Value                                                                      : Vrednost
main_GlobalValue                                                                : Globalna vrednost
main_PersonalValue                                                              : Osebna vrednost
main_NewValue                                                                   : Nova vrednost
main_CurrentValue                                                               : Trenutna vrednost
main_Code                                                                       : Koda
main_Type                                                                       : Tip
main_Language                                                                   : Jezik
main_MultiLanguage                                                              : Večjezično
main_Note                                                                       : Opomba
main_CurrentNote                                                                : Trenutna opomba
main_Title                                                                      : Naziv
main_Label                                                                      : Oznaka
main_RefOrLabel                                                                 : Referenca ali oznaka
main_Info                                                                       : Beležka
main_Family                                                                     : Družina
main_Description                                                                : Opis
main_Designation                                                                : Označba
main_Model                                                                      : Vzorec
main_DefaultModel                                                               : Privzet vzorec
main_Action                                                                     : Aktivnost
main_About                                                                      : O programu
main_Number                                                                     : Številka
main_NumberByMonth                                                              : Številka po mesecih
main_AmountByMonth                                                              : Znesek po mesecih
main_Numero                                                                     : Številka
main_Limit                                                                      : Omejitev
main_Limits                                                                     : Omejitve
main_DevelopmentTeam                                                            : Razvojni tim
main_Logout                                                                     : Odjava
main_Connection                                                                 : Prijava
main_Setup                                                                      : Nastavitve
main_Alert                                                                      : Opozorilo
main_Previous                                                                   : Prejšnji
main_Next                                                                       : Naslednji
main_Cards                                                                      : Kartice
main_Card                                                                       : Kartica
main_Now                                                                        : Zdaj
main_Date                                                                       : Datum
main_DateStart                                                                  : Začetni datum
main_DateEnd                                                                    : Končni datum
main_DateCreation                                                               : Datum kreiranja
main_DateModification                                                           : Datum spremembe
main_DateModificationShort                                                      : Dat.spr.
main_DateLastModification                                                       : Datum zadnje spremembe
main_DateValidation                                                             : Datum potrditve
main_DateClosing                                                                : Datum zaključka
main_DateDue                                                                    : Datum poteka
main_DateValue                                                                  : Datum veljavnosti
main_DateValueShort                                                             : Datum veljavnosti
main_DateOperation                                                              : Datum delovanja
main_DateOperationShort                                                         : Dat. delov.
main_DateLimit                                                                  : Omejitveni datum
main_DateRequest                                                                : Datum zahteve
main_DateProcess                                                                : Datum procesiranja
main_DatePlanShort                                                              : Planiran datum
main_DateRealShort                                                              : Datum real.
main_DateBuild                                                                  : Datum izdelave poročila
main_DatePayment                                                                : Datum plačila
main_DurationYear                                                               : leto
main_DurationMonth                                                              : mesec
main_DurationWeek                                                               : teden
main_DurationDay                                                                : dan
main_DurationYears                                                              : let
main_DurationMonths                                                             : mesecev
main_DurationWeeks                                                              : tednov
main_DurationDays                                                               : dni
main_Year                                                                       : Leto
main_Month                                                                      : Mesec
main_Week                                                                       : Teden
main_Day                                                                        : Dan
main_Hour                                                                       : Ura
main_Minute                                                                     : Minuta
main_Second                                                                     : Sekunda
main_Years                                                                      : Let
main_Months                                                                     : Mesecev
main_Days                                                                       : Dni
main_days                                                                       : dni
main_Hours                                                                      : Ur
main_Minutes                                                                    : Minut
main_Seconds                                                                    : Sekund
main_Today                                                                      : Danes
main_Yesterday                                                                  : Včeraj
main_Tomorrow                                                                   : Jutri
main_Quadri                                                                     : Četrtletje
main_MonthOfDay                                                                 : Dan v mesecu
main_HourShort                                                                  : H
main_Rate                                                                       : Stopnja
main_UseLocalTax                                                                : Include tax
main_LocalTaxDesc                                                               : Some countries apply 2 or 3 taxes on each invoice line. If this is the case, choose type for second and third tax and its rate. Possible type are:<br>1 : local tax apply on products and services without vat (vat is not applied on local tax)<br>2 : local tax apply on products and services before vat (vat is calculated on amount + localtax)<br>3 : local tax apply on products without vat (vat is not applied on local tax)<br>4 : local tax apply on products before vat (vat is calculated on amount + localtax)<br>5 : local tax apply on services without vat (vat is not applied on local tax)<br>6 : local tax apply on services before vat (vat is calculated on amount + localtax)<br>7 : local tax is a fix amount applied on global invoice
main_Bytes                                                                      : Byti
main_KiloBytes                                                                  : Kilobyti
main_MegaBytes                                                                  : Megabyti
main_GigaBytes                                                                  : Gigabyti
main_TeraBytes                                                                  : Terabyti
main_b                                                                          : b.
main_Kb                                                                         : Kb
main_Mb                                                                         : Mb
main_Gb                                                                         : Gb
main_Tb                                                                         : Tb
main_Cut                                                                        : Izreži
main_Copy                                                                       : Kopiraj
main_Paste                                                                      : Prilepi
main_Default                                                                    : Privzeto
main_DefaultValue                                                               : Privzeta vrednost
main_DefaultGlobalValue                                                         : Globalna vrednost
main_Price                                                                      : Cena
main_UnitPrice                                                                  : Cena enote
main_UnitPriceHT                                                                : Cena enote (neto)
main_UnitPriceTTC                                                               : Cena enote
main_PriceU                                                                     : C.E.
main_PriceUHT                                                                   : C.E. (neto)
main_PriceUTTC                                                                  : C.E.
main_Amount                                                                     : Znesek
main_AmountInvoice                                                              : Znesek računa
main_AmountPayment                                                              : Znesek za plačilo
main_AmountHTShort                                                              : Znesek (neto)
main_AmountTTCShort                                                             : Znesek (z DDV)
main_AmountHT                                                                   : Znesek (neto)
main_AmountTTC                                                                  : Znesek (z DDV)
main_AmountVAT                                                                  : Znesek DDV
main_AmountLT1ES                                                                : Znesek RE
main_AmountLT2ES                                                                : Znesek IRPF
main_AmountTotal                                                                : Skupni znesek
main_AmountAverage                                                              : Povprečni znesek
main_PriceQtyHT                                                                 : Cena za to količino (neto)
main_PriceQtyMinHT                                                              : Minimalna cena za to količino (neto)
main_PriceQtyTTC                                                                : Cena za to količino (z DDV)
main_PriceQtyMinTTC                                                             : Minimalna cena za to količino (z DDV)
main_Percentage                                                                 : Procent
main_Total                                                                      : Skupaj
main_SubTotal                                                                   : Delna vsota
main_TotalHTShort                                                               : Skupaj (neto)
main_TotalTTCShort                                                              : Skupaj (z DDV)
main_TotalHT                                                                    : Skupaj (neto)
main_TotalTTC                                                                   : Skupaj (z DDV)
main_TotalTTCToYourCredit                                                       : Skupaj (z DDV) na vaš dobropis
main_TotalVAT                                                                   : Skupaj DDV
main_TotalLT1ES                                                                 : Skupaj RE
main_TotalLT2ES                                                                 : Skupaj IRPF
main_IncludedVAT                                                                : Vključen DDV
main_HT                                                                         : Brez DDV
main_TTC                                                                        : Z DDV
main_VAT                                                                        : DDV
main_LT1ES                                                                      : RE
main_LT2ES                                                                      : IRPF
main_VATRate                                                                    : Stopnja DDV
main_Average                                                                    : Povprečje
main_Sum                                                                        : Vsota
main_Delta                                                                      : Razlika
main_Module                                                                     : Modul
main_Option                                                                     : Opcija
main_List                                                                       : Seznam
main_FullList                                                                   : Celoten seznam
main_Statistics                                                                 : Statistika
main_OtherStatistics                                                            : Druga statistika
main_Status                                                                     : Status
main_Ref                                                                        : Ref.
main_RefSupplier                                                                : Ref. dobavitelj
main_RefPayment                                                                 : Ref. plačilo
main_CommercialProposals                                                        : Komercialne ponudbe
main_Comment                                                                    : Komentar
main_Comments                                                                   : Komentarji
main_ActionsToDo                                                                : Odprte aktivnosti
main_ActionsDone                                                                : Izvršene aktivnosti
main_ActionsToDoShort                                                           : Planirane
main_ActionsRunningshort                                                        : Začete
main_ActionsDoneShort                                                           : Izvršene
main_ActionNotApplicable                                                        : Ni na voljo
main_ActionRunningNotStarted                                                    : Nezačete
main_ActionRunningShort                                                         : Začete
main_ActionDoneShort                                                            : Končane
main_CompanyFoundation                                                          : Podjetje/Ustanova
main_ContactsForCompany                                                         : Kontakti tega partnerja
main_ContactsAddressesForCompany                                                : Contacts/addresses for this third party
main_AddressesForCompany                                                        : Addresses for this third party
main_Address                                                                    : Naslov
main_ActionsOnCompany                                                           : Aktivnosti v zvezi s tem partnerjem
main_ActionsOnMember                                                            : Dogodki okoli tega člana
main_NActions                                                                   : %s aktivnosti
main_NActionsLate                                                               : %s zamujenih
main_Filter                                                                     : Filter
main_RemoveFilter                                                               : Odstrani filter
main_ChartGenerated                                                             : Grafikon je ustvarjen
main_ChartNotGenerated                                                          : Grafikon ni ustvarjen
main_GeneratedOn                                                                : Ustvarjen dne %s
main_Generate                                                                   : Ustvari
main_Duration                                                                   : Trajanje
main_TotalDuration                                                              : Skupno trajanje
main_Summary                                                                    : Povzetek
main_MyBookmarks                                                                : Moji zaznamki
main_OtherInformationsBoxes                                                     : Ostali informacijski okvirji
main_SpeedealingBoard                                                           : Speedealing board
main_SpeedealingStateBoard                                                      : Statistics
main_SpeedealingWorkBoard                                                       : Work tasks board
main_Available                                                                  : Na voljo
main_NotYetAvailable                                                            : Še ni na voljo
main_NotAvailable                                                               : Ni na voljo
main_Popularity                                                                 : Priljubljenost
main_Categories                                                                 : Kategorije
main_Category                                                                   : Kategorija
main_By                                                                         : Z
main_From                                                                       : Od
main_to                                                                         : do
main_and                                                                        : in
main_or                                                                         : ali
main_Other                                                                      : ostalo
main_Others                                                                     : Ostali
main_OtherInformations                                                          : Ostale informacije
main_Quantity                                                                   : Količina
main_Qty                                                                        : Kol.
main_ChangedBy                                                                  : Spremenil
main_ReCalculate                                                                : Preračunaj
main_ResultOk                                                                   : Uspeh
main_ResultKo                                                                   : Napaka
main_Reporting                                                                  : Poročilo
main_Reportings                                                                 : Poročila
main_Draft                                                                      : Osnutek
main_Drafts                                                                     : Osnutki
main_Validated                                                                  : Potrjen
main_Opened                                                                     : Odprt
main_New                                                                        : Nov
main_Discount                                                                   : Popust
main_Unknown                                                                    : Neznan
main_General                                                                    : Splošno
main_Size                                                                       : Velikost
main_Received                                                                   : Prejet
main_Paid                                                                       : Plačan
main_Topic                                                                      : Tema
main_ByCompanies                                                                : S podjetji
main_ByUsers                                                                    : Z uporabniki
main_Links                                                                      : Povezave
main_Link                                                                       : Povezava
main_Receipts                                                                   : Potrditve
main_Rejects                                                                    : Zavrnitve
main_Preview                                                                    : Predogled
main_NextStep                                                                   : Naslednji korak
main_PreviousStep                                                               : Prejšnji korak
main_Datas                                                                      : Podatki
main_None                                                                       : Nič
main_NoneF                                                                      : Nič
main_Late                                                                       : Prekoračeno
main_Photo                                                                      : Slika
main_Photos                                                                     : Slike
main_AddPhoto                                                                   : Dodaj sliko
main_Login                                                                      : Uporabniško ime
main_CurrentLogin                                                               : Trenutna prijava
main_January                                                                    : Januar
main_February                                                                   : Februar
main_March                                                                      : Marec
main_April                                                                      : April
main_May                                                                        : Maj
main_June                                                                       : Junij
main_July                                                                       : Julij
main_August                                                                     : Avgust
main_September                                                                  : September
main_October                                                                    : Oktober
main_November                                                                   : November
main_December                                                                   : December
main_JanuaryMin                                                                 : Jan
main_FebruaryMin                                                                : Feb
main_MarchMin                                                                   : Mar
main_AprilMin                                                                   : Apr
main_MayMin                                                                     : Maj
main_JuneMin                                                                    : Jun
main_JulyMin                                                                    : Jul
main_AugustMin                                                                  : Aug
main_SeptemberMin                                                               : Sep
main_OctoberMin                                                                 : Okt
main_NovemberMin                                                                : Nov
main_DecemberMin                                                                : Dec
main_Month01                                                                    : januar
main_Month02                                                                    : februar
main_Month03                                                                    : marec
main_Month04                                                                    : april
main_Month05                                                                    : maj
main_Month06                                                                    : junij
main_Month07                                                                    : julij
main_Month08                                                                    : avgust
main_Month09                                                                    : september
main_Month10                                                                    : oktober
main_Month11                                                                    : november
main_Month12                                                                    : december
main_MonthShort01                                                               : jan
main_MonthShort02                                                               : feb
main_MonthShort03                                                               : mar
main_MonthShort04                                                               : apr
main_MonthShort05                                                               : maj
main_MonthShort06                                                               : jun
main_MonthShort07                                                               : jul
main_MonthShort08                                                               : avg
main_MonthShort09                                                               : sep
main_MonthShort10                                                               : okt
main_MonthShort11                                                               : nov
main_MonthShort12                                                               : dec
main_AttachedFiles                                                              : Pripete datoteke in dokumenti
main_FileTransferComplete                                                       : Datoteka je bila uspešno naložena
main_DateFormatYYYYMM                                                           : YYYY-MM
main_DateFormatYYYYMMDD                                                         : YYYY-MM-DD
main_DateFormatYYYYMMDDHHMM                                                     : YYYY-MM-DD HH:SS
main_ReportName                                                                 : Ime poročila
main_ReportPeriod                                                               : Obdobje poročila
main_ReportDescription                                                          : Opis
main_Report                                                                     : Poročilo
main_Keywords                                                                   : Mots clés
main_Legend                                                                     : Legenda
main_FillTownFromZip                                                            : Zapolni mesto iz poštne številke
main_ShowLog                                                                    : Prikaži dnevnik
main_File                                                                       : Datoteka
main_Files                                                                      : Datoteke
main_NotAllowed                                                                 : Ni dovoljeno
main_ReadPermissionNotAllowed                                                   : Dovoljenje za branje ni dodeljeno
main_AmountInCurrency                                                           : Znesek v valuti %s
main_Example                                                                    : Primer
main_Examples                                                                   : Primeri
main_NoExample                                                                  : Ni primera
main_FindBug                                                                    : Poročilo o hrošču
main_NbOfThirdParties                                                           : Število partnerjev
main_NbOfCustomers                                                              : Število kupcev
main_NbOfLines                                                                  : Število vrstic
main_NbOfObjects                                                                : Število predmetov
main_NbOfReferers                                                               : Število posrednikov
main_Referers                                                                   : Posredniki
main_TotalQuantity                                                              : Skupna količina
main_DateFromTo                                                                 : Od %s do %s
main_DateFrom                                                                   : Od %s
main_DateUntil                                                                  : Do %s
main_Check                                                                      : Preveri
main_Internal                                                                   : Interno
main_External                                                                   : Eksterno
main_Internals                                                                  : Interni
main_Externals                                                                  : Eksterni
main_Warning                                                                    : Opozorilo
main_Warnings                                                                   : Opozorila
main_BuildPDF                                                                   : Izdelaj PDF
main_RebuildPDF                                                                 : Obnovi PDF
main_BuildDoc                                                                   : Izdelaj Doc
main_RebuildDoc                                                                 : Obnovi Doc
main_Entity                                                                     : Entiteta
main_Entities                                                                   : Entitete
main_EventLogs                                                                  : Dnevniki
main_CustomerPreview                                                            : Predogled kupca
main_SupplierPreview                                                            : Predogled dobavitelja
main_AccountancyPreview                                                         : Pregled računovodstva
main_ShowCustomerPreview                                                        : Prikaži pregled kupca
main_ShowSupplierPreview                                                        : Prikaži pregled dobavitelja
main_ShowAccountancyPreview                                                     : Prikaži predogled računovodstva
main_ShowProspectPreview                                                        : Prikaži predogled možne stranke
main_RefCustomer                                                                : Ref. kupca
main_Currency                                                                   : Valuta
main_InfoAdmin                                                                  : Informacija za administratorje
main_Undo                                                                       : Razveljavi
main_Redo                                                                       : Uveljavi
main_ExpandAll                                                                  : Razširi vse
main_UndoExpandAll                                                              : Razveljavi razširitev
main_Reason                                                                     : Razlog
main_FeatureNotYetSupported                                                     : Funkcija še ni podprta
main_CloseWindow                                                                : Zaprite okno
main_Question                                                                   : Vprašanje
main_Response                                                                   : Odgovor
main_Priority                                                                   : Prioriteta
main_SendByMail                                                                 : Pošlji EMail
main_MailSentBy                                                                 : Email poslal
main_TextUsedInTheMessageBody                                                   : Vsebina Email-a
main_SendAcknowledgementByMail                                                  : Pošlji potrditev po email-u
main_NoEMail                                                                    : Ni email-a
main_Owner                                                                      : Lastnik
main_DetectedVersion                                                            : Zaznana različica
main_FollowingConstantsWillBeSubstituted                                        : Naslednje konstante bodo zamenjane z ustrezno vrednostjo.
main_Refresh                                                                    : Osveži
main_BackToList                                                                 : Nazaj na seznam
main_GoBack                                                                     : Pojdi nazaj
main_CanBeModifiedIfOk                                                          : Lahko se spremeni, če je veljaven
main_CanBeModifiedIfKo                                                          : Lahko se spremeni, če ni veljaven
main_RecordModifiedSuccessfully                                                 : Zapis uspešno spremenjen
main_RecordsModified                                                            : %s records modified
main_AutomaticCode                                                              : Avtomatska koda
main_NotManaged                                                                 : Ni upravljan
main_FeatureDisabled                                                            : Funkcija onemogočena
main_MoveBox                                                                    : Premakni okvir %s
main_Offered                                                                    : Ponujen
main_NotEnoughPermissions                                                       : Nimate dovoljenja za to aktivnost
main_SessionName                                                                : Ime seje
main_Method                                                                     : Metoda
main_Receive                                                                    : Prejeto
main_PartialWoman                                                               : Delni
main_PartialMan                                                                 : Delna
main_TotalWoman                                                                 : Skupna
main_TotalMan                                                                   : Skupni
main_NeverReceived                                                              : Nikoli prejeto
main_Canceled                                                                   : Preklicano
main_YouCanChangeValuesForThisListFromDictionnarySetup                          : Vrednosti za ta seznam lahko spremenite na meniju 'Nastavitve – Nastavitve slovarja'
main_Color                                                                      : Barva
main_Documents                                                                  : Povezane datoteke
main_DocumentsNb                                                                : Število povezanih datotek (%s)
main_Documents2                                                                 : Dokumenti
main_BuildDocuments                                                             : Ustvarjeni dokumenti
main_UploadDisabled                                                             : Prenos onemogočen
main_MenuECM                                                                    : Dokumenti
main_MenuAWStats                                                                : AWStatistika
main_MenuMembers                                                                : Člani
main_MenuAgendaGoogle                                                           : Google dnevni red
main_ThisLimitIsDefinedInSetup                                                  : Speedealing omejitve (Meni domov-nastavitve-varnost): %s Kb, PHP omejitev: %s Kb
main_NoFileFound                                                                : V tej mapi ni shranjenih dokumentov
main_CurrentUserLanguage                                                        : Trenutni jezik
main_CurrentTheme                                                               : Trenutna tema
main_DisabledModules                                                            : Onemogočeni moduli
main_For                                                                        : Za
main_ForCustomer                                                                : Za kupca
main_Signature                                                                  : Podpis
main_HidePassword                                                               : Prikaži komande s skritim geslom
main_UnHidePassword                                                             : Prikaži resnične komande z vidnim geslom
main_Root                                                                       : Koren
main_Informations                                                               : Informacije
main_Page                                                                       : Stran
main_Notes                                                                      : Opombe
main_AddNewLine                                                                 : Dodaj novo vrstico
main_AddFile                                                                    : Dodaj datoteko
main_ListOfFiles                                                                : Seznam datotek, ki so na voljo
main_FreeZone                                                                   : Prosto besedilo
main_CloneMainAttributes                                                        : Kloniraj objekt z osnovnimi atributi
main_PDFMerge                                                                   : Spoji PDF
main_Merge                                                                      : Spoji
main_PrintContentArea                                                           : Prikaži stran za izpis področja z osnovno vsebino
main_NoMenu                                                                     : Ni podmenija
main_WarningYouAreInMaintenanceMode                                             : Pozor, ste v vzdrževalnem načinu, zato je trenutno samo prijavljenemu <b>%s</b> dovoljena uporaba aplikacije.
main_CoreErrorTitle                                                             : Sistemska napaka
main_CoreErrorMessage                                                           : Žal je prišlo do napake. Preverite log datoteko ali kontaktirajte sistemskega administratorja.
main_CreditCard                                                                 : Kreditna kartica
main_FieldsWithAreMandatory                                                     : Polja z <b>%s</b> so obvezna
main_FieldsWithIsForPublic                                                      : Polja z <b>%s</b> so prikazana na javnem seznamu članov. Če tega ne želite, označite okvir "public".
main_AccordingToGeoIPDatabase                                                   : (V skladu s  GeoIP pretvorbo)
main_Line                                                                       : Vrstica
main_NotSupported                                                               : Ni podprto
main_RequiredField                                                              : Zahtevano polje
main_Result                                                                     : Rezultat
main_ToTest                                                                     : Test
main_ValidateBefore                                                             : Pred uporabo te funkcije mora biti kartica potrjena
main_Visibility                                                                 : Vidnost
main_Private                                                                    : Privatno
main_Hidden                                                                     : Skrito
main_Resources                                                                  : Viri
main_Source                                                                     : Vir
main_Prefix                                                                     : Predpona
main_Before                                                                     : Pred
main_After                                                                      : Po
main_IPAddress                                                                  : IP naslov
main_Frequency                                                                  : Frekvenca
main_TicketCenter                                                               : Gestion des tickets
main_NewAttribute                                                               : Nov atribut
main_AttributeCode                                                              : Koda atributa
main_OptionalFieldsSetup                                                        : Nastavitev posebnih atributov
main_URLPhoto                                                                   : Url za fotografijo/logotip
main_SetLinkToThirdParty                                                        : Povezava na drugo tretjo osebo
main_CreateDraft                                                                : Ustvarite osnutek
main_ClickToEdit                                                                : Kliknite za urejanje
main_ObjectDeleted                                                              : Predmet %s črta
main_ByCountry                                                                  : Po državah
main_ByTown                                                                     : Z mesta
main_ByDate                                                                     : Po datumu
main_ByMonthYear                                                                : S mesec / leto
main_ByYear                                                                     : Po letih
main_ByMonth                                                                    : po mesecih
main_ByDay                                                                      : Po dnevih
main_BySalesRepresentative                                                      : Z prodajni predstavnik
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
main_Forward                                                                    : Zaženi prenos
main_Reply                                                                      : Répondre
main_TimeLeft                                                                   : Temps restant
main_Important                                                                  : Important
main_Dashboard                                                                  : Tableau de bord
main_DownloadPDF                                                                : Télécharger PDF
main_Agenda                                                                     : Dnevni red
main_PreviousMonth                                                              : Mois précédent
main_NextMonth                                                                  : Mois suivant
main_Download                                                                   : Télécharger
main_Potential                                                                  : Potencial
users_UserCard                                                                  : Kartica uporabnika
users_ContactCard                                                               : Kartica kontakta
users_GroupCard                                                                 : Kartica skupine
users_NoContactCard                                                             : Ni kartice med kontakti
users_Permission                                                                : Dovoljenje
users_Permissions                                                               : Dovoljenja
users_Password                                                                  : Password
users_EditPassword                                                              : Spremeni geslo
users_SendNewPassword                                                           : Regeneriraj in pošlji geslo
users_ReinitPassword                                                            : Regeneriraj geslo
users_PasswordChangedTo                                                         : Geslo spremenjeno v: %s
users_SubjectNewPassword                                                        : Vaše novo geslo za Speedealing
users_AvailableRights                                                           : Dovoljenja, ki so na voljo
users_OwnedRights                                                               : Lastna dovoljenja
users_GroupRights                                                               : Dovoljenja skupine
users_UserRights                                                                : Dovoljenja uporabnika
users_UserGUISetup                                                              : Nastavitev zaslona uporabnika
users_DisableUser                                                               : Onemogoči
users_DisableAUser                                                              : Onemogoči
users_DeleteUser                                                                : Izbriši
users_DeleteAUser                                                               : Izbriši uporabnika
users_DisableGroup                                                              : Onemogoči
users_DisableAGroup                                                             : Onemogoči skupino
users_EnableAUser                                                               : Omogoči uporabnika
users_EnableAGroup                                                              : Omogoči skupino
users_DeleteGroup                                                               : Izbriši
users_DeleteAGroup                                                              : Izbriši skupino
users_ConfirmDisableUser                                                        : Ali zares želite onemogočiti uporabnika <b>%s</b> ?
users_ConfirmDisableGroup                                                       : Ali zares želite onemogočiti skupino <b>%s</b> ?
users_ConfirmDeleteUser                                                         : Ali zares želite izbrisati uporabnika <b>%s</b> ?
users_ConfirmDeleteGroup                                                        : Ali zares želite izbrisati skupino <b>%s</b> ?
users_ConfirmEnableUser                                                         : Ali zares želite omogočiti uporabnika <b>%s</b> ?
users_ConfirmEnableGroup                                                        : Ali zares želite omogočiti skupino <b>%s</b> ?
users_ConfirmReinitPassword                                                     : Ali zares želite generirati novo geslo za uporabnika <b>%s</b> ?
users_ConfirmSendNewPassword                                                    : Ali zares želite generirati in poslati novo geslo za uporabnika <b>%s</b> ?
users_NewUser                                                                   : Nov uporabnik
users_CreateUser                                                                : Kreiraj uporabnika
users_SearchAGroup                                                              : Išči skupino
users_SearchAUser                                                               : Išči uporabnika
users_LoginNotDefined                                                           : Uporabniško ime ni določeno.
users_NameNotDefined                                                            : Ime ni določeno.
users_ListOfUsers                                                               : Seznam uporabnikov
users_Administrator                                                             : Administrator
users_SuperAdministrator                                                        : Super Administrator
users_SuperAdministratorDesc                                                    : Administrator z vsemi pravicami
users_AdministratorDesc                                                         : Entiteta administratorja
users_DefaultRights                                                             : Privzeta dovoljenja
users_DefaultRightsDesc                                                         : Tukaj določite <u>privzeta</u> dovoljenja, ki se avtomatsko dodelijo <u>novo kreiranemu</u> uporabniku (Dovoljenja obstoječega uporabnika spremenite preko kartice uporabnika).
users_SpeedealingUsers                                                          : Speedealing users
users_Civilite                                                                  : Civilite
users_LastName                                                                  : Priimek
users_FirstName                                                                 : Ime
users_ListOfGroups                                                              : Seznam skupin
users_NewGroup                                                                  : Nova skupina
users_CreateGroup                                                               : Kreiraj skupino
users_RemoveFromGroup                                                           : Odstrani iz skupine
users_PasswordChangedAndSentTo                                                  : Geslo spremenjeno in poslano <b>%s</b>.
users_PasswordChangeRequestSent                                                 : Zahtevek za spremembo gesla <b>%s</b> poslan <b>%s</b>.
users_MenuUsersAndGroups                                                        : Uporabniki & Skupine
users_LastGroupsCreated                                                         : Zadnjih %s kreiranih skupin
users_LastUsersCreated                                                          : Zadnjih %s kreiranih uporabnikov
users_ShowGroup                                                                 : Prikaži skupino
users_ShowUser                                                                  : Prikaži uporabnika
users_NonAffectedUsers                                                          : Nevključeni uporabniki
users_UserModified                                                              : Uporabnik uspešno spremenjen
users_GroupModified                                                             : Skupina %s je spremenjena
users_PhotoFile                                                                 : Datoteka s fotografijo
users_UserWithSpeedealingAccess                                                 : User with Speedealing access
users_ListOfUsersInGroup                                                        : Seznam uporabnikov v tej skupini
users_ListOfGroupsForUser                                                       : Seznam skupin tega uporabnika
users_UsersToAdd                                                                : Uporabniki, ki jih je potrebno dodati v to skupino
users_GroupsToAdd                                                               : Skupine, v katere je potrebno dodati tega uporabnika
users_NoLogin                                                                   : Ni uporabniškega imena
users_LinkToCompanyContact                                                      : Povezava na partnerja / kontakt
users_LinkedToSpeedealingMember                                                 : Link to member
users_LinkedToSpeedealingUser                                                   : Link to Speedealing user
users_LinkedToSpeedealingThirdParty                                             : Link to Speedealing third party
users_CreateSpeedealingLogin                                                    : Create a user
users_CreateSpeedealingThirdParty                                               : Create a third party
users_LoginAccountDisable                                                       : Račun onemogočen, vnesi novo ime uporabnika za aktivacijo.
users_LoginAccountDisableInSpeedealing                                          : Account disabled in Speedealing.
users_LoginAccountDisableInLdap                                                 : Račun onemogočen v domeni.
users_UsePersonalValue                                                          : Uporabi osebne podatke
users_GuiLanguage                                                               : Jezik vmesnika
users_InternalUser                                                              : Interni uporabnik
users_MyInformations                                                            : Moji podatki
users_ExportDataset_user_1                                                      : Uporabniki Speedealingja in značilnosti
users_DomainUser                                                                : Uporabnik domene %s
users_Reactivate                                                                : Ponovno aktiviraj
users_CreateInternalUserDesc                                                    : Ta obrazec omogoča kreiranje internega uporabnika v vašem podjetju/ustanovi. Za kreiranje zunanjega uporabnika (kupec, dobavitelj, ...), uporabite gumb 'Kreiraj Speedealing uporabnika' na kartici kontakta pri partnerju.
users_InternalExternalDesc                                                      : <b>Interni</b> uporabnik je uporabnik, ki je zaposlen v vašem podjetju/ustanovi.<br> <b>Zunanji</b> uporabnik je kupec, dobavitelj, ali kdo drug.<br><br>V obeh primerih se lahko definirajo pravice za uporabo Speedealingja, zunanji uporabnik ima lahko drugačno menijsko strukturo, kot interni uporabnik (Glejte Domov - Nastavitev - Prikaz)
users_PermissionInheritedFromAGroup                                             : Dovoljenje dodeljeno zaradi podedovanja od druge uporabniške skupine.
users_Inherited                                                                 : Podedovan
users_UserWillBeInternalUser                                                    : Kreiran uporabnik bo interni uporabnik (ker ni povezan z določenim partnerjem)
users_UserWillBeExternalUser                                                    : Kreiran uporabnik bo zunanji uporabnik (ker je povezan z določenim partnerjem)
users_IdPhoneCaller                                                             : ID klicatelja po telefonu
users_UserLogged                                                                : Uporabnik %s je prijavljen
users_UserLogoff                                                                : Uporabnik %s je odjavljen
users_NewUserCreated                                                            : Uporabik %s je kreiran
users_NewUserPassword                                                           : Sprememba gesla za %s
users_EventUserModified                                                         : Uporabnik %s je spremenjen
users_UserDisabled                                                              : Uporabnik %s je onemogočen
users_UserEnabled                                                               : Uporabnik %s je aktiviran
users_UserDeleted                                                               : Uporabnik %s je odstranjen
users_NewGroupCreated                                                           : Skupina %s je kreirana
users_GroupDeleted                                                              : Skupina %s je odstranjena
users_ConfirmCreateContact                                                      : Ali zares želite kreirati Speedealing dostop za ta kontakt ?
users_ConfirmCreateLogin                                                        : Ali zares želite kreirati Speedealing dostop za tega člana ?
users_ConfirmCreateThirdParty                                                   : Ali zares želite kreirati partnerja za tega člana ?
users_LoginToCreate                                                             : Kreiranje uporabniškega imena
users_NameToCreate                                                              : Kreiranje imena partnerja
users_YourRole                                                                  : Vaše vloge
users_YourQuotaOfUsersIsReached                                                 : Dosežena je vaša kvota aktivnih uporabnikov !
users_NbOfUsers                                                                 : Število uporabnikov
users_DontDowngradeSuperAdmin                                                   : Samo superadmin lahko degradira samo superadmin
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
users_Address                                                                   : Street
users_Town                                                                      : Town
users_Zip                                                                       : Code Postal
users_Tel-Mobile                                                                : Téléphone Mobile
users_Tel-Fixe                                                                  : Téléphone Fixe
users_Email                                                                     : Email address
users_Date-Naissance                                                            : Birthdate
users_Ville-Naissance                                                           : Ville de naissance
users_Pays-Naissance                                                            : Pays de naissance
users_Nationnalite                                                              : Nationnalité
users_Situation                                                                 : Situation familiale
users_NbrEnfants                                                                : Nombre Enfants
users_PerCharges                                                                : Personnes à charges
users_Date-Depart                                                               : Date de dèpart
users_Date-Arrivee                                                              : Date d'arrivée
users_Poste                                                                     : Položaj
users_Description-Poste                                                         : Descrption du poste
users_Type-Contrat                                                              : Type de contrat
users_Periode-Essai                                                             : Periode d'essai
users_Salaire-Brut                                                              : Salaire brut
users_Statut                                                                    : Statut
users_Site                                                                      : Site
users_Groupe                                                                    : Skupina
users_Securite-Sociale                                                          : N° de la sécurité sociale
users_Libelle-Bank                                                              : Libelle banque
users_IBAN                                                                      : IBAN
users_Photo                                                                     : Slika
users_Categorie                                                                 : Categorie
users_Temps-Travail                                                             : Temps de travail
users_Niveau-Etude                                                              : Niveau d'études
users_Annee-Diplome                                                             : Année d'obtention
users_Login                                                                     : Uporabniško ime
users_Notes                                                                     : Opombe
users_LoginDescription                                                          : L'identifiant qui permet de se connecter à l'application. (unique et sans espace)
users_LoginIsValid                                                              : Ce login est valide.
users_EmailAddressIsValid                                                       : L'adresse e-mail est valide.
users_ErrorLoginAlreadyExists                                                   : Ce login existe déjà !
users_ErrorInvalidLogin                                                         : Ce login n'est pas valide !
users_ErrorInvalidEmailAddress                                                  : L'adresse e-mail n'est pas valide !
users_ErrorGroupAlreadyExists                                                   : Ce groupe existe déjà !
