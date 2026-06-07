'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';

// Тип допустимых языков
type LocaleKey = 'ru' | 'en' | 'it' | 'fr' | 'ua';

// Словарь со ВСЕМИ языками БЕЗ пропусков
const translations: Record<LocaleKey, {
  title: string;
  subtitle: string;
  howItWorks: string;
  p1: string;
  p2: string;
  p3: string;
  card1Badge: string;
  card1Title: string;
  card1Desc: string;
  card1Get: string;
  card1Bullet1: string;
  card1Bullet2: string;
  card1Result: string;
  card2Badge: string;
  card2Title: string;
  card2Desc: string;
  card2Get: string;
  card2Bullet1: string;
  card2Bullet2: string;
  card2Result: string;
  card3Badge: string;
  card3Title: string;
  card3Desc: string;
  card3Get: string;
  card3Bullet1: string;
  card3Bullet2: string;
  card3Result: string;
  metricsTitle: string;
  metricsDesc: string;
  before: string;
  after: string;
  m1Before: string;
  m1After: string;
  m2Before: string;
  m2After: string;
  m3Before: string;
  m3After: string;
  footerText: string;
  hubTitle: string;
  hubDesc: string;
  walletStatus: string;
  connected: string;
  notConnected: string;
  btnTokenize: string;
  btnProcessing: string;
  alertWallet: string;
  copyright: string;
  loginBtn: string;
  logoutBtn: string;
  regTitle: string;
  emailPlaceholder: string;
  passPlaceholder: string;
  submitReg: string;
  closeBtn: string;
  welcome: string;
}> = {
  ru: {
    title: 'Автоматизация документального процесса: от 3D-дизайна до технадзора',
    subtitle: 'Объединяем проектирование, BIM-модели и управление строительством в единую Web3-экосистему для радикального ускорения инженерных процессов.',
    howItWorks: 'Как это работает на практике',
    p1: 'Сфера девелопмента и крупного строительства исторически страдает от трех главных «болей»: раздувание бюджетов, затягивание сроков согласования и несоответствие того, что построено на площадке, тому, что было спроектировано.',
    p2: 'Платформа DOMINUS DECENTRALIZED HUB предлагает принципиально новый подход. Объединяя проектирование, BIM-модели и Web3-технологии в единую экосистему, система позволяет ускорить инженерные процессы до 40%.',
    p3: 'Но что конкретно это значит для вас как для собственника, инвестора или руководителя? Давайте разберем оцифрованные преимущества, которые получает ваш бизнес сразу после внедрения.',
    card1Badge: 'Заказчику и директору',
    card1Title: 'Железная защита бюджета и ТЗ',
    card1Desc: 'В традиционном строительстве превышение сметы — частая проблема. Подрядчики могут заложить лишние объемы или использовать несогласованные дорогие материалы.',
    card1Get: 'Что вы получаете:',
    card1Bullet1: '«Умный» контроль расходов (Смарт-контракты): Техническое задание (ТЗ) и смета жестко «вшиваются» в систему.',
    card1Bullet2: 'Блокировка нецелевых трат: Проектировщик или подрядчик физически не смогут согласовать объемы или материалы, выходящие за рамки бюджета.',
    card1Result: 'Результат для бизнеса: Полная прозрачность финансовых потоков и ликвидация риска непредвиденного роста стоимости объекта.',
    card2Badge: 'Проектировщикам и инженерам',
    card2Title: 'Авто-согласование без волокиты',
    card2Desc: 'Обычно согласование изменений занимает недели: бесконечные совещания, пересылка чертежей и поиск коллизий (например, когда вентиляция пересекает несущую балку).',
    card2Get: 'Что вы получаете:',
    card2Bullet1: 'Мгновенный автоматический аудит: Как только инженеры устраняют коллизии в BIM-модели, система DOMINUS самостоятельно проверяет смежные узлы.',
    card2Bullet2: 'Автоматическое утверждение этапа: Если модель чистая и соответствует алгоритмам проверки, этап утверждается системой мгновенно.',
    card2Result: 'Результат для бизнеса: Сокращение сроков проектирования в разы. Ваша команда занимается творчеством, а рутину забирает автоматика.',
    card3Badge: 'Для стройплощадки',
    card3Title: 'Прозрачная приемка и выплаты',
    card3Desc: 'Приемка работ на объекте — зона высокого риска. Акты могут подписываться «вслепую», а реальный объем выполненных работ сложно оперативно проверить.',
    card3Get: 'Что вы получаете:',
    card3Bullet1: 'Объективный контроль через лазер: Данные со стройплощадки (лазерное 3D-сканирование) автоматически сверяются с цифровой BIM-моделью.',
    card3Bullet2: 'Неизменяемость данных и авторасчет: Результаты пишутся в блокчейн. Если факт совпал с проектом, подрядчик получает оплату автоматически.',
    card3Result: 'Результат для бизнеса: Исключение человеческого фактора. За качественную работу оплата придет моментально. При браке — транзакция блокируется.',
    metricsTitle: 'Резюме: Главные метрики эффективности',
    metricsDesc: 'Внедряя эту децентрализованную систему, вы переводите управление строительным проектом на рельсы современных технологий:',
    before: 'До внедрения:',
    after: 'С DOMINUS:',
    m1Before: 'Долгие недели ручных согласований и подписей',
    m1After: 'Ускорение инженерных процессов до 40%',
    m2Before: 'Риск перерасхода бюджета и подмены материалов',
    m2After: 'Блокировка любых превышений смарт-контрактом',
    m3Before: 'Субъективная приемка работ «на глаз»',
    m3After: 'Автоматическая сверка через 3D и блокчейн',
    footerText: 'DOMINUS — это не просто софт для проектирования. Это ваш цифровой независимый технадзор.',
    hubTitle: 'Панель интеграции проекта в Tokenized Hub',
    hubDesc: 'Выберите метод авторизации транзакций для запуска автоматической проверки коллизий вашей BIM-модели:',
    walletStatus: 'Статус кошелька:',
    connected: 'Подключен',
    notConnected: 'Не подключен',
    btnTokenize: 'ЗАПУСТИТЬ ТОКЕНИЗАЦИЮ ТЗ',
    btnProcessing: 'Обработка...',
    alertWallet: 'Пожалуйста, подключите Web3 кошелек или выберите альтернативный метод оплаты.',
    copyright: 'Децентрализованный инженерный HUB.',
    loginBtn: 'Войти',
    logoutBtn: 'Выйти',
    regTitle: 'Регистрация в системе',
    emailPlaceholder: 'Введите Email',
    passPlaceholder: 'Введите пароль',
    submitReg: 'Создать аккаунт',
    closeBtn: 'Закрыть',
    welcome: 'Добро пожаловать'
  },
  en: {
    title: 'Automation of Document Processes: from 3D Design to Technical Supervision',
    subtitle: 'We combine design, BIM models, and construction management into a single Web3 ecosystem to radically accelerate engineering processes.',
    howItWorks: 'How it works in practice',
    p1: 'The field of development and large-scale construction historically suffers from three main pain points: budget inflation, delays in approvals, and discrepancies between what is built on-site and what was designed.',
    p2: 'The DOMINUS DECENTRALIZED HUB platform offers a fundamentally new approach. By combining design, BIM models, and Web3 technologies into a single ecosystem, the system accelerates engineering processes by up to 40%.',
    p3: 'Let’s break down the digitized advantages that your business receives immediately after implementation.',
    card1Badge: 'For Client & Director',
    card1Title: 'Ironclad Budget and TOR Protection',
    card1Desc: 'In traditional construction, budget overrun is a frequent problem. Contractors can inflate volume limits or use unapproved expensive materials.',
    card1Get: 'What you get:',
    card1Bullet1: '"Smart" cost control (Smart Contracts): The terms of reference (TOR) and budget are strictly embedded into the system.',
    card1Bullet2: 'Blocking non-target spending: A designer or contractor physically cannot approve volumes or materials exceeding the budget.',
    card1Result: 'Business Result: Complete transparency of financial flows and elimination of the risk of unexpected cost growth.',
    card2Badge: 'For Designers & Engineers',
    card2Title: 'Auto-approval Without Red Tape',
    card2Desc: 'Usually, coordinating changes takes weeks: endless meetings, transferring drawings, and searching for clashes.',
    card2Get: 'What you get:',
    card2Bullet1: 'Instant automatic audit: As soon as engineers eliminate clashes in the BIM model, the DOMINUS system independently checks adjacent nodes.',
    card2Bullet2: 'Automatic stage approval: If the model is clean and complies with validation algorithms, the stage is approved instantly.',
    card2Result: 'Business Result: Significant reduction in design time.',
    card3Badge: 'For Construction Site',
    card3Title: 'Transparent Acceptance and Payments',
    card3Desc: 'Acceptance of work on-site is a high-risk area.',
    card3Get: 'What you get:',
    card3Bullet1: 'Objective control via laser: Data from the construction site (3D laser scanning) is automatically verified against the digital BIM model.',
    card3Bullet2: 'Data immutability and auto-calculation: Results are written to the blockchain.',
    card3Result: 'Business Result: Exclusion of the human factor.',
    metricsTitle: 'Summary: Key Efficiency Metrics',
    metricsDesc: 'By implementing this decentralized system, you shift construction project management to modern technological tracks:',
    before: 'Before:',
    after: 'With DOMINUS:',
    m1Before: 'Long weeks of manual approvals and signatures',
    m1After: 'Engineering processes acceleration up to 40%',
    m2Before: 'Risk of budget overruns and material substitution',
    m2After: 'Blocking any overruns by smart contract',
    m3Before: 'Subjective visual acceptance of work',
    m3After: 'Automatic verification via 3D and blockchain',
    footerText: 'DOMINUS is not just design software. It is your independent digital technical supervision.',
    hubTitle: 'Project Integration Panel in Tokenized Hub',
    hubDesc: 'Select a transaction authorization method to run an automatic clash detection for your BIM model:',
    walletStatus: 'Wallet Status:',
    connected: 'Connected',
    notConnected: 'Not Connected',
    btnTokenize: 'LAUNCH TOR TOKENIZATION',
    btnProcessing: 'Processing...',
    alertWallet: 'Please connect a Web3 wallet or choose an alternative payment method.',
    copyright: 'Decentralized Engineering HUB.',
    loginBtn: 'Login',
    logoutBtn: 'Logout',
    regTitle: 'System Registration',
    emailPlaceholder: 'Enter Email',
    passPlaceholder: 'Enter password',
    submitReg: 'Create Account',
    closeBtn: 'Close',
    welcome: 'Welcome'
  },
  it: {
    title: 'Automazione dei processi documentali: dal design 3D alla supervisione tecnica',
    subtitle: 'Combiniamo progettazione, modelli BIM e gestione della costruzione in un unico ecosistema Web3 per accelerare i processi.',
    howItWorks: 'Come funziona in pratica',
    p1: 'Il settore delle costruzioni soffre storicamente di ritardi, superamenti di budget e discrepanze tra progetto e realtà.',
    p2: 'La piattaforma DOMINUS DECENTRALIZED HUB offre un approccio completamente nuovo per accelerare i processi ingegneristici fino al 40%.',
    p3: 'Vediamo i vantaggi digitalizzati che la vostra azienda riceve immediatamente dopo l\'implementazione.',
    card1Badge: 'Per Cliente e Direttore',
    card1Title: 'Protezione ferrea del budget e del capitolato',
    card1Desc: 'Nelle costruzioni tradizionali, il superamento dei costi è un problema frequente.',
    card1Get: 'Cosa ottieni:',
    card1Bullet1: 'Controllo intelligente dei costi tramite Smart Contract incorporati nel sistema.',
    card1Bullet2: 'Blocco delle spese non autorizzate ed eliminazione dei rischi finanziari.',
    card1Result: 'Risultato: Trasparenza totale dei flussi finanziari e controllo del budget.',
    card2Badge: 'Per Progettisti e Ingegneri',
    card2Title: 'Approvazione automatica senza burocrazia',
    card2Desc: 'Il coordinamento delle modifiche richiede solitamente settimane di riunioni.',
    card2Get: 'Cosa ottieni:',
    card2Bullet1: 'Audit automatico istantaneo dei nodi adiacenti nel modello BIM.',
    card2Bullet2: 'Approvazione istantanea della fase se i requisiti sono soddisfatti.',
    card2Result: 'Risultato: Riduzione drastica dei tempi di progettazione.',
    card3Badge: 'Per il Cantiere',
    card3Title: 'Accettazione e pagamenti trasparenti',
    card3Desc: 'L\'accettazione dei lavori in cantiere è un\'area ad alto rischio.',
    card3Get: 'Cosa ottieni:',
    card3Bullet1: 'Controllo obiettivo tramite scansione laser 3D e verifica con il modello BIM.',
    card3Bullet2: 'Immutabilità dei dati registrati su blockchain con calcolo automatico.',
    card3Result: 'Risultato: Esclusione del fattore umano e pagamenti immediati.',
    metricsTitle: 'Riepilogo: metriche di efficienza chiave',
    metricsDesc: 'Implementando questo sistema decentralizzato, sposti la gestione del progetto su binari tecnologici moderni:',
    before: 'Prima:',
    after: 'Con DOMINUS:',
    m1Before: 'Lunghe settimane di approvazioni manuali e firme',
    m1After: 'Accelerazione dei processi ingegneristici fino al 40%',
    m2Before: 'Rischio di superamento dei costi e sostituzione dei index',
    m2After: 'Blocco di qualsiasi superamento tramite smart contract',
    m3Before: 'Accettazione visiva e soggettiva del lavoro',
    m3After: 'Verifica automatica tramite 3D e blockchain',
    footerText: 'DOMINUS non è solo un software di progettazione. È la tua supervisione tecnica digitale indipendente.',
    hubTitle: 'Pannello di integrazione del progetto nel Tokenized Hub',
    hubDesc: 'Seleziona un metodo di autorizzazione della transazione per eseguire il rilevamento automatico delle collisioni:',
    walletStatus: 'Stato del portafoglio:',
    connected: 'Connesso',
    notConnected: 'Non connesso',
    btnTokenize: 'AVVIA LA TOKENIZZAZIONE',
    btnProcessing: 'Elaborazione...',
    alertWallet: 'Connetti un portafoglio Web3 o scegli un metodo di pagamento alternativo.',
    copyright: 'HUB di ingegneria decentralizzato.',
    loginBtn: 'Accedi',
    logoutBtn: 'Esci',
    regTitle: 'Registrazione del sistema',
    emailPlaceholder: 'Inserisci l\'email',
    passPlaceholder: 'Inserisci la password',
    submitReg: 'Crea account',
    closeBtn: 'Chiudi',
    welcome: 'Benvenuto'
  },
  fr: {
    title: 'Automatisation des processus documentaires : de la conception 3D à la supervision technique',
    subtitle: 'Nous combinons conception, modèles BIM et gestion de construction dans un écosystème Web3 unique pour acélérer les processus.',
    howItWorks: 'Comment ça marche en pratique',
    p1: 'Le domaine de la construction souffre historiquement de dépassements di budget et de délais de validation.',
    p2: 'La plateforme DOMINUS DECENTRALIZED HUB propose une approche nouvelle pour accélérer les processus jusqu\'à 40%.',
    p3: 'Découvrez les avantages immédiats pour votre entreprise après l\'intégration.',
    card1Badge: 'Pour Client & Directeur',
    card1Title: 'Protection stricte du budget et du cahier des charges',
    card1Desc: 'Dans la construction traditionnelle, le dépassement de budget est un problème fréquent.',
    card1Get: 'Ce que vous obtenez:',
    card1Bullet1: 'Contrôle intelligent des coûts (Smart Contracts) intégrés dans le système.',
    card1Bullet2: 'Blocage des dépenses non ciblées en temps réel.',
    card1Result: 'Résultat: Transparence totale des flux financiers de l\'objet.',
    card2Badge: 'Pour Concepteurs & Ingénieurs',
    card2Title: 'Validation automatique sans paperasse',
    card2Desc: 'La coordination des modifications prend généralement des semaines de réunions.',
    card2Get: 'Ce que vous obtenez:',
    card2Bullet1: 'Audit automatique instantané des conflits dans le modèle BIM.',
    card2Bullet2: 'Approbation immédiate de l\'étape si le modèle est conforme.',
    card2Result: 'Résultat: Réduction significative du temps de conception.',
    card3Badge: 'Pour le Chantier',
    card3Title: 'Acceptation et paiements transparents',
    card3Desc: 'La réception des travaux sur site est une zone à haut risque.',
    card3Get: 'Ce que vous obtenez:',
    card3Bullet1: 'Contrôle objectif par balayage laser 3D synchronisé avec le BIM.',
    card3Bullet2: 'Immuabilité des données et calcul automatique sur la blockchain.',
    card3Result: 'Résultat: Élimination du facteur humain et paiements automatisés.',
    metricsTitle: 'Résumé: Indicateurs clés d\'efficacité',
    metricsDesc: 'En déployant ce système, vous passez à une gestion de projet moderne:',
    before: 'Avant:',
    after: 'Avec DOMINUS:',
    m1Before: 'Longues semaines de signatures et validations manuelles',
    m1After: 'Accélération des processus d\'ingénierie jusqu\'à 40%',
    m2Before: 'Risque de dépassement de budget et changement de matériaux',
    m2After: 'Blocage de tout dépassement par contrat intelligent',
    m3Before: 'Acceptation visuelle subjective des travaux',
    m3After: 'Vérification automatique via 3D et blockchain',
    footerText: 'DOMINUS n\'est pas un simple logiciel. C\'est votre contrôle technique indépendant.',
    hubTitle: 'Panneau d\'intégration du projet dans le Tokenized Hub',
    hubDesc: 'Sélectionnez une méthode d\'autorisation pour lancer la détection des conflits:',
    walletStatus: 'Statut du portefeuille:',
    connected: 'Connecté',
    notConnected: 'Non connecté',
    btnTokenize: 'LANCER LA TOKENISATION',
    btnProcessing: 'Traitement...',
    alertWallet: 'Veuillez connecter un portefeuille Web3 ou choisir un autre mode de paiement.',
    copyright: 'HUB d\'ingénierie décentralisé.',
    loginBtn: 'Se connecter',
    logoutBtn: 'Se déconnecter',
    regTitle: 'Inscription Système',
    emailPlaceholder: 'Entrez l\'e-mail',
    passPlaceholder: 'Entrez le mot de passe',
    submitReg: 'Créer un compte',
    closeBtn: 'Fermer',
    welcome: 'Bienvenue'
  },
  ua: {
    title: 'Автоматизація документального процесу: від 3D-дизайну до технагляду',
    subtitle: 'Об\'єднуємо проектування, BIM-моделі та управління будівництвом в єдину Web3-екосистему для прискорення інженерних процесів.',
    howItWorks: 'Як це працює на практиці',
    p1: 'Сфера девелопменту та великого будівництва історично страждає від трьох головних «болей»: роздування бюджетів, затягування термінів та невідповідність збудованого проекту.',
    p2: 'Платформа DOMINUS DECENTRALIZED HUB пропонує принципово новий підхід, що дозволяє прискорити інженерних процеси до 40%.',
    p3: 'Давайте розберемо оцифровані переваги, які отримує ваш бізнес одразу після впровадження.',
    card1Badge: 'Замовнику та директору',
    card1Title: 'Залізний захист бюджету та ТЗ',
    card1Desc: 'У традиційному будівництві перевищення кошторису — частая проблема.',
    card1Get: 'Що ви отримуєте:',
    card1Bullet1: '«Рожумний» контроль витрат (Смарт-контракти): ТЗ та кошторис жорстко вшиті в систему.',
    card1Bullet2: 'Блокування нецільових витрат: Підрядник фізично не зможе погодити зайві обсяги.',
    card1Result: 'Результат для бізнесу: Повна прозорість фінансових потоків та ліквідація ризиків.',
    card2Badge: 'Проектувальникам та інженерам',
    card2Title: 'Авто-погодження без тяганини',
    card2Desc: 'Зазвичай погодження змін займає тижні: нескінченні наради та пошук колізій.',
    card2Get: 'Що ви отримуєте:',
    card2Bullet1: 'Миттєвий автоматичний аудит: Система самостійно перевіряє суміжні вузли в BIM.',
    card2Bullet2: 'Автоматичне затвердження етапу: Якщо модель чиста, етап затверджується миттєво.',
    card2Result: 'Результат для бізнесу: Скорочення термінів проектування в рази.',
    card3Badge: 'Для будмайданчика',
    card3Title: 'Прозора прийомка та виплати',
    card3Desc: 'Прийомка робіт на об\'єкті — зона високого ризику та суб\'єктивних оцінок.',
    card3Get: 'Що ви отримуєте:',
    card3Bullet1: 'Об\'єктивний контроль: Дані лазерного 3D-сканування звіряються з цифровою BIM-моделлю.',
    card3Bullet2: 'Незмінність даних: Результати пишуться в блокчейн для автоматичного розрахунку.',
    card3Result: 'Результат для бізнесу: Виключення людського фактору та моментальна оплата.',
    metricsTitle: 'Резюме: Головні метрики ефективності',
    metricsDesc: 'Впроваджуючи цю децентралізовану систему, ви переводите управління проектом на рейки технологій:',
    before: 'До впровадження:',
    after: 'З DOMINUS:',
    m1Before: 'Довгі тижні ручних погоджень та підписів',
    m1After: 'Прискорення інженерних процесів до 40%',
    m2Before: 'Ризик перевитрати бюджету та підміни матеріалів',
    m2After: 'Блокування будь-яких перевищень смарт-контрактом',
    m3Before: 'Суб\'єктивна прийомка робіт «на око»',
    m3After: 'Автоматична звірка через 3D та блокчейн',
    footerText: 'DOMINUS — це не просто софт для проектирования. Це ваш цифровий незалежний технагляд.',
    hubTitle: 'Панель інтеграції проекту в Tokenized Hub',
    hubDesc: 'Виберіть метод авторизації транзакцій для запуска автоматичної перевірки колізій вашої BIM-моделі:',
    walletStatus: 'Статус гаманця:',
    connected: 'Підключено',
    notConnected: 'Не підключено',
    btnTokenize: 'ЗАПУСТИТИ ТОКЕНІЗАЦІЮ ТЗ',
    btnProcessing: 'Обробка...',
    alertWallet: 'Будь ласка, підключіть Web3 гаманець або виберіть альтернативний метод оплати.',
    copyright: 'Децентралізований інженерний HUB.',
    loginBtn: 'Увійти',
    logoutBtn: 'Вийти',
    regTitle: 'Реєстрація в системі',
    emailPlaceholder: 'Введіть Email',
    passPlaceholder: 'Введіть загороджувальний пароль',
    submitReg: 'Створити акаунт',
    closeBtn: 'Закрити',
    welcome: 'Ласкаво просимо'
  }
};

export default function Home() {
  // Явно типизируем стейт как LocaleKey
  const [locale, setLocale] = useState<LocaleKey>('ru');
  const t = translations[locale];
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isConnected, address } = useAccount();
  
  const txState = useSendTransaction();
  const isTxLoading = txState && 'status' in txState ? txState.status === 'pending' : false;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTokenize = () => {
    if (!isConnected) {
      alert(t.alertWallet);
      return;
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Заполните все поля');
      return;
    }
    setUser({ email });
    setIsAuthModalOpen(false);
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 antialiased overflow-x-hidden">
      
      {/* ФИКСИРОВАННАЯ ШАПКА САЙТА С ФЛАГАМИ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-900 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Логотип */}
          <div className="text-base sm:text-lg font-black tracking-wider text-blue-400">
            DOMINUS DECENTRALIZED HUB
          </div>

          {/* Панель кнопок: Языки-Флаги и Авторизация */}
          <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            
            {/* Выбор языков с флагами */}
            <div className="flex items-center space-x-1 bg-[#161F30] p-1 rounded-xl border border-gray-800">
              <button 
                type="button"
                onClick={() => setLocale('ru')} 
                className={`px-2 py-1 text-xs rounded-lg transition-all ${locale === 'ru' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'}`}
              >
                🇷🇺 <span className="ml-0.5">RU</span>
              </button>
              <button 
                type="button"
                onClick={() => setLocale('en')} 
                className={`px-2 py-1 text-xs rounded-lg transition-all ${locale === 'en' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'}`}
              >
                🇺🇸 <span className="ml-0.5">EN</span>
              </button>
              <button 
                type="button"
                onClick={() => setLocale('ua')} 
                className={`px-2 py-1 text-xs rounded-lg transition-all ${locale === 'ua' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'}`}
              >
                🇺🇦 <span className="ml-0.5">UA</span>
              </button>
              <button 
                type="button"
                onClick={() => setLocale('it')} 
                className={`px-2 py-1 text-xs rounded-lg transition-all ${locale === 'it' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'}`}
              >
                🇮🇹 <span className="ml-0.5">IT</span>
              </button>
              <button 
                type="button"
                onClick={() => setLocale('fr')} 
                className={`px-2 py-1 text-xs rounded-lg transition-all ${locale === 'fr' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-gray-200'}`}
              >
                🇫🇷 <span className="ml-0.5">FR</span>
              </button>
            </div>

            {/* Профиль / Вход */}
            {user ? (
              <div className="flex items-center space-x-2 bg-[#161F30] px-3 py-1 rounded-lg border border-gray-800 text-xs">
                <span className="text-gray-300 max-w-[110px] truncate">
                  {t.welcome}, <strong className="text-blue-400">{user.email}</strong>
                </span>
                <button type="button" onClick={handleLogout} className="text-rose-400 hover:text-rose-300 underline">
                  {t.logoutBtn}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all active:scale-95"
              >
                {t.loginBtn}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="max-w-6xl mx-auto pt-36 sm:pt-40 pb-16 px-4">
        
        {/* Главный заголовок сайта */}
        <section className="mb-12 sm:mb-16">
          <div className="text-[10px] sm:text-xs font-black tracking-wider text-blue-400 uppercase mb-3">
            DECENTRALIZED ENGINEERING
          </div>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white max-w-5xl break-words whitespace-pre-line">
            {t.title}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </section>

        {/* Раздел: Как это работает */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-200">
              {t.howItWorks}
            </h2>
          </div> 
          <div className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed space-y-4 max-w-5xl">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>
        </section>  
  
        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Карточка 1 */}
          <div className="flex flex-col bg-gradient-to-br from-[#111e36] to-[#162542] rounded-2xl p-5 text-white border border-gray-800/60 shadow-lg">
            <div className="self-start uppercase text-[9px] font-bold tracking-wider bg-blue-600 text-white px-2 py-1 rounded mb-4">
              {t.card1Badge}
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2.5 leading-snug">{t.card1Title}</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">{t.card1Desc}</p>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{t.card1Get}</h4>
            <div className="space-y-2 mb-4 flex-grow text-xs sm:text-sm text-gray-300 pl-1">
              <p>• {t.card1Bullet1}</p>
              <p>• {t.card1Bullet2}</p>
            </div>
            <div className="border-t border-gray-800 pt-3 mt-auto text-xs text-gray-400 leading-relaxed">
              {t.card1Result}
            </div>
          </div>

          {/* Карточка 2 */}
          <div className="flex flex-col bg-gradient-to-br from-[#111e36] to-[#162542] rounded-2xl p-5 text-white border border-gray-800/60 shadow-lg">
            <div className="self-start uppercase text-[9px] font-bold tracking-wider bg-cyan-600 text-white px-2 py-1 rounded mb-4">
              {t.card2Badge}
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2.5 leading-snug">{t.card2Title}</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">{t.card2Desc}</p>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{t.card2Get}</h4>
            <div className="space-y-2 mb-4 flex-grow text-xs sm:text-sm text-gray-300 pl-1">
              <p>• {t.card2Bullet1}</p>
              <p>• {t.card2Bullet2}</p>
            </div>
            <div className="border-t border-gray-800 pt-3 mt-auto text-xs text-gray-400 leading-relaxed">
              {t.card2Result}
            </div>
          </div>

          {/* Карточка 3 */}
          <div className="flex flex-col bg-gradient-to-br from-[#111e36] to-[#162542] rounded-2xl p-5 text-white border border-gray-800/60 shadow-lg">
            <div className="self-start uppercase text-[9px] font-bold tracking-wider bg-purple-600 text-white px-2 py-1 rounded mb-4">
              {t.card3Badge}
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2.5 leading-snug">{t.card3Title}</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">{t.card3Desc}</p>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{t.card3Get}</h4>
            <div className="space-y-2 mb-4 flex-grow text-xs sm:text-sm text-gray-300 pl-1">
              <p>• {t.card3Bullet1}</p>
              <p>• {t.card3Bullet2}</p>
            </div>
            <div className="border-t border-gray-800 pt-3 mt-auto text-xs text-gray-400 leading-relaxed">
              {t.card3Result}
            </div>
          </div>
        </div>

        {/* Метрики */}
        <section className="mb-16 bg-[#111827]/60 border border-gray-800 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-200">
              {t.metricsTitle}
            </h2>
          </div> 
          <p className="text-gray-400 text-xs sm:text-sm mb-5">{t.metricsDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm mb-5">
            <div className="p-4 bg-[#161F30]/40 rounded-xl border border-gray-800">
              <div className="text-rose-400 font-medium mb-1">✕ {t.before}</div>
              <div className="text-gray-400 text-[11px] mb-3">{t.m1Before}</div>
              <div className="text-emerald-400 font-medium mb-1">✓ {t.after}</div>
              <div className="text-gray-200 font-bold">{t.m1After}</div>
            </div>
            <div className="p-4 bg-[#161F30]/40 rounded-xl border border-gray-800">
              <div className="text-rose-400 font-medium mb-1">✕ {t.before}</div>
              <div className="text-gray-400 text-[11px] mb-3">{t.m2Before}</div>
              <div className="text-emerald-400 font-medium mb-1">✓ {t.after}</div>
              <div className="text-gray-200 font-bold">{t.m2After}</div>
            </div>
            <div className="p-4 bg-[#161F30]/40 rounded-xl border border-gray-800">
              <div className="text-rose-400 font-medium mb-1">✕ {t.before}</div>
              <div className="text-gray-400 text-[11px] mb-3">{t.m3Before}</div>
              <div className="text-emerald-400 font-medium mb-1">✓ {t.after}</div>
              <div className="text-gray-200 font-bold">{t.m3After}</div>
            </div>
          </div>
          <p className="text-gray-300 text-xs bg-blue-950/20 border border-blue-900/40 p-3.5 rounded-xl leading-relaxed">
            {t.footerText}
          </p>
        </section>

        {/* Панель токенизации */}
        <section className="bg-[#1b263b] border border-blue-500/10 rounded-2xl p-5 sm:p-6 shadow-xl">
          <h3 className="text-sm sm:text-base font-bold mb-1 text-gray-100">{t.hubTitle}</h3>
          <p className="text-gray-400 text-[11px] sm:text-xs mb-5 max-w-3xl">{t.hubDesc}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            <button type="button" className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-md shadow-blue-600/10">Web3 Wallet (ETH)</button>
            <button type="button" className="px-3 py-1.5 text-xs font-semibold bg-[#415a77]/30 text-gray-300 rounded-lg border border-gray-700/50">PayPal</button>
          </div>
          <div className="flex items-center space-x-2 text-xs mb-5">
            <span className="text-gray-400">{t.walletStatus}</span>
            {isConnected ? (
              <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {t.connected} ({address?.slice(0, 6)}...{address?.slice(-4)})
              </span>
            ) : (
              <span className="text-rose-400 font-medium text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                {t.notConnected}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleTokenize}
            disabled={isTxLoading}
            className="w-full md:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-lg transition-all disabled:opacity-50"
          >
            {isTxLoading ? t.btnProcessing : t.btnTokenize}
          </button>
        </section>

        {/* Копирайт */}
        <footer className="mt-16 pt-6 border-t border-gray-900 text-center text-[10px] text-gray-500">
          &copy; 2026 Dominus. {t.copyright}
        </footer>
      </div>

      {/* Окно авторизации */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-100">{t.regTitle}</h3>
              <button type="button" onClick={() => setIsAuthModalOpen(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
            </div>
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" required placeholder={t.emailPlaceholder} value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161F30] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Password</label>
                <input 
                  type="password" required placeholder={t.passPlaceholder} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161F30] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold text-xs py-2 rounded-lg shadow-md">
                {t.submitReg}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}