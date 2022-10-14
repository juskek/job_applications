# JPMorganChase-SoftwareEngineeringVirtualExperience

## Setup
Task 1: 
1. Run server3.py and client3.py in 2 separate terminals
Task 2: 
1. Run datafeed/server3.py 
2. Server app starts listening for requests from client
3. Install nvm 
4. In separate terminal, nvm use v11.0.0
5. npm install
6. npm start

Task 3:
1. Run datafeed/server3.py 
2. In separate terminal, nvm use v11.0.0
3. npm install
4. npm start

## First Ticket
### Purpose
We want to process the data feed of stock A and stock B’s price to enable us to analyse when trading for the stock should occur.

### Acceptance Criteria
- client3.py
  - getDataPoint function should return correct tuple of stock name, bid_price, ask_price and price. Note: price of a stock = average of bid and ask
  - getRatio function should return the ratio of the two stock prices
  - main function should output correct stock info, prices and ratio
- Upload a git patch file as the submission to this task
- Bonus: All unit tests inside client_test.py, added/existing have to pass

## Second Ticket
### Purpose
The objective of this task will be for you to fix the client-side web application so that it displays a graph that automatically updates as it gets data from the server application (see Before and After images below) Currently, the web application only gets data every time you click on the 'Start Streaming Data' button and does not aggregate duplicated data.

### Acceptance Criteria

- This ticket is done when the graph displayed in the client-side web application is a continuously updating line graph whose y axis is the stock’s top_ask_price and the x-axis is the timestamp of the stock. The continuous updates to the graph should be the result of continuous requests and responses to and from the server for the stock data.

- This ticket is done when the graph is also able to aggregate duplicated data retrieved from the server

## Third Ticket
### Purpose
You will use perspective to generate a live graph that displays the data feed in a clear and visually appealing way for traders to monitor this trading strategy.

Recall that the purpose of this graph is to monitor and determine when a trading opportunity may arise as a result of the temporary weakening of a correlation between two stock prices. Given this graph, the trader should be able to quickly and easily notice when the ratio moves too far from the average historical correlation. In the first instance, we'll assume that threshold is +/-10% of the 12 month historical average ratio.

### Acceptance Criteria

- This ticket is done when the numbers from the python script render properly in the live perspective graph. This means the ratio between the two stock prices is tracked and displayed. The upper and lower bounds must be shown on the graph too. And finally, alerts are shown whenever these bounds are crossed by the ratio (the guide below will also give more detail and visuals to help you understand these requirements better

- This ticket is done when a patch file is uploaded along with a video or audio explanation of the final chart you have produced