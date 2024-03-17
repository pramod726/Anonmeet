import useGetConversations from "../../../hooks/useGetConversations";
import { getRandomEmoji } from "../../../utils/emojis";
import Conversation from "./Conversation";
import { useAuthContext } from "../../../ContextApis/AuthContext";

const Conversations = () => {
	const {authUser} = useAuthContext();
	const username = authUser.username

	let { loading, conversations } = useGetConversations();
	const filteredConversations = conversations.filter(conversation => conversation.username !== username);
	conversations = filteredConversations

	console.log(conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;