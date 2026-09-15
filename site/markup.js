'use strict';
// Static renderer for the lesson mini-markup and the cheat sheet blocks, for the public
// SEO pages. Mirrors engine/app.js (renderBody, inline, csBlock) rule for rule, and
// tests/site.js proves parity against the real engine for every public lesson, so a
// change to the app's renderer that is not copied here fails the suite.
//
// The one deliberate difference: an acronym becomes <abbr title="full. tip"> instead of
// the app's click span, because a static page has no acronym modal to open.

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function makeRenderer(acronyms) {
  const ACR = acronyms || {};
  const KEYS = Object.keys(ACR).filter(k => ACR[k] && ACR[k].full).sort((a, b) => b.length - a.length || a.localeCompare(b));
  const RE = KEYS.length ? new RegExp('(^|[^A-Za-z0-9_])(' + KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')).join('|') + ')(s|es)?(?![A-Za-z0-9_])', 'g') : null;
  // An entry may carry a second meaning (alt: { full, tip, more, when }) that applies when
  // the surrounding text matches `when` -- the same 160-character window the app uses.
  const whenRe = new Map();
  const altWhen = key => {
    if (whenRe.has(key)) return whenRe.get(key);
    const w = ACR[key].alt && ACR[key].alt.when;
    const re = !w ? null : typeof w === 'string' ? new RegExp(w, 'i') : w.source ? new RegExp(w.source, w.flags.replace('g', '')) : null;
    whenRe.set(key, re); return re;
  };
  const entry = (key, text, at) => { const re = altWhen(key); return re && re.test(text.slice(Math.max(0, at - 160), at + 160)) ? ACR[key].alt : ACR[key]; };
  const wrap = html => !RE ? html : html.split(/(<code>[\s\S]*?<\/code>)/).map(part => part.startsWith('<code>') ? part
    : part.replace(RE, (m, pre, key, pl, at) => { const a = entry(key, part, at + pre.length); return `${pre}<abbr title="${esc(a.full)}${a.tip ? '. ' + esc(a.tip) : ''}">${key}${pl || ''}</abbr>`; })).join('');
  const inline = s => wrap(esc(s).replace(/\{\{(.+?)\}\}/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));

  function renderBody(md) {
    const lines = String(md || '').split('\n'); let html = ''; let list = []; let olist = []; let pre = null;
    const flush = () => {
      if (list.length) { html += '<ul>' + list.map(li => `<li>${inline(li)}</li>`).join('') + '</ul>'; list = []; }
      if (olist.length) { html += '<ol>' + olist.map(li => `<li>${inline(li)}</li>`).join('') + '</ol>'; olist = []; }
    };
    for (const raw of lines) {
      if (pre !== null) { if (raw.trim().startsWith('```')) { html += `<pre>${esc(pre.join('\n'))}</pre>`; pre = null; } else pre.push(raw); continue; }
      const line = raw.trim();
      if (line.startsWith('```')) { flush(); pre = []; continue; }
      if (!line) { flush(); continue; }
      if (line.startsWith('## ')) { flush(); html += `<h3>${inline(line.slice(3))}</h3>`; }
      else if (line.startsWith('- ')) { if (olist.length) flush(); list.push(line.slice(2)); }
      else if (/^\d+\. /.test(line)) { if (list.length) flush(); olist.push(line.replace(/^\d+\. /, '')); }
      else if (line.startsWith('> ')) { flush(); html += `<div class="tip">${inline(line.slice(2))}</div>`; }
      else { flush(); html += `<p>${inline(line)}</p>`; }
    }
    if (pre !== null) html += `<pre>${esc(pre.join('\n'))}</pre>`;
    flush(); return html;
  }

  function csBlock(b) {
    if (b.type === 'table') return `${b.title ? `<h3>${inline(b.title)}</h3>` : ''}<div class="table-wrap"><table class="cs-table"><thead><tr>${b.cols.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (b.type === 'list') return `<div class="cs-list ${b.cols === 2 ? 'two' : ''}">${b.title ? `<h3>${inline(b.title)}</h3>` : ''}<ul>${b.items.map(i => `<li>${inline(i)}</li>`).join('')}</ul></div>`;
    if (b.type === 'note') return `<div class="tip">${inline(b.text)}</div>`;
    return '';
  }

  // Plain text of a markup line: markup stripped, no HTML. For meta descriptions.
  const plain = s => String(s || '').replace(/\{\{(.+?)\}\}/g, '$1').replace(/\*\*(.+?)\*\*/g, '$1').trim();

  return { esc, inline, renderBody, csBlock, plain, keys: KEYS, acronyms: ACR };
}

// Strip both acronym markups to plain text so engine output and static output can be
// compared. Used by tests/site.js; exported here so the rule lives beside the renderer.
function stripAcronyms(html) {
  return String(html)
    .replace(/<span class="acr" data-act="acr" data-arg="[^"]*" data-sense="\d" role="button" tabindex="0">([^<]*)<\/span>/g, '$1')
    .replace(/<abbr title="[^"]*">([^<]*)<\/abbr>/g, '$1');
}

module.exports = { esc, makeRenderer, stripAcronyms };
