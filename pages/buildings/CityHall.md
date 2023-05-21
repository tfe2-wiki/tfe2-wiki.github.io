---
title: City Hall
parent: Buildings
---
# City Hall

[//]: # (Pre-generated content)
<table><thead><tr><th>Stats</th><th>Image</th></tr></thead><tbody><tr><td><dl><dt>Cost</dt><dd><div class="resource-icon"><img style="object-position: -1009px -533px;" src="https://tfe2-wiki.github.io/assets/sprites.png"></div> 100 Food<br><div class="resource-icon"><img style="object-position: -637px -751px;" src="https://tfe2-wiki.github.io/assets/sprites.png"></div> 200 Wood<br><div class="resource-icon"><img style="object-position: -637px -737px;" src="https://tfe2-wiki.github.io/assets/sprites.png"></div> 100 Stone</dd><dt>Research Cost</dt><dd><div class="resource-icon"><img style="object-position: -268px -522px;" src="https://tfe2-wiki.github.io/assets/sprites.png"></div> 150</dd><dt>Capacity</dt><dd>4 Jobss</dd><dt>Category</dt><dd>Unique Buildings</dd><dt>Special Properties</dt><dd>Unique</dd><dt>Class Name</dt><dd>CityHall</dd></dl></td><td><style>.building-image {width: 200px;height: 200px;overflow: hidden;position: relative;}.building-image img {image-rendering: pixelated;object-fit: none;transform: scale(10);transform-origin: left top;position: absolute;left: 0;top: 0;}.resource-image {width: 200px;height: 200px;overflow: hidden;position: relative;}.resource-image img {image-rendering: pixelated;object-fit: none;transform: scale(20);transform-origin: left top;position: absolute;left: 0;top: 0;}.building-icon {width: 20px;height: 20px;overflow: hidden;position: relative;display: inline-block;}.building-icon img {image-rendering: pixelated;object-fit: none;transform: scale(1);transform-origin: left top;position: absolute;left: 0;top: 0;}.resource-icon {width: 20px;height: 20px;overflow: hidden;position: relative;display: inline-block;}.resource-icon img {image-rendering: pixelated;object-fit: none;transform: scale(2);transform-origin: left top;position: absolute;left: 0;top: 0;}</style><div class="building-image"><img style="object-position: -286px -867px;" src="https://tfe2-wiki.github.io/assets/sprites.png" alt="City Hall Back"><img style="object-position: -264px -867px;" src="https://tfe2-wiki.github.io/assets/sprites.png" alt="City Hall"></div><i>City Hall with a door</i></td></tr></tbody></table><blockquote><i>"Allows you to implement city policies and to change the name of your city."</i></blockquote>

The City Hall grants you several powerful abilities upon building one. There are four abilities in total.

Food Rationing: Your citizens consume half as much food but their happiness is reduced by a third if it is above ten.
Smaller Class Sizes: Schools give a 15% better education at the cost of their capacity being reduced by a third.
Mandatory Overtime: Your citizens work two additional hours per day but their happiness goes down gradually while this policy is implemented. After you end it, happiness start to restore itself slowly in a day.
City Name Change: Using this building, you can rename of your city to anything you like.

## Technical Info
Entry in `buildinginfo.json`

```json
{
    "className": "CityHall",
    "food": 100,
    "wood": 200,
    "stone": 100,
    "machineParts": 0,
    "refinedMetal": 0,
    "computerChips": 0,
    "knowledge": 150,
    "category": "Unique Buildings",
    "unlockedByDefault": false,
    "specialInfo": [
        "unique"
    ],
    "jobs": 4
}
```

Sprite: `spr_cityhall`

