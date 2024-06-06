import React, { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import { XIcon, BellIcon } from 'lucide-react';

const NEXT_PUBLIC_URL_WEBSOCKET = process.env.NEXT_PUBLIC_URL_WEBSOCKET

const WebSocketClient = () => {
    const socketRef = useRef(null);

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new WebSocket(NEXT_PUBLIC_URL_WEBSOCKET); // Asegúrate de que la URL coincida con la configuración del servidor WebSocket
            socketRef.current = socket;

            socket.onopen = () => {
                console.log('WebSocket Client Connected');
            };

            socket.onmessage = (message) => {
                console.log(message.data);
                toast(<Notification message={message.data} />, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            };

            socket.onclose = (event) => {
                console.log('WebSocket Client Disconnected', event);
                setTimeout(() => connectWebSocket(), 5000); // Reconnect after 5 seconds
            };

            socket.onerror = (error) => {
                console.error('WebSocket Error:', error);
                socket.close();
            };
        };

        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return <ToastContainer />;
};

const Notification = ({ message }) => (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm">
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 dark:bg-gray-800 dark:text-gray-50">
            <div className="bg-gray-100 rounded-md p-2 dark:bg-gray-700">
                <BellIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-medium">New Notification</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => toast.dismiss()}
            >
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </Button>
        </div>
    </div>
);

export default WebSocketClient;
