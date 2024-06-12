// utils/attendance.js

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:MM AM/PM
};

const calculateDuration = (entryTime, exitTime) => {
  const entry = new Date(entryTime);
  const exit = new Date(exitTime);
  const duration = (exit - entry) / (1000 * 60 * 60); // Convertir de milisegundos a horas
  return duration.toFixed(2); // Limitar a 2 decimales
};

const transformData = (data, zones) => {
  const groupedData = {};

  const zoneMap = zones.reduce((acc, zone) => {
    acc[zone.uuid] = zone.name;
    return acc;
  }, {});

  data.forEach(item => {
    const date = formatDate(item.entryTime);
    const entry = {
      time: formatTime(item.entryTime),
      location: zoneMap[item.location] || item.location,
      closedAutomatically: item.closedAutomatically
    };
    const exit = {
      time: formatTime(item.exitTime),
      location: zoneMap[item.location] || item.location,
      closedAutomatically: item.closedAutomatically
    };
    const duration = calculateDuration(item.entryTime, item.exitTime);

    if (!groupedData[date]) {
      groupedData[date] = { date, entries: [], exits: [], duration: 0 };
    }

    groupedData[date].entries.push(entry);
    groupedData[date].exits.push(exit);
    groupedData[date].duration += parseFloat(duration);
  });

  return Object.values(groupedData);
};

export { transformData };
