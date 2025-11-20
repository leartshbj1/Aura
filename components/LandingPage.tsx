import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Zap, TrendingUp, ChevronDown, CreditCard, Check, Building2, Send, ArrowLeftRight, 
  Wallet, FileText, Briefcase, BrainCircuit, Printer, ArrowLeft, Repeat, Link, Instagram, Twitter, Linkedin, 
  MapPin, Mail, Lock, Globe, X, Star, Gem, Smartphone, Store, Coins, Users, PieChart, FileCheck, Globe2,
  Landmark, Scale, FileSearch, Activity, ArrowDown, FileCode, Server, Download, CheckCircle2, AlertCircle,
  HelpCircle, Search, Heart, Laptop, Smartphone as PhoneIcon, Clock, QrCode, Apple, Play, Shield, Monitor, Cpu,
  Facebook, Youtube, Database, LockKeyhole, Signal
} from 'lucide-react';

// --- Custom CSS for Advanced Animations ---
const styleSheet = `
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  }

  .glass-nav {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  
  button:focus-visible, a:focus-visible {
    outline: 2px solid #0052FF;
    outline-offset: 2px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
`;

// --- Translation Data ---
type Lang = 'fr' | 'en';

const CONTENT = {
  fr: {
    nav: {
      home: "Accueil",
      stablecoin: "Stablecoin",
      pricing: "Tarifs",
      support: "Support",
      download: "Télécharger Aura",
      personal: "Personnel",
      business: "Business"
    },
    hero: {
      badge: "Le Nouveau Standard Financier Suisse",
      title1: "Banque + Crypto.",
      title2: "Enfin Réunis.",
      subtitle: "Une seule application pour votre compte salaire, vos investissements crypto et vos économies. Payez, transférez et échangez sans frontières.",
      ctaPrimary: "Télécharger Aura",
      ctaSecondary: "Démonstration Live"
    },
    download: {
      title: "Le Terminal Financier Complet.",
      subtitle: "La version Desktop d'Aura offre la puissance nécessaire pour le trading professionnel, la gestion de trésorerie et l'analyse approfondie.",
      badge: "Disponible sur Desktop",
      step1: "Télécharger",
      step1Desc: "Compatible macOS, Windows & Linux.",
      step2: "Installation",
      step2Desc: "Suite logicielle sécurisée.",
      step3: "Synchronisation",
      step3Desc: "Connectez vos Hardware Wallets.",
      scan: "Version Mobile",
      desktopWarning: "L'application mobile (iOS/Android) sera disponible prochainement. Veuillez utiliser la version Desktop pour une expérience complète."
    },
    features: {
      title: "Ce que votre banque ne peut pas faire.",
      subtitle: "Aura brise les murs entre vos comptes courants et la blockchain.",
      f1: { title: "Paiements Hybrides", desc: "Votre loyer est en CHF, mais vous voulez payer avec vos gains Bitcoin ? Notre moteur convertit instantanément vos cryptos pour régler n'importe quelle facture QR-Bill suisse." },
      f2: { title: "Unification Totale", desc: "Fini les fichiers Excel. Connectez votre compte Raiffeisen/UBS et votre Ledger Nano X. Voyez votre patrimoine net réel en temps réel." },
      f3: { title: "L'IA qui Optimise", desc: "\"Vous avez trop de liquidités qui dorment.\" Notre IA analyse vos flux et vous suggère automatiquement de déplacer des fonds vers du Staking ou de l'Épargne." }
    },
    personal: {
        title: "Votre Vie Financière, Simplifiée.",
        subtitle: "De votre café du matin à votre retraite crypto.",
        heroBadge: "Compte Personnel",
        cards: [
            { title: "Épargne Automatique", desc: "Arrondissez chaque dépense à l'euro supérieur et investissez la différence en Bitcoin ou en Or." },
            { title: "Lifestyle & Voyage", desc: "Payez sans frais de change partout dans le monde. Retraits gratuits jusqu'à 1000 CHF/mois." },
            { title: "Agrégateur Bancaire", desc: "Connectez vos comptes externes (UBS, Revolut) pour avoir une vue à 360°." }
        ]
    },
    business: {
        title: "L'OS Financier des Entreprises Web3.",
        subtitle: "Gérez votre trésorerie Fiat et vos actifs Crypto sur une seule interface conforme.",
        heroBadge: "Compte Business",
        features: [
            { title: "Paiements de Masse", desc: "Payez 500 employés en un clic. Certains en CHF, d'autres en USDC. Tout est automatisé." },
            { title: "Comptabilité Automatisée", desc: "Exportez vos transactions (Chain + Banque) directement vers Bexio ou Abacus." },
            { title: "Sécurité Multi-Signature", desc: "Définissez des règles d'approbation complexes pour les mouvements de fonds importants." }
        ]
    },
    cards: {
        title: "La Carte Aura Metal",
        subtitle: "Un chef-d'œuvre d'ingénierie suisse dans votre poche.",
        limited: "Édition Limitée",
        price: "0 CHF",
        month: "/mois",
        delivery: "Livraison unique : 5 CHF",
        desc: "Pas de frais mensuels cachés. Vous payez la fabrication et l'expédition sécurisée.",
        cta: "Commander ma carte",
        virtualTitle: "Instantanée & Virtuelle",
        virtualDesc: "Pas envie d'attendre le facteur ? Votre carte est active dès votre inscription.",
        feat1: "Payez vos courses en Bitcoin",
        feat1Desc: "Utilisez votre carte Aura à la Coop ou Migros. Conversion temps réel.",
        feat2: "Cashback Aura TPE",
        feat2Desc: "2% de Cashback chez les commerçants partenaires."
    },
    chfm: {
        heroBadge: "Franc Suisse Numérique",
        title: "CHFM",
        subtitle: "La stabilité du Franc Suisse. La vitesse de la Blockchain. Le premier stablecoin institutionnel conçu pour l'écosystème Aura.",
        cta: "Lire le Whitepaper",
        reserveTitle: "Preuve de Réserve",
        reserveDesc: "100% adossé à des liquidités en Francs Suisses et des obligations d'État à court terme, audité mensuellement.",
        features: [
            { title: "Parité 1:1", desc: "Toujours échangeable contre 1 CHF. Pas de décalage, pas de risque de liquidité." },
            { title: "Régulation Suisse", desc: "Émis en conformité avec les directives FINMA. Votre argent reste en Suisse." },
            { title: "Vitesse Éclair", desc: "Règlement en secondes sur Ethereum et Solana, 24h/24 et 7j/7." }
        ],
        integrationTitle: "L'Avantage Aura",
        integrationDesc: "Les utilisateurs Aura bénéficient de privilèges exclusifs sur le CHFM.",
        int1: "Frais Zéro",
        int1Desc: "Mint et Redeem gratuits pour tous les clients Aura Business & Enterprise.",
        int2: "Rendement Natif",
        int2Desc: "Générez jusqu'à 2.5% APY sur vos CHFM dormants (offre entreprise).",
        table: {
            col1: "Fonctionnalité",
            col2: "CHFM",
            col3: "Stablecoins USD",
            col4: "Virement Bancaire",
            row1: "Devise de base",
            row2: "Temps de règlement",
            row3: "Audit",
            row4: "Coût transaction"
        },
        whitepaper: {
            title: "Documentation Technique",
            subtitle: "Comprendre l'architecture du CHFM.",
            download: "Télécharger PDF",
            version: "v2.1 (2025)",
            sec1: "Smart Contracts",
            sec1d: "Audité par CertiK et Quantstamp. Code open-source vérifiable sur Etherscan.",
            sec2: "Mécanisme de Mint",
            sec2d: "Création de jetons atomique uniquement à la réception des fonds Fiat confirmés.",
            sec3: "Conformité",
            sec3d: "Intégration KYT (Know Your Transaction) et liste blanche institutionnelle."
        }
    },
    pricing: {
        title: "Simple & Puissant.",
        subtitle: "Une tarification claire. Aucune surprise.",
        personal: "Personnel",
        free: "Gratuit",
        personalDesc: "Pour unifier votre patrimoine et économiser.",
        business: "Business",
        businessPrice: "29 CHF",
        businessDesc: "Comptabilité crypto & Paiements de masse.",
        enterprise: "Enterprise",
        enterprisePrice: "API",
        enterpriseDesc: "Intégration marque blanche et liquidité CHFM.",
        ctaStart: "Télécharger Aura",
        ctaTry: "Essai gratuit 14j",
        ctaContact: "Contacter",
        compareTitle: "Comparer les plans",
        features: {
            f1: "Comptes Bancaires IBAN CH",
            f2: "Cartes de débit Virtuelles",
            f3: "Carte Metal Physique",
            f4: "Agrégation Bancaire (Open Banking)",
            f5: "Portefeuille Crypto Non-Custodial",
            f6: "Paiements QR-Bill (Fiat & Crypto)",
            f7: "Gestion Multi-Utilisateurs",
            f8: "Export Comptable (Bexio, Abacus)",
            f9: "Accès API & Webhooks",
            f10: "Support Dédié 24/7"
        }
    },
    about: {
        title: "L'ADN Suisse. L'Ambition Mondiale.",
        subtitle: "Aura a été fondée à Zurich avec une mission simple : rendre l'ancienne finance compatible avec la nouvelle.",
        values: [
            { title: "Confiance", desc: "Nous ne jouons pas avec votre argent. Fonds ségrégués, audits mensuels, conformité FINMA." },
            { title: "Innovation", desc: "Nous ne nous contentons pas d'améliorer la banque. Nous la réinventons sur la blockchain." },
            { title: "Simplicity", desc: "La complexité technologique doit être invisible pour l'utilisateur final." }
        ],
        stats: [
            { val: "2.4 Mia", label: "Volume traité (CHF)" },
            { val: "45k+", label: "Utilisateurs actifs" },
            { val: "Zurich", label: "Siège Social" }
        ]
    },
    careers: {
        title: "Construisez le Futur.",
        subtitle: "Rejoignez une équipe d'ingénieurs, de designers et de banquiers qui refusent le statu quo.",
        jobs: [
            { title: "Senior Rust Engineer", loc: "Zurich / Remote", type: "Engineering" },
            { title: "Product Designer (UI/UX)", loc: "Lausanne / Remote", type: "Design" },
            { title: "Compliance Officer", loc: "Zurich", type: "Legal" },
            { title: "Head of Growth", loc: "London / Remote", type: "Marketing" }
        ]
    },
    help: {
        title: "Centre d'Aide",
        subtitle: "Comment pouvons-nous vous aider aujourd'hui ?",
        placeholder: "Rechercher un article...",
        faq: [
            { q: "Mes fonds sont-ils garantis ?", a: "Oui, les dépôts en CHF sont garantis jusqu'à 100'000 CHF par la protection des déposants suisses (esisuisse)." },
            { q: "Puis-je exporter mes clés privées ?", a: "Absolument. Aura est non-custodial par défaut pour le Web3. Vous possédez vos 12/24 mots." },
            { q: "Quels sont les frais de change ?", a: "Nous appliquons le taux interbancaire + 0.5%. C'est en moyenne 4x moins cher qu'une banque traditionnelle." }
        ]
    },
    status: {
        title: "État du Système",
        subtitle: "Moniteur de performance en temps réel de nos services.",
        allSystems: "Tous les systèmes opérationnels",
        services: [
            { name: "Aura API", status: "operational" },
            { name: "Paiements SEPA/SIC", status: "operational" },
            { name: "Cartes (Processing)", status: "operational" },
            { name: "Ethereum Node", status: "operational" },
            { name: "Solana Node", status: "degraded", msg: "Latence élevée détectée" },
            { name: "CHFM Mint/Burn", status: "operational" }
        ]
    },
    footer: {
        newsletterTitle: "Restez informé",
        newsletterDesc: "Recevez les mises à jour produit et nos analyses de marché.",
        newsletterPlaceholder: "votre@email.com",
        subscribe: "S'abonner",
        trust: "Données hébergées en Suisse. Chiffrées de bout en bout.",
        cols: {
            platform: "Plateforme",
            company: "Société",
            resources: "Ressources"
        }
    }
  },
  en: {
    nav: {
      home: "Home",
      stablecoin: "Stablecoin",
      pricing: "Pricing",
      support: "Support",
      download: "Download Aura",
      personal: "Personal",
      business: "Business"
    },
    hero: {
      badge: "The New Swiss Financial Standard",
      title1: "Bank + Crypto.",
      title2: "Finally United.",
      subtitle: "One app for your salary account, crypto investments, and savings. Pay, transfer, and exchange without borders.",
      ctaPrimary: "Download Aura",
      ctaSecondary: "Live Demo"
    },
    download: {
      title: "The Complete Financial Terminal.",
      subtitle: "Aura Desktop delivers the power needed for professional trading, treasury management, and deep analysis.",
      badge: "Available on Desktop",
      step1: "Download",
      step1Desc: "Compatible with macOS, Windows & Linux.",
      step2: "Install",
      step2Desc: "Secure software suite.",
      step3: "Sync",
      step3Desc: "Connect Hardware Wallets.",
      scan: "Mobile Version",
      desktopWarning: "The mobile app (iOS/Android) will be available soon. Please use the Desktop version for the full experience."
    },
    features: {
      title: "What your bank can't do.",
      subtitle: "Aura breaks the walls between your checking accounts and the blockchain.",
      f1: { title: "Hybrid Payments", desc: "Rent is in CHF, but want to pay with Bitcoin gains? Our engine instantly converts crypto to settle any Swiss QR-Bill." },
      f2: { title: "Total Unification", desc: "No more Excel files. Connect your Raiffeisen/UBS account and Ledger Nano X. See your real net worth in real-time." },
      f3: { title: "Optimizing AI", desc: "\"You have too much idle cash.\" Our AI analyzes your flows and automatically suggests moving funds to Staking or Savings." }
    },
    personal: {
        title: "Your Financial Life, Simplified.",
        subtitle: "From your morning coffee to your crypto retirement.",
        heroBadge: "Personal Account",
        cards: [
            { title: "Auto-Invest", desc: "Round up every expense to the nearest franc and invest the difference in Bitcoin or Gold." },
            { title: "Lifestyle & Travel", desc: "Pay with no exchange fees worldwide. Free withdrawals up to 1000 CHF/month." },
            { title: "Bank Aggregator", desc: "Connect external accounts (UBS, Revolut) for a 360° view." }
        ]
    },
    business: {
        title: "The Financial OS for Web3 Companies.",
        subtitle: "Manage your Fiat treasury and Crypto assets on a single compliant interface.",
        heroBadge: "Business Account",
        features: [
            { title: "Mass Payments", desc: "Pay 500 employees in one click. Some in CHF, others in USDC. Everything is automated." },
            { title: "Automated Accounting", desc: "Export your transactions (Chain + Bank) directly to Bexio or Abacus." },
            { title: "Multi-Sig Security", desc: "Define complex approval rules for large fund movements." }
        ]
    },
    cards: {
        title: "The Aura Metal Card",
        subtitle: "A masterpiece of Swiss engineering in your pocket.",
        limited: "Limited Edition",
        price: "0 CHF",
        month: "/month",
        delivery: "One-time delivery: 5 CHF",
        desc: "No hidden monthly fees. You pay for manufacturing and secure shipping.",
        cta: "Order my card",
        virtualTitle: "Instant & Virtual",
        virtualDesc: "Don't want to wait? Your card is active immediately upon registration.",
        feat1: "Pay groceries in Bitcoin",
        feat1Desc: "Use your Aura card at Coop or Migros. Real-time conversion.",
        feat2: "Aura POS Cashback",
        feat2Desc: "2% Cashback at partner merchants."
    },
    chfm: {
        heroBadge: "Digital Swiss Franc",
        title: "CHFM",
        subtitle: "The stability of the Swiss Franc. The speed of Blockchain. The first institutional stablecoin designed for the Aura ecosystem.",
        cta: "Read Whitepaper",
        reserveTitle: "Proof of Reserve",
        reserveDesc: "100% backed by Swiss Franc cash and short-term government bonds, audited monthly.",
        features: [
            { title: "1:1 Peg", desc: "Always redeemable for 1 CHF. No slippage, no liquidity risk." },
            { title: "Swiss Regulation", desc: "Issued in compliance with FINMA guidelines. Your money stays in Switzerland." },
            { title: "Lightning Speed", desc: "Settlement in seconds on Ethereum and Solana, 24/7." }
        ],
        integrationTitle: "The Aura Advantage",
        integrationDesc: "Aura users get exclusive privileges on CHFM.",
        int1: "Zero Fees",
        int1Desc: "Free Mint and Redeem for all Aura Business & Enterprise clients.",
        int2: "Native Yield",
        int2Desc: "Generate up to 2.5% APY on idle CHFM (Enterprise offer).",
        table: {
            col1: "Feature",
            col2: "CHFM",
            col3: "USD Stablecoins",
            col4: "Bank Wire",
            row1: "Base Currency",
            row2: "Settlement Time",
            row3: "Audit",
            row4: "Tx Cost"
        },
        whitepaper: {
            title: "Technical Documentation",
            subtitle: "Understand the CHFM architecture.",
            download: "Download PDF",
            version: "v2.1 (2025)",
            sec1: "Smart Contracts",
            sec1d: "Audited by CertiK and Quantstamp. Verifiable open-source code on Etherscan.",
            sec2: "Mint Mechanism",
            sec2d: "Atomic token creation only upon receipt of confirmed Fiat funds.",
            sec3: "Compliance",
            sec3d: "Integrated KYT (Know Your Transaction) and institutional whitelist."
        }
    },
    pricing: {
        title: "Simple & Powerful.",
        subtitle: "Clear pricing. No surprises.",
        personal: "Personal",
        free: "Free",
        personalDesc: "To unify your wealth and save money.",
        business: "Business",
        businessPrice: "29 CHF",
        businessDesc: "Crypto accounting & Mass payments.",
        enterprise: "Enterprise",
        enterprisePrice: "API",
        enterpriseDesc: "White-label integration & CHFM liquidity.",
        ctaStart: "Download Aura",
        ctaTry: "14-day free trial",
        ctaContact: "Contact us",
        compareTitle: "Compare Plans",
        features: {
            f1: "CH IBAN Bank Accounts",
            f2: "Virtual Debit Cards",
            f3: "Physical Metal Card",
            f4: "Bank Aggregation (Open Banking)",
            f5: "Non-Custodial Crypto Wallet",
            f6: "QR-Bill Payments (Fiat & Crypto)",
            f7: "Multi-User Management",
            f8: "Accounting Export (Bexio, Abacus)",
            f9: "API Access & Webhooks",
            f10: "24/7 Dedicated Support"
        }
    },
    about: {
        title: "Swiss DNA. Global Ambition.",
        subtitle: "Aura was founded in Zurich with a simple mission: make old finance compatible with the new.",
        values: [
            { title: "Trust", desc: "We don't gamble with your money. Segregated funds, monthly audits, FINMA compliance." },
            { title: "Innovation", desc: "We don't just improve banking. We reinvent it on the blockchain." },
            { title: "Simplicity", desc: "Technological complexity should be invisible to the end user." }
        ],
        stats: [
            { val: "2.4 Bn", label: "Volume Processed (CHF)" },
            { val: "45k+", label: "Active Users" },
            { val: "Zurich", label: "Headquarters" }
        ]
    },
    careers: {
        title: "Build the Future.",
        subtitle: "Join a team of engineers, designers, and bankers who refuse the status quo.",
        jobs: [
            { title: "Senior Rust Engineer", loc: "Zurich / Remote", type: "Engineering" },
            { title: "Product Designer (UI/UX)", loc: "Lausanne / Remote", type: "Design" },
            { title: "Compliance Officer", loc: "Zurich", type: "Legal" },
            { title: "Head of Growth", loc: "London / Remote", type: "Marketing" }
        ]
    },
    help: {
        title: "Help Center",
        subtitle: "How can we support you today?",
        placeholder: "Search for an article...",
        faq: [
            { q: "Are my funds guaranteed?", a: "Yes, CHF deposits are guaranteed up to 100,000 CHF by Swiss depositor protection (esisuisse)." },
            { q: "Can I export my private keys?", a: "Absolutely. Aura is non-custodial by default for Web3. You own your 12/24 words." },
            { q: "What are the exchange fees?", a: "We apply the interbank rate + 0.5%. This is on average 4x cheaper than a traditional bank." }
        ]
    },
    status: {
        title: "System Status",
        subtitle: "Real-time performance monitor of our services.",
        allSystems: "All Systems Operational",
        services: [
            { name: "Aura API", status: "operational" },
            { name: "SEPA/SIC Payments", status: "operational" },
            { name: "Card Processing", status: "operational" },
            { name: "Ethereum Node", status: "operational" },
            { name: "Solana Node", status: "degraded", msg: "High Latency Detected" },
            { name: "CHFM Mint/Burn", status: "operational" }
        ]
    },
    footer: {
        newsletterTitle: "Stay Updated",
        newsletterDesc: "Get product updates and our market analysis.",
        newsletterPlaceholder: "your@email.com",
        subscribe: "Subscribe",
        trust: "Data hosted in Switzerland. End-to-end encrypted.",
        cols: {
            platform: "Platform",
            company: "Company",
            resources: "Resources"
        }
    }
  }
};

// --- Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
} as const;

// --- Generic Components ---

const RevealOnScroll: React.FC<{ children?: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};

const Button = ({ children, variant = 'primary', className = '', onClick, ariaLabel }: { children: React.ReactNode; variant?: string; className?: string; onClick?: () => void; ariaLabel?: string }) => {
  const base = "inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-all duration-300 cursor-pointer tracking-wide relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-swiss-blue";
  
  const styles: Record<string, string> = {
    primary: "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-1",
    swiss: "bg-swiss-blue text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1",
    chfm: "bg-gradient-to-r from-swiss-red to-red-700 text-white hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1",
    white: "bg-white text-slate-900 shadow-lg hover:shadow-xl border border-slate-100 hover:-translate-y-1",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 bg-transparent"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${styles[variant] || styles.primary} ${className}`} aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-swiss-blue' : 'text-slate-900 group-hover:text-swiss-blue'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-swiss-blue text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="text-slate-500 leading-relaxed pr-8">
          {answer}
        </div>
      </div>
    </div>
  );
};

const Hero3D = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x: x * 2, y: y * 2 }); 
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <div className="relative max-w-6xl mx-auto pt-10 pb-20 hidden md:block" aria-hidden="true">
             <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative bg-slate-900 rounded-[2.5rem] p-1 shadow-2xl border border-slate-800 overflow-hidden transition-transform duration-100 ease-out will-change-transform"
                style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg) scale3d(1, 1, 1)`
                }}
            >
               <div 
                className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                style={{ transform: `scale(1.2) translateX(${mousePos.x * -15}px) translateY(${mousePos.y * -15}px)` }}
               ></div>
               <div className="absolute top-0 left-0 w-full h-full opacity-20"></div>
               
               <div className="relative rounded-[2.3rem] overflow-hidden bg-slate-900/50 backdrop-blur-sm aspect-[21/10] flex">
                  <div className="flex-1 p-12 border-r border-slate-800/50 relative z-10">
                      <div 
                        className="absolute top-8 left-8 flex items-center gap-2"
                        style={{ transform: `translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -10}px)` }}
                      >
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fiat (CHF/EUR)</span>
                      </div>
                      <div className="mt-20">
                          <div className="text-slate-400 text-sm mb-1">Solde Courant (UBS)</div>
                          <div className="text-4xl font-bold text-white mb-8 tracking-tight">CHF 14'250.00</div>
                          <div className="space-y-4">
                              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md shadow-lg transition-transform duration-200"
                                   style={{ transform: `translateX(${mousePos.x * 20}px) translateY(${mousePos.y * 20}px)` }}
                              >
                                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center"><Building2 size={20}/></div>
                                  <div>
                                      <div className="text-white font-medium text-sm">Salaire (Zurich Assurances)</div>
                                      <div className="text-slate-400 text-xs">Il y a 2 jours</div>
                                  </div>
                                  <div className="ml-auto text-green-400 font-mono text-sm font-bold">+ 6'450.00</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div 
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-swiss-red to-red-700 border-[8px] border-slate-900 shadow-2xl shadow-red-900/50 flex items-center justify-center text-white"
                        style={{ 
                            transform: `translateZ(50px) scale(${1 + Math.abs(mousePos.x * 0.05)}) rotate(${mousePos.x * 15}deg)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                      >
                          <ArrowLeftRight size={36} />
                      </div>
                  </div>
                  <div className="flex-1 p-12 relative text-right z-10">
                      <div 
                        className="absolute top-8 right-8 flex items-center gap-2"
                        style={{ transform: `translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -10}px)` }}
                      >
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Web3 (On-Chain)</span>
                          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>
                      <div className="mt-20 flex flex-col items-end">
                          <div className="text-slate-400 text-sm mb-1">Solde DeFi (MetaMask)</div>
                          <div className="text-4xl font-bold text-white mb-8 tracking-tight">
                              <span className="text-cyan-400">Ξ</span> 4.25 ETH
                          </div>
                          <div className="space-y-4 w-full">
                              <div className="flex items-center flex-row-reverse gap-4 p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md shadow-lg transition-transform duration-200"
                                   style={{ transform: `translateX(${mousePos.x * 25}px) translateY(${mousePos.y * 25}px)` }}
                              >
                                  <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center"><Zap size={20}/></div>
                                  <div className="text-right">
                                      <div className="text-white font-medium text-sm">Uniswap V3 LP</div>
                                      <div className="text-slate-400 text-xs">Yield Farming</div>
                                  </div>
                                  <div className="mr-auto text-green-400 font-mono text-sm font-bold">+ 0.05 ETH</div>
                              </div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>
        </div>
    );
};

const ReserveVault3D = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center perspective-1000">
      <motion.div
        ref={containerRef}
        className="relative w-[350px] h-[450px] md:w-[400px] md:h-[500px] preserve-3d cursor-pointer transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Back Panel */}
        <div className="absolute inset-0 bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-800 flex flex-col overflow-hidden" style={{ transform: 'translateZ(-20px)' }}>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-swiss-red/20 to-transparent"></div>
        </div>

        {/* Middle Layer - Liquid Assets */}
        <div className="absolute inset-4 bg-slate-800/80 backdrop-blur-md rounded-[1.5rem] border border-slate-700/50 flex flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Reserve</span>
                <ShieldCheck size={16} className="text-green-400" />
            </div>
            <div className="mt-auto">
                <div className="text-5xl font-mono font-bold text-white tracking-tighter mb-2">100<span className="text-swiss-red text-3xl">%</span></div>
                <div className="text-sm text-slate-400 mb-6">Ratio de collatéralisation</div>
                
                {/* Progress Bars */}
                <div className="space-y-3">
                    <div className="relative h-12 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 group">
                        <div className="absolute top-0 left-0 h-full w-[85%] bg-gradient-to-r from-swiss-red to-red-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                            <span className="text-xs font-bold text-white uppercase z-10 drop-shadow-md">Liquid Cash (CHF)</span>
                            <span className="text-xs font-mono font-bold text-white z-10">85%</span>
                        </div>
                    </div>
                    <div className="relative h-12 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                         <div className="absolute top-0 left-0 h-full w-[15%] bg-slate-600"></div>
                         <div className="absolute inset-0 flex items-center justify-between px-4">
                            <span className="text-xs font-bold text-slate-300 uppercase z-10">Gov Bonds</span>
                            <span className="text-xs font-mono font-bold text-slate-300 z-10">15%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Front Layer - Floating Elements */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(60px)' }}>
            <div className="absolute top-10 right-[-20px] bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl font-bold text-sm flex items-center gap-2 animate-float-slow">
                <Check size={16} className="text-green-600" /> Audited
            </div>
            <div className="absolute bottom-20 left-[-20px] bg-slate-900 text-white border border-slate-700 px-4 py-2 rounded-xl shadow-xl font-bold text-sm flex items-center gap-2 animate-float-delayed">
                <Building2 size={16} className="text-swiss-red" /> SNB Custody
            </div>
            {/* Floating Coin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-swiss-red to-red-800 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/50 border-4 border-slate-900" style={{ transform: 'translateZ(80px)' }}>
                <span className="text-3xl font-bold text-white">₣</span>
            </div>
        </div>
        
      </motion.div>
    </div>
  );
};

const AuraCard3D = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    setRotate({ x: (y - centerY) / 10, y: (centerX - x) / 10 });
  };

  return (
    <div className="w-full h-96 flex items-center justify-center perspective-1000">
      <motion.div
        className="relative w-96 h-60 rounded-2xl shadow-2xl cursor-pointer preserve-3d transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-slate-700 overflow-hidden backface-hidden shadow-glow-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150"></div>
          <div className="relative z-10 p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded-md opacity-90 shadow-sm"></div>
              <div className="text-white font-bold text-lg tracking-widest italic">Aura</div>
            </div>
            <div className="text-slate-300 font-mono text-lg tracking-[0.15em] shadow-black drop-shadow-md">4920 1024 4590 1234</div>
            <div className="flex justify-between items-end">
               <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Card Holder</p>
                 <p className="text-white font-bold tracking-wider">JEAN DUPONT</p>
               </div>
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-400 opacity-50"></div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-slate-600 transform translate-z-[-2px]"></div>
      </motion.div>
    </div>
  );
};

// --- New Pages ---

const DownloadAppPage = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang];
    useEffect(() => window.scrollTo(0,0), []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 z-10">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swiss-blue/20 text-swiss-blue text-xs font-bold uppercase mb-6 tracking-widest border border-swiss-blue/30">
                             <Monitor size={12} /> {t.download.badge}
                         </div>
                         <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">{t.download.title}</h1>
                         <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                             {t.download.subtitle}
                         </p>

                         <div className="space-y-8 mb-10">
                             <div className="flex items-start gap-4">
                                 <div className="w-10 h-10 bg-swiss-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                 <div>
                                     <h4 className="text-lg font-bold text-white mb-1">{t.download.step1}</h4>
                                     <p className="text-slate-400 text-sm">{t.download.step1Desc}</p>
                                 </div>
                             </div>
                             <div className="flex items-start gap-4">
                                 <div className="w-10 h-10 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center font-bold flex-shrink-0 border border-slate-700">2</div>
                                 <div>
                                     <h4 className="text-lg font-bold text-white mb-1">{t.download.step2}</h4>
                                     <p className="text-slate-400 text-sm">{t.download.step2Desc}</p>
                                 </div>
                             </div>
                             <div className="flex items-start gap-4">
                                 <div className="w-10 h-10 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center font-bold flex-shrink-0 border border-slate-700">3</div>
                                 <div>
                                     <h4 className="text-lg font-bold text-white mb-1">{t.download.step3}</h4>
                                     <p className="text-slate-400 text-sm">{t.download.step3Desc}</p>
                                 </div>
                             </div>
                         </div>

                         {/* Desktop Downloads */}
                         <div className="flex flex-wrap gap-4 mb-12">
                             <button className="flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg font-bold">
                                 <Apple size={20} />
                                 Download for macOS
                             </button>
                             <button className="flex items-center gap-3 bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 px-6 py-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg font-bold">
                                 <Monitor size={20} />
                                 Windows
                             </button>
                             <button className="flex items-center gap-3 bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 px-6 py-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg font-bold">
                                 <Server size={20} />
                                 Linux
                             </button>
                         </div>

                         {/* Mobile Coming Soon */}
                         <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm w-fit opacity-80 hover:opacity-100 transition-opacity">
                             <div className="bg-slate-800 p-3 rounded-xl flex items-center justify-center">
                                 <Smartphone size={32} className="text-slate-500" />
                             </div>
                             <div>
                                 <p className="font-bold text-white mb-1">{t.download.scan}</p>
                                 <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-swiss-blue/20 text-swiss-blue text-[10px] font-bold uppercase rounded-md">Coming Soon</div>
                                 <p className="text-xs text-slate-400 mt-1">{t.download.desktopWarning}</p>
                             </div>
                         </div>
                    </div>

                    {/* Laptop Visual */}
                    <div className="flex-1 relative flex justify-center items-center">
                         <div className="absolute inset-0 bg-swiss-blue/20 blur-[120px] rounded-full"></div>
                         
                         {/* Pure CSS Laptop Mockup */}
                         <div className="relative group perspective-1000">
                            {/* Screen */}
                            <div className="relative w-[600px] aspect-[16/10] bg-slate-800 rounded-t-2xl border-[12px] border-slate-800 border-b-0 shadow-2xl z-10 overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-900 rounded-b-md z-20"></div>
                                {/* Screen Content */}
                                <div className="bg-slate-950 w-full h-full relative flex flex-col p-4">
                                    {/* Mock Header */}
                                    <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                                        <div className="flex items-center gap-2">
                                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="text-xs text-slate-500 font-mono">aura-terminal-v2.4.1</div>
                                    </div>
                                    
                                    {/* Mock Dashboard */}
                                    <div className="flex gap-4 h-full">
                                        <div className="w-1/4 bg-slate-900 rounded-xl p-3 space-y-3">
                                            <div className="h-8 w-full bg-slate-800 rounded-lg animate-pulse"></div>
                                            <div className="h-4 w-3/4 bg-slate-800 rounded-lg opacity-50"></div>
                                            <div className="h-4 w-1/2 bg-slate-800 rounded-lg opacity-50"></div>
                                            <div className="mt-auto pt-10">
                                                 <div className="h-20 w-full bg-swiss-blue/10 rounded-lg border border-swiss-blue/20"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-4">
                                            <div className="h-1/3 bg-slate-900 rounded-xl p-4 flex items-end justify-between border border-slate-800">
                                                <div>
                                                    <div className="text-xs text-slate-400">Total Liquidity</div>
                                                    <div className="text-3xl font-bold text-white">CHF 142,590</div>
                                                </div>
                                                <div className="text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs font-bold">+4.2%</div>
                                            </div>
                                            <div className="h-2/3 bg-slate-900 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
                                                {/* Mock Chart */}
                                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-swiss-blue/20 to-transparent"></div>
                                                <svg className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
                                                    <path d="M0,100 Q150,50 300,80 T600,20" fill="none" stroke="#0052FF" strokeWidth="3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Hinge */}
                            <div className="w-[600px] h-[20px] bg-slate-800 relative z-0 mx-auto"></div>
                            {/* Base */}
                            <div className="w-[700px] h-[20px] bg-slate-700 rounded-b-xl shadow-xl relative z-0 -ml-[50px] border-t border-slate-600">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-800 rounded-b-md"></div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const AboutPage = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang];
    useEffect(() => window.scrollTo(0,0), []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-swiss-red text-xs font-bold uppercase mb-6 tracking-widest border border-red-100">
                        <Landmark size={12} /> Founded 2024
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                        {t.about.title}
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        {t.about.subtitle}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 border-y border-slate-100 py-12 mb-20">
                    {t.about.stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2">{s.val}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-12">
                    {t.about.values.map((v, i) => (
                        <div key={i} className="p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-swiss-navy text-white rounded-xl flex items-center justify-center mb-6">
                                {i === 0 ? <ShieldCheck /> : i === 1 ? <Zap /> : <Heart />}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{v.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

const CareersPage = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang];
    useEffect(() => window.scrollTo(0,0), []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50">
             <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-6">{t.careers.title}</h1>
                    <p className="text-xl text-slate-500">{t.careers.subtitle}</p>
                </div>

                <div className="grid gap-6">
                    {t.careers.jobs.map((job, i) => (
                        <div key={i} className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between hover:border-swiss-blue hover:shadow-md transition-all group cursor-pointer">
                            <div>
                                <div className="text-xs font-bold text-swiss-blue uppercase mb-2 tracking-wide">{job.type}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <MapPin size={14} /> {job.loc}
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-swiss-blue group-hover:text-white transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    )
};

const HelpPage = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang];
    useEffect(() => window.scrollTo(0,0), []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-white">
             <div className="max-w-3xl mx-auto px-6 text-center">
                <div className="w-16 h-16 bg-blue-50 text-swiss-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <HelpCircle size={32} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t.help.title}</h1>
                <p className="text-lg text-slate-500 mb-8">{t.help.subtitle}</p>

                <div className="relative max-w-xl mx-auto mb-16">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={t.help.placeholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-swiss-blue/20 focus:border-swiss-blue transition-all"
                    />
                </div>

                <div className="text-left space-y-4">
                    {t.help.faq.map((item, i) => (
                        <AccordionItem key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
             </div>
        </div>
    )
};

const StatusPage = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang];
    useEffect(() => window.scrollTo(0,0), []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-900 text-white">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">{t.status.title}</h1>
                    <p className="text-slate-400">{t.status.subtitle}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4 mb-12">
                    <CheckCircle2 className="text-green-500 h-8 w-8" />
                    <span className="text-xl font-bold text-green-500">{t.status.allSystems}</span>
                </div>

                <div className="space-y-4">
                    {t.status.services.map((s, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between">
                            <span className="font-medium">{s.name}</span>
                            <div className="flex items-center gap-3">
                                {s.msg && <span className="text-xs text-yellow-500 font-mono bg-yellow-500/10 px-2 py-1 rounded">{s.msg}</span>}
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${s.status === 'operational' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    <div className={`w-2 h-2 rounded-full ${s.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                                    {s.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

const LegalDocPage = ({ title, children }: { title: string, children: React.ReactNode }) => {
    useEffect(() => window.scrollTo(0,0), []);
    return (
        <div className="pt-32 pb-24 min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-12 border-b border-slate-100 pb-8">{title}</h1>
                <div className="prose prose-slate prose-lg text-slate-600">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Existing Pages (With Modifications) ---

const CHFMPage = ({ lang, onStart }: { lang: Lang, onStart: () => void }) => {
    const t = CONTENT[lang];
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-swiss-ice min-h-screen">
             <div className="pt-32 pb-20 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                     <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-red-100 rounded-full blur-[120px] opacity-50"></div>
                 </div>
                 <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-swiss-red text-xs font-bold uppercase mb-6 tracking-widest border border-red-100">
                                <Landmark size={12} /> {t.chfm.heroBadge}
                            </div>
                            <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 mb-6 tracking-tighter">
                                {t.chfm.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 mb-10 font-medium leading-relaxed">
                                {t.chfm.subtitle}
                            </p>
                            <div className="flex gap-4">
                                <Button variant="chfm" onClick={onStart}>{t.hero.ctaPrimary}</Button>
                                <Button variant="white" className="gap-2" onClick={() => document.getElementById('whitepaper')?.scrollIntoView({behavior: 'smooth'})}>
                                    <FileText size={18} className="text-slate-400"/> {t.chfm.cta}
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full flex justify-center md:justify-end">
                            <ReserveVault3D />
                        </div>
                    </div>
                 </div>
             </div>

             <div className="bg-white py-24 border-y border-slate-100">
                 <div className="max-w-7xl mx-auto px-6">
                     <div className="grid md:grid-cols-3 gap-12">
                        {t.chfm.features.map((f, i) => (
                            <RevealOnScroll key={i} delay={i*100}>
                                <div className="group">
                                    <div className="w-16 h-16 rounded-2xl bg-red-50 text-swiss-red flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {i === 0 ? <Activity size={32}/> : i === 1 ? <ShieldCheck size={32}/> : <Zap size={32}/>}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                     </div>
                 </div>
             </div>

             {/* Comparison Table */}
             <div className="py-24 max-w-5xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16">Why choose CHFM?</h2>
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-4 bg-slate-50 p-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <div className="col-span-1">{t.chfm.table.col1}</div>
                        <div className="col-span-1 text-center text-swiss-red">{t.chfm.table.col2}</div>
                        <div className="col-span-1 text-center">{t.chfm.table.col3}</div>
                        <div className="col-span-1 text-center">{t.chfm.table.col4}</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <div className="grid grid-cols-4 p-6 items-center hover:bg-slate-50 transition-colors">
                            <div className="font-bold text-slate-900">{t.chfm.table.row1}</div>
                            <div className="text-center font-bold text-swiss-red">CHF (Swiss Franc)</div>
                            <div className="text-center text-slate-600">USD (Dollar)</div>
                            <div className="text-center text-slate-600">CHF</div>
                        </div>
                        <div className="grid grid-cols-4 p-6 items-center hover:bg-slate-50 transition-colors">
                            <div className="font-bold text-slate-900">{t.chfm.table.row2}</div>
                            <div className="text-center font-bold text-swiss-red">~2 Seconds</div>
                            <div className="text-center text-slate-600">~2 Seconds</div>
                            <div className="text-center text-slate-600">1-3 Days</div>
                        </div>
                        <div className="grid grid-cols-4 p-6 items-center hover:bg-slate-50 transition-colors">
                            <div className="font-bold text-slate-900">{t.chfm.table.row3}</div>
                            <div className="text-center font-bold text-swiss-red">Daily (On-Chain)</div>
                            <div className="text-center text-slate-600">Monthly/Quarterly</div>
                            <div className="text-center text-slate-600">Internal</div>
                        </div>
                         <div className="grid grid-cols-4 p-6 items-center hover:bg-slate-50 transition-colors">
                            <div className="font-bold text-slate-900">{t.chfm.table.row4}</div>
                            <div className="text-center font-bold text-swiss-red">&lt; $0.01</div>
                            <div className="text-center text-slate-600">&lt; $0.01</div>
                            <div className="text-center text-slate-600">$5 - $25</div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Aura Integration */}
             <div className="bg-swiss-navy py-24 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-swiss-red opacity-10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                         <div className="flex-1">
                             <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t.chfm.integrationTitle}</h2>
                             <p className="text-xl text-slate-300 mb-12">{t.chfm.integrationDesc}</p>
                             
                             <div className="space-y-8">
                                 <div className="flex gap-6">
                                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"><Gem className="text-white"/></div>
                                     <div>
                                         <h4 className="text-xl font-bold mb-2">{t.chfm.int1}</h4>
                                         <p className="text-slate-400">{t.chfm.int1Desc}</p>
                                     </div>
                                 </div>
                                 <div className="flex gap-6">
                                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"><TrendingUp className="text-green-400"/></div>
                                     <div>
                                         <h4 className="text-xl font-bold mb-2">{t.chfm.int2}</h4>
                                         <p className="text-slate-400">{t.chfm.int2Desc}</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                             <div className="text-center mb-8">
                                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Instant Minting</p>
                                 <div className="flex items-center justify-center gap-4 text-3xl font-bold">
                                     <span>1,000 CHF</span>
                                     <ArrowRight className="text-slate-500" />
                                     <span className="text-swiss-red">1,000 CHFM</span>
                                 </div>
                                 <p className="text-xs text-slate-500 mt-2">Fee: 0.00 CHF</p>
                             </div>
                             <Button className="w-full" variant="chfm" onClick={onStart}>{t.hero.ctaPrimary}</Button>
                         </div>
                    </div>
                </div>
             </div>

             {/* Whitepaper Section */}
             <div id="whitepaper" className="py-24 bg-slate-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white rounded-[2rem] p-10 md:p-16 border border-slate-200 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full opacity-50 pointer-events-none"></div>
                        
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 text-white">
                                    <FileCode size={32} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.chfm.whitepaper.title}</h2>
                                <p className="text-lg text-slate-500 mb-8">{t.chfm.whitepaper.subtitle}</p>
                                
                                <div className="space-y-6 mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-1 h-auto bg-swiss-red rounded-full"></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{t.chfm.whitepaper.sec1}</h4>
                                            <p className="text-sm text-slate-500">{t.chfm.whitepaper.sec1d}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1 h-auto bg-swiss-red rounded-full"></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{t.chfm.whitepaper.sec2}</h4>
                                            <p className="text-sm text-slate-500">{t.chfm.whitepaper.sec2d}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1 h-auto bg-swiss-red rounded-full"></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{t.chfm.whitepaper.sec3}</h4>
                                            <p className="text-sm text-slate-500">{t.chfm.whitepaper.sec3d}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <Button variant="primary" className="gap-2">
                                        <Download size={18} /> {t.chfm.whitepaper.download}
                                    </Button>
                                    <span className="text-sm font-mono text-slate-400">{t.chfm.whitepaper.version}</span>
                                </div>
                            </div>
                            
                            {/* Visual Paper Preview */}
                            <div className="flex-1 relative flex justify-center">
                                <div className="relative w-64 h-80 bg-white border border-slate-200 shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 border-b border-r border-slate-100">
                                        <div className="w-12 h-12 bg-swiss-red rounded-full mb-4 opacity-20"></div>
                                        <div className="w-32 h-4 bg-slate-100 mb-2 rounded"></div>
                                        <div className="w-24 h-4 bg-slate-100 mb-8 rounded"></div>
                                        <div className="w-full space-y-2">
                                            <div className="w-full h-2 bg-slate-50 rounded"></div>
                                            <div className="w-full h-2 bg-slate-50 rounded"></div>
                                            <div className="w-3/4 h-2 bg-slate-50 rounded"></div>
                                        </div>
                                    </div>
                                    {/* Back Pages Effect */}
                                    <div className="absolute inset-0 bg-white border border-slate-200 shadow-lg -z-10 rotate-3 translate-x-2 translate-y-2"></div>
                                    <div className="absolute inset-0 bg-white border border-slate-200 shadow-md -z-20 rotate-6 translate-x-4 translate-y-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

const PersonalPage = ({ lang, onStart }: { lang: Lang, onStart: () => void }) => {
    const t = CONTENT[lang];
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-swiss-blue text-xs font-bold uppercase mb-6 tracking-widest">
                        <UserIcon size={12} /> {t.personal.heroBadge}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        {t.personal.title}
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                        {t.personal.subtitle}
                    </p>
                    <Button onClick={onStart}>{t.hero.ctaPrimary}</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {t.personal.cards.map((card, i) => (
                        <RevealOnScroll key={i} delay={i * 100}>
                            <div className="bg-slate-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-slate-100 h-full group">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-swiss-blue group-hover:scale-110 transition-transform">
                                    {i === 0 ? <Coins size={24}/> : i === 1 ? <Globe2 size={24}/> : <Wallet size={24}/>}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
                
                {/* Visual Section */}
                <div className="bg-swiss-ice rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="max-w-2xl relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Lifestyle Banking</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            {lang === 'fr' 
                              ? "Que vous payiez un café à Zurich ou un hôtel à Tokyo, Aura utilise le meilleur taux de change. Sans frais cachés. Vos cryptos sont utilisables instantanément si vous le décidez."
                              : "Whether paying for coffee in Zurich or a hotel in Tokyo, Aura uses the best exchange rate. No hidden fees. Your crypto is instantly usable if you choose."}
                        </p>
                        <div className="flex gap-4">
                             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-slate-700">
                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div> 0% Fees
                             </div>
                             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-slate-700">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Best Rate
                             </div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100 to-white rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

const BusinessPage = ({ lang, onStart }: { lang: Lang, onStart: () => void }) => {
    const t = CONTENT[lang];
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-32 pb-20 bg-swiss-navy min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase mb-6 tracking-widest">
                        <Building2 size={12} /> {t.business.heroBadge}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                        {t.business.title}
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        {t.business.subtitle}
                    </p>
                    <Button variant="white" onClick={onStart}>{t.pricing.ctaStart}</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {t.business.features.map((feat, i) => (
                        <RevealOnScroll key={i} delay={i * 100}>
                            <div className="bg-white/5 p-8 rounded-[2rem] hover:bg-white/10 transition-all border border-white/10 h-full group">
                                <div className="w-14 h-14 bg-swiss-blue rounded-2xl shadow-lg shadow-swiss-blue/20 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                    {i === 0 ? <Users size={24}/> : i === 1 ? <FileCheck size={24}/> : <ShieldCheck size={24}/>}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{feat.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Dashboard Preview */}
                <div className="border border-white/10 rounded-3xl p-2 bg-white/5 shadow-2xl">
                    <div className="bg-slate-900 rounded-2xl overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-tr from-swiss-blue/10 to-transparent pointer-events-none"></div>
                         <div className="p-10 grid md:grid-cols-2 gap-10 items-center">
                             <div>
                                 <h3 className="text-3xl font-bold mb-4">Treasury Management</h3>
                                 <ul className="space-y-4 text-slate-300">
                                     <li className="flex items-center gap-3"><Check size={16} className="text-green-400"/> Consolidated View (Fiat + Crypto)</li>
                                     <li className="flex items-center gap-3"><Check size={16} className="text-green-400"/> Roles & Permissions (Admin, Accountant)</li>
                                     <li className="flex items-center gap-3"><Check size={16} className="text-green-400"/> Automated Invoicing</li>
                                 </ul>
                             </div>
                             <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 font-mono text-sm">
                                 <div className="flex justify-between mb-4 text-slate-400 pb-2 border-b border-slate-700">
                                     <span>Transaction ID</span>
                                     <span>Amount</span>
                                     <span>Status</span>
                                 </div>
                                 <div className="flex justify-between mb-2 text-white">
                                     <span>0x89...a24</span>
                                     <span className="text-green-400">+ 45,000 USDC</span>
                                     <span className="bg-green-900/30 text-green-400 px-2 rounded">Completed</span>
                                 </div>
                                 <div className="flex justify-between mb-2 text-white">
                                     <span>SEPA-CH82...</span>
                                     <span className="text-red-400">- 12,450 CHF</span>
                                     <span className="bg-blue-900/30 text-blue-400 px-2 rounded">Payroll</span>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CardsPage = ({ lang, onStart }: { lang: Lang, onStart: () => void }) => {
  const t = CONTENT[lang];
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swiss-blue/5 text-swiss-blue text-xs font-bold uppercase mb-6 tracking-widest">
                <Star size={12} /> {t.cards.limited}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                {t.cards.title}
            </h1>
            <p className="text-xl text-slate-500 mb-12">
                {t.cards.subtitle}
            </p>
        </div>
        <div className="mb-20"><AuraCard3D /></div>
        <div className="grid md:grid-cols-2 gap-8 mb-24">
            <RevealOnScroll>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 h-full flex flex-col items-center text-center justify-center relative overflow-hidden">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Simple Pricing</h3>
                    <div className="text-6xl font-extrabold text-slate-900 mb-2">{t.cards.price}<span className="text-lg font-medium text-slate-400">{t.cards.month}</span></div>
                    <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg text-slate-600 font-bold text-sm mb-8">{t.cards.delivery}</div>
                    <p className="text-slate-500 mb-8 max-w-sm">{t.cards.desc}</p>
                    <Button onClick={onStart}>{t.cards.cta}</Button>
                </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
                <div className="bg-swiss-navy p-10 rounded-[2.5rem] shadow-xl border border-slate-800 h-full flex flex-col text-white relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                         <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Smartphone className="text-white" /></div>
                         <h3 className="text-2xl font-bold">{t.cards.virtualTitle}</h3>
                    </div>
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">{t.cards.virtualDesc}</p>
                    <div className="mt-auto space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                             <div className="font-bold">Apple Pay</div>
                             <div className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                             <div className="font-bold">Google Pay</div>
                             <div className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <RevealOnScroll delay={200}>
                <div className="bg-slate-100 p-10 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-swiss-blue group-hover:scale-110 transition-transform"><Store size={28} /></div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.cards.feat1}</h3>
                    <p className="text-slate-600 leading-relaxed">{t.cards.feat1Desc}</p>
                </div>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
                <div className="bg-gradient-to-br from-swiss-red to-red-700 p-10 rounded-[2.5rem] text-white shadow-lg hover:shadow-red-500/30 transition-all duration-300 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform"><Coins size={28} /></div>
                    <h3 className="text-2xl font-bold mb-4">{t.cards.feat2}</h3>
                    <p className="text-red-100 leading-relaxed">{t.cards.feat2Desc}</p>
                </div>
            </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ lang, onStart, onNavigate }: { lang: Lang, onStart: () => void, onNavigate: (p: string) => void }) => {
  const t = CONTENT[lang];
  return (
  <div className="overflow-hidden">
    <section className="relative pt-32 pb-20 overflow-hidden bg-swiss-ice">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
         <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow"></div>
         <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-float-delayed"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-bold uppercase tracking-widest mb-8">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             {t.hero.badge}
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-slate-900 leading-[1.1] mb-8">
            {t.hero.title1}<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-swiss-blue via-swiss-accent to-swiss-blue animate-shimmer bg-[length:200%_auto]">{t.hero.title2}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
             {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-20">
            <Button variant="swiss" className="text-lg h-16 px-12 shadow-glow" onClick={onStart}>{t.hero.ctaPrimary}</Button>
            <Button variant="white" className="text-lg h-16 px-10" onClick={onStart}>{t.hero.ctaSecondary}</Button>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={200}><Hero3D /></RevealOnScroll>
      </div>
    </section>

    <section className="py-10 border-y border-slate-200 bg-white overflow-hidden">
       <div className="relative flex overflow-x-hidden group">
         <div className="animate-marquee whitespace-nowrap flex items-center gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {["UBS", "Credit Suisse", "Raiffeisen", "PostFinance", "Revolut", "Neon", "Yuh", "Metamask", "Ledger", "Trezor", "Binance", "Coinbase"].map((partner, i) => (
             <span key={i} className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div> {partner}
             </span>
           ))}
           {["UBS", "Credit Suisse", "Raiffeisen", "PostFinance", "Revolut", "Neon", "Yuh", "Metamask", "Ledger", "Trezor", "Binance", "Coinbase"].map((partner, i) => (
             <span key={`dup-${i}`} className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div> {partner}
             </span>
           ))}
         </div>
       </div>
    </section>

    <section className="py-32 max-w-7xl mx-auto px-6">
       <div className="mb-24 text-center">
           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{t.features.title}</h2>
           <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t.features.subtitle}</p>
       </div>
       <div className="grid md:grid-cols-3 gap-8">
           <RevealOnScroll delay={0}>
               <div className="bg-white p-10 rounded-[2.5rem] shadow-soft border border-slate-100 h-full hover:-translate-y-2 transition-transform duration-300 group">
                   <div className="w-16 h-16 bg-blue-50 text-swiss-blue rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                       <Repeat size={32} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.features.f1.title}</h3>
                   <p className="text-slate-500 leading-relaxed">{t.features.f1.desc}</p>
               </div>
           </RevealOnScroll>
           <RevealOnScroll delay={100}>
               <div className="bg-swiss-navy p-10 rounded-[2.5rem] shadow-2xl text-white h-full hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-swiss-blue opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity"></div>
                   <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform"><Link size={32} /></div>
                   <h3 className="text-2xl font-bold text-white mb-4">{t.features.f2.title}</h3>
                   <p className="text-slate-300 leading-relaxed">{t.features.f2.desc}</p>
               </div>
           </RevealOnScroll>
           <RevealOnScroll delay={200}>
               <div className="bg-white p-10 rounded-[2.5rem] shadow-soft border border-slate-100 h-full hover:-translate-y-2 transition-transform duration-300 group">
                   <div className="w-16 h-16 bg-red-50 text-swiss-red rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><BrainCircuit size={32} /></div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.features.f3.title}</h3>
                   <p className="text-slate-500 leading-relaxed">{t.features.f3.desc}</p>
               </div>
           </RevealOnScroll>
       </div>
    </section>

    <section className="py-24 bg-swiss-navy text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-swiss-blue/20 rounded-full filter blur-[120px] animate-float-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-swiss-accent/10 rounded-full filter blur-[120px] animate-float-delayed"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Pourquoi Aura ?</h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               {lang === 'fr' ? "La finance traditionnelle est lente. La crypto est compliquée. Nous avons résolu les deux." : "TradFi is slow. Crypto is complex. We fixed both."}
             </p>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-12">
           <RevealOnScroll delay={100}>
             <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10"><ShieldCheck size={40} className="text-swiss-blue" /></div>
                <h3 className="text-2xl font-bold mb-4">{lang === 'fr' ? "Sécurité Suisse" : "Swiss Security"}</h3>
                <p className="text-slate-400 leading-relaxed">
                   {lang === 'fr' ? "Vos fonds Fiat sont protégés par les plus hauts standards bancaires. Régulé et conforme." : "Fiat funds protected by highest banking standards. Regulated and compliant."}
                </p>
             </div>
           </RevealOnScroll>
           <RevealOnScroll delay={200}>
             <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10"><Globe size={40} className="text-swiss-accent" /></div>
                <h3 className="text-2xl font-bold mb-4">100% Non-Custodial</h3>
                <p className="text-slate-400 leading-relaxed">
                   "Not your keys, not your coins." {lang === 'fr' ? "Aura ne détient jamais vos clés privées." : "Aura never holds your private keys."}
                </p>
             </div>
           </RevealOnScroll>
           <RevealOnScroll delay={300}>
             <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10"><TrendingUp size={40} className="text-green-400" /></div>
                <h3 className="text-2xl font-bold mb-4">Yield Natif</h3>
                <p className="text-slate-400 leading-relaxed">
                   {lang === 'fr' ? "Notre IA déplace intelligemment vos liquidités vers des protocoles de rendement." : "Our AI intelligently moves idle cash to secure yield protocols."}
                </p>
             </div>
           </RevealOnScroll>
        </div>
      </div>
    </section>

    <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-swiss-navy rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Title Section */}
            <div className="text-center mb-12 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{lang === 'fr' ? "Votre patrimoine unifié." : "Your unified wealth."}</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    {lang === 'fr' 
                     ? "Le pont ultime entre vos actifs bancaires et vos portefeuilles Web3. Visualisez. Gérez. Prospérez."
                     : "The ultimate bridge between your bank assets and Web3 wallets. Visualize. Manage. Prosper."}
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 relative z-10">
                {/* Market Ticker - Large */}
                <div className="md:col-span-2 bg-slate-900/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-md flex flex-col h-full shadow-lg group hover:border-swiss-blue/50 transition-all">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                         <div className="flex items-center gap-2">
                             <Activity size={16} className="text-swiss-blue animate-pulse" />
                             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Market Feed</span>
                         </div>
                         <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between items-center text-white">
                            <span>CHF/EUR</span>
                            <span className="text-green-400 flex items-center gap-1">1.0450 <ArrowRight size={12} className="-rotate-45"/></span>
                        </div>
                         <div className="flex justify-between items-center text-white">
                            <span>BTC/CHF</span>
                            <span className="text-green-400 flex items-center gap-1">58,240.00 <ArrowRight size={12} className="-rotate-45"/></span>
                        </div>
                         <div className="flex justify-between items-center text-white">
                            <span>ETH/CHF</span>
                            <span className="text-red-400 flex items-center gap-1">2,410.50 <ArrowRight size={12} className="rotate-45"/></span>
                        </div>
                        <div className="flex justify-between items-center text-white">
                            <span>CHFM (Stable)</span>
                            <span className="text-slate-300">1.0000 CHF</span>
                        </div>
                    </div>
                </div>

                {/* Infrastructure Stats - Small */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:border-swiss-accent/50 transition-all flex flex-col justify-center">
                     <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-swiss-accent"><Database size={20} /></div>
                     <div className="text-3xl font-bold text-white mb-1 font-mono">2.4s</div>
                     <div className="text-xs text-slate-400 uppercase font-bold">{lang === 'fr' ? "Vitesse Règlement" : "Settlement Speed"}</div>
                </div>

                {/* Security - Small */}
                 <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:border-green-500/50 transition-all flex flex-col justify-center">
                     <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-green-500"><LockKeyhole size={20} /></div>
                     <div className="text-3xl font-bold text-white mb-1">100%</div>
                     <div className="text-xs text-slate-400 uppercase font-bold">{lang === 'fr' ? "Sécurité Suisse" : "Swiss Safety"}</div>
                </div>

                {/* Network Map - Wide */}
                 <div className="md:col-span-4 bg-slate-900/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between gap-8 shadow-lg">
                     <div className="flex items-center gap-4">
                         <div className="p-3 bg-swiss-blue/20 rounded-full text-swiss-blue border border-swiss-blue/30">
                             <Signal size={24} />
                         </div>
                         <div>
                             <div className="text-white font-bold text-lg">AuraNet Mainnet</div>
                             <div className="text-slate-400 text-sm">{lang === 'fr' ? "Noeuds actifs à Zurich, Genève, et Zug." : "Active nodes in Zurich, Geneva, and Zug."}</div>
                         </div>
                     </div>
                     <div className="hidden md:block h-8 w-px bg-slate-700"></div>
                     <div className="hidden md:flex gap-8">
                         <div>
                             <div className="text-slate-500 text-xs font-bold uppercase">Uptime</div>
                             <div className="text-green-400 font-mono font-bold">99.99%</div>
                         </div>
                         <div>
                             <div className="text-slate-500 text-xs font-bold uppercase">Volume 24h</div>
                             <div className="text-white font-mono font-bold">CHF 12.4M</div>
                         </div>
                     </div>
                </div>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 flex justify-center">
                 <Button variant="white" onClick={onStart} className="shadow-xl hover:shadow-swiss-blue/20">{t.hero.ctaPrimary}</Button>
            </div>

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
             <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-swiss-blue opacity-20 rounded-full blur-[120px] pointer-events-none"></div>
             <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    </section>
  </div>
  );
};

const PricingPage = ({ lang, onStart }: { lang: Lang, onStart: () => void }) => {
  const t = CONTENT[lang];
  useEffect(() => window.scrollTo(0,0), []);

  const features = [
      { name: t.pricing.features.f1, p: true, b: true, e: true },
      { name: t.pricing.features.f2, p: true, b: true, e: true },
      { name: t.pricing.features.f3, p: false, b: true, e: true },
      { name: t.pricing.features.f4, p: true, b: true, e: true },
      { name: t.pricing.features.f5, p: true, b: true, e: true },
      { name: t.pricing.features.f6, p: true, b: true, e: true },
      { name: t.pricing.features.f7, p: false, b: true, e: true },
      { name: t.pricing.features.f8, p: false, b: true, e: true },
      { name: t.pricing.features.f9, p: false, b: false, e: true },
      { name: t.pricing.features.f10, p: false, b: true, e: true },
  ];

  return (
  <div className="pt-32 pb-20 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swiss-blue/5 text-swiss-blue text-xs font-bold uppercase mb-6 tracking-widest"><Gem size={12} /> Transparency</div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">{t.pricing.title}</h1>
        <p className="text-xl text-slate-500">{t.pricing.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start mb-32">
        <RevealOnScroll>
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
             <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><CreditCard className="text-slate-900" /></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.pricing.personal}</h3>
            <div className="text-5xl font-extrabold text-slate-900 mb-6">{t.pricing.free}</div>
            <p className="text-slate-500 mb-10">{t.pricing.personalDesc}</p>
            <Button variant="outline" className="w-full" onClick={onStart}>{t.pricing.ctaStart}</Button>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={100}>
          <div className="bg-swiss-navy p-10 rounded-[2.5rem] shadow-2xl transition-all duration-300 relative transform md:-translate-y-6 flex flex-col h-full border border-slate-800 group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Briefcase className="text-white" /></div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.business}</h3>
            <div className="text-5xl font-extrabold text-white mb-6">{t.pricing.businessPrice}<span className="text-lg font-normal text-slate-400">/mo</span></div>
            <p className="text-slate-300 mb-10">{t.pricing.businessDesc}</p>
            <Button variant="primary" className="w-full bg-white text-swiss-navy hover:bg-slate-100" onClick={onStart}>{t.pricing.ctaTry}</Button>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
             <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Building2 className="text-slate-900" /></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.pricing.enterprise}</h3>
            <div className="text-5xl font-extrabold text-slate-900 mb-6">{t.pricing.enterprisePrice}</div>
            <p className="text-slate-500 mb-10">{t.pricing.enterpriseDesc}</p>
            <Button variant="outline" className="w-full">{t.pricing.ctaContact}</Button>
          </div>
        </RevealOnScroll>
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">{t.pricing.compareTitle}</h2>
          <div className="overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] shadow-xl">
              <div className="grid grid-cols-4 p-6 bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-1">Feature</div>
                  <div className="col-span-1 text-center">{t.pricing.personal}</div>
                  <div className="col-span-1 text-center text-swiss-blue">{t.pricing.business}</div>
                  <div className="col-span-1 text-center">{t.pricing.enterprise}</div>
              </div>
              <div className="divide-y divide-slate-100">
                  {features.map((f, i) => (
                      <div key={i} className="grid grid-cols-4 p-6 hover:bg-slate-50 transition-colors items-center">
                          <div className="col-span-1 font-medium text-slate-900">{f.name}</div>
                          <div className="col-span-1 flex justify-center">
                              {f.p ? <CheckCircle2 className="text-green-500 h-5 w-5" /> : <div className="w-1 h-1 bg-slate-200 rounded-full"></div>}
                          </div>
                           <div className="col-span-1 flex justify-center bg-swiss-blue/5 -my-6 py-6">
                              {f.b ? <CheckCircle2 className="text-swiss-blue h-5 w-5" /> : <div className="w-1 h-1 bg-slate-200 rounded-full"></div>}
                          </div>
                           <div className="col-span-1 flex justify-center">
                              {f.e ? <CheckCircle2 className="text-slate-900 h-5 w-5" /> : <div className="w-1 h-1 bg-slate-200 rounded-full"></div>}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

    </div>
  </div>
  );
};

// --- UserIcon Helper for Personal Page ---
const UserIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

// --- Footer & Layout ---

export default function AuraLanding({ onEnterApp }: { onEnterApp: () => void }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = CONTENT[lang];

  const NavItem = ({ page, label, isNew = false }: { page: string, label: string, isNew?: boolean }) => (
    <button 
      onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }}
      className={`text-sm font-bold transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-100 focus:outline-none ${
        currentPage === page ? 'text-swiss-blue bg-blue-50' : 'text-slate-600'
      }`}
    >
      {label}
      {isNew && <span className="bg-red-100 text-swiss-red text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">NEW</span>}
    </button>
  );

  const FooterLink = ({ page, label }: { page: string, label: string }) => (
      <li>
          <button onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }} className="hover:text-white transition-colors text-left flex items-center gap-2 group">
              <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-swiss-blue transition-colors"></span>
              {label}
          </button>
      </li>
  );

  const handleDownloadRedirect = () => {
      setCurrentPage('download');
      window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen bg-swiss-ice font-sans selection:bg-swiss-blue selection:text-white overflow-x-hidden flex flex-col">
      <style>{styleSheet}</style>

      <nav className={`fixed w-full z-50 transition-all duration-500 px-4 md:px-8 py-4 ${isScrolled ? 'py-3' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto rounded-full px-6 py-3 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'glass-nav shadow-sm' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-swiss-navy rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <span className="font-bold text-xl tracking-tighter">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Aura</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            <NavItem page="home" label={t.nav.home} />
            <NavItem page="personal" label={t.nav.personal} />
            <NavItem page="business" label={t.nav.business} />
            <NavItem page="chfm" label={t.nav.stablecoin} isNew />
            <NavItem page="pricing" label={t.nav.pricing} />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('help')} className="hidden sm:block text-sm font-bold text-slate-900 hover:text-swiss-blue transition-colors">{t.nav.support}</button>
            <button onClick={handleDownloadRedirect} className="bg-swiss-navy text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-swiss-blue transition-all shadow-lg hover:shadow-swiss-blue/30 hover:-translate-y-0.5 transform flex items-center gap-2">
                <Download size={16} />
                {t.nav.download}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
             <motion.div key="home" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <HomePage lang={lang} onStart={handleDownloadRedirect} onNavigate={setCurrentPage} />
             </motion.div>
          )}
          {currentPage === 'personal' && (
             <motion.div key="personal" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <PersonalPage lang={lang} onStart={handleDownloadRedirect} />
             </motion.div>
          )}
           {currentPage === 'business' && (
             <motion.div key="business" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <BusinessPage lang={lang} onStart={handleDownloadRedirect} />
             </motion.div>
          )}
          {currentPage === 'chfm' && (
             <motion.div key="chfm" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <CHFMPage lang={lang} onStart={handleDownloadRedirect} />
             </motion.div>
          )}
          {currentPage === 'pricing' && (
             <motion.div key="pricing" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <PricingPage lang={lang} onStart={handleDownloadRedirect} />
             </motion.div>
          )}
          {currentPage === 'cards' && (
             <motion.div key="cards" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <CardsPage lang={lang} onStart={handleDownloadRedirect} />
             </motion.div>
          )}
          
          {/* New Dedicated Pages */}
          {currentPage === 'about' && (
             <motion.div key="about" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <AboutPage lang={lang} />
             </motion.div>
          )}
          {currentPage === 'careers' && (
             <motion.div key="careers" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <CareersPage lang={lang} />
             </motion.div>
          )}
          {currentPage === 'help' && (
             <motion.div key="help" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <HelpPage lang={lang} />
             </motion.div>
          )}
          {currentPage === 'status' && (
             <motion.div key="status" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <StatusPage lang={lang} />
             </motion.div>
          )}
          {currentPage === 'legal' && (
             <motion.div key="legal" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <LegalDocPage title={lang === 'fr' ? "Mentions Légales" : "Legal Notice"}>
                    <h3>1. Éditeur du Site</h3>
                    <p>Le site Aura est édité par Aura Technologies AG, société anonyme de droit suisse au capital de 100'000 CHF.</p>
                    <p>Siège social : Bahnhofstrasse 1, 8001 Zürich, Suisse.</p>
                    <p>UID : CHE-123.456.789</p>

                    <h3>2. Régulation</h3>
                    <p>Aura Technologies AG est affiliée à un Organisme d'Autorégulation (OAR) reconnu par la FINMA dans le cadre de la loi sur le blanchiment d'argent (LBA).</p>

                    <h3>3. Propriété Intellectuelle</h3>
                    <p>L'ensemble de ce site relève de la législation suisse et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
               </LegalDocPage>
             </motion.div>
          )}
          {currentPage === 'privacy' && (
             <motion.div key="privacy" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <LegalDocPage title={lang === 'fr' ? "Politique de Confidentialité" : "Privacy Policy"}>
                    <h3>1. Collection des Données</h3>
                    <p>Nous collectons uniquement les données strictement nécessaires à l'ouverture de compte (KYC) et au bon fonctionnement des services bancaires et blockchain.</p>

                    <h3>2. Non-Divulgation</h3>
                    <p>Aura Technologies AG s'engage à ne jamais vendre vos données personnelles à des tiers.</p>

                    <h3>3. Sécurité</h3>
                    <p>Vos données sont hébergées exclusivement en Suisse dans des centres de données certifiés Tier-IV.</p>
               </LegalDocPage>
             </motion.div>
          )}
          {/* Download App Page */}
          {currentPage === 'download' && (
             <motion.div key="download" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
               <DownloadAppPage lang={lang} />
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-white pt-20 pb-12 mt-auto relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-swiss-blue opacity-5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16 border-b border-slate-800 pb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-bold text-xl">A</div>
                  <span className="text-2xl font-bold">Aura</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  {lang === 'fr' 
                   ? "La première néo-banque suisse qui unifie réellement l'univers bancaire traditionnel et la finance décentralisée."
                   : "The first Swiss neo-bank that truly unifies traditional banking and decentralized finance."}
              </p>
              <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-swiss-blue transition-colors"><Twitter size={18} /></a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-swiss-blue transition-colors"><Linkedin size={18} /></a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-swiss-blue transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-swiss-blue transition-colors"><Facebook size={18} /></a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-swiss-blue transition-colors"><Youtube size={18} /></a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">{t.footer.cols.company}</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <FooterLink page="about" label={lang === 'fr' ? "À propos" : "About"} />
                <FooterLink page="careers" label={lang === 'fr' ? "Carrières" : "Careers"} />
                <FooterLink page="pricing" label={t.nav.pricing} />
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">{t.footer.cols.product}</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <FooterLink page="personal" label={t.nav.personal} />
                <FooterLink page="business" label={t.nav.business} />
                <FooterLink page="cards" label="Aura Metal Card" />
                <FooterLink page="chfm" label="CHFM Stablecoin" />
              </ul>
            </div>
            
            {/* Newsletter Column */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                 <h4 className="font-bold text-white mb-2">{t.footer.newsletterTitle}</h4>
                 <p className="text-slate-400 text-sm mb-4">{t.footer.newsletterDesc}</p>
                 <div className="flex gap-2 mb-4">
                     <input 
                        type="email" 
                        placeholder={t.footer.newsletterPlaceholder}
                        className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-swiss-blue focus:border-swiss-blue outline-none"
                     />
                     <button className="bg-swiss-blue hover:bg-blue-600 text-white rounded-lg px-3 transition-colors">
                         <ArrowRight size={18} />
                     </button>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-slate-500">
                     <Lock size={10} /> {t.footer.trust}
                 </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col md:flex-row items-center gap-6">
                 <p className="text-slate-500 text-sm font-medium">
                    &copy; 2025 Aura Technologies AG.
                 </p>
                 <div className="flex gap-6 text-sm text-slate-500">
                    <button onClick={() => setCurrentPage('legal')} className="hover:text-white transition-colors">{lang === 'fr' ? "Mentions Légales" : "Legal Notice"}</button>
                    <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">{lang === 'fr' ? "Confidentialité" : "Privacy Policy"}</button>
                    <button onClick={() => setCurrentPage('help')} className="hover:text-white transition-colors">{lang === 'fr' ? "Aide" : "Help"}</button>
                 </div>
             </div>

             <div className="flex items-center gap-4">
                 {/* Language Switcher */}
                 <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-full border border-slate-700">
                      <button 
                        onClick={() => setLang('fr')}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'fr' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                          FR
                      </button>
                      <button 
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                          EN
                      </button>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => setCurrentPage('status')}>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Systems Normal</span>
                  </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}