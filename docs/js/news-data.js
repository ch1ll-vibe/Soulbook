// News posts, newest first. Edited by hand once a week.
// Each post: date (YYYY-MM-DD), title, tags (list), body (HTML allowed: <p>, <ul>, <li>, <a>, <b>, <em>).
const NEWS = [
  {
    date: '2026-11-08',
    title: 'Week 2: Ranked Beta Season 2, a follow-up balance pass, and how the meta settled',
    tags: ['Ranked', 'Patch', 'Meta'],
    body: `
      <p>Two Valve posts this week, both on 5 November, plus a full week of data on the big 30 October patch. The game is now on client build <b>6860</b>.</p>

      <h4>Ranked Beta Season 2 has started</h4>
      <ul>
        <li>Season 1 is over. Everyone who played it gets a Hideout plaque of their highest rank. Season 2 runs until <b>11 March 2027</b>.</li>
        <li><b>Soft reset:</b> about one badge down on average, with a 1–2 subrank nudge based on last season's win rate. There is also a global redistribution of the rank curve, so some players will actually go <em>up</em>. Returning Ranked players don't recalibrate; new ones do.</li>
        <li><b>Shields:</b> Phantom, Ascendant and Eternus have no rank-loss protection any more. Everyone else drops from 5 to 3 shields at a full-rank boundary and from 2 to 1 between subranks.</li>
        <li><b>Points:</b> 350 per match instead of 300, and reaching a new badge from the last subrank costs 1,500 instead of 2,000.</li>
        <li><b>Four hero bans</b> per match instead of three. Placements can go as high as Ascendant I–III.</li>
        <li><b>Hero unlocking</b> now uses points: 35 to unlock, 2 per win, 1 per loss. That's noticeably quicker than the old 15-win rule.</li>
        <li>Leaderboards are per season and need 50 Ranked matches in the last 30 days (15 for a hero leaderboard).</li>
      </ul>

      <h4>Minor Update, 4 November</h4>
      <p>A follow-up balance pass aimed at the heroes that came out of the Halloween patch too strong. Baba, Celeste and Deadman Danny were trimmed; Nurse Harrow, Rat King, Mo &amp; Krill and Apollo got small buffs back; Healbane stacks fall off harder. Every change with a verdict is on the <a href="balance.html?patch=2026-11-05">Balance</a> page.</p>

      <h4>The meta, one week after the big patch</h4>
      <ul>
        <li><b>Graves</b> shrugged off his nerf: still the highest win rate at 57.2% and picked in 42.7% of matches. Expect him to be a ban priority now that Ranked has four bans.</li>
        <li><b>Rat King</b> dropped from 56.0% to 54.3% win rate but is the most picked hero of the week (43.3%), which is why Valve already handed back a little bullet damage and ammo.</li>
        <li><b>Nurse Harrow</b> fell from the top group to 49.9%: the 30 October nerfs landed hard, hence this week's partial buff. <b>Violet</b> sits at 46.7%.</li>
        <li><b>Paige</b> (56.5%), <b>Kelvin</b> (55.5%) and <b>Seven</b> (55.5%) moved up into the top group, and <b>Baba</b> climbed to 55.1%, which explains her follow-up nerf.</li>
        <li><b>Mirage</b> has the lowest win rate in the game at 43.7% after the Traveler rework, with Pocket, Mina and Sinclair just above him.</li>
        <li>Most picked overall: Haze 45.2%, Drifter 44.6%, Venator 43.5%. Over 1.2 million matches were played this week.</li>
      </ul>
      <p>The live <a href="index.html">tier list</a> updates every time you open it, so these numbers will keep moving.</p>`,
  },
  {
    date: '2026-10-31',
    title: 'Patch 30 October: Halloween, a tougher Mid-Boss and easier comebacks',
    tags: ['Patch', 'Event'],
    body: `
      <p>Valve shipped the <b>Halloween 2026 + Gameplay Update</b> on 30 October. The event runs until <b>2 November</b>: the Hideout is decorated, heroes wear masks, and <b>Halloween Cauldrons</b> around the map drop Candy when you heavy-melee them. Eating the candy gives a temporary Sugar Rush buff. Underneath the costumes are some big changes to how a match plays out:</p>

      <h4>Mid-Boss is a real fight now</h4>
      <ul>
        <li>Health and health-per-minute both up 20%, resistance reductions only half as effective against it, roar at 25% HP instead of 50%. Bounty cut from 3,000 to 1,500 souls.</li>
        <li>The Rejuvenator now drops as <b>three crystals</b> around the pit instead of one. Each breaks in one heavy melee, each gives one Rejuvenator and a full heal, and the breaker gets a 500-soul bounty. Expect fights over the crystals, not just the kill.</li>
        <li>The arena is larger with more cover.</li>
      </ul>

      <h4>Comebacks are easier</h4>
      <ul>
        <li>Comeback souls from non-hero sources up from 26% to 30% when behind by about 20% net worth, and the bonus now also raises tick souls for the two poorest players.</li>
        <li>Haunted Souls secure 25% slower by default, but up to 50% faster the further behind you are.</li>
        <li>Healing Snacks heal 14% max HP (was 10%), Steam Vents give +150% stamina regen, tunnels are a bit slower (+50% speed, was +70%).</li>
        <li>The last six heroes are no longer "new": normal ranked unlock rules apply and <b>they can now be banned</b>.</li>
      </ul>

      <h4>Balance</h4>
      <p>The patch also carries a long list of hero and item changes: around 35 heroes and 40 items were touched, including nerfs to the four most dominant heroes of the week and reworks for Solomon, Mirage and Shadow Weave. Every change, with a verdict and what it means for your builds, is on the <a href="balance.html">Balance</a> page. The full official text is under the <a href="news.html#patches">Official patch notes</a> tab.</p>`,
  },
  {
    date: '2026-10-31',
    title: 'Soulbook is live',
    tags: ['Site'],
    body: `
      <p>Welcome to Soulbook, a field guide to Deadlock. Everything here runs on real match data from the community API, so the numbers move with every patch.</p>
      <ul>
        <li><b>Meta:</b> a hero tier list ranked from the last two weeks of matches, filterable by period and rank.</li>
        <li><b>Heroes:</b> all 44 heroes with abilities, upgrades, base stats and lore, class guides, and the three community builds most players actually picked, with the key items in each stage marked as recommended.</li>
        <li><b>Items:</b> the full shop sorted by cost and type, plus an item tier list.</li>
        <li><b>Workshop:</b> plan builds stage by stage, see what they give you, save them and share them as links.</li>
      </ul>
      <p>This page is updated weekly with patch notes summaries, meta shifts and site changes.</p>`,
  },
];
