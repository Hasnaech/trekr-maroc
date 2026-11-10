/**
 * Test du moteur sur toutes les paires. Lancer : npm test
 * Verifie les deux bugs de l'audit du 4 septembre 2026 :
 * chronologie des correspondances et comparaison carbone.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { allRoutePairs, findRoute, crowKm } from "../lib/router.ts";
import { STATIONS, COORDS } from "../lib/network.ts";

const toMin = (t: string) => {
  const m = /^\+(\d+)h(\d\d)$/.exec(t);
  assert.ok(m, `format de temps inattendu : ${t}`);
  return Number(m[1]) * 60 + Number(m[2]);
};

test("chaque gare a des coordonnees", () => {
  for (const key of Object.keys(STATIONS)) assert.ok(COORDS[key], key);
});

test("132 paires, toutes avec un itineraire", () => {
  assert.equal(allRoutePairs().length, 132);
});

test("le temps ne recule jamais et finit a la duree totale", () => {
  for (const { origin, destination } of allRoutePairs()) {
    const trip = findRoute(origin, destination)!;
    const times = trip.legs.flatMap((l) => l.stops.map((s) => toMin(s.time)));
    for (let i = 1; i < times.length; i++) assert.ok(times[i] >= times[i - 1], `${origin}-${destination}`);
    assert.equal(times[0], 0);
    assert.equal(times.at(-1), trip.totalMin, `${origin}-${destination}`);
  }
});

test("une correspondance laisse au moins 25 min", () => {
  const trip = findRoute("marrakech", "tanger")!;
  assert.equal(trip.legs.length, 2);
  const arrive = toMin(trip.legs[0].stops.at(-1)!.time);
  const depart = toMin(trip.legs[1].stops[0].time);
  assert.ok(depart - arrive >= 25);
});

test("voiture et avion ne sont pas compares sur les km du rail", () => {
  const trip = findRoute("tanger", "oujda")!;
  const crow = crowKm("tanger", "oujda");
  assert.ok(crow > 330 && crow < 400, `vol d'oiseau Tanger-Oujda : ${crow}`);
  assert.ok(trip.totalDistanceKm > 900);
  assert.ok(trip.carbon.carKg < 120, `voiture : ${trip.carbon.carKg}`);
  assert.equal(trip.carbon.planeKg, null);
});

test("origine = destination ou gare inconnue : null", () => {
  assert.equal(findRoute("casa", "casa"), null);
  assert.equal(findRoute("casa", "paris"), null);
});
