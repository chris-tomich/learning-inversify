"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
let Katana = class Katana {
    constructor() {
        this.num = Math.random();
    }
    hit() {
        return "cut! " + this.num.toString();
    }
};
Katana = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Katana);
let Shuriken = class Shuriken {
    constructor() {
        this.num = Math.random();
    }
    throw() {
        return "hit! " + this.num.toString();
    }
};
Shuriken = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Shuriken);
let Ninja = class Ninja {
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return "ninja" + this._katana.hit(); }
    ;
    sneak() { return "ninja" + this._shuriken.throw(); }
    ;
};
Ninja = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Symbol.for('IWeapon'))),
    __param(1, inversify_1.inject(Symbol.for('IMartialArt'))),
    __metadata("design:paramtypes", [Object, Object])
], Ninja);
let Pirate = class Pirate {
    constructor(katana, shuriken, _ninja) {
        this._ninja = _ninja;
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return "pirate: " + this._katana.hit(); }
    ;
    sneak() { return "pirate: " + this._shuriken.throw(); }
    ;
    ninjaFight() { return this._ninja.fight(); }
    ;
    ninjaSneak() { return this._ninja.sneak(); }
    ;
};
Pirate = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Symbol.for('IWeapon'))),
    __param(1, inversify_1.inject(Symbol.for('IMartialArt'))),
    __param(2, inversify_1.inject(Symbol.for('IFighter'))),
    __metadata("design:paramtypes", [Object, Object, Object])
], Pirate);
let container = new inversify_1.Container();
container.bind(Symbol.for('IWeapon')).to(Katana);
container.bind(Symbol.for('IMartialArt')).to(Shuriken);
container.bind(Symbol.for('IFighter')).to(Ninja);
container.bind(Symbol.for('IPirateFighter')).to(Pirate);
let pirateFighter = container.get(Symbol.for('IPirateFighter'));
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
