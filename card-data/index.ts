import crypto from 'crypto'
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { append, assoc, filter, flatten, map, mergeRight, pluck, reduce } from 'ramda'

import { ConstellationCard, ConstellationCardDeck, ConstellationCardFace, ConstellationCardStack } from "../index"

interface YamlData {
    decks: any[]
    stacks: any[]
    cards: any[]
}

const deckTemplate: ConstellationCardDeck = {
    id: "",
    name: "",
    cards: []
}

const stackTemplate: ConstellationCardStack = {
    id: "",
    name: "",
    icons: [],
    cards: []
}

const faceTemplate: ConstellationCardFace = {
    name: "",
    backgroundImage: null,
    description: "",
    prompts: [],
    rule: ""
}

const cardTemplate: ConstellationCard = {
    id: "",
    deck: "",
    stack: "",
    front: {...faceTemplate},
    back: {...faceTemplate},
    quantity: 1
}

function idForObject(obj: any): string {
    const content = JSON.stringify(obj)
    return crypto.createHash('md5').update(content).digest("hex")
}

function extractDecks(data: any): ConstellationCardDeck[] {
    return map((record: any) => mergeRight(deckTemplate, record), data)
}

function extractStacks(data: any): ConstellationCardStack[] {
    return map((record: any) => mergeRight(stackTemplate, record), data)
}

function extractFace(data: any): ConstellationCardFace {
    return mergeRight(faceTemplate, data)
}

function extractCards(data: any): ConstellationCard[] {
    return map((record: any) => mergeRight(cardTemplate, {
            deck: record.front?.deck || record.back?.deck || "CORE",
            stack: record.front?.stack || record.back?.stack,
            front: extractFace(record.front),
            back: extractFace(record.back)
        })
    , data)
}

function readOneFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(content) as YamlData
    return {
        decks: extractDecks(data.decks || []),
        stacks: extractStacks(data.stacks || []),
        cards: extractCards(data.cards || [])
    }
}

function readAllFiles(filePaths: string[]) {
    const records = map(readOneFile, filePaths)
    return {
        decks: flatten(pluck("decks", records)),
        stacks: flatten(pluck("stacks", records)),
        cards: flatten(pluck("cards", records)),
    }
}

/**
 * Retrieve the data files holding card data
 * @returns a list of paths pointing to YAML files that contain card data
 */
function cardFiles(): string[] {
    const files = fs.readdirSync(__dirname)
    const yamlFiles = filter(fileName => path.extname(fileName) === '.yaml', files)
    const yamlPaths = map(fileName => path.join(__dirname, fileName), yamlFiles)
    return yamlPaths
}

function addIds(objects: any[]): any[] {
    return map((obj: any) => assoc("id", idForObject(obj), obj), objects)
}

function addIdsToEverything(data: any) {
    return {
        decks: addIds(data.decks) as ConstellationCardDeck[],
        stacks: addIds(data.stacks) as ConstellationCardStack[],
        cards: addIds(data.cards) as ConstellationCard[]
    }
}

function generateObjectIndex(objects: any[]): Record<string,any> {
    return reduce((newIndex, obj) => assoc(obj.name, obj, newIndex), {}, objects)
}

const filePaths = cardFiles()
const data = readAllFiles(filePaths)
const dataWithIds = addIdsToEverything(data)

const deckIndex = generateObjectIndex(dataWithIds.decks)
const stackIndex = generateObjectIndex(dataWithIds.stacks)

for (let card of dataWithIds.cards) {
    if (card.deck) {
        let foundDeck = deckIndex[card.deck]
        if (foundDeck) {
            foundDeck.cards = append(card.id, foundDeck.cards)
            card.deck = foundDeck.id
        }
    }
    if (card.stack) {
        let foundStack = stackIndex[card.stack]
        if (foundStack) {
            foundStack.cards = append(card.id, foundStack.cards)
            card.stack = foundStack.id
        }
    }
}

fs.writeFileSync("cards.json", JSON.stringify(dataWithIds, null, 2), 'utf8')