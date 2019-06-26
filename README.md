# Phaser3 CLI

![Imgur](https://i.imgur.com/PXv0Vvx.png)

[![dependencies Status](https://david-dm.org/gammafp/phaser3-cli/status.svg)](https://david-dm.org/gammafp/phaser3-cli) ![npm](https://img.shields.io/npm/v/phaser3-cli.svg) ![GitHub issues](https://img.shields.io/github/issues/gammafp/phaser3-cli.svg)

----

## The Goal of Phaser3 CLI

Accelerate your development time, phaser 3 CLI bridles you tools so you can create more in less time. We know you like to focus on what matters most your game so we make it easy for you to set up.

# Getting Started - Local Development

## Prerequisites
- Make sure that you have Node 10.9 or later installed. See instructions [here](https://nodejs.org/en/download/).

## Installation
To get started locally, follow these instructions:

1. Install Phaser3 CLI with: 
```bash
> npm i -g phaser3-cli
```

## Usage
1. Create a new project:
```bash
> phaser new mygame
```
2. Going to folder
```bash
> cd mygame
```
3. Start the server

```bash
> phaser serve
```
---
You can add a scene with: 
```bash
> phaser add scene <sceneName>
```

---
## Android
## ¡Important: You need have installed Android Studio!
You can add a android project with capacitor:
1. Add capacitor android project
```bash
> phaser add android
```
2. Build your android project:
```bash
> phaser build android
```

---
## Web
You can build your web package with: 
```bash
> phaser build 
```

And enjoy you game dev :D