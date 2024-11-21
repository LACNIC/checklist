# checklist

Checklist is a small application that allows you to create lists of steps or instructions that provide certainty to complex or repetitive operations.

You can define each step or instruction in a YAML script and group them by sections. The application will be responsible for correctly displaying the list, keeping track of the steps marked as completed, and providing space to record incidents.

The application is easy to install, compile the source code, and deploy the compiled files into any web server. All the participants have an independent copy of the checklist in their browser.

## Defining the checklist script
All scripts must be stored at the path: `/public/scripts/`. A test script is provided as an example.

You can define the checklist script using the YAML format. Here is the list of options that assemble a checklist.

### Checklist

| Parameter | Type | Required | Description |
|:----------|:----:|:--------:|:------------|
| data | Object | true | Defines a list of variables to be displayed or asked in the checklist. |
| sections | Array | true | Defines an array of section objects that form the checklist. |

### Data

| Parameter | Type | Required | Description |
|:----------|:----:|:--------:|:------------|
| label | String | true | Display label. |
| format | String | true | How to format the value. Valid options: word-4 and sha-256. |

### Section

| Parameter | Type | Required | Description |
|:----------|:----:|:--------:|:------------|
| title | String | true | Section title. |
| tasks | Array | true | Array of task in the section. |

### Task

| Parameter | Type | Required | Description |
|:----------|:----:|:--------:|:------------|
| msg | String | true | Define the task. (Supports Markdown) |
| code | String | false | Define code to run in the task. (Supports Markdown) |
| expected | Object | false | Expected result of this task. |
| input | String | false | Ask the user for a value of a variable defined in the data section. |
| output | String | false | Displays a variable defined in the data section and provided in the JSON file. |

### Expected

| Parameter | Type | Required | Description |
|:----------|:----:|:--------:|:------------|
| msg | String | true | Define the expected result. (Supports Markdown) |
| code | String | false | Define the expected output of the console. (Supports Markdown) |

## Calling the Checklist Script

Once you create the checklist script, you must create a JSON file with the information about when the script is executed, for example, in a cryptographic key generation ceremony or object signing.

An example of the JSON script is provided in the `/public/data` directory.

| Parameter | Type | Required | Description |
|:----------|:----:|:--------:|:------------|
| script | URL | true | Path to the Checklist script to use.|
| title | String | true | Title of the Checklist script. |
| location | String | false | Location or place. |
| date | Date | false | Date. |
| roles | Object | false |  A role description list as a key-value format. |
| participants | Object | true |  A role-name list of the participants as a key-value format. |
| data | Object | true | Values of the data variables defined in the script. |

## Personalize
### Favicon
You can set up a favicon, add the icon file in the `/public` directory, and uncomment the link tag in the `index.html` file.

### Logo
You can also add a logo image uncomment the line in the script section of the `/src/views/ChecklistView.vue` file.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Development
### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).


