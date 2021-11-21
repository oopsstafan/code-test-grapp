
## Getting Started

Please make sure you have MySQL installed on your machine, before running app, try to config your root info and config mysql/conn.mysql.js file.

When MySQL is ready to go, you need to go to the 'code-test-server' file to start the server(run 'node server.js' in the path of 'code-test-server')

Then run 'npm run start' in root path to start the application


## Introduction
This is a small web application created by React.js on frontend and node.js on backend. Users can create member or reward, assign or unassign a reward to a member, search member information, or delete member or reward.

## Assumptions
1. When you start the application, I initialized a member 'kevin' and a reward 'gold'. Member info includes member id(pk), member name, and reward id(fk); Reward info includes reward id(pk) and reward name.
2. A member can only be assigned one reward
3. Validations include new member or reward name can not be existed, when searching, deleting member or reward, they must be existed
4. All inputs are case sensitive.


## Resources
1. React.js
2. Node.js along with mysql and express


## Timeline
11/18 Start coding
11/19 Finish coding
11/20 Edit comments and README.md file, push "V1" to github
11/21 Made some adjustments, push "V2" to github

## Thank you for your opportunity!