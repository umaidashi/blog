import { describe, expect, it } from "bun:test";
import { DIContainer } from "./container";

class Foo {
  constructor(public value: number) {}
}

class Bar {
  constructor(public value: string) {}
}

describe("DIContainer", () => {
  it("register stores an instance", () => {
    const container = new DIContainer<{ foo: Foo }>();
    container.register("foo", Foo, 123);
    const instance = container.get("foo");
    expect(instance).toBeInstanceOf(Foo);
    expect(instance.value).toBe(123);
    expect(container.get("foo")).toBe(instance);
  });

  it("get throws when dependency is not registered", () => {
    const container = new DIContainer<{ bar: Bar }>();
    expect(() => container.get("bar")).toThrow();
  });
});
