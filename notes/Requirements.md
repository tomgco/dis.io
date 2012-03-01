# Requirements

## Non-functional Requirements
These are difficult to come up with, as they usually appear once the system has been running for a while. The main concepts which I need to cover are as following:

- Scalability
This is one of the main concepts that I need to make sure works. The system needs to be able to scale over large networks as users are all in geographically different locations.

- Availability 
The system should be de coupled so that if any part of it fails there are contingencies in place so that other parts can still be ran.

## Functional Requirements

I will split this into subsections; one for each component.

### Client
Must have a simple interface to easily implement.
Should have a way to opt-out.
Could have a CLI version.

### Distributor
Must persist its queue if the manager is not available.
Must present its self to the distributor registry
Should find other Distributors and make them aware of the registry if not known.
Should have an socketio interface to allow connections from clients.

### Manager
- Should be non-mission critical.
- -Should have an option to be a master or slave.- removed 1st march
- -Must check against a registry to see if a master is available- removed 1st march
- Should fall back to local discovery using bonjour
- Could keep a log of connected slaves and broadcast to local servers 
- Should have a **REST API**
- - Must allow creation of new tasks
- - Should allow updates to these
- - Should allow Deletion of tasks
- - Could show the current status of tasks
- - Could show statistics of workers on task
- Must have database connection
- Must have a RabbitMQ message queue 

### Dashboard 
Must have Web front end.
Should have a loginpage
Must show status of managers of certain tasks.
Must show status of distributors of certain tasks.
Must be able to set the number of distributors for a task
Could be able to set the number of Managers for a task
Could have a range of distributors to scale to.


