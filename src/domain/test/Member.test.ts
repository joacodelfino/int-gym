import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import type { Plan } from "../Member.ts";

describe("Member", () => {
  let member: Member;
  let member2: Member;

  beforeEach(() => {
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
      discount: 20,
    });
    member2 = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
      discount: 0,
    });

  });

  test("store name", () => {
    expect(member.name).toBe("Ana Pérez");
  });

  test("store document id", () => {
    expect(member.documentId).toBe("12345678");
  });

  test("store plan", () => {
    expect(member.plan).toBe("full");
  });

  test("store monthly fee", () => {
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject an empty name", () => {
    expect(() => (member.name = "   ")).toThrow();
  });

  test("reject a document id with letters", () => {
    expect(() => (member.documentId = "12a45")).toThrow();
  });

  test("reject a monthly fee of zero", () => {
    expect(() => (member.monthlyFee = 0)).toThrow();
  });

  test("reject an invalid plan", () => {
    expect(() => (member.plan = "gold" as Plan)).toThrow();
  });

  test("reject a monthly fee that is not a number", () => {
    expect(() => (member.monthlyFee = Number.NaN)).toThrow();
  });

  test("show the member as text", () => {
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500 - Descuento 20",
    );
  });
  test("get discount", () => {
    expect(member.discount).toBe(20);
  });

  test("bad discount number", () => {
    // Asignar -1 llama al setter, que debe rechazarlo; leer discount llama al getter.
    // La asignación va dentro de la función para que toThrow capture el error.
    // Si la hacemos antes del expect, el error interrumpe el test sin comprobarlo.
    expect(() => (member2.discount = -1)).toThrow("Ingrese un número válido");
    // El setter debe validar antes de guardar: al rechazar -1, conserva el 0 anterior.
    expect(member2.discount).toBe(0);
  });
  test("show the member as text", () => {
    member.discount = 0;
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500",
    );
  });
});
