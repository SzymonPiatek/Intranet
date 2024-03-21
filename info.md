# Settings

***

## SCSS / SASS
### Instalation
    npm install scss
    npm install sass
### FileWatcher Settings
#### Arguments
    $FileName$:$ProjectFileDir$/website/static/css/$FileNameWithoutExtension$.css
#### Output
    $ProjectFileDir$/website/static/css/$FileNameWithoutExtension$.css
#### Work Dir
    Empty

***

## AD / LDAP
#### Obtaining data about users
    Get-ADUser -Identity [ username ] -Properties *

***

## Docker
#### Build containers
    docker-compose up --build -d
#### Delete containers
    docker-compose down -v

***
