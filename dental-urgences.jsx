import { useState } from "react";

const urgencyConfig = {
  critique: { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", badge: "#DC2626", label: "URGENCE CRITIQUE", dot: "#DC2626" },
  elevee: { color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", badge: "#EA580C", label: "URGENCE ÉLEVÉE", dot: "#EA580C" },
  moderee: { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", badge: "#D97706", label: "URGENCE MODÉRÉE", dot: "#D97706" },
  faible: { color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", badge: "#16A34A", label: "NON URGENT", dot: "#16A34A" },
};

const categories = [
  { id: "all", label: "Tout", icon: "⊞" },
  { id: "malaises", label: "Malaises", icon: "🫀" },
  { id: "douleurs", label: "Douleurs", icon: "🦷" },
  { id: "traumato", label: "Traumato", icon: "🦴" },
  { id: "infections", label: "Infections", icon: "🧫" },
  { id: "hemorragie", label: "Hémorragie", icon: "🩸" },
  { id: "terrain", label: "Terrain à risque", icon: "⚕️" },
  { id: "interactions", label: "Interactions médicaments", icon: "💊" },
  { id: "materiel", label: "Matériel d'urgence", icon: "🧰" },
  { id: "pharmacologie", label: "Médicaments", icon: "💉" },
  { id: "corpsEtranger", label: "Corps étranger", icon: "🫁" },
];

const fiches = [
  {
    id: 1,
    titre: "Syncope vasovagale",
    categorie: "malaises",
    urgence: "moderee",
    resume: "Perte de connaissance brève par hypotension orthostatique",
    signes: ["Pâleur, sueurs froides", "Bradycardie, hypotension", "Nausées, vision floue", "Perte de connaissance brève (< 1 min)"],
    conduite: [
      { etape: 1, action: "Allonger le patient, jambes surélevées (position de Trendelenburg)" },
      { etape: 2, action: "Desserrer col, ceinture — libérer les voies aériennes" },
      { etape: 3, action: "Surveillance FC, PA, SpO2 — O2 si disponible (6–8 L/min)" },
      { etape: 4, action: "Attendre retour à la conscience spontanée (< 3 min)" },
      { etape: 5, action: "Si persistance > 3 min ou convulsions → appel SAMU — 15 / 112" },
    ],
    medicaments: [],
    attention: "Ne jamais forcer à se relever. Si récidive ou durée prolongée, éliminer trouble du rythme.",
  },
  {
    id: 2,
    titre: "Malaise hypoglycémique",
    categorie: "malaises",
    urgence: "elevee",
    resume: "Glycémie < 0,60 g/L chez un patient diabétique",
    signes: ["Tremblements, sueurs", "Confusion, agitation", "Pâleur, tachycardie", "Perte de conscience si sévère"],
    conduite: [
      { etape: 1, action: "Patient conscient : sucre rapide per os (jus de fruit, sucre)" },
      { etape: 2, action: "Contrôle glycémique 15 min après" },
      { etape: 3, action: "Patient inconscient : arrêt de tout soin, position latérale de sécurité" },
      { etape: 4, action: "Glucagon 1 mg IM si disponible (kit urgence)" },
      { etape: 5, action: "Appel SAMU — 15 / 112 si inconscience ou absence d'amélioration" },
    ],
    medicaments: ["Glucagon 1 mg IM (kit urgence cabinet)", "Sucre rapide PO si conscient"],
    attention: "Ne jamais administrer de sucre à un patient inconscient (risque de fausse route).",
  },
  {
    id: 3,
    titre: "Crise d'asthme",
    categorie: "malaises",
    urgence: "elevee",
    resume: "Bronchospasme aigu — risque d'insuffisance respiratoire",
    signes: ["Dyspnée sifflante (wheezing)", "Position assise spontanée", "Tirage intercostal", "Cyanose si sévère"],
    conduite: [
      { etape: 1, action: "Asseoir le patient, position confortable, rassurer" },
      { etape: 2, action: "Bronchodilatateur : Salbutamol 2–4 bouffées (200–400 µg) en spray" },
      { etape: 3, action: "O2 : 6–8 L/min au masque" },
      { etape: 4, action: "Réévaluation à 15 min : si amélioration insuffisante → renouveler spray" },
      { etape: 5, action: "Si aggravation ou SpO2 < 92% → SAMU — 15 / 112 en urgence" },
    ],
    medicaments: ["Salbutamol 100 µg/dose spray (Ventoline®) — 2–4 bouffées"],
    attention: "Éviter tout anxiogène. Contre-indication des AINS et aspirine chez l'asthmatique.",
  },
  {
    id: 4,
    titre: "Choc anaphylactique",
    categorie: "malaises",
    urgence: "critique",
    resume: "Réaction allergique IgE-médiée sévère — urgence vitale absolue",
    signes: ["Urticaire, prurit, angioœdème", "Bronchospasme, stridor", "Hypotension, tachycardie", "Perte de conscience"],
    conduite: [
      { etape: 1, action: "APPEL SAMU — 15 / 112 IMMÉDIAT" },
      { etape: 2, action: "Allonger jambes surélevées (sauf si détresse respiratoire → demi-assis)" },
      { etape: 3, action: "Adrénaline 0,3–0,5 mg IM face antérolatérale cuisse (stylo auto-injecteur)" },
      { etape: 4, action: "O2 : masque haute concentration 10–15 L/min" },
      { etape: 5, action: "Renouveler adrénaline toutes les 5–10 min si pas d'amélioration" },
      { etape: 6, action: "MCE si arrêt cardiorespiratoire" },
    ],
    medicaments: ["Adrénaline 0,3 mg IM (Anapen®/EpiPen®)", "Corticoïdes IV (relais hospitalier)"],
    attention: "L'adrénaline est le seul traitement de 1ère ligne. Les antihistaminiques ne traitent pas le choc anaphylactique.",
  },
  {
    id: 5,
    titre: "Crise d'angor / Douleur thoracique",
    categorie: "malaises",
    urgence: "critique",
    resume: "Douleur thoracique pouvant signer un syndrome coronarien aigu",
    signes: ["Douleur thoracique constrictive", "Irradiation bras gauche, mâchoire", "Sueurs, nausées, pâleur", "Anxiété intense"],
    conduite: [
      { etape: 1, action: "Arrêt immédiat de tout soin — appel SAMU — 15 / 112" },
      { etape: 2, action: "Asseoir le patient, rassurer, ne pas mobiliser" },
      { etape: 3, action: "Aspirine 160–325 mg à mâcher si non contre-indiqué" },
      { etape: 4, action: "Trinitrine sublinguale si angor connu et PA > 90 mmHg" },
      { etape: 5, action: "O2 si SpO2 < 94% — surveillance constante jusqu'à SAMU" },
      { etape: 6, action: "MCE si arrêt cardiaque" },
    ],
    medicaments: ["Aspirine 300 mg à mâcher", "Trinitrine 0,3–0,6 mg SL si angor connu"],
    attention: "Trinitrine contre-indiquée si PDE5 inhibiteurs pris < 48h (Viagra®, Cialis®).",
  },
  {
    id: 6,
    titre: "Pulpite aiguë",
    categorie: "douleurs",
    urgence: "moderee",
    resume: "Inflammation pulpaire irréversible — douleur spontanée intense",
    signes: ["Douleur spontanée, pulsatile, intense", "Exacerbation nocturne", "Sensibilité thermique prolongée au froid/chaud", "Test de vitalité positif"],
    conduite: [
      { etape: 1, action: "Anesthésie locale : carpule articaïne 4% + épinéphrine 1:100 000" },
      { etape: 2, action: "Pulpotomie d'urgence ou pulpectomie si possible" },
      { etape: 3, action: "Pansement sédatif (eugénol) si traitement complet impossible" },
      { etape: 4, action: "Prescription antalgique : ibuprofène 400 mg × 3/j ou paracétamol 1g × 4/j" },
      { etape: 5, action: "RDV sous 48–72h pour traitement endodontique" },
    ],
    medicaments: ["Ibuprofène 400 mg TID (si pas de CI)", "Paracétamol 1g QID", "Pansement eugénol"],
    attention: "Si anesthésie insuffisante : bloc mandibulaire ou intra-osseux. Éviter l'aspirine (risque hémorragique post-op).",
  },
  {
    id: 7,
    titre: "Abcès dentoalvéolaire aigu",
    categorie: "infections",
    urgence: "elevee",
    resume: "Collection purulente d'origine endodontique ou parodontale",
    signes: ["Tuméfaction fluctuante douloureuse", "Douleur à la percussion (±)", "Fièvre > 38°C possible", "Trismus si atteinte des espaces"],
    conduite: [
      { etape: 1, action: "Anesthésie locale (éviter injection en zone infectée — bloc à distance)" },
      { etape: 2, action: "Drainage chirurgical si collection fluctuante (incision + drainage)" },
      { etape: 3, action: "Traitement de la cause : ouverture de chambre / extraction" },
      { etape: 4, action: "Antibiotique si signes généraux : Amoxicilline 2g/j (7j) ou Spiramycine-Métronidazole" },
      { etape: 5, action: "Si cellulite cervico-faciale diffuse → hospitalisation urgente" },
    ],
    medicaments: ["Amoxicilline 1g × 2/j, 7j", "Spiramycine 3 MUI + Métronidazole 250 mg × 3/j (si allergie)", "Ibuprofène 400 mg TID"],
    attention: "La cellulite diffuse avec trismus ou dysphagie = urgence chirurgicale hospitalière. Ne jamais sous-estimer.",
  },
  {
    id: 8,
    titre: "Alvéolite sèche (ostéite alvéolaire)",
    categorie: "douleurs",
    urgence: "moderee",
    resume: "Défaut de cicatrisation post-extractionnel — J3 à J5",
    signes: ["Douleur intense irradiante à partir de J3", "Alvéole vide, grisâtre, malodorante", "Absence de caillot", "Adénopathies satellites"],
    conduite: [
      { etape: 1, action: "Rinçage doux au sérum physiologique (pas de curette agressive)" },
      { etape: 2, action: "Pansement alvéolaire : méchage à la Alvogyl® ou compresse imbibée d'eugénol" },
      { etape: 3, action: "Antalgiques : ibuprofène 400 mg × 3/j + paracétamol 1g × 4/j" },
      { etape: 4, action: "Bains de bouche à la chlorhexidine 0,12% × 2/j" },
      { etape: 5, action: "Renouvellement du pansement toutes les 48–72h jusqu'à cicatrisation" },
    ],
    medicaments: ["Alvogyl® (méchage)", "Ibuprofène 400 mg TID", "Paracétamol 1g QID", "Chlorhexidine 0,12% bains de bouche"],
    attention: "Antibiotiques non systématiques sauf signes infectieux. Éviter tabac et aspiration.",
  },
  {
    id: 9,
    titre: "Luxation / avulsion dentaire",
    categorie: "traumato",
    urgence: "elevee",
    resume: "Traumatisme avec déplacement ou expulsion totale de la dent",
    signes: ["Dent absente de son alvéole (avulsion)", "Dent déplacée (luxation)", "Saignement gingival", "Douleur à la palpation"],
    conduite: [
      { etape: 1, action: "AVULSION : récupérer la dent par la couronne (ne pas toucher la racine)" },
      { etape: 2, action: "Conserver dans lait, sérum physiologique, ou sous la langue du patient (adulte)" },
      { etape: 3, action: "Reimplanter dans les 30 min (pronostic optimal < 30 min extra-alvéolaire)" },
      { etape: 4, action: "Contention souple : fil + composite, 2 semaines" },
      { etape: 5, action: "Antibiotique : Amoxicilline 2g/j — 7j + mise à jour antitétanique" },
      { etape: 6, action: "Suivi endodontique à 2 semaines" },
    ],
    medicaments: ["Amoxicilline 1g × 2/j, 7j", "Ibuprofène 400 mg TID"],
    attention: "Ne jamais réimplanter une dent temporaire (risque de lésion du germe permanent). Dent sèche > 60 min = mauvais pronostic.",
  },
  {
    id: 10,
    titre: "Hémorragie post-extractionnelle",
    categorie: "hemorragie",
    urgence: "elevee",
    resume: "Saignement persistant > 30 min après extraction dentaire",
    signes: ["Saignement actif de l'alvéole", "Caillot instable ou absent", "Antécédents de troubles de coagulation", "Traitement anticoagulant/antiagrégant"],
    conduite: [
      { etape: 1, action: "Compression locale : compresse stérile mordre 20 min (1ère intention)" },
      { etape: 2, action: "Anesthésie locale avec vasoconstricteur pour hémostase temporaire" },
      { etape: 3, action: "Curetage + mise en place de matériau hémostatique résorbable (Surgicel®, Pangen®)" },
      { etape: 4, action: "Suture de l'alvéole (points de rapprochement)" },
      { etape: 5, action: "Si persiste malgré suture → bilan hémostase + consultation hématologue" },
      { etape: 6, action: "Si anticoagulant : contacter médecin traitant / urgences" },
    ],
    medicaments: ["Surgicel® ou Pangen® (hémostatique local)", "Acide tranexamique 500 mg (Exacyl®) si trouble coagulation", "Articaïne 4% + épinéphrine"],
    attention: "Interrogatoire pré-op systématique : AVK (INR), antiaggrégants, hémophilie. Ne jamais extraire sans bilan si doute.",
  },
  {
    id: 11,
    titre: "Crise hypertensive au fauteuil",
    categorie: "malaises",
    urgence: "elevee",
    resume: "PA ≥ 180/110 mmHg découverte ou décompensée au cabinet",
    signes: ["Céphalées intenses, nuchalgie", "Épistaxis", "Troubles visuels", "PA > 180/110 mmHg"],
    conduite: [
      { etape: 1, action: "Arrêt immédiat des soins — installer confortablement (demi-assis)" },
      { etape: 2, action: "Rassurer, ambiance calme — mesure PA aux 2 bras" },
      { etape: 3, action: "Si asymptomatique : repos 30 min, contrôle PA, orienter médecin traitant" },
      { etape: 4, action: "Si symptômes neurologiques ou thoraciques → SAMU — 15 / 112 urgence" },
      { etape: 5, action: "Ne pas reprendre les soins ce jour — reporter le RDV" },
    ],
    medicaments: [],
    attention: "Ne jamais administrer d'antihypertenseur sans avis médical au cabinet. Éviter épinéphrine > 0,04 mg par séance chez l'hypertendu.",
  },
  {
    id: 13,
    titre: "Crise de tétanie (spasmophilie)",
    categorie: "malaises",
    urgence: "moderee",
    resume: "Hyperventilation avec hypocapnie — contractions musculaires involontaires",
    signes: ["Fourmillements péribuccaux, doigts, orteils", "Contractures des mains (main d'accoucheur)", "Crampes, spasmes musculaires", "Anxiété, sensation d'étouffement", "Signe de Chvostek positif (contraction faciale à la percussion)"],
    conduite: [
      { etape: 1, action: "Arrêt des soins — installer le patient en position confortable, rassurer calmement" },
      { etape: 2, action: "Faire respirer dans un sac en papier (rebreathing) ou encourager la respiration lente et profonde" },
      { etape: 3, action: "Ambiance calme : réduire les stimuli (bruit, lumière, stress)" },
      { etape: 4, action: "Surveiller FC, SpO2 — la crise cède généralement en 10–15 min" },
      { etape: 5, action: "Si crise prolongée > 15 min ou signes atypiques → appel SAMU — 15 / 112" },
      { etape: 6, action: "En cas de récidive : bilan biologique (calcémie, magnésémie) et avis médical" },
    ],
    medicaments: [],
    attention: "Ne pas confondre avec une syncope ou une crise d'épilepsie. La conscience est conservée. Éviter l'hyperventilation iatrogène (anesthésie, stress pré-op). Prémédication anxiolytique à envisager pour les séances suivantes.",
  },
  {
    id: 12,
    titre: "Péricoronarite aiguë",
    categorie: "infections",
    urgence: "moderee",
    resume: "Inflammation du capuchon muqueux péricoronal (dent de sagesse)",
    signes: ["Douleur rétromolaire pulsatile", "Trismus modéré", "Tuméfaction jugale", "Écoulement purulent sous le capuchon"],
    conduite: [
      { etape: 1, action: "Irrigation sous le capuchon muqueux (sérum physiologique + chlorhexidine)" },
      { etape: 2, action: "Ablation du capuchon si possible (operculectomie)" },
      { etape: 3, action: "Antalgiques : ibuprofène 400 mg TID + paracétamol 1g QID" },
      { etape: 4, action: "Si fièvre / trismus sévère : Spiramycine-Métronidazole 5j" },
      { etape: 5, action: "Extraction de la dent causale après refroidissement si indiquée" },
    ],
    medicaments: ["Spiramycine 3 MUI + Métronidazole 250 mg × 3/j, 5j", "Ibuprofène 400 mg TID", "Chlorhexidine 0,12%"],
    attention: "Risque d'extension vers les espaces para-pharyngés. Surveiller trismus et dysphagie.",
  },
  {
    id: 14,
    titre: "Patient porteur de maladie cardiovasculaire grave",
    categorie: "terrain",
    urgence: "elevee",
    resume: "Adaptation des soins chez le patient cardiopathe (IDM récent, insuffisance cardiaque, valvulopathie, arythmie, stimulateur)",
    signes: [
      "Antécédent d'IDM < 6 mois", "Insuffisance cardiaque (dyspnée d'effort, orthopnée)",
      "Valve prothétique / endocardite à risque", "Arythmie sous traitement (FA, BAV)",
      "Porteur de pacemaker ou défibrillateur (DAI)"
    ],
    conduite: [
      { etape: 1, action: "Interrogatoire pré-op complet : pathologie, traitement en cours, cardiologue traitant" },
      { etape: 2, action: "Demander avis cardiologique avant tout acte invasif si doute sur stabilité" },
      { etape: 3, action: "Limiter épinéphrine : max 0,04 mg/séance (2 carpules articaïne 1:200 000) — proscrire cordonnet rétraction épinéphriné" },
      { etape: 4, action: "Valve à risque (prothèse, cardiopathie congénitale) : antibioprophylaxie — Amoxicilline 2g PO 1h avant l'acte" },
      { etape: 5, action: "Anticoagulants (AVK) : contrôle INR ≤ 72h avant extraction — ne pas arrêter si INR < 3,5" },
      { etape: 6, action: "Antiagrégants (aspirine, clopidogrel) : ne pas arrêter — hémostase locale renforcée" },
      { etape: 7, action: "Porteur de DAI : éviter bistouri électrique unipolaire — utiliser bipolaire ou laser" },
      { etape: 8, action: "Séances courtes (< 45 min), matinales, patient bien équilibré" },
    ],
    medicaments: [
      "Amoxicilline 2g PO 1h avant (prophylaxie endocardite)",
      "Clindamycine 600 mg PO 1h avant (si allergie pénicillines)",
      "Articaïne 4% + épinéphrine 1:200 000 (max 2 carpules)",
      "Surgicel® + suture (hémostase locale renforcée)",
    ],
    attention: "IDM < 6 mois : reporter tout acte électif. Ne jamais interrompre un traitement anticoagulant ou antiagrégant sans avis du cardiologue. En cas de doute, s'abstenir et contacter le médecin traitant.",
  },
  {
    id: 15,
    titre: "Patient sous bisphosphonates / anti-résorptifs (ostéoporose, oncologie)",
    categorie: "terrain",
    urgence: "elevee",
    resume: "Risque d'ostéonécrose des maxillaires (ONM) — prévention et prise en charge",
    signes: [
      "Traitement par bisphosphonates oraux (alendronate, risédronate) ou IV (zolédronate, pamidronate)",
      "Traitement par dénosumab (Prolia®, Xgeva®)",
      "Exposition osseuse > 8 semaines sans cicatrisation",
      "Douleur, tuméfaction, fistule, os nécrotique visible",
      "Contexte oncologique (risque × 10 vs ostéoporose)",
    ],
    conduite: [
      { etape: 1, action: "Bilan bucco-dentaire COMPLET avant instauration du traitement (idéalement)" },
      { etape: 2, action: "Évaluer le risque : durée du traitement, voie d'administration, corticoïdes associés, diabète" },
      { etape: 3, action: "Bisphosphonates oraux < 4 ans, pas de corticoïdes : extraction possible avec précautions" },
      { etape: 4, action: "Bisphosphonates IV ou oraux > 4 ans : avis spécialisé (stomatologue/CCMFCO) avant extraction" },
      { etape: 5, action: "Si extraction nécessaire : alvéoloplastie soigneuse, suture hermétique, pas de lambeau agressif" },
      { etape: 6, action: "Antibioprophylaxie péri-opératoire : Amoxicilline 2g/j 3j avant + 7j après" },
      { etape: 7, action: "Bains de bouche chlorhexidine 0,12% × 2/j dès J-3 jusqu'à cicatrisation" },
      { etape: 8, action: "Si ONM constituée : débridement chirurgical conservateur + antibiothérapie prolongée + avis hospitalier" },
    ],
    medicaments: [
      "Amoxicilline 1g × 2/j, 10j (péri-opératoire)",
      "Clindamycine 300 mg × 3/j (si allergie pénicillines)",
      "Chlorhexidine 0,12% bains de bouche",
      "Paracétamol 1g QID (antalgique — éviter AINS)",
    ],
    attention: "Ne jamais réaliser d'extraction sans évaluation du risque d'ONM. Les AINS sont déconseillés (retard de cicatrisation). La drug holiday (arrêt transitoire) n'a pas prouvé son efficacité — ne pas décider seul. Traçabilité obligatoire dans le dossier patient.",
  },
  {
    id: 16,
    titre: "Interactions médicamenteuses — Adrénaline (épinéphrine)",
    categorie: "interactions",
    urgence: "elevee",
    resume: "Médicaments modifiant les effets cardiovasculaires de l'adrénaline en anesthésie locale dentaire",
    signes: [
      "Patient sous IMAO ou antidépresseurs tricycliques",
      "Patient sous bêtabloquants non sélectifs (propranolol)",
      "Patient sous IRSNa (venlafaxine, duloxétine)",
      "Patient sous anesthésiques halogénés (AG concomitant)",
      "Patient porteur d'un phéochromocytome",
    ],
    conduite: [
      { etape: 1, action: "IMAO en cours ou arrêtés depuis < 14 jours → CONTRE-INDICATION ABSOLUE — utiliser mépivacaïne 3% sans épinéphrine" },
      { etape: 2, action: "Antidépresseurs tricycliques (amitriptyline, imipramine, clomipramine) → articaïne 1:200 000 max 2 carpules, injection lente avec aspiration" },
      { etape: 3, action: "IRSNa (venlafaxine, duloxétine, milnacipran) → même précaution que les ATC — risque d'HTA paroxystique" },
      { etape: 4, action: "Bêtabloquants non sélectifs (propranolol) → limiter à 2 carpules 1:200 000 — risque de poussée HTA + bradycardie réflexe" },
      { etape: 5, action: "Bêtabloquants cardiosélectifs (aténolol, métoprolol, bisoprolol) → précaution standard, risque moindre" },
      { etape: 6, action: "Phéochromocytome → CONTRE-INDICATION ABSOLUE à toute épinéphrine" },
      { etape: 7, action: "HTA non équilibrée → reporter le soin — max 0,04 mg épinéphrine si HTA contrôlée" },
      { etape: 8, action: "Anesthésiques halogénés (halothane, sévoflurane) → risque de troubles du rythme ventriculaires graves — éviter l'association" },
    ],
    medicaments: [
      "Mépivacaïne 3% sans épinéphrine (Scandicaïne®) — alternative si CI absolue",
      "Articaïne 4% + épinéphrine 1:200 000 — solution de référence terrain à risque",
      "Articaïne 4% + épinéphrine 1:100 000 — usage standard (contre-indiqué si CI)",
      "Dose maximale sécurisée : 0,04 mg épinéphrine/séance = 2 carpules 1:200 000",
    ],
    attention: "L'effet des IMAO persiste jusqu'à 14 jours après l'arrêt — toujours interroger sur les traitements récents. Ne jamais injecter sans aspiration préalable. En cas de doute, contacter le médecin prescripteur avant l'acte.",
    tableau: [
      { medicament: "IMAO (phénelzine, sélégiline)", risque: "Crise hypertensive majeure", conduite: "CI absolue — mépivacaïne sans épinéphrine", niveau: "critique" },
      { medicament: "Phéochromocytome", risque: "Crise hypertensive catécholaminergique", conduite: "CI absolue — mépivacaïne sans épinéphrine", niveau: "critique" },
      { medicament: "Antidépresseurs tricycliques (amitriptyline, imipramine)", risque: "HTA paroxystique + arythmie", conduite: "Articaïne 1:200 000 max 2 carpules", niveau: "elevee" },
      { medicament: "IRSNa (venlafaxine, duloxétine)", risque: "HTA paroxystique", conduite: "Articaïne 1:200 000 max 2 carpules", niveau: "elevee" },
      { medicament: "Bêtabloquants non sélectifs (propranolol)", risque: "Poussée HTA + bradycardie réflexe", conduite: "Max 2 carpules 1:200 000 — avis médical", niveau: "elevee" },
      { medicament: "Bêtabloquants cardiosélectifs (aténolol, bisoprolol)", risque: "Risque faible", conduite: "Précaution standard — max 0,04 mg", niveau: "moderee" },
      { medicament: "Anesthésiques halogénés (halothane)", risque: "Troubles du rythme ventriculaires", conduite: "Éviter — discuter avec anesthésiste", niveau: "elevee" },
      { medicament: "Inhibiteurs PDE5 (sildénafil, tadalafil)", risque: "Collapsus si trinitrine associée", conduite: "CI trinitrine si < 48h — épinéphrine possible", niveau: "moderee" },
      { medicament: "HTA non équilibrée", risque: "Décompensation tensionnelle", conduite: "Reporter le soin — traiter d'abord", niveau: "elevee" },
    ],
  },
  {
    id: 17,
    titre: "Matériel d'urgence obligatoire au cabinet dentaire",
    categorie: "materiel",
    urgence: "critique",
    resume: "Liste réglementaire — Art. R4127-204 CSP & Code du travail R.232-1-6 — ONCD 2008",
    signes: [
      "Obligation légale : tout cabinet dentaire (art. R4127-204 CSP)",
      "Responsabilité du chirurgien-dentiste",
      "Carnet de suivi obligatoire (dates de péremption, vérifications)",
      "Contrôle et réapprovisionnement possible par l'assistant(e) dentaire",
    ],
    conduite: [
      { etape: 1, action: "Vérifier le matériel en début de semaine et après chaque utilisation" },
      { etape: 2, action: "Tenir à jour le carnet de suivi : dates de péremption, niveaux O2, état du DAE" },
      { etape: 3, action: "Remplacer tout médicament périmé immédiatement" },
      { etape: 4, action: "Former l'équipe aux gestes d'urgence (arrêté du 3 mars 2006 — formation obligatoire)" },
      { etape: 5, action: "Afficher les numéros d'urgence : 15 / 112 / 18 — visibles dans chaque salle de soin" },
      { etape: 6, action: "Tester le DAE mensuellement selon les recommandations fabricant" },
    ],
    medicaments: [],
    attention: "Il n'existe pas de liste réglementaire exhaustive imposée — mais la responsabilité du praticien est engagée en cas d'urgence sans matériel adapté. La formation aux gestes d'urgence est obligatoire (arrêté 3 mars 2006).",
    checklist: [
      {
        categorie: "🫁 Réanimation & Oxygène",
        items: [
          { label: "Bouteille O2 portable (min. 2L) avec débitmètre", obligatoire: false },
          { label: "Masques O2 adulte + enfant (haute concentration)", obligatoire: false },
          { label: "Ballon auto-gonflable (BAVU) adulte + enfant", obligatoire: true },
          { label: "Canules de Guedel (tailles 2, 3, 4)", obligatoire: true },
          { label: "Défibrillateur automatisé externe (DAE)", obligatoire: true },
          { label: "Aspiration buccale électrique ou manuelle", obligatoire: true },
        ],
      },
      {
        categorie: "💉 Médicaments d'urgence",
        items: [
          { label: "Adrénaline 0,3 mg stylo auto-injecteur (Anapen® / EpiPen®)", obligatoire: true },
          { label: "Glucagon 1 mg IM — kit hypoglycémie", obligatoire: true },
          { label: "Salbutamol spray 100 µg/dose (Ventoline®)", obligatoire: true },
          { label: "Trinitrine spray sublingual (Natispray®)", obligatoire: true },
          { label: "Aspirine 300 mg à mâcher", obligatoire: true },
          { label: "Corticoïde injectable IV/IM (méthylprednisolone)", obligatoire: true },
          { label: "Sucre rapide (sucres, jus de fruit)", obligatoire: true },
          { label: "Midazolam nasal 5 mg/ml (Buccolam®) — anticonvulsivant", obligatoire: false },
        ],
      },
      {
        categorie: "🩺 Surveillance & Monitoring",
        items: [
          { label: "Tensiomètre (automatique ou manuel + stéthoscope)", obligatoire: true },
          { label: "Oxymètre de pouls (saturomètre SpO2)", obligatoire: true },
          { label: "Glucomètre + bandelettes", obligatoire: true },
          { label: "Thermomètre", obligatoire: false },
        ],
      },
      {
        categorie: "🧰 Matériel de secours",
        items: [
          { label: "Seringues + aiguilles IM (pour glucagon, adrénaline)", obligatoire: true },
          { label: "Garrot hémostatique", obligatoire: true },
          { label: "Compresses stériles", obligatoire: true },
          { label: "Ouvre-bouche hélicoïdal", obligatoire: true },
          { label: "Couverture de survie", obligatoire: false },
          { label: "Gants non stériles", obligatoire: true },
        ],
      },
      {
        categorie: "📋 Documents & Affichage",
        items: [
          { label: "Numéros d'urgence affichés : SAMU 15 / Urgences 112 / Pompiers 18", obligatoire: true },
          { label: "Carnet de suivi du matériel (dates péremption)", obligatoire: true },
          { label: "Protocoles d'urgence affichés en salle de soin", obligatoire: true },
          { label: "Fiche d'aptitude formation aux urgences à jour", obligatoire: true },
        ],
      },
    ],
  },
  {
    id: 18,
    titre: "Médicaments d'urgence par situation clinique",
    categorie: "pharmacologie",
    urgence: "critique",
    resume: "Récapitulatif pharmacologique — médicament, indication, posologie, voie d'administration",
    signes: [
      "Référence rapide au fauteuil",
      "Classé par urgence décroissante",
      "Posologies adulte — adapter à l'enfant selon le poids",
    ],
    conduite: [
      { etape: 1, action: "Identifier l'urgence clinique, puis consulter le médicament correspondant ci-dessous" },
      { etape: 2, action: "Vérifier date de péremption avant administration" },
      { etape: 3, action: "Appeler le 15 / 112 en parallèle de tout traitement d'urgence critique" },
    ],
    medicaments: [],
    attention: "Ces posologies sont indicatives pour l'adulte. Toujours vérifier les contre-indications individuelles. Les médicaments injectables (glucagon, adrénaline) nécessitent une formation préalable.",
    medicamentsList: [
      {
        urgence: "critique",
        label: "URGENCES CRITIQUES",
        items: [
          {
            medicament: "Adrénaline (Anapen® / EpiPen®)",
            indication: "Choc anaphylactique",
            posologie: "0,3–0,5 mg",
            voie: "IM cuisse",
            delai: "Immédiat",
            note: "Renouveler toutes les 5–10 min si nécessaire",
          },
          {
            medicament: "Aspirine",
            indication: "Syndrome coronarien aigu (IDM)",
            posologie: "160–300 mg",
            voie: "À mâcher PO",
            delai: "Immédiat",
            note: "CI : allergie ASA, ulcère actif",
          },
          {
            medicament: "Trinitrine (Natispray®)",
            indication: "Angor / douleur thoracique",
            posologie: "0,3–0,6 mg",
            voie: "Sublinguale",
            delai: "Immédiat",
            note: "CI : PDE5 < 48h, PA < 90 mmHg",
          },
        ],
      },
      {
        urgence: "elevee",
        label: "URGENCES ÉLEVÉES",
        items: [
          {
            medicament: "Glucagon (GlucaGen®)",
            indication: "Hypoglycémie sévère / inconscience",
            posologie: "1 mg",
            voie: "IM ou SC",
            delai: "< 5 min",
            note: "Si patient inconscient — ne pas donner de sucre PO",
          },
          {
            medicament: "Salbutamol (Ventoline® spray)",
            indication: "Crise d'asthme",
            posologie: "2–4 bouffées (200–400 µg)",
            voie: "Inhalée",
            delai: "Immédiat",
            note: "Renouveler à 15 min si insuffisant",
          },
          {
            medicament: "Méthylprednisolone (Solumédrol®)",
            indication: "Anaphylaxie / choc allergique (relais)",
            posologie: "40–120 mg",
            voie: "IV ou IM",
            delai: "Après adrénaline",
            note: "Ne remplace pas l'adrénaline en 1ère intention",
          },
          {
            medicament: "Sucre rapide (jus de fruit, sucre)",
            indication: "Hypoglycémie — patient conscient",
            posologie: "15–20 g glucides",
            voie: "PO",
            delai: "Immédiat",
            note: "Contrôle glycémie à 15 min",
          },
        ],
      },
      {
        urgence: "moderee",
        label: "URGENCES MODÉRÉES",
        items: [
          {
            medicament: "Ibuprofène",
            indication: "Douleur dentaire / pulpite / alvéolite",
            posologie: "400 mg × 3/j",
            voie: "PO",
            delai: "30–60 min",
            note: "CI : asthme, grossesse T3, insuffisance rénale",
          },
          {
            medicament: "Paracétamol",
            indication: "Douleur dentaire (alternative aux AINS)",
            posologie: "1 g × 4/j",
            voie: "PO",
            delai: "30–60 min",
            note: "CI : insuffisance hépatique sévère",
          },
          {
            medicament: "Amoxicilline",
            indication: "Abcès dentoalvéolaire / infection",
            posologie: "1 g × 2/j, 7j",
            voie: "PO",
            delai: "H+1",
            note: "CI : allergie pénicillines",
          },
          {
            medicament: "Spiramycine + Métronidazole (Rodogyl®)",
            indication: "Infection dentaire (allergie pénicillines)",
            posologie: "2 cp × 3/j, 5–7j",
            voie: "PO",
            delai: "H+1",
            note: "Alternative si allergie amoxicilline",
          },
          {
            medicament: "Amoxicilline 2g (prophylaxie)",
            indication: "Prophylaxie endocardite (cardiopathe à risque)",
            posologie: "2 g dose unique",
            voie: "PO 1h avant l'acte",
            delai: "–1h",
            note: "Clindamycine 600 mg si allergie pénicillines",
          },
          {
            medicament: "Chlorhexidine 0,12% (bain de bouche)",
            indication: "Alvéolite / péri-coronarite / post-op",
            posologie: "× 2/j",
            voie: "Bain de bouche",
            delai: "Dès J0",
            note: "Ne pas avaler — éviter chez enfant < 6 ans",
          },
          {
            medicament: "Acide tranexamique (Exacyl®)",
            indication: "Hémorragie post-extractionnelle (trouble coag.)",
            posologie: "500 mg",
            voie: "PO ou compresse locale",
            delai: "Immédiat",
            note: "CI : antécédent thromboembolique",
          },
          {
            medicament: "Mépivacaïne 3% sans épinéphrine (Scandicaïne®)",
            indication: "Anesthésie locale si CI à l'adrénaline",
            posologie: "Max 300 mg (6 carpules)",
            voie: "Infiltration locale",
            delai: "Immédiat",
            note: "Durée d'action plus courte — pas de vasoconstricteur",
          },
        ],
      },
    ],
  },
  {
    id: 19,
    titre: "Inhalation d'un corps étranger",
    categorie: "corpsEtranger",
    urgence: "critique",
    resume: "Corps étranger (instrument, dent, fragment) inhalé vers les voies aériennes inférieures — urgence vitale",
    signes: [
      "Toux soudaine, violente, incontrôlable",
      "Dyspnée, stridor, tirage",
      "Cyanose des lèvres ou des extrémités",
      "Aphasie, agitation, gestes vers la gorge",
      "Silence auscultatoire unilatéral (bronche souche)",
      "Disparition d'un instrument / fragment en bouche",
    ],
    conduite: [
      { etape: 1, action: "ÉVALUER : patient qui tousse efficacement ? → encourager la toux, ne pas intervenir" },
      { etape: 2, action: "OBSTRUCTION PARTIELLE (toux, phonation possible) : position assise penchée en avant, encourager à tousser fort" },
      { etape: 3, action: "OBSTRUCTION TOTALE adulte conscient : 5 tapes vigoureuses dans le dos (entre les omoplates, talon de la main)" },
      { etape: 4, action: "Si inefficace : manœuvre de Heimlich — 5 compressions abdominales sous-diaphragmatiques" },
      { etape: 5, action: "Alterner 5 tapes dos / 5 compressions abdominales jusqu'à expulsion ou perte de conscience" },
      { etape: 6, action: "Patient inconscient : allonger, appel SAMU 15 / 112, débuter MCE (les compressions thoraciques peuvent expulser le CE)" },
      { etape: 7, action: "Même si toux résolue : RADIO thoracique + bronchoscopie — corps étranger peut être passé en bronche souche sans signe immédiat" },
    ],
    medicaments: [],
    attention: "Ne jamais faire de balayage digital à l'aveugle (risque d'enfoncement). Femme enceinte / obèse : compressions thoraciques hautes à la place de Heimlich. Tout CE inhalé non retrouvé = hospitalisation en urgence pour bronchoscopie.",
  },
  {
    id: 20,
    titre: "Ingestion d'un corps étranger",
    categorie: "corpsEtranger",
    urgence: "moderee",
    resume: "Corps étranger (instrument, dent, fragment) dégluti vers l'œsophage ou l'estomac",
    signes: [
      "Sensation de corps étranger rétrosternal ou épigastrique",
      "Dysphagie, hypersalivation",
      "Nausées, vomissements",
      "Absence de détresse respiratoire (≠ inhalation)",
      "Patient conscient, phonation normale",
      "Disparition d'un instrument / fragment en bouche",
    ],
    conduite: [
      { etape: 1, action: "Confirmer l'ingestion : interroger le patient, inspecter la cavité buccale et le pharynx" },
      { etape: 2, action: "NE PAS faire vomir (risque de réinhalation ou de perforation œsophagienne)" },
      { etape: 3, action: "Radio thorax + abdomen FACE immédiate pour localiser le corps étranger (radio-opaque si métal)" },
      { etape: 4, action: "CE lisse et petit (< 2 cm) dans l'estomac : surveillance simple, transit naturel en 3–7j, contrôle radio à J3" },
      { etape: 5, action: "CE pointu ou > 2 cm (lime, fraise, brosse) : appel gastro-entérologue / urgences — endoscopie probable" },
      { etape: 6, action: "CE bloqué en œsophage (dysphagie persistante) : SAMU 15 / 112 — urgence endoscopique" },
      { etape: 7, action: "Informer le patient : surveiller douleurs abdominales, fièvre, sang dans les selles — consulter immédiatement si symptômes" },
    ],
    medicaments: [],
    attention: "Déclarer l'incident dans le dossier patient (responsabilité médico-légale). Un CE non visible à la radio ne signifie pas absence — les instruments en plastique ou en caoutchouc sont radiotransparents. Toujours demander une radio si doute.",
  },
];

export default function DentalUrgences() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedFiche, setSelectedFiche] = useState(null);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState({});

  const toggleCheck = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const filtered = fiches.filter((f) => {
    const catOk = selectedCat === "all" || f.categorie === selectedCat;
    const searchOk =
      search === "" ||
      f.titre.toLowerCase().includes(search.toLowerCase()) ||
      f.resume.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  const urg = selectedFiche ? urgencyConfig[selectedFiche.urgence] : null;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", background: "#F1F5F9", color: "#1E293B" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)", padding: "20px 24px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>🦷</span>
            <div>
              <div style={{ color: "white", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>Urgences & Protocoles Dentaires</div>
              <div style={{ color: "#93C5FD", fontSize: 12, fontWeight: 500 }}>Cabinet dentaire — Conduites à tenir</div>
            </div>
          </div>
          {/* Search */}
          <input
            placeholder="Rechercher une pathologie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", marginTop: 14, padding: "10px 16px", borderRadius: 10, border: "none", fontSize: 14, background: "rgba(255,255,255,0.15)", color: "white", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Categories */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", padding: "10px 0" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              style={{
                padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", whiteSpace: "nowrap",
                background: selectedCat === c.id ? "#1E40AF" : "#F1F5F9",
                color: selectedCat === c.id ? "white" : "#475569",
                fontWeight: selectedCat === c.id ? 700 : 500,
                fontSize: 13, transition: "all 0.15s",
              }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
        {selectedFiche ? (
          // Fiche détail
          <div>
            <button onClick={() => setSelectedFiche(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1E40AF", fontWeight: 600, fontSize: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              ← Retour à la liste
            </button>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              {/* Bandeau urgence */}
              <div style={{ background: urg.color, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "white", fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: 0.9 }}>{urg.label}</div>
                  <div style={{ color: "white", fontSize: 22, fontWeight: 800, marginTop: 4 }}>{selectedFiche.titre}</div>
                  <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4 }}>{selectedFiche.resume}</div>
                </div>
                <div style={{ fontSize: 40 }}>
                  {selectedFiche.categorie === "malaises" ? "🫀" : selectedFiche.categorie === "douleurs" ? "🦷" : selectedFiche.categorie === "traumato" ? "🦴" : selectedFiche.categorie === "infections" ? "🧫" : selectedFiche.categorie === "terrain" ? "⚕️" : selectedFiche.categorie === "interactions" ? "💊" : selectedFiche.categorie === "materiel" ? "🧰" : selectedFiche.categorie === "pharmacologie" ? "💉" : selectedFiche.categorie === "corpsEtranger" ? "🫁" : "🩸"}
                </div>
              </div>

              <div style={{ padding: 24 }}>
                {/* Signes cliniques */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Signes cliniques</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {selectedFiche.signes.map((s, i) => (
                      <div key={i} style={{ background: urg.bg, border: `1px solid ${urg.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#334155", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: urg.color, flexShrink: 0 }}></span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conduite à tenir */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Conduite à tenir</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedFiche.conduite.map((c) => (
                      <div key={c.etape} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: urg.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                          {c.etape}
                        </div>
                        <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "8px 14px", fontSize: 13.5, color: "#1E293B", flex: 1, lineHeight: 1.5 }}>
                          {c.action}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Médicaments */}
                {selectedFiche.medicaments.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Médicaments & Posologie</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {selectedFiche.medicaments.map((m, i) => (
                        <div key={i} style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#1E3A8A", fontFamily: "monospace", letterSpacing: 0.3 }}>
                          💊 {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Liste médicaments par urgence */}
                {selectedFiche.medicamentsList && (
                  <div style={{ marginBottom: 24 }}>
                    {selectedFiche.medicamentsList.map((groupe, gi) => {
                      const u = urgencyConfig[groupe.urgence];
                      return (
                        <div key={gi} style={{ marginBottom: 20 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: u.color }}></div>
                            <span style={{ fontSize: 12, fontWeight: 800, color: u.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{groupe.label}</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {groupe.items.map((item, ii) => (
                              <div key={ii} style={{ background: u.bg, border: `1px solid ${u.border}`, borderRadius: 10, padding: "12px 14px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1E293B" }}>{item.medicament}</div>
                                  <span style={{ background: u.color, color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 8 }}>{item.voie}</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#475569", marginBottom: 4 }}>
                                  <span style={{ fontWeight: 600 }}>Indication :</span> {item.indication}
                                </div>
                                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                                  <div style={{ fontSize: 12, color: "#1E293B", background: "white", padding: "3px 10px", borderRadius: 6, border: "1px solid #E2E8F0", fontFamily: "monospace", fontWeight: 600 }}>
                                    💊 {item.posologie}
                                  </div>
                                  <div style={{ fontSize: 12, color: "#64748B", padding: "3px 10px", background: "white", borderRadius: 6, border: "1px solid #E2E8F0" }}>
                                    ⏱ {item.delai}
                                  </div>
                                </div>
                                {item.note && (
                                  <div style={{ marginTop: 6, fontSize: 11.5, color: "#92400E", fontStyle: "italic" }}>⚠️ {item.note}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Checklist matériel */}
                {selectedFiche.checklist && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                      Checklist du matériel
                      <span style={{ marginLeft: 10, fontSize: 11, background: "#DCFCE7", color: "#166534", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>
                        {Object.values(checked).filter(Boolean).length} / {selectedFiche.checklist.reduce((a, c) => a + c.items.length, 0)} validés
                      </span>
                    </div>
                    {selectedFiche.checklist.map((groupe, gi) => (
                      <div key={gi} style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 8, padding: "6px 12px", background: "#F1F5F9", borderRadius: 8 }}>
                          {groupe.categorie}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {groupe.items.map((item, ii) => {
                            const key = `${gi}-${ii}`;
                            const isChecked = checked[key];
                            return (
                              <div
                                key={ii}
                                onClick={() => toggleCheck(key)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                                  background: isChecked ? "#F0FDF4" : "white",
                                  border: `1px solid ${isChecked ? "#BBF7D0" : "#E2E8F0"}`,
                                  borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                                }}
                              >
                                <div style={{
                                  width: 20, height: 20, borderRadius: 5, border: `2px solid ${isChecked ? "#16A34A" : "#CBD5E1"}`,
                                  background: isChecked ? "#16A34A" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s",
                                }}>
                                  {isChecked && <span style={{ color: "white", fontSize: 12, fontWeight: 800 }}>✓</span>}
                                </div>
                                <span style={{ fontSize: 13, color: isChecked ? "#166534" : "#334155", textDecoration: isChecked ? "line-through" : "none", flex: 1 }}>
                                  {item.label}
                                </span>
                                {item.obligatoire ? (
                                  <span style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", background: "#FEF2F2", padding: "1px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>OBLIGATOIRE</span>
                                ) : (
                                  <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B", background: "#F1F5F9", padding: "1px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>RECOMMANDÉ</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setChecked({})}
                      style={{ marginTop: 8, padding: "7px 16px", borderRadius: 8, border: "1px solid #E2E8F0", background: "white", cursor: "pointer", fontSize: 12, color: "#64748B", fontWeight: 600 }}
                    >
                      🔄 Réinitialiser la checklist
                    </button>
                  </div>
                )}

                {/* Tableau interactions médicamenteuses */}
                {selectedFiche.tableau && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Tableau récapitulatif des interactions</div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                        <thead>
                          <tr style={{ background: "#F1F5F9" }}>
                            <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#475569", borderBottom: "2px solid #E2E8F0" }}>Médicament / Situation</th>
                            <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#475569", borderBottom: "2px solid #E2E8F0" }}>Risque</th>
                            <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#475569", borderBottom: "2px solid #E2E8F0" }}>Conduite</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFiche.tableau.map((row, i) => {
                            const rowColor = row.niveau === "critique" ? "#FEF2F2" : row.niveau === "elevee" ? "#FFF7ED" : "#FFFBEB";
                            const dotColor = row.niveau === "critique" ? "#DC2626" : row.niveau === "elevee" ? "#EA580C" : "#D97706";
                            return (
                              <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                                <td style={{ padding: "10px 12px", color: "#1E293B", fontWeight: 600 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, flexShrink: 0 }}></span>
                                    {row.medicament}
                                  </div>
                                </td>
                                <td style={{ padding: "10px 12px", color: "#475569" }}>{row.risque}</td>
                                <td style={{ padding: "10px 12px" }}>
                                  <span style={{ background: rowColor, color: dotColor, borderRadius: 6, padding: "3px 8px", fontWeight: 600, fontSize: 12 }}>{row.conduite}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Attention */}
                <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18 }}>⚠️</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Point d'attention</div>
                      <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.6 }}>{selectedFiche.attention}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Liste
          <div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 14, fontWeight: 500 }}>
              {filtered.length} protocole{filtered.length > 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((f) => {
                const u = urgencyConfig[f.urgence];
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFiche(f)}
                    style={{
                      background: "white", borderRadius: 12, padding: "14px 18px",
                      border: `1.5px solid ${u.border}`, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 14,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "transform 0.1s, box-shadow 0.1s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
                  >
                    {/* Indicateur couleur */}
                    <div style={{ width: 5, height: 52, borderRadius: 3, background: u.color, flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ background: u.bg, color: u.color, border: `1px solid ${u.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                          {u.label}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1E293B" }}>{f.titre}</div>
                      <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>{f.resume}</div>
                    </div>
                    <div style={{ fontSize: 22 }}>
                      {f.categorie === "malaises" ? "🫀" : f.categorie === "douleurs" ? "🦷" : f.categorie === "traumato" ? "🦴" : f.categorie === "infections" ? "🧫" : f.categorie === "terrain" ? "⚕️" : f.categorie === "interactions" ? "💊" : f.categorie === "materiel" ? "🧰" : f.categorie === "pharmacologie" ? "💉" : f.categorie === "corpsEtranger" ? "🫁" : "🩸"}
                    </div>
                    <div style={{ color: "#CBD5E1", fontSize: 18 }}>›</div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>
                  <div style={{ fontSize: 40 }}>🔍</div>
                  <div style={{ marginTop: 10, fontWeight: 600 }}>Aucun protocole trouvé</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
