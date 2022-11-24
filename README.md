<h1 align="center">Jog helper</h1>
<p align="center">Find answers to law questions with ease</p>

# ⚠️ Disclaimer ⚠️
This is just a hobby project. I highly discourage using it on actual law exams, and I'm also not responsible for any punishment resulting from the use of the script.

# Requirements
* Node JS

# Installation & usage
## Using package

### 1. Install
```bash
# npm
npm i -g jog-helper

# yarn
yarn global add jog-helper
```

### 2. Run
```bash
jog-helper <filename>
```
Where filename is the `.txt` file with the answers. Defaults to `jog.txt`.

## Building yourself

### 1. Clone repo
```bash
git clone https://github.com/Tasztalos69/jog-helper.git && cd jog-helper
```


### 2. Install dependencies
```bash
# npm
npm i
# yarn
yarn
```

### 3. Build
```bash
# npm
npm run build
# yarn
yarn build
```

### 4. Run
```bash
node dist/main.js
```