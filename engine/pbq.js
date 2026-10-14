// FieldReady Academy performance-based questions (PBQs): grading, normalization, answer text, and the
// task renderers for the six task kinds. Loaded before engine/app.js, which owns the views, the
// state, and the test integration. Nothing here reads FRA.course or S; app.js passes what the
// renderers need. Task controls use data-pbq attributes, never data-act, so app.js's click
// delegation ignores them.
window.FRAPbq = (function () {
  const KINDS = ['order', 'match', 'multiselect', 'form', 'command', 'choice'];
  const str = x => x == null ? '' : String(x);
  const squash = s => str(s).trim().replace(/\s+/g, ' ');
  // Field normalizers. Each returns a canonical string; two values match when their canonical strings match.
  const normalize = {
    text: s => squash(s).toLowerCase(),
    number: s => { const n = Number(squash(s)); return Number.isFinite(n) ? String(n) : squash(s).toLowerCase(); },
    ip: s => { const t = squash(s); const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t); return m ? m.slice(1).map(o => String(Number(o))).join('.') : t.toLowerCase(); },
    // A dotted mask and its prefix length are the same answer: both canonicalize to the prefix.
    cidr: s => {
      const t = squash(s).replace(/^\//, '');
      if (/^\d{1,2}$/.test(t)) return '/' + Number(t);
      const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t);
      if (!m) return t.toLowerCase();
      const bits = m.slice(1).map(o => Number(o).toString(2).padStart(8, '0')).join('');
      return /^1*0*$/.test(bits) ? '/' + (bits.indexOf('0') < 0 ? 32 : bits.indexOf('0')) : t;
    }
  };
  function normalizeCommand(s, flagOrder) {
    const t = squash(s).toLowerCase().replace(/\.$/, '');
    if (!t) return '';
    if (flagOrder === false) { const parts = t.split(' '); return parts[0] + (parts.length > 1 ? ' ' + parts.slice(1).sort().join(' ') : ''); }
    return t;
  }
  const fieldNorm = f => normalize[f.normalize] || normalize.text;
  const fieldOk = (f, v) => (f.expect || []).some(e => fieldNorm(f)(e) === fieldNorm(f)(v));
  const commandOk = (t, v) => [].concat(t.expect || [], t.alt || []).some(e => normalizeCommand(e, t.flagOrder) === normalizeCommand(v, t.flagOrder));

  function grade(task, answer) {
    let score = 0; let detail = null;
    switch (task.kind) {
      case 'order': {
        const a = Array.isArray(answer) ? answer : []; const e = task.expect || [];
        const hits = e.map((x, i) => a[i] === x); score = e.length ? hits.filter(Boolean).length / e.length : 0; detail = hits; break;
      }
      case 'match': {
        const a = Array.isArray(answer) ? answer : []; const e = task.expect || [];
        const hits = e.map((x, i) => a[i] != null && a[i] === x); score = e.length ? hits.filter(Boolean).length / e.length : 0; detail = hits; break;
      }
      case 'multiselect': {
        const a = Array.isArray(answer) ? Array.from(new Set(answer)) : []; const e = new Set(task.expect || []);
        const right = a.filter(i => e.has(i)).length; const wrong = a.length - right;
        score = e.size ? Math.max(0, right - wrong) / e.size : 0; detail = { right, wrong }; break;
      }
      case 'form': {
        const a = answer && typeof answer === 'object' ? answer : {}; const fs = task.fields || [];
        const hits = fs.map(f => fieldOk(f, a[f.id])); score = fs.length ? hits.filter(Boolean).length / fs.length : 0; detail = hits; break;
      }
      case 'command': score = commandOk(task, answer) ? 1 : 0; break;
      case 'choice': score = answer != null && Number(answer) === Number(task.expect) ? 1 : 0; break;
      default: score = 0;
    }
    score = Math.round(score * 1000) / 1000;
    return { score, correct: score === 1, detail };
  }

  function emptyAnswer(task) {
    switch (task.kind) {
      case 'order': return [];
      case 'match': return (task.left || []).map(() => null);
      case 'multiselect': return [];
      case 'form': return {};
      case 'command': return '';
      default: return null;
    }
  }
  const NONE = '(no answer)';
  function expectedText(task) {
    switch (task.kind) {
      case 'order': return (task.expect || []).map(i => task.items[i]).join(', ');
      case 'match': return (task.left || []).map((l, i) => `${l}: ${task.right[task.expect[i]]}`).join('; ');
      case 'multiselect': return (task.expect || []).slice().sort((a, b) => a - b).map(i => task.options[i]).join(', ');
      case 'form': return (task.fields || []).map(f => `${f.label}: ${(f.expect || [])[0] || ''}`).join('; ');
      case 'command': return (task.expect || [])[0] || '';
      case 'choice': return str((task.options || [])[task.expect]);
      default: return '';
    }
  }
  function answerText(task, answer) {
    if (answer == null) return NONE;
    switch (task.kind) {
      case 'order': return Array.isArray(answer) && answer.length ? answer.map(i => task.items[i]).join(', ') : NONE;
      case 'match': return (task.left || []).map((l, i) => `${l}: ${answer[i] != null ? task.right[answer[i]] : '(not placed)'}`).join('; ');
      case 'multiselect': return Array.isArray(answer) && answer.length ? answer.slice().sort((a, b) => a - b).map(i => task.options[i]).join(', ') : NONE;
      case 'form': return (task.fields || []).map(f => `${f.label}: ${squash(answer[f.id]) || '(blank)'}`).join('; ');
      case 'command': return squash(answer) || NONE;
      case 'choice': return answer != null && task.options && task.options[answer] != null ? task.options[answer] : NONE;
      default: return NONE;
    }
  }

  // Filled in by Task 4.
  function render() { throw new Error('FRAPbq.render is not implemented yet'); }
  function collect() { throw new Error('FRAPbq.collect is not implemented yet'); }

  return { KINDS, normalize, normalizeCommand, grade, emptyAnswer, expectedText, answerText, render, collect };
})();
