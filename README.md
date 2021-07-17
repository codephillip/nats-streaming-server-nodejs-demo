# NATS demo

## Setup

- Install dependencies

npm install node-nats-streaming ts-node-dev typescript @types/node

- Initialize typescript/ create config file

tsc --init

- port-foward on k8s pod on port 4222

kubectl port-forward foobar-nats-pod-id 4222:4222

- Type *rs and enter* in the terminal restarts the server

## Monitor NATS


- port-foward on k8s pod on port 8222

k port-forward nats-depl-787b7566bb-jbvcm 8222:8222

- Visit http://localhost:8222/streaming

- Navigate into the channels subscribers http://localhost:8222/streaming/channelsz?subs=1

- Add json chrome extension to view the json better
  
https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa/related?hl=en

- 
