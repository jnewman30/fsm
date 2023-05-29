import {Machine} from "./fsm";

enum PartyState {
    Sober = 'Sober',
    Drunk = 'Drunk',
    ReallyDrunk = 'ReallyDrunk',
    Sick = 'Sick',
    Sleeping = 'Sleeping'
}

enum PartyAction {
    Drink = 'Drink',
    Sleep = 'Sleep'
}

enum Beverage {
    Beer = 'Beer',
    Vodka = 'Vodka',
    Soda = 'Soda'
}

type PartyStateType = PartyState.Sober | PartyState.Drunk | PartyState.ReallyDrunk | PartyState.Sick | PartyState.Sleeping;
type PartyActionType = PartyAction.Drink | PartyAction.Sleep;
type BeverageType = Beverage.Beer | Beverage.Vodka | Beverage.Soda;

class PartyContext {
    public readonly alcohol: BeverageType[] = [ Beverage.Beer, Beverage.Vodka ];
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

class PartyMachine extends Machine<PartyContext, PartyStateType, PartyActionType> {

    constructor() {
        super(new PartyContext(), PartyState.Sober);
        this.transition(PartyState.Sober);
    }

    public states = {
        Sober: {
            ...this,

            // You can also add intrinsic action _onExit...
            _onEnter: function (context: PartyContext) {
                console.log('* Enter State:', this.state);
                context.reset();
                context.report();
            },

            Drink: function (context: PartyContext, beverage: BeverageType) {
                if (context.isAlcohol(beverage)) {

                    context.spiritsConsumed += 1;
                    console.log(`\tsay "${beverage} down the hatch!"`);

                    if (context.isDrunk()) {
                        this.transition(PartyState.Drunk);
                    }
                } else {
                    console.log(`\tsay "That ${beverage} was refreshing!"`);
                }
            },

        },

        Drunk: {
            ...this,

            _onEnter: function (context: PartyContext) {
                console.log('* Enter State:', this.state);
                context.report();
                console.log(`\tsay "Goodbye inhibitions!"`);
            },

            Drink: function (context: PartyContext, beverage: BeverageType) {
                if (context.isAlcohol(beverage)) {

                    context.spiritsConsumed += 1;
                    console.log(`\tsay "${beverage} down the hatch!"`);

                    if (context.isReallyDrunk()) {
                        this.transition(PartyState.ReallyDrunk);
                    }
                } else {
                    console.log(`\tsay "That ${beverage} was refreshing!"`);
                }
            }
        },

        ReallyDrunk: {
            ...this,

            _onEnter: function (context: PartyContext) {
                console.log('* Enter State:', this.state);
                context.report();
                console.log(`\tsay "Hey Room, stop spinning!"`);
            },

            Drink: function (context: PartyContext, beverage: BeverageType) {
                if (context.isAlcohol(beverage)) {

                    context.spiritsConsumed += 1;
                    console.log(`\tsay "${beverage} down the hatch!"`);

                    if (context.isSick()) {
                        this.transition(PartyState.Sick);
                    }
                } else {
                    console.log(`\tsay "That ${beverage} was refreshing!"`);
                }
            }
        },

        Sick: {
            ...this,

            _onEnter: function (context: PartyContext) {
                console.log('* Enter State:', this.state);
                context.report();
                console.log(`\tsay "Dang! I spewed chunks!"`);

                this.dispatch(PartyAction.Sleep);
            },

            Sleep: function () {
                console.log('\tsay "Too tired to party. Time to sleep."');
                this.transition(PartyState.Sleeping);
            }
        },

        Sleeping: {
            ...this,

            _onEnter: function (context: PartyContext) {
                console.log('* Enter State:', this.state);
                context.report();
                console.log('\tZzZzzZZZzzZzz...');
            }
        }
    }
}

const party = new PartyMachine();
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Vodka);
party.dispatch(PartyAction.Drink, Beverage.Beer);
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Vodka);
party.dispatch(PartyAction.Drink, Beverage.Beer);
party.dispatch(PartyAction.Drink, Beverage.Beer);
party.dispatch(PartyAction.Drink, Beverage.Soda);
party.dispatch(PartyAction.Drink, Beverage.Vodka);

console.log('\r\nRun Completed.');
console.log('Spirits Consumed = ', party.context.spiritsConsumed);
