---
title: makeBuilding
parent: ModTools
---

# ModTools.makeBuilding(className, fields, spriteName, ?saveFunc, ?loadFunc, ?superClass)

Define a new building.

- className (string) - The name of the building class. Should be equal to a className in buildinginfo.json.
- fields (object or function) - Fields and field overwrites to add this building. This will define its behaviour. In case you need the parent class for calling super functions, pass a function that takes the parent class as argument and returns the fields. Some common fields:
  - walkAround(citizen, stepsInBuilding) - defines citizen behaviour in houses. Called whenever a citizen is in their house and has nothing to do (i.e. no path). In most cases, you'd assign a path here. See the Citizen movement section for common functions to use here.
  - work(citizen, timeMod, shouldStopWorking) - defines citizen behaviour at workplaces. Be sure to call citizen.stopWork() if shouldStopWorking is true and the citizen is done with their job. Like walkAround, this is only called when the citizen has no path, so not necessarily every update.
  - update(timeMod) - should contain anything that has to happen on every update.
  - get_possibleUpgrades() - should return an array with all building upgrades of this building.
- spriteName (string) - The sprite texture of this building. A building sprite should be 64x20 pixels; three frames of 20x20 pixels each. The first frame should contain the building foreground without a door. The second one should contain the building foreground with a door. The third should contain the background. There should be two pixels between frames.
- saveFunc (optional, function) - If you need to save something custom for the building, you can do it by passing a save function. It should take a ResizingBytesQueue (see the section below) as argument, and you can simply use this to get access to the building properties.
- loadFunc (optional, function) - You should load anything you saved here. It again gets passed a ResizingBytesQueue.
- superClass (optional, class) - The super class of this building. This is set correctly automatically in most cases.
