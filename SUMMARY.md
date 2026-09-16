# SpaceX REST API

Open Source REST API for launch, rocket, core, capsule, starlink, launchpad, and landing pad data.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 11 entities and 24 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Capsule

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Capsule serial number
- `land_landings`: Number of land landings
- `last_update`: Last update about the capsule
- `launches`: Launch IDs
- `reuse_count`: Number of times capsule has been reused

### Core

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `asds_attempts`: Number of autonomous spaceport drone ship landing attempts
- `asds_landings`: Number of successful ASDS landings
- `block`: Core block number
- `id`: Core serial number
- `last_update`: Last update about the core

### Crew

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `agency`: Agency
- `id`: Crew member ID
- `image`: Image URL
- `launches`: Launch IDs
- `name`: Crew member name

### Landpad

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `details`: Landing pad details
- `full_name`: Full landing pad name
- `id`: Landing pad ID
- `landing_attempts`: Number of landing attempts
- `landing_successes`: Number of successful landings

### Launch

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `auto_update`: Whether the launch data is automatically updated
- `capsules`: Capsule IDs
- `core`: Core ID
- `crew`: Crew member IDs
- `date_local`: Launch date in local time

### Launchpad

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `details`: Launchpad details
- `full_name`: Full launchpad name
- `id`: Launchpad ID
- `latitude`: Latitude
- `launch_attempts`: Number of launch attempts

### Payload

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `apoapsis_km`: Apoapsis in km
- `arg_of_pericenter`: Argument of pericenter
- `customers`: Customers
- `eccentricity`: Eccentricity
- `epoch`: Epoch

### Roadster

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `apoapsis_au`: Apoapsis in AU
- `details`: Details
- `earth_distance_km`: Distance from Earth in km
- `earth_distance_mi`: Distance from Earth in miles
- `eccentricity`: Eccentricity

### Rocket

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `active`: Whether the rocket is active
- `boosters`: Number of boosters
- `company`: Company
- `cost_per_launch`: Cost per launch in USD
- `country`: Country of origin

### Ship

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `abs`: ABS number
- `class`: Ship class
- `course_deg`: Course in degrees
- `home_port`: Home port
- `id`: Ship ID

### Starlink

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `height_km`: Current height in kilometers
- `id`: Starlink satellite ID
- `latitude`: Current latitude
- `launch`: Launch ID
- `longitude`: Current longitude

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Capsule | `list` | `GET /capsules` | See reference |
| Capsule | `load` | `GET /capsules/{id}` | See reference |
| Core | `list` | `GET /cores` | See reference |
| Core | `load` | `GET /cores/{id}` | See reference |
| Crew | `list` | `GET /crew` | See reference |
| Crew | `load` | `GET /crew/{id}` | See reference |
| Landpad | `list` | `GET /landpads` | See reference |
| Landpad | `load` | `GET /landpads/{id}` | See reference |
| Launch | `list` | `GET /launches` | See reference |
| Launch | `list` | `GET /launches/latest` | See reference |
| Launch | `list` | `GET /launches/past` | See reference |
| Launch | `list` | `GET /launches/upcoming` | See reference |
| Launch | `load` | `GET /launches/{id}` | See reference |
| Launchpad | `list` | `GET /launchpads` | See reference |
| Launchpad | `load` | `GET /launchpads/{id}` | See reference |
| Payload | `list` | `GET /payloads` | See reference |
| Payload | `load` | `GET /payloads/{id}` | See reference |
| Roadster | `list` | `GET /roadster` | See reference |
| Rocket | `list` | `GET /rockets` | See reference |
| Rocket | `load` | `GET /rockets/{id}` | See reference |
| Ship | `list` | `GET /ships` | See reference |
| Ship | `load` | `GET /ships/{id}` | See reference |
| Starlink | `list` | `GET /starlink` | See reference |
| Starlink | `load` | `GET /starlink/{id}` | See reference |

## Connect to the API

- Production server (v5): `https://api.spacexdata.com/v5`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `spacex-rest_list`: List records for an entity. Supported entities: `capsule`, `core`, `crew`, `landpad`, `launch`, `launchpad`, `payload`, `roadster`, `rocket`, `ship`, `starlink`.
- `spacex-rest_load`: Load one record for an entity. Supported entities: `capsule`, `core`, `crew`, `landpad`, `launch`, `launchpad`, `payload`, `rocket`, `ship`, `starlink`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

