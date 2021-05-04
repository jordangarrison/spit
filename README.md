# SPam Ip Tester

A CLI Tool for checking malicious IP addresses using the Scamalytics API.

## Installation

> Note 📓
> 
> You will need to request a free API key here if you wish to use the API:
> https://scamalytics.com/ip/api/enquiry?monthly_api_calls=5000
>
> This limits you to 5000 requests per month, if you need more you can pay for further usage of the API.

Currently this project uses velociraptor to handle installation and scripting via the [`scripts.yaml`](./scripts.yaml)
file. To install velociraptor you will need to run the following command ([Documentation for velociraptor located
here](https://github.com/jurassiscripts/velociraptor#install)) 

```sh
deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts
```

You can then install with the following command

```sh
vc install
```

Alternatively, you can install this with deno directly using the following command

```sh
deno install --allow-net --allow-read --allow-env https://raw.githubusercontent.com/jordangarrison/spit/main/spit.ts
```

## Usage

To run a check against a given IP address simply execute the following:

```sh
# Single IP
spit check 1.2.3.4

# Multiple IPs
spit check 1.2.3.4 4.3.2.1

# Workaround for file of ip addresses
spit check <(filename.txt)
```

## Todo:

- [x] Installation documentation
- [x] Usage Documentation
- [ ] Build and compilation documentation
- [ ] CONTRIBUTING.md
- [ ] Extractor for high frequency IP addresses in logs