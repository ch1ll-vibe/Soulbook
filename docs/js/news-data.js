// News posts, newest first. Edited by hand once a week.
// Each post: date (YYYY-MM-DD), title, tags (list), body (HTML allowed: <p>, <ul>, <li>, <a>, <b>, <em>).
const NEWS = [
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
