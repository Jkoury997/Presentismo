import { useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NEXT_PUBLIC_URL_WEBSOCKET = process.env.NEXT_PUBLIC_URL_WEBSOCKET

const useSocket = (userID) => {
    useEffect(() => {
        const socket = io(NEXT_PUBLIC_URL_WEBSOCKET); // Cambia esto a la URL de tu servidor

        // Registra el userID con el servidor
        socket.emit('register', userID);

        // Escucha el evento de notificación
        socket.on('notification', (data) => {
            console.log('Notificación recibida:', data);
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [userID]);
};

export default useSocket;
