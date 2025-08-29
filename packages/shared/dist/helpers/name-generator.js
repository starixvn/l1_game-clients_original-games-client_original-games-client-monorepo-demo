import { uniqueNamesGenerator } from "unique-names-generator";
// Name dictionaries
var NEW_202010 = [
    "Power", "Super", "Mega", "Ultra", "Hyper", "Neo", "Quantum", "Alpha", "Beta", "Gamma", "Delta", "Omega",
    "Stellar", "Cosmic", "Galaxy", "Nova", "Pulsar", "Quasar", "Nebula", "Solar", "Lunar", "Meteor",
    "Thunder", "Lightning", "Storm", "Blaze", "Frost", "Ice", "Fire", "Water", "Earth", "Wind",
    "Shadow", "Light", "Dark", "Bright", "Glow", "Shine", "Flash", "Spark", "Bolt", "Strike"
];
var Animals = [
    "Tiger", "Lion", "Eagle", "Wolf", "Bear", "Shark", "Falcon", "Panther", "Leopard", "Cheetah",
    "Dragon", "Phoenix", "Griffin", "Hawk", "Owl", "Fox", "Rabbit", "Deer", "Horse", "Dolphin",
    "Whale", "Octopus", "Spider", "Butterfly", "Bee", "Ant", "Cat", "Dog", "Elephant", "Giraffe"
];
var Colors = [
    "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black", "White", "Gray",
    "Silver", "Gold", "Bronze", "Crimson", "Scarlet", "Azure", "Emerald", "Violet", "Indigo", "Magenta",
    "Cyan", "Turquoise", "Amber", "Jade", "Ruby", "Sapphire", "Pearl", "Diamond", "Crystal", "Platinum"
];
var Cools = [
    "Ninja", "Samurai", "Warrior", "Knight", "Assassin", "Hunter", "Ranger", "Scout", "Sniper", "Gunner",
    "Pilot", "Captain", "Commander", "Admiral", "General", "Master", "Sensei", "Guru", "Wizard", "Mage",
    "Sage", "Oracle", "Prophet", "Guardian", "Protector", "Defender", "Champion", "Hero", "Legend", "Myth"
];
var Fruits = [
    "Apple", "Banana", "Cherry", "Grape", "Orange", "Peach", "Pear", "Plum", "Berry", "Mango",
    "Kiwi", "Lemon", "Lime", "Melon", "Papaya", "Coconut", "Avocado", "Pineapple", "Strawberry", "Blueberry",
    "Raspberry", "Blackberry", "Cranberry", "Pomegranate", "Watermelon", "Cantaloupe", "Honeydew", "Fig", "Date", "Olive"
];
var Marvels = [
    "Iron", "Steel", "Titanium", "Vibranium", "Adamant", "Carbon", "Silicon", "Neon", "Xenon", "Argon",
    "Helium", "Hydrogen", "Oxygen", "Nitrogen", "Fluorine", "Chlorine", "Bromine", "Iodine", "Phosphorus", "Sulfur",
    "Magnesium", "Calcium", "Potassium", "Sodium", "Lithium", "Beryllium", "Boron", "Aluminum", "Copper", "Zinc"
];
var NameGenerator = /** @class */ (function () {
    function NameGenerator() {
    }
    NameGenerator.generateName = function () {
        console.log("[NameGenerator] generateName called");
        var dictionaries = [Colors, Animals, Marvels, Fruits, Cools, NEW_202010];
        var randomDictionaryIndex = Math.floor(Math.random() * dictionaries.length);
        var pickedDictionary = dictionaries[randomDictionaryIndex];
        var shortName = uniqueNamesGenerator({
            dictionaries: [pickedDictionary],
            separator: "",
            length: 1,
        });
        var numberLength = shortName.length < 10 ? 5 : 14 - shortName.length;
        var maxNumber = "";
        for (var i = 0; i < numberLength; i++) {
            maxNumber = "9".concat(maxNumber);
        }
        var randomNumber = Math.floor(Math.random() * +maxNumber);
        var generatedName = "".concat(shortName).concat(randomNumber);
        console.log("[NameGenerator] generated name:", generatedName);
        return generatedName;
    };
    NameGenerator.validateName = function (name) {
        console.log("[NameGenerator] validateName called with:", name);
        var regex = new RegExp(NameGenerator.PATTERN);
        var isValid = (name || "").match(regex) !== null;
        console.log("[NameGenerator] validation result:", isValid);
        return isValid;
    };
    NameGenerator.PATTERN = "^[a-zA-Z0-9]{3,14}$";
    return NameGenerator;
}());
export default NameGenerator;
