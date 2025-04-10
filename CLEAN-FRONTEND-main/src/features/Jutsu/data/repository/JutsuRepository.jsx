import { Jutsu } from "../models/Jutsu";
import { JutsuResponse } from "../models/JutsuResponse";

export class JutsuRepository {
    async create(jutsuData) {
        // Valido y creo una instancia del modelo Jutsu
        const jutsu = new Jutsu(
            jutsuData.name,
            jutsuData.jutsu_type,
            jutsuData.nature,
            jutsuData.difficulty_level,
            jutsuData.created_by
        );

        const response = await fetch('http://localhost:8080/v1/jutsus', {
            method: 'POST',
            body: JSON.stringify({
                name: jutsu.name,
                jutsu_type: jutsu.jutsu_type,
                nature: jutsu.nature,
                difficulty_level: jutsu.difficulty_level,
                created_by: jutsu.created_by,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) return null;

        // Uso el modelo de JutsuResponse para crear la respuesta
        const data = await response.json();
        return new JutsuResponse(data);
    }

    async getAll() {
        try {
            const response = await fetch('http://localhost:8080/v1/jutsus', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los jutsus");
            }

            const data = await response.json();

            // Mapear los datos al modelo JutsuResponse
            return data.map((jutsu) => new JutsuResponse(jutsu));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}