import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../auth.ts", () => ({
  default: {
    getState: vi.fn(() => ({ token: "test-token" })),
  },
}));

vi.mock("../../plugins/interceptor.ts", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

import axiosInstance from "../../plugins/interceptor.ts";
import useEventStore from "../events.ts";

describe("events store (ticket module)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useEventStore.setState({
      events: [],
      savedEvents: [],
      venues: [],
      attractions: [],
      error: null,
      loading: false,
      links: {
        first: { href: "" },
        self: { href: "" },
        next: { href: "" },
        last: { href: "" },
      },
    } as any);
  });

  it("fetches events successfully and updates store", async () => {
    const mockedAxios = vi.mocked(axiosInstance);
    const apiEvents = [{ id: "1", name: "Concert" }];

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _embedded: { events: apiEvents },
        _links: {
          first: { href: "first" },
          self: { href: "self" },
          next: { href: "next" },
          last: { href: "last" },
        },
      },
    } as any);

    await useEventStore.getState().getEventsAction();

    const state = useEventStore.getState();
    expect(state.events).toEqual(apiEvents);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.links.self.href).toBe("self");
  });

  it("sets error when events response is empty", async () => {
    const mockedAxios = vi.mocked(axiosInstance);

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _embedded: { events: [] },
      },
    } as any);

    await useEventStore.getState().getEventsAction();

    const state = useEventStore.getState();
    expect(state.error).toBe("No events found");
    expect(state.loading).toBe(false);
  });

  it("sends auth header and appends event on saveEvent success", async () => {
    const mockedAxios = vi.mocked(axiosInstance);
    const payloadEvent = { id: "evt-1", name: "Rock Show" } as any;

    mockedAxios.post.mockResolvedValueOnce({
      data: payloadEvent,
    } as any);

    useEventStore.getState().saveEvent(payloadEvent);
    await Promise.resolve();
    await Promise.resolve();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/events",
      payloadEvent,
      {
        headers: {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
      }
    );

    expect(useEventStore.getState().events).toEqual([payloadEvent]);
  });
});
