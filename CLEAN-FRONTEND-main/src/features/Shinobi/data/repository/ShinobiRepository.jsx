import { Shinobi } from "../models/Shinobi";
import { ShinobiResponse } from "../models/ShinobiResponse";

export class ShinobiRepository {
  async create(shinobiData) {
    const shinobi = new Shinobi(
      shinobiData.name,
      shinobiData.clan,
      shinobiData.position,
      shinobiData.village,
      shinobiData.special_hability
    );

    const response = await fetch("http://localhost:8080/v1/shinobis", {
      method: "POST",
      body: JSON.stringify({
        name: shinobi.name,
        clan: shinobi.clan,
        position: shinobi.position,
        village: shinobi.village,
        special_hability: shinobi.special_hability,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return new ShinobiResponse(data);
  }

  async getAll() {
    try {
      const response = await fetch("http://localhost:8080/v1/shinobis", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los shinobis");
      }

      const data = await response.json();

      return data.map(
        (shinobi) =>
          new ShinobiResponse({
            id: shinobi.id,
            name: shinobi.name,
            clan: shinobi.clan,
            position: shinobi.position,
            village: shinobi.village,
            special_hability: shinobi.special_hability,
          })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
