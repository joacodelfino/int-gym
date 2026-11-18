import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;
  let member2: Member;

  beforeEach(() => {
    // Reiniciamos la lista y los socios antes de cada test para aislar los cambios.
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
      // Pasamos 0 (sin descuento) porque el constructor valida este dato.
      // Si lo omitimos, recibe undefined y el beforeEach falla antes de cada test.
      discount: 0,
    });
    member2 = new Member({
      name: "Ana Pérez",
      documentId: "222",
      plan: "full",
      monthlyFee: 1,
      // Usamos otro documento para poder agregar ambos socios y un descuento del 10 %.
      discount: 10,
    });
  });

  test("Create an empty member list", () => {
    // Crear los socios en beforeEach no los agrega automáticamente a la lista.
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    // Verificamos que la lista contenga el socio luego de agregarlo.
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    // La segunda inserción debe fallar; va dentro del expect para capturar el error.
    // Este caso reutiliza el mismo objeto; también conviene probar otro con igual documento.
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    // Con un único socio, el total sin descuentos coincide con su cuota.
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });
  test("total discount", () => {
    list.add(member);
    list.add(member2);
    // El resultado correcto es 1500 + (1 - 1 * 10 / 100) = 1500.9.
    // Para otros cálculos decimales, toBeCloseTo permite tolerar diferencias de precisión.
    expect(list.totalDiscounted()).toBe(1500.9)
  })

  test("update fee of a member", () => {
    // El socio buscado queda segundo para comprobar que la búsqueda avance en la lista.
    list.add(member2);
    list.add(member);

    // Esto verifica el retorno; falta comprobar member.monthlyFee para asegurar el cambio.
    // También conviene verificar que member2 conserve su cuota y que se rechace una inválida.
    expect(list.updateFee("12345678", 20)).toEqual(20);
  });

  test("update fee of a member", () => {
    // La lista está vacía: el documento no existe y la actualización debe lanzar un error.
    // Este test podría llamarse "reject update for a missing member" para distinguirlo.
    expect(() => {list.updateFee("2233232", 20)}).toThrow();
  });
});
