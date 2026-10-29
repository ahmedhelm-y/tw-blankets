import { describe, expect, it } from "vitest";
import { CITIES, dims, levelFor, pickByValue, piecesTotal, quizResult } from "../src/utils/bedding";
import { careIcon, CARE, pieceIcon, PIECES } from "../src/utils/icons";
import { topicsOf } from "../src/utils/reviews";

const comforter = {
  id: 9,
  options: [
    { id: 1, name: "الوزن", details: [{ id: 11, name: "خفيف" }, { id: 12, name: "متوسط" }, { id: 13, name: "ثقيل", is_out: true }] },
    { id: 2, name: "المقاس", details: [{ id: 21, name: "مفرد 160×220" }, { id: 22, name: "كينج 240×260" }] },
  ],
};

describe("pickByValue", () => {
  it("finds the option value by its name, in any option", () => {
    expect(pickByValue(comforter, "متوسط")).toEqual({ 1: 12 });
    expect(pickByValue(comforter, "كينج")).toEqual({ 2: 22 });
  });
  it("skips sold out values and empty text", () => {
    expect(pickByValue(comforter, "ثقيل")).toEqual({});
    expect(pickByValue(comforter, "")).toEqual({});
    expect(pickByValue(null, "خفيف")).toEqual({});
  });
});

describe("city warmth", () => {
  it("suggests heavy for cold nights and light for warm ones", () => {
    expect(levelFor(3)).toBe(3);
    expect(levelFor(6)).toBe(3);
    expect(levelFor(9)).toBe(2);
    expect(levelFor(19)).toBe(1);
    expect(levelFor(10, 6, 10)).toBe(1);
  });
  it("ships a city table with a night low for each city", () => {
    expect(CITIES.length).toBeGreaterThan(10);
    expect(CITIES.every((c) => c.name.ar && c.name.en && Number.isFinite(c.night))).toBe(true);
    expect(levelFor(CITIES.find((c) => c.name.en === "Tabuk")!.night)).toBe(3);
    expect(levelFor(CITIES.find((c) => c.name.en === "Jeddah")!.night)).toBe(1);
  });
});

describe("quizResult", () => {
  it("takes the result most answers point to", () => {
    expect(quizResult([0, 2, 2])).toBe(2);
    expect(quizResult([1, 1, 0])).toBe(1);
  });
  it("breaks a tie toward the later, warmer result and ignores bad votes", () => {
    expect(quizResult([0, 1])).toBe(1);
    expect(quizResult([0, 7, -1])).toBe(0);
    expect(quizResult([])).toBe(2);
  });
});

describe("sizes and pieces", () => {
  it("reads width and length in any digits and order", () => {
    expect(dims("240×260 سم")).toEqual({ w: 240, l: 260 });
    expect(dims("٢٦٠ * ٢٤٠")).toEqual({ w: 240, l: 260 });
    expect(dims("كينج")).toBeNull();
  });
  it("counts the pieces of a set", () => {
    expect(piecesTotal([{ count: 1 }, { count: 4 }, { count: 2.4 }, { count: -1 }])).toBe(7);
  });
});

describe("icons and topics", () => {
  it("has an icon for every piece and care symbol, and none for an unknown symbol", () => {
    for (const key of Object.keys(PIECES)) expect(pieceIcon(key)).toBeTruthy();
    for (const key of Object.keys(CARE)) expect(careIcon(key)).toBeTruthy();
    expect(careIcon("nope")).toBeNull();
  });
  it("splits review topics on Arabic or Latin commas", () => {
    expect(topicsOf("الدفء، النعومة,الدفء\nالمقاس")).toEqual(["الدفء", "النعومة", "المقاس"]);
    expect(topicsOf("")).toEqual([]);
  });
});
