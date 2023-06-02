## Storage Services

You want to keep some data over time. Databases can be expensive, so look for another solution if you don't need one. Don't store on server, because you don't want it to bog/break the server, limit ability to backup.

AWS S3:
Great because it has...

1. Unlimited capacity
2. You pay for what you use
3. Keeps redundant copies
4. Performant
5. Can make files puclically available or private

Although we won't use a service, here's roughly how to do it:

1. Create S3 bucket
2. Get credentials so you app can access it
3. Use the SDK to write, read, and delete files from bucket

## Data Services

Don't oversimplify and choose either SQL or NoSQL. Here are some popular services:

1. MySQL - relational database
2. Redis - Memory cahced objects
3. ElasticSearch - Ranked free text
4. MongoDB - JSON objects
5. DynamoDB - Key value pairs
6. Neo4J - Graph based data
7. InfluxDB - Time series data

We will be using MongoDB

- Doesn't require strict types or schema requirements
- Easy Javascript syntax

```
// find all houses
db.house.find();

// find houses with two or more bedrooms
db.house.find({ beds: { $gte: 2 } });

// find houses that are available with less than three beds
db.house.find({ status: 'available', beds: { $lt: 3 } });

// find houses with either less than three beds or less than $1000 a night
db.house.find({ $or: [(beds: { $lt: 3 }), (price: { $lt: 1000 })] });

// find houses with the text 'modern' or 'beach' in the summary
db.house.find({ summary: /(modern|beach)/i });
```

When you create a database, you use their own protocol
