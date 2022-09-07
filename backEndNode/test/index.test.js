/*
import request from "supertest";
import Router from "../src/routes/usuarioTerciario.route.js";

describe("POST /agregar-auto", () => {

    const auto_1 = {
        "idServicio":3,
        "placa":"r-342AMrd",
        "modelo":2021,
        "marca":"Toyota",
        "precio":150000
    }
    const auto_2 = {
        "idServicio":null,
        "placa":"r-342AM",
        "modelo":2021,
        "marca":"toyota",
        "precio":150000
    }
    const estudiante_4 = {
        "idServicio":3,
        "placa":"r-342AM",
        "modelo":2021,
        "marca":"toyota",
        "precio":150000
    }


    test("deberia responder codigo de estado 200", async () => {
      const response = await request(Router).post("/agregar-auto").send(auto_1)
      expect(response.statusCode).toBe(200);
    })

    //test("deberia responder codigo de estado 400", async () => {
      //  const response = await request(app).post("/agregar-auto").send(auto_2)
       // expect(response.statusCode).toBe(400);
    //})
  })

  */