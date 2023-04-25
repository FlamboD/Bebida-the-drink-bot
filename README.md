# Bebida: The drink suggestion bot
_An interface to interact with the [UP2TOM API](https://docs.up2tom.com/)_

## Table of contents
- [Bebida: The drink suggestion bot](#bebida-the-drink-suggestion-bot)
  - [Table of contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Drink suggestion form](#drink-suggestion-form)
    - [Batch drink suggestions](#batch-drink-suggestions)
  - [Technologies Used](#technologies-used)
  - [My Additions](#my-additions)
  - [Known Problems](#known-problems)
  - [License](#license)

## Description
Bebida will recommend a drink for you based on a set of criteria:
- The current temperature
- Your gender
- Your age
- Whether you are sensitive to caffeine
- The time of day
- Whether you are pregnant
- Whether you are health conscious
- How many drink you have per day
- How many drink you have had today

## Installation
You will need the [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) and [Node.js](https://nodejs.org/en) to set up the project.

Clone this repository onto your local storage with the command 
`git clone https://github.com/FlamboD/Bebida-the-drink-bot.git`

Navigate into the newly created directory and install the required node packages with the command
`npm install`

Once the installation is complete, you can run the application with the command
`npm start`

## Usage

### Drink suggestion form
The first section you will see is a form gathering information about you and your environment. Fill out the form and press the `Submit` button, Bebida will use the information you have entered to recommend a drink for you.

Once Bebida has recommended a drink, you can press the `x` at the top right corner of the pop up window or the `Ask Bebida to suggest another drink` button to close the popup window.

From here you can edit the form and resubmit or you can reset the form with the 'Reset' button.

### Batch drink suggestions
To access the bulk suggestions form, click the tab at the top of the form with the text `Batch`.

You will be presented with a form with two sections. One to upload a file and one to  download a file.

You can upload a pipe-delimited CSV file, like the one provided [in the project](./resources/Drinks.csv). After clicking the `Upload` button you will be notified if your upload was a success.

To view the results of the CSV, you need to select the file you uploaded from the drop down list. It will have the same name as the file you uploaded as well as the date the file was uploaded. Once selected, clicking the `Download` button will download a pipe-delimited CSV file yo your device with the suggested drink for each row as well as how confident Bebida is that this is the correct drink to suggest.

You can navigate back to the initial form by clicking the `Singular` tab at the top of the form.

## Technologies Used
- [Node.js](https://nodejs.org/en)
- [React.js](https://react.dev/)
- [TailwindCss](https://tailwindcss.com/)
- [RESTful API](https://restfulapi.net/)
- [UP2TOM API](https://docs.up2tom.com/)
- [GitHub](https://github.com/)

## My Additions
#Implementation of UP2TOM batch API
You can upload CSV files to evaluate the suggested drink for many different variable configurations in a short amount of time.

You can also download the evaluated files uploaded by other users.

## Known Problems
Despite using a great configuration of variables, the UP2TOM API always responds with the `Water / Fruit Juice` option.

## License
[MIT License](LICENSE.md)