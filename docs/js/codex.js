// Shared code for every page: header/footer, data loading from the Deadlock API, helpers.
// Data source: https://deadlock-api.com (free community API, not affiliated with Valve).

const API = 'https://api.deadlock-api.com';
const CACHE_HOURS = 6;
const CACHE_VERSION = 11; // bump when the shape of cached data changes

const PAGES = [
  ['index.html', 'Meta'],
  ['heroes.html', 'Heroes'],
  ['items.html', 'Items'],
  ['builds.html', 'Builds'],
  ['news.html', 'News'],
  ['balance.html', 'Balance'],
  ['about.html', 'About'],
];

// ---------- Layout ----------
function renderLayout() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html">
          <span class="brand-mark"><span>S</span></span>
          <span><span class="brand-title">Soulbook</span><span class="brand-sub">Deadlock field guide</span></span>
        </a>
        <button class="nav-toggle" aria-label="Menu">Menu</button>
        <nav class="nav">
          ${PAGES.map(([href, name]) => `<a href="${href}" class="${href === here ? 'active' : ''}">${name}</a>`).join('')}
        </nav>
      </div>`;
    header.querySelector('.nav-toggle').onclick = () => header.querySelector('.nav').classList.toggle('open');
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="orn">&#9670; &#9670; &#9670;</div>
      <div class="by">Made by ch1ll_vibe</div>
      <p class="disclaimer"><b>Soulbook is an unofficial fan site.</b> It is not affiliated with, endorsed by or connected to Valve Corporation in any way.
      Deadlock, its heroes, items, images and text are the property of Valve. The site only collects and presents publicly available game data,
      provided by the community project <a href="https://deadlock-api.com" target="_blank" rel="noopener">deadlock-api.com</a>, and links to Valve's official announcements rather than reproducing them.</p>
      <p class="contact">Mistakes, ideas or removal requests: <a href="mailto:soulbook.guide@gmail.com">soulbook.guide@gmail.com</a></p>`;
  }
}

// ---------- Small helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// API descriptions contain HTML. Keep only text and highlight spans; drop images, svg and everything else.
function cleanHtml(html) {
  if (!html) return '';
  const tpl = document.createElement('template');
  tpl.innerHTML = String(html);
  const out = document.createElement('div');
  (function walk(src, dst) {
    for (const n of src.childNodes) {
      if (n.nodeType === 3) dst.appendChild(document.createTextNode(n.textContent));
      else if (n.nodeType === 1) {
        const tag = n.tagName.toLowerCase();
        if (['svg', 'img', 'script', 'style', 'iframe', 'object'].includes(tag)) continue;
        if (tag === 'br') { dst.appendChild(document.createElement('br')); continue; }
        const italic = tag === 'i' || tag === 'em' || n.classList.contains('italics');
        const span = document.createElement(italic ? 'em' : 'span');
        if (n.classList.contains('highlight') || n.classList.contains('inline-attribute-label')) span.className = 'hl';
        walk(n, span);
        dst.appendChild(span);
      }
    }
  })(tpl.content, out);
  // Collapse runs of line breaks (the data often has <br><br>) and strip template tokens like {s:Duration}.
  return out.innerHTML
    .replace(/\{[a-z]:[^}]*\}/gi, '')
    // Valve's text sometimes carries float noise like "+25.199999 Damage"; show it as 25.2.
    .replace(/(\d+\.\d{3,})/g, m => String(Math.round(parseFloat(m) * 100) / 100))
    .replace(/(\s*<br>\s*){2,}/g, '<br><br>')
    .replace(/^(<br>)+|(<br>)+$/g, '')
    .trim();
}

function fmtNum(n, digits = 0) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2200);
}

// ---------- Caching (best effort; works without storage too) ----------
function cacheGet(key) {
  try {
    const raw = localStorage.getItem(`codex:${CACHE_VERSION}:${key}`);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    if (Date.now() - t > CACHE_HOURS * 3600e3) return null;
    return v;
  } catch { return null; }
}
function cacheSet(key, v) {
  try { localStorage.setItem(`codex:${CACHE_VERSION}:${key}`, JSON.stringify({ t: Date.now(), v })); } catch { /* storage full or blocked */ }
}

async function getJSON(path) {
  const res = await fetch(API + path);
  if (!res.ok) throw new Error(`API returned ${res.status} for ${path}`);
  return res.json();
}

// ---------- Heroes ----------
function heroNote(name, field) {
  return (typeof HERO_NOTES !== 'undefined' && HERO_NOTES[name]?.[field]) || '';
}

async function loadHeroes() {
  const cached = cacheGet('heroes');
  if (cached) return cached;
  const raw = await getJSON('/v1/assets/heroes?only_active=true');
  const heroes = raw
    // Newly released heroes keep in_development=true for a while, so only the pick and disabled flags matter.
    .filter(h => h.player_selectable && !h.disabled)
    .map(h => ({
      id: h.id,
      name: h.name,
      // The game leaves heroes like Dynamo, Kelvin, Ivy, Paige, Rem and Nurse Harrow without a class; they are all support-style.
      type: h.hero_type || 'support',
      tags: h.tags || [],
      gun: h.gun_tag || '',
      complexity: h.complexity || 0,
      // These texts contain stray HTML such as <br><br>; keep only line breaks and highlights.
      // Where Valve's data has no role or playstyle, fall back to Soulbook's own notes (js/hero-notes.js).
      lore: cleanHtml(h.description?.lore || ''),
      role: cleanHtml(h.description?.role || '') || esc(heroNote(h.name, 'role')),
      playstyle: cleanHtml(h.description?.playstyle || '') || esc(heroNote(h.name, 'playstyle')),
      card: h.images?.icon_hero_card_webp || h.images?.icon_hero_card || '',
      small: h.images?.icon_image_small_webp || h.images?.icon_image_small || '',
      abilityKeys: ['signature1', 'signature2', 'signature3', 'signature4'].map(k => h.items?.[k]).filter(Boolean),
      stats: Object.fromEntries(Object.entries(h.starting_stats || {}).map(([k, v]) => [k, v?.value])),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  cacheSet('heroes', heroes);
  return heroes;
}

// ---------- Items ----------
const SLOT_ORDER = ['weapon', 'vitality', 'spirit'];

function innateStats(item) {
  // Stats the item always gives (the "innate" section of its tooltip).
  const keys = new Set();
  for (const sec of item.tooltip_sections || []) {
    if (sec.section_type !== 'innate') continue;
    for (const attr of sec.section_attributes || []) {
      for (const k of [...(attr.elevated_properties || []), ...(attr.properties || []), ...(attr.important_properties || [])]) keys.add(k);
    }
  }
  const out = [];
  for (const k of keys) {
    const p = item.properties?.[k];
    if (!p) continue;
    const v = parseFloat(p.value);
    if (!isFinite(v) || v === 0) continue;
    out.push({ key: k, label: p.label || k, value: v, postfix: p.postfix || '' });
  }
  return out;
}

// Every tooltip section of an item (innate, active, passive...) with all of its numbers.
function itemSections(item) {
  const out = [];
  for (const sec of item.tooltip_sections || []) {
    for (const attr of sec.section_attributes || []) {
      const important = attr.important_properties || [];
      const keys = [...new Set([...important, ...(attr.elevated_properties || []), ...(attr.properties || [])])];
      const props = [];
      for (const k of keys) {
        const p = item.properties?.[k];
        if (!p || !p.label) continue;
        const raw = String(p.value ?? '').trim();
        if (!raw || raw === '0' || raw === '0.0') continue;
        const num = parseFloat(raw);
        const sign = /sign/.test(p.prefix || '') && num > 0 && !raw.startsWith('+') ? '+' : '';
        // Values sometimes already carry their unit ("2.0m" with postfix " m"), so strip it before adding the postfix.
        const post = (p.postfix || '').trim();
        const base = post ? raw.replace(/[a-z]+$/i, '') : raw;
        props.push({ label: p.label, value: sign + base + post, important: important.includes(k) });
      }
      const text = cleanHtml(attr.loc_string || '');
      if (props.length || text) out.push({ type: sec.section_type || '', text, props });
    }
  }
  return out;
}

function activationLabel(item) {
  const a = String(item.activation || '');
  if (a.includes('toggle')) return 'Toggle';
  if (item.is_active_item || a.includes('cast') || a === 'press') return 'Active';
  return 'Passive';
}

async function loadItems() {
  const cached = cacheGet('items');
  if (cached) return cached;
  const raw = await getJSON('/v1/assets/items/by-type/upgrade');
  const items = raw
    .filter(i => i.shopable && SLOT_ORDER.includes(i.item_slot_type))
    .map(i => ({
      id: i.id,
      name: i.name,
      slot: i.item_slot_type,
      tier: i.item_tier,
      cost: i.cost || 0,
      active: !!i.is_active_item,
      kind: activationLabel(i),
      // 9,999-soul items only exist in special match types such as Street Brawl.
      modeOnly: i.cost === 9999,
      img: i.shop_image_webp || i.shop_image || i.image_webp || i.image || '',
      desc: cleanHtml(i.description?.desc || ''),
      stats: innateStats(i),
      sections: itemSections(i),
      cooldown: parseFloat(i.properties?.AbilityCooldown?.value) || 0,
      duration: parseFloat(i.properties?.AbilityDuration?.value) || 0,
    }))
    .sort((a, b) => a.tier - b.tier || a.cost - b.cost || a.name.localeCompare(b.name));
  cacheSet('items', items);
  return items;
}

// When the API has no text for an upgrade tier, build it from the raw property bonuses.
function upgradeText(upgrade, properties) {
  if (!upgrade?.property_upgrades?.length) return '';
  return upgrade.property_upgrades.map(u => {
    const p = properties?.[u.name] || {};
    const label = p.label || u.name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/Percent$/, '');
    const raw = String(u.bonus).trim();
    const n = parseFloat(raw);
    // Bonuses arrive as "6m", "-30.0" or "80.0": drop a unit already in the text, then show a clean number.
    const unit = (p.postfix || '').trim() || (raw.match(/[a-z%]+$/i)?.[0] ?? (/Percent/.test(u.name) ? '%' : ''));
    const num = isFinite(n) ? fmtNum(n, Math.abs(n) % 1 ? 2 : 0) : raw;
    const sign = n > 0 ? '+' : '';
    return `<span class="hl">${sign}${esc(num)}${esc(unit)}</span> ${esc(label)}`;
  }).join(', ');
}

async function loadAbilities(classNames) {
  // Abilities are fetched one by one (small requests, cached per hero).
  const key = 'abil:' + classNames.join(',');
  const cached = cacheGet(key);
  if (cached) return cached;
  const list = await Promise.all(classNames.map(async cn => {
    try {
      const a = await getJSON('/v1/assets/items/' + encodeURIComponent(cn));
      const d = a.description || {};
      return {
        name: a.name,
        img: a.image_webp || a.image || '',
        quip: cleanHtml(d.quip),
        desc: cleanHtml(d.desc),
        tiers: [1, 2, 3].map(i => cleanHtml(d['t' + i + '_desc']) || upgradeText(a.upgrades?.[i - 1], a.properties)),
        cooldown: parseFloat(a.properties?.AbilityCooldown?.value) || 0,
        type: a.ability_type || '',
      };
    } catch { return null; }
  }));
  const abilities = list.filter(Boolean);
  cacheSet(key, abilities);
  return abilities;
}

// ---------- Community builds (the in-game build browser, via the API) ----------
// The game's default category names arrive as localisation tokens like "#Citadel_HeroBuilds_EarlyGame".
function stageName(raw) {
  const s = String(raw || '').trim();
  if (!s) return 'Items';
  const m = s.match(/^#?Citadel_HeroBuilds_(\w+)$/i);
  if (!m) return s;
  const words = m[1].replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// "Top" means the builds most players actually had selected in ranked matches over the last two weeks.
async function loadTopBuilds(heroId, limit = 3) {
  const key = 'builds:' + heroId;
  const cached = cacheGet(key);
  if (cached) return cached;
  const since = Math.floor(Date.now() / 1000) - 14 * 86400;
  const stats = (await getJSON(`/v1/analytics/hero-build-stats/${heroId}?min_unix_timestamp=${since}`))
    .filter(s => s.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, limit);
  const builds = (await Promise.all(stats.map(async s => {
    const raw = (await getJSON(`/v1/builds?build_id=${s.hero_build_id}&only_latest=true`).catch(() => []))[0];
    if (!raw) return null;
    return {
      name: raw.hero_build.name || 'Untitled build',
      description: raw.hero_build.description || '',
      matches: s.matches,
      winRate: s.wins / s.matches * 100,
      updated: raw.hero_build.last_updated_timestamp || 0,
      stages: (raw.hero_build.details?.mod_categories || []).map(c => ({
        name: stageName(c.name),
        note: c.description || '',
        items: (c.mods || []).map(m => m.ability_id),
      })),
    };
  }))).filter(Boolean);
  cacheSet(key, builds);
  return builds;
}

// How often each item was bought on this hero in the last two weeks: { itemId: matches }
async function loadHeroItemUsage(heroId) {
  const key = 'usage:' + heroId;
  const cached = cacheGet(key);
  if (cached) return cached;
  const since = Math.floor(Date.now() / 1000) - 14 * 86400;
  const rows = await getJSON(`/v1/analytics/item-stats?hero_id=${heroId}&min_unix_timestamp=${since}`).catch(() => []);
  const usage = Object.fromEntries(rows.map(r => [r.item_id, r.matches]));
  cacheSet(key, usage);
  return usage;
}

// Builds travel in links as a short base64 code: [name, heroId, [[stageName, [itemIds]], ...]]
function encodeBuild(b) {
  const s = JSON.stringify([b.name, b.hero, b.stages.map(st => [st.name, st.items])]);
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodeBuild(code, byId) {
  try {
    const s = decodeURIComponent(escape(atob(code.replace(/-/g, '+').replace(/_/g, '/'))));
    const [name, hero, stages] = JSON.parse(s);
    return { name: String(name).slice(0, 60), hero: +hero || 0, stages: stages.map(([n, its]) => ({ name: String(n).slice(0, 30), items: its.map(Number).filter(id => byId[id]) })) };
  } catch { return null; }
}

function statLine(s) {
  const sign = s.value > 0 ? '+' : '';
  return `${sign}${fmtNum(s.value, Math.abs(s.value) < 10 && s.value % 1 ? 1 : 0)}${esc(s.postfix)} ${esc(s.label)}`;
}

function itemCardHtml(it, extra = '') {
  return `<button class="item-card slot-${it.slot}" data-id="${it.id}">
    <div class="top">
      <img src="${esc(it.img)}" alt="">
      <div>
        <div class="slot-label">${esc(it.slot)}${it.kind !== 'Passive' ? `<span class="active-badge">${it.kind}</span>` : ''}${it.modeOnly ? '<span class="active-badge mode">Mode only</span>' : ''}</div>
        <div class="nm">${esc(it.name)}</div>
        <div class="cost">${it.modeOnly ? 'Special modes' : fmtNum(it.cost) + ' souls'}</div>
      </div>
    </div>
    ${it.stats.length ? `<div class="bonus">${it.stats.slice(0, 3).map(statLine).join('<br>')}</div>` : ''}
    ${extra}
  </button>`;
}

function itemChipHtml(it, extra = '') {
  return `<button class="item-chip slot-${it.slot}" data-id="${it.id}" title="${esc(it.name)}">
    <img src="${esc(it.img)}" alt=""><span>${esc(it.name)}${extra}</span></button>`;
}

// Rank a list of {score} rows into S/A/B/C/D rows of html, using the given shares.
const TIER_SHARES = [['S', 0.12], ['A', 0.25], ['B', 0.30], ['C', 0.22], ['D', 1]];
function tierRowsHtml(rows, renderOne) {
  let i = 0, html = '';
  for (const [tier, share] of TIER_SHARES) {
    const n = tier === 'D' ? rows.length - i : Math.max(1, Math.round(rows.length * share));
    const group = rows.slice(i, i + n); i += n;
    if (!group.length) continue;
    html += `<div class="tier-row tier-${tier}"><div class="tier-badge">${tier}</div><div class="tier-heroes">${group.map(renderOne).join('')}</div></div>`;
  }
  return html;
}

const SECTION_NAMES = { innate: 'Always on', active: 'When activated', passive: 'Passive effect' };
function itemDetailHtml(it) {
  const sections = it.sections?.length ? it.sections : (it.desc ? [{ type: '', text: it.desc, props: [] }] : []);
  return `<div class="slot-${it.slot}" style="display:flex;gap:14px;align-items:center">
      <img src="${esc(it.img)}" alt="" style="width:72px;height:72px;background:var(--bg-deep);padding:6px;border:1px solid var(--c)">
      <div>
        <div class="slot-label">${esc(it.slot)}${it.kind !== 'Passive' ? `<span class="active-badge">${it.kind}</span>` : ''}${it.modeOnly ? '<span class="active-badge mode">Mode only</span>' : ''}</div>
        <h3>${esc(it.name)}</h3>
        <div class="muted caps" style="font-size:13px">${it.modeOnly ? 'Special modes only' : fmtNum(it.cost) + ' souls'}${it.cooldown ? ` &middot; ${fmtNum(it.cooldown, 1)}s cooldown` : ''}${it.duration ? ` &middot; ${fmtNum(it.duration, 1)}s duration` : ''}</div>
      </div>
    </div>
    ${it.modeOnly ? '<p class="mode-note">This item is not in the normal shop. It only appears in special match types such as Street Brawl.</p>' : ''}
    ${sections.map(s => `<div class="item-section">
      ${s.type ? `<div class="label">${SECTION_NAMES[s.type] || esc(s.type)}</div>` : ''}
      ${s.text ? `<p>${s.text}</p>` : ''}
      ${s.props.length ? `<div class="totals">${s.props.map(p => `<div class="row ${p.important ? 'imp' : ''}"><span>${esc(p.label)}</span><span>${esc(p.value)}</span></div>`).join('')}</div>` : ''}
    </div>`).join('')}`;
}

// Simple modal shared by pages
function openModal(html) {
  let back = $('.modal-back');
  if (!back) {
    back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><button class="close" aria-label="Close">&times;</button><div class="modal-body"></div></div>';
    document.body.appendChild(back);
    back.addEventListener('click', e => { if (e.target === back || e.target.classList.contains('close')) back.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') back.classList.remove('open'); });
  }
  $('.modal-body', back).innerHTML = html;
  back.classList.add('open');
}

function showError(el, err) {
  el.innerHTML = `<div class="error">Couldn't load game data right now. Check your connection and refresh.<br><small>${esc(err.message || err)}</small></div>`;
}

document.addEventListener('DOMContentLoaded', renderLayout);
