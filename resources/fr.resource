admin_Version                                                                   : Version
admin_VersionProgram                                                            : Version programmes
admin_VersionLastInstall                                                        : Version installation initiale
admin_VersionLastUpgrade                                                        : Version dernière mise à jour
admin_VersionExperimental                                                       : Expérimental
admin_VersionDevelopment                                                        : Développement
admin_VersionUnknown                                                            : Inconnue
admin_VersionRecommanded                                                        : Recommandé
admin_SessionId                                                                 : ID Session
admin_SessionSaveHandler                                                        : Modalité de sauvegarde des sessions
admin_SessionSavePath                                                           : Localisation sauvegarde sessions
admin_PurgeSessions                                                             : Purge des sessions
admin_ConfirmPurgeSessions                                                      : Voulez-vous purger les sessions. Ceci déconnectera tous les utilisateurs (sauf vous même).
admin_NoSessionListWithThisHandler                                              : Le handler de gestion de session configuré pour votre PHP ne permet pas de lister les sessions en cours
admin_LockNewSessions                                                           : Bloquer nouvelles connexions
admin_ConfirmLockNewSessions                                                    : Êtes-vous sûr de vouloir restreindre l'accès Speedealing à votre utilisateur. Seul le login <b>%s</b> pourra se connecter après cela.
admin_UnlockNewSessions                                                         : Lever blocage des connexions
admin_YourSession                                                               : Votre session
admin_Sessions                                                                  : Sessions utilisateurs
admin_WebUserGroup                                                              : Web serveur utilisateur/group
admin_NoSessionFound                                                            : Votre PHP ne semble pas pouvoir lister les sessions actives. Le répertoire de sauvegarde des sessions (<b>%s</b>) est peut être protégé (Par exemple, par les permissions de l'OS ou par la directive open_basedir de votre PHP, ce qui d'un point de vue sécurité est une bonne chose).
admin_HTMLCharset                                                               : Charset des pages HTML générées
admin_DBStoringCharset                                                          : Charset base pour stockage données
admin_DBSortingCharset                                                          : Charset base pour tri données
admin_WarningModuleNotActive                                                    : Module <b>%s</b> non actif
admin_WarningOnlyPermissionOfActivatedModules                                   : Attention, seules les permissions en rapport avec les modules activés sont affichées ici. Vous pouvez activer les autres modules sur la page Accueil->Configuration->Modules
admin_SpeedealingSetup                                                          : Speedealing install or upgrade
admin_SpeedealingUser                                                           : Speedealing user
admin_InternalUser                                                              : Utilisateur interne
admin_ExternalUser                                                              : Utilisateur externe
admin_InternalUsers                                                             : Utilisateurs internes
admin_ExternalUsers                                                             : Utilisateurs externes
admin_GlobalSetup                                                               : Général
admin_GUISetup                                                                  : Affichage
admin_SetupArea                                                                 : Espace configuration
admin_FormToTestFileUploadForm                                                  : Formulaire de test d'upload de fichier (selon options choisies)
admin_IfModuleEnabled                                                           : Rem: oui est effectif uniquement si le module <b>%s</b> est activé
admin_RemoveLock                                                                : Effacer le fichier <b>%s</b> s'il existe afin d'autoriser l'outil de mise à jour.
admin_RestoreLock                                                               : Replacer un fichier <b>%s</b> en ne donnant des droits que de lecture sur ce fichier afin d'interdire à nouveau les mises à jour.
admin_SecuritySetup                                                             : Configuration de la sécurité
admin_ErrorModuleRequirePHPVersion                                              : Erreur, ce module requiert une version %s ou supérieure de PHP
admin_ErrorModuleRequireSpeedealingVersion                                      : Error, this module requires Speedealing version %s or higher
admin_ErrorDecimalLargerThanAreForbidden                                        : Erreur, les précisions supérieures à <b>%s</b> ne sont pas supportées.
admin_DictionnarySetup                                                          : Dictionnaires
admin_Dictionnary                                                               : Dictionnaires
admin_DisableJavascript                                                         : Désactiver les fonctions Javascript et Ajax
admin_ConfirmAjax                                                               : Utiliser les popups de confirmation Ajax
admin_UseSearchToSelectCompany                                                  : Utiliser un champ avec autocomplétion pour choisir un tiers (plutôt qu'une liste déroulante).<br><br>Notez que si vous avez un nombre important de produits ou services (> 100 000), vous pouvez améliorer les performances en définissant la constante SOCIETE_DONOTSEARCH_ANYWHERE à 1 dans Configuration->Divers. La recherche sera alors limitée au début de la chaine.
admin_ActivityStateToSelectCompany                                              : Ajouter une option de filtrage lors des recherches pour afficher/masquer les tiers en exercice ou ayant cessés d'exercer
admin_SearchFilter                                                              : Options des filtres de recherche
admin_NumberOfKeyToSearch                                                       : Nb carac. déclenchant recherche: %s
admin_ViewFullDateActions                                                       : Visualiser les dates des actions en entier dans la fiche tiers
admin_NotAvailableWhenAjaxDisabled                                              : Non disponible quand Ajax désactivé
admin_JavascriptDisabled                                                        : Javascript désactivé
admin_UsePopupCalendar                                                          : Utiliser les popups pour la saisie des dates
admin_UsePreviewTabs                                                            : Afficher les onglets "Aperçu"
admin_ShowPreview                                                               : Afficher aperçu
admin_PreviewNotAvailable                                                       : Aperçu non disponible
admin_ThemeCurrentlyActive                                                      : Thème actuellement actif
admin_CurrentTimeZone                                                           : Time Zone PHP (serveur)
admin_Space                                                                     : Espace
admin_Fields                                                                    : Champs
admin_Mask                                                                      : Masque
admin_NextValue                                                                 : Prochaine valeur
admin_NextValueForInvoices                                                      : Prochaine valeur (factures)
admin_NextValueForCreditNotes                                                   : Prochaine valeur (avoirs)
admin_MustBeLowerThanPHPLimit                                                   : Remarque: Votre PHP limite naturellement la taille à <b>%s</b> %s maximum, quelque soit la valeur de ce paramètre
admin_NoMaxSizeByPHPLimit                                                       : Aucune limite interne à votre serveur PHP
admin_MaxSizeForUploadedFiles                                                   : Taille maximum des documents uploadés (0 pour interdire l'upload)
admin_UseCaptchaCode                                                            : Utilisation du code graphique (CAPTCHA) sur la page de login
admin_UseAvToScanUploadedFiles                                                  : Utilisation d'un anti-virus pour scanner les fichiers uploadés
admin_AntiVirusCommand                                                          : Chemin complet vers la commande antivirus
admin_AntiVirusCommandExample                                                   : Exemple pour ClamWin: c:\Progra~1\ClamWin\bin\clamscan.exe<br>Exemple pour ClamAv: /usr/bin/clamscan
admin_AntiVirusParam                                                            : Paramètres supplémentaire sur la ligne de commande
admin_AntiVirusParamExample                                                     : Exemple pour ClamWin: --database="C:\Program Files (x86)\ClamWin\lib"
admin_ComptaSetup                                                               : Configuration du module Comptabilité
admin_UserSetup                                                                 : Configuration gestion des utilisateurs
admin_MenuSetup                                                                 : Administration des menus par base de données
admin_MenuLimits                                                                : Limites et précision
admin_MenuIdParent                                                              : Id du menu parent
admin_DetailMenuIdParent                                                        : Id du menu parent (0 pour un menu du haut)
admin_DetailPosition                                                            : Numéro d'ordre déterminant la position du menu
admin_PersonalizedMenusNotSupported                                             : Menus personnalisés non gérés
admin_AllMenus                                                                  : Tous
admin_NotConfigured                                                             : Module non configuré
admin_Setup                                                                     : Configuration
admin_Activation                                                                : Activation
admin_Active                                                                    : Actif
admin_SetupShort                                                                : Config
admin_OtherOptions                                                              : Autres options
admin_OtherSetup                                                                : Divers
admin_CurrentValueSeparatorDecimal                                              : Séparateur décimal
admin_CurrentValueSeparatorThousand                                             : Séparateur de milliers
admin_Modules                                                                   : Modules
admin_ModulesCommon                                                             : Modules principaux
admin_ModulesOther                                                              : Modules complémentaires
admin_ModulesInterfaces                                                         : Modules interfaces
admin_ModulesSpecial                                                            : Modules très spécifiques
admin_ParameterInSpeedealing                                                    : Parameter %s
admin_LanguageParameter                                                         : Variable langue %s
admin_LanguageBrowserParameter                                                  : Variable %s
admin_LocalisationSpeedealingParameters                                         : Localisation parameters
admin_ClientTZ                                                                  : Time Zone client (utilisateur)
admin_ClientHour                                                                : Heure client (utilisateur)
admin_OSTZ                                                                      : Time Zone OS
admin_PHPTZ                                                                     : Time Zone config PHP
admin_PHPServerOffsetWithGreenwich                                              : Offset serveur PHP avec Greenwich (secondes)
admin_ClientOffsetWithGreenwich                                                 : Offset client/navigateur avec Greenwich (secondes)
admin_DaylingSavingTime                                                         : Heure d'été
admin_CurrentHour                                                               : Heure PHP (serveur)
admin_CompanyTZ                                                                 : Time Zone société (maison mère)
admin_CompanyHour                                                               : Heure société (maison mère)
admin_CurrentSessionTimeOut                                                     : Time out session courante
admin_OSEnv                                                                     : Environnement OS
admin_Box                                                                       : Boîte
admin_Boxes                                                                     : Boîtes
admin_MaxNbOfLinesForBoxes                                                      : Nombre max de lignes pour les boîtes
admin_PositionByDefault                                                         : Position par défaut
admin_Position                                                                  : Ordre
admin_MenusDesc                                                                 : Les gestionnaires de menu définissent le contenu des 2 barres de menus (la barre horizontale et la barre verticale). Il est possible de mettre un gestionnaire différent selon que l'utilisateur soit interne ou externe.
admin_MenusEditorDesc                                                           : L'éditeur de menu permet de définir des entrées personnalisées dans les menus. Il doit être utilisé avec prudence sous peine de mettre Speedealing en situation instable nécessitant une réinstallation pour retrouver un menu cohérent.<br>Certains modules ajoutent des entrées personnalisées aux menus (dans le menu <b>Tous</b> en général). Si vous détruisez ces entrées par erreur, vous pourrez les récupérer en désactivant puis réactivant le module.
admin_MenuForUsers                                                              : Menu pour les utilisateurs
admin_LangFile                                                                  : Fichier .lang
admin_System                                                                    : Système
admin_SystemInfo                                                                : Infos Système
admin_SystemTools                                                               : Outils Système
admin_SystemToolsArea                                                           : Espace outils systèmes
admin_SystemToolsAreaDesc                                                       : Cet espace offre des fonctions d'administration diverses. Utilisez le menu pour choisir la fonctionnalité recherchée.
admin_PurgeAreaDesc                                                             : Cette page vous permet d'effacer tous les fichiers construits ou stockés par Speedealing (fichiers temporaires ou tous les fichiers du répertoire <b>%s</b>). L'utilisation de cette fonction n'est pas nécessaire. Elle est fournie pour les utilisateurs qui hébergent Speedealing chez un hébergeur qui n'offre pas les permissions de supprimer les fichiers sauvegardés par le serveur Web.
admin_PurgeDeleteLogFile                                                        : Effacer le fichier log <b>%s</b> défini pour le module 'Logs et traces' (pas de risque de perte de données)
admin_PurgeDeleteTemporaryFiles                                                 : Effacer tous les fichiers temporaires (pas de risque de perte de données)
admin_PurgeDeleteAllFilesInDocumentsDir                                         : Effacer tous les fichiers du répertoire <b>%s</b>. Les fichiers temporaires mais aussi les fichiers dumps de sauvegardes de bases, les fichiers joints aux éléments (tiers, factures, ...) ou fichiers stockés dans le module GED seront irrémédiablement effacés.
admin_PurgeRunNow                                                               : Lancer la purge maintenant
admin_PurgeNothingToDelete                                                      : Aucun répertoire ou fichier à supprimer.
admin_PurgeNDirectoriesDeleted                                                  : <b>%s</b> fichiers ou répertoires supprimés.
admin_PurgeAuditEvents                                                          : Purger les événements sécurité
admin_ConfirmPurgeAuditEvents                                                   : Etes vous sûr de vouloir purger la liste des événements d'audit de sécurité. Toute la liste sera effacée, mais ceci est sans conséquence sur vos autres données.
admin_NewBackup                                                                 : Nouvelle sauvegarde
admin_GenerateBackup                                                            : Générer sauvegarde
admin_Backup                                                                    : Sauvegarde
admin_Restore                                                                   : Restauration
admin_RunCommandSummary                                                         : La sauvegarde sera exécutée par la commande suivante
admin_RunCommandSummaryToLaunch                                                 : La sauvegarde peut etre exécutée par la commande suivante
admin_WebServerMustHavePermissionForCommand                                     : Votre serveur web doit avoir les droits pour exécuter une telle commande
admin_BackupResult                                                              : Résultat sauvegarde
admin_BackupFileSuccessfullyCreated                                             : Fichier backup généré avec succès
admin_YouCanDownloadBackupFile                                                  : Les fichiers générés peuvent maintenant être téléchargés
admin_NoBackupFileAvailable                                                     : Aucun fichier backup disponible.
admin_ExportMethod                                                              : Méthode d'export
admin_ImportMethod                                                              : Méthode d'import
admin_ToBuildBackupFileClickHere                                                : Pour générer un fichier de sauvegarde, cliquez <a href="%s">ici</a>.
admin_ImportMySqlDesc                                                           : Pour importer une sauvegarde, il faut utiliser la commande mysql en ligne suivante:
admin_ImportPostgreSqlDesc                                                      : Pour importer une sauvegarde, il faut utiliser la commande pg_restore en ligne suivante:
admin_ImportMySqlCommand                                                        : %s %s < monfichierbackup.sql
admin_ImportPostgreSqlCommand                                                   : %s %s monfichierbackup.sql
admin_FileNameToGenerate                                                        : Nom du fichier à générer
admin_CommandsToDisableForeignKeysForImport                                     : Commande pour désactiver les clés étrangères à l'import
admin_CommandsToDisableForeignKeysForImportWarning                              : Requis si vous voulez être en mesure de restaurer votre dump SQL plus tard
admin_ExportCompatibility                                                       : Compatibilité du fichier export généré
admin_MySqlExportParameters                                                     : Paramètres de l'export MySql
admin_PostgreSqlExportParameters                                                : Paramètres de l'export PostgreSQL
admin_UseTransactionnalMode                                                     : Utiliser le mode transactionnel
admin_FullPathToMysqldumpCommand                                                : Chemin complet vers la commande mysqldump
admin_FullPathToPostgreSQLdumpCommand                                           : Chemin complet vers la commande pg_dump
admin_ExportOptions                                                             : Options d'exportation
admin_AddDropDatabase                                                           : Ajouter ordres DROP DATABASE
admin_AddDropTable                                                              : Ajouter ordres DROP TABLE
admin_ExportStructure                                                           : Structure
admin_Datas                                                                     : Données
admin_NameColumn                                                                : Nomme les colonnes
admin_ExtendedInsert                                                            : Instructions INSERT étendues
admin_NoLockBeforeInsert                                                        : Pas d'instruction LOCK autour des INSERT
admin_DelayedInsert                                                             : Insertion avec délai
admin_EncodeBinariesInHexa                                                      : Encoder les champs binaires en hexadécimal
admin_IgnoreDuplicateRecords                                                    : Ignorer les erreurs de doublons (INSERT IGNORE)
admin_Yes                                                                       : Oui
admin_No                                                                        : Non
admin_AutoDetectLang                                                            : Détection auto (navigateur)
admin_FeatureDisabledInDemo                                                     : Fonction désactivée dans la démo
admin_Rights                                                                    : Permissions
admin_BoxesDesc                                                                 : Les boîtes sont des zones d'information réduites qui s'affichent sur certaines pages. Vous pouvez choisir ou non d'activer une boîte en sélectionnant la page cible et en cliquant sur 'Activer', ou en cliquant sur la poubelle pour la désactiver.
admin_OnlyActiveElementsAreShown                                                : Seuls les éléments en rapport avec un <a href="modules.php">module actif</a> sont présentés.
admin_ModulesDesc                                                               : Les modules Speedealing définissent les fonctionnalités disponibles dans l'application. Certains modules nécessitent des droits qu'il vous faudra affecter aux utilisateurs pour qu'ils puissent accéder à leurs fonctionnalités. Cliquez sur le bouton on/off de la colonne "Etat" pour activer un module/fonctionnalité.
admin_ModulesInterfaceDesc                                                      : Les modules d'interfaces sont des modules qui permettent de lier Speedealing à des systèmes, applications ou services externes.
admin_ModulesSpecialDesc                                                        : Les modules complémentaires sont des modules à usage très spécifique ou moins courant que les modules standards.
admin_ModulesJobDesc                                                            : Les modules métiers très spécifiques permettent une préconfiguration simplifiée de Speedealing pour un métier spécifique.
admin_ModulesMarketPlaceDesc                                                    : D'autres modules/extensions sont disponibles en téléchargement sur des sites externes sur Internet...
admin_ModulesMarketPlaces                                                       : Plus de modules...
admin_DoliStoreDesc                                                             : DoliStore, la place de marché officielle des modules et extensions complémentaires pour Speedealing ERP/CRM
admin_WebSiteDesc                                                               : Sites fournisseurs à consulter pour trouver plus de modules...
admin_URL                                                                       : Lien
admin_BoxesAvailable                                                            : Boîtes disponibles
admin_BoxesActivated                                                            : Boîtes activées
admin_ActivateOn                                                                : Activer sur
admin_ActiveOn                                                                  : Active sur
admin_SourceFile                                                                : Fichier source
admin_AutomaticIfJavascriptDisabled                                             : Automatique si Javascript désactivé
admin_AvailableOnlyIfJavascriptNotDisabled                                      : Disponible uniquement si Javascript non désactivé
admin_AvailableOnlyIfJavascriptAndAjaxNotDisabled                               : Disponible uniquement si Javascript non désactivé
admin_NotInstalled                                                              : Non installé
admin_Required                                                                  : Requis
admin_Security                                                                  : Sécurité
admin_Passwords                                                                 : Mots de passe
admin_DoNotStoreClearPassword                                                   : Ne pas stocker de mot de passe en clair dans la base (Activation recommandée)
admin_MainDbPasswordFileConfEncrypted                                           : Encrypter le mot de passe de la base dans le fichier conf.php (Activation recommandée)
admin_InstrucToEncodePass                                                       : Pour avoir le mot de passe de la base encodé dans le fichier de configuration <b>conf.php</b>, remplacer dans ce fichier la ligne<br><b>$dolibarr_main_db_pass="..."</b><br>par<br><b>$dolibarr_main_db_pass="crypted:%s"</b>
admin_InstrucToClearPass                                                        : Pour avoir le mot de passe de la base décodé (en clair) dans le fichier de configuration <b>conf.php</b>, remplacer dans ce fichier la ligne<br><b>$dolibarr_main_db_pass="crypted:..."</b><br>par<br><b>$dolibarr_main_db_pass="%s"</b>
admin_ProtectAndEncryptPdfFiles                                                 : Protection des pdf générés (Activation NON recommandée, rend inopérante la génération de PDF de masse)
admin_ProtectAndEncryptPdfFilesDesc                                             : La protection d'un document pdf laisse le document libre à la lecture et à l'impression avec tout logiciel de lecture PDF. Par contre, la modification et la copie deviennent impossible. Notez de plus que l'utilisation de cette option empêche la génération de pdf cumulés (comme pour le pdf global des impayés).
admin_Feature                                                                   : Fonction
admin_SpeedealingLicense                                                        : License
admin_SpeedealingProjectLeader                                                  : Project leader
admin_Developpers                                                               : Développeurs/contributeurs
admin_OtherDeveloppers                                                          : Autres développeurs/contributeurs
admin_OfficialWebSite                                                           : Site web officiel international
admin_OfficialWebSiteFr                                                         : Site web officiel francophone
admin_OfficialWiki                                                              : Wiki de documentation Speedealing
admin_OfficialDemo                                                              : Démo en ligne Speedealing
admin_OfficialMarketPlace                                                       : Place de marché officielle des modules et extensions complémentaires
admin_OfficialWebHostingService                                                 : Service d'hébergement officiel (SaaS)
admin_ForDocumentationSeeWiki                                                   : Pour la documentation utilisateur, développeur ou les FAQs,<br>consultez le wiki Speedealing:<br><b><a href="%s" target="_blank">%s</a></b>
admin_ForAnswersSeeForum                                                        : Pour tout autre question/aide, vous pouvez utiliser le forum Speedealing:<br><b><a href="%s" target="_blank">%s</a></b>
admin_HelpCenterDesc1                                                           : Cette application, indépendante de Speedealing, vous permet de vous aider à obtenir un service de support sur Speedealing.
admin_HelpCenterDesc2                                                           : Choisissez le service qui correspond à votre besoin en cliquant sur le lien adéquat (Certains de ces services ne sont disponibles qu'en <b>anglais</b>).
admin_CurrentTopMenuHandler                                                     : Gestionnaire menu haut courant
admin_CurrentLeftMenuHandler                                                    : Gestionnaire menu gauche courant
admin_CurrentMenuHandler                                                        : Gestionnaire menu courant
admin_CurrentSmartphoneMenuHandler                                              : Gestionnaire menu smartphone courant
admin_MeasuringUnit                                                             : Unité de mesure
admin_Emails                                                                    : Emails
admin_EMailsSetup                                                               : Configuration EMails
admin_EMailsDesc                                                                : Cette page permet de remplacer les paramètres PHP en rapport avec l'envoi de mails. Dans la plupart des cas sur des OS comme Unix/Linux, les paramètres PHP sont déjà corrects et cette page est inutile.
admin_MAIN_MAIL_SMTP_PORT                                                       : Port du serveur SMTP/SMTPS (Par défaut dans php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_SERVER                                                     : Nom host ou ip du serveur SMTP/SMTPS (Par défaut dans php.ini: <b>%s</b>)
admin_MAIN_MAIL_SMTP_PORT_NotAvailableOnLinuxLike                               : Port du serveur SMTP/SMTPS (Non défini dans le PHP sur les systèmes de type Unix)
admin_MAIN_MAIL_SMTP_SERVER_NotAvailableOnLinuxLike                             : Nom host ou ip du serveur SMTP/SMTPS (Non défini dans le PHP sur les systèmes de type Unix)
admin_MAIN_MAIL_EMAIL_FROM                                                      : EMail émetteur pour envoi emails automatiques (Par défaut dans php.ini: <b>%s</b>)
admin_MAIN_MAIL_ERRORS_TO                                                       : EMail utilisé pour les retours d'erreurs des mails envoyés
admin_MAIN_MAIL_AUTOCOPY_TO                                                     : Envoyer systématiquement une copie cachée des mails envoyés à
admin_MAIN_DISABLE_ALL_MAILS                                                    : Désactiver globalement tout envoi de mails (pour mode test ou démos)
admin_MAIN_MAIL_SENDMODE                                                        : Méthode d'envoi des mails
admin_MAIN_MAIL_SMTPS_ID                                                        : SMTP Authentification ID si authentification SMTP requise
admin_MAIN_MAIL_SMTPS_PW                                                        : SMTP Authentification Password si authentification SMTP requise
admin_MAIN_MAIL_EMAIL_TLS                                                       : Utilisation du cryptage TLS (SSL)
admin_MAIN_DISABLE_ALL_SMS                                                      : Désactiver globalement tout envoi de Sms (pour mode test ou démos)
admin_MAIN_SMS_SENDMODE                                                         : Méthode d'envoi des SMS
admin_MAIN_MAIL_SMS_FROM                                                        : Numéro de téléphone par défaut pour envoi Sms
admin_FeatureNotAvailableOnLinux                                                : Fonctionnalité non disponible sous systèmes Unix. Tester votre sendmail localement.
admin_SubmitTranslation                                                         : Si la traduction pour cette langue est incomplète ou si vous trouvez des erreurs, vous pouvez les corriger en éditant les fichiers dans le répertoire <b>langs/%s</b> et soumettre les modifications sur le forum www.Speedealing.fr.
admin_ModuleSetup                                                               : Configuration du module
admin_ModulesSetup                                                              : Configuration des modules
admin_ModuleFamilyBase                                                          : Système
admin_ModuleFamilyCrm                                                           : Gestion client
admin_ModuleFamilyProducts                                                      : Gestion produits
admin_ModuleFamilyHr                                                            : Ressources humaines
admin_ModuleFamilyProjects                                                      : Projets/Travail collaboratif
admin_ModuleFamilyOther                                                         : Modules : Autre
admin_ModuleFamilyTechnic                                                       : Outils multi-modules
admin_ModuleFamilyExperimental                                                  : Modules expérimentaux (ne pas utiliser en production)
admin_ModuleFamilyFinancial                                                     : Modules financiers (Compta/trésorerie)
admin_ModuleFamilyECM                                                           : Gestion Électronique de Documents (GED)
admin_MenuHandlers                                                              : Gestionnaires menu
admin_MenuAdmin                                                                 : Edition menu
admin_DoNotUseInProduction                                                      : Ne pas utiliser en production
admin_ThisIsProcessToFollow                                                     : Voici la procédure à suivre:
admin_StepNb                                                                    : Etape %s
admin_FindPackageFromWebSite                                                    : Recherche le package qui répond à votre besoin (par exemple sur le site web %s).
admin_DownloadPackageFromWebSite                                                : Télécharger le package.
admin_UnpackPackageInSpeedealingRoot                                            : Unpack package file into Speedealing's root directory <b>%s</b>
admin_SetupIsReadyForUse                                                        : L'installation est terminée et Speedealing est prêt à être utilisé avec le nouveau composant.
admin_NotExistsDirect                                                           : Il n'y a pas répertoire alternative.<br>
admin_InfDirAlt                                                                 : Depuis la version 3 est possible de définir un répertoire alternatif qui vous permet de stocker dans le même endroit les modules et thèmes personnalisés.<br>Il suffit de créer un répertoire à la racine de Speedealing (par exemple: custom).<br>
admin_InfDirExample                                                             : <br>Ensuite, declarons dans le fichier conf.php:<br> $dolibarr_main_url_root_alt='http://monserveur/custom'<br>$dolibarr_main_document_root_alt='/repertoire/de/dolibarr/htdocs/custom'<br>*Ces lignes sont commentées par "#" de décommenter suffit de supprimer le caractère.
admin_YouCanSubmitFile                                                          : Sélectionner le module:
admin_CurrentVersion                                                            : Version en cours de Speedealing
admin_CallUpdatePage                                                            : Appeler la page de l'outil de mise à jour de la structure et données de la base: %s.
admin_LastStableVersion                                                         : Dernière version stable disponible
admin_GenericMaskCodes                                                          : Vous pouvez saisir tout masque de numérotation. Dans ce masque, les balises suivantes peuvent être utilisées:<br><b>{000000}</b> correspond à un numéro qui sera incrémenté à chaque %s. Mettre autant de zéro que la longueur désirée du compteur. Le compteur sera complété par des 0 à gauche afin d'avoir autant de zéro que dans le masque.<br><b>{000000+000}</b> idem précédemment mais un offset correspondant au nombre à droite du + est appliqué dès la première %s.<br><b>{000000@x}</b> idem précédemment mais le compteur est remis à zéro le xème mois de l'année (x entre 1 et 12, ou 0 pour utiliser le mois de début d'exercice fiscal défini dans votre configuration). Si cette option est utilisée et x vaut 2 ou plus, alors la séquence {yy}{mm} ou {yyyy}{mm} est obligatoire. <br><b>{dd}</b> jour (01 à 31).<br><b>{mm}</b> mois (01 à 12).<br><b>{yy}</b>, <b>{yyyy}</b> ou <b>{y}</b> année sur 2, 4 ou 1 chiffres.<br>
admin_GenericMaskCodes2                                                         : <b>{cccc}</b> le code client sur n lettres<br><b>{cccc000}</b> le code client sur n lettres est suivi d'un compteur propre au client sans offset, complété par des zéros pour en avoir autant que dans le masque, et remis à zéro en même temps que le compteur global.<br><b>{tttt}</b> Le code type entreprise sur n caractères (voir dictionnaires-types de sociétés).<br>
admin_GenericMaskCodes3                                                         : Tout autre caractère dans le masque sera laissé inchangé.<br>Les espaces ne sont pas permis.<br>
admin_GenericMaskCodes4a                                                        : <u>Exemple sur la 99eme %s du tiers LaCompanie faite le 31/03/2007:</u><br>
admin_GenericMaskCodes4b                                                        : <u>Exemple sur un tiers créé le 31/03/2007:</u><br>
admin_GenericMaskCodes4c                                                        : <u>Exemple sur un produit/service créé le 31/03/2007:</u><br>
admin_GenericMaskCodes5                                                         : <b>ABC{yy}{mm}-{000000}</b> donnera <b>ABC0703-000099</b><br><b>{0000+100}-XXX/{dd}/YYY</b> donnera <b>0199-XXX/31/YYY</b>
admin_GenericNumRefModelDesc                                                    : Renvoie un numéro personnalisable selon un masque à définir.
admin_ServerAvailableOnIPOrPort                                                 : Serveur disponible à l'adresse <b>%s</b> sur le port <b>%s</b>
admin_ServerNotAvailableOnIPOrPort                                              : Serveur non disponible à l'adresse <b>%s</b> sur le port <b>%s</b>
admin_DoTestServerAvailability                                                  : Tester disponibilité serveur
admin_DoTestSend                                                                : Tester envoi
admin_DoTestSendHTML                                                            : Tester envoi HTML
admin_ErrorCantUseRazInStartedYearIfNoYearMonthInMask                           : Erreur, ne peut utiliser l'option @ si la séquence {yy}{mm} ou {yyyy}{mm} n'est pas dans le masque.
admin_UMask                                                                     : Paramètre UMask des nouveaux fichiers sous Unix/Linux/BSD.
admin_UMaskExplanation                                                          : Ce paramètre permet de définir les droits des fichiers créés sur le serveur par Speedealing (lors d'upload par exemple).<br>Ce doit être la valeur octale (par exemple 0666 signifie lecture/écriture pour tous).<br>Ce paramètre n'a aucun effet sur un serveur Windows.
admin_SeeWikiForAllTeam                                                         : Voir le wiki pour le détail de tous les acteurs et leur organisation
admin_UseACacheDelay                                                            : Délai de mise en cache de l'export en secondes (0 ou vide pour aucun cache)
admin_DisableLinkToHelpCenter                                                   : Cacher le lien "<b>Besoin d'un support ou aide</b>" sur la page de login
admin_DisableLinkToHelp                                                         : Cacher le lien "<b>%s Aide en ligne</b>" du menu gauche
admin_AddCRIfTooLong                                                            : Il n'y a pas de coupure de ligne automatique, aussi si votre texte est trop long sur les documents, il vous faudra ajouter par vous même des retours chariot dans la zone de saisie du texte
admin_ModuleDisabled                                                            : Module désactivé
admin_ModuleDisabledSoNoEvent                                                   : Module désactivé donc événement jamais créé
admin_ConfirmPurge                                                              : Êtes vous sûr de vouloir réaliser cette purge ?<br>Ceci effacera définitivement toutes vos données fichier (espace GED, pièces jointes, etc...).
admin_MinLength                                                                 : Longueur minimale
admin_LanguageFilesCachedIntoShmopSharedMemory                                  : Fichiers .lang en mémoire partagée
admin_ExamplesWithCurrentSetup                                                  : Exemples avec le paramétrage actif courant
admin_ListOfDirectories                                                         : Liste des répertoires des modèles OpenDocument
admin_ListOfDirectoriesForModelGenODT                                           : Liste des répertoires contenant des documents modèles OpenDocument.<br><br>Indiquer les chemins complets de répertoire.<br>Ajouter un retour à la ligne entre chaque répertoire.<br>Pour indiquer un répertoire du module GED, indiquer<br><b>DOL_DATA_ROOT/ecm/nomdurepertoireged</b><br><br>Les fichiers modèles dans ces répertoires doivent se terminer par <b>.odt</b>.
admin_NumberOfModelFilesFound                                                   : Nombre de fichiers modèles ODT trouvés dans ce(s) répertoire(s)
admin_ExampleOfDirectoriesForModelGen                                           : Exemples de syntaxe:<br>c:\mydir<br>/home/mydir<br>DOL_DATA_ROOT/ecm/ecmdir
admin_FollowingSubstitutionKeysCanBeUsed                                        : <br>Pour savoir comment rédiger ses modèles de document odt avant de les placer dans un de ces répertoires, consulter la documentation du wiki:
admin_FullListOnOnlineDocumentation                                             : http://wiki.dolibarr.org/index.php/Créer_un_modèle_de_document_ODT
admin_FirstnameNamePosition                                                     : Ordre affichage prénom/nom
admin_DescWeather                                                               : Les graphiques suivant seront affichées sur le tableau de bord si le nombre d'éléments en retard atteints ces valeurs:
admin_KeyForWebServicesAccess                                                   : Clé pour utiliser les Web Services (paramètre "dolibarrkey" dans les webservices)
admin_TestSubmitForm                                                            : Formulaire de test de saisie
admin_ThisForceAlsoTheme                                                        : Utiliser ce gestionnaire de menu force aussi le theme quelquesoit le choix de theme de l'utilisateur. De plus, ce gestionnaire de menu, spécialisé pour smartphone, ne fonctionne que sur certains téléphones. Utiliser un autre gestionnaire si vous constatez des problèmes.
admin_ThemeDir                                                                  : Répertoire des thèmes
admin_ConnectionTimeout                                                         : Timeout de connexion
admin_ResponseTimeout                                                           : Timeout de réponse
admin_SmsTestMessage                                                            : Message de test de __PHONEFROM__ vers __PHONETO__
admin_ModuleMustBeEnabledFirst                                                  : Le module <b>%s</b> doit etre activé pour utiliser cette fonction.
admin_SecurityToken                                                             : Clé de sécurisation des URLs
admin_NoSmsEngine                                                               : Aucun gestionnaire d'envoi de SMS n'est disponible. Les gestionnaires d'envois SMS ne sont pas installés en standard (car dépendent d'un fournisseur) mais vous pourrez en trouver depuis la plateforme %s
admin_PDF                                                                       : PDF
admin_PDFDesc                                                                   : Vous pouvez définir ici des options globales sur la génération des PDF
admin_PDFAddressForging                                                         : Règle de fabrication des zones adresses
admin_HideAnyVATInformationOnPDF                                                : Cacher toutes les informations en rapport avec la TVA sur les PDF générés
admin_HideDescOnPDF                                                             : Cacher la description des produits sur les PDF généres
admin_HideRefOnPDF                                                              : Cacher la référence des produits sur les PDF généres
admin_HideDetailsOnPDF                                                          : Cacher les détails des lignes de produits sur les PDF générés
admin_UrlGenerationParameters                                                   : Sécurisation des URLs
admin_SecurityTokenIsUnique                                                     : Utiliser un paramètre securekey unique pour chaque URL ?
admin_EnterRefToBuildUrl                                                        : Entrez la référence pour l'objet %s
admin_GetSecuredUrl                                                             : Obtenir l'URL calculée
admin_ButtonHideUnauthorized                                                    : Cacher les boutons non autorisés (au lieu de les voir grisés)
admin_TotalNumberOfActivatedModules                                             : Nombre total de modules fonctionnels activés: <b>%s</b>
admin_YouMustEnableOneModule                                                    : Vous devez activer au moins une fonctionnalité
admin_ModulesSystemTools                                                        : Outils Modules
admin_ProductVatMassChange                                                      : Modif TVA en masse
admin_ProductVatMassChangeDesc                                                  : Cette page permet de modifier les taux de TVA définis sur les produits ou services d'une valeur vers une autre. Attention, la modification est réalisée en masse sur toute la base de donnée.
admin_OldVATRates                                                               : Ancien taux de TVA
admin_NewVATRates                                                               : Nouveau taux de TVA
admin_PriceBaseTypeToChange                                                     : Modifier sur les prix dont la référence de base est le
admin_MassConvert                                                               : Convertir en masse
admin_String                                                                    : Chaine
admin_TextLong                                                                  : Texte long
admin_Int                                                                       : Numérique entier
admin_Float                                                                     : Décimal
admin_DateAndTime                                                               : Date et heure
admin_Structure                                                                 : Structure
admin_Module0Name                                                               : Utilisateurs & groupes
admin_Module0Desc                                                               : Gestion des utilisateurs et groupes
admin_Module1Name                                                               : Tiers
admin_Module1Desc                                                               : Gestion des tiers (sociétés, particuliers) et contacts
admin_Module2Name                                                               : Commercial
admin_Module2Desc                                                               : Gestion commerciale
admin_Module10Name                                                              : Comptabilité
admin_Module10Desc                                                              : Gestion simpliste de comptabilité (ventilation de factures et paiements uniquement)
admin_Module20Name                                                              : Propositions commerciales
admin_Module20Desc                                                              : Gestion des devis/propositions commerciales
admin_Module22Name                                                              : EMailings
admin_Module22Desc                                                              : Administration et envoi d'emails en masse
admin_Module23Name                                                              : Energie
admin_Module23Desc                                                              : Suivi de la consommation des énergies
admin_Module25Name                                                              : Commandes clients
admin_Module25Desc                                                              : Gestion des commandes clients
admin_Module30Name                                                              : Factures et avoirs
admin_Module30Desc                                                              : Gestion des factures et avoirs clients. Gestion des factures fournisseurs
admin_Module40Name                                                              : Fournisseurs
admin_Module40Desc                                                              : Gestion des fournisseurs et achats (commandes et factures)
admin_Module42Name                                                              : Logs et traces
admin_Module42Desc                                                              : Génération de logs (fichiers, syslog, ...)
admin_Module49Name                                                              : Éditeurs
admin_Module49Desc                                                              : Gestion des éditeurs
admin_Module50Name                                                              : Produits
admin_Module50Desc                                                              : Gestion des produits
admin_Module51Name                                                              : Publipostage
admin_Module51Desc                                                              : Administration et envoi de courriers papiers en masse
admin_Module52Name                                                              : Stocks de produits
admin_Module52Desc                                                              : Gestion des stocks de produits
admin_Module53Name                                                              : Services
admin_Module53Desc                                                              : Gestion des services
admin_Module54Name                                                              : Contrats
admin_Module54Desc                                                              : Gestion des contrats de services
admin_Module55Name                                                              : Codes-barres
admin_Module55Desc                                                              : Gestion des codes-barres
admin_Module56Name                                                              : Téléphonie
admin_Module56Desc                                                              : Gestion de la téléphonie
admin_Module57Name                                                              : Prélèvements
admin_Module57Desc                                                              : Gestion des prélèvements et retraits bancaires
admin_Module58Name                                                              : ClickToDial
admin_Module58Desc                                                              : Intégration d'un système de ClickToDial (Asterisk,...)
admin_Module59Name                                                              : Bookmark4u
admin_Module59Desc                                                              : Ajoute fonction pour générer un compte Bookmark4u depuis un compte Speedealing
admin_Module70Name                                                              : Interventions
admin_Module70Desc                                                              : Gestion des interventions chez les tiers
admin_Module75Name                                                              : Notes de frais et déplacements
admin_Module75Desc                                                              : Gestion des notes de frais et déplacements
admin_Module80Name                                                              : Expéditions
admin_Module80Desc                                                              : Gestion des expéditions et réceptions clients
admin_Module85Name                                                              : Banques et caisses
admin_Module85Desc                                                              : Gestion des comptes financiers de type Comptes bancaires, postaux ou Caisses liquides
admin_Module100Name                                                             : External site
admin_Module100Desc                                                             : Ajoute un site Web externe dans les menus Speedealing et l'affiche dans un frame Speedealing
admin_Module105Name                                                             : Mailman and Sip
admin_Module105Desc                                                             : Interface vers Mailman ou Spip pour le module Adhérent
admin_Module200Name                                                             : LDAP
admin_Module200Desc                                                             : Synchronisation avec un annuaire LDAP
admin_Module210Name                                                             : PostNuke
admin_Module210Desc                                                             : Intégration avec PostNuke
admin_Module240Name                                                             : Exports de données
admin_Module240Desc                                                             : Outil d'export de données Speedealing (via un assistant)
admin_Module250Name                                                             : Imports de données
admin_Module250Desc                                                             : Outil d'import de données dans Speedealing (via un assistant)
admin_Module310Name                                                             : Adhérents
admin_Module310Desc                                                             : Gestion des adhérents d'une association
admin_Module320Name                                                             : Fils RSS
admin_Module320Desc                                                             : Ajout de fils d'informations RSS dans les écrans Speedealing
admin_Module330Name                                                             : Bookmarks
admin_Module330Desc                                                             : Gestion des marque-pages
admin_Module400Name                                                             : Projets
admin_Module400Desc                                                             : Gestion des projets au sein des autres modules
admin_Module410Name                                                             : Webcalendar
admin_Module410Desc                                                             : Interface avec le calendrier Webcalendar
admin_Module420Name                                                             : Affaires
admin_Module420Desc                                                             : Gestion des affaires
admin_Module430Name                                                             : Gestion d'équipes
admin_Module430Desc                                                             : Gestion des objectifs
admin_Module500Name                                                             : Taxes, charges et dividendes
admin_Module500Desc                                                             : Gestion des taxes, charges sociales et dividendes
admin_Module600Name                                                             : Notifications
admin_Module600Desc                                                             : Envoi de notifications (par mail) sur certains événements métiers Speedealing, aux contacts de tiers
admin_Module700Name                                                             : Dons
admin_Module700Desc                                                             : Gestion des dons
admin_Module1400Name                                                            : Comptabilité
admin_Module1400Desc                                                            : Gestion de la comptabilité (doubles parties)
admin_Module1780Name                                                            : Catégories
admin_Module1780Desc                                                            : Gestion des catégories (produits, fournisseurs et clients)
admin_Module2000Name                                                            : Editeur WYSIWYG
admin_Module2000Desc                                                            : Permet la saisie de certaines zones de textes grace à un éditeur avancé
admin_Module2200Name                                                            : Droit de prêts
admin_Module2200Desc                                                            : Gestion du droit de prêts
admin_Module2300Name                                                            : Menus
admin_Module2300Desc                                                            : Administration des menus par base de données
admin_Module2400Name                                                            : Agenda
admin_Module2400Desc                                                            : Gestion des actions (événements et tâches) et de l'agenda
admin_Module2500Name                                                            : Gestion Electronique de Documents
admin_Module2500Desc                                                            : Permet de stocker et administrer une base de documents
admin_Module2600Name                                                            : WebServices
admin_Module2600Desc                                                            : Active le serveur de Web Services de Speedealing
admin_Module2700Name                                                            : Gravatar
admin_Module2700Desc                                                            : Utilise le service en ligne Gravatar (www.gravatar.com) pour afficher les photos d'utilisateurs/membres (qui se trouvent avec leurs e-mails). Besoin d'un accès Internet
admin_Module2900Name                                                            : GeoIPMaxmind
admin_Module2900Desc                                                            : Capacités de conversion GeoIP Maxmind
admin_Module5000Name                                                            : Multi-sociétés
admin_Module5000Desc                                                            : Permet de gérer plusieurs sociétés
admin_Module20000Name                                                           : Congès
admin_Module20000Desc                                                           : Déclaration et suivi des congès des employés
admin_Module50000Name                                                           : PayBox
admin_Module50000Desc                                                           : Module permettant d'offrir en ligne une page de paiement par carte de crédit avec PayBox
admin_Module50100Name                                                           : Point de vente
admin_Module50100Desc                                                           : Caisse enregistreuse de point de vente
admin_Module50200Name                                                           : Paypal
admin_Module50200Desc                                                           : Module permettant d'offrir en ligne une page de paiement par carte de crédit avec Paypal
admin_Module59000Name                                                           : Marges
admin_Module59000Desc                                                           : Module pour gérer les marges
admin_Module60000Name                                                           : Commissions
admin_Module60000Desc                                                           : Module pour gérer les commissions
admin_Permission11                                                              : Consulter les factures clients
admin_Permission12                                                              : Créer/modifier les factures clients
admin_Permission13                                                              : Dé-valider les factures clients
admin_Permission14                                                              : Valider les factures clients
admin_Permission15                                                              : Envoyer les factures clients par courriel
admin_Permission16                                                              : Émettre des paiements sur les factures clients
admin_Permission19                                                              : Supprimer les factures clients
admin_Permission21                                                              : Consulter les propositions commerciales
admin_Permission22                                                              : Créer/modifier les propositions commerciales
admin_Permission24                                                              : Valider les propositions commerciales
admin_Permission25                                                              : Envoyer les propositions commerciales
admin_Permission26                                                              : Clôturer les propositions commerciales
admin_Permission27                                                              : Supprimer les propositions commerciales
admin_Permission28                                                              : Exporter les propositions commerciales
admin_Permission31                                                              : Consulter les produits
admin_Permission32                                                              : Créer/modifier les produits
admin_Permission34                                                              : Supprimer les produits
admin_Permission36                                                              : Voir/gérer les produits cachés
admin_Permission38                                                              : Exporter les produits
admin_Permission41                                                              : Consulter les projets et tâches (partagés ou dont je suis contact)
admin_Permission42                                                              : Créer/modifier les projets et tâches (partagés ou dont je suis contact)
admin_Permission44                                                              : Supprimer les projets et tâches (partagés ou dont je suis contact)
admin_Permission61                                                              : Consulter les interventions
admin_Permission62                                                              : Créer/modifier les interventions
admin_Permission64                                                              : Supprimer les interventions
admin_Permission67                                                              : Exporter les interventions
admin_Permission71                                                              : Consulter les fiches adhérents
admin_Permission72                                                              : Créer/modifier les adhérents
admin_Permission74                                                              : Supprimer les adhérents
admin_Permission75                                                              : Configurer les types et attributs des adhérents
admin_Permission76                                                              : Exporter les adhérents
admin_Permission78                                                              : Consulter les cotisations
admin_Permission79                                                              : Créer/modifier les cotisations
admin_Permission81                                                              : Consulter les commandes clients
admin_Permission82                                                              : Créer/modifier les commandes clients
admin_Permission84                                                              : Valider les commandes clients
admin_Permission86                                                              : Envoyer les commandes clients
admin_Permission87                                                              : Clôturer les commandes clients
admin_Permission88                                                              : Annuler les commandes clients
admin_Permission89                                                              : Supprimer les commandes clients
admin_Permission91                                                              : Consulter les charges et la TVA
admin_Permission92                                                              : Créer/modifier les charges et la TVA
admin_Permission93                                                              : Supprimer les charges et la TVA
admin_Permission94                                                              : Exporter les charges
admin_Permission95                                                              : Consulter CA, bilans et résultats
admin_Permission96                                                              : Paramétrer la ventilation
admin_Permission97                                                              : Lire les lignes de factures
admin_Permission98                                                              : Ventiler les lignes de factures
admin_Permission101                                                             : Consulter les expéditions
admin_Permission102                                                             : Créer/modifier les expéditions
admin_Permission104                                                             : Valider les expéditions
admin_Permission109                                                             : Supprimer les expéditions
admin_Permission111                                                             : Consulter les comptes financiers (comptes bancaires, caisses)
admin_Permission112                                                             : Créer/modifier montant/supprimer écritures bancaires
admin_Permission113                                                             : Configurer les comptes financiers (créer, gérer les catégories)
admin_Permission114                                                             : Rapprocher les écritures bancaires
admin_Permission115                                                             : Exporter transactions et relevés
admin_Permission116                                                             : Saisir virements entre comptes
admin_Permission117                                                             : Gérer les envois de chèques
admin_Permission121                                                             : Consulter les tiers (sociétés) liés à l'utilisateur
admin_Permission122                                                             : Créer/modifier les tiers (sociétés) liés à l'utilisateur
admin_Permission125                                                             : Supprimer les tiers (sociétés) liés à l'utilisateur
admin_Permission126                                                             : Exporter les tiers (sociétés)
admin_Permission141                                                             : Consulter tous les projets et tâches (y compris privés dont je ne suis pas contact)
admin_Permission142                                                             : Créer/modifier tous les projets et tâches (y compris privés dont je ne suis pas contact)
admin_Permission144                                                             : Supprimer tous les projets et tâches (y compris privés dont je ne suis pas contact)
admin_Permission146                                                             : Consulter les fournisseurs
admin_Permission147                                                             : Consulter les stats
admin_Permission151                                                             : Consulter les prélèvements
admin_Permission152                                                             : Créer/modifier une demande de prélèvements
admin_Permission153                                                             : Emission des bons de prélèvements
admin_Permission154                                                             : Créditer/rejeter les bons de prélèvements
admin_Permission161                                                             : Consulter les contrats de services
admin_Permission162                                                             : Créer/modifier les contrats de services
admin_Permission163                                                             : Activer les services d'un contrat
admin_Permission164                                                             : Désactiver les services d'un contrat
admin_Permission165                                                             : Supprimer les contrats
admin_Permission171                                                             : Lire les déplacements
admin_Permission172                                                             : Créer/modifier les déplacements
admin_Permission173                                                             : Supprimer les déplacements
admin_Permission178                                                             : Exporter les déplacements
admin_Permission180                                                             : Consulter les fournisseurs
admin_Permission181                                                             : Consulter les commandes fournisseurs
admin_Permission182                                                             : Créer/modifier les commandes fournisseurs
admin_Permission183                                                             : Valider les commandes fournisseurs
admin_Permission184                                                             : Approuver les commandes fournisseurs
admin_Permission185                                                             : Passer les commandes fournisseurs
admin_Permission186                                                             : Accuser réception des commandes fournisseurs
admin_Permission187                                                             : Clôturer les commandes fournisseurs
admin_Permission188                                                             : Annuler les commandes fournisseurs
admin_Permission192                                                             : Créer des lignes
admin_Permission193                                                             : Résilier des lignes
admin_Permission194                                                             : Consulter la marge des lignes
admin_Permission202                                                             : Créer des liaisons ADSL
admin_Permission203                                                             : Demander la commande des liaisons
admin_Permission204                                                             : Commander les liaisons
admin_Permission205                                                             : Gérer les liaisons
admin_Permission206                                                             : Consulter les liaisons
admin_Permission211                                                             : Consulter la téléphonie
admin_Permission212                                                             : Commander les lignes
admin_Permission213                                                             : Activer une ligne
admin_Permission214                                                             : Configurer la téléphonie
admin_Permission215                                                             : Configurer les fournisseurs
admin_Permission221                                                             : Consulter les mailings
admin_Permission222                                                             : Créer/modifier les mailings (sujet, destinataires, etc.)
admin_Permission223                                                             : Valider les mailings (permet leur envoi)
admin_Permission229                                                             : Supprimer les mailings
admin_Permission237                                                             : Visualiser les destinataires et les infos
admin_Permission238                                                             : Envoyer les mailings manuellement
admin_Permission239                                                             : Supprimer les mailings après leur validation ou leur envoi
admin_Permission241                                                             : Lire les catégories
admin_Permission242                                                             : Créer/modifier les catégories
admin_Permission243                                                             : Supprimer les catégories
admin_Permission244                                                             : Voir le contenu des catégories cachées
admin_Permission251                                                             : Consulter les autres utilisateurs, les groupes et leurs permissions
admin_PermissionAdvanced251                                                     : Consulter les autres utilisateurs
admin_Permission252                                                             : Consulter les permissions des autres utilisateurs
admin_Permission253                                                             : Créer/modifier les autres utilisateurs, les groupes et leurs permissions
admin_PermissionAdvanced253                                                     : Créer/modifier les utilisateurs internes/externes et leurs permissions
admin_Permission254                                                             : Créer/modifier les utilisateurs externes seulement
admin_Permission255                                                             : Modifier le mot de passe des autres utilisateurs
admin_Permission256                                                             : Supprimer ou désactiver les autres utilisateurs
admin_Permission262                                                             : Étendre l'accès à tous les tiers (Pas seulement ceux liés à l'utilisateur). Non effectif pour utilisateurs externes (toujours limité à eux-même).
admin_Permission271                                                             : Consulter le CA
admin_Permission272                                                             : Consulter les factures
admin_Permission273                                                             : Émettre les factures
admin_Permission281                                                             : Consulter les contacts
admin_Permission282                                                             : Créer/modifier les contacts
admin_Permission283                                                             : Supprimer les contacts
admin_Permission286                                                             : Exporter les contacts
admin_Permission291                                                             : Consulter les tarifs
admin_Permission292                                                             : Définir les permissions sur les tarifs
admin_Permission293                                                             : Modifier les tarifs clients
admin_Permission300                                                             : Consulter les codes-barres
admin_Permission301                                                             : Créer/modifier les codes-barres
admin_Permission302                                                             : Supprimer les codes-barres
admin_Permission311                                                             : Consulter les services
admin_Permission312                                                             : Affecter des services à un contrat
admin_Permission331                                                             : Lire les bookmarks
admin_Permission332                                                             : Créer/modifier les bookmarks
admin_Permission333                                                             : Supprimer les bookmarks
admin_Permission341                                                             : Consulter ses propres permissions
admin_Permission342                                                             : Créer/modifier ses propres infos utilisateur
admin_Permission343                                                             : Modifier son propre mot de passe
admin_Permission344                                                             : Modifier ses propres permissions
admin_Permission351                                                             : Consulter les groupes
admin_Permission352                                                             : Consulter les permissions des groupes
admin_Permission353                                                             : Créer/modifier les groupes et leurs permissions
admin_Permission354                                                             : Supprimer ou désactiver les groupes
admin_Permission358                                                             : Exporter les utilisateurs
admin_Permission401                                                             : Consulter les avoirs
admin_Permission402                                                             : Créer/modifier les avoirs
admin_Permission403                                                             : Valider les avoirs
admin_Permission404                                                             : Supprimer les avoirs
admin_Permission531                                                             : Consulter les services
admin_Permission532                                                             : Créer/modifier les services
admin_Permission534                                                             : Supprimer les services
admin_Permission536                                                             : Voir/gérer les services cachés
admin_Permission538                                                             : Exporter les services
admin_Permission701                                                             : Consulter les dons
admin_Permission702                                                             : Créer/modifier les dons
admin_Permission703                                                             : Supprimer les dons
admin_Permission1001                                                            : Consulter les stocks
admin_Permission1002                                                            : Créer/Modifier les stocks
admin_Permission1003                                                            : Supprimer les stocks
admin_Permission1004                                                            : Consulter les mouvements de stocks
admin_Permission1005                                                            : Créer/modifier les mouvements de stocks
admin_Permission1101                                                            : Consulter les bons de livraison
admin_Permission1102                                                            : Créer/modifier les bons de livraison
admin_Permission1104                                                            : Valider les bons de livraison
admin_Permission1109                                                            : Supprimer les bons de livraison
admin_Permission1181                                                            : Consulter les fournisseurs
admin_Permission1182                                                            : Consulter les commandes fournisseur
admin_Permission1183                                                            : Créer les commandes fournisseur
admin_Permission1184                                                            : Valider les commandes fournisseur
admin_Permission1185                                                            : Approuver les commandes fournisseur
admin_Permission1186                                                            : Commander les commandes fournisseur
admin_Permission1187                                                            : Accuser réception des commandes fournisseur
admin_Permission1188                                                            : Supprimer les commandes fournisseur
admin_Permission1201                                                            : Récupérer le résultat d'un export
admin_Permission1202                                                            : Créer/Modifier un export
admin_Permission1231                                                            : Consulter les factures fournisseur
admin_Permission1232                                                            : Créer une facture fournisseur
admin_Permission1233                                                            : Valider une facture fournisseur
admin_Permission1234                                                            : Supprimer une facture fournisseur
admin_Permission1235                                                            : Envoyer les factures fournisseur par courriel
admin_Permission1236                                                            : Exporter les factures fournisseurs, attributs et règlements
admin_Permission1237                                                            : Exporter les commande fournisseurs, attributs
admin_Permission1251                                                            : Lancer des imports de masse dans la base (chargement de données)
admin_Permission1321                                                            : Exporter les factures clients, attributs et règlements
admin_Permission1401                                                            : Lire le plan de compte
admin_Permission1402                                                            : Créer/modifier un plan de compte
admin_Permission1403                                                            : Clôturer un plan de compte
admin_Permission1411                                                            : Lire les mouvements comptables
admin_Permission1412                                                            : Créer/modifier/annuler les mouvements comptables
admin_Permission1415                                                            : Lire CA, bilans, résultats, journaux, grands livres
admin_Permission1421                                                            : Exporter les commandes clients et attributs
admin_Permission2401                                                            : Lire les actions (événements ou tâches) liées à son compte
admin_Permission2402                                                            : Créer/modifier les actions (événements ou tâches) liées à son compte
admin_Permission2403                                                            : Supprimer les actions (événements ou tâches) liées à son compte
admin_Permission2411                                                            : Lire les actions (événements ou tâches) des autres
admin_Permission2412                                                            : Créer/modifier les actions (événements ou tâches) pour les autres
admin_Permission2413                                                            : Supprimer les actions (événements ou tâches) pour les autres
admin_Permission2501                                                            : Lire/Récupérer les documents
admin_Permission2502                                                            : Récupérer les documents
admin_Permission2503                                                            : Soumettre ou supprimer des documents
admin_Permission2515                                                            : Administrer les rubriques de documents
admin_Permission2801                                                            : Use FTP client in read mode (browse and download only)
admin_Permission2802                                                            : Use FTP client in write mode (delete or upload files)
admin_Permission50101                                                           : Utiliser Point de vente
admin_Permission50201                                                           : Consulter les transactions
admin_Permission50202                                                           : Importer les transactions
admin_DictionnaryCompanyType                                                    : Types de sociétés
admin_DictionnaryCompanyJuridicalType                                           : Formes juridiques
admin_DictionnaryProspectLevel                                                  : Niveau de potentiel des prospects
admin_DictionnaryCanton                                                         : Départements/Provinces/Cantons
admin_DictionnaryRegion                                                         : Régions
admin_DictionnaryCountry                                                        : Pays
admin_DictionnaryCurrency                                                       : Monnaies
admin_DictionnaryCivility                                                       : Titres de civilité
admin_DictionnaryActions                                                        : Liste des types d'événements de l'agenda
admin_DictionnarySocialContributions                                            : Types de charges sociales
admin_DictionnaryVAT                                                            : Taux de TVA (ou de taxes de ventes US)
admin_DictionnaryPaymentConditions                                              : Conditions de règlement
admin_DictionnaryPaymentModes                                                   : Modes de paiements
admin_DictionnaryTypeContact                                                    : Types de contacts
admin_DictionnaryEcotaxe                                                        : Barèmes Eco-participation (DEEE)
admin_DictionnaryPaperFormat                                                    : Format papiers
admin_DictionnaryFees                                                           : Types de déplacement et notes de frais
admin_DictionnarySendingMethods                                                 : Méthodes d'expédition
admin_DictionnaryStaff                                                          : Effectifs
admin_DictionnaryAvailability                                                   : Délai de livraison
admin_DictionnaryOrderMethods                                                   : Méthodes de commandes
admin_DictionnarySource                                                         : Origines des propales/commandes
admin_DictionnaryAccountancyplan                                                : Plan comptable
admin_DictionnaryAccountancysystem                                              : Modèles de plan comptable
admin_SetupSaved                                                                : Configuration sauvegardée
admin_BackToModuleList                                                          : Retour liste des modules
admin_BackToDictionnaryList                                                     : Retour liste des dictionnaires
admin_VATReceivedOnly                                                           : Taux spécial non facturé
admin_VATManagement                                                             : Gestion TVA
admin_VATIsUsedDesc                                                             : Le taux de TVA proposé par défaut lors de la création de propale, facture, commande, etc... répond à la règle standard suivante:<br>Si vendeur non assujetti à TVA, TVA par défaut=0. Fin de règle.<br>Si le (pays vendeur=pays acheteur) alors TVA par défaut=TVA du produit vendu. Fin de règle.<br>Si vendeur et acheteur dans Communauté européenne et bien vendu= moyen de transport neuf (auto, bateau, avion), TVA par défaut=0 (La TVA doit être payée par acheteur au centre d'impôts de son pays et non au vendeur). Fin de règle.<br>Si vendeur et acheteur dans Communauté européenne et acheteur= particulier alors TVA par défaut=TVA du produit vendu. Fin de règle.<br>Si vendeur et acheteur dans Communauté européenne et acheteur= entreprise alors TVA par défaut=0. Fin de règle.<br>Sinon TVA proposée par défaut=0. Fin de règle.<br>
admin_VATIsNotUsedDesc                                                          : Le taux de TVA proposé par défaut est 0. C'est le cas d'associations, particuliers ou certaines petites sociétés.
admin_VATIsUsedExampleFR                                                        : En France, il s'agit des sociétés ou organismes ayant choisi un régime fiscale réel (Réel simplifié ou Réel normal), régime dans lequel la TVA est déclarée.
admin_VATIsNotUsedExampleFR                                                     : En France, il s'agit des associations ne déclarant pas de TVA ou sociétés, organismes ou professions libérales ayant choisi le régime fiscal micro entreprise (TVA en franchise) et payant une TVA en franchise sans faire de déclaration de TVA. Ce choix fait de plus apparaitre la mention "TVA non applicable - art-293B du CGI" sur les factures.
admin_LocalTax1ManagementES                                                     : Gestion RE
admin_LocalTax1IsUsedDescES                                                     : Le taux de RE proposé par défaut lors de la création de propale, facture, commande, etc... répond à la règle standard suivante:<br>Si acheteur non assujetti à RE, RE par défaut=0. Fin de règle.<br>Si acheteur assujetti à RE alors RE par défaut. Fin de règle.<br>
admin_LocalTax1IsNotUsedDescES                                                  : Le taux de RE proposé par défaut est 0. Fin de règle.
admin_LocalTax1IsUsedExampleES                                                  : En Espagne, ce sont des professionnels sous réserve de certaines sections spécifiques de l'IAE Espagnol.
admin_LocalTax1IsNotUsedExampleES                                               : En Espagne, ce sont des sociétés en commandite, les sociétés anonymes, etc... et les individus (autonomes) sous réserve de certaines sections de l'IAE Espagnol.
admin_LocalTax2ManagementES                                                     : Gestion IRPF
admin_LocalTax2IsUsedDescES                                                     : Le IRPF proposé par défaut lors de la création de propale, facture, commande, etc... répond à la règle standard suivante:<br>Si vendeur non assujetti à IRPF, IRPF par défaut=0. Fin de règle.<br>Si vendeur assujetti à IRPF alors IRPF par défaut. Fin de règle.<br>
admin_LocalTax2IsNotUsedDescES                                                  : Le IRPF proposé par défaut est 0. Fin de règle.
admin_LocalTax2IsUsedExampleES                                                  : En Espagne, ce sont des professionnels autonomes et indépendants qui offrent des services, et des sociétés qui ont choisi le système fiscal du module.
admin_LocalTax2IsNotUsedExampleES                                               : En Espagne, ce sont des sociétés qui ne sont pas soumises au système fiscal du module.
admin_LabelUsedByDefault                                                        : Libellé qui sera utilisé si aucune traduction n'est trouvée pour ce code
admin_LabelOnDocuments                                                          : Libellé sur documents
admin_NbOfDays                                                                  : Nbre de jours
admin_AtEndOfMonth                                                              : En fin de mois
admin_Offset                                                                    : Décalage
admin_AlwaysActive                                                              : Toujours actif
admin_UpdateRequired                                                            : Votre système nécessite une mise à jour. Pour cela cliquez sur <a href="%s">Mettre à jour</a>.
admin_Upgrade                                                                   : Mise à jour
admin_MenuUpgrade                                                               : Mise à jour / extension
admin_AddExtensionThemeModuleOrOther                                            : Ajout extension (thème, module, ...)
admin_WebServer                                                                 : Serveur Web
admin_DocumentRootServer                                                        : Répertoire racine des pages web
admin_DataRootServer                                                            : Répertoire racine des fichiers de données
admin_IP                                                                        : IP
admin_Port                                                                      : Port
admin_VirtualServerName                                                         : Nom du serveur virtuel
admin_AllParameters                                                             : Tous les paramètres
admin_OS                                                                        : OS
admin_Php                                                                       : Php
admin_PhpEnv                                                                    : Env
admin_PhpModules                                                                : Modules
admin_PhpConf                                                                   : Conf
admin_PhpWebLink                                                                : Lien Web-Php
admin_Pear                                                                      : Pear
admin_PearPackages                                                              : Packages Pear
admin_Database                                                                  : Base de données
admin_DatabaseServer                                                            : Host de la base de données
admin_DatabaseName                                                              : Nom de la base de données
admin_DatabasePort                                                              : Port de la base de données
admin_DatabaseUser                                                              : Login de la base de données
admin_DatabasePassword                                                          : Mot de passe de la base de données
admin_DatabaseConfiguration                                                     : Configuration de la base de données
admin_Tables                                                                    : Tables
admin_TableName                                                                 : Nom de la table
admin_TableLineFormat                                                           : Format lignes
admin_NbOfRecord                                                                : Nb d'enr.
admin_Constraints                                                               : Contraintes
admin_ConstraintsType                                                           : Type de contrainte
admin_ConstraintsToShowOrNotEntry                                               : Contrainte pour afficher ou non le menu
admin_AllMustBeOk                                                               : Toutes doivent être respectées
admin_Host                                                                      : Serveur
admin_DriverType                                                                : Type du driver
admin_SummarySystem                                                             : Résumé des informations systèmes Speedealing
admin_SummaryConst                                                              : Liste de tous les paramètres de configuration Speedealing
admin_SystemUpdate                                                              : Mise à jour du système
admin_SystemSuccessfulyUpdate                                                   : Votre système a été mis à jour avec succès
admin_MenuCompanySetup                                                          : Société/Institution
admin_MenuNewUser                                                               : Nouvel utilisateur
admin_MenuTopManager                                                            : Gestionnaire du menu haut
admin_MenuLeftManager                                                           : Gestionnaire du menu gauche
admin_MenuManager                                                               : Gestionnaire du menu standard
admin_MenuSmartphoneManager                                                     : Gestionnaire du menu smartphone
admin_DefaultMenuTopManager                                                     : Gestionnaire du menu haut
admin_DefaultMenuLeftManager                                                    : Gestionnaire du menu gauche
admin_DefaultMenuManager                                                        : Gestionnaire du menu standard
admin_DefaultMenuSmartphoneManager                                              : Gestionnaire du menu smartphone
admin_Skin                                                                      : Thème visuel
admin_DefaultSkin                                                               : Thème visuel par défaut
admin_MaxSizeList                                                               : Longueur maximale des listes
admin_DefaultMaxSizeList                                                        : Longueur maximale par défaut des listes
admin_MessageOfDay                                                              : Message du jour
admin_MessageLogin                                                              : Message page login
admin_PermanentLeftSearchForm                                                   : Zone de recherche permanente du menu de gauche
admin_DefaultLanguage                                                           : Langue par défaut
admin_EnableMultilangInterface                                                  : Activer l'interface multi-langage
admin_EnableShowLogo                                                            : Afficher le logo dans le menu gauche
admin_SystemSuccessfulyUpdated                                                  : Votre système a été correctement mis à jour
admin_CompanyInfo                                                               : Informations sur la société/institution
admin_CompanyIds                                                                : Identifiants règlementaires
admin_CompanyName                                                               : Nom/Enseigne/Raison sociale
admin_CompanyAddress                                                            : Adresse
admin_CompanyZip                                                                : Code postal
admin_CompanyTown                                                               : Ville
admin_CompanyCountry                                                            : Pays
admin_CompanyCurrency                                                           : Devise principale
admin_DoNotShow                                                                 : Ne pas afficher
admin_DoNotSuggestPaymentMode                                                   : Ne pas suggérer
admin_NoActiveBankAccountDefined                                                : Aucun compte bancaire actif défini
admin_OwnerOfBankAccount                                                        : Propriétaire du compte %s
admin_BankModuleNotActive                                                       : Module comptes bancaires non activé
admin_ShowBugTrackLink                                                          : Afficher le lien "Signaler un bug"
admin_ShowWorkBoard                                                             : Affiche le tableau de bord de travail sur page accueil
admin_Alerts                                                                    : Alertes
admin_Delays                                                                    : Délais
admin_DelayBeforeWarning                                                        : Délai avant alerte
admin_DelaysBeforeWarning                                                       : Délais avant alerte
admin_DelaysOfToleranceBeforeWarning                                            : Délais de tolérance avant alerte
admin_DelaysOfToleranceDesc                                                     : Cet écran permet de définir les délais de tolérance après lesquels une alerte sera signalée à l'écran par le picto %s, sur chaque élément en retard.
admin_Delays_MAIN_DELAY_ACTIONS_TODO                                            : Tolérance de retard avant alerte (en jours) sur actions planifiées non réalisées
admin_Delays_MAIN_DELAY_ORDERS_TO_PROCESS                                       : Tolérance de retard avant alerte (en jours) sur commandes clients non traitées
admin_Delays_MAIN_DELAY_SUPPLIER_ORDERS_TO_PROCESS                              : Tolérance de retard avant alerte (en jours) sur commandes fournisseurs non traitées
admin_Delays_MAIN_DELAY_PROPALS_TO_CLOSE                                        : Tolérance de retard avant alerte (en jours) sur propales à cloturer
admin_Delays_MAIN_DELAY_PROPALS_TO_BILL                                         : Tolérance de retard avant alerte (en jours) sur propales non facturées
admin_Delays_MAIN_DELAY_NOT_ACTIVATED_SERVICES                                  : Tolérance de retard avant alerte (en jours) sur services à activer
admin_Delays_MAIN_DELAY_RUNNING_SERVICES                                        : Tolérance de retard avant alerte (en jours) sur services expirés
admin_Delays_MAIN_DELAY_SUPPLIER_BILLS_TO_PAY                                   : Tolérance de retard avant alerte (en jours) sur factures fournisseur impayées
admin_Delays_MAIN_DELAY_CUSTOMER_BILLS_UNPAYED                                  : Tolérance de retard avant alerte (en jours) sur factures client impayées
admin_Delays_MAIN_DELAY_TRANSACTIONS_TO_CONCILIATE                              : Tolérance de retard avant alerte (en jours) sur rapprochements bancaires à faire
admin_Delays_MAIN_DELAY_MEMBERS                                                 : Tolérance de retard avant alerte (en jours) sur cotisations adhérents en retard
admin_Delays_MAIN_DELAY_CHEQUES_TO_DEPOSIT                                      : Tolérance de retard avant alerte (en jours) sur chèques à déposer
admin_SetupDescription1                                                         : Toutes les options de l'espace configuration sont des options permettant de configurer Dolibarr avant de commencer son utilisation.
admin_SetupDescription2                                                         : Les 2 étapes indispensables de configuration sont les 2 premières dans le menu gauche, à savoir, la configuration de la société/institution et la configuration des modules:
admin_SetupDescription3                                                         : Les données du menu <b>Configuration -> Société/institution</b> sont requises car les informations saisies sont utilisées dans la plupart des écrans, en affichage, ou pour modifier le comportement de Speedealing (comme par exemple des fonctions qui dépendent de votre pays).
admin_SetupDescription4                                                         : Les données du menu <b>Configuration -> Modules</b> sont indispensables car Speedealing ERP/CRM est constitué d'un ensemble de modules tous plus ou moins indépendants. C'est après avoir activé les modules qui vous intéressent que vous verrez apparaitre les fonctionnalités dans les menus.
admin_SetupDescription5                                                         : Les autres entrées de configuration gèrent des paramètres facultatifs.
admin_EventsSetup                                                               : Configuration du traçage des événements
admin_LogEvents                                                                 : Événements d'audit de sécurité
admin_Audit                                                                     : Audit
admin_InfoSpeedealing                                                           : Infos Speedealing
admin_InfoOS                                                                    : Infos OS
admin_InfoWebServer                                                             : Infos web server
admin_InfoDatabase                                                              : Infos base de donnée
admin_InfoPHP                                                                   : Infos PHP
admin_ListEvents                                                                : Audit événements
admin_ListOfSecurityEvents                                                      : Liste des événements de sécurité Speedealing
admin_SecurityEventsPurged                                                      : Evenement de sécurité purgés
admin_LogEventDesc                                                              : Vous pouvez activer ici, le traçage des événements d'audit de sécurité. Cet historique est consultable aux administrateurs dans le menu <b>Outils systèmes - Audit</b>. Attention, cette fonctionnalité peut consommer un gros volume de données.
admin_AreaForAdminOnly                                                          : Ces fonctions ne sont accessibles qu'à un utilisateur administrateur.
admin_SystemInfoDesc                                                            : Les informations systèmes sont des informations techniques diverses accessibles en lecture seule aux administrateurs uniquement.
admin_SystemAreaForAdminOnly                                                    : Cet espace n'est accessible qu'aux utilisateurs de type administrateurs. Aucune permission Speedealing ne permet d'étendre le cercle des utilisateurs autorisés à cet espace.
admin_CompanyFundationDesc                                                      : Éditez sur cette page toutes les informations connues sur la société ou association que vous devez gérer (pour cela cliquer sur le bouton "Modifier" en bas de page)
admin_DisplayDesc                                                               : Vous pouvez choisir ici tous les paramètres liés à l'apparence de Speedealing
admin_AvailableModules                                                          : Modules disponibles
admin_ToActivateModule                                                          : Pour activer des modules, aller dans l'espace Configuration (Accueil->Configuration->Modules).
admin_SessionTimeOut                                                            : Time out des sessions
admin_SessionExplanation                                                        : Ce nombre garanti que la session n'expire pas avant ce délai. Mais la gestion de session PHP ne garantie pas que la session expire après ce délai: Ce sera le cas si un système de nettoyage des caches sessions est en place.<br>Note: Sans mécanisme spécial, le mécanisme interne à PHP nettoie la session tous les <b>%s/%s</b> accès environ mais uniquement lors d'accès fait par d'autres sessions.
admin_TriggersAvailable                                                         : Triggers disponibles
admin_TriggersDesc                                                              : Les triggers sont des fichiers qui, une fois déposés dans le répertoire <b>htdocs/core/triggers</b>, modifient le comportement du workflow de Speedealing. Ils réalisent des actions supplémentaires, déclenchées par les événements Speedealing (création société, validation facture, clôture contrat...).
admin_TriggerDisabledByName                                                     : Triggers de ce fichier désactivés par le suffix <b>-NORUN</b> dans le nom du fichier.
admin_TriggerDisabledAsModuleDisabled                                           : Triggers de ce fichier désactivés car le module <b>%s</b> n'est pas actif.
admin_TriggerAlwaysActive                                                       : Triggers de ce fichier toujours actifs, quelque soient les modules Speedealing activés.
admin_TriggerActiveAsModuleActive                                               : Triggers de ce fichier actifs car le module <b>%s</b> est actif.
admin_GeneratedPasswordDesc                                                     : Definissez ici quelle règle vous voulez utiliser pour générer les mots de passe quand vous demandez à fabriquer un nouveau mot de passe
admin_DictionnaryDesc                                                           : Définissez ici les données de référence. Vous pouvez compléter/modifier les données prédéfinies avec les vôtres.
admin_ConstDesc                                                                 : Cet écran permet d'éditer tout autre paramètre non éditable dans les pages précédentes. Ce sont en général des paramètres réservés aux développeurs avancés ou utilisés pour du dépannage.
admin_OnceSetupFinishedCreateUsers                                              : Attention, vous êtes sous un compte administrateur de Speedealing. Les administrateurs sont utilisés pour configurer Speedealing. Pour une utilisation courante de Speedealing, il est recommandé d'utiliser un compte non administrateur créé depuis le menu "Utilisateurs & Groupes".
admin_MiscellanousDesc                                                          : Définissez ici les autres paramètres en rapport avec la sécurité.
admin_LimitsSetup                                                               : Configuration des limites et précisions
admin_LimitsDesc                                                                : Vous pouvez définir ici les limites, précisions et optimisations utilisées par Speedealing
admin_MAIN_MAX_DECIMALS_UNIT                                                    : Nombre de décimales maximum pour les prix unitaires
admin_MAIN_MAX_DECIMALS_TOT                                                     : Nombre de décimales maximum pour les prix totaux
admin_MAIN_MAX_DECIMALS_SHOWN                                                   : Nombre de décimales maximum pour les montant affichés à l'écran (Mettre <b>...</b> après ce nombre max si vous voulez voir <b>...</b> quand le nombre est tronqué à l'affichage écran)
admin_MAIN_DISABLE_PDF_COMPRESSION                                              : Utiliser la compression PDF pour les fichiers PDF générés.
admin_MAIN_ROUNDING_RULE_TOT                                                    : Taille du pas des arrondis (pour les très rares pays qui arrondissent sur une autre base que la base 10)
admin_UnitPriceOfProduct                                                        : Prix unitaire HT d'un produit
admin_TotalPriceAfterRounding                                                   : Prix total (HT/TVA/TTC) après arrondis
admin_ParameterActiveForNextInputOnly                                           : Paramètre effectif pour les prochaines saisies uniquement
admin_NoEventOrNoAuditSetup                                                     : Aucun événement d'audit de sécurité n'a été enregistré. Ceci peut être normal si l'audit n'a pas été activé dans la configuration - sécurité - audit.
admin_NoEventFoundWithCriteria                                                  : Aucun événement d'audit de sécurité trouvé avec ces critères.
admin_SeeLocalSendMailSetup                                                     : Voir la configuration locale de sendmail
admin_BackupDesc                                                                : Pour réaliser une sauvegarde complète de Speedealing, vous devez:
admin_BackupDesc2                                                               : * Sauvegarder le contenu du répertoire document (<b>%s</b>) qui contient tous les fichiers uploadés ou générés (en zippant le répertoire par exemple).
admin_BackupDesc3                                                               : * Sauvegarder le contenu de votre base de données dans un fichier dump. Pour cela vous pouvez utiliser l'assistant ci-dessous.
admin_BackupDescX                                                               : Le répertoire archivé devra être placé en lieu sûr.
admin_BackupDescY                                                               : Le fichier dump généré devra être placé en lieu sûr.
admin_BackupPHPWarning                                                          : Backup can't be guaranted with this method. Prefer previous one
admin_RestoreDesc                                                               : Pour restaurer une sauvegarde de Speedealing, vous devez:
admin_RestoreDesc2                                                              : * Reprendre le fichier archive (fichier zip par exemple) du répertoire documents et en extraire l'arborescence dans le répertoire documents d'une nouvelle installation de Speedealing ou dans le répertoire documents de cette installation (<b>%s</b>).
admin_RestoreDesc3                                                              : * Recharger depuis le fichier dump sauvegardé, la base de données d'une nouvelle installation de Speedealing ou de cette installation. Attention, une fois la restauration faite, il faudra utiliser un login/mot de passe administrateur existant à l'époque de la sauvegarde pour se connecter. Pour restaurer la base dans l'installation actuelle, vous pouvez utiliser l'assistant suivant.
admin_RestoreMySQL                                                              : MySQL import
admin_ForcedToByAModule                                                         : Cette règle est forcée à <b>%s</b> par un des modules activés
admin_PreviousDumpFiles                                                         : Fichiers disponibles de sauvegarde de la base de données
admin_WeekStartOnDay                                                            : Premier jour de la semaine
admin_RunningUpdateProcessMayBeRequired                                         : Le lancement du processus de mise à jour semble requis (La version des programmes %s diffère de la version de la base %s)
admin_YouMustRunCommandFromCommandLineAfterLoginToUser                          : Vous devez exécuter la commande sous un shell après vous être logués avec le compte <b>%s</b> ou ajouter -W à la fin de la commande pour fournir le mot de passe de <b>%s</b>.
admin_YourPHPDoesNotHaveSSLSupport                                              : Fonctions SSL non présentes dans votre PHP
admin_DownloadMoreSkins                                                         : + de thèmes à télécharger
admin_SimpleNumRefModelDesc                                                     : Renvoie le numéro sous la forme %syymm-nnnn où yy est l'année, mm le mois et nnnn un compteur séquentiel sans rupture et sans remise à 0.
admin_ShowProfIdInAddress                                                       : Afficher l'identifiant professionnel dans les adresses sur les documents
admin_TranslationUncomplete                                                     : Traduction partielle
admin_SomeTranslationAreUncomplete                                              : Certaines langues sont traduites partiellement ou peuvent contenir des erreurs. Si vous en détectez, vous pouvez soumettre vos corrections sur <a href="https://www.transifex.com/projects/p/speedealing/" target="_blank">https://www.transifex.com/projects/p/speedealing/</a>.
admin_MenuUseLayout                                                             : Rendre le menu gauche cachable (L'option javascript ne doit pas avoir été désactivée)
admin_MAIN_DISABLE_METEO                                                        : Désactiver la vue météo
admin_TestLoginToAPI                                                            : Tester connexion à l'API
admin_ProxyDesc                                                                 : Certaines fonctions de Speedealing nécessitent que le serveur ait accès à internet. Définissez ici les paramètres de ces accès. Si le serveur Speedealing est derrière un proxy, ces paramètres indiquent à Speedealing comment le traverser.
admin_ExternalAccess                                                            : Accès externes
admin_MAIN_PROXY_USE                                                            : Utiliser un serveur proxy mandataire (sinon accès direct à internet)
admin_MAIN_PROXY_HOST                                                           : Nom/Adresse du serveur proxy mandataire
admin_MAIN_PROXY_PORT                                                           : Port du serveur proxy mandataire
admin_MAIN_PROXY_USER                                                           : Login pour passer le serveur proxy mandataire
admin_MAIN_PROXY_PASS                                                           : Mot de passe pour passer le serveur proxy mandataire
admin_DefineHereComplementaryAttributes                                         : Définissez ici la liste des attributs supplémentaires, non disponibles en standard, et que vous voulez voir gérer sur les %s.
admin_ExtraFields                                                               : Attributs suplémentaires
admin_ExtraFieldsThirdParties                                                   : Attributs suplémentaires (tiers)
admin_ExtraFieldsContacts                                                       : Attributs suplémentaires (contacts/adresses)
admin_ExtraFieldHasWrongValue                                                   : L'attribut %s a une valeur incorrecte.
admin_AlphaNumOnlyCharsAndNoSpace                                               : uniquement caractères alphanumériques sans espace
admin_SendingMailSetup                                                          : Configuration de l'envoi par mail
admin_SendmailOptionNotComplete                                                 : Attention, sur certains systèmes Linux, avec cette méthode d'envoi, pour pouvoir envoyer des mails en votre nom, la configuration d'exécution de sendmail doit contenir l'option <b>-ba</b> (paramètre <b>mail.force_extra_parameters</b> dans le fichier <b>php.ini</b>). Si certains de vos destinataires ne reçoivent pas de message, essayer de modifer ce paramètre PHP avec <b>mail.force_extra_parameters =-ba</b>.
admin_PathToDocuments                                                           : Chemin d'accès aux documents
admin_PathDirectory                                                             : Répertoire
admin_SendmailOptionMayHurtBuggedMTA                                            : La fonction d'envoi de mails par la méthode "PHP mail directe" génère une requete mail qui peut être mal interprété par certains serveurs buggués de réception de mail. Cela se traduit par des mails non lisibles chez les personnes hebergés par ces plateformes bugguées. C'est le cas des clients de certains fournisseurs d'accès internet (Ex: Orange). Ce n'est pas un problème ni dans Speedealing ni dans PHP mais sur le serveur de réception. Vous pouvez toutefois ajouter l'option MAIN_FIX_FOR_BUGGED_MTA à 1 dans configuration - divers pour modifier Speedealing afin de compenser le bug. Toutefois ce sont les serveurs respectueux du standard d'envoi de mail qui pourront avoir des problèmes. L'autre solution (recommandée) est d'utiliser la méthode d'envoi SMTP socket library qui n'a aucun de ces inconvénients.
admin_TranslationSetup                                                          : Translation setup
admin_TranslationDesc                                                           : Le choix de la langue affichée à l'écran se modifie:<br>* Soit de manière globale depuis le menu <strong>Accueil - Configuration - Affichage</strong><br>* Soit de manière spécifique à l'utilisateur depuis l'onglet <strong>Interface utilisateur</strong> de sa fiche utilisateur (cliquer sur le login en haut de l'écran).
admin_ClassNotFoundIntoPathWarning                                              : Class %s not found into PHP path
admin_PasswordGenerationStandard                                                : Renvoie un mot de passe généré selon algorithme interne Speedealing: 8 caractères, chiffres et caractères en minuscules mélangés.
admin_PasswordGenerationNone                                                    : Ne propose pas de mots de passe générés. Le mot de passe est à saisir manuellement.
admin_UserGroupSetup                                                            : Configuration module utilisateurs et groupes
admin_GeneratePassword                                                          : Proposer un mot de passe généré
admin_RuleForGeneratedPasswords                                                 : Règle pour la génération des mots de passe proposés et leur validation
admin_DoNotSuggest                                                              : Ne pas proposer
admin_EncryptedPasswordInDatabase                                               : Permettre le chiffrement des mots de passe dans la base de données (Activation recommandée)
admin_DisableForgetPasswordLinkOnLogonPage                                      : Ne pas afficher le lien "Mot de passe oublié" sur la page de connexion
admin_UsersSetup                                                                : Configuration du module utilisateurs
admin_UserMailRequired                                                          : EMail requis pour créer un nouvel utilisateur
admin_CompanySetup                                                              : Configuration du module Tiers
admin_CompanyCodeChecker                                                        : Modèle de génération et contrôle des codes tiers (clients/fournisseurs)
admin_AccountCodeManager                                                        : Modèle de génération des codes compta (clients/fournisseurs)
admin_ModuleCompanyCodeAquarium                                                 : Renvoie un code compta composé de :<br>%s suivi du code tiers fournisseur pour le code compta fournisseur,<br>%s suivi du code tiers client pour le code compta client.
admin_ModuleCompanyCodePanicum                                                  : Renvoie un code compta vide.
admin_ModuleCompanyCodeDigitaria                                                : Renvoie un code compta composé suivant le code tiers. Le code est composé du caractère 'C' en première position suivi des 5 premiers caractères du code tiers.
admin_UseNotifications                                                          : Utiliser les notifications
admin_NotificationsDesc                                                         : La fonction des notifications par emails permet d'envoyer automatiquement un email, pour certains événements Speedealing, aux tiers (sociétés clients, prospects ou fournisseurs) configurés pour. Le choix des notifications et contacts destinataires se fait tiers par tiers.
admin_ModelModules                                                              : Modèle de documents
admin_DocumentModelOdt                                                          : Genération depuis des modèles OpenDocument (Fichier .ODT OpenOffice, KOffice, TextEdit...)
admin_WatermarkOnDraft                                                          : Filigrane sur les documents brouillons
admin_CompanyIdProfChecker                                                      : Id professionel unique
admin_MustBeUnique                                                              : Doit être unique ?
admin_Miscellanous                                                              : Divers
admin_WebCalSetup                                                               : Configuration du lien vers le calendrier Webcalendar
admin_WebCalSyncro                                                              : Intégrer les événements Speedealing dans WebCalendar
admin_WebCalAllways                                                             : Toujours, sans demander
admin_WebCalYesByDefault                                                        : Sur demande (oui par défaut)
admin_WebCalNoByDefault                                                         : Sur demande (non par défaut)
admin_WebCalNever                                                               : Jamais
admin_WebCalURL                                                                 : Adresse (URL) d'accès au calendrier
admin_WebCalServer                                                              : Serveur de la base de données du calendrier
admin_WebCalDatabaseName                                                        : Nom de la base de données
admin_WebCalUser                                                                : Identifiant d'accès à la base
admin_WebCalSetupSaved                                                          : Les identifiants Webcalendar ont été correctement sauvegardés.
admin_WebCalTestOk                                                              : La connexion au serveur '%s' sur la base '%s' par l'utilisateur '%s' a réussi.
admin_WebCalTestKo1                                                             : La connexion au serveur '%s' a réussi mais la base '%s' n'a pu être atteinte.
admin_WebCalTestKo2                                                             : La connexion au serveur '%s' par l'utilisateur '%s' à échoué.
admin_WebCalErrorConnectOkButWrongDatabase                                      : La connexion a réussie mais la base ne semble pas être une base Webcalendar.
admin_WebCalAddEventOnCreateActions                                             : Ajouter un événement dans le calendrier sur création d'actions
admin_WebCalAddEventOnCreateCompany                                             : Ajouter un événement dans le calendrier sur création de sociétés
admin_WebCalAddEventOnStatusPropal                                              : Ajouter un événement dans le calendrier sur changement de statut des propositions commerciales
admin_WebCalAddEventOnStatusContract                                            : Ajouter un événement dans le calendrier sur changement de statut des contrats
admin_WebCalAddEventOnStatusBill                                                : Ajouter un événement dans le calendrier sur changement de statut des factures
admin_WebCalAddEventOnStatusMember                                              : Ajouter un événement dans le calendrier sur changement de statut des adhérents
admin_WebCalUrlForVCalExport                                                    : Un lien d'export du calendrier au format <b>%s</b> sera disponible à l'url:<br>%s
admin_WebCalCheckWebcalSetup                                                    : La configuration du module Webcal est peut-être incorrecte.
admin_BillsSetup                                                                : Configuration du module Factures
admin_BillsDate                                                                 : Date des factures
admin_BillsNumberingModule                                                      : Modèle de numérotation des factures et avoirs
admin_BillsPDFModules                                                           : Modèle de document de factures
admin_CreditNoteSetup                                                           : Configuration du module Avoirs
admin_CreditNotePDFModules                                                      : Modèles de documents des avoirs
admin_CreditNote                                                                : Avoir
admin_CreditNotes                                                               : Avoirs
admin_ForceInvoiceDate                                                          : Forcer la date de facture à la date de validation
admin_DisableRepeatable                                                         : Désactiver les factures récurrentes
admin_SuggestedPaymentModesIfNotDefinedInInvoice                                : Mode de paiement suggéré par défaut si non défini au niveau de la facture
admin_EnableEditDeleteValidInvoice                                              : Activer la possibilité de rééditer/supprimer une facture validée sans paiement
admin_SuggestPaymentByRIBOnAccount                                              : Proposer paiement par virement sur le compte
admin_SuggestPaymentByChequeToAddress                                           : Proposer paiement par chèque à l'ordre et adresse de
admin_FreeLegalTextOnInvoices                                                   : Mention complémentaire sur les factures
admin_WatermarkOnDraftInvoices                                                  : Filigrane sur les brouillons de factures (aucun si vide)
admin_PropalSetup                                                               : Configuration du module Propositions Commerciales
admin_CreateForm                                                                : Création formulaire
admin_NumberOfProductLines                                                      : Nombre de lignes produits
admin_ProposalsNumberingModules                                                 : Modèles de numérotation des propositions commerciales
admin_ProposalsPDFModules                                                       : Modèles de documents de propositions commerciales
admin_ClassifiedInvoiced                                                        : Classer facturée
admin_HideTreadedPropal                                                         : Cacher les propositions commerciales traitées de la liste
admin_AddShippingDateAbility                                                    : Possibilité de déterminer une date de livraison
admin_AddDeliveryAddressAbility                                                 : Possibilité de sélectionner une adresse de livraison
admin_UseOptionLineIfNoQuantity                                                 : Une ligne de produit/service ayant une quantité nulle est considérée comme une option
admin_FreeLegalTextOnProposal                                                   : Mention complémentaire sur les propositions
admin_WatermarkOnDraftProposal                                                  : Filigrane sur les brouillons de propositions (aucun si vide)
admin_OrdersSetup                                                               : Configuration du module Commandes
admin_OrdersNumberingModules                                                    : Modèles de numérotation des commandes
admin_OrdersModelModule                                                         : Modèles de document des commandes
admin_HideTreadedOrders                                                         : Cacher les commandes traitées ou annulées de la liste
admin_ValidOrderAfterPropalClosed                                               : Valider la commande après la clôture de la propale, permet de ne pas passer par la commande provisoire
admin_FreeLegalTextOnOrders                                                     : Mention complémentaire sur les commandes
admin_WatermarkOnDraftOrders                                                    : Filigrane sur les brouillons de commandes (aucun si vide)
admin_ClickToDialSetup                                                          : Configuration du module Click To Dial
admin_ClickToDialUrlDesc                                                        : Url appelée lors dun clic sur le picto téléphone. Dans l'url, vous pouvez utiliser les balises<br><b>__PHONETO__</b> qui sera remplacé par le téléphone de l'appelé<br><b>__PHONEFROM__</b> qui sera remplacé par le téléphone de l'appelant (le votre, défini sur votre fiche utilisateur)<br><b>__LOGIN__</b> qui sera remplacé par votre login clicktodial (défini sur votre fiche utilisateur)<br><b>__PASS__</b> qui sera remplacé par votre mot de passe clicktodial (défini sur votre fiche utilisateur).
admin_Bookmark4uSetup                                                           : Configuration du module Bookmark4u
admin_InterventionsSetup                                                        : Configuration du module Interventions
admin_FreeLegalTextOnInterventions                                              : Mention complémentaire sur les fiches d'intervention
admin_FicheinterNumberingModules                                                : Modèles de numérotation des fiches d'intervention
admin_TemplatePDFInterventions                                                  : Modèle de document des fiches d'intervention
admin_WatermarkOnDraftInterventionCards                                         : Filigrane sur les brouillons des fiches d'intervention (aucun si vide)
admin_ContractsSetup                                                            : Configuration du module contrats
admin_ContractsNumberingModules                                                 : Modèles de numérotation des contrats
admin_MembersSetup                                                              : Configuration du module Adhérents
admin_MemberMainOptions                                                         : Options principales
admin_AddSubscriptionIntoAccount                                                : Proposer par défaut la création d'une écriture bancaire, dans le module banque, à l'enregistrement d'une adhésion payante
admin_AdherentLoginRequired                                                     : Gérer un login pour chaque adhérent
admin_AdherentMailRequired                                                      : EMail obligatoire pour créer un nouvel adhérent
admin_MemberSendInformationByMailByDefault                                      : Case à cocher pour envoyer un mail de confirmation (validation ou nouvelle cotisation) aux adhérents est à oui par défaut.
admin_LDAPSetup                                                                 : Configuration du module LDAP
admin_LDAPGlobalParameters                                                      : Paramètres globals
admin_LDAPUsersSynchro                                                          : Utilisateurs
admin_LDAPGroupsSynchro                                                         : Groupes
admin_LDAPContactsSynchro                                                       : Contacts
admin_LDAPMembersSynchro                                                        : Adhérents
admin_LDAPSynchronization                                                       : Synchronisation LDAP
admin_LDAPFunctionsNotAvailableOnPHP                                            : Les fonctions LDAP ne sont pas disponibles sur votre PHP
admin_LDAPToSpeedealing                                                         : LDAP -> Speedealing
admin_SpeedealingToLDAP                                                         : Speedealing -> LDAP
admin_LDAPNamingAttribute                                                       : Clé dans LDAP
admin_LDAPSynchronizeUsers                                                      : Organisation des objets utilisateurs dans le LDAP
admin_LDAPSynchronizeGroups                                                     : Organisation des objets groupes dans le LDAP
admin_LDAPSynchronizeContacts                                                   : Organisation des objets contacts dans le LDAP
admin_LDAPSynchronizeMembers                                                    : Organisation des objets adhérents dans le LDAP
admin_LDAPTypeExample                                                           : OpenLdap, Egroupware ou Active Directory
admin_LDAPPrimaryServer                                                         : Serveur primaire
admin_LDAPSecondaryServer                                                       : Serveur secondaire
admin_LDAPServerPort                                                            : Port du serveur
admin_LDAPServerPortExample                                                     : Port par défaut : 389
admin_LDAPServerProtocolVersion                                                 : Version du protocole
admin_LDAPServerUseTLS                                                          : Utiliser TLS
admin_LDAPServerUseTLSExample                                                   : Votre serveur utilise le TLS
admin_LDAPServerDn                                                              : DN du serveur
admin_LDAPAdminDn                                                               : DN de l'administrateur
admin_LDAPAdminDnExample                                                        : DN complet (ex: cn=adminldap,dc=my-domain,dc=com)
admin_LDAPPassword                                                              : Mot de passe de l'administrateur
admin_LDAPUserDn                                                                : DN des utilisateurs
admin_LDAPUserDnExample                                                         : DN complet (ex: ou=users,dc=my-domain,dc=com)
admin_LDAPGroupDn                                                               : DN des groupes
admin_LDAPGroupDnExample                                                        : DN complet (ex: ou=groups,dc=my-domain,dc=com)
admin_LDAPServerExample                                                         : Adresse du serveur (ex: localhost, 192.168.0.2, ldaps://ldap.example.com/)
admin_LDAPServerDnExample                                                       : DN complet (ex: dc=my-domain,dc=com)
admin_LDAPPasswordExample                                                       : Mot de passe de l'administrateur
admin_LDAPDnSynchroActive                                                       : Synchronisation des utilisateurs et groupes
admin_LDAPDnSynchroActiveExample                                                : Synchronisation de LDAP vers Dolibarr ou Dolibarr vers LDAP
admin_LDAPDnContactActive                                                       : Synchronisation des contacts
admin_LDAPDnContactActiveYes                                                    : Synchronisation activée
admin_LDAPDnContactActiveExample                                                : Synchronisation activée/désactivée
admin_LDAPDnMemberActive                                                        : Synchronisation des adhérents
admin_LDAPDnMemberActiveExample                                                 : Synchronisation activée/désactivée
admin_LDAPContactDn                                                             : DN des contacts Dolibarr
admin_LDAPContactDnExample                                                      : DN complet (ex: ou=contacts,dc=my-domain,dc=com)
admin_LDAPMemberDn                                                              : DN des adhérents
admin_LDAPMemberDnExample                                                       : DN complet (ex: ou=members,dc=society,dc=com)
admin_LDAPMemberObjectClassList                                                 : Liste des objectClass
admin_LDAPMemberObjectClassListExample                                          : Liste des objectClass définissant les attributs d'un enregistrement (ex: top,inetOrgPerson ou top,user for active directory)
admin_LDAPUserObjectClassList                                                   : Liste des objectClass
admin_LDAPUserObjectClassListExample                                            : Liste des objectClass définissant les attributs d'un enregistrement (ex: top,inetOrgPerson ou top,user for active directory)
admin_LDAPGroupObjectClassList                                                  : Liste des objectClass
admin_LDAPGroupObjectClassListExample                                           : Liste des objectClass définissant les attributs d'un enregistrement (ex: top,groupOfUniqueNames)
admin_LDAPContactObjectClassList                                                : Liste des objectClass
admin_LDAPContactObjectClassListExample                                         : Liste des objectClass définissant les attributs d'un enregistrement (ex: top,inetOrgPerson ou top,user for active directory)
admin_LDAPMemberTypeDn                                                          : DN des types d'adhérents
admin_LDAPMemberTypeDnExample                                                   : DN complet (ex: ou=type_members,dc=society,dc=com)
admin_LDAPTestConnect                                                           : Tester la connexion LDAP
admin_LDAPTestSynchroContact                                                    : Tester synchronisation contacts
admin_LDAPTestSynchroUser                                                       : Tester synchronisation utilisateur
admin_LDAPTestSynchroGroup                                                      : Tester synchronisation groupe
admin_LDAPTestSynchroMember                                                     : Tester synchronisation adhérent
admin_LDAPSynchroOK                                                             : Test de synchronisation réalisé avec succès
admin_LDAPSynchroKO                                                             : Échec du test de synchronisation
admin_LDAPSynchroKOMayBePermissions                                             : Echec du test de synchronisation. Vérifier que la connexion au serveur est correctement configurée et permet les mises à jour LDAP
admin_LDAPTCPConnectOK                                                          : Connexion TCP au serveur LDAP réussie (Serveur=%s, Port=%s)
admin_LDAPTCPConnectKO                                                          : Connexion TCP au serveur LDAP échouée (Serveur=%s, Port=%s)
admin_LDAPBindOK                                                                : Connection/Authentification au serveur LDAP réussie (Serveur=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPBindKO                                                                : Connection/Authentification au serveur LDAP échouée (Serveur=%s, Port=%s, Admin=%s, Password=%s)
admin_LDAPUnbindSuccessfull                                                     : Déconnection réussie
admin_LDAPUnbindFailed                                                          : Déconnection échouée
admin_LDAPConnectToDNSuccessfull                                                : Connection au DN (%s) réussie
admin_LDAPConnectToDNFailed                                                     : Connection au DN (%s) échouée
admin_LDAPSetupForVersion3                                                      : Serveur LDAP configuré en version 3
admin_LDAPSetupForVersion2                                                      : Serveur LDAP configuré en version 2
admin_LDAPSpeedealingMapping                                                    : Speedealing Mapping
admin_LDAPLdapMapping                                                           : Mapping LDAP
admin_LDAPFieldLoginUnix                                                        : Login (unix)
admin_LDAPFieldLoginExample                                                     : Exemple : uid
admin_LDAPFilterConnection                                                      : Filtre de recherche
admin_LDAPFilterConnectionExample                                               : Exemple : &(objectClass=inetOrgPerson)
admin_LDAPFieldLoginSamba                                                       : Login (samba, activedirectory)
admin_LDAPFieldLoginSambaExample                                                : Exemple : samaccountname
admin_LDAPFieldFullname                                                         : Prénom Nom
admin_LDAPFieldFullnameExample                                                  : Exemple : cn
admin_LDAPFieldPassword                                                         : Mot de passe
admin_LDAPFieldPasswordNotCrypted                                               : Mot de passe non crypté
admin_LDAPFieldPasswordCrypted                                                  : Mot de passe crypté
admin_LDAPFieldPasswordExample                                                  : Exemple : userPassword
admin_LDAPFieldCommonName                                                       : Nom commun
admin_LDAPFieldCommonNameExample                                                : Exemple : cn
admin_LDAPFieldName                                                             : Nom
admin_LDAPFieldNameExample                                                      : Exemple : sn
admin_LDAPFieldFirstName                                                        : Prénom
admin_LDAPFieldFirstNameExample                                                 : Exemple : givenname
admin_LDAPFieldMail                                                             : Email
admin_LDAPFieldMailExample                                                      : Exemple : mail
admin_LDAPFieldPhone                                                            : Téléphone professionnel
admin_LDAPFieldPhoneExample                                                     : Exemple : telephonenumber
admin_LDAPFieldHomePhone                                                        : Téléphone perso
admin_LDAPFieldHomePhoneExample                                                 : Exemple : homephone
admin_LDAPFieldMobile                                                           : Téléphone portable
admin_LDAPFieldMobileExample                                                    : Exemple : mobile
admin_LDAPFieldFax                                                              : Fax
admin_LDAPFieldFaxExample                                                       : Exemple : facsimiletelephonenumber
admin_LDAPFieldAddress                                                          : Adresse
admin_LDAPFieldAddressExample                                                   : Exemple : street
admin_LDAPFieldZip                                                              : Code postal
admin_LDAPFieldZipExample                                                       : Exemple : postalcode
admin_LDAPFieldTown                                                             : Ville
admin_LDAPFieldTownExample                                                      : Exemple : l
admin_LDAPFieldCountry                                                          : Pays
admin_LDAPFieldCountryExample                                                   : Exemple : c
admin_LDAPFieldDescription                                                      : Description
admin_LDAPFieldDescriptionExample                                               : Exemple : description
admin_LDAPFieldGroupMembers                                                     : Membres du groupe
admin_LDAPFieldGroupMembersExample                                              : Exemple : uniqueMember
admin_LDAPFieldBirthdate                                                        : Date de naissance
admin_LDAPFieldBirthdateExample                                                 : Exemple :
admin_LDAPFieldCompany                                                          : Société
admin_LDAPFieldCompanyExample                                                   : Exemple : o
admin_LDAPFieldSid                                                              : SID
admin_LDAPFieldSidExample                                                       : Exemple : objectsid
admin_LDAPFieldEndLastSubscription                                              : Date fin validité adhésion
admin_LDAPParametersAreStillHardCoded                                           : Les paramètres LDAP sont codés en dur (dans classe contact)
admin_LDAPSetupNotComplete                                                      : Configuration LDAP incomplète (à compléter sur les autres onglets)
admin_LDAPNoUserOrPasswordProvidedAccessIsReadOnly                              : Administrateur ou mot de passe non renseigné. Les accès LDAP seront donc anonymes et en lecture seule.
admin_LDAPDescContact                                                           : Cette page permet de définir le nom des attributs de l'arbre LDAP pour chaque information des contacts Speedealing.
admin_LDAPDescUsers                                                             : Cette page permet de définir le nom des attributs de l'arbre LDAP pour chaque information des utilisateurs Speedealing.
admin_LDAPDescGroups                                                            : Cette page permet de définir le nom des attributs de l'arbre LDAP pour chaque information des groupes utilisateurs Speedealing.
admin_LDAPDescMembers                                                           : Cette page permet de définir le nom des attributs de l'arbre LDAP pour chaque information des membres du module adhérents Speedealing.
admin_LDAPDescValues                                                            : Les valeurs exemples sont adaptées à <b>OpenLDAP</b> avec les schémas suivant chargés: <b>core.schema, cosine.schema, inetorgperson.schema</b>). Si vous utilisez les valeurs suggérées et OpenLDAP, modifiez votre fichier de configuration LDAP <b>slapd.conf</b> pour avoir tous ces schémas actifs.
admin_ForANonAnonymousAccess                                                    : Pour un accès authentifié (pour accès en écriture par exemple)
admin_ProductSetup                                                              : Configuration du module Produits
admin_ServiceSetup                                                              : Configuration du module Services
admin_ProductServiceSetup                                                       : Configuration des modules Produits et Services
admin_NumberOfProductShowInSelect                                               : Nombre de produits max dans les listes déroulantes (0=aucune limite)
admin_ConfirmDeleteProductLineAbility                                           : Confirmation de suppression d'une ligne produit dans les formulaires
admin_ModifyProductDescAbility                                                  : Personnalisation des descriptions produits dans les formulaires
admin_ViewProductDescInFormAbility                                              : Visualisation des descriptions produits dans les formulaires (sinon en tant que tooltip)
admin_ViewProductDescInThirdpartyLanguageAbility                                : Visualisation des descriptions produits dans la langue du tiers
admin_UseSearchToSelectProduct                                                  : Utiliser un formulaire de recherche pour le choix d'un produit (plutôt qu'une liste déroulante).<br>Notez que si vous avez un nombre important de produits ou services (> 100 000), vous pouvez améliorer les performances en définissant la constante PRODUCT_DONOTSEARCH_ANYWHERE à 1 dans Configuration->Divers. La recherche sera alors limitée au début de la chaine.
admin_UseEcoTaxeAbility                                                         : Prise en charge des éco-taxes (DEEE)
admin_SetDefaultBarcodeTypeProducts                                             : Type de code-barres utilisé par défaut pour les produits
admin_SetDefaultBarcodeTypeThirdParties                                         : Type de code-barres utilisé par défaut pour les tiers
admin_ProductCodeChecker                                                        : Modèle de numérotation des produits / services
admin_ProductOtherConf                                                          : Paramètres des produits / services
admin_SyslogSetup                                                               : Configuration du module Logs et traces
admin_SyslogOutput                                                              : Sortie des log
admin_SyslogSyslog                                                              : Syslog
admin_SyslogFacility                                                            : Facility
admin_SyslogLevel                                                               : Niveau
admin_SyslogSimpleFile                                                          : Fichier
admin_SyslogFilename                                                            : Nom et chemin du fichier
admin_YouCanUseDOL_DATA_ROOT                                                    : Vous pouvez utiliser DOL_DATA_ROOT/dolibarr.log pour un log dans le répertoire "documents" de Speedealing. Vous pouvez néanmoins définir un chemin différent pour stocker ce fichier.
admin_ErrorUnknownSyslogConstant                                                : La constante %s n'est pas une constante syslog connue
admin_OnlyWindowsLOG_USER                                                       : Windows ne supporte que LOG_USER
admin_DonationsSetup                                                            : Configuration du module Dons
admin_DonationsReceiptModel                                                     : Modèle de reçu de dons
admin_BarcodeSetup                                                              : Configuration des codes-barres
admin_PaperFormatModule                                                         : Modules de format d'impression
admin_BarcodeEncodeModule                                                       : Modules d'encodage des codes-barres
admin_UseBarcodeInProductModule                                                 : Utiliser les codes-barres pour les produits
admin_CodeBarGenerator                                                          : Générateur du graphique
admin_ChooseABarCode                                                            : Aucun générateur sélectionné
admin_FormatNotSupportedByGenerator                                             : Format non géré par ce générateur
admin_BarcodeDescEAN8                                                           : code-barres de type EAN8
admin_BarcodeDescEAN13                                                          : code-barres de type EAN13
admin_BarcodeDescUPC                                                            : code-barres de type UPC
admin_BarcodeDescISBN                                                           : code-barres de type ISBN
admin_BarcodeDescC39                                                            : code-barres de type C39
admin_BarcodeDescC128                                                           : code-barres de type C128
admin_WithdrawalsSetup                                                          : Configuration du module prélèvement
admin_ExternalRSSSetup                                                          : Configuration des imports de flux RSS
admin_NewRSS                                                                    : Syndication d'un nouveau flux RSS
admin_RSSUrl                                                                    : Url RSS
admin_RSSUrlExample                                                             : Mon flux RSS
admin_MailingSetup                                                              : Configuration du module EMailing
admin_MailingEMailFrom                                                          : Email émetteur (From) des mails envoyés par EMailing
admin_MailingEMailError                                                         : EMail retour (Errors-to) pour les réponses lors des envois par EMailing en erreur.
admin_NotificationSetup                                                         : Configuration du module Notification
admin_NotificationEMailFrom                                                     : Email émetteur (From) des mails envoyés lors des notifications
admin_ListOfAvailableNotifications                                              : Liste des notifications disponibles (cette liste dépend des modules actifs)
admin_SendingsSetup                                                             : Configuration du module Expédition/Livraison
admin_SendingsReceiptModel                                                      : Modèle du bordereau d'expédition
admin_SendingsNumberingModules                                                  : Modèles de numérotation des expéditions
admin_SendingsAbility                                                           : Prise en charge des bons d'expédition/livraison vers le client
admin_NoNeedForDeliveryReceipts                                                 : Dans la plupart des cas, ce sont les bons d'expédition/livraison (liste des produits à envoyer par le transporteur) qui font office de bons de réception et qui sont signés par le client. La gestion des bons de réception fait donc double emploi et sera rarement activée.
admin_FreeLegalTextOnShippings                                                  : Mention complémentaire sur les bons d'expéditions
admin_DeliveryOrderNumberingModules                                             : Modèle de numérotation des bons de réception client
admin_DeliveryOrderModel                                                        : Modèle de bon de réception client
admin_DeliveriesOrderAbility                                                    : Prise en charge des bons de réception client
admin_FreeLegalTextOnDeliveryReceipts                                           : Mention complémentaire sur les bons de réception
admin_AdvancedEditor                                                            : Editeur avancé
admin_ActivateFCKeditor                                                         : Activer éditeur avancé pour :
admin_FCKeditorForCompany                                                       : Création/édition WYSIWIG de la description et note des éléments (autre que produits/services)
admin_FCKeditorForProduct                                                       : Création/édition WYSIWIG de la description et note des produits/services
admin_FCKeditorForProductDetails                                                : Création/édition WYSIWIG des lignes détails produits (sur commandes, propales, factures, etc...). <font class="warning">Attention: L'utilisation pour ce cas est fortement déconseillée car peut poser des problèmes dans la gestion de caractères et mise en page des fichiers PDF générés.</font>
admin_FCKeditorForMailing                                                       : Création/édition WYSIWIG des mailings
admin_StockSetup                                                                : Configuration module stock
admin_UserWarehouse                                                             : Utiliser des stocks personnels aux utilisateurs
admin_MenuDeleted                                                               : Menu supprimé
admin_TreeMenu                                                                  : Arborescence des menus
admin_Menus                                                                     : Menus
admin_TreeMenuPersonalized                                                      : Menus personnalisés
admin_NewMenu                                                                   : Nouveau menu
admin_MenuConf                                                                  : Configuration des menus
admin_Menu                                                                      : Sélection des menus
admin_MenuHandler                                                               : Gestionnaire de menu
admin_MenuModule                                                                : Module source
admin_HideUnauthorizedMenu                                                      : Masquer les menus non autorisés aussi pour les utilisateurs internes (sinon juste grisés)
admin_DetailId                                                                  : Identifiant du menu
admin_DetailMenuHandler                                                         : Nom du gestionnaire menu dans lequel faire apparaitre le nouveau menu
admin_DetailMenuModule                                                          : Nom du module si l'entrée menu est issue d'un module
admin_DetailType                                                                : Type de menu (top ou left)
admin_DetailTitre                                                               : Libellé du menu ou code libellé à traduire
admin_DetailMainmenu                                                            : Groupe auquel il appartient (obsolète)
admin_DetailUrl                                                                 : URL vers laquelle le menu pointe (Lien URL absolu ou lien externe avec http://)
admin_DetailLeftmenu                                                            : Condition d'affichage ou non (obsolète)
admin_DetailEnabled                                                             : Condition d'affichage ou non
admin_DetailRight                                                               : Condition d'affichage plein ou grisé
admin_DetailLangs                                                               : Fichier .lang pour la traduction du code libellé
admin_DetailUser                                                                : Interne / Externe / Tous
admin_Target                                                                    : Cible
admin_DetailTarget                                                              : Cible liens menu (_blank pour ouvrir une nouvelle fenêtre)
admin_DetailLevel                                                               : Niveau (-1:menu top, 0:entete menu, >0 menu et sous menu)
admin_ModifMenu                                                                 : Modification du menu
admin_DeleteMenu                                                                : Effacer entrée de menu
admin_ConfirmDeleteMenu                                                         : Êtes-vous sûr de vouloir supprimer l'entrée de menu <b>%s</b> ?
admin_DeleteLine                                                                : Suppression de ligne
admin_ConfirmDeleteLine                                                         : Êtes-vous sûr de vouloir effacer cette ligne ?
admin_TaxSetup                                                                  : Configuration du module Taxes, charges sociales et dividendes
admin_OptionVatMode                                                             : Option d'exigibilité de TVA par défaut
admin_OptionVATDefault                                                          : Standard
admin_OptionVATDebitOption                                                      : Option services sur Débit
admin_OptionVatDefaultDesc                                                      : L'exigibilité de la TVA est:<br>- sur livraison pour les biens (en pratique on utilise la date de facturation)<br>- sur paiement pour les services
admin_OptionVatDebitOptionDesc                                                  : L'exigibilité de la TVA est:<br>- sur livraison pour les biens (en pratique on utilise la date de facturation)<br>- sur facturation (débit) pour les services
admin_SummaryOfVatExigibilityUsedByDefault                                      : Moment d'exigibilité par défaut de la TVA pour l'option choisie:
admin_OnDelivery                                                                : Sur livraison
admin_OnPayment                                                                 : Sur paiement
admin_OnInvoice                                                                 : Sur facture
admin_SupposedToBePaymentDate                                                   : Date de paiement utilisée
admin_SupposedToBeInvoiceDate                                                   : Date de facture utilisée
admin_Buy                                                                       : Achat
admin_Sell                                                                      : Vente
admin_InvoiceDateUsed                                                           : Date de facture utilisée
admin_YourCompanyDoesNotUseVAT                                                  : Votre institution est configurée comme non assujettie à la TVA (Accueil - Configuration - Société/Institution), aussi il n'y a aucune option sur la gestion TVA à paramétrer.
admin_AccountancyCode                                                           : Code compta
admin_AccountancyCodeSell                                                       : Code compta vente
admin_AccountancyCodeBuy                                                        : Code compta achat
admin_AgendaSetup                                                               : Configuration du module actions et agenda
admin_PasswordTogetVCalExport                                                   : Clé pour autoriser lien export
admin_PastDelayVCalExport                                                       : Ne pas exporter les événements de plus de
admin_ClickToDialDesc                                                           : Ce module permet d'ajouter un petit picto à côté des numéros de téléphones. Un clic sur ce picto provoque l'appel de l'URL définie dans ce paramétrage. Ceci permet de provoquer des appels à un serveur de téléphonie depuis Speedealing qui peut alors composer le numéro sur un système SIP par exemple.
admin_CashDesk                                                                  : Caisse enregistreuse
admin_CashDeskSetup                                                             : Configuration du module Point de vente/caisse enregistreuse
admin_CashDeskThirdPartyForSell                                                 : Tiers générique à utiliser pour les ventes
admin_CashDeskBankAccountForSell                                                : Compte par défaut à utiliser pour l'encaissement en liquide (cash)
admin_CashDeskBankAccountForCheque                                              : Compte par défaut à utiliser pour l'encaissement en chèque
admin_CashDeskBankAccountForCB                                                  : Compte par défaut à utiliser pour l'encaissement par carte de crédit
admin_CashDeskIdWareHouse                                                       : Entrepôt à utiliser pour les ventes
admin_BookmarkSetup                                                             : Configuration du module Bookmark
admin_BookmarkDesc                                                              : Ce module vous permet de gérer des liens et raccourcis. Il permet aussi d'ajouter n'importe quelle page de Speedealing ou lien web dans le menu d'accès rapide sur la gauche.
admin_NbOfBoomarkToShow                                                         : Nombre maximum de marques-pages à afficher dans le menu
admin_WebServicesSetup                                                          : Configuration du module Webservices
admin_WebServicesDesc                                                           : En activant ce module, Speedealing devient aussi serveur de web services offrant des web services divers.
admin_WSDLCanBeDownloadedHere                                                   : Les descripteurs WSDL des services fournis peuvent être récupéré ici
admin_EndPointIs                                                                : Les clients SOAP doivent envoyer leur requêtes vers l'endpoint Speedealing à l'URL
admin_BankSetupModule                                                           : Configuration du module Banque
admin_FreeLegalTextOnChequeReceipts                                             : Mention complémentaire sur les bordereaux de remises de chèques
admin_BankOrderShow                                                             : Ordre d'affichage des informations bancaires (pour les pays les détaillant)
admin_BankOrderGlobal                                                           : Général
admin_BankOrderGlobalDesc                                                       : Ordre d'affichage général
admin_BankOrderES                                                               : Espagnol
admin_BankOrderESDesc                                                           : Ordre d'affichage Espagnol
admin_MultiCompanySetup                                                         : Configuration du module Multi-société
admin_SuppliersSetup                                                            : Configuration du module Fournisseurs
admin_SuppliersCommandModel                                                     : Modèle de commandes fournisseur complet (logo...)
admin_SuppliersInvoiceModel                                                     : Modèle de factures fournisseur complet (logo...)
admin_GeoIPMaxmindSetup                                                         : Configuration du module GeoIP Maxmind
admin_PathToGeoIPMaxmindCountryDataFile                                         : Chemin du fichier Maxmind contenant les conversions IP->Pays.<br>Exemple: /usr/local/share/GeoIP/GeoIP.dat
admin_NoteOnPathLocation                                                        : Notez que ce fichier doit être dans un répertoire accessible à votre PHP (Vérifiez le paramètre open_basedir de votre PHP et les permissions du fichier/répertoires).
admin_YouCanDownloadFreeDatFileTo                                               : Vous pouvez télécharger une <b>version démo gratuite</b> de la base Maxmind à l'adresse %s.
admin_YouCanDownloadAdvancedDatFileTo                                           : Vous pouvez aussi télécharger une <b>version plus complète avec mise à jours</b> de la base Maxmind à l'adresse %s.
admin_TestGeoIPResult                                                           : Test de conversion IP -> Pays
admin_ProjectsNumberingModules                                                  : Modèles de numérotation des références projets
admin_ProjectsSetup                                                             : Configuration du module Projets
admin_ProjectsModelModule                                                       : Modèles de document de rapport projets
admin_Chartofaccounts                                                           : Plan comptable
admin_Definechartofaccounts                                                     : Définir un plan comptable
admin_Selectchartofaccounts                                                     : Sélection d'un plan comptable
admin_DoNotSuggestChart                                                         : Ne pas suggérer de plan comptable
dict_CountryFR                                                                  : France
dict_CountryBE                                                                  : Belgique
dict_CountryIT                                                                  : Italie
dict_CountryES                                                                  : Espagne
dict_CountryDE                                                                  : Allemagne
dict_CountryCH                                                                  : Suisse
dict_CountryGB                                                                  : Royaume-Uni
dict_CountryIE                                                                  : Irlande
dict_CountryCN                                                                  : Chine
dict_CountryTN                                                                  : Tunisie
dict_CountryUS                                                                  : Etats-Unis
dict_CountryMA                                                                  : Maroc
dict_CountryDZ                                                                  : Algérie
dict_CountryCA                                                                  : Canada
dict_CountryTG                                                                  : Togo
dict_CountryGA                                                                  : Gabon
dict_CountryNL                                                                  : Pays-Bas
dict_CountryHU                                                                  : Hongrie
dict_CountryRU                                                                  : Russie
dict_CountrySE                                                                  : Suède
dict_CountryCI                                                                  : Côte d'Ivoire
dict_CountrySN                                                                  : Sénégal
dict_CountryAR                                                                  : Argentine
dict_CountryCM                                                                  : Cameroun
dict_CountryPT                                                                  : Portugal
dict_CountrySA                                                                  : Arabie Saoudite
dict_CountryMC                                                                  : Monaco
dict_CountryAU                                                                  : Australie
dict_CountrySG                                                                  : Singapoure
dict_CountryAF                                                                  : Afghanistan
dict_CountryAX                                                                  : Iles Aland
dict_CountryAL                                                                  : Albanie
dict_CountryAS                                                                  : Samoa américaines
dict_CountryAD                                                                  : Andorre
dict_CountryAO                                                                  : Angola
dict_CountryAI                                                                  : Anguilla
dict_CountryAQ                                                                  : Antarctique
dict_CountryAG                                                                  : Antigua-et-Barbuda
dict_CountryAM                                                                  : Arménie
dict_CountryAW                                                                  : Aruba
dict_CountryAT                                                                  : Autriche
dict_CountryAZ                                                                  : Azerbaïdjan
dict_CountryBS                                                                  : Bahamas
dict_CountryBH                                                                  : Bahreïn
dict_CountryBD                                                                  : Bangladesh
dict_CountryBB                                                                  : Barbade
dict_CountryBY                                                                  : Biélorussie
dict_CountryBZ                                                                  : Belize
dict_CountryBJ                                                                  : Bénin
dict_CountryBM                                                                  : Bermudes
dict_CountryBT                                                                  : Bhoutan
dict_CountryBO                                                                  : Bolivie
dict_CountryBA                                                                  : Bosnie-Herzégovine
dict_CountryBW                                                                  : Botswana
dict_CountryBV                                                                  : Ile Bouvet
dict_CountryBR                                                                  : Brésil
dict_CountryIO                                                                  : Territoire britannique de l'Océan Indien
dict_CountryBN                                                                  : Brunei
dict_CountryBG                                                                  : Bulgarie
dict_CountryBF                                                                  : Burkina Faso
dict_CountryBI                                                                  : Burundi
dict_CountryKH                                                                  : Cambodge
dict_CountryCV                                                                  : Cap-Vert
dict_CountryKY                                                                  : Iles Cayman
dict_CountryCF                                                                  : République centrafricaine
dict_CountryTD                                                                  : Tchad
dict_CountryCL                                                                  : Chili
dict_CountryCX                                                                  : Ile Christmas
dict_CountryCC                                                                  : Iles des Cocos (Keeling)
dict_CountryCO                                                                  : Colombie
dict_CountryKM                                                                  : Comores
dict_CountryCG                                                                  : Congo
dict_CountryCD                                                                  : République démocratique du Congo
dict_CountryCK                                                                  : Iles Cook
dict_CountryCR                                                                  : Costa Rica
dict_CountryHR                                                                  : Croatie
dict_CountryCU                                                                  : Cuba
dict_CountryCY                                                                  : Chypre
dict_CountryCZ                                                                  : République Tchèque
dict_CountryDK                                                                  : Danemark
dict_CountryDJ                                                                  : Djibouti
dict_CountryDM                                                                  : Dominique
dict_CountryDO                                                                  : République Dominicaine
dict_CountryEC                                                                  : Equateur
dict_CountryEG                                                                  : Egypte
dict_CountrySV                                                                  : Salvador
dict_CountryGQ                                                                  : Guinée Equatoriale
dict_CountryER                                                                  : Erythrée
dict_CountryEE                                                                  : Estonie
dict_CountryET                                                                  : Ethiopie
dict_CountryFK                                                                  : Iles Falkland
dict_CountryFO                                                                  : Iles Féroé
dict_CountryFJ                                                                  : Iles Fidji
dict_CountryFI                                                                  : Finlande
dict_CountryGF                                                                  : Guyane française
dict_CountryPF                                                                  : Polynésie française
dict_CountryTF                                                                  : Terres australes françaises
dict_CountryGM                                                                  : Gambie
dict_CountryGE                                                                  : Géorgie
dict_CountryGH                                                                  : Ghana
dict_CountryGI                                                                  : Gibraltar
dict_CountryGR                                                                  : Grèce
dict_CountryGL                                                                  : Groenland
dict_CountryGD                                                                  : Grenade
dict_CountryGP                                                                  : Guadeloupe
dict_CountryGU                                                                  : Guam
dict_CountryGT                                                                  : Guatemala
dict_CountryGN                                                                  : Guinée
dict_CountryGW                                                                  : Guinée-Bissao
dict_CountryGY                                                                  : Guyana
dict_CountryHT                                                                  : Haïti
dict_CountryHM                                                                  : Iles Heard et McDonald
dict_CountryVA                                                                  : Saint-Siège (Vatican)
dict_CountryHN                                                                  : Honduras
dict_CountryHK                                                                  : Hong Kong
dict_CountryIS                                                                  : Islande
dict_CountryIN                                                                  : Inde
dict_CountryID                                                                  : Indonésie
dict_CountryIR                                                                  : Iran
dict_CountryIQ                                                                  : Iraq
dict_CountryIL                                                                  : Israël
dict_CountryJM                                                                  : Jamaïque
dict_CountryJP                                                                  : Japon
dict_CountryJO                                                                  : Jordanie
dict_CountryKZ                                                                  : Kazakhstan
dict_CountryKE                                                                  : Kenya
dict_CountryKI                                                                  : Kiribati
dict_CountryKP                                                                  : Corée du Nord
dict_CountryKR                                                                  : Corée du Sud
dict_CountryKW                                                                  : Koweït
dict_CountryKG                                                                  : Kirghizistan
dict_CountryLA                                                                  : Laos
dict_CountryLV                                                                  : Lettonie
dict_CountryLB                                                                  : Liban
dict_CountryLS                                                                  : Lesotho
dict_CountryLR                                                                  : Liberia
dict_CountryLY                                                                  : Libye
dict_CountryLI                                                                  : Liechtenstein
dict_CountryLT                                                                  : Lituanie
dict_CountryLU                                                                  : Luxembourg
dict_CountryMO                                                                  : Macao
dict_CountryMK                                                                  : Macédoine (Ex-République yougoslave)
dict_CountryMG                                                                  : Madagascar
dict_CountryMW                                                                  : Malawi
dict_CountryMY                                                                  : Malaisie
dict_CountryMV                                                                  : Maldives
dict_CountryML                                                                  : Mali
dict_CountryMT                                                                  : Malte
dict_CountryMH                                                                  : Iles Marshall
dict_CountryMQ                                                                  : Martinique
dict_CountryMR                                                                  : Mauritanie
dict_CountryMU                                                                  : Maurice
dict_CountryYT                                                                  : Mayotte
dict_CountryMX                                                                  : Mexique
dict_CountryFM                                                                  : Micronésie
dict_CountryMD                                                                  : Moldavie
dict_CountryMN                                                                  : Mongolie
dict_CountryMS                                                                  : Monserrat
dict_CountryMZ                                                                  : Mozambique
dict_CountryMM                                                                  : Birmanie (Myanmar)
dict_CountryNA                                                                  : Namibie
dict_CountryNR                                                                  : Nauru
dict_CountryNP                                                                  : Népal
dict_CountryAN                                                                  : Antilles néerlandaises
dict_CountryNC                                                                  : Nouvelle-Calédonie
dict_CountryNZ                                                                  : Nouvelle-Zélande
dict_CountryNI                                                                  : Nicaragua
dict_CountryNE                                                                  : Niger
dict_CountryNG                                                                  : Nigeria
dict_CountryNU                                                                  : Nioué
dict_CountryNF                                                                  : Ile Norfolk
dict_CountryMP                                                                  : Mariannes du Nord
dict_CountryNO                                                                  : Norvège
dict_CountryOM                                                                  : Oman
dict_CountryPK                                                                  : Pakistan
dict_CountryPW                                                                  : Palaos
dict_CountryPS                                                                  : Territoire Palestinien Occupé
dict_CountryPA                                                                  : Panama
dict_CountryPG                                                                  : Papouasie-Nouvelle-Guinée
dict_CountryPY                                                                  : Paraguay
dict_CountryPE                                                                  : Pérou
dict_CountryPH                                                                  : Philippines
dict_CountryPN                                                                  : Iles Pitcairn
dict_CountryPL                                                                  : Pologne
dict_CountryPR                                                                  : Porto Rico
dict_CountryQA                                                                  : Qatar
dict_CountryRE                                                                  : Réunion
dict_CountryRO                                                                  : Roumanie
dict_CountryRW                                                                  : Rwanda
dict_CountrySH                                                                  : Sainte-Hélène
dict_CountryKN                                                                  : Saint-Christophe-et-Niévès
dict_CountryLC                                                                  : Sainte-Lucie
dict_CountryPM                                                                  : Saint-Pierre-et-Miquelon
dict_CountryVC                                                                  : Saint-Vincent-et-les-Grenadines
dict_CountryWS                                                                  : Samoa
dict_CountrySM                                                                  : Saint-Marin
dict_CountryST                                                                  : Sao Tomé-et-Principe
dict_CountryRS                                                                  : Serbie
dict_CountrySC                                                                  : Seychelles
dict_CountrySL                                                                  : Sierra Leone
dict_CountrySK                                                                  : Slovaquie
dict_CountrySI                                                                  : Slovénie
dict_CountrySB                                                                  : Iles Salomon
dict_CountrySO                                                                  : Somalie
dict_CountryZA                                                                  : Afrique du Sud
dict_CountryGS                                                                  : Iles Géorgie du Sud et Sandwich du Sud
dict_CountryLK                                                                  : Sri Lanka
dict_CountrySD                                                                  : Soudan
dict_CountrySR                                                                  : Suriname
dict_CountrySJ                                                                  : Iles Svalbard et Jan Mayen
dict_CountrySZ                                                                  : Swaziland
dict_CountrySY                                                                  : Syrie
dict_CountryTW                                                                  : Taïwan
dict_CountryTJ                                                                  : Tadjikistan
dict_CountryTZ                                                                  : Tanzanie
dict_CountryTH                                                                  : Thaïlande
dict_CountryTL                                                                  : Timor Oriental
dict_CountryTK                                                                  : Tokélaou
dict_CountryTO                                                                  : Tonga
dict_CountryTT                                                                  : Trinité-et-Tobago
dict_CountryTR                                                                  : Turquie
dict_CountryTM                                                                  : Turkménistan
dict_CountryTC                                                                  : Iles Turks-et-Caicos
dict_CountryTV                                                                  : Tuvalu
dict_CountryUG                                                                  : Ouganda
dict_CountryUA                                                                  : Ukraine
dict_CountryAE                                                                  : Emirats Arabes Unis
dict_CountryUM                                                                  : Iles Mineures Eloignées des États-Unis
dict_CountryUY                                                                  : Uruguay
dict_CountryUZ                                                                  : Ouzbékistan
dict_CountryVU                                                                  : Vanuatu
dict_CountryVE                                                                  : Vénézuela
dict_CountryVN                                                                  : Viêt Nam
dict_CountryVG                                                                  : Iles Vierges Britanniques
dict_CountryVI                                                                  : Iles Vierges Américaines
dict_CountryWF                                                                  : Wallis-et-Futuna
dict_CountryEH                                                                  : Sahara Occidental
dict_CountryYE                                                                  : Yémen
dict_CountryZM                                                                  : Zambie
dict_CountryZW                                                                  : Zimbabwe
dict_CountryGG                                                                  : Guernesey
dict_CountryIM                                                                  : Ile de Man
dict_CountryJE                                                                  : Jersey
dict_CountryME                                                                  : Monténégro
dict_CountryBL                                                                  : Saint-Barthélemy
dict_CountryMF                                                                  : Saint-Martin
dict_CivilityMME                                                                : Madame
dict_CivilityMR                                                                 : Monsieur
dict_CivilityMLE                                                                : Mademoiselle
dict_CivilityMTRE                                                               : Maître
dict_CivilityDR                                                                 : Docteur
dict_Currencyeuros                                                              : Euros
dict_CurrencyAUD                                                                : Dollars Aus.
dict_CurrencySingAUD                                                            : Dollar Aus.
dict_CurrencyCAD                                                                : Dollars Can.
dict_CurrencySingCAD                                                            : Dollar Can.
dict_CurrencyCHF                                                                : Francs suisses
dict_CurrencySingCHF                                                            : Franc suisse
dict_CurrencyEUR                                                                : Euros
dict_CurrencySingEUR                                                            : Euro
dict_CurrencyFRF                                                                : Francs Français
dict_CurrencySingFRF                                                            : Franc Français
dict_CurrencyGBP                                                                : Livres sterling
dict_CurrencySingGBP                                                            : Livre sterling
dict_CurrencyINR                                                                : Roupies indiennes
dict_CurrencySingINR                                                            : Roupie indienne
dict_CurrencyMAD                                                                : Dirham
dict_CurrencySingMAD                                                            : Dirham
dict_CurrencyMGA                                                                : Ariary
dict_CurrencySingMGA                                                            : Ariary
dict_CurrencyMUR                                                                : Roupies mauritiennes
dict_CurrencySingMUR                                                            : Roupie mauritienne
dict_CurrencyNOK                                                                : Couronnes norvégiennes
dict_CurrencySingNOK                                                            : Couronne norvégienne
dict_CurrencyTND                                                                : Dinars tunisiens
dict_CurrencySingTND                                                            : Dinar tunisien
dict_CurrencyUSD                                                                : Dollars US
dict_CurrencySingUSD                                                            : Dollar US
dict_CurrencyUAH                                                                : Hryvnia
dict_CurrencySingUAH                                                            : Hryvnia
dict_CurrencyXAF                                                                : Francs CFA BEAC
dict_CurrencySingXAF                                                            : Franc CFA BEAC
dict_CurrencyXOF                                                                : Francs CFA BCEAO
dict_CurrencySingXOF                                                            : Franc CFA BCEAO
dict_CurrencyXPF                                                                : Francs CFP
dict_CurrencySingXPF                                                            : Franc CFP
dict_CurrencyCentSingEUR                                                        : centime
dict_CurrencyThousandthSingTND                                                  : millime
dict_CurrencySUR                                                                : Roubles
dict_CurrencySingSUR                                                            : Rouble
dict_CurrencyTRL                                                                : Livres turques
dict_CurrencySingTRL                                                            : Livre turque
dict_DemandReasonTypeSRC_INTE                                                   : Internet
dict_DemandReasonTypeSRC_CAMP_MAIL                                              : Campagne Publipostage
dict_DemandReasonTypeSRC_CAMP_EMAIL                                             : Campagne EMailing
dict_DemandReasonTypeSRC_CAMP_PHO                                               : Campagne Téléphonique
dict_DemandReasonTypeSRC_CAMP_FAX                                               : Campagne Fax
dict_DemandReasonTypeSRC_COMM                                                   : Contact commercial
dict_DemandReasonTypeSRC_SHOP                                                   : Contact en magazin
dict_DemandReasonTypeSRC_WOM                                                    : Bouche à oreille
dict_DemandReasonTypeSRC_PARTNER                                                : Partenaire
dict_DemandReasonTypeSRC_EMPLOYEE                                               : Employé
dict_DemandReasonTypeSRC_SPONSORING                                             : Parrainage/Sponsoring
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
errors_MenuManager                                                              : Gestionnaire de menu
errors_Error                                                                    : Erreur
errors_Errors                                                                   : Erreurs
errors_ErrorBadEMail                                                            : e-mail %s invalide
errors_ErrorBadUrl                                                              : Url %s invalide
errors_ErrorRecordNotFound                                                      : Enregistrement non trouvé.
errors_ErrorFailToCopyFile                                                      : Echec de la copie du fichier '<b>%s</b>' en '<b>%s</b>'.
errors_ErrorFailToRenameFile                                                    : Echec du renommage du fichier '<b>%s</b>' en '<b>%s</b>'.
errors_ErrorFailToDeleteFile                                                    : Echec de l'effacement du fichier '<b>%s</b>'.
errors_ErrorFailToCreateFile                                                    : Echec de la création du fichier '<b>%s</b>'.
errors_ErrorFailToRenameDir                                                     : Echec du renommage du répertoire '<b>%s</b>' en '<b>%s</b>'.
errors_ErrorFailToCreateDir                                                     : Echec de création du répertoire '<b>%s</b>'.
errors_ErrorFailToDeleteDir                                                     : Echec de la suppression du répertoire '<b>%s</b>'.
errors_ErrorFailedToDeleteJoinedFiles                                           : Impossible de supprimer l'entité car il existe des pièces jointes. Supprimer d'abord les pièces jointes.
errors_ErrorThisContactIsAlreadyDefinedAsThisType                               : Ce contact est déjà défini comme contact pour ce type.
errors_ErrorCashAccountAcceptsOnlyCashMoney                                     : Ce compte bancaire est de type caisse et n'accepte que les mode de règlement de type <b>espèce</b>.
errors_ErrorFromToAccountsMustDiffers                                           : Le compte source et destination doivent être différents.
errors_ErrorBadThirdPartyName                                                   : Nom de tiers incorrect
errors_ErrorBadCustomerCodeSyntax                                               : La syntaxe du code client est incorrecte
errors_ErrorCustomerCodeRequired                                                : Code client obligatoire
errors_ErrorCustomerCodeAlreadyUsed                                             : Code client déjà utilisé
errors_ErrorPrefixRequired                                                      : Préfix obligatoire
errors_ErrorUrlNotValid                                                         : L'adresse du site web est incorrecte
errors_ErrorBadSupplierCodeSyntax                                               : La syntaxe du code fournisseur est incorrecte
errors_ErrorSupplierCodeRequired                                                : Code fournisseur obligatoire
errors_ErrorSupplierCodeAlreadyUsed                                             : Code fournisseur déjà utilisé
errors_ErrorBadParameters                                                       : Paramètres incorrects
errors_ErrorBadValueForParameter                                                : Valeur '%s' incorrecte pour le paramètre '%s'
errors_ErrorBadImageFormat                                                      : L'image n'a pas un format reconnu
errors_ErrorBadDateFormat                                                       : La valeur '%s' a un format de date non reconnu
errors_ErrorFailedToWriteInDir                                                  : Impossible d'écrire dans le répertoire %s
errors_ErrorFoundBadEmailInFile                                                 : Syntaxe de mail incorrecte trouvée pour %s lignes dans le fichier (exemple ligne %s avec email=%s)
errors_ErrorUserCannotBeDelete                                                  : L'utilisateur ne peut pas être supprimé. Peut-être est-il associé à des éléments de Speedealing.
errors_ErrorFieldsRequired                                                      : Des champs obligatoires n'ont pas été renseignés
errors_ErrorFailedToCreateDir                                                   : Echec à la création d'un répertoire. Vérifiez que le user du serveur Web a bien les droits d'écriture dans les répertoires documents de Speedealing. Si le paramètre <b>safe_mode</b> a été activé sur ce PHP, vérifier que les fichiers php Speedealing appartiennent à l'utilisateur du serveur Web.
errors_ErrorNoMailDefinedForThisUser                                            : EMail non défini pour cet utilisateur
errors_ErrorFeatureNeedJavascript                                               : Cette fonctionnalité a besoin de javascript activé pour fonctionner. Modifier dans configuration - affichage.
errors_ErrorTopMenuMustHaveAParentWithId0                                       : Un menu de type 'Top' ne peut avoir de menu père. Mettre 0 dans l'id père ou choisir un menu de type 'Left'.
errors_ErrorLeftMenuMustHaveAParentId                                           : Un menu de type 'Left' doit avoir un id de père.
errors_ErrorFileNotFound                                                        : Fichier <b>%s</b> introuvable (Mauvais chemin, permissions incorrectes ou accès interdit par le paramètre PHP openbasedir ou safe_mode)
errors_ErrorDirNotFound                                                         : Répertoire <b>%s</b> introuvable (Mauvais chemin, permissions incorrectes ou accès interdit par le paramètre PHP openbasedir ou safe_mode)
errors_ErrorFunctionNotAvailableInPHP                                           : La fonction <b>%s</b> est requise pour cette fonctionnalité mais n'est pas disponible dans cette version/installation de PHP.
errors_ErrorDirAlreadyExists                                                    : Un répertoire portant ce nom existe déjà.
errors_ErrorFileAlreadyExists                                                   : Un fichier portant ce nom existe déjà.
errors_ErrorPartialFile                                                         : Fichier non reçu intégralement par le serveur.
errors_ErrorNoTmpDir                                                            : Répertoire temporaire de réception %s inexistant.
errors_ErrorUploadBlockedByAddon                                                : Upload bloqué par un plugin PHP/Apache.
errors_ErrorFileSizeTooLarge                                                    : La taille du fichier est trop grande.
errors_ErrorSizeTooLongForIntType                                               : Longueur de champ trop longue pour le type int (%s chiffres maximum)
errors_ErrorSizeTooLongForVarcharType                                           : Longueur de champ trop longue pour le type chaine (%s caractères maximum)
errors_ErrorFieldCanNotContainSpecialCharacters                                 : Le champ <b>%s</b> ne peut contenir de caractères spéciaux.
errors_ErrorNoAccountancyModuleLoaded                                           : Aucun module de comptabilité activé
errors_ErrorExportDuplicateProfil                                               : Ce nom de profil existe déjà pour ce lot d'export.
errors_ErrorLDAPSetupNotComplete                                                : Le matching Speedealing-LDAP est incomplet.
errors_ErrorLDAPMakeManualTest                                                  : Un fichier .ldif a été généré dans le répertoire %s. Essayez de charger ce fichier en manuel depuis la ligne de commande pour plus de détail sur l'erreur.
errors_ErrorCantSaveADoneUserWithZeroPercentage                                 : Impossible de sauver une action à l'état non commencé avec un utilisateur défini comme ayant fait l'action.
errors_ErrorRefAlreadyExists                                                    : La référence utilisée pour la création existe déjà
errors_ErrorPleaseTypeBankTransactionReportName                                 : Veuillez saisir le nom de relevé bancaire sur lequel l'écriture est constatée (Format AAAAMM de préférence ou AAAAMMJJ)
errors_ErrorRecordHasChildren                                                   : Impossible de supprimer l'enregistrement car il possède des enregistrements fils.
errors_ErrorModuleRequireJavascript                                             : Le javascript ne doit pas être désactivé pour que cette fonctionnalité soit utilisable. Pour activer/désactiver l'utilisation de javascript, allez dans le menu Accueil->Configuration->Affichage.
errors_ErrorPasswordsMustMatch                                                  : Les 2 mots de passe saisis doivent correspondre
errors_ErrorContactEMail                                                        : Une erreur technique est apparue. Merci de contacter l'administrateur à l'email suivant <b>%s</b> en lui indiquant le code erreur <b>%s</b> dans votre message ou mieux en fournissant une copie d'écran de cette page.
errors_ErrorWrongValueForField                                                  : Mauvaise valeur pour le champ numéro <b>%s</b> (la valeur '<b>%s</b>' ne respecte pas la règle <b>%s</b>)
errors_ErrorFieldValueNotIn                                                     : Mauvaise valeur pour le champ numéro <b>%s</b> (la valeur '<b>%s</b>' n'est pas une valeure présente dans le champ <b>%s</b> de la table <b>%s</b>)
errors_ErrorFieldRefNotIn                                                       : Mauvaise valeur pour le champ numéro <b>%s</b> (la valeur '<b>%s</b>' n'est pas une référence existante comme <b>%s</b>)
errors_ErrorsOnXLines                                                           : Erreurs sur <b>%s</b> lignes sources
errors_ErrorFileIsInfectedWithAVirus                                            : L'antivirus n'a pas pu valider ce fichier (il est probablement infecté par un virus) !
errors_ErrorSpecialCharNotAllowedForField                                       : Les caractères spéciaux ne sont pas admis pour le champ "%s"
errors_ErrorDatabaseParameterWrong                                              : Le paramètre de configuration de la base de donnée '<b>%s</b>' a une valeur non compatible pour une utilisation de Speedealing (doit avoir la valeur '<b>%s</b>').
errors_ErrorNumRefModel                                                         : Une référence existe en base (%s) et est incompatible avec cette numérotation. Supprimez la ligne ou renommez la référence pour activer ce module.
errors_ErrorQtyTooLowForThisSupplier                                            : Quantité insuffisante pour ce fournisseur ou aucun tarif défini sur ce produit pour ce fournisseur
errors_ErrorModuleSetupNotComplete                                              : La configuration du module semble incomplète. Aller dans l'espace Configuration - Modules pour corriger.
errors_ErrorBadMask                                                             : Erreur sur le masque
errors_ErrorBadMaskFailedToLocatePosOfSequence                                  : Erreur, masque sans numéro de séquence
errors_ErrorBadMaskBadRazMonth                                                  : Erreur, mauvais valeur de remise à zéro
errors_ErrorSelectAtLeastOne                                                    : Erreur. Sélectionnez au moins une entrée.
errors_ErrorProductWithRefNotExist                                              : La référence produit '<i>%s</i>' n'existe pas
errors_ErrorDeleteNotPossibleLineIsConsolidated                                 : Suppression impossible car l'enregistrement porte sur au moins une transaction bancaire rapprochée
errors_ErrorProdIdAlreadyExist                                                  : %s est attribué à un autre tiers
errors_ErrorFailedToSendPassword                                                : Échec de l'envoi du mot de passe
errors_ErrorFailedToLoadRSSFile                                                 : Echec de la récupération du flux RSS. Ajouter la constante MAIN_SIMPLEXMLLOAD_DEBUG si le message d'erreur n'est pas assez explicite.
errors_ErrorPasswordDiffers                                                     : Les mots de passe ne sont pas identiques, veuillez les saisir à nouveau
errors_ErrorForbidden                                                           : Accès non autorisé.<br>Vous essayez d'accéder à une page, zone ou fonction sans être au sein d'une session authentifiée ou qui n'est pas autorisée pour votre compte utilisateur.
errors_ErrorForbidden2                                                          : Les permissions pour ce login peuvent être attribuées par l'administrateur Speedealing via le menu %s -> %s.
errors_ErrorForbidden3                                                          : Speedealing ne semble pas fonctionner au sein d'une session authentifiée. Consultez la documentation d'installation de Speedealing pour savoir comment gérer les authentifications (htaccess, mod_auth ou autre...).
errors_ErrorNoImagickReadimage                                                  : La classe Imagick n'est pas présente sur cette installation de PHP. L'aperçu n'est donc pas disponible. Les administrateurs peuvent désactiver cet onglet dans le menu Configuration - Affichage.
errors_ErrorRecordAlreadyExists                                                 : Enregistrement déjà existant
errors_ErrorCantReadFile                                                        : Échec de lecture du fichier '%s'
errors_ErrorCantReadDir                                                         : Échec de lecture du répertoire '%s'
errors_ErrorFailedToFindEntity                                                  : Échec de lecture de l'environnement '%s'
errors_ErrorBadLoginPassword                                                    : Identifiants login ou mot de passe incorrects
errors_ErrorLoginDisabled                                                       : Votre compte est désactivé
errors_ErrorFailedToRunExternalCommand                                          : Échec de l'exécution de la commande externe. Vérifiez qu'elle est disponible et exécutable par votre serveur PHP. Si le <b>Safe Mode</b> PHP est actif, vérifiez que la commande se trouve dans un répertoire définie dans le paramètre <b>safe_mode_exec_dir</b>.
errors_ErrorFailedToChangePassword                                              : Échec de modification du mot de passe
errors_ErrorLoginDoesNotExists                                                  : Le compte utilisateur de login <b>%s</b> n'a pu être trouvé.
errors_ErrorLoginHasNoEmail                                                     : Cet utilisateur n'a pas d'email. Impossible de continuer.
errors_ErrorBadValueForCode                                                     : Mauvaise valeur saisie pour le code. Réessayez avec une nouvelle valeur...
errors_ErrorBothFieldCantBeNegative                                             : Les champs %s et %s ne peuvent être tous deux négatifs
errors_ErrorWebServerUserHasNotPermission                                       : Le compte d'execution du serveur web <b>%s</b> n'a pas les permissions pour cela
errors_ErrorNoActivatedBarcode                                                  : Aucun type de code bar activé
errors_ErrUnzipFails                                                            : Impossible de décompresser le fichier %s avec ZipArchive
errors_ErrNoZipEngine                                                           : Pas de moteur pour décompresser le fichier %s dans ce PHP
errors_ErrorFileMustBeASpeedealingPackage                                       : The file %s must be a Speedealing zip package
errors_ErrorFileRequired                                                        : Il faut un fichier de package Speedealing
errors_ErrorPhpCurlNotInstalled                                                 : The PHP CURL is not installed, this is essential to talk with Paypal
errors_ErrorFailedToAddToMailmanList                                            : Failed to add record to Mailman list or SPIP base
errors_ErrorNewVaueCantMatchOldValue                                            : New value can't be equal to old one
errors_ErrorDuplicateTrigger                                                    : Un fichier trigger de classe '<b>%s</b>' est présent plusieurs fois. Supprimer le doublon du répertoire '<b>%s</b>'.
errors_SESSIONEXPIRE                                                            : La session est expirée
errors_WarningMandatorySetupNotComplete                                         : Les informations de configuration obligatoire doivent être renseignées
errors_WarningSafeModeOnCheckExecDir                                            : Attention, l'option PHP <b>safe_mode</b> est active, la commande doit dont être dans un répertoire déclaré dans le paramètre php <b>safe_mode_exec_dir</b>.
errors_WarningAllowUrlFopenMustBeOn                                             : Attention, le paramètre <b>allow_url_fopen</b> doit être positionné à <b>on</b> dans le fichier <b>php.ini</b> pour que ce module soit pleinement opérationnel. Vous devez modifier ce fichier manuellement.
errors_WarningBuildScriptNotRunned                                              : Le script <b>%s</b> n'a pas encore été lancé pour générer les graphiques ou il n'y a aucune donnée à afficher.
errors_WarningBookmarkAlreadyExists                                             : Un marque-page avec ce titre ou cette destination (URL) existe déjà.
errors_WarningPassIsEmpty                                                       : Attention, le mot de passe de la base de données Speedealing est vide. Cela représente une faille de sécurité. Il est recommandé d'ajouter manuellement un mot de passe à la base et de modifier le fichier conf.php pour refléter ce changement.
errors_WarningConfFileMustBeReadOnly                                            : Attention, votre fichier de configuration (<b>htdocs/conf/conf.php</b>) est accessible en écriture au serveur Web. Ceci représente une faille sérieuse de sécurité. Modifiez les permissions pour qu'il soit en lecture seule pour le compte sous lequel tourne le serveur Web et non lisible pour les autres.<br>Si vous êtes sous Windows sur un disque dur utilisant un formatage FAT, sachez que ce système de fichier ne permet pas de protéger des fichiers et n'offre donc aucune solution pour réduire les risques de manipulation de ce fichier.
errors_WarningsOnXLines                                                         : Alertes sur <b>%s</b> lignes sources
errors_WarningNoDocumentModelActivated                                          : Aucun modèle, pour la génération de document, n'a été activé. Un modèle sera pris par défaut en attendant la correction de configuration du module.
errors_WarningLockFileDoesNotExists                                             : Attention, une fois l'installation terminée, les outils d'installation/migration doivent être désactivés en ajoutant un fichier <b>install.lock</b> dans le répertoire <b>%s</b>. L'absence de ce fichier représente une faille de sécurité.
errors_WarningUntilDirRemoved                                                   : Les alertes de sécurité sont visibles par les administrateurs uniquement et resteront actives tant que la vulnérabilité sera avérée (ou que la constante MAIN_REMOVE_INSTALL_WARNING aura été définie dans Configuration->Divers)
errors_WarningCloseAlways                                                       : Attention, la fermeture se fait même lorsque le montant diffère. N'activez cette fonctionnalité qu'en connaissance de cause.
errors_ErrorEnterYourLogin                                                      : Identifiant vide
errors_ErrorEnterYourPassword                                                   : Mot de passe vide
mails_Mailing                                                                   : EMailing
mails_EMailing                                                                  : EMailing
mails_Mailings                                                                  : EMailings
mails_EMailings                                                                 : EMailings
mails_AllEMailings                                                              : Tous les EMailings
mails_MailCard                                                                  : Fiche emailing
mails_MailTargets                                                               : Destinataires
mails_MailRecipients                                                            : Destinataires
mails_MailRecipient                                                             : Destinataire
mails_MailTitle                                                                 : Description
mails_MailFrom                                                                  : Émetteur
mails_MailErrorsTo                                                              : Erreurs à
mails_MailReply                                                                 : Réponse à
mails_MailTo                                                                    : Destinataire(s)
mails_MailCC                                                                    : Copie à
mails_MailCCC                                                                   : Copie cachée à
mails_MailTopic                                                                 : Sujet du mail
mails_MailText                                                                  : Message
mails_MailFile                                                                  : Fichiers joints
mails_MailMessage                                                               : Message du mail
mails_ShowEMailing                                                              : Afficher emailing
mails_ListOfEMailings                                                           : Liste des emailings
mails_NewMailing                                                                : Nouvel emailing
mails_EditMailing                                                               : Éditer emailing
mails_ResetMailing                                                              : Nouvel envoi
mails_DeleteMailing                                                             : Supprimer emailing
mails_DeleteAMailing                                                            : Supprimer un emailing
mails_PreviewMailing                                                            : Prévisualiser emailing
mails_PrepareMailing                                                            : Préparer emailing
mails_CreateMailing                                                             : Créer emailing
mails_MailingDesc                                                               : Cette page vous permet d'envoyer des emailings à un groupe de personnes.
mails_MailingResult                                                             : Résultat de l'envoi de mails
mails_TestMailing                                                               : Tester emailing
mails_ValidMailing                                                              : Valider emailing
mails_ApproveMailing                                                            : Approuver emailing
mails_MailingStatusDraft                                                        : Brouillon
mails_MailingStatusValidated                                                    : Validé
mails_MailingStatusApproved                                                     : Approuvé
mails_MailingStatusSent                                                         : Envoyé
mails_MailingStatusSentPartialy                                                 : Envoyé partiellement
mails_MailingStatusSentCompletely                                               : Envoyé complètement
mails_MailingStatusError                                                        : Erreur
mails_MailingStatusNotSent                                                      : Non envoyé
mails_MailSuccessfulySent                                                       : Mail correctement envoyé (de %s à %s)
mails_MailingSuccessfullyValidated                                              : Mail validé
mails_MailUnsubcribe                                                            : Desinscription
mails_Unsuscribe                                                                : Desinscription
mails_MailingStatusNotContact                                                   : Ne plus contacter
mails_ErrorMailRecipientIsEmpty                                                 : L'adresse du destinataire est vide
mails_WarningNoEMailsAdded                                                      : Aucun nouvel e-mail à ajouter à la liste des destinataires.
mails_ConfirmValidMailing                                                       : Confirmez-vous la validation du mailing ?
mails_ConfirmResetMailing                                                       : Attention, en réinitialisant le mailing <b>%s</b>, vous autorisez son émission en masse une nouvelle fois. Est-ce bien ce que vous voulez faire ?
mails_ConfirmDeleteMailing                                                      : Confirmez-vous la suppression du mailing ?
mails_NbOfRecipients                                                            : Nombre de destinataires
mails_NbOfUniqueEMails                                                          : Nb d'emails uniques
mails_NbOfEMails                                                                : Nbre d'EMails
mails_TotalNbOfDistinctRecipients                                               : Nombre de destinataires uniques
mails_NoTargetYet                                                               : Aucun destinataire défini (Aller sur l'onglet Destinataires)
mails_AddRecipients                                                             : Ajout de destinataires
mails_RemoveRecipient                                                           : Supprime destinataire
mails_CommonSubstitutions                                                       : Substitutions communes
mails_YouCanAddYourOwnPredefindedListHere                                       : Pour créer votre module sélection mails, voir htdocs/core/modules/mailings/README.
mails_EMailTestSubstitutionReplacedByGenericValues                              : En mode test, les variables de substitution sont remplacées par des valeurs génériques
mails_MailingAddFile                                                            : Joindre ce fichier
mails_NoAttachedFiles                                                           : Aucun fichier joint
mails_BadEMail                                                                  : EMail incorrect
mails_CloneEMailing                                                             : Cloner Emailing
mails_ConfirmCloneEMailing                                                      : Êtes vous sûr de vouloir cloner cet emailing ?
mails_CloneContent                                                              : Cloner message
mails_CloneReceivers                                                            : Cloner destinataires
mails_DateLastSend                                                              : Date du dernier envoi
mails_DateSending                                                               : Date envoi
mails_SentTo                                                                    : Envoyés à <b>%s</b>
mails_MailingStatusRead                                                         : Lu
mails_CheckRead                                                                 : Accusé de lecture
mails_YourMailUnsubcribeOK                                                      : L'adresse e-mail <b>%s</b> est bien désincrite de la liste.
mails_MailtoEMail                                                               : Ecrire a e-mail (lien)
mails_ActivateCheckRead                                                         : Permettre l'utilisation du tracker d'accusé de lecture et du lien de désincription
mails_ActivateCheckReadKey                                                      : Clef de sécurité utilisée pour l'encryption des URL utilisées dans les fonctions d'accusé de lecture et de désincription
mails_MailingModuleDescContactCompanies                                         : Contacts de tiers (prospects, clients, fournisseurs...)
mails_MailingModuleDescSpeedealingUsers                                         : Speedealing users
mails_MailingModuleDescFundationMembers                                         : Adhérents
mails_MailingModuleDescEmailsFromFile                                           : EMails issus d'un fichier texte (email;nom;prenom;autre)
mails_MailingModuleDescEmailsFromUser                                           : EMails saisi manuellement (email;nom;prenom;autre)
mails_MailingModuleDescContactsCategories                                       : Tiers (par catégorie)
mails_MailingModuleDescSpeedealingContractsLinesExpired                         : Third parties with expired contract's lines
mails_MailingModuleDescContactsByCompanyCategory                                : Contacts de tiers (par catégorie de tiers)
mails_MailingModuleDescMembersCategories                                        : Adhérents (par catégorie)
mails_MailingModuleDescContactsByFunction                                       : Contacts de tiers (par poste/fonction)
mails_LineInFile                                                                : Ligne %s du fichier
mails_RecipientSelectionModules                                                 : Modules de sélection des destinataires
mails_MailSelectedRecipients                                                    : Destinataires sélectionnés
mails_MailingArea                                                               : Espace emailings
mails_LastMailings                                                              : Les %s derniers emailings
mails_TargetsStatistics                                                         : Statistiques destinataires
mails_NbOfCompaniesContacts                                                     : Contacts uniques des sociétés
mails_MailNoChangePossible                                                      : Destinataires d'un mailing validé non modifiables
mails_SearchAMailing                                                            : Rechercher un mailing
mails_SendMailing                                                               : Envoi emailing
mails_SendMail                                                                  : Envoyer par email
mails_SentBy                                                                    : Envoyé par
mails_MailingNeedCommand                                                        : Pour des raisons de sécurité, il est recommandé de faire les envois d'un mailing de masse depuis une ligne de commande. Demandez à votre administrateur de lancer la commande suivante pour envoyer le mailing à tous les destinataires :
mails_MailingNeedCommand2                                                       : Vous pouvez toutefois quand même les envoyer par l'interface écrans en ajoutant le paramètre MAILING_LIMIT_SENDBYWEB avec la valeur du nombre max de mails envoyés par session d'envoi. Pour cela, aller dans Accueil - Configuration - Divers.
mails_ConfirmSendingEmailing                                                    : Confirmez-vous l'envoi de l'emailing depuis le mode web ?
mails_LimitSendingEmailing                                                      : L'envoi d'un emailing depuis les écrans est limité pour raisons de sécurité et de timeout à <b>%s</b> destinataires par session d'envoi.
mails_TargetsReset                                                              : Vider liste
mails_ToClearAllRecipientsClickHere                                             : Pour vider la liste des destinataires de cet emailing, cliquer le bouton
mails_ToAddRecipientsChooseHere                                                 : Pour ajouter des destinataires, choisir dans les listes ci-dessous
mails_NbOfEMailingsReceived                                                     : EMailings de masse reçus
mails_IdRecord                                                                  : ID enregistrement
mails_DeliveryReceipt                                                           : Accusé de réception
mails_YouCanUseCommaSeparatorForSeveralRecipients                               : Vous pouvez utiliser le caractère de séparation <b>virgule</b> pour spécifier plusieurs destinataires.
mails_TagCheckMail                                                              : Tracker ouverture mail
mails_TagUnsubscribe                                                            : Lien désinscription mailing masse
mails_TagSignature                                                              : Signature utilisateur émetteur
mails_TagMailtoEmail                                                            : EMail destinataire
mails_Notifications                                                             : Notifications
mails_NoNotificationsWillBeSent                                                 : Aucune notification par email n'est prévue pour cet événement et société
mails_ANotificationsWillBeSent                                                  : 1 notification va être envoyée par email
mails_SomeNotificationsWillBeSent                                               : %s notifications vont être envoyées par email
mails_AddNewNotification                                                        : Activer une nouvelle demande de notification email
mails_ListOfActiveNotifications                                                 : Liste des demandes de notifications emails actives
mails_ListOfNotificationsDone                                                   : Liste des notifications emails envoyées
mails_Title                                                                     : Object du mail
mails_Subtitle                                                                  : Message important dans le mail
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
main_DatabaseConnection                                                         : Connexion à la base
main_NoTranslation                                                              : Pas de traduction
main_NoRecordFound                                                              : Aucun enregistrement trouvé
main_NoError                                                                    : Aucune erreur
main_Error                                                                      : Erreur
main_ErrorFieldRequired                                                         : Le champ '%s' est obligatoire
main_ErrorFieldFormat                                                           : Le champ '%s' a une valeur incorrecte
main_ErrorFileDoesNotExists                                                     : Le fichier %s n'existe pas
main_ErrorFailedToOpenFile                                                      : Impossible d'ouvrir le fichier %s
main_ErrorCanNotCreateDir                                                       : Impossible de créer le répertoire %s
main_ErrorCanNotReadDir                                                         : Impossible de lire le répertoire %s
main_ErrorConstantNotDefined                                                    : Paramètre %s non défini
main_ErrorUnknown                                                               : Erreur inconnue
main_ErrorSQL                                                                   : Erreur SQL
main_ErrorLogoFileNotFound                                                      : Le fichier logo '%s' n'a pas été trouvé
main_ErrorGoToGlobalSetup                                                       : Allez dans la Configuration 'Société/Institution' pour corriger
main_ErrorGoToModuleSetup                                                       : Allez dans la Configuration du module pour corriger
main_ErrorFailedToSendMail                                                      : Échec de l'envoi du mail (émetteur=%s, destinataire=%s)
main_ErrorAttachedFilesDisabled                                                 : La gestion des fichiers associés est désactivée sur ce serveur
main_ErrorFileNotUploaded                                                       : Le fichier n'a pas été transféré. Vérifiez que sa taille ne dépasse pas le maxium autorisé, que l'espace disque est disponible et qu'un fichier du même nom n'existe pas déjà.
main_ErrorInternalErrorDetected                                                 : Erreur détectée
main_ErrorNoRequestRan                                                          : Aucune requête exécutée
main_ErrorWrongHostParameter                                                    : Mauvais paramètre Serveur
main_ErrorYourCountryIsNotDefined                                               : Votre pays n'est pas défini. Corriger en allant dans Accueil-Configuration-Société/Institution-Editer.
main_ErrorRecordIsUsedByChild                                                   : Impossible de supprimer cet enregistrement. Ce dernier est utilisé en tant que père par au moins un enregistrement fils.
main_ErrorWrongValue                                                            : Valeur incorrecte
main_from                                                                       : De
main_Associations                                                               : Associations
main_ErrorWrongValueForParameterX                                               : Valeur incorrecte pour le paramètre %s
main_ErrorNoRequestInError                                                      : Aucune requête en erreur
main_ErrorServiceUnavailableTryLater                                            : Service non disponible actuellement. Réessayer plus tard.
main_ErrorDuplicateField                                                        : Doublon dans un champ unique
main_ErrorSomeErrorWereFoundRollbackIsDone                                      : Des erreurs ont été trouvées. On rollback les modifications.
main_ErrorConfigParameterNotDefined                                             : Le paramètre <b>%s</b> n'est pas défini dans le fichier de configuration Speedealing <b>conf.php</b>.
main_ErrorCantLoadUserFromSpeedealingDatabase                                   : Failed to find user <b>%s</b> in Speedealing database.
main_ErrorNoVATRateDefinedForSellerCountry                                      : Erreur, aucun taux tva défini pour le pays '%s'.
main_ErrorNoSocialContributionForSellerCountry                                  : Erreur, aucun type de charges défini pour le pays '%s'.
main_ErrorFailedToSaveFile                                                      : Erreur, l'enregistrement du fichier a échoué.
main_ErrorOnlyPngJpgSupported                                                   : Erreur, seuls les formats images .jpg et .png sont supportés.
main_ErrorImageFormatNotSupported                                               : Votre PHP ne supporte pas les fonctions de conversion de ce format d'image.
main_SeeAlso                                                                    : Voir aussi %s
main_BackgroundColorByDefault                                                   : Couleur de fond
main_FileWasNotUploaded                                                         : Un fichier a été sélectionné pour attachement mais n'a pas encore été uploadé. Cliquez sur "Joindre ce fichier" pour cela.
main_NbOfEntries                                                                : Nb d'entrées
main_GoToWikiHelpPage                                                           : Consulter l'aide (nécessite un accès internet)
main_GoToHelpPage                                                               : Consulter l'aide
main_RecordSaved                                                                : Enregistrement sauvegardé
main_LevelOfFeature                                                             : Niveau de fonctionnalités
main_NotDefined                                                                 : Non défini
main_DefinedAndHasThisValue                                                     : Defined and value to
main_IsNotDefined                                                               : undefined
main_SpeedealingInHttpAuthenticationSoPasswordUseless                           : Speedealing authentication mode is setup to <b>%s</b> in configuration file <b>conf.php</b>.<br>This means that password database is extern to Speedealing, so changing this field may have no effects.
main_Administrator                                                              : Administrateur
main_Undefined                                                                  : Non défini
main_PasswordForgotten                                                          : Mot de passe oublié ?
main_SeeAbove                                                                   : Voir ci-dessus
main_HomeArea                                                                   : Espace accueil
main_LastConnexion                                                              : Dernière connexion
main_PreviousConnexion                                                          : Connexion précédente
main_ConnectedOnMultiCompany                                                    : Connexion sur l'entité
main_ConnectedSince                                                             : Connecté depuis
main_AuthenticationMode                                                         : Mode authentification
main_RequestedUrl                                                               : Url sollicitée
main_DatabaseTypeManager                                                        : Type gestionnaire de base de données
main_RequestLastAccess                                                          : Requête dernier accès en base
main_RequestLastAccessInError                                                   : Requête dernier accès en base en erreur
main_ReturnCodeLastAccessInError                                                : Code retour dernier accès en base en erreur
main_InformationLastAccessInError                                               : Information sur le dernier accès en base en erreur
main_SpeedealingHasDetectedError                                                : Speedealing has detected a technical error
main_InformationToHelpDiagnose                                                  : Voici les informations qui pourront aider au diagnostic
main_MoreInformation                                                            : Plus d'information
main_NotePublic                                                                 : Note (publique / affichée sur le pdf)
main_NotePrivate                                                                : Note (privée)
main_PrecisionUnitIsLimitedToXDecimals                                          : Speedealing a été configuré pour limiter la précision des prix unitaires à <b>%s</b> décimales.
main_DoTest                                                                     : Tester
main_ToFilter                                                                   : Filtrer
main_WarningYouHaveAtLeastOneTaskLate                                           : Attention, vous avez au moins un élément qui a dépassé le délai de tolérance de retard.
main_yes                                                                        : oui
main_Yes                                                                        : Oui
main_no                                                                         : non
main_No                                                                         : Non
main_All                                                                        : Tout
main_All2                                                                       : Tous
main_Home                                                                       : Accueil
main_Help                                                                       : Aide
main_OnlineHelp                                                                 : Aide en ligne
main_PageWiki                                                                   : Page Wiki
main_Always                                                                     : Toujours
main_Never                                                                      : Jamais
main_Under                                                                      : sous
main_Period                                                                     : Période
main_PeriodEndDate                                                              : Date fin période
main_Activate                                                                   : Activer
main_Activated                                                                  : Activé
main_Closed                                                                     : Clôturé
main_Close                                                                      : Clôturer
main_Closed2                                                                    : Fermé
main_Enabled                                                                    : Actif
main_Disable                                                                    : Désactiver
main_Disabled                                                                   : Désactivé
main_Add                                                                        : Ajouter
main_AddLink                                                                    : Lier
main_Update                                                                     : Modifier
main_AddActionToDo                                                              : Ajouter action à faire
main_AddActionDone                                                              : Ajouter action faite
main_Close2                                                                     : Fermer
main_Confirm                                                                    : Confirmer
main_ConfirmSendCardByMail                                                      : Voulez vous envoyer le contenu de cette fiche par mail à l'adresse <b>%s</b> ?
main_Delete                                                                     : Supprimer
main_Remove                                                                     : Enlever
main_Resiliate                                                                  : Résilier
main_Cancel                                                                     : Annuler
main_Modify                                                                     : Modifier
main_Edit                                                                       : Éditer
main_Validate                                                                   : Valider
main_ToValidate                                                                 : À valider
main_Save                                                                       : Enregistrer
main_SaveAs                                                                     : Enregistrer sous
main_TestConnection                                                             : Tester la connexion
main_ToClone                                                                    : Dupliquer
main_ConfirmClone                                                               : Veuillez choisir votre option de clonage :
main_NoCloneOptionsSpecified                                                    : Aucun option de clonage n'a été spécifiée.
main_Of                                                                         : du
main_CopyOf                                                                     : Copie de
main_Show                                                                       : Voir
main_ShowCardHere                                                               : Voir la fiche ici
main_Search                                                                     : Rechercher
main_SearchOf                                                                   : Recherche de
main_Valid                                                                      : Valider
main_ToBill                                                                     : Facturer
main_Approve                                                                    : Approuver
main_ReOpen                                                                     : Réouvrir
main_Upload                                                                     : Envoyer fichier
main_Select                                                                     : Sélectionner
main_Choose                                                                     : Choisir
main_ChooseLangage                                                              : Choisissez votre langue
main_Resize                                                                     : Redimensionner
main_Recenter                                                                   : Recadrer
main_Author                                                                     : Auteur
main_User                                                                       : Utilisateur
main_Users                                                                      : Utilisateurs
main_Group                                                                      : Groupe
main_Groups                                                                     : Groupes
main_Password                                                                   : Mot de passe
main_PasswordRetype                                                             : Retaper le mot de passe
main_NoteSomeFeaturesAreDisabled                                                : Attention, seules quelques modules/fonctionnalités ont été activés dans cette démo.
main_Name                                                                       : Nom
main_Person                                                                     : Personne
main_Parameter                                                                  : Paramètre
main_Parameters                                                                 : Paramètres
main_Value                                                                      : Valeur
main_GlobalValue                                                                : Valeur globale
main_PersonalValue                                                              : Valeur personnelle
main_NewValue                                                                   : Nouvelle valeur
main_CurrentValue                                                               : Valeur courante
main_Code                                                                       : Code
main_Type                                                                       : Type
main_Language                                                                   : Langue
main_MultiLanguage                                                              : Multi-langage
main_Note                                                                       : Note
main_CurrentNote                                                                : Note actuelle
main_Title                                                                      : Titre
main_Subtitle                                                                   : Sous-titre
main_Label                                                                      : Libellé
main_RefOrLabel                                                                 : Réf. ou libellé
main_Info                                                                       : Suivi
main_Family                                                                     : Famille
main_SubFamily                                                                  : Sous-famille
main_Description                                                                : Description
main_InternalDescription                                                        : Description interne
main_DescriptionShort                                                           : Description courte
main_Designation                                                                : Désignation
main_Model                                                                      : Modèle
main_DefaultModel                                                               : Modèle par défaut
main_Action                                                                     : Action
main_About                                                                      : À propos
main_Number                                                                     : Nombre
main_NumberByMonth                                                              : Nombre par mois
main_AmountByMonth                                                              : Montant par mois
main_Numero                                                                     : Numéro
main_Limit                                                                      : Limite
main_Limits                                                                     : Limites
main_DevelopmentTeam                                                            : Équipe de développement
main_Logout                                                                     : Déconnexion
main_Connection                                                                 : Connexion
main_Setup                                                                      : Configuration
main_Alert                                                                      : Alerte
main_Previous                                                                   : Précédent
main_Next                                                                       : Suivant
main_Cards                                                                      : Fiches
main_Card                                                                       : Fiche
main_Now                                                                        : Maintenant
main_Date                                                                       : Date
main_DateStart                                                                  : Date début
main_DateEnd                                                                    : Date fin
main_DateCreation                                                               : Date création
main_DateModification                                                           : Date modification
main_DateModificationShort                                                      : Date modif.
main_DateLastModification                                                       : Date dernière modification
main_DateValidation                                                             : Date validation
main_DateClosing                                                                : Date clôture
main_DateDue                                                                    : Date échéance
main_DateValue                                                                  : Date valeur
main_DateValueShort                                                             : Date valeur
main_DateOperation                                                              : Date opération
main_DateOperationShort                                                         : Date opé.
main_DateLimit                                                                  : Date limite
main_DateRequest                                                                : Date demande
main_DateProcess                                                                : Date traitement
main_DatePlanShort                                                              : Date planif.
main_DateRealShort                                                              : Date réal.
main_DateBuild                                                                  : Date génération du rapport
main_DatePayment                                                                : Date paiement
main_DurationYear                                                               : an
main_DurationMonth                                                              : mois
main_DurationWeek                                                               : semaine
main_DurationDay                                                                : jour
main_DurationYears                                                              : ans
main_DurationMonths                                                             : mois
main_DurationWeeks                                                              : semaines
main_DurationDays                                                               : jours
main_Year                                                                       : Année
main_Month                                                                      : Mois
main_Week                                                                       : Semaine
main_Day                                                                        : Jour
main_Hour                                                                       : Heure
main_Minute                                                                     : Minute
main_Second                                                                     : Seconde
main_Years                                                                      : Années
main_Months                                                                     : Mois
main_Days                                                                       : Jours
main_days                                                                       : jours
main_Hours                                                                      : Heures
main_Minutes                                                                    : Minutes
main_Seconds                                                                    : Secondes
main_Today                                                                      : Aujourd'hui
main_Yesterday                                                                  : Hier
main_Tomorrow                                                                   : Demain
main_Quadri                                                                     : Trimestre
main_MonthOfDay                                                                 : Mois du jour
main_HourShort                                                                  : H
main_Rate                                                                       : Taux
main_UseLocalTax                                                                : Inclure taxe
main_LocalTaxDesc                                                               : Certains pays appliquent 2 voir 3 taux sur chaque ligne de facture. Si c'est le cas, choisissez le type du deuxième et troisième taux et sa valeur. Les types possibles sont:<br>1 : taxe locale sur les produits et services hors tva (la tva n'est pas appliquée sur la taxe locale)<br>2 : taxe locale sur les produits et services avant tva (la tva est appliquée sur le montant + la taxe locale)<br>3 : taxe locale uniquement sur les produits hors tva (la tva n'est pas appliquée sur la taxe locale)<br>4 : taxe locale uniquement sur les produits avant tva (la tva est appliquée sur le montant + la taxe locale)<br>5 : taxe locale uniquement sur les services hors tva (la tva n'est pas appliquée sur la taxe locale)<br>6 : taxe locale uniquement sur les service avant tva (la tva est appliquée sur le montant + la taxe locale)<br>7 : la taxe locale est un montant fixe ajouté au total de la facture
main_Bytes                                                                      : Octets
main_KiloBytes                                                                  : Kilooctets
main_MegaBytes                                                                  : Mégaoctets
main_GigaBytes                                                                  : Gigaoctets
main_TeraBytes                                                                  : Teraoctets
main_b                                                                          : o.
main_Kb                                                                         : Ko
main_Mb                                                                         : Mo
main_Gb                                                                         : Go
main_Tb                                                                         : To
main_Cut                                                                        : Couper
main_Copy                                                                       : Copier
main_Paste                                                                      : Coller
main_Default                                                                    : Défaut
main_DefaultValue                                                               : Valeur par défaut
main_DefaultGlobalValue                                                         : Valeur globale
main_Price                                                                      : Prix
main_UnitPrice                                                                  : Prix unitaire
main_UnitPriceHT                                                                : Prix unitaire HT
main_UnitPriceTTC                                                               : Prix unitaire TTC
main_PriceU                                                                     : P.U.
main_PriceUHT                                                                   : P.U. HT
main_PriceUTTC                                                                  : P.U. TTC
main_Amount                                                                     : Montant
main_AmountInvoice                                                              : Montant facture
main_AmountPayment                                                              : Montant paiement
main_AmountHTShort                                                              : Montant HT
main_AmountTTCShort                                                             : Montant TTC
main_AmountHT                                                                   : Montant HT
main_AmountTTC                                                                  : Montant TTC
main_AmountVAT                                                                  : Montant TVA
main_AmountLT1ES                                                                : Montant RE
main_AmountLT2ES                                                                : Montant IRPF
main_AmountTotal                                                                : Montant total
main_AmountAverage                                                              : Montant moyen
main_Amounts                                                                    : Montants
main_PriceQtyHT                                                                 : Prix pour la quantité HT
main_PriceQtyMinHT                                                              : Prix quantité min. HT
main_PriceQtyTTC                                                                : Prix pour la quantité TTC
main_PriceQtyMinTTC                                                             : Prix quantité min. TTC
main_Percentage                                                                 : Pourcentage
main_Total                                                                      : Total
main_SubTotal                                                                   : Sous-total
main_TotalHTbuy                                                                 : Prix achat HT
main_TotalHTsell                                                                : Prix vente HT
main_TotalHT                                                                    : Total HT
main_TotalTTC                                                                   : Total TTC
main_TotalTTCToYourCredit                                                       : Total TTC à votre crédit
main_TotalVAT                                                                   : Total TVA
main_TotalLT1ES                                                                 : Total RE
main_TotalLT2ES                                                                 : Total IRPF
main_IncludedVAT                                                                : Dont TVA
main_TotalWeight                                                                : Poids total
main_HT                                                                         : HT
main_TTC                                                                        : TTC
main_VAT                                                                        : TVA
main_LT1ES                                                                      : RE
main_LT2ES                                                                      : IRPF
main_VATRate                                                                    : Taux TVA
main_Average                                                                    : Moyenne
main_Sum                                                                        : Somme
main_Delta                                                                      : Écart
main_Module                                                                     : Module
main_Option                                                                     : Option
main_List                                                                       : Liste
main_FullList                                                                   : Liste complète
main_FullScreen                                                                 : Plein écran
main_Reduce                                                                     : Réduire
main_Statistics                                                                 : Statistiques
main_OtherStatistics                                                            : Autres statistics
main_Status                                                                     : État
main_Status2                                                                    : Statut
main_Ref                                                                        : Réf.
main_RefSupplier                                                                : Réf. fournisseur
main_RefPayment                                                                 : Réf. paiement
main_CommercialProposals                                                        : Propositions commerciales/devis
main_Comment                                                                    : Commentaire
main_Comments                                                                   : Commentaires
main_ActionsToDo                                                                : Actions à faire
main_ActionsDone                                                                : Actions effectués
main_ActionsToDoShort                                                           : À faire
main_ActionsRunningshort                                                        : Started
main_ActionsDoneShort                                                           : Effectuées
main_ActionNotApplicable                                                        : Non applicable
main_ActionRunningNotStarted                                                    : A réaliser
main_ActionRunningShort                                                         : En cours
main_ActionDoneShort                                                            : Terminé
main_CompanyFoundation                                                          : Société ou institution
main_ContactsForCompany                                                         : Contacts de ce tiers
main_ContactsAddressesForCompany                                                : Contacts/adresses de ce tiers
main_AddressesForCompany                                                        : Adresses de ce tiers
main_Address                                                                    : Adresse
main_ActionsOnCompany                                                           : Événements vis à vis de ce tiers
main_ActionsOnMember                                                            : Événements vis à vis de cet adhérent
main_NActions                                                                   : %s événements
main_NActionsLate                                                               : %s en retard
main_Filter                                                                     : Filtre
main_RemoveFilter                                                               : Supprimer filtre
main_ChartGenerated                                                             : Graphiques générés
main_ChartNotGenerated                                                          : Graphique non généré
main_GeneratedOn                                                                : Généré le %s
main_Generate                                                                   : Générer
main_Duration                                                                   : Durée
main_TotalDuration                                                              : Durée totale
main_Summary                                                                    : Résumé
main_MyBookmarks                                                                : Mes marques pages
main_OtherInformationsBoxes                                                     : Autres boîtes d'informations
main_SpeedealingBoard                                                           : Speedealing board
main_SpeedealingStateBoard                                                      : Statistics
main_SpeedealingWorkBoard                                                       : Work tasks board
main_Available                                                                  : Disponible
main_NotYetAvailable                                                            : Pas encore disponible
main_NotAvailable                                                               : Non disponible
main_Popularity                                                                 : Popularité
main_Categories                                                                 : Catégories
main_Category                                                                   : Catégorie
main_By                                                                         : Par
main_From                                                                       : Du
main_to                                                                         : au
main_and                                                                        : et
main_or                                                                         : ou
main_Other                                                                      : Autre
main_Others                                                                     : Autres
main_OtherInformations                                                          : Autres informations
main_Quantity                                                                   : Quantité
main_Qty                                                                        : Qté
main_ChangedBy                                                                  : Modifié par
main_ReCalculate                                                                : Re-calculer
main_ResultOk                                                                   : Succès
main_ResultKo                                                                   : Échec
main_Reporting                                                                  : Rapport
main_Reportings                                                                 : Rapports
main_Draft                                                                      : Brouillon
main_Drafts                                                                     : Brouillons
main_Validated                                                                  : Validé
main_Opened                                                                     : Ouvert
main_New                                                                        : Nouveau
main_Discount                                                                   : Remise
main_Unknown                                                                    : Inconnu
main_General                                                                    : Général
main_Size                                                                       : Taille
main_Received                                                                   : Reçu
main_Paid                                                                       : Payé
main_Topic                                                                      : Sujet
main_ByCompanies                                                                : Par tiers
main_ByUsers                                                                    : Par utilisateur
main_Links                                                                      : Liens
main_Link                                                                       : Lien
main_Receipts                                                                   : Bons
main_Rejects                                                                    : Rejets
main_Preview                                                                    : Aperçu
main_NextStep                                                                   : Étape suivante
main_PreviousStep                                                               : Étape précédente
main_Datas                                                                      : Données
main_None                                                                       : Aucun
main_NoneF                                                                      : Aucune
main_Photos                                                                     : Photos
main_AddPhoto                                                                   : Ajouter photo
main_Login                                                                      : Login
main_CurrentLogin                                                               : Login courant
main_January                                                                    : Janvier
main_February                                                                   : Février
main_March                                                                      : Mars
main_April                                                                      : Avril
main_May                                                                        : Mai
main_June                                                                       : Juin
main_July                                                                       : Juillet
main_August                                                                     : Août
main_September                                                                  : Septembre
main_October                                                                    : Octobre
main_November                                                                   : Novembre
main_December                                                                   : Décembre
main_JanuaryMin                                                                 : Jan
main_FebruaryMin                                                                : Fév
main_MarchMin                                                                   : Mars
main_AprilMin                                                                   : Avr
main_MayMin                                                                     : Mai
main_JuneMin                                                                    : Juin
main_JulyMin                                                                    : Juil
main_AugustMin                                                                  : Août
main_SeptemberMin                                                               : Sep
main_OctoberMin                                                                 : Oct
main_NovemberMin                                                                : Nov
main_DecemberMin                                                                : Déc
main_Month01                                                                    : janvier
main_Month02                                                                    : février
main_Month03                                                                    : mars
main_Month04                                                                    : avril
main_Month05                                                                    : mai
main_Month06                                                                    : juin
main_Month07                                                                    : juillet
main_Month08                                                                    : août
main_Month09                                                                    : septembre
main_Month10                                                                    : octobre
main_Month11                                                                    : novembre
main_Month12                                                                    : décembre
main_MonthShort01                                                               : jan.
main_MonthShort02                                                               : fév.
main_MonthShort03                                                               : mars
main_MonthShort04                                                               : avr.
main_MonthShort05                                                               : mai
main_MonthShort06                                                               : juin
main_MonthShort07                                                               : juil.
main_MonthShort08                                                               : août
main_MonthShort09                                                               : sep.
main_MonthShort10                                                               : oct.
main_MonthShort11                                                               : nov.
main_MonthShort12                                                               : déc.
main_AttachedFiles                                                              : Fichiers et documents joints
main_SelectFiles                                                                : Sélectionner fichiers
main_FileTransferComplete                                                       : Le fichier a été correctement transféré
main_DateFormatYYYYMM                                                           : YYYY-MM
main_DateFormatYYYYMMDD                                                         : YYYY-MM-DD
main_DateFormatYYYYMMDDHHMM                                                     : YYYY-MM-DD HH:SS
main_ReportName                                                                 : Nom du rapport
main_ReportPeriod                                                               : Période d'analyse
main_ReportDescription                                                          : Description
main_Report                                                                     : Rapport
main_Keywords                                                                   : Mots clés
main_Legend                                                                     : Légende
main_FillTownFromZip                                                            : Renseigner ville
main_ShowLog                                                                    : Afficher historique
main_Logs                                                                       : Historique
main_File                                                                       : Fichier
main_Files                                                                      : Fichiers
main_NotAllowed                                                                 : Non autorisé
main_ReadPermissionNotAllowed                                                   : Lecture non autorisée
main_AmountInCurrency                                                           : Montants exprimés en %s
main_Example                                                                    : Exemple
main_Examples                                                                   : Exemples
main_NoExample                                                                  : Pas d'exemple
main_FindBug                                                                    : Signaler un bug
main_NbOfThirdParties                                                           : Nombre de tiers
main_NbOfCustomers                                                              : Nombre de clients
main_NbOfLines                                                                  : Nombre de lignes
main_NbOfObjects                                                                : Nombre d'objets
main_NbOfReferers                                                               : Nombre de références
main_Referers                                                                   : Référents
main_TotalQuantity                                                              : Quantité totale
main_DateFromTo                                                                 : Du %s au %s
main_DateFrom                                                                   : A partir du %s
main_DateUntil                                                                  : Jusqu'au %s
main_Check                                                                      : Vérifier
main_Internal                                                                   : Interne
main_External                                                                   : Externe
main_Internals                                                                  : Internes
main_Externals                                                                  : Externes
main_Warning                                                                    : Alerte
main_Warnings                                                                   : Alertes
main_BuildPDF                                                                   : Générer le PDF
main_RebuildPDF                                                                 : Régénérer le PDF
main_BuildDoc                                                                   : Générer le doc
main_RebuildDoc                                                                 : Régénérer le doc
main_Entity                                                                     : Entité
main_Entities                                                                   : Entités
main_EventLogs                                                                  : Suivi
main_CustomerPreview                                                            : Aperçu client
main_SupplierPreview                                                            : Aperçu fournisseur
main_AccountancyPreview                                                         : Aperçu compta
main_ShowCustomerPreview                                                        : Afficher aperçu client
main_ShowSupplierPreview                                                        : Afficher aperçu fournisseur
main_ShowAccountancyPreview                                                     : Afficher aperçu compta
main_ShowProspectPreview                                                        : Afficher aperçu prospect
main_RefCustomer                                                                : Réf. client
main_Currency                                                                   : Devise
main_InfoAdmin                                                                  : Information pour les administrateurs
main_Undo                                                                       : Annuler
main_Redo                                                                       : Refaire
main_ExpandAll                                                                  : Tout dérouler
main_UndoExpandAll                                                              : Annuler déroulement
main_Reason                                                                     : Raison
main_FeatureNotYetSupported                                                     : Fonctionnalité pas encore supportée
main_CloseWindow                                                                : Fermer fenêtre
main_Question                                                                   : Question
main_Response                                                                   : Réponse
main_Priority                                                                   : Priorité
main_SendByMail                                                                 : Envoyer par mail
main_MailSentBy                                                                 : Mail envoyé par
main_TextUsedInTheMessageBody                                                   : Corps du mail
main_SendAcknowledgementByMail                                                  : Envoi A.R. par mail
main_NoEMail                                                                    : Pas d'email
main_Owner                                                                      : Propriétaire
main_DetectedVersion                                                            : Version détectée
main_FollowingConstantsWillBeSubstituted                                        : Les constantes suivantes seront substituées par leur valeur correspondante.
main_Refresh                                                                    : Rafraichir
main_BackToList                                                                 : Retour liste
main_GoBack                                                                     : Retour arrière
main_CanBeModifiedIfOk                                                          : Peut être modifié si valide
main_CanBeModifiedIfKo                                                          : Peut être modifié si invalide
main_RecordModifiedSuccessfully                                                 : Enregistrement modifié avec succès
main_RecordsModified                                                            : %s enregistrements modifiés
main_AutomaticCode                                                              : Création automatique du code
main_NotManaged                                                                 : Non géré
main_FeatureDisabled                                                            : Fonction désactivée
main_MoveBox                                                                    : Déplacer la boite %s
main_Offered                                                                    : Offert
main_NotEnoughPermissions                                                       : Vous n'avez pas les permissions pour cette action
main_SessionName                                                                : Nom session
main_Method                                                                     : Méthode
main_Receive                                                                    : Réceptionner
main_PartialWoman                                                               : Partielle
main_PartialMan                                                                 : Partiel
main_TotalWoman                                                                 : Totale
main_TotalMan                                                                   : Total
main_NeverReceived                                                              : Jamais reçu
main_Canceled                                                                   : Annulé
main_YouCanChangeValuesForThisListFromDictionnarySetup                          : Vous pouvez changer ces valeurs depuis le menu accueil - configuration - dictionnaires
main_Color                                                                      : Couleur
main_Documents                                                                  : Fichiers joints
main_DocumentsNb                                                                : Fichiers joints (%s)
main_Documents2                                                                 : Documents
main_BuildDocuments                                                             : Documents générés
main_UploadDisabled                                                             : Transfert désactivé
main_MenuECM                                                                    : Documents
main_MenuAWStats                                                                : AWStats
main_MenuMembers                                                                : Adhérents
main_MenuAgendaGoogle                                                           : Agenda Google
main_ThisLimitIsDefinedInSetup                                                  : Limite Speedealing (Menu accueil-configuration-sécurité): %s Ko, Limite PHP: %s Ko
main_NoFileFound                                                                : Pas de documents stockés dans cette rubrique
main_CurrentUserLanguage                                                        : Langue utilisateur actuelle
main_CurrentTheme                                                               : Thème courant
main_DisabledModules                                                            : Modules désactivés
main_For                                                                        : Pour
main_ForCustomer                                                                : Pour le client
main_Signature                                                                  : Signature
main_HidePassword                                                               : Afficher commande avec mot de passe masqué
main_UnHidePassword                                                             : Afficher commande réelle avec mot de passe en clair
main_Root                                                                       : Racine
main_Informations                                                               : Informations
main_Page                                                                       : Page
main_Notes                                                                      : Notes
main_AddNewLine                                                                 : Ajout nouvelle ligne
main_AddFile                                                                    : Ajouter fichier
main_ListOfFiles                                                                : Liste des fichiers disponibles
main_FreeZone                                                                   : Zone libre
main_CloneMainAttributes                                                        : Cloner l'objet avec ces attributs principaux
main_PDFMerge                                                                   : Fusion PDF
main_Merge                                                                      : Fusion
main_PrintContentArea                                                           : Afficher page d'impression de la zone centrale
main_NoMenu                                                                     : Aucun sous-menu
main_WarningYouAreInMaintenanceMode                                             : Attention, vous êtes en mode maintenance, aussi seul le login <b>%s</b> est autorisé à utiliser l'application en ce moment.
main_CoreErrorTitle                                                             : Erreur système
main_CoreErrorMessage                                                           : Désolé, une erreur s'est produite. Vérifier les logs ou contacter l'administrateur du système.
main_CreditCard                                                                 : Carte de crédit
main_FieldsWithAreMandatory                                                     : Les champs marqués par un <b>%s</b> sont obligatoires
main_FieldsWithIsForPublic                                                      : Les champs marqués par <b>%s</b> seront affichés sur la liste publique des membres. Si vous ne le souhaitez pas, décochez la case "public".
main_AccordingToGeoIPDatabase                                                   : (obtenu par conversion GeoIP)
main_Line                                                                       : Ligne
main_NotSupported                                                               : Non supporté
main_RequiredField                                                              : Champ obligatoire
main_Result                                                                     : Résultat
main_ToTest                                                                     : Tester
main_ValidateBefore                                                             : La fiche doit être validée pour pouvoir utiliser cette fonction
main_Visibility                                                                 : Visibilité
main_Private                                                                    : Privé
main_Hidden                                                                     : Caché
main_Resources                                                                  : Ressources
main_Source                                                                     : Origine
main_Prefix                                                                     : Préfixe
main_Before                                                                     : Avant
main_After                                                                      : Après
main_IPAddress                                                                  : Adresse IP
main_Frequency                                                                  : Fréquence
main_NewAttribute                                                               : Nouvel attribut
main_AttributeCode                                                              : Code de l'attribut
main_OptionalFieldsSetup                                                        : Configuration des attributs complémentaires
main_URLPhoto                                                                   : Url vers photo/logo
main_SetLinkToThirdParty                                                        : Lier vers un autre tiers
main_CreateDraft                                                                : Créer brouillon
main_ClickToEdit                                                                : Cliquer ici pour éditer
main_ObjectDeleted                                                              : Objet %s supprimé
main_ByCountry                                                                  : Par pays
main_ByTown                                                                     : Par ville
main_ByDate                                                                     : Par date
main_ByMonthYear                                                                : Par mois/année
main_ByYear                                                                     : Par année
main_ByMonth                                                                    : Par mois
main_ByDay                                                                      : Par jour
main_BySalesRepresentative                                                      : Par commerciaux
main_LinkedToSpecificUsers                                                      : Liés à un contact utilisateur particulier
main_DeleteAFile                                                                : Suppression de fichier
main_ConfirmDeleteAFile                                                         : Confirmez-vous la suppression du fichier
main_Create                                                                     : Créer
main_Block                                                                      : Bloquer
main_Unblock                                                                    : Débloquer
main_Weeks                                                                      : Semaines
main_To                                                                         : à
main_View                                                                       : Voir
main_Open                                                                       : Ouvrir
main_ControllingPassword                                                        : Connexion en cours...
main_Hello                                                                      : Bonjour
main_Forward                                                                    : Transférer
main_Reply                                                                      : Répondre
main_TimeLeft                                                                   : Temps restant
main_Important                                                                  : Important
main_Dashboard                                                                  : Tableau de bord
main_DownloadPDF                                                                : Télécharger PDF
main_Agenda                                                                     : Agenda
main_PreviousMonth                                                              : Mois précédent
main_NextMonth                                                                  : Mois suivant
main_Download                                                                   : Télécharger
main_Potential                                                                  : Potentiel
main_GeneralParameters                                                          : Paramètres généraux
main_Overview                                                                   : Généralités
main_Zip                                                                        : Code postal
main_Town                                                                       : Ville
main_Logistics                                                                  : Logistique
main_State                                                                      : Département/Canton
main_Region                                                                     : Région
main_Country                                                                    : Pays
main_CountryCode                                                                : Code pays
main_ControlBy                                                                  : Controlé par
main_CountryId                                                                  : Id pays
main_Tel-Mobile                                                                 : Téléphone Mobile
main_Tel-Fixe                                                                   : Téléphone Fixe
main_Email                                                                      : Email
main_Phone                                                                      : Tél.
main_Tools                                                                      : Outils
main_ShoppingCard                                                               : Panier
main_TitleRef                                                                   : Titre / référence indicative
main_Store                                                                      : Magasin
main_Delivery                                                                   : Livraison
main_Members                                                                    : Membres
main_Print                                                                      : Imprimer
main_PrintList                                                                  : Imprimer la liste
main_Barcode                                                                    : Code barres
main_View more                                                                  : Voir détails
main_ReadMore                                                                   : Voir plus
users_Username                                                                  : Identifiant de connexion
users_UserCard                                                                  : Fiche utilisateur
users_ContactCard                                                               : Fiche contact
users_GroupCard                                                                 : Fiche groupe
users_NoContactCard                                                             : Pas de fiche parmi les contacts
users_Permission                                                                : Droit
users_Permissions                                                               : Droits
users_Password                                                                  : Mot de passe
users_EditPassword                                                              : Modifier mot de passe
users_SendNewPassword                                                           : Régénérer et envoyer mot de passe
users_ReinitPassword                                                            : Régénérer mot de passe
users_PasswordChangedTo                                                         : Mot de passe modifié en: %s
users_SubjectNewPassword                                                        : Votre mot de passe pour Speedealing
users_AvailableRights                                                           : Permissions disponibles
users_OwnedRights                                                               : Permissions détenues
users_GroupRights                                                               : Permissions groupe
users_UserRights                                                                : Permissions utilisateur
users_UserGUISetup                                                              : Interface utilisateur
users_DisableUser                                                               : Désactiver
users_DisableAUser                                                              : Désactiver un utilisateur
users_DeleteUser                                                                : Supprimer
users_DeleteAUser                                                               : Supprimer un utilisateur
users_DisableGroup                                                              : Désactiver
users_DisableAGroup                                                             : Désactiver un groupe
users_EnableAUser                                                               : Réactiver un utilisateur
users_EnableAGroup                                                              : Réactiver un groupe
users_DeleteGroup                                                               : Supprimer
users_DeleteAGroup                                                              : Supprimer un groupe
users_ConfirmDisableUser                                                        : Êtes-vous sûr de vouloir désactiver l'utilisateur <b>%s</b> ?
users_ConfirmDisableGroup                                                       : Êtes-vous sûr de vouloir désactiver le groupe <b>%s</b> ?
users_ConfirmDeleteUser                                                         : Êtes-vous sûr de vouloir supprimer l'utilisateur <b>%s</b> ?
users_ConfirmDeleteGroup                                                        : Êtes-vous sûr de vouloir supprimer le groupe <b>%s</b> ?
users_ConfirmEnableUser                                                         : Êtes-vous sûr de vouloir réactiver l'utilisateur <b>%s</b> ?
users_ConfirmEnableGroup                                                        : Êtes-vous sûr de vouloir réactiver le groupe <b>%s</b> ?
users_ConfirmReinitPassword                                                     : Êtes-vous sûr de vouloir générer un nouveau mot de passe pour l'utilisateur <b>%s</b> ?
users_ConfirmSendNewPassword                                                    : Êtes-vous sûr de vouloir générer et envoyer un nouveau mot de passe pour l'utilisateur <b>%s</b> ?
users_NewUser                                                                   : Nouvel utilisateur
users_CreateUser                                                                : Créer l'utilisateur
users_SearchAGroup                                                              : Rechercher un groupe
users_SearchAUser                                                               : Rechercher un utilisateur
users_LoginNotDefined                                                           : Le login n'est pas défini.
users_NameNotDefined                                                            : Le nom n'est pas défini.
users_ListOfUsers                                                               : Liste des utilisateurs
users_Administrator                                                             : Administrateur
users_SuperAdministrator                                                        : Super Administrateur
users_SuperAdministratorDesc                                                    : Administrateur global
users_AdministratorDesc                                                         : Administrateur de l'entité
users_DefaultRights                                                             : Permissions par défaut
users_DefaultRightsDesc                                                         : Définissez ici les permissions <u>par défaut</u>, c'est-à-dire les permissions qui seront attribuées automatiquement à un <u>nouvel</u> utilisateur lors de sa création (Voir la fiche utilisateur pour changer les permissions d'un utilisateur existant).
users_SpeedealingUsers                                                          : Speedealing users
users_Civilite                                                                  : Civilite
users_LastName                                                                  : Nom
users_FirstName                                                                 : Prénom
users_ListOfGroups                                                              : Liste des groupes
users_NewGroup                                                                  : Nouveau groupe
users_CreateGroup                                                               : Créer le groupe
users_RemoveFromGroup                                                           : Supprimer du groupe
users_PasswordChangedAndSentTo                                                  : Mot de passe changé et envoyé à <b>%s</b>.
users_PasswordChangeRequestSent                                                 : Demande de changement de mot de passe pour <b>%s</b> envoyée à <b>%s</b>.
users_MenuUsersAndGroups                                                        : Utilisateurs & Groupes
users_LastGroupsCreated                                                         : Les %s derniers groupes créés
users_LastUsersCreated                                                          : Les %s derniers utilisateurs créés
users_ShowGroup                                                                 : Afficher groupe
users_ShowUser                                                                  : Afficher utilisateur
users_NonAffectedUsers                                                          : Utilisateurs non affectés au groupe
users_UserModified                                                              : Utilisateur correctement modifié
users_GroupModified                                                             : Groupe correctement modifié
users_PhotoFile                                                                 : Fichier photo
users_UserWithSpeedealingAccess                                                 : User with Speedealing access
users_ListOfUsersInGroup                                                        : Liste des utilisateurs dans ce groupe
users_ListOfGroupsForUser                                                       : Liste des groupes pour cet utilisateur
users_UsersToAdd                                                                : Utilisateur à ajouter à ce groupe
users_GroupsToAdd                                                               : Groupes à ajouter pour cet utilisateur
users_NoLogin                                                                   : Pas de login
users_LinkToCompanyContact                                                      : Lien tiers / contact
users_LinkedToSpeedealingMember                                                 : Link to member
users_LinkedToSpeedealingUser                                                   : Link to Speedealing user
users_LinkedToSpeedealingThirdParty                                             : Link to Speedealing third party
users_CreateSpeedealingLogin                                                    : Create a user
users_CreateSpeedealingThirdParty                                               : Create a third party
users_LoginAccountDisable                                                       : Le compte est désactivé, mettre un nouveau login pour l'activer.
users_LoginAccountDisableInSpeedealing                                          : Account disabled in Speedealing.
users_LoginAccountDisableInLdap                                                 : Le compte est désactivé sur le domaine.
users_UsePersonalValue                                                          : Utiliser valeur personnalisée
users_GuiLanguage                                                               : Langage de l'interface
users_InternalUser                                                              : Utilisateur interne
users_MyInformations                                                            : Mes informations
users_ExportDataset_user_1                                                      : Utilisateurs Speedealing et attributs
users_DomainUser                                                                : Utilisateur du domaine %s
users_Reactivate                                                                : Réactiver
users_CreateInternalUserDesc                                                    : Cet écran permet de créer un utilisateur interne à votre société/institution. Pour créer un utilisateur externe (client, fournisseur, ...), utiliser le bouton 'Créer utilisateur Speedealing' qui se trouve sur la fiche contact du tiers en question.
users_InternalExternalDesc                                                      : Un utilisateur <b>interne</b> est un utilisateur appartenant à votre société/institution.<br>Un utilisateur <b>externe</b> est un utilisateur client, fournisseur ou autre.<br><br>Dans les 2 cas, les permissions utilisateurs définissent les droits d'accès mais l'utilisateur externe peut en plus avoir un gestionnaire de menu différent de l'utilisateur interne (Voir Accueil - Configuration - Affichage)
users_PermissionInheritedFromAGroup                                             : La permission est accordée car héritée d'un groupe auquel appartient l'utilisateur.
users_Inherited                                                                 : Hérité
users_UserWillBeInternalUser                                                    : L'utilisateur créé sera un utilisateur interne (car non lié à un tiers en particulier)
users_UserWillBeExternalUser                                                    : L'utilisateur créé sera un utilisateur externe (car lié à un tiers en particulier)
users_IdPhoneCaller                                                             : Id appelant (téléphone)
users_UserLogged                                                                : Connexion utilisateur %s
users_UserLogoff                                                                : Déconnexion utilisateur %s
users_NewUserCreated                                                            : Création utilisateur %s
users_NewUserPassword                                                           : Changement mot de passe de %s
users_EventUserModified                                                         : Modification utilisateur %s
users_UserDisabled                                                              : Désactivation utilisateur %s
users_UserEnabled                                                               : Activation utilisateur %s
users_UserDeleted                                                               : Suppression utilisateur %s
users_NewGroupCreated                                                           : Création groupe %s
users_GroupDeleted                                                              : Suppression groupe %s
users_ConfirmCreateContact                                                      : Êtes-vous sûr de vouloir créer un compte Speedealing pour ce contact ?
users_ConfirmCreateLogin                                                        : Êtes-vous sûr de vouloir créer un compte Speedealing pour cet adhérent ?
users_ConfirmCreateThirdParty                                                   : Êtes-vous sûr de vouloir créer un tiers pour cet adhérent ?
users_LoginToCreate                                                             : Login à créer
users_NameToCreate                                                              : Nom du tiers à créer
users_YourRole                                                                  : Vos rôles
users_YourQuotaOfUsersIsReached                                                 : Votre quota d'utilisateurs actifs est atteint !
users_NbOfUsers                                                                 : Nb d'utilisateurs
users_DontDowngradeSuperAdmin                                                   : Seul un superadmin peut rétrograder un superadmin
users_NewDatabase                                                               : Nouvelle base de données
users_CreateDatabase                                                            : Créer la base de données
users_ListOfDatabases                                                           : Liste des bases de données
users_ListOfUsersInDatabase                                                     : Liste des utilisateurs liés à la base de données
users_ListOfRolesInDatabase                                                     : Liste des groupes liés à la base de données
users_DeleteADatabase                                                           : Suppression d'une database
users_ConfirmDatabase                                                           : Êtes-vous sûr de vouloir supprimer la base de données <b>%s</b> ?
users_NonAffectedGroupsDatabase                                                 : Groupes non affectés à la base de données
users_NonAffectedUsersDatabase                                                  : Utilisateurs non affectés à la base de données
users_Collaborators                                                             : Liste des Collaborateurs
users_Profiles                                                                  : Profils collaborateurs
users_Gestion des conges / absences                                             : Gestion des conges / absences
users_Databases                                                                 : Base de donnees
users_NewAbsence                                                                : Nouvel absence
users_Employee                                                                  : Salarié
users_Address                                                                   : Adresse
users_Town                                                                      : Ville
users_Zip                                                                       : Code Postal
users_Tel-Mobile                                                                : Téléphone Mobile
users_Tel-Fixe                                                                  : Téléphone Fixe
users_Email                                                                     : Email
users_Date-Naissance                                                            : Date de naissance
users_Ville-Naissance                                                           : Ville de naissance
users_Pays-Naissance                                                            : Pays de naissance
users_Nationnalite                                                              : Nationnalité
users_Situation                                                                 : Situation familiale
users_NbrEnfants                                                                : Nombre Enfants
users_PerCharges                                                                : Personnes à charges
users_Date-Depart                                                               : Date de dèpart
users_Date-Arrivee                                                              : Date d'arrivée
users_Poste                                                                     : Fonction
users_Description-Poste                                                         : Descrption du poste
users_Type-Contrat                                                              : Type de contrat
users_Periode-Essai                                                             : Periode d'essai
users_Salaire-Brut                                                              : Salaire brut
users_Statut                                                                    : Statut
users_Site                                                                      : Site
users_Groupe                                                                    : Groupe
users_Securite-Sociale                                                          : N° de la sécurité sociale
users_Libelle-Bank                                                              : Libelle banque
users_IBAN                                                                      : IBAN
users_Photo                                                                     : Photo
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
users_LastConnection                                                            : Date de derniere connexion
