import {Machine} from "./fsm/machine";

const drinks = {
    beer: { name: 'beer', type: 'alcohol' },
    vodka: { name: 'vodka', type: 'alcohol' },
    milk: { name: 'milk', type: 'other' },
    soda: { name: 'soda', type: 'other' },
};

type beer = { name: 'beer', type: 'alcohol' }
type vodka = { name: 'vodka', type: 'alcohol' }
type milk = { name: 'milk', type: 'other' }
type soda = { name: 'soda', type: 'other' }

type drink = beer | vodka | milk | soda;

class PartyMachine extends Machine {
    constructor() {
        super("Sober");
        this.transition('Sober');
    }

    private data = {
        drinksConsumed: 0
    };

    public rules = {
        drinksUntilDrunk:  2,
        drinksUntilReallyDrunk: 4,
        drinksUntilThrowUp: 5,
        drinksUntilSleep: 6
    };

    public states = {
        Sober: {
            ...this,

            _onEnter: function(): void {
                this.data.drinksConsumed = 0;
            },

            drink: function (beverage: drink): void {
                console.log('state:', this.state, '=> action: drink', beverage.name);

                if (beverage.type === 'alcohol') {
                    this.data.drinksConsumed += 1;
                    console.log('\tAdios inhibitions!');
                } else {
                    console.log('\tThat was refreshing!');
                }

                console.log('\tdrinks consumed:', this.data.drinksConsumed);

                if (this.data.drinksConsumed >= this.rules.drinksUntilDrunk) {
                    this.transition('Drunk');
                }
            }
        },

        Drunk: {
            ...this,

            _onEnter: function(): void {
                console.log('state:', this.state, '=> action: _onEnter');
                console.log('\tI am drunk now!');
            },

            drink: function(beverage: drink): void {
                console.log('state:', this.state, '=> action: drink');
                console.log('\taction:', 'drink', beverage.name);

                if (beverage.type === 'alcohol') {
                    this.data.drinksConsumed += 1;
                    console.log('\tDown the hatch!');
                } else {
                    console.log('\tThat was refreshing!');
                }

                console.log('\tdrinks consumed:', this.data.drinksConsumed);

                if (this.data.drinksConsumed >= this.rules.drinksUntilReallyDrunk) {
                    this.transition('ReallyDrunk');
                }
            }
        },

        ReallyDrunk: {
            ...this,

            _onEnter: function(): void {
                console.log('state:', this.state, '=> action: _onEnter');
                console.log('\tNow I am REALLY drunk!');
            },

            drink: function(beverage: drink): void {
                console.log('state:', this.state, '=> action: drink', beverage.name);
                console.log('\tNow I am REALLY drunk!');

                if (beverage.type === 'alcohol') {
                    this.data.drinksConsumed += 1;
                    console.log('\tNo more!');
                } else {
                    console.log('\tThat was refreshing!');
                }

                console.log('\tdrinks consumed:', this.data.drinksConsumed);

                if (this.data.drinksConsumed >= this.rules.drinksUntilThrowUp) {
                    this.transition('ThrowUp');
                }
            }
        },

        ThrowUp: {
            ...this,

            _onEnter: function(): void {
                console.log('state:', this.state, '=> action: _onEnter');
                console.log('\tDang! I spewed chunks!');
            },

            drink: function(beverage: drink): void {
                console.log('state:', this.state, '=> action: drink', beverage.name);
                console.log('\tI am getting tired!');

                if (beverage.type === 'alcohol') {
                    this.data.drinksConsumed += 1;
                    console.log('\tNo more!');
                } else {
                    console.log('\tThat was refreshing!');
                }

                console.log('\tdrinks consumed:', this.data.drinksConsumed);

                if (this.data.drinksConsumed >= this.rules.drinksUntilSleep) {
                    this.transition('Sleeping');
                }
            }
        },

        Sleeping: {
            ...this,

            _onEnter: function(): void {
                console.log('state:', this.state, '=> action: _onEnter');
                console.log('\tzzzzzzz....');
            },
        },

        HungOver: {
            ...this,
        }
    }
}

const student = new PartyMachine();
student.dispatch('drink', [drinks.soda]);
student.dispatch('drink', [drinks.beer]);
student.dispatch('drink', [drinks.soda]);
student.dispatch('drink', [drinks.vodka]);
student.dispatch('drink', [drinks.beer]);
student.dispatch('drink', [drinks.vodka]);
student.dispatch('drink', [drinks.beer]);
student.dispatch('drink', [drinks.soda]);
student.dispatch('drink', [drinks.soda]);
student.dispatch('drink', [drinks.beer]);

// console.log(student);
