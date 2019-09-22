import 'reflect-metadata';
import { Container, injectable, inject } from 'inversify';

interface IWeapon {
    hit(): string;
}

interface IMartialArt {
    throw(): string;
}

interface IFighter {
    fight(): string;
    sneak(): string;
}

interface IPirateFighter {
    fight(): string;
    sneak(): string;
    ninjaFight(): string;
    ninjaSneak(): string;
}

@injectable()
class Katana implements IWeapon {
    private num: number;

    constructor() {
        this.num = Math.random();
    }

    public hit() {
        return "cut! " + this.num.toString();
    }
}

@injectable()
class Shuriken implements IMartialArt {
    private num: number;

    constructor() {
        this.num = Math.random();
    }

    public throw() {
        return "hit! " + this.num.toString();
    }
}

@injectable()
class Ninja implements IFighter {

    private _katana: IWeapon;
    private _shuriken: IMartialArt;

    public constructor(
        @inject(Symbol.for('IWeapon')) katana: IWeapon,
        @inject(Symbol.for('IMartialArt')) shuriken: IMartialArt) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return "ninja" + this._katana.hit(); };
    public sneak() { return "ninja" + this._shuriken.throw(); };
}

@injectable()
class Pirate implements IPirateFighter {
    private _katana: IWeapon;
    private _shuriken: IMartialArt;

    public constructor(
        @inject(Symbol.for('IWeapon')) katana: IWeapon,
        @inject(Symbol.for('IMartialArt')) shuriken: IMartialArt,
        @inject(Symbol.for('IFighter')) private _ninja: IFighter) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return "pirate: " + this._katana.hit(); };
    public sneak() { return "pirate: " + this._shuriken.throw(); };
    public ninjaFight() { return this._ninja.fight() };
    public ninjaSneak() { return this._ninja.sneak() };
}

let container = new Container();

container.bind<IWeapon>(Symbol.for('IWeapon')).to(Katana);
container.bind<IMartialArt>(Symbol.for('IMartialArt')).to(Shuriken);
container.bind<IFighter>(Symbol.for('IFighter')).to(Ninja);
container.bind<IPirateFighter>(Symbol.for('IPirateFighter')).to(Pirate);

let pirateFighter = container.get<IPirateFighter>(Symbol.for('IPirateFighter'));
console.log(pirateFighter.fight());
console.log(pirateFighter.sneak());
console.log(pirateFighter.ninjaFight());
console.log(pirateFighter.ninjaSneak());

// let fighter = container.get<IFighter>(Symbol.for('IFighter'));
// console.log(fighter.fight());
// console.log(fighter.sneak());

// let weapon = container.get<IWeapon>(Symbol.for('IWeapon'));
// console.log(weapon.hit());

// let martialArt = container.get<IMartialArt>(Symbol.for('IMartialArt'));
// console.log(martialArt.throw());

// fighter = container.get<IFighter>(Symbol.for('IFighter'));
// console.log(fighter.fight());
// console.log(fighter.sneak());

// weapon = container.get<IWeapon>(Symbol.for('IWeapon'));
// console.log(weapon.hit());

// martialArt = container.get<IMartialArt>(Symbol.for('IMartialArt'));
// console.log(martialArt.throw());