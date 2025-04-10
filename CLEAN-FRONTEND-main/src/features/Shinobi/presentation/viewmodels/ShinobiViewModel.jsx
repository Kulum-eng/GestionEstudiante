import { makeAutoObservable, runInAction } from "mobx";
import { ShinobiRepository } from "../../data/repository/ShinobiRepository";
import { CreateShinobiUseCase } from "../../domain/CreateShinobiUseCase";

export class ShinobiViewModel {
  name = "";
  clan = "";
  position = "";
  village = "";
  specialHability = "";
  error = null;
  isValid = false; // Indica si la operación fue exitosa
  shinobis = []; // Lista observable para almacenar los shinobis obtenidos del back
  createShinobiUseCase;

  constructor() {
    makeAutoObservable(this); // Convierte las propiedades y métodos en observables y acciones
    this.createShinobiUseCase = new CreateShinobiUseCase();
  }

  onChangeName(name) {
    this.name = name;
  }

  onChangeClan(clan) {
    this.clan = clan;
  }

  onChangePosition(position) {
    this.position = position;
  }

  onChangeVillage(village) {
    this.village = village;
  }

  onChangeSpecialHability(specialHability) {
    this.specialHability = specialHability;
  }

  async doCreateShinobi() {
    const shinobiData = {
      name: this.name,
      clan: this.clan,
      position: this.position,
      village: this.village,
      special_hability: this.specialHability,
    };

    const data = await this.createShinobiUseCase.execute(shinobiData);
    if (data) {
      this.fetchShinobis(); // Actualiza la lista después de la creación
    }
  }

  async fetchShinobis() {
    try {
      const shinobiRepository = new ShinobiRepository();
      const data = await shinobiRepository.getAll();

      runInAction(() => {
        this.shinobis = data;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || "Error al obtener los Shinobis";
      });
    }
  }
}