-- ServiceForge knowledge-base export for the public model pages (middle path).
-- Leaves out the service-access-code table, the parts table, corrective-action bodies and their part lists,
-- diagnostic steps after the first, pass and fail actions, source references, and community text.
-- Run: see scripts/export-serviceforge.sh
WITH canon AS (
  SELECT s.id, s.model_id, s.title, s.description, s.safety_class
  FROM kb_symptoms s
  WHERE s.canonical_id IS NULL AND s.model_id IS NOT NULL AND s.scope = 'model'
),
cause_counts AS (
  SELECT symptom_id, count(*) AS n FROM kb_causes WHERE canonical_id IS NULL GROUP BY symptom_id
),
step_counts AS (
  SELECT symptom_id, count(*) AS n FROM kb_diagnostic_steps GROUP BY symptom_id
),
action_counts AS (
  SELECT symptom_id, count(*) AS n FROM kb_corrective_actions GROUP BY symptom_id
),
first_steps AS (
  SELECT DISTINCT ON (symptom_id) symptom_id, check_text, test_point, expected, value_unit, tolerance, tools
  FROM kb_diagnostic_steps ORDER BY symptom_id, seq ASC
),
knowledge AS (
  SELECT c.model_id, count(*) AS symptoms
  FROM canon c JOIN cause_counts cc ON cc.symptom_id = c.id
  GROUP BY c.model_id HAVING count(*) >= 2
),
community AS (
  SELECT model_id, count(*) AS n FROM community_fixes GROUP BY model_id
),
sym_json AS (
  SELECT c.model_id,
    json_agg(json_build_object(
      'id', c.id, 'title', c.title, 'description', c.description, 'safety_class', c.safety_class,
      'cause_count', coalesce(cc.n, 0), 'step_count', coalesce(sc.n, 0), 'action_count', coalesce(ac.n, 0),
      'causes', (SELECT coalesce(json_agg(json_build_object('rank', k.rank, 'title', k.title, 'likelihood', k.likelihood) ORDER BY k.rank NULLS LAST, k.title), '[]'::json)
                 FROM kb_causes k WHERE k.symptom_id = c.id AND k.canonical_id IS NULL),
      'first_step', CASE WHEN fs.symptom_id IS NULL THEN NULL ELSE json_build_object(
        'check_text', fs.check_text, 'test_point', fs.test_point, 'expected', fs.expected,
        'value_unit', fs.value_unit, 'tolerance', fs.tolerance, 'tools', fs.tools) END
    ) ORDER BY c.title) AS symptoms
  FROM canon c
  JOIN cause_counts cc ON cc.symptom_id = c.id
  LEFT JOIN step_counts sc ON sc.symptom_id = c.id
  LEFT JOIN action_counts ac ON ac.symptom_id = c.id
  LEFT JOIN first_steps fs ON fs.symptom_id = c.id
  GROUP BY c.model_id
),
code_json AS (
  SELECT e.model_id, json_agg(json_build_object('code', e.code, 'meaning', e.meaning, 'trigger_condition', e.trigger_condition, 'severity', e.severity) ORDER BY e.code_norm) AS error_codes
  FROM kb_error_codes e WHERE e.canonical_id IS NULL AND e.model_id IS NOT NULL
  GROUP BY e.model_id
)
SELECT json_build_object(
  'exported', to_char(now(), 'YYYY-MM-DD'),
  'stats', json_build_object(
    'models_with_knowledge', (SELECT count(*) FROM knowledge),
    'symptoms', (SELECT count(*) FROM canon c WHERE c.model_id IN (SELECT model_id FROM knowledge)),
    'causes', (SELECT count(*) FROM kb_causes k JOIN canon c ON c.id = k.symptom_id WHERE k.canonical_id IS NULL AND c.model_id IN (SELECT model_id FROM knowledge)),
    'steps', (SELECT count(*) FROM kb_diagnostic_steps d JOIN canon c ON c.id = d.symptom_id WHERE c.model_id IN (SELECT model_id FROM knowledge)),
    'error_codes', (SELECT count(*) FROM kb_error_codes e WHERE e.canonical_id IS NULL AND e.model_id IN (SELECT model_id FROM knowledge))
  ),
  'models', coalesce((
    SELECT json_agg(json_build_object(
      'id', m.id, 'manufacturer', mf.name, 'name', m.name, 'family', m.family, 'category_key', m.category_key,
      'community_fix_count', coalesce(cm.n, 0),
      'symptoms', sj.symptoms,
      'error_codes', coalesce(cj.error_codes, '[]'::json)
    ) ORDER BY mf.name, m.name)
    FROM knowledge kn
    JOIN models m ON m.id = kn.model_id
    JOIN manufacturers mf ON mf.id = m.manufacturer_id
    JOIN sym_json sj ON sj.model_id = m.id
    LEFT JOIN code_json cj ON cj.model_id = m.id
    LEFT JOIN community cm ON cm.model_id = m.id
  ), '[]'::json)
);
