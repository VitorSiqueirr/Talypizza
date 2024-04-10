import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AlertProvider } from "../../src/contexts/provider/AlertProvider";
import { renderHook } from "@testing-library/react";
import { useAlert } from "../../src/hooks/useAlert";
import React from "react";
import { act } from "react-dom/test-utils";

const Setup = () => {
  const wrapper = ({ children }) => {
    return <AlertProvider>{children}</AlertProvider>;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { result } = renderHook(() => useAlert(), { wrapper });
  return result;
};

describe("useAlert", () => {
  describe("when not use within a EntriesProvider", () => {
    let originalError;

    beforeEach(() => {
      originalError = console.error;
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalError;
    });

    it("throw an error", () => {
      expect(() => {
        renderHook(() => useAlert());
      }).toThrow("useAlert must be used within a AlertProvider");
    });
  });

  it("starting with default entries", () => {
    const result = Setup();
    expect.soft(result.current.alertMessage()).toEqual("");
    expect.soft(result.current.showAlert()).toEqual(false);
  });

  describe("when using defineAlert", () => {
    it("changes the showAlert to true and add a alert message", () => {
      const result = Setup();
      const message = "This is a test message";

      expect.soft(result.current.alertMessage()).toEqual("");
      expect.soft(result.current.showAlert()).toEqual(false);

      act(() => {
        result.current.defineAlert(message);
      });

      expect.soft(result.current.alertMessage()).toEqual(message);
      expect.soft(result.current.showAlert()).toEqual(true);
    });
  });

  describe("when using removeAlert", () => {
    it("changes the showAlert to true and add a alert message", () => {
      const result = Setup();
      const message = "This is a test message";

      act(() => {
        result.current.defineAlert(message);
      });

      expect.soft(result.current.alertMessage()).toEqual(message);
      expect.soft(result.current.showAlert()).toEqual(true);

      act(() => {
        result.current.removeAlert();
      });

      expect.soft(result.current.alertMessage()).toEqual("");
      expect.soft(result.current.showAlert()).toEqual(false);
    });
  });
});
