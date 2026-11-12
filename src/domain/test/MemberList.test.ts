import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total with discount", () => {
    member.discount = 10;
    list.add(member);
    expect(list.totalDiscounted()).toBe(1350);
  });

  test("update fee and not exists the member", () => {
    expect(() => list.updateFee("999999", 10)).toThrow();
  });

  test("update a member fee", () => {
    list.add(member);
    list.updateFee(member.documentId, 2000);
    expect(member.monthlyFee).toBe(2000);
  });

  test("total discounted in a empty list", () => {
    expect(list.totalDiscounted()).toBe(0);
  });
  test("total fee without discount", () => {
    list.add(member);

    expect(list.totalDiscounted()).toBe(1500);
  });
});
