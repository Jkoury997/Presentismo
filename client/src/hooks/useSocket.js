// hooks/useSocket.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (userID) => {
    useEffect(() => {
        const socket = io('http://fichaqui.online'); // Cambia esto a la URL de tu servidor

        // Registra el userID con el servidor
        socket.emit('register', userID);

        // Escucha el evento de notificación
        socket.on('notification', (data) => {
            console.log('Notificación recibida:', data);
            // Aquí puedes mostrar la notificación al usuario
            alert('Notificación: ' + data.message);
        });

        return () => {
            socket.disconnect();
        };
    }, [userID]);
};

export default useSocket;
