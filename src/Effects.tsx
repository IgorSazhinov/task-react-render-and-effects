import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState<number>(-1);

    useEffect(() => {
        setLastMessage(-1);
        // Обработчик для новых сообщений
        const handleNewMessage = (message: number) => {
            setLastMessage(message);
        };

        // Подписываемся на изменения текущего источника
        subscribe(props.sourceId, handleNewMessage);

        // При размонтировании или смене источника отписываемся
        return () => {
            unsubscribe(props.sourceId, handleNewMessage);
        };
    }, [props.sourceId]); // Эффект срабатывает при изменении sourceId

    return (
        <div>
            {props.sourceId}: {lastMessage}
        </div>
    );
}
