const fs = require('fs')
const path = require('path')

// parse a language csv file
function parseLanguageFile(file) {
	let lines = fs.readFileSync(file, 'utf8').replace(/\r/g, "").split('\n')
	let lang = {}
	for (let line of lines) {
		let parts = line.split('|')
		if (parts.length == 2) {
			lang[parts[0]] = parts[1]
		}
	}
	return lang
}

// parse an info file
// info files contains key/value pairs separated by '||' on its own line
// keys and values are separated by a single line
function parseInfoFile(file) {
	let pairs = fs.readFileSync(file, 'utf8').replace(/\r/g, "").split('\n||\n')
	let info = {}
	for (let pair of pairs) {
		let parts = pair.split('\n')
		info[parts.shift()] = parts.join('\n')
	}
	return info
}

function writePages(path) {
	// for each page in pages object, write it to the file system
	// get page key as well
	for (const [key, value] of Object.entries(pages)) {
		fs.writeFileSync("./pages/"+path+"/"+key+".md", value, 'utf8')
		// remove the page from the pages object
		delete pages[key]
	}
}

const en = parseLanguageFile('./assets/lang_en.csv')
const buildinginfo = require('./assets/buildinginfo.json')
const buildingUpgradesInfo = require('./assets/buildingUpgradesInfo.json')
const buildingCategoriesInfo = require('./assets/buildingCategoriesInfo.json')
const buildableWorldResourcesInfo = require('./assets/buildableWorldResourcesInfo.json')
const bridgesInfo = require('./assets/bridgesInfo.json')
const cityUpgradesInfo = require('./assets/cityUpgradesInfo.json')
const decorationsInfo = require('./assets/decorationsInfo.json')
const stories = require('./assets/stories.json')
const sprites = require('./assets/sprites.json')
const spritesOverrides = require('./assets/spritesOverrides.json')
const { json } = require('stream/consumers')

const buildingPageInfo = parseInfoFile('./buildings.info', 'utf8')

var pages = {}

// loop through buildinginfo.json and generate markup pages
// each building has a name and description in the language file
// the class name is used as the filename
// buildinginfo.json/BuildingClass.name
// buildinginfo.json/BuildingClass.description
console.info("Generating building pages...")
fs.mkdirSync('./pages/buildings', { recursive: true })
buildinginfo.forEach(function(building) {
	let name = en["buildinginfo.json/" + building.className + ".name"]
	// console.log("Generating page for " + building.className + ": " + name)
	// remove last instance of newline
	let description = (en["buildinginfo.json/" + building.className + ".description"] || "No description provided\n").replace(/\n$/, "")
	let costlist = {}
	let spriteName = "spr_" + building.className.toLowerCase()
	let sprite = sprites.frames[spritesOverrides[building.className]] || sprites.frames[spriteName + ".png"]
	if (sprite == undefined) {
		console.error("Missing sprite for " + building.className)
		sprite = sprites.frames["spr_unknownbuilding.png"]
		spriteName = "spr_unknownbuilding"
	}
	let spriteX = sprite.frame.x+22
	let spriteY = sprite.frame.y
	let backSprite = sprites.frames[building.buttonBack + ".png"]
	let backSpriteX 
	let backSpriteY
	if (backSprite != undefined) {
		backSpriteX = backSprite.frame.x
		backSpriteY = backSprite.frame.y
	} else {
		backSpriteX = spriteX+22
		backSpriteY = spriteY
	}
	if (building.food) costlist["Food"] = building.food
	if (building.wood) costlist["Wood"] = building.wood
	if (building.stone) costlist["Stone"] = building.stone
	if (building.machineParts) costlist["Machine Parts"] = building.machineParts
	if (building.refinedMetal) costlist["Refined Metal"] = building.refinedMetal
	if (building.computerChips) costlist["Computer Chips"] = building.computerChips
	if (building.graphene) costlist["Graphene"] = building.graphene
	if (building.rocketFuel) costlist["Rocket Fuel"] = building.rocketFuel
	// turn costlist into array of strings in format of "Count Resource"
	let costlistArray = []
	for (let resource in costlist) {
		costlistArray.push( 
		`<div class="resource-icon">
			<img style="object-position: ${-sprites.frames["spr_resource_"+resource.toLowerCase().replace(/\s/g,"")+".png"].frame.x}px ${-sprites.frames["spr_resource_"+resource.toLowerCase().replace(/\s/g,"")+".png"].frame.y}px;" src="https://tfe2-wiki.github.io/assets/sprites.png">
		</div> 
		` + costlist[resource] + " " + resource)
	}
	let capacity = []
	if (building.residents) capacity.push(building.residents + " Residents")
	if (building.jobs) capacity.push(building.jobs + " Jobs")
	// capitalize specialInfo phrases
	let specialInfo = building.specialInfo
	specialInfo.forEach(function(phrase, i) {
		// for each phrase, split right before capital letters
		// dont remove them though, they are needed for proper capitalization
		// join the parts back together with spaces
		specialInfo[i] = phrase.match(/([A-Z]?[a-z]+)/g).join(" ")
		// capitalize the first letter
		specialInfo[i] = specialInfo[i].charAt(0).toUpperCase() + specialInfo[i].slice(1).toLowerCase()
	})
	let page = 
`---
title: ${name}
parent: Buildings
---
# ${name}

[//]: # (Pre-generated content)
${`
<table>
<thead>
	<tr>
	<th>Stats</th>
	<th>Image</th>
	</tr>
</thead>
<tbody>
	<tr>
	<td>
		<dl>
			<dt>Cost</dt>
			<dd>
				${costlistArray.length > 0 ? costlistArray.join('<br>') : "None"}
			</dd>
			<dt>Capacity</dt>
			<dd>
				${capacity.length > 0 ? capacity.join('<br>') : "None"}
			</dd>
			${building.quality ? `<dt>Quality</dt>
			<dd>
				${building.quality}
			</dd>` : ""}
			<dt>Research Cost</dt>
			<dd>
				${building.knowledge ? building.knowledge : "None"}
			</dd>
			<dt>Category</dt>
			<dd>
				${building.category || "None"}
			</dd>
			<dt>Special Properties</dt>
			<dd>
				${specialInfo.length > 0 ? specialInfo.join('<br>') : "None"}
			</dd>
			<dt>Class Name</dt>
			<dd>
				${building.className}
			</dd>
		</dl>
	</td>
	<td>
		<style>
			.building-image {
				width: 200px;
				height: 200px;
				overflow: hidden;
				position: relative;
			}
			.building-image img {
				image-rendering: pixelated;
				object-fit: none;
				transform: scale(10);
				transform-origin: left top;
				position: absolute;
				left: 0;
				top: 0;
			}
			.resource-image {
				width: 200px;
				height: 200px;
				overflow: hidden;
				position: relative;
			}
			.resource-image img {
				image-rendering: pixelated;
				object-fit: none;
				transform: scale(20);
				transform-origin: left top;
				position: absolute;
				left: 0;
				top: 0;
			}
			.building-icon {
				width: 20px;
				height: 20px;
				overflow: hidden;
				position: relative;
				display: inline-block;
			}
			.building-icon img {
				image-rendering: pixelated;
				object-fit: none;
				transform: scale(1);
				transform-origin: left top;
				position: absolute;
				left: 0;
				top: 0;
			}
			.resource-icon {
				width: 20px;
				height: 20px;
				overflow: hidden;
				position: relative;
				display: inline-block;
			}
			.resource-icon img {
				image-rendering: pixelated;
				object-fit: none;
				transform: scale(2);
				transform-origin: left top;
				position: absolute;
				left: 0;
				top: 0;
			}
		</style>
		<div class="building-image">
			<img style="object-position: ${-backSpriteX}px ${-backSpriteY}px;" src="https://tfe2-wiki.github.io/assets/sprites.png" alt="${name} Back">
			<img style="object-position: ${-spriteX}px ${-spriteY}px;" src="https://tfe2-wiki.github.io/assets/sprites.png" alt="${name}">
		</div>
		<i>${name}: ${spriteName}</i>
	</td>
	</tr>
</tbody>
</table>
<details>
	<summary>buildinginfo.json entry</summary>
	!@#$%^JSON!@#$%^
</details>
<blockquote><i>"${description}"</i></blockquote>
`/**/.replace(/\n|\t/g, "")/**/.replace("!@#$%^JSON!@#$%^", `\`\`\`json
	${JSON.stringify(building, null, 4)}
	\`\`\``)}

${buildingPageInfo[name] ? buildingPageInfo[name] : "The page for "+name+" is in need of content. Please help by contributing to the wiki!"}
`
	pages[building.className] = page
})

console.info("Writing building pages...")
writePages("buildings")

// after everything is done
console.info("Done!")