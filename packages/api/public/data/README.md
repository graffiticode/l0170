# L0170 sample data

Stable datasets used by the L0170 spec, examples, and training prompts.
Served at `https://l0170.graffiticode.org/data/<file>`. Files here are
versioned with the repo, so example URLs don't break or change when a
third-party service changes.

## Mirrors of public datasets (snapshot 2026-09-21)

| File | Source | License |
|------|--------|---------|
| `users.json`, `posts.json`, `comments.json`, `todos.json`, `albums.json`, `photos.json` | https://jsonplaceholder.typicode.com | MIT (typicode/jsonplaceholder) |
| `products.json` | https://dummyjson.com/products?limit=0 (all 194 products; same `{products, total, skip, limit}` shape) | MIT (Ovi/DummyJSON) |
| `iris.csv` | https://github.com/mwaskom/seaborn-data (Fisher's Iris data) | Public domain |
| `earthquakes.json` | https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=20 | Public domain (USGS) |

The data is unchanged. Image URLs inside the records (such as `photos.json`
`url`/`thumbnailUrl`) point to the original hosts and may no longer resolve.

## Original synthetic datasets (CC BY 4.0)

| File | Shape |
|------|-------|
| `people.json` | array of `{id, name, first, last, age, email, department, salary, score, address: {street, city, zip}}` |
| `customers.csv` | `customerId, name, email, city` |
| `orders.csv` | `orderId, customerId, date, category, quantity, price, total` (joins to `customers.csv` on `customerId`) |
| `nested.json` | `{results: {count, users: [{id, name, orders: [{orderId, date, total}]}]}}`; one order is duplicated on purpose, for `unique` |
| `stats.json` | `{season, league, top_scorers: [{rank, player: {name, team}, goals, matches}]}`; fictional players |
| `api.json` | `{status, results: {total, items: [...]}, users: [...]}` |
