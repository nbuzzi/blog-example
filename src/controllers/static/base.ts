export abstract class GenericDatabase<T> {
    protected entities: T[];

    constructor(entityList: T[]) {
        this.entities = entityList || [];
    }

    protected get list(): T[] {
        return this.entities;
    }

    protected filter(expression: (value: T, condition: any) => boolean): T[] {
        return this.entities && this.entities.filter(expression);
    }
}
