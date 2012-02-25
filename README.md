# dis.io

## What is dis.io

`dis.io` is a distributed computing platform that utilises idle CPU cycles from within a web browser or the command line, built purely on JavaScript and node.js.

The name `dis.io` descends from two origins. The first is that is was built as part of my Dissertation for my Degree in Computing BSc at Bournemouth University, however the other origin, which I personally think it is much better at describing the project is because it is a distributed computing platform.

## Installation

### Client

The client originally defaults to the main `dis.io` distribution server and processes various random tasks including benchmarking and analyitical work-units helping to improve `dis.io`. This however can be overwritten and you can use your own distribution and Management servers.

There are two different clients, the browser version and the lesser supported cli version.

#### Web Browser

This will run for any user which visits your page, I recomend using the dis.io test work-unit to get a gauge of the average lifespan of your users on one page. *This will eventually automatically show the mode, mean and average in the control panel*

    <script src='http://tomg.co/dis.io/client.js'></script>

#### CLI

    npm install dis.io-client

### Server

This contains two programs, The manager and the distributor. Both of these components are provided with one package.

    npm install dist.io

## Architecture

possible manager registry... (later stage)

distributor registry / distpatcher

              Manager's
               | | | |
             Distributor's  <<------------------ Server Application's
               | | | |
               | | | |     <<------------------ Payloads (Work-units)
               | | | |
               Client's
      _________|__|__|_________
     (                          )
     (          Handler         )
     (    | | | | | | | | | |   )
     (    | | | | | | | | | |   ) <<----------- Client Applications
     (    | | | | | | | | | |   )
     (    | | | | | | | | | |   )
     (      Unit Processor's    )
     (__________________________)

dis.io is compromised of three major components; The Manager, The Distributor and the clients. Each have its own role and all three are encumbered under the name dis.io.

### Manager

The manager is the main component of dis.io, This will act as the provider layer to the distributor. It contains a RESTful API which will generate optimised versions of specific work-units and store the information related to each one, including which ID each unit has been sent to and how many of a specific work-unit has been sent.

The Manager includes a web-based / command-line management panel to enable various management aspects of work-units including:

- Queuing
- Deadlines
- CRUD
- Managing the connection of various distributors.

The manager doesn't need to be online as it is only required when the distributer asks for a new task, or receives a completed task.

In General in a large scale environment work-units should be grouped in common fashion, when computing different types work-units simultaneously these groups will be spawned in new dis.io Manager's and are all available to manage under one collective application.

### Distributor

The Distributor will be sending the specific work tasks to each client and in turn sending back the computed result - whether that would be the browser, or using a server-side version.

There are some aspects of the distributor which is not dumb, these are various ways of handling the Manager being un-reachable, When this occurs the distributor will continue serving up the previous work units as having more data is better than having a period where no data is being recieved.

When recieving the completed work-units each distributor should queue them up for sending back to the manager, this is becuase the data is only really valuble when multiple data sets are receieved. This means that the distributor can also compress the results and send the batch when the Manager needs them. This can also have some load balancing to enable the completed work units to be sent to a non-originating manager.

`This needs much more research`
The distributor is a dumb application. They can be spawned multiple times and be placed in various geographical locations to enable the quickest RTT possible, more distributers can be spawned when other distributors are overloaded or not available. If no more distributors can be spawned then it is also possible for a distributor to redirect a certain amount of traffic to others.??


### The Client

The Client is portable to each the web browser and if installed on a local machine a command line based application. Although the Browser based version is currently the most focused aspect of the dis.io client.

The Client is compromised of two main components.

#### Handler

This is the main part of the client side application that fetches the correct work-unit specified to a client. (Will use abstractions to allow this code to be shared across platforms.) once a work unit has been fetched it will then be passed to the unit processor

#### Unit Processor

Again this component will have more abstractions for the cli and the browser versions, with the browser version using WebWorkers, and the cli version utilising `cluster` for use of multiple cores.

#### Finaliser / Packager

Once the Unit Processor has finished it's work unit it will call these set of functions, this will package up the result and send it back the originating `distributor??` - maybe have a separate client to allow the use of uploading overall, or even renaming `distributor` and using a term which covers the both of them.


## Technologies Used

### Manager
- Node.js
- MongoDB
- express / connect / flatiron

### Distributor
- Node.js
- Redis Store

### Client
- Socket.io - enable real fast uploading of data / streaming of data
- Web Workers - Threads for processor, non block ui - browser
- jQuery
- or Multiple node.js intances using cluster for utilisation of multiple cores.