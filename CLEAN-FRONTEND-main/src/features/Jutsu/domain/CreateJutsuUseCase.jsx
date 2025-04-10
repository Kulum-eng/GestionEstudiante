import { Jutsu } from "../data/models/Jutsu";
import { JutsuResponse } from "../data/models/JutsuResponse";
import { JutsuRepository } from "../data/repository/JutsuRepository";

export class CreateJutsuUseCase {
    jutsuRepository;

    constructor() {
        this.jutsuRepository = new JutsuRepository();
    }

    async execute(jutsuData) {
        // Se crea un Jutsu a partir del modelo Jutsu
        const jutsu = new Jutsu(
            jutsuData.name,
            jutsuData.jutsu_type,
            jutsuData.nature,
            jutsuData.difficulty_level,
            jutsuData.created_by
        );

        // Llamar al repositorio para crear el Jutsu
        const response = await this.jutsuRepository.create(jutsu);

        let data = null;
        if (response != null) {
            // Mapear la respuesta al modelo de JutsuResponse
            data = new JutsuResponse(response);
        }

        console.log("Use Case: " + JSON.stringify(data));
        return data;
    }
}