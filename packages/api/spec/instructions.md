<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# Dialect L0170 Specific Instructions

L0170 is a Graffiticode dialect for data transformation, inspired by dplyr and jq.

## L0170 Specific Guidelines

- Use `fetch` to retrieve JSON or CSV data from a URL
- Use `get` to navigate into nested data: `get "results.items" data`
- Use `filter` to keep matching rows with predicate records: `filter {age: {gt: 30}} data`
  - Comparison operators: `eq`, `ne`, `gt`, `ge`, `lt`, `le`
  - List operators: `in` (value in list), `nin` (value not in list)
  - String operators: `contains`, `startsWith`, `endsWith`
  - Equality shorthand: `filter {status: "active"} data`
  - Dot-paths for nested fields use quoted strings as record keys: `filter {"address.city": {eq: "Springfield"}} data` (not nested records)
- Use `select` to pick or rename fields: `select ["name", "age"] data`
  - Dot-paths for nested fields: `select ["player.name", "goals"] data`
  - Rename with records: `select [{from: "firstName", to: "name"}] data`
- Use `mutate` to compute new fields: `mutate {total: {add: ["price", "tax"]}} data`
  - Expressions: `concat`, `add`, `sub`, `mul`, `div`
  - Round with `round`: `mutate {total: {add: ["price", "tax"], round: 2}} data`
- Use `group` to aggregate: `group {by: "category", count: "n"} data`
  - Aggregations: `count`, `sum`, `avg`, `min`, `max`
  - Round with `round`: `group {by: "dept", avg: {field: "salary", as: "avgSalary", round: 2}} data`
- Use `sort` to order results: `sort "name" data` or `sort {field: "age", order: "desc"} data`
- Use `take` to limit results: `take 10 data` or `take {last: 5} data`
- Use `join` to combine datasets: `join {right: other, on: "id"} data`
- Use `flatten` to unnest: `flatten 1 data` or `flatten "items" data`
- Use `unique` to deduplicate: `unique "email" data` or `unique ["dept", "role"] data`
- Use `format` to display numbers as formatted strings with Excel-style patterns: `format {price: "$#,##0.00", rate: "0.0%"} data`
  - Common patterns: `"#,##0"` (thousands), `"$#,##0.00"` (currency), `"0.0%"` (percent), `"000000"` (zero-padded)
  - Accounting: `"#,##0.00;(#,##0.00)"` (negative in parens)
  - Date: `"yyyy-mm-dd"`, `"mm/dd/yyyy"`
- Compose operations right-to-left to build data pipelines

## Example Patterns

- Filter with list: `filter {category: {in: ["books" "music"]}} data..`
- Exclude by list: `filter {code: {nin: ["WLD" "OED" "PST"]}} data..`
- Fetch and filter: `filter {age: {gt: 30}} fetch "https://example.com/people.json"..`
- Navigate and select: `select ["name", "email"] get "users" fetch "https://example.com/api.json"..`
- Group and sort: `sort {field: "n", order: "desc"} group {by: "category", count: "n"} data..`
- Top N: `take 5 sort {field: "score", order: "desc"} data..`
