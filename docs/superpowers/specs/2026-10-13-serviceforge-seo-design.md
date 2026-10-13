# ServiceForge SEO: the product page and programmatic model pages

Date: 2026-10-13. Asked by Blake: "I also want ServiceForge to rank high, but not sure what
keywords." Decided in conversation: the middle path for how much of a record a public page
shows. Companion to `2026-10-13-seo-course-site-design.md`; builds on the same static
generator and deploy path.

## 1. Decisions

| Question | Decision | Why |
|---|---|---|
| Keywords | Head terms on the product page; device-plus-fault queries on model pages | Nobody searches "knowledge base"; biomeds search the model and the symptom or code |
| What a model page shows (Blake: "middle path") | Every symptom title and description, the full ranked cause list, and the FIRST diagnostic check with its test point and expected value; the remaining checks, expected values, corrective actions, and part numbers are behind the connect call to action | Full pages rank and earn links; the rest stays the product's value |
| Which models get a page | Only models with knowledge: at least two symptoms with causes | Thin pages do not rank and dilute the site |
| Data path | A build-time JSON export consumed by the generator; the export's shape is a contract both repos honour | The knowledge base lives in ServiceForge's Postgres on the server; the academy site is static |
| Never published | Service access codes (`kb_passwords`), citation quotes and document titles, community fixes' free text, anything with a person's name | Codes are the product's most sensitive data; quotes are manual text; community posts are not ours to publish |

## 2. Keywords

Head terms for `/serviceforge/`: "medical equipment troubleshooting", "biomed troubleshooting
database", "medical equipment troubleshooting knowledge base", "HTM knowledge base", "medical
device repair database", "biomed error codes". Model pages target "<Manufacturer> <Model>
troubleshooting", "<Model> error codes", "<Model> error code <n>", "<Model> will not power on"
and the other symptom titles, plus device-class phrases ("infusion pump error codes",
"ventilator alarm codes", "defibrillator self-test failed") on class index pages.

## 3. Pages

| URL | Page | Indexable |
|---|---|---|
| `/serviceforge/` | Product page, rewritten around the head terms | yes |
| `/serviceforge/models/` | Index of manufacturers and models with knowledge, grouped by device class | yes |
| `/serviceforge/models/<manufacturer-slug>/<model-slug>/` | One page per model with knowledge | yes |
| `/serviceforge/classes/<class-slug>/` | One page per device class (infusion pumps, monitors, defibrillators, ...) listing its models and the class's common symptoms | yes |

Slugs come from the export's manufacturer and model names (`slugify`, the generator's existing
rule). A model that later loses knowledge keeps its page as a stub with `noindex` rather than a
404, so links do not break.

**Product page.** Title "ServiceForge: Medical Equipment Troubleshooting Knowledge Base for
Biomeds". H1 the same without the brand prefix. Sections: what it is (symptom -> ranked causes
-> checks with test points -> actions with parts, plus community fixes with outcomes), how to
connect it to Claude, ChatGPT, Gemini, or Copilot (the existing content), the numbers from the
export (models with knowledge, symptoms, checks, error codes), a "Browse models" link, and an
FAQ. Structured data: `SoftwareApplication` and `FAQPage`.

**Model page.** Title "<Manufacturer> <Model> Troubleshooting and Error Codes | ServiceForge".
H1 "<Manufacturer> <Model>: troubleshooting and error codes". Sections:

1. A one-paragraph intro naming the device class and how many symptoms, causes, checks, and
   error codes the knowledge base holds for it, with the connect button.
2. Symptoms: for each symptom, its title, description, safety class as a plain label
   (patient safety, high voltage, radiation, caution), then the ranked causes (rank, title,
   likelihood), then the first diagnostic step in full (check text, test point, expected value
   with unit and tolerance, tools), then a line "N more checks with pass and fail actions, M
   corrective actions, and part numbers are in ServiceForge" with the connect button.
3. Error codes: a table of code and meaning and trigger condition; likely causes and actions
   are behind the connect button (shown as "causes and actions in ServiceForge").
4. Community: only a count ("K fixes logged by technicians, with outcomes"), never the text.
5. A footer line: knowledge-base records are field-unverified unless technicians confirmed
   them (the label the API returns), and the page is a teaching summary, not a service manual.

Structured data: `BreadcrumbList` and `TechArticle` (headline, about the device, dateModified
from the export date). No `HowTo` markup, because the full procedure is not on the page.

**Class page.** H1 "<Class> troubleshooting: models and common symptoms", the models in the
class with their symptom counts, and the class's most frequent symptom titles across models
(titles only), each linking to the model pages that carry it.

## 4. The export contract

A JSON file `site/data/serviceforge.json` committed to the academy repo and refreshed whenever
the knowledge base grows:

    {
      "exported": "2026-10-20",
      "stats": { "models_with_knowledge": 0, "symptoms": 0, "causes": 0, "steps": 0, "error_codes": 0 },
      "models": [{
        "id": "uuid", "manufacturer": "Philips", "name": "IntelliVue MP20", "family": "IntelliVue",
        "category_key": "patient-monitor", "category": "Patient monitors",
        "community_fix_count": 0,
        "symptoms": [{
          "id": "uuid", "title": "...", "description": "...", "safety_class": "caution",
          "verification": "unverified", "cause_count": 5, "step_count": 3, "action_count": 2,
          "causes": [{ "rank": 1, "title": "...", "likelihood": "likely" }],
          "first_step": { "check_text": "...", "test_point": "...", "expected": "...", "value_unit": "V", "tolerance": "...", "tools": "..." }
        }],
        "error_codes": [{ "code": "E-14", "meaning": "...", "trigger_condition": "...", "severity": "warning" }]
      }]
    }

Fields map one to one onto ServiceForge's `ModelMatch`, `SymptomDetail`, `CauseDetail`,
`StepDetail`, and `ErrorCodeHit` schemas; `first_step` is the step with the lowest `seq`. The
export omits `citation`, `sources`, `quote`, action `procedure` and `parts`, every step after
the first, community fix text, and the whole passwords table. Producing the file is a
ServiceForge-repo task (a read-only `GET /kb/export` route behind a token, or a script run on
the server against Postgres); the academy generator only reads the file and fails the build if
it is missing or malformed.

## 5. Generator and tests

`site/build-serviceforge.js` (new, same structure as `build-site.js`): loads the JSON, writes
the product page, the models index, class pages, and model pages into `dist/site/serviceforge/`,
and returns their URLs for the sitemap. `site/build-site.js` calls it when the data file exists.
`scripts/stage.sh` already copies `dist/site/.`; the existing `dist/serviceforge.html` product
bundle is replaced by the generated page. `tests/serviceforge.js` (new): a fixture JSON with two
models (one with knowledge, one thin) checks that the thin model is `noindex`, that no page
contains a password-like field, a citation quote, or community text, that each model page
shows exactly one step per symptom, that codes render, and that the sitemap includes the model
pages.

## 6. Success criteria

Model pages indexed within six weeks of deploy; impressions for "<model> troubleshooting" and
"<model> error code" phrases for the models with the most records; clicks on the connect
button measured as a GA4 event (`sf_connect_click`, page path as a parameter).

## 7. Out of scope

Publishing full procedures, parts, or service codes; user accounts on the pages; comments;
anything that changes the MCP server's behaviour. Class taxonomy comes from `category_key` as
exported; no new classification work.
