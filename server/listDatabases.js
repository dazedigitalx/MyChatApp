const { MongoClient } = require('mongodb');

async function listDatabases() {
    const uri = 'mongodb+srv://dazedigital:B4oUgXKbTkH0BkrJ@cluster0.aeijwoz.mongodb.net/?retryWrites=true&w=majority'; // Update this for your specific connection

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // List all databases
        const databases = await client.db().admin().listDatabases();

        console.log('Databases:');
        for (const db of databases.databases) {
            console.log(` - ${db.name}`);

            // List collections for each database
            const collections = await client.db(db.name).collections();
            console.log(`   Collections in ${db.name}:`);
            collections.forEach(collection => {
                console.log(`    - ${collection.collectionName}`);
            });
        }
    } catch (error) {
        console.error('Error listing databases and collections:', error);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

// Run the function
listDatabases().catch(console.error);
