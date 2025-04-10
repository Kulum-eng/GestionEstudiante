import { Shinobi } from "../data/models/Shinobi";
import { ShinobiResponse } from "../data/models/ShinobiResponse";
import { ShinobiRepository } from "../data/repository/ShinobiRepository";

export class CreateShinobiUseCase {
    shinobiRepository;

    constructor() {
        this.shinobiRepository = new ShinobiRepository();
    }

    async execute(shinobiData) {
        // Crea un Shinobi a partir del modelo Shinobi
        const shinobi = new Shinobi(
            shinobiData.name,
            shinobiData.clan,
            shinobiData.position,
            shinobiData.village,
            shinobiData.special_hability
        );

        // Llamar al repositorio para crear el Shinobi
        const response = await this.shinobiRepository.create(shinobi);

        let data = null;
        if (response != null) {
            // Mapear la respuesta al modelo de ShinobiResponse
            data = new ShinobiResponse(response);
        }

        console.log("Use Case: " + JSON.stringify(data));
        return data;
    }
}