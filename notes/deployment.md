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
