export type Plan = "basic" | "full" | "premium";

export const PLAN_LABELS: Record<Plan, string> = {
  basic: "Básico",
  full: "Completo",
  premium: "Premium",
};

export type MemberData = {
  name: string;
  documentId: string;
  plan: Plan;
  monthlyFee: number;
};

export class Member {
  private _name: string = "";
  private _documentId: string = "";
  private _plan: Plan = "basic";
  private _monthlyFee: number = 0;
  private _discount: number = 0;

  constructor(data: MemberData) {
    this.name = data.name;
    this.documentId = data.documentId;
    this.plan = data.plan;
    this.monthlyFee = data.monthlyFee;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error("El nombre no puede estar vacío.");
    }
    this._name = trimmed;
  }

  get documentId(): string {
    return this._documentId;
  }

  set documentId(value: string) {
    const trimmed = value.trim();
    if (!/^\d+$/.test(trimmed)) {
      throw new Error("El documento debe contener solo dígitos.");
    }
    this._documentId = trimmed;
  }

  get plan(): Plan {
    return this._plan;
  }

  set plan(value: Plan) {
    if (!Object.hasOwn(PLAN_LABELS, value)) {
      throw new Error("Debe seleccionar un plan válido.");
    }
    this._plan = value;
  }

  get monthlyFee(): number {
    return this._monthlyFee;
  }

  set monthlyFee(value: number) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error("La cuota mensual debe ser mayor que 0.");
    }
    this._monthlyFee = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      throw new Error("El descuento debe ser un entero entre 0 y 100.");
    }
    this._discount = value;
  }

  toString(): string {
    const discount = this.discount > 0 ? ` - ${this.discount}%` : "";

    return `${this.name} (doc. ${this.documentId}) - Plan ${PLAN_LABELS[this.plan]} - $${this.monthlyFee}${discount}`;
  }
}
