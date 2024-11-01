const { MongoClient } = require('mongodb');

async function listCollections() {
    const uri = 'mongodb+srv://dazedigital:B4oUgXKbTkH0BkrJ@cluster0.aeijwoz.mongodb.net/?retryWrites=true&w=majority'; // Update this for your specific connection
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const databases = await client.db().admin().listDatabases();

        for (const db of databases.databases) {
            console.log(`Database: ${db.name}`);
            const collections = await client.db(db.name).listCollections().toArray();
            collections.forEach(collection => {
                console.log(` - Collection: ${collection.name}`);
            });
        }
    } catch (error) {
        console.error('Error listing databases and collections:', error);
    } finally {
        await client.close();
    }
}

// Call the function
listCollections().catch(console.error);
