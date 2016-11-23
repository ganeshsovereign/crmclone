admin_Version                                                                   : Версия
admin_VersionProgram                                                            : Версия програма
admin_VersionLastInstall                                                        : Версия първоначалното инсталиране
admin_VersionLastUpgrade                                                        : Версия последния ъпгрейд
admin_VersionExperimental                                                       : Експериментален
admin_VersionDevelopment                                                        : Развитие
admin_VersionUnknown                                                            : Неизвестен
admin_VersionRecommanded                                                        : Препоръчва се
admin_SessionId                                                                 : Session ID
admin_SessionSaveHandler                                                        : Handler за да запазите сесията
admin_SessionSavePath                                                           : Локализация за съхранение на сесията
admin_PurgeSessions                                                             : Чистка на сесията
admin_ConfirmPurgeSessions                                                      : Наистина ли искате да изчистите всички сесии? Това ще изключите всеки потребител (освен себе си).
admin_NoSessionListWithThisHandler                                              : Запиши сесиен манипулатор конфигурирани във вашата PHP, не позволява да се изброят всички текущи сесии.
admin_LockNewSessions                                                           : Заключете нови връзки
admin_ConfirmLockNewSessions                                                    : Сигурен ли сте, че искате да ограничите всяка нова връзка Speedealing за себе си. Само <b>%s</b> потребителят ще бъде в състояние да се свърже след това.
admin_UnlockNewSessions                                                         : Премахване на заключване на връзката
admin_YourSession                                                               : Вашата сесия
admin_Sessions                                                                  : Потребители на сесията
admin_WebUserGroup                                                              : Уеб сървър потребителя / групата
admin_NoSessionFound                                                            : PHP изглежда не се допуска да се изброят активни сесии. Directory, използван за записване сесии <b>(%s),</b> могат да бъдат защитени (например чрез разрешения OS или чрез PHP директива open_basedir).
admin_HTMLCharset                                                               : Charset генерирани HTML страници
admin_DBStoringCharset                                                          : Набор от знаци база данни за съхранение на данни
admin_DBSortingCharset                                                          : Набор от знаци база данни, за да сортирате данните
admin_WarningModuleNotActive                                                    : Модул <b>%s</b> да бъде включен
admin_WarningOnlyPermissionOfActivatedModules                                   : Само разрешения, свързани с активирани модули са показани тук. Можете да активирате други модули в Начало&gt; Setup-> Модули страница.
admin_SpeedealingSetup                                                          : Speedealing install or upgrade
admin_SpeedealingUser                                                           : Speedealing user
admin_InternalUser                                                              : Вътрешна потребителска
admin_ExternalUser                                                              : Външен потребител
admin_InternalUsers                                                             : Вътрешните потребители
admin_ExternalUsers                                                             : Външни потребители
admin_GlobalSetup                                                               : Глобално настройка
admin_GUISetup                                                                  : Покажи
admin_SetupArea                                                                 : Setup област
admin_FormToTestFileUploadForm                                                  : Форма за тестване качване на файлове (за настройка)
admin_IfModuleEnabled                                                           : Забележка: За да е ефективна само ако модул <b>%s</b> е активирана
admin_RemoveLock                                                                : Премахване на файлови <b>%s</b> ако тя съществува, за да се позволи използването на актуализацията инструмент.
admin_RestoreLock                                                               : Възстановяване файлови <b>%s,</b> с права за четене разрешение само да се забранят използването на инструмент за актуализация.
admin_SecuritySetup                                                             : Настройката на защитата
admin_ErrorModuleRequirePHPVersion                                              : Грешка, този модул изисква PHP версия %s или по-висока
admin_ErrorModuleRequireSpeedealingVersion                                      : Error, this module requires Speedealing version %s or higher
admin_ErrorDecimalLargerThanAreForbidden                                        : Грешка, с точност по-висока от <b>%s</b> не се поддържа.
admin_DictionnarySetup                                                          : Настройка на речника
admin_Dictionnary                                                               : Речници
admin_DisableJavascript                                                         : Изключване на JavaScript и Ajax функции
admin_ConfirmAjax                                                               : Използвайте Аякс потвърждение изскачащи прозорци
admin_UseSearchToSelectCompany                                                  : Използвайте Автоматично завършване на полета, за да изберете трети страни (вместо да използвате списъчно поле). <br><br> Също така, ако имате голям брой трети страни (&gt; 100 000), можете да увеличите скоростта чрез създаване на постоянна SOCIETE_DONOTSEARCH_ANYWHERE 1 в Setup->. Търсене след това ще бъдат ограничени до началото на низ.
admin_ActivityStateToSelectCompany                                              : Добавяне на филтър опция за показване / скриване на thirdparties, които в момента са в дейност или е престанала
admin_SearchFilter                                                              : Филтрите за търсене опции
admin_NumberOfKeyToSearch                                                       : NBR от знаци, за да предизвика търсене: %s
admin_ViewFullDateActions                                                       : Показване на пълните събития дати в третия лист
admin_NotAvailableWhenAjaxDisabled                                              : Не е налично, когато Аякс инвалиди
admin_JavascriptDisabled                                                        : JavaScript увреждания
admin_UsePopupCalendar                                                          : Използвайте изскачащ прозорец за въвеждане на дати
admin_UsePreviewTabs                                                            : Използвайте Преглед раздели
admin_ShowPreview                                                               : Покажи преглед
admin_PreviewNotAvailable                                                       : Preview не е наличен
admin_ThemeCurrentlyActive                                                      : Тема активни в момента
admin_CurrentTimeZone                                                           : TimeZone PHP (сървър)
admin_Space                                                                     : Пространство
admin_Fields                                                                    : Полетата
admin_Mask                                                                      : Маска
admin_NextValue                                                                 : Следваща стойност
admin_NextValueForInvoices                                                      : Следваща стойност (фактури)
admin_NextValueForCreditNotes                                                   : Следваща стойност (кредитни известия)
admin_MustBeLowerThanPHPLimit                                                   : Забележка: PHP ограничава размера на всяко качване на файлове на %s <b>%s,</b> независимо от стойността на този параметър е
admin_NoMaxSizeByPHPLimit                                                       : Забележка: Не срокът се определя в конфигурацията на вашия PHP
admin_MaxSizeForUploadedFiles                                                   : Максимален размер за качените файлове (0 за да забраните качване)
admin_UseCaptchaCode                                                            : Използвайте графичен код (CAPTCHA) на страницата за вход
admin_UseAvToScanUploadedFiles                                                  : Използвайте анти-вирус, за да сканира качените файлове
admin_AntiVirusCommand                                                          : Пълна пътека до антивирусен команда
admin_AntiVirusCommandExample                                                   : Пример за ClamWin: C: \ програма ~ 1 \ ClamWin \ Bin \ clamscan.exe <br> Пример за ClamAV: / ЮЕсАр / хамбар / clamscan
admin_AntiVirusParam                                                            : Още параметри на командния ред
admin_AntiVirusParamExample                                                     : Пример за ClamWin: - база данни = &quot;C: \ Program Files (x86) \ ClamWin \ ИЪ&quot;
admin_ComptaSetup                                                               : Настройка на счетоводния модул
admin_UserSetup                                                                 : Настройка за управление на потребителите
admin_MenuSetup                                                                 : Управление на менюто за настройка
admin_MenuLimits                                                                : Граници и точност
admin_MenuIdParent                                                              : ID майка меню
admin_DetailMenuIdParent                                                        : ID на основното меню (0 за горното меню)
admin_DetailPosition                                                            : Брой Сортиране, за да определи позицията на менюто
admin_PersonalizedMenusNotSupported                                             : Персонализирани менюта, които не се поддържат
admin_AllMenus                                                                  : Всички
admin_NotConfigured                                                             : Модул не е конфигурирано
admin_Setup                                                                     : Структура
admin_Activation                                                                : Активиране
admin_Active                                                                    : Активен
admin_SetupShort                                                                : Структура
admin_OtherOptions                                                              : Други опции
admin_OtherSetup                                                                : Други опции за настройки
admin_CurrentValueSeparatorDecimal                                              : Десетичен разделител
admin_CurrentValueSeparatorThousand                                             : Thousand сепаратор
admin_Modules                                                                   : Модули
admin_ModulesCommon                                                             : Основните модули
admin_ModulesOther                                                              : Други модули
admin_ModulesInterfaces                                                         : Интерфейси модули
admin_ModulesSpecial                                                            : Модули много специфични
admin_ParameterInSpeedealing                                                    : Parameter %s
admin_LanguageParameter                                                         : %s Езикови параметри
admin_LanguageBrowserParameter                                                  : Параметър %s
admin_LocalisationSpeedealingParameters                                         : Localisation parameters
admin_ClientTZ                                                                  : Часова зона клиент (потребител)
admin_ClientHour                                                                : Час клиент (потребител)
admin_OSTZ                                                                      : Часова зона OS сървъра
admin_PHPTZ                                                                     : Часова зона PHP сървър
admin_PHPServerOffsetWithGreenwich                                              : PHP сървъра компенсира широчина Гринуич (секунди)
admin_ClientOffsetWithGreenwich                                                 : Клиент / Browser компенсира широчина Гринуич (секунди)
admin_DaylingSavingTime                                                         : Лятното часово време
admin_CurrentHour                                                               : Час PHP (сървър)
admin_CompanyTZ                                                                 : Компания Time Zone (основната компания)
admin_CompanyHour                                                               : Час компания (основната компания)
admin_CurrentSessionTimeOut                                                     : Текущата сесия изчакване
admin_OSEnv                                                                     : OS околната среда
admin_Box                                                                       : Кутия
admin_Boxes                                                                     : Кутии
admin_MaxNbOfLinesForBoxes                                                      : Максимален брой на линиите за кутии
admin_PositionByDefault                                                         : Подразбиране за
admin_Position                                                                  : Ред
admin_MenusDesc                                                                 : Менюта мениджърите определят съдържанието на две ленти с менюта (хоризонтална лента и вертикална лента).
admin_MenusEditorDesc                                                           : Менюто редактор ви позволяват да определите персонализирани вписвания в менютата. Използвайте го внимателно, за да се избегне speedealing нестабилна и записи в менюто постоянно недостижим. <br> Някои модули добавяне на записи в менютата (в менюто <b>Всички</b> в повечето случаи). Ако сте премахнали някои от тези записи по погрешка, можете да ги възстановите, като изключите и отново да активирате модула.
admin_MenuForUsers                                                              : Меню за потребители
admin_LangFile                                                                  : Файл. Lang
admin_System                                                                    : Система
admin_SystemInfo                                                                : Системна информация
admin_SystemTools                                                               : Системни инструменти
admin_SystemToolsArea                                                           : System Tools област
admin_SystemToolsAreaDesc                                                       : Този район предоставя административни функции. Използвайте менюто, за да изберете функцията, което търсите.
admin_PurgeAreaDesc                                                             : Тази страница ви позволява да изтриете всички файлове, които са построени или съхраняват от Speedealing (временни файлове, или всички файлове в <b>%s</b> директория). Използването на тази функция не е необходимо. Тя е предвидена за потребители, чиито Speedealing се хоства от доставчик, който не предлага разрешения за изтриване на файлове, построени от уеб сървъра.
admin_PurgeDeleteLogFile                                                        : Изтриване на влезете файлове <b>%s,</b> определени за Syslog модул (без риск от загуба на данни)
admin_PurgeDeleteTemporaryFiles                                                 : Изтрийте всички временни файлове (без риск от загуба на данни)
admin_PurgeDeleteAllFilesInDocumentsDir                                         : Изтриване на всички файлове в директорията <b>%s.</b> Временни файлове, но също така и резервната база данни сметища, файлове, прикрепени към елементи (трети страни, фактури, ...) и качени в модул ECM ще бъдат изтрити.
admin_PurgeRunNow                                                               : Поръси сега
admin_PurgeNothingToDelete                                                      : Директория или файл да изтриете.
admin_PurgeNDirectoriesDeleted                                                  : <b>%s</b> изтрити файлове или директории.
admin_PurgeAuditEvents                                                          : Поръси всички събития по сигурността
admin_ConfirmPurgeAuditEvents                                                   : Сигурен ли сте, че искате да очисти всички събития по сигурността? Всички охранителни трупи ще бъдат изтрити, няма други данни ще бъдат премахнати.
admin_NewBackup                                                                 : Нов архивиране
admin_GenerateBackup                                                            : Генериране на гръб
admin_Backup                                                                    : Архивиране
admin_Restore                                                                   : Възстановяване
admin_RunCommandSummary                                                         : Backup стартира със следната команда
admin_RunCommandSummaryToLaunch                                                 : Backup може да се стартира със следната команда
admin_WebServerMustHavePermissionForCommand                                     : Вашият уеб сървър трябва да има разрешение за пускане на такива команди
admin_BackupResult                                                              : Backup резултат
admin_BackupFileSuccessfullyCreated                                             : Backup файл, генериран успешно
admin_YouCanDownloadBackupFile                                                  : Генерирани файлове могат да се изтеглят
admin_NoBackupFileAvailable                                                     : Не архивиране на файлове.
admin_ExportMethod                                                              : Износ метод
admin_ImportMethod                                                              : Внос метод
admin_ToBuildBackupFileClickHere                                                : За изграждането на резервно копие на файла, натиснете <a href="%s">тук</a> .
admin_ImportMySqlDesc                                                           : За да импортирате архивния файл, трябва да използвате MySQL команда от командния ред:
admin_ImportPostgreSqlDesc                                                      : За да импортирате архивния файл, трябва да използвате pg_restore команда от командния ред:
admin_ImportMySqlCommand                                                        : %s %s &lt;mybackupfile.sql
admin_ImportPostgreSqlCommand                                                   : %s %s mybackupfile.sql
admin_FileNameToGenerate                                                        : Име на файл, за да генерира
admin_CommandsToDisableForeignKeysForImport                                     : Команда, за да забраните чужди ключове при внос
admin_CommandsToDisableForeignKeysForImportWarning                              : Задължително, ако искате да сте в състояние да възстановите SQL дъмп по-късно
admin_ExportCompatibility                                                       : Съвместимост на генерираните износ файл
admin_MySqlExportParameters                                                     : MySQL износ параметри
admin_PostgreSqlExportParameters                                                : Параметрите на PostgreSQL износ
admin_UseTransactionnalMode                                                     : Използвайте сделка режим
admin_FullPathToMysqldumpCommand                                                : Пълна пътека до mysqldump команда
admin_FullPathToPostgreSQLdumpCommand                                           : Пълна пътека до pg_dump команда
admin_ExportOptions                                                             : Настройки за изнасяне
admin_AddDropDatabase                                                           : Добави DROP DATABASE команда
admin_AddDropTable                                                              : Добави DROP ТАБЛИЦА команда
admin_ExportStructure                                                           : Структура
admin_Datas                                                                     : Данни
admin_NameColumn                                                                : Име колони
admin_ExtendedInsert                                                            : Extended INSERT
admin_NoLockBeforeInsert                                                        : Не заключване команди около INSERT
admin_DelayedInsert                                                             : Закъснение вложка
admin_EncodeBinariesInHexa                                                      : Кодиране на двоични данни в шестнадесетичен
admin_IgnoreDuplicateRecords                                                    : Игнориране на грешките на дублирани записи (INSERT IGNORE)
admin_Yes                                                                       : Да
admin_No                                                                        : Не
admin_AutoDetectLang                                                            : Автоматично (език на браузъра)
admin_FeatureDisabledInDemo                                                     : Feature инвалиди в демо
admin_Rights                                                                    : Разрешения
admin_BoxesDesc                                                                 : Кутии площ на екрана, които показват парче на информация на някои страници. Можете да избирате между показва кутията или не, като изберете целевата страница и кликнете върху &quot;Активиране&quot;, или като кликнете върху кофата за боклук, за да го изключите.
admin_OnlyActiveElementsAreShown                                                : Само елементи от <a href="%s">активирани модули</a> са показани.
admin_ModulesDesc                                                               : Speedealing модули определят, чиято функционалност е включен софтуер. Някои модули изискват разрешения трябва да предоставят на потребителите, след активирането на модула. Кликнете върху бутона за включване / изключване в колона &quot;Статус&quot;, за да се даде възможност модул / функция.
admin_ModulesInterfaceDesc                                                      : Модули Speedealing интерфейс ви позволява да добавяте функции, в зависимост от външен софтуер, системи или услуги.
admin_ModulesSpecialDesc                                                        : Специални модули са много специфични и рядко се използва модули.
admin_ModulesJobDesc                                                            : Бизнес модули осигуряват прост предварително зададена настройка на Speedealing за конкретен бизнес.
admin_ModulesMarketPlaceDesc                                                    : Можете да намерите повече модули за изтегляне на външни уеб-сайтове в Интернет ...
admin_ModulesMarketPlaces                                                       : Повече модули ...
admin_DoliStoreDesc                                                             : DoliStore, официалният пазар за Speedealing ERP / CRM външни модули
admin_WebSiteDesc                                                               : Доставчици на уеб сайта можете да търсите да намерите повече модули ...
admin_URL                                                                       : Връзка
admin_BoxesAvailable                                                            : Кутии наличните
admin_BoxesActivated                                                            : Кутии активира
admin_ActivateOn                                                                : Активиране на
admin_ActiveOn                                                                  : Активирана
admin_SourceFile                                                                : Изходният файл
admin_AutomaticIfJavascriptDisabled                                             : Автоматично Ако Javascript е деактивиран
admin_AvailableOnlyIfJavascriptNotDisabled                                      : Предлага се само ако JavaScript не е забранен
admin_AvailableOnlyIfJavascriptAndAjaxNotDisabled                               : Предлага се само ако JavaScript не е забранен
admin_NotInstalled                                                              : Not installed
admin_Required                                                                  : Длъжен
admin_Security                                                                  : Сигурност
admin_Passwords                                                                 : Паролите
admin_DoNotStoreClearPassword                                                   : Да не се магазин ясни пароли в базата данни, но се съхранява само криптирана стойност (Активира се препоръчва)
admin_MainDbPasswordFileConfEncrypted                                           : Парола за базата данни, кодирани в conf.php (Активира се препоръчва)
admin_InstrucToEncodePass                                                       : За да имате парола кодирано в <b>conf.php</b> файл, замени линия <br> <b>$ Speedealing_main_db_pass = &quot;...&quot;</b> <br> от <br> <b>$ Speedealing_main_db_pass = &quot;криптирани: %s&quot;</b>
admin_InstrucToClearPass                                                        : За да имате парола декодирана (ясно) в <b>conf.php</b> файл, сменете линия <br> <b>$ Speedealing_main_db_pass = &quot;криптирани: ...&quot;</b> <br> от <br> <b>$ Speedealing_main_db_pass = &quot;%s&quot;</b>
admin_ProtectAndEncryptPdfFiles                                                 : Защита на генерираните PDF файлове (активиран не се препоръчва, почивки поколение на маса PDF)
admin_ProtectAndEncryptPdfFilesDesc                                             : Защита на PDF документ продължава да прочетете и отпечатате с всеки PDF браузър. Въпреки това, редактиране и копиране не е възможно повече. Имайте предвид, че използването на тази функция изграждането на глобална сборен PDF не работи (като неплатени фактури).
admin_Feature                                                                   : Особеност
admin_SpeedealingLicense                                                        : License
admin_SpeedealingProjectLeader                                                  : Project leader
admin_Developpers                                                               : Разработчици / сътрудници
admin_OtherDeveloppers                                                          : Други агенти / сътрудници
admin_OfficialWebSite                                                           : Speedealing международна официален уеб сайт
admin_OfficialWebSiteFr                                                         : Френски официален уеб сайт
admin_OfficialWiki                                                              : Speedealing документация на Wiki
admin_OfficialDemo                                                              : Speedealing онлайн демо
admin_OfficialMarketPlace                                                       : Официален пазара за външни модули / Addons
admin_OfficialWebHostingService                                                 : Официален уеб хостинг услуга (Cloud хостинг)
admin_ForDocumentationSeeWiki                                                   : За потребител или разработчик документация (Doc, често задавани въпроси ...), <br> да погледнем в Speedealing Wiki: <br> <a href="%s" target="_blank"><b>%s</b></a>
admin_ForAnswersSeeForum                                                        : За всякакви други въпроси / Помощ, можете да използвате форума Speedealing: <br> <a href="%s" target="_blank"><b>%s</b></a>
admin_HelpCenterDesc1                                                           : Тази област може да ви помогне да получите Помощ подкрепа на Speedealing.
admin_HelpCenterDesc2                                                           : Част от тази услуга, трябва да са на разположение <b>само</b> на <b>английски език.</b>
admin_CurrentTopMenuHandler                                                     : Най манипулатор меню
admin_CurrentLeftMenuHandler                                                    : Текущ левия манипулатор меню
admin_CurrentMenuHandler                                                        : Текущото меню манипулатор
admin_CurrentSmartphoneMenuHandler                                              : Текущ смартфон манипулатор меню
admin_MeasuringUnit                                                             : Мерна единица
admin_Emails                                                                    : Е-поща
admin_EMailsSetup                                                               : E-поща настройка
admin_EMailsDesc                                                                : Тази страница ви позволява да презапишете PHP параметри за изпращане на електронна поща. В повечето случаи за Unix / Linux OS, PHP настройка е вярна и тези параметри са безполезни.
admin_MAIN_MAIL_SMTP_PORT                                                       : SMTP / SMTPS Port (По подразбиране в php.ini: <b>%s)</b>
admin_MAIN_MAIL_SMTP_SERVER                                                     : SMTP / SMTPS Host (по подразбиране в php.ini: <b>%s)</b>
admin_MAIN_MAIL_SMTP_PORT_NotAvailableOnLinuxLike                               : SMTP / SMTPS Port (които не са дефинирани в PHP Unix подобни системи)
admin_MAIN_MAIL_SMTP_SERVER_NotAvailableOnLinuxLike                             : SMTP / SMTPS домакин (които не са дефинирани в PHP Unix подобни системи)
admin_MAIN_MAIL_EMAIL_FROM                                                      : Sender електронна поща за автоматични имейли (По подразбиране в php.ini: <b>%s)</b>
admin_MAIN_MAIL_ERRORS_TO                                                       : Sender електронна поща се използва за грешка връща имейли изпратени
admin_MAIN_MAIL_AUTOCOPY_TO                                                     : Изпрати систематично скрит въглероден копие на всички изпратени имейли
admin_MAIN_DISABLE_ALL_MAILS                                                    : Изключване на всички имейли sendings (за тестови цели или демонстрации)
admin_MAIN_MAIL_SENDMODE                                                        : Метод да се използва за изпращане на имейли
admin_MAIN_MAIL_SMTPS_ID                                                        : SMTP ID, ако разпознаване, изискван
admin_MAIN_MAIL_SMTPS_PW                                                        : SMTP парола, ако разпознаване, изискван
admin_MAIN_MAIL_EMAIL_TLS                                                       : Използване на TLS (SSL) криптиране
admin_MAIN_DISABLE_ALL_SMS                                                      : Изключване на всички SMS sendings (за тестови цели или демонстрации)
admin_MAIN_SMS_SENDMODE                                                         : Метод да се използва за изпращане на SMS
admin_MAIN_MAIL_SMS_FROM                                                        : Default номер на изпращача телефон за изпращане на SMS
admin_FeatureNotAvailableOnLinux                                                : Функцията не е на разположение на Unix подобни системи. Тествайте вашата програма Sendmail на местно ниво.
admin_SubmitTranslation                                                         : Ако превод за този език не е пълна или откриете грешки, можете да коригирате това, като редактиране на файлове в директорията <b>Langs / %s</b> и представя променените файлове на форума www.speedealing.org.
admin_ModuleSetup                                                               : Модул за настройка
admin_ModulesSetup                                                              : Модули за настройка
admin_ModuleFamilyBase                                                          : Система
admin_ModuleFamilyCrm                                                           : Управление на Връзки с клиенти (CRM)
admin_ModuleFamilyProducts                                                      : Продукти за управление на
admin_ModuleFamilyHr                                                            : Управление на човешките ресурси
admin_ModuleFamilyProjects                                                      : Проекти / съвместна работа
admin_ModuleFamilyOther                                                         : Друг
admin_ModuleFamilyTechnic                                                       : Mutli модули инструменти
admin_ModuleFamilyExperimental                                                  : Експериментални модули
admin_ModuleFamilyFinancial                                                     : Финансови модули (счетоводство / Министерството на финансите)
admin_ModuleFamilyECM                                                           : Електронен Content Management (ECM)
admin_MenuHandlers                                                              : Меню работещи
admin_MenuAdmin                                                                 : Menu Editor
admin_DoNotUseInProduction                                                      : Do not use in production
admin_ThisIsProcessToFollow                                                     : Това е настройка на процеса:
admin_StepNb                                                                    : Стъпка %s
admin_FindPackageFromWebSite                                                    : Намери пакет, който осигурява функция искате (например относно официалния уеб сайт %s).
admin_DownloadPackageFromWebSite                                                : Изтегляне на пакет.
admin_UnpackPackageInSpeedealingRoot                                            : Unpack package file into Speedealing's root directory <b>%s</b>
admin_SetupIsReadyForUse                                                        : Install е завършен и Speedealing е готов за използване с този нов компонент.
admin_NotExistsDirect                                                           : Алтернатива главната директория не е дефинирано. <br>
admin_InfDirAlt                                                                 : От версия 3 е възможно да се определи алтернативен directory.This корен ви позволява да съхранявате, едно и също място, плъгини и собствени шаблони. <br> Просто създайте директория, в основата на Speedealing (напр. по поръчка). <br>
admin_InfDirExample                                                             : <br> След това заяви в файла conf.php <br> $ Speedealing_main_url_root_alt = 'http://myserver/custom &quot; <br> $ Speedealing_main_document_root_alt = &quot;/ път / / speedealing / htdocs / по избор&quot; <br> * Тези линии са коментирани с &quot;#&quot;, да разкоментирате само да премахнете характер.
admin_YouCanSubmitFile                                                          : Изберете модул:
admin_CurrentVersion                                                            : Speedealing текущата версия
admin_CallUpdatePage                                                            : Отидете на страницата, която се актуализира структурата на базата данни и презареждане на: %s.
admin_LastStableVersion                                                         : Последната стабилна версия
admin_GenericMaskCodes                                                          : Можете да въведете всяка маска за номериране. В тази маска, могат да се използват следните тагове: <br> <b>{000000}</b> съответства на номер, който се увеличава на всеки %s. Влез като много нули като желаната дължина на брояча. Броячът ще бъде завършен с нули от ляво, за да има колкото се може повече нули като маска. <br> <b>{000000 000}</b> същата като предишната, но компенсира, съответстваща на броя на правото на знака + се прилага започва на първи %s. <br> <b>{000000 @}</b> същата като предишната, но броячът се нулира, когато месеца Х е достигнал (Х между 1 и 12, или 0, за да използвате началото на месеца на фискалната година, определени в вашата конфигурация). Ако тази опция се използва и х е 2 или по-висока, тогава последователност {гг} {mm} или {гггг} {mm} също е задължително. <br> <b>{DD}</b> ден (01 до 31). <br> <b>{Mm}</b> месец (01 до 12). <br> <b>{Гг} {гггг}</b> или <b>{Y}</b> година над 2, 4 или 1 брой. <br>
admin_GenericMaskCodes2                                                         : <b>{CCCC}</b> код на клиента <br> <b>{Cccc000}</b> клиентски код на символи н е последван от код брояч на клиента, без да компенсира и zeroized с глобалната брояч. <br> <b>{Tttt}</b> код на вид фирма N на символи (вж. dictionnary компанията видове). <br>
admin_GenericMaskCodes3                                                         : Всички други символи на маската ще останат непокътнати. <br> Интервалите не са разрешени. <br>
admin_GenericMaskCodes4a                                                        : <u>Пример за използване на 99 %s на третата страна КОМПАНИЯТА извършва 2007-01-31:</u> <br>
admin_GenericMaskCodes4b                                                        : <u>Пример за трета страна е създаден на 2007-03-01:</u> <br>
admin_GenericMaskCodes4c                                                        : <u>Пример за продукт, създаден на 2007-03-01:</u> <br>
admin_GenericMaskCodes5                                                         : <b>ABC {гг} {mm} {000000}</b> ще даде <b>ABC0701-000099</b> <br> <b>{0000 100}-ZZZ / {дд} / XXX</b> ще даде <b>0199-ZZZ/31/XXX</b>
admin_GenericNumRefModelDesc                                                    : Върнете адаптивни номер според определен маска.
admin_ServerAvailableOnIPOrPort                                                 : Сървър е достъпна на адрес <b>%s</b> на порт <b>%s</b>
admin_ServerNotAvailableOnIPOrPort                                              : Сървърът не е достъпен на адрес <b>%s</b> на порт <b>%s</b>
admin_DoTestServerAvailability                                                  : Свързаност тестовия сървър
admin_DoTestSend                                                                : Тествайте изпращане
admin_DoTestSendHTML                                                            : Тествайте изпращане на HTML
admin_ErrorCantUseRazInStartedYearIfNoYearMonthInMask                           : Грешка, не могат да използват @ опция, ако последователност {гг} {mm} или {гггг} {mm} не е маска.
admin_UMask                                                                     : Umask параметър за нови файлове в Unix / Linux / BSD файловата система.
admin_UMaskExplanation                                                          : Този параметър ви позволи да се определят правата, определени по подразбиране на файлове, създадени от Speedealing на сървъра (по време на качването например). <br> Тя трябва да бъде осмична стойност (например, 0666 средства четат и пишат за всеки). <br> Този параметър е безполезно на предприятието на сървъра на Windows.
admin_SeeWikiForAllTeam                                                         : Обърнете внимание на уики страницата за пълния списък на всички участници и тяхната организация
admin_UseACacheDelay                                                            : Забавяне за кеширане износ отговор в секунда (0 или празно за не кеш)
admin_DisableLinkToHelpCenter                                                   : Скриване на връзката <b>&quot;Нуждаете се от помощ или подкрепа&quot;</b> на страницата за вход
admin_DisableLinkToHelp                                                         : Скриване на връзката <b>&quot;%s онлайн помощ&quot;</b> на менюто в ляво
admin_AddCRIfTooLong                                                            : , Не съществува автоматична опаковане, така че ако линията е на страницата на документи, защото твърде дълго, трябва да се добави знаци за връщане в текстовото поле.
admin_ModuleDisabled                                                            : Модул инвалиди
admin_ModuleDisabledSoNoEvent                                                   : Модул с увреждания, така никога събитие, създадено
admin_ConfirmPurge                                                              : Сигурен ли сте, че искате да изпълните тази чистка? <br> Това определено ще изтрие всички файлове с данни няма начин да ги възстановите (ECM файлове, прикачени файлове и т.н.).
admin_MinLength                                                                 : Минимална дължина
admin_LanguageFilesCachedIntoShmopSharedMemory                                  : Файлове. Lang заредени в споделена памет
admin_ExamplesWithCurrentSetup                                                  : Примери с текущата настройка
admin_ListOfDirectories                                                         : Списък на OpenDocument директории шаблони
admin_ListOfDirectoriesForModelGenODT                                           : Списък на директории, съдържащи шаблони файлове с OpenDocument формат. <br><br> Тук можете да въведете пълния път на директории. <br> Добави за връщане между указател ие. <br> За да добавите директория на GED модул, добавете тук на <b>DOL_DATA_ROOT / ECM / yourdirectoryname.</b> <br><br> Файлове в тези директории, трябва да завършва <b>с. ODT.</b>
admin_NumberOfModelFilesFound                                                   : Брой на ODT файлове шаблони, намерени в тези указатели
admin_ExampleOfDirectoriesForModelGen                                           : Примери на синтаксиса: <br> C: \ mydir <br> / Начало / mydir <br> DOL_DATA_ROOT / ECM / ecmdir
admin_FollowingSubstitutionKeysCanBeUsed                                        : <br> За да разберете как да създадете свои ODT шаблони на документи, преди да ги съхранявате в тези указатели, прочетете уики документация:
admin_FullListOnOnlineDocumentation                                             : http://wiki.speedealing.org/index.php/Create_an_ODT_document_template
admin_FirstnameNamePosition                                                     : Позиция Име / Фамилия
admin_DescWeather                                                               : Следващите снимки ще бъде показан на таблото, когато броят на закъснелите действия постигане на следните стойности:
admin_KeyForWebServicesAccess                                                   : Ключът към използване на Web Services (параметър &quot;speedealingkey&quot; в WebServices)
admin_TestSubmitForm                                                            : Формата на входящ тест
admin_ThisForceAlsoTheme                                                        : Използването на този Menu Manager ще използва своята собствена тема какъвто и да е избор на потребителя. Освен това меню мениджър, специализирана за смартфони не работи върху всички смартфони. Използвайте менюто друг мениджър, ако имате проблеми на твоя.
admin_ThemeDir                                                                  : Skins директория
admin_ConnectionTimeout                                                         : Connexion изчакване
admin_ResponseTimeout                                                           : Отговор изчакване
admin_SmsTestMessage                                                            : Тест съобщение от __ PHONEFROM__ __ PHONETO__
admin_ModuleMustBeEnabledFirst                                                  : Модул <b>%s</b> да бъде включен първо, преди да използвате тази функция.
admin_SecurityToken                                                             : Ключът за осигуряване на сигурна URL адреси
admin_NoSmsEngine                                                               : Не изпращач мениджър SMS на разположение. SMS подателя мениджър не са инсталирани по подразбиране разпределение (защото зависи от външен доставчик), но можете да намерите някои по %s
admin_PDF                                                                       : PDF
admin_PDFDesc                                                                   : Можете да настроите всеки глобални опции, свързани към PDF поколение
admin_PDFAddressForging                                                         : Правила за изграждането на адрес кутии
admin_HideAnyVATInformationOnPDF                                                : Скриване на цялата информация, свързана с ДДС върху генерирани PDF
admin_HideDescOnPDF                                                             : Скриване на продуктите описание на генерирани PDF
admin_HideRefOnPDF                                                              : Скриване на продуктите код. генерирани PDF
admin_HideDetailsOnPDF                                                          : Скриване на продукти линии подробности относно генерирани PDF
admin_UrlGenerationParameters                                                   : Параметри за осигуряване на URL адреси
admin_SecurityTokenIsUnique                                                     : Използвайте уникална параметър securekey за всеки URL
admin_EnterRefToBuildUrl                                                        : Въведете справка за обект %s
admin_GetSecuredUrl                                                             : Изчислява URL
admin_ButtonHideUnauthorized                                                    : Скриване на бутоните за неправомерни действия, вместо да се показва с увреждания бутони
admin_TotalNumberOfActivatedModules                                             : Общ брой на активирани модули са: <b>%s</b>
admin_YouMustEnableOneModule                                                    : Трябва да даде възможност на най-малко 1 модул
admin_ModulesSystemTools                                                        : Модули инструменти
admin_ProductVatMassChange                                                      : Промяната в масата ДДС
admin_ProductVatMassChangeDesc                                                  : Тази страница може да се използва за промяна на ДДС ставката, определена за продукти или услуги от стойността на друг. Внимание, тази промяна се прави на цялата база данни.
admin_OldVATRates                                                               : Old ставка на ДДС
admin_NewVATRates                                                               : Нов ставка на ДДС
admin_PriceBaseTypeToChange                                                     : Промяна на цените с база референтна стойност, определена на
admin_MassConvert                                                               : Стартиране маса конвертирате
admin_String                                                                    : String
admin_TextLong                                                                  : Long text
admin_Int                                                                       : Integer
admin_Float                                                                     : Float
admin_DateAndTime                                                               : Date and hour
admin_Structure                                                                 : Structure
admin_Module0Name                                                               : Потребители и групи
admin_Module0Desc                                                               : Управление на потребители и групи
admin_Module1Name                                                               : Трети страни
admin_Module1Desc                                                               : Фирми и управление на контакти
admin_Module2Name                                                               : Търговски
admin_Module2Desc                                                               : Търговско управление
admin_Module10Name                                                              : Счетоводство
admin_Module10Desc                                                              : Simple управленско счетоводство (фактура и заплащане експедиция)
admin_Module20Name                                                              : Предложения
admin_Module20Desc                                                              : Търговско предложение управление
admin_Module22Name                                                              : Маса E-писма
admin_Module22Desc                                                              : Маса за управление на електронна поща
admin_Module23Name                                                              : Енергия
admin_Module23Desc                                                              : Наблюдение на консумацията на енергия
admin_Module25Name                                                              : Поръчки от клиенти
admin_Module25Desc                                                              : Управление на поръчка на клиента
admin_Module30Name                                                              : Фактури
admin_Module30Desc                                                              : Фактура и управление на кредитно известие за клиентите. Фактура за управление на доставчици
admin_Module40Name                                                              : Доставчици
admin_Module40Desc                                                              : Управление и изкупуване на доставчика (нареждания и фактури)
admin_Module42Name                                                              : Дневник
admin_Module42Desc                                                              : Влизане съоръжения (файл, Syslog, ...)
admin_Module49Name                                                              : Редактори
admin_Module49Desc                                                              : Редактор управление
admin_Module50Name                                                              : Продукти
admin_Module50Desc                                                              : Продуктов мениджмънт
admin_Module51Name                                                              : Масови писма
admin_Module51Desc                                                              : Маса управлението на хартия пощенски
admin_Module52Name                                                              : Запаси
admin_Module52Desc                                                              : Управление на склад (продукти)
admin_Module53Name                                                              : Услуги
admin_Module53Desc                                                              : Service Management
admin_Module54Name                                                              : Договори
admin_Module54Desc                                                              : Управлението на договорите и услуги
admin_Module55Name                                                              : Баркодове
admin_Module55Desc                                                              : Баркод управление
admin_Module56Name                                                              : Телефония
admin_Module56Desc                                                              : Телефония интеграция
admin_Module57Name                                                              : Постоянните поръчки
admin_Module57Desc                                                              : Постоянни нареждания и оттегляне управление
admin_Module58Name                                                              : ClickToDial
admin_Module58Desc                                                              : Интеграция на ClickToDial система (Asterisk, ...)
admin_Module59Name                                                              : Bookmark4u
admin_Module59Desc                                                              : Добавяне на функция за генериране на Bookmark4u сметка от сметка Speedealing
admin_Module70Name                                                              : Интервенциите
admin_Module70Desc                                                              : Управление на интервенциите
admin_Module75Name                                                              : Разход и пътуване бележки
admin_Module75Desc                                                              : Сметка и управление на пътуване бележки
admin_Module80Name                                                              : Превозите
admin_Module80Desc                                                              : Пратки и управление на заповедта за доставяне
admin_Module85Name                                                              : Банки и паричните
admin_Module85Desc                                                              : Управление на банкови или парични сметки
admin_Module100Name                                                             : Външен сайт
admin_Module100Desc                                                             : Включете всякаква външна уеб сайт в менюта на Speedealing и да го видите в рамка Speedealing
admin_Module105Name                                                             : Пощальон и СПИП
admin_Module105Desc                                                             : Пощальон или СПИП интерфейс за член модул
admin_Module200Name                                                             : LDAP
admin_Module200Desc                                                             : LDAP директория за синхронизация
admin_Module210Name                                                             : PostNuke
admin_Module210Desc                                                             : PostNuke интеграция
admin_Module240Name                                                             : Данни износ
admin_Module240Desc                                                             : Инструмент за износ Speedealing презареждане (с помощници)
admin_Module250Name                                                             : Импортирането на данни
admin_Module250Desc                                                             : Инструмент за внос презареждане на в Speedealing (с помощници)
admin_Module310Name                                                             : Потребители
admin_Module310Desc                                                             : Управлението на фондация членове
admin_Module320Name                                                             : RSS Feed
admin_Module320Desc                                                             : Добави RSS емисия вътре екрана страници Speedealing
admin_Module330Name                                                             : Bookmarks
admin_Module330Desc                                                             : Bookmark управление
admin_Module400Name                                                             : Проекти
admin_Module400Desc                                                             : Управление на проекти вътре в други модули
admin_Module410Name                                                             : Webcalendar
admin_Module410Desc                                                             : Webcalendar интеграция
admin_Module420Name                                                             : Affaires
admin_Module420Desc                                                             : Gestion des affaires
admin_Module430Name                                                             : Gestion d'équipes
admin_Module430Desc                                                             : Gestion des objectifs
admin_Module500Name                                                             : Данъци, социални осигуровки и дивиденти
admin_Module500Desc                                                             : Данъци и управление на осигурителната вноска
admin_Module600Name                                                             : Известия
admin_Module600Desc                                                             : Изпращане на известия по имейл на някои бизнес събития Speedealing трета контакти страни
admin_Module700Name                                                             : Дарения
admin_Module700Desc                                                             : Дарение за управление
admin_Module1400Name                                                            : Счетоводство
admin_Module1400Desc                                                            : Управленско счетоводство (двойни страни)
admin_Module1780Name                                                            : Категории
admin_Module1780Desc                                                            : Категория управление (продукти, доставчици и клиенти)
admin_Module2000Name                                                            : WYSIWYG редактор
admin_Module2000Desc                                                            : Оставя се да редактирате някакъв текст, чрез използване на усъвършенствана редактор
admin_Module2200Name                                                            : Кредити права
admin_Module2200Desc                                                            : Заеми за управление на права
admin_Module2300Name                                                            : Менюта
admin_Module2300Desc                                                            : Меню управление
admin_Module2400Name                                                            : Дневен ред
admin_Module2400Desc                                                            : Събития / задачи и управление на дневен ред
admin_Module2500Name                                                            : Управление на електронно съдържание
admin_Module2500Desc                                                            : Запазване и споделяне на документи
admin_Module2600Name                                                            : WebServices
admin_Module2600Desc                                                            : Активирайте Speedealing уеб услуги сървъра
admin_Module2700Name                                                            : Gravatar
admin_Module2700Desc                                                            : Използвайте онлайн Gravatar услуга (www.gravatar.com), за да покаже снимка на потребители / членове с техните имейли. Нуждаете се от интернет
admin_Module2900Name                                                            : GeoIPMaxmind
admin_Module2900Desc                                                            : GeoIP MaxMind реализации възможности
admin_Module5000Name                                                            : Multi-компания
admin_Module5000Desc                                                            : Позволява ви да управлявате няколко фирми
admin_Module20000Name                                                           : Holidays
admin_Module20000Desc                                                           : Declare and follow employees holidays
admin_Module50000Name                                                           : Paybox
admin_Module50000Desc                                                           : Модул предлага онлайн страница на плащане с кредитна карта с Paybox
admin_Module50100Name                                                           : Точка на продажбите
admin_Module50100Desc                                                           : Точка на продажбите модул
admin_Module50200Name                                                           : Paypal
admin_Module50200Desc                                                           : Модул предлага онлайн страница на плащане с кредитна карта с Paypal
admin_Module59000Name                                                           : Полета
admin_Module59000Desc                                                           : Модул за управление на маржовете
admin_Module60000Name                                                           : Комисии
admin_Module60000Desc                                                           : Модул за управление на комисии
admin_Permission11                                                              : Клиентите фактури
admin_Permission12                                                              : Създаване / промяна на фактури на клиентите
admin_Permission13                                                              : Unvalidate клиентите фактури
admin_Permission14                                                              : Проверка на клиентите фактури
admin_Permission15                                                              : Изпрати на клиентите фактури по имейл
admin_Permission16                                                              : Създаване на плащания за клиентите фактури
admin_Permission19                                                              : Изтриване на клиентите фактури
admin_Permission21                                                              : Търговски предложения
admin_Permission22                                                              : Създаване / промяна на търговски предложения
admin_Permission24                                                              : Проверка на търговски предложения
admin_Permission25                                                              : Изпращане на търговски предложения
admin_Permission26                                                              : Затворете търговски предложения
admin_Permission27                                                              : Изтриване на търговски предложения
admin_Permission28                                                              : Износ търговски предложения
admin_Permission31                                                              : Прочети продукти
admin_Permission32                                                              : Създаване / модифициране на продукти
admin_Permission34                                                              : Изтриване на продукти
admin_Permission36                                                              : Вижте / управление на скрити продукти
admin_Permission38                                                              : Износ на продукти
admin_Permission41                                                              : Четене на проекти (общи проекти и проекти съм се с нас за)
admin_Permission42                                                              : Създаване / промяна на проекти (общи проекти и проекти съм се с нас за)
admin_Permission44                                                              : Изтриване на проекти (общи проекти и проекти съм се с нас за)
admin_Permission61                                                              : Прочети интервенции
admin_Permission62                                                              : Създаване / промяна на интервенции
admin_Permission64                                                              : Изтриване на интервенции
admin_Permission67                                                              : Износ интервенции
admin_Permission71                                                              : Прочети членове
admin_Permission72                                                              : Създаване / промяна на членове
admin_Permission74                                                              : Изтриване на членовете
admin_Permission75                                                              : Настройка вида и атрибути за членовете
admin_Permission76                                                              : Export презареждане
admin_Permission78                                                              : Прочети абонаменти
admin_Permission79                                                              : Създаване / промяна на абонаменти
admin_Permission81                                                              : Клиенти поръчки
admin_Permission82                                                              : Създаване / промяна клиенти поръчки
admin_Permission84                                                              : Проверка на клиенти поръчки
admin_Permission86                                                              : Изпрати клиенти поръчки
admin_Permission87                                                              : Затваряне на поръчките на клиентите
admin_Permission88                                                              : Отказ клиенти поръчки
admin_Permission89                                                              : Изтриване на клиенти поръчки
admin_Permission91                                                              : Социалноосигурителните вноски и ДДС
admin_Permission92                                                              : Създаване / промяна на социалните вноски и ДДС
admin_Permission93                                                              : Изтриване на социалноосигурителните вноски и ДДС
admin_Permission94                                                              : Експортиране на социалноосигурителните вноски
admin_Permission95                                                              : Прочети доклада
admin_Permission96                                                              : Настройка на експедиция
admin_Permission97                                                              : Фактура за счетоводството експедиция
admin_Permission98                                                              : Изпращането фактура линии счетоводни
admin_Permission101                                                             : Прочети sendings
admin_Permission102                                                             : Създаване / промяна sendings
admin_Permission104                                                             : Проверка на sendings
admin_Permission109                                                             : Изтриване sendings
admin_Permission111                                                             : Финансови сметки
admin_Permission112                                                             : Създаване / редакция / изтриване и сравни сделки
admin_Permission113                                                             : Настройка financiel сметки (да създават, управляват категории)
admin_Permission114                                                             : Консолидиране на сделки
admin_Permission115                                                             : Експортни сделки и извлеченията от сметките
admin_Permission116                                                             : Трансфери между сметки
admin_Permission117                                                             : Управление на проверки за експедиция
admin_Permission121                                                             : Четене на трети лица, свързани с потребителя
admin_Permission122                                                             : Създаване / промяна трети страни, свързани с потребителя
admin_Permission125                                                             : Изтриване на трети лица, свързани с потребителя
admin_Permission126                                                             : Трети страни за износ
admin_Permission141                                                             : Прочетете проекти (лично аз не съм се с нас за)
admin_Permission142                                                             : Създаване / промяна проекти (лично аз не съм се свържете)
admin_Permission144                                                             : Изтриване на проекти (лично аз не съм се с нас за)
admin_Permission146                                                             : Прочети доставчици
admin_Permission147                                                             : Прочети статистиката
admin_Permission151                                                             : Нареждания за периодични преводи
admin_Permission152                                                             : Създаване / промяна на постоянни нареждания, искане
admin_Permission153                                                             : Кутия постоянни нареждания разписки
admin_Permission154                                                             : Кредит / отказват постоянни постъпления поръчки
admin_Permission161                                                             : Прочети договори
admin_Permission162                                                             : Създаване / промяна на договорите
admin_Permission163                                                             : Активиране на услугата на договор
admin_Permission164                                                             : Изключване услуга на договор
admin_Permission165                                                             : Изтриване на договори
admin_Permission171                                                             : Прочети пътувания
admin_Permission172                                                             : Създаване / промяна пътувания
admin_Permission173                                                             : Изтриване пътувания
admin_Permission178                                                             : Износ пътувания
admin_Permission180                                                             : Прочети доставчици
admin_Permission181                                                             : Доставчика поръчки
admin_Permission182                                                             : Създаване / промяна на доставчика поръчки
admin_Permission183                                                             : Проверка на доставчика поръчки
admin_Permission184                                                             : Одобряване на доставчика поръчки
admin_Permission185                                                             : Поръчка доставчика поръчки
admin_Permission186                                                             : Получаване на доставчика поръчки
admin_Permission187                                                             : Близки поръчки доставчици
admin_Permission188                                                             : Отказ доставчика поръчки
admin_Permission192                                                             : Създаване на линии
admin_Permission193                                                             : Отказ линии
admin_Permission194                                                             : Прочетете честотна лента линии
admin_Permission202                                                             : Създаване на ADSL връзки
admin_Permission203                                                             : Поръчка връзки поръчки
admin_Permission204                                                             : Поръчка връзки
admin_Permission205                                                             : Управление на връзките
admin_Permission206                                                             : Прочетете Връзки
admin_Permission211                                                             : Прочети телефония
admin_Permission212                                                             : Поръчка линии
admin_Permission213                                                             : Активиране на линия
admin_Permission214                                                             : Setup телефония
admin_Permission215                                                             : Setup доставчици
admin_Permission221                                                             : Прочети emailings
admin_Permission222                                                             : Създаване / промяна emailings (тема, получатели ...)
admin_Permission223                                                             : Проверка на emailings (позволява изпращане)
admin_Permission229                                                             : Изтриване emailings
admin_Permission237                                                             : Получатели и информация
admin_Permission238                                                             : Ръчно изпрати писма
admin_Permission239                                                             : Изтриване на писма след утвърждаване или изпратени
admin_Permission241                                                             : Прочети категории
admin_Permission242                                                             : Създаване / промяна на категории
admin_Permission243                                                             : Изтриване на категории
admin_Permission244                                                             : Вижте съдържанието на скрити категории
admin_Permission251                                                             : Прочетете други потребители и групи
admin_PermissionAdvanced251                                                     : Прочетете други потребители
admin_Permission252                                                             : Разрешения на други потребители
admin_Permission253                                                             : Създаване / промяна на други потребители, групи и permisssions
admin_PermissionAdvanced253                                                     : Създаване / промяна на вътрешни / външни потребители и разрешения
admin_Permission254                                                             : Създаване / промяна на външни потребители
admin_Permission255                                                             : Промяна на други потребители парола
admin_Permission256                                                             : Изтрий или забраняване на други потребители
admin_Permission262                                                             : Разширяване на достъпа до всички трети страни (не само тези, които са свързани към потребител). Не е в сила за външни потребители (винаги само за себе си).
admin_Permission271                                                             : Прочети CA
admin_Permission272                                                             : Прочети фактури
admin_Permission273                                                             : Издаване на фактури
admin_Permission281                                                             : Прочети контакти
admin_Permission282                                                             : Създаване / Промяна на контактите
admin_Permission283                                                             : Изтриване на контакти
admin_Permission286                                                             : Експортиране на контакти
admin_Permission291                                                             : Прочети тарифи
admin_Permission292                                                             : Задаване на разрешения за тарифите
admin_Permission293                                                             : Промяна на клиенти тарифи
admin_Permission300                                                             : Баркодове
admin_Permission301                                                             : Създаване / промяна на баркодове
admin_Permission302                                                             : Изтриване на баркодове
admin_Permission311                                                             : Прочети услуги
admin_Permission312                                                             : Присвояване услуга за сключване на договор
admin_Permission331                                                             : Прочетете отметките
admin_Permission332                                                             : Създаване / промяна на отметки
admin_Permission333                                                             : Изтриване на отметки
admin_Permission341                                                             : Прочетете своите разрешения
admin_Permission342                                                             : Създаване / промяна на собствената си потребителска информация
admin_Permission343                                                             : Промяна на собствената си парола
admin_Permission344                                                             : Промяна на свои собствени разрешения
admin_Permission351                                                             : Прочети групи
admin_Permission352                                                             : Групи разрешения
admin_Permission353                                                             : Създаване / промяна на групи
admin_Permission354                                                             : Изтрий или забраняване на групи
admin_Permission358                                                             : Износ потребители
admin_Permission401                                                             : Прочети отстъпки
admin_Permission402                                                             : Създаване / промяна на отстъпки
admin_Permission403                                                             : Проверка на отстъпки
admin_Permission404                                                             : Изтриване на отстъпки
admin_Permission531                                                             : Прочети услуги
admin_Permission532                                                             : Създаване / промяна услуги
admin_Permission534                                                             : Изтриване на услуги
admin_Permission536                                                             : Вижте / управление скрити услуги
admin_Permission538                                                             : Износ услуги
admin_Permission701                                                             : Прочети дарения
admin_Permission702                                                             : Създаване / промяна на дарения
admin_Permission703                                                             : Изтриване на дарения
admin_Permission1001                                                            : Прочети запаси
admin_Permission1002                                                            : Създаване / промяна на запасите
admin_Permission1003                                                            : Изтриване на запасите
admin_Permission1004                                                            : Движението на стоковите наличности
admin_Permission1005                                                            : Създаване / промяна на движението на стоковите наличности
admin_Permission1101                                                            : Поръчките за доставка
admin_Permission1102                                                            : Създаване / промяна на поръчките за доставка
admin_Permission1104                                                            : Проверка на поръчките за доставка
admin_Permission1109                                                            : Изтриване на поръчките за доставка
admin_Permission1181                                                            : Прочети доставчици
admin_Permission1182                                                            : Доставчика поръчки
admin_Permission1183                                                            : Създаване / промяна на доставчика поръчки
admin_Permission1184                                                            : Проверка на доставчика поръчки
admin_Permission1185                                                            : Одобряване на доставчика поръчки
admin_Permission1186                                                            : Поръчка доставчика поръчки
admin_Permission1187                                                            : Потвърдя получаването на доставчика поръчки
admin_Permission1188                                                            : Изтриване на доставчика поръчки
admin_Permission1201                                                            : Резултат от износ
admin_Permission1202                                                            : Създаване / Промяна на износ
admin_Permission1231                                                            : Доставчика фактури
admin_Permission1232                                                            : Създаване / промяна на доставчика фактури
admin_Permission1233                                                            : Проверка на доставчика фактури
admin_Permission1234                                                            : Изтриване на доставчика фактури
admin_Permission1235                                                            : Изпрати доставчика фактури по имейл
admin_Permission1236                                                            : EXPORT доставчик фактури, атрибути и плащания
admin_Permission1237                                                            : EXPORT доставчик поръчки и техните детайли
admin_Permission1251                                                            : Пусни масов внос на външни данни в базата данни (данни товара)
admin_Permission1321                                                            : Износ на клиентите фактури, атрибути и плащания
admin_Permission1401                                                            : Lire le plan de compte
admin_Permission1402                                                            : Créer/modifier un plan de compte
admin_Permission1403                                                            : Clôturer un plan de compte
admin_Permission1411                                                            : Lire les mouvements comptables
admin_Permission1412                                                            : Créer/modifier/annuler les mouvements comptables
admin_Permission1415                                                            : Lire CA, bilans, résultats, journaux, grands livres
admin_Permission1421                                                            : Износ на клиентски поръчки и атрибути
admin_Permission2401                                                            : Прочетете действия (събития или задачи), свързани с неговата сметка
admin_Permission2402                                                            : Създаване / промяна действия (събития или задачи), свързани с неговата сметка
admin_Permission2403                                                            : Изтрий действия (събития или задачи), свързани с неговата сметка
admin_Permission2411                                                            : Прочетете действия (събития или задачи) на другите
admin_Permission2412                                                            : Създаване / промяна действия (събития или задачи) на другите
admin_Permission2413                                                            : Изтрий действия (събития или задачи) на другите
admin_Permission2501                                                            : / Изтегляне документи
admin_Permission2502                                                            : Изтегляне на документи
admin_Permission2503                                                            : Изпращане или изтриване на документи
admin_Permission2515                                                            : Setup документи директории
admin_Permission2801                                                            : Използвайте FTP клиент в режим на четене (да преглеждате и сваляте само)
admin_Permission2802                                                            : Използвайте FTP клиент в режим на запис (изтриване или качване на файлове)
admin_Permission50101                                                           : Използвайте точка на продажбите
admin_Permission50201                                                           : Прочети сделки
admin_Permission50202                                                           : Сделки на внос
admin_DictionnaryCompanyType                                                    : Фирма видове
admin_DictionnaryCompanyJuridicalType                                           : Юридическите видове дружества
admin_DictionnaryProspectLevel                                                  : Prospect потенциал ниво
admin_DictionnaryCanton                                                         : Щат / кантони
admin_DictionnaryRegion                                                         : Регионите
admin_DictionnaryCountry                                                        : Страни
admin_DictionnaryCurrency                                                       : Валути
admin_DictionnaryCivility                                                       : Учтивост заглавие
admin_DictionnaryActions                                                        : Вид на дневния ред събития
admin_DictionnarySocialContributions                                            : Социални видове вноски
admin_DictionnaryVAT                                                            : Ставките на ДДС или данък върху продажбите цени
admin_DictionnaryPaymentConditions                                              : Условия на плащане
admin_DictionnaryPaymentModes                                                   : Плащане режими
admin_DictionnaryTypeContact                                                    : Контакт / Адрес видове
admin_DictionnaryEcotaxe                                                        : Ecotax (ОЕЕО)
admin_DictionnaryPaperFormat                                                    : Формати на хартията
admin_DictionnaryFees                                                           : Вид на таксите
admin_DictionnarySendingMethods                                                 : Доставка методи
admin_DictionnaryStaff                                                          : Персонал
admin_DictionnaryAvailability                                                   : Доставка закъснение
admin_DictionnaryOrderMethods                                                   : Подреждане методи
admin_DictionnarySource                                                         : Произход на предложения / поръчки
admin_DictionnaryAccountancyplan                                                : Сметкоплан
admin_DictionnaryAccountancysystem                                              : Models for chart of accounts
admin_SetupSaved                                                                : Setup спаси
admin_BackToModuleList                                                          : Обратно към модули списък
admin_BackToDictionnaryList                                                     : Обратно към речници списък
admin_VATReceivedOnly                                                           : Специална цена не се начислява
admin_VATManagement                                                             : ДДС за управление
admin_VATIsUsedDesc                                                             : Ставка на ДДС по подразбиране при създаването на перспективите, фактури, поръчки и т.н. следват активна стандартното правило: <br> Ако продавачът не се облагат с ДДС, а след това ДДС по подразбиране = 0. Край на правило. <br> Ако (продажба страната = закупуване на страната), а след това на ДДС по подразбиране = ДДС на продукта в продажба страната. Край на правило. <br> Ако продавача и купувача в Европейската общност и стоки са транспортни продукти (кола, кораб, самолет), по подразбиране ДДС = 0 (ДДС следва да бъде платена от купувача, в customoffice на страната си, а не на продавача). Край на правило. <br> Ако продавача и купувача в Европейската общност и купувача не е компания, тогава ДДС по подразбиране = ДДС на продаваните продукти. Край на правило. <br> Ако продавача и купувача в Европейската общност и купувача е фирма, тогава ДДС по подразбиране = 0. Край на правило. <br> Иначе предложената по подразбиране на ДДС = 0. Край на правило.
admin_VATIsNotUsedDesc                                                          : По подразбиране предложената ДДС е 0, които могат да бъдат използвани за подобни случаи сдружения, лицата ОУ малките фирми.
admin_VATIsUsedExampleFR                                                        : Във Франция, това означава, фирми или организации, с реална фискална система (опростен реални или нормални реално). Система, в която ДДС е обявен.
admin_VATIsNotUsedExampleFR                                                     : Във Франция, това означава, асоциации, които са извън декларирания ДДС или фирми, организации или свободните професии, които са избрали фискалната система на микропредприятие (с ДДС франчайз) и се изплаща франчайз ДДС без ДДС декларация. Този избор ще покаже позоваване на &quot;неприлаганите ДДС - арт-293B CGI&quot; във фактурите.
admin_LocalTax1ManagementES                                                     : RE Управление
admin_LocalTax1IsUsedDescES                                                     : RE процент по подразбиране при създаването на перспективите, фактури, поръчки и т.н. следват активна стандартното правило: <br> Ако те купувача не се подлага на RE RE по подразбиране = 0. Край на правило. <br> Ако купувачът се подлага на RE RE по подразбиране. Край на правило. <br>
admin_LocalTax1IsNotUsedDescES                                                  : По подразбиране предложения RE е 0. Край на правило.
admin_LocalTax1IsUsedExampleES                                                  : В Испания те са професионалисти, подлежащи на някои специфични части на испанската IAE.
admin_LocalTax1IsNotUsedExampleES                                               : В Испания те са професионални и общества и при спазване на определени сектори на испанската IAE.
admin_LocalTax2ManagementES                                                     : IRPF Management
admin_LocalTax2IsUsedDescES                                                     : RE процент по подразбиране при създаването на перспективите, фактури, поръчки и т.н. следват активна стандартното правило: <br> Ако продавачът не се подлага на IRPF, тогава IRPF по подразбиране = 0. Край на правило. <br> Ако продавачът е подложен на IRPF тогава IRPF по подразбиране. Край на правило. <br>
admin_LocalTax2IsNotUsedDescES                                                  : По подразбиране предложения IRPF е 0. Край на правило.
admin_LocalTax2IsUsedExampleES                                                  : В Испания, на свободна практика и независими специалисти, които предоставят услуги и фирми, които са избрани на данъчната система от модули.
admin_LocalTax2IsNotUsedExampleES                                               : В Испания те са за бизнес, които не подлежат на данъчната система от модули.
admin_LabelUsedByDefault                                                        : Етикета, използван по подразбиране, ако без превод може да се намери за код
admin_LabelOnDocuments                                                          : Етикет на документи
admin_NbOfDays                                                                  : Nb дни
admin_AtEndOfMonth                                                              : В края на месеца
admin_Offset                                                                    : Офсет
admin_AlwaysActive                                                              : Винаги активна
admin_UpdateRequired                                                            : Вашата система трябва да бъде актуализиран. За да направите това, щракнете върху <a href="%s">Актуализирай сега</a> .
admin_Upgrade                                                                   : Обнови
admin_MenuUpgrade                                                               : Обнови / Удължи
admin_AddExtensionThemeModuleOrOther                                            : Добавяне на разширение (тема, модул, ...)
admin_WebServer                                                                 : Уеб сървър
admin_DocumentRootServer                                                        : Главната директория на уеб сървъра
admin_DataRootServer                                                            : Файлове с данни
admin_IP                                                                        : IP
admin_Port                                                                      : Порт
admin_VirtualServerName                                                         : Виртуален сървър име
admin_AllParameters                                                             : Всички параметри
admin_OS                                                                        : OS
admin_Php                                                                       : Php
admin_PhpEnv                                                                    : Околна среда &quot;
admin_PhpModules                                                                : Модули
admin_PhpConf                                                                   : Conf
admin_PhpWebLink                                                                : Web-Php връзка
admin_Pear                                                                      : Круша
admin_PearPackages                                                              : Крушови пакети
admin_Database                                                                  : База данни
admin_DatabaseServer                                                            : Хост базата данни
admin_DatabaseName                                                              : Име на базата данни
admin_DatabasePort                                                              : Database порт
admin_DatabaseUser                                                              : Потребители на бази данни
admin_DatabasePassword                                                          : Database парола
admin_DatabaseConfiguration                                                     : Настройка на базата данни
admin_Tables                                                                    : Маси
admin_TableName                                                                 : Таблица име
admin_TableLineFormat                                                           : Line формат
admin_NbOfRecord                                                                : Nb на записите
admin_Constraints                                                               : Ограничения
admin_ConstraintsType                                                           : Ограничения тип
admin_ConstraintsToShowOrNotEntry                                               : Ограничение за да покажете или не влизане в менюто
admin_AllMustBeOk                                                               : Всички те трябва да бъдат проверени
admin_Host                                                                      : Сървър
admin_DriverType                                                                : Шофьор тип
admin_SummarySystem                                                             : Резюме на информационна система
admin_SummaryConst                                                              : Списък на всички параметри за настройка Speedealing
admin_SystemUpdate                                                              : Системната актуализация
admin_SystemSuccessfulyUpdate                                                   : Вашата система е актуализиран успешно
admin_MenuCompanySetup                                                          : Фирма / Фондация
admin_MenuNewUser                                                               : Нов потребител
admin_MenuTopManager                                                            : Горното меню мениджър
admin_MenuLeftManager                                                           : Ляво меню мениджър
admin_MenuManager                                                               : Gestionnaire du menu standard
admin_MenuSmartphoneManager                                                     : Smartphone Menu Manager
admin_DefaultMenuTopManager                                                     : Горното меню мениджър
admin_DefaultMenuLeftManager                                                    : Ляво меню мениджър
admin_DefaultMenuManager                                                        : Стандартно меню мениджър
admin_DefaultMenuSmartphoneManager                                              : Smartphone Menu Manager
admin_Skin                                                                      : Кожата тема
admin_DefaultSkin                                                               : Тема по подразбиране на кожата
admin_MaxSizeList                                                               : Максимална дължина за списъка
admin_DefaultMaxSizeList                                                        : Стандартна макс списък
admin_MessageOfDay                                                              : Послание на деня
admin_MessageLogin                                                              : Влез съобщение на страницата
admin_PermanentLeftSearchForm                                                   : Постоянното търсене формата в менюто в ляво
admin_DefaultLanguage                                                           : По подразбиране, за да използвате (кода на езика)
admin_EnableMultilangInterface                                                  : Разрешаване на многоезичен интерфейс
admin_EnableShowLogo                                                            : Покажи лого върху менюто в ляво
admin_SystemSuccessfulyUpdated                                                  : Вашата система е актуализиран успешно
admin_CompanyInfo                                                               : Фирма / основа на информация
admin_CompanyIds                                                                : Фирма / Фондация идентичност
admin_CompanyName                                                               : Име
admin_CompanyAddress                                                            : Адрес
admin_CompanyZip                                                                : Цип
admin_CompanyTown                                                               : Град
admin_CompanyCountry                                                            : Страна
admin_CompanyCurrency                                                           : Основната валута
admin_DoNotShow                                                                 : Не показвай
admin_DoNotSuggestPaymentMode                                                   : Да не предполагат
admin_NoActiveBankAccountDefined                                                : Не е активна банкова сметка на определени
admin_OwnerOfBankAccount                                                        : Собственик на %s банкови сметки
admin_BankModuleNotActive                                                       : Банкови сметки модул не е активиран
admin_ShowBugTrackLink                                                          : Покажи връзката &quot;Доклад за бъг
admin_ShowWorkBoard                                                             : Покажи &quot;тезгяха&quot; на началната страница
admin_Alerts                                                                    : Сигнали
admin_Delays                                                                    : Закъснения
admin_DelayBeforeWarning                                                        : Забавяне преди предупреждение
admin_DelaysBeforeWarning                                                       : Закъснения предупреждение
admin_DelaysOfToleranceBeforeWarning                                            : Толерантност закъснение преди предупреждение
admin_DelaysOfToleranceDesc                                                     : Този екран ви позволява да дефинирате толерирани забавяне преди сигнал се съобщава на екрана с %s икони за всяка края на елемент.
admin_Delays_MAIN_DELAY_ACTIONS_TODO                                            : Толеранс на изчакване (в дни) преди сигнал за планираните събития, които все още не са реализирани
admin_Delays_MAIN_DELAY_ORDERS_TO_PROCESS                                       : Толеранс на изчакване (в дни) преди сигнал за поръчки, които не са обработени
admin_Delays_MAIN_DELAY_SUPPLIER_ORDERS_TO_PROCESS                              : Толеранс на изчакване (в дни) преди сигнал за доставчици поръчки, които все още не са преработени
admin_Delays_MAIN_DELAY_PROPALS_TO_CLOSE                                        : Толеранс на изчакване (в дни), преди сигнал за предложения, за да затворите
admin_Delays_MAIN_DELAY_PROPALS_TO_BILL                                         : Толеранс на изчакване (в дни) преди сигнал за предложения не таксувани
admin_Delays_MAIN_DELAY_NOT_ACTIVATED_SERVICES                                  : Толерантност закъснение (в дни), преди сигнал за услуги, за да активирате
admin_Delays_MAIN_DELAY_RUNNING_SERVICES                                        : Толерантност закъснение (в дни) преди сигнала за изтекъл срок на годност услуги
admin_Delays_MAIN_DELAY_SUPPLIER_BILLS_TO_PAY                                   : Толерантност закъснение (в дни), преди сигнал за неплатени фактури доставчици
admin_Delays_MAIN_DELAY_CUSTOMER_BILLS_UNPAYED                                  : Закъснение (в дни) преди tolerence сигнал за неплатени фактури на клиенти
admin_Delays_MAIN_DELAY_TRANSACTIONS_TO_CONCILIATE                              : Толерантност закъснение (в дни), преди сигнал за висящи банково извлечение
admin_Delays_MAIN_DELAY_MEMBERS                                                 : Толерантност закъснение (в дни), преди сигнал за забавено членски внос
admin_Delays_MAIN_DELAY_CHEQUES_TO_DEPOSIT                                      : Толерантност закъснение (в дни), преди сигнал за проверки депозит
admin_SetupDescription1                                                         : Всички параметри, които са налични в зоната за настройка ви позволяват да настроите Speedealing преди да започнете да го използвате.
admin_SetupDescription2                                                         : 2 най-важните стъпки за настройка са две първи в лявото меню за настройка, това означава, компания / Фондация страницата за настройка и модули страницата за настройка:
admin_SetupDescription3                                                         : Параметри в менюто <b>Setup -> Фирма / фондацията</b> се изисква, тъй като входна информация се използва на дисплеи Speedealing и да променят Speedealing поведение (например за функции, свързани с вашата страна).
admin_SetupDescription4                                                         : Параметри в менюто <b>Setup -> Модулите</b> се изисква, защото Speedealing не е фиксирана ERP / CRM, но сбор от няколко модула, всички повече или по-малко независими. Това е само след активиране на модули сте интересен с това, вие ще видите, функцията се появи в менютата.
admin_SetupDescription5                                                         : Други записи от менюто управляват допълнителни параметри.
admin_EventsSetup                                                               : Настройка за събития трупи
admin_LogEvents                                                                 : Събития одит на сигурността
admin_Audit                                                                     : Проверка
admin_InfoSpeedealing                                                           : Infos Speedealing
admin_InfoOS                                                                    : Infos OS
admin_InfoWebServer                                                             : Infos уеб сървър
admin_InfoDatabase                                                              : Infos база данни
admin_InfoPHP                                                                   : Infos PHP
admin_ListEvents                                                                : Одит събития
admin_ListOfSecurityEvents                                                      : Списък на събитията Speedealing сигурност
admin_SecurityEventsPurged                                                      : Събития по сигурността прочиства
admin_LogEventDesc                                                              : Можете да разрешите тук сеч за събития Speedealing сигурност. Администраторите могат да видите неговото съдържание чрез меню <b>&quot;Системни инструменти - Одит.</b> Внимание, тази функция може да се консумира голямо количество данни в база данни.
admin_AreaForAdminOnly                                                          : Тези характеристики могат да се използват само за <b>потребители</b> от <b>администратора.</b>
admin_SystemInfoDesc                                                            : Информационна система Разни техническа информация можете да получите в режим само за четене и видими само за администратори.
admin_SystemAreaForAdminOnly                                                    : Тази зона е достъпна само за администратор потребители. Нито един от Speedealing разрешения може да намали тази граница.
admin_CompanyFundationDesc                                                      : Редактиране на тази страница цялата известна информация на фирма или фондация, което трябва да управлява (За тази цел кликнете на &quot;Промени&quot; бутона в долната част на страницата)
admin_DisplayDesc                                                               : Можете да изберете всеки параметър свързани с поглед Speedealing и се чувстват тук
admin_AvailableModules                                                          : Налични модули
admin_ToActivateModule                                                          : За да активирате модули, отидете на настройка пространство (Начало-> Setup-> модули).
admin_SessionTimeOut                                                            : Време за сесията
admin_SessionExplanation                                                        : Този брой е гаранция, че никога няма да изтекат преди това забавяне на сесията. Но PHP управление на сесии не гаранция, че сесията винаги изтича след това закъснение: Това се случва, ако се изпълнява система за почистване на кеша сесия. <br> Забележка: не конкретна система, вътрешен PHP процес ще почисти сесия всеки за <b>%s / %s</b> достъп, но само по време на достъп от други сесии.
admin_TriggersAvailable                                                         : Налични тригери
admin_TriggersDesc                                                              : Тригерите са файлове, които ще променят поведението на Speedealing работния процес копират в директорията <b>htdocs / ядро / тригери.</b> Те разбраха нови действия, активирани на събития Speedealing (създаване на нова компания, фактура валидиране, ...).
admin_TriggerDisabledByName                                                     : Тригерите в този файл са изключени от <b>NORUN</b> наставка в името си.
admin_TriggerDisabledAsModuleDisabled                                           : Тригерите в този файл са забранени като модул <b>%s</b> е забранено.
admin_TriggerAlwaysActive                                                       : Тригерите в този файл са винаги активни,, каквото са активирани модули Speedealing.
admin_TriggerActiveAsModuleActive                                               : Тригерите в този файл са активни, като модул <b>%s</b> е активирана.
admin_GeneratedPasswordDesc                                                     : Определете тук правилото, което искате да използвате, за да генерира нова парола, ако поискате да има автоматично генерирана парола
admin_DictionnaryDesc                                                           : Определете тук всички референтни презареждане на данните. Можете да попълните предварително зададена стойност с вашите.
admin_ConstDesc                                                                 : Тази страница ви позволява да редактирате всички останали параметри не са налични в предишните страници. Те са запазени параметрите за напреднали разработчиците или за troubleshouting.
admin_OnceSetupFinishedCreateUsers                                              : Внимание, вие сте на потребителя администратор Speedealing. Администратор потребители не се използват да настроите Speedealing. За обичайна употреба на Speedealing, се препоръчва да използвате не потребителски администратора, създаден от Потребители и групи менюто.
admin_MiscellanousDesc                                                          : Определете тук всички други параметри, свързани със сигурността.
admin_LimitsSetup                                                               : Граници / Прецизно настройване
admin_LimitsDesc                                                                : Можете да дефинирате ограничения, уточнения и оптимизации, използвани от Speedealing тук
admin_MAIN_MAX_DECIMALS_UNIT                                                    : Макс знака след десетичната запетая за единичните цени
admin_MAIN_MAX_DECIMALS_TOT                                                     : Макс знака след десетичната запетая за крайни цени
admin_MAIN_MAX_DECIMALS_SHOWN                                                   : Максималният брой десетични числа за цени, показан на екрана <b>(...</b> след тази цифра, ако искате да видите <b>...</b> когато се отрязва номер, когато е показан на екрана)
admin_MAIN_DISABLE_PDF_COMPRESSION                                              : Използвайте PDF компресия за генерираните PDF файлове.
admin_MAIN_ROUNDING_RULE_TOT                                                    : Размер на закръгляване гама (за редките страни, където закръгляването се извършва върху нещо друго, отколкото база 10)
admin_UnitPriceOfProduct                                                        : Нетен единичната цена на даден продукт
admin_TotalPriceAfterRounding                                                   : Обща цена (нето / с ДДС / с ДДС) след закръгляване
admin_ParameterActiveForNextInputOnly                                           : Параметър ефективно само за следващия вход
admin_NoEventOrNoAuditSetup                                                     : Няма да се иска никакво обезпечение събитие е записано още. Това може да бъде нормално, ако одитът не е разрешена във &quot;Setup - охрана - одит&quot;.
admin_NoEventFoundWithCriteria                                                  : Няма да се иска никакво обезпечение събитие е за такива критерии за търсене.
admin_SeeLocalSendMailSetup                                                     : Вижте настройка Sendmail
admin_BackupDesc                                                                : За да направите пълно архивно копие на Speedealing, трябва да:
admin_BackupDesc2                                                               : * Запазване на съдържанието на директорията документи <b>(%s),</b> който съдържа всички качени и генерира файлове (можете да направите цип например).
admin_BackupDesc3                                                               : * Запазване на съдържанието на базата данни в дъмп файла. за това, можете да използвате следните асистент.
admin_BackupDescX                                                               : Архив директория трябва да се съхранява на сигурно място.
admin_BackupDescY                                                               : Генерираните дъмп файла трябва да се съхранява на сигурно място.
admin_BackupPHPWarning                                                          : Backup с този метод не може да бъде гарантирано. Предпочитам предишния
admin_RestoreDesc                                                               : За да възстановите резервно копие на Speedealing, трябва да:
admin_RestoreDesc2                                                              : * Възстановяване архивен файл (компресирания файл за пример) на документи, указател, за да извлечете дървото на файлове в документите директория на нова инсталация Speedealing или в тази актуални документи directoy <b>(%s).</b>
admin_RestoreDesc3                                                              : * Възстановяване на данни от архивния файл на сметището в базата данни на новата инсталация Speedealing или в базата данни на тази инсталация. Внимание, след като се възстанови приключи, трябва да се използва име / парола, че е съществувал, когато резервно копие е направено, за да се свържете отново. За да възстановите резервната база данни в тази инсталация, можете да следвате този помощник.
admin_RestoreMySQL                                                              : MySQL внос
admin_ForcedToByAModule                                                         : Това правило е принуден да <b>%s</b> от активиран модул
admin_PreviousDumpFiles                                                         : Налични файлове резервната база данни дъмп
admin_WeekStartOnDay                                                            : Първи ден от седмицата
admin_RunningUpdateProcessMayBeRequired                                         : Продължителност на процеса на актуализация изглежда да се изисква (Програми версия %s различава от %s версия на базата от данни)
admin_YouMustRunCommandFromCommandLineAfterLoginToUser                          : Трябва да изпълните тази команда от командния ред след влизане на черупката с потребителски <b>%s</b> или трябва да добавите опцията-W в края на командния ред, за да предоставят <b>%s</b> парола.
admin_YourPHPDoesNotHaveSSLSupport                                              : SSL функции не са налични във вашата PHP
admin_DownloadMoreSkins                                                         : Повече кожи за изтегляне
admin_SimpleNumRefModelDesc                                                     : Върнете референтен номер с формат %syymm-NNNN, където YY е годината, mm е месец и NNNN е последователност без дупка и не нулиране
admin_ShowProfIdInAddress                                                       : Покажи professionnal номер с адреси на документи
admin_TranslationUncomplete                                                     : Частичен превод
admin_SomeTranslationAreUncomplete                                              : Някои езици може да бъде частично преведени, или може да съдържа грешки. Ако забележите някои от тях, може да се <b>определи. Lang</b> текстови файлове в директорията <b>htdocs / Langs</b> и да ги представи на форум в <a href="http://www.speedealing.org/forum" target="_blank">http://www.speedealing.org</a> .
admin_MenuUseLayout                                                             : Направете вертикално меню hidable (опция JavaScript не трябва да бъде забранена)
admin_MAIN_DISABLE_METEO                                                        : Изключване метео изглед
admin_TestLoginToAPI                                                            : Тествайте влезете в API
admin_ProxyDesc                                                                 : Някои функции на Speedealing трябва да имат достъп до Интернет, за да работят. Определете тук параметри за това. Ако сървърът Speedealing е зад прокси сървър, тези параметри казва Speedealing как за достъп до интернет през него.
admin_ExternalAccess                                                            : Външен достъп
admin_MAIN_PROXY_USE                                                            : Използване на прокси сървър (иначе директен достъп до интернет)
admin_MAIN_PROXY_HOST                                                           : Име / адрес на прокси сървър
admin_MAIN_PROXY_PORT                                                           : Порт на прокси сървър
admin_MAIN_PROXY_USER                                                           : Влез за да използвате прокси сървър
admin_MAIN_PROXY_PASS                                                           : Парола, за да използвате прокси сървър
admin_DefineHereComplementaryAttributes                                         : Определете тук всички atributes, не е налична по подразбиране, и че искате да се поддържа за %s.
admin_ExtraFields                                                               : Допълнителни атрибути
admin_ExtraFieldsThirdParties                                                   : Complementary attributes (thirdparty)
admin_ExtraFieldsContacts                                                       : Complementary attributes (contact/address)
admin_ExtraFieldHasWrongValue                                                   : Attribut %s има грешна стойност.
admin_AlphaNumOnlyCharsAndNoSpace                                               : само героите alphanumericals без пространство
admin_SendingMailSetup                                                          : Настройка на sendings по електронна поща
admin_SendmailOptionNotComplete                                                 : Внимание, на някои системи Linux, за да изпратите имейл от електронната си поща, Sendmail изпълнение настройка трябва conatins опция-ба (параметър mail.force_extra_parameters във вашия php.ini файл). Ако някои получатели никога не получават имейли, опитайте се да редактирате тази PHP параметър с mail.force_extra_parameters = ба).
admin_PathToDocuments                                                           : Път до документи
admin_PathDirectory                                                             : Директория
admin_SendmailOptionMayHurtBuggedMTA                                            : Функция за да изпращате съобщения, използвайки метод &quot;PHP поща директно&quot; ще генерира имейл съобщение, което може да не бъдат правилно анализирани от някои сървъри за електронна поща. Резултатът е, че някои писма не може да се чете от хора, хоствани от thoose Bugged платформи. Това е случай за някои интернет доставчици (Ex: Orange във Франция). Това не е проблем в Speedealing нито в PHP, но върху получаване на електронна поща сървър. Можете обаче да добавите MAIN_FIX_FOR_BUGGED_MTA опция 1 в инсталационния процес - друг, за да се промени Speedealing да се избегне това. Въпреки това, може да се появи проблем с други сървъри, които спазват строго стандартни SMTP. Друго решение (recommanded) е да се използва метода &quot;SMTP гнездо библиотека&quot;, която все още няма недостатъци.
admin_TranslationSetup                                                          : Конфигурация де ла Traduction
admin_TranslationDesc                                                           : Избор на език виждат на екрана може да бъде променена: <br> * В световен мащаб от менюто <strong>Начало - Setup - Display</strong> <br> * За потребител само от <strong>дисплея</strong> раздела <strong>Потребител</strong> на потребителя карта (кликнете за вход в горната част на екрана).
admin_ClassNotFoundIntoPathWarning                                              : Class %s not found into PHP path
admin_PasswordGenerationStandard                                                : Върнете парола, генерирана в съответствие с вътрешен алгоритъм Speedealing: 8 символа, съдържащи общи цифри и символи с малки.
admin_PasswordGenerationNone                                                    : Не предлагаме някакви генерирана парола. Паролата трябва да въведете ръчно.
admin_UserGroupSetup                                                            : Потребители и групи модул за настройка
admin_GeneratePassword                                                          : Предложи генерирана парола
admin_RuleForGeneratedPasswords                                                 : Член за генериране на предложените пароли или проверката на пароли
admin_DoNotSuggest                                                              : Не предлагаме някакви парола
admin_EncryptedPasswordInDatabase                                               : Да се ​​позволи на криптиране на паролите в базата данни
admin_DisableForgetPasswordLinkOnLogonPage                                      : Да не се показват връзката &quot;Забравена парола&quot; на страницата за вход
admin_UsersSetup                                                                : Потребители модул за настройка
admin_UserMailRequired                                                          : Имейл задължително да създадете нов потребител
admin_CompanySetup                                                              : Фирми модул за настройка
admin_CompanyCodeChecker                                                        : Модул за трети страни за генериране на кода и проверка (клиент или доставчик)
admin_AccountCodeManager                                                        : Модул за генериране на отчетност код (клиент или доставчик)
admin_ModuleCompanyCodeAquarium                                                 : Връщане счетоводна код, построен от: <br> %s последван от код на трета страна доставчик за кодекс за счетоводството на доставчика, <br> %s последван от код на трета страна на клиента за счетоводство код на клиента.
admin_ModuleCompanyCodePanicum                                                  : Връща празна код счетоводство.
admin_ModuleCompanyCodeDigitaria                                                : Счетоводството код зависи от код на трето лице. Код се състои от буквата &quot;C&quot; на първа позиция, следван от първите 5 символа на код на трета страна.
admin_UseNotifications                                                          : Използвайте уведомления
admin_NotificationsDesc                                                         : Имейли уведомления функция позволява тихо изпраща автоматичен мейл, за някои събития Speedealing, на трети лица (клиенти и доставчици), които са конфигурирани да. Избор на активно уведомяване и цели контакти е направена една трета страна в момента.
admin_ModelModules                                                              : Документи шаблони
admin_DocumentModelOdt                                                          : Генериране на документи от OpenDocuments шаблони (. ODT файлове за OpenOffice, KOffice, TextEdit, ...)
admin_WatermarkOnDraft                                                          : Воден знак върху проект на документ
admin_CompanyIdProfChecker                                                      : Професионална Id уникален
admin_MustBeUnique                                                              : Трябва да е уникален?
admin_Miscellanous                                                              : Разни
admin_WebCalSetup                                                               : Настройка webcalendar връзка
admin_WebCalSyncro                                                              : Да Добавяне на Speedealing събития да WebCalendar
admin_WebCalAllways                                                             : Винаги, не иска
admin_WebCalYesByDefault                                                        : При поискване (да по подразбиране)
admin_WebCalNoByDefault                                                         : При поискване (не по подразбиране)
admin_WebCalNever                                                               : Никога
admin_WebCalURL                                                                 : URL за календарната достъп
admin_WebCalServer                                                              : Хостинг сървър календар база данни
admin_WebCalDatabaseName                                                        : Име на базата данни
admin_WebCalUser                                                                : Потребителя за достъп до базата данни
admin_WebCalSetupSaved                                                          : Webcalendar настройка запазена успешно.
admin_WebCalTestOk                                                              : Връзка към &quot;%s&quot; сървър на &quot;%s&quot; база данни с успешен потребителски %s.
admin_WebCalTestKo1                                                             : Свързване към сървър &quot;%s успее, но база данни&quot; %s &quot;не може да бъде постигнато.
admin_WebCalTestKo2                                                             : Връзка към сървъра &quot;%s&quot; с потребителя %s &quot;се провали.
admin_WebCalErrorConnectOkButWrongDatabase                                      : Връзка успял, но базата данни не изглежда да е база данни Webcalendar.
admin_WebCalAddEventOnCreateActions                                             : Добавяне на събитие календара на действия създават
admin_WebCalAddEventOnCreateCompany                                             : Добавяне на събитие календара на компании създават
admin_WebCalAddEventOnStatusPropal                                              : Добавяне на събитие календара на търговски предложения за промяна в статуса
admin_WebCalAddEventOnStatusContract                                            : Добавяне на събитие календара на договори, промяна в статуса
admin_WebCalAddEventOnStatusBill                                                : Добавяне на събитие календара на сметките за промяна в статуса
admin_WebCalAddEventOnStatusMember                                              : Добавяне на събитие календар на членовете промяна в статуса
admin_WebCalUrlForVCalExport                                                    : За износ на линк към <b>%s</b> формат е на разположение на следния линк: %s
admin_WebCalCheckWebcalSetup                                                    : Може би Webcal настройка модул не е вярно.
admin_BillsSetup                                                                : Фактури модул за настройка
admin_BillsDate                                                                 : Фактури дата
admin_BillsNumberingModule                                                      : Фактури и кредитни известия, номериране модул
admin_BillsPDFModules                                                           : Фактура модели документи
admin_CreditNoteSetup                                                           : Кредитен настройка бележка модул
admin_CreditNotePDFModules                                                      : Кредитни модели Забележка документи
admin_CreditNote                                                                : Кредитно известие
admin_CreditNotes                                                               : Кредитни известия
admin_ForceInvoiceDate                                                          : Принудително датата на фактурата датата на валидиране
admin_DisableRepeatable                                                         : Изключване на повтарящи се фактури
admin_SuggestedPaymentModesIfNotDefinedInInvoice                                : Предложени плащания режим на фактура по подразбиране, ако не са определени за фактура
admin_EnableEditDeleteValidInvoice                                              : Разрешаване на възможността да редактирате / изтриете валидна фактура без заплащане
admin_SuggestPaymentByRIBOnAccount                                              : Предложи плащане от оттеглят по сметка
admin_SuggestPaymentByChequeToAddress                                           : Предложи плащане с чек до
admin_FreeLegalTextOnInvoices                                                   : Свободен текст на фактури
admin_WatermarkOnDraftInvoices                                                  : Воден знак върху проекти на фактури (всяка ако е празно)
admin_PropalSetup                                                               : Модул за настройка на търговски предложения
admin_CreateForm                                                                : Създаване на формуляри
admin_NumberOfProductLines                                                      : Брой на продуктовите линии
admin_ProposalsNumberingModules                                                 : Търговско предложение за номериране на модули
admin_ProposalsPDFModules                                                       : Търговски предложение документи модели
admin_ClassifiedInvoiced                                                        : Обява фактурирани
admin_HideTreadedPropal                                                         : Скриване на третираните търговски предложения в списъка
admin_AddShippingDateAbility                                                    : Добавяне на способността дата на изпращане
admin_AddDeliveryAddressAbility                                                 : Добавяне на способността дата на доставка
admin_UseOptionLineIfNoQuantity                                                 : Линия на продукт / услуга с нулева сума се разглежда като вариант
admin_FreeLegalTextOnProposal                                                   : Свободен текст на търговски предложения
admin_WatermarkOnDraftProposal                                                  : Воден знак върху проектите за търговски предложения (всеки ако е празно)
admin_OrdersSetup                                                               : Настройка за управление на поръчки
admin_OrdersNumberingModules                                                    : Поръчки номериране модули
admin_OrdersModelModule                                                         : Поръчка документи модели
admin_HideTreadedOrders                                                         : Скриване на третираните или отказани поръчки в списъка
admin_ValidOrderAfterPropalClosed                                               : Да се ​​потвърди ред след предложението близо, това прави възможно да не се увеличат с временния ред
admin_FreeLegalTextOnOrders                                                     : Свободен текст на поръчки
admin_WatermarkOnDraftOrders                                                    : Воден знак върху черновите на поръчките (всеки ако е празно)
admin_ClickToDialSetup                                                          : Кликнете, за да наберете настройка модул
admin_ClickToDialUrlDesc                                                        : Адреса нарича, когато се извършва едно кликване на телефона пиктограма. URL, можете да използвате маркери <br> <b>__PHONETO__,</b> Които ще бъдат заменени с телефонния номер на лицето, да се обадите <br> <b>__PHONEFROM__,</b> Че ще бъде заменен с телефонния номер на повикващата лице (твое) <br> <b>__LOGIN__,</b> Които ще бъдат заменени с clicktodial вход (определено на вашето потребителско карта) <br> <b>__PASS__,</b> Които ще бъдат заменени с clicktodial вашата парола (определено на вашето потребителско карта).
admin_Bookmark4uSetup                                                           : Bookmark4u модул за настройка
admin_InterventionsSetup                                                        : Интервенциите модул за настройка
admin_FreeLegalTextOnInterventions                                              : Свободен текст на интервенционни документи
admin_FicheinterNumberingModules                                                : Модули за намеса номериране
admin_TemplatePDFInterventions                                                  : Намеса карти документи модели
admin_WatermarkOnDraftInterventionCards                                         : Воден знак върху документи намеса карти (всеки ако е празно)
admin_ContractsSetup                                                            : Договори модул за настройка
admin_ContractsNumberingModules                                                 : Договори за номериране модули
admin_MembersSetup                                                              : Потребители модул за настройка
admin_MemberMainOptions                                                         : Основни параметри
admin_AddSubscriptionIntoAccount                                                : Предложи по подразбиране, за да се създаде модул на банка, банков превод, при добавяне на нов платено абонамент
admin_AdherentLoginRequired                                                     : Управление на вход за всяка държава
admin_AdherentMailRequired                                                      : EMail необходимо да се създаде нов член
admin_MemberSendInformationByMailByDefault                                      : Checkbox да изпрати потвърждение поща на членовете (валидиране или нов абонамент) е включена по подразбиране
admin_LDAPSetup                                                                 : LDAP Setup
admin_LDAPGlobalParameters                                                      : Глобални параметри
admin_LDAPUsersSynchro                                                          : Потребители
admin_LDAPGroupsSynchro                                                         : Групи
admin_LDAPContactsSynchro                                                       : Контакти
admin_LDAPMembersSynchro                                                        : Потребители
admin_LDAPSynchronization                                                       : LDAP синхронизация
admin_LDAPFunctionsNotAvailableOnPHP                                            : LDAP функции не са налични на вашия PHP
admin_LDAPToSpeedealing                                                         : LDAP -> Speedealing
admin_SpeedealingToLDAP                                                         : Speedealing -> LDAP
admin_LDAPNamingAttribute                                                       : Въведете LDAP
admin_LDAPSynchronizeUsers                                                      : Организацията на потребителите в LDAP
admin_LDAPSynchronizeGroups                                                     : Организиране на групи в LDAP
admin_LDAPSynchronizeContacts                                                   : Организиране на контакти в LDAP
admin_LDAPSynchronizeMembers                                                    : Организацията на членовете на фондацията в LDAP
admin_LDAPTypeExample                                                           : OpenLDAP, Egroupware или Active Directory
admin_LDAPPrimaryServer                                                         : Основно сървъра
admin_LDAPSecondaryServer                                                       : Средно сървъра
admin_LDAPServerPort                                                            : Порта на сървъра
admin_LDAPServerPortExample                                                     : Подразбиране порта: 389
admin_LDAPServerProtocolVersion                                                 : Протокол версия
admin_LDAPServerUseTLS                                                          : Използване на TLS
admin_LDAPServerUseTLSExample                                                   : LDAP сървъра използване TLS
admin_LDAPServerDn                                                              : Сървър DN
admin_LDAPAdminDn                                                               : Administrator DN
admin_LDAPAdminDnExample                                                        : Пълна DN (напр.: CN = adminldap, DC = общество, DC = COM)
admin_LDAPPassword                                                              : Администраторската парола
admin_LDAPUserDn                                                                : Потребителя DN
admin_LDAPUserDnExample                                                         : Пълна DN (EX: OU = потребители, DC = общество, DC = COM)
admin_LDAPGroupDn                                                               : Групи &quot;DN
admin_LDAPGroupDnExample                                                        : Пълна DN (: ОУ = групи, DC = общество, DC = COM)
admin_LDAPServerExample                                                         : Адрес на сървъра (например: Localhost, 192.168.0.2, ldaps :/ / ldap.example.com /)
admin_LDAPServerDnExample                                                       : Пълна DN (: DC = компания, DC = COM)
admin_LDAPPasswordExample                                                       : Admin парола
admin_LDAPDnSynchroActive                                                       : Потребители и групи синхронизация
admin_LDAPDnSynchroActiveExample                                                : LDAP Speedealing или Speedealing LDAP синхронизация
admin_LDAPDnContactActive                                                       : Контакти &quot;синхронизация
admin_LDAPDnContactActiveYes                                                    : Активният синхронизация
admin_LDAPDnContactActiveExample                                                : Активира / Неактивирани синхронизация
admin_LDAPDnMemberActive                                                        : Членовете синхронизация
admin_LDAPDnMemberActiveExample                                                 : Активира / Неактивирани синхронизация
admin_LDAPContactDn                                                             : Speedealing контакти &quot;DN
admin_LDAPContactDnExample                                                      : Пълна DN (бивши: ОУ = контакти, DC = общество, DC = COM)
admin_LDAPMemberDn                                                              : Speedealing членове DN
admin_LDAPMemberDnExample                                                       : Пълна DN (EX: OU = потребители, DC = общество, DC = COM)
admin_LDAPMemberObjectClassList                                                 : Списък на objectClass
admin_LDAPMemberObjectClassListExample                                          : Списък на атрибути за определяне на objectClass рекордни (напр. върха, inetOrgPerson или отгоре, ръководство за активна директория)
admin_LDAPUserObjectClassList                                                   : Списък на objectClass
admin_LDAPUserObjectClassListExample                                            : Списък на атрибути за определяне на objectClass рекордни (напр. върха, inetOrgPerson или отгоре, ръководство за активна директория)
admin_LDAPGroupObjectClassList                                                  : Списък на objectClass
admin_LDAPGroupObjectClassListExample                                           : Списък на атрибути за определяне на objectClass рекордни (: отгоре, groupOfUniqueNames)
admin_LDAPContactObjectClassList                                                : Списък на objectClass
admin_LDAPContactObjectClassListExample                                         : Списък на атрибути за определяне на objectClass рекордни (напр. върха, inetOrgPerson или отгоре, ръководство за активна директория)
admin_LDAPMemberTypeDn                                                          : Speedealing членове тип DN
admin_LDAPMemberTypeDnExample                                                   : Пълна DN (EX: ОУ = type_members, DC = общество, DC = COM)
admin_LDAPTestConnect                                                           : Тествайте LDAP връзка
admin_LDAPTestSynchroContact                                                    : Тест за синхронизация на контактите
admin_LDAPTestSynchroUser                                                       : Синхронизация тест на потребителя
admin_LDAPTestSynchroGroup                                                      : Синхронизация Test група
admin_LDAPTestSynchroMember                                                     : Член на синхронизация Test
admin_LDAPSynchroOK                                                             : Синхронизация тест успешно
admin_LDAPSynchroKO                                                             : Неуспешно синхронизиране тест
admin_LDAPSynchroKOMayBePermissions                                             : Неуспешно синхронизиране тест. Уверете се, че свързването със сървъра е конфигуриран правилно и позволява LDAP udpates
admin_LDAPTCPConnectOK                                                          : TCP свърже с LDAP сървъра успешни (сървър = %s, Порт = %s)
admin_LDAPTCPConnectKO                                                          : TCP се свърже с LDAP сървъра не успя (Server = %s, Port = %s)
admin_LDAPBindOK                                                                : Свързване / Authentificate сървъра sucessfull LDAP (сървър = %s, Port = %s, Admin = %s, парола = %s)
admin_LDAPBindKO                                                                : Свързване / Authentificate LDAP сървъра се провали (сървър = %s, Port = %s, Admin = %s, парола = %s)
admin_LDAPUnbindSuccessfull                                                     : Изключете успешно
admin_LDAPUnbindFailed                                                          : Изключете не успя
admin_LDAPConnectToDNSuccessfull                                                : Връзка о DN (%s) РИ ¿½ ussie
admin_LDAPConnectToDNFailed                                                     : Връзка о DN (%s) ï ¿½ chouï ¿½ д
admin_LDAPSetupForVersion3                                                      : LDAP сървър, конфигуриран за версия 3
admin_LDAPSetupForVersion2                                                      : LDAP сървър, конфигуриран за версия 2
admin_LDAPSpeedealingMapping                                                    : Speedealing Mapping
admin_LDAPLdapMapping                                                           : LDAP Mapping
admin_LDAPFieldLoginUnix                                                        : Вход (UNIX)
admin_LDAPFieldLoginExample                                                     : Пример: UID
admin_LDAPFilterConnection                                                      : Търсене филтър
admin_LDAPFilterConnectionExample                                               : Пример: &amp; (objectClass inetOrgPerson)
admin_LDAPFieldLoginSamba                                                       : Вход (самба, activedirectory)
admin_LDAPFieldLoginSambaExample                                                : Пример: samaccountname
admin_LDAPFieldFullname                                                         : Собствено име
admin_LDAPFieldFullnameExample                                                  : Пример: CN
admin_LDAPFieldPassword                                                         : Парола
admin_LDAPFieldPasswordNotCrypted                                               : Паролата не криптирани
admin_LDAPFieldPasswordCrypted                                                  : Парола криптирани
admin_LDAPFieldPasswordExample                                                  : Пример: userPassword
admin_LDAPFieldCommonName                                                       : Общоприето наименование
admin_LDAPFieldCommonNameExample                                                : Пример: CN
admin_LDAPFieldName                                                             : Име
admin_LDAPFieldNameExample                                                      : Пример: SN
admin_LDAPFieldFirstName                                                        : Собствено име
admin_LDAPFieldFirstNameExample                                                 : Пример: givenname
admin_LDAPFieldMail                                                             : Имейл адрес
admin_LDAPFieldMailExample                                                      : Пример: поща
admin_LDAPFieldPhone                                                            : Професионален телефонен номер
admin_LDAPFieldPhoneExample                                                     : Пример: telephonenumber
admin_LDAPFieldHomePhone                                                        : Личен телефонен номер
admin_LDAPFieldHomePhoneExample                                                 : Пример: homephone
admin_LDAPFieldMobile                                                           : Мобилен телефон
admin_LDAPFieldMobileExample                                                    : Пример: мобилен
admin_LDAPFieldFax                                                              : Номер на факс
admin_LDAPFieldFaxExample                                                       : Пример: facsimiletelephonenumber
admin_LDAPFieldAddress                                                          : Улица
admin_LDAPFieldAddressExample                                                   : Пример: ул.
admin_LDAPFieldZip                                                              : Цип
admin_LDAPFieldZipExample                                                       : Пример: Пощенски
admin_LDAPFieldTown                                                             : Град
admin_LDAPFieldTownExample                                                      : Пример: л
admin_LDAPFieldCountry                                                          : Страна
admin_LDAPFieldCountryExample                                                   : Пример: в
admin_LDAPFieldDescription                                                      : Описание
admin_LDAPFieldDescriptionExample                                               : Пример: описание
admin_LDAPFieldGroupMembers                                                     : Членовете на групата
admin_LDAPFieldGroupMembersExample                                              : Пример: uniqueMember
admin_LDAPFieldBirthdate                                                        : Рождена дата
admin_LDAPFieldBirthdateExample                                                 : Пример:
admin_LDAPFieldCompany                                                          : Компания
admin_LDAPFieldCompanyExample                                                   : Пример: о
admin_LDAPFieldSid                                                              : SID
admin_LDAPFieldSidExample                                                       : Пример: objectsid
admin_LDAPFieldEndLastSubscription                                              : Дата на абонамент края
admin_LDAPParametersAreStillHardCoded                                           : LDAP параметри все още кодиран (в контакт клас)
admin_LDAPSetupNotComplete                                                      : LDAP настройка не е пълна (отидете на други раздели)
admin_LDAPNoUserOrPasswordProvidedAccessIsReadOnly                              : Не администратор или парола. LDAP достъп ще бъдат анонимни и в режим само за четене.
admin_LDAPDescContact                                                           : Тази страница ви позволява да дефинирате LDAP атрибути име в LDAP дърво за всеки намерени данни за контактите на Speedealing.
admin_LDAPDescUsers                                                             : Тази страница ви позволява да дефинирате LDAP атрибути име в LDAP дърво за всеки намерени данни на потребителите Speedealing.
admin_LDAPDescGroups                                                            : Тази страница ви позволява да дефинирате LDAP атрибути име в LDAP дърво за всеки данни, намиращи се на групи Speedealing.
admin_LDAPDescMembers                                                           : Тази страница ви позволява да дефинирате LDAP атрибути име в LDAP дърво за всеки намерени данни на Speedealing членове модул.
admin_LDAPDescValues                                                            : Примерни стойности са предназначени за <b>OpenLDAP</b> със следните заредени схеми: <b>core.schema, cosine.schema, inetorgperson.schema).</b> Ако използвате thoose ценности и OpenLDAP, променете LDAP <b>slapd.conf</b> конфигурационен файл, за да има всички thoose схеми натоварени.
admin_ForANonAnonymousAccess                                                    : За заверено достъп (достъп за писане например)
admin_ProductSetup                                                              : Продукти модул за настройка
admin_ServiceSetup                                                              : Услуги модул за настройка
admin_ProductServiceSetup                                                       : Продукти и услуги модули за настройка
admin_NumberOfProductShowInSelect                                               : Максимален брой продукти в комбинации изберете списъци (0 = без ограничение)
admin_ConfirmDeleteProductLineAbility                                           : Потвърждение при премахване на продуктови линии във форми
admin_ModifyProductDescAbility                                                  : Персонализация на описания на продукти във формите
admin_ViewProductDescInFormAbility                                              : Визуализация на описания на продукти във формите (в противен случай като изскачащ прозорец подсказка)
admin_ViewProductDescInThirdpartyLanguageAbility                                : Визуализация на продукти, описания в thirdparty език
admin_UseSearchToSelectProduct                                                  : Използвайте формата за търсене, за да изберете продукт (вместо да използвате списъчно поле). <br> Също така, ако имате голям брой продукт (&gt; 100 000), можете да увеличите скоростта чрез създаване на постоянна PRODUCT_DONOTSEARCH_ANYWHERE 1 в Setup->. Търсене след това ще бъдат ограничени до началото на низ.
admin_UseEcoTaxeAbility                                                         : Подкрепа Eco-Taxe (ОЕЕО)
admin_SetDefaultBarcodeTypeProducts                                             : Тип баркод по подразбиране за продукти
admin_SetDefaultBarcodeTypeThirdParties                                         : Тип баркод по подразбиране за трети страни
admin_ProductCodeChecker                                                        : Модул за генериране и проверка на кода на продукта (продукт или услуга)
admin_ProductOtherConf                                                          : Продукт / услуга конфигурация
admin_SyslogSetup                                                               : Дневници модул за настройка
admin_SyslogOutput                                                              : Логове изходи
admin_SyslogSyslog                                                              : Syslog
admin_SyslogFacility                                                            : Механизъм
admin_SyslogLevel                                                               : Ниво
admin_SyslogSimpleFile                                                          : Досие
admin_SyslogFilename                                                            : Име на файла и пътя
admin_YouCanUseDOL_DATA_ROOT                                                    : Можете да използвате DOL_DATA_ROOT / speedealing.log за лог файл в Speedealing директория &quot;документи&quot;. Можете да зададете различен път, за да се съхранява този файл.
admin_ErrorUnknownSyslogConstant                                                : Постоянни %s не е известен Syslog постоянно
admin_OnlyWindowsLOG_USER                                                       : Windows поддържа само LOG_USER
admin_DonationsSetup                                                            : Настройка Дарение модул
admin_DonationsReceiptModel                                                     : Шаблон на получаване на дарение
admin_BarcodeSetup                                                              : Баркод настройка
admin_PaperFormatModule                                                         : Печат модул формат
admin_BarcodeEncodeModule                                                       : Баркод кодиране тип
admin_UseBarcodeInProductModule                                                 : Използвайте баркодове за продукти
admin_CodeBarGenerator                                                          : Баркод генератор
admin_ChooseABarCode                                                            : Не е определена генератор
admin_FormatNotSupportedByGenerator                                             : Format not supported by this generator
admin_BarcodeDescEAN8                                                           : Баркод на типа EAN8
admin_BarcodeDescEAN13                                                          : Баркод от тип EAN13
admin_BarcodeDescUPC                                                            : Баркод от тип UPC
admin_BarcodeDescISBN                                                           : Баркод от тип ISBN
admin_BarcodeDescC39                                                            : Баркод от типа С39
admin_BarcodeDescC128                                                           : Баркод от тип C128
admin_WithdrawalsSetup                                                          : Настройка Оттегляне модул
admin_ExternalRSSSetup                                                          : Външен RSS вноса настройка
admin_NewRSS                                                                    : Ню RSS Feed
admin_RSSUrl                                                                    : RSS URL
admin_RSSUrlExample                                                             : Интересен RSS емисия
admin_MailingSetup                                                              : Електронната поща модул за настройка
admin_MailingEMailFrom                                                          : Изпращача (От) за имейли, изпратени по електронната поща модул
admin_MailingEMailError                                                         : Върнете имейл (грешки) за имейли с грешки
admin_NotificationSetup                                                         : Уведомление бу имейл настройка модул
admin_NotificationEMailFrom                                                     : Изпращача (От) за имейли, изпратени за уведомления
admin_ListOfAvailableNotifications                                              : Списък на наличните уведомления (Този списък зависи от активирани модули)
admin_SendingsSetup                                                             : Изпращане модул за настройка
admin_SendingsReceiptModel                                                      : Изпращане получаване модел
admin_SendingsNumberingModules                                                  : Sendings номериране модули
admin_SendingsAbility                                                           : Подкрепа sendings листове за доставки на клиентите
admin_NoNeedForDeliveryReceipts                                                 : В повечето случаи, sendings постъпления се използват както за листа за клиентите доставки (списък на продукти за изпращане) и листове, че е recevied и подписан от клиента. Така че продукти доставки постъпления е дублирана функция и рядко се активира.
admin_FreeLegalTextOnShippings                                                  : Свободен текст на shippings
admin_DeliveryOrderNumberingModules                                             : Продукти доставки получаване номерацията модул
admin_DeliveryOrderModel                                                        : Продукти доставки получаване модел
admin_DeliveriesOrderAbility                                                    : Поддръжка продукти доставки постъпления
admin_FreeLegalTextOnDeliveryReceipts                                           : Свободен текст на разписки за доставка
admin_AdvancedEditor                                                            : Разширено редактор
admin_ActivateFCKeditor                                                         : Активирайте разширен редактор за:
admin_FCKeditorForCompany                                                       : WYSIWIG създаване / редактиране на елементи на описание и бележка (с изключение на продукти / услуги)
admin_FCKeditorForProduct                                                       : WYSIWIG създаване / редактиране на продукти / услуги описание и бележка
admin_FCKeditorForProductDetails                                                : WYSIWIG създаване / редактиране на линии продукти подробности за всички предприятия (предложения, поръчки, фактури и др.) <font class="warning">Внимание: Използването на тази опция за този случай сериозно не се recommanded, тъй като това може да създаде проблеми със специални символи и оформление на страница при изграждането на PDF файлове.</font>
admin_FCKeditorForMailing                                                       : WYSIWIG създаване / редактиране на писма
admin_StockSetup                                                                : Наличност модулна конфигурация
admin_UserWarehouse                                                             : Използване на потребителски поименни акции
admin_MenuDeleted                                                               : Меню заличават
admin_TreeMenu                                                                  : Tree менюта
admin_Menus                                                                     : Менюта
admin_TreeMenuPersonalized                                                      : Персонализирани менюта
admin_NewMenu                                                                   : Ново меню
admin_MenuConf                                                                  : Менюта за настройка
admin_Menu                                                                      : Избор на меню
admin_MenuHandler                                                               : Меню манипулатор
admin_MenuModule                                                                : Източник модул
admin_HideUnauthorizedMenu                                                      : Скриване на неоторизирани менюта (сива)
admin_DetailId                                                                  : Id меню
admin_DetailMenuHandler                                                         : Манипулатор меню, където да покаже ново меню
admin_DetailMenuModule                                                          : Модул име, ако меню влизането идват от модул
admin_DetailType                                                                : Вид на менюто (горната или лявата)
admin_DetailTitre                                                               : Меню етикет или код на етикета за превод
admin_DetailMainmenu                                                            : Група, за която той принадлежи (остаряла)
admin_DetailUrl                                                                 : URL адрес, където менюто ви изпратя (Absolute на URL линк или външна връзка с http://)
admin_DetailLeftmenu                                                            : Покажи състояние или не (остаряла)
admin_DetailEnabled                                                             : Състояние да покаже или не влизането
admin_DetailRight                                                               : Условие, за да се покаже неразрешени менюта сиви
admin_DetailLangs                                                               : Lang името на файла за превод на етикета код
admin_DetailUser                                                                : Intern / EXTERN /
admin_Target                                                                    : Target
admin_DetailTarget                                                              : Цел за връзки (_blank върха отвори в нов прозорец)
admin_DetailLevel                                                               : Level (-1: горното меню, 0: хедър, меню&gt; 0 меню и подменю)
admin_ModifMenu                                                                 : Меню промяна
admin_DeleteMenu                                                                : Изтриване на елемент от менюто
admin_ConfirmDeleteMenu                                                         : Сигурен ли сте, че искате да изтриете <b>%s</b> елемент от менюто?
admin_DeleteLine                                                                : Изтрий ред
admin_ConfirmDeleteLine                                                         : Сигурен ли сте, че искате да изтриете тази линия?
admin_TaxSetup                                                                  : Данъци, социални осигуровки и дивиденти модул за настройка
admin_OptionVatMode                                                             : Дължимия ДДС
admin_OptionVATDefault                                                          : Стандарт
admin_OptionVATDebitOption                                                      : Вариант услуги по дебитни
admin_OptionVatDefaultDesc                                                      : Се дължи ДДС: <br> - При доставка на стоки (ние използваме датата на фактурата) <br> - Плащания за услуги
admin_OptionVatDebitOptionDesc                                                  : Се дължи ДДС: <br> - При доставка на стоки (ние използваме датата на фактурата) <br> - По фактура (дебитно) за услуги
admin_SummaryOfVatExigibilityUsedByDefault                                      : Време на изискуемост на ДДС по подразбиране, според няма избрана опция:
admin_OnDelivery                                                                : При доставка
admin_OnPayment                                                                 : На плащане
admin_OnInvoice                                                                 : На фактура
admin_SupposedToBePaymentDate                                                   : Дата на плащане, използвани
admin_SupposedToBeInvoiceDate                                                   : Дата на фактура използва
admin_Buy                                                                       : Купувам
admin_Sell                                                                      : Продажба
admin_InvoiceDateUsed                                                           : Дата на фактура използва
admin_YourCompanyDoesNotUseVAT                                                  : Вашата фирма е определена да не се използва ДДС (Начало - Setup - Фирма / Фондация &quot;), така че е без ДДС опции за настройка.
admin_AccountancyCode                                                           : Счетоводството кодекс
admin_AccountancyCodeSell                                                       : Sale account. code
admin_AccountancyCodeBuy                                                        : Purchase account. code
admin_AgendaSetup                                                               : Събития и натъкмяване на дневен ред модул
admin_PasswordTogetVCalExport                                                   : , За да разреши износ връзка
admin_PastDelayVCalExport                                                       : Не изнася случай по-стари от
admin_ClickToDialDesc                                                           : Този модул позволява да добавите икона след телефонни номера. Кликнете върху тази икона ще призове сървър с определен URL адрес можете да зададете по-долу. Това може да се използва, за да се обадя на кол център система от Speedealing, че да се обаждат на телефонен номер на SIP система, например.
admin_CashDesk                                                                  : Точка на продажбите
admin_CashDeskSetup                                                             : Точка на продажбите модул за настройка
admin_CashDeskThirdPartyForSell                                                 : Generic трета страна да използва за продава
admin_CashDeskBankAccountForSell                                                : Акаунт по подразбиране да се използва за получаване на парични плащания
admin_CashDeskBankAccountForCheque                                              : Акаунт по подразбиране да се използва за получаване на плащания с чек
admin_CashDeskBankAccountForCB                                                  : Акаунт по подразбиране да се използва за получаване на парични плащания с кредитни карти
admin_CashDeskIdWareHouse                                                       : Склад да се използва за продава
admin_BookmarkSetup                                                             : Bookmark настройка модул
admin_BookmarkDesc                                                              : Този модул ви позволява да управлявате маркери. Можете също да добавите команди за бърз достъп до всички страници Speedealing или externale уеб сайтове на лявата си меню.
admin_NbOfBoomarkToShow                                                         : Максимален брой маркери, за да се показват в менюто в ляво
admin_WebServicesSetup                                                          : WebServices модул за настройка
admin_WebServicesDesc                                                           : С активирането на този модул, Speedealing се превърне в уеб сървъра на услугата за предоставяне на различни уеб услуги.
admin_WSDLCanBeDownloadedHere                                                   : WSDL ЕВРОВОК файлове на предоставяните услуги може да изтеглите от тук
admin_EndPointIs                                                                : SOAP клиентите трябва да изпратят своите заявки на разположение на Адреса на крайна точка Speedealing
admin_BankSetupModule                                                           : Модул за настройка на банката
admin_FreeLegalTextOnChequeReceipts                                             : Свободен текст чековите разписки
admin_BankOrderShow                                                             : Показване ред на банкови сметки за страни, които използват &quot;подробен номер на банкова
admin_BankOrderGlobal                                                           : Общ
admin_BankOrderGlobalDesc                                                       : Обща дисплей за
admin_BankOrderES                                                               : Испански
admin_BankOrderESDesc                                                           : Испански дисплей за
admin_MultiCompanySetup                                                         : Multi-модул за настройка компания
admin_SuppliersSetup                                                            : Настройка доставчик модул
admin_SuppliersCommandModel                                                     : Пълна шаблон на доставчика за (logo. ..)
admin_SuppliersInvoiceModel                                                     : Пълна образец на фактура на доставчика (logo. ..)
admin_GeoIPMaxmindSetup                                                         : GeoIP MaxMind модул за настройка
admin_PathToGeoIPMaxmindCountryDataFile                                         : Пътят към файла, съдържащ MaxMind-IP в страната превод. <br> Пример: / ЮЕсАр / местни / акции / GeoIP / GeoIP.dat
admin_NoteOnPathLocation                                                        : Имайте предвид, че ИП в страната файла с данни трябва да е в директория PHP ви да прочетете (Проверете PHP open_basedir настройка и разрешения файловата система).
admin_YouCanDownloadFreeDatFileTo                                               : Можете да изтеглите <b>безплатна демо версия</b> на файла GeoIP MaxMind страната в %s.
admin_YouCanDownloadAdvancedDatFileTo                                           : Можете също да изтеглите <b>по-пълна версия, с актуализации</b> на файла GeoIP MaxMind страната в %s.
admin_TestGeoIPResult                                                           : Тест на преобразуване IP -> страната
admin_ProjectsNumberingModules                                                  : Проекти номериране модул
admin_ProjectsSetup                                                             : Инсталационния проект модул
admin_ProjectsModelModule                                                       : Проект доклади документ модел
admin_Chartofaccounts                                                           : Plan comptable
admin_Definechartofaccounts                                                     : Définir un plan comptable
admin_Selectchartofaccounts                                                     : Sélection d'un plan comptable
admin_DoNotSuggestChart                                                         : Ne pas suggérer de plan comptable
dict_CountryFR                                                                  : Франция
dict_CountryBE                                                                  : Белгия
dict_CountryIT                                                                  : Италия
dict_CountryES                                                                  : Испания
dict_CountryDE                                                                  : Германия
dict_CountryCH                                                                  : Швейцария
dict_CountryGB                                                                  : Великобритания
dict_CountryIE                                                                  : Ирландия
dict_CountryCN                                                                  : Китай
dict_CountryTN                                                                  : Тунис
dict_CountryUS                                                                  : САЩ
dict_CountryMA                                                                  : Мароко
dict_CountryDZ                                                                  : Алжир
dict_CountryCA                                                                  : Канада
dict_CountryTG                                                                  : Того
dict_CountryGA                                                                  : Габон
dict_CountryNL                                                                  : Холандия
dict_CountryHU                                                                  : Унгария
dict_CountryRU                                                                  : Русия
dict_CountrySE                                                                  : Швеция
dict_CountryCI                                                                  : Ivoiry Coast
dict_CountrySN                                                                  : Сенегал
dict_CountryAR                                                                  : Аржентина
dict_CountryCM                                                                  : Камерун
dict_CountryPT                                                                  : Португалия
dict_CountrySA                                                                  : Саудитска Арабия
dict_CountryMC                                                                  : Монако
dict_CountryAU                                                                  : Австралия
dict_CountrySG                                                                  : Сингапур
dict_CountryAF                                                                  : Афганистан
dict_CountryAX                                                                  : Аландските острови
dict_CountryAL                                                                  : Албания
dict_CountryAS                                                                  : Американска Самоа
dict_CountryAD                                                                  : Андора
dict_CountryAO                                                                  : Ангола
dict_CountryAI                                                                  : Anguilla
dict_CountryAQ                                                                  : Антарктида
dict_CountryAG                                                                  : Антигуа и Барбуда
dict_CountryAM                                                                  : Армения
dict_CountryAW                                                                  : Аруба
dict_CountryAT                                                                  : Австрия
dict_CountryAZ                                                                  : Азербайджан
dict_CountryBS                                                                  : Бахамските острови
dict_CountryBH                                                                  : Бахрейн
dict_CountryBD                                                                  : Бангладеш
dict_CountryBB                                                                  : Барбадос
dict_CountryBY                                                                  : Беларус
dict_CountryBZ                                                                  : Белиз
dict_CountryBJ                                                                  : Бенин
dict_CountryBM                                                                  : Бермуда
dict_CountryBT                                                                  : Бутан
dict_CountryBO                                                                  : Боливия
dict_CountryBA                                                                  : Босна и Херцеговина
dict_CountryBW                                                                  : Ботсуана
dict_CountryBV                                                                  : Остров Буве
dict_CountryBR                                                                  : Бразилия
dict_CountryIO                                                                  : Британската територия в Индийския океан
dict_CountryBN                                                                  : Бруней Даруссалам
dict_CountryBG                                                                  : България
dict_CountryBF                                                                  : Буркина Фасо
dict_CountryBI                                                                  : Бурунди
dict_CountryKH                                                                  : Камбоджа
dict_CountryCV                                                                  : Кабо Верде
dict_CountryKY                                                                  : Каймановите острови
dict_CountryCF                                                                  : Централноафриканската република
dict_CountryTD                                                                  : Чад
dict_CountryCL                                                                  : Чили
dict_CountryCX                                                                  : Остров Рождество
dict_CountryCC                                                                  : Cocos (Keeling) Islands
dict_CountryCO                                                                  : Колумбия
dict_CountryKM                                                                  : Коморските острови
dict_CountryCG                                                                  : Конго
dict_CountryCD                                                                  : Конго, Демократична република
dict_CountryCK                                                                  : Острови Кук
dict_CountryCR                                                                  : Коста Рика
dict_CountryHR                                                                  : Хърватия
dict_CountryCU                                                                  : Куба
dict_CountryCY                                                                  : Кипър
dict_CountryCZ                                                                  : Чехия
dict_CountryDK                                                                  : Дания
dict_CountryDJ                                                                  : Джибути
dict_CountryDM                                                                  : Доминика
dict_CountryDO                                                                  : Доминиканската република
dict_CountryEC                                                                  : Еквадор
dict_CountryEG                                                                  : Египет
dict_CountrySV                                                                  : Ел Салвадор
dict_CountryGQ                                                                  : Екваториална Гвинея
dict_CountryER                                                                  : Еритрея
dict_CountryEE                                                                  : Естония
dict_CountryET                                                                  : Етиопия
dict_CountryFK                                                                  : Фолкландските острови
dict_CountryFO                                                                  : Фарьорските острови
dict_CountryFJ                                                                  : Фиджи
dict_CountryFI                                                                  : Финландия
dict_CountryGF                                                                  : Френска Гвиана
dict_CountryPF                                                                  : Френска Полинезия
dict_CountryTF                                                                  : Френски южни територии
dict_CountryGM                                                                  : Гамбия
dict_CountryGE                                                                  : Грузия
dict_CountryGH                                                                  : Гана
dict_CountryGI                                                                  : Гибралтар
dict_CountryGR                                                                  : Гърция
dict_CountryGL                                                                  : Гренландия
dict_CountryGD                                                                  : Гренада
dict_CountryGP                                                                  : Гваделупа
dict_CountryGU                                                                  : Гуам
dict_CountryGT                                                                  : Гватемала
dict_CountryGN                                                                  : Гвинея
dict_CountryGW                                                                  : Гвинея-Бисау
dict_CountryGY                                                                  : Гвиана
dict_CountryHT                                                                  : Хаити
dict_CountryHM                                                                  : Хърд и Макдоналд
dict_CountryVA                                                                  : Светия престол (Ватикана)
dict_CountryHN                                                                  : Хондурас
dict_CountryHK                                                                  : Хонконг
dict_CountryIS                                                                  : Icelande
dict_CountryIN                                                                  : Индия
dict_CountryID                                                                  : Индонезия
dict_CountryIR                                                                  : Иран
dict_CountryIQ                                                                  : Ирак
dict_CountryIL                                                                  : Израел
dict_CountryJM                                                                  : Ямайка
dict_CountryJP                                                                  : Япония
dict_CountryJO                                                                  : Йордания
dict_CountryKZ                                                                  : Казахстан
dict_CountryKE                                                                  : Кения
dict_CountryKI                                                                  : Кирибати
dict_CountryKP                                                                  : Северна Корея
dict_CountryKR                                                                  : Южна Корея
dict_CountryKW                                                                  : Кувейт
dict_CountryKG                                                                  : Kyrghyztan
dict_CountryLA                                                                  : Лао
dict_CountryLV                                                                  : Латвия
dict_CountryLB                                                                  : Ливан
dict_CountryLS                                                                  : Лесото
dict_CountryLR                                                                  : Либерия
dict_CountryLY                                                                  : Либийски
dict_CountryLI                                                                  : Лихтенщайн
dict_CountryLT                                                                  : Lituania
dict_CountryLU                                                                  : Люксембург
dict_CountryMO                                                                  : Макао
dict_CountryMK                                                                  : Македония, Бивша югославска
dict_CountryMG                                                                  : Мадагаскар
dict_CountryMW                                                                  : Малави
dict_CountryMY                                                                  : Малайзия
dict_CountryMV                                                                  : Малдивите
dict_CountryML                                                                  : Мали
dict_CountryMT                                                                  : Малта
dict_CountryMH                                                                  : Маршаловите острови
dict_CountryMQ                                                                  : Мартиника
dict_CountryMR                                                                  : Мавритания
dict_CountryMU                                                                  : Мавриций
dict_CountryYT                                                                  : Майот
dict_CountryMX                                                                  : Мексико
dict_CountryFM                                                                  : Микронезия
dict_CountryMD                                                                  : Молдова
dict_CountryMN                                                                  : Монголия
dict_CountryMS                                                                  : Monserrat
dict_CountryMZ                                                                  : Мозамбик
dict_CountryMM                                                                  : Birmania (Мианмар)
dict_CountryNA                                                                  : Намибия
dict_CountryNR                                                                  : Науру
dict_CountryNP                                                                  : Непал
dict_CountryAN                                                                  : Нидерландските Антили
dict_CountryNC                                                                  : Нова Каледония
dict_CountryNZ                                                                  : Нова Зеландия
dict_CountryNI                                                                  : Никарагуа
dict_CountryNE                                                                  : Нигер
dict_CountryNG                                                                  : Нигерия
dict_CountryNU                                                                  : Ниуе
dict_CountryNF                                                                  : Норфолк
dict_CountryMP                                                                  : Северни Мариански острови
dict_CountryNO                                                                  : Норвегия
dict_CountryOM                                                                  : Оман
dict_CountryPK                                                                  : Пакистан
dict_CountryPW                                                                  : Палау
dict_CountryPS                                                                  : Палестинска територия, окупирана
dict_CountryPA                                                                  : Панама
dict_CountryPG                                                                  : Папуа-Нова Гвинея
dict_CountryPY                                                                  : Парагвай
dict_CountryPE                                                                  : Перу
dict_CountryPH                                                                  : Филипини
dict_CountryPN                                                                  : Питкерн острови
dict_CountryPL                                                                  : Полша
dict_CountryPR                                                                  : Пуерто Рико
dict_CountryQA                                                                  : Катар
dict_CountryRE                                                                  : Повторно обединяване
dict_CountryRO                                                                  : Румъния
dict_CountryRW                                                                  : Руанда
dict_CountrySH                                                                  : Света Елена
dict_CountryKN                                                                  : Сейнт Китс и Невис
dict_CountryLC                                                                  : Сейнт Лусия
dict_CountryPM                                                                  : Сен Пиер и Микелон
dict_CountryVC                                                                  : Сейнт Винсент и Гренадини
dict_CountryWS                                                                  : Самоа
dict_CountrySM                                                                  : Сан Марино
dict_CountryST                                                                  : Сао Томе и Принсипи
dict_CountryRS                                                                  : Сърбия
dict_CountrySC                                                                  : Сейшелите
dict_CountrySL                                                                  : Сиера Леоне
dict_CountrySK                                                                  : Словакия
dict_CountrySI                                                                  : Словения
dict_CountrySB                                                                  : Соломоновите острови
dict_CountrySO                                                                  : Сомалия
dict_CountryZA                                                                  : Южна Африка
dict_CountryGS                                                                  : Южна Джорджия и Южни Сандвичеви острови
dict_CountryLK                                                                  : Шри Ланка
dict_CountrySD                                                                  : Судан
dict_CountrySR                                                                  : Суринам
dict_CountrySJ                                                                  : Свалбард и Ян Майен
dict_CountrySZ                                                                  : Свазиленд
dict_CountrySY                                                                  : Сирийски
dict_CountryTW                                                                  : Тайван
dict_CountryTJ                                                                  : Таджикистан
dict_CountryTZ                                                                  : Танзания
dict_CountryTH                                                                  : Тайланд
dict_CountryTL                                                                  : Източен Тимор
dict_CountryTK                                                                  : Токелау
dict_CountryTO                                                                  : Лека индийска двуколка
dict_CountryTT                                                                  : Тринидад и Тобаго
dict_CountryTR                                                                  : Турция
dict_CountryTM                                                                  : Туркменистан
dict_CountryTC                                                                  : Турците и Cailos острови
dict_CountryTV                                                                  : Тувалу
dict_CountryUG                                                                  : Уганда
dict_CountryUA                                                                  : Украйна
dict_CountryAE                                                                  : Обединените арабски емирства
dict_CountryUM                                                                  : САЩ Малки далечни острови
dict_CountryUY                                                                  : Уругвай
dict_CountryUZ                                                                  : Узбекистан
dict_CountryVU                                                                  : Вануату
dict_CountryVE                                                                  : Венецуела
dict_CountryVN                                                                  : Виетнам
dict_CountryVG                                                                  : Британски Вирджински острови
dict_CountryVI                                                                  : Вирджински острови, САЩ
dict_CountryWF                                                                  : Уолис и Футуна
dict_CountryEH                                                                  : Западна Сахара
dict_CountryYE                                                                  : Йемен
dict_CountryZM                                                                  : Замбия
dict_CountryZW                                                                  : Зимбабве
dict_CountryGG                                                                  : Вълнена фланела
dict_CountryIM                                                                  : Остров Ман
dict_CountryJE                                                                  : Жарсе
dict_CountryME                                                                  : Черна гора
dict_CountryBL                                                                  : Сен Бартелеми
dict_CountryMF                                                                  : Saint Martin
dict_CivilityMME                                                                : Госпожа
dict_CivilityMR                                                                 : Господин
dict_CivilityMLE                                                                : Госпожица
dict_CivilityMTRE                                                               : Майстор
dict_CivilityDR                                                                 : Лекар
dict_Currencyeuros                                                              : Евро
dict_CurrencyAUD                                                                : АС долара
dict_CurrencySingAUD                                                            : АС Dollar
dict_CurrencyCAD                                                                : CAN долара
dict_CurrencySingCAD                                                            : CAN Dollar
dict_CurrencyCHF                                                                : Швейцарски франкове
dict_CurrencySingCHF                                                            : Швейцарски франк
dict_CurrencyEUR                                                                : Евро
dict_CurrencySingEUR                                                            : Евро
dict_CurrencyFRF                                                                : Френски франкове
dict_CurrencySingFRF                                                            : Френския франк
dict_CurrencyGBP                                                                : GB лири
dict_CurrencySingGBP                                                            : GB Pound
dict_CurrencyINR                                                                : Индийски рупии
dict_CurrencySingINR                                                            : Индийска рупия
dict_CurrencyMAD                                                                : Дирхам
dict_CurrencySingMAD                                                            : Дирхам
dict_CurrencyMGA                                                                : Ariary
dict_CurrencySingMGA                                                            : Ariary
dict_CurrencyMUR                                                                : Мавриций рупии
dict_CurrencySingMUR                                                            : Мавриций рупии
dict_CurrencyNOK                                                                : Норвежките Кронес
dict_CurrencySingNOK                                                            : Норвежка крона
dict_CurrencyTND                                                                : Тунизийски динара
dict_CurrencySingTND                                                            : Тунизийски динар
dict_CurrencyUSD                                                                : Щатски долари
dict_CurrencySingUSD                                                            : САЩ долар
dict_CurrencyUAH                                                                : Хривня
dict_CurrencySingUAH                                                            : Хривня
dict_CurrencyXAF                                                                : CFA франка BEAC
dict_CurrencySingXAF                                                            : CFA Franc BEAC
dict_CurrencyXOF                                                                : CFA франкове BCEAO
dict_CurrencySingXOF                                                            : CFA франк BCEAO
dict_CurrencyXPF                                                                : ОПОР франкове
dict_CurrencySingXPF                                                            : CFP франк
dict_CurrencyCentSingEUR                                                        : цент
dict_CurrencyThousandthSingTND                                                  : хиляден
dict_CurrencySUR                                                                : Roubles
dict_CurrencySingSUR                                                            : Rouble
dict_CurrencyTRL                                                                : Livres turques
dict_CurrencySingTRL                                                            : Livre turque
dict_DemandReasonTypeSRC_INTE                                                   : Интернет
dict_DemandReasonTypeSRC_CAMP_MAIL                                              : Mailing кампания
dict_DemandReasonTypeSRC_CAMP_EMAIL                                             : Електронната поща кампания
dict_DemandReasonTypeSRC_CAMP_PHO                                               : Телефон кампания
dict_DemandReasonTypeSRC_CAMP_FAX                                               : Факс кампания
dict_DemandReasonTypeSRC_COMM                                                   : Търговския контакт
dict_DemandReasonTypeSRC_SHOP                                                   : Магазин за контакт
dict_DemandReasonTypeSRC_WOM                                                    : Дума на устата
dict_DemandReasonTypeSRC_PARTNER                                                : Партньор
dict_DemandReasonTypeSRC_EMPLOYEE                                               : Служителите
dict_DemandReasonTypeSRC_SPONSORING                                             : Спонсорство
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
errors_MenuManager                                                              : Меню мениджър
errors_Error                                                                    : Грешка
errors_Errors                                                                   : Грешки
errors_ErrorBadEMail                                                            : EMail %s не е
errors_ErrorBadUrl                                                              : Адреса %s не е
errors_ErrorRecordNotFound                                                      : Запишете не е намерен.
errors_ErrorFailToCopyFile                                                      : Не успя да копира файла <b>&quot;%s&quot;</b> в <b>&quot;%s&quot;.</b>
errors_ErrorFailToRenameFile                                                    : Неуспешно преименуване на файлове <b>&quot;%s&quot;</b> в <b>&quot;%s&quot;.</b>
errors_ErrorFailToDeleteFile                                                    : Неуспех при премахването на файл <b>&quot;%s&quot;.</b>
errors_ErrorFailToCreateFile                                                    : Грешка при създаване на файл <b>&quot;%s&quot;.</b>
errors_ErrorFailToRenameDir                                                     : Неуспешно да преименувате директория <b>&quot;%s&quot;</b> в <b>&quot;%s&quot;.</b>
errors_ErrorFailToCreateDir                                                     : Неуспешно създаване на директория <b>&quot;%s&quot;.</b>
errors_ErrorFailToDeleteDir                                                     : Грешка при изтриване на директория <b>&quot;%s&quot;.</b>
errors_ErrorFailedToDeleteJoinedFiles                                           : Не мога да изтрия околната среда, защото има някои присъединиха файлове. Премахване на се присъедини файлове първото.
errors_ErrorThisContactIsAlreadyDefinedAsThisType                               : Този контакт е вече определен контакт за този тип.
errors_ErrorCashAccountAcceptsOnlyCashMoney                                     : Тази банкова сметка е разплащателна сметка, така че приема плащания пари само от тип.
errors_ErrorFromToAccountsMustDiffers                                           : Източника и целите на банкови сметки трябва да бъде различен.
errors_ErrorBadThirdPartyName                                                   : Неправилна стойност за името на трета страна
errors_ErrorBadCustomerCodeSyntax                                               : Bad синтаксис за код на клиента
errors_ErrorCustomerCodeRequired                                                : Клиентите изисква код
errors_ErrorCustomerCodeAlreadyUsed                                             : Клиентът код вече се използва
errors_ErrorPrefixRequired                                                      : Префикс изисква
errors_ErrorUrlNotValid                                                         : Адресът на интернет страницата е неправилно
errors_ErrorBadSupplierCodeSyntax                                               : Bad синтаксис за код на доставчика
errors_ErrorSupplierCodeRequired                                                : Доставчик изисква код
errors_ErrorSupplierCodeAlreadyUsed                                             : Доставчик код вече се използва
errors_ErrorBadParameters                                                       : Лошите параметри
errors_ErrorBadValueForParameter                                                : Грешна стойност &quot;%s&quot; за параметрите неправилни &quot;%s&quot;
errors_ErrorBadImageFormat                                                      : Image файла не е поддържан формат
errors_ErrorBadDateFormat                                                       : &quot;%s&quot; Стойност има грешна дата формат
errors_ErrorFailedToWriteInDir                                                  : Неуспех при запис в директорията %s
errors_ErrorFoundBadEmailInFile                                                 : Намерени неправилен синтаксис имейл за %s линии във файла (%s например съответствие с имейл = %s)
errors_ErrorUserCannotBeDelete                                                  : Потребителят не може да бъде изтрита. Може би тя е свързана върху лица Speedealing.
errors_ErrorFieldsRequired                                                      : Някои задължителни полета не са запълнени.
errors_ErrorFailedToCreateDir                                                   : Неуспешно създаване на директория. Уверете се, че уеб сървър потребител има разрешение да пишат в Speedealing документи. Ако параметър <b>safe_mode</b> е разрешен в тази PHP, проверете дали Speedealing PHP файлове притежава за потребителя на уеб сървъра (или група).
errors_ErrorNoMailDefinedForThisUser                                            : Не поща, определена за този потребител
errors_ErrorFeatureNeedJavascript                                               : Тази функция трябва ДжаваСкрипт да се активира, за да работят. Променете тази настройка - дисплей.
errors_ErrorTopMenuMustHaveAParentWithId0                                       : Менюто на &quot;Топ&quot; тип не може да има меню майка. Поставете 0 в майка меню или изберете меню от типа &quot;ляво&quot;.
errors_ErrorLeftMenuMustHaveAParentId                                           : Менюто на &quot;левицата&quot; тип трябва да имат родителски идентификатор.
errors_ErrorFileNotFound                                                        : Файлът не <b>%s</b> намерена (Bad път, грешни права или отказан достъп от PHP openbasedir или safe_mode параметър)
errors_ErrorDirNotFound                                                         : Директория <b>%s</b> не е намерен (Bad път, грешни права или отказан достъп от PHP openbasedir или safe_mode параметър)
errors_ErrorFunctionNotAvailableInPHP                                           : Функция <b>%s</b> се изисква за тази функция, но не е на разположение в тази версия / настройка на PHP.
errors_ErrorDirAlreadyExists                                                    : Директория с това име вече съществува.
errors_ErrorFileAlreadyExists                                                   : Файл с това име вече съществува.
errors_ErrorPartialFile                                                         : Файла не е получил изцяло от сървъра.
errors_ErrorNoTmpDir                                                            : Временно за директно %s не съществува.
errors_ErrorUploadBlockedByAddon                                                : Качи блокиран от PHP / Apache плъгин.
errors_ErrorFileSizeTooLarge                                                    : Размерът на файла е твърде голям.
errors_ErrorSizeTooLongForIntType                                               : Размер твърде дълго за Вътрешна (%s цифри максимум)
errors_ErrorSizeTooLongForVarcharType                                           : Размер твърде дълго за низ тип (%s символа максимум)
errors_ErrorFieldCanNotContainSpecialCharacters                                 : Полеви <b>%s,</b> не трябва да съдържа специални знаци.
errors_ErrorNoAccountancyModuleLoaded                                           : Не е счетоводство модул активира
errors_ErrorExportDuplicateProfil                                               : Това Profil име вече съществува за този износ набор.
errors_ErrorLDAPSetupNotComplete                                                : Speedealing LDAP съвпадение не е пълна.
errors_ErrorLDAPMakeManualTest                                                  : . LDIF файл е генериран в директорията %s. Опитайте се да го заредите ръчно от командния ред, за да има повече информация за грешките,.
errors_ErrorCantSaveADoneUserWithZeroPercentage                                 : Не може да се запази действието с &quot;статут не е започнал&quot;, ако поле &quot;, направено от&quot; е пълен.
errors_ErrorRefAlreadyExists                                                    : Ref използван за създаване вече съществува.
errors_ErrorPleaseTypeBankTransactionReportName                                 : Моля, въведете името на банката, получаване, когато се отчита сделката (Format YYYYMM или ГГГГММДД)
errors_ErrorRecordHasChildren                                                   : Грешка при изтриване на записи, тъй като тя има някои детински.
errors_ErrorModuleRequireJavascript                                             : Javascript не трябва да бъдат хората с увреждания да имат тази функция. За да включите / изключите Javascript, отидете в менюто Начало-> Setup-> Display.
errors_ErrorPasswordsMustMatch                                                  : Двете машинописни пароли трябва да съвпадат помежду си
errors_ErrorContactEMail                                                        : Техническа грешка. Моля, свържете се с администратора след имейл <b>%s</b> EN предоставят на <b>%s</b> код на грешка в съобщението си, или още по-добре чрез добавяне на екран копие на тази страница.
errors_ErrorWrongValueForField                                                  : Грешна стойност за номер на полето <b>%s (&quot;%s&quot;</b> стойността не съответства на регулярни изрази върховенството <b>%s)</b>
errors_ErrorFieldValueNotIn                                                     : Грешна стойност за <b>%s</b> номер на полето (стойност <b>&quot;%s&quot;</b> не е стойност в полеви <b>%s</b> трапезни <b>%s)</b>
errors_ErrorFieldRefNotIn                                                       : Грешна стойност за номер на полето <b>%s (&quot;%s</b> стойност не е <b>%s</b> съществуващия код)
errors_ErrorsOnXLines                                                           : Грешки на <b>%s</b> изходни линии
errors_ErrorFileIsInfectedWithAVirus                                            : Антивирусна програма не е в състояние да валидира файла (файл може да бъде заразен с вирус)
errors_ErrorSpecialCharNotAllowedForField                                       : Специални знаци не са разрешени за полето &quot;%s&quot;
errors_ErrorDatabaseParameterWrong                                              : <b>&quot;%s&quot;</b> параметър настройка на базата данни е на стойност не са съвместими, за да използвате Speedealing (трябва да има <b>&quot;%s&quot;</b> стойност).
errors_ErrorNumRefModel                                                         : Позоваване съществува в база данни (%s) и не е съвместим с това правило за номериране. Премахване на запис или преименува препратка към активира този модул.
errors_ErrorQtyTooLowForThisSupplier                                            : Количество твърде ниска за този доставчик или няма цена, определена за този продукт на този доставчик
errors_ErrorModuleSetupNotComplete                                              : Настройка на модула изглежда да uncomplete. Отидете на Setup - Модули да завърши.
errors_ErrorBadMask                                                             : Грешка на маска
errors_ErrorBadMaskFailedToLocatePosOfSequence                                  : Грешка, маска без поредния номер
errors_ErrorBadMaskBadRazMonth                                                  : Грешка, неправилна стойност за нулиране
errors_ErrorSelectAtLeastOne                                                    : Грешка. Изберете поне един запис.
errors_ErrorProductWithRefNotExist                                              : Каталог с <i>&quot;%s&quot;</i> модели не съществуват
errors_ErrorDeleteNotPossibleLineIsConsolidated                                 : Ненужното не е възможно, тъй като записът е свързана с банкова transation, че е conciliated
errors_ErrorProdIdAlreadyExist                                                  : %s се възлага на друга трета
errors_ErrorFailedToSendPassword                                                : Не може да се изпрати парола
errors_ErrorFailedToLoadRSSFile                                                 : Не успее да получи RSS Feed. Опитайте се да добавите постоянно MAIN_SIMPLEXMLLOAD_DEBUG ако съобщения за грешки не предоставя достатъчно информация.
errors_ErrorPasswordDiffers                                                     : Паролите се различава, моля да ги въведете отново.
errors_ErrorForbidden                                                           : Достъпът е отказан. <br> Опитвате се да отворите към страница, или функция, без да е в заверено сесия или, че не е позволено да си потребител.
errors_ErrorForbidden2                                                          : Разрешение за вход може да бъде определена от вашия администратор Speedealing от менюто %s-> %s.
errors_ErrorForbidden3                                                          : Изглежда, че Speedealing не се използва чрез заверено сесия. Обърнете внимание на документация за настройка Speedealing за знаят как да управляват удостоверявания (Htaccess, mod_auth или други ...).
errors_ErrorNoImagickReadimage                                                  : Клас Imagick не се намира в тази PHP. Без визуализация могат да бъдат на разположение. Администраторите могат да деактивирате тази раздела от менюто Setup - Display.
errors_ErrorRecordAlreadyExists                                                 : Запис вече съществува
errors_ErrorCantReadFile                                                        : Не може да се прочете файла &quot;%s&quot;
errors_ErrorCantReadDir                                                         : Неуспех при четенето на &quot;%s&quot; директорията
errors_ErrorFailedToFindEntity                                                  : Не може да се чете &quot;%s&quot; Околна среда
errors_ErrorBadLoginPassword                                                    : Неправилна стойност за потребителско име или парола
errors_ErrorLoginDisabled                                                       : Вашият акаунт е забранено
errors_ErrorFailedToRunExternalCommand                                          : Не може да се работи на външна команда. Уверете се, тя е достъпна и изпълнима от PHP на вашия сървър. Ако PHP <b>Safe Mode</b> е активирана, тази команда е вътре в директория, определена от параметър <b>safe_mode_exec_dir.</b>
errors_ErrorFailedToChangePassword                                              : Неуспешно да смените паролата
errors_ErrorLoginDoesNotExists                                                  : Потребителят с вход <b>%s</b> не може да бъде намерен.
errors_ErrorLoginHasNoEmail                                                     : Този потребител няма имейл адрес. Процес прекратено.
errors_ErrorBadValueForCode                                                     : Неправилна стойност за код за сигурност. Опитайте отново с нова стойност ...
errors_ErrorBothFieldCantBeNegative                                             : Полетата %s и %s не може да бъде едновременно отрицателен
errors_ErrorWebServerUserHasNotPermission                                       : Потребителски акаунт <b>%s</b> използват за извършване на уеб сървър не разполага с разрешение за това
errors_ErrorNoActivatedBarcode                                                  : Не е тип баркод активира
errors_ErrUnzipFails                                                            : Неуспех да разархивирате %s с ZipArchive
errors_ErrNoZipEngine                                                           : Никой двигател да разархивирате %s файла в тази PHP
errors_ErrorFileMustBeASpeedealingPackage                                       : The file %s must be a Speedealing zip package
errors_ErrorFileRequired                                                        : Отнема файла пакет Speedealing
errors_ErrorPhpCurlNotInstalled                                                 : PHP навийте не е инсталиран, това е от съществено значение, за да разговаря с Paypal
errors_ErrorFailedToAddToMailmanList                                            : Неуспешно добавяне на запис на пощальона списък или база СПИП
errors_ErrorNewVaueCantMatchOldValue                                            : Новата стойност не може да бъде равна на стария
errors_ErrorDuplicateTrigger                                                    : Un fichier trigger de classe '<b>%s</b>' est présent plusieurs fois. Supprimer le doublon du répertoire '<b>%s</b>'.
errors_SESSIONEXPIRE                                                            : La session est expirée
errors_WarningMandatorySetupNotComplete                                         : Задължителни параметри на настройката все още не са определени
errors_WarningSafeModeOnCheckExecDir                                            : Внимание, PHP опция <b>защитният режим</b> е включен, така че командата трябва да бъдат съхранени в директория, декларирани с параметър PHP <b>safe_mode_exec_dir.</b>
errors_WarningAllowUrlFopenMustBeOn                                             : Параметър <b>allow_url_fopen</b> трябва да бъде поставен <b>в</b> Filer <b>php.ini</b> за това, че този модул да работи напълно. Трябва да промените този файл ръчно.
errors_WarningBuildScriptNotRunned                                              : Сценарий <b>%s</b> още не е се затича към изграждане на графики, или няма данни да се покаже.
errors_WarningBookmarkAlreadyExists                                             : Отметка с настоящия дял, или на тази цел (URL) вече съществува.
errors_WarningPassIsEmpty                                                       : Внимание, парола за базата данни е празен. Това е дупка в сигурността. Вие трябва да добавите парола за достъп до вашата база данни и промените conf.php файл, за да се отрази това.
errors_WarningConfFileMustBeReadOnly                                            : Внимание, конфигурационния файл <b>(htdocs / CONF / conf.php)</b> може да бъде заменена от уеб сървъра. Това е сериозна дупка в сигурността. Промяна на разрешения на файл, за да бъде в режим само за четене на потребителя на операционната система, използвани от уеб сървър. Ако използвате Windows и FAT формат за вашия диск, вие трябва да знаете, че тази файлова система не позволява да добавите разрешения на файл, така че не може да бъде напълно безопасен.
errors_WarningsOnXLines                                                         : Предупреждения върху <b>%s</b> линии източници
errors_WarningNoDocumentModelActivated                                          : Няма модел, за генерирането на документацията, е бил активиран. Модел ще бъде избра по подразбиране, докато не се провери настройката на модула.
errors_WarningLockFileDoesNotExists                                             : Внимание, след Настройката е приключена, трябва да изключите инсталиране / мигрират инструменти чрез добавяне на файл <b>install.lock</b> в директорията <b>%s.</b> Липсва този файл е дупка в сигурността.
errors_WarningUntilDirRemoved                                                   : Всички предупреждения относно защитата (видими само от администратори) ще остане активен, докато уязвимост е (или се добавя, че постоянното MAIN_REMOVE_INSTALL_WARNING в Setup-> настройка).
errors_WarningCloseAlways                                                       : Внимание, затваряне се прави, дори ако сумата се различава между източника и целеви елементи. Активирайте тази функция с повишено внимание.
errors_ErrorEnterYourLogin                                                      : Identifiant vide
errors_ErrorEnterYourPassword                                                   : Mot de passe vide
mails_Mailing                                                                   : Електронната поща
mails_EMailing                                                                  : Електронната поща
mails_Mailings                                                                  : EMailings
mails_EMailings                                                                 : EMailings
mails_AllEMailings                                                              : Всички eMailings
mails_MailCard                                                                  : Електронната поща карта
mails_MailTargets                                                               : Цели
mails_MailRecipients                                                            : Получатели
mails_MailRecipient                                                             : Получател
mails_MailTitle                                                                 : Описание
mails_MailFrom                                                                  : Подател
mails_MailErrorsTo                                                              : Грешки, за да
mails_MailReply                                                                 : Отговор на
mails_MailTo                                                                    : Приемник (а)
mails_MailCC                                                                    : Копиране в
mails_MailCCC                                                                   : Кеширана копие до
mails_MailTopic                                                                 : EMail тема
mails_MailText                                                                  : Съобщение
mails_MailFile                                                                  : Прикачени файлове
mails_MailMessage                                                               : EMail тялото
mails_ShowEMailing                                                              : Покажи електронната поща
mails_ListOfEMailings                                                           : Списък на emailings
mails_NewMailing                                                                : Нови електронната поща
mails_EditMailing                                                               : Редактиране на електронната поща
mails_ResetMailing                                                              : Преизпрати електронната поща
mails_DeleteMailing                                                             : Изтриване на електронната поща
mails_DeleteAMailing                                                            : Изтриване на електронната поща
mails_PreviewMailing                                                            : Преглед на електронната поща
mails_PrepareMailing                                                            : Подгответе електронната поща
mails_CreateMailing                                                             : Създаване на електронна поща
mails_MailingDesc                                                               : Тази страница ви позволява да изпращате emailings на група от хора.
mails_MailingResult                                                             : Изпращане на имейли резултат
mails_TestMailing                                                               : Тест имейл
mails_ValidMailing                                                              : Валидни електронната поща
mails_ApproveMailing                                                            : Одобряване на електронната поща
mails_MailingStatusDraft                                                        : Проект
mails_MailingStatusValidated                                                    : Утвърден
mails_MailingStatusApproved                                                     : Одобрен
mails_MailingStatusSent                                                         : Изпратени
mails_MailingStatusSentPartialy                                                 : Изпратени partialy
mails_MailingStatusSentCompletely                                               : Изпратени напълно
mails_MailingStatusError                                                        : Грешка
mails_MailingStatusNotSent                                                      : Не е изпратено
mails_MailSuccessfulySent                                                       : Email изпратено успешно (от %s да %s)
mails_MailingSuccessfullyValidated                                              : Имейл валидирани
mails_MailUnsubcribe                                                            : Отписване
mails_Unsuscribe                                                                : Отписване
mails_MailingStatusNotContact                                                   : Не се свържете с повече
mails_ErrorMailRecipientIsEmpty                                                 : Email получателят е празна
mails_WarningNoEMailsAdded                                                      : Няма нови имейл, за да добавите към списъка на получателя.
mails_ConfirmValidMailing                                                       : Сигурен ли сте, че искате да проверите това електронната поща?
mails_ConfirmResetMailing                                                       : Внимание, reinitializing пращане <b>%s,</b> позволяват да се направи масово изпращане на този имейл друг път. Сигурен ли си, че ти това е, което искате да направите?
mails_ConfirmDeleteMailing                                                      : Сигурен ли сте, че искате да изтриете тази emailling?
mails_NbOfRecipients                                                            : Брой на получателите
mails_NbOfUniqueEMails                                                          : Nb уникални имейли
mails_NbOfEMails                                                                : Nb имейли
mails_TotalNbOfDistinctRecipients                                               : Брой на отделни получатели
mails_NoTargetYet                                                               : Не са определени получатели (Отидете на &quot;Ползвателят ')
mails_AddRecipients                                                             : Добавяне на получатели
mails_RemoveRecipient                                                           : Махни получателя
mails_CommonSubstitutions                                                       : Общи замествания
mails_YouCanAddYourOwnPredefindedListHere                                       : За да създадете имейл селектор модул, вижте htdocs / ядро ​​/ модули / съобщения / README.
mails_EMailTestSubstitutionReplacedByGenericValues                              : При използване на тестов режим, замествания променливи се заменят с общи ценности
mails_MailingAddFile                                                            : Прикрепете този файл
mails_NoAttachedFiles                                                           : Не прикачени файлове
mails_BadEMail                                                                  : Неправилна стойност за електронна поща
mails_CloneEMailing                                                             : Clone електронната поща
mails_ConfirmCloneEMailing                                                      : Сигурен ли сте, че искате да клонирате този електронната поща?
mails_CloneContent                                                              : Clone съобщение
mails_CloneReceivers                                                            : Cloner получателите
mails_DateLastSend                                                              : Дата на последното изпращане
mails_DateSending                                                               : Дата на изпращане
mails_SentTo                                                                    : Изпратено до <b>%s</b>
mails_MailingStatusRead                                                         : Чета
mails_CheckRead                                                                 : Обратна разписка
mails_YourMailUnsubcribeOK                                                      : От пощенския списък на <b>%s</b> имейл е правилно unsubcribe
mails_MailtoEMail                                                               : Хипер-връзка на приятел
mails_ActivateCheckRead                                                         : Оставя се да се използва за четене тракер получаване и връзката unsubcribe
mails_ActivateCheckReadKey                                                      : Key използване за криптиране на използването на URL адрес за обратна разписка и функция unsubcribe
mails_MailingModuleDescContactCompanies                                         : Контакти на всички трети лица (клиенти, перспектива, доставчици, ...)
mails_MailingModuleDescSpeedealingUsers                                         : Speedealing users
mails_MailingModuleDescFundationMembers                                         : Фондация членове с имейли
mails_MailingModuleDescEmailsFromFile                                           : Имейли от текстов файл (имейл Име, фамилия;;)
mails_MailingModuleDescEmailsFromUser                                           : Имейли от приноса на потребителите (имейл Име, фамилия;;)
mails_MailingModuleDescContactsCategories                                       : Трети страни (по категории)
mails_MailingModuleDescSpeedealingContractsLinesExpired                         : Third parties with expired contract's lines
mails_MailingModuleDescContactsByCompanyCategory                                : Контакти с трети страни (от трети страни категория)
mails_MailingModuleDescMembersCategories                                        : Фондация членове (по категории)
mails_MailingModuleDescContactsByFunction                                       : Контакти на трети лица (от позицията / функция)
mails_LineInFile                                                                : Line %s във файла
mails_RecipientSelectionModules                                                 : Определени искания за подбор на получателя
mails_MailSelectedRecipients                                                    : Избрани получателите
mails_MailingArea                                                               : EMailings област
mails_LastMailings                                                              : Последно emailings %s
mails_TargetsStatistics                                                         : Насочена е към статистиката
mails_NbOfCompaniesContacts                                                     : Уникални контакти на фирми
mails_MailNoChangePossible                                                      : Получатели на за валидирани електронната поща не може да бъде променена
mails_SearchAMailing                                                            : Търсене пощенски
mails_SendMailing                                                               : Изпрати имейл
mails_SendMail                                                                  : Изпращане на имейл
mails_SentBy                                                                    : Изпратено от
mails_MailingNeedCommand                                                        : От съображения за сигурност, изпращане на електронната поща трябва да се извършва от командния ред. Посъветвайте се с вашия администратор, за да стартирате следната команда, за да изпратите електронна поща до всички получатели:
mails_MailingNeedCommand2                                                       : Все пак можете да ги изпратите онлайн чрез добавяне на параметър MAILING_LIMIT_SENDBYWEB със стойност на максимален брой на имейлите, които искате да изпратите от сесията. За това, отидете на дома - Setup - Други.
mails_ConfirmSendingEmailing                                                    : Сигурен ли сте, че искате да изпратите електронна поща без командния ред и от уеб режим?
mails_LimitSendingEmailing                                                      : На линия изпращане на emailings са ограничени за сигурност и таймаут причини да <b>%s</b> получатели чрез изпращане на сесията.
mails_TargetsReset                                                              : Изчисти списъка
mails_ToClearAllRecipientsClickHere                                             : Щракнете тук, за да изчистите списъка на получателите за този електронната поща
mails_ToAddRecipientsChooseHere                                                 : Добавяне на получатели, като изберете от списъците
mails_NbOfEMailingsReceived                                                     : Масови emailings
mails_IdRecord                                                                  : ID рекорд
mails_DeliveryReceipt                                                           : Обратна разписка
mails_YouCanUseCommaSeparatorForSeveralRecipients                               : Можете да използвате разделител <b>запетая, за</b> да се уточнят няколко получатели.
mails_TagCheckMail                                                              : Tracker поща отвори
mails_TagUnsubscribe                                                            : Отписване връзка
mails_TagSignature                                                              : Подпис изпращане на потребителя
mails_TagMailtoEmail                                                            : Имейл на получателя
mails_Notifications                                                             : Известия
mails_NoNotificationsWillBeSent                                                 : Не са планирани за това събитие и компания известия по имейл
mails_ANotificationsWillBeSent                                                  : 1 уведомление, ще се изпращат по електронна поща
mails_SomeNotificationsWillBeSent                                               : %s нотификации ще бъдат изпратени по електронна поща
mails_AddNewNotification                                                        : Активиране на ново искане за уведомяване имейл
mails_ListOfActiveNotifications                                                 : Списък на всички активни заявки за уведомяване имейл
mails_ListOfNotificationsDone                                                   : Списък на всички имейли, изпратени уведомления
main_DIRECTION                                                                  : ltr
main_SeparatorDecimal                                                           : .
main_SeparatorThousand                                                          : ,
main_date                                                                       : [object Object]
main_FormatDateShort                                                            : %d.%m.%Y
main_FormatHourShort                                                            : %H:%M
main_FormatHourShortDuration                                                    : %H:%M
main_FormatDateTextShort                                                        : %d %b %Y
main_FormatDateText                                                             : %d %B %Y
main_FormatDateHourShort                                                        : %d.%m.%Y %H:%M
main_FormatDateHourTextShort                                                    : %d %b %Y, %H:%M
main_FormatDateHourText                                                         : %d %B %Y, %H:%M
main_DatabaseConnection                                                         : Връзката с базата от данни
main_NoTranslation                                                              : Без превод
main_NoRecordFound                                                              : Aucun enregistrement trouvé
main_NoError                                                                    : Не грешка
main_Error                                                                      : Грешка
main_ErrorFieldRequired                                                         : Се изисква поле &quot;%s&quot;
main_ErrorFieldFormat                                                           : &quot;Поле %s има лоша стойност
main_ErrorFileDoesNotExists                                                     : %s Файлът не съществува
main_ErrorFailedToOpenFile                                                      : Неуспех при отварянето на файлове %s
main_ErrorCanNotCreateDir                                                       : Не може да се създаде папка %s
main_ErrorCanNotReadDir                                                         : Не можеш да прочетеш реж. %s
main_ErrorConstantNotDefined                                                    : Параметър не %s зададено
main_ErrorUnknown                                                               : Непозната грешка
main_ErrorSQL                                                                   : SQL грешка
main_ErrorLogoFileNotFound                                                      : Лого на файлове &quot;%s&quot; не бе открит
main_ErrorGoToGlobalSetup                                                       : &quot;Фирма / настройка на Фондация&quot; За да се определи това
main_ErrorGoToModuleSetup                                                       : Към модул за настройка, за да поправя това
main_ErrorFailedToSendMail                                                      : Неуспешно изпращане на поща (подател = %s, приемник = %s)
main_ErrorAttachedFilesDisabled                                                 : Файл закрепване е забранено на този сървър
main_ErrorFileNotUploaded                                                       : Файлът не беше качен. Уверете се, че размерът им да не надвишава максимално допустимия, че е на разположение свободно пространство на диск и че няма вече има файл със същото име в тази директория.
main_ErrorInternalErrorDetected                                                 : Грешка открити
main_ErrorNoRequestRan                                                          : Не е искане завтече
main_ErrorWrongHostParameter                                                    : Грешен хост параметър
main_ErrorYourCountryIsNotDefined                                               : Вашата страна не е определена. Към началната-Setup редактирате и публикувате отново формата.
main_ErrorRecordIsUsedByChild                                                   : Неуспешно да изтриете този запис. Този запис се използва от най-малко едно дете записи.
main_ErrorWrongValue                                                            : Грешна стойност
main_ErrorWrongValueForParameterX                                               : Грешна стойност за параметър %s
main_ErrorNoRequestInError                                                      : Няма получена молба по погрешка
main_ErrorServiceUnavailableTryLater                                            : Услугата не е наличен за момента. Опитайте отново по-късно.
main_ErrorDuplicateField                                                        : Дублирана стойност в уникална област
main_ErrorSomeErrorWereFoundRollbackIsDone                                      : Някои бяха открити грешки. Ние намаление на цените промени.
main_ErrorConfigParameterNotDefined                                             : Параметър <b>%s</b> не е дефиниран вътре в <b>conf.php</b> Speedealing конфигурационния файл.
main_ErrorCantLoadUserFromSpeedealingDatabase                                   : Failed to find user <b>%s</b> in Speedealing database.
main_ErrorNoVATRateDefinedForSellerCountry                                      : Грешка, без ДДС ставки, определени за &quot;%s&quot; страна.
main_ErrorNoSocialContributionForSellerCountry                                  : Грешка, не е социален тип участие, определено за &quot;%s&quot; страна.
main_ErrorFailedToSaveFile                                                      : Грешка, не успя да спаси файл.
main_ErrorOnlyPngJpgSupported                                                   : Грешка, само PNG и JPG формат на изображението файл се поддържат.
main_ErrorImageFormatNotSupported                                               : Вашият PHP не поддържа функции за конвертиране на изображения от този формат.
main_SeeAlso                                                                    : Вижте също %s
main_BackgroundColorByDefault                                                   : Подразбиращ се цвят, фон
main_FileWasNotUploaded                                                         : Файлът е избран за закрепване, но все още не е качен. Кликнете върху &quot;Прикачи файл&quot; за това.
main_NbOfEntries                                                                : Nb на записите
main_GoToWikiHelpPage                                                           : Прочетете онлайн помощ се нуждаят от достъп до интернет
main_GoToHelpPage                                                               : Прочетете Помощ
main_RecordSaved                                                                : Запис спаси
main_LevelOfFeature                                                             : Ниво на функции
main_NotDefined                                                                 : Не е определена
main_DefinedAndHasThisValue                                                     : Определя се и стойността на
main_IsNotDefined                                                               : неопределен
main_SpeedealingInHttpAuthenticationSoPasswordUseless                           : Speedealing authentication mode is setup to <b>%s</b> in configuration file <b>conf.php</b>.<br>This means that password database is extern to Speedealing, so changing this field may have no effects.
main_Administrator                                                              : Администратор
main_Undefined                                                                  : Неопределен
main_PasswordForgotten                                                          : Забравена парола?
main_SeeAbove                                                                   : Виж по-горе
main_HomeArea                                                                   : Начало площ
main_LastConnexion                                                              : Последно връзка
main_PreviousConnexion                                                          : Предишна връзка
main_ConnectedOnMultiCompany                                                    : Свързан върху околната среда
main_ConnectedSince                                                             : Свързан тъй като
main_AuthenticationMode                                                         : Удостоверяването на режим
main_RequestedUrl                                                               : Запитаната Адреса
main_DatabaseTypeManager                                                        : Мениджъра на базата данни тип
main_RequestLastAccess                                                          : Искане за миналата достъп до база данни
main_RequestLastAccessInError                                                   : Искане за последния достъп до бази данни по погрешка
main_ReturnCodeLastAccessInError                                                : Връщане код за последния достъп до бази данни по погрешка
main_InformationLastAccessInError                                               : Информация за миналата достъп до бази данни по погрешка
main_SpeedealingHasDetectedError                                                : Speedealing has detected a technical error
main_InformationToHelpDiagnose                                                  : Това е информация, която може да помогне за диагностика
main_MoreInformation                                                            : Повече информация
main_NotePublic                                                                 : Забележка (публично)
main_NotePrivate                                                                : Забележка (частен)
main_PrecisionUnitIsLimitedToXDecimals                                          : Да се ограничи точност на единичните цени за <b>%s</b> знака след десетичната запетая speedealing е настройка.
main_DoTest                                                                     : Тест
main_ToFilter                                                                   : Филтър
main_WarningYouHaveAtLeastOneTaskLate                                           : Внимание, имате поне един елемент, който е превишил толерантност закъснение.
main_yes                                                                        : да
main_Yes                                                                        : Да
main_no                                                                         : не
main_No                                                                         : Не
main_All                                                                        : Всички
main_Home                                                                       : Дом
main_Help                                                                       : Помощ
main_OnlineHelp                                                                 : Онлайн помощ
main_PageWiki                                                                   : Wiki страница
main_Always                                                                     : Винаги
main_Never                                                                      : Никога
main_Under                                                                      : под
main_Period                                                                     : Период
main_PeriodEndDate                                                              : Крайна дата за период
main_Activate                                                                   : Активирайте
main_Activated                                                                  : Активиран
main_Closed                                                                     : Затворен
main_Close                                                                      : Близо
main_Closed2                                                                    : Затворен
main_Enabled                                                                    : Enabled
main_Disable                                                                    : Правя неспособен
main_Disabled                                                                   : Забранен
main_Add                                                                        : Добави
main_AddLink                                                                    : Добавяне на връзка
main_Update                                                                     : Актуализация
main_AddActionToDo                                                              : Добавяне на събитие, за да се направи
main_AddActionDone                                                              : Добавяне на събитие направи
main_Close2                                                                     : Близо
main_Confirm                                                                    : Потвърждавам
main_ConfirmSendCardByMail                                                      : Наистина ли искате да изпратите съдържанието на тази карта по пощата да <b>%s?</b>
main_Delete                                                                     : Изтриване
main_Remove                                                                     : Премахнете
main_Resiliate                                                                  : Resiliate
main_Cancel                                                                     : Отказ
main_Modify                                                                     : Промяна
main_Edit                                                                       : Редактирам
main_Validate                                                                   : Проверка на
main_ToValidate                                                                 : За да потвърдите
main_Save                                                                       : Спасяване
main_SaveAs                                                                     : Save As
main_TestConnection                                                             : Проверка на връзката
main_ToClone                                                                    : Clone
main_ConfirmClone                                                               : Изберете данните, които искате да клонира:
main_NoCloneOptionsSpecified                                                    : Няма данни за клониране на определени.
main_Of                                                                         : на
main_CopyOf                                                                     : Копие от
main_Show                                                                       : Показване
main_ShowCardHere                                                               : Афиш
main_Search                                                                     : Търсене
main_SearchOf                                                                   : Търсене
main_Valid                                                                      : Валиден
main_ToBill                                                                     : Генериране на фактура
main_Approve                                                                    : Одобрявам
main_ReOpen                                                                     : Re-Open
main_Upload                                                                     : Изпращане на файл
main_Select                                                                     : Изберете
main_Choose                                                                     : Избирам
main_ChooseLangage                                                              : Моля изберете вашия език
main_Resize                                                                     : Преоразмеряване
main_Recenter                                                                   : Recenter
main_Author                                                                     : Автор
main_User                                                                       : Потребител
main_Users                                                                      : Потребители
main_Group                                                                      : Група
main_Groups                                                                     : Групи
main_Password                                                                   : Парола
main_PasswordRetype                                                             : Повторете парола
main_NoteSomeFeaturesAreDisabled                                                : Имайте предвид, че много функции / модули са забранени в тази демонстрация.
main_Name                                                                       : Име
main_Person                                                                     : Човек
main_Parameter                                                                  : Параметър
main_Parameters                                                                 : Параметри
main_Value                                                                      : Стойност
main_GlobalValue                                                                : Общата стойност
main_PersonalValue                                                              : Лично стойност
main_NewValue                                                                   : Новата стойност
main_CurrentValue                                                               : Текуща стойност
main_Code                                                                       : Код
main_Type                                                                       : Тип
main_Language                                                                   : Език
main_MultiLanguage                                                              : Multi-език
main_Note                                                                       : Внимание
main_CurrentNote                                                                : Настоящата бележка
main_Title                                                                      : Заглавие
main_Label                                                                      : Етикет
main_RefOrLabel                                                                 : Реф. или етикета
main_Info                                                                       : Вход
main_Family                                                                     : Семейство
main_Description                                                                : Описание
main_Designation                                                                : Описание
main_Model                                                                      : Модел
main_DefaultModel                                                               : Default модел
main_Action                                                                     : Събитие
main_About                                                                      : За
main_Number                                                                     : Брой
main_NumberByMonth                                                              : Брой от месеца
main_AmountByMonth                                                              : Сума от месец
main_Numero                                                                     : Брой
main_Limit                                                                      : Граница
main_Limits                                                                     : Граници
main_DevelopmentTeam                                                            : Екипът
main_Logout                                                                     : Изход
main_Connection                                                                 : Връзка
main_Setup                                                                      : Структура
main_Alert                                                                      : Тревога
main_Previous                                                                   : Предишен
main_Next                                                                       : До
main_Cards                                                                      : Карти
main_Card                                                                       : Карта
main_Now                                                                        : Сега
main_Date                                                                       : Дата
main_DateStart                                                                  : Начална дата
main_DateEnd                                                                    : Крайна дата
main_DateCreation                                                               : Дата на създаване
main_DateModification                                                           : Промяна дата
main_DateModificationShort                                                      : Modif. дата
main_DateLastModification                                                       : Дата на последна промяна
main_DateValidation                                                             : Потвърждаване дата
main_DateClosing                                                                : Крайна дата
main_DateDue                                                                    : Крайна дата
main_DateValue                                                                  : Вальор
main_DateValueShort                                                             : Вальор
main_DateOperation                                                              : Датата на операцията
main_DateOperationShort                                                         : Oper. Дата
main_DateLimit                                                                  : Крайната дата
main_DateRequest                                                                : Заявка дата
main_DateProcess                                                                : Процес дата
main_DatePlanShort                                                              : Дата рендосан
main_DateRealShort                                                              : Дата истински.
main_DateBuild                                                                  : Съобщи за изграждане дата
main_DatePayment                                                                : Падеж
main_DurationYear                                                               : година
main_DurationMonth                                                              : месец
main_DurationWeek                                                               : седмица
main_DurationDay                                                                : ден
main_DurationYears                                                              : година
main_DurationMonths                                                             : месеца
main_DurationWeeks                                                              : седмица
main_DurationDays                                                               : ден
main_Year                                                                       : Година
main_Month                                                                      : Месец
main_Week                                                                       : Седмица
main_Day                                                                        : Ден
main_Hour                                                                       : Час
main_Minute                                                                     : Минута
main_Second                                                                     : Втори
main_Years                                                                      : Години
main_Months                                                                     : Месеци
main_Days                                                                       : Дни
main_days                                                                       : ден
main_Hours                                                                      : Часа
main_Minutes                                                                    : Протокол
main_Seconds                                                                    : Секунди
main_Today                                                                      : Днес
main_Yesterday                                                                  : Вчера
main_Tomorrow                                                                   : Утре
main_Quadri                                                                     : Quadri
main_MonthOfDay                                                                 : Месец на деня
main_HourShort                                                                  : H
main_Rate                                                                       : Процент
main_UseLocalTax                                                                : Include tax
main_LocalTaxDesc                                                               : Some countries apply 2 or 3 taxes on each invoice line. If this is the case, choose type for second and third tax and its rate. Possible type are:<br>1 : local tax apply on products and services without vat (vat is not applied on local tax)<br>2 : local tax apply on products and services before vat (vat is calculated on amount + localtax)<br>3 : local tax apply on products without vat (vat is not applied on local tax)<br>4 : local tax apply on products before vat (vat is calculated on amount + localtax)<br>5 : local tax apply on services without vat (vat is not applied on local tax)<br>6 : local tax apply on services before vat (vat is calculated on amount + localtax)<br>7 : local tax is a fix amount applied on global invoice
main_Bytes                                                                      : Bytes
main_KiloBytes                                                                  : Килобайтове
main_MegaBytes                                                                  : Мегабайта
main_GigaBytes                                                                  : Гигабайта
main_TeraBytes                                                                  : Терабайта
main_b                                                                          : б.
main_Kb                                                                         : Kb
main_Mb                                                                         : Mb
main_Gb                                                                         : Gb
main_Tb                                                                         : Туберкулоза
main_Cut                                                                        : Рязане
main_Copy                                                                       : Копирайте
main_Paste                                                                      : Паста
main_Default                                                                    : Неустойка
main_DefaultValue                                                               : Стойността по подразбиране
main_DefaultGlobalValue                                                         : Общата стойност
main_Price                                                                      : Цена
main_UnitPrice                                                                  : Единична цена
main_UnitPriceHT                                                                : Единична цена (нето)
main_UnitPriceTTC                                                               : Единична цена
main_PriceU                                                                     : UP
main_PriceUHT                                                                   : UP (нето)
main_PriceUTTC                                                                  : UP
main_Amount                                                                     : Размер
main_AmountInvoice                                                              : Фактурна стойност
main_AmountPayment                                                              : Сума за плащане
main_AmountHTShort                                                              : Сума (нето)
main_AmountTTCShort                                                             : Сума (вкл. данък)
main_AmountHT                                                                   : Сума (нетно от данъци)
main_AmountTTC                                                                  : Сума (вкл. данък)
main_AmountVAT                                                                  : Размер данък
main_AmountLT1ES                                                                : Размер RE
main_AmountLT2ES                                                                : Размер IRPF
main_AmountTotal                                                                : Обща сума
main_AmountAverage                                                              : Среден размер
main_PriceQtyHT                                                                 : Цена за това количество (нетно от данъци)
main_PriceQtyMinHT                                                              : Мин. Цена количество. (Нетно от данъци)
main_PriceQtyTTC                                                                : Цена за това количество (вкл. данък)
main_PriceQtyMinTTC                                                             : Мин. Цена количество. (Вкл. на данъка)
main_Percentage                                                                 : Процент
main_Total                                                                      : Общо
main_SubTotal                                                                   : Междинна сума
main_TotalHTShort                                                               : Общо (нето)
main_TotalTTCShort                                                              : Общо (вкл. данък)
main_TotalHT                                                                    : Общо (нетно от данъци)
main_TotalTTC                                                                   : Общо (вкл. данък)
main_TotalTTCToYourCredit                                                       : Общо (вкл. данък) с вашия кредит
main_TotalVAT                                                                   : Общи приходи от данъци
main_TotalLT1ES                                                                 : Общо RE
main_TotalLT2ES                                                                 : Общо IRPF
main_IncludedVAT                                                                : С включен ДДС
main_HT                                                                         : Нетно от данъци
main_TTC                                                                        : Inc. Данък
main_VAT                                                                        : Данък върху продажбите
main_LT1ES                                                                      : RE
main_LT2ES                                                                      : IRPF
main_VATRate                                                                    : Данъчната ставка
main_Average                                                                    : Среден
main_Sum                                                                        : Сума
main_Delta                                                                      : Делта
main_Module                                                                     : Модул
main_Option                                                                     : Опция
main_List                                                                       : Списък
main_FullList                                                                   : Пълен списък
main_Statistics                                                                 : Статистика
main_OtherStatistics                                                            : Други статистически данни
main_Status                                                                     : Статус
main_Ref                                                                        : Реф.
main_RefSupplier                                                                : Реф. снабдител
main_RefPayment                                                                 : Реф. плащане
main_CommercialProposals                                                        : Търговски предложения
main_Comment                                                                    : Коментар
main_Comments                                                                   : Коментари
main_ActionsToDo                                                                : Събития за вършене
main_ActionsDone                                                                : Събития направи
main_ActionsToDoShort                                                           : За да направите
main_ActionsRunningshort                                                        : Започната
main_ActionsDoneShort                                                           : Направен
main_ActionNotApplicable                                                        : Не е приложимо
main_ActionRunningNotStarted                                                    : За да започнете
main_ActionRunningShort                                                         : Започната
main_ActionDoneShort                                                            : Завършен
main_CompanyFoundation                                                          : Фирма / Фондация
main_ContactsForCompany                                                         : Контакти за тази трета страна
main_ContactsAddressesForCompany                                                : Контакти / адреси за тази трета страна
main_AddressesForCompany                                                        : Адреси за тази трета страна
main_Address                                                                    : Адрес
main_ActionsOnCompany                                                           : Събития за тази трета страна
main_ActionsOnMember                                                            : Събития за този потребител
main_NActions                                                                   : %s събития
main_NActionsLate                                                               : %s късно
main_Filter                                                                     : Филтър
main_RemoveFilter                                                               : Премахване на филтъра
main_ChartGenerated                                                             : Графика генерирани
main_ChartNotGenerated                                                          : Графика не се генерира
main_GeneratedOn                                                                : Изграждане на %s
main_Generate                                                                   : Генериране на
main_Duration                                                                   : Продължителност
main_TotalDuration                                                              : Обща продължителност
main_Summary                                                                    : Обобщение
main_MyBookmarks                                                                : Моите отметки
main_OtherInformationsBoxes                                                     : Други информационни карета
main_SpeedealingBoard                                                           : Speedealing board
main_SpeedealingStateBoard                                                      : Statistics
main_SpeedealingWorkBoard                                                       : Work tasks board
main_Available                                                                  : На разположение
main_NotYetAvailable                                                            : Все още няма данни
main_NotAvailable                                                               : Не е налично
main_Popularity                                                                 : Популярност
main_Categories                                                                 : Категории
main_Category                                                                   : Категория
main_By                                                                         : От
main_From                                                                       : От
main_to                                                                         : за
main_and                                                                        : и
main_or                                                                         : или
main_Other                                                                      : Друг
main_Others                                                                     : Други
main_OtherInformations                                                          : Други данни
main_Quantity                                                                   : Количество
main_Qty                                                                        : Количество
main_ChangedBy                                                                  : Променено от
main_ReCalculate                                                                : Rebuild
main_ResultOk                                                                   : Успех
main_ResultKo                                                                   : Провал
main_Reporting                                                                  : Докладване
main_Reportings                                                                 : Докладване
main_Draft                                                                      : Проект
main_Drafts                                                                     : Чернови
main_Validated                                                                  : Утвърден
main_Opened                                                                     : Отворен
main_New                                                                        : Нов
main_Discount                                                                   : Отстъпка
main_Unknown                                                                    : Неизвестен
main_General                                                                    : Общ
main_Size                                                                       : Размер
main_Received                                                                   : Приет
main_Paid                                                                       : Платен
main_Topic                                                                      : Относно
main_ByCompanies                                                                : От трети страни
main_ByUsers                                                                    : От потребителите
main_Links                                                                      : Звена
main_Link                                                                       : Връзка
main_Receipts                                                                   : Постъпления
main_Rejects                                                                    : Отхвърля
main_Preview                                                                    : Предварителен преглед
main_NextStep                                                                   : Следваща стъпка
main_PreviousStep                                                               : Предишна стъпка
main_Datas                                                                      : Данни
main_None                                                                       : Никой
main_NoneF                                                                      : Никой
main_Late                                                                       : Късно
main_Photo                                                                      : Снимка
main_Photos                                                                     : Снимки
main_AddPhoto                                                                   : Добави снимка
main_Login                                                                      : Влез
main_CurrentLogin                                                               : Текущ вход
main_January                                                                    : Януари
main_February                                                                   : Февруари
main_March                                                                      : Март
main_April                                                                      : Април
main_May                                                                        : Май
main_June                                                                       : Юни
main_July                                                                       : Юли
main_August                                                                     : Август
main_September                                                                  : Септември
main_October                                                                    : Октомври
main_November                                                                   : Ноември
main_December                                                                   : Декември
main_JanuaryMin                                                                 : Jan
main_FebruaryMin                                                                : Февруари
main_MarchMin                                                                   : Mar
main_AprilMin                                                                   : Април
main_MayMin                                                                     : Май
main_JuneMin                                                                    : Юни
main_JulyMin                                                                    : Юли
main_AugustMin                                                                  : Август
main_SeptemberMin                                                               : Септември
main_OctoberMin                                                                 : Октомври
main_NovemberMin                                                                : Ноември
main_DecemberMin                                                                : Декември
main_Month01                                                                    : януари
main_Month02                                                                    : февруари
main_Month03                                                                    : март
main_Month04                                                                    : април
main_Month05                                                                    : може да
main_Month06                                                                    : юни
main_Month07                                                                    : юли
main_Month08                                                                    : август
main_Month09                                                                    : септември
main_Month10                                                                    : октомври
main_Month11                                                                    : ноември
main_Month12                                                                    : декември
main_MonthShort01                                                               : Януари
main_MonthShort02                                                               : февруари
main_MonthShort03                                                               : пазар
main_MonthShort04                                                               : април
main_MonthShort05                                                               : може да
main_MonthShort06                                                               : юни
main_MonthShort07                                                               : юли
main_MonthShort08                                                               : Август
main_MonthShort09                                                               : септември
main_MonthShort10                                                               : Октомври
main_MonthShort11                                                               : Ноември
main_MonthShort12                                                               : Декември
main_AttachedFiles                                                              : Прикачените файлове и документи
main_FileTransferComplete                                                       : Файлът е качен успешно
main_DateFormatYYYYMM                                                           : ГГГГ-ММ
main_DateFormatYYYYMMDD                                                         : ГГГГ-ММ-ДД
main_DateFormatYYYYMMDDHHMM                                                     : YYYY-MM-DD HH: SS
main_ReportName                                                                 : Име на отчет
main_ReportPeriod                                                               : Период на доклада
main_ReportDescription                                                          : Описание
main_Report                                                                     : Доклад
main_Keywords                                                                   : Mots clés
main_Legend                                                                     : Легенда
main_FillTownFromZip                                                            : Попълнете града от цип
main_ShowLog                                                                    : Покажи влезете
main_File                                                                       : Досие
main_Files                                                                      : Файлове
main_NotAllowed                                                                 : Не е позволено
main_ReadPermissionNotAllowed                                                   : Прочети разрешение не е позволено
main_AmountInCurrency                                                           : Сума в %s валута
main_Example                                                                    : Пример
main_Examples                                                                   : Примери
main_NoExample                                                                  : Няма пример
main_FindBug                                                                    : Съобщи за грешка
main_NbOfThirdParties                                                           : Брой на трети лица
main_NbOfCustomers                                                              : Брой клиенти
main_NbOfLines                                                                  : Брой редове
main_NbOfObjects                                                                : Брой на обектите
main_NbOfReferers                                                               : Брой на референти
main_Referers                                                                   : Препратки от
main_TotalQuantity                                                              : Общо количество
main_DateFromTo                                                                 : От %s %s
main_DateFrom                                                                   : От %s
main_DateUntil                                                                  : До %s
main_Check                                                                      : Проверка
main_Internal                                                                   : Вътрешен
main_External                                                                   : Външен
main_Internals                                                                  : Вътрешен
main_Externals                                                                  : Външен
main_Warning                                                                    : Внимание
main_Warnings                                                                   : Предупреждения
main_BuildPDF                                                                   : Изграждане на PDF
main_RebuildPDF                                                                 : Възстановяване на PDF
main_BuildDoc                                                                   : Изграждане Doc
main_RebuildDoc                                                                 : Rebuild Doc
main_Entity                                                                     : Околна среда
main_Entities                                                                   : Субекти
main_EventLogs                                                                  : Дневник
main_CustomerPreview                                                            : Клиентът преглед
main_SupplierPreview                                                            : Доставчик преглед
main_AccountancyPreview                                                         : Счетоводството преглед
main_ShowCustomerPreview                                                        : Предварителен преглед на клиентите
main_ShowSupplierPreview                                                        : Покажи преглед доставчика
main_ShowAccountancyPreview                                                     : Покажи преглед счетоводство
main_ShowProspectPreview                                                        : Покажи преглед перспектива
main_RefCustomer                                                                : Реф. клиент
main_Currency                                                                   : Валута
main_InfoAdmin                                                                  : Информация за администратори
main_Undo                                                                       : Премахвам
main_Redo                                                                       : Ремонтирам
main_ExpandAll                                                                  : Разгъване на всички
main_UndoExpandAll                                                              : Отмяна на разширяване
main_Reason                                                                     : Причина
main_FeatureNotYetSupported                                                     : Feature все още не се поддържа
main_CloseWindow                                                                : Затвори прозореца
main_Question                                                                   : Въпрос
main_Response                                                                   : Отговор
main_Priority                                                                   : Приоритет
main_SendByMail                                                                 : Изпрати по имейл
main_MailSentBy                                                                 : Имейл, изпратен от
main_TextUsedInTheMessageBody                                                   : Email тялото
main_SendAcknowledgementByMail                                                  : Изпращане на АСК. по електронна поща
main_NoEMail                                                                    : Не имейл
main_Owner                                                                      : Собственик
main_DetectedVersion                                                            : Открит версия
main_FollowingConstantsWillBeSubstituted                                        : Следните константи ще бъдат заменени със съответната стойност.
main_Refresh                                                                    : Обнови
main_BackToList                                                                 : Назад към списъка
main_GoBack                                                                     : Върни се назад
main_CanBeModifiedIfOk                                                          : Може да бъде променяно, ако са валидни
main_CanBeModifiedIfKo                                                          : Може да бъде променяно, ако не са валидни
main_RecordModifiedSuccessfully                                                 : Запис променена успешно
main_RecordsModified                                                            : %s записи промяна
main_AutomaticCode                                                              : Автоматичен код
main_NotManaged                                                                 : Не се управлява
main_FeatureDisabled                                                            : Feature инвалиди
main_MoveBox                                                                    : Преместете кутия %s
main_Offered                                                                    : Предлага
main_NotEnoughPermissions                                                       : Вие нямате разрешение за това действие
main_SessionName                                                                : Името на сесията
main_Method                                                                     : Метод
main_Receive                                                                    : Получавам
main_PartialWoman                                                               : Частичен
main_PartialMan                                                                 : Частичен
main_TotalWoman                                                                 : Общо
main_TotalMan                                                                   : Общо
main_NeverReceived                                                              : Никога не са получавали
main_Canceled                                                                   : Отменен
main_YouCanChangeValuesForThisListFromDictionnarySetup                          : Можете да промените стойности за този списък от менюто за настройки - dictionnary
main_Color                                                                      : Цвят
main_Documents                                                                  : Свързани файлове
main_DocumentsNb                                                                : Свързани файлове (%s)
main_Documents2                                                                 : Документи
main_BuildDocuments                                                             : Генериране на документи
main_UploadDisabled                                                             : Качи инвалиди
main_MenuECM                                                                    : Документи
main_MenuAWStats                                                                : AWStats
main_MenuMembers                                                                : Потребители
main_MenuAgendaGoogle                                                           : Google дневния ред
main_ThisLimitIsDefinedInSetup                                                  : Speedealing граница (Меню-настройка сигурност): %s Kb, PHP лимит: %s Kb
main_NoFileFound                                                                : Няма документи, записани в тази директория
main_CurrentUserLanguage                                                        : Текущия език
main_CurrentTheme                                                               : Текущата тема
main_DisabledModules                                                            : Увреждания модули
main_For                                                                        : За
main_ForCustomer                                                                : За клиента
main_Signature                                                                  : Подпис
main_HidePassword                                                               : Покажи команда със скрити парола
main_UnHidePassword                                                             : Покаже истинска команда с чиста парола
main_Root                                                                       : Корен
main_Informations                                                               : Информация
main_Page                                                                       : Страница
main_Notes                                                                      : Бележки
main_AddNewLine                                                                 : Добавяне на нов ред
main_AddFile                                                                    : Добавяне на файл
main_ListOfFiles                                                                : Списък на наличните файлове
main_FreeZone                                                                   : Свободен текст
main_CloneMainAttributes                                                        : Clone обект с неговите основни атрибути
main_PDFMerge                                                                   : PDF Merge
main_Merge                                                                      : Обединяване
main_PrintContentArea                                                           : Покажи страница за печат основното съдържание
main_NoMenu                                                                     : Не подменю
main_WarningYouAreInMaintenanceMode                                             : Внимание, вие сте в режим на поддръжка, така че само вход <b>%s</b> се разрешава за използване приложение в момента.
main_CoreErrorTitle                                                             : Системна грешка
main_CoreErrorMessage                                                           : Съжаляваме, но е станала грешка. Проверка на дървени трупи или се свържете с вашия системен администратор.
main_CreditCard                                                                 : Кредитна карта
main_FieldsWithAreMandatory                                                     : Полетата с <b>%s</b> са задължителни
main_FieldsWithIsForPublic                                                      : Полетата с <b>%s</b> показан на публичен списък на членовете. Ако не искате това, кутия &quot;общественост&quot;.
main_AccordingToGeoIPDatabase                                                   : (Според конвертиране GeoIP)
main_Line                                                                       : Линия
main_NotSupported                                                               : Не се поддържа
main_RequiredField                                                              : Задължително поле
main_Result                                                                     : Резултат
main_ToTest                                                                     : Тест
main_ValidateBefore                                                             : Карта трябва да бъде потвърдена, преди да използвате тази функция
main_Visibility                                                                 : Видимост
main_Private                                                                    : Частен
main_Hidden                                                                     : Скрит
main_Resources                                                                  : Ресурси
main_Source                                                                     : Източник
main_Prefix                                                                     : Префикс
main_Before                                                                     : Преди
main_After                                                                      : След
main_IPAddress                                                                  : IP адрес
main_Frequency                                                                  : Честота
main_TicketCenter                                                               : Gestion des tickets
main_NewAttribute                                                               : Нов атрибут
main_AttributeCode                                                              : Атрибут код
main_OptionalFieldsSetup                                                        : Допълнителни атрибути за настройка
main_URLPhoto                                                                   : Адреса на снимка / лого
main_SetLinkToThirdParty                                                        : Връзка към друга трета страна
main_CreateDraft                                                                : Създаване на проект
main_ClickToEdit                                                                : Кликнете, за да редактирате
main_ObjectDeleted                                                              : Обекти %s изтрита
main_ByCountry                                                                  : По държава
main_ByTown                                                                     : До града
main_ByDate                                                                     : По дата
main_ByMonthYear                                                                : До месец / година
main_ByYear                                                                     : С години
main_ByMonth                                                                    : от месец
main_ByDay                                                                      : Денем
main_BySalesRepresentative                                                      : От търговски представител
main_LinkedToSpecificUsers                                                      : Свързано с даден контакт на потребителя
main_DeleteAFile                                                                : Изтриване на файл
main_ConfirmDeleteAFile                                                         : Сигурен ли сте, че искате да изтриете файл
main_Create                                                                     : Créer
main_Block                                                                      : Bloquer
main_Unblock                                                                    : Débloquer
main_Weeks                                                                      : Semaines
main_To                                                                         : à
main_View                                                                       : Voir
main_Open                                                                       : Ouvrir
main_ControllingPassword                                                        : Connexion en cours...
main_Hello                                                                      : Bonjour
main_Forward                                                                    : Започнете качване
main_Reply                                                                      : Répondre
main_TimeLeft                                                                   : Temps restant
main_Important                                                                  : Important
main_Dashboard                                                                  : Tableau de bord
main_DownloadPDF                                                                : Télécharger PDF
main_Agenda                                                                     : Дневен ред
main_PreviousMonth                                                              : Mois précédent
main_NextMonth                                                                  : Mois suivant
main_Download                                                                   : Télécharger
main_Potential                                                                  : Потенциал
users_UserCard                                                                  : Потребителска карта
users_ContactCard                                                               : Свържи се карта
users_GroupCard                                                                 : Група карта
users_NoContactCard                                                             : Няма карта сред контакти
users_Permission                                                                : Разрешение
users_Permissions                                                               : Разрешения
users_Password                                                                  : Парола
users_EditPassword                                                              : Edit парола
users_SendNewPassword                                                           : Регенерира и изпращане на парола
users_ReinitPassword                                                            : Повторно генериране на парола
users_PasswordChangedTo                                                         : Парола изменя така: %s
users_SubjectNewPassword                                                        : Вашата нова парола за Speedealing
users_AvailableRights                                                           : Наличните разрешения
users_OwnedRights                                                               : Собствени разрешения
users_GroupRights                                                               : Група разрешения
users_UserRights                                                                : Потребителските права
users_UserGUISetup                                                              : Настройка Потребителят дисплей
users_DisableUser                                                               : Правя неспособен
users_DisableAUser                                                              : Изключване на потребителя
users_DeleteUser                                                                : Изтриване
users_DeleteAUser                                                               : Изтриване на потребител
users_DisableGroup                                                              : Правя неспособен
users_DisableAGroup                                                             : Изключване група
users_EnableAUser                                                               : Разрешаване на потребителя
users_EnableAGroup                                                              : Разрешаване на група
users_DeleteGroup                                                               : Изтриване
users_DeleteAGroup                                                              : Изтриване на група
users_ConfirmDisableUser                                                        : Сигурен ли сте, че искате да изключите потребителски <b>%s?</b>
users_ConfirmDisableGroup                                                       : Сигурен ли сте, че искате да деактивирате група <b>%s?</b>
users_ConfirmDeleteUser                                                         : Сигурен ли сте, че искате да изтриете потребителски <b>%s?</b>
users_ConfirmDeleteGroup                                                        : Сигурен ли сте, че искате да изтриете група <b>%s?</b>
users_ConfirmEnableUser                                                         : Сигурен ли сте, че искате да разрешите потребителски <b>%s?</b>
users_ConfirmEnableGroup                                                        : Сигурен ли сте, че искате да разрешите група <b>%s?</b>
users_ConfirmReinitPassword                                                     : Сигурен ли сте, че искате да създадете нова парола за потребителски <b>%s?</b>
users_ConfirmSendNewPassword                                                    : Сигурен ли сте, че искате да генерираме и изпратим нова парола за потребителски <b>%s?</b>
users_NewUser                                                                   : Нов потребител
users_CreateUser                                                                : Създаване на потребител
users_SearchAGroup                                                              : Търсене на група
users_SearchAUser                                                               : Търсене на потребителя
users_LoginNotDefined                                                           : Вход не е дефинирано.
users_NameNotDefined                                                            : Името не е дефинирана.
users_ListOfUsers                                                               : Списък на потребителите
users_Administrator                                                             : Администратор
users_SuperAdministrator                                                        : Супер Администратор
users_SuperAdministratorDesc                                                    : Глобално администратор
users_AdministratorDesc                                                         : Администратор лице
users_DefaultRights                                                             : Разрешенията по подразбиране
users_DefaultRightsDesc                                                         : Определете тук разрешенията по <u>подразбиране,</u> които автоматично са предоставени на <u>новосъздадения</u> потребител (на потребителското карта, за да се промени разрешение на съществуващ потребител).
users_SpeedealingUsers                                                          : Speedealing users
users_Civilite                                                                  : Civilite
users_LastName                                                                  : Име
users_FirstName                                                                 : Собствено име
users_ListOfGroups                                                              : Списък на групите
users_NewGroup                                                                  : Нова група
users_CreateGroup                                                               : Създай група
users_RemoveFromGroup                                                           : Премахване от групата
users_PasswordChangedAndSentTo                                                  : Парола променили и изпраща <b>%s.</b>
users_PasswordChangeRequestSent                                                 : Заявка за промяна на парола за <b>%s,</b> изпратени до <b>%s.</b>
users_MenuUsersAndGroups                                                        : Потребители и групи
users_LastGroupsCreated                                                         : Последно %s създават групи
users_LastUsersCreated                                                          : Последно потребители %s създаден
users_ShowGroup                                                                 : Показване на групата
users_ShowUser                                                                  : Покажи потребителя
users_NonAffectedUsers                                                          : За засегнатите потребители
users_UserModified                                                              : Потребителят е променена успешно
users_GroupModified                                                             : Група променена успешно
users_PhotoFile                                                                 : Снимка файл
users_UserWithSpeedealingAccess                                                 : User with Speedealing access
users_ListOfUsersInGroup                                                        : Списък на потребителите в тази група
users_ListOfGroupsForUser                                                       : Списък на групи за този потребител
users_UsersToAdd                                                                : На потребителите да добавят към тази група
users_GroupsToAdd                                                               : Групи, за да добавите този потребител
users_NoLogin                                                                   : Без данни за вход
users_LinkToCompanyContact                                                      : Линк към трета страна / контакт
users_LinkedToSpeedealingMember                                                 : Link to member
users_LinkedToSpeedealingUser                                                   : Link to Speedealing user
users_LinkedToSpeedealingThirdParty                                             : Link to Speedealing third party
users_CreateSpeedealingLogin                                                    : Create a user
users_CreateSpeedealingThirdParty                                               : Create a third party
users_LoginAccountDisable                                                       : Профилът е деактивиран, поставете нов, влезте с потребителско име и парола, за да я активирате.
users_LoginAccountDisableInSpeedealing                                          : Account disabled in Speedealing.
users_LoginAccountDisableInLdap                                                 : Профилът е деактивиран в домейна.
users_UsePersonalValue                                                          : Използвайте лична стойност
users_GuiLanguage                                                               : Език на интерфейса
users_InternalUser                                                              : Вътрешна потребителска
users_MyInformations                                                            : Моите данни
users_ExportDataset_user_1                                                      : Speedealing потребителите и свойства
users_DomainUser                                                                : %s потребителски домейн
users_Reactivate                                                                : Възстановете
users_CreateInternalUserDesc                                                    : Тази форма ви позволява да създавам потребител на вътрешни за вашата компания / фондация. Да създавам външен потребител (клиент, доставчик, ...), използвайте бутона &quot;Създаване на Speedealing потребителя от трета страна картата за контакт.
users_InternalExternalDesc                                                      : <b>Вътрешен</b> потребител е потребител, който е част от вашата компания / фондация. <br> <b>Външен</b> потребител е клиент, доставчик или друга. <br><br> И в двата случая, разрешения определя права върху Speedealing, външен потребител може да има друг мениджър меню от вътрешния потребител (Виж Начало - Setup - Display)
users_PermissionInheritedFromAGroup                                             : Регулация, защото е наследен от един от групата на потребителя.
users_Inherited                                                                 : Наследен
users_UserWillBeInternalUser                                                    : Създаден потребителят ще бъде вътрешен потребител (тъй като не са свързани с определена трета страна)
users_UserWillBeExternalUser                                                    : Създаден потребителят ще бъде външен потребител (защото свързани с дадена трета страна)
users_IdPhoneCaller                                                             : Caller ID телефон
users_UserLogged                                                                : Потребителят %s вход
users_UserLogoff                                                                : Потребителски %s изход
users_NewUserCreated                                                            : Потребителски %s създаден
users_NewUserPassword                                                           : Промяна на паролата за %s
users_EventUserModified                                                         : Потребителски %s промяна
users_UserDisabled                                                              : Потребителски %s инвалиди
users_UserEnabled                                                               : Потребителски %s активира
users_UserDeleted                                                               : Потребителски %s отстранени
users_NewGroupCreated                                                           : Група %s създаден
users_GroupDeleted                                                              : Група %s отстранени
users_ConfirmCreateContact                                                      : Сигурен ли сте, че искате да създадете акаунт Speedealing за този контакт?
users_ConfirmCreateLogin                                                        : Сигурен ли сте, че искате да създадете акаунт Speedealing за този потребител?
users_ConfirmCreateThirdParty                                                   : Сигурен ли сте, че искате да създадете трета страна за този потребител?
users_LoginToCreate                                                             : Влез за да създаде
users_NameToCreate                                                              : Име на трета страна, за да създадете
users_YourRole                                                                  : Вашите роли
users_YourQuotaOfUsersIsReached                                                 : Квотата на активните потребители е достигнато!
users_NbOfUsers                                                                 : Nb на потребителите
users_DontDowngradeSuperAdmin                                                   : Само superadmin да понижи категорията на superadmin
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
users_Employee                                                                  : Служителите
users_Address                                                                   : Улица
users_Town                                                                      : Град
users_Zip                                                                       : Code Postal
users_Tel-Mobile                                                                : Téléphone Mobile
users_Tel-Fixe                                                                  : Téléphone Fixe
users_Email                                                                     : Имейл адрес
users_Date-Naissance                                                            : Рождена дата
users_Ville-Naissance                                                           : Ville de naissance
users_Pays-Naissance                                                            : Pays de naissance
users_Nationnalite                                                              : Nationnalité
users_Situation                                                                 : Situation familiale
users_NbrEnfants                                                                : Nombre Enfants
users_PerCharges                                                                : Personnes à charges
users_Date-Depart                                                               : Date de dèpart
users_Date-Arrivee                                                              : Date d'arrivée
users_Poste                                                                     : Позиция
users_Description-Poste                                                         : Descrption du poste
users_Type-Contrat                                                              : Type de contrat
users_Periode-Essai                                                             : Periode d'essai
users_Salaire-Brut                                                              : Salaire brut
users_Statut                                                                    : Статус
users_Site                                                                      : Site
users_Groupe                                                                    : Група
users_Securite-Sociale                                                          : N° de la sécurité sociale
users_Libelle-Bank                                                              : Libelle banque
users_IBAN                                                                      : IBAN
users_Photo                                                                     : Снимка
users_Categorie                                                                 : Categorie
users_Temps-Travail                                                             : Temps de travail
users_Niveau-Etude                                                              : Niveau d'études
users_Annee-Diplome                                                             : Année d'obtention
users_Login                                                                     : Влез
users_Notes                                                                     : Бележки
users_LoginDescription                                                          : L'identifiant qui permet de se connecter à l'application. (unique et sans espace)
users_LoginIsValid                                                              : Ce login est valide.
users_EmailAddressIsValid                                                       : L'adresse e-mail est valide.
users_ErrorLoginAlreadyExists                                                   : Ce login existe déjà !
users_ErrorInvalidLogin                                                         : Ce login n'est pas valide !
users_ErrorInvalidEmailAddress                                                  : L'adresse e-mail n'est pas valide !
users_ErrorGroupAlreadyExists                                                   : Ce groupe existe déjà !
