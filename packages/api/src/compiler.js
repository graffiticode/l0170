// SPDX-License-Identifier: MIT
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';
import bent from 'bent';
import Decimal from 'decimal.js';
import Papa from 'papaparse';

const getData = bent('string');

// --- Helpers ---

function toPlainObject(val) {
  if (val !== null && typeof val === 'object' && val._type === 'record' && val._entries instanceof Map) {
    const obj = {};
    for (const [k, v] of val._entries) {
      // Keys are encoded as "tag:name" or "str:name"
      const name = k.replace(/^(tag|str|num):/, '');
      obj[name] = toPlainObject(v);
    }
    return obj;
  }
  if (Array.isArray(val)) {
    return val.map(toPlainObject);
  }
  return val;
}

function matchesPredicate(row, predicate) {
  for (const key of Object.keys(predicate)) {
    const condition = predicate[key];
    const value = key.includes('.') ? getByPath(row, key) : row[key];
    if (typeof condition === 'object' && condition !== null && !Array.isArray(condition)) {
      for (const op of Object.keys(condition)) {
        const target = condition[op];
        switch (op) {
          case 'eq':
            if (value != target) return false;
            break;
          case 'ne':
            if (value == target) return false;
            break;
          case 'gt':
            if (!(Number(value) > Number(target))) return false;
            break;
          case 'ge':
            if (!(Number(value) >= Number(target))) return false;
            break;
          case 'lt':
            if (!(Number(value) < Number(target))) return false;
            break;
          case 'le':
            if (!(Number(value) <= Number(target))) return false;
            break;
          case 'contains':
            if (!String(value).includes(String(target))) return false;
            break;
          case 'startsWith':
            if (!String(value).startsWith(String(target))) return false;
            break;
          case 'endsWith':
            if (!String(value).endsWith(String(target))) return false;
            break;
          case 'in':
            if (!Array.isArray(target) || !target.some(t => value == t)) return false;
            break;
          case 'nin':
            if (Array.isArray(target) && target.some(t => value == t)) return false;
            break;
          default:
            break;
        }
      }
    } else {
      if (value != condition) return false;
    }
  }
  return true;
}

function getByPath(obj, path) {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      // Auto-descend into arrays
      return current.flatMap(item => {
        const val = getByPath(item, parts.slice(parts.indexOf(part)).join('.'));
        return val === undefined ? [] : Array.isArray(val) ? val : [val];
      });
    }
    current = current[part];
  }
  return current;
}

function resolveValue(row, val) {
  if (typeof val === 'string' && val in row) {
    return row[val];
  }
  return val;
}

function toDecimal(val) {
  try {
    return new Decimal(val);
  } catch (e) {
    return new Decimal(0);
  }
}

function roundDecimal(d, dp) {
  return dp !== undefined ? d.toFixed(dp) : d.toNumber();
}

// --- Checker ---

export class Checker extends BasisChecker {
  FETCH(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      resume([], node);
    });
  }
  FILTER(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  SELECT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  MUTATE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  GROUP(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  SORT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  TAKE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  JOIN(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  FLATTEN(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  GET(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
  UNIQUE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
}

// --- Transformer ---

export class Transformer extends BasisTransformer {
  FETCH(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      try {
        const url = String(v0).trim();
        const text = await getData(url);
        let obj;
        const tryCSVFirst = url.endsWith('.csv');
        try {
          if (tryCSVFirst) {
            obj = Papa.parse(text, { header: true, dynamicTyping: true }).data;
          } else {
            obj = JSON.parse(text);
          }
        } catch (x) {
          try {
            if (tryCSVFirst) {
              obj = JSON.parse(text);
            } else {
              obj = Papa.parse(text, { header: true, dynamicTyping: true }).data;
            }
          } catch (x2) {
            resume([{ message: `Failed to parse data from ${url}` }], []);
            return;
          }
        }
        resume(e0, obj);
      } catch (err) {
        resume([{ message: `Failed to fetch ${v0}: ${err.message}` }], []);
      }
    });
  }

  FILTER(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const predicate = toPlainObject(v0);
        const data = Array.isArray(v1) ? v1 : [];
        const result = data.filter(row => matchesPredicate(row, predicate));
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  SELECT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const fields = Array.isArray(v0) ? v0.map(toPlainObject) : [toPlainObject(v0)];
        const data = Array.isArray(v1) ? v1 : [];
        const result = data.map(row => {
          const out = {};
          for (const field of fields) {
            if (typeof field === 'string') {
              // Use last segment as output key, getByPath for lookup
              const key = field.includes('.') ? field.split('.').pop() : field;
              out[key] = field.includes('.') ? getByPath(row, field) : row[field];
            } else if (typeof field === 'object' && field.from) {
              const val = field.from.includes('.') ? getByPath(row, field.from) : row[field.from];
              out[field.to || field.from] = val;
            }
          }
          return out;
        });
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  MUTATE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const spec = toPlainObject(v0);
        const data = Array.isArray(v1) ? v1 : [];
        const result = data.map(row => {
          const out = { ...row };
          for (const key of Object.keys(spec)) {
            const expr = spec[key];
            if (typeof expr === 'object' && expr !== null && !Array.isArray(expr)) {
              if (expr.concat) {
                out[key] = expr.concat.map(part => resolveValue(row, part)).join('');
              } else if (expr.add) {
                const vals = expr.add.map(part => toDecimal(resolveValue(row, part)));
                out[key] = roundDecimal(vals.reduce((a, b) => a.plus(b), new Decimal(0)), expr.dp);
              } else if (expr.mul) {
                const vals = expr.mul.map(part => toDecimal(resolveValue(row, part)));
                out[key] = roundDecimal(vals.reduce((a, b) => a.times(b), new Decimal(1)), expr.dp);
              } else {
                out[key] = expr;
              }
            } else {
              out[key] = resolveValue(row, expr);
            }
          }
          return out;
        });
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  GROUP(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const spec = toPlainObject(v0);
        const data = Array.isArray(v1) ? v1 : [];
        const byField = spec.by;
        // Group rows
        const groups = {};
        for (const row of data) {
          const key = row[byField];
          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push(row);
        }
        // Aggregate
        const result = [];
        for (const key of Object.keys(groups)) {
          const rows = groups[key];
          const out = { [byField]: rows[0][byField] };
          for (const aggKey of Object.keys(spec)) {
            if (aggKey === 'by') continue;
            const aggSpec = spec[aggKey];
            // aggSpec is either "fieldName" or {field: "x", as: "y", dp: N}
            let field, alias, dp;
            if (typeof aggSpec === 'string') {
              field = aggSpec;
              alias = aggSpec;
            } else if (typeof aggSpec === 'object' && aggSpec.field) {
              field = aggSpec.field;
              alias = aggSpec.as || field;
              dp = aggSpec.dp;
            } else {
              continue;
            }
            switch (aggKey) {
              case 'count':
                out[typeof aggSpec === 'string' ? aggSpec : alias] = rows.length;
                break;
              case 'sum':
                out[alias] = roundDecimal(rows.reduce((acc, r) => acc.plus(toDecimal(r[field])), new Decimal(0)), dp);
                break;
              case 'avg':
                out[alias] = roundDecimal(rows.reduce((acc, r) => acc.plus(toDecimal(r[field])), new Decimal(0)).dividedBy(rows.length), dp);
                break;
              case 'min':
                out[alias] = roundDecimal(rows.reduce((acc, r) => Decimal.min(acc, toDecimal(r[field])), new Decimal(Infinity)), dp);
                break;
              case 'max':
                out[alias] = roundDecimal(rows.reduce((acc, r) => Decimal.max(acc, toDecimal(r[field])), new Decimal(-Infinity)), dp);
                break;
            }
          }
          result.push(out);
        }
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  SORT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const data = Array.isArray(v1) ? [...v1] : [];
        let field, order;
        if (typeof v0 === 'string') {
          field = v0;
          order = 'asc';
        } else {
          const sortSpec = toPlainObject(v0);
          field = sortSpec.field;
          order = sortSpec.order || 'asc';
        }
        data.sort((a, b) => {
          const av = a[field];
          const bv = b[field];
          let cmp;
          if (typeof av === 'number' && typeof bv === 'number') {
            cmp = av - bv;
          } else {
            cmp = String(av).localeCompare(String(bv));
          }
          return order === 'desc' ? -cmp : cmp;
        });
        resume([].concat(e0).concat(e1), data);
      });
    });
  }

  TAKE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const data = Array.isArray(v1) ? v1 : [];
        const takeSpec = typeof v0 === 'object' ? toPlainObject(v0) : v0;
        let result;
        if (typeof takeSpec === 'number') {
          result = data.slice(0, takeSpec);
        } else if (typeof takeSpec === 'object' && takeSpec.last) {
          result = data.slice(-takeSpec.last);
        } else {
          result = data;
        }
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  JOIN(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const spec = toPlainObject(v0);
        const left = Array.isArray(v1) ? v1 : [];
        const right = Array.isArray(spec.right) ? spec.right : [];
        const onField = spec.on;
        // Index right side by key
        const index = {};
        for (const row of right) {
          const key = row[onField];
          if (!index[key]) {
            index[key] = [];
          }
          index[key].push(row);
        }
        // Left join
        const result = [];
        for (const row of left) {
          const matches = index[row[onField]];
          if (matches) {
            for (const match of matches) {
              result.push({ ...row, ...match });
            }
          } else {
            result.push({ ...row });
          }
        }
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  FLATTEN(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const data = Array.isArray(v1) ? v1 : [];
        let result;
        if (typeof v0 === 'number') {
          // Flatten nested arrays to depth
          result = data.flat(v0);
        } else if (typeof v0 === 'string') {
          // Flatten by extracting nested array at path
          const path = v0;
          result = [];
          for (const row of data) {
            const nested = row[path];
            if (Array.isArray(nested)) {
              for (const child of nested) {
                const parent = { ...row };
                delete parent[path];
                if (typeof child === 'object' && child !== null) {
                  result.push({ ...parent, ...child });
                } else {
                  result.push({ ...parent, [path]: child });
                }
              }
            } else {
              result.push(row);
            }
          }
        } else {
          result = data;
        }
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  GET(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const path = String(v0);
        const result = getByPath(v1, path);
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  UNIQUE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const fields = Array.isArray(v0) ? v0 : [v0];
        const data = Array.isArray(v1) ? v1 : [];
        const seen = new Set();
        const result = [];
        for (const row of data) {
          const key = JSON.stringify(fields.map(f => row[f]));
          if (!seen.has(key)) {
            seen.add(key);
            result.push(row);
          }
        }
        resume([].concat(e0).concat(e1), result);
      });
    });
  }

  PROG(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = e0;
      const val = v0.pop();
      resume(err, {
        ...data,
        result: val,
      });
    });
  }
}

export const compiler = new BasisCompiler({
  langID: '0170',
  version: 'v0.1.0',
  Checker: Checker,
  Transformer: Transformer,
});
