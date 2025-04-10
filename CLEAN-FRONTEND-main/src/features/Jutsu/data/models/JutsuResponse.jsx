export class JutsuResponse {
    constructor({id, name, jutsu_type, nature, difficulty_level, created_by}) {
        this.id = id;
        this.name = name;
        this.jutsu_type = jutsu_type;
        this.nature = nature;
        this.difficulty_level = difficulty_level;
        this.created_by = created_by;
    }
}