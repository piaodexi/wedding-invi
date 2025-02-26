// mongo.ts
import { MongoClient, Db } from 'mongodb';
import { MONGO_URL, VITE_NODE_ENV } from '$env/static/private';

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

export async function connectToDatabase() {
	// MONGO_URL이 없으면 연결하지 않음
	if (!MONGO_URL) {
		console.warn('MONGO_URL is not set. Database connection is skipped.');
		return { mongoClient: null, database: null };
	}

	// 이미 연결된 경우
	if (mongoClient && database) {
		return { mongoClient, database };
	}

	try {
		// 데이터베이스 연결 시도
		mongoClient = await new MongoClient(MONGO_URL).connect();
		database = await mongoClient.db(VITE_NODE_ENV === 'develop' ? 'wedding-invi-dev' : 'wedding-invi');
	} catch (error) {
		console.error('Failed to connect to the database:', error);
		return { mongoClient: null, database: null };
	}

	return { mongoClient, database };
}

export async function getGuestbookCollection() {
	const { database } = await connectToDatabase();

	// 데이터베이스 연결 안된 경우에는 빈 배열 또는 적절한 대체 값을 반환
	if (!database) {
		console.warn('Database is not connected. Returning an empty collection.');
		return []; // 예를 들어 빈 배열 반환 (혹은 필요한 다른 대체 값)
	}

	// 정상적으로 연결된 경우에는 실제 컬렉션을 반환
	return database.collection('guest-message');
}
