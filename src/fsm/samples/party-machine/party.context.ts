import {BeverageType} from "./party.types";
import {Beverage} from "./beverage";

export class PartyContext {
    public readonly alcohol: BeverageType[] = [Beverage.Beer, Beverage.Vodka];
    public readonly spiritsBeforeDrunk = 4;
    public readonly spiritsBeforeReallyDrunk = 5;
    public readonly spiritsBeforeSick = 6;

    public spiritsConsumed = 0;

    public reset(): void {
        this.spiritsConsumed = 0;
    }

    public isAlcohol(beverage: BeverageType): boolean {
        return this.alcohol.some(o => o === beverage);
    }

    public isDrunk(): boolean {
        return this.spiritsConsumed >= this.spiritsBeforeDrunk;
    }

    public isReallyDrunk(): boolean {
        return this.spiritsConsumed >= this.spiritsBeforeReallyDrunk;
    }

    public isSick(): boolean {
        return this.spiritsConsumed >= this.spiritsBeforeSick;
    }

    public report(): void {
        console.log('\t// Spirits Consumed:', this.spiritsConsumed);
    }
}