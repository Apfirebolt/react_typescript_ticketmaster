import axios from "axios";
import { toast } from "react-toastify";
import { describe, it, expect, beforeEach, vi } from "vitest";

const storage = new Map<string, string>();

Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (key: string) => (storage.has(key) ? storage.get(key)! : null),
    setItem: (key: string, value: string) => {
      storage.set(key, String(value));
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
    clear: () => {
      storage.clear();
    },
  },
  configurable: true,
});

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("auth store", () => {
  let useAuthStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    if (!useAuthStore) {
      return;
    }

    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  });

  it("loads auth store", async () => {
    const module = await import("../auth.ts");
    useAuthStore = module.default;
    expect(useAuthStore).toBeDefined();
  });

  it("logs in successfully and stores user/token", async () => {
    if (!useAuthStore) {
      const module = await import("../auth.ts");
      useAuthStore = module.default;
    }

    const mockedAxios = vi.mocked(axios);
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        user: { id: 1, email: "demo@example.com" },
        access_token: "token-123",
      },
    } as any);

    await useAuthStore.getState().login("demo@example.com", "password");

    const state = useAuthStore.getState();
    expect(state.user).toEqual({ id: 1, email: "demo@example.com" });
    expect(state.token).toBe("token-123");
    expect(localStorage.getItem("token")).toBe("token-123");
    expect(localStorage.getItem("user")).toContain("demo@example.com");
    expect(toast.success).toHaveBeenCalled();
  });

  it("throws backend credential error message on failed login", async () => {
    if (!useAuthStore) {
      const module = await import("../auth.ts");
      useAuthStore = module.default;
    }

    const mockedAxios = vi.mocked(axios);
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: { message: "Invalid credentials" },
      },
    });

    await expect(
      useAuthStore.getState().login("demo@example.com", "wrong-pass")
    ).rejects.toThrow("Invalid credentials");

    expect(useAuthStore.getState().error).toBe("Invalid credentials");
  });

  it("uses timeout message when login request times out", async () => {
    if (!useAuthStore) {
      const module = await import("../auth.ts");
      useAuthStore = module.default;
    }

    const mockedAxios = vi.mocked(axios);
    mockedAxios.post.mockRejectedValueOnce({ code: "ECONNABORTED" });

    await expect(
      useAuthStore.getState().login("demo@example.com", "password")
    ).rejects.toThrow("Login request timed out. Please try again.");

    expect(useAuthStore.getState().error).toBe(
      "Login request timed out. Please try again."
    );
  });

  it("clears auth state and localStorage on logout", () => {
    if (!useAuthStore) {
      throw new Error("Auth store not loaded");
    }

    localStorage.setItem("user", JSON.stringify({ id: 1 }));
    localStorage.setItem("token", "token-abc");

    useAuthStore.setState({
      user: { id: 1 },
      token: "token-abc",
      loading: false,
      error: null,
    });

    useAuthStore.getState().logout();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(toast.success).toHaveBeenCalled();
  });
});
