// Hand-written tagline and "how they play" for heroes whose game data has no text of its own.
// Used only when Valve's data is empty; written from each hero's actual abilities.
const HERO_NOTES = {
  'Mina': {
    role: 'Bites, bleeds and flits away before you can answer',
    playstyle: 'Mina mixes gunfire and abilities to build up Love Bites, then lands a burst of bonus spirit damage. Use Sanguine Retreat to slip in and out untargetable, and save Nox Nostra for heroes: every bite on a hero permanently adds more silencing bats to the swarm.',
  },
  'Drifter': {
    role: 'Marks a victim, then appears behind them',
    playstyle: 'Drifter is a stalker. Tag a target with Stalker\'s Mark, re-activate it to blink behind them and finish with Rend up close. Eternal Night blinds nearby enemies to each other and counts them as isolated, turning a team fight into a series of one-on-ones you win.',
  },
  'Venator': {
    role: 'Traps, burns and executes with blessed stakes',
    playstyle: 'Venator controls the ground: arm Hex-Lined Snap Traps on chokepoints, burn groups with Consecrating Grenade, and blast enemies into walls with Gutshot for the stun. When a target is low, load Ira Domini and finish them with the blessed third stake.',
  },
  'Victor': {
    role: 'Cannot be killed, and hurts everyone nearby, himself included',
    playstyle: 'Victor wants to take damage: it charges his Pain Battery and feeds the rest of his kit. Walk into the fight, channel Aura of Suffering as long as you can, Jumpstart for regeneration and speed to chase, and don\'t fear dying. Shocking Reanimation brings you back with a stun.',
  },
  'Paige': {
    role: 'Shields her friends and writes the enemy\'s ending',
    playstyle: 'Paige is a support who still shapes fights: put Plot Armor on your carry before they engage, lock a chokepoint with Captivating Read, and send Bookwyrm through a lane. Rallying Charge crosses the whole city and gets stronger the further it travels, so cast it from far away to heal an ally in trouble.',
  },
  'The Doorman': {
    role: 'Rearranges the map, and everyone on it',
    playstyle: 'The Doorman wins through positioning. Doorway gives your team a shortcut in or an escape out, Luggage Cart drags an enemy into your team (or pulls an ally to safety), and Call Bell blinds and slows. Hotel Guest removes a key enemy from the fight for a few seconds: use it on their biggest threat.',
  },
  'Billy': {
    role: 'Chains the enemy up and drags them in',
    playstyle: 'Billy is a close-range brawler built around melee: Blasted keeps your ammo up and wrecks whoever you hit. Chain Gang stops enemies from escaping and then yanks them to you; follow with Bashdown to knock them up, or Rising Ram to carry a single target into the air with you.',
  },
  'Graves': {
    role: 'Collects the dead and puts them back to work',
    playstyle: 'Graves farms death: every kill nearby fills the Jar of Dead, and throwing it summons Deadheads to harass the enemy. Grasping Hands walls off an escape route and immobilises anyone who crosses it, while Essence Theft makes you stronger the longer you keep shooting the same target.',
  },
  'Apollo': {
    role: 'A duelist who punishes every swing',
    playstyle: 'Apollo is a fencer. Bait an attack into Riposte, then dash in and pin the target. Flawless Advance rewards timing: release in the perfect window for maximum damage, and use Disengaging Sigil to leap out. Itani Lo Sahn freezes a target in slow motion before a huge delayed hit, best on enemies under half health.',
  },
  'Deadman Danny': {
    role: 'Sells you a jetpack ride you won\'t survive',
    playstyle: 'Danny lives in the air: Chimera Mk1 lets you fly, and overheating turns into a diving explosion. Lay Strix Salvo missiles to mark enemies, then punish marked targets with charged shots. Close The Deal grabs an enemy and crashes them into the ground, and the higher you start, the harder it hits.',
  },
  'Rem': {
    role: 'A tiny helper who puts the enemy to sleep',
    playstyle: 'Rem keeps the team alive and out of trouble: Tag Along hops between allies for burst heals, and Lil Helpers collect boxes and support troopers while you stay with the team. Land Pillow Toss to refresh your cooldowns, and use Naptime through walls to slow, lock and finally put enemies to sleep.',
  },
  'Silver': {
    role: 'Fights dirty until the wolf takes over',
    playstyle: 'Silver is a brawler who turns into a monster: dealing damage builds bloodlust, and at full bloodlust Lycan Curse transforms you with more health and stacking fire rate. Entangling Bola stops an enemy from escaping, Slam Fire bursts them down, and Boot Kick keeps them off you.',
  },
  'Celeste': {
    role: 'Blinds the crowd, then brings the house down',
    playstyle: 'Celeste is a spirit caster who rewards sequencing: open with Light Eater so your follow-up hurts more and heals you, drop Radiant Daggers where the enemy will stand, and bounce Shining Wonder through a group. Dazzling Trick is both your shield and, when it breaks, a silence.',
  },
  'Rat King': {
    role: 'Scrappy, swarming and impossible to put down',
    playstyle: 'Rat King is a tanky front-liner: Royal Pestments gives a big barrier that deflects bullets, Rat Swarm shreds bullet resist so your gun and your team hit harder, and Scrap Grenade holds a doorway. Rule, Ratannia! turns a fight, so plant the banner where your team is standing.',
  },
  'Solomon': {
    role: 'Plays the fight like a chessboard',
    playstyle: 'Solomon controls space with pieces: set a Bishop where enemies must pass, send Rook Battery down a corridor for an immobilise, and promote an ally with Kingside Knight before they dive. Develop Queen finishes the game, executing heroes who are low enough for checkmate.',
  },
  'Violet': {
    role: 'Paints the battlefield and sketches her victims',
    playstyle: 'Violet is a mobile caster. Flow State leaves a trail that speeds your allies\' slides and slows enemies, Still Life locks onto one hero and stuns them if you keep them in view long enough, and Abstract Landscape hides your team in ink while punishing anyone who steps out.',
  },
  'Nurse Harrow': {
    role: 'Heals her patients and terrifies everyone else',
    playstyle: 'Nurse Harrow heals with her gun: Healing Needles loads syringes that heal allies on hit, and the leeches you throw at enemies restore them. Wretched Vapors gives an ally a rush of speed before a crash, so time it for the fight rather than after it. Lurking Terrors makes enemies who look at you flee in fear.',
  },
  'Baba': {
    role: 'Steals your spirit and turns you into a pigeon',
    playstyle: 'Baba is a cackling spirit caster: hit heroes with Threadsap to steal their Spirit and grow stronger, hop around on Granny Long Legs to kick and ground-pound, and throw Baba\'s Brew for a barrier, a silence or a burn. Feed The Birds hexes targets into pigeons, and the longer you channel, the longer they stay one.',
  },
};
