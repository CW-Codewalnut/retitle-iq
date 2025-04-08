import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

import { RETITLE_ROUTE } from "@/lib/constants";

import { getRetitleFirstUserMessage } from "../../utils/methods";
import type { RetitleInput } from "../../utils/types";
import { RetitleChatMessages } from "../chat/messages";
import { RetitleForm } from "../form";

type RetitleLandingCompProps = {
	id: string;
};

export function RetitleLandingComp({ id }: RetitleLandingCompProps) {
	const navigate = useNavigate();
	const { mutate } = useSWRConfig();

	const [isSubmited, setIsSubmited] = useState(false);
	const { reload, status, messages, setMessages } = useChat({
		id,
		api: `${RETITLE_ROUTE}${id}/create`,

		onError(error) {
			setIsSubmited(false);
			toast.error(error.message);
		},

		onFinish() {
			void mutate(`${RETITLE_ROUTE}api/history`);
			void navigate(`${RETITLE_ROUTE}${id}`, {
				preventScrollReset: true,
			});
		},
	});

	function handleInitialFormSubmit(input: RetitleInput) {
		setIsSubmited(true);
		setMessages([
			{
				id: crypto.randomUUID(),
				role: "user",
				content: getRetitleFirstUserMessage(input),
			},
		]);
		void reload({ body: input });
	}

	return (
		<>
			{isSubmited ? (
				<RetitleChatMessages status={status} messages={messages} />
			) : (
				<RetitleForm onSubmit={handleInitialFormSubmit} />
			)}
		</>
	);
}
