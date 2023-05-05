# Notes from CS 260

## History of the Web

**Creator of HTML**
Tim Berners Lee: Wrote final version of HTML in 1993
**Creator of CSS**
Hkon Wium Lie: 1994 the idea was proposed

**Creator of JS**
Brandon Eich: Busted it out in a weekend in 1995

## Github & Git

**Different Git commands**

- `git clone [url] ` (Clone a github repo)
- `git add .` (Stage all files)
- `git commit -m ""` (Commit staged files with message)
- `git push` (Push local changes up to github repo)
- `git pull` (Do before pushing! Pull changes from remote repo)

**Markdown Syntax**

- Use # for headings (1 - 6)
- Use **bold** or _italic_ or both for emphasis
- Use html style tags <sub>subscript</sub> and super<sup>script</sup>
- Embed links using [this](www.google.com)
- Show off cool colors with `#ffffff`
- Mention people with @jake
  > Use for quotes

## DNS & Route 53

Domain Name Servers convert human-readable domain names into IP addresses. We can lease domain names using services such as Route 53.

- Tuturial
  - Enter AWS management console
  - Search Route 53
  - Register new Domain
  - Once completed, check hosted zones to create DNS records for your domain name

## Caddy

Caddy is a web service that listens for HTTP requests and routes them (gateway).
Services used in the class:

- Creation of web certificates
- Serving static files
- Gateway for subdomain requests
  ![Caddy overview](static/img/Caddy.png)

**Encryption**
Before 2014, it was costly to acquire and renew certificates. Since the creation of the non-profit "Let's Encrypt", anyone can sign and renew a certificate for free.
This has made the internet a far safer place.

## Deploying the Application

In this class, we'll be deploying using a script from our server. For now it looks like this:
`./deployService.sh -k ~/prod.pem -h trainclimbing.com -s simon`
