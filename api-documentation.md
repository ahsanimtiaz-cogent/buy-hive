# Get Product API

Base path: `/api/products` (mounted in [app.js](../src/app.js#L11))

Handlers live in [product.controller.js](../src/controllers/product.controller.js), routes in [product.routes.js](../src/routes/product.routes.js).

---

## 1. List products

`GET /api/products`

Returns all products, optionally narrowed by query filters. All filters are optional and combine with AND.

### Query parameters

| Param                | Type                     | Matching                                  | Notes                                                                          |
| -------------------- | ------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------ |
| `category`           | string                   | exact on `categoryName`                   | case-sensitive                                                                 |
| `price`              | string                   | exact on `price`                          | `price` is stored as a String, so this is a string equality match, not a range |
| `moq`                | number                   | `minimumOrderQuantity >= moq`             | value is cast with `Number()`                                                  |
| `productCertificate` | string                   | `certificates` array contains value       | exact element match                                                            |
| `manufacturer`       | string                   | regex on `supplierName`, case-insensitive | substring match                                                                |
| `availableInUs`      | `"true"` / anything else | `stockInUSA === (value === "true")`       | any value other than `"true"` filters for `false`                              |

### Examples

```
GET /api/products
GET /api/products?category=Electronics
GET /api/products?moq=100&availableInUs=true
GET /api/products?manufacturer=acme&productCertificate=ISO9001
```

### Responses

**200 OK** — array of product documents (empty array when nothing matches):

```json
[
  {
    "_id": "665f1c2a9b1e4a0012ab34cd",
    "productName": "Wireless Mouse",
    "shortDescription": "Ergonomic 2.4GHz mouse",
    "displayMOQ": "100 pcs",
    "minimumOrderQuantity": 100,
    "price": "12.50",
    "categoryName": "Electronics",
    "country": "China",
    "stockInUSA": true,
    "images": ["https://.../mouse.jpg"],
    "certificates": ["ISO9001"],
    "supplierName": "Acme Manufacturing",
    "createdAt": "2026-07-01T10:00:00.000Z",
    "updatedAt": "2026-07-01T10:00:00.000Z",
    "__v": 0
  }
]
```

**500 Internal Server Error**

```json
{ "message": "<error message>" }
```

---

## 2. Get a single product

`GET /api/products/:id`

`:id` is the Mongo `_id` (ObjectId string).

### Responses

| Status | Body                                                                                 |
| ------ | ------------------------------------------------------------------------------------ |
| 200    | the product document (single object)                                                 |
| 404    | `{ "message": "Product not found" }`                                                 |
| 500    | `{ "message": "<error message>" }` — includes malformed `:id` (Mongoose `CastError`) |

---

## Product fields

From [Product.js](../src/models/Product.js):

| Field                     | Type             | Required | Default |
| ------------------------- | ---------------- | -------- | ------- |
| `productName`             | String (trimmed) | yes      | —       |
| `shortDescription`        | String           | no       | `""`    |
| `displayMOQ`              | String           | yes      | —       |
| `minimumOrderQuantity`    | Number           | yes      | —       |
| `price`                   | String           | yes      | —       |
| `categoryName`            | String           | yes      | —       |
| `country`                 | String           | yes      | —       |
| `stockInUSA`              | Boolean          | no       | `false` |
| `images`                  | [String]         | no       | `[]`    |
| `certificates`            | [String]         | no       | `[]`    |
| `supplierName`            | String           | yes      | —       |
| `createdAt` / `updatedAt` | Date             | auto     | —       |

---

## Review notes / known gaps

1. **`price` cannot be range-filtered.** The schema stores `price` as a String, so `?price=12.50` is exact string equality — `"12.5"` will not match `"12.50"`. If price filtering matters, change the field to `Number` and support `minPrice` / `maxPrice`.
2. **`moq` semantics.** The filter is `minimumOrderQuantity >= moq`. If the intent is "show me products I can order at my quantity", the comparison should be `$lte`. Also, a non-numeric `moq` becomes `NaN` and silently matches nothing.
3. **`availableInUs` is not a tri-state.** `?availableInUs=false`, `?availableInUs=0`, and `?availableInUs=banana` all filter for `false`. Only a completely absent param disables the filter.
4. **No pagination, sorting, or field selection.** `Product.find(filter)` returns the whole collection. Add `limit` / `page` / `sort` before the dataset grows.
5. **Invalid `:id` returns 500, not 400.** A malformed ObjectId throws a `CastError` that falls into the generic 500 handler. Worth catching and returning 400 (or 404).
6. **Unescaped regex in `manufacturer`.** The value goes straight into `$regex`, so input like `.*` or `(` is treated as a pattern — the latter throws and surfaces as a 500. Escape the input.
7. **Raw error messages are returned to clients.** `error.message` in the 500 body can leak internals; prefer a generic message plus server-side logging.
8. **Inconsistent status usage.** `getProducts` uses `res.status(200).json(...)` while `getProduct` uses `res.json(...)` — same result, but worth making uniform.
