# Valowiki

An application that allows people to learn more in depth about their favorite Valorant agents while also becoming better players at the same time. The app showcases agents, maps, and some tips and tricks as well. 

## Deployment Link
- tbd

## Installation Instructions
- Fork and clone the code and run `npm i` 
  <details>
    <summary> NPM </summary>

    - axios
    - react
    - react-dom
    - react-icons
    - react-player
    - react-router-dom

  </details>

## Planning Tools
* Figma
* Trello

## Tech Used
* React
* Axios
* CSS

## Routes
| **HTTP Verb**| **URL** |  **Action**| **Description**
|------------|-------------|------------|------------|
| GET        | /      | Index (read)  | Homepage
| GET         | /agents       |  Show (read) |  List of all Agents
| GET     | /agents/:id |  Show (read)    | Details pages for specific agent
| GET     | /lineups | Show (read) | Display agent lineups
| GET     | /maps | Show (read)    | List of all maps
| GET         | /maps/:id      | Show (read) |  Details pages for specific maps
| GET     | /weapons | Show (read)    | List of all weapons organized by category
| GET         | /weapons/:id      | Show (read) |  Detail page for a single weapon and showcase of skins

## Wireframes / Planning
---
<details>
    <summary>Initial Planning</summary>

![Home](./public/images/home.png)

![Agent-List](./public/images/agent-list.png)

![Sova](./public/images/sova.png)

![Brimstone](./public/images/brimstone.png)

![Viper](./public/images/viper.png)

![Sova lineup](./public/images/lineups.png)

</details>

## Final Design
---
<details>
    <summary>Screenshots</summary>

![Home](./public/images/final/homepage.jpg)

![Agent-List](./public/images/final/agents.jpg)

![Jett](./public/images/final/jett.jpg)

![Maps](./public/images/final/maps.jpg)

![Icebox](./public/images/final/icebox.jpg)

![Sova lineup](./public/images/final/lineups.png)

</details>

## MVP
- [X] Homepage that shows a description of the game / app 
- [X] Navbar that directs to agents + maps
- [X] List of agents on agents page 
- [X] Detailed information about certain agents on their specific page
- [X] Maps page showcasing different maps / callouts

## Stretch Goals
- [] Details page for all Agents
- [] Details page for all maps
- [X] Weapons skins tab that showcases all the various weapon skins

## Resources
    
- [API](https://dash.valorant-api.com/)
- Youtube
- Fontawesome
- Riot Games (All characters and assets belong to Riot Games)