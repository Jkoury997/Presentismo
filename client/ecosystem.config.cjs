module.exports = {
    apps: [
      {
        name: 'client nextjs-app',
        script: 'bun',
        args: 'run start',  // Comando para iniciar tu aplicación Next.js en producción
        cwd: './',  // Directorio de trabajo de tu proyecto Next.js
        interpreter: 'none',  // Esto le dice a PM2 que no use Node.js para ejecutar este script
      }
    ]
  };
  