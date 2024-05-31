import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en el CalendarApi", () => {
  test("debe de tener la configuracion por defecto", () => {
    // Arrange

    const { VITE_APP_URL } = process.env;
    expect(calendarApi.defaults.baseURL).toBe(`${VITE_APP_URL}`);
    // Act
    // Assert
  });

  test("debe de obtener todos los eventos", async () => {
    // Arrange
    const expectedEvents = [
      { id: 1, title: "Evento 1" },
      { id: 2, title: "Evento 2" },
      { id: 3, title: "Evento 3" },
    ];
    jest
      .spyOn(calendarApi, "get")
      .mockResolvedValueOnce({ data: expectedEvents });

    // Act
    const { data } = await calendarApi.get("/event");

    // Assert
    expect(data).toEqual(expectedEvents);
    expect(calendarApi.get).toHaveBeenCalledTimes(1);
    expect(calendarApi.get).toHaveBeenCalledWith("/event");
  });

  test("debe de tener el x-token en los headers", async () => {
    // Arrange
    localStorage.setItem("token", "123456");
    const res = await calendarApi.get("/auth");
    // Act
    // Assert
    expect(res.config.headers["x-token"]).toBe("123456");
  });
});
