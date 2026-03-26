<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0170 Vocabulary

This specification documents dialect-specific functions available in the
**L0170** language of Graffiticode. These functions extend the core language
with data transformation functionality inspired by dplyr and jq.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

## Functions

| Function | Signature | Description |
| :------- | :-------- | :---------- |
| `fetch` | `<string: list>` | Fetches JSON or CSV data from a URL |
| `filter` | `<record list: list>` | Keeps rows matching a predicate |
| `select` | `<list list: list>` | Picks or renames fields from objects |
| `mutate` | `<record list: list>` | Adds or computes new fields |
| `group` | `<record list: list>` | Groups by key and aggregates |
| `sort` | `<string|record list: list>` | Sorts by field |
| `take` | `<number|record list: list>` | Returns first or last N items |
| `join` | `<record list: list>` | Left joins two arrays by key |
| `get` | `<string record: any>` | Navigates into nested data by dot-path |
| `flatten` | `<number|string list: list>` | Flattens nested arrays or extracts nested fields |
| `unique` | `<string|list list: list>` | Deduplicates by field(s) |
| `format` | `<record list: list>` | Formats numeric fields as display strings |

### fetch

Fetches data from a URL. Auto-detects JSON or CSV format. CSV files are parsed
into arrays of objects with column headers as keys and numbers auto-converted.

```
fetch "https://example.com/data.json"
fetch "https://example.com/data.csv"
```

### filter

Keeps rows matching all conditions in the predicate record. Each key is a field
name (supports dot-paths for nested fields). The value is either a literal for
equality matching, or a record of comparison operators.

**Predicate record keys:**

| Key | Description | Example |
| :-- | :---------- | :------ |
| `eq` | Equal to | `{age: {eq: 30}}` |
| `ne` | Not equal to | `{status: {ne: "inactive"}}` |
| `gt` | Greater than | `{age: {gt: 30}}` |
| `ge` | Greater than or equal | `{age: {ge: 30}}` |
| `lt` | Less than | `{age: {lt: 50}}` |
| `le` | Less than or equal | `{age: {le: 50}}` |
| `contains` | String contains | `{name: {contains: "smith"}}` |
| `startsWith` | String starts with | `{name: {startsWith: "J"}}` |
| `endsWith` | String ends with | `{email: {endsWith: ".com"}}` |
| `in` | Value is in list | `{status: {in: ["active", "pending"]}}` |
| `nin` | Value is not in list | `{code: {nin: ["WLD", "OED", "PST"]}}` |

Multiple operators can be combined in a single condition. Multiple keys require
all conditions to match (logical AND).

```
filter {status: "active"} data
filter {age: {gt: 30}} data
filter {age: {ge: 18, lt: 65}} data
filter {name: {contains: "smith"}} data
filter {player.goals: {gt: 10}} data
filter {status: {in: ["active" "pending"]}} data
filter {code: {nin: ["WLD" "OED" "PST"]}} data
```

### select

Picks fields from each row. The first argument is a list of field specifiers.
Each specifier is either a string (field name) or a rename record.

Supports dot-paths for nested fields. When a dot-path is used, the output key
is the last segment of the path.

**Field specifier forms:**

| Form | Description | Example |
| :--- | :---------- | :------ |
| `"field"` | Pick field, keep name | `"name"` |
| `"a.b.c"` | Pick nested field, output as `"c"` | `"player.name"` |
| `{from: "x", to: "y"}` | Pick field `x`, rename to `y` | `{from: "firstName", to: "name"}` |
| `{from: "a.b", to: "y"}` | Pick nested field, rename to `y` | `{from: "player.name", to: "playerName"}` |

```
select ["name", "age"] data
select ["player.name", "goals"] data
select [{from: "firstName", to: "name"}] data
```

### mutate

Adds or computes new fields on each row. The first argument is a record where
each key is the output field name and each value is an expression.

**Expression forms:**

| Form | Description | Example |
| :--- | :---------- | :------ |
| `"fieldName"` | Copy value from existing field | `{x: "name"}` |
| `"literal"` | Literal string (if no matching field) | `{status: "active"}` |
| `{concat: [...]}` | Concatenate strings/fields | `{full: {concat: ["first", " ", "last"]}}` |
| `{add: [...]}` | Sum numeric fields/values | `{total: {add: ["price", "tax"]}}` |
| `{add: [...], round: N}` | Sum, rounded to N decimal places | `{total: {add: ["price", "tax"], round: 2}}` |
| `{mul: [...]}` | Multiply numeric fields/values | `{area: {mul: ["width", "height"]}}` |
| `{mul: [...], round: N}` | Multiply, rounded to N decimal places | `{pct: {mul: ["rate", 100], round: 1}}` |

In `concat`, `add`, and `mul` arrays, strings that match a field name in the
row are resolved to that field's value; otherwise they are used as literals.

The optional `round` key rounds the result to the specified number of decimal
places using half-up rounding (e.g., `round: 2` gives two decimal places).
The result remains a number. All arithmetic uses precise decimal math internally.

```
mutate {fullName: {concat: ["first", " ", "last"]}} data
mutate {total: {add: ["price", "tax"]}} data
mutate {total: {add: ["price", "tax"], round: 2}} data
mutate {status: "active"} data
```

### group

Groups rows by a field and computes aggregations. The first argument is a
record with a required `by` key and one or more aggregation keys.

**Record keys:**

| Key | Value | Description |
| :-- | :---- | :---------- |
| `by` | `"field"` | Field to group by (required) |
| `count` | `"outputName"` | Count of rows in each group |
| `sum` | `"field"` or `{field: "x", as: "y", round: N}` | Sum of field values |
| `avg` | `"field"` or `{field: "x", as: "y", round: N}` | Average of field values |
| `min` | `"field"` or `{field: "x", as: "y", round: N}` | Minimum field value |
| `max` | `"field"` or `{field: "x", as: "y", round: N}` | Maximum field value |

For `sum`, `avg`, `min`, `max`: a string value uses the field name as both
input and output. A record with `field` and `as` allows renaming the output.
The optional `round` key rounds the result to the specified number of decimal
places. The result remains a number.

```
group {by: "category", count: "n"} data
group {by: "dept", sum: "salary", avg: "age"} data
group {by: "team", sum: {field: "points", as: "totalPoints"}} data
group {by: "dept", avg: {field: "salary", as: "avgSalary", round: 2}} data
```

### sort

Sorts rows by a field. The first argument is either a string (field name,
ascending) or a record with `field` and `order`.

**Record keys:**

| Key | Value | Description |
| :-- | :---- | :---------- |
| `field` | `"fieldName"` | Field to sort by |
| `order` | `"asc"` or `"desc"` | Sort direction (default: `"asc"`) |

Handles both numeric and string comparison automatically.

```
sort "name" data
sort {field: "age", order: "desc"} data
```

### take

Returns the first or last N items. The first argument is either a number
(first N) or a record with `last`.

**Argument forms:**

| Form | Description |
| :--- | :---------- |
| `N` | First N items |
| `{last: N}` | Last N items |

```
take 10 data
take {last: 5} data
```

### join

Left joins two arrays by a common field. Every row in the left (data) array
appears in the output. Matching rows from the right array are merged in. Rows
with no match retain only their left-side fields.

**Record keys:**

| Key | Value | Description |
| :-- | :---- | :---------- |
| `right` | `<list>` | The right-side array to join |
| `on` | `"field"` | The field to match on |

```
join {right: otherData, on: "id"} data
```

### get

Navigates into nested data using a dot-path string. When the path crosses an
array, it automatically descends into each element and collects results.

```
get "address.city" data
get "departments.teams.name" data
get "results" fetch "https://example.com/api.json"
```

### flatten

Flattens nested data. The first argument is either a number (depth for nested
arrays) or a string (field name whose nested array is extracted and merged with
parent fields).

**Argument forms:**

| Form | Description |
| :--- | :---------- |
| `N` | Flatten nested arrays to depth N |
| `"field"` | Extract nested array at field, merge children with parent |

When flattening by field name, each child object in the nested array is merged
with the parent row (minus the nested field). Scalar children are kept under
the original field name.

```
flatten 1 data
flatten "items" data
```

### unique

Deduplicates rows by one or more fields. The first argument is either a string
(single field) or a list of strings (composite key). The first occurrence of
each unique key is kept.

**Argument forms:**

| Form | Description |
| :--- | :---------- |
| `"field"` | Deduplicate by single field |
| `["a", "b"]` | Deduplicate by composite key |

```
unique "email" data
unique ["dept", "role"] data
```

### format

Formats numeric fields as display strings using Excel-style format patterns
(ECMA-376). The first argument is a record where each key is a field name and
each value is a format pattern string. Non-numeric fields are left unchanged.

**Common format patterns:**

| Pattern | Description | Example input | Example output |
| :------ | :---------- | :------------ | :------------- |
| `"#,##0"` | Thousands separator | `1234` | `"1,234"` |
| `"#,##0.00"` | Two decimals with grouping | `1234.5` | `"1,234.50"` |
| `"$#,##0.00"` | Currency | `1234.5` | `"$1,234.50"` |
| `"0.0%"` | Percentage (multiplies by 100) | `0.125` | `"12.5%"` |
| `"000000"` | Zero-padded | `42` | `"000042"` |
| `"#,##0.00;(#,##0.00)"` | Accounting (negative in parens) | `-1234` | `"(1,234.00)"` |
| `"yyyy-mm-dd"` | Date | date serial | `"2024-03-15"` |

```
format {price: "$#,##0.00"} data
format {rate: "0.0%"} data
format {price: "$#,##0.00", qty: "#,##0"} data
```

## Program Examples

```
fetch "https://jsonplaceholder.typicode.com/users"..
```

```
select ["name", "email"] sort "name" fetch "https://example.com/users.json"..
```

```
take 5 sort {field: "goals", order: "desc"} select ["player.name", "goals"]
  filter {goals: {gt: 10}} get "top_scorers" fetch "https://example.com/stats.json"..
```

```
group {by: "department", count: "headcount", avg: "salary"}
  filter {status: "active"} data..
```
