import { renderHook, waitFor } from "@testing-library/react";
import { usePizza } from "../../src/hooks/usePizza";
import { describe, expect, it, vi } from "vitest";
import * as listModule from "../../src/api/list";

describe("usePizza", () => {
  describe("when first getting the pizzas", () => {
    it("returns all the pizzas in the api", async () => {
      const mockPizzas = [
        {
          id: "1",
          img: "https://picsum.photos/200",
          name: "Pizza 1",
          price: 10,
        },
      ];

      const mockList = vi.spyOn(listModule, "list");

      mockList.mockImplementation(() => Promise.resolve(mockPizzas));

      const { result } = renderHook(() => usePizza());

      await waitFor(() => result.current.pizzas.length > 0);

      expect(result.current.pizzas).toEqual(mockPizzas);
    });
  });
});
