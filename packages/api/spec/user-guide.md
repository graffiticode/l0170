<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0170 User Guide

Agent-facing guide for authoring data transformation pipelines through L0170. Read this before composing a `create_item` prompt or an `update_item` modification.

## Overview

L0170 is an authoring language for data transformation pipelines, inspired by dplyr and jq. Input is a natural-language description of a transformation; output is an L0170 program that fetches or receives tabular data (JSON, CSV, or inline records) and composes a pipeline of operations — filter, select, mutate, group, sort, take, join, flatten, unique, format — to produce the result. L0170 is the right tool when the job is "reshape this data" or "compute this summary"; it is not a chart renderer, a full programming language, or a persistent-storage interface.

When composing a request, describe the source first (URL to fetch, path to navigate into, or inline data), then the transformations in the order they should apply, then the final shape (which fields to keep, how to order, how many rows, what format). Pipelines read right-to-left in L0170 source, but requests can be authored left-to-right in plain English — the translator reverses them when emitting code. Be explicit about field names and comparison conditions because the predicate syntax is precise (e.g., `{age: {gt: 30}}` rather than "over 30"); stating "keep rows where age is greater than 30" is enough.

In scope: fetching remote JSON or CSV, navigating nested records with dot-paths, filtering by equality / comparison / list membership / string match, selecting and renaming fields, computing derived fields, grouping with aggregations (count/sum/avg/min/max), sorting and limiting, joining two datasets on a key, flattening nested arrays, deduplicating, and number/date formatting for display. Out of scope: charting and visualization, user-interactive assessments, mutation of remote data (all operations are read-only transforms), stateful workflows, database queries (only URL fetches), and host-app embedding — those belong in other Graffiticode languages or downstream runtimes.

## Vocabulary Cues

Say this to get that:

- **Fetch** — `fetch "URL"`. Retrieves JSON or CSV from a URL. Auto-detects format. "Get the data from https://..." or "fetch the JSON at ..." triggers this.
- **Get / navigate** — `get "path.to.data" data`. Navigates into a nested record with dot-paths. "Navigate into results.items" or "drill into the users field".
- **Filter** — `filter {field: {operator: value}} data`. Keeps rows matching a predicate. Operators: `eq`, `ne`, `gt`, `ge`, `lt`, `le`, `in`, `nin`, `contains`, `startsWith`, `endsWith`. "Keep rows where X is greater than Y" / "only rows whose name contains 'smith'" / "exclude rows whose code is in [WLD, OED]".
- **Select** — `select ["field1", "field2"]` or with renames `select [{from: "firstName", to: "name"}]`. "Pick only the name and age" or "rename firstName to name".
- **Mutate** — `mutate {total: {add: ["price", "tax"]}}`. Computes new fields. Expressions: `add`, `sub`, `mul`, `div`, `concat`. Round with `round: N`. "Add a total column that is price plus tax" / "compute fullName as firstName + ' ' + lastName".
- **Group / aggregate** — `group {by: "category", count: "n"}` or `group {by: "dept", avg: {field: "salary", as: "avgSalary"}}`. Aggregations: `count`, `sum`, `avg`, `min`, `max`. "Group by category and count" / "average salary by department".
- **Sort** — `sort "name"` (ascending) or `sort {field: "age", order: "desc"}`. "Sort by score descending".
- **Take** — `take 10` (first N) or `take {last: 5}`. "Top 5" / "last 3 rows".
- **Join** — `join {right: other, on: "id"} data`. Left join two arrays by key. "Join orders with customers on customerId".
- **Flatten** — `flatten 1 data` (one level) or `flatten "items" data` (extract nested field). "Flatten the items array" / "unnest one level of nesting".
- **Unique** — `unique "email"` or `unique ["dept", "role"]`. "Deduplicate by email" / "unique combinations of department and role".
- **Format** — `format {price: "$#,##0.00", rate: "0.0%"}`. Excel-style patterns for currency, percent, thousands, dates (`yyyy-mm-dd`). "Display price as currency" / "format rate as a percentage".
- **Dot-path** — for nested fields, use `"parent.child"` strings as record keys in predicates and select lists. "Filter on address.city equals Springfield".
- **Pipeline order** — describe operations left-to-right in English ("fetch, then filter, then sort, then take top 5"); the backend emits composed L0170 source.

## Example Prompts

- *"Fetch https://example.com/people.json and keep only rows where age is greater than 30. Select name and age. Sort by name."* → `data_pipeline`
- *"Group this data by department, count the rows, and compute the average salary rounded to 2 decimals. Sort by count descending. Take the top 5 departments."* → `data_pipeline`
- *"Fetch https://example.com/orders.csv and join it with https://example.com/customers.csv on customerId. Select customer name, order date, and total. Filter to orders where total is at least 100."* → `data_pipeline`
- *"Filter the data to rows whose category is in ['books', 'music'] and whose price is less than 50. Add a tax column as price * 0.08. Format price and tax as currency."* → `data_pipeline`
- *"Fetch https://example.com/nested.json, navigate into results.users, flatten the orders field, and deduplicate by orderId."* → `data_pipeline`
- *"Filter rows whose name starts with 'J' and whose address.city equals 'Springfield'. Select name, address.city, and address.zip (rename the nested fields to city and zip). Sort by name."* → `data_pipeline`

## Out of Scope

- **Charting and visualization** — bar charts, line graphs, heatmaps. L0170 produces transformed data; a visualization language consumes it.
- **Writing back to the source** — no mutations of remote data, no POST/PUT. All fetch operations are read-only.
- **Database queries** — SQL, GraphQL, NoSQL. L0170 fetches JSON/CSV over HTTP only.
- **Interactive assessments or forms** — L0170 is a transformation language, not an interaction surface.
- **Complex conditional logic across rows** — no window functions, no lag/lead, no row-referential formulas. Use `group` for aggregations; use `mutate` for per-row computed fields.
- **Host-app embedding and UI** — L0170 emits a program that compiles to a data result; rendering belongs to the consumer.
