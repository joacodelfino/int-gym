import { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    // TODO: cambiar la cuota del socio con ese documento
    for (const member of this.#items) {
      if (member.documentId === _documentId) {
        member.monthlyFee = _fee;
        return;
      }
    }
    throw new Error("No existe un socio con ese documento.");
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    let total: number = 0;
    for (const member of this.#items) {
      if (member.discount > 0) {
        total +=
          member.monthlyFee - (member.discount / 100) * member.monthlyFee;
      } else {
        total += member.monthlyFee;
      }
    }
    return total;
  }
}
