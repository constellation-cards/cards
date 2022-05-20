import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { evolve, filter, map, mergeRight, pick } from 'ramda'

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

function extractDecks(data: any): ConstellationCardDeck[] {
    return map((record: any) => mergeRight(deckTemplate, record), data)
}

function extractStacks(data: any): ConstellationCardStack[] {
    return map((record: any) => mergeRight(stackTemplate, record), data)
}

function extractFace(data: any): ConstellationCardFace {
    return mergeRight(faceTemplate, {
        name: data.name,
        backgroundImage: data.iconImg,
        description: data.desc,
        prompts: data.prompts,
        rule: data.rule
    })
}

function extractCards(data: any): ConstellationCard[] {
    return map((record: any) => mergeRight(cardTemplate, {
            stack: record.front?.stack || record.back?.stack,
            front: extractFace(record.front),
            back: extractFace(record.back)
        })
    , data)
}

function readOneFile(filePath: string): any {
    const content = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(content) as YamlData
    return {
        decks: extractDecks(data.decks || []),
        stacks: extractStacks(data.stacks || []),
        cards: extractCards(data.cards || [])
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

const filePaths = cardFiles()
filePaths.forEach(filePath => {
    const data = readOneFile(filePath)
    console.log(JSON.stringify(data, null, 2))
})