import type { Member } from "./Member.ts";

export class MemberList {
  // Cada lista mantiene su propio arreglo privado de socios.
  #items: Member[] = [];

  add(item: Member): void {
    // some devuelve true si algún socio ya tiene el documento que queremos agregar.
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    // Solo agregamos el socio después de descartar el documento duplicado.
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): number {
    // Buscamos por documento; los socios anteriores al buscado se saltean.
    for (const member of this.#items) {
      if (member.documentId === _documentId) {
        // La asignación llama al setter de Member, que valida la nueva cuota.
        // Si es inválida, el setter lanza el error y no llegamos al return.
        member.monthlyFee = _fee;
        // Al encontrarlo, devolvemos la cuota y terminamos la búsqueda.
        return _fee;
      }
    }
    // Llegamos acá únicamente si recorrimos toda la lista sin encontrarlo.
    throw new Error("No existe cliente con esa cedula");
  }

  getItems(): readonly Member[] {
    // Copiamos el arreglo para no exponer el original; los objetos Member se comparten.
    return [...this.#items];
  }

  totalFees(): number {
    // Acumulamos las cuotas sin descuentos; el 0 también permite sumar una lista vacía.
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    // Acumulamos lo que debe pagar cada socio después de su descuento.
    // Dividimos discount entre 100 para convertir el porcentaje en una proporción.
    // La fórmula correcta es cuota - (cuota * descuento / 100).
    let total: number = 0;
    for (let i = 0; i < this.#items.length; i++) {
      // Una cuota de 1 con descuento del 10 % aporta 0.9 al total.
      total +=
        this.#items[i].monthlyFee -
        (this.#items[i].monthlyFee * this.#items[i].discount) / 100;
    }
    return total;
  }
}
