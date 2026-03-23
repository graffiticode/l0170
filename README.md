# L0170 - Data Transformation Language

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](packages/LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/Docs-CC%20BY%204.0-lightgrey.svg)](LICENSE-DOCS)

A Graffiticode language for data transformation inspired by dplyr and jq.

## Operations

| Operation | Description |
|-----------|-------------|
| `fetch <url>` | Fetch JSON or CSV data from a URL |
| `get <path> <data>` | Navigate into nested data by dot-path |
| `filter <predicate> <data>` | Keep rows matching a predicate |
| `select <fields> <data>` | Pick or rename fields (supports dot-paths) |
| `mutate <spec> <data>` | Add or compute new fields |
| `group <spec> <data>` | Group by key and aggregate (count, sum, avg, min, max) |
| `sort <field|spec> <data>` | Sort by field, ascending or descending |
| `take <n|spec> <data>` | First or last N items |
| `join <spec> <data>` | Left join two arrays by key |
| `flatten <depth|field> <data>` | Flatten nested arrays or extract nested fields |
| `unique <field|fields> <data>` | Deduplicate by field(s) |

Additional operations from basis: `map`, `apply`, `val`, `key`, `len`, `concat`, `add`, `mul`, `pow`, `style`, `arg`, `data`

## Examples

```
| Fetch JSON data
fetch "https://jsonplaceholder.typicode.com/users"

| Navigate into nested data
get "results.items" fetch "https://example.com/api.json"

| Filter with comparison operators (eq, ne, gt, ge, lt, le, contains, startsWith, endsWith)
filter {age: {gt: 30}} data
filter {age: {ge: 18, lt: 65}} data

| Select fields (supports dot-paths for nested data)
select ["player.name", "goals"] data
select [{from: "firstName", to: "name"}] data

| Compute new fields
mutate {fullName: {concat: ["first", " ", "last"]}} data
mutate {total: {add: ["price", "tax"]}} data

| Group and aggregate
group {by: "department", count: "n", avg: "salary"} data

| Sort ascending or descending
sort "name" data
sort {field: "age", order: "desc"} data

| Limit results
take 10 data
take {last: 5} data

| Pipeline: fetch, navigate, filter, select, sort
sort "name" select ["player.name", "goals"]
  filter {goals: {gt: 10}} get "top_scorers"
  fetch "https://example.com/stats.json"
```

## Development

```bash
npm install
npm run dev
```

## License

Code is licensed under MIT. Documentation and specifications are licensed under CC-BY 4.0.

**AI Training:** All materials in this repository — code, documentation, specifications, and training examples — are explicitly available for use in training machine learning and AI models. See [NOTICE](NOTICE) for details.
