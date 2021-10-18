/**
 * 問題：
 * myFetch関数を使って以下の「データ取得の流れ」の通り、
 * 順次JSONを取得し、取得したデータを加工して、
 * 以下のメッセージをコンソールに表示してください。
 * 
 * --Bob's timeline--
 * Tim says: waiting at station.
 * Sun says: go shopping?
 * John says: how's it going?
 * Sun says: drink?
 *
 ******************************   
 * データ取得の流れ
 * １．"user1.json"を取得（Bobのユーザー情報取得）
 * 
 * ２．"user1.json"のidの項目を元に
 *     `friendsOf${id}.json`でフレンド一覧を取得
 * 
 * ３．取得したフレンドのID（ユーザーID）を元に、
 * 　　`user${id}.json`で各ユーザーの情報を取得
 * 
 * ４．各ユーザー情報のlatestMsgIdが最後に投稿した
 * 　　メッセージのIDになりますので、そのidを用いて
 * 　　`message${friend.latestMsgId}.json`
 * 　　を取得。
 * 
 * １～４で取得したデータをもとにコンソールログに
 * タイムラインの文字列を作成してください。
 * 
 * ※await/asyncで記述してみてください。
 */
async function myFetch(fileName) {
	const response = await fetch(`../json/${fileName}`);
	const json = await response.json();
	return json;
}

// 答えを見る前の回答 → Promise.all() で並列処理すべき
// const getTimeLine = async () => {
// 	const timeLineTarget = await myFetch('user1.json');
// 	const friendList = await myFetch(`friendsOf${timeLineTarget.id}.json`);
// 	let friendInfo = [];
// 	let messageInfo = [];

// 	console.log(`--${timeLineTarget.name}'s timeline--`);
// 	for (let i = 0; i < friendList.friendIds.length; i++) {
// 		friendInfo[i] = await myFetch(`user${friendList.friendIds[i]}.json`); // Promise.all() で並列処理へ
// 		messageInfo[i] = await myFetch(`message${friendInfo[i].latestMsgId}.json`); // Promise.all() で並列処理へ
// 		console.log(`${friendInfo[i].name} says: ${messageInfo[i].message}`);
// 	}
// }

// getTimeLine();

const getTimeLine = async () => {
	const timeLineTarget = await myFetch('user1.json');
	console.log(`--${timeLineTarget.name}'s timeline--`);

	const friendIdsList = await myFetch(`friendsOf${timeLineTarget.id}.json`);
	const friendList = friendIdsList.friendIds.map(id => myFetch(`user${id}.json`));
	const friends = await Promise.all(friendList);  // Promise.all() で並列処理

	const messagesList = friends.map(friend => myFetch(`message${friend.latestMsgId}.json`));
	const messages = await Promise.all(messagesList);  // Promise.all() で並列処理

	friends.forEach((friend) => {
		messages.forEach((message) => {
			if(friend.id === message.userId) {
				console.log(`${friend.name} says: ${message.message}`)
			}
		})
	})
}

getTimeLine();
