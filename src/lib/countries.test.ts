import { test } from "node:test";
import assert from "node:assert/strict";
import { countryOptions } from "./countries.ts";

test("países: Costa Rica primero y el resto en orden alfabético del idioma", () => {
  for (const lang of ["es", "en"] as const) {
    const opciones = countryOptions(lang);
    assert.equal(opciones[0].value, "Costa Rica");
    const resto = opciones.slice(1).map((p) => p.label);
    assert.deepEqual(resto, [...resto].sort((a, b) => a.localeCompare(b, lang)));
  }
});

test("países: la etiqueta va en el idioma y el valor siempre en español", () => {
  const en = countryOptions("en");
  assert.deepEqual(
    en.find((p) => p.label === "Germany"),
    { value: "Alemania", label: "Germany" },
  );
});

test("países: ningún código queda sin nombre ni repetido", () => {
  const es = countryOptions("es");
  assert.ok(es.length > 200);
  // Un código que Intl no conoce vuelve tal cual, con dos letras.
  assert.deepEqual(es.filter((p) => p.label.length <= 2 || p.value.length <= 2), []);
  assert.equal(new Set(es.map((p) => p.value)).size, es.length);
});
