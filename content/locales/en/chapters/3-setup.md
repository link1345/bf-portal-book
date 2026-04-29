---
title: "Chapter 3 Environment construction for “Portal custom”"
free: true
---

> --- To create it, let's prepare a development environment.

This chapter provides you with the tools you need to get started in the chapters that follow.
Please note that if you do not do these things, you will absolutely not be able to develop "Portal Custom".

# Download BF official SDK

https://portal.battlefield.com/

When you access the above URL, you will be asked whether it is Battlefield 2042 or Battlefield 6, so select Battlefield 6 and click "START CREATING".

![start](/images/bf_portal_doc/3-setup-init-0.png)

There is a "Download SDK" button at the top, click it to download the SDK zip file.

![download](/images/bf_portal_doc/3-setup-init-1.png)

If you are prompted to log in during these steps, please log in with your EA account.

Also, once the download is complete, unzip the zip. To unzip the file, right-click on the downloaded file and there will be a column that says "Extract all..." Click that to unzip the zip file.

# Prepare map editor

You can use the map editor immediately if you unzip the downloaded SDK zip file.

In the official SDK instructions, make the following preparations on the Godot side.

1. Launch the Godot executable file included in the SDK.
2. When the "Project Selection" screen opens, drag and load the `GodotProject` folder in the SDK. If you want to do it manually, select `GodotProject` from "Import".
3. Open Battlefield 6 Portal Project. The first boot may take several minutes.
4. Press `Portal Setup` on the `BFPortal` tab on the right side of Godot and wait for the setup to complete.
5. Select `Open Scene` from the `Scene` menu and open the level you want to edit in the `levels` directory.

If you can't see the terrain in your level, it may be located above your camera position. First, look above and make sure the terrain is loaded.

## Basic operations of map editor

In the official SDK docs, the following operations are described as basic operations of Spatial Editor.

| Operation | Contents |
| ---- | ---- |
| Drag from the Object Library | Place the object you want to use into the 3D Scene or Scene Outliner |
| While selecting `W` | Move mode. Move placed objects |
| While selecting `E` | Rotate mode. Rotate placed objects |
| While selecting `R` | Scale mode. Scale placed objects |

Moving the viewpoint in the 3D view is a standard Godot operation, so check the position by using the mouse or WASD movement.
When touching a placed object, remember to select it first and use `W` / `E` / `R` to move, rotate, and scale it, so you won't get lost.

Basically, the scale should be uniform.
Non-uniform scaling that stretches X/Y/Z separately is not officially supported and will cause in-game appearance and hit detection to be corrupted.

# Prepare TypeScript

This book does not cover visual editors or block visual programming in detail.
From here on, we will prepare for development using the TypeScript SDK and template repository.

## 1 . Create a github account

https://github.com/

Visit github and create your own account.

## 2 . Create a repository (project)

https://github.com/link1345/Battlefield6-SampleTemplate

On the above page, there is a button called "use this template" as shown in the image below, so click it and then click "Create a new repository".

![use this template](/images/bf_portal_doc/3-setup-1.png)


Then, a page called "Create a new repository" will open, so follow the instructions and fill in the information as shown in the image below.
"Repository name" is the name of your project. Please choose a name that suits your purpose.
"Description" is a description of the project. You don't have to write anything.
"Choose visibility" allows you to select whether the project is "private" or "public". If you don't plan to make it public to anyone, private is fine.

![Create a new repository](/images/bf_portal_doc/3-setup-1.png)

If the repository (project) is successfully created, it will be displayed as shown in the image below.

![repository](/images/bf_portal_doc/3-setup-3.png)

## 3 . Make the source code accessible

I want to touch the source code right away, but this time I want to easily create an environment, so I would like to use "Codespaces".

:::message alert

This time, we are using **Codespaces** to easily build the environment.

Due to Portal's TypeScript registration specifications, it will not be a large-scale program that uses many GB, so I think the free tier is sufficient.
If you want to do it in a local environment, you'll need to install VSCode on your computer, clone the repository with git, and do a lot of work. **

[The template "link1345/Battlefield6-SampleTemplate"](https://github.com/link1345/Battlefield6-SampleTemplate) has an explanation in README.md (English) and README-JP.md (Japanese), so please check there.

:::

When you access the page for the repository you built and press the green button labeled "Code," you will see the options Local and Codespaces.
This time, click on "Codespaces" and press the "Create codespace on main" button.

![codespaces top](/images/bf_portal_doc/3-setup-5.png)


After a short while, VSCode will open in a new browser tab and a guide will appear as shown in the image below.

![vscode top](/images/bf_portal_doc/3-setup-6.png)

There is a tab called "Terminal" at the bottom, so click it, switch to the "Terminal" tab, and enter "`npm install`".
Especially if the phrase `Error` does not appear, there is no problem.

![vscode top](/images/bf_portal_doc/3-setup-7.png)

Next, look at VSCode's Explorer and put the contents of the `code` folder, where you first downloaded and unzipped the SDK from BF official, into the `code` folder.
If it is inserted as shown in the figure below, there is no problem.

![sdk setup](/images/bf_portal_doc/3-setup-8.png)

## 4 . What can templates make easier?

In this book, we use [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) for TypeScript development.

If you write the code directly in the Script field of Portal Web Builder, it will work, but if it gets a little bigger, the following problem will occur.

* 1 file becomes long and I can't remember what I wrote where.
* I didn't notice a small grammar mistake until I started the game.
* Every time you retest the same process, manual work increases.
* Portal Web Builder's Script field ultimately receives one TypeScript file, so you need to manually put together the code that has been split into files.

This template makes it easy to:

| Command | What you can do |
| ---- | ---- |
| `npm run lint` | Check grammar and writing style with ESLint |
| `npm run lint:fix` | Automatically fix things that can be fixed with ESLint |
| `npm run build` | Combine multiple `.ts` files under `mods` into `dist/Script.ts` |
| `npm run test` | Run tests with Vitest |

When you push to GitHub, the GitHub Actions included in the template will execute `npm run lint`. In other words, you can quickly stop code that is ``suspicious in the first place'' before it is published.

## 5 . Template folder structure

The first four places to look are:

| Location | Role |
| ---- | ---- |
| `mods/` | TypeScript code you write |
| `code/` | Where to put the `code` folder for the Battlefield 6 SDK |
| `dist/Script.ts` | `npm run build` TypeScript to be registered in Portal |
| `dist/Strings.json` | String definition to be registered in Portal |
| `test/` | Vitest test storage |

During development, multiple files are written to `mods`. Once completed, run `npm run build` and register the generated `dist/Script.ts` and `dist/Strings.json` in the Script field of Portal Web Builder.

:::message alert

In the README, there are places where the string file is written as `String.json`, but the actual file in the template is `dist/Strings.json`. In this book, it is written as `dist/Strings.json`.

:::

This concludes the steps for creating a Portal script with TypeScript.

# How to navigate the SDK folder

The SDK is large, so you don't need to read everything from the beginning. Please watch them in the following order first.

| Where to see | What to see |
| ---- | ---- |
| `docs/pages/getting_started.html` | Flow of starting Godot, importing `GodotProject`, and `Portal Setup` |
| `docs/pages/spatial_editor.html` | Map editing, Object Library, Export of `.spatial.json` |
| `docs/pages/gameplay_logic.html` | TypeScript, Custom UI, AI, ObjId reference, log confirmation |
| `docs/pages/tips_tricks.html` | Load countermeasures such as number of vehicles, player scanning, UI widget management, etc. |
| `code/types/mod/index.d.ts` | List of Portal TypeScript API functions and types |
| `GodotProject/mods/_StartHere_BasicTemplate` | Official TypeScript template to read first |

Where the local SDK is `sdk.version.json` , the reference SDK is `1.2.3.0` . The contents of the SDK change with updates, so if the steps in this document differ from the screens, first check `sdk.version.json` and `docs/pages`.

# Conclusion

We have prepared an environment for creating games using "Portal Custom".
Now you can smoothly program and create games in the chapters that follow.

---

📘 **In the next chapter, ``Map Editor Practical Guide (Practical Placement and Linking)''**, we will use the prepared environment to proceed with ``what can be placed'', ``where to place'', and ``how to assign IDs''**. Shared is a trial setting → warning mark is confirmed, ID is -1 prohibited & ledger. With these two as passwords, move on to the next step.
