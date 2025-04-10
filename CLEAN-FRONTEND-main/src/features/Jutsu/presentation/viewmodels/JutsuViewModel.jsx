import { makeAutoObservable, runInAction } from "mobx";
import { Jutsu } from "../../data/models/Jutsu";
import { CreateJutsuUseCase } from "../../domain/CreateJutsuUseCase";
import { JutsuRepository } from "../../data/repository/JutsuRepository";

export class JutsuViewModel {
  name = "";
  jutsuType = "";
  nature = "";
  difficultyLevel = "";
  createdBy = "";
  error = null;
  isValid = false; // Indica si la operación fue exitosa
  jutsus = []; // Lista observable para almacenar los jutsus obtenidos del back
  createJutsuUseCase;
  jutsuRepository;

  constructor() {
    makeAutoObservable(this); // Convierte las propiedades y métodos en observables y acciones
    this.createJutsuUseCase = new CreateJutsuUseCase();
    this.jutsuRepository = new JutsuRepository();
  }

  onChangeName(name) {
    this.name = name;
  }

  onChangeJutsuType(jutsuType) {
    this.jutsuType = jutsuType;
  }

  onChangeNature(nature) {
    this.nature = nature;
  }

  onChangeDifficultyLevel(difficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }

  onChangeCreatedBy(createdBy) {
    this.createdBy = createdBy;
  }

  async doCreateJutsu() {
    this.error = null;

    if (this.name && this.jutsuType && this.nature && this.difficultyLevel && this.createdBy) {
      const jutsu = new Jutsu(
        this.name,
        this.jutsuType,
        this.nature,
        this.difficultyLevel,
        this.createdBy
      );

      try {
        const data = await this.createJutsuUseCase.execute(jutsu);
        console.log(JSON.stringify(data));

        runInAction(() => {
          if (data != null) this.isValid = true;
        });
      } catch (err) {
        runInAction(() => {
          this.error = err.message || "Error al crear el Jutsu";
        });
      }
    } else {
      this.error = "Todos los campos son obligatorios";
    }
  }

  async fetchJutsus() {
    try {
      const data = await this.jutsuRepository.getAll();

      runInAction(() => {
        this.jutsus = data; // Actualizar la lista observable con los datos del back
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || "Error al obtener los Jutsus";
      });
    }
  }
}